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
                <NextFormGroup :title="$t('insert.creditBudget.customer')" md="4" lg="4">
                  <NextDropdown
                    v-model="filterCustomer"
                    url="VisionNextCustomer/api/Customer/GetBranchesCustomerSearch"
                    :searchable="true" :custom-option="true"
                    or-condition-fields="Code,Description1,CommercialTitle"
                    :dynamic-and-condition="{BranchIds: [rowData.CreditBranchId]}"
                    :is-customer="true"/>
                </NextFormGroup>
                <b-table
                  :items="customerGuarantees"
                  :fields="customerGuaranteeFields"
                  striped
                  small
                  sticky-header="300px"
                  responsive
                  bordered
                  :current-page="currentPage"
                  :per-page="0"
                >
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
                <b-pagination
                  :total-rows="totalRowCount"
                  v-model="currentPage"
                  :per-page="100"
                  aria-controls="customer-guarantees"
                ></b-pagination>
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
      },
      customerGuarantees: [],
      customerGuaranteeFields: [
        {key: 'AppStatus', label: 'insert.creditBudget.status', sortable: false},
        {
          key: 'CustomerDesc',
          label: 'insert.creditBudget.customer',
          sortable: false,
          formatter (value, key, obj) {
            return `${obj.CustomerCode} - ${obj.CustomerDesc}`
          }
        },
        {key: 'CreditLimit', label: 'insert.creditBudget.creditLimit', sortable: false},
        {key: 'RiskLimit', label: 'insert.creditBudget.riskLimit', sortable: false},
        {key: 'CurrentCredit', label: 'insert.creditBudget.currentCredit', sortable: false},
        {key: 'CurrentRisk', label: 'insert.creditBudget.currentRisk', sortable: false},
        {key: 'CreditAccountRemainder', label: 'insert.creditBudget.creditAccountRemainder', sortable: false},
        {key: 'DebitAccountRemainder', label: 'insert.creditBudget.debitAccountRemainder', sortable: false},
        {key: 'CreditAmount', label: 'insert.creditBudget.creditAmountCentral', sortable: false},
        {key: 'Amount', label: 'insert.creditBudget.amount', sortable: false},
        {key: 'PaymentPeriodDesc', label: 'insert.creditBudget.paymentPeriod', sortable: false}
      ],
      currentPage: 1,
      totalRowCount: 0,
      filterCustomer: null
    }
  },
  mounted () {
    this.getData()
    this.getCreditBudgetDetails()
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
    },
    getCreditBudgetDetails () {
      let request = {
        andConditionModel: {
          CreditBudgetIds: [this.$route.params.url],
          CustomerIds: this.filterCustomer ? [this.filterCustomer.RecordId] : null
        },
        page: this.currentPage,
        OrderByColumns: [
          {
            column: 'ApprovestateId',
            'orderByType': 0
          }
        ]
      }
      this.$api.postByUrl(request, 'VisionNextBudget/api/CreditBudgetDetail/Search', 100).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          this.customerGuarantees = response.ListModel.BaseModels
            .filter(c => c.CustomerGuarantees !== null && c.CustomerGuarantees !== undefined)
            .map(item => {
              let customerGuarantees = item.CustomerGuarantees
              customerGuarantees.RecordId = item.RecordId
              customerGuarantees.CreditBudgetId = item.CreditBudgetId
              customerGuarantees.PaymentPeriodDesc = item.PaymentPeriodDesc
              return customerGuarantees
            })
        }
      })
    }
  },
  watch: {
    currentPage () {
      this.getCreditBudgetDetails()
    },
    filterCustomer () {
      this.currentPage = 1
      this.getCreditBudgetDetails()
    }
  }
}
</script>
