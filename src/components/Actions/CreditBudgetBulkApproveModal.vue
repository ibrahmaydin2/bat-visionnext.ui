<template>
  <b-modal v-if="modalAction" id="credit-budget-bulk-approve-modal" @show="show" :title="modalAction.Title" :size="size" hide-footer no-close-on-backdrop>
    <section>
      <div v-if="(!modalOptions || modalOptions.length === 0) && (!items || items.length === 0)">
        <b-row>
          <NextFormGroup :title="$t('insert.creditBudget.customer')" md="8" lg="8">
            <b-form-input type="text" :placeholder="$t('insert.creditBudget.searchustomer')" @input="filterList" />
          </NextFormGroup>
        </b-row>
        <b-table
          :items="filteredCustomerGuarantees"
          :fields="customerGuaranteeFields"
          select-mode="multi"
          responsive
          id="customer-guarantees"
          selectable
          bordered
          tbody-tr-class="bg-white"
          @row-selected="onRowSelected"
        >
        <template #cell(selection)="row">
          <span>
            <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
          </span>
        </template>
      </b-table>
      </div>
      <b-row v-if="modalOptions.length > 0 || items.length > 0" >
         <NextFormGroup :title="$t('insert.creditBudget.approveState')" md="8" lg="8">
            <v-select :options="modalOptions" v-model="selectedModalOption" label="Label" />
          </NextFormGroup>
      </b-row>
      <b-row class="mt-3">
        <div class="w-100 text-right mr-3">
          <b-button
            variant="danger"
            size="sm"
            @click="closeModal()"
          >
            {{$t('index.close')}}
          </b-button>
          <b-button
            v-if="(!modalOptions || modalOptions.length === 0) && (!items || items.length === 0)"
            :disabled="!selectedItems || selectedItems.length === 0"
            variant="primary"
            size="sm"
            @click="getWorkFlows()"
          >
          <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('insert.creditBudget.approve')}}</span>
          </b-button>
          <b-button
            v-if="modalOptions.length > 0 || items.length > 0"
            variant="primary"
            size="sm"
            @click="approve()"
          >
            <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('insert.creditBudget.approve')}}</span>
          </b-button>
        </div>
      </b-row>
    </section>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/helper'
export default {
  name: 'CreditBudgetBulkApproveModal.vue',
  mixins: [mixin],
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    recordIds: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  data () {
    return {
      model: {},
      isLoading: false,
      customerGuarantees: [],
      filteredCustomerGuarantees: [],
      selectedItems: [],
      workFlowId: 0,
      workFlowOperationId: null,
      modalOptions: [],
      selectedModalOption: null,
      customerGuaranteeFields: [
        {key: 'selection', label: '', sortable: false},
        {key: 'AppStatus', label: this.$t('insert.creditBudget.status'), sortable: false},
        {key: 'CustomerDesc', label: this.$t('insert.creditBudget.customer'), sortable: false},
        {key: 'CreditLimit', label: this.$t('insert.creditBudget.creditLimit'), sortable: false},
        {key: 'RiskLimit', label: this.$t('insert.creditBudget.riskLimit'), sortable: false},
        {key: 'CurrentCredit', label: this.$t('insert.creditBudget.currentCredit'), sortable: false},
        {key: 'CurrentRisk', label: this.$t('insert.creditBudget.currentRisk'), sortable: false},
        {key: 'CreditAccountRemainder', label: this.$t('insert.creditBudget.creditAccountRemainder'), sortable: false},
        {key: 'DebitAccountRemainder', label: this.$t('insert.creditBudget.debitAccountRemainder'), sortable: false},
        {key: 'CreditAmount', label: this.$t('insert.creditBudget.creditAmount'), sortable: false},
        {key: 'Amount', label: this.$t('insert.creditBudget.amount'), sortable: false},
        {key: 'PaymentPeriod', label: this.$t('insert.creditBudget.paymentPeriod'), sortable: false}
      ]
    }
  },
  methods: {
    show () {
      this.isLoading = false
      this.customerGuarantees = []
      this.filteredCustomerGuarantees = []
      this.selectedItems = []
      this.workFlowId = 0
      this.modalOptions = []
      this.selectedModalOption = null
      if (this.items && this.items.length > 0) {
        this.selectedItems = this.items
        this.getWorkFlows()
      } else {
        this.getCustomerGuarantees()
      }
    },
    onRowSelected (items) {
      this.selectedItems = items
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'credit-budget-bulk-approve-modal')
    },
    getCustomerGuarantees () {
      if (this.recordIds && this.recordIds.length === 1) {
        this.$api.postByUrl({RecordId: this.recordIds[0]}, 'VisionNextBudget/api/CreditBudget/Get').then((response) => {
          if (response.Model && response.Model.CustomerGuarantees && response.Model.CustomerGuarantees.length > 0) {
            this.customerGuarantees = response.Model.CustomerGuarantees.filter(c => c.ApproveStateId === 51)
            this.filteredCustomerGuarantees = this.customerGuarantees
            this.$forceUpdate()
          }
        })
      }
    },
    filterList (search) {
      if (!search || search.length === 0) {
        this.filteredCustomerGuarantees = this.customerGuarantees
        return
      }
      search = search.toLocaleLowerCase()
      this.filteredCustomerGuarantees = this.customerGuarantees.filter(c => c.CustomerDesc.toLocaleLowerCase().includes(search) || c.CustomerCode.toLocaleLowerCase().includes(search))
      this.$forceUpdate()
    },
    approve () {
      if (!this.selectedModalOption) {
        this.$toasted.show(this.$t('insert.pleaseChooseField'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        'WorkflowOperationId': this.workFlowOperationId,
        'InfoText': 'Toplu Bütçe Onay',
        'WorkflowId': this.workFlowId,
        'RecordIds': this.selectedItems.map(s => s.CreditBudgetDetailId)

      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.post(request, 'Workflow', 'Workflow/ProcessMultipleWorkflow').then((res) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (!res.IsCompleted) {
          this.$toasted.show(res.Message, {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.$toasted.show(this.$t('insert.workflowSuccess'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
        this.closeModal()
      })
    },
    getWorkFlows () {
      let request = {
        'ControllerName': 'CreditBudget',
        'ClassName': 'CreditBudgetDetail',
        'PageName': 'pg_CreditBudget'
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.post(request, 'Workflow', 'Workflow/GetWorkflowList').then((res) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        let workFlowId = res.ListModel.BaseModels ? res.ListModel.BaseModels[0].RecordId : 0
        if (workFlowId > 0) {
          this.getWorkFlowProcessModel(workFlowId)
        } else {
          this.$toasted.show(this.$t('insert.errorProcess'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    getWorkFlowProcessModel (workFlowId) {
      this.workFlowId = workFlowId
      let request = {
        'WorkflowId': workFlowId,
        'RecordIds': this.selectedItems.map(s => s.CreditBudgetDetailId)
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.post(request, 'Workflow', 'Workflow/GetMultipleWorkflowProcessModel').then((res) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (!res.ProcessModel || res.ProcessModel.OperationProcessModel.length < 1) {
          this.$toasted.show(this.$t('insert.errorProcess'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        res.ProcessModel.OperationProcessModel.map(process => {
          this.workFlowOperationId = process.RecordId
          this.modalOptions.push({
            Id: process.RecordId,
            Label: process.ToValue.Label
          })
        })
      })
    }
  }
}
</script>
<style scoped>
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
</style>
