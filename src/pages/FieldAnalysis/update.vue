<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'FieldAnalysis' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.fieldAnalysis.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ValidityTypeId" :error="$v.form.ValidityTypeId">
              <NextDropdown v-model="validityType" :disabled="insertReadonly.ValidityTypeId" @input="selectedType('ValidityTypeId', $event)" lookup-key="ANALYSIS_VALIDITY_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTypeId" :error="$v.form.AnalysisTypeId">
              <NextDropdown v-model="analysisType" :disabled="insertReadonly.AnalysisTypeId" @input="selectedType('AnalysisTypeId', $event)" lookup-key="FIELD_ANALYSIS_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisPeriodId" :error="$v.form.AnalysisPeriodId">
              <NextDropdown v-model="analysisPeriod" :disabled="insertReadonly.AnalysisPeriodId" @input="selectedType('AnalysisPeriodId', $event)" lookup-key="ANALYSIS_PERIOD"/>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <NextDropdown v-model="approveState" :disabled="true" @input="selectedType('ApproveStateId', $event)" label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisVisitCount" :error="$v.form.AnalysisVisitCount">
              <NextInput v-model="form.AnalysisVisitCount" type="number" :disabled="insertReadonly.AnalysisVisitCount" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria"
                :disabled="insertReadonly.CustomerCriteriaId"
                @input="selectedType('CustomerCriteriaId', $event)"
                :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code != 'MS'): [])"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsNecessary" :error="$v.form.IsNecessary">
              <NextCheckBox v-model="form.IsNecessary" type="number" toggle :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="UseOnce" :error="$v.form.UseOnce">
              <NextCheckBox v-model="form.UseOnce" type="number" toggle :disabled="!analysisType || analysisType.Code !== 'KLN'"/>
            </NextFormGroup>
            <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
              <NextInput v-model="form.SortOrder" type="number" :disabled="insertReadonly.SortOrder" maxLength="2" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTimeId" :error="$v.form.AnalysisTimeId">
              <NextDropdown v-model="analysisTime" :disabled="insertReadonly.AnalysisTimeId" @input="selectedType('AnalysisTimeId', $event)" lookup-key="ANALYSIS_TIME"/>
            </NextFormGroup>
            <NextFormGroup item-key="FollowingAnalysis" :error="$v.form.FollowingAnalysis">
              <NextCheckBox v-model="form.FollowingAnalysis" type="number" toggle :disabled="insertReadonly.FollowingAnalysis"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.question')">
          <NextDetailPanel v-model="form.FieldAnalysisQuestions" :items="fieldAnalysisQuestionItems" :has-line-number="true"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.branchs')">
          <NextDetailPanel v-model="form.FieldAnalysisBranchs" :items="fieldAnalysisBranchItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.fieldAnalysis.employeeType')">
          <NextDetailPanel v-model="form.FieldAnalysisEmployeeTypes" :items="fieldAnalysisEmployeeItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fieldAnalysis.validDates')" v-if="validityType && validityType.Code === 'SS'">
          <NextDetailPanel v-model="form.FieldAnalysisValidDates" :items="fieldAnalysisValidDateItems" :before-add="beforeValidDatesAdd"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fieldAnalysis.customerList')" v-if="customerCriteria && customerCriteria.Code === 'ML'" :disabled="!form.FieldAnalysisBranchs || form.FieldAnalysisBranchs.length === 0" >
          <NextDetailPanel v-model="customers" :items="fieldAnalysisCustomerItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fieldAnalysis.customerCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'">
          <NextDetailPanel v-model="customerCriterias" :items="fieldAnalysisDetailItems"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        AnalysisTypeId: null,
        ValidityTypeId: null,
        Description1: null,
        SortOrder: null,
        ApproveStateId: null,
        IsNecessary: null,
        CustomerCriteriaId: null,
        UseOnce: null,
        AnalysisVisitCount: null,
        AnalysisPeriodId: null,
        AnalysisTimeId: null,
        FollowingAnalysis: null,
        FieldAnalysisQuestions: [],
        FieldAnalysisBranchs: [],
        FieldAnalysisEmployeeTypes: [],
        FieldAnalysisValidDates: [],
        FieldAnalysisDetails: []
      },
      customerCriteria: null,
      validityType: null,
      analysisType: null,
      analysisPeriod: null,
      approveState: null,
      analysisTime: null,
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
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.FieldAnalysisDetails = [...this.customers, ...this.customerCriterias]
        this.updateData()
      }
    },
    beforeValidDatesAdd (item, list, isUpdated) {
      let filteredList = list.filter(l =>
        l.RecordState !== 4 &&
        !isUpdated &&
        ((l.StartDate <= item.StartDate && item.StartDate <= l.EndDate) ||
        (l.StartDate <= item.EndDate && item.EndDate <= l.EndDate) ||
        (item.StartDate <= l.StartDate && l.StartDate <= item.EndDate) ||
        (item.StartDate <= l.EndDate && l.EndDate <= item.EndDate)))

      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('insert.fieldAnalysis.validDatesError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      return true
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.validityType = rowData.ValidityType
      this.analysisType = rowData.AnalysisType
      this.analysisPeriod = rowData.AnalysisPeriod
      this.approveState = rowData.ApproveState
      this.customerCriteria = rowData.CustomerCriteria
      this.analysisTime = rowData.AnalysisType
      if (this.form.FieldAnalysisDetails) {
        this.customerCriterias = this.form.FieldAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
        this.customers = this.form.FieldAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
      }
      // eslint-disable-next-line eqeqeq
      if (this.$route.query.saveAs == 1) {
        this.form.FieldAnalysisValidDates.map(f => {
          f.RecordState = 2
          f.RecordId = null

          return f
        })
        this.setApproveState()
      }
    },
    setApproveState () {
      let filteredArr = this.lookup.APPROVE_STATE ? this.lookup.APPROVE_STATE.filter(a => a.Code === 'ONYBK') : []
      this.approveState = filteredArr && filteredArr.length > 0 ? filteredArr[0] : null
      this.form.ApproveStateId = this.approveState ? this.approveState.DecimalValue : null
      this.$forceUpdate()
    }
  },
  watch: {
    form: {
      handler (value) {
        if (value && value.FieldAnalysisQuestions && value.FieldAnalysisQuestions.length > 0) {
          let filteredArr = value.FieldAnalysisQuestions.filter(i => i.IsNecessary === 1)
          this.form.IsNecessary = filteredArr && filteredArr.length > 0 ? 1 : 0
        }
      },
      deep: true,
      immediate: true
    },
    lookup: {
      handler (value) {
        // eslint-disable-next-line eqeqeq
        if (value && value.APPROVE_STATE && this.$route.query.saveAs == 1) {
          this.setApproveState()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
