<template>
<!-- Rma apisi bulunmadığı için sonra yapılacak -->
  <b-modal v-if="modalAction" @show="show" id="rmaConvertModal" @hide="hide" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4">
          <b-form-input type="text" v-model="form.Code" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.InvoiceKindId" :required="false" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="label" @input="selectedType('InvoiceKindId', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4">
          <NextDropdown
            url="VisionNextWarehouse/api/Warehouse/Search"
            @input="selectedWarehouse"
            :searchable="true"
            :custom-option="true"
          />
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
            <template #cell(UsedQuantity)="row">
              <b-form-input type="number" :min="0" :max="row.item.TransformQuantity" v-model="row.item.UsedQuantity" />
            </template>
            <template #cell(TotalAmount)="row">
              <span>{{calculatedQuantity(row.item)}}</span>
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
import indexMixin from '../../mixins/index'
export default {
  name: 'RmaConvertModal',
  mixins: [mixin, indexMixin],
  components: {
  },
  computed: {
    ...mapState(['createCode'])
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
      paymentTypeId: 0,
      paymentPeriod: 0,
      fields: [
        {
          key: 'ItemCode',
          label: this.$t('index.Convert.ItemCode'),
          sortable: true
        },
        {
          key: 'Item',
          label: this.$t('index.Convert.Item'),
          sortable: true
        },
        {
          key: 'TransformQuantity',
          label: this.$t('index.Convert.TransformQuantity'),
          sortable: true
        },
        {
          key: 'Price',
          label: this.$t('index.Convert.Amount'),
          sortable: true
        },
        {
          key: 'UsedQuantity',
          label: this.$t('index.Convert.quantity'),
          sortable: true
        },
        {
          key: 'TotalAmount',
          label: this.$t('index.Convert.TotalAmount'),
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
  methods: {
    show () {
      this.tableBusy = true
      this.orderLines = []
      this.getCustomer()
      this.getCode()
      this.getConvert()
    },
    hide () {
      this.orderLines = []
      this.form = {
        InvoiceKindId: null,
        Code: null,
        DocumentNumber: null
      }
      this.invoiceType = null
      this.documentType = null
      this.warehouse = null
      this.$v.form.$reset()
    },
    calculatedQuantity (item) {
      return this.roundNumber(item.Price * item.UsedQuantity)
    },
    getCustomer () {
      this.$api.postByUrl({RecordId: this.modalItem.CustomerId}, 'VisionNextCustomer/api/Customer/Get').then((res) => {
        if (res.Model) {
          this.invoiceTypes = this.getOrderInvoiceTypes(res.Model.SalesDocumentTypeId, 'Rma')
          this.paymentTypeId = res.Model.DefaultPaymentType ? res.Model.DefaultPaymentTypeId : 0
          this.paymentPeriod = res.Model.PaymentPeriod ? res.Model.PaymentPeriod : 0
        }
      })
    },
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextInvoice/api/InvoiceBase/GetCode`})
    },
    getConvert () {
      let request = {
        'RmaId': this.modalItem.RecordId,
        'CurrencyId': 1
      }
      this.$api.postByUrl(request, 'VisionNextRma/api/Rma/RmaTransformDocumentSearch').then((response) => {
        this.orderLines = response.ListModel.BaseModels
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
      this.$root.$emit('bv::hide::modal', 'rmaConvertModal')
    },
    selectedWarehouse (e) {
      if (e) {
        this.warehouse = e.RecordId
      } else {
        this.warehouse = null
      }
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
        if (item.UsedQuantity > 0) {
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
      let filteredList = this.orderLines.filter(o => o.UsedQuantity && parseFloat(o.UsedQuantity) > parseFloat(o.TransformQuantity))
      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('index.Convert.rmaConvertQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      let request = {
        'rmaId': this.modalItem.RecordId,
        'currencyId': 1,
        'invoiceClassId': this.form.InvoiceKindId,
        'invoiceNumber': this.form.Code,
        'documentNumber': this.form.DocumentNumber,
        'wareHouseId': this.warehouse,
        'paymentTypeId': this.paymentTypeId,
        'paymentPeriodId': this.paymentPeriod,
        'rmaTransformDocumentResponses': this.orderLines
      }
      this.$api.postByUrl(request, 'VisionNextRma/api/Rma/RmaTransformDocument').then((res) => {
        if (res.IsCompleted === true) {
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          setTimeout(() => {
            this.$router.go()
          }, 1000)
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
