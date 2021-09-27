<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.cashcard.CashCard')" active>
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                :disabled="insertReadonly.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="customer"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
              <NextInput v-model="form.DocumentNumber" type="number" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :start-weekday="1" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyRate" :error="$v.form.CurrencyRate">
              <NextInput v-model="Customer.CurrencyRate" type="number" :disabled="insertReadonly.CurrencyRate" />
            </NextFormGroup>
            <NextFormGroup item-key="SystemCurrencyRate" :error="$v.form.SystemCurrencyRate">
              <NextInput v-model="Customer.SystemCurrencyRate" type="number" :disabled="insertReadonly.SystemCurrencyRate" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentDate" :start-weekday="1" :error="$v.form.PaymentDate">
              <NextDatePicker v-model="form.PaymentDate" :disabled="insertReadonly.PaymentDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CashTotal" :error="$v.form.CashTotal">
              <NextInput v-model="form.CashTotal" type="number" :disabled="insertReadonly.CashTotal" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown
                @input="selectedSearchType('CurrencyId', $event)"
                :disabled="insertReadonly.CurrencyId"
                url="VisionNextSystem/api/SysCurrency/Search"
                v-model="currency"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                v-model="representative"
                label="Description1"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                v-model="route"
                label="Description1"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CashCardTypeId" :error="$v.form.CashCardTypeId">
              <NextDropdown
                @input="selectedSearchType('CashCardTypeId', $event)"
                :disabled="insertReadonly.CashCardTypeId"
                url="VisionNextFinance/api/CashCardType/Search"
                v-model="cashCardType"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditcard.reminder')">
              <NextInput v-model="customerReminder" type="number" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="IsManuelClosure" :error="$v.form.IsManuelClosure" md="3">
              <NextCheckBox v-model="form.IsManuelClosure" :disabled="insertReadonly.IsManuelClosure" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: null,
        System: null,
        RecordState: null,
        StatusId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        DocumentNumber: null,
        DocumentDate: null,
        PaymentDate: null,
        CashTotal: null,
        CurrencyId: null,
        RepresentativeId: null,
        RouteId: null,
        CashCardTypeId: null,
        SystemCurrencyRate: null
      },
      customerReminder: null,
      routeName: this.$route.meta.baseLink,
      customerLabel: null,
      currencyLabel: null,
      representativeLabel: null,
      routeLabel: null,
      cashCardTypeLabel: null,
      customer: {},
      currency: {},
      representative: {},
      route: {},
      cashCardType: {}
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.customer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.currency = this.convertLookupValueToSearchValue(rowData.Currency)
      this.representative = this.convertLookupValueToSearchValue(rowData.Representative)
      this.route = this.convertLookupValueToSearchValue(rowData.Route)
      this.cashCardType = this.convertLookupValueToSearchValue(rowData.CashCardType)
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.updateData()
      }
    }
  }

}
</script>
<style lang="sass">
</style>
