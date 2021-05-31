<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria" :disabled="insertReadonly.CustomerCriteriaId" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown v-model="routeCriteria" :disabled="insertReadonly.RouteCriteriaId" lookup-key="ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="BranchCriteria" :disabled="insertReadonly.BranchCriteriaId" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput v-model="form.Genexp1" type="text" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.EmployeesList')" >
          <NextDetailPanel v-model="form.CycleInstructionEmployees" :items="employeeItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionBranches')" v-if="BranchCriteria && BranchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="branches" :items="branchItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionCustomers')" v-if="customerCriteria && customerCriteria.Code === 'ML'" >
          <NextDetailPanel v-model="customers" :items="customerItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionRoutes')" v-if="routeCriteria && routeCriteria.Code === 'RL'" >
          <NextDetailPanel v-model="routes" :items="routeItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionTaskItems')" >
          <NextDetailPanel v-model="form.CycleInstructionTasks" :items="taskItems" />
        </b-tab><b-tab :title="$t('insert.CycleInstruction.CycleInstructionCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="customerCriterias" :items="criteriaItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        CustomerCriteriaId: null,
        StatusId: null,
        RouteCriteriaId: null,
        BranchCriteriaId: null,
        BeginDate: null,
        EndDate: null,
        Genexp1: null,
        CycleInstructionEmployees: [],
        CycleInstructionDetails: []
      },
      routeName1: 'FieldManagement',
      branchItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'ColumnValue',
          parentProperty: null,
          url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Branch'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'T_CUSTOMER',
          parentId: null,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'BRANCH_ID',
          parentId: null,
          id: 3
        }
      ],
      customerItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'ColumnValue',
          parentProperty: null,
          url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Customer'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'T_CUSTOMER',
          parentId: null,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'RECORD_ID',
          parentId: null,
          id: 3
        }
      ],
      routeItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'ColumnValue',
          parentProperty: null,
          url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Route'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'T_ROUTE',
          parentId: null,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'RECORD_ID',
          parentId: null,
          id: 3
        }
      ],
      employeeItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'EmployeeId',
          parentProperty: null,
          url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Employee'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'EmployeeDescription',
          parentProperty: 'Description1',
          url: null,
          label: this.$t('insert.CycleInstruction.EmployeeDescription'),
          required: false,
          disabled: true,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          parentId: 1,
          id: null
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'BranchDescription',
          parentProperty: 'BranchId',
          url: 'VisionNextBranch/api/Branch/Get',
          label: this.$t('insert.CycleInstruction.BranchDescription'),
          required: false,
          disabled: true,
          visible: true,
          hideOnTable: false,
          isUnique: false,
          parentId: 1,
          id: null
        }
      ],
      taskItems: [
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'Code',
          parentProperty: null,
          url: null,
          label: this.$t('insert.CycleInstruction.TaskCode'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: false,
          parentId: null,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'Description1',
          parentProperty: null,
          url: null,
          label: this.$t('insert.CycleInstruction.TaskDescription1'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: false,
          parentId: null,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'Genexp1',
          parentProperty: null,
          url: null,
          label: this.$t('insert.CycleInstruction.TaskGenexp1'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: false,
          parentId: null,
          id: 3
        }
      ],
      criteriaItems: [
        {
          type: 'LookupWithUrl',
          inputType: null,
          modelProperty: 'ColumnName',
          parentProperty: 'ForeignField',
          request: null,
          url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
          label: this.$t('insert.CycleInstruction.AreaDesc'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: 1,
          id: 1
        },
        {
          type: 'Dropdown',
          inputType: null,
          modelProperty: 'ColumnValue',
          parentProperty: 'Label',
          request: JSON.stringify({ParamName: 'val'}),
          url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
          label: this.$t('insert.CycleInstruction.AreaValue'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: 1,
          id: 2
        }
      ],
      customerCriterias: [],
      branches: [],
      customers: [],
      routes: [],
      customerCriteria: {},
      BranchCriteria: {},
      routeCriteria: {}
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      this.form = this.rowData
      console.log(this.form)
      this.cycleInstructionBranches = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')

      this.BranchCriteria = this.form.BranchCriteria
      this.routeCriteria = this.form.RouteCriteria
      this.customerCriteria = this.form.CustomerCriteria
    },
    save () {
      this.form.CycleInstructionDetails = []
      this.form.CycleInstructionDetails.push(...this.branches, ...this.customers, ...this.routes, ...this.customerCriterias)
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
