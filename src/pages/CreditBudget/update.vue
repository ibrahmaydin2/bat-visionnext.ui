<template>
  <b-row class="asc__insertPage">
    <CreditBudgetExcelModal @success="successExcelImport"></CreditBudgetExcelModal>
    <CreditBudgetBulkApproveModal :modalAction="{Title: $t('insert.creditBudget.bulkCustomerApprove')}" :items="selectedItems" />
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
              <NextDropdown v-model="selectedBranch" url="VisionNextBranch/api/Branch/AutoCompleteSearch" @input="selectedSearchType('CreditBranchId', $event)"/>
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
                v-model="selectedCustomer"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                @input="selectCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
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
            <NextFormGroup :title="$t('insert.creditBudget.creditAmount')" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.CreditAmount" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.amount')" :required="true" :error="$v.customerGuarantees.Amount" md="2" lg="2">
              <b-form-input type="text" v-model="customerGuarantees.Amount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.creditBudget.paymentPeriod')" :required="true" :error="$v.customerGuarantees.PaymentPeriod" md="2" lg="2">
              <NextDropdown
                v-model="paymentPeriod"
                url="VisionNextCommonApi/api/FixedTerm/Search"
                @input="selectPaymentPeriod"/>
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
             <b-col cols="12" md="2" v-if="selectedItems.length > 0">
              <b-form-group>
                <b-button class="mt-4" size="sm" variant="success" v-b-modal.credit-budget-bulk-approve-modal><i class="fas fa-check"/> {{$t('insert.creditBudget.bulkCustomerApprove')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :items="(form.CustomerGuarantees ? form.CustomerGuarantees.filter(c => c.RecordState !== 4) : [])"
              :fields="customerGuaranteeFields"
              select-mode="multi"
              responsive
              id="customer-guarantees"
              selectable
              bordered
              small
              @row-selected="onRowSelected"
            >
              <template #cell(selection)="row">
                <span>
                  <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
                </span>
              </template>
              <template #cell(operations)="row">
                <span>
                  <i @click="removeCustomerGuarantee(row)" class="far fa-trash-alt text-danger"></i>
                </span>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import insertMixin from '../../mixins/update'
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
        CreditAmount: null,
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
      selectedBranch: null,
      paymentPeriod: null,
      selectedItems: [],
      customerGuaranteeFields: [
        {key: 'selection', label: '', sortable: false},
        {key: 'AppStatus', label: this.$t('insert.creditBudget.status'), sortable: false},
        {key: 'CustomerDesc', label: this.$t('insert.creditBudget.customer'), sortable: false},
        {key: 'CreditLimit', label: this.$t('insert.creditBudget.creditLimit'), sortable: false},
        {key: 'RiskLimit', label: this.$t('insert.creditBudget.riskLimit'), sortable: false},
        {key: 'CurrentCredit', label: this.$t('insert.creditBudget.currentCredit'), sortable: false},
        {key: 'CurrentRisk', label: this.$t('insert.creditBudget.currentRisk'), sortable: false},
        {key: 'CreditAccountRemainder', label: this.$t('insert.creditBudget.creditAccountRemainder'), sortable: false},
        {key: 'DebitAccountRemainder', label: this.$t('insert.creditBudget.debitAccountRemainder'), sortable: false},
        {key: 'CreditAmount', label: this.$t('insert.creditBudget.creditAmount'), sortable: false},
        {key: 'Amount', label: this.$t('insert.creditBudget.amount'), sortable: false},
        {key: 'PaymentPeriod', label: this.$t('insert.creditBudget.paymentPeriod'), sortable: false},
        {key: 'operations', label: this.$t('list.operations'), sortable: false}
      ]
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
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
        this.updateData()
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
        this.$api.getByUrl(`VisionNextBudget/api/CreditBudget/GetCustomerInfo?customerId=${customer.RecordId}`).then((res) => {
          if (res) {
            this.customerGuarantees = res
            this.customerGuarantees.PaymentPeriod = null
            this.customerGuarantees.Amount = null
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
      this.form.CustomerGuarantees.push(this.customerGuarantees)
      this.customerGuarantees = {}
      this.selectedCustomer = {}
      this.paymentPeriod = null
      this.$v.customerGuarantees.$reset()
    },
    removeCustomerGuarantee (item) {
      if (item.RecordId > 0) {
        this.form.CustomerGuarantees[this.form.CustomerGuarantees.indexOf(item)].RecordState = 4
      } else {
        this.form.CustomerGuarantees.splice(this.form.CustomerGuarantees.indexOf(item), 1)
      }
    },
    setData () {
      this.form = this.rowData
      this.selectedBranch = this.convertLookupValueToSearchValue(this.rowData.CreditBranch)
      this.form.LeftAmount = this.form.BudgetAmount > 0
        ? (parseFloat(this.form.BudgetAmount) - (this.form.UsedAmount + this.form.ReservedAmount))
        : 0
    },
    successExcelImport (data) {
      this.form.CustomerGuarantees = data
    },
    onRowSelected (items) {
      this.selectedItems = items
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
<style scoped>
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
</style>
