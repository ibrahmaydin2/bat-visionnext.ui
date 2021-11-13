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
            <span><i class="fas fa-code" />  <b>{{$t('insert.branch.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.branch.Description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.branch.BranchCommercialTitle')}}:</b> {{ rowData.BranchCommercialTitle }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.branch.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.branch.branchRecords')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.TaxOffice, 'text', 'insert.branch.TaxOffice')"></div>
              <div v-html="getFormatDataByType(rowData.BranchRegion, 'object', 'insert.branch.BranchRegionId')"></div>
              <div v-html="getFormatDataByType(rowData.TaxNumber, 'text', 'insert.branch.TaxNumber')"></div>
              <div v-html="getFormatDataByType(rowData.UpperBranch, 'object', 'insert.branch.UpperBranchId')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.branch.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.DistributionType, 'object', 'insert.branch.DistributionTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseNumber, 'text', 'insert.branch.LicenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseValidDate, 'date', 'insert.branch.LicenseValidDate')"></div>
              <div v-html="getFormatDataByType(rowData.InvoiceCombineRule, 'object', 'insert.branch.InvoiceCombineRuleId')"></div>
              <div v-html="getFormatDataByType(rowData.IsOrderChangeUnitary, 'check', 'insert.branch.IsOrderChangeUnitary')"></div>
              <div v-html="getFormatDataByType(rowData.IsWarehouseSale, 'check', 'insert.branch.IsWarehouseSale')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BlockReason, 'object', 'insert.branch.BlockReasonId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesDocumentType, 'object', 'insert.branch.SalesDocumentTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.WebUrl, 'text', 'insert.branch.WebUrl')"></div>
              <div v-html="getFormatDataByType(rowData.TradeLicenseNumber, 'text', 'insert.branch.TradeLicenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.TaxCustomerType, 'object', 'insert.branch.TaxCustomerTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode2, 'text', 'insert.branch.FinanceCode2')"></div>
              <div v-html="getFormatDataByType(rowData.MersisNumber, 'text', 'insert.branch.MersisNumber')"></div>
              <div v-html="getFormatDataByType(rowData.UseEDispatchType, 'object', 'insert.branch.UseEDispatch')"></div>
              <div v-html="getFormatDataByType(rowData.IsBlocked, 'check', 'insert.branch.IsBlocked')"></div>
              <div v-html="getFormatDataByType(rowData.UseEInvoice, 'check', 'insert.branch.UseEInvoice')"></div>
              <div v-html="getFormatDataByType(rowData.UseEArchive, 'check', 'insert.branch.UseEArchive')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.locations')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="branchLocations" :items="customerLocationItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerFinancialInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DefaultPaymentType, 'object', 'insert.branch.DefaultPaymentTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentPeriodClass, 'object', 'insert.branch.PaymentPeriod')"></div>
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.branch.PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.CreditLimit, 'text', 'insert.branch.CreditLimit')"></div>
              <div v-html="getFormatDataByType(rowData.RiskLimit, 'text', 'insert.branch.RiskLimit')"></div>
              <div v-html="getFormatDataByType(rowData.CurrentCredit, 'text', 'insert.branch.CurrentCredit')"></div>
              <div v-html="getFormatDataByType(rowData.CurrentRisk, 'text', 'insert.branch.CurrentRisk')"></div>
              <div v-html="getFormatDataByType(rowData.DebitAccountRemainder, 'text', 'insert.branch.DebitAccountRemainder')"></div>
              <div v-html="getFormatDataByType(rowData.ManualInvoiceClosure, 'check', 'insert.branch.ManualInvoiceClosure')"></div>
              <div v-html="getFormatDataByType(rowData.Statement, 'check', 'insert.branch.Statement')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CreditAccountRemainder, 'text', 'insert.branch.CreditAccountRemainder')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountPercent1, 'text', 'insert.branch.DiscountPercent1')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountPercent2, 'text', 'insert.branch.DiscountPercent2')"></div>
              <div v-html="getFormatDataByType(rowData.TCIBreak1, 'object', 'insert.branch.TciBreak1Id')"></div>
              <div v-html="getFormatDataByType(rowData.TCIBreak2, 'object', 'insert.branch.TciBreak2Id')"></div>
              <div v-html="getFormatDataByType(rowData.StatementDay, 'object', 'insert.branch.StatementDay')"></div>
              <div v-html="getFormatDataByType(rowData.SapCustomerId, 'text', 'insert.branch.SapCustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.DeliveryDayParam, 'text', 'insert.branch.DeliveryDayParam')"></div>
              <div v-html="getFormatDataByType(rowData.AllowOverLimit, 'check', 'insert.branch.AllowOverLimit')"></div>
              <div v-html="getFormatDataByType(rowData.IsDirectDebit, 'check', 'insert.branch.IsDirectDebit')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.Detail')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DiscountGroup10, 'object', 'insert.branch.DiscountGroup10Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup2, 'object', 'insert.branch.DiscountGroup2Id')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.branch.Genexp1')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BankIban, 'text', 'insert.branch.BankIban')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup9, 'object', 'insert.branch.DiscountGroup9Id')"></div>
              <div v-html="getFormatDataByType(rowData.BankInfo, 'text', 'insert.branch.BankInfo')"></div>            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.creditHistories')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.BranchCreditHistories" :items="customerCreditHistoriesItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerItemDiscountCrts')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerItemDiscountCrts" :items="customerItemDiscountCrtItems"/>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.InvoiceSeqs')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.EInvoiceSeqs" :items="customerEInvoiceSeqsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.customerClassInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Category3, 'object', 'insert.branch.Category3Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category2, 'object', 'insert.branch.Category2Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.branch.Category1Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.branch.CustomerRegion5Id')"></div>
              <div v-html="getFormatDataByType(rowData.BackMarginGroup, 'object', 'insert.branch.BackMarginGroupId')"></div>
            </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../../mixins/index'
import { detailData } from '../detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      customerItemDiscounts: [],
      customerLocationItems: detailData.customerLocationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      customerEInvoiceSeqsItems: detailData.customerEInvoiceSeqsItems,
      customerItemDiscountCrtItems: detailData.customerItemDiscountCrtItems,
      branchLocations: []
    }
  },
  mounted () {
    this.getData()
    this.getBranchLocations()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBranch/api/Branch', record: this.$route.params.url}).then(() => {
        if (this.rowData.CustomerItemDiscountCrts && this.rowData.CustomerItemDiscountCrts.length > 0) {
          this.customerItemDiscounts = this.rowData.CustomerItemDiscountCrts[0]
        }
      })
    },
    getBranchLocations () {
      let request = {
        andConditionModel: {
          branchIds: [this.$route.params.url]
        }
      }
      this.$api.postByUrl(request, 'VisionNextBranch/api/BranchLocation/CustomSearch', 1000).then((response) => {
        if (response && response.ListModel) {
          this.branchLocations = response.ListModel.BaseModels
        }
      })
    }
  }
}
</script>
