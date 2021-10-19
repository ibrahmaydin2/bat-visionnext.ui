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
            <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code"></NextInput>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"></NextInput>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.warehouse.Warehouse')" :active="true" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="NonSapWarehouse" :error="$v.form.NonSapWarehouse" md="3" lg="3">
              <NextCheckBox v-model="form.NonSapWarehouse" type="number" toggle :disabled="insertReadonly.NonSapWarehouse" />
            </NextFormGroup>
            <NextFormGroup item-key="IsVehicle" :error="$v.form.IsVehicle" md="3" lg="3">
              <NextCheckBox v-model="form.IsVehicle" type="number" toggle :disabled="insertReadonly.IsVehicle" @input="checkVehicle($event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="3" lg="3">
              <NextDropdown
                v-model="selectedVehicle"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                label="VehiclePlateNumber" :searchable="true"
                @input="selectedSearchType('VehicleId', $event)" :disabled="insertReadonly.VehicleId || !form.IsVehicle"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsVirtualWarehouse" :error="$v.form.IsVirtualWarehouse" md="3" lg="3">
              <NextCheckBox v-model="form.IsVirtualWarehouse" type="number" toggle :disabled="insertReadonly.IsVirtualWarehouse || form.IsVehicle === 1" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber" md="3" lg="3">
              <NextInput type="text" v-model="form.LicenseNumber" :disabled="insertReadonly.LicenseNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="3" lg="3">
              <NextInput type="text" v-model="form.FinanceCode" :disabled="insertReadonly.FinanceCode"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2" md="3" lg="3">
              <NextInput type="text" v-model="form.FinanceCode2" :disabled="insertReadonly.FinanceCode2"></NextInput>
            </NextFormGroup>
          </b-row>
          <NextAddress v-show="!form.IsVehicle && !form.IsVirtualWarehouse" v-model="address"/>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')" v-if="!form.IsVehicle" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.WarehouseSuppliers" :items="locationItems" :before-add="beforeAdd"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
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
      address: {},
      selectedVehicle: null,
      locationItems: detailData.locationItems
    }
  },
  mounted () {
    this.createManualCode()
    this.setLicenseNumber()
  },
  methods: {
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
        this.form.IsVirtualWareHouse = this.form.IsVirtualWarehouse
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
        this.createData()
      }
    },
    checkVehicle (value) {
      if (value !== 1) {
        this.form.VehicleId = null
        this.selectedVehicle = null
      }
    },
    beforeAdd (form) {
      if (!form.PurchaseWarehouseId && !form.ReturnWarehouseId) {
        this.$toasted.show(this.$t('insert.warehouse.warehousesAreRequired'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      return true
    },
    setLicenseNumber () {
      let request = {
        andConditionModel: {
          IsVehicle: 0,
          IsCustomerWarehouse: 0,
          StatusId: 1,
          IsVirtualWareHouse: 0,
          NonSapWarehouse: 0
        },
        page: 1,
        OrderByColumns: [
          {
            column: 'CreatedDateTime',
            orderByType: 0
          }
        ]
      }

      this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/Search', 1).then(response => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.form.LicenseNumber = response.ListModel.BaseModels[0].LicenseNumber
        }
      })
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
      form: this.insertRules
    }
  }
}
</script>
