<template>
  <b-row class="asc__insertPage">
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
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.budgetMaster.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId">
              <NextDropdown v-model="employee" :disabled="insertReadonly.EmployeeId" @input="selectedSearchType('EmployeeId', $event)" :dynamic-and-condition="{GroupIds: [1,12,14,20,999]}" label="EmployeeDesc" url="VisionNextSystem/api/SysUser/SearchForNonBranchWithEmployee" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetGroupId" :error="$v.form.BudgetGroupId">
              <NextDropdown :disabled="insertReadonly.BudgetGroupId" @input="selectedType('BudgetGroupId', $event)" lookup-key="BUDGET_GROUP"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerColumnName" :error="$v.form.CustomerColumnName">
              <NextDropdown :disabled="insertReadonly.CustomerColumnName" @input="selectCustomerColumnName($event)" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams" label="Label" :dynamic-request="{paramId: 'CUSTOMER_CRITERIA'}" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerColumnValue" :error="$v.form.CustomerColumnValue">
              <NextDropdown v-model="customerColumnValue" :disabled="!form.CustomerColumnName" @input="selectedType('CustomerColumnValue', $event)" :source="customerColumnValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown v-model="currency" :disabled="insertReadonly.CurrencyId" @input="selectedSearchType('CurrencyId', $event)" :source="currencies" />
            </NextFormGroup>
             <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="branchCriteria" :disabled="insertReadonly.BranchCriteriaId" @input="selectedType('BranchCriteriaId', $event)" label="Label" :source="(lookup.BRANCH_CRITERIA ? lookup.BRANCH_CRITERIA.filter(b => b.Code != 'SK') : [])" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.budgetMaster.budgetDetail')">
          <NextDetailPanel v-model="form.Budgets" :items="budgetItems" :before-add="beforeValidDatesAdd"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.budgetMaster.branches')" v-if="branchCriteria && branchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="form.SelectedBranches" :items="selectedBranchItems"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../../mixins/insert'
import { detailData } from './../detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        EmployeeId: null,
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
      budgetItems: detailData.budgetItems,
      selectedBranchItems: detailData.selectedBranchItems
    }
  },
  mounted () {
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      this.createManualCode()
      this.getUserInfo()
      this.getCurrencies()
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
        this.fillBudgets()
        this.createData()
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
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.employee = `${userModel.Name} ${userModel.Surname}`
            this.form.EmployeeId = user.EmployeeId
          }
        })
      }
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
          this.currency = response.ListModel.BaseModels[0]
          this.form.CurrencyId = this.currency.RecordId
        }
      })
    },
    fillBudgets () {
      this.form.Budgets = this.form.Budgets.map((budget) => {
        budget.Code = this.form.Code
        budget.Description1 = this.form.Description1
        budget.EmployeeId = this.form.EmployeeId
        budget.BudgetGroupId = this.form.BudgetGroupId
        budget.CustomerColumnName = this.form.CustomerColumnName
        budget.CustomerColumnValue = this.form.CustomerColumnValue
        budget.CurrencyId = this.form.CurrencyId
        budget.BranchCriteriaId = this.form.BranchCriteriaId

        return budget
      })
    }
  }
}
</script>
