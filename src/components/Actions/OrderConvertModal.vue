<template>
  <b-modal v-if="modalAction" @show="show" @hide="hide" id="orderConvertModal" ref="order-convert-modal'" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4">
          <b-form-input type="text" v-model="form.Code" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4">
          <b-form-input type="text" v-model="warehouse" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.InvoiceKindId" :required="true" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="Label" @input="selectedType('InvoiceKindId', $event)"></v-select>
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
        <NextFormGroup :title="$t('index.Convert.TransactionDate')" md="4" lg="4">
          <NextDatePicker v-model="form.documentDate" />
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
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
            <template #cell(Count)="data">
              <b-form-input type="number" v-model="data.item.ConversionQuantity" />
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
          :disabled="isLoading"
        >
        <span v-if="isLoading"><b-spinner small></b-spinner></span>
        <span v-else>{{$t('index.approve')}}</span>
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
  name: 'OrderConvertModal',
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
    },
    openModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        documentDate: null,
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
        },
        {
          key: 'ShippedQuantity',
          label: this.$t('index.Convert.ShippedQuantity'),
          sortable: true
        },
        {
          key: 'Stock',
          label: this.$t('index.Convert.Stock'),
          sortable: true,
          formatter: (value = 0, key, item) => {
            return value || 0
          }
        },
        {
          key: 'Count',
          label: this.$t('index.Convert.Count'),
          sortable: true
        }
      ],
      isLoading: false
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
  methods: {
    hide () {
      this.orderLines = []
      this.form = {
        InvoiceKindId: null,
        documentDate: null,
        RepresentativeId: null,
        Code: null,
        DocumentNumber: null
      }
      this.documentType = null
      this.employee = null
      this.invoiceType = null
      this.isLoading = false
    },
    show () {
      this.tableBusy = true
      this.orderLines = []
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      this.employee = userModel.Name + ' ' + userModel.Surname
      this.form.RepresentativeId = userModel.UserId
      this.warehouse = this.modalItem.Warehouse ? this.modalItem.Warehouse.Label : '-'
      this.form.DocumentNumber = this.modalItem.DocumentNumber
      this.$v.form.$reset()
      this.getCode()
      this.getConvert()
    },
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextOrder/api/Order/GetCode`})
    },
    getConvert () {
      this.$api.postByUrl({invoiceNumber: this.modalItem.DocumentNumber, id: this.modalItem.RecordId}, 'VisionNextOrder/api/Order/GetConvert').then((response) => {
        if (Object.keys(response).length > 0) {
          this.orderLines = response.OrderLines
          this.form.documentDate = response.DocumentDate.substr(0, 10)
          this.invoiceTypes = response.InvoiceKinds
          if (this.invoiceTypes && this.invoiceTypes.length > 0) {
            this.invoiceType = this.invoiceTypes[0]
            this.selectedType('InvoiceKindId', this.invoiceType)
          }
          this.getConvertData = response
        } else {
          if (response.Message) {
            this.$toasted.show(this.$t(response.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            this.close()
          }
        }
        this.tableBusy = false
      })
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
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
      this.$root.$emit('bv::hide::modal', 'orderConvertModal')
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
      let checkQuantity = false
      this.orderLines.map(item => {
        if (item.ConversionQuantity > 0) {
          checkQuantity = true
        }
      })
      if (!checkQuantity) {
        this.$toasted.show(this.$t('insert.checkQuantity'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.getConvertData.InvoiceKindId = this.form.InvoiceKindId
      this.getConvertData.DocumentNumber = this.form.DocumentNumber
      this.getConvertData.InvoiceNumber = this.form.Code
      if (this.getConvertData.OrderLines) {
        this.getConvertData.OrderLines = this.orderLines
      }
      if (this.form.documentDate) {
        this.getConvertData.DocumentDate = this.dateConvertToISo(this.form.documentDate)
      }
      let request = {
        'recordId': this.modalItem.RecordId,
        'orderConvertModel': this.getConvertData
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextOrder/api/Order/ConvertOrder').then((res) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (res.IsCompleted === true) {
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          setTimeout(() => {
            this.$store.commit('setReloadGrid', true)
          }, 1000)
          this.closeModal()
        } else {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
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
