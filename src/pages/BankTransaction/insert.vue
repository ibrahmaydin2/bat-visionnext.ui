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
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="BankId" :error="$v.form.BankId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('BankId', $event)" url="VisionNextBank/api/Bank/AutoCompleteSearch" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="BankBranchId" :error="$v.form.BankBranchId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('BankBranchId', $event)" :source="bankBranches"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankAccountNumber" :error="$v.form.BankAccountNumber" md="3" lg="3">
              <NextInput v-model="form.BankAccountNumber" type="text" :disabled="insertReadonly.BankAccountNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerBankId" :error="$v.form.CustomerBankId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('CustomerBankId', $event)" url="VisionNextBank/api/Bank/AutoCompleteSearch" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerBankBranchId" :error="$v.form.CustomerBankBranchId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('CustomerBankBranchId', $event)" :source="customerBankBranches"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerBankAccountNumber" :error="$v.form.CustomerBankAccountNumber" md="3" lg="3">
              <NextInput v-model="form.CustomerBankAccountNumber" type="text" :disabled="insertReadonly.CustomerBankAccountNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="3" lg="3">
              <NextInput v-model="form.DocumentNumber" type="text" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('CurrencyId', $event)" url="VisionNextSystem/api/SysCurrency/Search"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTypeId" :error="$v.form.TransactionTypeId" md="3" lg="3">
              <NextDropdown @input="selectedSearchType('TransactionTypeId', $event)" url="VisionNextBank/api/BankTransactionType/Search"/>
            </NextFormGroup>
            <NextFormGroup item-key="TransactionTotal" :error="$v.form.TransactionTotal" md="3" lg="3">
              <NextInput v-model="form.TransactionTotal" type="text" :disabled="insertReadonly.TransactionTotal" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/insert'
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
        DocumentCreationTypeId: 621
      },
      routeName1: 'Bank',
      bankBranches: [],
      customerBankBranches: []
    }
  },
  mounted () {
    this.createManualCode()
  },
  computed: {
    ...mapState(['bankItems', 'customerBankItems'])
  },
  methods: {
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'BankId') {
          this.$store.dispatch('getAllData', {...this.query, api: 'VisionNextBank/api/Bank/Get', record: model.RecordId, name: 'bankItems'})
        } else if (label === 'CustomerBankId') {
          this.$store.dispatch('getAllData', {...this.query, api: 'VisionNextBank/api/Bank/Get', record: model.RecordId, name: 'customerBankItems'})
        }
      } else {
        this.form[label] = null
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.DocumentDate = this.form.DocumentDate
        this.form.CurrencyTransactionTotal = this.form.TransactionTotal
        this.createData()
      }
    }
  },
  watch: {
    bankItems (e) {
      if (e) {
        this.bankBranches = e.BankBranches
      }
    },
    customerBankItems (e) {
      if (e) {
        this.customerBankBranches = e.BankBranches
      }
    }
  }
}
</script>
