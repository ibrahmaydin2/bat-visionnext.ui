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
            <NextInput v-model="form.Code" type="text" :disabled="true" />
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
              <NextDropdown v-model="customerCriteria"
               :get-lookup="true"
               :disabled="insertReadonly.CustomerCriteriaId"
               label="Label"
               @input="selectedType('CustomerCriteriaId', $event)"
               :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code == 'MK' || c.Code === 'ML' || c.Code === 'TM'): [])"
               />
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown v-model="routeCriteria" :disabled="insertReadonly.RouteCriteriaId" :get-lookup="true" lookup-key="ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="BranchCriteria" :disabled="insertReadonly.BranchCriteriaId" :get-lookup="true" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
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
        <b-tab lazy :title="$t('insert.CycleInstruction.CycleInstructionBranches')" v-if="BranchCriteria && BranchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="branches" :items="branchItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.CycleInstruction.CycleInstructionCustomers')" v-if="(customerCriteria && customerCriteria.Code === 'ML') && (BranchCriteria && BranchCriteria.Code === 'SL' || BranchCriteria && BranchCriteria.Code === 'TS')" >
          <NextDetailPanel v-model="customers" :items="customerItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.CycleInstruction.CycleInstructionRoutes')" v-if="routeCriteria && routeCriteria.Code === 'RL'" >
          <NextDetailPanel v-model="routes" :items="routeItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionTaskItems')" >
          <NextDetailPanel v-model="form.CycleInstructionTasks" :items="taskItems" :before-add="beforeValidTasksAdd"/>
        </b-tab>
        <b-tab lazy :title="$t('insert.CycleInstruction.CycleInstructionCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="customerCriterias" :items="criteriaItems" />
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
      branchItems: detailData.branchItems,
      customerItems: detailData.customerItems,
      routeItems: detailData.routeItems,
      employeeItems: detailData.employeeItems,
      taskItems: detailData.taskItems,
      criteriaItems: detailData.criteriaItems,
      customerCriterias: [],
      branches: [],
      customers: [],
      routes: [],
      customerCriteria: {},
      BranchCriteria: {},
      routeCriteria: {}
    }
  },
  computed: {
    ...mapState(['createCode', 'lookup'])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let code = null
      if (this.$route.query.saveAs === 1) {
        code = this.form.Code
      }
      this.form = this.rowData
      this.branches = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')
      this.customerCriterias = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'BRANCH_ID' && i.ColumnName !== 'BRANCH_ID')
      this.customers = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
      this.routes = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_ROUTE' && i.ColumnName === 'RECORD_ID')
      this.BranchCriteria = this.form.BranchCriteria
      this.routeCriteria = this.form.RouteCriteria
      this.customerCriteria = this.form.CustomerCriteria
      if (code) {
        this.form.Code = code
      }
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
        this.updateData()
      }
    },
    beforeValidTasksAdd (item, list) {
      let filteredList = list.filter(l =>
        (l.Code <= item.Code && item.Code <= l.Code) ||
        (l.Description1 <= item.Description1 && item.Description1 <= l.Description1) ||
        (item.Description1 <= l.Description1 && l.Description1 <= item.Description1) ||
        (l.Genexp1 <= item.Genexp1 && item.Genexp1 <= l.Genexp1) ||
        (item.Genexp1 <= l.Genexp1 && l.Genexp1 <= item.Genexp1) ||
        (item.Code <= l.Code && l.Code <= item.Code))

      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('insert.CycleInstruction.sameTaskError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      return true
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
