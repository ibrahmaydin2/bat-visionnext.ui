<template>
  <b-row class="asc__insertPage">
    <CreditBudgetExcelModal @success="successExcelImport"></CreditBudgetExcelModal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'CreditBudget' }">
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
          <NextFormGroup :title="$t('insert.code')">
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.creditBudget.title')" active>
          <b-row>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CreditBranchId" :error="$v.form.CreditBranchId">
              <NextDropdown url="VisionNextBranch/api/Branch/AutoCompleteSearch" @input="selectedSearchType('CreditBranchId', $event)" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <NextInput v-model="form.BudgetAmount" type="number" :disabled="insertReadonly.BudgetAmount" @input="changedBudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="UsedAmount" :error="$v.form.UsedAmount">
              <NextInput type="text" v-model="form.UsedAmount" :disabled="insertReadonly.UsedAmount"/>
            </NextFormGroup>
            <NextFormGroup item-key="ReservedAmount" :error="$v.form.ReservedAmount">
              <NextInput type="text" v-model="form.ReservedAmount" :disabled="insertReadonly.ReservedAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.remainingBudget')">
              <NextInput type="text" v-model="form.LeftAmount" :disabled="true" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.creditBudget.customerGuarantees')">
          <b-row>
            <NextFormGroup :title="$t('insert.creditBudget.customer')" :required="true" :error="$v.customerGuarantees.CustomerId" md="2" lg="2">
              <NextDropdown
                :disabled="!form.CreditBranchId || form.CreditBranchId === 0"
                v-model="selectedCustomer"
                url="VisionNextCustomer/api/Customer/GetBranchesCustomerSearch"
                @input="selectCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :dynamic-and-condition="{BranchIds: [form.CreditBranchId]}"
                :is-customer="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.creditLimit')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.CreditLimit" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.riskLimit')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.RiskLimit" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.currentCredit')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.CurrentCredit" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.currentRisk')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.CurrentRisk" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.creditAccountRemainder')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.CreditAccountRemainder" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.debitAccountRemainder')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.DebitAccountRemainder" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.creditAmountCentral')" md="2" lg="2">
              <NextInput type="text" v-model="customerGuarantees.CreditAmountCentral" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.amount')" :required="true" :error="$v.customerGuarantees.Amount" md="2" lg="2">
              <NextInput type="number" v-model="customerGuarantees.Amount"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.paymentPeriod')" :required="false" md="2" lg="2">
              <NextDropdown
                v-model="paymentPeriod"
                url="VisionNextCommonApi/api/FixedTerm/Search"
                @input="selectPaymentPeriod"
                :dynamic-request="{OrderByColumns: [{column: 'Period', orderByType: 0}]}"
                v-on:all-source="setPaymentPeriods"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerGuarantee" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group>
                <b-button class="mt-4" size="sm" variant="success" v-b-modal.credit-budget-excel-modal><i class="fas fa-file-pdf"/> {{$t('insert.creditBudget.uploadExcel')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.creditBudget.customer')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.creditLimit')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.riskLimit')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.currentCredit')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.currentRisk')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.creditAccountRemainder')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.debitAccountRemainder')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.creditAmountCentral')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.amount')}}</span></b-th>
                <b-th><span>{{$t('insert.creditBudget.paymentPeriod')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.CustomerGuarantees ? form.CustomerGuarantees.filter(f => f.RecordState !== 4) : [])" :key="i">
                  <b-td>{{`${c.CustomerCode} - ${c.CustomerDesc}`}}</b-td>
                  <b-td>{{c.CreditLimit}}</b-td>
                  <b-td>{{c.RiskLimit}}</b-td>
                  <b-td>{{c.CurrentCredit}}</b-td>
                  <b-td>{{c.CurrentRisk}}</b-td>
                  <b-td>{{c.CreditAccountRemainder}}</b-td>
                  <b-td>{{c.DebitAccountRemainder}}</b-td>
                  <b-td>{{c.CreditAmount }}</b-td>
                  <b-td>{{c.Amount}}</b-td>
                  <b-td>{{c.paymentPeriodO ? c.paymentPeriodO.Description1 : '-'}}</b-td>
                  <b-td class="text-center">
                    <b-button :title="$t('list.edit')" @click="editCustomerGuarantee(c)" class="btn mr-2 btn-warning btn-sm">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button :title="$t('list.delete')" @click="removeCustomerGuarantee(c)" type="button" class="btn mr-2 btn-danger btn-sm">
                      <i class="far fa-trash-alt ml-1"></i>
                    </b-button>
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
import { required } from 'vuelidate/lib/validators'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Code: null,
        StatusId: 1,
        BeginDate: null,
        EndDate: null,
        CreditBranchId: null,
        BudgetAmount: null,
        UsedAmount: 0,
        ReservedAmount: 0,
        LeftAmount: 0,
        CreditBudgetDetails: [],
        CustomerGuarantees: []
      },
      routeName1: 'Budget',
      customerGuarantees: {
        Amount: null,
        AppStatus: null,
        ApproveStateId: null,
        CreditAccountRemainder: null,
        CreditAmountCentral: null,
        CreditLimit: null,
        CurrentCredit: null,
        CurrentRisk: null,
        CustomerCode: null,
        CustomerCreditHistoryId: null,
        CustomerDesc: null,
        CustomerId: null,
        DebitAccountRemainder: null,
        IsBlackListed: null,
        PaymentPeriod: null,
        RecordTypeId: null,
        RiskLimit: null
      },
      selectedCustomer: {},
      paymentPeriod: null,
      selectedIndex: null,
      paymentPeriods: []
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.CreditBudgetDetails = this.form.CustomerGuarantees.map((item) => {
          item.PaymentPeriod = item.paymentPeriodO ? item.paymentPeriodO.Period : null
          let creditBudgetDetail = {
            ApprovestateId: item.ApproveStateId,
            Amount: item.Amount,
            CustomerId: item.CustomerId,
            CustomerCreditHistoryId: item.CustomerCreditHistoryId,
            PaymentPeriod: item.PaymentPeriod,
            RecordState: 2,
            StatusId: 1,
            Deleted: 0,
            System: 0,
            CustomerGuarantees: item
          }

          return creditBudgetDetail
        })
        this.createData()
      }
    },
    changedBudgetAmount (value) {
      this.form.LeftAmount = value > 0
        ? (parseFloat(value) - (this.form.UsedAmount + this.form.ReservedAmount))
        : 0
    },
    selectCustomer (customer) {
      this.customerGuarantees = {}
      if (customer) {
        this.customerGuarantees.CustomerCode = customer.Code
        this.customerGuarantees.CustomerDesc = customer.Description
        this.$api.getByUrl(`VisionNextBudget/api/CreditBudget/GetCustomerInfo?customerId=${customer.RecordId}`).then((res) => {
          if (res) {
            this.customerGuarantees = res
            this.customerGuarantees.PaymentPeriod = null
            this.customerGuarantees.Amount = null
            this.customerGuarantees.CreditAmountCentral = res.CreditAmount
            this.paymentPeriod = null
            this.$v.customerGuarantees.$reset()
          } else {
            this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.contract.noCustomerBudget') })
          }
        })
      }
    },
    selectPaymentPeriod (paymentPeriod) {
      this.customerGuarantees.PaymentPeriod = paymentPeriod ? paymentPeriod.RecordId : null
    },
    addCustomerGuarantee () {
      this.$v.customerGuarantees.$touch()
      if (this.$v.customerGuarantees.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      if (this.customerGuarantees.Amount < this.customerGuarantees.CurrentRisk) {
        this.$toasted.show(this.$t('insert.creditBudget.currentRiskValidationMessage'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      if (this.customerGuarantees.Amount > this.form.LeftAmount) {
        this.$toasted.show(this.$t('insert.creditBudget.budgetValidationMessage'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      if (this.form.CustomerGuarantees.some(c => c.CustomerId === this.customerGuarantees.CustomerId)) {
        this.$toasted.show(this.$t('insert.creditBudget.sameRecordException'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.customerGuarantees.paymentPeriodO = this.paymentPeriod
      if (this.customerGuarantees.isUpdated) {
        this.form.CustomerGuarantees[this.selectedIndex] = this.customerGuarantees
        this.selectedIndex = null
      } else {
        this.form.CustomerGuarantees.push(this.customerGuarantees)
      }
      this.customerGuarantees = {}
      this.selectedCustomer = null
      this.paymentPeriod = null
      this.$v.customerGuarantees.$reset()
    },
    removeCustomerGuarantee (item) {
      // this.form.CustomerGuarantees.splice(this.form.CustomerGuarantees.indexOf(item), 1)
      if (item.RecordId > 0) {
        this.form.CustomerGuarantees[this.form.CustomerGuarantees.indexOf(item)].RecordState = 4
      } else {
        this.form.CustomerGuarantees.splice(this.form.CustomerGuarantees.indexOf(item), 1)
      }
    },
    editCustomerGuarantee (item) {
      this.customerGuarantees = item
      this.selectedCustomer = null
      this.paymentPeriod = null
      this.customerGuarantees.isUpdated = true
      this.customerGuarantees.CreditAmountCentral = item.CreditAmount
      this.paymentPeriod = this.getPaymentPeriodById(item.PaymentPeriod)
      this.selectedCustomer = {
        RecordId: item.CustomerId,
        Description1: item.CustomerDesc,
        Code: item.CustomerCode
      }
    },
    successExcelImport (data) {
      if (data) {
        let list = []
        Object.keys(data).map(d => {
          let obj = data[d]
          let existIndex = this.form.CustomerGuarantees.findIndex(c => c.CustomerId === obj.CustomerId)
          if (existIndex > -1) {
            this.form.CustomerGuarantees.splice(existIndex, 1)
          }
          obj.RecordState = 2
          obj.StatusId = 1
          obj.Deleted = 0
          obj.System = 0
          obj.ApproveStateId = 51
          obj.CreditAmount = obj.CreditAmountCentral
          if (obj.Period) {
            obj.PaymentPeriod = obj.Period
          }
          obj.paymentPeriodO = this.getPaymentPeriodById(obj.Period)
          list.push(obj)
        })
        this.form.CustomerGuarantees = [...list, ...this.form.CustomerGuarantees]
      }
    },
    setPaymentPeriods (value) {
      this.paymentPeriods = value
    },
    getPaymentPeriodById (paymentPeriod) {
      let paymentPeriods = this.paymentPeriods.filter(p => p.Period === paymentPeriod)
      if (paymentPeriods.length > 0) {
        return paymentPeriods.length > 0 ? paymentPeriods[0] : { RecordId: paymentPeriod }
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      customerGuarantees: {
        CustomerId: {
          required
        },
        Amount: {
          required
        }
      }
    }
  }
}
</script>
