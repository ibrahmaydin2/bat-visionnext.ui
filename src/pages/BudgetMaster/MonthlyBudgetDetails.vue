<template>
  <b-row>
    <b-col cols="12">
      <b-table
        id="monthly-budget-detail-list"
        :items="monthlyBudgetDetails"
        :fields="fields"
        bordered responsive
        :current-page="currentPage"
        :per-page="10">
        <template #head()="data">
            {{$t(data.label)}}
          </template>
      </b-table>
      <b-pagination
        :total-rows="monthlyBudgetDetails ? monthlyBudgetDetails.length : 0"
        v-model="currentPage"
        :per-page="10"
        aria-controls="monthly-budget-detail-list"
      ></b-pagination>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  props: {
    budgetDetail: {}
  },
  data () {
    return {
      fields: [
        {
          key: 'Amount',
          label: 'insert.budgetMaster.amount'
        },
        {
          key: 'TransactionDate',
          label: 'insert.budgetMaster.transactionDate',
          formatter: (value, key, obj) => {
            return this.dateConvertFromTimezone(value)
          }
        }
      ],
      currentPage: 1,
      monthlyBudgetDetails: []
    }
  },
  mounted () {
    this.getMonthlyBudgetDetails()
  },
  methods: {
    getMonthlyBudgetDetails () {
      let request = {
        logId: 2,
        budgetId: this.budgetDetail.RecordId
      }
      this.$api.postByUrl(request, 'VisionNextBudget/api/BudgetMaster/GetBudgetExpenditureDetail').then((response) => {
        this.monthlyBudgetDetails = response ? response.Details : []
      })
    }
  }
}
</script>
