<template>
  <b-row class="asc__insertPage">
    <CustomerTargetExcelModal @success="successExcelImportCustomerTarget"></CustomerTargetExcelModal>
    <b-modal id="credit-budget-confirm-delete-modal">
      <template #modal-title>
        {{$t('list.deleteConfirm')}}
      </template>
      {{$t('list.rowDeleteConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('credit-budget-confirm-delete-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="removeContractItems()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal id="credit-budget-confirm-edit-modal">
      <template #modal-title>
        {{$t('list.editConfirm')}}
      </template>
      {{$t('list.rowEditConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('credit-budget-confirm-edit-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="editInvoiceLine()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'CustomerTarget' }">
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
          <NextFormGroup item-key="ErpCode" :error="$v.form.ErpCode">
            <NextInput v-model="form.ErpCode" type="text" :disabled="insertReadonly.ErpCode" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
            <NextDropdown v-model="tciBreak" :disabled="insertReadonly.TciBreak1Id" @input="selectedType('TciBreak1Id', $event)" lookup-key="TCI_BREAKDOWN"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnName" :error="$v.form.ItemColumnName">
            <NextDropdown
              :disabled="insertReadonly.ItemColumnName"
              v-model="itemColumnName"
              :source="itemCriterias"
              :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
              @input="selectColumnName($event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnValue" :error="$v.form.ItemColumnValue">
            <NextDropdown v-model="itemColumnValue"
              :disabled="insertReadonly.ItemColumnValue"
              :source="fieldValues" label="Label"
              @input="selectedType($event)"
            />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDetails')">
          <b-row>
            <NextFormGroup :title="$t('insert.CustomerTarget.CustomerId')" :error="$v.customerTargetDetails.customer" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="customerTargetDetails.customer"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1] }"
                label="Description1"
                :searchable="true"
                :custom-option="true"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.TargetQuantity')" :error="$v.customerTargetDetails.targetQuantity" :required="true" md="3" lg="3">
              <NextInput
                v-model="customerTargetDetails.targetQuantity"
                type="number"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.TargetUnitId')" :error="$v.customerTargetDetails.targetUnit" md="3" lg="3">
              <NextDropdown :disabled="true" :source="lookupValues" label="Label" v-model="customerTargetDetails.targetUnit" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.ReqItemId')" :error="$v.customerTargetDetails.reqItem" :required="!(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount)" md="3" lg="3">
              <NextDropdown v-model="customerTargetDetails.reqItem" :dynamic-and-condition="{ StatusIds: [1] }" url="/VisionNextItem/api/Item/AutocompleteSearch" :searchable="true" :source="items" orConditionFields="Code,Description1" :custom-option="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.ReqItemQuantity')" :error="$v.customerTargetDetails.reqItemQuantity" :required="!(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount)" md="3" lg="3">
              <NextInput type="number" v-model="customerTargetDetails.reqItemQuantity"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.DescriptionReqItem')" :error="$v.customerTargetDetails.descriptionReqItem" :required="!(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount)" md="3" lg="3">
              <NextInput type="text" v-model="customerTargetDetails.descriptionReqItem"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.GainAmount')" :error="$v.customerTargetDetails.gainAmount" :required="true" md="3" lg="3">
              <NextInput type="number" v-model="customerTargetDetails.gainAmount"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.currencyId')" :error="$v.customerTargetDetails.currency" :required="true" md="3" lg="3">
              <NextDropdown :disabled="true" v-model="customerTargetDetails.currency" :source="currencies" />
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                 <AddDetailButton @click.native="addCustomerGuarantee" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group>
                <b-button class="mt-4" size="sm" variant="success" v-b-modal.customer-target-excel-modal><i class="fas fa-file-pdf"/> {{$t('insert.creditBudget.uploadExcel')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :items="(CustomerTarget ? CustomerTarget.filter(c => c.RecordState !== 4) : [])"
              :fields="customerGuaranteeFields"
              striped
              small
              sticky-header="300px"
              responsive
              select-mode="multi"
              selectable
              bordered
              :current-page="currentPage"
              :per-page="0"
            >
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="row">
                <b-button :title="$t('list.edit')" @click="$bvModal.show('credit-budget-confirm-edit-modal'); selectedCustomerTarget = row.item;" class="btn mr-2 btn-warning btn-sm">
                  <i class="fa fa-pencil-alt"></i>
                </b-button>
                <b-button :title="$t('list.delete')" @click="$bvModal.show('credit-budget-confirm-delete-modal'); selectedCustomerTarget = row.item;" type="button" class="btn mr-2 btn-danger btn-sm">
                  <i class="far fa-trash-alt ml-1"></i>
                </b-button>
              </template>
            </b-table>
            <b-pagination
              :total-rows="totalRowCount"
              v-model="currentPage"
              :per-page="50"
              aria-controls="customer-target-list"
            ></b-pagination>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDates')">
          <NextDetailPanel v-model="form.CustomerTargetDates" :items="customerTargetDatesItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Delete: 0,
        System: 0,
        RecordState: 2,
        CustomerTargetDetails: [],
        CustomerTargetDates: [],
        Code: null,
        Description1: null,
        ErpCode: null,
        TciBreak1Id: null,
        ItemColumnName: null,
        ItemColumnValue: null,
        StatusId: 1
      },
      customerTargetDatesItems: detailData.customerTargetDatesItems,
      routeName1: 'Customer',
      tciBreak: null,
      itemColumnName: null,
      itemColumnValue: null,
      currencies: [],
      lookupValues: [],
      items: [],
      itemCriterias: [],
      fieldValues: [],
      selectedIndex: 0,
      currentPage: 1,
      totalRowCount: 0,
      allList: {},
      CustomerTarget: [],
      selectedCustomerTarget: null,
      filterCustomer: null,
      insertedDetails: [],
      updatedDetails: [],
      importedExcel: false,
      showUpdateBudget: false,
      selectedItems: [],
      customerTargetDetails: {
        customer: null,
        CustomerDesc: null,
        CustomerId: null,
        targetQuantity: null,
        targetUnit: null,
        reqItemQuantity: null,
        reqItem: null,
        descriptionReqItem: null,
        currency: null,
        gainAmount: null
      },
      customerGuaranteeFields: [
        {
          key: 'Customer',
          label: 'insert.CustomerTarget.CustomerId',
          sortable: false,
          formatter (value, key, obj) {
            return `${obj.CustomerName ? obj.CustomerName : obj.Customer.Label}`
          }
        },
        {key: 'TargetQuantity', label: 'insert.CustomerTarget.TargetQuantity', sortable: false},
        {key: 'TargetUnitId',
          label: 'insert.CustomerTarget.TargetUnitId',
          formatter (value, key, obj) {
            return `${obj.TargetUnitLabel ? obj.TargetUnitLabel : obj.TargetUnit.Label}`
          },
          sortable: false
        },
        {key: 'ReqItem',
          label: 'insert.CustomerTarget.ReqItemId',
          formatter (value, key, obj) {
            return `${obj.ReqItem ? obj.ReqItem.Label : ''}`
          },
          sortable: false
        },
        {key: 'ReqItemQuantity', label: 'insert.CustomerTarget.ReqItemQuantity', sortable: false},
        {key: 'DescriptionReqItem', label: 'insert.CustomerTarget.DescriptionReqItem', sortable: false},
        {key: 'GainAmount', label: 'insert.CustomerTarget.GainAmount', sortable: false},
        {key: 'Currency',
          label: 'insert.CustomerTarget.currencyId',
          formatter (value, key, obj) {
            return `${obj.Currency ? obj.Currency.Label : ''}`
          },
          sortable: false
        },
        {key: 'operations', label: 'list.operations', sortable: false}
      ]
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
    this.getItemCriterias()
    this.getCurrencies()
    this.getLookups()
    this.getItem()
    this.getCustomerTargetDetails()
  },
  methods: {
    getCustomerTargetDetails (currentPage) {
      if (currentPage) {
        this.currentPage = currentPage
      }
      let request = {
        andConditionModel: {
          CustomerTargetIds: [this.$route.params.url]
        },
        page: this.currentPage
      }
      this.isLoading = true
      this.allList = {}
      if (this.allList[this.currentPage]) {
        this.CustomerTarget = this.allList[this.currentPage]
        return
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerTargetDetail/Search', 50).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          this.CustomerTarget = response.ListModel.BaseModels
          this.allList[this.currentPage] = this.CustomerTarget
        }
        this.$forceUpdate()
      })
    },
    getCustomerTargetDetails2 () {
      let request = {
        andConditionModel: {
          CustomerTargetIds: [this.$route.params.url]
        },
        page: this.currentPage
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerTargetDetail/Search', 50).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          let responseList = response.ListModel.BaseModels
            .filter(c => c.CustomerTarget !== null && c.CustomerTarget !== undefined)
            .map(item => {
              let customerGuarantees = item.CustomerTarget
              customerGuarantees.RecordId = item.RecordId
              return customerGuarantees
            })
          if (this.currentPage === 1) {
            this.CustomerTarget = [...this.insertedDetails, ...responseList]
          } else {
            this.CustomerTarget = responseList
          }
        }
      })
    },
    getItemCriterias () {
      this.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((response) => {
        if (response && response.Values && response.Values.length > 0) {
          this.itemCriterias = response.Values
        }
      })
    },
    selectColumnName  (data) {
      this.fieldValues = []
      this.form.ItemColumnValue = null
      this.itemColumnValue = null
      if (data) {
        this.form.ItemColumnName = data.Label
        this.$api.postByUrl({paramName: data.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.fieldValues = res.Values
        })
      } else {
        this.form.ItemColumnName = null
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.tciBreak = rowData.TciBreak1
      this.itemColumnName = rowData.ItemColumnName
      this.itemColumnValue = rowData.ItemColumnValue
      if (!rowData.CustomerTargetDates) {
        this.form.CustomerTargetDates = []
      }
      // if (this.form.CustomerTargetDetails) {
      //   this.form.CustomerTargetDetails.map(item => {
      //     item.RecordState = 3
      //     return item
      //   })
      // }
    },
    successExcelImportCustomerTarget (data) {
      if (data) {
        let list = []
        console.log(data)
        console.log(this.CustomerTarget)
        Object.keys(data).map(d => {
          let obj = data[d]
          let existIndex = this.CustomerTarget.findIndex(c => c.CustomerId === obj.CustomerId)
          if (existIndex > -1) {
            let exist = this.CustomerTarget[existIndex]
            obj.RecordState = exist.RecordId ? 3 : 2
            obj.RecordId = exist.RecordId
            this.CustomerTarget.splice(existIndex, 1)
          } else {
            obj.RecordState = 2
          }
          // let nonExistIndex = this.CustomerGuarantees.findIndex(c => c.CustomerId !== obj.CustomerId)
          // console.log(nonExistIndex)
          // if (nonExistIndex > -1) {
          //   let _CustomerGuarantees = this.CustomerGuarantees
          //   _CustomerGuarantees[nonExistIndex].RecordState = 4
          //   this.CustomerGuarantees = _CustomerGuarantees
          // }
          obj.StatusId = 1
          obj.Deleted = 0
          obj.System = 0
          obj.RecordTypeId = null
          obj.isUpdated = true
          list.push(obj)
        })
        this.CustomerTarget = [...this.CustomerTarget, ...list]
        this.insertedDetails = this.CustomerTarget.filter(c => c.RecordState === 2)
        this.updatedDetails = this.CustomerTarget.filter(c => c.RecordState === 3 || c.RecordState === 4)
        this.totalRowCount = this.CustomerTarget.length
        this.importedExcel = true
        this.filterCustomer = null
      }
    },
    addContractItems () {
      if (this.customerTargetDetails.reqItem && !this.customerTargetDetails.customer) {
        this.$toasted.show(this.$t('insert.customerRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && !this.customerTargetDetails.targetQuantity) {
        this.$toasted.show(this.$t('insert.targetQuantityRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && !this.customerTargetDetails.gainAmount) {
        this.$toasted.show(this.$t('insert.gainAmountRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && this.customerTargetDetails.gainAmount && !this.customerTargetDetails.reqItemQuantity) {
        this.$toasted.show(this.$t('insert.reqItemQuantityRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && this.customerTargetDetails.gainAmount && this.customerTargetDetails.reqItemQuantity && !this.customerTargetDetails.descriptionReqItem) {
        this.$toasted.show(this.$t('insert.descriptionReqItemRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      this.$v.customerTargetDetails.$touch()
      if (this.$v.customerTargetDetails.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.CustomerTargetDetails.filter(i => i.CustomerId === this.customerTargetDetails.customer.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.customerTargetDetails.recordId,
        RecordState: this.customerTargetDetails.recordId > 0 ? 3 : 2,
        StatusId: 1,
        // TableName: 'T_CUSTOMER_TARGET_DETAIL',
        CustomerId: this.customerTargetDetails.customer.RecordId,
        CustomerName: this.customerTargetDetails.customer.Description1,
        TargetUnitId: this.customerTargetDetails.targetUnit.DecimalValue,
        TargetUnitLabel: this.customerTargetDetails.targetUnit.Label,
        ReqItemId: this.customerTargetDetails.reqItem ? this.customerTargetDetails.reqItem.RecordId : null,
        ReqItemLabel: this.customerTargetDetails.reqItem ? this.customerTargetDetails.reqItem.Description1 : null,
        TargetQuantity: this.customerTargetDetails.targetQuantity,
        ReqItemQuantity: this.customerTargetDetails.reqItemQuantity,
        DescriptionReqItem: this.customerTargetDetails.descriptionReqItem,
        GainAmount: this.customerTargetDetails.gainAmount,
        CurrencyId: this.customerTargetDetails.currency ? this.customerTargetDetails.reqItem.RecordId : null,
        CurrencyName: this.customerTargetDetails.currency ? this.customerTargetDetails.currency.Description1 : null
      }
      if (this.customerTargetDetails.isUpdated) {
        this.form.CustomerTargetDetails[this.selectedIndex] = item
        this.customerTargetDetails.isUpdated = false
      } else {
        this.form.CustomerTargetDetails.push(item)
      }
      this.customerTargetDetails = {}
      this.$v.customerTargetDetails.$reset()
      this.getCurrencies()
      this.getLookups()
    },
    async addCustomerGuarantee () {
      this.$v.customerTargetDetails.$touch()
      if (this.customerTargetDetails.reqItem && !this.customerTargetDetails.customer) {
        this.$toasted.show(this.$t('insert.customerRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && !this.customerTargetDetails.targetQuantity) {
        this.$toasted.show(this.$t('insert.targetQuantityRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && !this.customerTargetDetails.gainAmount) {
        this.$toasted.show(this.$t('insert.gainAmountRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && this.customerTargetDetails.gainAmount && !this.customerTargetDetails.reqItemQuantity) {
        this.$toasted.show(this.$t('insert.reqItemQuantityRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      if (this.customerTargetDetails.reqItem && this.customerTargetDetails.customer && this.customerTargetDetails.targetQuantity && this.customerTargetDetails.gainAmount && this.customerTargetDetails.reqItemQuantity && !this.customerTargetDetails.descriptionReqItem) {
        this.$toasted.show(this.$t('insert.descriptionReqItemRequired'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      this.$v.customerTargetDetails.$touch()
      // let filteredArr = this.form.CustomerTargetDetails.filter(i => i.CustomerId === this.customerTargetDetails.customer.RecordId && i.RecordState !== 4)
      // if (filteredArr.length > 0) {
      //   this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
      //   return false
      // }
      if (!this.customerTargetDetails.isUpdated) {
        let request = {
          andConditionModel: {
            CustomerTargetIds: [this.form.RecordId],
            CustomerIds: [this.customerTargetDetails.customer.RecordId]
          },
          page: this.currentPage,
          OrderByColumns: [
            {
              column: 'ApprovestateId',
              'orderByType': 0
            }
          ]
        }
        let filteredList = await this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerTargetDetail/Search')
        this.getCurrencies()
        this.getLookups()
        if (this.CustomerTarget.some(c => c.CustomerId === this.customerTargetDetails.customer.RecordId && c.RecordState !== 4) || (filteredList && filteredList.ListModel && filteredList.ListModel.BaseModels.length > 0)) {
          this.$toasted.show(this.$t('insert.creditBudget.sameRecordException'), { type: 'error', keepOnHover: true, duration: '3000' })
          return false
        }
      }
      this.customerTargetDetails = {
        Deleted: 0,
        System: 0,
        RecordId: this.customerTargetDetails.recordId,
        RecordState: this.customerTargetDetails.recordId > 0 ? 3 : 2,
        StatusId: 1,
        // TableName: 'T_CUSTOMER_TARGET_DETAIL',
        CustomerId: this.customerTargetDetails.customer.RecordId,
        CustomerName: this.customerTargetDetails.customer.Description1,
        TargetUnitId: this.customerTargetDetails.targetUnit.DecimalValue,
        TargetUnitLabel: this.customerTargetDetails.targetUnit.Label,
        ReqItemId: this.customerTargetDetails.reqItem ? this.customerTargetDetails.reqItem.RecordId : null,
        ReqItem: this.customerTargetDetails.reqItem ? this.customerTargetDetails.reqItem.Description1 : null,
        TargetQuantity: this.customerTargetDetails.targetQuantity,
        ReqItemQuantity: this.customerTargetDetails.reqItemQuantity,
        DescriptionReqItem: this.customerTargetDetails.descriptionReqItem,
        GainAmount: this.customerTargetDetails.gainAmount,
        CurrencyId: this.customerTargetDetails.currency ? this.customerTargetDetails.currency.RecordId : null,
        CurrencyName: this.customerTargetDetails.currency ? this.customerTargetDetails.currency.Description1 : null
      }
      if (this.customerTargetDetails.isUpdated) {
        this.CustomerTarget[this.selectedIndex] = this.customerTargetDetails
        this.selectedIndex = null

        let filteredList = this.updatedDetails.filter(u => u.CustomerId === this.customerTargetDetails.CustomerId)
        if (filteredList.length > 0) {
          this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])] = this.customerTargetDetails
        } else {
          let data = {...this.customerGuarantees}
          this.updatedDetails.push(data)
        }
      } else {
        this.CustomerTarget.unshift(this.customerTargetDetails)
        let filteredList = this.insertedDetails.filter(u => u.CustomerId === this.customerTargetDetails.CustomerId)
        if (filteredList.length > 0) {
          this.insertedDetails[this.insertedDetails.indexOf(filteredList[0])] = this.customerTargetDetails
        } else {
          let data = {...this.customerTargetDetails}
          this.insertedDetails.push(data)
        }
        this.push(this.customerTargetDetails)
      }
      this.customerTargetDetails = {}
      this.$v.customerTargetDetails.$reset()
      this.getCurrencies()
      this.getLookups()
    },
    removeContractItems (item) {
      if (this.selectedCustomerTarget.RecordId > 0) {
        this.CustomerTarget[this.CustomerTarget.indexOf(this.selectedCustomerTarget)].RecordState = 4
      } else {
        this.CustomerTarget.splice(this.CustomerTarget.indexOf(this.selectedCustomerTarget), 1)
      }
      let filteredList = this.updatedDetails.filter(u => u.CustomerId === this.selectedCustomerTarget.CustomerId)
      if (filteredList.length > 0) {
        this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])].RecordState = 4
      } else {
        let data = {...this.selectedCustomerTarget}
        data.RecordState = 4
        this.updatedDetails.push(data)
      }
      this.selectedCustomerTarget = null
      this.$bvModal.hide('credit-budget-confirm-delete-modal')
      this.$forceUpdate()
    },
    editInvoiceLine () {
      this.customerTargetDetails = {...this.selectedCustomerTarget}
      this.selectedIndex = this.CustomerTarget.indexOf(this.selectedCustomerTarget)
      this.customerTargetDetails.isUpdated = true
      if (this.selectedCustomerTarget.RecordId > 0) {
        this.customerTargetDetails.RecordState = 3
      }
      this.customerTargetDetails.customer = null
      this.customerTargetDetails.gainAmount = this.selectedCustomerTarget.GainAmount
      this.customerTargetDetails.targetQuantity = this.selectedCustomerTarget.TargetQuantity
      this.customerTargetDetails.descriptionReqItem = this.selectedCustomerTarget.DescriptionReqItem
      this.customerTargetDetails.reqItemQuantity = this.selectedCustomerTarget.ReqItemQuantity
      this.customerTargetDetails.currency = this.getCurrencies(this.selectedCustomerTarget.CurrencyId)
      this.customerTargetDetails.targetUnit = this.getLookups(this.selectedCustomerTarget.TargetUnitId)
      this.customerTargetDetails.reqItem = this.getItem(this.selectedCustomerTarget.ReqItem)
      this.customerTargetDetails.customer = {
        RecordId: this.selectedCustomerTarget.CustomerId,
        Description1: this.selectedCustomerTarget.CustomerDesc,
        Code: this.selectedCustomerTarget.CustomerCode
      }
      this.selectedCustomerTarget = null
      this.$bvModal.hide('credit-budget-confirm-edit-modal')
      // this.getCurrencies(item.CurrencyId)
      // this.getLookups(item.TargetUnitId)
      // this.getItem(item.items)
    },
    // editInvoiceLine (objectKey, item) {
    //   let list = this.form.Custome
    //   this.selectedIndex = list.indexOf(item)
    //   this.setModel(objectKey, item)
    // },
    setModel (objectKey, item) {
      this[objectKey] = {
        targetUnit: {
          DecimalValue: item.TargetUnitId,
          Label: item.TargetUnitLabel ? item.TargetUnitLabel : item.TargetUnit.Label
        },
        currency: {
          RecordId: item.CurrencyId,
          Description1: item.Currency ? item.Currency.Label : item.CurrencyName
        },
        targetQuantity: item.TargetQuantity,
        reqItemQuantity: item.ReqItemQuantity,
        descriptionReqItem: item.DescriptionReqItem,
        gainAmount: item.GainAmount
      }
    },
    getLookups () {
      return this.$api.postByUrl({LookupTableCode: 'UNIT'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (response && response.Values) {
          this.lookupValues = response.Values.UNIT
          this.customerTargetDetails.targetUnit = response.Values.UNIT[3]
          this.form.TargetUnitId = this.customerTargetDetails.targetUnit.RecordId
        }
      })
    },
    getCurrencies () {
      return this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
          this.customerTargetDetails.currency = response.ListModel.BaseModels[0]
          this.form.CurrencyId = this.customerTargetDetails.currency.RecordId
        }
      })
    },
    getItem () {
      this.$api.postByUrl({andConditionModel: { StatusIds: [1] }}, '/VisionNextItem/api/Item/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.items = response.ListModel.BaseModels
        }
      })
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
        let list = [...this.insertedDetails, ...this.updatedDetails]
        this.form.CustomerTargetDetails = list.map((item) => {
          let creditBudgetDetail = {
            TargetUnitId: item.TargetUnitId,
            TargetQuantity: item.TargetQuantity,
            ReqItemId: item.ReqItemId,
            ReqItemQuantity: item.ReqItemQuantity,
            DescriptionReqItem: item.DescriptionReqItem,
            GainAmount: item.GainAmount,
            CustomerId: item.CustomerId,
            CurrencyId: item.CurrencyId,
            RecordState: item.RecordState === 4 ? 4 : item.RecordId > 0 ? 3 : 2,
            StatusId: 1,
            Deleted: 0,
            System: 0,
            RecordId: item.RecordId,
            CustomerTarget: item
          }

          return creditBudgetDetail
        })
        this.updateData()
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
  },
  validations () {
    let customerTargetDetails = {
      currency: {
        required
      },
      reqItem: {
        required: requiredIf(function () {
          return !(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount) ? required : !required
        })
      },
      customer: {
        required
      },
      targetQuantity: {
        required
      },
      reqItemQuantity: {
        required: requiredIf(function () {
          return !(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount) ? required : !required
        })
      },
      descriptionReqItem: {
        required: requiredIf(function () {
          return !(customerTargetDetails.customer && customerTargetDetails.targetQuantity && customerTargetDetails.gainAmount) ? required : !required
        })
      },
      gainAmount: {
        required
      }
    }
    return {
      form: this.insertRules,
      customerTargetDetails: customerTargetDetails
    }
  }
}
</script>
