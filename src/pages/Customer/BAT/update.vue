<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Customer' }">
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
          <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
            <NextDropdown v-model="cardType" :disabled="insertReadonly.CardTypeId" label="Description1" url="VisionNextCustomer/api/CustomerCardType/Search" @input="selectedSearchType('CardTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusReasonId" :error="$v.form.StatusReasonId">
            <NextDropdown v-model="statusReason" :disabled="insertReadonly.StatusReasonId" label="Description1" url="VisionNextCommonApi/api/CancelReason/Search" @input="selectedSearchType('StatusReasonId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="CommercialTitle" :error="$v.form.CommercialTitle">
              <NextInput v-model="form.CommercialTitle" type="text" :disabled="insertReadonly.CommercialTitle" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput v-model="form.LicenseNumber" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxCustomerTypeId" :error="$v.form.TaxCustomerTypeId">
              <NextDropdown v-model="taxCustomerType" :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TaxOffice" :error="$v.form.TaxOffice">
              <NextInput v-model="form.TaxOffice" type="text" :disabled="insertReadonly.TaxOffice" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
              <NextInput v-model="form.TaxNumber" type="number" :disabled="insertReadonly.TaxNumber" :maxLength="taxNumberReq" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerEmail" :error="$v.form.CustomerEmail">
              <NextInput v-model="form.CustomerEmail" :disabled="insertReadonly.CustomerEmail" />
            </NextFormGroup>
            <NextFormGroup item-key="SalesVisitFrequency" :error="$v.form.SalesVisitFrequency">
              <NextInput v-model="form.SalesVisitFrequency" :disabled="insertReadonly.SalesVisitFrequency" />
            </NextFormGroup>
            <NextFormGroup item-key="BlockReasonId" :error="$v.form.BlockReasonId">
              <NextDropdown :disabled="insertReadonly.BlockReasonId" v-model="blockReason"  lookup-key="CUSTOMER_BLOCK_REASON" @input="selectedType('BlockReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown :disabled="insertReadonly.TypeId" v-model="type"  lookup-key="CUSTOMER_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ServiceVisitFrequency" :error="$v.form.ServiceVisitFrequency">
              <NextInput v-model="form.ServiceVisitFrequency" :disabled="insertReadonly.ServiceVisitFrequency" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerInvoiceTypeId" :error="$v.form.CustomerInvoiceTypeId">
              <NextDropdown :disabled="insertReadonly.CustomerInvoiceTypeId" v-model="customerInvoiceType"  lookup-key="CUSTOMER_INVOICE_TYPE" @input="selectedType('CustomerInvoiceTypeId', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.CustomerRegion5Id">
              <NextDropdown v-model="customerRegion5" :disabled="insertReadonly.CustomerRegion5Id" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerRegion4Id" :error="$v.form.CustomerRegion4Id">
              <NextDropdown v-model="customerRegion4" :disabled="insertReadonly.CustomerRegion4Id" lookup-key="CUSTOMER_REGION_4" @input="selectedType('CustomerRegion4Id', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerRegion3Id" :error="$v.form.CustomerRegion3Id">
              <NextDropdown v-model="customerRegion3" :disabled="insertReadonly.CustomerRegion3Id" lookup-key="CUSTOMER_REGION_3" @input="selectedType('CustomerRegion3Id', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerRegion2Id" :error="$v.form.CustomerRegion2Id">
              <NextDropdown v-model="customerRegion2" :disabled="insertReadonly.CustomerRegion2Id" lookup-key="CUSTOMER_REGION_2" @input="selectedType('CustomerRegion2Id', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerRegion1Id" :error="$v.form.CustomerRegion1Id">
              <NextDropdown v-model="customerRegion1" :disabled="insertReadonly.CustomerRegion1Id" lookup-key="CUSTOMER_REGION_1" @input="selectedType('CustomerRegion1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="MarketingRegion5Id" :error="$v.form.MarketingRegion5Id">
              <NextDropdown :disabled="insertReadonly.MarketingRegion5Id" v-model="marketingRegion5" lookup-key="MARKETING_REGION_5" @input="selectedType('MarketingRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCode" :error="$v.form.RouteCode">
              <NextInput v-model="form.RouteCode" :disabled="insertReadonly.RouteCode" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseValidDate">
              <NextDatePicker v-model="form.LicenseValidDate" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="IsBlocked" :error="$v.form.IsBlocked">
              <NextCheckBox v-model="form.IsBlocked" type="number" toggle :disabled="insertReadonly.IsBlocked"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsRouteRegion" :error="$v.form.IsRouteRegion">
              <NextCheckBox v-model="form.IsRouteRegion" type="number" toggle :disabled="insertReadonly.IsRouteRegion"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderChangeUnitary" :error="$v.form.IsOrderChangeUnitary">
              <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle :disabled="insertReadonly.IsOrderChangeUnitary"/>
            </NextFormGroup>
             <NextFormGroup item-key="UseEInvoice" :error="$v.form.UseEInvoice">
              <NextCheckBox v-model="form.UseEInvoice" type="number" toggle :disabled="insertReadonly.UseEInvoice"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsWarehouseSale" :error="$v.form.IsWarehouseSale">
              <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle :disabled="insertReadonly.IsWarehouseSale"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDutyFree" :error="$v.form.IsDutyFree">
              <NextCheckBox v-model="form.IsDutyFree" type="number" toggle :disabled="insertReadonly.IsDutyFree"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()" v-if="form.Code">
          <NextDetailPanel v-model="form.CustomerLocations" :items="locationItemsBAT" :main-form="form"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')" @click.prevent="tabValidation()">
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
              <NextDropdown :disabled="insertReadonly.GroupId" v-model="selectedCustomerGroup" lookup-key="CUSTOMER_GROUP" @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown :disabled="insertReadonly.ClassId" v-model="selectedCustomerClass" label="Label" lookup-key="CUSTOMER_CLASS" @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown :disabled="insertReadonly.SalesDocumentTypeId" v-model="salesDocumentType" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesTypeId" :error="$v.form.SalesTypeId">
              <NextDropdown v-model="salesType" :disabled="insertReadonly.SalesTypeId" lookup-key="SALES_TYPE" @input="selectedType('SalesTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OwnerTypeId" :error="$v.form.OwnerTypeId">
              <NextDropdown v-model="selectedOwnerType" :disabled="insertReadonly.OwnerTypeId" lookup-key="OWNER_TYPE" @input="selectedType('OwnerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalId" :error="$v.form.ClassProposalId">
              <NextDropdown :disabled="insertReadonly.ClassProposalId" v-model="classProposal" lookup-key="CUSTOMER_CLASS_PROPOSAL" @input="selectedType('ClassProposalId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesMethodId" :error="$v.form.SalesMethodId">
              <NextDropdown v-model="selectedSalesMethod" :disabled="insertReadonly.SalesMethodId" lookup-key="CUSTOMER_SALES_METHOD" @input="selectedType('SalesMethodId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GeographicEnvironmentId" :error="$v.form.GeographicEnvironmentId">
              <NextDropdown v-model="selectedGeographicEnvironment" :disabled="insertReadonly.GeographicEnvironmentId" lookup-key="CUSTOMER_GEOGRAPHIC_ENVIRONMENT" @input="selectedType('GeographicEnvironmentId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TradeFocusId" :error="$v.form.TradeFocusId">
              <NextDropdown v-model="selectedTradeFocus" :disabled="insertReadonly.TradeFocusId" lookup-key="CUSTOMER_TRADE_FOCUS" @input="selectedType('TradeFocusId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown :disabled="insertReadonly.InvoiceCombineRuleId" v-model="invoiceCombineRule"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalReasonId" :error="$v.form.ClassProposalReasonId">
              <NextDropdown :disabled="insertReadonly.ClassProposalReasonId" v-model="classProposalReason"  lookup-key="CUSTOMER_CLASS_PROPOSAL_REASON" @input="selectedType('ClassProposalReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.BackMarginGroupId">
              <NextDropdown :disabled="insertReadonly.BackMarginGroupId" v-model="backMarginGroup" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsTaxExemption" :error="$v.form.IsTaxExemption">
              <NextCheckBox v-model="form.IsTaxExemption" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="Field1" :error="$v.form.Field1">
              <NextDropdown :disabled="insertReadonly.Field1" lookup-key="FIELD_1" @input="selectedType('Field1', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field2" :error="$v.form.Field2">
              <NextDropdown :disabled="insertReadonly.Field2" lookup-key="FIELD_2" @input="selectedType('Field2', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field3" :error="$v.form.Field3">
              <NextDropdown :disabled="insertReadonly.Field3" lookup-key="FIELD_3" @input="selectedType('Field3', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field4" :error="$v.form.Field4">
              <NextDropdown :disabled="insertReadonly.Field4" lookup-key="FIELD_4" @input="selectedType('Field4', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field5" :error="$v.form.Field5">
              <NextDropdown :disabled="insertReadonly.Field5" lookup-key="FIELD_5" @input="selectedType('Field5', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TextField6" :error="$v.form.TextField6">
              <NextInput v-model="form.TextField6" type="text" :disabled="insertReadonly.TextField6" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.AdditionalClassInformation')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="DiscountGroup1Id" :error="$v.form.DiscountGroup1Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup1Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_1" @input="selectedType('DiscountGroup1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup3Id" :error="$v.form.DiscountGroup3Id">
              <NextDropdown v-model="discountGroup3" :disabled="insertReadonly.DiscountGroup3Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_3" @input="selectedType('DiscountGroup3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup4Id" :error="$v.form.DiscountGroup4Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup4Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_4" @input="selectedType('DiscountGroup4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup5Id" :error="$v.form.DiscountGroup5Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup5Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_5" @input="selectedType('DiscountGroup5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup6Id" :error="$v.form.DiscountGroup6Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup6Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_6" @input="selectedType('DiscountGroup6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup7Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_7" @input="selectedType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup8Id" :error="$v.form.DiscountGroup8Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup8Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_8" @input="selectedType('DiscountGroup8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown :disabled="insertReadonly.KindId" lookup-key="CUSTOMER_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Activity1Id" :error="$v.form.Activity1Id">
              <NextDropdown :disabled="insertReadonly.Activity1Id" lookup-key="CUSTOMER_ACTIVITY_1" @input="selectedType('Activity1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OutSourceOrderId" :error="$v.form.OutSourceOrderId">
              <NextDropdown :disabled="insertReadonly.OutSourceOrderId" lookup-key="OUT_SOURCE_ORDER" @input="selectedType('OutSourceOrderId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId" v-model="priceListCategory"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankPaymentSystemId" :error="$v.form.BankPaymentSystemId">
              <NextDropdown :disabled="insertReadonly.BankPaymentSystemId"  lookup-key="BANK_PAYMENT_SYSTEM" @input="selectedType('BankPaymentSystemId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CreditLimit" :error="$v.form.CreditLimit">
              <NextInput v-model="form.CreditLimit" type="text" :disabled="insertReadonly.CreditLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="RiskLimit" :error="$v.form.RiskLimit">
              <NextInput v-model="form.RiskLimit" type="text" :disabled="insertReadonly.RiskLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentCredit" :error="$v.form.CurrentCredit">
              <NextInput v-model="form.CurrentCredit" type="text" :disabled="insertReadonly.CurrentCredit" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrentRisk" :error="$v.form.CurrentRisk">
              <NextInput v-model="form.CurrentRisk" type="text" :disabled="insertReadonly.CurrentRisk" />
            </NextFormGroup>
            <NextFormGroup item-key="ReservedLimit" :error="$v.form.ReservedLimit">
              <NextInput v-model="form.ReservedLimit" type="text" :disabled="insertReadonly.ReservedLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="DebitAccountRemainder" :error="$v.form.DebitAccountRemainder">
              <NextInput v-model="form.DebitAccountRemainder" type="text" :disabled="insertReadonly.DebitAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="SalesPriceChangeRate" :error="$v.form.SalesPriceChangeRate">
              <NextInput v-model="form.SalesPriceChangeRate" type="number" :disabled="insertReadonly.SalesPriceChangeRate" />
            </NextFormGroup>
            <NextFormGroup item-key="CreditAccountRemainder" :error="$v.form.CreditAccountRemainder">
              <NextInput v-model="form.CreditAccountRemainder" type="text" :disabled="insertReadonly.CreditAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent1" :error="$v.form.DiscountPercent1">
              <NextInput v-model="form.DiscountPercent1" type="text" :disabled="insertReadonly.DiscountPercent1" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPercent2" :error="$v.form.DiscountPercent2">
              <NextInput v-model="form.DiscountPercent2" type="text" :disabled="insertReadonly.DiscountPercent2" />
            </NextFormGroup>
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.SapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.SapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.DeliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="text" :disabled="insertReadonly.DeliveryDayParam" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriod" :error="$v.form.PaymentPeriod">
              <NextDropdown v-model="paymentPeriod" :disabled="!(paymentType && paymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown :disabled="insertReadonly.TciBreak1Id" v-model="tciBreak1" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.TciBreak2Id">
              <NextDropdown :disabled="insertReadonly.TciBreak2Id" v-model="tciBreak2" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.StatementDay">
              <NextDropdown :disabled="insertReadonly.StatementDay" v-model="statementDay" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId"
                v-model="paymentType"
                :source="paymentTypes"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="AllowOverLimit" :error="$v.form.AllowOverLimit">
              <NextCheckBox v-model="form.AllowOverLimit" type="number" toggle :disabled="insertReadonly.AllowOverLimit"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDirectDebit" :error="$v.form.IsDirectDebit">
              <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle :disabled="insertReadonly.IsDirectDebit"/>
            </NextFormGroup>
            <NextFormGroup item-key="ManualInvoiceClosure" :error="$v.form.ManualInvoiceClosure">
              <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle :disabled="insertReadonly.ManualInvoiceClosure"/>
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextCheckBox v-model="form.Statement" type="number" toggle :disabled="insertReadonly.Statement"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsBlackListed" :error="$v.form.IsBlackListed">
              <NextCheckBox v-model="form.IsBlackListed" type="number" toggle :disabled="insertReadonly.IsBlackListed"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsAutoBlockingOff" :error="$v.form.IsAutoBlockingOff">
              <NextCheckBox v-model="form.IsAutoBlockingOff" type="number" toggle :disabled="insertReadonly.IsAutoBlockingOff"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerCreditHistories" :changeValidation="changeValidation" :items="customerCreditHistoriesItemsBAT" />
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerPaymentTypes" :items="paymentTypesItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="TextField1" :error="$v.form.TextField1">
              <NextInput v-model="form.TextField1" type="text" :disabled="insertReadonly.TextField1" />
            </NextFormGroup>
            <NextFormGroup item-key="TextField2" :error="$v.form.TextField2">
              <NextInput v-model="form.TextField2" type="text" :disabled="insertReadonly.TextField2" />
            </NextFormGroup>
            <NextFormGroup item-key="Barcode" :error="$v.form.Barcode">
              <NextInput v-model="form.Barcode" type="text" :disabled="insertReadonly.Barcode" />
            </NextFormGroup>
            <NextFormGroup item-key="HoldsAsset" :error="$v.form.HoldsAsset">
              <NextDropdown :disabled="insertReadonly.HoldsAsset" lookup-key="CUSTOMER_HOLD_ASSET" @input="selectedType('HoldsAsset', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Contracted" :error="$v.form.Contracted">
              <NextDropdown :disabled="insertReadonly.Contracted" lookup-key="CUSTOMER_CONTRACTED" @input="selectedType('Contracted', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup10Id" :error="$v.form.DiscountGroup10Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup10Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_10" @input="selectedType('DiscountGroup10Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup2Id" :error="$v.form.DiscountGroup2Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup2Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_2" @input="selectedType('DiscountGroup2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup9Id" :error="$v.form.DiscountGroup9Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup9Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_9" @input="selectedType('DiscountGroup9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SignNameId" :error="$v.form.SignNameId">
              <NextDropdown :disabled="insertReadonly.SignNameId" lookup-key="SIGN_NAME" @input="selectedType('SignNameId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsOpportunitySpot" :error="$v.form.IsOpportunitySpot">
              <NextCheckBox v-model="form.IsOpportunitySpot" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerItemDiscounts" :items="customerDiscountsItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.RouteDetails')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.customer.routeType')" :error="$v.routeDetailsObj.routeType" required>
              <NextDropdown v-model="routeDetailsObj.routeType" url="VisionNextRoute/api/RouteType/Search" @input="selectRouteType"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.routeCode')" :error="$v.routeDetailsObj.route" required>
              <NextDropdown v-model="routeDetailsObj.route" :disabled="!routeDetailsObj.routeType" :source="routes" @input="selectRouteCode" custom-option></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.salesRepresentative')" :error="$v.routeDetailsObj.representative" required>
              <NextDropdown v-model="routeDetailsObj.representative" :disabled="!routeDetailsObj.routeType" :source="representatives" label="Label" @input="selectRepresentative"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day1VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day1VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day2VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day2VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day3VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day3VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day4VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day4VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day5VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day5VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day6VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day6VisitOrder"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Day7VisitOrder')">
              <NextInput type="number" v-model="routeDetails.Day7VisitOrder"></NextInput>
            </NextFormGroup>
             <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addRouteDetails" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.routeType')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.routeCode')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.salesRepresentative')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day1VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day2VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day3VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day4VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day5VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day6VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Day7VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.RouteDetails ? form.RouteDetails.filter(r => r.RecordState !== 4) : []" :key="i">
                  <b-td>{{r.RouteType ? r.RouteType.Label : r.RouteTypeIdDesc}}</b-td>
                  <b-td>{{r.Route ? r.Route.Label : r.RouteIdDesc}}</b-td>
                  <b-td>{{r.Representative ? r.Representative.Label : r.RepresentativeIdDesc}}</b-td>
                  <b-td>{{r.Day1VisitOrder}}</b-td>
                  <b-td>{{r.Day2VisitOrder}}</b-td>
                  <b-td>{{r.Day3VisitOrder}}</b-td>
                  <b-td>{{r.Day4VisitOrder}}</b-td>
                  <b-td>{{r.Day5VisitOrder}}</b-td>
                  <b-td>{{r.Day6VisitOrder}}</b-td>
                  <b-td>{{r.Day7VisitOrder}}</b-td>
                  <b-td class="text-center">
                    <b-button :title="$t('list.edit')" @click="editRouteDetails(r)" class="mt-1 mr-1 btn-warning operations-button">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button :title="$t('list.delete')" @click="removeRouteDetails(r)" class="mt-1 mr-1 btn-danger operations-button">
                      <i class="far fa-trash-alt"></i>
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import updateMixin from '../../../mixins/update'
import { detailData } from './../detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        CustomerLocations: [],
        CustomerCreditHistories: [],
        CustomerPaymentTypes: [],
        CustomerItemDiscounts: [],
        RouteDetails: [],
        CardType: null,
        Group: null,
        Kind: null,
        Type: null,
        IsDutyFree: null,
        IsAutoBlockingOff: null,
        BankPaymentSystemId: null,
        Field1: null,
        Field2: null,
        Field3: null,
        Field4: null,
        Field5: null,
        TextField6: null,
        Class: null,
        Category1: null,
        Category2: null,
        Category3: null,
        DefaultPaymentType: {},
        PriceListCategory: null,
        CustomerRegion5Id: null,
        CustomerRegion4Id: null,
        CustomerRegion3Id: null,
        CustomerRegion2Id: null,
        CustomerRegion1Id: null,
        DiscountGroup1: null,
        DiscountGroup2: null,
        DiscountGroup3Id: null,
        DiscountGroup4: null,
        DiscountGroup5: null,
        DiscountGroup6: null,
        DiscountGroup7: null,
        DiscountGroup8: null,
        DiscountGroup9: null,
        DiscountGroup10: null,
        PaymentPeriod: null,
        OwnerType: null,
        ClassProposal: null,
        ClassProposalReason: null,
        GeographicEnvironment: null,
        SalesMethod: null,
        TradeFocus: null,
        HoldsAsset: null,
        Contracted: null,
        StatusReasonId: null,
        SignName: null,
        MarketingRegion5: null,
        TaxCustomerType: null,
        InvoiceCombineRule: null,
        SalesDocumentType: null,
        BlockReasonId: null,
        CustomerInvoiceType: null,
        BackMarginGroup: null,
        Activity1: null,
        Activity2: null,
        OutSourceOrder: null,
        TCIBreak1: null,
        TCIBreak2: null
      },
      locationItemsBAT: detailData.locationItemsBAT,
      customerCreditHistoriesItemsBAT: detailData.customerCreditHistoriesItemsBAT,
      customerDiscountsItems: detailData.customerDiscountsItems,
      paymentTypesItems: detailData.paymentTypesItems,
      cardType: {},
      taxCustomerType: {},
      blockReason: {},
      type: {},
      customerInvoiceType: {},
      marketingRegion5: {},
      customerCategory3: {},
      customerCategory2: {},
      customerCategory1: {},
      discountGroup3: {},
      selectedCustomerClass: {},
      selectedCustomerGroup: {},
      salesDocumentType: {},
      salesType: {},
      selectedOwnerType: {},
      classProposal: {},
      selectedSalesMethod: {},
      selectedGeographicEnvironment: {},
      selectedTradeFocus: {},
      invoiceCombineRule: {},
      classProposalReason: {},
      backMarginGroup: {},
      priceListCategory: {},
      paymentPeriod: {},
      tciBreak1: {},
      tciBreak2: {},
      statementDay: {},
      paymentType: {},
      routeName: this.$route.meta.baseLink,
      taxNumberReq: 10,
      locationCityLabel: null,
      locationDistirictLabel: null,
      isLocationEditable: false,
      address: {},
      customerType: null,
      touchpointPriority: null,
      touchpointTypeId: null,
      customerPaymentType: null,
      CustomerLabels: [],
      customerLabelsGrid: [],
      locationEditableIndex: null,
      addressInit: null,
      paymentTypes: [],
      Location: {},
      allPaymentTypes: [],
      statusReason: null,
      customerRegion5: {},
      customerRegion4: {},
      customerRegion3: {},
      customerRegion2: {},
      customerRegion1: {},
      routeDetailsObj: {
        routeType: null,
        route: null,
        representative: null
      },
      routeDetails: {},
      routes: [],
      representatives: [],
      selectedIndex: -1
    }
  },
  computed: {
    filteredCustomerPaymentType () {
      return this.CustomerPaymentTypesArr.filter(item => {
        return item.RecordState !== 4
      })
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
    this.getPaymentTypes()
  },
  methods: {
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
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        if (this.CustomerLabels && this.CustomerLabels.length > 0) {
          this.form.CustomerLabels = this.CustomerLabels.map((item) => {
            var newItem = {
              LabelId: item.LabelId,
              LabelValueId: item.LabelValueId,
              RecordState: item.RecordId && !item.RecordState ? 3 : item.RecordState,
              RecordId: item.RecordId
            }
            return newItem
          })
        } else {
          this.form.CustomerLabels = []
        }

        this.form.AllowOverLimit = this.form.AllowOverLimit === true || this.form.AllowOverLimit === 1 ? 1 : 0
        this.form.LicenseValidDate = this.dateConvertToISo(this.form.LicenseValidDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.IsDirectDebit = this.checkConvertToNumber(this.form.IsDirectDebit)
        this.form.IsBlocked = this.checkConvertToNumber(this.form.IsBlocked)
        this.form.IsWarehouseSale = this.checkConvertToNumber(this.form.IsWarehouseSale)
        this.form.UseEInvoice = this.checkConvertToNumber(this.form.UseEInvoice)
        this.form.ManualSItem = this.checkConvertToNumber(this.form.ManualSItem)
        this.form.IsRouteRegion = this.checkConvertToNumber(this.form.IsRouteRegion)
        this.form.IsOrderChangeUnitary = this.checkConvertToNumber(this.form.IsOrderChangeUnitary)
        this.form.ManualInvoiceClosure = this.checkConvertToNumber(this.form.ManualInvoiceClosure)
        this.form.AllowOverLimit = this.checkConvertToNumber(this.form.AllowOverLimit)
        this.form.IsBlackListed = this.checkConvertToNumber(this.form.IsBlackListed)
        this.form.Statement = this.checkConvertToNumber(this.form.Statement)
        this.form.IsOpportunitySpot = this.checkConvertToNumber(this.form.IsOpportunitySpot)

        let model = {
          'model': this.form
        }
        if (typeof this.$route.query.saveAs !== 'undefined' && this.$route.query.saveAs) {
          model.model.RecordId = null
          model.model.RecordState = 2
          this.$api.postByUrl({}, 'VisionNextCustomer/api/Customer/GetCode').then(res => {
            model.model.Code = res.Model.Code
            this.$store.dispatch('createData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
          })
        } else {
          // this.$store.dispatch('updateData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
          this.updateData()
        }
      }
    },
    selectedPaymentTypeArr (e) {
      if (e) {
        this.customerPaymentTypes.paymentType = e.Description1
        this.customerPaymentTypes.paymentTypeId = e.RecordId
      } else {
        this.customerPaymentTypes.paymentType = null
        this.customerPaymentTypes.paymentTypeId = null
      }
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
    },
    removeEditableInputs () {
      this.customerLocations = []
      this.locationCityLabel = null
      this.locationDistirictLabel = null
      this.isLocationEditable = false

      let lastElem = this.form.CustomerLocations[this.form.CustomerLocations.length - 1].Code
      let tmpCode = lastElem.split('-')
      tmpCode = Number(tmpCode[1].trim())
      tmpCode += 1
      this.customerLocations.Code = `${this.form.Code} - ${tmpCode}`
      this.address = {}
      this.addressInit = null
      this.locationEditableIndex = null
      this.$v.customerLocations.$reset()
    },
    selectedOptions (type, label) {
      this[type] = label
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.branchRegion = this.convertLookupValueToSearchValue(rowData.BranchRegion)
      this.upperBranch = this.convertLookupValueToSearchValue(rowData.UpperBranch)
      this.useEDispatch = this.convertLookupValueToSearchValue(rowData.UseEDispatchType)
      this.paymentPeriod = this.convertLookupValueToSearchValue(rowData.PaymentPeriod)
      this.statementday = this.convertLookupValueToSearchValue(rowData.Statementday)
      this.defaultPaymentType = this.convertLookupValueToSearchValue(rowData.DefaultPaymentType)
      this.statementDay = this.convertLookupValueToSearchValue(rowData.StatementDay)
      this.paymentType = this.convertLookupValueToSearchValue(rowData.PaymentType)
      this.cardType = this.convertLookupValueToSearchValue(rowData.CardType)
      this.distributionType = rowData.DistributionType
      this.invoiceCombineRule = rowData.InvoiceCombineRule
      this.blockReason = rowData.BlockReason
      this.statusReason = this.convertLookupValueToSearchValue(rowData.StatusReason)
      this.customerInvoiceType = rowData.CustomerInvoiceType
      this.type = rowData.Type
      this.salesDocumentType = rowData.SalesDocumentType
      this.taxCustomerType = rowData.TaxCustomerType
      this.selectedType('TaxCustomerTypeId', rowData.TaxCustomerType)
      this.discountGroup10 = rowData.DiscountGroup10
      this.discountGroup2 = rowData.DiscountGroup2
      this.discountGroup9 = rowData.DiscountGroup9
      this.priceListCategory = rowData.PriceListCategory
      this.tciBreak1 = rowData.TCIBreak1
      this.tciBreak2 = rowData.TCIBreak2
      this.category3 = rowData.Category3
      this.category2 = rowData.Category2
      this.category1 = rowData.Category1
      this.customerRegion5 = rowData.CustomerRegion5
      this.customerRegion4 = rowData.CustomerRegion4
      this.customerRegion3 = rowData.CustomerRegion3
      this.customerRegion2 = rowData.CustomerRegion2
      this.customerRegion1 = rowData.CustomerRegion1
      this.marketingRegion5 = rowData.MarketingRegion5
      this.customerCategory3 = rowData.Category3
      this.customerCategory2 = rowData.Category2
      this.customerCategory1 = rowData.Category1
      this.selectedCustomerGroup = rowData.SelectedCustomerGroup
      this.selectedCustomerClass = rowData.SelectedCustomerClass
      this.salesType = rowData.SalesType
      this.classProposal = rowData.ClassProposal
      this.selectedSalesMethod = rowData.SelectedSalesMethod
      this.selectedGeographicEnvironment = rowData.SelectedGeographicEnvironment
      this.selectedTradeFocus = rowData.SelectedTradeFocus
      this.selectedOwnerType = rowData.SelectedOwnerType
      this.salesDocumentType = rowData.SalesDocumentType
      this.classProposalReason = rowData.ClassProposalReason
      this.backMarginGroup = rowData.BackMarginGroup
      if (!rowData.CustomerLocations) {
        this.form.CustomerLocations = []
      }
      if (!rowData.CustomerCreditHistories) {
        this.form.CustomerCreditHistories = []
      }
      if (!rowData.CustomerPaymentTypes) {
        this.form.CustomerPaymentTypes = []
      }
      if (!rowData.CustomerLabels) {
        this.form.CustomerLabels = []
      }
      if (!rowData.CustomerTouchpoints) {
        this.form.CustomerTouchpoints = []
      }
      if (!rowData.CustomerItemDiscounts) {
        this.form.CustomerItemDiscounts = []
      }
      if (!rowData.RouteDetails) {
        this.form.RouteDetails = []
      }
    },
    getPaymentTypes () {
      this.$api.postByUrl({}, 'VisionNextCommonApi/api/PaymentType/AutoCompleteSearch').then((response) => {
        if (response.ListModel) {
          this.allPaymentTypes = response.ListModel.BaseModels
          this.paymentTypes = this.allPaymentTypes
        }
      })
    },
    changeValidation (data) {
      let isError = data.CreditDescriptionId === 100

      if (isError) {
        this.$toasted.show(this.$t('insert.CustomerCreditNotDeleted'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      }

      return !isError
    },
    selectRouteType (value) {
      this.routeDetailsObj.route = null
      this.routeDetailsObj.representative = null
      this.routes = []
      this.representatives = []

      if (value) {
        this.routeDetails.RouteTypeId = value.RecordId
        this.routeDetails.RouteTypeIdDesc = value.Description1

        let request = {
          andConditionModel: {
            RouteTypeIds: [value.RecordId],
            StatusIds: [1]
          }
        }
        this.$api.postByUrl(request, 'VisionNextRoute/api/Route/Search', 300).then(res => {
          if (res && res.ListModel) {
            this.routes = res.ListModel.BaseModels
            this.representatives = res.ListModel.BaseModels.map(b => {
              return {
                ...b.Representative,
                Route: {
                  Code: b.Code,
                  Description1: b.Description1,
                  RecordId: b.RecordId
                }
              }
            })
          }
        })
      } else {
        this.routeDetails.RouteTypeId = null
        this.routeDetails.RouteTypeIdDesc = null
      }
    },
    selectRouteCode (value) {
      this.routeDetailsObj.representative = value ? value.Representative : null
      this.setRouteValues(value)
      this.setRepresentativeValues(this.routeDetailsObj.representative)
    },
    setRouteValues (value) {
      if (value) {
        this.routeDetails.RouteId = value.RecordId
        this.routeDetails.RouteIdDesc = value.Description1
        this.routeDetails.RouteIdCode = value.Code
      } else {
        this.routeDetails.RouteId = null
        this.routeDetails.RouteIdDesc = null
        this.routeDetails.RouteIdCode = null
      }
    },
    selectRepresentative (value) {
      this.routeDetailsObj.route = value ? value.Route : null
      this.setRepresentativeValues(value)
      this.setRouteValues(this.routeDetailsObj.route)
    },
    setRepresentativeValues (value) {
      if (value) {
        this.routeDetails.RepresentativeId = value.DecimalValue
        this.routeDetails.RepresentativeIdDesc = value.Label
        this.routeDetails.RepresentativeIdCode = value.Code
      } else {
        this.routeDetails.RepresentativeId = null
        this.routeDetails.RepresentativeIdDesc = null
        this.routeDetails.RepresentativeIdCode = null
      }
    },
    addRouteDetails () {
      this.$v.routeDetailsObj.$touch()
      if (this.$v.routeDetailsObj.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      let filteredArr = this.form.RouteDetails.filter(i => i.RouteId === this.routeDetailsObj.route.RecordId &&
        !this.routeDetailsObj.isUpdated && i.RecordState !== 4)

      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }

      this.routeDetails.Deleted = 0
      this.routeDetails.System = 0
      this.routeDetails.StatusId = 1

      if (this.selectedIndex > -1) {
        if (this.routeDetails.RecordId > 0) {
          this.routeDetails.RecordState = 3
        }
        this.form.RouteDetails[this.selectedIndex] = this.routeDetails
        this.selectedIndex = -1
      } else {
        this.routeDetails.RecordState = 2
        this.form.RouteDetails.push(this.routeDetails)
      }
      this.routeDetailsObj = {}
      this.routeDetails = {}
      this.$v.routeDetailsObj.$reset()
    },
    removeRouteDetails (value) {
      if (value.RecordId > 0) {
        this.form.RouteDetails[this.form.RouteDetails.indexOf(value)].RecordState = 4
      } else {
        this.form.RouteDetails.splice(this.form.RouteDetails.indexOf(value), 1)
      }
      this.selectedIndex = -1
    },
    editRouteDetails (value) {
      this.selectedIndex = this.form.RouteDetails.indexOf(value)
      this.routeDetails = value

      if (value.RouteType) {
        this.routeDetails.RouteTypeIdDesc = value.RouteType.Label
        this.routeDetails.RouteTypeIdCode = value.RouteType.Code
      }

      if (value.Route) {
        this.routeDetails.RouteIdDesc = value.Route.Label
        this.routeDetails.RouteIdCode = value.Route.Code
      }

      if (value.Representative) {
        this.routeDetails.RepresentativeIdDesc = value.Representative.Label
        this.routeDetails.RepresentativeIdCode = value.Representative.Code
      }

      this.routeDetailsObj = {
        routeType: {
          Description1: value.RouteTypeIdDesc,
          RecordId: value.RouteTypeId,
          Code: value.RouteTypeIdCode
        },
        route: {
          Description1: value.RouteIdDesc,
          RecordId: value.RouteId,
          Code: value.RouteIdCode
        },
        representative: {
          Label: value.RepresentativeIdDesc,
          DecimalValue: value.RepresentativeId,
          Code: value.RepresentativeIdCode
        },
        isUpdated: true
      }
    }
  },
  watch: {
    statementDays (e) {
      if (e) {
        e.map(item => {
          item.Label = item.DayNumber + ' ' + item.Description1
        })
      }
    },
    address (value) {
      if (value) {
        this.customerLocations.cityId = value.CityId
        this.customerLocations.districtId = value.DistrictId
        this.customerLocations.addressDetail = value.Address
        this.locationDistirictLabel = value.CityName
        this.locationCityLabel = value.DistrictName
      }
    },
    customerCategory3 (value) {
      if (value) {
        this.customerCategory2 = this.lookup.CUSTOMER_CATEGORY_2.find(x => x.Value === value.UpperValue)
        this.form.Category2Id = this.customerCategory2.DecimalValue
        this.customerCategory1 = this.lookup.CUSTOMER_CATEGORY_1.find(x => x.Value === this.customerCategory2.UpperValue)
        this.form.Category1Id = this.customerCategory1.DecimalValue
        this.discountGroup3 = this.lookup.CUSTOMER_DISCOUNT_GROUP_3.find(x =>
          this.$api.postByUrl({model: {recordIds: [value.DecimalValue], 'functionName': 'GET_SHOPPER_CHANNEL'}}, 'VisionNextCommonApi/api/LookupValue/GetSingleRowFunction').then((response) => {
            if (response) {
              x.Value = response.RecordValue
            }
          })
        )
        this.form.DiscountGroup3Id = this.discountGroup3.DecimalValue
      } else {
        this.discountGroup3 = null
        this.customerCategory1 = null
        this.customerCategory2 = null
        this.form.DiscountGroup3Id = null
        this.form.Category1Id = null
        this.form.Category2Id = null
        this.form.Category3Id = null
      }
    },
    customerRegion5 (value) {
      if (value) {
        this.customerRegion4 = this.lookup.CUSTOMER_REGION_4.find(x => x.Value === value.UpperValue)
        this.form.CustomerRegion4Id = this.customerRegion4.DecimalValue
        this.customerRegion3 = this.lookup.CUSTOMER_REGION_3.find(x => x.Value === this.customerRegion4.UpperValue)
        this.form.CustomerRegion3Id = this.customerRegion3.DecimalValue
        this.customerRegion2 = this.lookup.CUSTOMER_REGION_2.find(x => x.Value === this.customerRegion3.UpperValue)
        this.form.CustomerRegion2Id = this.customerRegion2.DecimalValue
        this.customerRegion1 = this.lookup.CUSTOMER_REGION_1.find(x => x.Value === this.customerRegion2.UpperValue)
        this.form.CustomerRegion1Id = this.customerRegion1.DecimalValue
      } else {
        this.customerRegion1 = null
        this.customerRegion2 = null
        this.customerRegion3 = null
        this.customerRegion4 = null
        this.form.CustomerRegion1Id = null
        this.form.CustomerRegion2Id = null
        this.form.CustomerRegion3Id = null
        this.form.CustomerRegion4Id = null
        this.form.CustomerRegion5Id = null
      }
    },
    type (value) {
      if (value && value.DecimalValue === 5006) {
        this.paymentTypes = this.allPaymentTypes.filter(p => p.RecordId !== 2)
      } else {
        this.paymentTypes = this.allPaymentTypes
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      routeDetailsObj: {
        routeType: {
          required
        },
        route: {
          required
        },
        representative: {
          required
        }
      }
    }
  }
}
</script>
