<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'EFTHavale2' }">
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
                @input="selectedSearchType('CustomerId', $event); setCustomer($event);"
                :disabled="insertReadonly.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="customer"
                :searchable="true" :custom-option="true"
                :dynamic-and-condition="{ StatusIds: [1] }"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
              <NextInput v-model="form.DocumentNumber" type="text" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :start-weekday="1" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
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
                or-condition-fields="Code,Description1,CommercialTitle,Name,Surname"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                v-model="route"
                or-condition-fields="Code,Description1,CommercialTitle"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="500"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CashCardTypeId" :error="$v.form.CashCardTypeId">
              <NextDropdown
                @input="selectedSearchType('CashCardTypeId', $event)"
                :disabled="!customerRecordTypeId || insertReadonly.CashCardTypeId"
                :source="cashcardTypes"
                v-model="cashCardType"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditcard.reminder')">
              <NextInput v-model="customer.CreditAccountRemainder" type="number" :disabled="true" />
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
      customer: {
        CreditAccountRemainder: null
      },
      currency: {},
      representative: {},
      route: {},
      cashCardType: {},
      routeName1: 'Finance',
      routeName2: 'CashCard',
      customerRecordTypeId: null,
      cashcardTypes: []
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
        this.form.DocumentDate = this.getDateWithoutTime(this.form.DocumentDate)
        this.updateData()
      }
    },
    setCustomer (customer) {
      if (customer) {
        this.customerReminder = customer.Remainder
        this.customerRecordTypeId = customer.RecordTypeId

        let model = {
          andConditionModel: {
            customerRecordTypeId: this.customerRecordTypeId
          }
        }

        this.$api.postByUrl(model, 'VisionNextFinance/api/CashCardType/Search').then(res => {
          if (res.ListModel) {
            this.cashcardTypes = res.ListModel.BaseModels
          }
        })
      } else {
        this.customerReminder = 0
        this.customerRecordTypeId = null
        this.CashCardType = null
        this.form.CashCardTypeId = null
      }
    }
  }

}
</script>
<style lang="sass">
</style>
