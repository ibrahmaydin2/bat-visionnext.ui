<template>
  <b-modal v-if="modalAction" id="purchaseReturnInvoiceRmaApproveModal" @close="closed" ref="purchase-return-invoice-rma-approve-modal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.PurchaseReturnInvoice.ApproveNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="approveNumber" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button
            variant="primary"
            size="sm"
            @click="search()"
          >
            {{$t('index.search')}}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2" v-if="showInvoiceLines">
        <b-col>
          <b-table
            v-if="invoiceLines"
            :items="invoiceLines"
            :fields="fields"
            sticky-header
            :busy="tableBusy"
            select-mode="single"
            selectable
            @row-selected="onRowSelected"
          >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </section>
    <section v-if="showRmaLines">
      <b-row>
        <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4" :error="$v.form.InvoiceNumber">
          <b-form-input type="text" v-model="form.InvoiceNumber" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4" :error="$v.form.DocumentNumber">
          <b-form-input type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
        <NextFormGroup v-if="type !== 'Waybill'" :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.DocumentClassId" :required="false" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="label" @input="selectedType('DocumentClassId', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4" :error="$v.form.WarehouseId">
          <NextDropdown
            @input="selectedWarehouse"
            v-model="warehouse"
            :source="warehouses"
            :searchable="true"
            :custom-option="true"
            :disabled="true"
          />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            v-if="rmaLines"
            :items="rmaLines"
            :fields="fieldsRma"
            sticky-header
          >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #cell(UsedQuantity)="row">
              <b-form-input type="number" :min="0" :max="row.item.UsedQuantity" v-model="row.item.UsedQuantity" />
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
import helperMixin from '../../mixins/helper'
import indexMixin from '../../mixins/index'
export default {
  name: 'PurchaseReturnInvoiceRmaApproveModal',
  mixins: [helperMixin, indexMixin],
  components: {
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    modalItem: {
      type: Object,
      default: () => {},
      description: 'Listeden seçilen eleman bilgisi'
    },
    type: {
      type: String,
      default: 'Invoice',
      description: 'Fatura Tipi (Invoice, Waybill)'
    }
  },
  mounted () {
    if (this.type === 'Waybill') {
      this.form.DocumentClassId = 8
    }
    this.getWarehouse()
  },
  data () {
    return {
      approveNumber: null,
      form: {
        InvoiceNumber: null,
        DocumentNumber: null,
        WarehouseId: null,
        DocumentClassId: null
      },
      invoiceType: null,
      invoiceTypes: [],
      invoiceLines: [],
      rmaLines: [],
      warehouses: [],
      tableBusy: false,
      fields: [
        {
          key: 'Customer',
          label: this.$t('index.PurchaseReturnInvoice.Customer'),
          sortable: true,
          formatter: (value, key, item) => {
            return value && value.Label
          }
        },
        {
          key: 'Branch',
          label: this.$t('index.PurchaseReturnInvoice.Branch'),
          sortable: true,
          formatter: (value, key, item) => {
            return value && value.Label
          }
        },
        {
          key: 'ApproveNumber',
          label: this.$t('index.PurchaseReturnInvoice.ApproveNumber'),
          sortable: true
        }
      ],
      fieldsRma: [
        {
          key: 'ItemId',
          label: this.$t('index.PurchaseReturnInvoice.ItemId'),
          sortable: true
        },
        {
          key: 'Item',
          label: this.$t('index.PurchaseReturnInvoice.Item'),
          sortable: true,
          formatter: (value, key, item) => {
            return value && value.Label
          }
        },
        {
          key: 'Quantity',
          label: this.$t('index.PurchaseReturnInvoice.Quantity'),
          sortable: true
        },
        {
          key: 'UsedQuantity',
          label: this.$t('index.PurchaseReturnInvoice.UsedQuantity'),
          sortable: true
        },
        {
          key: 'Price',
          label: this.$t('index.PurchaseReturnInvoice.Price'),
          sortable: true
        },
        {
          key: 'Stock',
          label: this.$t('index.PurchaseReturnInvoice.Stock'),
          sortable: true
        }
      ],
      showInvoiceLines: false,
      showRmaLines: false,
      rmaDetail: [],
      warehouse: null
    }
  },
  validations () {
    return {
      form: {
        DocumentClassId: {
          required
        },
        InvoiceNumber: {
          required
        },
        DocumentNumber: {
          required
        },
        WarehouseId: {
          required
        }
      }
    }
  },
  methods: {
    getWarehouse () {
      let andConditionModel = {
        StatusId: [1],
        IsVehicle: 0
      }
      this.$api.postByUrl({andConditionModel}, 'VisionNextWarehouse/api/Warehouse/AutoCompleteSearch').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.warehouses = response.ListModel.BaseModels
          this.warehouse = response.ListModel.BaseModels[0]
          this.form.WarehouseId = this.warehouse.RecordId
        }
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
    selectedWarehouse (e) {
      if (e) {
        this.form.WarehouseId = e.RecordId
      } else {
        this.form.WarehouseId = null
      }
    },
    closed () {
      this.showRmaLines = false
      this.showInvoiceLines = false
      this.approveNumber = null
      this.invoiceLines = []
    },
    closeModal () {
      this.closed()
      this.$root.$emit('bv::hide::modal', 'purchaseReturnInvoiceRmaApproveModal')
    },
    search () {
      this.showInvoiceLines = false
      this.showRmaLines = false
      this.tableBusy = true
      let request = {}
      if (this.approveNumber) {
        request = {
          approveNumber: this.approveNumber
        }
      }
      this.$api.postByUrl(request, `VisionNextInvoice/api/PurchaseReturn${this.type}/ReceiveRma`).then((res) => {
        this.tableBusy = false
        if (res.IsCompleted) {
          this.invoiceLines = res.ListModel.BaseModels
          this.showInvoiceLines = true
        } else {
          this.$toasted.show(res.Message, {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    onRowSelected (items) {
      if (!items || items.length === 0) { return }

      this.showRmaLines = false
      let request = {
        'recordId': items[0].RecordId
      }
      this.$api.postByUrl(request, `VisionNextInvoice/api/PurchaseReturn${this.type}/ReceiveRmaDetail`).then((res) => {
        if (res.IsCompleted) {
          this.$api.postByUrl({}, `VisionNextInvoice/api/PurchaseReturn${this.type}/GetCode`).then((res) => {
            this.form.InvoiceNumber = res.Model.Code
          })
          this.invoiceTypes = this.getInvoiceClassTypes()
          this.rmaLines = res.Model.RmaLines
          this.BranchId = this.$store.state.BranchId
          this.rmaDetail = res.Model
          this.showRmaLines = true
          setTimeout(() => {
            this.warehouse = this.getWarehouse()
            this.form.WarehouseId = res.Model.WarehouseId
            this.form.DocumentNumber = this.rmaDetail.DocumentNumber
          }, 100)
        } else {
          this.$toasted.show(res.Message, {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
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
      this.rmaLines.map(item => {
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
      this.rmaDetail.InvoiceNumber = this.form.InvoiceNumber
      this.rmaDetail.DocumentNumber = this.form.DocumentNumber
      this.rmaDetail.WarehouseId = this.form.WarehouseId
      this.rmaDetail.DocumentClassId = this.form.DocumentClassId
      this.rmaDetail.RmaLines = this.rmaLines
      let request = {
        model: this.rmaDetail
      }
      this.$api.postByUrl(request, `VisionNextInvoice/api/PurchaseReturn${this.type}/ReceiveRmaAprrove`).then((res) => {
        if (res.IsCompleted === true) {
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          setTimeout(() => {
            this.$store.commit('setReloadGrid', true)
            this.$root.$emit('bv::hide::modal', 'purchaseReturnInvoiceRmaApproveModal')
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
  }
}
</script>
<style>
.v-none {
  visibility: none !important;
}
</style>
