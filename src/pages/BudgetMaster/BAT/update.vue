<template>
  <b-row class="asc__insertPage">
    <b-modal id="detail-modal" size="lg" hide-footer :title="$t('insert.budgetMaster.budgetMovements')" no-close-on-backdrop>
      <BudgetDetail :budget-detail="selectedBudgetDetail"/>
    </b-modal>
    <b-modal id="monthly-budget-detail-modal" size="lg" hide-footer :title="$t('insert.budgetMaster.monthlyBudgetDetail')" no-close-on-backdrop>
      <MonthlyBudgetDetails :budget-detail="selectedBudgetDetail"/>
    </b-modal>
    <b-modal id="budget-spending-detail-modal" size="md" hide-footer :title="$t('insert.budgetMaster.budgetSpendingDetail')" no-close-on-backdrop>
      <BudgetSpendingDetail :budget-detail="selectedBudgetDetail"/>
    </b-modal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'BudgetMaster' }">
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
            <NextInput v-model="form.Code" type="text" disabled />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" disabled toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.budgetMaster.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="BudgetGroupId" :error="$v.form.BudgetGroupId">
              <NextDropdown v-model="budgetGroup" disabled @input="selectedType('BudgetGroupId', $event)" lookup-key="BUDGET_GROUP"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerColumnName" :error="$v.form.CustomerColumnName">
              <NextDropdown v-model="customerColumnName" disabled @input="selectCustomerColumnName($event)" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams" label="Label" :dynamic-request="{paramId: 'CUSTOMER_CRITERIA'}" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerColumnValue" :error="$v.form.CustomerColumnValue">
              <NextDropdown v-model="customerColumnValue" disabled @input="selectedType('CustomerColumnValue', $event)" :source="customerColumnValues" label="Desc"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown v-model="currency" disabled @input="selectedSearchType('CurrencyId', $event)" :source="currencies" />
            </NextFormGroup>
             <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="branchCriteria" disabled @input="selectedType('BranchCriteriaId', $event)" label="Label" :source="(lookup.BRANCH_CRITERIA ? lookup.BRANCH_CRITERIA.filter(b => b.Code != 'SK') : [])" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.budgetMaster.budgetDetail')">
          <NextDetailPanel v-model="form.Budgets" :items="budgetItems" :get-detail="getDetail" :before-add="beforeValidDatesAdd" :detail-buttons="detailButtons"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.budgetMaster.branches')" v-if="branchCriteria && branchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="form.SelectedBranches" :items="selectedBranchItems"></NextDetailPanel>
        </b-tab>
        <b-tab title="Bütçe Onaylayıcıları" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup title="1. Bütçe Onaylayıcı *" :error="$v.form.EmployeeId">
                <NextDropdown
                  v-model="employee"
                  :disabled="insertReadonly.EmployeeId"
                  @input="selectEmployee($event)"
                  or-condition-fields="Code,Description1,EmployeeDesc"
                  :dynamic-and-condition="{GroupIds: [1,12,14,20,999]}"
                  label="EmployeeDesc"
                  url="VisionNextSystem/api/SysUser/SearchForNonBranchWithEmployee" searchable/>
            </NextFormGroup>
            <NextFormGroup title="Minimum Tutar" :error="$v.form.Employee1MinAmount">
                <NextInput  type="number" v-model="form.Employee1MinAmount" :disabled="insertReadonly.Employee1MinAmount" readonly/>
            </NextFormGroup>
            <NextFormGroup title="Maximum Tutar">
                <NextInput  type="number" v-model="form.Employee1MaxAmount"/>
            </NextFormGroup>
          </b-row>  
          <b-row>
            <NextFormGroup title="2. Bütçe Onaylayıcı" :error="$v.form.Employee2Id">
                <NextDropdown
                  v-model="employee2"
                  :disabled="insertReadonly.Employee2Id"
                  @input="selectEmployee2($event)"
                  or-condition-fields="Code,Description1,EmployeeDesc"
                  :dynamic-and-condition="{GroupIds: [1,12,14,20,999]}"
                  label="EmployeeDesc"
                  url="VisionNextSystem/api/SysUser/SearchForNonBranchWithEmployee" searchable/>
            </NextFormGroup>
            <NextFormGroup title="Minimum Tutar">
                <NextInput  type="number" v-model="Employee2MinAmount" readonly/>
            </NextFormGroup>
            <NextFormGroup title="Maximum Tutar">
                <NextInput  type="number" v-model="form.Employee2MaxAmount"/>
            </NextFormGroup>
          </b-row>  
          <b-row>
            <NextFormGroup title="3. Bütçe Onaylayıcı " :error="$v.form.Employee3Id">
                <NextDropdown
                  v-model="employee3"
                  :disabled="insertReadonly.Employee3Id"
                  @input="selectEmployee3($event)"
                  or-condition-fields="Code,Description1,EmployeeDesc"
                  :dynamic-and-condition="{GroupIds: [1,12,14,20,999]}"
                  label="EmployeeDesc"
                  url="VisionNextSystem/api/SysUser/SearchForNonBranchWithEmployee" searchable/>
            </NextFormGroup>
            <NextFormGroup title="Minimum Tutar">
                <NextInput  type="number" v-model="Employee3MinAmount" readonly />
            </NextFormGroup>
            <NextFormGroup title="Maximum Tutar">
                <NextInput  type="number" v-model="form.Employee3MaxAmount" readonly/>
            </NextFormGroup>
          </b-row>  
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../../mixins/update'
import Index from '../../index.vue'
import { detailData } from './../detailPanelData'
import BudgetDetail from './../Details.vue'
import MonthlyBudgetDetails from './../MonthlyBudgetDetails.vue'
import BudgetSpendingDetail from './../BudgetSpendingDetail.vue'

export default {
  mixins: [updateMixin],
  components: {
    BudgetDetail,
    MonthlyBudgetDetails,
    Index,
    BudgetSpendingDetail
  },
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        EmployeeId: null,
        Employee2Id: null,
        Employee3Id: null,
        Employee1MinAmount: 0,
        Employee2MinAmount: '',
        Employee3MinAmount: '',
        Employee1MaxAmount: '',
        Employee2MaxAmount: '',
        Employee3MaxAmount: '',
        BudgetGroupId: null,
        CustomerColumnName: null,
        CustomerColumnValue: null,
        CurrencyId: null,
        BranchCriteriaId: null,
        CompanyId: null,
        BranchId: null,
        Code: null,
        Description1: null,
        Budgets: []
      },
      routeName1: 'Budget',
      customerColumnValue: null,
      customerColumnValues: [],
      currency: null,
      currencies: [],
      branchCriteria: null,
      employee: null,
      employee2: null,
      employee3: null,
      budgetGroup: null,
      customerColumnName: null,
      budgetItems: detailData.budgetItems,
      selectedBranchItems: detailData.selectedBranchItems,
      selectedBudgetDetail: null,
      detailButtons: [
        {
          title: this.$t('insert.budgetMaster.monthlyBudgetDetail'),
          icon: 'fa fa-list',
          getDetail: (data) => {
            this.getMonthlyBudgetDetail(data)
          }
        },
        {
          title: this.$t('insert.budgetMaster.budgetSpendingDetail'),
          icon: 'fa fa-arrow-right',
          getDetail: (data) => {
            this.getBudgetSpendingDetail(data)
          }
        }
      ]
    }
  },
  mounted () {
    this.getInsertPage()
  },
  computed: {
        Employee2MinAmount: {
          get () {
            return this.form.Employee1MaxAmount - 0 + 1
          },
          set (value) {
            this.form.Employee2MinAmount = value
          }
        },
        Employee3MinAmount: {
          get () {
            return this.form.Employee2MaxAmount - 0 + 1
          },
          set (value) {
            this.form.Employee3MinAmount = value
          }
        }
      },
  methods: {
    getInsertPage () {
      this.getData().then(() => this.setData())
      this.getCurrencies()
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      if (rowData.Employee) {
        this.employee = {
          EmployeeId: rowData.Employee.DecimalValue,
          EmployeeDesc: rowData.Employee.Label
        }
      }
      if (rowData.Employee2) {
        this.employee2 = {
          Employee2Id: rowData.Employee2.DecimalValue,
          EmployeeDesc: rowData.Employee2.Label
        }
      }
      if (rowData.Employee3) {
        this.employee3 = {
          Employee3Id: rowData.Employee3.DecimalValue,
          EmployeeDesc: rowData.Employee3.Label
        }
      }
      this.budgetGroup = rowData.BudgetGroup
      this.customerColumnName = rowData.CustomerColumnNameDesc
      this.customerColumnValue = rowData.CustomerColumnValueDesc
      this.currency = this.convertLookupValueToSearchValue(rowData.Currency)
      this.branchCriteria = rowData.BranchCriteria
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
        this.form.Budgets.Employee2Id = this.form.Employee2Id
        this.form.Budgets.Employee3Id = this.form.Employee3Id
        this.updateData()
      }
    },
    beforeValidDatesAdd (item, list, isUpdated) {
      let filteredList = list.filter(l =>
        l.RecordState !== 4 &&
        !isUpdated &&
        ((l.BeginDate <= item.BeginDate && item.BeginDate <= l.EndDate) ||
        (l.BeginDate <= item.EndDate && item.EndDate <= l.EndDate) ||
        (item.BeginDate <= l.BeginDate && l.BeginDate <= item.EndDate) ||
        (item.BeginDate <= l.EndDate && l.EndDate <= item.EndDate)))

      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('insert.budgetMaster.timeControl'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      return true
    },
    selectCustomerColumnName (customerColumnName) {
      this.form.CustomerColumnValue = null
      this.customerColumnValue = null
      this.customerColumnValues = []
      if (customerColumnName) {
        this.form.CustomerColumnName = customerColumnName.ForeignField
        let model = {
          ParamName: customerColumnName.Label
        }
        this.$api.postByUrl(model, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((response) => {
          if (response) {
            this.customerColumnValues = response.Values
          }
        })
      } else {
        this.form.CustomerColumnName = null
      }
    },
    getCurrencies () {
      this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
        }
      })
    },
    getDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('detail-modal')
    },
    getMonthlyBudgetDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('monthly-budget-detail-modal')
    },
    getBudgetSpendingDetail (data) {
      this.selectedBudgetDetail = data
      this.$bvModal.show('budget-spending-detail-modal')
    },
    selectEmployee (value) {
      if (value) {
        this.employee = value
        this.form.EmployeeId = value.EmployeeId
      } else {
        this.employee = null
        this.form.EmployeeId = null
      }
    },
    selectEmployee2 (value) {
      if (value) {
        this.employee2 = value
        this.form.Employee2Id = value.EmployeeId
      } else {
        this.employee2 = null
        this.form.Employee2Id = null
      }
    },
    selectEmployee3 (value) {
      if (value) {
        this.employee3 = value
        this.form.Employee3Id = value.EmployeeId
      } else {
        this.employee3 = null
        this.form.Employee3Id = null
      }
    }
  }
}
</script>
