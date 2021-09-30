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
            <b-form-input type="text" v-model="form.Code" disabled />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.creditBudget.title')" active>
          <b-row>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <b-form-datepicker v-model="form.BeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <b-form-datepicker v-model="form.EndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="CreditBranchId" :error="$v.form.CreditBranchId">
              <NextDropdown url="VisionNextBranch/api/Branch/AutoCompleteSearch" @input="selectedSearchType('CreditBranchId', $event)" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input type="number" v-model="form.BudgetAmount" :readonly="insertReadonly.BudgetAmount" @input="changedBudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="UsedAmount" :error="$v.form.UsedAmount">
              <b-form-input type="text" v-model="form.UsedAmount" :readonly="insertReadonly.UsedAmount"/>
            </NextFormGroup>
            <NextFormGroup item-key="ReservedAmount" :error="$v.form.ReservedAmount">
              <b-form-input type="text" v-model="form.ReservedAmount" :readonly="insertReadonly.ReservedAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.remainingBudget')">
              <b-form-input type="text" v-model="form.LeftAmount" disabled />
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
              <b-form-input type="text" v-model="customerGuarantees.CreditLimit" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.riskLimit')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.RiskLimit" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.currentCredit')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.CurrentCredit" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.currentRisk')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.CurrentRisk" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.creditAccountRemainder')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.CreditAccountRemainder" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.debitAccountRemainder')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.DebitAccountRemainder" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.creditAmountCentral')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.CreditAmountCentral" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.amount')" :required="true" :error="$v.customerGuarantees.Amount" md="2" lg="2">
              <b-form-input type="number" v-model="customerGuarantees.Amount"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.paymentPeriod')" :required="true" :error="$v.customerGuarantees.PaymentPeriod" md="2" lg="2">
              <NextDropdown
                v-model="paymentPeriod"
                url="VisionNextCommonApi/api/FixedTerm/Search"
                @input="selectPaymentPeriod"
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
                <b-tr v-for="(c, i) in form.CustomerGuarantees" :key="i">
                  <b-td>{{`${c.CustomerCode} - ${c.CustomerDesc}`}}</b-td>
                  <b-td>{{c.CreditLimit}}</b-td>
                  <b-td>{{c.RiskLimit}}</b-td>
                  <b-td>{{c.CurrentCredit}}</b-td>
                  <b-td>{{c.CurrentRisk}}</b-td>
                  <b-td>{{c.CreditAccountRemainder}}</b-td>
                  <b-td>{{c.DebitAccountRemainder}}</b-td>
                  <b-td>{{c.CreditAmount }}</b-td>
                  <b-td>{{c.Amount}}</b-td>
                  <b-td>{{c.PaymentPeriod}}</b-td>
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
        this.form.CreditBudgetDetails = this.form.CustomerGuarantees
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
      if (this.customerGuarantees.isUpdated) {
        this.form.CustomerGuarantees[this.selectedIndex] = this.customerGuarantees
        this.selectedIndex = null
      } else {
        this.form.CustomerGuarantees.push(this.customerGuarantees)
      }
      this.customerGuarantees = {}
      this.selectedCustomer = {}
      this.paymentPeriod = null
      this.$v.customerGuarantees.$reset()
    },
    removeCustomerGuarantee (item) {
      this.form.CustomerGuarantees.splice(this.form.CustomerGuarantees.indexOf(item), 1)
    },
    editCustomerGuarantee (item) {
      this.customerGuarantees = item
      this.selectedCustomer = null
      this.paymentPeriod = null
      this.customerGuarantees.isUpdated = true
      this.customerGuarantees.CreditAmountCentral = item.CreditAmount
      let paymentPeriods = this.paymentPeriods.filter(p => p.RecordId === item.PaymentPeriod)
      if (paymentPeriods.length > 0) {
        this.paymentPeriod = paymentPeriods[0]
      }
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
          obj.RecordState = 2
          obj.StatusId = 1
          obj.Deleted = 0
          obj.System = 0
          obj.CreditAmount = obj.CreditAmountCentral
          if (obj.Period) {
            obj.PaymentPeriod = d.Period
          }
          list.push(obj)
        })
        this.form.CustomerGuarantees = list
      }
    },
    setPaymentPeriods (value) {
      this.paymentPeriods = value
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
        },
        PaymentPeriod: {
          required
        }
      }
    }
  }
}
</script>
