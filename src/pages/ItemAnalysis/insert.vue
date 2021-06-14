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
        <b-tab :title="$t('insert.itemAnalysis.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ValidityTypeId" :error="$v.form.ValidityTypeId">
              <NextDropdown v-model="validityType" :disabled="insertReadonly.ValidityTypeId" @input="selectedType('ValidityTypeId', $event)" lookup-key="ANALYSIS_VALIDITY_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTypeId" :error="$v.form.AnalysisTypeId">
              <NextDropdown v-model="analysisType" :disabled="insertReadonly.AnalysisTypeId" @input="selectedType('AnalysisTypeId', $event)" lookup-key="ITEM_ANALYSIS_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisPeriodId" :error="$v.form.AnalysisPeriodId">
              <NextDropdown :disabled="insertReadonly.AnalysisPeriodId" @input="selectedType('AnalysisPeriodId', $event)" lookup-key="ANALYSIS_PERIOD"/>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <NextDropdown :disabled="insertReadonly.ApproveStateId" @input="selectedType('ApproveStateId', $event)" lookup-key="APPROVE_STATE"/>
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
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
              <NextDropdown v-model="itemCriteria"
                :disabled="insertReadonly.ItemCriteriaId"
                @input="selectedType('ItemCriteriaId', $event)"
                :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(c => c.Code == 'TU' || c.Code === 'UL'): [])"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsNecessary" :error="$v.form.IsNecessary">
              <NextCheckBox v-model="form.IsNecessary" type="number" toggle :disabled="insertReadonly.IsNecessary"/>
            </NextFormGroup>
            <NextFormGroup item-key="UseOnce" :error="$v.form.UseOnce">
              <NextCheckBox v-model="form.UseOnce" type="number" toggle :disabled="!analysisType || analysisType.Code !== 'KLN'"/>
            </NextFormGroup>
            <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
              <NextInput v-model="form.SortOrder" type="number" :disabled="insertReadonly.SortOrder" />
            </NextFormGroup>
            <NextFormGroup item-key="AnalysisTimeId" :error="$v.form.AnalysisTimeId">
              <NextDropdown :disabled="insertReadonly.AnalysisTimeId" @input="selectedType('AnalysisTimeId', $event)" lookup-key="ANALYSIS_TIME"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.analysisQuestions')">
          <NextDetailPanel v-model="form.ItemAnalysisQuestions" :items="itemAnalysisQuestionItems" :has-line-number="true"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.branchs')">
          <NextDetailPanel v-model="form.ItemAnalysisBranches" :items="itemAnalysisBranchItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.employeeType')">
          <NextDetailPanel v-model="form.ItemAnalysisEmployeeTypes" :items="itemAnalysisEmployeeItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.validDates')" v-if="validityType && validityType.Code === 'SS'">
          <NextDetailPanel v-model="form.ItemAnalysisValidDates" :items="itemAnalysisValidDateItems" :before-add="beforeValidDatesAdd"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.itemList')" v-if="itemCriteria && itemCriteria.Code === 'UL'">
          <NextDetailPanel v-model="form.ItemAnalysisItems" :items="itemAnalysisItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.customerList')" v-if="customerCriteria && customerCriteria.Code === 'ML'">
          <NextDetailPanel v-model="form.ItemAnalysisCustomers" :items="itemAnalysisCustomerItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.itemAnalysis.customerCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'">
          <NextDetailPanel v-model="form.ItemAnalysisDetails" :items="itemAnalysisDetailItems"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
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
    this.createManualCode()
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
        this.createData()
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
    }
  }
}
</script>
