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
            <span><i class="fas fa-code" />  <b>{{$t('insert.fieldAnalysis.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.fieldAnalysis.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.fieldAnalysis.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.fieldAnalysis.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ValidityType, 'object', 'insert.fieldAnalysis.validityType')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisType, 'object', 'insert.fieldAnalysis.analysisType')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisPeriod, 'object', 'insert.fieldAnalysis.analysisPeriod')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'insert.fieldAnalysis.approveState')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisVisitCount, 'text', 'insert.fieldAnalysis.analysisVisitCount')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'insert.fieldAnalysis.customerCriteria')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.IsNecessary, 'check', 'insert.fieldAnalysis.isNecessary')"></div>
              <div v-html="getFormatDataByType(rowData.UseOnce, 'check', 'insert.fieldAnalysis.useOnce')"></div>
              <div v-html="getFormatDataByType(rowData.SortOrder, 'text', 'insert.fieldAnalysis.sortOrder')"></div>
              <div v-html="getFormatDataByType(rowData.AnalysisTime, 'object', 'insert.fieldAnalysis.analysisTime')"></div>
              <div v-html="getFormatDataByType(rowData.FollowingAnalysis, 'check', 'insert.fieldAnalysis.followingAnalysis')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.question')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.FieldAnalysisQuestions" :items="fieldAnalysisQuestionItems" :has-line-number="true" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.branchs')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.FieldAnalysisBranchs" :items="fieldAnalysisBranchItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.employeeType')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.FieldAnalysisEmployeeTypes" :items="fieldAnalysisEmployeeItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.validDates')" v-if="rowData.ValidityType && rowData.ValidityType.Code === 'SS'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.FieldAnalysisValidDates" :items="fieldAnalysisValidDateItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.customerList')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get"  v-model="customers" :items="fieldAnalysisCustomerItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.customerCriterias')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="itemAnalysisDetailItems" />
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
      fieldAnalysisQuestionItems: detailData.fieldAnalysisQuestionItems,
      fieldAnalysisBranchItems: detailData.fieldAnalysisBranchItems,
      fieldAnalysisEmployeeItems: detailData.fieldAnalysisEmployeeItems,
      fieldAnalysisCustomerItems: detailData.fieldAnalysisCustomerItems,
      fieldAnalysisValidDateItems: detailData.fieldAnalysisValidDateItems,
      fieldAnalysisDetailItems: detailData.fieldAnalysisDetailItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/FieldAnalysis', record: this.$route.params.url}).then(() => {
        if (this.rowData.FieldAnalysisDetails) {
          this.customerCriterias = this.rowData.FieldAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
          this.customers = this.rowData.FieldAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
        }
      })
    }
  }
}
</script>
