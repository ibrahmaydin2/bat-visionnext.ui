<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'BankTransaction' }">
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
          <NextFormGroup item-key="Code" :error="$v.form.Code" md="3" lg="3">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="3" lg="3">
            <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="BankId" :error="$v.form.BankId" md="3" lg="3">
              <NextDropdown
                v-model="bank"
                @input="getBranchs($event, 'BankId', 'bankBranch', 'bankBranches')"
                url="VisionNextBank/api/Bank/AutoCompleteSearch" searchable
                :disabled="insertReadonly.BankId"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankBranchId" :error="$v.form.BankBranchId" md="3" lg="3">
              <NextDropdown
                v-model="bankBranch"
                @input="selectedSearchType('BankBranchId', $event)"
                :source="bankBranches"
                :disabled="insertReadonly.BankBranchId"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankAccountNumber" :error="$v.form.BankAccountNumber" md="3" lg="3">
              <NextInput v-model="form.BankAccountNumber" type="text" :disabled="insertReadonly.BankAccountNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
              <NextDropdown
                v-model="customer"
                @input="selectedSearchType('CustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                :disabled="insertReadonly.CustomerId"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerBankId" :error="$v.form.CustomerBankId" md="3" lg="3">
              <NextDropdown
                v-model="customerBank"
                @input="getBranchs($event, 'CustomerBankId', 'customerBankBranch', 'customerBankBranches')"
                url="VisionNextBank/api/Bank/AutoCompleteSearch" searchable
                :disabled="insertReadonly.CustomerBankId"/>
            </NextFormGroup>
             <NextFormGroup item-key="CustomerBankBranchId" :error="$v.form.CustomerBankBranchId" md="3" lg="3">
              <NextDropdown
                v-model="customerBankBranch"
                @input="selectedSearchType('CustomerBankBranchId', $event)"
                :source="customerBankBranches"
                :disabled="insertReadonly.CustomerBankBranchId"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerBankAccountNumber" :error="$v.form.CustomerBankAccountNumber" md="3" lg="3">
              <NextInput v-model="form.CustomerBankAccountNumber" type="text" :disabled="insertReadonly.CustomerBankAccountNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="3" lg="3">
              <NextInput v-model="form.DocumentNumber" type="text" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="3" lg="3">
              <NextDropdown
                v-model="currency"
                @input="selectedSearchType('CurrencyId', $event)"
                url="VisionNextSystem/api/SysCurrency/Search"
                :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTypeId" :error="$v.form.TransactionTypeId" md="3" lg="3">
              <NextDropdown
                v-model="transactionType"
                @input="selectedSearchType('TransactionTypeId', $event)"
                url="VisionNextBank/api/BankTransactionType/Search"
                :disabled="insertReadonly.TransactionTypeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTotal" :error="$v.form.TransactionTotal" md="3" lg="3">
              <NextInput v-model="form.TransactionTotal" type="number" @keypress="onlyForCurrency($event)" min=1 :disabled="insertReadonly.TransactionTotal" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/update'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        StatusId: null,
        Code: null,
        CustomerId: null,
        DocumentDate: null,
        DocumentNumber: null,
        CurrencyId: null,
        TransactionTypeId: null,
        TransactionTotal: null,
        BankId: null,
        BankAccountNumber: null,
        BankBranchId: null,
        CustomerBankId: null,
        CustomerBankBranchId: null,
        CustomerBankAccountNumber: null,
        Description1: null,
        SystemCurrencyRate: 0,
        CurrencyTransactionTotal: 0,
        CurrencyRate: 0,
        DocumentCreationTypeId: null
      },
      routeName1: 'Bank',
      bankBranch: null,
      customerBankBranch: null,
      bankBranches: [],
      customerBankBranches: [],
      bank: null,
      customer: null,
      customerBank: null,
      currency: null,
      transactionType: null
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    getBranchs (model, label, modelKey, ListKey) {
      this[modelKey] = null
      this[ListKey] = []

      if (model) {
        this.form[label] = model.RecordId
        this.$api.postByUrl({RecordId: model.RecordId}, 'VisionNextBank/api/Bank/Get').then(res => {
          this[ListKey] = res.Model ? res.Model.BankBranches : []
        })
      } else {
        this.form[label] = null
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData

      this.bank = this.convertLookupValueToSearchValue(rowData.Bank)
      this.bankBranch = this.convertLookupValueToSearchValue(rowData.BankBranch)
      this.customer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.customerBank = this.convertLookupValueToSearchValue(rowData.CustomerBank)
      this.customerBankBranch = this.convertLookupValueToSearchValue(rowData.CustomerBankBranch)
      this.currency = this.convertLookupValueToSearchValue(rowData.Currency)
      this.transactionType = this.convertLookupValueToSearchValue(rowData.TransactionType)

      if (rowData.StatusId === null) {
        this.form.StatusId = 1
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.TransactionTotal = parseFloat(this.form.TransactionTotal)
        this.form.CurrencyTransactionTotal = this.form.TransactionTotal

        this.updateData()
      }
    }
  }
}
</script>
