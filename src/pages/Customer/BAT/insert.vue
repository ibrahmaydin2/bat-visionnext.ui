<template>
  <b-row class="asc__insertPage">
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
            <NextDropdown :disabled="insertReadonly.CardTypeId" label="Description1" url="VisionNextCustomer/api/CustomerCardType/Search" @input="selectedSearchType('CardTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusReasonId" :error="$v.form.StatusReasonId">
            <NextDropdown :disabled="insertReadonly.StatusReasonId" label="Description1" url="VisionNextCommonApi/api/CancelReason/Search" @input="selectedSearchType('StatusReasonId', $event)"/>
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
              <NextDropdown :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
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
              <NextDropdown :disabled="insertReadonly.BlockReasonId"  lookup-key="CUSTOMER_BLOCK_REASON" @input="selectedType('BlockReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown v-model="customerType" :disabled="insertReadonly.TypeId"  lookup-key="CUSTOMER_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ServiceVisitFrequency" :error="$v.form.ServiceVisitFrequency">
              <NextInput v-model="form.ServiceVisitFrequency" :disabled="insertReadonly.ServiceVisitFrequency" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerInvoiceTypeId" :error="$v.form.CustomerInvoiceTypeId">
              <NextDropdown :disabled="insertReadonly.CustomerInvoiceTypeId"  lookup-key="CUSTOMER_INVOICE_TYPE" @input="selectedType('CustomerInvoiceTypeId', $event)"/>
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
              <NextDropdown :disabled="insertReadonly.MarketingRegion5Id" lookup-key="MARKETING_REGION_5" @input="selectedType('MarketingRegion5Id', $event)"/>
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
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLocations" :items="locationItemsBAT" />
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="Category3Id" :error="$v.form.category3Id">
              <NextDropdown v-model="customerCategory3" :disabled="insertReadonly.category3Id" lookup-key="CUSTOMER_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.category2Id">
              <NextDropdown v-model="customerCategory2" :disabled="true" lookup-key="CUSTOMER_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.category1Id">
              <NextDropdown v-model="customerCategory1" :disabled="true" lookup-key="CUSTOMER_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GroupId" :error="$v.form.groupId">
              <NextDropdown :disabled="insertReadonly.GroupId"  v-model="selectedCustomerGroup" lookup-key="CUSTOMER_GROUP" @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.classId">
              <NextDropdown :disabled="insertReadonly.ClassId" v-model="selectedCustomerClass" label="Label" lookup-key="CUSTOMER_CLASS" @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown :disabled="insertReadonly.SalesDocumentTypeId" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesTypeId" :error="$v.form.SalesTypeId">
              <NextDropdown v-model="salesType" :disabled="insertReadonly.SalesTypeId" lookup-key="SALES_TYPE" @input="selectedType('SalesTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OwnerTypeId" :error="$v.form.OwnerTypeId">
              <NextDropdown v-model="selectedOwnerType" :disabled="insertReadonly.OwnerTypeId" lookup-key="OWNER_TYPE" @input="selectedType('OwnerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalId" :error="$v.form.ClassProposalId">
              <NextDropdown :disabled="insertReadonly.ClassProposalId" lookup-key="CUSTOMER_CLASS_PROPOSAL" @input="selectedType('ClassProposalId', $event)"/>
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
              <NextDropdown :disabled="insertReadonly.InvoiceCombineRuleId"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalReasonId" :error="$v.form.ClassProposalReasonId">
              <NextDropdown :disabled="insertReadonly.ClassProposalReasonId"  lookup-key="CUSTOMER_CLASS_PROPOSAL_REASON" @input="selectedType('ClassProposalReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.backMarginGroupId">
              <NextDropdown :disabled="insertReadonly.BackMarginGroupId" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsTaxExemption" :error="$v.form.IsTaxExemption">
              <NextCheckBox :disabled="insertReadonly.IsTaxExemption" v-model="form.IsTaxExemption" type="number" toggle/>
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
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
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
              <NextDropdown v-model="form.PaymentPeriod" :disabled="!(paymentType && paymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown :disabled="insertReadonly.TciBreak1Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.TciBreak2Id">
              <NextDropdown :disabled="insertReadonly.TciBreak2Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.StatementDay">
              <NextDropdown :disabled="insertReadonly.StatementDay" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
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
          <NextDetailPanel v-model="form.CustomerCreditHistories" :items="customerCreditHistoriesItemsBAT" />
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
          <NextDetailPanel v-model="form.RouteDetails" :items="routeDetailsItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import insertMixin from '../../../mixins/insert'
import { detailData } from './../detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        CustomerLocations: [],
        customerCreditHistories: [],
        CustomerPaymentTypes: [],
        CustomerItemDiscounts: [],
        RouteDetails: [],
        RecordTypeId: 1,
        Deleted: 0,
        RecordState: 2,
        DebitAccountRemainder: null,
        CreditAccountRemainder: null,
        FinanceCode: null,
        DiscountPercent1: null,
        DiscountPercent2: null,
        TciBreak1Id: null,
        TciBreak2Id: null,
        ManualInvoiceClosure: null,
        IsBlackListed: null,
        Statement: null,
        StatementDay: null,
        SapCustomerId: null,
        AllowOverLimit: null,
        DeliveryDayParam: null,
        IsDirectDebit: null,
        TextField1: null,
        TextField2: null,
        Barcode: null,
        HoldsAsset: null,
        Contracted: null,
        DiscountGroup10Id: null,
        DiscountGroup2Id: null,
        DiscountGroup9Id: null,
        SignNameId: null,
        IsOpportunitySpot: null,
        CustomerRegion5Id: null,
        CustomerRegion4Id: null,
        CustomerRegion3Id: null,
        CustomerRegion2Id: null,
        CustomerRegion1Id: null,
        MarketingRegion5Id: null,
        Code: null,
        CardTypeId: null,
        CommercialTitle: null,
        LicenseNumber: null,
        StatusId: 1,
        Description1: null,
        LicenseValidDate: null,
        StatusReasonId: null,
        TypeId: null,
        IsDutyFree: null,
        IsAutoBlockingOff: null,
        BankPaymentSystemId: null,
        Field1: null,
        Field2: null,
        Field3: null,
        Field4: null,
        Field5: null,
        TextField6: null,
        SalesVisitFrequency: null,
        BlockReasonId: null,
        TaxCustomerTypeId: null,
        ServiceVisitFrequency: null,
        IsBlocked: null,
        TaxOffice: null,
        RouteCode: null,
        IsWarehouseSale: null,
        TaxNumber: null,
        UseEInvoice: null,
        CustomerInvoiceTypeId: null,
        ManualSItem: null,
        IsRouteRegion: null,
        IsOrderChangeUnitary: null,
        CustomerEmail: null,
        Category3Id: null,
        Category2Id: null,
        Category1Id: null,
        GroupId: null,
        ClassId: null,
        SalesDocumentTypeId: null,
        OwnerTypeId: null,
        ClassProposalId: null,
        ClassProposalReasonId: null,
        SalesMethodId: null,
        GeographicEnvironmentId: null,
        TradeFocusId: null,
        InvoiceCombineRuleId: null,
        BackMarginGroupId: null,
        DiscountGroup3Id: null,
        DiscountGroup4Id: null,
        DiscountGroup5Id: null,
        DiscountGroup6Id: null,
        DiscountGroup7Id: null,
        DiscountGroup8Id: null,
        DiscountGroup1Id: null,
        KindId: null,
        Activity1Id: null,
        Activity2Id: null,
        OutSourceOrderId: null,
        DefaultPaymentTypeId: null,
        PaymentPeriod: null,
        PriceListCategoryId: null,
        CreditLimit: null,
        RiskLimit: null,
        ReservedLimit: null,
        CurrentCredit: null,
        CurrentRisk: null
      },
      locationItemsBAT: detailData.locationItemsBAT,
      customerCreditHistoriesItemsBAT: detailData.customerCreditHistoriesItemsBAT,
      customerDiscountsItems: detailData.customerDiscountsItems,
      paymentTypesItems: detailData.paymentTypesItems,
      routeDetailsItems: detailData.routeDetailsItems,
      routeName: this.$route.meta.baseLink,
      taxNumberReq: 10,
      locationCityLabel: null,
      locationDistirictLabel: null,
      isLocationEditable: false,
      locationEditableIndex: null,
      selectedCancelReason: null,
      isLocationTabError: false,
      address: {},
      customerCategory1: null,
      customerCategory2: null,
      customerCategory3: null,
      discountGroup3: null,
      paymentType: {},
      touchpointPriority: null,
      touchpointTypeId: null,
      customerPaymentType: null,
      selectedPaymentPeriod: null,
      addressInit: null,
      selectedCustomerGroup: null,
      selectedCustomerClass: null,
      selectedOwnerType: null,
      salesType: null,
      selectedSalesMethod: null,
      selectedGeographicEnvironment: null,
      selectedTradeFocus: null,
      customerType: null,
      paymentTypes: [],
      allPaymentTypes: [],
      customerRegion5: null,
      customerRegion4: null,
      customerRegion3: null,
      customerRegion2: null,
      customerRegion1: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'distiricts', 'banks', 'currency', 'items', 'customerLabels', 'credits', 'touchpoints', 'touchpoint_types']),
    customerBlackReason: function () {
      return this.lookup && this.lookup.CUSTOMER_BLOCK_REASON ? this.lookup.CUSTOMER_BLOCK_REASON[0] : {}
    }
  },
  mounted () {
    this.createManualCode()
    this.getPaymentTypes()
  },
  methods: {
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      if (model) {
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
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      this.form[label] = model.RecordId
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
        this.form.LicenseValidDate = this.dateConvertToISo(this.form.LicenseValidDate)
        this.form.StatusId = this.form.StatusId === true || this.form.StatusId === 1 ? 1 : 0
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
      }
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
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
    getPaymentTypes () {
      this.$api.postByUrl({}, 'VisionNextCommonApi/api/PaymentType/AutoCompleteSearch').then((response) => {
        if (response.ListModel) {
          this.allPaymentTypes = response.ListModel.BaseModels
          this.paymentTypes = this.allPaymentTypes
        }
      })
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    // insertRequireds
    let validation = {
      form: this.insertRules
    }
    return validation
  },
  watch: {
    customerBlackReason (value) {
      if (value != null) {
        this.form.BlockReasonId = value.DecimalValue
      }
    },
    customerCategory3 (value) {
      if (value) {
        this.customerCategory2 = this.lookup.CUSTOMER_CATEGORY_2.find(x => x.Value === value.UpperValue)
        this.form.Category2Id = this.customerCategory2.DecimalValue
        this.customerCategory1 = this.lookup.CUSTOMER_CATEGORY_1.find(x => x.Value === this.customerCategory2.UpperValue)
        this.form.Category1Id = this.customerCategory1.DecimalValue
        this.discountGroup3 = this.lookup.CUSTOMER_DISCOUNT_GROUP_3.find(x => x.Value === value.UpperValue)
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
    customerType (value) {
      if (value && value.DecimalValue === 5006) {
        this.paymentTypes = this.allPaymentTypes.filter(p => p.RecordId !== 2)
      } else {
        this.paymentTypes = this.allPaymentTypes
      }
    }
  }
}
</script>
<style lang="sass">
</style>
