<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'PriceDiscountTransaction' }">
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
            <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.PriceDiscountTransaction.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown
                @input="selectedType('TciBreak1Id', $event)"
                v-model="tciBreak1"
                :disabled="insertReadonly.TciBreak1Id"
                lookup-key="TCI_BREAKDOWN"
                label="Label"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                :disabled="insertReadonly.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="customer"
                :searchable="true" :custom-option="true"
                label="Description1"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="TransactionDate" :error="$v.form.TransactionDate">
              <NextDatePicker v-model="form.TransactionDate" :disabled="insertReadonly.TransactionDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTime" :error="$v.form.TransactionTime">
              <NextTimePicker
              :disabled="insertReadonly.TransactionTime"
              v-model="form.TransactionTime"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountReasonId" :error="$v.form.DiscountReasonId">
              <NextDropdown
                @input="selectedSearchType('DiscountReasonId', $event)"
                v-model="discountReason"
                :disabled="insertReadonly.DiscountReasonId"
                url="VisionNextDiscount/api/DiscountReason/Search"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="PriceDiscountAmount" :error="$v.form.PriceDiscountAmount">
              <NextInput type="text" v-model="form.PriceDiscountAmount" :disabled="insertReadonly.PriceDiscountAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown v-model="currency" :disabled="insertReadonly.CurrencyId" @input="selectedSearchType('CurrencyId', $event)" label="Description1" url="VisionNextSystem/api/SysCurrency/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetId" :error="$v.form.BudgetId">
              <NextDropdown v-model="budget" :disabled="!form.UseBudget" @input="selectedSearchType('BudgetId', $event)" label="CustomerDesc" :source="budgets"/>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <NextDropdown
                @input="selectedType('ApproveStateId', $event)"
                lookup-key="APPROVE_STATE"
                v-model="approveState"
                :disabled="insertReadonly.ApproveStateId"
                label="Label"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="ErpCode" :error="$v.form.ErpCode">
              <NextInput type="text" v-model="form.ErpCode" :disabled="insertReadonly.ErpCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ExpirationDate" :error="$v.form.ExpirationDate">
              <NextDatePicker v-model="form.ExpirationDate" :disabled="insertReadonly.ExpirationDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="GainTypeId" :error="$v.form.GainTypeId">
              <NextInput type="text" v-model="GainTypeName" :disabled="insertReadonly.GainTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="useBudget" type="number" toggle :disabled="!form.CustomerId || form.CustomerId === 0" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <NextInput type="text" v-model="form.BudgetAmount" :disabled="insertReadonly.BudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetConsumption" :error="$v.form.BudgetConsumption">
              <NextInput type="text" v-model="form.BudgetConsumption" :disabled="insertReadonly.BudgetConsumption" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: null,
        System: null,
        RecordState: null,
        StatusId: null,
        RecordId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        TransactionDate: null,
        TransactionTime: null,
        DiscountReasonId: null,
        PriceDiscountAmount: null,
        CurrencyId: null,
        UseBudget: null,
        BudgetAmount: null,
        BudgetConsumption: null,
        BudgetId: null,
        ApproveStateId: null,
        ErpCode: null,
        ExpirationDate: null,
        BeginDate: null,
        Genexp1: null,
        GainTypeId: null,
        TciBreak1Id: null
      },
      customer: {},
      budget: {},
      tciBreak1: null,
      discountReason: null,
      currency: null,
      approveState: null,
      budgets: [],
      currencyLabel: null,
      useBudget: null,
      GainTypeName: null,
      routeName1: 'Discount'
    }
  },
  computed: {
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setModel()
      })
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
    },
    setModel () {
      let e = this.rowData
      this.form = this.rowData
      this.customer = this.convertLookupValueToSearchValue(e.Customer)
      this.discountReason = this.convertLookupValueToSearchValue(e.DiscountReason)
      this.currency = this.convertLookupValueToSearchValue(e.Currency)
      this.budget = this.convertLookupValueToSearchValue(e.Budget)
      this.approveState = e.ApproveState
      this.tciBreak1 = e.TciBreak1
      this.gainType = e.GainType
    }
  },
  validations () {
    if (this.form.UseBudget === 1) {
      this.insertRequired.BudgetId = true
      this.insertRules.BudgetId = {
        required
      }
    } else {
      this.insertRules.BudgetId = {}
      this.insertRequired.BudgetId = false
    }
    return {
      form: this.insertRules
    }
  },
  watch: {
    customer (value) {
      if (value) {
        if (this.form.CustomerId > 0 && this.useBudget) {
          var me = this
          me.budgets = []
          let request = {
            customerId: this.form.CustomerId
          }
          me.$api.post(request, 'Budget', 'BudgetMaster/GetCustomerBudget').then((res) => {
            if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
              me.budgets = res.ListModel.BaseModels
              me.$forceUpdate()
            } else {
              this.$store.commit('showAlert', { type: 'danger', msg: this.$t('get.PriceDiscountTransaction.customerBudgetNotFound') })
            }
          })
        }
        let LoyaltyCustomer = {
          TableName: 'T_CUSTOMER',
          ColumnName: 'RECORD_ID',
          ColumnValue: value.RecordId,
          BranchId: 6,
          CompanyId: 1,
          PagerecordCount: 20,
          Page: 1,
          OrderByColumns: []
        }
        this.$api.post({LoyaltyCustomer}, 'Loyalty', 'LoyaltyCustomer/Search').then((res) => {
          if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
            this.form.GainTypeId = this.lookup.GAIN_TYPE[1].DecimalValue
            this.GainTypeName = this.lookup.GAIN_TYPE[1].Label
          } else {
            this.form.GainTypeId = this.lookup.GAIN_TYPE[0].DecimalValue
            this.GainTypeName = this.lookup.GAIN_TYPE[0].Label
          }
        })
      } else {
        this.form.GainTypeId = null
        this.GainTypeName = null
        this.form.BudgetId = 0
        this.budgets = []
        this.budget = {}
      }
    },
    currencies (e) {
      if (e) {
        this.currencyLabel = e[0].Description1
      }
    },
    useBudget (e) {
      this.form.ApproveStateId = e === 1 ? 2100 : 2102
      this.form.UseBudget = e
      this.budgets = []
      if (e === 0) {
        this.budget = {}
      } else {
        if (this.form.CustomerId) {
          var me = this
          let request = {
            customerId: this.form.CustomerId
          }
          me.$api.post(request, 'Budget', 'BudgetMaster/GetCustomerBudget').then((res) => {
            if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
              me.budgets = res.ListModel.BaseModels
              me.$forceUpdate()
            } else {
              this.$store.commit('showAlert', { type: 'danger', msg: this.$t('get.PriceDiscountTransaction.customerBudgetNotFound') })
            }
          })
        }
      }
    }
  }
}
</script>
