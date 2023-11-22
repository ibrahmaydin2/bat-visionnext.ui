<template>
  <div class="asc__showPage">
    <b-modal id="detail-modal" size="lg" hide-footer :title="$t('insert.budgetMaster.budgetMovements')" no-close-on-backdrop>
      <BudgetDetail :addable="false" :budget-detail="selectedBudgetDetail"/>
    </b-modal>
    <b-modal id="monthly-budget-detail-modal" size="lg" hide-footer :title="$t('insert.budgetMaster.monthlyBudgetDetail')" no-close-on-backdrop>
      <MonthlyBudgetDetails :budget-detail="selectedBudgetDetail"/>
    </b-modal>
    <b-modal id="budget-spending-detail-modal" size="md" hide-footer :title="$t('insert.budgetMaster.budgetSpendingDetail')" no-close-on-backdrop>
      <BudgetSpendingDetail :budget-detail="selectedBudgetDetail"/>
    </b-modal>
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
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.budgetMaster.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BudgetGroup, 'object', 'insert.budgetMaster.budgetGroup')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerColumnNameDesc, 'text', 'insert.budgetMaster.customerColumnName')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerColumnValueDesc, 'text', 'insert.budgetMaster.customerColumnValue')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'insert.budgetMaster.currency')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'insert.budgetMaster.branchCriteria')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.budgetMaster.budgetDetail')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.Budgets" :items="budgetItems" :get-detail="getDetail" :detail-buttons="detailButtons"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.budgetMaster.branches')" v-if="rowData.BranchCriteria && rowData.BranchCriteria.Code === 'SL'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.SelectedBranches" :items="selectedBranchItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Bütçe Onaylayıcıları">
          <b-row class="p-4">
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Employee, 'object', '1. Bütçe Onaylayıcı')"></div>
              <div v-html="getFormatDataByType(rowData.Employee2, 'object', '2. Bütçe Onaylayıcı')"></div>
              <div v-html="getFormatDataByType(rowData.Employee3, 'object', '3. Bütçe Onaylayıcı')"></div>
            </b-card>
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Employee1MinAmount, 'text', 'Minimum Tutar')"></div>
              <div v-html="getFormatDataByType(rowData.Employee2MinAmount, 'text', 'Minimum Tutar')"></div>
              <div v-html="getFormatDataByType(rowData.Employee3MinAmount, 'text', 'Minimum Tutar')"></div>
            </b-card>
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Employee1MaxAmount, 'text', 'Maximum Tutar')"></div>
              <div v-html="getFormatDataByType(rowData.Employee2MaxAmount, 'text', 'Maximum Tutar')"></div>
              <div v-html="getFormatDataByType(rowData.Employee3MaxAmount, 'text', 'Maximum Tutar')"></div>
            </b-card>
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
import BudgetDetail from './Details.vue'
import MonthlyBudgetDetails from './MonthlyBudgetDetails.vue'
import BudgetSpendingDetail from './BudgetSpendingDetail.vue'
export default {
  mixins: [mixin],
  components: {
    BudgetDetail,
    MonthlyBudgetDetails,
    BudgetSpendingDetail
  },
  data () {
    return {
      budgetItems: detailData.budgetItems,
      selectedBranchItems: detailData.selectedBranchItems,
      selectedBudgetDetail: null,
      detailButtons: [
        {
          title: this.$t('insert.budgetMaster.monthlyBudgetDetail'),
          icon: 'fa fa-list',
          getDetail: (data) => {
            this.getMonthlyBudgetDetail(data)
          }
        },
        {
          title: this.$t('insert.budgetMaster.budgetSpendingDetail'),
          icon: 'fa fa-arrow-right',
          getDetail: (data) => {
            this.getBudgetSpendingDetail(data)
          }
        }
      ]
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBudget/api/BudgetMaster', record: this.$route.params.url})
    },
    getDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('detail-modal')
    },
    getMonthlyBudgetDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('monthly-budget-detail-modal')
    },
    getBudgetSpendingDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('budget-spending-detail-modal')
    }
  }
}
</script>
