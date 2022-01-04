<template>
  <b-modal class="modalZIndex" v-if="modalAction" :id="id" ref="'purchase-invoice-convert-modal'" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.SupplierId')" md="3" lg="3">
          <NextDropdown v-model="supplier" url="VisionNextBranch/api/Branch/AutoCompleteSearch" searchable/>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceNumber')" md="3" lg="3">
          <NextInput type="text" v-model="invoiceNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="3" lg="3">
          <NextInput type="text" v-model="documentNumber" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            id="convert-list"
            :items="list"
            :fields="fields"
            sticky-header
            select-mode="single"
            @row-selected="onRowSelected"
            selectable
            :busy="tableBusy"
            :current-page="currentPage"
            :per-page="10"
          >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
            <template #row-details>
              <b-row>
                <NextFormGroup :title="$t('index.Convert.WarehouseId')" md="3" lg="3">
                  <NextDropdown v-model="warehouse" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" :dynamic-and-condition="{IsVehicle: 0}"/>
                </NextFormGroup>
              </b-row>
              <b-table
                id="convert-detail-list"
                :items="form.InvoiceLines"
                :fields="detailFields"
                sticky-header
              >
                <template #head()="data">
                  {{$t(data.label)}}
                </template>
                <template #cell(RejectedQuantity)="data">
                  <NextInput type="number" v-model="data.item.RejectedQuantity" />
                </template>
              </b-table>
            </template>
          </b-table>
          <b-pagination
            :total-rows="list ? list.length : 0"
            v-model="currentPage"
            :per-page="10"
            aria-controls="convert-list"
          ></b-pagination>
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
          <i class="fa fa-search mr-1"></i>{{$t('index.Convert.find')}}</b-button>
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
  name: 'PurchaseInvoiceConvertModal',
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
    },
    id: {
      type: String,
      default: 'convertModal'
    },
    listUrl: '',
    detailUrl: '',
    convertUrl: ''
  },
  data () {
    return {
      form: {},
      list: [],
      selectedItem: {},
      showLoading: false,
      supplier: null,
      warehouse: null,
      invoiceNumber: null,
      documentNumber: null,
      tableBusy: false,
      representativeId: null,
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
      ],
      currentPage: 1,
      detailFields: [
        {
          key: 'Item.Code',
          label: this.$t('index.Convert.ItemCode')
        },
        {
          key: 'Item.Label',
          label: this.$t('index.Convert.ItemName')
        },
        {
          key: 'Quantity',
          label: this.$t('index.Convert.InvoiceLineQuantity')
        },
        {
          key: 'RejectedQuantity',
          label: this.$t('index.Convert.RejectedQuantity')
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
        this.supplier = null
        this.warehouse = null
        this.documentNumber = null
        this.invoiceNumber = null
        this.representativeId = null
        this.getUserInfo()
      }
    })
  },
  methods: {
    getList () {
      this.form = {}
      this.list = []
      let request = {
        andConditionModel: {
          documentNumber: this.documentNumber ? this.documentNumber : '',
          invoiceNumber: this.invoiceNumber ? this.invoiceNumber : '',
          selectedBranchId: this.supplier ? this.supplier.RecordId : null
        }
      }
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, this.listUrl).then((response) => {
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
        for (const listItem of this.list) {
          this.$set(listItem, '_showDetails', false)
        }
        this.$set(this.selectedItem, '_showDetails', !this.selectedItem._showDetails)

        this.$api.postByUrl({recordId: this.selectedItem.RecordId}, this.detailUrl).then((response) => {
          this.form = response.InvoiceLiteModel
          this.form.InvoiceLines = this.form.InvoiceLines.map(item => {
            item.RejectedQuantity = 0
            return item
          })
        })
      }
    },
    submitModal () {
      if (!this.warehouse) {
        this.$toasted.show(this.$t('index.Convert.warehouseRequired'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }

      let request = {
        warehouseId: this.warehouse.RecordId,
        recordId: this.selectedItem.RecordId,
        representativeId: this.representativeId,
        invoiceLiteModel: this.form
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, this.convertUrl).then((response) => {
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
    },
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.representativeId = user.EmployeeId
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.modalZIndex {
  z-index: 100;
}
</style>
