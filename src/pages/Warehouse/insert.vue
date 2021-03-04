<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Warehouse' }">
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
            <b-form-input type="text" v-model="form.Code"/>
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
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="4" lg="3">
              <v-select :disabled="!form.IsVehicle" label="VehiclePlateNumber" :options="vehicles" :filterable="false" @search="onVehicleSearch" @input="selectedVehicle">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.VehiclePlateNumber }}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="IsVehicle" :error="$v.form.IsVehicle" md="4" lg="3">
              <NextCheckBox v-model="form.IsVehicle" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsVirtualWarehouse" :error="$v.form.IsVirtualWarehouse" md="4" lg="3">
              <NextCheckBox :disabled="form.IsVehicle ? true : false" v-model="form.IsVirtualWarehouse" type="number" toggle />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber" md="4" lg="3">
              <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="4" lg="3">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2" md="4" lg="3">
              <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
            </NextFormGroup>
          </b-row>
          <NextAddress v-show="!form.IsVehicle && !form.IsVirtualWarehouse" v-model="address"/>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')" v-if="!form.IsVehicle" @click.prevent="tabValidation()">
          <b-row>
          <NextFormGroup :title="$t('insert.warehouse.SupplierBranchId')" :error="$v.warehouseSupplier.supplierBranch" :required="true">
            <v-select v-model="warehouseSupplier.selectedBranch" label="BranchCommercialTitle" :filterable="false" :options="branchList" @search="onBranchSearch" @input="selectedBranch">
              <template slot="no-options">
                {{$t('insert.min3')}}
              </template>
              <template slot="option" slot-scope="option">
                {{ option.BranchCommercialTitle }}
              </template>
            </v-select>
          </NextFormGroup>
           <NextFormGroup :title="$t('insert.warehouse.PurchaseWarehouseId')" :error="$v.warehouseSupplier.purchaseWarehouse" :required="true">
              <v-select v-model="warehouseSupplier.purchaseWarehouse" :options="warehouseList" label="Description1"></v-select>
           </NextFormGroup>
           <NextFormGroup :title="$t('insert.warehouse.ReturnWarehouseId')" :error="$v.warehouseSupplier.returnWarehouse" :required="true">
              <v-select v-model="warehouseSupplier.returnWarehouse" :options="warehouseList" label="Description1"></v-select>
            </NextFormGroup>
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
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
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
        StatusId: 1,
        IsVehicle: Number,
        VehicleId: null,
        LicenseNumber: null,
        FinanceCode: null,
        FinanceCode2: null,
        Address: null,
        CityId: null,
        DistrictId: null,
        IsVirtualWarehouse: Number,
        NonSapWarehouse: Number,
        WarehouseSuppliers: []
      },
      routeName: this.$route.meta.baseLink,
      warehouseSupplier: {
        supplierBranch: null,
        purchaseWarehouse: null,
        returnWarehouse: null
      },
      warehouseSuppliers: [],
      address: {}
    }
  },
  computed: {
    ...mapState(['vehicles', 'branchList', 'warehouseList'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.createManualCode()
    },
    save () {
      this.$v.form.$touch()
      console.log(this.form.IsVehicle)

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
            this.form.IsVirtualWarehouse = null
          } else {
            this.form.CityId = this.address.CityId
            this.form.DistrictId = this.address.DistrictId
            this.form.AddressDetail = this.address.Address
          }
        }

        this.createData()
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

      this.warehouseSuppliers.push(this.warehouseSupplier)
      this.warehouseSupplier = {}
      this.$v.warehouseSupplier.$reset()
    },
    removeItems (item) {
      this.warehouseSuppliers.splice(this.warehouseSuppliers.indexOf(item), 1)
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
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
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
  }
}
</script>
