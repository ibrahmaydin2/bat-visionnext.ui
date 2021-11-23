<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <header>
              <Breadcrumb />
            </header>
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <b-row>
              <b-col cols="12" md="6">
                <GetFormField v-if="showWorkFlow" v-model="workFlowModel" :hide-edit="true"/>
              </b-col>
              <b-col cols="12" md="6">
                <router-link :to="{name: 'KeyAccount' }">
                  <CancelButton />
                </router-link>
                <AddButton @click.native="save()" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </header>
       <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
          <NextLocation :Location='Location' />
        </b-modal>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" md="3" lg="3" />
          </NextFormGroup>
          <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId" md="3" lg="3">
            <NextDropdown v-model="CardType" :disabled="insertReadonly.CardTypeId" url="VisionNextCustomer/api/CustomerCardType/Search" @input="selectedSearchType('CardTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusReasonId" :error="$v.form.StatusReasonId" md="3" lg="3">
            <NextDropdown  v-model="StatusReason" :disabled="insertReadonly.StatusReasonId" url="VisionNextCommonApi/api/CancelReason/Search" @input="selectedSearchType('StatusReasonId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
        <b-row v-if="form.RecordTypeId === 4 && upperCustomer !== null">
          <b-col md="12" lg="12">
            <b-form-group :label="$t('insert.customer.mainOfBranch')">
              <a :href="`/Update/KeyAccount/${upperCustomer.DecimalValue}`"> {{upperCustomer.Code}} - {{upperCustomer.Label}}</a>
            </b-form-group>
          </b-col>
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
              <NextDropdown v-model="TaxCustomerType" :disabled="insertReadonly.TaxCustomerTypeId" lookup-key="TAX_CUSTOMER_TYPE" @input="selectedType('TaxCustomerTypeId', $event)"/>
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
              <NextDropdown v-model="BlockReason" lookup-key="CUSTOMER_BLOCK_REASON"  @input="selectedType('BlockReasonId', $event)" :disabled="insertReadonly.BlockReasonId"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown v-model="Type" :disabled="insertReadonly.TypeId"  lookup-key="CUSTOMER_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerInvoiceTypeId" :error="$v.form.CustomerInvoiceTypeId" md="2" lg="2">
              <NextDropdown v-model="CustomerInvoiceType" :disabled="insertReadonly.CustomerInvoiceTypeId"  lookup-key="CUSTOMER_INVOICE_TYPE" @input="selectedType('CustomerInvoiceTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.customerRegion5Id" md="2" lg="2">
              <NextDropdown v-model="CustomerRegion5" :disabled="insertReadonly.customerRegion5Id" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="MarketingRegion5Id" :error="$v.form.MarketingRegion5Id" md="2" lg="2">
              <NextDropdown v-model="MarketingRegion5" :disabled="insertReadonly.MarketingRegion5Id" lookup-key="MARKETING_REGION_5" @input="selectedType('MarketingRegion5Id', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="RouteCode" :error="$v.form.RouteCode" md="2" lg="2">
              <NextInput v-model="form.RouteCode" type="text" :disabled="insertReadonly.RouteCode" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseValidDate" :error="$v.form.LicenseValidDate" md="2" lg="2">
              <NextDatePicker v-model="form.LicenseValidDate" :disabled="insertReadonly.LicenseValidDate" />
            </NextFormGroup>
            <NextFormGroup item-key="IsBlocked" :error="$v.form.IsBlocked" md="2" lg="2">
              <NextCheckBox v-model="form.IsBlocked" type="number" toggle :disabled="insertReadonly.IsBlocked" />
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
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()" v-if="form.Code">
          <NextDetailPanel v-model="form.CustomerLocations" :items="locationItems" :main-form="form" :detail-buttons="detailButtons"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')" @click.prevent="tabValidation()">
          <b-row>
             <NextFormGroup item-key="Category3Id" :error="$v.form.Category3Id">
              <NextDropdown v-model="Category3" :disabled="insertReadonly.Category3Id" lookup-key="CUSTOMER_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.Category2Id">
              <NextDropdown v-model="Category2" :disabled="true" lookup-key="CUSTOMER_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown v-model="Category1" :disabled="true" lookup-key="CUSTOMER_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown v-model="Group" lookup-key="CUSTOMER_GROUP" @input="selectedType('GroupId', $event)" :disabled="insertReadonly.GroupId" />
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown v-model="Class" lookup-key="CUSTOMER_CLASS" @input="selectedType('ClassId', $event)" :disabled="insertReadonly.ClassId"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown v-model="SalesDocumentType" :disabled="insertReadonly.SalesDocumentTypeId" lookup-key="SALES_DOCUMENT_TYPE" @input="selectedType('SalesDocumentTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="OwnerTypeId" :error="$v.form.OwnerTypeId">
              <NextDropdown v-model="OwnerType" :disabled="insertReadonly.OwnerTypeId" lookup-key="OWNER_TYPE" @input="selectedType('OwnerTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalId" :error="$v.form.ClassProposalId">
              <NextDropdown v-model="ClassProposal" :disabled="insertReadonly.ClassProposalId" lookup-key="CUSTOMER_CLASS_PROPOSAL" @input="selectedType('ClassProposalId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SalesMethodId" :error="$v.form.SalesMethodId">
              <NextDropdown v-model="SalesMethod" :disabled="insertReadonly.SalesMethodId" lookup-key="CUSTOMER_SALES_METHOD" @input="selectedType('SalesMethodId', $event)"/>
            </NextFormGroup>
             <NextFormGroup item-key="GeographicEnvironmentId" :error="$v.form.GeographicEnvironmentId">
              <NextDropdown v-model="GeographicEnvironment" :disabled="insertReadonly.GeographicEnvironmentId" lookup-key="CUSTOMER_GEOGRAPHIC_ENVIRONMENT" @input="selectedType('GeographicEnvironmentId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TradeFocusId" :error="$v.form.TradeFocusId">
              <NextDropdown v-model="TradeFocus" :disabled="insertReadonly.TradeFocusId" lookup-key="CUSTOMER_TRADE_FOCUS" @input="selectedType('TradeFocusId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown v-model="InvoiceCombineRule" :disabled="insertReadonly.InvoiceCombineRuleId"  lookup-key="INVOICE_COMBINE_RULE" @input="selectedType('InvoiceCombineRuleId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassProposalReasonId" :error="$v.form.ClassProposalReasonId">
              <NextDropdown v-model="ClassProposalReason" :disabled="insertReadonly.ClassProposalReasonId"  lookup-key="CUSTOMER_CLASS_PROPOSAL_REASON" @input="selectedType('ClassProposalReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.BackMarginGroupId">
              <NextDropdown v-model="BackMarginGroup" :disabled="insertReadonly.BackMarginGroupId" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown v-model="Kind" :disabled="insertReadonly.KindId" lookup-key="CUSTOMER_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab v-if="form.RecordTypeId === 3" :title="$t('insert.customer.Branchs')" @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="3" lg="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addBranch" />
              </b-form-group>
             </b-col>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.customer.Branchs')">
              <NextInput v-model="searchValue" type="text" ></NextInput>
            </NextFormGroup>
          </b-row>
          <b-row>
            <b-table-simple id="searched-customer-list" :current-page="currentPage" :per-page="0" bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.BranchCode')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.BranchName')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.AuthorizedBranch')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(b, i) in branchs" :key="i">
                  <b-td>{{b.Code}}</b-td>
                  <b-td>{{b.Description1}}</b-td>
                  <b-td>{{allBranchs != null && allBranchs.length > 0 ? allBranchs.find(x => x.RecordId === b.BranchId).Description1 : ''}}</b-td>
                  <b-td class="text-center">
                    <a :href="`/Update/KeyAccount/${b.RecordId}`"><i class="fas fa-edit text-success" /></a>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <b-pagination
              :total-rows="totalRowCount"
              v-model="currentPage"
              :per-page="20"
              aria-controls="searched-customer-list"
            ></b-pagination>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown v-model="PriceListCategory" :disabled="insertReadonly.PriceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
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
              <NextDropdown v-model="PaymentPeriod" :disabled="!(DefaultPaymentType && DefaultPaymentType.Code == 'AH') || insertReadonly.PaymentPeriod"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TCIBreak1Id" :error="$v.form.TCIBreak1Id">
              <NextDropdown v-model="TCIBreak1" :disabled="insertReadonly.TCIBreak1Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TCIBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TCIBreak2Id" :error="$v.form.TCIBreak2Id">
              <NextDropdown v-model="TCIBreak2" :disabled="insertReadonly.TCIBreak2Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TCIBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.StatementDay">
              <NextDropdown v-model="StatementDay" :disabled="insertReadonly.StatementDay || !form.Statement" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId"
                v-model="DefaultPaymentType"
                url="VisionNextCommonApi/api/PaymentType/Search" />
            </NextFormGroup>
             <NextFormGroup item-key="AllowOverLimit" :error="$v.form.AllowOverLimit">
              <NextCheckBox v-model="form.AllowOverLimit" type="number" toggle :disabled="insertReadonly.AllowOverLimit"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDirectDebit" :error="$v.form.IsDirectDebit">
              <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle :disabled="insertReadonly.IsDirectDebit || DefaultPaymentType.Code !== 'AH'"/>
            </NextFormGroup>
            <NextFormGroup item-key="ManualInvoiceClosure" :error="$v.form.ManualInvoiceClosure">
              <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle :disabled="insertReadonly.ManualInvoiceClosure"/>
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextCheckBox v-model="form.Statement" type="number" toggle :disabled="insertReadonly.Statement"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerCreditHistories" :items="customerCreditHistoriesItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerPaymentTypes" :items="paymentTypesItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')" @click.prevent="tabValidation()">
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
              <NextDropdown v-model="HoldsAsset" lookup-key="CUSTOMER_HOLD_ASSET" @input="selectedType('HoldsAsset', $event)" :disabled="insertReadonly.HoldsAsset"/>
            </NextFormGroup>
            <NextFormGroup item-key="Contracted" :error="$v.form.Contracted" md="3" lg="3">
              <NextDropdown v-model="Contracted" lookup-key="CUSTOMER_CONTRACTED" @input="selectedType('Contracted', $event)" :disabled="insertReadonly.Contracted"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerItemDiscounts" :items="customerDiscountsItems" />
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.CustomerLabels" :items="customerLabelItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import mixin from '../../mixins/update'
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
        TypeId: null
      },
      routeName1: 'Customer',
      routeName2: 'Customer',
      CardType: null,
      Group: null,
      Kind: null,
      Type: null,
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
      TaxCustomerType: null,
      InvoiceCombineRule: null,
      SalesDocumentType: null,
      BlockReason: null,
      CustomerInvoiceType: null,
      BackMarginGroup: null,
      Activity1: null,
      Activity2: null,
      OutSourceOrder: null,
      TCIBreak1: null,
      TCIBreak2: null,
      StatementDay: null,
      taxNumberReq: 10,
      upperCustomer: null,
      Location: {},
      detailButtons: [
        {
          icon: 'fa fa-map-marker-alt text-primary mr-1',
          getDetail: (data) => {
            this.showMap(data)
          }
        }
      ],
      branchs: [],
      allBranchs: [],
      locationItems: detailData.locationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      paymentTypesItems: detailData.paymentTypesItems,
      customerDiscountsItems: detailData.customerDiscountsItems,
      customerLabelItems: detailData.customerLabelItems,
      currentPage: 1,
      totalRowCount: 0,
      searchValue: null,
      allList: {},
      Description1: '',
      showWorkFlow: false,
      workFlowModel: {}
    }
  },
  mounted () {
    this.getData('/GetKeyAccount').then(() => { this.setData() })
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
        this.tabValidation()
      } else {
        this.form.TciBreak1Id = this.form.TCIBreak1Id
        this.form.TciBreak2Id = this.form.TCIBreak2Id
        this.form.ZCreditAccountRemainder = this.form.ZcreditAccountRemainder
        this.form.ZDebitAccountRemainder = this.form.ZdebitAccountRemainder
        this.updateData()
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
    addCreditHistories () {
      this.$v.customerCreditHistories.$touch()
      if (this.$v.customerCreditHistories.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.CustomerCreditHistories.push({
        RecordState: 2,
        CreditAmount: this.customerCreditHistories.creditAmount,
        CreditDescriptionId: this.customerCreditHistories.creditDescriptionId,
        CreditStartDate: this.dateConvertToISo(this.customerCreditHistories.creditStartDate),
        BankId: this.customerCreditHistories.bankId,
        CurrencyId: this.customerCreditHistories.currencyId,
        CreditEndDate: this.dateConvertToISo(this.customerCreditHistories.creditEndDate),
        Debtor: this.customerCreditHistories.debtor,
        Bail: this.customerCreditHistories.bail,
        TextDate: this.dateConvertToISo(this.customerCreditHistories.textDate),
        LandOffice: this.customerCreditHistories.landOffice,
        NotaryDate: this.dateConvertToISo(this.customerCreditHistories.notaryDate),
        TraficRegistry: this.customerCreditHistories.traficRegistry,
        TextNo: this.customerCreditHistories.textNo,
        CreditLimit: this.customerCreditHistories.creditLimit,
        NotaryNo: this.customerCreditHistories.notaryNo,
        PlateNumber: this.customerCreditHistories.plateNumber,
        RiskLimit: this.customerCreditHistories.riskLimit,
        MortgageValue: this.customerCreditHistories.mortgageValue,
        DbsPriority: this.customerCreditHistories.dbsPriority,
        AllowOverLimit: this.customerCreditHistories.allowOverLimit,
        Plate: this.customerCreditHistoriesplate
      })
      this.customerCreditHistories = {
        bankId: null
      }
      this.$v.customerCreditHistories.$reset()
    },
    removeCustomerCreditHistory (item) {
      this.form.CustomerCreditHistories.splice(this.form.CustomerCreditHistories.indexOf(item), 1)
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
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
    getBranchs (currentPage) {
      if (currentPage) {
        this.currentPage = currentPage
      }
      let request = {
        andConditionModel: {
          UpperCustomerIds: [this.rowData.RecordId]
        },
        page: this.currentPage
      }

      if (this.searchValue) {
        request.orConditionModels = [
          {
            Description1: this.searchValue,
            Code: this.searchValue,
            LicenseNumber: this.searchValue,
            CommercialTitle: this.searchValue
          }
        ]
      }
      this.isLoading = true
      this.allList = {}
      if (this.allList[this.currentPage]) {
        this.branchs = this.allList[this.currentPage]
        return
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/SearchKeyAccount', 20).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          this.branchs = response.ListModel.BaseModels
          this.allList[this.currentPage] = this.branchs
        }
      })
    },
    addBranch () {
      this.$store.commit('setValues', {
        name: 'SelectedCustomer',
        data: {
          Values: this.rowData
        }
      })
      this.$router.push('/Insert/KeyAccount')
    },
    setData () {
      let e = this.rowData
      if (e) {
        if (e.RecordTypeId === 3) {
          this.getBranchs(e.RecordId)
        }
        if (e.UpperDistributionTypeId === 5) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.customer.keyAccountNotValidToUpdate') })
          setTimeout(() => {
            this.$router.push({ name: 'KeyAccount' })
          }, 2000)
        }
        this.form = e
        this.form.ZcreditAccountRemainder = e.ZCreditAccountRemainder
        this.form.ZdebitAccountRemainder = e.ZDebitAccountRemainder
        this.form.CustomerLabels = e.CustomerLabels ? e.CustomerLabels : []
        this.form.CustomerPaymentTypes = e.CustomerPaymentTypes ? e.CustomerPaymentTypes : []
        this.form.CustomerLocations = e.CustomerLocations ? e.CustomerLocations : []
        this.form.CustomerItemDiscounts = e.CustomerItemDiscounts ? e.CustomerItemDiscounts : []
        this.form.CustomerCreditHistories = e.CustomerCreditHistories ? e.CustomerCreditHistories : []
        this.upperCustomer = e.UpperCustomer
        this.CardType = this.convertLookupValueToSearchValue(e.CardType)
        this.Group = e.Group
        this.Kind = e.Kind
        this.Type = e.Type
        this.Class = e.Class
        this.Category1 = e.Category1
        this.Category2 = e.Category2
        this.Category3 = e.Category3
        this.DefaultPaymentType = this.convertLookupValueToSearchValue(e.DefaultPaymentType)
        this.PriceListCategory = e.PriceListCategory
        this.CustomerRegion5 = e.CustomerRegion5
        this.MarketingRegion5 = e.MarketingRegion5
        this.DiscountGroup1 = e.DiscountGroup1
        this.DiscountGroup2 = e.DiscountGroup2
        this.DiscountGroup3 = e.DiscountGroup3
        this.DiscountGroup4 = e.DiscountGroup4
        this.DiscountGroup5 = e.DiscountGroup5
        this.DiscountGroup6 = e.DiscountGroup6
        this.DiscountGroup7 = e.DiscountGroup7
        this.DiscountGroup8 = e.DiscountGroup8
        this.DiscountGroup9 = e.DiscountGroup9
        this.DiscountGroup10 = e.DiscountGroup10
        this.PaymentPeriod = this.convertLookupValueToSearchValue(e.PaymentPeriodo)
        this.OwnerType = e.OwnerType
        this.ClassProposal = e.ClassProposal
        this.ClassProposalReason = e.ClassProposalReason
        this.GeographicEnvironment = e.GeographicEnvironment
        this.SalesMethod = e.SalesMethod
        this.TradeFocus = e.TradeFocus
        this.HoldsAsset = e.HoldsAsseto
        this.Contracted = e.Contractedo
        this.StatusReason = this.convertLookupValueToSearchValue(e.StatusReason)
        this.SignName = e.SignName
        this.TaxCustomerType = e.TaxCustomerType
        this.selectedType('TaxCustomerTypeId', e.TaxCustomerType)
        this.InvoiceCombineRule = e.InvoiceCombineRule
        this.SalesDocumentType = e.SalesDocumentType
        this.CustomerInvoiceType = e.CustomerInvoiceType
        this.BackMarginGroup = e.BackMarginGroup
        this.Activity1 = e.Activity1
        this.Activity2 = e.Activity2
        this.OutSourceOrder = e.OutSourceOrder
        this.TCIBreak1 = e.TCIBreak1
        this.TCIBreak2 = e.TCIBreak2
        this.StatementDay = this.convertLookupValueToSearchValue(e.StatementDayo)

        this.workFlowModel = {
          ControllerName: 'Customer',
          ClassName: 'Customer',
          PageName: this.rowData.RecordTypeId === 4 ? 'pg_Customer' : 'pg_KeyAccount'
        }
        this.$nextTick(() => {
          this.showWorkFlow = true
        })
      }
    }
  },
  watch: {
    branchs (e) {
      if (e && e.length > 0 && (!this.allBranchs || this.allBranchs.length === 0)) {
        let request = {
          andConditionModel: {
            RecordIds: [...new Set(e.map(x => x.BranchId))]
          }
        }
        this.$api.postByUrl(request, 'VisionNextBranch/api/Branch/Search').then((response) => {
          if (response && response.ListModel) {
            this.allBranchs = response.ListModel.BaseModels
          }
        })
      }
    },
    Category3 (value) {
      if (value) {
        if (!value.UpperValue || !this.lookup.CUSTOMER_CATEGORY_2 || !this.lookup.CUSTOMER_CATEGORY_1) {
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
    currentPage () {
      this.getBranchs()
    },
    searchValue () {
      this.getBranchs(1)
    }
  }
}
</script>
