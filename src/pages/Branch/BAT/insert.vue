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
              <NextInput v-model="form.TaxNumber" type="number" :disabled="insertReadonly.TaxNumber" :maxLength="taxNumberReq" :oninput="maxLengthControl" />
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
        <b-tab :title="$t('insert.branch.locations')">
          <NextDetailPanel v-model="form.BranchLocations" :items="customerLocationItems" />
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
              <NextDropdown :disabled="!(DefaultPaymentType && DefaultPaymentType.Code == 'AH')"  url="VisionNextCommonApi/api/FixedTerm/Search" @input="selectedSearchType('PaymentPeriod', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)"/>
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
            <NextFormGroup item-key="DebitAccountRemainder" :error="$v.form.DebitAccountRemainder">
              <NextInput v-model="form.DebitAccountRemainder" type="text" :disabled="insertReadonly.DebitAccountRemainder" />
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
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown :disabled="insertReadonly.TciBreak1Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak2Id" :error="$v.form.TciBreak2Id">
              <NextDropdown :disabled="insertReadonly.TciBreak2Id" lookup-key="TCI_BREAKDOWN" @input="selectedType('TciBreak2Id', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="StatementDay" :error="$v.form.StatementDay">
              <NextDropdown :disabled="insertReadonly.StatementDay" url="VisionNextSystem/api/SysDay/Search" @input="selectedSearchType('StatementDay', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SapCustomerId" :error="$v.form.SapCustomerId">
              <NextInput v-model="form.SapCustomerId" type="text" maxLength="12" :oninput="maxLengthControl" :disabled="insertReadonly.SapCustomerId" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryDayParam" :error="$v.form.DeliveryDayParam">
              <NextInput v-model="form.DeliveryDayParam" type="text" :disabled="insertReadonly.DeliveryDayParam" />
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
        <b-tab :title="$t('insert.branch.creditHistories')" :disabled="branchDistributionTypeId === 5">
          <NextDetailPanel v-model="form.BranchCreditHistories" :items="customerCreditHistoriesItems" />
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerItemDiscountCrts')">
          <NextDetailPanel v-model="form.CustomerItemDiscountCrts" :items="customerItemDiscountCrtItems"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.InvoiceSeqs')">
          <NextDetailPanel v-model="form.EInvoiceSeqs" :items="customerEInvoiceSeqsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.branch.customerClassInfo')">
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
            <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.CustomerRegion5Id">
              <NextDropdown :disabled="insertReadonly.CustomerRegion5Id" lookup-key="CUSTOMER_REGION_5" @input="selectedType('CustomerRegion5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BackMarginGroupId" :error="$v.form.BackMarginGroupId">
              <NextDropdown :disabled="insertReadonly.BackMarginGroupId" lookup-key="BACK_MARGIN_GROUP" @input="selectedType('BackMarginGroupId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.bankInformation')">
          <b-row>
            <NextFormGroup :title="$t('insert.branch.bankName')" :error="$v.branchBankId"  @click.prevent="tabValidation()">
              <NextDropdown
                v-model="branchBankId"
                @input="getBranchs($event, 'BankId', 'bankBranch', 'bankBranches')"
                url="VisionNextBank/api/Bank/AutoCompleteSearch"
                :searchable="false"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.branch.title')" :error="$v.branchBanks.title">
              <NextInput v-model="branchBanks.title" type="text"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.branch.ibanNo')" :error="$v.branchBanks.ibanNumber">
              <NextInput v-model="branchBanks.ibanNumber" type="text" v-mask="'TR##-####-####-####-####-####-##'" placeholder="TR" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addBankInformation" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.branch.bankName')}}</span></b-th>
                <b-th><span>{{$t('insert.branch.title')}}</span></b-th>
                <b-th><span>{{$t('insert.branch.ibanNo')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(b, i) in form.BranchBanks" :key="i">
                  <b-td>{{b.Description1}}</b-td>
                  <b-td>{{b.Title}}</b-td>
                  <b-td>{{b.IbanNumber}}</b-td>
                  <b-td class="text-center">
                    <b-button @click="editBankInformation(b)" class="btn mr-2 btn-warning btn-sm">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button @click="removeBankInformation(b)" class="btn mr-2 btn-danger btn-sm">
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
import { mapState } from 'vuex'
import insertMixin from '../../../mixins/insert'
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
        BranchPaymentTypes: null,
        CustomFixedTerms: null,
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
        SapCustomerId: null,
        BranchBanks: []
      },
      customerLocationItems: detailData.customerLocationItems,
      customerCreditHistoriesItems: detailData.customerCreditHistoriesItems,
      customerEInvoiceSeqsItems: detailData.customerEInvoiceSeqsItems,
      customerItemDiscountCrtItems: detailData.customerItemDiscountCrtItems,
      DefaultPaymentType: null,
      branchDistributionTypeId: 0,
      allTypes: [],
      customerCategory3: null,
      customerCategory2: null,
      customerCategory1: null,
      taxNumberReq: 10,
      selectedIndex: -1,
      branchBankId: {},
      branchBanks: {
        title: null,
        ibanNumber: null
      }
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
      } else {
        this.createData()
      }
    },
    getBranchs (model, modelKey, ListKey) {
      this[modelKey] = null
      this[ListKey] = []

      if (model) {
        this.branchBankId = {
          RecordId: model.RecordId,
          Description1: model.Description1
        }
        this.$api.postByUrl({RecordId: model.RecordId}, 'VisionNextBank/api/Bank/Get').then(res => {
          this[ListKey] = res.Model ? res.Model.BankBranches : []
        })
      } else {
        this.branchBanks.bankId = null
      }
    },
    addBankInformation () {
      this.$v.branchBanks.$touch()
      if (this.$v.branchBanks.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let item = {
        BankId: this.branchBankId.bankId,
        Description1: this.branchBankId.Description1,
        Title: this.branchBanks.title,
        IbanNumber: this.branchBanks.ibanNumber,
        RecordId: this.branchBanks.recordId,
        RecordState: this.branchBanks.recordId > 0 ? 3 : 2
      }
      if (this.branchBanks.isUpdated) {
        this.form.BranchBanks[this.selectedIndex] = item
        this.selectedIndex = -1
      } else {
        this.form.BranchBanks.push(item)
      }
      this.branchBankId = {}
      this.branchBanks = {}
      this.$v.branchBanks.$reset()
      this.$forceUpdate()
    },
    editBankInformation (item, index) {
      this.selectedIndex = this.form.BranchBanks.indexOf(item)
      this.branchBankId = {
        RecordId: item.BankId,
        Description1: item.Description1
      }
      this.branchBanks = {
        title: item.Title,
        ibanNumber: item.IbanNumber,
        recordId: item.RecordId,
        isUpdated: true
      }
    },
    removeBankInformation (item) {
      this.form.BranchBanks.splice(this.form.BranchBanks.indexOf(item), 1)
      this.$forceUpdate()
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
    return {
      form: this.insertRules,
      branchBanks: {
        title: {
          required
        },
        ibanNumber: {
          required
        }
      },
      branchBankId: {
        required
      }
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
