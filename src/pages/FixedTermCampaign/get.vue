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
            <span><i class="fas fa-check" />  <b>{{$t('get.fixedTermCampaign.statusId')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.fixedTermCampaign.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.fixedTermCampaign.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'get.fixedTermCampaign.description1')"></div>
              <div v-html="getFormatDataByType(rowData.CampaignBeginDate, 'date', 'get.fixedTermCampaign.campaignBeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.CampaignEndDate, 'date', 'get.fixedTermCampaign.campaignEndDate')"></div>
              <div v-html="getFormatDataByType(rowData.UseBudget, 'check', 'get.fixedTermCampaign.useBudget')"></div>
              <div v-html="getFormatDataByType(rowData.BudgetAmount, 'text', 'get.fixedTermCampaign.budgetAmount')"></div>
              <div v-html="getFormatDataByType(rowData.UsedAmount, 'text', 'get.fixedTermCampaign.usedAmount')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCriteria, 'object', 'get.fixedTermCampaign.routeCriteria')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'get.fixedTermCampaign.customerCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.ItemCriteria, 'object', 'get.fixedTermCampaign.itemCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'get.fixedTermCampaign.branchCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.CampaignType, 'object', 'get.fixedTermCampaign.campaignType')"></div>
              <div v-html="getFormatDataByType(rowData.CampaignRate, 'text', 'get.fixedTermCampaign.campaignRate')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.fixedTermCampaign.currency')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.maturityPeriods')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.startQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.endQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.paymentPeriod')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in rowData.FixedTermCampaignTakens" :key="i">
                      <b-td>{{f.StartQuantity}}</b-td>
                      <b-td>{{f.EndQuantity}}</b-td>
                      <b-td>{{f.PaymentPeriod}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.discountedItems')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in rowData.FixedTermCampaignItems" :key="i">
                     <b-td>{{f.ColumnNameDesc ? f.ColumnNameDesc.Label : f.ColumnName}}</b-td>
                     <b-td>{{f.ColumnValueDesc ? f.ColumnValueDesc.Label : f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.routes')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.routeId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.FixedTermCampaignDetails ? rowData.FixedTermCampaignDetails.filter(f => f.TableName === 'T_ROUTE' && f.ColumnName === 'RECORD_ID') : [])" :key="i">
                    <b-td>{{f.Route ? f.Route.Label : f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.customerCriterias')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.FixedTermCampaignDetails ? rowData.FixedTermCampaignDetails.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName !== 'RECORD_ID' && f.ColumnName !== 'BRANCH_ID') : [])" :key="i">
                      <b-td>{{f.ColumnNameDesc ? f.ColumnNameDesc.Label : f.ColumnName}}</b-td>
                      <b-td>{{f.ColumnValueDesc ? f.ColumnValueDesc.Label : f.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.customers')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.customer')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in rowData.FixedTermCampaignCustomers" :key="i">
                      <b-td>{{f.Customer ? f.Customer.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.branch')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.branchId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in (rowData.FixedTermCampaignDetails ? rowData.FixedTermCampaignDetails.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID') : [])" :key="i">
                       <b-td>{{f.Branch ? f.Branch.Label : f.ColumnValue}}</b-td>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextDiscount/api/FixedTermCampaign', record: this.$route.params.url})
    }
  }
}
</script>
