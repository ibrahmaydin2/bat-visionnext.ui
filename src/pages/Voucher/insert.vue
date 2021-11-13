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
          <NextFormGroup item-key="Code" :error="$v.form.Code" md="3" lg="3">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextDropdown url="VisionNextFinance/api/CsStatus/Search" @input="selectedSearchType('StatusId', $event)" :dynamic-and-condition="{ StatusIds: [1] }" :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
          <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
            <NextDropdown
              :searchable="true"
              url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
              :custom-option="true"
              :is-customer="true"
              or-condition-fields="Code,Description1,CommercialTitle"
              :dynamic-and-condition="{ StatusIds: [1] }"
              @input="selectedSearchType('CustomerId', $event)"
              :disabled="insertReadonly.CustomerId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.Voucher.VoucherDetails')" active>
          <b-row>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="3" lg="3">
              <NextInput v-model="form.DocumentNumber" type="text" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="3" lg="3">
              <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate" />
            </NextFormGroup>
            <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="3" lg="3">
              <NextDatePicker v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber" md="3" lg="3">
              <NextInput v-model="form.SerialNumber" type="text" :disabled="insertReadonly.SerialNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="3" lg="3">
             <NextDropdown url="VisionNextSystem/api/SysCurrency/Search" @input="selectedSearchType('CurrencyId', $event)" :dynamic-and-condition="{ StatusIds: [1] }" :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="CsTotal" :error="$v.form.CsTotal" md="3" lg="3">
              <NextInput v-model="form.CsTotal" type="number" :disabled="insertReadonly.CsTotal" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="3" lg="3">
              <NextDropdown
                v-model="representative"
                :searchable="true"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :custom-option="true"
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="3" lg="3">
              <NextDropdown
                :searchable="true"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :custom-option="true"
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditcard.reminder')" md="3" lg="3">
              <NextInput v-model="customerReminder" type="text" :disabled="true" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
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
        PayCityId: null,
        BankId: null,
        CorrespondentBranchId: null,
        CurrencyId: null,
        CsTotal: null,
        RepresentativeId: null,
        RouteId: null,
        CurrencyRate: 0,
        SystemCurrencyRate: 0,
        DocumentCreationTypeId: 621,
        CurrencyCsTotal: 'CsTotal',
        CorrespondentBranch: null,
        IsManuelClosure: 0
      },
      customerReminder: null,
      routeName1: 'Finance',
      routeName2: 'CSCard',
      representative: null,
      dateNow: ''
    }
  },
  mounted () {
    this.createManualCode()
    this.getUserInfo()
    this.dateNow = new Date().toISOString()
    this.form.DocumentDate = this.dateNow
  },
  methods: {
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
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.representative = {
              Description1: `${userModel.Name} ${userModel.Surname}`,
              RecordId: user.EmployeeId
            }
            this.form.RepresentativeId = user.EmployeeId
            this.$forceUpdate()
          }
        })
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.form.DocumentDate > this.dateNow) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('get.Voucher.dateError') })
          return
        }
        this.form.CurrencyCsTotal = this.form.CsTotal
        this.createData()
      }
    }
  }
}
</script>
