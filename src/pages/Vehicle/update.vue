<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Vehicle' }">
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
          <NextFormGroup item-key="DefaultDriverEmployeeId" :error="$v.form.DefaultDriverEmployeeId">
            <NextDropdown
              v-model="defaultDriverEmployee"
              url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable
              @input="selectedSearchType('DefaultDriverEmployeeId', $event)"
              orConditionFields="Code,Description1,CommercialTitle,Name,Surname"
              :dynamic-and-condition="{ StatusId: 1 }"
              :disabled="insertReadonly.DefaultDriverEmployeeId" />
          </NextFormGroup>
          <NextFormGroup item-key="VehiclePlateNumber" :error="$v.form.VehiclePlateNumber">
            <NextInput v-model="form.VehiclePlateNumber" type="text" :disabled="insertReadonly.VehiclePlateNumber" />
          </NextFormGroup>
          <NextFormGroup item-key="AssetNumber" :error="$v.form.AssetNumber">
            <NextInput v-model="form.AssetNumber" type="text" :disabled="insertReadonly.AssetNumber" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId">
              <NextDropdown
                v-model="brand"
                lookup-key="VEHICLE_BRAND"
                @input="selectedType('BrandId', $event)"
                :disabled="insertReadonly.BrandId" />
            </NextFormGroup>
            <NextFormGroup item-key="ModelId" :error="$v.form.ModelId">
              <NextDropdown
                v-model="model"
                lookup-key="VEHICLE_MODEL"
                @input="selectedType('ModelId', $event)"
                :disabled="insertReadonly.ModelId" />
            </NextFormGroup>
            <NextFormGroup item-key="ModelYear" :error="$v.form.ModelYear">
              <NextInput v-model="form.ModelYear" type="number" :disabled="insertReadonly.ModelYear" maxLength="4" :oninput="maxLengthControl" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleTypeId" :error="$v.form.VehicleTypeId">
              <NextDropdown
                v-model="vehicleType"
                lookup-key="VEHICLE_TYPE"
                @input="selectedType('VehicleTypeId', $event)"
                :disabled="insertReadonly.VehicleTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="IsRouteVehicle" :error="$v.form.IsRouteVehicle">
              <NextCheckBox v-model="form.IsRouteVehicle" type="number" :disabled="insertReadonly.IsRouteVehicle" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="IsBranchLocation" :error="$v.form.IsBranchLocation">
              <NextCheckBox v-model="form.IsBranchLocation" type="number" :disabled="insertReadonly.IsBranchLocation" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="UseAsWarehouse" :error="$v.form.UseAsWarehouse">
              <NextCheckBox v-model="form.UseAsWarehouse" type="number" :disabled="insertReadonly.UseAsWarehouse" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.additionalInfo')"  @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="UsageTypeId" :error="$v.form.UsageTypeId">
              <NextDropdown
                v-model="usageType"
                lookup-key="USAGE_TYPE"
                @input="selectedType('UsageTypeId', $event)"
                :disabled="insertReadonly.UsageTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="ColorId" :error="$v.form.ColorId">
              <NextDropdown
                v-model="color"
                lookup-key="COLOR"
                @input="selectedType('ColorId', $event)"
                :disabled="insertReadonly.ColorId" />
            </NextFormGroup>
            <NextFormGroup item-key="VolumeCp" :error="$v.form.VolumeCp">
              <NextInput v-model="form.VolumeCp" type="number" :disabled="insertReadonly.VolumeCp" />
            </NextFormGroup>
            <NextFormGroup item-key="VolumeCpUnitId" :error="$v.form.VolumeCpUnitId">
              <NextDropdown
                v-model="volumeUnit"
                lookup-key="UNIT"
                @input="selectedType('VolumeCpUnitId', $event)"
                :disabled="insertReadonly.VolumeCpUnitId" />
            </NextFormGroup>
            <NextFormGroup item-key="WeightCp" :error="$v.form.WeightCp">
              <NextInput v-model="form.WeightCp" type="number" :disabled="insertReadonly.WeightCp" />
            </NextFormGroup>
            <NextFormGroup item-key="WeightCpUnitId" :error="$v.form.WeightCpUnitId">
              <NextDropdown
                v-model="weightUnit"
                lookup-key="UNIT"
                @input="selectedType('WeightCpUnitId', $event)"
                :disabled="insertReadonly.WeightCpUnitId" />
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown
                v-model="category1"
                lookup-key="VEHICLE_CATEGORY_1"
                @input="selectedType('Category1Id', $event)"
                :disabled="insertReadonly.Category1Id" />
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.Category2Id">
              <NextDropdown
                v-model="category2"
                lookup-key="VEHICLE_CATEGORY_2"
                @input="selectedType('Category2Id', $event)"
                :disabled="insertReadonly.Category2Id" />
            </NextFormGroup>
            <NextFormGroup item-key="Category3Id" :error="$v.form.Category3Id">
              <NextDropdown
                v-model="category3"
                lookup-key="VEHICLE_CATEGORY_3"
                @input="selectedType('Category2Id', $event)"
                :disabled="insertReadonly.Category3Id" />
            </NextFormGroup>
            <NextFormGroup item-key="ContractEndDate" :error="$v.form.ContractEndDate">
              <NextDatePicker v-model="form.ContractEndDate" :disabled="insertReadonly.ContractEndDate" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.replacementDrivers')"  @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.VehicleReplacementDrivers" :items="vehicleReplacementDriverItems"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { detailData } from './detailPanelData'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Code: null,
        AssetNumber: null,
        VehiclePlateNumber: null,
        DefaultDriverEmployeeId: null,
        VehicleTypeId: null,
        StatusId: 1,
        ModelYear: null,
        BrandId: null,
        ModelId: null,
        UseAsWarehouse: 0,
        IsRouteVehicle: 0,
        IsBranchLocation: 0,
        UsageTypeId: null,
        Category1Id: null,
        Category2Id: null,
        Category3Id: null,
        VolumeCpUnitId: null,
        VolumeCp: null,
        WeightCpUnitId: null,
        WeightCp: null,
        ColorId: null,
        ContractEndDate: null,
        VehicleReplacementDrivers: []
      },
      vehicleReplacementDriverItems: detailData.vehicleReplacementDriverItems,
      defaultDriverEmployee: null,
      brand: null,
      model: null,
      vehicleType: null,
      usageType: null,
      color: null,
      volumeUnit: null,
      weightUnit: null,
      category1: null,
      category2: null,
      category3: null
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
        this.updateData()
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData

      this.defaultDriverEmployee = this.convertLookupValueToSearchValue(rowData.DefaultDriverEmployee)
      this.brand = rowData.Brand
      this.model = rowData.Model
      this.vehicleType = rowData.VehicleType
      this.usageType = rowData.UsageType
      this.color = rowData.Color
      this.volumeUnit = rowData.VolumeCpUnit
      this.weightUnit = rowData.WeightCpUnit
      this.category1 = rowData.Category1
      this.category2 = rowData.Category2
      this.category3 = rowData.Category3
    }
  }
}
</script>
