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
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.FieldSurvey.FieldSurveyDefinitions')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.AnalysisType, 'object', 'insert.FieldSurvey.analysisTypeId')"></div>
              <div v-html="getFormatDataByType(validityType, 'object', 'insert.FieldSurvey.validityTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.FieldSurvey.description1')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SortOrder, 'text', 'insert.FieldSurvey.sortOrder')"></div>
              <div v-html="getFormatDataByType(approveState, 'object', 'insert.FieldSurvey.approveStateId')"></div>
              <div v-html="getFormatDataByType(rowData.IsNecessary, 'check', 'insert.FieldSurvey.isNecessary')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.Branches')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                     <b-th><span>{{$t('insert.FieldSurvey.surveyBranchId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.FieldSurveyBranchs" :key="i">
                      <b-td>{{r.SurveyBranch ? r.SurveyBranch.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.employeeType')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                     <b-th><span>{{$t('insert.FieldSurvey.employeeType')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.FieldSurveyEmployeeTypes" :key="i">
                      <b-td>{{r.EmployeeType ? r.EmployeeType.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.questions')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.FieldSurvey.question')}}</span></b-th>
                    <b-th><span>{{$t('insert.FieldSurvey.questionLine')}}</span></b-th>
                    <b-th><span>{{$t('insert.FieldSurvey.questionIsNecessary')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.FieldSurveyQuestions" :key="i">
                      <b-td>{{r.FieldSurvey ? r.FieldSurvey.Label : ''}}</b-td>
                      <b-td>{{r.LineNumber}}</b-td>
                      <b-td><i :class="'' + r.IsNecessary == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.validDates')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fieldSurveyValidDates.description1')}}</span></b-th>
                    <b-th><span>{{$t('insert.fieldSurveyValidDates.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.fieldSurveyValidDates.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.fieldSurveyValidDates.statusId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.FieldSurveyValidDates" :key="i">
                      <b-td>{{r.FieldSurvey ? r.FieldSurvey.Label : ''}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.StartDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.EndDate)}}</b-td>
                      <b-td><i :class="'' + r.StatusId == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
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
    return {
      validityType: {},
      approveState: {}
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
    let allLookups = 'ANALYSIS_VALIDITY_TYPE,APPROVE_STATE'
    this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
  },
  computed: {
    ...mapState(['rowData', 'style', 'lookup'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/FieldSurvey', record: this.$route.params.url}).then(() => {
        if (this.lookup.ANALYSIS_VALIDITY_TYPE && this.lookup.ANALYSIS_VALIDITY_TYPE.length > 0 && this.rowData.ValidityTypeId > 0) {
          this.validityType = this.lookup.ANALYSIS_VALIDITY_TYPE.find(a => a.DecimalValue === this.rowData.ValidityTypeId)
        }
        if (this.lookup.APPROVE_STATE && this.lookup.APPROVE_STATE.length > 0 && this.rowData.ApproveStateId > 0) {
          this.approveState = this.lookup.APPROVE_STATE.find(a => a.DecimalValue === this.rowData.ApproveStateId)
        }
      })
    }
  }
}
</script>
