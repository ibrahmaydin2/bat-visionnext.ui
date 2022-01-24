<template>
  <b-row>
    <b-col cols="12">
      <b-table
        id="budget-spending-detail-list"
        :items="list"
        :fields="fields"
        bordered responsive
        :current-page="currentPage"
        :per-page="10">
        <template #head()="data">
            {{$t(data.label)}}
          </template>
      </b-table>
      <b-pagination
        :total-rows="list ? list.length : 0"
        v-model="currentPage"
        :per-page="10"
        aria-controls="budget-spending-detail-list"
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
          key: 'MovementTypeo.Label',
          label: 'insert.budgetMaster.movementType'
        },
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
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let request = {
        andConditionModel: {
          BudgetIds: [this.budgetDetail.RecordId]
        }
      }
      this.$api.postByUrl(request, 'VisionNextBudget/api/BudgetTransaction/Search').then((response) => {
        this.list = response.ListModel ? response.ListModel.BaseModels : []
      })
    }
  }
}
</script>
