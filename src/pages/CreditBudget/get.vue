<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <GetFormField v-model="workFlowModel" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.creditBudget.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'insert.creditBudget.beginDate')"></div>
              <div v-html="getFormatDataByType(rowData.EndDate, 'date', 'insert.creditBudget.endDate')"></div>
              <div v-html="getFormatDataByType(rowData.CreditBranch, 'object', 'insert.creditBudget.creditBranchId')"></div>
              <div v-html="getFormatDataByType(rowData.BudgetAmount, 'text', 'insert.creditBudget.budgetAmount')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.UsedAmount, 'text', 'insert.creditBudget.usedAmount')"></div>
              <div v-html="getFormatDataByType(rowData.ReservedAmount, 'text', 'insert.creditBudget.reservedAmount')"></div>
              <div v-html="getFormatDataByType((rowData.BudgetAmount > 0 ? rowData.BudgetAmount - (rowData.UsedAmount + rowData.ReservedAmount) : 0), 'text', 'insert.creditBudget.leftAmount')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.creditBudget.customerGuarantees')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.creditBudget.customer')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.creditLimit')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.riskLimit')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.currentCredit')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.currentRisk')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.creditAccountRemainder')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.debitAccountRemainder')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.creditAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.amount')}}</span></b-th>
                    <b-th><span>{{$t('insert.creditBudget.paymentPeriod')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.CustomerGuarantees" :key="i">
                      <b-td>{{c.CustomerDesc}}</b-td>
                      <b-td>{{c.CreditLimit}}</b-td>
                      <b-td>{{c.RiskLimit}}</b-td>
                      <b-td>{{c.CurrentCredit}}</b-td>
                      <b-td>{{c.CurrentRisk}}</b-td>
                      <b-td>{{c.CreditAccountRemainder}}</b-td>
                      <b-td>{{c.DebitAccountRemainder}}</b-td>
                      <b-td>{{c.CreditAmount}}</b-td>
                      <b-td>{{c.Amount}}</b-td>
                      <b-td>{{c.PaymentPeriod}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      workFlowModel: {
        ControllerName: '',
        ClassName: 'CreditBudget',
        PageName: 'pg_CreditBudget'
      }
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBudget/api/CreditBudget', record: this.$route.params.url})
    }
  }
}
</script>
