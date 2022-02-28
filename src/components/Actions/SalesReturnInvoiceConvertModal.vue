<template>
  <b-modal @show="show" class="modalZIndex" v-if="modalAction" :id="id" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="documentNumber" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            :items="list"
            :fields="fields"
            sticky-header="700px"
            select-mode="single"
            @row-selected="onRowSelected"
            selectable
            :busy="tableBusy"
          >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
            <template #cell(show_details)="row">
              <div>
                <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success" :disabled="!row.rowSelected">
                  <i class="fa fa-arrow-down"></i>
                </b-button>
              </div>
           </template>
            <template #row-details>
              <div class="sales-return-invoice-convert">
                <b-row>
                  <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4">
                    <NextInput v-model="selectedItem.InvoiceNumber" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('index.Convert.WarehouseId')" md="4" lg="4">
                    <NextDropdown v-model="warehouse" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable/>
                  </NextFormGroup>
                  <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
                    <NextInput v-model="selectedItem.DocumentNumber" />
                  </NextFormGroup>
              </b-row>
              <b-table
                id="convert-detail-list"
                :items="form.InvoiceLines"
                :fields="detailFields"
                sticky-header="500px"
              >
                <template #head()="data">
                  {{$t(data.label)}}
                </template>
                <template #cell(SalesQuantity1)="data">
                  <NextInput ref="NextTextInput" type="number" v-model="data.item.SalesQuantity1" :input-class="!data.item.UsedQuantity || data.item.UsedQuantity < 1 || data.item.UsedQuantity < data.item.SalesQuantity1 ? 'error' : ''" />
                </template>
              </b-table>
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
          id="findButton"
          size="sm"
          variant="success"
          @click="getList">
          <i class="fa fa-search"></i>{{$t('index.Convert.find')}}</b-button>
        <b-button
          :disabled="!form || !form.RecordId  || form.RecordId === 0"
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
          <b-spinner v-if="showLoading" small variant="primary"></b-spinner>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'SalesReturnInvoiceConvertModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    openModal: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'Invoice',
      description: 'Fatura Tipi (Invoice, Waybill)'
    }
  },
  data () {
    return {
      form: {},
      list: [],
      id: 'salesReturnInvoiceConvertModal',
      selectedItem: {},
      showLoading: false,
      documentNumber: null,
      tableBusy: false,
      fields: [
        {
          key: 'Customer.Label',
          label: this.$t('index.Convert.customer'),
          sortable: true
        },
        {
          key: 'Branch.Label',
          label: this.$t('index.Convert.branch'),
          sortable: true
        },
        {
          key: 'InvoiceNumber',
          label: this.$t('index.Convert.InvoiceNumber'),
          sortable: true
        },
        {
          key: 'DocumentNumber',
          label: this.$t('index.Convert.DocumentNumber'),
          sortable: true
        },
        {
          key: 'DocumentDate',
          label: this.$t('index.Convert.DocumentDate'),
          sortable: true,
          formatter: (value, key, item) => {
            return this.dateConvertFromTimezone(item.DocumentDate)
          }
        },
        {
          key: 'TotalVat',
          label: this.$t('index.Convert.totalVat'),
          sortable: true
        },
        {
          key: 'NetTotal',
          label: this.$t('index.Convert.netTotal'),
          sortable: true
        },
        {
          key: 'GrossTotal',
          label: this.$t('index.Convert.grossTotal'),
          sortable: true
        },
        {
          key: 'show_details',
          label: this.$t('index.Convert.Details')
        }
      ],
      detailFields: [
        {
          key: 'Item.Code',
          label: this.$t('index.Convert.ItemCode'),
          sortable: true
        },
        {
          key: 'Item.Label',
          label: this.$t('index.Convert.Item'),
          sortable: true
        },
        {
          key: 'Stock',
          label: this.$t('index.Convert.Stock'),
          sortable: true
        },
        {
          key: 'UsedQuantity',
          label: this.$t('index.Convert.TransformQuantity'),
          sortable: true
        },
        {
          key: 'SalesQuantity1',
          label: this.$t('index.Convert.ReturnQuantity1'),
          sortable: true
        },
        {
          key: 'Quantity',
          label: this.$t('index.Convert.ReturnQuantity'),
          sortable: true
        },
        {
          key: 'Price',
          label: this.$t('index.Convert.Price'),
          sortable: true
        }
      ],
      warehouse: null
    }
  },
  methods: {
    show () {
      this.list = []
      this.form = {}
      this.selectedItem = {}
      this.showLoading = false
      this.documentNumber = null
    },
    getList () {
      this.form = {}
      this.list = []
      let request = {
        documentNumber: this.documentNumber ? this.documentNumber : ''
      }
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, `VisionNextInvoice/api/SalesReturn${this.type}/SalesReturn${this.type}ConvertSearch`).then((response) => {
        this.tableBusy = false
        this.$store.commit('setDisabledLoading', false)
        if (response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
          this.list = response.ListModel.BaseModels
        } else {
          this.$toasted.show(this.$t('general.noRecord'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', this.id)
    },
    onRowSelected (items) {
      this.form = {}
      this.selectedItem = {}
      if (items && items.length > 0) {
        this.selectedItem = items[0]
        this.getWarehouse(this.selectedItem.WarehouseId)
        this.getCode()
        let api = this.type === 'Invoice' ? 'VisionNextInvoice/api/SalesReturnInvoice/SalesReturnInvoiceConvertDetail' : 'VisionNextInvoice/api/SalesReturnWaybill/ReceiveInvoiceDetail'
        this.$api.postByUrl({recordId: this.selectedItem.RecordId}, api).then((response) => {
          this.form = response.InvoiceLiteModel
        })
      }
    },
    getWarehouse (id) {
      let request = {
        RecordId: id
      }
      this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/Get').then((response) => {
        if (response.Model) {
          this.warehouse = {
            RecordId: response.Model.RecordId,
            Description1: response.Model.Description1
          }
        }
      })
    },
    getCode () {
      this.$api.postByUrl({}, `VisionNextInvoice/api/SalesReturn${this.type}/GetCode`).then(response => {
        if (response.Model) {
          this.selectedItem.InvoiceNumber = response.Model.Code
        }
      })
    },
    submitModal () {
      if (this.$refs.NextTextInput && this.$refs.NextTextInput.inputClass === 'error') {
        this.$toasted.show(this.$t('index.Convert.StockException'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      } else if (this.$refs.NextTextInput && this.$refs.NextTextInput.length > 0 && this.$refs.NextTextInput.some(a => a.inputClass === 'error')) {
        this.$toasted.show(this.$t('index.Convert.StockException'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      let request = {
        invoiceNumber: this.selectedItem.InvoiceNumber,
        documentNumber: this.selectedItem.DocumentNumber,
        warehouseId: this.warehouse ? this.warehouse.RecordId : null,
        recordId: this.selectedItem.RecordId,
        invoiceLiteModel: this.form
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      let api = this.type === 'Invoice' ? 'VisionNextInvoice/api/SalesReturnInvoice/SalesReturnInvoiceConvert' : 'VisionNextInvoice/api/SalesReturnWaybill/ReceiveInvoiceConvert'
      this.$api.postByUrl(request, api).then((response) => {
        this.$store.commit('setDisabledLoading', false)
        this.form = {}
        this.selectedItem = {}
        this.showLoading = false
        this.list = []
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('index.Convert.successConvert'), { type: 'success', keepOnHover: true, duration: '3000' })
        } else {
          if (response.Validations && response.Validations.Errors && response.Validations.Errors.length > 0) {
            response.Validations.Errors.forEach(item => {
              if (item.States && item.States.length > 0) {
                item.States.forEach(state => {
                  this.$toasted.show(decodeURIComponent(state), { type: 'error', keepOnHover: true, duration: '3000' })
                })
              } else {
                this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
              }
            })
          } else {
            this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.modalZIndex {
  z-index: 100;
}
.sales-return-invoice-convert {
  background: rgb(199, 197, 197);
  border-radius: 10px;
  padding: 20px;
}
.error, .error input {
  border-color: red;
  border-width: 2px;
}
</style>
<style>
.sales-return-invoice-convert table tbody tr {
  background: white !important;
}
</style>
