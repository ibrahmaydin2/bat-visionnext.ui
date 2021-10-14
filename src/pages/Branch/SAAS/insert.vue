<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Branch' }">
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
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
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
              <NextDropdown :disabled="insertReadonly.BranchRegionId" url="VisionNextCommonApi/api/Region/Search" @input="selectedSearchType('BranchRegionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
              <NextInput v-model="form.TaxNumber" type="number" :disabled="insertReadonly.TaxNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="UpperBranchId" :error="$v.form.UpperBranchId">
              <NextDropdown :disabled="insertReadonly.UpperBranchId" url="VisionNextBranch/api/Branch/Search" @input="selectedSearchType('UpperBranchId', $event)" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="DistributionTypeId" :error="$v.form.DistributionTypeId">
              <NextDropdown :disabled="insertReadonly.DistributionTypeId" lookup-key="BRANCH_DISTRIBUTION_TYPE"  @input="selectedType('DistributionTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput v-model="form.LicenseNumber" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseValidDate">
              <NextDatePicker v-model="form.LicenseValidDate" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown :disabled="insertReadonly.InvoiceCombineRuleId"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BlockReasonId" :error="$v.form.BlockReasonId">
              <NextDropdown :disabled="insertReadonly.BlockReasonId"  lookup-key="CUSTOMER_BLOCK_REASON" @input="selectedType('BlockReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown :disabled="insertReadonly.SalesDocumentTypeId" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
              <NextFormGroup item-key="WebUrl" :error="$v.form.WebUrl">
            <NextInput v-model="form.WebUrl" type="text" :disabled="insertReadonly.WebUrl" />
            </NextFormGroup>
            <NextFormGroup item-key="TradeLicenseNumber" :error="$v.form.TradeLicenseNumber">
              <NextInput v-model="form.TradeLicenseNumber" type="text" :disabled="insertReadonly.TradeLicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxCustomerTypeId" :error="$v.form.TaxCustomerTypeId">
              <NextDropdown :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2">
              <NextInput v-model="form.FinanceCode2" type="text" :disabled="insertReadonly.FinanceCode2" />
            </NextFormGroup>
            <NextFormGroup item-key="MersisNumber" :error="$v.form.MersisNumber">
              <NextInput v-model="form.MersisNumber" type="text" maxLength="50" :oninput="maxLengthControl" :disabled="insertReadonly.MersisNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerPrefixCode" :error="$v.form.CustomerPrefixCode">
              <NextInput v-model="form.CustomerPrefixCode" type="text" :disabled="insertReadonly.CustomerPrefixCode" />
            </NextFormGroup>
            <NextFormGroup item-key="UseEWaybill" :error="$v.form.UseEWaybill">
              <NextDropdown :disabled="insertReadonly.UseEWaybill" url="VisionNextCommonApi/api/EDocumentUseType/Search" @input="selectedSearchType('UseEWaybill', $event)"/>
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
              <NextDropdown :disabled="insertReadonly.DiscountGroup10Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_10" @input="selectedType('DiscountGroup10Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup2Id" :error="$v.form.DiscountGroup2Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup2Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_2" @input="selectedType('DiscountGroup2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput v-model="form.Genexp1" type="text" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="BankIban" :error="$v.form.BankIban">
              <NextInput v-model="form.BankIban" type="text" :disabled="insertReadonly.BankIban" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup9Id" :error="$v.form.DiscountGroup9Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup9Id"  lookup-key="CUSTOMER_DISCOUNT_GROUP_9" @input="selectedType('DiscountGroup9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankInfo" :error="$v.form.BankInfo">
              <NextInput v-model="form.BankInfo" type="text" :disabled="insertReadonly.BankInfo" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerFinancialInfo')">
          <b-row>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId"
                v-model="DefaultPaymentType"
                :source="types"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriod" :error="$v.form.PaymentPeriod">
              <NextDropdown :disabled="!(DefaultPaymentType && DefaultPaymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search?v=1" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.priceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
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
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown :disabled="insertReadonly.TciBreak1Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.TciBreak2Id">
              <NextDropdown :disabled="insertReadonly.TciBreak2Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.statementDay">
              <NextDropdown :disabled="insertReadonly.statementDay" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.sapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.sapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.deliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="text" :disabled="insertReadonly.deliveryDayParam" />
            </NextFormGroup>
            <NextFormGroup item-key="MaxBonusRate" :error="$v.form.MaxBonusRate">
              <NextInput v-model="form.MaxBonusRate" type="number" :disabled="insertReadonly.MaxBonusRate" />
            </NextFormGroup>
            <NextFormGroup item-key="SalesPriceChangeRate" :error="$v.form.SalesPriceChangeRate">
              <NextInput v-model="form.SalesPriceChangeRate" type="number" :disabled="insertReadonly.SalesPriceChangeRate" />
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
        <b-tab :title="$t('insert.branch.locations')">
          <NextDetailPanel v-model="form.BranchLocations" :items="customerLocationItems" />
        </b-tab>
        <b-tab :title="$t('insert.branch.creditHistories')" :disabled="branchDistributionTypeId === 5">
          <NextDetailPanel v-model="form.BranchCreditHistories" :items="customerCreditHistoriesItems" />
        </b-tab>
        <b-tab :title="$t('insert.branch.InvoiceSeqs')">
          <NextDetailPanel v-model="form.EInvoiceSeqs" :items="customerEInvoiceSeqsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.customFixedTerms')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomFixedTerms" :items="customFixedTermItems" :main-form="form"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerItemDiscountCrts')">
          <NextDetailPanel v-model="form.CustomerItemDiscountCrts" :items="customerItemDiscountCrtItems"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.branchPaymentTypes')">
          <NextDetailPanel v-model="form.BranchPaymentTypes" :items="branchPaymentTypeItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../../mixins/insert'
import { requiredIf } from 'vuelidate/lib/validators'
import { detailData } from '../detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        DefaultLocationId: null,
        CustomerId: null,
        StatusId: 1,
        FinanceCode: null,
        StatementDay: null,
        DistributionTypeId: null,
        CreditLimit: null,
        AllowOverLimit: null,
        RiskLimit: null,
        DefaultPaymentTypeId: null,
        DiscountPercent1: null,
        DiscountPercent2: null,
        PaymentPeriod: null,
        PriceListCategoryId: null,
        IsBlocked: 0,
        BlockReasonDescription: null,
        DiscountGroup10Id: null,
        DiscountGroup2Id: null,
        DiscountGroup9Id: null,
        Genexp1: null,
        IsDirectDebit: null,
        SalesPriceChangeRate: null,
        LicenseValidDate: null,
        BankPaymentSystemId: null,
        WebUrl: null,
        EInvoiceNumberPrefix: null,
        EInvoiceTaxExReason: null,
        TradeLicenseNumber: null,
        BlockReasonId: null,
        CashSafeCode: null,
        CreditCardSafeCode: null,
        UseEInvoice: 0,
        SSTypeId: null,
        BranchLocations: [],
        BranchCreditHistories: [],
        EInvoiceSeqs: [],
        BranchPaymentTypes: [],
        CustomFixedTerms: [],
        CurrentCredit: null,
        CurrentRisk: null,
        LicenseNumber: null,
        TaxCustomerTypeId: null,
        IsOrderChangeUnitary: 0,
        IsDutyFree: null,
        IsWarehouseSale: 0,
        SalesDocumentTypeId: null,
        InvoiceCombineRuleId: null,
        ManualInvoiceClosure: 0,
        DeliveryDayParam: null,
        UseEArchive: 0,
        UseEWaybill: null,
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
        MaxBonusRate: null,
        CustomerItemDiscountCrts: [],
        CustomerItemDiscounts: [],
        CustomerBranchs: [],
        FinanceCode2: null,
        MersisNumber: null,
        BankIban: null,
        BankInfo: null,
        Statement: 0,
        DebitAccountRemainder: null,
        CreditAccountRemainder: null,
        TciBreak1Id: null,
        TciBreak2Id: null,
        SapCustomerId: null
      },
      customerLocationItems: detailData.customerLocationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      customerEInvoiceSeqsItems: detailData.customerEInvoiceSeqsItems,
      customFixedTermItems: detailData.customFixedTermItems,
      customerItemDiscountCrtItems: detailData.customerItemDiscountCrtItems,
      branchPaymentTypeItems: detailData.branchPaymentTypeItems,
      DefaultPaymentType: null,
      branchDistributionTypeId: 0,
      allTypes: []
    }
  },
  computed: {
    ...mapState(['']),
    types: function () {
      return this.branchDistributionTypeId === 5 ? this.allTypes.filter(l => l.Code === 'BC' || l.Code === 'KK' || l.Code === 'PES') : this.allTypes
    }
  },
  mounted () {
    this.getCurrentBranch()
    this.createManualCode()
    this.getPaymentType()
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } if (this.DefaultPaymentType && this.DefaultPaymentType.Code === 'AH' && (this.form.PaymentPeriod === null || this.form.PaymentPeriod === '')) {
        this.$toasted.show(this.$t('insert.paymentPeriodrequired'), {
          type: 'error',
          keepOnHover: true,
          duration: '5000'
        })
        this.tabValidation()
      }
      let filteredList = this.form.CustomFixedTerms.filter(b => b.RecordState !== 4)
      if ((this.DefaultPaymentType && this.DefaultPaymentType.Code === 'AH') && (!filteredList || filteredList.length === 0)) {
        this.$toasted.show(this.$t('insert.tabPaymentPeriodRequired'), {
          type: 'error',
          keepOnHover: true,
          duration: '6000'
        })
        this.tabValidation()
      } else {
        let filteredList = this.form.BranchPaymentTypes.filter(b => b.RecordState !== 4)
        if (!filteredList || filteredList.length === 0) {
          this.$toasted.show(this.$t('insert.branch.branchPaymentTypesRequired'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.createData()
      }
    },
    getPaymentType () {
      this.$api.postByUrl({}, 'VisionNextCommonApi/api/PaymentType/Search').then((response) => {
        this.allTypes = response.ListModel.BaseModels
      })
    },
    getCurrentBranch () {
      let request = {
        RecordId: this.$store.state.BranchId
      }
      this.$api.postByUrl(request, 'VisionNextBranch/api/Branch/Get').then(response => {
        if (response && response.Model) {
          let branch = response.Model
          this.branchDistributionTypeId = branch.DistributionTypeId
        }
      })
    }
  },
  validations () {
    let validation = {
      form: this.insertRules
    }
    this.insertRules.PaymentPeriod = {
      required: requiredIf(function () {
        return this.DefaultPaymentType && this.DefaultPaymentType.Code === 'AH'
      })
    }
    this.insertRequired.PaymentPeriod = this.DefaultPaymentType && this.DefaultPaymentType.Code === 'AH'
    return validation
  }
}
</script>
