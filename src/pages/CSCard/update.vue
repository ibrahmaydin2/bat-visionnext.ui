<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'CSCard' }">
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
        <b-tab :title="$t('get.CsCard.CsCard')" :active="!developmentMode">
          <b-row>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <NextDropdown
                  @input="selectedSearchType('CustomerId', $event)"
                  url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                  :searchable="true" :custom-option="true"
                  v-model="customer"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  :is-customer="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
                <NextInput v-model="form.DocumentNumber" type="text" :disabled="insertReadonly.DocumentNumber" />
              </NextFormGroup>
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate">
                <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate">
                <NextDatePicker v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
              </NextFormGroup>
              <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber">
                <NextInput v-model="form.SerialNumber" type="text" :disabled="insertReadonly.SerialNumber" />
              </NextFormGroup>
              <NextFormGroup item-key="Owner" :error="$v.form.Owner">
                <NextInput type="text" v-model="form.Owner" :readonly="insertReadonly.Owner" />
              </NextFormGroup>
              <NextFormGroup item-key="PayCity" :error="$v.form.PayCity">
                <NextDropdown v-model="payCity" :disabled="insertReadonly.PayCity" lookup-key="CITY" label="Label" @input="selectedType('PayCity', $event)"/>
              </NextFormGroup>
              <NextFormGroup item-key="BankId" :error="$v.form.BankId">
                <NextDropdown
                  @input="selectedSearchType('BankId', $event)"
                  :disabled="insertReadonly.BankId"
                  v-model="bank"
                  url="VisionNextBank/api/Bank/AutoCompleteSearch"
                  label="Description1"
                  />
              </NextFormGroup>
              <NextFormGroup item-key="CorrespondentBranchId" :error="$v.form.CorrespondentBranchId">
                <NextDropdown v-model="branch" :source="branchs" :disabled="!branchsValid" label="Description1" @input="selectedSearchType('CorrespondentBranchId', $event)"/>
              </NextFormGroup>
              <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
                <NextDropdown v-model="currency" :disabled="insertReadonly.CurrencyId" @input="selectedSearchType('CurrencyId', $event)" :source="currencies" />
              </NextFormGroup>
              <NextFormGroup item-key="CsTotal" :error="$v.form.CsTotal">
                  <NextInput type="number" v-model="form.CsTotal" :readonly="insertReadonly.CsTotal" />
              </NextFormGroup>
              <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
                <NextDropdown
                  @input="selectedSearchType('RepresentativeId', $event)"
                  :disabled="insertReadonly.RepresentativeId"
                  url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                  label="Description1"
                  v-model="representative"
                  :searchable="true" :custom-option="true"
                  or-condition-fields="Code,Description1,CommercialTitle,Name,Surname"
                  :is-customer="true"
                  />
              </NextFormGroup>
              <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
                <NextDropdown
                  @input="selectedSearchType('RouteId', $event)"
                  :disabled="insertReadonly.RouteId"
                  v-model="route"
                  url="VisionNextRoute/api/Route/AutoCompleteSearch"
                  :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                  :dynamic-and-condition="{ StatusIds: [1] }"
                  :page-count="500"
                  />
              </NextFormGroup>
              <NextFormGroup :title="$t('insert.creditcard.reminder')">
                  <NextInput type="text" v-model="customerReminder" :disabled="true" />
              </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: null,
        System: null,
        RecorState: null,
        StatusId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        DocumentNumber: null,
        DocumentDate: null,
        TransactionTypeId: null,
        DueDate: null,
        SerialNumber: null,
        Owner: null,
        PayCity: null,
        BankId: null,
        CorrespondentBranchId: null,
        CurrencyId: null,
        CsTotal: null,
        RepresentativeId: null,
        RouteId: null,
        CurrencyRate: null,
        SystemCurrencyRate: null,
        DocumentCreationTypeId: null,
        CurrencyCsTotal: null,
        CorrespondentBranch: null
      },
      customerReminder: null,
      branchs: [],
      branchsValid: false,
      customer: null,
      currency: null,
      representative: null,
      route: null,
      bank: null,
      payCity: null,
      branch: null,
      routeName1: 'Finance',
      currencies: []
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
    this.getInsertPage()
    this.getCurrencies()
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: 'CSCard'})
    },
    getCurrencies () {
      this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
          this.currency = response.ListModel.BaseModels[0]
          this.form.CurrencyId = this.currency.RecordId
        }
      })
    },
    getCode () {
      this.$api.postByUrl({}, `VisionNextFinance/api/CsCard/GetCode`).then(response => {
        if (response.Model) {
          this.form.Code = response.Model.Code
        }
      })
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'BankId') {
          this.branchs = []
          this.$api.post({RecordId: model.RecordId}, 'Bank', 'Bank/Get').then((res) => {
            this.branchsValid = true
            this.branchs = res.Model.BankBranches
          })
        }
        if (label === 'CustomerId') {
          this.customerReminder = model.Remainder
        }
      } else {
        this.form[label] = null
        if (label === 'BankId') {
          this.branchsValid = false
          this.branch = null
          this.branchs = []
        }
        if (label === 'CustomerId') {
          this.customerReminder = null
        }
      }
    },
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.CurrencyCsTotal = this.form.CsTotal
        this.form.DocumentDate = this.getDateWithoutTime(this.form.DocumentDate)
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e.Customer) {
        this.customer = this.convertLookupValueToSearchValue(e.Customer)
        this.$api.post({RecordId: e.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
          this.customerReminder = res.Model.Remainder
        })
      }
      if (e.Bank) {
        this.bank = this.convertLookupValueToSearchValue(e.Bank)
        this.branchs = []
        this.$api.post({RecordId: e.Bank.DecimalValue}, 'Bank', 'Bank/Get').then((res) => {
          this.branchsValid = true
          this.branchs = res.Model.BankBranches
        })
      }
      this.currency = this.convertLookupValueToSearchValue(e.Currency)
      this.representative = this.convertLookupValueToSearchValue(e.Representative)
      this.route = this.convertLookupValueToSearchValue(e.Route)
      this.branch = this.convertLookupValueToSearchValue(e.BankBranch)
      this.form = e
      this.form.CsTotal = this.form.CurrencyCsTotal
      if (e.PayCity && this.lookup.CITY) {
        let tmpArr = this.lookup.CITY.filter(i => i.Value === e.PayCity)
        this.payCity = tmpArr[0].Label
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  }
}
</script>
<style lang="sass">
</style>
