<template>
  <div>
    <b-row>
      <NextFormGroup :title="$t('insert.loyalty.customerCode')" md="4" lg="4" :required="false">
        <NextInput v-model="model.customerCode" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.loyalty.commercialTitle')" md="4" lg="4" :required="false">
        <NextInput v-model="model.commercialTitle" />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.loyalty.customerType')" md="4" lg="4" :required="false">
        <NextDropdown
          lookup-key="CUSTOMER_TYPE"
          :get-lookup="true"
           v-model="model.customerType"
       />
       </NextFormGroup>
       <NextFormGroup :title="$t('insert.loyalty.customerGroup')" md="4" lg="4" :required="false">
        <NextDropdown
          lookup-key="CUSTOMER_GROUP"
          :get-lookup="true"
           v-model="model.customerGroup"
       />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.loyalty.customerKind')" md="4" lg="4" :required="false">
        <NextDropdown
          lookup-key="CUSTOMER_KIND"
          :get-lookup="true"
           v-model="model.customerKind"
       />
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.loyalty.customerClass')" md="4" lg="4" :required="false">
        <NextDropdown
          lookup-key="CUSTOMER_CLASS"
          :get-lookup="true"
           v-model="model.customerClass"
       />
      </NextFormGroup>
      <b-col cols="12" md="12">
        <b-form-group class="text-right">
          <b-button
            @click="filter"
            id="searchButton"
            class="mt-1"
            size="sm"
            variant="success"
            :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner></span>
              <span v-else><i class="fa fa-list"> </i> {{$t('insert.loyalty.search')}}</span>
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-col cols="12" md="12">
          <h4>{{$t('insert.loyalty.searchedCustomers')}}</h4>
          <b-form-group class="text-right">
            <b-button
              v-if="selectedSearchCustomerList && selectedSearchCustomerList.length > 0"
              @click="add" id="addButton" class="mt-1" size="sm" variant="success">
              <i class="fa fa-plus"> </i> {{$t('insert.loyalty.add')}}
            </b-button>
          </b-form-group>
        </b-col>
        <b-table
          ref="searchedList"
          id="searched-customer-list"
          :fields="customerListFields"
          :items="searchedCustomerList"
          select-mode="multi"
          responsive
          :selectable="true"
          bordered
          tbody-tr-class="bg-white"
          @row-selected="searchSelected"
          :current-page="searchedCurrentPage"
          :per-page="perPage">
          <template #cell(selection)="row">
            <span>
              <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
            </span>
          </template>
        </b-table>
        <b-pagination
          id="searched-pagination"
          :total-rows="searchedCustomerList ? searchedCustomerList.length : 0"
          v-model="searchedCurrentPage"
          :per-page="perPage"
          aria-controls="searched-customer-list"
        ></b-pagination>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12">
        <b-col cols="12" md="12">
          <h4>{{$t('insert.loyalty.currentCustomers')}}</h4>
          <b-form-group class="text-right">
            <b-button
              v-if="selectedCurrentCustomerList && selectedCurrentCustomerList.length > 0"
              @click="remove" id="addButton" class="mt-1" size="sm" variant="success">
              <i class="fa fa-trash"> </i> {{$t('insert.loyalty.remove')}}
            </b-button>
          </b-form-group>
        </b-col>
        <b-table
          id="current-customer-list"
          :fields="customerListFields"
          :items="currentCustomerList ? currentCustomerList.filter(c => c.RecordState !== 4) : []"
          select-mode="multi"
          responsive
          :selectable="true"
          bordered
          tbody-tr-class="bg-white"
          @row-selected="currentSelected"
          :current-page="currentCurrentPage"
          :per-page="perPage">
          <template #cell(selection)="row">
            <span>
              <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
            </span>
          </template>
        </b-table>
        <b-pagination
          id="current-pagination"
          :total-rows="currentCustomerList ? currentCustomerList.length : 0"
          v-model="currentCurrentPage"
          :per-page="perPage"
          aria-controls="current-customer-list"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'
export default {
  name: 'MultipleCustomerOperations',
  mixins: [mixin],
  props: {
    value: {
      type: Array
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      model: {},
      customerListFields: detailData.customerListFields,
      searchedCustomerList: [],
      currentCustomerList: [],
      selectedSearchCustomerList: [],
      selectedCurrentCustomerList: [],
      searchedCurrentPage: 1,
      currentCurrentPage: 1,
      perPage: 10,
      isLoading: false
    }
  },
  mounted () {
    let customers = this.value ? this.value : []
    this.currentCustomerList = customers
  },
  methods: {
    filter () {
      let request = {
        andConditionModel: {
          Code: this.model.customerCode ? this.model.customerCode : null,
          CommercialTitle: this.model.CommercialTitle ? this.model.CommercialTitle : null,
          TypeIds: this.model.customerType ? [this.model.customerType.DecimalValue] : [],
          GroupIds: this.model.customerGroup ? [this.model.customerGroup.DecimalValue] : [],
          KindIds: this.model.customerKind ? [this.model.customerKind.DecimalValue] : [],
          ClassIds: this.model.customerClass ? [this.model.customerClass.DecimalValue] : []
        }
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.searchedCustomerList = []
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch').then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.searchedCustomerList = response.ListModel.BaseModels.map((item) => {
            let result = {
              ColumnNameDesc: item.Code,
              ColumnValueDesc: item.CommercialTitle,
              ColumnValueDesc2: item.DefaultLocation ? item.DefaultLocation.Label : '',
              ColumnValue: item.RecordId,
              ColumnName: 'RECORD_ID',
              TableName: 'T_CUSTOMER',
              Deleted: 0,
              RecordState: 2,
              StatusId: 1,
              System: 0
            }
            return result
          })
        }
      }).catch(() => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    },
    searchSelected (selectedList) {
      this.selectedSearchCustomerList = selectedList
    },
    currentSelected (selectedList) {
      this.selectedCurrentCustomerList = selectedList
    },
    add () {
      this.selectedSearchCustomerList.map(s => {
        let filteredList = this.currentCustomerList.filter(c => c.ColumnValue === s.ColumnValue && c.RecordState !== 4)
        if (!filteredList || filteredList.length === 0) {
          this.currentCustomerList.push(s)
        }
      })
      this.$refs.searchedList.clearSelected()
      this.$emit('valuechange', this.currentCustomerList)
    },
    remove () {
      this.currentCustomerList = this.currentCustomerList.map(c => {
        let filteredList = this.selectedCurrentCustomerList.filter(s => s.ColumnValue === c.ColumnValue && s.RecordState !== 4)
        if (filteredList.length > 0) {
          if (c.RecordId > 0) {
            c.RecordState = 4
          } else {
            c.IsDeleted = 1
          }
        }
        return c
      })
      this.currentCustomerList = this.currentCustomerList.filter(c => c.IsDeleted !== 1)
      this.$forceUpdate()
      this.$emit('valuechange', this.currentCustomerList)
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
