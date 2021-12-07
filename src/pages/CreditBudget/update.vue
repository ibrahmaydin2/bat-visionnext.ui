<template>
  <b-row class="asc__insertPage">
    <CreditBudgetExcelModal @success="successExcelImport"></CreditBudgetExcelModal>
    <CreditBudgetBulkApproveModal :modalAction="{Title: $t('insert.creditBudget.bulkCustomerApprove')}" :items="selectedItems" @success="successBulkApprove" />
    <UpdateCreditBudgetModal :modalAction="{Title: $t('insert.creditBudget.updateBudget')}" :modalItem="form" @success="successUpdatedBudget"/>
    <b-modal id="update-budget-confirm-modal">
      <template #modal-title>
        {{$t('insert.creditBudget.doYouApprove')}}
      </template>
      {{$t('insert.creditBudget.updateBudgetConfirmMessage')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('update-budget-confirm-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="updateBudget()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal id="credit-budget-confirm-edit-modal">
      <template #modal-title>
        {{$t('list.editConfirm')}}
      </template>
      {{$t('list.rowEditConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('credit-budget-confirm-edit-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="editCustomerGuarantee()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal id="credit-budget-confirm-delete-modal">
      <template #modal-title>
        {{$t('list.deleteConfirm')}}
      </template>
      {{$t('list.rowDeleteConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('credit-budget-confirm-delete-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="removeCustomerGuarantee()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
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
          <b-col md="4" lg="6">
            <b-button v-b-modal.update-budget-confirm-modal size="sm" variant="success" class="mt-3 float-right">{{$t('insert.creditBudget.updateBudget')}}</b-button>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.creditBudget.title')" active>
          <b-row>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <b-form-datepicker v-model="form.BeginDate" :placeholder="$t('insert.chooseDate')" disabled />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <b-form-datepicker v-model="form.EndDate" :placeholder="$t('insert.chooseDate')" disabled />
            </NextFormGroup>
            <NextFormGroup item-key="CreditBranchId" :error="$v.form.CreditBranchId">
              <NextDropdown v-model="selectedBranch" url="VisionNextBranch/api/Branch/AutoCompleteSearch" @input="selectedSearchType('CreditBranchId', $event)" disabled searchable />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input type="number" v-model="form.BudgetAmount" :readonly="true" @input="changedBudgetAmount" />
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
              <b-form-input type="text" v-model="customerGuarantees.Amount" />
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
             <b-col cols="12" md="2" v-if="selectedItems.length > 0">
              <b-form-group>
                <b-button class="mt-4" size="sm" variant="success" v-b-modal.credit-budget-bulk-approve-modal><i class="fas fa-check"/> {{$t('insert.creditBudget.bulkCustomerApprove')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <NextFormGroup :title="$t('insert.creditBudget.customer')" md="4" lg="4">
              <NextDropdown
                v-model="filterCustomer"
                url="VisionNextCustomer/api/Customer/GetBranchesCustomerSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :dynamic-and-condition="{BranchIds: [form.CreditBranchId]}"
                :is-customer="true"
                :disabled="importedExcel"/>
            </NextFormGroup>
            <b-table
              :items="(CustomerGuarantees ? CustomerGuarantees.filter(c => c.RecordState !== 4) : [])"
              :fields="customerGuaranteeFields"
              striped
              small
              sticky-header="300px"
              responsive
              select-mode="multi"
              selectable
              bordered
              @row-selected="onRowSelected"
              :current-page="currentPage"
              :per-page="0"
            >
              <template #cell(selection)="row">
                <span>
                  <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
                </span>
              </template>
              <template #cell(operations)="row">
                <b-button :title="$t('list.edit')" @click="$bvModal.show('credit-budget-confirm-edit-modal'); selectedCustomerGuarantee = row.item;" class="btn mr-2 btn-warning btn-sm">
                  <i class="fa fa-pencil-alt"></i>
                </b-button>
                <b-button :title="$t('list.delete')" @click="$bvModal.show('credit-budget-confirm-delete-modal'); selectedCustomerGuarantee = row.item;" type="button" class="btn mr-2 btn-danger btn-sm">
                  <i class="far fa-trash-alt ml-1"></i>
                </b-button>
              </template>
            </b-table>
            <b-pagination
              :total-rows="totalRowCount"
              v-model="currentPage"
              :per-page="100"
              aria-controls="customer-guarantees"
            ></b-pagination>
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
        CreditBudgetDetails: []
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
      CustomerGuarantees: [],
      selectedCustomer: {},
      selectedBranch: null,
      paymentPeriod: null,
      selectedItems: [],
      customerGuaranteeFields: [
        {key: 'selection', label: '', sortable: false},
        {key: 'AppStatus', label: this.$t('insert.creditBudget.status'), sortable: false},
        {
          key: 'CustomerDesc',
          label: this.$t('insert.creditBudget.customer'),
          sortable: false,
          formatter (value, key, obj) {
            return `${obj.CustomerCode} - ${obj.CustomerDesc}`
          }
        },
        {key: 'CreditLimit', label: this.$t('insert.creditBudget.creditLimit'), sortable: false},
        {key: 'RiskLimit', label: this.$t('insert.creditBudget.riskLimit'), sortable: false},
        {key: 'CurrentCredit', label: this.$t('insert.creditBudget.currentCredit'), sortable: false},
        {key: 'CurrentRisk', label: this.$t('insert.creditBudget.currentRisk'), sortable: false},
        {key: 'CreditAccountRemainder', label: this.$t('insert.creditBudget.creditAccountRemainder'), sortable: false},
        {key: 'DebitAccountRemainder', label: this.$t('insert.creditBudget.debitAccountRemainder'), sortable: false},
        {key: 'CreditAmount', label: this.$t('insert.creditBudget.creditAmountCentral'), sortable: false},
        {key: 'Amount', label: this.$t('insert.creditBudget.amount'), sortable: false},
        {
          key: 'PaymentPeriod',
          label: this.$t('insert.creditBudget.paymentPeriod'),
          sortable: false,
          formatter (value, key, obj) {
            return obj.paymentPeriodO ? obj.paymentPeriodO.Description1 : '-'
          }},
        {key: 'operations', label: this.$t('list.operations'), sortable: false}
      ],
      selectedIndex: 0,
      paymentPeriods: [],
      selectedCustomerGuarantee: null,
      currentPage: 1,
      totalRowCount: 0,
      filterCustomer: null,
      insertedDetails: [],
      updatedDetails: [],
      importedExcel: false
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
    this.getCreditBudgetDetails()
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
        let list = [...this.insertedDetails, ...this.updatedDetails]
        this.form.CreditBudgetDetails = list.map((item) => {
          item.PaymentPeriod = item.paymentPeriodO ? item.paymentPeriodO.Period : null
          let creditBudgetDetail = {
            CreditBudgetId: item.CreditBudgetId,
            ApprovestateId: item.ApproveStateId,
            Amount: item.Amount,
            CustomerId: item.CustomerId,
            CustomerCreditHistoryId: item.CustomerCreditHistoryId,
            PaymentPeriod: item.PaymentPeriod,
            RecordState: item.RecordState === 4 ? 4 : item.RecordId > 0 ? 3 : 2,
            StatusId: 1,
            Deleted: 0,
            System: 0,
            RecordId: item.RecordId,
            CustomerGuarantees: item
          }

          return creditBudgetDetail
        })
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
        this.customerGuarantees.CustomerCode = customer.Code
        this.customerGuarantees.CustomerDesc = customer.Description
        this.$api.getByUrl(`VisionNextBudget/api/CreditBudget/GetCustomerInfo?customerId=${customer.RecordId}`).then((res) => {
          if (res) {
            this.customerGuarantees = res
            this.customerGuarantees.PaymentPeriod = null
            this.customerGuarantees.Amount = null
            this.paymentPeriod = null
            this.customerGuarantees.CreditAmountCentral = res.CreditAmount
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
    async addCustomerGuarantee () {
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
      if (!this.customerGuarantees.isUpdated) {
        let request = {
          andConditionModel: {
            CreditBudgetIds: [this.form.RecordId],
            CustomerIds: [this.customerGuarantees.CustomerId]
          },
          page: this.currentPage,
          OrderByColumns: [
            {
              column: 'ApprovestateId',
              'orderByType': 0
            }
          ]
        }
        let filteredList = await this.$api.postByUrl(request, 'VisionNextBudget/api/CreditBudgetDetail/Search')

        if (this.CustomerGuarantees.some(c => c.CustomerId === this.customerGuarantees.CustomerId && c.RecordState !== 4) || (filteredList && filteredList.ListModel && filteredList.ListModel.BaseModels.length > 0)) {
          this.$toasted.show(this.$t('insert.creditBudget.sameRecordException'), { type: 'error', keepOnHover: true, duration: '3000' })
          return false
        }
      }
      if (this.customerGuarantees.ApproveStateId === 53 || this.customerGuarantees.ApproveStateId === 52) {
        this.customerGuarantees.ApproveStateId = 51
        this.customerGuarantees.AppStatus = this.$t('insert.creditBudget.waitingApproval')
      }
      this.customerGuarantees.paymentPeriodO = this.paymentPeriod
      if (this.customerGuarantees.isUpdated) {
        this.CustomerGuarantees[this.selectedIndex] = this.customerGuarantees
        this.selectedIndex = null

        let filteredList = this.updatedDetails.filter(u => u.CustomerId === this.customerGuarantees.CustomerId)
        if (filteredList.length > 0) {
          this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])] = this.customerGuarantees
        } else {
          let data = {...this.customerGuarantees}
          this.updatedDetails.push(data)
        }
      } else {
        this.customerGuarantees.CreditBudgetId = this.form.RecordId
        this.CustomerGuarantees.unshift(this.customerGuarantees)
        let filteredList = this.insertedDetails.filter(u => u.CustomerId === this.customerGuarantees.CustomerId)
        if (filteredList.length > 0) {
          this.insertedDetails[this.insertedDetails.indexOf(filteredList[0])] = this.customerGuarantees
        } else {
          let data = {...this.customerGuarantees}
          this.insertedDetails.push(data)
        }
        this.push(this.customerGuarantees)
      }
      this.customerGuarantees = {}
      this.selectedCustomer = null
      this.paymentPeriod = null
      this.$v.customerGuarantees.$reset()
    },
    removeCustomerGuarantee () {
      if (this.selectedCustomerGuarantee.ApproveStateId !== 51 && this.selectedCustomerGuarantee.ApproveStateId !== 53) {
        this.$toasted.show(this.$t('insert.aprroveNotDeleted'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } if (this.selectedCustomerGuarantee.ApproveStateId === 51 || this.selectedCustomerGuarantee.CreditAmountCentral > 0) {
        this.$toasted.show(this.$t('insert.notDeleted'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        if (this.selectedCustomerGuarantee.RecordId > 0) {
          this.CustomerGuarantees[this.CustomerGuarantees.indexOf(this.selectedCustomerGuarantee)].RecordState = 4
        } else {
          this.CustomerGuarantees.splice(this.CustomerGuarantees.indexOf(this.selectedCustomerGuarantee), 1)
        }
        let filteredList = this.updatedDetails.filter(u => u.CustomerId === this.selectedCustomerGuarantee.CustomerId)
        if (filteredList.length > 0) {
          this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])].RecordState = 4
        } else {
          let data = {...this.selectedCustomerGuarantee}
          data.RecordState = 4
          this.updatedDetails.push(data)
        }
      }
      // if (this.customerGuarantees.ApproveStateId === 51) {
      //   this.$toasted.show(this.$t('insert.aprroveNotDeleted'), {
      //     type: 'error',
      //     keepOnHover: true,
      //     duration: '3000'
      //   })
      // }
      this.selectedCustomerGuarantee = null
      this.$bvModal.hide('credit-budget-confirm-delete-modal')
      this.$forceUpdate()
    },
    editCustomerGuarantee () {
      this.customerGuarantees = {...this.selectedCustomerGuarantee}
      this.selectedIndex = this.CustomerGuarantees.indexOf(this.selectedCustomerGuarantee)
      this.selectedCustomer = null
      this.paymentPeriod = null
      this.customerGuarantees.isUpdated = true
      if (this.selectedCustomerGuarantee.RecordId > 0) {
        this.customerGuarantees.RecordState = 3
      }
      this.customerGuarantees.CreditAmountCentral = this.selectedCustomerGuarantee.CreditAmount
      this.paymentPeriod = this.getPaymentPeriodById(this.selectedCustomerGuarantee.PaymentPeriod)
      this.selectedCustomer = {
        RecordId: this.selectedCustomerGuarantee.CustomerId,
        Description1: this.selectedCustomerGuarantee.CustomerDesc,
        Code: this.selectedCustomerGuarantee.CustomerCode
      }
      this.selectedCustomerGuarantee = null
      this.$bvModal.hide('credit-budget-confirm-edit-modal')
    },
    setData () {
      this.form = this.rowData
      this.selectedBranch = this.convertLookupValueToSearchValue(this.rowData.CreditBranch)
      this.form.LeftAmount = this.form.BudgetAmount > 0
        ? (parseFloat(this.form.BudgetAmount) - (this.form.UsedAmount + this.form.ReservedAmount))
        : 0
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
          obj.ApproveStateId = 51
          obj.AppStatus = this.$t('insert.creditBudget.waitingApproval')
          if (obj.Period) {
            obj.PaymentPeriod = obj.Period
          }
          obj.paymentPeriodO = this.getPaymentPeriodById(obj.Period)
          obj.CreditBudgetId = this.form.RecordId
          list.push(obj)
        })
        this.CustomerGuarantees = [...list]
        this.insertedDetails = [...list]
        this.totalRowCount = list.length
        this.importedExcel = true
        this.filterCustomer = null
      }
    },
    onRowSelected (items) {
      this.selectedItems = items
    },
    setPaymentPeriods (value) {
      this.paymentPeriods = value
    },
    getPaymentPeriodById (paymentPeriod) {
      let paymentPeriods = this.paymentPeriods.filter(p => p.Period === paymentPeriod)
      if (paymentPeriods.length > 0) {
        return paymentPeriods.length > 0 ? paymentPeriods[0] : { RecordId: paymentPeriod }
      }
    },
    updateBudget () {
      this.$bvModal.hide('update-budget-confirm-modal')
      this.$bvModal.show('update-credit-budget-modal')
    },
    successUpdatedBudget () {
      this.getData().then(() => { this.setData() })
    },
    getCreditBudgetDetails () {
      let request = {
        andConditionModel: {
          CreditBudgetIds: [this.$route.params.url],
          CustomerIds: this.filterCustomer ? [this.filterCustomer.RecordId] : null
        },
        page: this.currentPage,
        OrderByColumns: [
          {
            column: 'ApprovestateId',
            'orderByType': 0
          }
        ]
      }
      this.$api.postByUrl(request, 'VisionNextBudget/api/CreditBudgetDetail/Search', 100).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          let responseList = response.ListModel.BaseModels
            .filter(c => c.CustomerGuarantees !== null && c.CustomerGuarantees !== undefined)
            .map(item => {
              let customerGuarantees = item.CustomerGuarantees
              customerGuarantees.RecordId = item.RecordId
              customerGuarantees.CreditBudgetId = item.CreditBudgetId
              customerGuarantees.paymentPeriodO = this.getPaymentPeriodById(item.PaymentPeriod)
              return customerGuarantees
            })
          if (this.currentPage === 1) {
            this.CustomerGuarantees = [...this.insertedDetails, ...responseList]
          } else {
            this.CustomerGuarantees = responseList
          }
        }
      })
    },
    successBulkApprove () {
      this.currentPage = 1
      this.getCreditBudgetDetails()
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
  },
  watch: {
    currentPage () {
      if (!this.importedExcel) {
        this.getCreditBudgetDetails()
      }
    },
    filterCustomer () {
      if (!this.importedExcel) {
        this.currentPage = 1
        this.getCreditBudgetDetails()
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
