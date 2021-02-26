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
            <b-col md="4" lg="3">
              <b-form-group :label="$t('insert.warehouse.Model_Code') + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
                <b-form-input type="text" v-model="form.Code" />
              </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                <NextCheckBox v-model="form.StatusId" type="number" toggle />
              </b-form-group>
            </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.warehouse.Warehouse')" :active="true" @click.prevent="tabValidation()">
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.NonSapWarehouse + (insertRequired.NonSapWarehouse === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.NonSapWarehouse.$error }">
                <NextCheckBox v-model="form.NonSapWarehouse" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.VehicleId + (insertRequired.VehicleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehicleId.$error }">
                <v-select v-model="vehicleName" :disabled="!form.IsVehicle" label="VehiclePlateNumber" :options="vehicles" :filterable="false" @search="onVehicleSearch" @input="selectedVehicle">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.VehiclePlateNumber }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.IsVehicle + (insertRequired.IsVehicle === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsVehicle.$error }">
                <NextCheckBox v-model="form.IsVehicle" type="number" toggle />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="insertTitle.IsVirtualWarehouse + (insertRequired.IsVirtualWarehouse === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsVirtualWarehouse.$error }">
                <NextCheckBox :disabledValid="form.IsVehicle" v-model="form.IsVirtualWarehouse" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.LicenseNumber + (insertRequired.LicenseNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
              </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
              <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" required/>
              </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
              <b-form-group  :label="insertTitle.FinanceCode2 + (insertRequired.FinanceCode2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode2.$error }">
                <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
              </b-form-group>
            </b-col>
          </b-row>
          <NextAddress v-show="!form.IsVehicle && !form.IsVirtualWarehouse" v-model="address" />
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')" v-if="!form.IsVehicle" @click.prevent="tabValidation()">
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="$t('insert.warehouse.SupplierBranchId') + '*'" :class="{ 'form-group--error': $v.warehouseSupplier.supplierBranch.$error }">
                  <v-select v-model="warehouseSupplier.selectedBranch" label="BranchCommercialTitle" :filterable="false" :options="branchList" @search="onBranchSearch" @input="selectedBranch">
                    <template slot="no-options">
                      {{$t('insert.min3')}}
                    </template>
                    <template slot="option" slot-scope="option">
                      {{ option.BranchCommercialTitle }}
                    </template>
                  </v-select>
                </b-form-group>
            </b-col>
             <b-col md="4" lg="3">
                <b-form-group :label="$t('insert.warehouse.PurchaseWarehouseId') + '*'" :class="{ 'form-group--error': $v.warehouseSupplier.purchaseWarehouse.$error }">
                  <v-select v-model="warehouseSupplier.purchaseWarehouse" :options="warehouseList" label="Description1"></v-select>
                </b-form-group>
              </b-col>
              <b-col md="4" lg="3">
                <b-form-group :label="$t('insert.warehouse.ReturnWarehouseId') + '*'" :class="{ 'form-group--error': $v.warehouseSupplier.returnWarehouse.$error }">
                  <v-select v-model="warehouseSupplier.returnWarehouse" :options="warehouseList" label="Description1"></v-select>
                </b-form-group>
              </b-col>
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
import mixin from '../../mixins/index'
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
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'vehicles', 'branchList', 'warehouseList', 'rowData'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getRowData(this.routeName)
  },
  methods: {
    getRowData (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getData', {...this.query, api: `VisionNext${e}/api/${e}`, record: this.$route.params.url})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
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
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
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

        let model = {
          'Model': this.form
        }

        this.$store.dispatch('updateData', {...this.query, api: 'VisionNextWarehouse/api/Warehouse', formdata: model, return: this.$route.meta.baseLink})
      }
    },
    selectedVehicle (e) {
      this.form.VehicleId = e.RecordId
    },
    onVehicleSearch (search, loading) {
      if (search.length >= 3) {
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextVehicle/api/Vehicle/Search',
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
        this.$store.dispatch('acBranch', {...this.query, searchField: 'BranchCommercialTitle', searchText: search})
      }
    },
    selectedBranch (e) {
      this.warehouseSupplier.supplierBranch = e
      this.$store.dispatch('acWarehouse', {...this.query, searchField: 'BranchId', searchText: e.RecordId})
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
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
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
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    },
    rowData: function (e) {
      if (!e) {
        return
      }
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
    }
  }
}
</script>
