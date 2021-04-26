<template>
  <b-modal class="modalZIndex" v-if="modalAction" :id="id" :title="modalAction.Title" size="xl" no-close-on-backdrop>
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
            sticky-header
            selection-mode="single"
            @row-selected="onRowSelected"
            selectable
            :busy="tableBusy"
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
        }
      ]
    }
  },
  mounted () {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === this.id) {
        this.list = []
        this.form = {}
        this.selectedItem = {}
        this.showLoading = false
        this.documentNumber = null
      }
    })
  },
  methods: {
    getList () {
      this.form = {}
      this.list = []
      let request = {
        documentNumber: this.documentNumber ? this.documentNumber : ''
      }
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, 'VisionNextInvoice/api/SalesReturnInvoice/SalesReturnInvoiceConvertSearch').then((response) => {
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
        this.$api.postByUrl({recordId: this.selectedItem.RecordId}, 'VisionNextInvoice/api/SalesReturnInvoice/SalesReturnInvoiceConvertDetail').then((response) => {
          this.form = response.InvoiceLiteModel
        })
      }
    },
    submitModal () {
      let request = {
        documentNumber: this.selectedItem.DocumentNumber,
        warehouseId: this.selectedItem.WarehouseId,
        recordId: this.selectedItem.RecordId,
        invoiceLiteModel: this.form
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextInvoice/api/SalesReturnInvoice/ReceiveInvoiceConvert').then((response) => {
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
</style>
