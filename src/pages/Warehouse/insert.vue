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
              <b-form-group :label="$t('insert.warehouse.Model_Code')">
                <b-form-input type="text" v-model="form.Code" readonly />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="4" lg="3">
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
        <b-tab :title="$t('insert.warehouse.Warehouse')" :active="true">
          <b-row>
            <b-col v-if="insertVisible.NonSapWarehouse != null ? insertVisible.NonSapWarehouse : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.NonSapWarehouse + (insertRequired.NonSapWarehouse === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.NonSapWarehouse.$error }">
                <b-form-checkbox v-model="form.NonSapWarehouse" name="check-button" switch>
                  {{(form.NonSapWarehouse) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.VehicleId != null ? insertVisible.VehicleId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.VehicleId + (insertRequired.VehicleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehicleId.$error }">
                <v-select :disabled="!form.IsVehicle" label="VehiclePlateNumber" :options="vehicleList" :filterable="false" @search="onVehicleSearch" @input="selectedVehicle">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.VehiclePlateNumber }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsVehicle != null ? insertVisible.IsVehicle : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.IsVehicle + (insertRequired.IsVehicle === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsVehicle.$error }">
                <b-form-checkbox v-model="form.IsVehicle" name="check-button" switch>
                  {{(form.IsVehicle) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsVirtualWarehouse != null ? insertVisible.IsVirtualWarehouse : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.IsVirtualWarehouse + (insertRequired.IsVirtualWarehouse === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsVirtualWarehouse.$error }">
                <b-form-checkbox v-model="form.IsVirtualWarehouse" name="check-button" switch>
                  {{(form.IsVirtualWarehouse) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.LicenseNumber != null ? insertVisible.LicenseNumber : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.LicenseNumber + (insertRequired.LicenseNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode2 != null ? insertVisible.FinanceCode2 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.FinanceCode2 + (insertRequired.FinanceCode2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode2.$error }">
                <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="!form.IsVehicle && !form.IsVirtualWarehouse">
            <b-col v-if="insertVisible.Address != null ? insertVisible.Address : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.Address + (insertRequired.Address === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Address.$error }">
                <b-form-textarea v-model="form.Address" placeholder="" />
              </b-form-group>
            </b-col>
             <b-col v-if="insertVisible.CityId != null ? insertVisible.CityId : developmentMode" md="4" lg="3">
                <b-form-group :label="insertTitle.CityId + (insertRequired.CityId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CityId.$error }">
                  <v-select :options="cities" @input="selectCity" label="Label"></v-select>
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.DistrictId != null ? insertVisible.DistrictId : developmentMode" md="4" lg="3">
                <b-form-group :label="insertTitle.DistrictId + (insertRequired.DistrictId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DistrictId.$error }">
                  <v-select v-model="selectedDistrict" :options="distiricts" @input="selectDistirict" label="Label" :disabled="!form.CityId"></v-select>
                </b-form-group>
              </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')" v-if="!form.IsVehicle">
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="$t('insert.warehouse.SupplierBranchId') + '*'">
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
                <b-form-group :label="$t('insert.warehouse.PurchaseWarehouseId')">
                  <v-select v-model="warehouseSupplier.purchaseWarehouse" :options="warehouseList" label="Description1"></v-select>
                </b-form-group>
              </b-col>
              <b-col md="4" lg="3">
                <b-form-group :label="$t('insert.warehouse.ReturnWarehouseId')">
                  <v-select v-model="warehouseSupplier.returnWarehouse" :options="warehouseList" label="Description1"></v-select>
                </b-form-group>
              </b-col>
          </b-row>
          <b-row>
            <b-col md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        Code: null,
        Description1: null,
        StatusId: null,
        IsVehicle: null,
        VehicleId: null,
        LicenseNumber: null,
        FinanceCode: null,
        FinanceCode2: null,
        Address: null,
        CityId: null,
        DistrictId: null,
        IsVirtualWarehouse: null,
        NonSapWarehouse: null,
        WarehouseSuppliers: []
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: null,
      warehouseSupplier: {
        supplierBranch: null,
        purchaseWarehouse: null,
        returnWarehouse: null
      },
      warehouseSuppliers: [],
      selectedDistrict: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'vehicleList', 'cities', 'distiricts', 'branchList', 'warehouseList'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
      this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
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
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.form.IsVehicle && !this.form.VehicleId) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.warehouse.vehicleRequired') })
          return
        }

        if (!this.form.IsVehicle && !this.form.IsVirtualWarehouse) {
          this.form.WarehouseSuppliers = this.warehouseSuppliers.map((item) => {
            var newItem = {
              Deleted: 0,
              System: 0,
              RecordState: 2,
              StatusId: 1,
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
            this.VehicleId = null
          }
        }
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.IsVehicle = this.checkConvertToNumber(this.form.IsVehicle)
        this.form.IsVirtualWarehouse = this.checkConvertToNumber(this.form.IsVirtualWarehouse)
        this.form.NonSapWarehouse = this.checkConvertToNumber(this.form.NonSapWarehouse)

        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    },
    selectCity (e) {
      if (e) {
        this.form.CityId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: e.DecimalValue})
      } else {
        this.form.CityId = null
      }

      this.form.DistrictId = null
      this.selectedDistrict = null
    },
    selectDistirict (e) {
      this.form.DistrictId = e ? e.DecimalValue : null
    },
    selectedVehicle (e) {
      this.form.VehicleId = e.RecordId
    },
    onVehicleSearch (search, loading) {
      if (search.length >= 3) {
        this.$store.dispatch('acVehicle', {...this.query, searchField: 'VehiclePlateNumber', searchText: search})
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
      if (!this.warehouseSupplier.supplierBranch || !this.warehouseSupplier.supplierBranch.RecordId) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return false
      }
      let filteredArr = this.warehouseSuppliers.filter(i => i.supplierBranch.RecordId === this.warehouseSupplier.supplierBranch.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }

      this.warehouseSuppliers.push(this.warehouseSupplier)
      this.warehouseSupplier = {}
    },
    removeItems (item) {
      this.warehouseSuppliers.splice(this.warehouseSuppliers.indexOf(item), 1)
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
    // Status'un değerini true'dan 1'e çeviriyor
    dataStatus: function (e) {
      if (e === true) {
        this.form.StatusId = 1
      } else {
        this.form.StatusId = 0
      }
    }
  }
}
</script>
