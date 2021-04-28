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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.PriceDiscountTransaction.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <v-select
                v-model="tciBreak1"
                :options="lookup.TCI_BREAKDOWN"
                @input="selectedType('TciBreak1Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select v-model="customer" :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionDate" :error="$v.form.TransactionDate">
              <b-form-datepicker v-model="form.TransactionDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTime" :error="$v.form.TransactionTime">
              <b-form-timepicker
              :placeholder="$t('insert.chooseTime')"
              :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
              :label-no-time-selected="$t('insert.chooseTime')"
              :label-close-button="$t('insert.close')"
              close-button-variant="outline-danger"
              v-model="form.TransactionTime"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountReasonId" :error="$v.form.DiscountReasonId">
              <v-select v-model="discountReason" :options="discountReasons" @input="selectedSearchType('DiscountReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PriceDiscountAmount" :error="$v.form.PriceDiscountAmount">
              <b-form-input type="text" v-model="form.PriceDiscountAmount" :readonly="insertReadonly.PriceDiscountAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <v-select v-model="currency" :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetId" :error="$v.form.BudgetId">
              <v-select v-model='budget' :options="budgets" @input="selectedSearchType('BudgetId', $event)" label="CustomerDesc" :disabled='!useBudget' />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <v-select
                v-model="approveState"
                :options="lookup.APPROVE_STATE"
                @input="selectedType('ApproveStateId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ErpCode" :error="$v.form.ErpCode">
              <b-form-input type="text" v-model="form.ErpCode" :readonly="insertReadonly.ErpCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ExpirationDate" :error="$v.form.ExpirationDate">
              <b-form-datepicker v-model="form.ExpirationDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <b-form-datepicker v-model="form.BeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="GainTypeId" :error="$v.form.GainTypeId">
              <b-form-input type="text" v-model="GainTypeName" readonly />
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="useBudget" type="number" toggle :disabled="!form.CustomerId || form.CustomerId === 0" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input type="text" v-model="form.BudgetAmount" :readonly="insertReadonly.BudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetConsumption" :error="$v.form.BudgetConsumption">
              <b-form-input type="text" v-model="form.BudgetConsumption" :readonly="insertReadonly.BudgetConsumption" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
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
    ...mapState(['customers', 'discountReasons', 'currencies'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountReason/Search', name: 'discountReasons'})
      this.getData().then(() => {
        this.setModel()
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
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
          me.$api.get('Budget', `Budget/GetCustomerBudget?customerId=${this.form.CustomerId}`).then((res) => {
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
          me.$api.get('Budget', `Budget/GetCustomerBudget?customerId=${this.form.CustomerId}`).then((res) => {
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
