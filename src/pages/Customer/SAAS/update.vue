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
            <NextFormGroup item-key="TaxCustomerTypeId" :error="$v.form.TaxCustomerTypeId">
              <NextDropdown v-model="taxCustomerType" :disabled="form.IsDutyFree === 1" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TaxOffice" :error="$v.form.TaxOffice">
              <NextInput v-model="form.TaxOffice" type="text" :disabled="form.IsDutyFree === 1" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
              <NextInput v-model="form.TaxNumber" type="number" :disabled="form.IsDutyFree === 1" />
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
            <NextFormGroup item-key="RouteCode" :error="$v.form.RouteCode">
              <NextInput v-model="form.RouteCode" :disabled="insertReadonly.RouteCode" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseValidDate">
              <NextDatePicker v-model="form.LicenseValidDate" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="IsRouteRegion" :error="$v.form.IsRouteRegion">
              <NextCheckBox v-model="form.IsRouteRegion" :disabled="insertReadonly.IsRouteRegion" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderChangeUnitary" :error="$v.form.IsOrderChangeUnitary">
              <NextCheckBox v-model="form.IsOrderChangeUnitary" :disabled="insertReadonly.IsOrderChangeUnitary" type="number" toggle/>
            </NextFormGroup>
             <NextFormGroup item-key="UseEInvoice" :error="$v.form.UseEInvoice">
              <NextCheckBox v-model="form.UseEInvoice" :disabled="insertReadonly.UseEInvoice" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsWarehouseSale" :error="$v.form.IsWarehouseSale">
              <NextCheckBox v-model="form.IsWarehouseSale" :disabled="insertReadonly.IsWarehouseSale" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDutyFree" :error="$v.form.IsDutyFree">
              <NextCheckBox v-model="form.IsDutyFree" :disabled="insertReadonly.IsDutyFree" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UsingReferenceNumber" :error="$v.form.UsingReferenceNumber">
              <NextCheckBox v-model="form.UsingReferenceNumber" :disabled="insertReadonly.UsingReferenceNumber" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsPublic" :error="$v.form.IsPublic">
              <NextCheckBox v-model="form.IsPublic" :disabled="insertReadonly.IsPublic" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsBlocked" :error="$v.form.IsBlocked">
              <NextCheckBox v-model="form.IsBlocked" :disabled="insertReadonly.IsBlocked" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsAutoBlockingOff" :error="$v.form.IsAutoBlockingOff">
              <NextCheckBox v-model="form.IsAutoBlockingOff" type="number" toggle :disabled="insertReadonly.IsAutoBlockingOff"/>
            </NextFormGroup>
            <NextFormGroup item-key="ManualSItem" :error="$v.form.ManualSItem">
              <NextCheckBox v-model="form.ManualSItem" type="number" toggle :disabled="insertReadonly.ManualSItem"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLocations" :items="locationItems" />
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
              <NextDropdown v-model="selectedCustomerGroup" lookup-key="CUSTOMER_GROUP" @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.classId">
              <NextDropdown v-model="selectedCustomerClass" label="Label" lookup-key="CUSTOMER_CLASS" @input="selectedType('ClassId', $event)"/>
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
            <NextFormGroup item-key="SalesMethodId" :error="$v.form.SalesMethodId">
              <NextDropdown v-model="selectedSalesMethod" :disabled="insertReadonly.SalesMethodId" lookup-key="CUSTOMER_SALES_METHOD" @input="selectedType('SalesMethodId', $event)"/>
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
            <NextFormGroup item-key="ClassProposalId" :error="$v.form.ClassProposalId">
              <NextDropdown :disabled="insertReadonly.ClassProposalId" v-model="classProposal" lookup-key="CUSTOMER_CLASS_PROPOSAL" @input="selectedType('ClassProposalId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GeographicEnvironmentId" :error="$v.form.GeographicEnvironmentId">
              <NextDropdown v-model="selectedGeographicEnvironment" :disabled="insertReadonly.GeographicEnvironmentId" lookup-key="CUSTOMER_GEOGRAPHIC_ENVIRONMENT" @input="selectedType('GeographicEnvironmentId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.backMarginGroupId">
              <NextDropdown :disabled="insertReadonly.BackMarginGroupId" v-model="backMarginGroup" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsTaxExemption" :error="$v.form.IsTaxExemption">
              <NextCheckBox v-model="form.IsTaxExemption" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="TextField6" :error="$v.form.TextField6">
              <NextInput v-model="form.TextField6" type="text" :disabled="insertReadonly.TextField6" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput v-model="form.LicenseNumber" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown v-model="kind" :disabled="insertReadonly.KindId" lookup-key="CUSTOMER_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.AdditionalClassInformation')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="DiscountGroup1Id" :error="$v.form.DiscountGroup1Id">
              <NextDropdown v-model="discountGroup1" :disabled="insertReadonly.DiscountGroup1Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_1" @input="selectedType('DiscountGroup1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup3Id" :error="$v.form.DiscountGroup3Id">
              <NextDropdown v-model="discountGroup3" :disabled="insertReadonly.DiscountGroup3Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_3" @input="selectedType('DiscountGroup3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup4Id" :error="$v.form.DiscountGroup4Id">
              <NextDropdown v-model="discountGroup4" :disabled="insertReadonly.DiscountGroup4Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_4" @input="selectedType('DiscountGroup4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup5Id" :error="$v.form.DiscountGroup5Id">
              <NextDropdown v-model="discountGroup5" :disabled="insertReadonly.DiscountGroup5Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_5" @input="selectedType('DiscountGroup5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup6Id" :error="$v.form.DiscountGroup6Id">
              <NextDropdown v-model="discountGroup6" :disabled="insertReadonly.DiscountGroup6Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_6" @input="selectedType('DiscountGroup6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown v-model="discountGroup7" :disabled="insertReadonly.DiscountGroup7Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_7" @input="selectedType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup8Id" :error="$v.form.DiscountGroup8Id">
              <NextDropdown v-model="discountGroup8" :disabled="insertReadonly.DiscountGroup8Id" lookup-key="CUSTOMER_DISCOUNT_GROUP_8" @input="selectedType('DiscountGroup8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Activity1Id" :error="$v.form.Activity1Id">
              <NextDropdown v-model="activity1" :disabled="insertReadonly.Activity1Id" lookup-key="CUSTOMER_ACTIVITY_1" @input="selectedType('Activity1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OutSourceOrderId" :error="$v.form.OutSourceOrderId">
              <NextDropdown v-model="outSourceOrder" :disabled="insertReadonly.OutSourceOrderId" lookup-key="OUT_SOURCE_ORDER" @input="selectedType('OutSourceOrderId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field1" :error="$v.form.Field1">
              <NextDropdown v-model="field1" :disabled="insertReadonly.Field1" lookup-key="FIELD_1" @input="selectedType('Field1', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field2" :error="$v.form.Field2">
              <NextDropdown v-model="field2" :disabled="insertReadonly.Field2" lookup-key="FIELD_2" @input="selectedType('Field2', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field3" :error="$v.form.Field3">
              <NextDropdown v-model="field3" :disabled="insertReadonly.Field3" lookup-key="FIELD_3" @input="selectedType('Field3', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field4" :error="$v.form.Field4">
              <NextDropdown v-model="field4" :disabled="insertReadonly.Field4" lookup-key="FIELD_4" @input="selectedType('Field4', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Field5" :error="$v.form.Field5">
              <NextDropdown v-model="field5" :disabled="insertReadonly.Field5" lookup-key="FIELD_5" @input="selectedType('Field5', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId" v-model="priceListCategory"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankPaymentSystemId" :error="$v.form.bankPaymentSystemId">
              <NextDropdown :disabled="insertReadonly.BankPaymentSystemId"  lookup-key="BANK_PAYMENT_SYSTEM" @input="selectedType('BankPaymentSystemId', $event)"/>
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
            <NextFormGroup item-key="ReservedLimit" :error="$v.form.ReservedLimit">
              <NextInput v-model="form.ReservedLimit" type="text" :disabled="insertReadonly.ReservedLimit" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="number" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="DebitAccountRemainder" :error="$v.form.debitAccountRemainder">
              <NextInput v-model="form.DebitAccountRemainder" type="text" :disabled="insertReadonly.debitAccountRemainder" />
            </NextFormGroup>
            <NextFormGroup item-key="SalesPriceChangeRate" :error="$v.form.SalesPriceChangeRate">
              <NextInput v-model="form.SalesPriceChangeRate" type="number" :disabled="insertReadonly.SalesPriceChangeRate" />
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
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.sapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.sapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.deliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="text" :disabled="insertReadonly.deliveryDayParam" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriod" :error="$v.form.PaymentPeriod">
              <NextDropdown v-model="paymentPeriod" :disabled="!(paymentType && paymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search?v=2" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown :disabled="insertReadonly.TciBreak1Id" v-model="tciBreak1" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.TciBreak2Id">
              <NextDropdown :disabled="insertReadonly.TciBreak2Id" v-model="tciBreak2" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.statementDay">
              <NextDropdown :disabled="insertReadonly.StatementDay" v-model="statementDay" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId"
                v-model="paymentType"
                url="VisionNextCommonApi/api/PaymentType/Search?v=1"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="AllowOverLimit" :error="$v.form.AllowOverLimit">
              <NextCheckBox v-model="form.AllowOverLimit" :disabled="insertReadonly.AllowOverLimit" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDirectDebit" :error="$v.form.IsDirectDebit">
              <NextCheckBox v-model="form.IsDirectDebit" :disabled="insertReadonly.IsDirectDebit" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="ManualInvoiceClosure" :error="$v.form.ManualInvoiceClosure">
              <NextCheckBox v-model="form.ManualInvoiceClosure" :disabled="insertReadonly.ManualInvoiceClosure" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextCheckBox v-model="form.Statement" :disabled="insertReadonly.Statement" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsBlackListed" :error="$v.form.IsBlackListed">
              <NextCheckBox v-model="form.IsBlackListed" :disabled="insertReadonly.IsBlackListed" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerCreditHistories" :items="customerCreditHistoriesItems" />
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
            <NextFormGroup item-key="TextField3" :error="$v.form.TextField3">
              <NextInput v-model="form.TextField3" type="text" :disabled="insertReadonly.TextField3" />
            </NextFormGroup>
            <NextFormGroup item-key="TextField4" :error="$v.form.TextField4">
              <NextInput v-model="form.TextField4" type="text" :disabled="insertReadonly.TextField4" />
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
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput v-model="form.Genexp1" type="text" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="TrackCode" :error="$v.form.TrackCode">
              <NextInput v-model="form.TrackCode" type="text" :disabled="insertReadonly.TrackCode" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.regions')" @click.prevent="tabValidation()">
          <b-row>
             <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.CustomerRegion5Id">
              <NextDropdown :disabled="insertReadonly.CustomerRegion5Id" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="MarketingRegion5Id" :error="$v.form.MarketingRegion5Id">
              <NextDropdown :disabled="insertReadonly.MarketingRegion5Id" lookup-key="MARKETING_REGION_5" @input="selectedType('MarketingRegion5Id', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.licenseInfo')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="IsLicenseRequired" :error="$v.form.IsLicenseRequired">
              <NextCheckBox v-model="form.IsLicenseRequired" type="number" toggle :disabled="insertReadonly.IsLicenseRequired"/>
            </NextFormGroup>
            <NextFormGroup item-key="LicenseStartDate" :error="$v.form.LicenseStartDate">
              <NextDatePicker v-model="form.LicenseStartDate" :disabled="insertReadonly.LicenseStartDate" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseEndDate" :error="$v.form.LicenseEndDate">
              <NextDatePicker v-model="form.LicenseEndDate" :disabled="insertReadonly.LicenseEndDate" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="rowData.CustomerItemDiscounts" :items="customerDiscountsItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.RouteDetails')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.RouteDetails" :items="routeDetailsItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.FixedTerms')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomFixedTerms" :items="customFixedTermItems" :main-form="form" />
        </b-tab>
        <b-tab :title="$t('insert.customer.assetLocationsItems')" @click.prevent="tabValidation()" >
          <NextDetailPanel type="get" v-model="form.AssetLocations" :items="assetLocationsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerTouchpoints')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerTouchpoints" :items="customerTouchpointsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerLabel')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLabels" :items="customerLabelsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerItems')" @click.prevent="tabValidation()" v-if="form.ManualSItem === 1">
          <NextDetailPanel v-model="form.CustomerSItems" :items="customersItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerAnalysisHistories')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerAnalysisHistories" :items="customerAnalysisItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerStatusHistories')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerStatusHistories" :items="customerStatusHistoriesItems"/>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerAccountTeams')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerAccountTeams" :items="customerAccountTeamsItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength, requiredIf } from 'vuelidate/lib/validators'
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
        CustomFixedTerms: [],
        CustomerTouchpoints: [],
        AssetLocations: [],
        CustomerLabels: [],
        CustomerSItems: [],
        CustomerAnalysisHistories: [],
        CustomerStatusHistories: [],
        CustomerAccountTeams: [],
        CardType: null,
        Group: null,
        KindId: null,
        Genexp1: null,
        TrackCode: null,
        UsingReferenceNumber: null,
        IsPublic: null,
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
        CustomerRegion5: null,
        DiscountGroup1: null,
        DiscountGroup2: null,
        DiscountGroup3: null,
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
        StatusReason: null,
        SignName: null,
        MarketingRegion5: null,
        TaxCustomerTypeId: null,
        InvoiceCombineRule: null,
        SalesDocumentType: null,
        BlockReason: null,
        CustomerInvoiceType: null,
        BackMarginGroup: null,
        Activity1: null,
        Activity2: null,
        OutSourceOrder: null,
        TCIBreak1: null,
        TCIBreak2: null
      },
      locationItems: detailData.locationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      customerDiscountsItems: detailData.customerDiscountsItems,
      paymentTypesItems: detailData.paymentTypesItems,
      routeDetailsItems: detailData.routeDetailsItems,
      customFixedTermItems: detailData.customFixedTermItems,
      customerTouchpointsItems: detailData.customerTouchpointsItems,
      customerLabelsItems: detailData.customerLabelsItems,
      customersItems: detailData.customersItems,
      customerAccountTeamsItems: detailData.customerAccountTeamsItems,
      assetLocationsItems: detailData.assetLocationsItems,
      customerStatusHistoriesItems: detailData.customerStatusHistoriesItems,
      customerAnalysisItems: detailData.customerAnalysisItems,
      cardType: {},
      taxCustomerType: {},
      blockReason: {},
      type: {},
      customerInvoiceType: {},
      customerRegion5: {},
      marketingRegion5: {},
      customerCategory3: {},
      customerCategory2: {},
      customerCategory1: {},
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
      discountGroup1: {},
      discountGroup3: {},
      discountGroup4: {},
      discountGroup5: {},
      discountGroup6: {},
      discountGroup7: {},
      discountGroup8: {},
      activity1: {},
      outSourceOrder: {},
      field1: {},
      field2: {},
      field3: {},
      field4: {},
      field5: {},
      kind: {}
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'insertColumnType', 'lookup', 'createCode', 'statementDays', 'distiricts', 'banks', 'currency', 'allPaymentTypes', 'items', 'customerLabels', 'customerLabelValues', 'rowData', 'customerCardTypes', 'cancelReasons', 'paymentPeriods', 'cities', 'credits', 'touchpoints', 'touchpoint_types']),
    filteredCustomerPaymentType () {
      return this.CustomerPaymentTypesArr.filter(item => {
        return item.RecordState !== 4
      })
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
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
      }
      if (this.paymentType && this.paymentType.Code === 'AH' && (this.form.PaymentPeriod === null || this.form.PaymentPeriod === '')) {
        this.$toasted.show(this.$t('insert.paymentPeriodrequired'), {
          type: 'error',
          keepOnHover: true,
          duration: '5000'
        })
        this.tabValidation()
      }
      let filteredList = this.form.CustomFixedTerms.filter(b => b.RecordState !== 4)
      if ((this.paymentType && this.paymentType.Code === 'AH') && (!filteredList || filteredList.length === 0)) {
        this.$toasted.show(this.$t('insert.tabPaymentPeriodRequired'), {
          type: 'error',
          keepOnHover: true,
          duration: '6000'
        })
        this.tabValidation()
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
          this.$store.dispatch('updateData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
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
    onItemsSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchItems(loading, search, this)
      }
    },
    searchItems (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextItem/api/Item/AutoCompleteSearch',
        name: 'items',
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ]
      }).then(res => {
        loading(false)
      })
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
      this.paymentType = this.convertLookupValueToSearchValue(rowData.DefaultPaymentType)
      this.cardType = this.convertLookupValueToSearchValue(rowData.CardType)
      this.distributionType = rowData.DistributionType
      this.invoiceCombineRule = rowData.InvoiceCombineRule
      this.blockReason = rowData.BlockReason
      this.customerInvoiceType = rowData.CustomerInvoiceType
      this.type = rowData.Type
      this.salesDocumentType = rowData.SalesDocumentType
      this.taxCustomerType = rowData.TaxCustomerType
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
      this.marketingRegion5 = rowData.MarketingRegion5
      this.customerCategory3 = rowData.Category3
      this.customerCategory2 = rowData.Category2
      this.customerCategory1 = rowData.Category1
      this.selectedCustomerGroup = rowData.Group
      this.selectedCustomerClass = rowData.Class
      this.salesType = rowData.SalesType
      this.classProposal = rowData.ClassProposal
      this.selectedSalesMethod = rowData.SalesMethod
      this.selectedGeographicEnvironment = rowData.GeographicEnvironment
      this.selectedTradeFocus = rowData.TradeFocus
      this.selectedOwnerType = rowData.OwnerType
      this.salesDocumentType = rowData.SalesDocumentType
      this.classProposalReason = rowData.ClassProposalReason
      this.backMarginGroup = rowData.BackMarginGroup
      this.discountGroup1 = rowData.DiscountGroup1
      this.discountGroup3 = rowData.DiscountGroup3
      this.discountGroup4 = rowData.DiscountGroup4
      this.discountGroup5 = rowData.DiscountGroup5
      this.discountGroup6 = rowData.DiscountGroup6
      this.discountGroup7 = rowData.DiscountGroup7
      this.discountGroup8 = rowData.DiscountGroup8
      this.activity1 = rowData.Activity1
      this.outSourceOrder = rowData.OutSourceOrder
      this.field1 = rowData.Field1
      this.field2 = rowData.Field2
      this.field3 = rowData.Field3
      this.field4 = rowData.Field4
      this.field5 = rowData.Field5
      this.kind = rowData.Kind
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
      if (!rowData.CustomFixedTerms) {
        this.form.CustomFixedTerms = []
      }
      if (!rowData.CustomerTouchpoints) {
        this.form.CustomerTouchpoints = []
      }
      if (!rowData.AssetLocations) {
        this.form.AssetLocations = []
      }
      if (!rowData.CustomerLabels) {
        this.form.CustomerLabels = []
      }
      if (!rowData.CustomerSItems) {
        this.form.CustomerSItems = []
      }
      if (!rowData.CustomerAnalysisHistories) {
        this.form.CustomerAnalysisHistories = []
      }
      if (!rowData.CustomerStatusHistories) {
        this.form.CustomerStatusHistories = []
      }
      if (!rowData.CustomerAccountTeams) {
        this.form.CustomerAccountTeams = []
      }

      if (rowData.Code === 'TZK') {
        this.taxNumberReq = 10
      } else {
        this.taxNumberReq = 11
      }
      this.insertRules.TaxNumber = {
        required, minLength: minLength(this.taxNumberReq), maxLength: maxLength(this.taxNumberReq)
      }
    }
  },
  validations () {
    let validation = {
      form: this.insertRules
    }
    this.insertRules.PaymentPeriod = {
      required: requiredIf(function () {
        return this.paymentType && this.paymentType.Code === 'AH'
      })
    }
    this.insertRequired.PaymentPeriod = this.paymentType && this.paymentType.Code === 'AH'

    this.insertRules.TaxCustomerTypeId = {
      required: requiredIf(function () {
        return this.form.IsDutyFree === 0
      })
    }
    this.insertRequired.TaxCustomerTypeId = this.form.IsDutyFree === 0

    this.insertRules.TaxNumber = {
      required: requiredIf(function () {
        return this.form.IsDutyFree === 0
      })
    }
    this.insertRequired.TaxNumber = this.form.IsDutyFree === 0

    this.insertRules.TaxOffice = {
      required: requiredIf(function () {
        return this.form.IsDutyFree === 0
      })
    }
    this.insertRequired.TaxOffice = this.form.IsDutyFree === 0
    validation.form.TaxNumber = {
      required, minLength: minLength(this.taxNumberReq), maxLength: maxLength(this.taxNumberReq)
    }
    return validation
  },
  watch: {
    statementDays (e) {
      if (e) {
        e.map(item => {
          item.Label = item.DayNumber + ' ' + item.Description1
        })
      }
    },
    lookup: {
      handler (val) {
        if (this.form.BlockReasonId && val.CUSTOMER_BLOCK_REASON) {
          this.BlockReason = val.CUSTOMER_BLOCK_REASON.find(c => c.DecimalValue === this.form.BlockReasonId)
        }
      },
      deep: true
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
    Category3 (value) {
      if (value) {
        if (!value.UpperValue) {
          return
        }
        this.Category2 = this.lookup.CUSTOMER_CATEGORY_2.find(x => x.Value === value.UpperValue)
        this.form.Category2Id = this.Category2.DecimalValue
        this.Category1 = this.lookup.CUSTOMER_CATEGORY_1.find(x => x.Value === this.Category2.UpperValue)
        this.form.Category1Id = this.Category1.DecimalValue
      } else {
        this.Category1 = null
        this.Category2 = null
        this.form.Category1Id = null
        this.form.Category2Id = null
        this.form.Category3Id = null
      }
    },
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
<style lang="sass">
</style>
