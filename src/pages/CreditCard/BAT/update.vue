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
        <b-tab :title="$t('insert.creditcard.CreditCard')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                :disabled="insertReadonly.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="Customer"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveNumber" :error="$v.form.ApproveNumber">
              <NextInput v-model="form.ApproveNumber" type="number" :disabled="insertReadonly.ApproveNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
              <NextInput v-model="form.DocumentNumber" type="number" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :start-weekday="1" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
            </NextFormGroup>
            <NextFormGroup item-key="BankId" :error="$v.form.BankId">
              <NextDropdown
                @input="selectedSearchType('BankId', $event)"
                :disabled="insertReadonly.BankId"
                url="VisionNextBank/api/Bank/AutoCompleteSearch"
                v-model="Bank"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CreditCardTotal" :error="$v.form.CreditCardTotal">
              <NextInput v-model="form.CreditCardTotal" type="number" :disabled="insertReadonly.CreditCardTotal" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown
                @input="selectedSearchType('CurrencyId', $event)"
                :disabled="insertReadonly.CurrencyId"
                url="VisionNextSystem/api/SysCurrency/Search"
                v-model="Currency"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CardNumber" :error="$v.form.CardNumber">
              <NextInput v-model="form.CardNumber" type="number" :disabled="insertReadonly.CardNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"
                orConditionFields="Code,Description1,Name,Surname"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                v-model="Representative"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="500"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                v-model="Route"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="500"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextInput v-model="form.CustomerId" type="number" :disabled="insertReadonly.CustomerId" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditcard.reminder')">
              <NextInput v-model="customer.CreditAccountRemainder" type="number" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="CardNumber" :error="$v.form.CardNumber">
              <NextInput v-model="form.CardNumber" type="number" :disabled="insertReadonly.CardNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="IsBatcardTransaction" :error="$v.form.IsBatcardTransaction" md="3">
              <NextCheckBox v-model="form.IsBatcardTransaction" :disabled="insertReadonly.IsBatcardTransaction" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        CustomerId: null,
        ApproveNumber: null,
        DocumentNumber: null,
        DocumentDate: new Date(),
        BankId: null,
        CreditCardTotal: null,
        CurrencyId: null,
        CardNumber: null,
        RepresentativeId: null,
        RouteId: null,
        IsBatcardTransaction: 0,
        SystemCurrencyRate: 0,
        IsManuelClosure: 0
      },
      customerReminder: null,
      routeName1: 'Finance',
      customerLabel: null,
      bankLabel: null,
      currencyLabel: null,
      representativeLabel: null,
      routeLabel: null,
      cashCardTypeLabel: null,
      selectedCustomer: null,
      customer: {
        CreditAccountRemainder: null
      },
      bank: {},
      currency: {},
      representative: {},
      route: {}
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.customer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.bank = this.convertLookupValueToSearchValue(rowData.Bank)
      this.currency = this.convertLookupValueToSearchValue(rowData.Currency)
      this.representative = this.convertLookupValueToSearchValue(rowData.Representative)
      this.route = this.convertLookupValueToSearchValue(rowData.Route)
      if (this.customer) {
        this.$api.post({RecordId: this.customer.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          this.customerReminder = res.Model.Remainder
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.DocumentDate = this.dateConvertToISo(this.form.DocumentDate).substr(0, 10)
        this.updateData()
      }
    }
  }
}
</script>
<style lang="sass">
</style>
