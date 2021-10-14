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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle />
          </NextFormGroup>
            <b-col md="2" lg="2">
              <b-form-group :label="$t('insert.cashcard.IsMultiple')">
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
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                :disabled="insertReadonly.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="Customer"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber">
              <NextInput v-model="form.DocumentNumber" type="number" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :start-weekday="1" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyRate" :error="$v.form.CurrencyRate">
              <NextInput v-model="Customer.CurrencyRate" type="number" :disabled="insertReadonly.CurrencyRate" />
            </NextFormGroup>
            <NextFormGroup item-key="SystemCurrencyRate" :error="$v.form.SystemCurrencyRate">
              <NextInput v-model="Customer.SystemCurrencyRate" type="number" :disabled="insertReadonly.SystemCurrencyRate" />
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
                v-model="Currency"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                v-model="Representative"
                label="Description1"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                v-model="Route"
                label="Description1"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup item-key="CashCardTypeId" :error="$v.form.CashCardTypeId">
              <NextDropdown
                @input="selectedSearchType('CashCardTypeId', $event)"
                :disabled="insertReadonly.CashCardTypeId"
                url="VisionNextFinance/api/CashCardType/Search"
                v-model="CashCardType"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditcard.reminder')">
              <NextInput v-model="customerReminder" type="number" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="IsManuelClosure" :error="$v.form.IsManuelClosure" md="3">
              <NextCheckBox v-model="form.IsManuelClosure" :disabled="insertReadonly.IsManuelClosure" type="number" toggle/>
            </NextFormGroup>
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
                  <b-td>{{r.Customer.Description1}}</b-td>
                  <b-td>{{r.Currency.Description1}}</b-td>
                  <b-td>{{r.Representative.Description1}}</b-td>
                  <b-td>{{r.Route.Description1}}</b-td>
                  <b-td>{{r.CashCardType.Description1}}</b-td>
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
import insertMixin from '../../../mixins/insert'
export default {
  mixins: [insertMixin],
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
        CurrencyRate: null,
        CurrencyCashTotal: null,
        DocumentCreationTypeId: 621,
        SystemCurrencyRate: null,
        IsManuelClosure: 1
      },
      Currency: null,
      Representative: null,
      Route: null,
      CashCardType: null,
      isMultiple: null,
      showMultiple: null,
      customerReminder: null,
      Customer: {
        CurrencyRate: null,
        SystemCurrencyRate: null
      },
      routeName1: 'Finance',
      cashCards: [],
      isEditable: false
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
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
        const Status = ''
        this.cashCards.push({
          ...this.form,
          Customer: this.Customer,
          Currency: this.Currency,
          Representative: this.Representative,
          Route: this.Route,
          CashCardType: this.CashCardType,
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
      this.Customer = filteredArr.Customer
      this.Currency = filteredArr.Currency
      this.Representative = filteredArr.Representative
      this.Route = filteredArr.Route
      this.CashCardType = filteredArr.CashCardType
      this.Status = filteredArr.Status
    },
    removeCashCard (item) {
      this.cashCards.splice(this.cashCards.indexOf(item), 1)
    },
    clearForm () {
      this.$v.form.$reset()
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
      this.Customer = null
      this.Currency = null
      this.Representative = null
      this.Route = null
      this.CashCardType = null
    },
    multipleSave () {
      if (this.cashCards.length < 1) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      }
      let status = true
      this.cashCards.map(item => {
        this.$api.postByUrl({}, 'VisionNextFinance/api/CashCard/Insert').then((res) => {
          if (res.IsCompleted === true) {
            item.Status = this.$t('insert.success')
            this.removeCashCard(item)
          } else {
            item.Status = res.Message
            status = false
          }
        })
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
        this.createData()
      }
    }
  }
}
</script>
<style lang="sass">
</style>
