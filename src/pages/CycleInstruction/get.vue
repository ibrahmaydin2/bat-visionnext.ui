<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'get.CycleInstruction.CustomerCriteriaId')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCriteria, 'object', 'get.CycleInstruction.RouteCriteriaId')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'get.CycleInstruction.BranchCriteriaId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'get.CycleInstruction.BeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.EndDate, 'date', 'get.CycleInstruction.EndDate')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'get.CycleInstruction.Genexp1')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.EmployeesList')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CycleInstructionEmployees" :items="employeeItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionCriterias')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="customerItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionBranches')" v-if="rowData.BranchCriteria && rowData.BranchCriteria.Code === 'SL'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="branches" :items="branchItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionCustomers')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'" >
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customers" :items="customerItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionRoutes')" v-if="rowData.RouteCriteria && rowData.RouteCriteria.Code === 'RL'" >
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="routes" :items="routeItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionTaskItems')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DefinedCustomerCount, 'text', 'get.CycleInstruction.CustomerCount')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ActivityFinishRate, 'text', 'get.CycleInstruction.ActivityRate')"></div>
            </b-card>
          </b-row>
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CycleInstructionTasks" :items="taskItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      branchItems: detailData.branchItems,
      customerItems: detailData.customerItems,
      routeItems: detailData.routeItems,
      employeeItems: detailData.employeeItems,
      taskItems: detailData.taskItems,
      criteriaItems: detailData.criteriaItems,
      branches: [],
      customerCriterias: [],
      customers: [],
      routes: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldManagement/api/CycleInstruction', record: this.$route.params.url})
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        this.branches = e.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')
        this.customerCriterias = e.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'BRANCH_ID' && i.ColumnName !== 'BRANCH_ID')
        this.customers = e.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
        this.routes = e.CycleInstructionDetails.filter(i => i.TableName === 'T_ROUTE' && i.ColumnName === 'RECORD_ID')
      }
    }
  }
}
</script>
