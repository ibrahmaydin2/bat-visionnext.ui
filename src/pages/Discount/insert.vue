<template>
  <b-row class="asc__insertPage">
    <b-modal id="confirm-modal">
      <template #modal-title>
        {{$t('insert.order.doYouConfirm')}}
      </template>
      {{$t('insert.discount.listWillBeDeleted')}}
      <template #modal-footer>
        <CancelButton class="float-right ml-2" @click.native="cancelSelectedItems" />
        <b-button size="sm" class="float-right ml-2" variant="success" @click="confirmSelectedItems">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal id="confirm-branch-modal" no-close-on-backdrop hide-header-close>
      <template #modal-title>
        {{$t('insert.order.doYouConfirm')}}
      </template>
      {{$t('insert.discount.customersAndRoutesWillBeDeleted')}}
      <template #modal-footer>
        <CancelButton class="float-right ml-2" @click.native="cancelSelectBranchCriteria" />
        <b-button size="sm" class="float-right ml-2" variant="success" @click="confirmSelectBranchCriteria">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Discount' }">
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
        <NextFormGroup item-key="Code" :error="$v.form.Code" lg="2">
          <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
        </NextFormGroup>
        <NextFormGroup item-key="Description1" :error="$v.form.Description1" lg="2">
          <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
        </NextFormGroup>
        <NextFormGroup item-key="DiscountBeginDate" :error="$v.form.DiscountBeginDate" lg="2">
          <NextDatePicker v-model="form.DiscountBeginDate" :disabled="insertReadonly.DiscountBeginDate" />
        </NextFormGroup>
        <NextFormGroup item-key="DiscountEndDate" :error="$v.form.DiscountEndDate" lg="2">
          <NextDatePicker v-model="form.DiscountEndDate" :disabled="insertReadonly.DiscountEndDate"/>
        </NextFormGroup>
        <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" lg="2">
          <NextCheckBox v-model="form.StatusId" type="number" toggle/>
        </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.discount.general')" active>
          <b-row>
            <NextFormGroup item-key="DiscountTypeId" :error="$v.form.DiscountTypeId">
              <NextDropdown
                v-model="selectedDiscountType"
                @input="selectedSearchType('DiscountTypeId', $event)"
                url="VisionNextDiscount/api/DiscountType/Search"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountKindId" :error="$v.form.DiscountKindId">
              <NextDropdown
                v-model="selectedDiscountKind"
                @input="selectedSearchType('DiscountKindId', $event)"
                url="VisionNextDiscount/api/DiscountKind/Search"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
              <NextInput type="text" v-model="form.MaxValue" :disabled='form.ApplyToTimes !== 1' />
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown
                v-model="branchCriteria"
                @input="selectedType('BranchCriteriaId', $event); setBranchCriteria($event)"
                lookup-key="BRANCH_CRITERIA"
                :disabled="distributionTypeControl"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown
                v-model="customerCriteria"
                @input="selectedType('CustomerCriteriaId', $event)"
                lookup-key="CUSTOMER_CRITERIA"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown
                v-model="routeCriteria"
                @input="selectedType('RouteCriteriaId', $event)"
                lookup-key="ROUTE_CRITERIA"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentCriteriaId" :error="$v.form.PaymentCriteriaId">
              <NextDropdown
                v-model="paymentCriteria"
                @input="selectedType('PaymentCriteriaId', $event)"
                lookup-key="PAYMENT_CRITERIA"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput type="text" v-model="form.FinanceCode" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetId" :error="$v.form.BudgetId">
              <NextDropdown
                v-model="budget"
                @input="selectedSearchType('BudgetId', $event)"
                url="VisionNextBudget/api/BudgetMaster/Search"
                :disabled="!form.UseBudget"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <NextInput :disabled="!form.UseBudget" type="text" v-model="form.BudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <NextInput type="text" v-model="ApproveStateLabel" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountCategoryId" :error="$v.form.DiscountCategoryId">
              <NextDropdown
                v-model="discountCategory"
                @input="selectedSearchType('DiscountCategoryId', $event)"
                url="VisionNextDiscount/api/DiscountCategory/Search"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="BranchSharePercent" :error="$v.form.BranchSharePercent">
              <NextInput type="number" v-model="form.BranchSharePercent" :disabled="distributionTypeControl" maxLength="6" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="MaxUsage" :error="$v.form.MaxUsage">
              <NextInput type="text" v-model="form.MaxUsage" :disabled="insertReadonly.MaxUsage" />
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <NextDropdown
                v-model="tciBreak1"
                @input="selectedType('TciBreak1Id', $event)"
                lookup-key="TCI_BREAKDOWN"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="form.UseBudget" type="number" toggle @input="useBudgetEvent($event)" :disabled="insertReadonly.UseBudget"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsCascade" :error="$v.form.IsCascade">
              <NextCheckBox v-model="form.IsCascade" type="number" toggle :disabled="insertReadonly.IsCascade" />
            </NextFormGroup>
            <NextFormGroup item-key="UseMultiGiven" :error="$v.form.UseMultiGiven">
              <NextCheckBox v-model="form.UseMultiGiven" type="number" toggle :disabled="insertReadonly.UseMultiGiven" />
            </NextFormGroup>
            <NextFormGroup item-key="IsMandatory" :error="$v.form.IsMandatory">
              <NextCheckBox v-model="form.IsMandatory" type="number" toggle :disabled="insertReadonly.IsMandatory" />
            </NextFormGroup>
            <NextFormGroup item-key="IsDoubleScore" :error="$v.form.IsDoubleScore">
              <NextCheckBox v-model="form.IsDoubleScore" type="number" toggle :disabled="insertReadonly.IsDoubleScore" />
            </NextFormGroup>
            <NextFormGroup item-key="ApplyToTimes" :error="$v.form.ApplyToTimes" md="4" lg="3">
              <NextCheckBox v-model="form.ApplyToTimes" type="number" toggle :disabled="insertReadonly.ApplyToTimes" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.discountTakens')">
          <NextDetailPanel v-model="form.DiscountTakens" :items="discountTakenItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.discountGivens')" :disabled="form.DiscountKindId === 6">
          <NextDetailPanel v-model="form.DiscountGivens" :items="discountGivenItems" :main-form="form" :show-edit="false" :before-add="beforeAddDiscountGivens"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.discountExcludedCustomers')">
          <NextDetailPanel v-model="form.DiscountExcludedCustomers" :items="discountExcludedCustomerItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.customerCriterias')" v-if="customerCriterTabValid">
          <NextDetailPanel v-model="customerCriterias" :items="discountDetailsCustomerCriteriaItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.branchs')" v-if="branchTabValid">
          <NextDetailPanel v-model="form.branchs" :items="discountDetailsBranchItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.discountCustomers')" :disabled="!form.BranchCriteriaId" v-if="customerTabValid" @click="DiscountCustomersValid()">
          <NextDetailPanel v-model="customers" :items="getDiscountCustomerItems()" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.routes')" :disabled="!form.BranchCriteriaId" v-if="routeTabValid">
          <NextDetailPanel v-model="routes" :items="discountDetailsRouteItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.payments')" :disabled="!form.BranchCriteriaId" v-if="paymentTabValid">
          <NextDetailPanel v-model="paymentTypes" :items="discountDetailsPaymentTypeItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.discount.discountCustomerSqls')" v-if="customerSqlsTabValid">
          <NextDetailPanel v-model="form.DiscountCustomerSqls" :items="discountCustomerSqlItems" :main-form="form" :show-edit="false"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import { required } from 'vuelidate/lib/validators'
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
        DiscountBeginDate: null,
        DiscountEndDate: null,
        DiscountTypeId: null,
        DiscountKindId: null,
        ApplyToTimes: 0,
        MaxValue: null,
        BranchCriteriaId: null,
        CustomerCriteriaId: null,
        RouteCriteriaId: null,
        PaymentCriteriaId: null,
        Genexp1: null,
        IsContractDiscount: null,
        FinanceCode: null,
        UseBudget: 0,
        BudgetId: null,
        BudgetAmount: null,
        BudgetConsumption: 0,
        ApproveStateId: 2102,
        DiscountCategoryId: null,
        BranchSharePercent: 0,
        MaxUsage: null,
        IsCascade: 0,
        UseMultiGiven: 0,
        IsMandatory: 0,
        IsDoubleScore: 0,
        TciBreak1Id: null,
        RepresentativeId: null,
        PriorityLevel: null,
        PopulatedCustomerCount: null,
        DiscountGivens: [],
        DiscountTakens: [],
        DiscountCustomers: [],
        DiscountExcludedCustomers: [],
        DiscountDetails: [],
        DiscountCustomerSqls: [],
        branchs: []
      },
      ApproveStateLabel: null,
      branchCriteria: null,
      customerCriteria: null,
      routeCriteria: null,
      paymentCriteria: null,
      customerTabValid: false,
      branchTabValid: false,
      routeTabValid: false,
      paymentTabValid: false,
      customerSqlsTabValid: false,
      customerCriterTabValid: false,
      customerValid: false,
      selectedDiscountType: null,
      selectedDiscountKind: null,
      currentDiscountType: null,
      currentInvoiceKind: null,
      cancelledSelection: false,
      discountKindFirstSet: true,
      discountTypeFirstSet: true,
      watchType: 0,
      distributionTypeControl: false,
      budget: null,
      discountCategory: null,
      tciBreak1: null,
      discountTakenItems: detailData.discountTakenItems,
      discountGivenItems: detailData.discountGivenItems,
      discountExcludedCustomerItems: detailData.discountExcludedCustomerItems,
      discountDetailsCustomerCriteriaItems: detailData.discountDetailsCustomerCriteriaItems,
      discountDetailsRouteItems: detailData.discountDetailsRouteItems,
      discountDetailsPaymentTypeItems: detailData.discountDetailsPaymentTypeItems,
      discountCustomerSqlItems: detailData.discountCustomerSqlItems,
      discountDetailsBranchItems: detailData.discountDetailsBranchItems,
      customers: [],
      customerCriterias: [],
      routes: [],
      paymentTypes: [],
      allBranchCriterias: []
    }
  },
  mounted () {
    this.createManualCode()
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      let today = this.dateConvertToISo(new Date())
      this.form.DiscountBeginDate = today
      this.form.DiscountEndDate = today
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label === 'DiscountKindId' && model.RecordId !== 2) {
          this.form.IsCascade = 0
          this.form.UseMultiGiven = 0
        }
        this.form[label] = model.RecordId
      } else {
        if (label === 'DiscountKindId') {
          this.discountGiven.ColumnName = null
          this.discountGiven.ColumnValue = null
          this.form.IsCascade = 0
          this.form.UseMultiGiven = 0
          this.initFalseValid()
        }
        this.form[label] = null
      }
    },
    DiscountCustomersValid () {
      if (this.form.BranchCriteriaId === 31) {
        this.customerValid = false
        return
      }
      if (this.form.BranchCriteriaId === 30 && this.form.branchs.length === 0) {
        this.$toasted.show(this.$t('insert.discount.requiredBranchCriteria'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        this.customers = []
        this.form.DiscountExcludedCustomers = []
        this.form.branchs = []
        this.customerValid = true
      } else {
        this.customerValid = false
      }
    },
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
        this.form.DiscountDetails = [...this.customers, ...this.customerCriterias, ...this.form.branchs, ...this.routes, ...this.paymentTypes]
        this.createData()
      }
    },
    useBudgetEvent (e) {
      if (e) {
        this.form.ApproveStateId = 2100
        this.lookup.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2100) {
            this.ApproveStateLabel = item.Label
          }
        })
      } else {
        this.form.ApproveStateId = 2102
        this.lookup.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2102) {
            this.ApproveStateLabel = item.Label
          }
        })
        this.form.BudgetAmount = null
        this.budget = null
        this.form.BudgetId = null
      }
    },
    confirmSelectedItems () {
      this.$bvModal.hide('confirm-modal')
      this.form.DiscountGivens = []
      this.form.DiscountTakens = []
    },
    cancelSelectedItems () {
      this.$bvModal.hide('confirm-modal')
      this.cancelledSelection = true
      if (this.watchType === 1) {
        this.selectedDiscountType = this.currentDiscountType
        this.form.DiscountTypeId = this.currentDiscountType ? this.currentDiscountType.RecordId : null
      }
      if (this.watchType === 2) {
        this.selectedDiscountKind = this.currentDiscountKind
        this.form.DiscountKindId = this.currentDiscountKind ? this.currentDiscountKind.RecordId : null
      }
    },
    confirmSelectBranchCriteria () {
      this.$bvModal.hide('confirm-branch-modal')
      this.customers = this.customers.filter(c => c.RecordId > 0).map(c => {
        c.RecordState = 4
        return c
      })
      this.routes = this.routes.filter(r => r.RecordId > 0).map(r => {
        r.RecordState = 4
        return r
      })
    },
    cancelSelectBranchCriteria () {
      this.$bvModal.hide('confirm-branch-modal')
      this.form.BranchCriteriaId = 31
      this.branchCriteria = this.allBranchCriterias.find(b => b.DecimalValue === 31)
    },
    setBranchCriteria (model) {
      if (model && model.Code === 'SL' && (this.customers.filter(c => c.RecordId > 0).length > 0 || this.routes.filter(c => c.RecordId > 0).length > 0)) {
        this.$bvModal.show('confirm-branch-modal')
      }
    },
    beforeAddDiscountGivens () {
      if (this.form.DiscountTypeId == null || this.form.DiscountKindId == null) {
        this.$toasted.show(this.$t('insert.discount.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return false
      }
      return true
    },
    getDiscountCustomerItems () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'ColumnValue',
          objectKey: 'ColumnNameDesc',
          labelProperty: 'Code',
          customOption: true,
          isCustomer: true,
          orConditionFields: 'Code,Description1',
          url: 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch',
          label: this.$t('insert.discount.customerCode'),
          dynamicAndCondition: {
            BranchIds: this.getBranchIds()
          },
          disabled (form, mainForm) {
            return !mainForm.BranchCriteriaId || (mainForm.BranchCriteriaId === 30 && mainForm.branchs.filter(a => a.RecordState !== 4).length === 0)
          },
          required: true,
          visible: true,
          isUnique: true,
          id: 1
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'CommercialTitle',
          objectKey: 'ColumnValueDesc',
          parentProperty: 'Description1',
          label: this.$t('insert.discount.customerName'),
          visible: true,
          disabled: true,
          parentId: 1,
          id: 2
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'Location',
          valueProperty: 'AddressDetail',
          objectKey: 'ColumnValueDesc2',
          parentProperty: 'DefaultLocationId',
          url: 'VisionNextCustomer/api/CustomerLocation/Get',
          label: this.$t('insert.discount.location'),
          visible: true,
          disabled: true,
          parentId: 1,
          id: 3
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          parentId: null,
          id: 4
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          parentId: null,
          id: 5
        }
      ]
    },
    getBranchIds () {
      let branchs = this.form.branchs.filter(a => a.RecordState !== 4)
      return this.form.BranchCriteriaId === 30 && branchs.length > 0 ? branchs.map(a => a.ColumnValue) : null
    }
  },
  watch: {
    lookup (e) {
      if (e.APPROVE_STATE) {
        e.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2102) {
            this.selectedType('ApproveStateId', item)
            this.ApproveStateLabel = item.Label
          }
        })
      }
      if (e.BRANCH_CRITERIA) {
        this.allBranchCriterias = e.BRANCH_CRITERIA
        let request = {
          RecordId: this.$store.state.BranchId
        }
        this.$api.postByUrl(request, 'VisionNextBranch/api/Branch/Get').then(response => {
          if (response && response.Model) {
            let branch = response.Model
            if (branch.DistributionTypeId === 6) {
              this.distributionTypeControl = true
              this.form.BranchSharePercent = 100
              e.BRANCH_CRITERIA.map(item => {
                if (item.DecimalValue === 30) {
                  this.branchCriteria = item
                  this.selectedType('BranchCriteriaId', item)
                }
              })
            }
          }
        })
      }
    },
    branchCriteria (e) {
      if (e !== null && (e.DecimalValue === 30)) {
        this.branchTabValid = true
      } else {
        this.branchTabValid = false
      }
    },
    customerCriteria (e) {
      this.customerCriterTabValid = false
      this.customerTabValid = false
      this.customerSqlsTabValid = false
      if (e !== null && e.DecimalValue === 21) {
        this.customerCriterTabValid = true
      } else if (e !== null && e.DecimalValue === 22) {
        this.customerTabValid = true
      } else if (e !== null && e.DecimalValue === 29) {
        this.customerSqlsTabValid = true
      }
    },
    routeCriteria (e) {
      if (e !== null && (e.DecimalValue === 33)) {
        this.routeTabValid = true
      } else {
        this.routeTabValid = false
      }
    },
    paymentCriteria (e) {
      if (e !== null && (e.DecimalValue === 36)) {
        this.paymentTabValid = true
      } else {
        this.paymentTabValid = false
      }
    },
    selectedDiscountType (newValue, oldValue) {
      if (this.discountTypeFirstSet) {
        this.confirmSelectedItems()
        this.discountTypeFirstSet = false
        return
      }
      if (newValue !== oldValue && !this.cancelledSelection) {
        this.currentDiscountType = oldValue
        this.$bvModal.show('confirm-modal')
        this.watchType = 1
      }
      this.cancelledSelection = false
    },
    selectedDiscountKind (newValue, oldValue) {
      if (this.discountKindFirstSet) {
        this.confirmSelectedItems()
        this.discountKindFirstSet = false
        return
      }
      if (newValue !== oldValue && !this.cancelledSelection) {
        this.currentDiscountKind = oldValue
        this.$bvModal.show('confirm-modal')
        this.watchType = 2
      }
      this.cancelledSelection = false
    }
  },
  validations () {
    let validation = {}
    if (this.form.ApplyToTimes === 1) {
      this.insertRequired.MaxValue = true
      this.insertRules.MaxValue = {
        required
      }
    } else {
      this.insertRules.MaxValue = {}
      this.insertRequired.MaxValue = false
    }
    if (this.form.UseBudget === 1) {
      this.insertRequired.BudgetId = true
      this.insertRequired.BudgetAmount = true
      this.insertRules.BudgetId = {
        required
      }
      this.insertRules.BudgetAmount = {
        required
      }
    } else {
      this.insertRules.BudgetId = {}
      this.insertRequired.BudgetId = false
      this.insertRules.BudgetAmount = {}
      this.insertRequired.BudgetAmount = false
    }
    this.insertRules.ApproveStateId = {}
    this.insertRequired.ApproveStateId = false

    validation.form = this.insertRules
    return {
      ...validation
    }
  }
}
</script>
