<template>
  <b-modal v-if="modalAction" id="salesWaybillConvertModal" :title="modalAction.Title" @hide="hideModal" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4">
          <b-form-input type="text" v-model="form.Code" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4">
          <b-form-input type="text" v-model="warehouse" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.InvoiceKindId" :required="false" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="label" @input="selectedType('InvoiceKindId', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Employee')" md="4" lg="4">
          <v-select :value="employee" :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" :filterable="false">
            <template slot="no-options">
              {{$t('insert.min3')}}
            </template>
          </v-select>
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            v-if="orderLines"
            :items="orderLines"
            :fields="fields"
            sticky-header
            :busy="tableBusy"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </section>
    <template #modal-footer>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="closeModal()"
        >
          {{$t('index.close')}}
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import mixin from '../../mixins/helper'
export default {
  name: 'SalesWaybillConvertModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState(['employees', 'createCode'])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        RepresentativeId: null,
        Code: null,
        DocumentNumber: null,
        InvoiceKindId: null
      },
      employee: null,
      invoiceType: null,
      invoiceTypes: [],
      actionUrl: null,
      warehouse: null,
      orderLines: [],
      tableBusy: true,
      getConvertData: null,
      routeName: this.$route.name,
      fields: [
        {
          key: 'ItemCode',
          label: this.$t('index.Convert.ItemCode'),
          sortable: true,
          formatter: (value, key, item) => {
            return key === 'ItemCode' && item.Item ? item.Item.Code : ''
          }
        },
        {
          key: 'Item',
          label: this.$t('index.Convert.Item'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Quantity',
          label: this.$t('index.Convert.Quantity'),
          sortable: true
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        InvoiceKindId: {
          required
        }
      }
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.orderLines = []
      this.form = {
        InvoiceKindId: null,
        RepresentativeId: null,
        Code: null,
        DocumentNumber: null
      }
      this.documentType = null
      this.employee = null
    })
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      this.tableBusy = true
      this.orderLines = []
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      this.employee = userModel.Name + ' ' + userModel.Surname
      this.form.RepresentativeId = userModel.UserId
      this.warehouse = this.modalItem.Warehouse.Label
      this.form.DocumentNumber = this.modalItem.DocumentNumber
      this.getCustomer()
      this.getCode()
      this.getConvert()
    })
  },
  methods: {
    getCustomer () {
      this.$api.postByUrl({RecordId: this.modalItem.CustomerId}, 'VisionNextCustomer/api/Customer/Get').then((res) => {
        if (res.Model) {
          this.invoiceTypes = this.getOrderDocumentTypes(res.Model.SalesDocumentTypeId, 'Waybill')
        }
      })
    },
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextInvoice/api/InvoiceBase/GetCode`})
    },
    getConvert () {
      this.$api.postByUrl({invoiceNumber: this.modalItem.DocumentNumber, RecordId: this.modalItem.RecordId, WarehouseId: this.modalItem.WarehouseId}, `VisionNextInvoice/api/${this.routeName}/GetConvertToInvoice`).then((response) => {
        if (response.IsCompleted === true) {
          this.orderLines = response.invoiceConvertModel.InvoiceLines
          this.getConvertData = response.invoiceConvertModel
        } else {
          this.$toasted.show(this.$t(response.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          this.close()
        }
        this.tableBusy = false
      })
    },
    selectedType (label, model) {
      if (model) {
        this.invoiceType = model.label
        this.form[label] = model.id
      } else {
        this.form[label] = null
        this.invoiceType = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.employee = model.Description1
        this.form[label] = [model.RecordId]
      } else {
        this.form[label] = null
        this.employee = null
      }
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'salesWaybillConvertModal')
    },
    onEmployeeSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchEmployee(loading, search)
      }
    },
    searchEmployee (loading, search) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
        name: 'employees',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    submitModal () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.getConvertData.InvoiceKindId = this.form.InvoiceKindId
      if (this.getConvertData.OrderLines) {
        this.getConvertData.OrderLines = this.orderLines
      }
      let request = {
        'recordId': this.modalItem.RecordId,
        'invoiceConvertModel': this.getConvertData
      }
      this.$api.postByUrl(request, `VisionNextInvoice/api/${this.routeName}/ConvertToInvoice`).then((res) => {
        if (res.IsCompleted === true) {
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          setTimeout(() => {
            this.$store.commit('setReloadGrid', true)
          }, 1000)
        } else {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    hideModal () {
      this.form = {}
      this.warehouse = null
      this.invoiceType = null
      this.$v.form.$reset()
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    }
  }
}
</script>
<style scoped>
</style>
