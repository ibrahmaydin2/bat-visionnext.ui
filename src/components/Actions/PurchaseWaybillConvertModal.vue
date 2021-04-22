<template>
  <b-modal v-if="modalAction" id="purchaseWaybillConvertModal" ref="purchase-waybill-convert-modal'" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <b-col>
          <b-table
            :items="purchaseWaybillList"
            :fields="fields"
            sticky-header
            selection-mode="single"
            @row-selected="onRowSelected"
            selectable
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
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
          @click="getPurchaseWaybills">
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
  name: 'PurchaseWaybillConvertModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([])
  },
  props: {
    modalAction: {
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
      form: {},
      purchaseWaybillList: [],
      selectedItem: {},
      showLoading: false,
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
          key: 'DocumentNumber',
          label: this.$t('index.Convert.documentNumber'),
          sortable: true
        },
        {
          key: 'DocumentDate',
          label: this.$t('index.Convert.documentDate'),
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
        }
      ]
    }
  },
  mounted () {
    this.purchaseWaybillList = []
    this.form = {}
    this.selectedItem = {}
    this.showLoading = false
  },
  methods: {
    getPurchaseWaybills () {
      this.form = {}
      this.purchaseWaybillList = []
      this.$api.postByUrl({documentNumber: '', invoiceNumber: '', SelectedBranchId: null}, 'VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceSearch').then((response) => {
        if (response.ListModel) {
          this.purchaseWaybillList = response.ListModel.BaseModels
        }
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'purchaseWaybillConvertModal')
    },
    onRowSelected (items) {
      this.form = {}
      this.selectedItem = {}
      if (items && items.length > 0) {
        this.selectedItem = items[0]
        this.$api.postByUrl({recordId: this.selectedItem.RecordId}, 'VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceDetail').then((response) => {
          this.form = response.InvoiceLiteModel
        })
      }
    },
    submitModal () {
      let request = {
        warehouseId: this.selectedItem.warehouseId,
        recordId: this.selectedItem.RecordId,
        invoiceLiteModel: this.form
      }
      this.showLoading = true
      this.$api.postByUrl(request, 'VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceConvert').then((response) => {
        this.form = {}
        this.selectedItem = {}
        this.showLoading = false
        this.purchaseWaybillList = []
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('index.Convert.successPurchaseWaybill'), { type: 'success', keepOnHover: true, duration: '3000' })
        } else {
          this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      })
    }
  }
}
</script>
