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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.DocumentDate != null ? insertVisible.DocumentDate : developmentMode" :start-weekday="1" cols="12" md="3">
            <b-form-group :label="insertTitle.DocumentDate + (insertRequired.DocumentDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DocumentDate.$error }">
              <b-form-datepicker v-model="form.DocumentDate" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select v-model="CustomerId" :options="customers" @search="onCustomerSearch" @input="selectedSearchType('CustomerId', $event)" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 1 ? $t('insert.active'): $t('insert.passive'))}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DocumentNumber != null ? insertVisible.DocumentNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.DocumentNumber + (insertRequired.DocumentNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DocumentNumber.$error }">
                <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrencyId != null ? insertVisible.CurrencyId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CurrencyId + (insertRequired.CurrencyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrencyId.$error }">
                <v-select v-model="Currency" :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TransactionTypeId != null ? insertVisible.TransactionTypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.TransactionTypeId + (insertRequired.TransactionTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TransactionTypeId.$error }">
                <v-select v-model="transactionType" :options="transactionTypes" @input="selectedSearchType('TransactionTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TransactionTotal != null ? insertVisible.TransactionTotal : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.TransactionTotal + (insertRequired.TransactionTotal === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TransactionTotal.$error }">
                <b-form-input type="number" v-model="form.TransactionTotal" :readonly="insertReadonly.TransactionTotal" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BankId != null ? insertVisible.BankId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.BankId + (insertRequired.BankId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BankId.$error }">
                <v-select v-model="BankId" :options="banks" @search="onBankSearch" @input="selectedSearchType('BankId', $event)" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BankAccountNumber != null ? insertVisible.BankAccountNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.BankAccountNumber + (insertRequired.BankAccountNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BankAccountNumber.$error }">
                <b-form-input type="text" v-model="form.BankAccountNumber" :readonly="insertReadonly.BankAccountNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BankBranchId != null ? insertVisible.BankBranchId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.BankBranchId + (insertRequired.BankBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BankBranchId.$error }">
                <v-select v-model="BankBranchId" :options="bankBranches" @input="selectedSearchType('BankBranchId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerBankId != null ? insertVisible.CustomerBankId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerBankId + (insertRequired.CustomerBankId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerBankId.$error }">
                <v-select v-model="CustomerBankId" :options="customerBanks" @search="onCustomerBankSearch" @input="selectedSearchType('CustomerBankId', $event)" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerBankBranchId != null ? insertVisible.CustomerBankBranchId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerBankBranchId + (insertRequired.CustomerBankBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerBankBranchId.$error }">
                <v-select v-model="CustomerBankBranchId" :options="customerBankBranches" @input="selectedSearchType('CustomerBankBranchId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerBankAccountNumber != null ? insertVisible.CustomerBankAccountNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerBankAccountNumber + (insertRequired.CustomerBankAccountNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerBankAccountNumber.$error }">
                <b-form-input type="text" v-model="form.CustomerBankAccountNumber" :readonly="insertReadonly.CustomerBankAccountNumber" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
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
      routeName: this.$route.meta.baseLink,
      bankBranches: [],
      customerBankBranches: [],
      CustomerId: null,
      Currency: null,
      transactionType: null,
      BankId: null,
      BankBranchId: null,
      CustomerBankId: null,
      CustomerBankBranchId: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'rowData', 'customers', 'currencies', 'transactionTypes', 'banks', 'bankItems', 'customerBanks', 'customerBankItems'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getData', {...this.query, api: `VisionNextBank/api/${e}`, record: this.$route.params.url})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBank/api/BankTransactionType/Search', name: 'transactionTypes'})
    },
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
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchCustomer(loading, search, this)
      }
    },
    onBankSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchBank(loading, search, this)
      }
    },
    onCustomerBankSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchCustomerBank(loading, search, this)
      }
    },
    searchCustomer (loading, search, vm) {
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
    searchBank (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextBank/api/Bank/AutoCompleteSearch',
        name: 'banks',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    searchCustomerBank (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextBank/api/Bank/AutoCompleteSearch',
        name: 'customerBanks',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
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
        this.form.DocumentDate = this.dateConvertToISo(this.form.DocumentDate)
        this.form.CurrencyTransactionTotal = this.form.TransactionTotal
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextBank/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        this.form = {
          StatusId: e.StatusId,
          Code: e.Code,
          CustomerId: e.CustomerId,
          DocumentDate: this.dateConvertToISo(e.DocumentDate),
          DocumentNumber: e.DocumentNumber,
          CurrencyId: e.CurrencyId,
          TransactionTypeId: e.TransactionTypeId,
          TransactionTotal: e.TransactionTotal,
          BankId: e.BankId,
          BankAccountNumber: e.BankAccountNumber,
          BankBranchId: e.BankBranchId,
          CustomerBankId: e.CustomerBankId,
          CustomerBankBranchId: e.CustomerBankBranchId,
          CustomerBankAccountNumber: e.CustomerBankAccountNumber,
          Description1: e.Description1,
          SystemCurrencyRate: e.SystemCurrencyRate,
          CurrencyTransactionTotal: e.CurrencyTransactionTotal,
          CurrencyRate: e.CurrencyRate,
          DocumentCreationTypeId: e.DocumentCreationTypeId,
          RecordId: e.RecordId,
          Deleted: e.Deleted
        }
        if (e.Customer) {
          const andConditionModel = {
            RecordIds: [e.Customer.DecimalValue]
          }
          this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', andConditionModel).then(() => {
            this.CustomerId = e.Customer.Label
          })
        }
        if (e.Bank) {
          const andConditionModel = {
            RecordIds: [e.Bank.DecimalValue]
          }
          this.searchItemsByModel('VisionNextBank/api/Bank/Search', 'banks', andConditionModel).then(() => {
            this.BankId = e.Bank.Label
            if (e.BankBranch) {
              this.$store.dispatch('getAllData', {...this.query, api: 'VisionNextBank/api/Bank/Get', record: e.Bank.DecimalValue, name: 'bankItems'}).then(() => {
                this.BankBranchId = e.BankBranch.Label
              })
            }
          })
        }
        if (e.CustomerBank) {
          const andConditionModel = {
            RecordIds: [e.CustomerBank.DecimalValue]
          }
          this.searchItemsByModel('VisionNextBank/api/Bank/Search', 'customerBanks', andConditionModel).then(() => {
            this.CustomerBankId = e.CustomerBank.Label
            if (e.CustomerBankBranch) {
              this.$store.dispatch('getAllData', {...this.query, api: 'VisionNextBank/api/Bank/Get', record: e.CustomerBank.DecimalValue, name: 'customerBankItems'}).then(() => {
                this.CustomerBankBranchId = e.CustomerBankBranch.Label
              })
            }
          })
        }
        if (e.Currency) {
          this.Currency = e.Currency.Label
        }
        if (e.TransactionType) {
          this.transactionType = e.TransactionType.Label
        }
      }
    },
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
<style lang="sass">
</style>
