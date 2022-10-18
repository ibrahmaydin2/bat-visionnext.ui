<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'FixedTermCampaign' }">
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
            <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
          </NextFormGroup>
           <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.fixedTermCampaign.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="CampaignBeginDate" :error="$v.form.CampaignBeginDate">
              <NextDatePicker v-model="form.CampaignBeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CampaignEndDate" :error="$v.form.CampaignEndDate">
              <NextDatePicker v-model="form.CampaignEndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="form.UseBudget" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <NextInput type="number" v-model="form.BudgetAmount" :disabled="form.UseBudget !== 1" />
            </NextFormGroup>
            <NextFormGroup item-key="UsedAmount" :error="$v.form.UsedAmount">
              <NextInput type="number" v-model="form.UsedAmount" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown v-model="selectedRouteCriteria" :disabled="insertReadonly.RouteCriteriaId" label="Label" lookup-key="ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="selectedCustomerCriteria"
               :disabled="insertReadonly.CustomerCriteriaId"
               label="Label"
               @input="selectedType('CustomerCriteriaId', $event)"
               :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code == 'MK' || c.Code === 'ML' || c.Code === 'TM'): [])"
               />
            </NextFormGroup>
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
              <NextDropdown v-model="selectedItemCriteria" :disabled="insertReadonly.ItemCriteriaId" @input="selectedType('ItemCriteriaId', $event)" :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(i => i.Code != 'UL') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown
                v-model="selectedBranchCriteria"
                @input="selectedType('BranchCriteriaId', $event)"
                lookup-key="BRANCH_CRITERIA"
                :disabled="insertReadonly.BranchCriteriaId"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="CampaignTypeId" :error="$v.form.CampaignTypeId">
              <NextDropdown
                @input="selectedSearchType('CampaignTypeId', $event)"
                url="VisionNextDiscount/api/DiscountType/Search"
              ></NextDropdown>
            </NextFormGroup>
             <NextFormGroup item-key="CampaignRate" :error="$v.form.CampaignRate">
              <NextInput type="number" v-model="form.CampaignRate" :readonly="insertReadonly.CampaignRate" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown :disabled="!form.UseBudget" @input="selectedSearchType('CurrencyId', $event)" label="Description1" url="VisionNextSystem/api/SysCurrency/Search"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.maturityPeriods')">
          <b-row>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.startQuantity')" :error="$v.fixedTermCampaignTaken.startQuantity" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.startQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.endQuantity')" :error="$v.fixedTermCampaignTaken.endQuantity" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.endQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.paymentPeriod')" :error="$v.fixedTermCampaignTaken.paymentPeriod" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.paymentPeriod" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFixedTermCampaignTaken" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.startQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.endQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.paymentPeriod')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignTakens" :key="i">
                  <b-td>{{f.StartQuantity}}</b-td>
                  <b-td>{{f.EndQuantity}}</b-td>
                  <b-td>{{f.PaymentPeriod}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeFixedTermCampaignTaken(f)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.fixedTermCampaign.discountedItems')" v-if="selectedItemCriteria && selectedItemCriteria.Code === 'UK'">
          <b-row>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.areaDescription')" :error="$v.campaignItemArea" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="campaignItemArea"
                :source="campaignItemAreaList"
                label="Label"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.value')" :error="$v.campaignItemValue" :required="true" md="5" lg="5">
              <v-select v-model="campaignItemValue" :options="campaignItemValueList" :filterable="true" label="Label"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFixedTermCampaignItem" />
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
                <b-tr v-for="(f, i) in form.FixedTermCampaignItems" :key="i">
                  <b-td>{{f.ColumnNameDescription}}</b-td>
                  <b-td>{{f.ColumnValueDescription}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeFixedTermCampaignItem(f)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.fixedTermCampaign.routes')" v-if="selectedRouteCriteria && selectedRouteCriteria.Code === 'RL'">
          <NextDetailPanel v-model="form.FixedTermCampaignRoutes" :items="getFixedTermRouteItems()">
          </NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fixedTermCampaign.customerCriterias')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MK'" @click="getCustomerCriteriaItems">
          <NextDetailPanel v-model="form.FixedTermCampaignCustomerCriterias" :items="getFixedTermCampaignCustomerCriterias()">
          </NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fieldAnalysis.customerList')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'ML'" :disabled="(selectedBranchCriteria && selectedBranchCriteria.Code === 'SL') && (!form.FixedTermCampaignBranchs || form.FixedTermCampaignBranchs.length === 0)">
          <NextDetailPanel v-model="form.FixedTermCampaignCustomers" :showEdit="false" :showWarning="true" :showAddButton="false" :items="getFixedTermCustomerItems()">
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection
                  v-model="form.FixedTermCampaignCustomers" name="FixedTermCampaignMultipleCustomer"
                  :hidden-values="hiddenValues"
                  :converted-values="customerConvertedValues"
                  :validations="budgetValidation"
                  :dynamic-and-condition="{multipleDynamicAndCondition, StatusIds: [1]}">
                </NextMultipleSelection>
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.fixedTermCampaign.branchs')" v-if="selectedBranchCriteria && selectedBranchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="form.FixedTermCampaignBranchs" :items="getFixedTermBranches()">
          </NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        Code: null,
        Description1: null,
        CampaignBeginDate: null,
        CampaignEndDate: null,
        UseBudget: 0,
        BudgetAmount: null,
        UsedAmount: 0,
        RouteCriteriaId: null,
        CustomerCriteriaId: null,
        ItemCriteriaId: null,
        BranchCriteriaId: null,
        CampaignTypeId: null,
        CampaignRate: null,
        CurrencyId: null,
        FixedTermCampaignItems: [],
        FixedTermCampaignDetails: [],
        FixedTermCampaignTakens: [],
        FixedTermCampaignCustomers: [],
        FixedTermCampaignBranchs: [],
        FixedTermCampaignRoutes: [],
        FixedTermCampaignCustomerCriterias: []
      },
      routeName1: 'Discount',
      selectedRouteCriteria: null,
      selectedCustomerCriteria: null,
      selectedBranchCriteria: null,
      selectedItemCriteria: null,
      selectedRoute: null,
      selectedCustomer: null,
      selectedBranch: null,
      customer: null,
      customerItemArea: {},
      customerItemValue: {},
      customerItemAreaList: [],
      customerItemValueList: [],
      campaignItemArea: {},
      campaignItemValue: {},
      campaignItemAreaList: [],
      campaignItemValueList: [],
      selectedIndex: null,
      fixedTermCampaignDetail: {
        tableName: null,
        columnName: null,
        columnValue: null,
        text: null
      },
      fixedTermCampaignTaken: {
        startQuantity: null,
        endQuantity: null,
        paymentPeriod: null
      },
      fixedTermCampaignCustomer: {
        customerId: null,
        customerName: null,
        customerCode: null,
        locationId: null,
        locationName: null,
        budget: null,
        usedAmount: null
      },
      companyId: null,
      branchId: null,
      customers: [],
      hiddenValues: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'ColumnValue'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'CustomerCode'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'CustomerName'
        },
        // {
        //   mainProperty: 'Code',
        //   targetProperty: 'ColumnValue'
        // },
        {
          mainProperty: 'CommercialTitle',
          targetProperty: 'ColumnValueDesc'
        },
        {
          mainProperty: 'CommercialTitle',
          targetProperty: 'CustomerName'
        },
        {
          mainProperty: 'DefaultLocation',
          targetProperty: 'LocationName'
        },
        {
          mainProperty: 'Budget',
          targetProperty: 'BudgetName'
        },
        {
          defaultValue: 'RECORD_ID',
          targetProperty: 'ColumnName'
        },
        {
          defaultValue: 'T_CUSTOMER',
          targetProperty: 'TableName'
        }
      ],
      customerConvertedValues: [
        {
          mainProperty: 'TableName',
          convert: () => 'T_CUSTOMER'
        },
        {
          mainProperty: 'ColumnName',
          convert: () => 'RECORD_ID'
        },
        {
          mainProperty: 'ColumnValue',
          convert: (data) => data.RecordId
        },
        {
          mainProperty: 'CustomerCode',
          convert: (data) => data.Code
        },
        {
          mainProperty: 'CustomerName',
          convert: (data) => data.CommercialTitle
        },
        {
          mainProperty: 'LocationName',
          convert: (data) => data.DefaultLocation ? data.DefaultLocation.Label : '-'
        },
        {
          mainProperty: 'BudgetName',
          targetProperty: 'Budget',
          getValue: (value, data) => {
            return data.Budget
          }
        }
      ],
      budgetValidation: [
        {
          mainProperty: 'Budget',
          validation: (value, data, form) => {
            return this.form.UseBudget !== 1 ? !value : value > 0
          }
        }
      ]
      // hiddenValuesBranch: [
      //   {
      //     mainProperty: 'RecordId',
      //     targetProperty: 'AnalysisBranchId'
      //   },
      //   {
      //     mainProperty: 'Code',
      //     targetProperty: 'ColumnValue'
      //   },
      //   {
      //     mainProperty: 'Description1',
      //     targetProperty: 'Text'
      //   }
      // ]
    }
  },
  mounted () {
    this.createManualCode()
    this.getInsertPage(this.routeName)
    this.companyId = this.$store.state.CompanyId
    this.branchId = this.$store.state.BranchId
  },
  computed: {
    multipleDynamicAndCondition () {
      return this.form.FixedTermCampaignBranchs.length > 0
        ? { BranchIds: this.form.FixedTermCampaignBranchs.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID')
          .map(f => f.ColumnValue)}
        : {}
    }
  },
  methods: {
    getFixedTermCustomerItems () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'ColumnValue',
          objectKey: 'CustomerCode',
          labelProperty: 'Code',
          customOption: true,
          isCustomer: true,
          orConditionFields: 'Code,Description1',
          url: 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch',
          label: this.$t('insert.fieldAnalysis.customerCode'),
          dynamicAndCondition: this.multipleDynamicAndCondition,
          required: true,
          visible: false,
          isUnique: true,
          id: 1
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'CustomerName',
          objectKey: 'ColumnValueDesc',
          parentProperty: 'CommercialTitle',
          label: this.$t('insert.fieldAnalysis.commercialTitle'),
          visible: false,
          disabled: true,
          parentId: 1,
          id: 2
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'LocationName',
          valueProperty: 'Label',
          objectKey: 'DefaultLocation',
          parentProperty: 'DefaultLocation',
          label: this.$t('insert.fieldAnalysis.location'),
          visible: false,
          disabled: true,
          parentId: 1,
          id: 3
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Budget',
          visible: false,
          label: this.$t('insert.fixedTermCampaign.budget'),
          defaultValue: 0,
          id: 4
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'UsedAmount',
          visible: false,
          disabled: true,
          label: this.$t('insert.fixedTermCampaign.usedAmount'),
          defaultValue: 0,
          id: 5
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          id: 6
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          id: 7
        }
      ]
    },
    getFixedTermRouteItems () {
      return [
        {
          type: 'Dropdown',
          modelProperty: 'ColumnValue',
          objectKey: 'ColumnNameDesc',
          labelProperty: 'Code',
          customOption: true,
          orConditionFields: 'Code,Description1',
          url: 'VisionNextRoute/api/Route/Search',
          dynamicAndCondition: { StatusIds: [1] },
          label: this.$t('insert.discount.routeCode'),
          required: true,
          visible: true,
          isUnique: true,
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
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_ROUTE',
          id: 3
        }
      ]
    },
    getFixedTermBranches () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'ColumnValue',
          objectKey: 'ColumnNameDesc',
          labelProperty: 'Code',
          customOption: true,
          orConditionFields: 'Code,Description1',
          url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          label: this.$t('insert.discount.branchCode'),
          required: true,
          visible: true,
          isUnique: true,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'BRANCH_ID',
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          id: 3
        }
      ]
    },
    getFixedTermCampaignCustomerCriterias () {
      return [
        {
          type: 'Dropdown',
          modelProperty: 'ColumnName',
          labelProperty: 'Label',
          valueProperty: 'ForeignField',
          objectKey: 'ColumnNameDesc',
          url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
          label: 'insert.terminalMessage.columnName',
          required: true,
          visible: true,
          isUnique: false,
          dynamicRequest: {paramId: 'CUSTOMER_CRITERIA'},
          id: 1
        },
        {
          type: 'Dropdown',
          modelProperty: 'ColumnValue',
          parentProperty: 'Label',
          labelProperty: 'Label',
          objectKey: 'ColumnValueDesc',
          request: JSON.stringify({ParamName: 'val'}),
          url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
          label: 'insert.terminalMessage.columnValue',
          required: true,
          visible: true,
          isUnique: true,
          parentId: 1,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          id: 3
        }
      ]
    },
    getInsertPage (e) {
      let today = new Date()
      today.setDate(today.getDate() + 1)
      let nextDate = today.toISOString().slice(0, 10)
      this.form.CampaignBeginDate = nextDate
      this.form.CampaignEndDate = nextDate
      let me = this
      me.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
        me.campaignItemAreaList = res.Values
      })
    },
    addFixedTermCampaignItem () {
      this.$v.campaignItemArea.$touch()
      this.$v.campaignItemValue.$touch()
      if (this.$v.customerItemArea.$error || this.$v.customerItemValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.FixedTermCampaignItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_ITEM',
        ColumnName: this.campaignItemArea.ForeignField,
        ColumnValue: this.campaignItemValue.DecimalValue,
        ColumnNameDescription: this.campaignItemArea.Label,
        ColumnValueDescription: this.campaignItemValue.Label
      })
      this.campaignItemArea = null
      this.campaignItemValue = null
      this.$v.campaignItemArea.$reset()
      this.$v.campaignItemValue.$reset()
    },
    removeFixedTermCampaignItem (item) {
      this.form.FixedTermCampaignItems.splice(this.form.FixedTermCampaignItems.indexOf(item), 1)
    },
    addCustomer () {
      let filteredArr = this.form.FixedTermCampaignDetails.filter(f => f.ColumnValue === 'RECORD_ID')
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
    },
    addFixedTermCustomerItem () {
      this.$v.customerItemArea.$touch()
      this.$v.customerItemValue.$touch()
      if (this.$v.customerItemArea.$error || this.$v.customerItemValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.FixedTermCampaignDetails.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_CUSTOMER',
        ColumnName: this.customerItemArea.ForeignField,
        ColumnValue: this.customerItemValue.DecimalValue,
        ColumnNameStr: this.customerItemArea.Label,
        ColumnValueStr: this.customerItemValue.Label
      })
      this.customerItemArea = null
      this.$v.customerItemArea.$reset()
      this.$v.customerItemValue.$reset()
    },
    removeFixedTermCustomerItem (item) {
      this.form.FixedTermCampaignDetails.splice(this.form.FixedTermCampaignDetails.indexOf(item), 1)
    },
    selectFixedTermCampaignDetail (data, tableName, columnName) {
      if (data) {
        this.fixedTermCampaignDetail.tableName = tableName
        this.fixedTermCampaignDetail.columnName = columnName
        this.fixedTermCampaignDetail.text = data.Description1
        this.fixedTermCampaignDetail.code = data.Code
        this.fixedTermCampaignDetail.columnValue = data.RecordId
      } else {
        this.fixedTermCampaignDetail = {}
      }
    },
    addFixedTermCampaignDetail () {
      this.$v.fixedTermCampaignDetail.$touch()
      if (this.$v.fixedTermCampaignDetail.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FixedTermCampaignDetails.filter(f => f.TableName === this.fixedTermCampaignDetail.tableName &&
      f.ColumnName === this.fixedTermCampaignDetail.columnName &&
      f.ColumnValue === this.fixedTermCampaignDetail.columnValue)
      if (filteredArr.length > 0) {
        if (this.fixedTermCampaignDetail.tableName === 'T_ROUTE') {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.fixedTermCampaign.sameRouteError') })
        } else {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        }
        return false
      }
      this.form.FixedTermCampaignDetails.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: this.fixedTermCampaignDetail.tableName,
        ColumnName: this.fixedTermCampaignDetail.columnName,
        ColumnValue: this.fixedTermCampaignDetail.columnValue,
        Text: this.fixedTermCampaignDetail.text
      })
      this.fixedTermCampaignDetail = {}
      this.selectedRoute = {}
      this.selectedCustomer = {}
      this.selectedBranch = {}
      this.$v.fixedTermCampaignDetail.$reset()
    },
    removeFixedTermCampaignDetail (item) {
      this.form.FixedTermCampaignDetails.splice(this.form.FixedTermCampaignDetails.indexOf(item), 1)
    },
    addFixedTermCampaignTaken () {
      this.$v.fixedTermCampaignTaken.$touch()
      if (this.$v.fixedTermCampaignTaken.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FixedTermCampaignTakens.filter(f => f.StartQuantity === this.fixedTermCampaignTaken.startQuantity &&
      f.EndQuantity === this.fixedTermCampaignTaken.endQuantity &&
      f.PaymentPeriod === this.fixedTermCampaignTaken.paymentPeriod)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.FixedTermCampaignTakens.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        BranchId: parseFloat(this.branchId),
        CompanyId: parseFloat(this.companyId),
        StartQuantity: parseFloat(this.fixedTermCampaignTaken.startQuantity),
        EndQuantity: parseFloat(this.fixedTermCampaignTaken.endQuantity),
        PaymentPeriod: parseFloat(this.fixedTermCampaignTaken.paymentPeriod)
      })
      this.fixedTermCampaignTaken = {}
      this.$v.fixedTermCampaignTaken.$reset()
    },
    removeFixedTermCampaignTaken (item) {
      this.form.FixedTermCampaignTakens.splice(this.form.FixedTermCampaignTakens.indexOf(item), 1)
    },
    addFixedTermCampaignCustomer () {
      debugger
      this.$v.fixedTermCampaignCustomer.$touch()
      if (this.$v.fixedTermCampaignCustomer.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FixedTermCampaignDetails.filter(f => f.ColumnValue === this.fixedTermCampaignCustomer.customerId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.FixedTermCampaignDetails.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        TableName: 'T_CUSTOMER',
        ColumnName: 'RECORD_ID',
        ColumnValue: this.fixedTermCampaignCustomer.customerId,
        UsedAmount: this.fixedTermCampaignCustomer.usedAmount,
        BudgetAmount: null,
        CustomerName: this.fixedTermCampaignCustomer.customerName,
        CustomerCode: this.fixedTermCampaignCustomer.customerCode,
        LocationName: this.fixedTermCampaignCustomer.locationName,
        Budget: this.fixedTermCampaignCustomer.budget
      })
      this.fixedTermCampaignCustomer = {}
      this.customer = null
      this.$v.fixedTermCampaignCustomer.$reset()
    },
    removeFixedTermCampaignCustomer (item) {
      this.form.FixedTermCampaignDetails.splice(this.form.FixedTermCampaignDetails.indexOf(item), 1)
    },
    // editInvoiceLine (item) {
    //   this.selectedIndex = this.form.FixedTermCampaignDetails.indexOf(item)
    //   this.fixedTermCampaignCustomer = {
    //     usedAmount: item.UsedAmount,
    //     budget: item.Budget,
    //     isUpdated: true
    //   }
    //   this.$forceUpdate()

    //   // this.customerInfo(item.CustomerName, item.CustomerCode, item.LocationName)
    // },
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
        if (this.form.CampaignEndDate < this.form.CampaignBeginDate) {
          this.$toasted.show(this.$t('insert.fixedTermCampaign.startDateLessEndDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        // if (this.form.BudgetAmount === this.form.FixedTermCampaignDetails.Budget) {
        //   this.$toasted.show(this.$t('insert.fixedTermCampaign.budgetError'), {
        //     type: 'error',
        //     keepOnHover: true,
        //     duration: '3000'
        //   })
        //   return
        // }
        // this.form.FixedTermCampaignBranchs = this.form.FixedTermCampaignDetails
        //   .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID').map(a => {
        //     return {
        //       BranchId: a.ColumnValue,
        //       Code: a.code,
        //       CommercialTitle: a.text,
        //       RecordState: a.RecordState,
        //       RecordId: a.RecordId,
        //       StatusId: a.StatusId
        //     }
        //   })
        // this.form.FixedTermCampaignRoutes = this.form.FixedTermCampaignDetails
        //   .filter(f => f.TableName === 'T_ROUTE' && f.ColumnName === 'RECORD_ID').map(a => {
        //     return {
        //       RouteId: a.ColumnValue,
        //       Code: a.code,
        //       Description1: a.text,
        //       RecordState: a.RecordState,
        //       RecordId: a.RecordId,
        //       StatusId: a.StatusId
        //     }
        //   })
        // this.form.FixedTermCampaignCustomerCriterias = this.form.FixedTermCampaignDetails
        //   .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName !== 'RECORD_ID' && f.ColumnName !== 'BRANCH_ID').map(a => {
        //     return {
        //       ColumnName: a.ColumnName,
        //       ColumnValue: a.ColumnValue,
        //       ColumnNameDescription: a.ColumnNameStr,
        //       ColumnValueDescription: a.ColumnValueStr,
        //       RecordState: a.RecordState,
        //       RecordId: a.RecordId,
        //       StatusId: a.StatusId
        //     }
        //   })
        // this.form.FixedTermCampaignCustomers = this.form.FixedTermCampaignDetails
        //   .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'RECORD_ID')
        this.form.FixedTermCampaignDetails = [...this.form.FixedTermCampaignCustomers.filter(f => f.RecordState !== 4), ...this.form.FixedTermCampaignRoutes, ...this.form.FixedTermCampaignBranchs, ...this.form.FixedTermCampaignCustomerCriterias]
        if (this.form.UseBudget !== 1) {
          this.form.UseBudget = 0
        }
        this.createData()
      }
    },
    getCustomerCriteriaItems () {
      if (!this.customerItemAreaList || this.customerItemAreaList.length === 0) {
        this.$api.postByUrl({paramId: 'CUSTOMER_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
          this.customerItemAreaList = res.Values
        })
      }
    },
    successExcelImport (data) {
      if (data) {
        let list = []
        Object.keys(data).map(d => {
          let obj = data[d]
          let newObj = {
            RecordState: 2,
            StatusId: 1,
            Deleted: 0,
            System: 0,
            TableName: 'T_CUSTOMER',
            ColumnName: 'RECORD_ID',
            ColumnValue: obj.CustomerId,
            CustomerName: obj.CustomerDescription,
            CustomerCode: obj.CustomerCode,
            LocationName: obj.CustomerLocation,
            BudgetName: obj.Budget
          }
          list.push(newObj)
        })
        this.form.FixedTermCampaignDetails = list
      }
    },
    getRouteAndCondition () {
      let model = {
        Deleted: 0,
        StatusIds: [1]
      }
      if (this.selectedBranchCriteria && this.selectedBranchCriteria.Code === 'SL') {
        let branchIds = this.form.FixedTermCampaignDetails
          .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID')
          .map(f => f.ColumnValue)

        if (branchIds.length > 0) {
          model.BranchIds = branchIds
        }
      }

      return model
    }
  },
  watch: {
    customer (value) {
      if (value) {
        var me = this
        me.fixedTermCampaignCustomer.customerId = value.RecordId
        me.fixedTermCampaignCustomer.customerName = value.Description1
        me.fixedTermCampaignCustomer.customerCode = value.Code
        me.fixedTermCampaignCustomer.locationName = value.DefaultLocation.Label
        me.fixedTermCampaignCustomer.locationId = value.DefaultLocation.DecimalValue
        // let request = {
        //   customerId: value.RecordId
        // }
        // me.$api.post(request, 'Budget', 'BudgetMaster/GetCustomerBudget').then((res) => {
        //   if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
        //     let customerBudget = res.ListModel.BaseModels[0]
        //     me.fixedTermCampaignCustomer.budgetName = customerBudget.CustomerDesc
        //     me.$forceUpdate()
        //   }
        // })
        me.$api.post({RecordId: value.RecordId}, 'Customer', 'Customer/GetBranchesCustomerSearch').then((res) => {
          if (res && res.Model) {
            let defaultLocation = res.Model.DefaultLocation
            if (defaultLocation) {
              me.fixedTermCampaignCustomer.locationId = defaultLocation.DecimalValue
              me.fixedTermCampaignCustomer.locationName = defaultLocation.Label
              me.$forceUpdate()
            }
          }
        })
      } else {
        this.fixedTermCampaignCustomer = {}
      }
    },
    customerItemArea (value) {
      this.customerItemValueList = []
      this.customerItemValue = null
      if (value) {
        let me = this
        me.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          me.customerItemValueList = res.Values
          me.$forceUpdate()
        })
      }
    },
    campaignItemArea (value) {
      this.campaignItemValueList = []
      this.campaignItemValue = null
      if (value) {
        let me = this
        me.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          me.campaignItemValueList = res.Values
          me.$forceUpdate()
        })
      }
    }
  },
  validations () {
    if (!this.form.UseBudget) {
      this.insertRules.BudgetAmount = {}
      this.insertRules.CurrencyId = {}
      this.insertRequired.BudgetAmount = false
      this.insertRequired.CurrencyId = false
    } else {
      this.insertRules.BudgetAmount = {
        required
      }
      this.insertRules.CurrencyId = {
        required
      }
      this.insertRequired.BudgetAmount = true
      this.insertRequired.CurrencyId = true
    }
    return {
      form: this.insertRules,
      campaignItemArea: {
        required
      },
      campaignItemValue: {
        required
      },
      customerItemArea: {
        required
      },
      customerItemValue: {
        required
      },
      fixedTermCampaignDetail: {
        tableName: {
          required
        },
        columnName: {
          required
        },
        columnValue: {
          required
        }
      },
      fixedTermCampaignTaken: {
        startQuantity: {
          required
        },
        endQuantity: {
          required
        },
        paymentPeriod: {
          required
        }
      },
      fixedTermCampaignCustomer: {
        customerId: {
          required
        },
        customerCode: {
          required
        },
        locationId: {
          required
        }
      }
    }
  }
}
</script>
