<template>
  <b-modal v-if="modalAction" id="purchaseReturnInvoiceRmaApproveModal" ref="purchase-return-invoice-rma-approve-modal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
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
        <NextFormGroup :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.DocumentClassId" :required="false" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="label" @input="selectedType('DocumentClassId', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4" :error="$v.form.Warehouse">
          <NextDropdown
            url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
            @input="selectedWarehouse"
            :searchable="true"
            :custom-option="true"
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
import mixin from '../../mixins/helper'
export default {
  name: 'PurchaseReturnInvoiceRmaApproveModal',
  mixins: [mixin],
  components: {
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
      approveNumber: null,
      form: {
        InvoiceNumber: null,
        DocumentNumber: null,
        Warehouse: null,
        DocumentClassId: null
      },
      invoiceType: null,
      invoiceTypes: [],
      invoiceLines: [],
      rmaLines: [],
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
        }
      ],
      showInvoiceLines: false,
      showRmaLines: false,
      rmaDetail: []
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
        Warehouse: {
          required
        }
      }
    }
  },
  methods: {
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
    selectedWarehouse (e) {
      if (e) {
        this.form.Warehouse = e.RecordId
      } else {
        this.form.Warehouse = null
      }
    },
    closeModal () {
      this.close()
    },
    close () {
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
      this.$api.postByUrl(request, 'VisionNextInvoice/api/PurchaseReturnInvoice/ReceiveRma').then((res) => {
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
    onRowSelected (item) {
      this.showRmaLines = false
      let request = {
        'recordId': item[0].RecordId
      }
      this.$api.postByUrl(request, 'VisionNextInvoice/api/PurchaseReturnInvoice/ReceiveRmaDetail').then((res) => {
        if (res.IsCompleted) {
          this.$api.postByUrl({}, 'VisionNextInvoice/api/PurchaseReturnInvoice/GetCode').then((res) => {
            this.form.InvoiceNumber = res.Model.Code
          })
          this.invoiceTypes = this.getInvoiceClassTypes()
          this.rmaLines = res.Model.RmaLines
          this.rmaDetail = res.Model
          this.showRmaLines = true
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
      this.rmaDetail.WarehouseId = this.form.Warehouse
      this.rmaDetail.DocumentClassId = this.form.DocumentClassId
      this.rmaDetail.RmaLines = this.rmaLines
      let request = {
        model: this.rmaDetail
      }
      this.$api.postByUrl(request, 'VisionNextInvoice/api/PurchaseReturnWaybill/ReceiveRmaAprrove').then((res) => {
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
    }
  }
}
</script>
<style>
.v-none {
  visibility: none !important;
}
</style>
