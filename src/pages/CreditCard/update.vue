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
        <b-tab :title="$t('insert.creditcard.CreditCard')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select v-model="customerLabel" label="Description1" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedSearchType('CustomerId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 1 ? $t('insert.active'): $t('insert.passive'))}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveNumber != null ? insertVisible.ApproveNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ApproveNumber + (insertRequired.ApproveNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ApproveNumber.$error }">
                <b-form-input type="text" v-model="form.ApproveNumber" :readonly="insertReadonly.ApproveNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DocumentNumber != null ? insertVisible.DocumentNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.DocumentNumber + (insertRequired.DocumentNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DocumentNumber.$error }">
                <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DocumentDate != null ? insertVisible.DocumentDate : developmentMode" :start-weekday="1" cols="12" md="3">
              <b-form-group :label="insertTitle.DocumentDate + (insertRequired.DocumentDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DocumentDate.$error }">
                <b-form-datepicker v-model="form.DocumentDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BankId != null ? insertVisible.BankId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.BankId + (insertRequired.BankId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BankId.$error }">
                <v-select v-model="bankLabel" label="Description1" :filterable="false" :options="banks" @search="onBankSearch" @input="selectedSearchType('BankId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CreditCardTotal != null ? insertVisible.CreditCardTotal : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CreditCardTotal + (insertRequired.CreditCardTotal === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditCardTotal.$error }">
                <b-form-input type="text" v-model="form.CreditCardTotal" :readonly="insertReadonly.CreditCardTotal" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrencyId != null ? insertVisible.CurrencyId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CurrencyId + (insertRequired.CurrencyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrencyId.$error }">
                <v-select v-model="currencyLabel" :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CardNumber != null ? insertVisible.CardNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CardNumber + (insertRequired.CardNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardNumber.$error }">
                <b-form-input type="text" v-model="form.CardNumber" :readonly="insertReadonly.CardNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select v-model="representativeLabel" label="Description1" :filterable="false" :options="representatives" @search="onRepresentativeSearch" @input="selectedSearchType('RepresentativeId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RouteId != null ? insertVisible.RouteId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RouteId + (insertRequired.RouteId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteId.$error }">
                <v-select v-model="routeLabel" label="Description1" :filterable="false" :options="routes" @search="onRouteSearch" @input="selectedSearchType('RouteId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="$t('insert.creditcard.reminder')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="customerReminder" :disabled="true"/>
              </b-form-group>
            </b-col>
          </b-row>
          {{selectedCustomer}}
        </b-tab>
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <b-col>
              <code>{{form}}</code>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <h3>Form Elements</h3>
              <p>
                {{insertFormdata}}
              </p>
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
        Deleted: null,
        System: null,
        RecordState: null,
        StatusId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        ApproveNumber: null,
        DocumentNumber: null,
        DocumentDate: null,
        BankId: null,
        CreditCardTotal: null,
        CurrencyId: null,
        CardNumber: null,
        RepresentativeId: null,
        RouteId: null,
        IsBatcardTransaction: null,
        SystemCurrencyRate: null
      },
      customerReminder: null,
      routeName: this.$route.meta.baseLink,
      customerLabel: null,
      bankLabel: null,
      currencyLabel: null,
      representativeLabel: null,
      routeLabel: null,
      cashCardTypeLabel: null,
      selectedCustomer: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'customers', 'currencies', 'banks', 'representatives', 'routes', 'rowData'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getData', {...this.query, api: `VisionNextFinance/api/${e}`, record: this.$route.params.url})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'CustomerId') {
          this.customerReminder = model.Remainder
        }
      } else {
        this.form[label] = null
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
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchCustomer(loading, search, this)
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
    onBankSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchBank(loading, search, this)
      }
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
    onRepresentativeSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchRepresentative(loading, search, this)
      }
    },
    searchRepresentative (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
        name: 'representatives',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    onRouteSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchRoute(loading, search, this)
      }
    },
    searchRoute (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextRoute/api/Route/AutoCompleteSearch',
        name: 'routes',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextFinance/api/CreditCard`, formdata: model, return: this.$route.meta.baseLink})
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    rowData: function (e) {
      if (!e) {
        return
      }
      this.form = e
      if (e.Customer) {
        this.customerLabel = e.Customer.Label
        this.$api.post({RecordId: e.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
          this.customerReminder = res.Model.Remainder
        })
      }
      if (e.Bank) {
        this.bankLabel = e.Bank.Label
      }
      if (e.Currency) {
        this.currencyLabel = e.Currency.Label
      }
      if (e.Representative) {
        this.representativeLabel = e.Representative.Label
      }
      if (e.Route) {
        this.routeLabel = e.Route.Label
      }
    }
  }
}
</script>
<style lang="sass">
</style>
