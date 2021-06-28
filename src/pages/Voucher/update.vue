<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Voucher' }">
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
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
            <v-select v-model="customer" label="Description1" :filterable="false" :options="customers" @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" >
            <template slot="no-options">
                {{$t('insert.min3')}}
            </template>
            <template v-slot:option="option">
                {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}
            </template>
            </v-select>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.Voucher.VoucherDetails')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate">
                <b-form-datepicker v-model="form.DocumentDate" />
            </NextFormGroup>

            <NextFormGroup item-key="DueDate" :error="$v.form.DueDate">
                <b-form-datepicker v-model="form.DueDate" />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber">
                <b-form-input type="text" v-model="form.SerialNumber" :readonly="insertReadonly.SerialNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
                <v-select v-model="currency" :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="CsTotal" :error="$v.form.CsTotal">
                <b-form-input type="number" v-model="form.CsTotal" :readonly="insertReadonly.CsTotal" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select v-model="representative" label="Description1" :filterable="false" :options="representatives" @search="searchRepresentative" @input="selectedSearchType('RepresentativeId', $event)" >
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.Description1 }}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <v-select v-model="route" label="Description1" :filterable="false" :options="routes" @search="searchRoute" @input="selectedSearchType('RouteId', $event)" >
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.Description1 }}
                </template>
              </v-select>
            </NextFormGroup>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="$t('insert.creditcard.reminder')">
                <b-form-input type="text" v-model="customerReminder" :disabled="true"/>
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
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecorState: 2,
        StatusId: 1,
        CsTypeId: 2,
        Code: null,
        Description1: null,
        CustomerId: null,
        DocumentNumber: null,
        DocumentDate: null,
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
        CurrencyRate: null,
        SystemCurrencyRate: null,
        DocumentCreationTypeId: 621,
        CurrencyCsTotal: 'CsTotal',
        CorrespondentBranch: null
      },
      customerReminder: null,
      routeName: this.$route.meta.baseLink,
      branchs: [],
      branchsValid: false,
      customer: null,
      currency: null,
      representative: null,
      route: null,
      bank: null,
      payCity: null,
      csType: 2,
      branch: null,
      routeName1: 'Finance',
      routeName2: 'CSCard'
    }
  },
  computed: {
    ...mapState(['customers', 'currencies', 'banks', 'routes', 'representatives', 'csTypes'])
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
    this.getInsertPage()
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: 'Voucher'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextFinance/api/CsType/Search', name: 'csTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
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
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
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
    searchRepresentative (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/AutoCompleteSearch', 'representatives', model).then(res => {
        loading(false)
      })
    },
    searchRoute (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRoute/api/Route/AutoCompleteSearch', 'routes', model).then(res => {
        loading(false)
      })
    },
    searchBank (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextBank/api/Bank/AutoCompleteSearch', 'banks', model).then(res => {
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
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextFinance/api/CSCard`, formdata: model, return: this.routeName})
      }
    },
    setModel () {
      let e = this.rowData
      let rowData = this.rowData
      if (rowData.StatusId !== 1) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.Voucher.orderStatusException') })
        setTimeout(() => {
          this.$router.push({ name: 'Voucher' })
        }, 2000)
      }
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
      this.csType = this.convertLookupValueToSearchValue(e.CsType)
      this.form = e
      this.form.CsTotal = this.form.CurrencyCsTotal
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
