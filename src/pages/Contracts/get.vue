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
            <GetFormField v-model="workFlowModel" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.detail')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.contract.ContractNumber')}}</span> <p>{{rowData.ContractNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.Description1')}}</span> <p>{{rowData.Description1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.FinanceCode')}}</span> <p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.CustomerFinanceCode')}}</span> <p>{{rowData.CustomerFinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.GroupId')}}</span> <p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.ClassId')}}</span> <p>{{rowData.Class ? rowData.Class.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.BrandId')}}</span> <p>{{rowData.Brand ? rowData.Brand.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.contract.TypeId')}}</span> <p>{{rowData.Type ? rowData.Type.Label : ''}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.contract.Canceled')}}</span> <p><i :class="rowData.Canceled === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p> -->
                <!-- <span><i class="far fa-circle" /> {{$t('insert.contract.CancelReason')}}</span> <p>{{rowData.CancelReason ? rowData.CancelReason.Label : ''}}</p> -->
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.contract.additionalCustomer')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('insert.contract.customer')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(result, i) in rowData.ContractRelatedCustomers" :key="i">
                      <b-td>{{result.Customer ? result.Customer.Label : ''}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.other')">
          <b-row>
            <b-col cols="12" md="6">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.contract.validDates')}}</h6>
                <b-table-simple responsive bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.ContractValidDates" :key="i">
                      <b-td>{{dateConvertFromTimezone(r.StartDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.EndDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.contract.contractBenefits')}}</h6>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.BenefitTypeId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BenefitBudget')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.ContractBenefits" :key="i">
                      <b-td>{{r.BenefitType ? r.BenefitType.Label : ''}}</b-td>
                      <b-td>{{r.BudgetMaster ? r.BudgetMaster.Label : ''}}</b-td>
                      <b-td>{{r.Currency ? r.Currency.Label : ''}}</b-td>
                      <b-td>{{r.BenefitBudget}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.contract.assets')}}</h6>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.ContractAssets" :key="i">
                      <b-td>{{r.AssetId}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.PlannedServiceDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      workFlowModel: {
        ControllerName: '',
        ClassName: 'Contract',
        PageName: 'pg_Contract'
      }
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContractManagement/api/Contract', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
