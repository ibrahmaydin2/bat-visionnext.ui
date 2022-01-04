<template>
  <b-modal id="budget-master-approve-modal" @hide="hide" :title="modalAction.Title" size="lg" hide-footer no-close-on-backdrop>
    <b-row>
      <NextFormGroup :title="$t('insert.budgetMaster.customerCode')" md="4" lg="4">
        <NextInput v-model="model.customerCode" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.customerName')" md="4" lg="4">
        <NextInput v-model="model.customerName" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.campaignCode')" md="4" lg="4">
        <NextInput v-model="model.campaignCode" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.campaignDescription')" md="4" lg="4">
        <NextInput v-model="model.campaignDescription" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.contractCode')" md="4" lg="4">
        <NextInput v-model="model.contractCode" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.contractDescription')" md="4" lg="4">
        <NextInput v-model="model.contractDescription" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.approveState')" md="4" lg="4" :required="false">
        <NextDropdown
          lookup-key="APPROVE_STATE"
          :get-lookup="true"
          @input="setApproveState"
          v-model="approveState"
       />
       </NextFormGroup>
       <b-col cols="12" md="8">
        <b-form-group>
          <b-button
            @click="filter"
            id="searchButton"
            class="mt-4"
            size="sm"
            variant="success"
            :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner></span>
              <span v-else><i class="fa fa-list"> </i> {{$t('insert.budgetMaster.search')}}</span>
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-col cols="12" md="12">
          <b-form-group class="text-right">
            <b-button
              :disabled="!selectedRows || selectedRows.length === 0 || isApproveLoading"
              @click="approveOrReject('approve')" id="approve-button" class="mt-1" size="sm" variant="success">
              <span v-if="isApproveLoading"><b-spinner small></b-spinner></span>
              <i class="fa fa-check"> </i> {{$t('insert.budgetMaster.approve')}}
            </b-button>
            <b-button
              :disabled="!selectedRows || selectedRows.length === 0 || isRejectLoading"
              @click="approveOrReject('reject')" id="reject-button" class="mt-1" size="sm" variant="danger">
              <span v-if="isRejectLoading"><b-spinner small></b-spinner></span>
              <i class="fa fa-times"> </i> {{$t('insert.budgetMaster.reject')}}
            </b-button>
          </b-form-group>
        </b-col>
        <b-table
          id="budget-master-list"
          :fields="budgetMasterFields"
          :items="budgetMasters"
          select-mode="multi"
          responsive
          :selectable="true"
          bordered
          @row-selected="rowSelected"
          :current-page="currentPage"
          :per-page="10">
          <template #head()="data">
            {{$t(data.label)}}
          </template>
          <template #cell(selection)="row">
            <span>
              <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
            </span>
          </template>
        </b-table>
        <b-pagination
          :total-rows="budgetMasters ? budgetMasters.length : 0"
          v-model="currentPage"
          :per-page="10"
          aria-controls="budget-master-list"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  name: 'BudgetMasterApproveModal',
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
      model: {},
      approveState: null,
      isLoading: false,
      isApproveLoading: false,
      isRejectLoading: false,
      currentPage: 1,
      selectedRows: [],
      budgetMasters: [],
      budgetMasterFields: [
        {
          key: 'selection',
          label: ''
        },
        {
          key: 'Code',
          label: this.$t('insert.budgetMaster.code'),
          formatter (value, key, obj) {
            return obj.Contract ? obj.Contract.Code : '-'
          }
        },
        {
          key: 'Description',
          label: this.$t('insert.budgetMaster.budgetDescription'),
          formatter (value, key, obj) {
            return obj.Contract ? obj.Contract.Label : '-'
          }
        },
        {
          key: 'Customer',
          label: this.$t('insert.budgetMaster.customer')
        },
        {
          key: 'BenefitType',
          label: this.$t('insert.budgetMaster.benefitType')
        },
        {
          key: 'TotalAmount',
          label: this.$t('insert.budgetMaster.totalAmount')
        },
        {
          key: 'UsedAmount',
          label: this.$t('insert.budgetMaster.spentAmount')
        },
        {
          key: 'ApproveStateId',
          label: this.$t('insert.budgetMaster.approveState'),
          formatter: (value, key, item) => {
            return item.Approvestate ? item.Approvestate.Label : ''
          }
        }
      ]
    }
  },
  methods: {
    filter () {
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.budgetMasters = []
      this.$api.postByUrl({model: this.model, recordIds: [this.modalItem.RecordId]}, 'VisionNextBudget/api/BudgetMaster/SearchApproveBenefit').then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (response && response.length > 0) {
          this.budgetMasters = response.map(r => {
            if (r.Approvestate && (r.Approvestate.Code !== 'ONYBK')) {
              r._rowVariant = 'row-disabled'
            }
            return r
          })
        } else {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.budgetMaster.noBudgetMasterList') })
        }
      }).catch(() => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    },
    approveOrReject (type) {
      let url = ''
      let messageKey = ''
      switch (type) {
        case 'approve':
          url = 'VisionNextBudget/api/BudgetMaster/Approve'
          messageKey = 'insert.budgetMaster.successApprove'
          this.isApproveLoading = true
          break
        case 'reject':
          url = 'VisionNextBudget/api/BudgetMaster/Reject'
          messageKey = 'insert.budgetMaster.successReject'
          this.isRejectLoading = true
          break
      }
      this.$store.commit('setDisabledLoading', false)
      this.$api.postByUrl({details: this.selectedRows}, url).then((response) => {
        this.isApproveLoading = false
        this.isRejectLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (response.IsCompleted) {
          this.$toasted.show(this.$t(messageKey), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          this.closeModal()
        }
      }).catch(() => {
        this.isApproveLoading = false
        this.isRejectLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    },
    rowSelected (values) {
      this.selectedRows = values
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'credit-budget-excel-modal')
    },
    setApproveState (value) {
      this.model.approveStateId = value ? value.DecimalValue : null
    },
    hide () {
      this.approveState = null
      this.model = {}
      this.budgetMasters = []
    }
  }
}
</script>
<style>
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
.table.b-table > tbody > .table-row-disabled {
    background-color: rgb(252, 55, 55);
    cursor: not-allowed;
    color: white;
    pointer-events: none;
}
</style>
