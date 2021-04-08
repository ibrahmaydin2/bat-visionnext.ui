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
        <b-tab :title="$t('insert.contract.management')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.contract.Description1')"></div>
              <div v-html="getFormatDataByType(rowData.ContractNumber, 'text', 'insert.contract.ContractNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.contract.ClassId')"></div>
              <div v-html="getFormatDataByType(rowData.Brand, 'object', 'insert.contract.BrandId')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.contract.GenExp')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.contract.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerFinanceCode, 'text', 'insert.contract.CustomerFinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'insert.contract.ApproveStateId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.contract.TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.contract.CustomerId')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.additionalCustomer')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.customer')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.ContractRelatedCustomers" :key="i">
                      <b-td>{{r.Customer ? r.Customer.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractValidDates" :key="i">
                      <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.BenefitTypeId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BenefitBudget')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.TciBreak1Id')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractBenefits" :key="i">
                      <b-td>{{c.BenefitType ? c.BenefitType.Label : ''}}</b-td>
                      <b-td>{{c.BudgetMaster ? c.BudgetMaster.Label : ''}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                      <b-td>{{c.BenefitBudget}}</b-td>
                      <b-td>{{c.TciBreak1 ? c.TciBreak1.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.assets')" v-if="showAssets">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractAssets" :key="i">
                      <b-td>{{c.Asset ? c.Asset.Label : ''}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.PlannedServiceDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractItems')" v-if="rowData.TypeId && rowData.TypeId !== 4">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractItems" :key="i">
                      <b-td>{{c.ColumnName}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.QuotaType ? c.QuotaType.Label : ''}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{c.QuotaAmount}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPriceDiscounts')" v-if="showPriceDiscount">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.discountAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.itemFormula')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractPriceDiscounts" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.DiscountAmount}}</b-td>
                      <b-td>{{c.QuotaAmount}}</b-td>
                      <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : ''}}</b-td>
                      <b-td>{{c.BudgetAmount}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{c.ItemFormula ? c.ItemFormula.Label : ''}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractInvestments')" v-if="showInvestments">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedInvestedAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedInvestmentDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.description1')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractInvestments" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.InvestedAmount}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.PlannedInvestmentDate)}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{c.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractDiscounts')" v-if="showDiscounts">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.discountRate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractDiscounts" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.ColumnName}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                      <b-td>{{c.DiscountRate}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.BudgetAmount}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : ''}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
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
      },
      showAssets: false,
      showPriceDiscount: false,
      showInvestments: false,
      showDiscounts: false
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
      var me = this
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContractManagement/api/Contract', record: this.$route.params.url}).then(() => {
        me.showAssets = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 4)
        me.showPriceDiscount = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 6)
        me.showInvestments = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 5)
        me.showDiscounts = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 1)
      })
    }
  }
}
</script>
