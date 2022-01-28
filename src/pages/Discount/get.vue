<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.discount.code')}}:</b> {{rowData.Code && rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.discount.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.discount.general')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DiscountBeginDate, 'date', 'get.discount.discountBeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountEndDate, 'date', 'get.discount.discountEndDate')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountType, 'object', 'get.discount.discountType')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountKind, 'object', 'get.discount.discountKind')"></div>
              <div v-html="getFormatDataByType(rowData.MaxValue, 'text', 'get.discount.maxValue')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'get.discount.branchCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'get.discount.customerCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCriteria, 'object', 'get.discount.routeCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentCriteria, 'object', 'get.discount.paymentCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'get.discount.genexp1')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'get.discount.financeCode')"></div>
              <div v-html="getFormatDataByType(rowData.Budget, 'object', 'get.discount.budget')"></div>
              <div v-html="getFormatDataByType(rowData.BudgetAmount, 'text', 'get.discount.budgetAmount')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BudgetConsumption, 'text', 'get.discount.budgetConsumption')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'get.discount.approveState')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountCategory, 'object', 'get.discount.discountCategory')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountPayback, 'check', 'get.discount.discountPayback')"></div>
              <div v-html="getFormatDataByType(rowData.MaxUsage, 'text', 'get.discount.maxUsage')"></div>
              <div v-html="getFormatDataByType(rowData.TciBreak1, 'object', 'get.discount.tciBreak1')"></div>
              <div v-html="getFormatDataByType(rowData.UseBudget, 'check', 'get.discount.useBudget')"></div>
              <div v-html="getFormatDataByType(rowData.IsCascade, 'check', 'get.discount.isCascade')"></div>
              <div v-html="getFormatDataByType(rowData.UseMultiGiven, 'check', 'get.discount.useMultiGiven')"></div>
              <div v-html="getFormatDataByType(rowData.IsMandatory, 'check', 'get.discount.isMandatory')"></div>
              <div v-html="getFormatDataByType(rowData.IsDoubleScore, 'check', 'get.discount.isDoubleScore')"></div>
              <div v-html="getFormatDataByType(rowData.ApplyToTimes, 'check', 'get.discount.applyToTimes')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountTakens')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.DiscountTakens" :items="discountTakenItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountGivens')">
         <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.DiscountGivens" :items="discountGivenItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountExcludedCustomers')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.DiscountExcludedCustomers" :items="discountExcludedCustomerItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.customerCriterias')" v-if="rowData.CustomerCriteriaId === 21">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="discountDetailsCustomerCriteriaItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.branchs')" v-if="rowData.BranchCriteriaId === 30">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="branchs" :items="discountDetailsBranchItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomers')" v-if="rowData.CustomerCriteriaId === 22">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customers" :items="discountCustomerItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.routes')" v-if="rowData.RouteCriteriaId === 33">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="routes" :items="discountDetailsRouteItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.payments')" v-if="rowData.PaymentCriteriaId === 36">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="paymentTypes" :items="discountDetailsPaymentTypeItems" :main-form="{}"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomerSqls')" v-if="rowData.CustomerCriteriaId === 29">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.DiscountCustomerSqls" :items="discountCustomerSqlItems" :main-form="{}"></NextDetailPanel>
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
import { detailData } from './detailPanelData'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      discountTakenItems: detailData.discountTakenItems,
      discountGivenItems: detailData.discountGivenItems,
      discountCustomerItems: detailData.discountCustomerItems,
      discountExcludedCustomerItems: detailData.discountExcludedCustomerItems,
      discountDetailsCustomerCriteriaItems: detailData.discountDetailsCustomerCriteriaItems,
      discountDetailsRouteItems: detailData.discountDetailsRouteItems,
      discountDetailsPaymentTypeItems: detailData.discountDetailsPaymentTypeItems,
      discountCustomerSqlItems: detailData.discountCustomerSqlItems,
      discountDetailsBranchItems: detailData.discountDetailsBranchItems,
      customers: [],
      customerCriterias: [],
      branchs: [],
      routes: [],
      paymentTypes: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextDiscount/api/Discount', record: this.$route.params.url}).then(() => {
        this.customers = this.rowData.DiscountDetails.filter(d => d.TableName === 'T_CUSTOMER' && d.ColumnName === 'RECORD_ID')
        this.customerCriterias = this.rowData.DiscountDetails.filter(d => d.TableName === 'T_CUSTOMER' && d.ColumnName !== 'RECORD_ID' && d.ColumnName !== 'BRANCH_ID')
        this.branchs = this.rowData.DiscountDetails.filter(d => d.TableName === 'T_CUSTOMER' && d.ColumnName === 'BRANCH_ID')
        this.routes = this.rowData.DiscountDetails.filter(d => d.TableName === 'T_ROUTE' && d.ColumnName === 'RECORD_ID')
        this.paymentTypes = this.rowData.DiscountDetails.filter(d => d.TableName === 'T_PAYMENT_TYPE' && d.ColumnName === 'RECORD_ID')
      })
    }
  }
}
</script>
