<template>
  <b-row class="asc__insertPage">
    <b-modal id="customer-operation-modal" size="lg" hide-footer :title="$t('insert.loyalty.customerBulkOperations')">
      <MultipleCustomerOperations v-model="customers" />
    </b-modal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Loyalty' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs v-model="activeTabIndex">
        <b-tab :title="$t('insert.loyalty.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria" :disabled="insertReadonly.CustomerCriteriaId" @input="selectedType('CustomerCriteriaId', $event)" lookup-key="CUSTOMER_CRITERIA"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="branchCriteria" :disabled="insertReadonly.BranchCriteriaId" @input="selectedType('BranchCriteriaId', $event)" lookup-key="BRANCH_CRITERIA"/>
            </NextFormGroup>
            <NextFormGroup item-key="ApplicationTypeId" :error="$v.form.ApplicationTypeId">
              <NextDropdown :disabled="insertReadonly.ApplicationTypeId" @input="selectedType('ApplicationTypeId', $event)" lookup-key="LOYALTY_APPLICATION_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown :disabled="insertReadonly.GroupId" @input="selectedType('GroupId', $event)" lookup-key="LOYALTY_GROUP" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown :disabled="insertReadonly.TypeId" @input="selectedType('TypeId', $event)" lookup-key="LOYALTY_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="LoyaltyBeginDate" :error="$v.form.LoyaltyBeginDate">
              <NextDatePicker v-model="form.LoyaltyBeginDate" :disabled="insertReadonly.LoyaltyBeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="LoyaltyEndDate" :error="$v.form.LoyaltyEndDate">
              <NextDatePicker v-model="form.LoyaltyEndDate" :disabled="insertReadonly.LoyaltyEndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="TCIBreak1Id" :error="$v.form.TCIBreak1Id">
              <NextDropdown :disabled="insertReadonly.TCIBreak1Id" @input="selectedType('TCIBreak1Id', $event)" lookup-key="TCI_BREAKDOWN"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown :disabled="insertReadonly.ClassId" @input="selectedType('ClassId', $event)" lookup-key="LOYALTY_CLASS"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown :disabled="insertReadonly.KindId" @input="selectedType('KindId', $event)" lookup-key="LOYALTY_KIND"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.loyaltyCatalogue')" v-if="showDetails" :disabled="this.form.TypeId === null">
          <NextDetailPanel v-model="form.LoyaltyCatalogues" :items="loyaltyCatalogueItems" :before-add="beforeValidItemsAdd"/>
        </b-tab>
        <b-tab :title="$t('insert.loyalty.pointCriterias')" @click="setDatePlanType">
          <b-row>
            <NextFormGroup :title="$t('insert.loyalty.categoryDefinition')" :error="$v.loyaltyActiveCategory.loyaltyCategory" :required="true">
              <NextDropdown v-model="loyaltyActiveCategory.loyaltyCategory" url="VisionNextLoyalty/api/LoyaltyCategory/Search"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loyalty.datePlanType')" :error="$v.loyaltyActiveCategory.datePlanType" :required="true">
              <NextDropdown :disabled="disabledDatePlanType" v-model="loyaltyActiveCategory.datePlanType" lookup-key="DATE_PLAN_TYPE" get-lookup @input="selectDatePlanType"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loyalty.datePlanFreq')" :error="$v.loyaltyActiveCategory.datePlanFreq" :required="loyaltyActiveCategory.datePlanType && loyaltyActiveCategory.datePlanType.Code !== 'ST'">
              <NextInput type="number" v-model="loyaltyActiveCategory.datePlanFreq" :disabled="loyaltyActiveCategory.datePlanType && loyaltyActiveCategory.datePlanType.Code === 'ST'"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loyalty.customerCriteria')" :error="$v.loyaltyActiveCategory.customerCriteria" :required="true">
              <NextDropdown v-model="loyaltyActiveCategory.customerCriteria" :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code !== 'ML') : [])" label="Label"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loyalty.description')" :error="$v.loyaltyActiveCategory.description" :required="true">
              <NextInput type="text" v-model="loyaltyActiveCategory.description"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addLoyaltyActiveCategory" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="loyaltyActiveCategoryFields"
              :items="this.form.LoyaltyActiveCategories ? this.form.LoyaltyActiveCategories.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="row">
                <div class="text-center">
                  <b-button size="sm" @click="removeLoyaltyActiveCategory(row.item)" class="mr-2" variant="danger">
                    <i class="far fa-trash-alt"></i> {{$t('insert.loyalty.delete')}}
                  </b-button>
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success"
                    v-if="(row.item.CustomerCriteria && row.item.CustomerCriteria.Code !== 'TM')
                      || (row.item.CustomerCriteriaIdCode !== 'TM')
                      || (row.item.DatePlanType && row.item.DatePlanType.Code === 'ST')
                      || (row.item.DatePlanTypeIdCode === 'ST')">
                    <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyalty.details')}}
                  </b-button>
                </div>
              </template>
              <template #row-details="{item, index}">
                <div class="p-4 mt-2 nested-detail-panel" v-if="(item.CustomerCriteria && item.CustomerCriteria.Code === 'MK') || (item.CustomerCriteriaIdCode === 'MK')">
                  <h3>{{$t('insert.loyalty.customerCriteria')}}</h3>
                  <NextDetailPanel v-model="form.LoyaltyActiveCategories[index].LoyaltyActiveCtCrits" :items="loyaltyActiveCtCritItems" />
                </div>
                <div class="p-4 mt-2 nested-detail-panel" v-if="(item.CustomerCriteria && item.CustomerCriteria.Code === 'MS') || (item.CustomerCriteriaIdCode === 'MS')">
                  <h3>{{$t('insert.loyalty.customerQuery')}}</h3>
                  <NextDetailPanel v-model="form.LoyaltyActiveCategories[index].LoyaltyActiveCtSqls" :items="loyaltyActiveCtSqlItems" />
                </div>
                <div class="p-4 mt-2 nested-detail-panel" v-if="(item.DatePlanType && item.DatePlanType.Code === 'ST') || (item.DatePlanTypeIdCode === 'ST')">
                  <h3>{{$t('insert.loyalty.constantDates')}}</h3>
                  <NextDetailPanel v-model="form.LoyaltyActiveCategories[index].LoyaltyActiveCtDates" :items="loyaltyActiveCtDateItems" />
                </div>
              </template>
            </b-table>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.branchs')" v-if="branchCriteria && branchCriteria.Code === 'SL'">
          <NextDetailPanel v-model="branchs" :items="loyaltyBranchItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customers')" @click.prevent="customersTabClicked" v-if="customerCriteria && customerCriteria.Code === 'ML'">
          <b-row>
            <b-col cols="12" md="12">
              <b-form-group class="text-right">
                <b-button v-b-modal.customer-operation-modal class="mt-1" size="sm" variant="success"><i class="fa fa-list"></i> {{$t('insert.loyalty.customerBulkOperations')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <NextDetailPanel v-model="customers" :items="getLoyaltyCustomerItems()" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customerCriterias')" v-if="customerCriteria && customerCriteria.Code === 'MK'">
          <NextDetailPanel v-model="customerCriterias" :items="loyaltyCustomerCriteriaItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyalty.customerQuery')" v-if="customerCriteria && customerCriteria.Code === 'MS'">
          <NextDetailPanel v-model="form.LoyaltyCustomerSqls" :items="loyaltyCustomerSqlItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import { required, requiredIf } from 'vuelidate/lib/validators'
import MultipleCustomerOperations from './MultipleCustomerOperations'
export default {
  mixins: [insertMixin],
  components: {
    MultipleCustomerOperations
  },
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        CompanyId: null,
        BranchId: null,
        CustomerCriteriaId: null,
        BranchCriteriaId: null,
        ApplicationTypeId: null,
        GroupId: null,
        TypeId: null,
        LoyaltyBeginDate: null,
        LoyaltyEndDate: null,
        FinanceCode: null,
        Genexp1: null,
        TCIBreak1Id: null,
        ClassId: null,
        KindId: null,
        LoyaltyActiveCategories: [],
        LoyaltyCustomers: [],
        LoyaltyCustomerSqls: []
      },
      showDetails: false,
      customerCriteria: null,
      branchCriteria: null,
      loyaltyCatalogueItems: detailData.loyaltyCatalogueItems,
      loyaltyBranchItems: detailData.loyaltyBranchItems,
      loyaltyCustomerCriteriaItems: detailData.loyaltyCustomerCriteriaItems,
      loyaltyCustomerSqlItems: detailData.loyaltyCustomerSqlItems,
      loyaltyActiveCategoryFields: detailData.loyaltyActiveCategoryFields,
      loyaltyActiveCtCritItems: detailData.loyaltyActiveCtCritItems,
      loyaltyActiveCtSqlItems: detailData.loyaltyActiveCtSqlItems,
      loyaltyActiveCtDateItems: detailData.loyaltyActiveCtDateItems,
      customers: [],
      branchs: [],
      customerCriterias: [],
      loyaltyActiveCategory: {},
      disabledDatePlanType: false,
      activeTabIndex: 0
    }
  },
  mounted () {
    this.createManualCode().then(() => {
      this.showDetails = true
    })
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
        this.form.LoyaltyCustomers = [...this.customers, ...this.branchs, ...this.customerCriterias]
        this.createData()
      }
    },
    beforeValidItemsAdd (item, list) {
      let filteredList = list.filter(l =>
        (l.IsDiscount <= item.IsDiscount && item.IsDiscount <= l.IsDiscount) ||
        (l.IsFreeItem <= item.IsFreeItem && item.IsFreeItem <= l.IsFreeItem) ||
        (item.IsFreeItem <= l.IsFreeItem && l.IsFreeItem <= item.IsFreeItem) ||
        (item.IsDiscount <= l.IsDiscount && l.IsDiscount <= item.IsDiscount))

      if (filteredList && filteredList.length > 0 && item.IsDiscount) {
        this.$toasted.show(this.$t('insert.loyalty.sameDiscountError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (filteredList && filteredList.length > 0 && item.IsFreeItem) {
        this.$toasted.show(this.$t('insert.loyalty.sameIsFreeError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      return true
    },
    addLoyaltyActiveCategory () {
      this.$v.loyaltyActiveCategory.$touch()
      if (this.$v.loyaltyActiveCategory.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.LoyaltyActiveCategories.filter(i => i.LoyaltyCategoryId === this.loyaltyActiveCategory.loyaltyCategory.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.loyalty.sameCategoryError') })
        return false
      }

      this.form.LoyaltyActiveCategories.push({
        LoyaltyCategoryId: this.loyaltyActiveCategory.loyaltyCategory.RecordId,
        LoyaltyCategoryIdDesc: this.loyaltyActiveCategory.loyaltyCategory.Description1,
        LoyaltyCategoryIdCode: this.loyaltyActiveCategory.loyaltyCategory.Code,
        DatePlanTypeId: this.loyaltyActiveCategory.datePlanType.DecimalValue,
        DatePlanTypeIdDesc: this.loyaltyActiveCategory.datePlanType.Label,
        DatePlanTypeIdCode: this.loyaltyActiveCategory.datePlanType.Code,
        DatePlanFreq: this.loyaltyActiveCategory.datePlanFreq,
        CustomerCriteriaId: this.loyaltyActiveCategory.customerCriteria.DecimalValue,
        CustomerCriteriaIdDesc: this.loyaltyActiveCategory.customerCriteria.Label,
        CustomerCriteriaIdCode: this.loyaltyActiveCategory.customerCriteria.Code,
        Genexp1: this.loyaltyActiveCategory.description
      })
      this.setDatePlanType()
      this.loyaltyActiveCategory = {}
      this.$v.loyaltyActiveCategory.$reset()
    },
    removeLoyaltyActiveCategory (item) {
      if (item.RecordId) {
        this.form.LoyaltyActiveCategories[this.form.LoyaltyActiveCategories.indexOf(item)].RecordState = 4
      } else {
        this.form.LoyaltyActiveCategories.splice(this.form.LoyaltyActiveCategories.indexOf(item), 1)
      }
      this.setDatePlanType()
    },
    selectDatePlanType (datePlanType) {
      if (datePlanType && datePlanType.Code === 'ST') {
        this.loyaltyActiveCategory.datePlanFreq = null
        this.$forceUpdate()
      }
    },
    setDatePlanType () {
      if ((!this.form.LoyaltyActiveCategories || this.form.LoyaltyActiveCategories.filter(i => i.RecordState !== 4).length === 0) && this.form.ApplicationTypeId === 654) {
        this.loyaltyActiveCategory.datePlanType = {
          Code: 'ST',
          Label: this.$t('insert.loyalty.everyFreq'),
          Value: '252',
          DecimalValue: 252
        }
        this.disabledDatePlanType = true
      } else {
        this.disabledDatePlanType = false
      }
    },
    customersTabClicked () {
      if (!this.branchCriteria) {
        this.$toasted.show(this.$t('insert.loyalty.pleaseFirstSelectBranchCriteria'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        setTimeout(() => {
          this.activeTabIndex = 0
        }, 1)
      } else if (this.branchCriteria.Code === 'SL' && this.branchs.length === 0) {
        this.$toasted.show(this.$t('insert.loyalty.pleaseFirstSelectBranch'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        setTimeout(() => {
          this.activeTabIndex = 3
        }, 1)
      }
    },
    getLoyaltyCustomerItems () {
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
          label: this.$t('insert.loyalty.customerCode'),
          dynamicAndCondition: this.branchs.length > 0 ? { BranchIds: this.branchs.map(b => b.ColumnValue) } : {},
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
          label: this.$t('insert.loyalty.customerName'),
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
          label: this.$t('insert.customerSItemCriteria.location'),
          visible: true,
          disabled: true,
          parentId: 1,
          id: 3
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          id: 4
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          id: 5
        }
      ]
    }
  },
  validations () {
    return {
      form: this.insertRules,
      loyaltyActiveCategory: {
        loyaltyCategory: {
          required
        },
        datePlanType: {
          required
        },
        datePlanFreq: {
          required: requiredIf(function () {
            return this.loyaltyActiveCategory.datePlanType && this.loyaltyActiveCategory.datePlanType.Code !== 'ST'
          })
        },
        customerCriteria: {
          required
        },
        description: {
          required
        }
      }
    }
  }
}
</script>
<style lang="sass">
  .nested-detail-panel
    background-color: #e4e4e4
    border-radius: 15px
  .nested-detail-panel
      th
        border-color: #b7b4b4 !important
      td
        border-color: #b7b4b4 !important
</style>
