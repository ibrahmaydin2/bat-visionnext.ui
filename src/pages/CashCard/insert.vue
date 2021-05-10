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
            <b-button v-if="!showMultiple" id="submitButton" @click="save()" size="sm" variant="success">{{$t('header.save')}}</b-button>
            <b-button v-else id="submitButton" size="sm" @click="multipleSave()" variant="success">{{$t('insert.cashcard.multipleSave')}}</b-button>
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
            <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="2" lg="2">
              <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                <NextCheckBox v-model="form.StatusId" type="number" toggle />
              </b-form-group>
            </b-col>
            <b-col md="2" lg="2">
              <b-form-group :label="$t('insert.cashcard.IsMultiple')">
                <!-- <NextCheckBox v-model="isMultiple" type="number" toggle /> -->
                <b-form-checkbox @change="changeMultiple" v-model="isMultiple" name="check-button" switch>
                </b-form-checkbox>
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
                <v-select label="Description1" v-model="CustomerId" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedSearchType('CustomerId', $event)" >
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
                <v-select v-model="CurrencyId" :options="currencies" @input="selectedSearchType('CurrencyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select label="Description1" v-model="RepresentativeId" :filterable="false" :options="representatives" @search="onRepresentativeSearch" @input="selectedSearchType('RepresentativeId', $event)" >
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
                <v-select label="Description1" v-model="RouteId" :filterable="false" :options="routes" @input="selectedSearchType('RouteId', $event)" >
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CashCardTypeId != null ? insertVisible.CashCardTypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CashCardTypeId + (insertRequired.CashCardTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CashCardTypeId.$error }">
                <v-select v-model="CashCardTypeId" :options="cashCardTypes" @input="selectedSearchType('CashCardTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="$t('insert.creditcard.reminder')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="customerReminder" :disabled="true"/>
              </b-form-group>
            </b-col>
            <b-col v-if="showMultiple" cols="12" md="2" lg="2">
              <b-form-group>
                <AddDetailButton :title="$t('insert.add')" @click.native="addCashCard()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="cashCards.length > 0">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.cashcard.Code')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.Customer')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.Currency')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.Representative')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.Route')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.CashCardType')}}</span></b-th>
                <b-th><span>{{$t('insert.cashcard.CashTotal')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in cashCards" :key="'dl' + i">
                  <b-td>{{r.Code}}</b-td>
                  <b-td>{{r.Customer}}</b-td>
                  <b-td>{{r.Currency}}</b-td>
                  <b-td>{{r.Representative}}</b-td>
                  <b-td>{{r.Route}}</b-td>
                  <b-td>{{r.CashCardType}}</b-td>
                  <b-td>{{r.CashTotal}}</b-td>
                  <b-td class="text-center">
                    <i @click="editCashCard(r)" class="fa fa-pencil-alt text-warning mr-1"></i>
                    <i @click="removeCashCard(r)" class="far fa-trash-alt text-danger ml-1"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
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
      CustomerId: null,
      CurrencyId: null,
      RepresentativeId: null,
      RouteId: null,
      CashCardTypeId: null,
      isMultiple: null,
      showMultiple: null,
      customerReminder: null,
      routeName: this.$route.meta.baseLink,
      cashCards: [],
      isEditable: false
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
      this.getCreateCode(e)
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextFinance/api/CashCardType/Search', name: 'cashCardTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
    },
    getCreateCode (e) {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextFinance/api/${e}/GetCode`})
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
        this[label] = model.Description1
        if (label === 'CustomerId') {
          this.customerReminder = model.Remainder
        }
      } else {
        this.form[label] = null
        this[label] = null
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
    changeMultiple (e) {
      if (this.isMultiple) {
        this.showMultiple = true
      } else {
        this.showMultiple = false
      }
    },
    addCashCard () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.isEditable) {
          const index = this.cashCards.findIndex(i => i.Code === this.form.Code)
          this.cashCards.splice(index, 1)
        }
        this.form.CurrencyCashTotal = this.form.CashTotal
        this.form.DocumentDate = this.dateConvertToISo(this.form.DocumentDate)
        this.form.PaymentDate = this.dateConvertToISo(this.form.PaymentDate)
        const Customer = this.CustomerId
        const Currency = this.CurrencyId
        const Representative = this.RepresentativeId
        const Route = this.RouteId
        const CashCardType = this.CashCardTypeId
        const Status = ''
        this.cashCards.push({
          ...this.form,
          Customer,
          Currency,
          Representative,
          Route,
          CashCardType,
          Status
        })
        this.clearForm()
      }
    },
    editCashCard (item) {
      this.isEditable = true
      const index = this.cashCards.indexOf(item)
      const filteredArr = this.cashCards[index]
      this.form = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: filteredArr.StatusId,
        Code: filteredArr.Code,
        Description1: filteredArr.Description1,
        CustomerId: filteredArr.CustomerId,
        DocumentNumber: filteredArr.DocumentNumber,
        DocumentDate: filteredArr.DocumentDate,
        PaymentDate: filteredArr.PaymentDate,
        CashTotal: filteredArr.CashTotal,
        CurrencyId: filteredArr.CurrencyId,
        RepresentativeId: filteredArr.RepresentativeId,
        RouteId: filteredArr.RouteId,
        CashCardTypeId: filteredArr.CashCardTypeId,
        CurrencyRate: filteredArr.CurrencyRate,
        CurrencyCashTotal: filteredArr.CurrencyCashTotal,
        DocumentCreationTypeId: filteredArr.DocumentCreationTypeId,
        SystemCurrencyRate: filteredArr.SystemCurrencyRate,
        IsManuelClosure: filteredArr.IsManuelClosure
      }
      this.CustomerId = filteredArr.Customer
      this.CurrencyId = filteredArr.Currency
      this.RepresentativeId = filteredArr.Representative
      this.RouteId = filteredArr.Route
      this.CashCardTypeId = filteredArr.CashCardType
      this.Status = filteredArr.Status
    },
    removeCashCard (item) {
      this.cashCards.splice(this.cashCards.indexOf(item), 1)
    },
    clearForm () {
      this.$v.form.$reset()
      this.getCreateCode(this.routeName)
      this.isEditable = false
      this.form = {
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
      }
      this.CustomerId = null
      this.CurrencyId = null
      this.RepresentativeId = null
      this.RouteId = null
      this.CashCardTypeId = null
    },
    multipleSave () {
      if (this.cashCards.length < 1) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      }
      let status = true
      this.cashCards.map(item => {
        this.$store.dispatch('cashCardMultipleInsert', {...this.query, item: item}).then((res) => {
          if (res.IsCompleted === true) {
            item.Status = this.$t('insert.success')
            this.removeCashCard(item)
          } else {
            item.Status = res.Message
            status = false
          }
        })
        // this.$api.postByUrl(request, 'VisionNextFinance/api/CashCard/Insert').then((res) => {
        //   if (res.IsCompleted === true) {
        //     item.Status = this.$t('insert.success')
        //     this.removeCashCard(item)
        //   } else {
        //     item.Status = res.Message
        //     status = false
        //   }
        // })
      })
      if (status) {
        this.$toasted.show(this.$t('index.success'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
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
  }
}
</script>
<style lang="sass">
</style>
