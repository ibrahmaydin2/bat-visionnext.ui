<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'KeyAccount' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" md="3" lg="3" />
          </NextFormGroup>
          <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId" md="3" lg="3">
            <NextDropdown :disabled="insertReadonly.CardTypeId" url="VisionNextCustomer/api/CustomerCardType/Search" @input="selectedSearchType('CardTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusReasonId" :error="$v.form.StatusReasonId" md="3" lg="3">
            <NextDropdown :disabled="insertReadonly.StatusReasonId" url="VisionNextCommonApi/api/CancelReason/Search" @input="selectedSearchType('StatusReasonId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
        <b-row>
          <NextFormGroup item-key="RecordTypeId" :error="$v.form.RecordTypeId" md="3" lg="3">
            <NextDropdown
              v-model="RecordType"
              :source="recordType"
              :disabled="insertReadonly.RecordTypeId"
              url="VisionNextCustomer/api/CustomerRecordType/Search"
              @input="selectedSearchType('RecordTypeId', $event)"
              :dynamic-and-condition="{RecordIds: [3, 4]}"/>
          </NextFormGroup>
          <NextFormGroup  :title="$t('insert.customer.mainOfBranch')" :error="$v.mainBranch.customer" md="3" lg="3">
            <NextDropdown
              searchable
              v-model="mainBranch.customer"
              url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
              :dynamic-and-condition="{RecordTypeId: 3, StatusId: 1}"
              @input="selectedSearchType('UpperCustomerId', $event)"
              :custom-option="true"
              or-condition-fields="Code,Description1,CommercialTitle"
              :is-customer="true"
            />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.customer.AuthorizedBranch')" :error="$v.mainBranch.branch" md="3" lg="3">
            <NextDropdown
              searchable
              v-model="mainBranch.branch"
              url="VisionNextBranch/api/Branch/AutoCompleteSearch"
            />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')"  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="CommercialTitle" :error="$v.form.CommercialTitle" md="2" lg="2">
              <NextInput v-model="form.CommercialTitle" type="text" :disabled="insertReadonly.CommercialTitle" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber" md="2" lg="2">
              <NextInput v-model="form.LicenseNumber" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxCustomerTypeId" :error="$v.form.TaxCustomerTypeId" md="2" lg="2">
              <NextDropdown :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TaxOffice" :error="$v.form.TaxOffice" md="2" lg="2">
              <NextInput v-model="form.TaxOffice" type="text" :disabled="insertReadonly.TaxOffice" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber" md="2" lg="2">
              <NextInput v-model="form.TaxNumber" type="number" :disabled="insertReadonly.TaxNumber" :maxLength="taxNumberReq" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="Alias" :error="$v.form.Alias" md="2" lg="2">
              <NextInput v-model="form.Alias" type="text" :disabled="insertReadonly.Alias" />
            </NextFormGroup>
            <NextFormGroup item-key="TradeLicenseNumber" :error="$v.form.TradeLicenseNumber" md="2" lg="2">
              <NextInput v-model="form.TradeLicenseNumber" type="text" :disabled="insertReadonly.TradeLicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="BlockReasonId" :error="$v.form.BlockReasonId" md="2" lg="2">
              <NextDropdown lookup-key="CUSTOMER_BLOCK_REASON"  @input="selectedType('BlockReasonId', $event)" :disabled="insertReadonly.BlockReasonId"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown :disabled="insertReadonly.TypeId"  lookup-key="CUSTOMER_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerInvoiceTypeId" :error="$v.form.CustomerInvoiceTypeId" md="2" lg="2">
              <NextDropdown :disabled="insertReadonly.CustomerInvoiceTypeId"  lookup-key="CUSTOMER_INVOICE_TYPE" @input="selectedType('CustomerInvoiceTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.customerRegion5Id" md="2" lg="2">
              <NextDropdown :disabled="insertReadonly.customerRegion5Id" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="MarketingRegion5Id" :error="$v.form.MarketingRegion5Id" md="2" lg="2">
              <NextDropdown :disabled="insertReadonly.MarketingRegion5Id" lookup-key="MARKETING_REGION_5" @input="selectedType('MarketingRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCode" :error="$v.form.RouteCode" md="2" lg="2">
              <NextInput v-model="form.RouteCode" type="text" :disabled="insertReadonly.RouteCode" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseValidDate" md="2" lg="2">
              <NextDatePicker v-model="form.LicenseValidDate" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="IsBlocked" :error="$v.form.IsBlocked" md="2" lg="2">
              <NextCheckBox v-model="form.IsBlocked" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderChangeUnitary" :error="$v.form.IsOrderChangeUnitary" md="2" lg="2">
              <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UseEDispatch" :error="$v.form.UseEDispatch" md="2" lg="2">
              <NextCheckBox v-model="form.UseEDispatch" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsWarehouseSale" :error="$v.form.IsWarehouseSale" md="2" lg="2">
              <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UseEInvoice" :error="$v.form.UseEInvoice" md="2" lg="2">
              <NextCheckBox v-model="form.UseEInvoice" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLocations" :items="locationItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')"  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="Category3Id" :error="$v.form.Category3Id">
              <NextDropdown v-model="customerCategory3" :disabled="insertReadonly.Category3Id" lookup-key="CUSTOMER_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.Category2Id">
              <NextDropdown v-model="customerCategory2" :disabled="true" lookup-key="CUSTOMER_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown v-model="customerCategory1" :disabled="true" lookup-key="CUSTOMER_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown lookup-key="CUSTOMER_GROUP" @input="selectedType('GroupId', $event)" :disabled="insertReadonly.GroupId" />
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown lookup-key="CUSTOMER_CLASS" @input="selectedType('ClassId', $event)" :disabled="insertReadonly.ClassId"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown :disabled="insertReadonly.SalesDocumentTypeId" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OwnerTypeId" :error="$v.form.OwnerTypeId">
              <NextDropdown :disabled="insertReadonly.OwnerTypeId" lookup-key="OWNER_TYPE" @input="selectedType('OwnerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalId" :error="$v.form.ClassProposalId">
              <NextDropdown :disabled="insertReadonly.ClassProposalId" lookup-key="CUSTOMER_CLASS_PROPOSAL" @input="selectedType('ClassProposalId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesMethodId" :error="$v.form.SalesMethodId">
              <NextDropdown :disabled="insertReadonly.SalesMethodId" lookup-key="CUSTOMER_SALES_METHOD" @input="selectedType('SalesMethodId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GeographicEnvironmentId" :error="$v.form.GeographicEnvironmentId">
              <NextDropdown :disabled="insertReadonly.GeographicEnvironmentId" lookup-key="CUSTOMER_GEOGRAPHIC_ENVIRONMENT" @input="selectedType('GeographicEnvironmentId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TradeFocusId" :error="$v.form.TradeFocusId">
              <NextDropdown :disabled="insertReadonly.TradeFocusId" lookup-key="CUSTOMER_TRADE_FOCUS" @input="selectedType('TradeFocusId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown :disabled="insertReadonly.InvoiceCombineRuleId"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalReasonId" :error="$v.form.ClassProposalReasonId">
              <NextDropdown :disabled="insertReadonly.ClassProposalReasonId"  lookup-key="CUSTOMER_CLASS_PROPOSAL_REASON" @input="selectedType('ClassProposalReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.BackMarginGroupId">
              <NextDropdown :disabled="insertReadonly.BackMarginGroupId" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown :disabled="insertReadonly.KindId" lookup-key="CUSTOMER_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')"  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CreditLimit" :error="$v.form.CreditLimit">
              <NextInput v-model="form.CreditLimit" type="number" :disabled="insertReadonly.CreditLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="RiskLimit" :error="$v.form.RiskLimit">
              <NextInput v-model="form.RiskLimit" type="number" :disabled="insertReadonly.RiskLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentCredit" :error="$v.form.CurrentCredit">
              <NextInput v-model="form.CurrentCredit" type="number" :disabled="insertReadonly.CurrentCredit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentRisk" :error="$v.form.CurrentRisk">
              <NextInput v-model="form.CurrentRisk" type="number" :disabled="insertReadonly.CurrentRisk" />
            </NextFormGroup>
            <NextFormGroup item-key="ReservedLimit" :error="$v.form.ReservedLimit">
              <NextInput v-model="form.ReservedLimit" type="number" :disabled="insertReadonly.ReservedLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ZdebitAccountRemainder" :error="$v.form.ZdebitAccountRemainder">
              <NextInput v-model="form.ZdebitAccountRemainder" type="number" :disabled="insertReadonly.ZdebitAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="ZcreditAccountRemainder" :error="$v.form.ZcreditAccountRemainder">
              <NextInput v-model="form.ZcreditAccountRemainder" type="number" :disabled="insertReadonly.ZcreditAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent1" :error="$v.form.DiscountPercent1">
              <NextInput v-model="form.DiscountPercent1" type="number" :disabled="insertReadonly.DiscountPercent1" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent2" :error="$v.form.DiscountPercent2">
              <NextInput v-model="form.DiscountPercent2" type="number" :disabled="insertReadonly.DiscountPercent2" />
            </NextFormGroup>
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.SapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" :disabled="insertReadonly.SapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.DeliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="number" :disabled="insertReadonly.DeliveryDayParam" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriod" :error="$v.form.PaymentPeriod">
              <NextDropdown :disabled="!(paymentType && paymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TCIBreak1Id" :error="$v.form.TCIBreak1Id">
              <NextDropdown :disabled="insertReadonly.TCIBreak1Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TCIBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TCIBreak2Id" :error="$v.form.TCIBreak2Id">
              <NextDropdown :disabled="insertReadonly.TCIBreak2Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TCIBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.StatementDay">
              <NextDropdown :disabled="insertReadonly.StatementDay || !form.Statement" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId"
                v-model="paymentType"
                url="VisionNextCommonApi/api/PaymentType/Search"
                />
            </NextFormGroup>
            <NextFormGroup item-key="AllowOverLimit" :error="$v.form.AllowOverLimit">
              <NextCheckBox v-model="form.AllowOverLimit" type="number" toggle :disabled="insertReadonly.AllowOverLimit"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDirectDebit" :error="$v.form.IsDirectDebit">
              <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle :disabled="insertReadonly.IsDirectDebit || paymentType.Code !== 'AH'"/>
            </NextFormGroup>
            <NextFormGroup item-key="ManualInvoiceClosure" :error="$v.form.ManualInvoiceClosure">
              <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle :disabled="insertReadonly.ManualInvoiceClosure"/>
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextCheckBox v-model="form.Statement" type="number" toggle :disabled="insertReadonly.Statement"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')" :disabled="customerCreditHistoriesDisabled"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerCreditHistories" :items="customerCreditHistoriesItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerPaymentTypes" :items="paymentTypesItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')"  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="TextField1" :error="$v.form.TextField1" md="3" lg="3">
              <NextInput v-model="form.TextField1" type="text" toggle :disabled="insertReadonly.TextField1"/>
            </NextFormGroup>
            <NextFormGroup item-key="TextField2" :error="$v.form.TextField2" md="3" lg="3">
              <NextInput v-model="form.TextField2" type="text" toggle :disabled="insertReadonly.TextField2"/>
            </NextFormGroup>
            <NextFormGroup item-key="Barcode" :error="$v.form.Barcode" md="3" lg="3">
              <NextInput v-model="form.Barcode" type="text" toggle :disabled="insertReadonly.Barcode"/>
            </NextFormGroup>
            <NextFormGroup item-key="HoldsAsset" :error="$v.form.HoldsAsset" md="3" lg="3">
              <NextDropdown lookup-key="CUSTOMER_HOLD_ASSET" @input="selectedType('HoldsAsset', $event)" :disabled="insertReadonly.HoldsAsset"/>
            </NextFormGroup>
            <NextFormGroup item-key="Contracted" :error="$v.form.Contracted" md="3" lg="3">
              <NextDropdown lookup-key="CUSTOMER_CONTRACTED" @input="selectedType('Contracted', $event)" :disabled="insertReadonly.Contracted"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerItemDiscounts" :items="customerDiscountsItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLabels" :items="customerLabelItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.ECustomerAliases')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.ECustomerAliases" :items="eCustomerAliasesItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        CustomerLocations: [],
        CustomerCreditHistories: [],
        CustomerPaymentTypes: [],
        CustomerItemDiscounts: [],
        CustomerLabels: [],
        RecordTypeId: null,
        CurrentCredit: null,
        CurrentRisk: null,
        ZdebitAccountRemainder: null,
        ZcreditAccountRemainder: null,
        FinanceCode: null,
        DiscountPercent1: null,
        DeliveryDayParam: null,
        TCIBreak1Id: null,
        Statement: null,
        StatementDay: null,
        DiscountPercent2: null,
        ManualInvoiceClosure: null,
        SapCustomerId: null,
        TCIBreak2Id: null,
        IsDirectDebit: null,
        AllowOverLimit: null,
        Code: null,
        CardTypeId: null,
        Description1: null,
        CommercialTitle: null,
        TaxOffice: null,
        TaxNumber: null,
        LicenseNumber: null,
        StatusId: 1,
        StatusReasonId: null,
        LicenseValidDate: null,
        IsBlocked: null,
        BlockReasonId: null,
        IsOrderChangeUnitary: null,
        UseEInvoice: null,
        TradeLicenseNumber: null,
        CustomerInvoiceTypeId: null,
        TaxCustomerTypeId: null,
        RouteCode: null,
        IsWarehouseSale: null,
        TextField1: null,
        TextField2: null,
        Barcode: null,
        HoldsAsset: null,
        Contracted: null,
        CustomerRegion5Id: null,
        MarketingRegion5Id: null,
        Alias: null,
        UseEDispatch: null,
        Category3Id: null,
        Category2Id: null,
        Category1Id: null,
        GroupId: null,
        ClassId: null,
        KindId: null,
        OwnerTypeId: null,
        ClassProposalId: null,
        ClassProposalReasonId: null,
        SalesMethodId: null,
        GeographicEnvironmentId: null,
        TradeFocusId: null,
        InvoiceCombineRuleId: null,
        SalesDocumentTypeId: null,
        BackMarginGroupId: null,
        DefaultPaymentTypeId: null,
        PaymentPeriod: null,
        PriceListCategoryId: null,
        CreditLimit: null,
        RiskLimit: null,
        ReservedLimit: null,
        UpperCustomerId: null,
        TypeId: null,
        ECustomerAliases: []
      },
      routeName1: 'Customer',
      routeName2: 'Customer',
      taxNumberReq: 10,
      customerCategory1: null,
      customerCategory2: null,
      customerCategory3: null,
      paymentType: {},
      mainBranch: {
        customer: null,
        branch: null
      },
      customerCreditHistoriesDisabled: false,
      locationItems: detailData.locationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      paymentTypesItems: detailData.paymentTypesItems,
      customerDiscountsItems: detailData.customerDiscountsItems,
      customerLabelItems: detailData.customerLabelItems,
      eCustomerAliasesItems: detailData.eCustomerAliasesItems,
      RecordType: null,
      recordType: []
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
    var selectedCustomer = this.$store.state.SelectedCustomer
    if (selectedCustomer && selectedCustomer.RecordId > 0) {
      this.mainBranch.customer = selectedCustomer
      this.mainBranch.customer = selectedCustomer.Description1
      this.form.UpperCustomerId = selectedCustomer.RecordId
      this.mainBranch.branch = selectedCustomer.BranchId
      let request = {
        andConditionModel: {
          RecordIds: [3, 4]
        }
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerRecordType/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.recordType = response.ListModel.BaseModels
          this.RecordType = response.ListModel.BaseModels[1]
          this.form.RecordTypeId = this.RecordType.RecordId
        }
      })
      this.$store.commit('setValues', {
        name: 'SelectedCustomer',
        data: {
          Values: {}
        }
      })
    }
  },
  methods: {
    getInsertPage (e) {
      this.getCurrentBranch()
      this.createManualCode()
    },
    getCurrentBranch () {
      let request = {
        RecordId: this.$store.state.BranchId
      }
      this.$api.postByUrl(request, 'VisionNextBranch/api/Branch/Get').then(response => {
        if (response && response.Model) {
          let branch = response.Model
          this.customerCreditHistoriesDisabled = branch.DistributionTypeId !== 6
        }
      })
    },
    selectedType (label, model) {
      this.form[label] = model.DecimalValue

      if (label === 'TaxCustomerTypeId') {
        if (model.Code === 'TZK') {
          this.taxNumberReq = 10
        } else {
          this.taxNumberReq = 11
        }
        this.insertRules.TaxNumber = {
          required, minLength: minLength(this.taxNumberReq), maxLength: maxLength(this.taxNumberReq)
        }
      }
    },
    save () {
      this.$v.form.$touch()
      this.$v.mainBranch.$touch()
      if (this.$v.form.$error || this.$v.mainBranch.$error) {
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
    let mainBranch = {}
    if (this.form.RecordTypeId === 4) {
      mainBranch.customer = {
        required
      }
      mainBranch.branch = {
        required
      }
    } else {
      mainBranch.customer = {}
      mainBranch.branch = {}
    }
    return {
      form: this.insertRules,
      mainBranch: mainBranch
    }
  },
  watch: {
    customerCategory3 (value) {
      if (value) {
        this.customerCategory2 = this.lookup.CUSTOMER_CATEGORY_2.find(x => x.Value === value.UpperValue)
        this.form.Category2Id = this.customerCategory2.DecimalValue
        this.customerCategory1 = this.lookup.CUSTOMER_CATEGORY_1.find(x => x.Value === this.customerCategory2.UpperValue)
        this.form.Category1Id = this.customerCategory1.DecimalValue
      } else {
        this.customerCategory1 = null
        this.customerCategory2 = null
        this.form.Category1Id = null
        this.form.Category2Id = null
        this.form.Category3Id = null
      }
    }
  }
}
</script>
