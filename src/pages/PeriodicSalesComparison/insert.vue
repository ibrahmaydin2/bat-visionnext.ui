<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb/>
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{ name: 'PeriodicSalesComparison' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()"/>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Code')" :error="$v.form.Code" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Code" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Description1')" :error="$v.form.Description1" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Definition')" :error="$v.form.Definiton" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Definition" :disabled="insertReadonly.Definiton" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.StatusId')" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox2 v-model="form.StatusId" type="number"  :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.periodicSalesComparison.Definitions')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesStart')" :error="$v.form.PastSaleStartDate" :required="true">
              <NextDatePicker v-model="form.PastSaleStartDate"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesEnd')" :error="$v.form.PastSaleEndDate" :required="true">
              <NextDatePicker v-model="form.PastSaleEndDate"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesControlAmount')" :error="$v.form.PastSaleQuantity" :required="true">
              <NextInput v-model="form.PastSaleQuantity" type="number" :min="0"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.BranchCriterion')" :error="$v.form.BranchCriteriaId" :required="true">
              <NextDropdown
                v-model="selectedBranchCriteria"
                @input="selectedType('BranchCriteriaId', $event)"
                :source="lookupValues.BRANCH_CRITERIA"
                :disabled="insertReadonly.BranchCriteriaId"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesStart')" :error="$v.form.NextSaleStartDate" :required="true">
              <NextDatePicker v-model="form.NextSaleStartDate"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesEnd')" :error="$v.form.NextSaleEndDate" :required="true">
              <NextDatePicker v-model="form.NextSaleEndDate"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesControlAmount')" :error="$v.form.NextSaleQuantity" :required="true">
              <NextInput v-model="form.NextSaleQuantity" type="number" :min="0"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.ProductCriteria')" :error="$v.form.ItemCriteriaId" :required="true">
              <NextDropdown v-model="selectedItemCriteria" :disabled="insertReadonly.ItemCriteriaId" @input="selectedType('ItemCriteriaId', $event)" :source="(lookupValues.ITEM_CRITERIA ? lookupValues.ITEM_CRITERIA.filter(i => i.Code != 'UK') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSaleColor')" :error="$v.pastSaleColorId" :required="true" >
              <NextDropdown v-model="pastSaleColorId" :source="colorList" @input="getColorValue($event, 1)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSaleColor')" :error="$v.nextSaleColorId" :required="true">
              <NextDropdown v-model="nextSaleColorId" :source="colorList" @input="getColorValue($event, 2)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <!-- <b-tab lazy :title="$t('insert.periodicSalesComparison.Products')" v-if="selectedItemCriteria && selectedItemCriteria.Code === 'UK'">
          <b-row>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.areaDescription')" :error="$v.periodicSalesItemArea" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="periodicSalesItemArea"
                :source="periodicSalesItemAreaList"
                label="Label"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.value')" :error="$v.periodicSalesItemValue" :required="true" md="5" lg="5">
              <v-select v-model="periodicSalesItemValue" :options="periodicSalesItemValueList" :filterable="true" label="Label"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addPeriodicSalesComparisonItem" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in periodicSalesItems" :key="i">
                  <b-td>{{f.ColumnNameDescription}}</b-td>
                  <b-td>{{f.ColumnValueDescription}}</b-td>
                  <b-td class="text-center">
                    <i @click="removePeriodicSalesComparison(f)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab> -->
        <b-tab lazy :title="$t('insert.itemAnalysis.itemList')" v-if="selectedItemCriteria && selectedItemCriteria.Code === 'UL'">
          <NextDetailPanel v-model="periodicSalesItems" :items="itemAnalysisItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.periodicSalesComparison.Branches')" v-if="selectedBranchCriteria && selectedBranchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="periodicSalesBranchs" :items="getPeriodicSalesBranches()">
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection3 v-model="periodicSalesBranchs" name="PeriodicSalesMultipleBranch"></NextMultipleSelection3>
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        Definition: null,
        PastSaleStartDate: null,
        PastSaleEndDate: null,
        PastSaleQuantity: null,
        BranchCriteriaId: null,
        NextSaleStartDate: null,
        NextSaleEndDate: null,
        NextSalesControlAmount: null,
        ItemCriteriaId: null,
        PastSaleColorId: null,
        NextSaleColorId: null,
        PeriodicSalesComparisonDetails: []
      },
      routeName1: 'CommonApi',
      selectedBranchCriteria: null,
      selectedItemCriteria: null,
      selectedBranch: null,
      periodicSalesItemArea: {},
      periodicSalesItemValue: {},
      periodicSalesItemAreaList: [],
      periodicSalesItemValueList: [],
      companyId: null,
      itemAnalysisItems: detailData.itemAnalysisItems,
      branchId: null,
      lookupValues: {},
      colorList: [],
      periodicSalesItems: [],
      periodicSalesBranchs: [],
      periodicSalesComparisonDetails: {
        tableName: null,
        columnName: null,
        columnValue: null,
        text: null
      },
      nextSaleColorId: null,
      pastSaleColorId: null
    }
  },
  mounted () {
    this.createManualCode()
    this.getInsertPage(this.routeName)
    this.getLookups()
    this.getColors()
    this.companyId = this.$store.state.CompanyId
    this.branchId = this.$store.state.BranchId
  },
  computed: {
    multipleDynamicAndCondition () {
      return this.periodicSalesBranchs.length > 0
        ? { BranchIds: this.periodicSalesBranchs.filter(f => f.TableName === 'T_BRANCH' && f.ColumnName === 'RECORD_ID')
          .map(f => f.ColumnValue)}
        : {}
    }
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
        if (this.form.PastSaleStartDate === this.form.PastSaleEndDate) {
          this.$toasted.show(this.$t('insert.periodicSalesComparison.conflictOfPastStartEndDates'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (this.form.NextSaleStartDate === this.form.NextSaleEndDate) {
          this.$toasted.show(this.$t('insert.periodicSalesComparison.conflictOfNextStartEndDates'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (this.form.PastSaleStartDate === this.form.NextSaleStartDate || this.form.PastSaleEndDate === this.form.NextSaleEndDate) {
          this.$toasted.show(this.$t('insert.periodicSalesComparison.conflictOfDates'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.PeriodicSalesComparisonDetails = [...this.periodicSalesItems, ...this.periodicSalesBranchs]
        this.createData()
      }
    },
    addPeriodicSalesComparisonItem () {
      this.$v.periodicSalesItemArea.$touch()
      this.$v.periodicSalesItemValue.$touch()
      if (this.$v.periodicSalesItemArea.$error || this.$v.periodicSalesItemValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.periodicSalesItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_ITEM',
        ColumnName: this.periodicSalesItemArea.ForeignField,
        ColumnValue: this.periodicSalesItemValue.DecimalValue,
        ColumnNameDescription: this.periodicSalesItemArea.Label,
        ColumnValueDescription: this.periodicSalesItemValue.Label
      })
      this.periodicSalesItemArea = null
      this.periodicSalesItemValue = null
      this.$v.periodicSalesItemArea.$reset()
      this.$v.periodicSalesItemValue.$reset()
    },
    selectPeriodicSalesComparisonDetail (data, tableName, columnName) {
      if (data) {
        this.periodicSalesComparisonDetails.tableName = tableName
        this.periodicSalesComparisonDetails.columnName = columnName
        this.periodicSalesComparisonDetails.text = data.Description1
        this.periodicSalesComparisonDetails.code = data.Code
        this.periodicSalesComparisonDetails.columnValue = data.RecordId
      } else {
        this.periodicSalesComparisonDetails = {}
      }
    },
    addPeriodicSalesComparisonDetails () {
      this.$v.periodicSalesComparisonDetails.$touch()
      if (this.$v.periodicSalesComparisonDetails.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.PeriodicSalesComparisonDetails.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: this.periodicSalesComparisonDetails.tableName,
        ColumnName: this.periodicSalesComparisonDetails.columnName,
        ColumnValue: this.periodicSalesComparisonDetails.columnValue,
        Text: this.periodicSalesComparisonDetails.text
      })
      this.periodicSalesComparisonDetails = {}
      this.selectedBranch = {}
      this.$v.periodicSalesComparisonDetails.$reset()
    },
    removePeriodicSalesComparison (item) {
      this.form.PeriodicSalesComparisonDetails.splice(this.form.PeriodicSalesComparisonDetails.indexOf(item), 1)
    },
    getInsertPage (e) {
      let me = this
      me.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
        me.periodicSalesItemAreaList = res.Values
      })
    },
    getPeriodicSalesBranches () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'Code',
          objectKey: 'Code',
          labelProperty: 'Code',
          customOption: true,
          orConditionFields: 'Code,Description1',
          url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          label: this.$t('insert.discount.branchCode'),
          dynamicAndCondition: this.multipleDynamicAndCondition,
          required: true,
          visible: true,
          isUnique: true,
          id: 1
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'Description1',
          objectKey: 'Description1',
          parentProperty: 'Description1',
          label: this.$t('insert.fieldAnalysis.commercialTitle'),
          visible: false,
          disabled: true,
          parentId: 1,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          id: 3
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_BRANCH',
          id: 4
        }
      ]
    },
    getLookups () {
      this.$api.postByUrl({LookupTableCode: 'BRANCH_CRITERIA,ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (response && response.Values) {
          this.lookupValues = response.Values
        }
      })
    },
    getColors () {
      this.colorList = []
      let request = {
        branchId: '6' }
      this.$api.postByUrl(request, '/VisionNextSystem/api/SysColor/AutoCompleteSearch').then((response) => {
        if (response || response.ListModel.BaseModels.length > 0) {
          this.colorList = response.ListModel.BaseModels
        }
      })
    },
    getColorValue (value, type) {
      if (type === 1) {
        this.pastSaleColorId = value.RecordId
        this.form.PastSaleColorId = this.pastSaleColorId
      }
      if (type === 2) {
        this.nextSaleColorId = value.RecordId
        this.form.NextSaleColorId = this.nextSaleColorId
      }
    }
  },
  watch: {
    periodicSalesItemArea (value) {
      this.periodicSalesItemValueList = []
      this.periodicSalesItemValue = null
      if (value) {
        let me = this
        me.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          me.periodicSalesItemValueList = res.Values
          me.$forceUpdate()
        })
      }
    }
  },
  validations () {
    if (!this.form) {
      this.insertRequired.form = false
    }
    return {
      form: {
        Definition: {
          required
        },
        Description1: {
          required
        },
        PastSaleStartDate: {
          required
        },
        PastSaleEndDate: {
          required
        },
        PastSaleQuantity: {
          required
        },
        BranchCriteriaId: {
          required
        },
        NextSaleStartDate: {
          required
        },
        NextSaleEndDate: {
          required
        },
        NextSaleQuantity: {
          required
        },
        ItemCriteriaId: {
          required
        }
      },
      nextSaleColorId: {
        required
      },
      pastSaleColorId: {
        required
      },
      periodicSalesItemArea: {
        required
      },
      periodicSalesItemValue: {
        required
      },
      periodicSalesComparisonDetails: {
        tableName: {
          required
        },
        columnName: {
          required
        },
        columnValue: {
          required
        }
      }
    }
  }
}
</script>
