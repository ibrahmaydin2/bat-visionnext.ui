<template>
  <b-modal v-if="modalAction" id="credit-budget-bulk-approve-modal" @show="show" :title="modalAction.Title" :size="size" hide-footer no-close-on-backdrop>
    <section>
      <div v-if="(!modalOptions || modalOptions.length === 0) && (!items || items.length === 0)">
        <b-row>
          <NextFormGroup :title="$t('insert.creditBudget.customer')" md="4" lg="4">
              <NextDropdown
                v-model="selectedCustomer"
                url="VisionNextCustomer/api/Customer/GetBranchesCustomerSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                :disabled="items && items.length > 0"/>
            </NextFormGroup>
        </b-row>
        <b-table
          :items="customerGuarantees"
          :fields="customerGuaranteeFields"
          ref="selectableTable"
          select-mode="multi"
          sticky-header="300px"
          responsive
          selectable
          bordered
          tbody-tr-class="bg-white"
          @row-selected="onRowSelected"
          show-empty
          :current-page="currentPage"
          :per-page="0"
        >
        <template #cell(selection)="row">
          <span>
            <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
          </span>
        </template>
        <template v-slot:head()="data">
            <b-link v-if="data.field.key == 'selection'" variant="white" size="sm" @click="selectAll">
              <span>
                <i :class="allSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
              </span>
            </b-link>
            <span v-else>{{$t(data.field.label)}}</span>
          </template>
        <template #empty>
          <h6 class="text-center">{{$t('insert.creditBudget.customerNotFound')}}</h6>
        </template>
      </b-table>
      <b-pagination
        :total-rows="totalRowCount"
        v-model="currentPage"
        :per-page="perPage"
        aria-controls="customer-guarantees"
      ></b-pagination>
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
    modalItem: {
      type: Object,
      default: () => {}
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
      selectedItems: [],
      workFlowId: 0,
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
        {key: 'PaymentPeriodDesc', label: this.$t('insert.creditBudget.paymentPeriod'), sortable: false}
      ],
      currentPage: 1,
      selectedCustomer: null,
      totalRowCount: 0,
      perPage: 100,
      allSelected: false
    }
  },
  methods: {
    show () {
      this.isLoading = false
      this.customerGuarantees = []
      this.selectedItems = []
      this.workFlowId = 0
      this.modalOptions = []
      this.selectedModalOption = null
      this.perPage = 100
      this.currentPage = 1
      this.selectedCustomer = null
      this.totalRowCount = 0
      this.allSelected = false

      if (this.items && this.items.length > 0) {
        this.selectedItems = this.items
        this.customerGuarantees = this.items
        this.totalRowCount = this.items.length
        this.perPage = this.items.length
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
      if (this.modalItem && this.modalItem.RecordId) {
        let request = {
          andConditionModel: {
            CreditBudgetIds: [ this.modalItem.RecordId ],
            ApprovestateIds: [51],
            CustomerIds: this.selectedCustomer ? [this.selectedCustomer.RecordId] : null
          },
          page: this.currentPage,
          OrderByColumns: [
            {
              column: 'ApprovestateId',
              orderByType: 0
            }
          ]
        }

        this.$api.postByUrl(request, 'VisionNextBudget/api/CreditBudgetDetail/Search', this.perPage).then((response) => {
          if (response && response.ListModel) {
            this.totalRowCount = response.ListModel.TotalRowCount
            this.customerGuarantees = response.ListModel.BaseModels.map(item => {
              let customerGuarantees = item.CustomerGuarantees
              customerGuarantees.RecordId = item.RecordId
              customerGuarantees.CreditBudgetId = item.CreditBudgetId
              customerGuarantees.PaymentPeriodDesc = item.PaymentPeriodDesc
              return customerGuarantees
            })
            this.$forceUpdate()
          }
        })
      }
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
        WorkflowOperationId: this.selectedModalOption.Id,
        InfoText: 'Toplu Bütçe Onay',
        WorkflowId: this.workFlowId,
        RecordIds: this.selectedItems.map(s => s.CreditBudgetDetailId)

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
        this.$emit('success')
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
          this.modalOptions.push({
            Id: process.RecordId,
            Label: process.ToValue.Label
          })
        })
      })
    },
    selectAll () {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected()
      } else {
        this.$refs.selectableTable.selectAllRows()
      }

      this.allSelected = !this.allSelected
    }
  },
  watch: {
    currentPage () {
      this.allSelected = false
      this.getCustomerGuarantees()
    },
    selectedCustomer () {
      this.allSelected = false
      this.currentPage = 1
      this.getCustomerGuarantees()
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
