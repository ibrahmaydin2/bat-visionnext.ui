<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Contracts' }">
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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" active>
          <b-row>
            <NextFormGroup item-key="ContractNumber" :error="$v.form.ContractNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.ContractNumber" :readonly="insertReadonly.ContractNumber" />
            </NextFormGroup>
            <!--<NextFormGroup item-key="GroupId" :error="$v.form.GroupId" md="2" lg="2">
              <NextDropdown lookup-key="CONTRACT_GROUP"  @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>-->
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId" md="2" lg="2">
              <NextDropdown lookup-key="CONTRACT_CLASS"  @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId" md="2" lg="2">
              <NextDropdown lookup-key="ITEM_TYPE"  @input="selectedType('BrandId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerFinanceCode" :error="$v.form.CustomerFinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.CustomerFinanceCode" :readonly="insertReadonly.CustomerFinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId" md="2" lg="2">
              <NextDropdown v-model="selectedApproveState" lookup-key="APPROVE_STATE"  @input="selectedType('ApproveStateId', $event)" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId" md="2" lg="2">
              <NextDropdown url="VisionNextContractManagement/api/ContractType/Search" @input="selectedSearchType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="2" lg="2">
              <NextDropdown
                url="VisionNextCustomer/api/Customer/Search"
                @input="selectedCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description,CommercialTitle"/>
            </NextFormGroup>
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
            <NextFormGroup :title="insertTitle.CustomerId" :error="$v.selectedAdditionalCustomer" :required="true" md="3" lg="3">
              <NextDropdown
                url="VisionNextCustomer/api/Customer/Search"
                v-model="selectedAdditionalCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description,CommercialTitle"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addAdditionalCustomer" />
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
                <b-tr v-for="(r, i) in form.ContractRelatedCustomers" :key="i">
                  <b-td>{{r.CustomerName}}</b-td>
                  <b-td class="text-center"><i @click="removeAdditionalCustomer(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.startDate')" :error="$v.validDates.contractStartDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractStartDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" :error="$v.validDates.contractEndDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractValidDates" :key="i">
                  <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                  <b-td class="text-center"><i @click="removeValidDate(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.BenefitTypeId')" :error="$v.contractBenefits.benefitType" :required="true" md="4" lg="4">
               <NextDropdown v-model="contractBenefits.benefitType" url="VisionNextContractManagement/api/ContractBenefitType/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BudgetMasterId')" :error="$v.contractBenefits.budgetMaster" :required="!contractBenefits.benefitType || contractBenefits.benefitType.RecordId !== 4" md="4" lg="4">
              <NextDropdown
                :disabled="contractBenefits.benefitType && contractBenefits.benefitType.RecordId === 4"
                v-model="contractBenefits.budgetMaster"
                url="VisionNextBudget/api/BudgetMaster/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" :error="$v.contractBenefits.currency" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.currency" url="VisionNextSystem/api/SysCurrency/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BenefitBudget')" :error="$v.contractBenefits.benefitBudget" :required="!contractBenefits.benefitType || contractBenefits.benefitType.RecordId !== 4" md="4" lg="4">
              <b-form-input
              :disabled="contractBenefits.benefitType && contractBenefits.benefitType.RecordId === 4"
              type="text" v-model="contractBenefits.benefitBudget" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.TciBreak1Id')" :error="$v.contractBenefits.tciBreak1" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.tciBreak1" lookup-key="TCI_BREAKDOWN" :get-lookup="true"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addContractBenefits" />
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
                <b-th><span>{{$t('insert.contract.TciBreak1Id')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractBenefits" :key="i">
                  <b-td>{{c.BenefitTypeName}}</b-td>
                  <b-td>{{c.BudgetMasterName}}</b-td>
                  <b-td>{{c.CurrencyName}}</b-td>
                  <b-td>{{c.BenefitBudget}}</b-td>
                  <b-td>{{c.TciBreak1Name}}</b-td>
                  <b-td class="text-center"><i @click="removeContractBenefits(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.assets')" v-if="showAssets">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.assetId')" :error="$v.contractAssets.asset" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractAssets.asset" url="VisionNextAsset/api/Asset/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.plannedServiceDate')" :error="$v.contractAssets.plannedServiceDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="contractAssets.plannedServiceDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                 <AddDetailButton @click.native="addContractAssets" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractAssets" :key="i">
                  <b-td>{{c.AssetName}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedServiceDate)}}</b-td>
                  <b-td class="text-center"><i @click="removeContractAssets(c)" class="far fa-trash-alt text-danger"></i></b-td>
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
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
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
        Genexp1: null,
        FinanceCode: null,
        CustomerFinanceCode: null,
        Code: null,
        ContractRelatedCustomers: [],
        ContractValidDates: [],
        ContractBenefits: [],
        ContractAssets: []
      },
      routeName1: 'ContractManagement',
      routeName2: 'Contract',
      contractAssets: {
        asset: null,
        plannedServiceDate: null
      },
      selectedAdditionalCustomer: {},
      validDates: {
        contractStartDate: null,
        contractEndDate: null
      },
      contractBenefits: {
        benefitType: null,
        budgetMaster: null,
        currency: null,
        benefitBudget: null,
        tciBreak1Id: null
      },
      plannedServiceDate: null,
      asset: null,
      selectedApproveState: null,
      showAssets: false
    }
  },
  computed: {
    ...mapState(['customerContracts'])
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
      } else {
        this.createData()
      }
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
    addAdditionalCustomer () {
      this.$v.selectedAdditionalCustomer.$touch()
      if (this.$v.selectedAdditionalCustomer.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.ContractRelatedCustomers.filter(i => i.CustomerId === this.selectedAdditionalCustomer.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.ContractRelatedCustomers.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: this.selectedAdditionalCustomer.RecordId,
        CustomerName: this.selectedAdditionalCustomer.Description1
      })
      this.selectedAdditionalCustomer = undefined
      this.$v.selectedAdditionalCustomer.$reset()
    },
    removeAdditionalCustomer (item) {
      this.form.ContractRelatedCustomers.splice(this.form.ContractRelatedCustomers.indexOf(item), 1)
    },
    addValidDate () {
      this.$v.validDates.$touch()
      if (this.$v.validDates.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let startDate = this.validDates.contractStartDate
      let endDate = this.validDates.contractEndDate
      let filteredArr = this.form.ContractValidDates.filter(i => i.StartDate === startDate &&
      i.EndDate === endDate)
      if (filteredArr.length > 0) {
        this.$toasted.show(this.$t('insert.sameRecordError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      if (startDate > endDate) {
        this.$toasted.show(this.$t('insert.startDateLessEndDate'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractValidDates.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        StartDate: startDate,
        EndDate: endDate
      })
      this.validDates = {}
      this.$v.validDates.$reset()
    },
    removeValidDate (item) {
      this.form.ContractValidDates.splice(this.form.ContractValidDates.indexOf(item), 1)
    },
    addContractBenefits () {
      this.$v.contractBenefits.$touch()
      if (this.$v.contractBenefits.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractBenefits.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        BenefitTypeId: this.contractBenefits.benefitType.RecordId,
        BenefitTypeName: this.contractBenefits.benefitType.Description1,
        BenefitBudget: this.contractBenefits.benefitBudget,
        BudgetMasterId: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.RecordId : undefined,
        BudgetMasterName: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.Description1 : '',
        CurrencyId: this.contractBenefits.currency.RecordId,
        CurrencyName: this.contractBenefits.currency.Description1,
        TciBreak1Id: this.contractBenefits.tciBreak1.DecimalValue,
        TciBreak1Name: this.contractBenefits.tciBreak1.Label,
        usedAmount: 0
      })
      this.contractBenefits = {}
      this.$v.contractBenefits.$reset()
      this.showAssets = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 4).length > 0
      this.$forceUpdate()
    },
    removeContractBenefits (item) {
      this.form.ContractBenefits.splice(this.form.ContractBenefits.indexOf(item), 1)
      this.showAssets = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 4).length > 0
      this.$forceUpdate()
    },
    addContractAssets () {
      this.$v.contractAssets.$touch()
      if (this.$v.contractAssets.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractAssets.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        AssetId: this.contractAssets.asset.RecordId,
        AssetName: this.contractAssets.asset.Description1,
        PlannedServiceDate: this.contractAssets.plannedServiceDate
      })
      this.contractAssets = {}
      this.$v.contractAssets.$reset()
    },
    removeContractAssets (item) {
      this.form.ContractAssets.splice(this.form.ContractAssets.indexOf(item), 1)
    }
  },
  validations () {
    let contractBenefits = {
      benefitType: {
        required
      },
      budgetMaster: { },
      currency: {
        required
      },
      benefitBudget: {},
      tciBreak1: {
        required
      }
    }
    if (this.contractBenefits.benefitType && this.contractBenefits.benefitType.RecordId !== 4) {
      contractBenefits.budgetMaster = {
        required
      }
      contractBenefits.benefitBudget = {
        required
      }
    }
    return {
      form: this.insertRules,
      selectedAdditionalCustomer: {
        required
      },
      validDates: {
        contractStartDate: {
          required
        },
        contractEndDate: {
          required
        }
      },
      contractBenefits: contractBenefits,
      contractAssets: {
        asset: {
          required
        },
        plannedServiceDate: {
          required
        }
      }
    }
  },
  watch: {
    lookup (e) {
      if (e) {
        if (e.APPROVE_STATE) {
          e.APPROVE_STATE.map(item => {
            if (item.DecimalValue === 2110) {
              this.selectedType('ApproveStateId', item)
              this.selectedApproveState = item
            }
          })
        }
      }
    }
  }
}
</script>
