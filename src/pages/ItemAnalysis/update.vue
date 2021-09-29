<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'ItemAnalysis' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="isDisabled" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="isDisabled"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.itemAnalysis.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ValidityTypeId" :error="$v.form.ValidityTypeId">
              <NextDropdown v-model="validityType" :disabled="isDisabled" @input="selectedType('ValidityTypeId', $event)" lookup-key="ANALYSIS_VALIDITY_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTypeId" :error="$v.form.AnalysisTypeId">
              <NextDropdown v-model="analysisType" :disabled="isDisabled" @input="selectedType('AnalysisTypeId', $event); setUseOnce($event)" lookup-key="ITEM_ANALYSIS_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisPeriodId" :error="$v.form.AnalysisPeriodId">
              <NextDropdown v-model="analysisPeriod" :disabled="isDisabled" @input="selectedType('AnalysisPeriodId', $event)" lookup-key="ANALYSIS_PERIOD"/>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <NextDropdown v-model="approveState" :disabled="insertReadonly.ApproveStateId" @input="selectedType('ApproveStateId', $event)" lookup-key="APPROVE_STATE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisVisitCount" :error="$v.form.AnalysisVisitCount">
              <NextInput v-model="form.AnalysisVisitCount" type="number" :disabled="isDisabled" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria"
                :disabled="insertReadonly.CustomerCriteriaId"
                @input="selectedType('CustomerCriteriaId', $event)"
                :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code != 'MS'): [])"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
              <NextDropdown v-model="itemCriteria"
                :disabled="isDisabled"
                @input="selectedType('ItemCriteriaId', $event)"
                :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(c => c.Code == 'TU' || c.Code === 'UL'): [])"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsNecessary" :error="$v.form.IsNecessary">
              <NextCheckBox v-model="form.IsNecessary" type="number" toggle :disabled="insertReadonly.IsNecessary"/>
            </NextFormGroup>
            <NextFormGroup item-key="UseOnce" :error="$v.form.UseOnce">
              <NextCheckBox v-model="form.UseOnce" type="number" toggle :disabled="!analysisType || analysisType.Code !== 'KLN' || isDisabled"/>
            </NextFormGroup>
            <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
              <NextInput v-model="form.SortOrder" type="number" :disabled="isDisabled" maxLength="2" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTimeId" :error="$v.form.AnalysisTimeId">
              <NextDropdown v-model="analysisTime" :disabled="isDisabled" @input="selectedType('AnalysisTimeId', $event)" lookup-key="ANALYSIS_TIME"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.analysisQuestions')">
          <NextDetailPanel :type="isDisabled ? 'get' : 'update'" v-model="form.ItemAnalysisQuestions" :items="itemAnalysisQuestionItems" :has-line-number="true"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.branchs')">
          <NextDetailPanel v-model="form.ItemAnalysisBranches" :items="itemAnalysisBranchItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.employeeType')">
          <NextDetailPanel :type="isDisabled ? 'get' : 'update'" v-model="form.ItemAnalysisEmployeeTypes" :items="itemAnalysisEmployeeItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.validDates')" v-if="validityType && validityType.Code === 'SS'">
          <NextDetailPanel :type="isDisabled ? 'get' : 'update'" v-model="form.ItemAnalysisValidDates" :items="itemAnalysisValidDateItems" :before-add="beforeValidDatesAdd"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.itemList')" v-if="itemCriteria && itemCriteria.Code === 'UL'">
          <NextDetailPanel :type="isDisabled ? 'get' : 'update'" v-model="form.ItemAnalysisItems" :items="itemAnalysisItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.customerList')" v-if="customerCriteria && customerCriteria.Code === 'ML'" :disabled="!form.ItemAnalysisBranches || form.ItemAnalysisBranches.length === 0" >
          <NextDetailPanel v-model="customers" :items="itemAnalysisCustomerItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.itemAnalysis.customerCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'">
          <NextDetailPanel v-model="customerCriterias" :items="itemAnalysisDetailItems"></NextDetailPanel>
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
        ValidityTypeId: null,
        AnalysisTypeId: null,
        AnalysisPeriodId: null,
        Description1: null,
        ApproveStateId: null,
        AnalysisVisitCount: null,
        CustomerCriteriaId: null,
        ItemCriteriaId: null,
        IsNecessary: null,
        UseOnce: null,
        SortOrder: null,
        AnalysisTimeId: null,
        ItemAnalysisQuestions: [],
        ItemAnalysisBranches: [],
        ItemAnalysisEmployeeTypes: [],
        ItemAnalysisItems: [],
        ItemAnalysisCustomers: [],
        ItemAnalysisValidDates: [],
        ItemAnalysisDetails: []
      },
      routeName1: 'FieldAnalysis',
      customerCriteria: null,
      itemCriteria: null,
      validityType: null,
      analysisType: null,
      analysisPeriod: null,
      approveState: null,
      analysisTime: null,
      customers: [],
      customerCriterias: [],
      itemAnalysisQuestionItems: detailData.itemAnalysisQuestionItems,
      itemAnalysisBranchItems: detailData.itemAnalysisBranchItems,
      itemAnalysisEmployeeItems: detailData.itemAnalysisEmployeeItems,
      itemAnalysisItems: detailData.itemAnalysisItems,
      itemAnalysisCustomerItems: detailData.itemAnalysisCustomerItems,
      itemAnalysisValidDateItems: detailData.itemAnalysisValidDateItems,
      itemAnalysisDetailItems: detailData.itemAnalysisDetailItems,
      isDisabled: false
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
        this.updateData()
      }
    },
    beforeValidDatesAdd (item, list) {
      let filteredList = list.filter(l =>
        (l.StartDate <= item.StartDate && item.StartDate <= l.EndDate) ||
        (l.StartDate <= item.EndDate && item.EndDate <= l.EndDate) ||
        (item.StartDate <= l.StartDate && l.StartDate <= item.EndDate) ||
        (item.StartDate <= l.EndDate && l.EndDate <= item.EndDate))

      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('insert.itemAnalysis.validDatesError'), {
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
      if (rowData && rowData.ApproveStateId === 2101 && this.$route.query.saveAs === 1) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.rejectRecordNotSaveAs') })
        document.getElementById('submitButton').disabled = true
      }
      this.form = rowData
      this.validityType = rowData.ValidityType
      this.analysisType = rowData.AnalysisType
      this.analysisPeriod = rowData.AnalysisPeriod
      this.approveState = rowData.ApproveState
      this.customerCriteria = rowData.CustomerCriteria
      this.itemCriteria = rowData.ItemCriteria
      this.analysisTime = rowData.AnalysisType
      if (this.form.ItemAnalysisDetails) {
        this.customerCriterias = this.form.ItemAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
        this.customers = this.form.ItemAnalysisDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
      }
      if (this.approveState && this.approveState.Code === 'ONY') {
        let request = {
          andConditionModel: {
            ItemAnalysisIds: [rowData.RecordId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextFieldAnalysis/api/ItemAnalysisResult/Search').then((response) => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            this.isDisabled = true
          }
        })
      }
    },
    setUseOnce (model) {
      this.form.UseOnce = !model || model.Code !== 'KLN' ? 0 : this.form.UseOnce
    }
  },
  watch: {
    form: {
      handler (value) {
        if (value && value.ItemAnalysisQuestions && value.ItemAnalysisQuestions.length > 0) {
          let filteredArr = value.ItemAnalysisQuestions.filter(i => i.IsNecessary === 1)
          this.form.IsNecessary = filteredArr && filteredArr.length > 0 ? 1 : 0
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
