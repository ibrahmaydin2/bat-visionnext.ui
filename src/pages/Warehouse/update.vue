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
        <b-tab :title="$t('insert.warehouse.Warehouse')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="NonSapWarehouse" :error="$v.form.NonSapWarehouse">
              <NextCheckBox v-model="form.NonSapWarehouse" type="number" toggle :disabled="insertReadonly.NonSapWarehouse" />
            </NextFormGroup>
            <NextFormGroup item-key="IsVehicle" :error="$v.form.IsVehicle">
              <NextCheckBox v-model="form.IsVehicle" type="number" toggle :disabled="insertReadonly.IsVehicle" @input="checkVehicle($event)" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <NextDropdown
                v-model="selectedVehicle"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :customOption="true"
                :is-vehicle="true"
                orConditionFields="Code,VehiclePlateNumber,Description1"
                label="VehiclePlateNumber" :searchable="true"
                @input="selectedSearchType('VehicleId', $event)" :disabled="insertReadonly.VehicleId || !form.IsVehicle"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsVirtualWarehouse" :error="$v.form.IsVirtualWarehouse">
              <NextCheckBox v-model="form.IsVirtualWarehouse" type="number" toggle :disabled="insertReadonly.IsVirtualWarehouse || form.IsVehicle === 1" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput type="text" v-model="form.LicenseNumber" :disabled="insertReadonly.LicenseNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput type="text" v-model="form.FinanceCode" :disabled="insertReadonly.FinanceCode"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2">
              <NextInput type="text" v-model="form.FinanceCode2" :disabled="insertReadonly.FinanceCode2"></NextInput>
            </NextFormGroup>
          </b-row>
          <NextAddress v-show="!form.IsVehicle && !form.IsVirtualWarehouse" v-model="address" />
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
import mixin from '../../mixins/update'
import { detailData } from './detailPanelData'
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
      selectedVehicle: null,
      address: {},
      locationItems: detailData.locationItems
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setData()
    })
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
        this.updateData()
      }
    },
    checkVehicle (value) {
      if (value !== 1) {
        this.form.VehicleId = null
        this.selectedVehicle = null
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.form.IsVirtualWarehouse = rowData.IsVirtualWareHouse
      if (rowData.Vehicle) {
        this.selectedVehicle = {
          RecordId: rowData.Vehicle.DecimalValue,
          VehiclePlateNumber: rowData.Vehicle.Label
        }
      }
      this.address = {
        CityId: rowData.CityId,
        DistrictId: rowData.DistrictId,
        Address: rowData.AddressDetail
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
