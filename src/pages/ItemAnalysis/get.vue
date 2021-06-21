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
            <span><i class="fas fa-code" />  <b>{{$t('insert.itemAnalysis.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.itemAnalysis.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.itemAnalysis.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.itemAnalysis.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ValidityType, 'object', 'insert.itemAnalysis.validityType')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisType, 'object', 'insert.itemAnalysis.analysisType')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisPeriod, 'object', 'insert.itemAnalysis.analysisPeriod')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'insert.itemAnalysis.approveState')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisVisitCount, 'text', 'insert.itemAnalysis.analysisVisitCount')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'insert.itemAnalysis.customerCriteria')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ItemCriteria, 'object', 'insert.itemAnalysis.itemCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.IsNecessary, 'check', 'insert.itemAnalysis.isNecessary')"></div>
              <div v-html="getFormatDataByType(rowData.UseOnce, 'check', 'insert.itemAnalysis.useOnce')"></div>
              <div v-html="getFormatDataByType(rowData.SortOrder, 'text', 'insert.itemAnalysis.sortOrder')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisTime, 'object', 'insert.itemAnalysis.analysisTime')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.analysisQuestions')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisQuestions" :items="itemAnalysisQuestionItems" :has-line-number="true" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.branchs')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisBranches" :items="itemAnalysisBranchItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.employeeType')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisEmployeeTypes" :items="itemAnalysisEmployeeItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.validDates')" v-if="rowData.ValidityType && rowData.ValidityType.Code === 'SS'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisValidDates" :items="itemAnalysisValidDateItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.itemList')" v-if="rowData.ItemCriteria && rowData.ItemCriteria.Code === 'UL'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisItems" :items="itemAnalysisItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.customerList')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get"  v-model="rowData.ItemAnalysisCustomers" :items="itemAnalysisCustomerItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.customerCriterias')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemAnalysisDetails" :items="itemAnalysisDetailItems" />
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
      customers: [],
      customerCriterias: [],
      itemAnalysisQuestionItems: detailData.itemAnalysisQuestionItems,
      itemAnalysisBranchItems: detailData.itemAnalysisBranchItems,
      itemAnalysisEmployeeItems: detailData.itemAnalysisEmployeeItems,
      itemAnalysisItems: detailData.itemAnalysisItems,
      itemAnalysisCustomerItems: detailData.itemAnalysisCustomerItems,
      itemAnalysisValidDateItems: detailData.itemAnalysisValidDateItems,
      itemAnalysisDetailItems: detailData.itemAnalysisDetailItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/ItemAnalysis', record: this.$route.params.url}).then(() => {
        if (this.rowData.ItemAnalysisDetails) {
          this.customerCriterias = this.rowData.ItemAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
          this.customers = this.rowData.ItemAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
        }
      })
    }
  }
}
</script>
