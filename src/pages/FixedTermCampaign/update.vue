<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'FixedTermCampaign' }">
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
            <NextInput type="text" v-model="form.Code" :disabled="!isCampaignDateNew" />
          </NextFormGroup>
           <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.fixedTermCampaign.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="CampaignBeginDate" :error="$v.form.CampaignBeginDate">
              <NextDatePicker v-model="form.CampaignBeginDate" @input="setDisabledValues" />
            </NextFormGroup>
            <NextFormGroup item-key="CampaignEndDate" :error="$v.form.CampaignEndDate">
              <NextDatePicker v-model="form.CampaignEndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="form.UseBudget" type="number" toggle :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <NextInput type="number" v-model="form.BudgetAmount" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="UsedAmount" :error="$v.form.UsedAmount">
              <NextInput type="number" v-model="form.UsedAmount" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown v-model="selectedRouteCriteria" :disabled="true" label="Label" lookup-key="ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="selectedCustomerCriteria"
               :disabled="true"
               label="Label"
               @input="selectedType('CustomerCriteriaId', $event)"
               :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code == 'MK' || c.Code === 'ML' || c.Code === 'TM'): [])"
               />
            </NextFormGroup>
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
              <NextDropdown v-model="selectedItemCriteria" :disabled="true" @input="selectedType('ItemCriteriaId', $event)" :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(i => i.Code != 'UL') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown
                v-model="selectedBranchCriteria"
                @input="selectedType('BranchCriteriaId', $event)"
                lookup-key="BRANCH_CRITERIA"
                label="Label"
                :disabled="true"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="CampaignTypeId" :error="$v.form.CampaignTypeId">
              <NextDropdown
                v-model="discountType"
                :disabled="true"
                @input="selectedSearchType('CampaignTypeId', $event)"
                url="VisionNextDiscount/api/DiscountType/Search"
              ></NextDropdown>
            </NextFormGroup>
             <NextFormGroup item-key="CampaignRate" :error="$v.form.CampaignRate">
              <NextInput type="number" v-model="form.CampaignRate" :disabled="!isCampaignDateNew" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown v-model="selectedCurrency" :disabled="true" @input="selectedSearchType('CurrencyId', $event)" label="Description1" url="VisionNextSystem/api/SysCurrency/Search" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.maturityPeriods')">
          <b-row>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.startQuantity')" :error="$v.fixedTermCampaignTaken.startQuantity" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.startQuantity" :disabled="!isCampaignDateNew" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.endQuantity')" :error="$v.fixedTermCampaignTaken.endQuantity" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.endQuantity" :disabled="!isCampaignDateNew" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fixedTermCampaign.paymentPeriod')" :error="$v.fixedTermCampaignTaken.paymentPeriod" :required="true">
              <NextInput type="number" v-model="fixedTermCampaignTaken.paymentPeriod" :disabled="!isCampaignDateNew" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFixedTermCampaignTaken" :disabled="!isCampaignDateNew"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.startQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.endQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.paymentPeriod')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignTakens" :key="i">
                  <b-td>{{f.StartQuantity}}</b-td>
                  <b-td>{{f.EndQuantity}}</b-td>
                  <b-td>{{f.PaymentPeriod}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeFixedTermCampaignTaken(f)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.discountedItems')" v-if="selectedItemCriteria && selectedItemCriteria.Code === 'UK'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignItems" :key="i">
                  <b-td>{{f.ColumnNameDescription}}</b-td>
                  <b-td>{{f.ColumnValueDescription}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.routes')" v-if="selectedRouteCriteria && selectedRouteCriteria.Code === 'RL'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.route')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignRoutes" :key="i">
                  <b-td>{{f.Description1}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.customerCriterias')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MK'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignCustomerCriterias" :key="i">
                  <b-td>{{f.ColumnNameDescription}}</b-td>
                  <b-td>{{f.ColumnValueDescription}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.customers')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'ML'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.customer')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.customerCode')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.locationId')}}</span></b-th>
                <b-th><span>{{$t('insert.fixedTermCampaign.budget')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignCustomers" :key="i">
                  <b-td>{{f.Customer ? f.Customer.Label : f.CustomerName}}</b-td>
                  <b-td>{{f.Customer ? f.Customer.Code : f.CustomerCode}}</b-td>
                  <b-td>{{f.LocationName}}</b-td>
                  <b-td>{{f.Budget ? f.Budget.Label : f.BudgetName}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.fixedTermCampaign.branchs')" v-if="selectedBranchCriteria && selectedBranchCriteria.Code === 'SL'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.fixedTermCampaign.branch')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in form.FixedTermCampaignBranchs" :key="i">
                  <b-td>{{f.CommercialTitle}}</b-td>
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
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        Code: null,
        Description1: null,
        CampaignBeginDate: null,
        CampaignEndDate: null,
        UseBudget: 0,
        BudgetAmount: null,
        UsedAmount: 0,
        RouteCriteriaId: null,
        CustomerCriteriaId: null,
        ItemCriteriaId: null,
        BranchCriteriaId: null,
        CampaignTypeId: null,
        CampaignRate: null,
        CurrencyId: null,
        FixedTermCampaignItems: [],
        FixedTermCampaignDetails: [],
        FixedTermCampaignTakens: [],
        FixedTermCampaignCustomers: []
      },
      routeName1: 'Discount',
      selectedRouteCriteria: null,
      selectedCustomerCriteria: null,
      selectedBranchCriteria: null,
      selectedItemCriteria: null,
      selectedRoute: null,
      selectedCustomer: null,
      selectedBranch: null,
      customer: null,
      discountType: null,
      customerItemArea: {},
      customerItemValue: {},
      customerItemAreaList: [],
      customerItemValueList: [],
      campaignItemArea: {},
      campaignItemValue: {},
      campaignItemAreaList: [],
      campaignItemValueList: [],
      fixedTermCampaignDetail: {
        tableName: null,
        columnName: null,
        columnValue: null,
        text: null
      },
      fixedTermCampaignTaken: {
        startQuantity: null,
        endQuantity: null,
        paymentPeriod: null
      },
      fixedTermCampaignCustomer: {
        customerId: null,
        customerName: null,
        customerCode: null,
        locationId: null,
        locationName: null,
        budgetId: null,
        budgetName: null
      },
      selectedCurrency: null,
      isCampaignDateNew: false,
      currencies: [],
      companyId: null,
      branchId: null
    }
  },
  computed: {
    ...mapState(['routes', 'branchs', 'customers'])
  },
  mounted () {
    this.companyId = this.$store.state.CompanyId
    this.branchId = this.$store.state.BranchId
    this.getData().then(() => {
      this.setData()
    })
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage () {
      let today = new Date().toISOString().slice(0, 10)
      this.form.CampaignBeginDate = today
      this.form.CampaignEndDate = today
      let me = this
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search ', name: 'routes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBranch/api/Branch/Search', name: 'branchs'})
      me.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
        me.campaignItemAreaList = res.Values
      })
    },
    addFixedTermCampaignTaken () {
      this.$v.fixedTermCampaignTaken.$touch()
      if (this.$v.fixedTermCampaignTaken.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FixedTermCampaignTakens.filter(f => f.StartQuantity === this.fixedTermCampaignTaken.startQuantity &&
      f.EndQuantity === this.fixedTermCampaignTaken.endQuantity &&
      f.PaymentPeriod === this.fixedTermCampaignTaken.paymentPeriod)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.FixedTermCampaignTakens.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        BranchId: parseFloat(this.branchId),
        CampaignId: this.form.RecordId,
        CompanyId: parseFloat(this.companyId),
        StartQuantity: parseFloat(this.fixedTermCampaignTaken.startQuantity),
        EndQuantity: parseFloat(this.fixedTermCampaignTaken.endQuantity),
        PaymentPeriod: parseFloat(this.fixedTermCampaignTaken.paymentPeriod)
      })
      this.fixedTermCampaignTaken = {}
      this.$v.fixedTermCampaignTaken.$reset()
    },
    removeFixedTermCampaignTaken (item) {
      this.form.FixedTermCampaignTakens.splice(this.form.FixedTermCampaignTakens.indexOf(item), 1)
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.selectedRouteCriteria = rowData.RouteCriteria
      this.selectedCustomerCriteria = rowData.CustomerCriteria
      this.selectedItemCriteria = rowData.ItemCriteria
      this.selectedBranchCriteria = rowData.BranchCriteria
      this.discountType = this.convertLookupValueToSearchValue(rowData.CampaignType)
      this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
      this.form.UsedAmount = this.form.UsedAmount ? this.form.UsedAmount : 0
      this.setDisabledValues()
      this.getCampaignCustomersDetail()
    },
    getCampaignCustomersDetail () {
      if (this.form.FixedTermCampaignCustomers && this.form.FixedTermCampaignCustomers.length > 0) {
        let customerIds = this.form.FixedTermCampaignCustomers.map(c => c.CustomerId)
        let me = this
        customerIds.forEach((id) => {
          let request = {
            customerId: id
          }
          me.$api.post(request, 'Budget', 'BudgetMaster/GetCustomerBudget').then((res) => {
            if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
              let customerBudget = res.ListModel.BaseModels[0]
              let selectedCampaignCustomer = me.form.FixedTermCampaignCustomers.find(f => f.CustomerId === id)
              let index = this.form.FixedTermCampaignCustomers.indexOf(selectedCampaignCustomer)
              selectedCampaignCustomer.BudgetId = customerBudget.BudgetId
              selectedCampaignCustomer.BudgetName = customerBudget.CustomerDesc
              me.form.FixedTermCampaignCustomers[index] = selectedCampaignCustomer
              me.$forceUpdate()
            }
          })
        })
        let model = {RecordIds: customerIds}
        me.$api.post({andConditionModel: model}, 'Customer', 'Customer/Search').then((res) => {
          if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
            res.ListModel.BaseModels.forEach(customer => {
              if (customer.DefaultLocation) {
                let selectedCampaignCustomer = me.form.FixedTermCampaignCustomers.find(f => f.CustomerId === customer.RecordId)
                let index = this.form.FixedTermCampaignCustomers.indexOf(selectedCampaignCustomer)
                selectedCampaignCustomer.LocationId = customer.DefaultLocation.DecimalValue
                selectedCampaignCustomer.LocationName = customer.DefaultLocation.Label
                me.form.FixedTermCampaignCustomers[index] = selectedCampaignCustomer
                me.$forceUpdate()
              }
            })
          }
        })
      }
    },
    setDisabledValues (value) {
      let date = value !== undefined ? value : this.form.CampaignBeginDate
      this.isCampaignDateNew = new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
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
        if (this.form.CampaignEndDate < this.form.CampaignBeginDate) {
          this.$toasted.show(this.$t('insert.fixedTermCampaign.startDateLessEndDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.FixedTermCampaignBranchs = this.form.FixedTermCampaignDetails
          .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID').map(a => {
            return {
              BranchId: a.ColumnValue,
              Code: a.code,
              CommercialTitle: a.text,
              RecordState: a.RecordState,
              RecordId: a.RecordId,
              StatusId: a.StatusId
            }
          })
        this.form.FixedTermCampaignRoutes = this.form.FixedTermCampaignDetails
          .filter(f => f.TableName === 'T_ROUTE' && f.ColumnName === 'RECORD_ID').map(a => {
            return {
              RouteId: a.ColumnValue,
              Code: a.code,
              Description1: a.text,
              RecordState: a.RecordState,
              RecordId: a.RecordId,
              StatusId: a.StatusId
            }
          })
        this.form.FixedTermCampaignCustomerCriterias = this.form.FixedTermCampaignDetails
          .filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName !== 'RECORD_ID' && f.ColumnName !== 'BRANCH_ID').map(a => {
            return {
              ColumnName: a.ColumnName,
              ColumnValue: a.ColumnValue,
              ColumnNameDescription: a.ColumnNameStr,
              ColumnValueDescription: a.ColumnValueStr,
              RecordState: a.RecordState,
              RecordId: a.RecordId,
              StatusId: a.StatusId
            }
          })
        this.updateData()
      }
    }
  },
  watch: {
    customer (value) {
      if (value) {
        var me = this
        me.fixedTermCampaignCustomer.customerId = value.RecordId
        me.fixedTermCampaignCustomer.customerName = value.Description1
        me.fixedTermCampaignCustomer.customerCode = value.Code
        let request = {
          customerId: value.RecordId
        }
        me.$api.post(request, 'Budget', 'BudgetMaster/GetCustomerBudget').then((res) => {
          if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
            let customerBudget = res.ListModel.BaseModels[0]
            me.fixedTermCampaignCustomer.budgetId = customerBudget.BudgetId
            me.fixedTermCampaignCustomer.budgetName = customerBudget.CustomerDesc
            me.$forceUpdate()
          }
        })
        me.$api.post({RecordId: value.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          if (res && res.Model) {
            let defaultLocation = res.Model.DefaultLocation
            if (defaultLocation) {
              me.fixedTermCampaignCustomer.locationId = defaultLocation.DecimalValue
              me.fixedTermCampaignCustomer.locationName = defaultLocation.Label
              me.$forceUpdate()
            }
          }
        })
      } else {
        this.fixedTermCampaignCustomer = {}
      }
    },
    customerItemArea (value) {
      this.customerItemValueList = []
      this.customerItemValue = null
      if (value) {
        let me = this
        me.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          me.customerItemValueList = res.Values
          me.$forceUpdate()
        })
      }
    },
    campaignItemArea (value) {
      this.campaignItemValueList = []
      this.campaignItemValue = null
      if (value) {
        let me = this
        me.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          me.campaignItemValueList = res.Values
          me.$forceUpdate()
        })
      }
    }
  },
  validations () {
    if (!this.form.UseBudget) {
      this.insertRules.BudgetAmount = {}
      this.insertRules.CurrencyId = {}
      this.insertRequired.BudgetAmount = false
      this.insertRequired.CurrencyId = false
    } else {
      this.insertRules.BudgetAmount = {
        required
      }
      this.insertRules.CurrencyId = {
        required
      }
      this.insertRequired.BudgetAmount = true
      this.insertRequired.CurrencyId = true
    }
    return {
      form: this.insertRules,
      campaignItemArea: {
        required
      },
      campaignItemValue: {
        required
      },
      customerItemArea: {
        required
      },
      customerItemValue: {
        required
      },
      fixedTermCampaignDetail: {
        tableName: {
          required
        },
        columnName: {
          required
        },
        columnValue: {
          required
        }
      },
      fixedTermCampaignTaken: {
        startQuantity: {
          required
        },
        endQuantity: {
          required
        },
        paymentPeriod: {
          required
        }
      },
      fixedTermCampaignCustomer: {
        customerId: {
          required
        },
        customerCode: {
          required
        },
        locationId: {
          required
        }
      }
    }
  }
}
</script>
