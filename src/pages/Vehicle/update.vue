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
           <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.vehicles.code')"
            >
              <b-form-input type="text" v-model="form.model.code" readonly/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group :label="$t('insert.vehicles.driver')">
              <v-select v-model="defaultDriverEmployee" :options="employees" @input="selectedDriver" label="nameSurname"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.vehicles.plaque')"
            >
              <b-form-input type="text" v-model="form.model.vehiclePlateNumber"/>
            </b-form-group>
          </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.assetNo')">
                <b-form-input type="text" v-model="form.model.assetNumber"/>
              </b-form-group>
            </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.vehicles.state')"
            >
              <b-form-checkbox v-model="statusId" name="check-button" switch>
                {{(statusId) ? $t('insert.vehicles.active'): $t('insert.vehicles.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.trademark')">
                <v-select v-model="brand" :options="vehicleBrands" @input="selectedVehicleBrand" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.model')">
                <v-select v-model="model" :options="vehicleModels" @input="selectedVehicleModel" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.year')">
                <b-form-input type="text" v-model="form.model.modelYear"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.vehicles.isRouteVehicle')"
              >
                <b-form-radio-group id="radio-group-route-vehicle" v-model="form.model.isRouteVehicle">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.vehicleType')">
                <v-select v-model="type" :options="vehicleTypes" @input="selectedVehicleType" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.vehicles.isStore')"
              >
                <b-form-radio-group id="radio-group-is-store" v-model="form.model.useAsWarehouse">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.vehicles.isAsset')"
              >
                <b-form-radio-group id="radio-group-is-asset" v-model="form.model.isBranchLocation">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.additionalInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.vehicleKind')">
                <v-select v-model="usageType" :options="vehicleUsageTypes" @input="selectedVehicleUsageType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.colorCode')">
                <v-select v-model="color" :options="vehicleColors" @input="selectedVehicleColor" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.volumeCapacity')">
                <b-form-input type="number" v-model="form.model.volumeCp"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.volumeUnit')">
                <v-select v-model="volumeUnit" :options="vehicleUnits" @input="selectedVolumeUnit" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.weightCapacity')">
                <b-form-input type="number" v-model="form.model.weightCp"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.weightUnit')">
                <v-select v-model="weightUnit" :options="vehicleUnits" @input="selectedWeightUnit" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.contractEndDate')">
                <b-form-datepicker id="contract-datepicker" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.model.contractEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.vehicleCategory1')">
                <v-select v-model="category1" :options="vehicleCategory1" @input="selectedCategory1" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.vehicleCategory2')">
                <v-select v-model="category2" :options="vehicleCategory2" @input="selectedCategory2" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicles.vehicleCategory3')">
                <v-select v-model="category3" :options="vehicleCategory3" @input="selectedCategory3" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.replacementDrivers')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <v-select v-model="selectedEmployee" :options="employees" @input="selectedReplacementDriver" label="nameSurname"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button @click="addReplacementDriver()" size="sm" variant="success">{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="12" lg="12">
              <b-table-simple>
                <b-thead>
                  <tr>
                    <th>İsim</th>
                    <th>Kod</th>
                  </tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in replacmentDrivers" :key="'dl' + i">
                    <b-td>{{r.nameSurname}}</b-td>
                    <b-td>{{r.code}}</b-td>
                    <b-td><i @click="deleteReplacementDriver(r)" class="far fa-trash-alt text-danger"></i></b-td>
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

export default {
  data () {
    return {
      form: {
        model: {
          recordId: null,
          deleted: 0,
          code: null,
          assetNumber: null,
          vehiclePlateNumber: null,
          defaultDriverEmployeeId: null,
          vehicleTypeId: null,
          statusId: null,
          modelYear: null,
          brandId: null,
          modelId: null,
          useAsWarehouse: 0,
          isRouteVehicle: 0,
          isBranchLocation: 0,
          usageTypeId: null,
          category1Id: null,
          category2Id: null,
          category3Id: null,
          volumeCpUnitId: null,
          volumeCp: null,
          weightCpUnitId: null,
          weightCp: null,
          colorId: null,
          contractEndDate: null,
          vehicleReplacementDrivers: []
        }
      },
      selectedEmployee: null,
      replacmentDrivers: [],
      statusId: true,
      defaultDriverEmployee: null,
      brand: null,
      model: null,
      type: null,
      usageType: null,
      color: null,
      volumeUnit: null,
      weightUnit: null,
      category1: null,
      category2: null,
      category3: null
    }
  },
  computed: {
    ...mapState(['rowData', 'employees', 'vehicleTypes', 'vehicleBrands', 'vehicleModels', 'vehicleUsageTypes', 'vehicleCategory1', 'vehicleCategory2', 'vehicleCategory3', 'vehicleColors', 'vehicleUnits'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getData()
    this.$store.dispatch('getEmployeesByBranchId')
    this.getLookups()
  },
  methods: {
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextVehicle/api/Vehicle', record: this.$route.params.url})
    },
    getLookups () {
      // Nameler store içerisinde statelerde statik oluşuturuluyor. Tek bir servis kullanmak için böyle yapıldı.
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_TYPE', name: 'vehicleTypes'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_BRAND', name: 'vehicleBrands'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_MODEL', name: 'vehicleModels'})
      this.$store.dispatch('getLookups', {...this.query, type: 'USAGE_TYPE', name: 'vehicleUsageTypes'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_CATEGORY_1', name: 'vehicleCategory1'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_CATEGORY_2', name: 'vehicleCategory2'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VEHICLE_CATEGORY_3', name: 'vehicleCategory3'})
      this.$store.dispatch('getLookups', {...this.query, type: 'COLOR', name: 'vehicleColors'})
      this.$store.dispatch('getLookups', {...this.query, type: 'UNIT', name: 'vehicleUnits'})
    },
    selectedDriver (e) {
      this.form.model.defaultDriverEmployeeId = e.RecordId
    },
    selectedVehicleType (e) {
      this.form.model.vehicleTypeId = e.DecimalValue
    },
    selectedVehicleBrand (e) {
      this.form.model.brandId = e.DecimalValue
    },
    selectedVehicleModel (e) {
      this.form.model.modelId = e.DecimalValue
    },
    selectedVehicleUsageType (e) {
      this.form.model.usageTypeId = e.DecimalValue
    },
    selectedVehicleColor (e) {
      this.form.model.colorId = e.DecimalValue
    },
    selectedCategory1 (e) {
      this.form.model.category1Id = e.DecimalValue
    },
    selectedCategory2 (e) {
      this.form.model.category2Id = e.DecimalValue
    },
    selectedCategory3 (e) {
      this.form.model.category3Id = e.DecimalValue
    },
    selectedVolumeUnit (e) {
      this.form.model.volumeCpUnitId = e.DecimalValue
    },
    selectedWeightUnit (e) {
      this.form.model.weightCpUnitId = e.DecimalValue
    },
    selectedReplacementDriver (e) {
      this.selectedEmployee = e
    },
    addReplacementDriver () {
      if (!this.selectedEmployee) {
        return
      }
      this.form.model.vehicleReplacementDrivers.push({
        code: '',
        description1: this.selectedEmployee.Name + ' ' + this.selectedEmployee.Surname,
        driverId: this.selectedEmployee.RecordId,
        recordState: 2
      })
      this.replacmentDrivers.push({
        nameSurname: this.selectedEmployee.Name + ' ' + this.selectedEmployee.Surname,
        code: this.selectedEmployee.Code,
        id: this.selectedEmployee.RecordId
      })
      this.selectedEmployee = null
    },
    deleteReplacementDriver (item) {
      console.log(this.form.model.vehicleReplacementDrivers)
      // Model içerisindeki vehicleReplacementDrivers dizisinden elemanın çıkarılması
      let filteredArr = this.form.model.vehicleReplacementDrivers.filter(i => i.driverId === item.id)
      this.form.model.vehicleReplacementDrivers.splice(this.form.model.vehicleReplacementDrivers.indexOf(filteredArr[0]), 1)
      if (filteredArr[0].recordState === 3) {
        console.log(filteredArr[0])
        this.form.model.vehicleReplacementDrivers.push({
          code: filteredArr[0].code,
          description1: filteredArr[0].description1,
          driverId: filteredArr[0].driverId,
          recordState: 4,
          vehicleId: filteredArr[0].vehicleId,
          RecordId: filteredArr[0].recordId
        })
      }

      this.replacmentDrivers.splice(this.replacmentDrivers.indexOf(item), 1)
    },
    save () {
      this.form.model.contractEndDate = this.form.model.contractEndDate ? new Date(this.form.model.contractEndDate).toISOString() : ''
      this.form.model.statusId = this.statusId ? 1 : 0
      this.$store.dispatch('updateData', {...this.query, api: 'VisionNextVehicle/api/Vehicle', formdata: this.form, return: this.$route.meta.baseLink})
    }
  },
  watch: {
    employees (e) {
      if (e) {
        e.map(item => {
          item.nameSurname = `${item.Name} ${item.Surname}`
        })
      }
    },
    rowData (e) {
      if (e) {
        this.form.model = {
          code: e.Code,
          assetNumber: e.AssetNumber,
          vehiclePlateNumber: e.VehiclePlateNumber,
          defaultDriverEmployeeId: e.DefaultDriverEmployeeId,
          vehicleTypeId: e.VehicleTypeId,
          statusId: e.StatusId,
          modelYear: e.ModelYear,
          brandId: e.BrandId,
          modelId: e.ModelId,
          useAsWarehouse: e.UseAsWarehouse,
          isRouteVehicle: e.IsRouteVehicle,
          isBranchLocation: e.IsBranchLocation,
          usageTypeId: e.UsageTypeId,
          category1Id: e.Category1Id,
          category2Id: e.Category2Id,
          category3Id: e.Category3Id,
          volumeCpUnitId: e.VolumeCpUnitId,
          volumeCp: e.VolumeCp,
          weightCpUnitId: e.WeightCpUnitId,
          weightCp: e.WeightCp,
          colorId: e.ColorId,
          contractEndDate: e.ContractEndDate,
          vehicleReplacementDrivers: [],
          recordId: e.RecordId,
          deleted: e.Deleted
        }

        this.statusId = !!e.StatusId
        // selectedEmployee: null,
        // replacmentDrivers: [],
        // statusId: true
        if (e.DefaultDriverEmployee) {
          this.defaultDriverEmployee = e.DefaultDriverEmployee.Label
        }
        if (e.Brand) {
          this.brand = e.Brand.Label
        }
        if (e.Model) {
          this.model = e.Model.Label
        }
        if (e.VehicleType) {
          this.type = e.VehicleType.Label
        }
        if (e.UsageType) {
          this.usageType = e.UsageType.Label
        }
        if (e.Color) {
          this.color = e.Color.Label
        }
        if (e.VolumeCpUnit) {
          this.volumeUnit = e.VolumeCpUnit.Label
        }
        if (e.WeightCpUnit) {
          this.weightUnit = e.WeightCpUnit.Label
        }
        if (e.Category1) {
          this.category1 = e.Category1.Label
        }
        if (e.Category2) {
          this.category2 = e.Category2.Label
        }
        if (e.Category3) {
          this.category3 = e.Category3.Label
        }

        e.VehicleReplacementDrivers.map(item => {
          this.form.model.vehicleReplacementDrivers.push({
            code: '',
            description1: item.Description1,
            driverId: item.DriverId,
            vehicleId: item.VehicleId,
            recordState: 3,
            recordId: item.RecordId
          })
          this.replacmentDrivers.push({
            nameSurname: item.DriverEmployee ? item.DriverEmployee.Label : '',
            code: item.Code,
            id: item.DriverId
          })
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
