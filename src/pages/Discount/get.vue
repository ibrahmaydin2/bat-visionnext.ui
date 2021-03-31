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
        <b-tab :title="$t('insert.discount.discountGivens')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.givenQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.discountRate')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.discountTotal')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.startValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.finishValue')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(w, i) in rowData.DiscountGivens" :key="i">
                      <b-td>{{w.ColumnName}}</b-td>
                      <b-td>{{w.ColumnValue}}</b-td>
                      <b-td>{{w.GivenQuantity}}</b-td>
                      <b-td>{{w.DiscountRate}}</b-td>
                      <b-td>{{w.DiscountTotal}}</b-td>
                      <b-td>{{w.StartValue}}</b-td>
                      <b-td>{{w.FinishValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountTakens')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.takenQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.minTakenAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.endTakenQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.maxTakenAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.minTakenQuantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(w, i) in rowData.DiscountTakens" :key="i">
                      <b-td>{{w.ColumnName}}</b-td>
                      <b-td>{{w.ColumnValue}}</b-td>
                      <b-td>{{w.TakenQuantity}}</b-td>
                      <b-td>{{w.MinTakenAmount}}</b-td>
                      <b-td>{{w.EndTakenQuantity}}</b-td>
                      <b-td>{{w.MaxTakenAmount}}</b-td>
                      <b-td>{{w.MinTakenQuantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomers')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(w, i) in rowData.DiscountCustomers" :key="i">
                      <b-td>{{w.Customer ? w.Customer.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountExcludedCustomers')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(w, i) in rowData.DiscountExcludedCustomers" :key="i">
                      <b-td>{{w.Customer ? w.Customer.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.customerCriterias')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.DiscountDetails ? rowData.DiscountDetails.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName !== 'RECORD_ID' && f.ColumnName !== 'BRANCH_ID') : [])" :key="i">
                      <b-td>{{f.ColumnName}}</b-td>
                      <b-td>{{f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.branchs')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.branchId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.DiscountDetails ? rowData.DiscountDetails.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID') : [])" :key="i">
                      <b-td>{{f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.routes')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.routeId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.DiscountDetails ? rowData.DiscountDetails.filter(f => f.TableName === 'T_ROUTE' && f.ColumnName === 'RECORD_ID') : [])" :key="i">
                    <b-td>{{f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.payments')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.paymentTypeId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.DiscountDetails ? rowData.DiscountDetails.filter(f => f.TableName === 'T_PAYMENT_TYPE' && f.ColumnName === 'PAYMENTTYPE_ID') : [])" :key="i">
                    <b-td>{{f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomerSqls')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.discount.customerSql')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(w, i) in rowData.DiscountCustomerSqls" :key="i">
                      <b-td>{{w.CustomerSql ? w.CustomerSql.Label : ''}}</b-td>
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
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {}
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextDiscount/api/Discount', record: this.$route.params.url})
    }
  }
}
</script>
