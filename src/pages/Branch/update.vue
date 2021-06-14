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
          <NextFormGroup item-key="BranchCommercialTitle" :error="$v.form.BranchCommercialTitle">
            <NextInput v-model="form.BranchCommercialTitle" type="text" :disabled="insertReadonly.BranchCommercialTitle" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.branch.branchRecords')" active>
          <b-row>
            <NextFormGroup item-key="TaxOffice" :error="$v.form.TaxOffice">
              <NextInput v-model="form.TaxOffice" type="text" :disabled="insertReadonly.TaxOffice" />
            </NextFormGroup>
            <NextFormGroup item-key="BranchRegionId" :error="$v.form.BranchRegionId">
              <NextDropdown v-model="branchRegion" :disabled="insertReadonly.BranchRegionId" url="VisionNextCommonApi/api/Region/Search" @input="selectedSearchType('BranchRegionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
              <NextInput v-model="form.TaxNumber" type="text" :disabled="insertReadonly.TaxNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="UpperBranchId" :error="$v.form.UpperBranchId">
              <NextDropdown v-model="form.upperBranch" :disabled="insertReadonly.UpperBranchId" url="VisionNextBranch/api/Branch/Search" @input="selectedSearchType('UpperBranchId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="DistributionTypeId" :error="$v.form.DistributionTypeId">
              <NextDropdown v-model="distributionType" :disabled="insertReadonly.DistributionTypeId" lookup-key="BRANCH_DISTRIBUTION_TYPE"  @input="selectedType('DistributionTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput v-model="form.LicenseNumber" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseNumber">
              <NextInput v-model="form.LicenseValidDate" type="date" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown v-model="invoiceCombineRule" :disabled="insertReadonly.InvoiceCombineRuleId"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BlockReasonId" :error="$v.form.BlockReasonId">
              <NextDropdown v-model="blockReason" :disabled="insertReadonly.BlockReasonId"  lookup-key="CUSTOMER_BLOCK_REASON" @input="selectedType('BlockReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown v-model="salesDocumentType" :disabled="insertReadonly.SalesDocumentTypeId" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
              <NextFormGroup item-key="WebUrl" :error="$v.form.WebUrl">
            <NextInput v-model="form.WebUrl" type="text" :disabled="insertReadonly.WebUrl" />
            </NextFormGroup>
            <NextFormGroup item-key="TradeLicenseNumber" :error="$v.form.TradeLicenseNumber">
              <NextInput v-model="form.TradeLicenseNumber" type="text" :disabled="insertReadonly.TradeLicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxCustomerTypeId" :error="$v.form.TaxCustomerTypeId">
              <NextDropdown v-model="taxCustomerType" :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2">
              <NextInput v-model="form.FinanceCode2" type="text" :disabled="insertReadonly.FinanceCode2" />
            </NextFormGroup>
            <NextFormGroup item-key="MersisNumber" :error="$v.form.MersisNumber">
              <NextInput v-model="form.MersisNumber" type="text" maxLength="50" :oninput="maxLengthControl" :disabled="insertReadonly.MersisNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="UseEDispatch" :error="$v.form.UseEDispatch">
              <NextDropdown v-model="useEDispatch" :disabled="insertReadonly.UseEDispatch" url="VisionNextCommonApi/api/EDocumentUseType/Search" @input="selectedSearchType('UseEDispatch', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderChangeUnitary" :error="$v.form.IsOrderChangeUnitary">
              <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsWarehouseSale" :error="$v.form.IsWarehouseSale">
              <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsBlocked" :error="$v.form.IsBlocked">
              <NextCheckBox v-model="form.IsBlocked" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UseEInvoice" :error="$v.form.UseEInvoice">
              <NextCheckBox v-model="form.UseEInvoice" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UseEArchive" :error="$v.form.UseEArchive">
              <NextCheckBox v-model="form.UseEArchive" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.Detail')">
          <b-row>
            <NextFormGroup item-key="DiscountGroup10Id" :error="$v.form.DiscountGroup10Id">
              <NextDropdown v-model="discountGroup10" :disabled="insertReadonly.DiscountGroup10Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_10" @input="selectedType('DiscountGroup10Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup2Id" :error="$v.form.DiscountGroup2Id">
              <NextDropdown v-model="discountGroup2" :disabled="insertReadonly.DiscountGroup2Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_2" @input="selectedType('DiscountGroup2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput v-model="form.Genexp1" type="text" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="BankIban" :error="$v.form.BankIban">
              <NextInput v-model="form.BankIban" type="text" :disabled="insertReadonly.BankIban" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup9Id" :error="$v.form.DiscountGroup9Id">
              <NextDropdown v-model="discountGroup9" :disabled="insertReadonly.DiscountGroup9Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_9" @input="selectedType('DiscountGroup9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankInfo" :error="$v.form.BankInfo">
              <NextInput v-model="form.BankInfo" type="text" :disabled="insertReadonly.BankInfo" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerFinancialInfo')">
          <b-row>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.defaultPaymentTypeId">
              <NextDropdown v-model="defaultPaymentType" url="VisionNextCommonApi/api/PaymentType/Search"  @input="selectedSearchType('DefaultPaymentTypeId', $event)" :disabled="insertReadonly.DefaultPaymentTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriod" :error="$v.form.paymentPeriod">
              <NextDropdown v-model="paymentPeriod" :disabled="insertReadonly.paymentPeriod"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.priceListCategoryId">
              <NextDropdown v-model="priceListCategory" :disabled="insertReadonly.priceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" :get-lookup="true" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CreditLimit" :error="$v.form.creditLimit">
              <NextInput v-model="form.CreditLimit" type="text" :disabled="insertReadonly.creditLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="RiskLimit" :error="$v.form.riskLimit">
              <NextInput v-model="form.RiskLimit" type="text" :disabled="insertReadonly.riskLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentCredit" :error="$v.form.currentCredit">
              <NextInput v-model="form.CurrentCredit" type="text" :disabled="insertReadonly.currentCredit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentRisk" :error="$v.form.currentRisk">
              <NextInput v-model="form.CurrentRisk" type="text" :disabled="insertReadonly.currentRisk" />
            </NextFormGroup>
            <NextFormGroup item-key="DebitAccountRemainder" :error="$v.form.debitAccountRemainder">
              <NextInput v-model="form.DebitAccountRemainder" type="text" :disabled="insertReadonly.debitAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="CreditAccountRemainder" :error="$v.form.creditAccountRemainder">
              <NextInput v-model="form.CreditAccountRemainder" type="text" :disabled="insertReadonly.creditAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent1" :error="$v.form.discountPercent1">
              <NextInput v-model="form.DiscountPercent1" type="text" :disabled="insertReadonly.discountPercent1" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent2" :error="$v.form.discountPercent2">
              <NextInput v-model="form.DiscountPercent2" type="text" :disabled="insertReadonly.discountPercent2" />
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.tciBreak1Id">
              <NextDropdown v-model="tciBreak1" :disabled="insertReadonly.tciBreak1Id" :get-lookup="true" lookup-key="TCI_BREAKDOWN" @input="selectedType('tciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.tciBreak2Id">
              <NextDropdown v-model="tciBreak2" :disabled="insertReadonly.tciBreak2Id" :get-lookup="true" lookup-key="TCI_BREAKDOWN" @input="selectedType('tciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.statementDay">
              <NextDropdown v-model="statementday" :disabled="insertReadonly.statementDay"  url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.sapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.sapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.deliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="text" :disabled="insertReadonly.deliveryDayParam" />
            </NextFormGroup>
            <NextFormGroup item-key="ManualInvoiceClosure" :error="$v.form.ManualInvoiceClosure">
              <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextCheckBox v-model="form.Statement" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="AllowOverLimit" :error="$v.form.AllowOverLimit">
              <NextCheckBox v-model="form.AllowOverLimit" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDirectDebit" :error="$v.form.IsDirectDebit">
              <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.customerClassInfo')">
          <b-row>
            <NextFormGroup item-key="Category3Id" :error="$v.form.category3Id">
              <NextDropdown v-model="form.category3" :disabled="insertReadonly.category3Id" :get-lookup="true" lookup-key="CUSTOMER_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.category2Id">
              <NextDropdown v-model="form.category2" :disabled="insertReadonly.category2Id" :get-lookup="true" lookup-key="CUSTOMER_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.category1Id">
              <NextDropdown v-model="form.category1" :disabled="insertReadonly.category1Id" :get-lookup="true" lookup-key="CUSTOMER_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.customerRegion5Id">
              <NextDropdown v-model="form.customerRegion5" :disabled="insertReadonly.customerRegion5Id" :get-lookup="true" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.backMarginGroupId">
              <NextDropdown v-model="form.backMarginGroup" :disabled="insertReadonly.backMarginGroupId" :get-lookup="true" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.locations')">
          <NextDetailPanel v-model="form.BranchLocations" :items="customerLocationItems" />
        </b-tab>
        <b-tab :title="$t('insert.branch.creditHistories')">
          <NextDetailPanel v-model="form.BranchCreditHistories" :items="customerCreditHistoriesItems" />
        </b-tab>
        <b-tab :title="$t('insert.branch.ItemDiscountCrts')">
          <NextDetailPanel v-model="form.CustomerItemDiscounts" :items="customerItemDiscountItems"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.InvoiceSeqs')">
          <NextDetailPanel v-model="form.EInvoiceSeqs" :items="customerEInvoiceSeqsItems"/>
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
        Deleted: 0,
        System: 0,
        DefaultLocationId: null,
        CustomerId: null,
        StatusId: null,
        FinanceCode: null,
        DistributionTypeId: null,
        CreditLimit: null,
        AllowOverLimit: null,
        RiskLimit: null,
        DefaultPaymentTypeId: null,
        DiscountPercent1: null,
        DiscountPercent2: null,
        PaymentPeriod: null,
        PriceListCategoryId: null,
        IsBlocked: null,
        BlockReasonDescription: null,
        DiscountGroup10Id: null,
        DiscountGroup2Id: null,
        DiscountGroup9Id: null,
        Genexp1: null,
        IsDirectDebit: null,
        SalesPriceChangeRate: null,
        MaxBonusRate: 0,
        BankPaymentSystemId: null,
        WebUrl: null,
        EInvoiceNumberPrefix: null,
        EInvoiceTaxExReason: null,
        TradeLicenseNumber: null,
        BlockReasonId: null,
        CashSafeCode: null,
        CreditCardSafeCode: null,
        UseEInvoice: null,
        SSTypeId: null,
        BranchLocations: null,
        BranchCreditHistories: null,
        BranchPaymentTypes: null,
        CustomFixedTerms: null,
        CurrentCredit: null,
        CurrentRisk: null,
        LicenseNumber: null,
        TaxCustomerTypeId: null,
        IsOrderChangeUnitary: null,
        IsDutyFree: null,
        IsWarehouseSale: null,
        SalesDocumentTypeId: null,
        InvoiceCombineRuleId: null,
        ManualInvoiceClosure: null,
        DeliveryDayParam: null,
        UseEArchive: null,
        UseEWaybill: null,
        RecordId: null,
        EncryptedKey: null,
        Code: null,
        Description1: null,
        RecordState: 2,
        BranchCommercialTitle: null,
        UpperBranchId: null,
        IsHq: null,
        HqId: null,
        TaxOffice: null,
        TaxNumber: null,
        BranchRegionId: null,
        CustomerPrefixCode: null,
        CustomerItemDiscountCrts: [],
        CustomerBranchs: [],
        FinanceCode2: null,
        MersisNumber: null,
        BankIban: null,
        BankInfo: null,
        DebitAccountRemainder: null,
        CreditAccountRemainder: null,
        TciBreak1Id: null,
        TciBreak2Id: null,
        SapCustomerId: null,
        category3Id: null,
        category2Id: null,
        category1Id: null,
        CustomerRegion5Id: null,
        BackMarginGroupId: null
      },
      customerLocationItems: detailData.customerLocationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      customerItemDiscountItems: detailData.customerItemDiscountItems,
      customerEInvoiceSeqsItems: detailData.customerEInvoiceSeqsItems,
      customerItemDiscounts: [],
      distributionType: {},
      branchRegion: {},
      upperBranch: {},
      invoiceCombineRule: {},
      blockReason: {},
      salesDocumentType: {},
      taxCustomerType: {},
      useEDispatch: {},
      discountGroup10: {},
      discountGroup2: {},
      discountGroup9: {},
      paymentPeriod: {},
      priceListCategory: {},
      tciBreak1: {},
      tciBreak2: {},
      statementday: {},
      defaultPaymentType: {},
      category3: {},
      category2: {},
      category1: {},
      customerRegion5: {},
      backMarginGroup: {}
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.branchRegion = this.convertLookupValueToSearchValue(rowData.BranchRegion)
      this.upperBranch = this.convertLookupValueToSearchValue(rowData.UpperBranch)
      this.useEDispatch = this.convertLookupValueToSearchValue(rowData.UseEDispatch)
      this.paymentPeriod = this.convertLookupValueToSearchValue(rowData.PaymentPeriod)
      this.statementday = this.convertLookupValueToSearchValue(rowData.Statementday)
      this.defaultPaymentType = this.convertLookupValueToSearchValue(rowData.DefaultPaymentType)
      this.distributionType = rowData.DistributionType
      this.invoiceCombineRule = rowData.InvoiceCombineRule
      this.blockReason = rowData.BlockReason
      this.salesDocumentType = rowData.SalesDocumentType
      this.taxCustomerType = rowData.TaxCustomerType
      this.discountGroup10 = rowData.DiscountGroup10
      this.discountGroup2 = rowData.DiscountGroup2
      this.discountGroup9 = rowData.DiscountGroup9
      this.priceListCategory = rowData.PriceListCategory
      this.tciBreak1 = rowData.TciBreak1
      this.tciBreak2 = rowData.TciBreak2
      this.category3 = rowData.Category3
      this.category2 = rowData.Category2
      this.category1 = rowData.Category1
      this.customerRegion5 = rowData.CustomerRegion5
      this.backMarginGroup = rowData.BackMarginGroup
      // if (rowData.CustomerItemDiscountCrts && rowData.CustomerItemDiscountCrts.length > 0) {
      //   this.customerItemDiscounts = rowData.CustomerItemDiscountCrts[0]
      // }
      if (!rowData.CustomerItemDiscounts) {
        this.form.CustomerItemDiscounts = []
      }
      if (!rowData.BranchLocations) {
        this.form.BranchLocations = []
      }
      if (!rowData.BranchCreditHistories) {
        this.form.BranchCreditHistories = []
      }
      if (!rowData.EInvoiceSeqs) {
        this.form.EInvoiceSeqs = []
      }
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
        this.updateData()
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
