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
            <b-col md="4" lg="3">
              <b-form-group :label="$t('insert.cashcard.Code') + (insertRequired.Code === true ? ' *' : '')">
                <b-form-input type="text" v-model="form.Code"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                <NextCheckBox v-model="form.StatusId" type="number" toggle />
              </b-form-group>
            </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.cashcard.CashCard')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select label="Description1" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedSearchType('CustomerId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1}}
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
            <b-col v-if="insertVisible.PaymentDate != null ? insertVisible.PaymentDate : developmentMode" :start-weekday="1" cols="12" md="3">
              <b-form-group :label="insertTitle.PaymentDate + (insertRequired.PaymentDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PaymentDate.$error }">
                <b-form-datepicker v-model="form.PaymentDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CashTotal != null ? insertVisible.CashTotal : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CashTotal + (insertRequired.CashTotal === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CashTotal.$error }">
                <b-form-input type="number" v-model="form.CashTotal" :readonly="insertReadonly.CashTotal" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrencyId != null ? insertVisible.CurrencyId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CurrencyId + (insertRequired.CurrencyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrencyId.$error }">
                <v-select :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
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
                <v-select label="Description1" :filterable="false" :options="routes" @input="selectedSearchType('RouteId', $event)" >
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CashCardTypeId != null ? insertVisible.CashCardTypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CashCardTypeId + (insertRequired.CashCardTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CashCardTypeId.$error }">
                <v-select :options="cashCardTypes" @input="selectedSearchType('CashCardTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
             <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="$t('insert.creditcard.reminder')" :class="{ 'form-group--error': $v.form.Description1.$error }">
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
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        CustomerId: null,
        DocumentNumber: null,
        DocumentDate: new Date(),
        PaymentDate: new Date(),
        CashTotal: null,
        CurrencyId: null,
        RepresentativeId: null,
        RouteId: null,
        CashCardTypeId: null,
        CurrencyRate: 0,
        CurrencyCashTotal: null,
        DocumentCreationTypeId: 621,
        SystemCurrencyRate: 0,
        IsManuelClosure: 0
      },
      customerReminder: null,
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'customers', 'currencies', 'cashCardTypes', 'routes', 'representatives'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextFinance/api/${e}/GetCode`})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextFinance/api/CashCardType/Search', name: 'cashCardTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
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
    save () {
      console.log(this.form)
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.CurrencyCashTotal = this.form.CashTotal
        this.form.DocumentDate = this.dateConvertToISo(this.form.DocumentDate)
        this.form.PaymentDate = this.dateConvertToISo(this.form.PaymentDate)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextFinance/api/CashCard`, formdata: model, return: this.routeName})
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
    }
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    // insertDefaultValue (value) {
    //   Object.keys(value).forEach(el => {
    //     if (el !== 'Code') {
    //       this.form[el] = value[el]
    //     }
    //   })
    // }
  }
}
</script>
<style lang="sass">
</style>
