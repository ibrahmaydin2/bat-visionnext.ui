<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'LoyaltyCategory' }">
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
          <NextFormGroup item-key="Description1 " :error="$v.form.Description1 ">
            <NextInput v-model="form.Description1 " type="text" :disabled="insertReadonly.Description1 " />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="MinValue" :error="$v.form.MinValue">
            <NextInput v-model="form.MinValue" type="number" :disabled="insertReadonly.MinValue" />
          </NextFormGroup>
          <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
            <NextInput v-model="form.MaxValue" type="number" :disabled="insertReadonly.MaxValue" />
          </NextFormGroup>
          <NextFormGroup item-key="CategoryTypeId" :error="$v.form.CategoryTypeId">
            <NextDropdown :required="true" :disabled="insertReadonly.CategoryTypeId" url="VisionNextLoyalty/api/LoyaltyCategoryType/Search" @input="selectedSearchType('CategoryTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="CalcTypeId" :error="$v.form.CalcTypeId">
            <NextDropdown :disabled="insertReadonly.CalcTypeId" lookup-key="LOYALTY_CATEGORY_CALC_TYPE"  @input="selectedType('CalcTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="LoyaltyPoint" :error="$v.form.LoyaltyPoint">
            <NextInput v-model="form.LoyaltyPoint" type="number" :disabled="insertReadonly.LoyaltyPoint" />
          </NextFormGroup>
          <NextFormGroup item-key="FieldAnalysisId" :error="$v.form.FieldAnalysisId">
            <NextDropdown :disabled="insertReadonly.FieldAnalysisId" url="VisionNextFieldAnalysis/api/FieldAnalysis/Search"  @input="selectedSearchType('FieldAnalysisId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="ByFrequency" :error="$v.form.ByFrequency">
            <NextCheckBox v-model="form.ByFrequency" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyCategory.salesTarget')">
          <b-row>
            <NextFormGroup item-key="ColumnName" :error="$v.form.ColumnName" :required="true" v-if="form.CalcTypeId === 4">
              <NextDropdown :disabled="insertReadonly.ColumnName" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"  @input="selectedSearchType('ColumnName', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ColumnValue" :error="$v.form.ColumnValue">
              <NextDropdown :disabled="insertReadonly.ColumnValue" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"  @input="selectedSearchType('ColumnValue', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="UnitId" :error="$v.form.UnitId">
              <NextDropdown :disabled="insertReadonly.UnitId" url="VisionNextUnit/api/Unit/Search"  @input="selectedSearchType('UnitId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity">
              <NextInput v-model="form.Quantity" type="number" :disabled="insertReadonly.Quantity" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesTargetQuota')">
          <NextDetailPanel v-model="form.LoyaltyCatQuotas" :items="loyaltyCatQuotasItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.analysisResult')">
          <NextDetailPanel v-model="form.LoyaltyCategoryCrits" :items="loyaltyCategoryCritsItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.questionChoice')">
          <NextDetailPanel v-model="form.LoyaltyCategoryValues" :items="loyaltyCategoryValuesItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.activityResult')">
          <NextDetailPanel v-model="form.LoyaltyCategoryTasks" :items="loyaltyCategoryTasksItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesAnalysis')">
          <NextDetailPanel v-model="form.LoyaltyCatSales" :items="loyaltyCatSalesItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        LoyaltyCatQuotas: [],
        LoyaltyCategoryCrits: [],
        LoyaltyCategoryValues: [],
        LoyaltyCategoryTasks: [],
        LoyaltyCatSales: []
      },
      routeName1: 'Loyalty',
      loyaltyCatQuotasItems: detailData.loyaltyCatQuotasItems,
      loyaltyCategoryCritsItems: detailData.loyaltyCategoryCritsItems,
      loyaltyCategoryValuesItems: detailData.loyaltyCategoryValuesItems,
      loyaltyCategoryTasksItems: detailData.loyaltyCategoryTasksItems,
      loyaltyCatSalesItems: detailData.loyaltyCatSalesItems

    }
  },
  computed: {
    ...mapState([''])
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
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
