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
            <b-form-input type="text" v-model="form.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.warehouse.Warehouse')" :active="true" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="NonSapWarehouse" :error="$v.form.NonSapWarehouse">
              <NextCheckBox v-model="form.NonSapWarehouse" type="number" toggle />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <v-select v-model="vehicleName" :disabled="!form.IsVehicle" label="VehiclePlateNumber" :options="vehicles" :filterable="false" @search="onVehicleSearch" @input="selectedVehicle">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.VehiclePlateNumber }}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="IsVehicle" :error="$v.form.IsVehicle">
              <NextCheckBox v-model="form.IsVehicle" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsVirtualWarehouse" :error="$v.form.IsVirtualWarehouse">
              <NextCheckBox :disabled="form.IsVehicle ? true : false" v-model="form.IsVirtualWarehouse" type="number" toggle />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" required/>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2">
              <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
            </NextFormGroup>
          </b-row>
          <NextAddress v-show="!form.IsVehicle && !form.IsVirtualWarehouse" v-model="address" />
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')" v-if="!form.IsVehicle" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.warehouse.SupplierBranchId')" :error="$v.warehouseSupplier.supplierBranch" :required="true">
              <v-select v-model="warehouseSupplier.selectedBranch" label="Description1" :filterable="false" :options="branchs" @search="onBranchSearch" @input="selectedBranch">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.warehouse.PurchaseWarehouseId')" :error="$v.warehouseSupplier.purchaseWarehouse" :required="true">
              <v-select v-model="warehouseSupplier.purchaseWarehouse" :options="warehouses" label="Description1"></v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.warehouse.ReturnWarehouseId')" :error="$v.warehouseSupplier.returnWarehouse" :required="true">
              <v-select v-model="warehouseSupplier.returnWarehouse" :options="warehouses" label="Description1"></v-select>
            </NextFormGroup>
          </b-row>
          <b-row>
            <b-col md="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addItems" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.warehouse.SupplierBranchId')}}</span></b-th>
                  <b-th><span>{{$t('insert.warehouse.PurchaseWarehouseId')}}</span></b-th>
                  <b-th><span>{{$t('insert.warehouse.ReturnWarehouseId')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in warehouseSuppliers" :key="i">
                    <b-td>{{w.supplierBranch.BranchCommercialTitle}}</b-td>
                    <b-td>{{w.purchaseWarehouse.Description1}}</b-td>
                    <b-td>{{w.returnWarehouse.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removeItems(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/update'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        StatusId: 1,
        IsVehicle: 0,
        VehicleId: null,
        LicenseNumber: null,
        FinanceCode: null,
        FinanceCode2: null,
        Address: null,
        CityId: null,
        DistrictId: null,
        IsVirtualWarehouse: 0,
        NonSapWarehouse: 0,
        WarehouseSuppliers: []
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: null,
      warehouseSupplier: {},
      warehouseSuppliers: [],
      vehicleName: null,
      address: {}
    }
  },
  computed: {
    ...mapState(['vehicles', 'branchs', 'warehouses'])
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
  },
  methods: {
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
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
        if (this.form.IsVehicle && !this.form.VehicleId) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.warehouse.vehicleRequired') })
          return
        }

        if (!this.form.IsVehicle) {
          this.form.WarehouseSuppliers = this.warehouseSuppliers.map((item) => {
            var newItem = {
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              StatusId: item.StatusId,
              RecordId: item.RecordId,
              WarehouseId: item.WarehouseId,
              BranchId: item.BranchId,
              SupplierCustomerId: item.SupplierCustomerId,
              SupplierBranchId: item.supplierBranch.RecordId,
              PurchaseWarehouseId: item.purchaseWarehouse.RecordId,
              ReturnWarehouseId: item.returnWarehouse.RecordId
            }
            return newItem
          })

          if (this.form.IsVehicle) {
            this.form.Address = null
            this.form.CityId = null
            this.form.DistrictId = null
            this.form.VehicleId = null
          } else {
            this.form.CityId = this.address.CityId
            this.form.DistrictId = this.address.DistrictId
            this.form.AddressDetail = this.address.Address
          }
        }
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      e.WarehouseSuppliers.map(item => {
        this.warehouseSuppliers.push({
          supplierBranch: {
            RecordId: item.SupplierBranchId,
            BranchCommercialTitle: item.SupplierBranch.Label
          },
          SupplierCustomerId: item.SupplierCustomerId,
          WarehouseId: item.WarehouseId,
          CompanyId: item.CompanyId,
          BranchId: item.BranchId,
          CreatedUser: item.CreatedUser,
          ModifiedUser: item.ModifiedUser,
          ModifiedDateTime: item.ModifiedDateTime,
          Deleted: item.Deleted,
          System: item.System,
          purchaseWarehouse: {
            RecordId: item.PurchaseWarehouseId,
            Description1: item.PurchaseWarehouse ? item.PurchaseWarehouse.Label : ''
          },
          returnWarehouse: {
            RecordId: item.ReturnWarehouseId,
            Description1: item.ReturnWarehouse ? item.ReturnWarehouse.Label : ''
          },
          RecordId: item.RecordId,
          RecordState: item.RecordState
        })
      })

      this.form.VehicleId = e.VehicleId
      if (e.Vehicle) {
        this.vehicleName = e.Vehicle.Label
      }
      if (e.WarehouseType) {
        this.selectedWarehouseType(e.WarehouseType)
        if (e.WarehouseTypeId === 76506193) {
          this.form.Vehicle = e.RecordId
        }
      }
      this.form.IsVehicle = e.IsVehicle == null ? 0 : e.IsVehicle
      this.form.StatusId = e.StatusId == null ? 0 : e.StatusId
      this.form.NonSapWarehouse = e.NonSapWarehouse == null ? 0 : e.NonSapWarehouse
      this.form.IsVirtualWarehouse = e.IsVirtualWareHouse == null ? 0 : e.IsVirtualWareHouse
      this.form.Code = e.Code
      this.form.RecordId = e.RecordId
      this.form.Description1 = e.Description1
      this.form.LicenseNumber = e.LicenseNumber
      this.form.FinanceCode = e.FinanceCode
      this.form.FinanceCode2 = e.FinanceCode2
      this.form.Deleted = e.Deleted
      this.form.System = e.System
      this.form.RecordState = e.RecordState == null ? 0 : e.RecordState
      this.address = {
        CityId: e.CityId,
        DistrictId: e.DistrictId,
        Address: e.Address
      }
      if (e.StatusId === 1) {
        this.dataStatus = true
      } else {
        this.dataStatus = false
      }
    },
    selectedVehicle (e) {
      this.form.VehicleId = e.RecordId
    },
    onVehicleSearch (search, loading) {
      if (search.length >= 3) {
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextVehicle/api/Vehicle/AutoCompleteSearch',
          name: 'vehicles',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    onBranchSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          name: 'branchs',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    selectedBranch (e) {
      this.warehouseSupplier.supplierBranch = e
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextWarehouse/api/Warehouse/Search',
        name: 'warehouses',
        andConditionModel: {
          branchId: e.RecordId
        }
      })
    },
    addItems () {
      this.$v.warehouseSupplier.$touch()
      if (this.$v.warehouseSupplier.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.warehouseSuppliers.filter(i => i.supplierBranch.RecordId === this.warehouseSupplier.supplierBranch.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }

      this.warehouseSupplier.Deleted = 0
      this.warehouseSupplier.System = 0
      this.warehouseSupplier.RecordState = 2
      this.warehouseSupplier.StatusId = 1
      this.warehouseSuppliers.push(this.warehouseSupplier)
      this.warehouseSupplier = {}
      this.$v.warehouseSupplier.$reset()
    },
    removeItems (item) {
      this.warehouseSuppliers.splice(this.warehouseSuppliers.indexOf(item), 1)
    },
    selectedWarehouseType (e) {
      this.form.WarehouseTypeId = e.DecimalValue
      this.form.WarehouseType = e
      // araç mı ?
      if (e.DecimalValue === 76506193) {
        this.form.IsVehicle = 1
      } else {
        this.form.IsVehicle = 0
      }
    }
  },
  validations () {
    if (this.form.IsVehicle === 0 && this.form.IsVirtualWarehouse === 0) {
      this.insertRequired.LicenseNumber = true
      this.insertRules.LicenseNumber = {
        required
      }
    } else {
      this.insertRules.LicenseNumber = {}
      this.insertRequired.LicenseNumber = false
    }
    if (this.form.IsVehicle === 0) {
      this.insertRequired.VehicleId = false
      this.insertRules.VehicleId = {}
    } else {
      this.form.IsVirtualWarehouse = 0
      this.insertRules.VehicleId = {
        required
      }
      this.insertRequired.VehicleId = true
    }
    return {
      form: this.insertRules,
      warehouseSupplier: {
        supplierBranch: {
          required
        },
        purchaseWarehouse: {
          required
        },
        returnWarehouse: {
          required
        }
      }
    }
  }
}
</script>
