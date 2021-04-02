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
          <NextFormGroup item-key="Status" :error="$v.form.Status">
            <NextCheckBox v-model="form.Status" type="number" toggle />
          </NextFormGroup>
          <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
            <b-form-checkbox v-model="form.UseBudget" name="check-button" @input="useBudgetEvent($event)" switch>
              {{(form.UseBudget) ? $t('insert.active'): $t('insert.passive')}}
            </b-form-checkbox>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.PriceDiscountTransaction.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="TciBreak1" :error="$v.form.TciBreak1">
              <v-select
                :options="lookup.TCI_BREAKDOWN"
                @input="selectedType('TciBreak1', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="Customer" :error="$v.form.Customer">
              <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
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
            <NextFormGroup item-key="DiscountReason" :error="$v.form.DiscountReason">
              <v-select :options="discountReasons" @input="selectedSearchType('DiscountReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PriceDiscountAmount" :error="$v.form.PriceDiscountAmount">
              <b-form-input type="text" v-model="form.PriceDiscountAmount" :readonly="insertReadonly.PriceDiscountAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="Currency" :error="$v.form.Currency">
              <v-select :options="currencies" v-model="currencyLabel" @input="selectedSearchType('CurrencyId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <!-- <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input disabled type="text" v-model="form.BudgetAmount" :readonly="insertReadonly.BudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetConsumption" :error="$v.form.BudgetConsumption">
              <b-form-input disabled type="text" v-model="form.BudgetConsumption" :readonly="insertReadonly.BudgetConsumption" />
            </NextFormGroup> -->
            <NextFormGroup item-key="Budget" :error="$v.form.Budget">
              <v-select :options="budgets" @input="selectedSearchType('CurrencyId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveState" :error="$v.form.ApproveState">
              <v-select
                :options="lookup.APPROVE_STATE"
                @input="selectedType('ApproveState', $event)"
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
            <NextFormGroup item-key="GainType" :error="$v.form.GainType">
              <v-select
                :options="lookup.GAIN_TYPE"
                @input="selectedType('GainType', $event)"
                label="Label"
              />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        RecordId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        TransactionDate: null,
        TransactionTime: null,
        DiscountReasonId: null,
        PriceDiscountAmount: null,
        CurrencyId: 1,
        UseBudget: 0,
        BudgetAmount: 0,
        BudgetConsumption: 0,
        BudgetId: null,
        ApproveStateId: 2102,
        ErpCode: null,
        ExpirationDate: null,
        BeginDate: null,
        Genexp1: null,
        GainTypeId: null,
        TciBreak1Id: null
      },
      currencyLabel: null,
      routeName1: 'Discount'
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['customers', 'discountReasons', 'currencies', 'budgets', 'gainTypes'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountReason/Search', name: 'discountReasons'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBudget/api/Budget/GetCustomerBudget', name: 'budgets'})
      let currentDate = new Date()
      this.form.TransactionDate = currentDate.toISOString().slice(0, 10)
      this.form.ExpirationDate = currentDate.toISOString().slice(0, 10)
      this.form.BeginDate = currentDate.toISOString().slice(0, 10)
      this.form.TransactionTime = currentDate.toLocaleTimeString()
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label === 'CustomerId') {
          console.log(model)
        }
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
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
    useBudgetEvent (e) {
      if (e === true) {
        this.form.UseBudget = 1
        this.form.ApproveStateId = 2100
      } else {
        this.form.UseBudget = 0
        this.form.ApproveStateId = 2102
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
        this.form.BudgetAmount = this.form.PriceDiscountAmount
        this.createData()
        // update işlemiyse
        // this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules
    }
  },
  watch: {
    currencies (e) {
      if (e) {
        this.currencyLabel = e[0].Description1
      }
    }
  }
}
</script>
