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
      <b-row class="mt-2">
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
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.Code')" md="4" lg="4">
          <b-form-input type="text" v-model="form.Code" readonly />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceKindId')" :error="$v.form.InvoiceTypeId" :required="false" md="4" lg="4">
          <v-select v-model="invoiceType" :options="invoiceTypes" label="label" @input="selectedType('InvoiceTypeId', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.Warehouse')" md="4" lg="4">
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
        Code: null,
        DocumentNumber: null,
        Warehouse: null,
        InvoiceTypeId: null
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
          key: 'NetPrice',
          label: this.$t('index.PurchaseReturnInvoice.NetPrice'),
          sortable: true
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        InvoiceTypeId: {
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
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'purchaseReturnInvoiceRmaApproveModal')
    },
    search () {
      this.$store.state.BranchId = 1
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
      this.$store.state.BranchId = 6
      let request = {
        'recordId': item[0].RecordId
      }
      this.$api.postByUrl(request, 'VisionNextRma/api/Rma/Get').then((res) => {
        if (res.IsCompleted) {
          this.rmaLines = res.Model.RmaLines
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
      if (this.form.documentDate) {
        this.getConvertData.DocumentDate = this.dateConvertToISo(this.form.documentDate)
      }
      let request = {
        'recordId': this.modalItem.RecordId,
        'orderConvertModel': this.getConvertData
      }
      this.$api.postByUrl(request, 'VisionNextOrder/api/Order/ConvertOrder').then((res) => {
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
