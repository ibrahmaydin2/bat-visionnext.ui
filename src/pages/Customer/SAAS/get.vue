<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData ? rowData.Description1 : ''" />
            <GetFormField v-model="workFlowModel"/>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            SAAS
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.code')}}:</b> {{rowData.Code && rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.Model_StatusReasonId')}}:</b> {{rowData.StatusReason ? rowData.StatusReason.Label : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.customer.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CommercialTitle, 'text', 'insert.customer.Model_CommercialTitle')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.customer.Model_Description1')"></div>
              <div v-html="getFormatDataByType(rowData.TaxOffice, 'text', 'insert.customer.Model_TaxOffice')"></div>
              <div v-html="getFormatDataByType(rowData.TaxNumber, 'text', 'insert.customer.Model_TaxNumber')"></div>
              <div v-html="getFormatDataByType(rowData.UseEInvoice, 'check', 'insert.customer.Model_UseEInvoice')"></div>
              <div v-html="getFormatDataByType(rowData.UsingReferenceNumber, 'check', 'insert.customer.UsingReferenceNumber')"></div>
              <div v-html="getFormatDataByType(rowData.IsPublic, 'check', 'insert.customer.IsPublic')"></div>
              <div v-html="getFormatDataByType(rowData.IsBlocked, 'check', 'insert.customer.IsBlocked')"></div>
              <div v-html="getFormatDataByType(rowData.IsAutoBlockingOff, 'check', 'insert.customer.IsAutoBlockingOff')"></div>
              <div v-html="getFormatDataByType(rowData.ManualSItem, 'check', 'insert.customer.ManualSItem')"></div>

              <div v-html="getFormatDataByType(rowData.DeliveryDayParam, 'text', 'insert.customer.Model_DeliveryDayParam')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.customer.Model_CardTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.customer.Model_TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesType, 'object', 'insert.customer.Model_SalesTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesPriceChangeRate, 'text', 'insert.customer.Model_SalesPriceChangeRate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerLocations" :items="locationItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
         <b-row class="p-4">
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.LicenseNumber, 'text', 'insert.customer.LicenseNumber')"></div>
                <div v-html="getFormatDataByType(rowData.Category3, 'object', 'insert.customer.Model_Category3Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category2, 'object', 'insert.customer.Model_Category2Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.customer.Model_Category1Id')"></div>
                <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.customer.Model_GroupId')"></div>
                <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.customer.Model_ClassId')"></div>
                <div v-html="getFormatDataByType(rowData.SalesDocumentType, 'object', 'insert.customer.Model_SalesDocumentTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.InvoiceCombineRule, 'object', 'insert.customer.Model_InvoiceCombineRuleId')"></div>
            </b-card>
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.OwnerType, 'object', 'insert.customer.Model_OwnerTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposal, 'object', 'insert.customer.Model_ClassProposalId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposalReason, 'object', 'insert.customer.Model_ClassProposalReasonId')"></div>
                <div v-html="getFormatDataByType(rowData.SalesMethod, 'object', 'insert.customer.Model_SalesMethodId')"></div>
                <div v-html="getFormatDataByType(rowData.GeographicEnvironment, 'object', 'insert.customer.Model_GeographicEnvironmentId')"></div>
                <div v-html="getFormatDataByType(rowData.TradeFocus, 'object', 'insert.customer.Model_TradeFocusId')"></div>
                <div v-html="getFormatDataByType(rowData.BackMarginGroup, 'object', 'insert.customer.Model_BackMarginGroupId')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup4Id, 'object', 'insert.customer.Model_DiscountGroup4Id')"></div>
                <div v-html="getFormatDataByType(rowData.Kind, 'object', 'insert.customer.Model_KindId')"></div>
                <div v-html="getFormatDataByType(rowData.TextField6, 'object', 'insert.customer.Model_TextField6')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.AdditionalClassInformation')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.Field1, 'object', 'insert.customer.Model_Field1')"></div>
                <div v-html="getFormatDataByType(rowData.Field2, 'object', 'insert.customer.Model_Field2')"></div>
                <div v-html="getFormatDataByType(rowData.Field3, 'object', 'insert.customer.Model_Field3')"></div>
                <div v-html="getFormatDataByType(rowData.Field4, 'object', 'insert.customer.Model_Field4')"></div>
                <div v-html="getFormatDataByType(rowData.Field5, 'object', 'insert.customer.Model_Field5')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup1, 'object', 'insert.customer.Model_DiscountGroup1Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup3, 'object', 'insert.customer.Model_DiscountGroup3Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DiscountGroup5, 'object', 'insert.customer.Model_DiscountGroup5Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup6, 'object', 'insert.customer.Model_DiscountGroup6Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup7, 'object', 'insert.customer.Model_DiscountGroup7Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup8, 'object', 'insert.customer.Model_DiscountGroup8Id')"></div>
                <div v-html="getFormatDataByType(rowData.Activity1, 'object', 'insert.customer.Activity1Id')"></div>
                <div v-html="getFormatDataByType(rowData.OutSourceOrder, 'object', 'insert.customer.OutSourceOrderId')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row class="p-4">
           <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DefaultPaymentType, 'object', 'insert.customer.Model_DefaultPaymentTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.PaymentPeriod, 'text', 'insert.customer.Model_PaymentPeriod')"></div>
                <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
                <div v-html="getFormatDataByType(rowData.CreditLimit, 'text', 'insert.customer.Model_CreditLimit')"></div>
                <div v-html="getFormatDataByType(rowData.RiskLimit, 'text', 'insert.customer.Model_RiskLimit')"></div>
                <div v-html="getFormatDataByType(rowData.ReservedLimit, 'object', 'insert.customer.reservedLimit')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentCredit')}}</span><p>{{rowData.CurrentCredit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentRisk')}}</span><p>{{rowData.CurrentRisk}}</p>
                <div v-html="getFormatDataByType(rowData.DebitAccountRemainder, 'object', 'insert.customer.debitAccountRemainder')"></div>
                <div v-html="getFormatDataByType(rowData.CreditAccountRemainder, 'object', 'insert.customer.creditAccountRemainder')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.allowOverLimit')}}</span><p><i :class="rowData.allowOverLimit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.isDirectDebit')}}</span><p><i :class="rowData.isDirectDebit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
            </b-card>
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DiscountPercent1, 'text', 'insert.customer.Model_DiscountPercent1')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountPercent2, 'text', 'insert.customer.Model_DiscountPercent2')"></div>
                <div v-html="getFormatDataByType(rowData.MainOfBranch, 'object', 'insert.customer.mainOfBranch')"></div>
                <div v-html="getFormatDataByType(rowData.TciBreak1Id, 'object', 'insert.customer.TciBreak1')"></div>
                <div v-html="getFormatDataByType(rowData.TciBreak2Id, 'object', 'insert.customer.TciBreak2')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p><i :class="rowData.ManualInvoiceClosure === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.isBlackListed')}}</span><p><i :class="rowData.isBlackListed === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <div v-html="getFormatDataByType(rowData.StatementDay, 'object', 'insert.customer.statement')"></div>
                <div v-html="getFormatDataByType(rowData.Statement, 'check', 'insert.customer.statementDay')"></div>
                <div v-html="getFormatDataByType(rowData.sapCustomerId, 'object', 'insert.customer.sapCustomerId')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DeliveryDayParam')}}</span><p>{{rowData.DeliveryDayParam}}</p>
                <div v-html="getFormatDataByType(rowData.BlockReason, 'object', 'insert.customer.Model_BlockReasonId')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p><i :class="rowData.ManualInvoiceClosure === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerRegion5Id')}}</span><p>{{rowData.CustomerRegion5 ? rowData.CustomerRegion5.Label : ''}}</p>
             </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerCreditHistories" :items="customerCreditHistoriesItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.TextField1, 'text', 'insert.customer.Model_TextField1')"></div>
                <div v-html="getFormatDataByType(rowData.TextField2, 'text', 'insert.customer.Model_TextField2')"></div>
                <div v-html="getFormatDataByType(rowData.TextField3, 'text', 'insert.customer.Model_TextField3')"></div>
                <div v-html="getFormatDataByType(rowData.TextField4, 'text', 'insert.customer.Model_TextField4')"></div>
                <div v-html="getFormatDataByType(rowData.Barcode, 'text', 'insert.customer.Barcode')"></div>
                <div v-html="getFormatDataByType(rowData.HoldsAsset, 'object', 'insert.customer.HoldsAsset')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.Contracted, 'object', 'insert.customer.Contracted')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup10, 'object', 'insert.customer.DiscountGroup10Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup2, 'object', 'insert.customer.DiscountGroup2Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup9, 'object', 'insert.customer.DiscountGroup9Id')"></div>
                <div v-html="getFormatDataByType(rowData.SignName, 'object', 'insert.customer.SignNameId')"></div>
                <div v-html="getFormatDataByType(rowData.IsOpportunitySpot, 'check', 'insert.customer.IsOpportunitySpot')"></div>
                <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.customer.Genexp1')"></div>
                <div v-html="getFormatDataByType(rowData.TrackCode, 'text', 'insert.customer.TrackCode')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerPaymentTypes" :items="paymentTypesItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerItemDiscounts" :items="customerDiscountsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.RouteDetails')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.RouteDetails" :items="routeDetailsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.assetLocationsItems')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.AssetLocations" :items="assetLocationsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerTouchpoints')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerTouchpoints" :items="customerTouchpointsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerLabel')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerLabels" :items="customerLabelsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerItems')" v-if="rowData.ManualSItem === 1">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerSItems" :items="customersItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerAnalysisHistories')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerAnalysisHistories" :items="customerAnalysisItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerStatusHistories')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerStatusHistories" :items="customerStatusHistoriesItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerAccountTeams')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerAccountTeams" :items="customerAccountTeamsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerRegion')">
         <b-row class="p-4">
              <b-card class="col-md-12 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.customer.Model_CustomerRegion5Id')"></div>
                <div v-html="getFormatDataByType(rowData.MarketingRegion5, 'object', 'insert.customer.marketingRegion5')"></div>
              </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.licenseInfo')">
         <b-row class="p-4">
              <b-card class="col-md-12 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.IsLicenseRequired, 'check', 'insert.customer.IsLicenseRequired')"></div>
                <div v-html="getFormatDataByType(rowData.LicenseStartDate, 'date', 'insert.customer.LicenseStartDate')"></div>
                <div v-html="getFormatDataByType(rowData.LicenseEndDate, 'date', 'insert.customer.LicenseEndDate')"></div>
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
import { detailData } from './../detailPanelData'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_Customer'
      },
      locationItems: detailData.locationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      paymentTypesItems: detailData.paymentTypesItems,
      customerDiscountsItems: detailData.customerDiscountsItems,
      routeDetailsItems: detailData.routeDetailsItems,
      assetLocationsItems: detailData.assetLocationsItems,
      customerTouchpointsItems: detailData.customerTouchpointsItems,
      customerLabelsItems: detailData.customerLabelsItems,
      customersItems: detailData.customersItems,
      customerAnalysisItems: detailData.customerAnalysisItems,
      customerStatusHistoriesItems: detailData.customerStatusHistoriesItems,
      customerAccountTeamsItems: detailData.customerAccountTeamsItems,
      fixedTermFields: [
        {key: 'FixedTermId', label: this.$t('insert.customer.Model_FixedTermId'), sortable: true}
      ],
      discountFields: [
        {key: 'Description1', label: 'Açıklama', sortable: true},
        {key: 'TCIBreak1Id', label: 'TCI 1', sortable: true},
        {key: 'TCIBreak2Id', label: 'TCI 2', sortable: true},
        {key: 'StartDate', label: 'Başlangıç Tarihi', sortable: true},
        {key: 'EndDate', label: 'Bitiş Tarihi', sortable: true},
        {key: 'DiscountPercent1', label: 'Müşteri İndirimi 1', sortable: true},
        {key: 'DiscountPercent2', label: 'Müşteri İndirimi 2', sortable: true}
      ],
      Location: {}
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/Customer', record: this.$route.params.url})
    },
    showMap (item) {
      this.Location = item
      if (item.XPosition == null || item.YPosition == null) {
        this.$toasted.show(this.$t('index.errorLocation'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.$nextTick(() => {
        this.$root.$emit('bv::show::modal', 'location-modal', item)
      })
    }
  }
}
</script>
<style lang="sass">
</style>
