<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Bcp' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="true"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.bcp.Bcp')" active>
          <b-row>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown v-model="DiscountGroup7" :disabled="true" label="Label" lookup-key="CUSTOMER_DISCOUNT_GROUP_7" @input="selectedType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Year" :error="$v.form.Year">
              <NextDropdown v-model="Year" :disabled="true"  label="Label" :source="years" @input="selectedType('Year', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Month" :error="$v.form.Month">
              <NextDropdown v-model="LabelMonth" :disabled="true" label="Label" :source="Months" @input="selectedType('Month', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndYear" :error="$v.form.EndYear">
              <NextDropdown v-model="EndYear" :disabled="insertReadonly.EndYear"  label="Label" :source="years" @input="selectedType('EndYear', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndMonth" :error="$v.form.EndMonth">
              <NextDropdown v-model="LabelEndMonthh" :disabled="insertReadonly.EndMonth" label="Label" :source="Months" @input="selectedType('EndMonth', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion3Id" :error="$v.form.CustomerRegion3Id">
              <NextDropdown v-model="CustomerRegion3" :disabled="true" label="Label" lookup-key="CUSTOMER_REGION_3" @input="selectBranch($event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="BranchCriteria" :disabled="true" label="Label" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.bcp.items')">
          <NextDetailPanel type="get" v-model="form.BCPDetails" :items="bcpDetailsItems"/>
        </b-tab>
        <b-tab lazy :title="$t('insert.bcp.branchs')"  v-if="CustomerRegion3 && CustomerRegion3.Code !== null && BranchCriteria && BranchCriteria.Code == 'SL'">
          <NextDetailPanel v-model="form.BCPBranchs" :items="bcpBranchsItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        DiscountGroup7Id: null,
        Year: null,
        ColumnValue: null,
        Month: null,
        EndYear: null,
        EndMonth: null,
        CustomerRegion3Id: null,
        BranchCriteriaId: null,
        BCPDetails: [],
        BCPBranchs: []
      },
      routeName1: 'Customer',
      DiscountGroup7: {},
      Year: {},
      LabelMonth: {},
      EndYear: {},
      LabelEndMonthh: {},
      CustomerRegion3: {},
      BranchCriteria: {},
      ColumnValue: {},
      bcpDetailsItems: detailData.bcpDetailsItems,
      bcpBranchsItems: [],
      branches: [],
      years: [],
      Months: [
        {DecimalValue: 1, Label: this.$t('general.Months.january')},
        {DecimalValue: 2, Label: this.$t('general.Months.february')},
        {DecimalValue: 3, Label: this.$t('general.Months.march')},
        {DecimalValue: 4, Label: this.$t('general.Months.april')},
        {DecimalValue: 5, Label: this.$t('general.Months.may')},
        {DecimalValue: 6, Label: this.$t('general.Months.june')},
        {DecimalValue: 7, Label: this.$t('general.Months.july')},
        {DecimalValue: 8, Label: this.$t('general.Months.august')},
        {DecimalValue: 9, Label: this.$t('general.Months.september')},
        {DecimalValue: 10, Label: this.$t('general.Months.october')},
        {DecimalValue: 11, Label: this.$t('general.Months.november')},
        {DecimalValue: 12, Label: this.$t('general.Months.december')}
      ]
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
    this.createYears()
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.CustomerRegion3 = rowData.CustomerRegion3
      this.selectBranch(this.CustomerRegion3)
      this.BranchCriteria = rowData.BranchCriteria
      this.DiscountGroup7 = rowData.DiscountGroup7
      this.Year = rowData.Year
      this.LabelMonth = rowData.LabelMonth
      this.EndYear = rowData.EndYear
      this.LabelEndMonthh = rowData.LabelEndMonthh
      if (!rowData.BCPDetails) {
        this.form.BCPDetails = []
      }
      if (!rowData.BCPBranchs) {
        this.form.BCPBranchs = []
      }
    },
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
        if (this.form.StatusId !== 1) {
          this.form.StatusId = 2
        }
        this.updateData()
      }
    },
    createYears () {
      let now = new Date()
      let nowYear = now.getFullYear()
      this.years = []
      for (let index = nowYear - 5; index <= nowYear + 5; index++) {
        this.years.push({
          DecimalValue: index, Label: index
        })
      }
    },
    selectBranch (value) {
      if (value) {
        this.form.CustomerRegion3Id = value.Value
        this.getCustomDetailItems()
      } else {
        this.form.CustomerRegion3Id = null
      }
      this.BranchCriteria = []
    },
    getCustomDetailItems () {
      this.bcpBranchsItems = [
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_BRANCH',
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          id: 2
        },
        {
          type: 'Dropdown',
          modelProperty: 'ColumnValue',
          objectKey: 'ColumnNameDesc',
          labelProperty: 'Code',
          customOption: true,
          url: 'VisionNextBranch/api/Branch/GetBranchListCustomerRegion3Id',
          label: this.$t('insert.bcp.ColumnValue'),
          dynamicRequest: {Region3Id: this.form.CustomerRegion3Id},
          required: true,
          visible: true,
          isUnique: true,
          id: 3
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'Description1',
          objectKey: 'ColumnValueDesc',
          orConditionFields: 'Code,Description1',
          parentProperty: 'Customer',
          label: this.$t('insert.bcp.ColumnNameDesc'),
          required: false,
          visible: true,
          disabled: true,
          parentId: 3,
          id: 4
        }
      ]
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
