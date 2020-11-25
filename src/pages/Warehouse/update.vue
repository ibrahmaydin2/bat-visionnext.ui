<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
              <b-button size="sm" variant="outline-danger">Vazgeç</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">Kaydet</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.warehouse.Model_Code')"
            >
              <b-form-input type="text" v-model="form.Model.Code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.warehouse.Model_Description1')"
            >
              <b-form-input type="text" v-model="form.Model.Description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.warehouse.Model_StatusId')"
            >
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.warehouse.Warehouse')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.warehouse.Model_WarehouseTypeId')">
                <v-select
                  v-model="form.Model.WarehouseType"
                  :options="lookupWarehouse_type"
                  @input="selectedWarehouseType"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="showVehicle" cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.warehouse.Model_VehicleId')">
                <v-select v-model="form.Model.Vehicle" label="VehiclePlateNumber" :filterable="false" :options="vehicleList" @search="onVehicleSearch" @input="selectedVehicle">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.VehiclePlateNumber }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="showCustomer" cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.warehouse.Model_Customer')">
                <v-select v-model="form.Model.Customer" label="CommercialTitle" :filterable="false" :options="customerList" @search="onCustomerSearch" @input="selectedCustomer">
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
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.warehouse.Model_IsCenterWarehouse')"
              >
              <b-form-radio-group v-model="form.Model.IsCustomerWarehouse">
                  <b-form-radio :disabled="form.Model.IsVehicle ? true : false" @change="selectedIsCustomer(1)" value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio :disabled="form.Model.IsVehicle ? true : false" @change="selectedIsCustomer(0)" value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.warehouse.Model_WarehouseCapacity')"
              >
                <b-form-input type="text" v-model="form.Model.WarehouseCapacity"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.warehouse.Model_LicenseNumber')"
              >
                <b-form-input type="text" v-model="form.Model.LicenseNumber"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.warehouse.Model_FinanceCode')"
              >
                <b-form-input type="text" v-model="form.Model.FinanceCode"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.WarehouseSuppliers')">
          <b-table-simple bordered small>
            <b-thead>
              <b-th width="30%">
                <b-form-group :label="$t('insert.warehouse.SupplierBranchId')">
                  <v-select label="BranchCommercialTitle" :filterable="false" :options="branchList" @search="onBranchSearch" @input="selectedBranch">
                    <template slot="no-options">
                      {{$t('insert.min3')}}
                    </template>
                    <template slot="option" slot-scope="option">
                      {{ option.BranchCommercialTitle }}
                    </template>
                  </v-select>
                </b-form-group>
              </b-th>
              <b-th width="30%">
                <b-form-group :label="$t('insert.warehouse.PurchaseWarehouseId')">
                  <v-select :options="warehouseList" label="Description1" @input="selectedPurchaseWarehouseId"></v-select>
                </b-form-group>
              </b-th>
              <b-th width="30%">
                <b-form-group :label="$t('insert.warehouse.ReturnWarehouseId')">
                  <v-select :options="warehouseList" label="Description1" @input="selectedReturnWarehouseId"></v-select>
                </b-form-group>
              </b-th>
              <b-th width="10%">
                <b-form-group>
                  <b-button @click="addDetailList" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
                </b-form-group>
              </b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(r, i) in detailListData" :key="'dl' + i">
                <b-td>{{r.selectedBranch}}</b-td>
                <b-td>{{r.selectedPurchaseWarehouseId}}</b-td>
                <b-td>{{r.selectedReturnWarehouseId}}</b-td>
                <b-td></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        companyId: this.CompanyId,
        branchId: this.BranchId,
        Model: {
          LocationId: null,
          IsVehicle: null,
          IsCustomerWarehouse: null,
          StatusId: 1,
          LicenseNumber: null,
          FinanceCode: null,
          WarehouseSuppliers: [],
          VehicleId: null,
          WarehouseCapacity: null,
          WarehouseTypeId: null,
          WarehouseType: null,
          IsCenterWarehouse: null,
          Code: null,
          Description1: null,
          CustomerId: null,
          Vehicle: null,
          Customer: null
        }
      },
      detailListData: [],
      detailListBranch: '',
      detailListPurchaseWarehouseId: '',
      detailListReturnWarehouseId: '',
      WarehouseSuppliers: {
        selectedBranch: '',
        selectedPurchaseWarehouseId: '',
        selectedReturnWarehouseId: ''
      },
      dataStatus: true,
      showCustomer: false,
      showVehicle: false
    }
  },
  computed: {
    ...mapState(['rowData', 'lookupWarehouse_type', 'vehicleList', 'branchList', 'customerList', 'warehouseList', 'BranchId', 'CompanyId'])
  },
  watch: {
    rowData: function (e) {
      this.selectedWarehouseType(e.WarehouseType)
      if (e.WarehouseTypeId === 76506193) {
        this.form.Model.Vehicle = e.Vehicle.Label
        this.form.Model.VehicleId = e.VehicleId
      }
      // if'e koyulacak
      if (e.Customer) {
        this.form.Model.Customer = e.Customer.Label
        this.form.Model.CustomerId = e.CustomerId
      }

      this.form.Model.Code = e.Code
      this.form.Model.Description1 = e.Description1
      this.form.Model.WarehouseCapacity = e.WarehouseCapacity
      this.form.Model.LicenseNumber = e.LicenseNumber
      this.form.Model.FinanceCode = e.FinanceCode
      if (e.StatusId === 1) {
        this.dataStatus = true
      } else {
        this.dataStatus = true
      }
    },
    dataStatus: function (e) {
      if (e === true) {
        this.form.Model.StatusId = 1
      } else {
        this.form.Model.StatusId = 0
      }
    }
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getLookup()
    this.getRowData()
  },
  methods: {
    getRowData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextWarehouse/api/Warehouse', record: this.$route.params.url})
    },
    save () {
      this.form.companyId = this.CompanyId
      this.form.branchId = this.BranchId
      this.$store.dispatch('updateData', {...this.query, api: 'VisionNextWarehouse/api/Warehouse', formdata: this.form, return: this.$route.meta.baseLink})
    },
    selectedIsCustomer (e) {
      if (e === 0) {
        this.showCustomer = false
      } else {
        this.showCustomer = true
      }
    },
    selectedVehicle (e) {
      this.form.Model.VehicleId = e.RecordId
    },
    selectedCustomer (e) {
      this.form.Model.CustomerId = e.RecordId
    },
    selectedBranch (e) {
      this.WarehouseSuppliers.selectedBranch = e.RecordId
      this.detailListBranch = e.BranchCommercialTitle
      this.$store.dispatch('acWarehouse', {...this.query, searchField: 'BranchId', searchText: e.RecordId})
    },
    selectedPurchaseWarehouseId (e) {
      this.WarehouseSuppliers.selectedPurchaseWarehouseId = e.RecordId
      this.detailListPurchaseWarehouseId = e.Description1
    },
    selectedReturnWarehouseId (e) {
      this.WarehouseSuppliers.selectedReturnWarehouseId = e.RecordId
      this.detailListReturnWarehouseId = e.Description1
    },
    addDetailList () {
      let a = {
        selectedBranch: this.detailListBranch,
        selectedPurchaseWarehouseId: this.detailListPurchaseWarehouseId,
        selectedReturnWarehouseId: this.detailListReturnWarehouseId
      }
      let b = {
        StatusId: null,
        SupplierBranchId: this.WarehouseSuppliers.selectedBranch,
        SupplierCustomerId: 46733004.0,
        CompanyId: this.CompanyId,
        BranchId: this.BranchId,
        CreatedUser: 1.0,
        ModifiedUser: null,
        ModifiedDateTime: null,
        Deleted: 0,
        System: 0,
        PurchaseWarehouseId: this.WarehouseSuppliers.selectedPurchaseWarehouseId,
        ReturnWarehouseId: this.WarehouseSuppliers.selectedReturnWarehouseId
      }
      this.detailListData.push(a)
      this.detailListBranch = null
      this.detailListPurchaseWarehouseId = null
      this.detailListReturnWarehouseId = null
      this.form.Model.WarehouseSuppliers.push(b)
    },
    selectedWarehouseType (e) {
      this.form.Model.WarehouseTypeId = e.DecimalValue
      this.form.Model.WarehouseType = e.Label
      // araç mı ?
      if (e.DecimalValue === 76506193) {
        this.showVehicle = true
        this.form.Model.IsVehicle = 1
        this.$store.commit('setVehicleList', [])
      } else {
        this.form.Model.IsVehicle = 0
        this.showVehicle = false
      }
      // merkez depo mu ?
      if (e.DecimalValue === 76506191) {
        this.form.Model.IsCustomerWarehouse = 1
        this.showCustomer = true
      } else {
        this.form.Model.IsCustomerWarehouse = 0
        this.showCustomer = false
      }
    },
    onVehicleSearch (search, loading) {
      if (search.length >= 3) {
        this.searchVehicle(loading, search, this)
      }
    },
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        this.searchCustomer(loading, search, this)
      }
    },
    onBranchSearch (search, loading) {
      if (search.length >= 3) {
        this.searchBranch(loading, search, this)
      }
    },
    searchVehicle (loading, search, vm) {
      this.$store.dispatch('acVehicle', {...this.query, searchField: 'VehiclePlateNumber', searchText: search})
    },
    searchCustomer (loading, search, vm) {
      this.$store.dispatch('acCustomer', {...this.query, searchField: 'CommercialTitle', searchText: search})
    },
    searchBranch (loading, search, vm) {
      this.$store.dispatch('acBranch', {...this.query, searchField: 'BranchCommercialTitle', searchText: search})
    },
    getLookup () {
      this.$store.dispatch('lookupWareouseType')
    }
  }
}
</script>
<style lang="sass">
</style>
