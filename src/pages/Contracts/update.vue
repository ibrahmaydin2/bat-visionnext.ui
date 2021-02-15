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
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.ContractNumber != null ? insertVisible.ContractNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ContractNumber + (insertRequired.ContractNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ContractNumber.$error }">
                <b-form-input type="text" v-model="form.ContractNumber" :readonly="insertReadonly.ContractNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  :options="lookup.CONTRACT_GROUP"
                  @input="selectedType('GroupId', $event)"
                  label="Label"
                  v-model="Group"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ClassId != null ? insertVisible.ClassId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClassId + (insertRequired.ClassId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassId.$error }">
                  <v-select
                    :options="lookup.CONTRACT_CLASS"
                    @input="selectedType('ClassId', $event)"
                    label="Label"
                    v-model="Class"
                  />
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.BrandId != null ? insertVisible.BrandId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BrandId + (insertRequired.BrandId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BrandId.$error }">
                <v-select
                  :options="lookup.ITEM_TYPE"
                  @input="selectedType('BrandId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.GenExp != null ? insertVisible.GenExp : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GenExp + (insertRequired.GenExp === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GenExp.$error }">
                <b-form-input type="text" v-model="form.GenExp" :readonly="insertReadonly.GenExp" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerFinanceCode != null ? insertVisible.CustomerFinanceCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerFinanceCode + (insertRequired.CustomerFinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerFinanceCode.$error }">
                <b-form-input type="text" v-model="form.CustomerFinanceCode" :readonly="insertReadonly.CustomerFinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveStateId != null ? insertVisible.ApproveStateId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ApproveStateId + (insertRequired.ApproveStateId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ApproveStateId.$error }">
                <v-select
                  :options="lookup.APPROVE_STATE"
                  @input="selectedType('ApproveStateId', $event)"
                  label="Label"
                  disabled
                  v-model="ApproveStateLabel"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TypeId + (insertRequired.TypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                <v-select v-model="Type" :options="contractTypes" @input="selectedSearchType('TypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select v-model="Customer" label="CommercialTitle" :filterable="false" :options="customerList" @search="onCustomerSearch" @input="selectedCustomer">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.CommercialTitle }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.otherContract')" v-if="customerContracts.length > 0">
          <b-row>
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th>{{$t('insert.contract.Code')}}</b-th>
                  <b-th>{{$t('insert.contract.ContractNumber')}}</b-th>
                  <b-th>{{$t('insert.contract.Description1')}}</b-th>
                  <b-th>{{$t('insert.contract.ApproveState')}}</b-th>
                  <b-th>{{$t('insert.contract.StatusReason')}}</b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(contract, i) in customerContracts" :key="'dl' + i">
                    <b-td>{{contract.Code}}</b-td>
                    <b-td>{{contract.ContractNumber}}</b-td>
                    <b-td>{{contract.Description1}}</b-td>
                    <b-td>{{contract.ApproveState ? contract.ApproveState.Label : ''}}</b-td>
                    <b-td>{{contract.StatusReason ? contract.StatusReason.Label : ''}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.additionalCustomer')">
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group :label="insertTitle.CustomerId">
                <v-select label="CommercialTitle" :filterable="false" :options="customerList" @search="onCustomerSearch" @input="selectedAdditionalCustomer">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.CommercialTitle }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addAdditionalCustomer()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.customer')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in contractRelatedCustomers" :key="i">
                  <b-td>{{r.CommercialTitle}}</b-td>
                  <b-td class="text-center"><i @click="removeAdditionalCustomer(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.startDate')">
                <b-form-datepicker v-model="contractStartDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.endDate')">
                <b-form-datepicker v-model="contractEndDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addValidDate()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            {{form.ContractValidDates}}
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in contractValidDates" :key="i">
                  <b-td>{{r.startDate}}</b-td>
                  <b-td>{{r.endDate}}</b-td>
                  <b-td class="text-center"><i @click="removeValidDate(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.BenefitTypeId')">
                <v-select :options="benefitTypes" @input="selectedSearchTypeDetail('BenefitType', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.BudgetMasterId')">
                <v-select :disabled="disableBenefit" :options="budgets" @input="selectedSearchTypeDetail('BudgetMaster', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.currency')">
                <v-select :options="currency" @input="selectedSearchTypeDetail('Currency', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.BenefitBudget')">
                <b-form-input :readonly="disableBenefit" type="text" v-model="BenefitBudget" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.TciBreak1Id')">
                <v-select :options="tciBreak1" @input="selectedType('TciBreak1Id', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addContractBenefits()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.BenefitTypeId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.BenefitBudget')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in contractBenefits" :key="i">
                  <b-td>{{r.BenefitType}}</b-td>
                  <b-td>{{r.BudgetMaster}}</b-td>
                  <b-td>{{r.Currency}}</b-td>
                  <b-td>{{r.BenefitBudget}}</b-td>
                  <b-td class="text-center"><i @click="removeContractBenefits(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.assets')">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.assetId')">
                <v-select :options="assets" @input="selectedSearchTypeDetail('asset', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.contract.plannedServiceDate')">
                <b-form-datepicker v-model="plannedServiceDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addContractAssets()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in contractAssets" :key="i">
                  <b-td>{{r.Asset}}</b-td>
                  <b-td>{{r.PlannedServiceDate}}</b-td>
                  <b-td class="text-center"><i @click="removeContractAssets(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
        ApproveStateId: null,
        ContractNumber: null,
        GroupId: null,
        Description1: null,
        TypeId: null,
        ClassId: null,
        CustomerId: null,
        BrandId: null,
        StatusId: null,
        GenExp: null,
        FinanceCode: null,
        CustomerFinanceCode: null,
        Code: null,
        ContractRelatedCustomers: [],
        ContractValidDates: [],
        ContractBenefits: [],
        ContractAssets: []
      },
      routeName: this.$route.meta.baseLink,
      contractRelatedCustomers: [],
      contractValidDates: [],
      contractBenefits: [],
      contractAssets: [],
      tmpContractRelatedCustomers: [],
      contractStartDate: null,
      contractEndDate: null,
      BenefitType: null,
      BudgetMaster: null,
      Currency: null,
      BenefitBudget: null,
      TciBreak1Id: null,
      plannedServiceDate: null,
      asset: null,
      ApproveStateLabel: null,
      Group: null,
      Type: null,
      Class: null,
      Customer: null,
      detailPanelRecordId: 0,
      RecordId: null,
      Deleted: 0,
      disableBenefit: false
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'rowData', 'contractTypes', 'customerList', 'customerContracts', 'currency', 'benefitTypes', 'budgets', 'tciBreak1', 'assets'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: 'Contracts'})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextContractManagement/api/Contract/GetCode`})
      this.$store.dispatch('getLookups', {...this.query, type: 'TCI_BREAKDOWN', name: 'tciBreak1'})
      this.$store.dispatch('getData', {...this.query, api: `VisionNextContractManagement/api/Contract`, record: this.$route.params.url})

      // Search
      this.$store.dispatch('getContractTypes')
      this.$store.dispatch('getCurrency')
      this.$store.dispatch('getBenefitTypes')
      this.$store.dispatch('getBudgets')
      this.$store.dispatch('getAssets')
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
    },
    save () {
      // this.$store.dispatch('createData', {...this.query, api: `VisionNextContractManagement/api/${this.routeName}`, formdata: this.form, return: this.routeName})
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
      } else {
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextContractManagement/api/Contract`, formdata: model, return: this.routeName})
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    selectedSearchTypeDetail (label, model) {
      if (model) {
        if (label === 'BenefitType' && model.RecordId === 4) {
          this.disableBenefit = true
        } else {
          this.disableBenefit = false
        }
        this[label] = model
      } else {
        this[label] = null
      }
    },
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        this.searchCustomer(loading, search, this)
      }
    },
    searchCustomer (loading, search, vm) {
      this.$store.dispatch('acCustomer', {...this.query, searchField: 'CommercialTitle', searchText: search})
    },
    selectedCustomer (e) {
      if (e) {
        this.form.CustomerId = e.RecordId
        this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextContractManagement/api/Contract/Search', name: 'customerContracts', andConditionModel: { customerIds: [e.RecordId] }})
      } else {
        this.form.CustomerId = null
        this.$store.commit('setCustomerContracts', [])
      }
    },
    selectedAdditionalCustomer (e) {
      if (e) {
        this.tmpContractRelatedCustomers = e
      } else {
        this.tmpContractRelatedCustomers = null
      }
    },
    addAdditionalCustomer () {
      this.form.ContractRelatedCustomers.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: this.tmpContractRelatedCustomers.RecordId
      })
      this.contractRelatedCustomers.push(this.tmpContractRelatedCustomers)
    },
    removeAdditionalCustomer (item) {
      // Model içerisindeki ContractRelatedCustomers dizisinden elemanın çıkarılması
      let filteredArr = this.form.ContractRelatedCustomers.filter(i => i.CustomerId === item.RecordId)
      this.form.ContractRelatedCustomers.splice(this.form.ContractRelatedCustomers.indexOf(filteredArr[0]), 1)

      // Tabloda listenen ContractRelatedCustomers dizisinden elemanın çıkarılması
      this.contractRelatedCustomers.splice(this.contractRelatedCustomers.indexOf(item), 1)
    },
    addValidDate () {
      if (!this.contractStartDate || !this.contractEndDate) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.contract.validRequiredDates') })
        return
      }
      this.detailPanelRecordId++
      this.form.ContractValidDates.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        StartDate: this.dateConvertToISo(this.contractStartDate),
        EndDate: this.dateConvertToISo(this.contractEndDate),
        RecordId: this.detailPanelRecordId
      })
      this.contractValidDates.push({
        startDate: this.contractStartDate,
        endDate: this.contractEndDate,
        RecordId: this.detailPanelRecordId
      })
    },
    removeValidDate (item) {
      // Model içerisindeki ContractValidDates dizisinden elemanın çıkarılması
      let filteredArr = this.form.ContractValidDates.filter(i => i.RecordId === item.RecordId)
      this.form.ContractValidDates.splice(this.form.ContractValidDates.indexOf(filteredArr[0]), 1)
      // Tabloda listenen ContractValidDates dizisinden elemanın çıkarılması
      this.contractValidDates.splice(this.contractValidDates.indexOf(item), 1)
    },
    addContractBenefits () {
      this.detailPanelRecordId++
      this.form.ContractBenefits.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        BenefitTypeId: this.BenefitType ? this.BenefitType.RecordId : null,
        BenefitBudget: this.BenefitBudget,
        BudgetMasterId: this.BudgetMaster ? this.BudgetMaster.RecordId : null,
        CurrencyId: this.Currency ? this.Currency.RecordId : null,
        TciBreak1Id: this.form.TciBreak1Id,
        usedAmount: 0,
        RecordId: this.detailPanelRecordId
      })
      this.contractBenefits.push({
        BenefitType: this.BenefitType ? this.BenefitType.Description1 : '',
        BenefitBudget: this.BenefitBudget,
        BudgetMaster: this.BudgetMaster ? this.BudgetMaster.Description1 : '',
        Currency: this.Currency ? this.Currency.Description1 : '',
        TciBreak1Id: this.form.TciBreak1Id,
        RecordId: this.detailPanelRecordId
      })
    },
    removeContractBenefits (item) {
      // Model içerisindeki ContractBenefits dizisinden elemanın çıkarılması
      let filteredArr = this.form.ContractBenefits.filter(i => i.RecordId === item.RecordId)
      this.form.ContractBenefits.splice(this.form.ContractBenefits.indexOf(filteredArr[0]), 1)
      // Tabloda listenen ContractBenefits dizisinden elemanın çıkarılması
      this.contractBenefits.splice(this.contractBenefits.indexOf(item), 1)
    },
    addContractAssets () {
      this.detailPanelRecordId++
      this.form.ContractAssets.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        AssetId: this.asset ? this.asset.RecordId : null,
        PlannedServiceDate: this.plannedServiceDate,
        RecordId: this.detailPanelRecordId
      })
      this.contractAssets.push({
        Asset: this.asset ? this.asset.Description1 : '',
        PlannedServiceDate: this.plannedServiceDate,
        AssetId: this.asset ? this.asset.RecordId : null,
        RecordId: this.detailPanelRecordId
      })
    },
    removeContractAssets (item) {
      // Model içerisindeki ContractAssets dizisinden elemanın çıkarılması
      let filteredArr = this.form.ContractAssets.filter(i => i.RecordId === item.RecordId)
      this.form.ContractAssets.splice(this.form.ContractAssets.indexOf(filteredArr[0]), 1)
      // Tabloda listenen ContractAssets dizisinden elemanın çıkarılması
      this.contractAssets.splice(this.contractAssets.indexOf(item), 1)
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    lookup (e) {
      if (e) {
        if (e.APPROVE_STATE) {
          e.APPROVE_STATE.map(item => {
            if (item.DecimalValue === 2110) {
              this.selectedType('ApproveStateId', item)
              this.ApproveStateLabel = item.Label
            }
          })
        }
      }
    },
    rowData (e) {
      if (e) {
        this.form = {
          ApproveStateId: e.ApproveStateId,
          ContractNumber: e.ContractNumber,
          GroupId: e.GroupId,
          Description1: e.Description1,
          TypeId: e.TypeId,
          ClassId: e.ClassId,
          CustomerId: e.CustomerId,
          // BrandId: e.BrandId,
          StatusId: this.numberConvertToString(e.StatusId),
          // GenExp: e.GenExp,
          FinanceCode: e.FinanceCode,
          // CustomerFinanceCode: e.CustomerFinanceCode,
          Code: e.Code,
          ContractRelatedCustomers: [],
          ContractValidDates: [],
          ContractBenefits: [],
          ContractAssets: [],
          RecordId: e.RecordId,
          Deleted: 0
        }
        if (e.ContractRelatedCustomers) {
          e.ContractRelatedCustomers.map(item => {
            this.form.ContractRelatedCustomers.push({
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              StatusId: item.StatusId,
              CustomerId: item.CustomerId
            })
            this.contractRelatedCustomers.push({
              CommercialTitle: item.Customer ? item.Customer.Label : '',
              RecordId: item.CustomerId
            })
          })
        }
        if (e.ContractValidDates) {
          e.ContractValidDates.map(item => {
            this.form.ContractValidDates.push({
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              StatusId: item.StatusId,
              StartDate: item.StartDate,
              EndDate: item.EndDate,
              RecordId: item.RecordId
            })
            this.contractValidDates.push({
              startDate: this.dateConvertFromTimezone(item.StartDate),
              endDate: this.dateConvertFromTimezone(item.EndDate),
              RecordId: item.RecordId
            })
          })
        }

        if (e.ContractBenefits) {
          e.ContractBenefits.map(item => {
            this.form.ContractBenefits.push({
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              StatusId: item.StatusId,
              BenefitTypeId: item.BenefitTypeId,
              BenefitBudget: item.BenefitBudget,
              BudgetMasterId: item.BudgetMasterId,
              CurrencyId: item.CurrencyId,
              TciBreak1Id: item.TciBreak1Id,
              usedAmount: item.UsedAmount,
              RecordId: item.RecordId
            })
            this.contractBenefits.push({
              BenefitType: item.BenefitType ? item.BenefitType.Label : '',
              BenefitBudget: item.BenefitBudget,
              BudgetMaster: item.BudgetMaster ? item.BudgetMaster.Label : '',
              Currency: item.Currency ? item.Currency.Label : '',
              TciBreak1Id: item.TciBreak1Id,
              RecordId: item.RecordId
            })
          })
        }
        if (e.ContractAssets) {
          e.ContractAssets.map(item => {
            this.form.ContractAssets.push({
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              StatusId: item.StatusId,
              AssetId: item.AssetId,
              PlannedServiceDate: item.PlannedServiceDate,
              RecordId: item.RecordId
            })
            this.contractAssets.push({
              Asset: item.Asset ? item.Asset.Description1 : '',
              PlannedServiceDate: this.dateConvertFromTimezone(item.PlannedServiceDate),
              AssetId: item.AssetId,
              RecordId: item.RecordId
            })
          })
        }
        if (e.Group) {
          this.Group = e.Group.Label
        }
        if (e.Type) {
          this.Type = e.Type.Label
        }
        if (e.Class) {
          this.Class = e.Class.Label
        }
        if (e.Customer) {
          this.Customer = e.Customer.Label
        }
      }
    }
  }
}
</script>
<style lang="sass">
</style>
