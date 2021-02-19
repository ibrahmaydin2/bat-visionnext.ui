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
        <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select label="Description1" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedSearchType('CustomerId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
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
            <b-col v-if="insertVisible.CsTypeId != null ? insertVisible.CsTypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CsTypeId + (insertRequired.CsTypeId === true ? ' *' : '')" >
                <v-select :options="csTypes" @input="selectedSearchType('CsTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DueDate != null ? insertVisible.DueDate : developmentMode" :start-weekday="1" cols="12" md="3">
              <b-form-group :label="insertTitle.DueDate + (insertRequired.DueDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DueDate.$error }">
                <b-form-datepicker v-model="form.DueDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SerialNumber != null ? insertVisible.SerialNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.SerialNumber + (insertRequired.SerialNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SerialNumber.$error }">
                <b-form-input type="text" v-model="form.SerialNumber" :readonly="insertReadonly.SerialNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Owner != null ? insertVisible.Owner : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Owner + (insertRequired.Owner === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Owner.$error }">
                <b-form-input type="text" v-model="form.Owner" :readonly="insertReadonly.Owner" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PayCity != null ? insertVisible.PayCity : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.PayCity + (insertRequired.PayCity === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PayCity.$error }">
                <v-select :options="lookup.CITY" @input="selectedType('PayCity', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BankId != null ? insertVisible.BankId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.BankId + (insertRequired.BankId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BankId.$error }">
                <v-select label="Description1" :filterable="false" :options="banks" @search="onBankSearch" @input="selectedSearchType('BankId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CorrespondentBranchId != null ? insertVisible.CorrespondentBranchId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CorrespondentBranchId + (insertRequired.CorrespondentBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CorrespondentBranchId.$error }">
                <v-select :disabled="!branchsValid" :options="branchs" v-model="branchs.Description1" @input="selectedSearchType('CorrespondentBranchId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrencyId != null ? insertVisible.CurrencyId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CurrencyId + (insertRequired.CurrencyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrencyId.$error }">
                <v-select :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CsTotal != null ? insertVisible.CsTotal : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CsTotal + (insertRequired.CsTotal === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CsTotal.$error }">
                <b-form-input type="number" v-model="form.CsTotal" :readonly="insertReadonly.CsTotal" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select label="Description1" :filterable="false" :options="representatives" @search="onRepresentativeSearch" @input="selectedSearchType('RepresentativeId', $event)" >
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
                <v-select label="Description1" :filterable="false" :options="routes" @search="onRouteSearch" @input="selectedSearchType('RouteId', $event)" >
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
              <b-form-group :label="$t('insert.creditcard.reminder')">
                <b-form-input type="text" v-model="customerReminder" :disabled="true"/>
              </b-form-group>
            </b-col>
          </b-row>
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
        Deleted: 0,
        System: 0,
        RecorState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        CustomerId: null,
        DocumentNumber: null,
        DocumentDate: null,
        CsTypeId: null,
        TransactionTypeId: 2400,
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
        CurrencyRate: 0,
        SystemCurrencyRate: 0,
        DocumentCreationTypeId: 621,
        CurrencyCsTotal: null,
        CorrespondentBranch: null
      },
      customerReminder: null,
      routeName: this.$route.meta.baseLink,
      branchs: [],
      branchsValid: false
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'customers', 'currencies', 'banks', 'routes', 'representatives', 'csTypes'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: 'CsCard'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextFinance/api/CsType/Search', name: 'csTypes'})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextFinance/api/CsCard/GetCode`})
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
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchCustomer(loading, search, this)
      }
    },
    searchCustomer (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'customers',
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
        api: 'VisionNextEmployee/api/Employee/Search',
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
        api: 'VisionNextRoute/api/Route/Search',
        name: 'routes',
        andConditionModel: {
          Description1: search
        }
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
        api: 'VisionNextBank/api/Bank/Search',
        name: 'banks',
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
        this.form.CurrencyCsTotal = this.form.CsTotal
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextFinance/api/CSCard`, formdata: model, return: this.routeName})
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
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    }
  }
}
</script>
<style lang="sass">
</style>
