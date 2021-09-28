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
            <span><i class="fas fa-code" />  <b>{{$t('insert.loyalty.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyalty.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.loyalty.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.loyalty.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.loyalty.description')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'insert.loyalty.customerCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'insert.loyalty.branchCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.ApplicationType, 'object', 'insert.loyalty.loyaltyApplicationType')"></div>
              <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.loyalty.loyaltyGroup')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.loyalty.loyaltyType')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.LoyaltyBeginDate, 'date', 'insert.loyalty.beginDate')"></div>
              <div v-html="getFormatDataByType(rowData.LoyaltyEndDate, 'date', 'insert.loyalty.endDate')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.loyalty.financeCode')"></div>
              <div v-html="getFormatDataByType(rowData.TCIBreak1, 'object', 'insert.loyalty.tci')"></div>
              <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.loyalty.class')"></div>
              <div v-html="getFormatDataByType(rowData.Kind, 'object', 'insert.loyalty.kind')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyalty.loyaltyCatalogue')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.LoyaltyCatalogues" :items="loyaltyCatalogueItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyalty.pointCriterias')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table
                  :fields="loyaltyActiveCategoryFields"
                  :items="this.rowData.LoyaltyActiveCategories"
                  bordered responsive >
                  <template #cell(operations)="row">
                    <div class="text-center">
                      <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success"
                        v-if="(row.item.CustomerCriteria && row.item.CustomerCriteria.Code !== 'TM')
                          || (row.item.DatePlanType && row.item.DatePlanType.Code === 'ST')">
                        <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyalty.details')}}
                      </b-button>
                    </div>
                  </template>
                  <template #row-details="{item, index}">
                    <div class="p-4 mt-2 nested-detail-panel" v-if="item.CustomerCriteria && item.CustomerCriteria.Code === 'MK'">
                      <h3>{{$t('insert.loyalty.customerCriteria')}}</h3>
                      <NextDetailPanel type="get" v-model="rowData.LoyaltyActiveCategories[index].LoyaltyActiveCtCrits" :items="loyaltyActiveCtCritItems" />
                    </div>
                    <div class="p-4 mt-2 nested-detail-panel" v-if="item.CustomerCriteria && item.CustomerCriteria.Code === 'MS'">
                      <h3>{{$t('insert.loyalty.customerQuery')}}</h3>
                      <NextDetailPanel type="get" v-model="rowData.LoyaltyActiveCategories[index].LoyaltyActiveCtSqls" :items="loyaltyActiveCtSqlItems" />
                    </div>
                    <div class="p-4 mt-2 nested-detail-panel" v-if="item.DatePlanType && item.DatePlanType.Code === 'ST'">
                      <h3>{{$t('insert.loyalty.constantDates')}}</h3>
                      <NextDetailPanel type="get" v-model="rowData.LoyaltyActiveCategories[index].LoyaltyActiveCtDates" :items="loyaltyActiveCtDateItems" />
                    </div>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.branchs')" v-if="rowData.BranchCriteria && rowData.BranchCriteria.Code === 'SL'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="branchs" :items="loyaltyBranchItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customers')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customers" :items="loyaltyCustomerItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customerCriterias')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="loyaltyCustomerCriteriaItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customerQuery')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MS'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.LoyaltyCustomerSqls" :items="loyaltyCustomerSqlItems" />
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
  data () {
    return {
      loyaltyCatalogueItems: detailData.loyaltyCatalogueItems,
      loyaltyCustomerItems: detailData.loyaltyCustomerItems,
      loyaltyBranchItems: detailData.loyaltyBranchItems,
      loyaltyCustomerCriteriaItems: detailData.loyaltyCustomerCriteriaItems,
      loyaltyCustomerSqlItems: detailData.loyaltyCustomerSqlItems,
      loyaltyActiveCategoryFields: detailData.loyaltyActiveCategoryFields,
      loyaltyActiveCtCritItems: detailData.loyaltyActiveCtCritItems,
      loyaltyActiveCtSqlItems: detailData.loyaltyActiveCtSqlItems,
      loyaltyActiveCtDateItems: detailData.loyaltyActiveCtDateItems,
      customers: [],
      branchs: [],
      customerCriterias: []
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextLoyalty/api/Loyalty', record: this.$route.params.url}).then(() => {
        if (this.rowData.LoyaltyCustomers && this.rowData.LoyaltyCustomers.length > 0) {
          this.customers = this.rowData.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
          this.branchs = this.rowData.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')
          this.customerCriterias = this.rowData.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
        }
      })
    }
  }
}
</script>
<style lang="sass">
  .nested-detail-panel
    background-color: #e4e4e4
    border-radius: 15px
  .nested-detail-panel
      th
        border-color: #b7b4b4 !important
      td
        border-color: #b7b4b4 !important
</style>
