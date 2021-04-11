<template>
  <b-modal v-if="modalAction" id="multiplePaymentChangeModal" :title="modalAction.Title" size="xl" hide-footer no-close-on-backdrop>
    <b-container>
      <b-row>
        <NextFormGroup :title="$t('insert.customer.CustomerPaymentTypes')" :error="$v.TypeId" md="6" lg="6">
          <NextDropdown url="VisionNextCommonApi/api/PaymentType/Search" @input="selectedSearchType('TypeId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('get.terminal.OperationType')" :error="$v.OperationTypeId" md="6" lg="6">
          <v-select :options="[{label: $t('insert.add'), RecordId: 1}, {label: $t('index.remove'), RecordId: 0}]" @input="selectedSearchType('OperationTypeId', $event)"></v-select>
        </NextFormGroup>
      </b-row>
      <b-row class="text-right">
        <b-col class="text-left">
          <b-button @click="selectAllRows" size="sm" variant="info">{{$t('index.selectAll')}}</b-button>
          <b-button @click="clearSelected" size="sm" variant="danger">{{$t('index.clean')}}</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button @click="control" size="sm" variant="warning">{{$t('insert.customer.control')}}</b-button>
          <b-button @click="save" size="sm" variant="success">{{$t('list.save')}}</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="6">
          <b-table
            :items="successCustomerList"
            select-mode="multi"
            selectable
            :fields="fields"
            sticky-header
            :tbody-tr-class="rowClass"
            :busy="tableBusy"
            ref="selectableTable"
            @row-selected="onRowSelected"
          >
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <b><span aria-hidden="true">&check;</span></b>
              </template>
              <template v-else>
                <b><span aria-hidden="true">&nbsp;</span></b>
              </template>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
        </b-col>
        <b-col cols="6">
          <b-table
            :items="errorCustomerList"
            :fields="fields"
            sticky-header
            :tbody-tr-class="rowClass"
            :busy="tableBusy"
          >
            <!-- <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template> -->
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'MultiplePaymentChangeModal',
  computed: {
    successCustomerList () {
      return this.customerList.filter(i => i.Status === true)
    },
    errorCustomerList () {
      return this.customerList.filter(i => i.Status === false)
    }
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    recordIds: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      TypeId: null,
      OperationTypeId: null,
      customerList: [],
      selectedItems: [],
      tableBusy: false,
      fields: [
        {
          key: 'selected',
          label: '',
          sortable: false,
          tdClass: 'w-10'
        },
        {
          key: 'Code',
          label: this.$t('insert.customer.modalCode'),
          sortable: true,
          tdClass: 'w-25'
        },
        {
          key: 'Description1',
          label: this.$t('insert.customer.modalDescription'),
          sortable: true,
          tdClass: 'w-100'
        }
      ]
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.TypeId = null
      this.OperationTypeId = null
      this.customerList = []
      this.selectedItems = []
      this.tableBusy = false
      this.$v.$reset()
    })
  },
  validations () {
    return {
      TypeId: {
        required
      },
      OperationTypeId: {
        required
      }
    }
  },
  methods: {
    control () {
      this.customerList = []
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.tableBusy = true
      let request = {
        'AndConditionModel': {
          'CustomerIds': this.recordIds,
          'PaymentTypeIds': [this.TypeId]
        }
      }
      let customerRequest = {
        'AndConditionModel': {
          'RecordIds': this.recordIds
        }
      }

      this.$api.postByUrl(customerRequest, 'VisionNextCustomer/api/Customer/Search').then((res) => {
        this.tableBusy = false
        if (res.ListModel.BaseModels.length > 0) {
          this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerPaymentType/Search').then((response) => {
            res.ListModel.BaseModels.map(customer => {
              let status = false
              let isSuccess = false
              if (response.ListModel.BaseModels.length > 0) {
                response.ListModel.BaseModels.map(customerPayment => {
                  if (customer.RecordId === customerPayment.CustomerId) {
                    isSuccess = true
                    if (this.OperationTypeId) {
                      status = false
                    } else {
                      status = true
                    }
                  }
                })
              }
              if (!isSuccess) {
                if (this.OperationTypeId) {
                  status = true
                } else {
                  status = false
                }
              }
              this.customerList.push({
                Id: customer.RecordId,
                Code: customer.Code,
                Status: status,
                CommercialTitle: customer.CommercialTitle,
                Description1: customer.Description1,
                DefaultPaymentType: customer.DefaultPaymentType && customer.DefaultPaymentType.Label
              })
            })
          })
        } else {
          this.$toasted.show(this.$t('index.customerNotFound'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
      this.selectAllRows()
    },
    selectAllRows () {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected () {
      this.$refs.selectableTable.clearSelected()
    },
    save () {
      if (this.selectedItems.length < 1) {
        this.$toasted.show(this.$t('index.pleaseChooseCustomer'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      if (this.OperationTypeId === null) {
        this.$toasted.show(this.$t('index.pleaseChooseOperationType'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      const recordIds = this.selectedItems.map(i => i.Id)
      let request = {
        'recordIds': recordIds,
        'model': {
          'paymetTypeId': this.TypeId,
          'added': !!(this.OperationTypeId),
          'removed': (!this.OperationTypeId)
        }
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerPaymentType/BatchChangePaymentType').then((response) => {
        if (response.IsCompleted === true) {
          this.$toasted.show(this.$t('index.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          this.control()
        } else {
          this.$toasted.show(response.Message, {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    selectedSearchType (label, model) {
      this.customerList = []
      if (model) {
        this[label] = model.RecordId
      } else {
        this[label] = null
      }
      if (this.TypeId !== null && this.OperationTypeId !== null) {
        this.control()
      }
    },
    onRowSelected (item) {
      this.selectedItems = item
    },
    rowClass (item, type) {
      if (!item || type !== 'row') return
      let status = (item.Status === true) ? 'table-success' : 'table-danger'
      return status
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'multiplePaymentChangeModal')
    }
  }
}
</script>
<style>
  .table.b-table > tbody > .table-active {
    background-color: #c3e6cb !important;
  }
  .w-10 {
    width: 10% !important;
  }
</style>
