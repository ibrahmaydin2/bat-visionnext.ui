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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="4" lg="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.DefaultDriverEmployeeId != null ? insertVisible.DefaultDriverEmployeeId : developmentMode" cols="12" md="4" lg="3">
            <b-form-group :label="insertTitle.DefaultDriverEmployeeId + (insertRequired.DefaultDriverEmployeeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultDriverEmployeeId.$error }">
              <v-select :options="(employees ? employees.filter(e => e.StatusId == 1) : [])" @search="onEmployeeSearch" @input="selectedSearchType('DefaultDriverEmployeeId', $event)" label="nameSurname" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.VehiclePlateNumber != null ? insertVisible.VehiclePlateNumber : developmentMode" cols="12" md="4" lg="3">
            <b-form-group :label="insertTitle.VehiclePlateNumber + (insertRequired.VehiclePlateNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehiclePlateNumber.$error }">
              <b-form-input type="text" v-model="form.VehiclePlateNumber"/>
            </b-form-group>
          </b-col>
            <b-col v-if="insertVisible.AssetNumber != null ? insertVisible.AssetNumber : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.AssetNumber + (insertRequired.AssetNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.AssetNumber.$error }">
                <b-form-input type="text" v-model="form.AssetNumber"/>
              </b-form-group>
            </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="4" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.BrandId != null ? insertVisible.BrandId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.BrandId + (insertRequired.BrandId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BrandId.$error }">
                <v-select :options="lookup.VEHICLE_BRAND" @input="selectedType('BrandId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ModelId != null ? insertVisible.ModelId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ModelId + (insertRequired.ModelId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ModelId.$error }">
                <v-select :options="lookup.VEHICLE_MODEL" @input="selectedType('ModelId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ModelYear != null ? insertVisible.ModelYear : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ModelYear + (insertRequired.ModelYear === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ModelYear.$error }">
                <b-form-input type="number" v-model="form.ModelYear"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.VehicleTypeId != null ? insertVisible.VehicleTypeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.VehicleTypeId + (insertRequired.VehicleTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehicleTypeId.$error }">
                <v-select :options="lookup.VEHICLE_TYPE" @input="selectedType('VehicleTypeId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsRouteVehicle != null ? insertVisible.IsRouteVehicle : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.IsRouteVehicle + (insertRequired.IsRouteVehicle === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsRouteVehicle.$error }">
                <b-form-radio-group id="radio-group-route-vehicle" v-model="form.IsRouteVehicle">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsBranchLocation != null ? insertVisible.IsBranchLocation : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.IsBranchLocation + (insertRequired.IsBranchLocation === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBranchLocation.$error }">
                <b-form-radio-group id="radio-group-is-asset" v-model="form.IsBranchLocation">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.UseAsWarehouse != null ? insertVisible.UseAsWarehouse : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.UseAsWarehouse + (insertRequired.UseAsWarehouse === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseAsWarehouse.$error }">
                <b-form-radio-group id="radio-group-is-store" v-model="form.UseAsWarehouse">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.additionalInfo')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.UsageTypeId != null ? insertVisible.UsageTypeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.UsageTypeId + (insertRequired.UsageTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UsageTypeId.$error }">
                <v-select :options="lookup.USAGE_TYPE" @input="selectedType('UsageTypeId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ColorId != null ? insertVisible.ColorId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ColorId + (insertRequired.ColorId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ColorId.$error }">
                <v-select :options="lookup.COLOR" @input="selectedType('ColorId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.VolumeCp != null ? insertVisible.VolumeCp : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.VolumeCp + (insertRequired.VolumeCp === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VolumeCp.$error }">
                <b-form-input type="number" v-model="form.VolumeCp"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.VolumeCpUnitId != null ? insertVisible.VolumeCpUnitId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.VolumeCpUnitId + (insertRequired.VolumeCpUnitId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VolumeCpUnitId.$error }">
                <v-select :options="lookup.UNIT" @input="selectedType('VolumeCpUnitId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.WeightCp != null ? insertVisible.WeightCp : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.WeightCp + (insertRequired.WeightCp === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.WeightCp.$error }">
                <b-form-input type="number" v-model="form.WeightCp"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.WeightCpUnitId != null ? insertVisible.WeightCpUnitId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.WeightCpUnitId + (insertRequired.WeightCpUnitId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.WeightCpUnitId.$error }">
                <v-select :options="lookup.UNIT" @input="selectedType('WeightCpUnitId', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.Category1Id != null ? insertVisible.Category1Id : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.Category1Id + (insertRequired.Category1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                <v-select :options="lookup.VEHICLE_CATEGORY_1" @input="selectedType('Category1Id', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.Category2Id + (insertRequired.Category2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                <v-select :options="lookup.VEHICLE_CATEGORY_2" @input="selectedType('Category2Id', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.Category3Id + (insertRequired.Category3Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                <v-select :options="lookup.VEHICLE_CATEGORY_3" @input="selectedType('Category3Id', $event)" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ContractEndDate != null ? insertVisible.ContractEndDate : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ContractEndDate + (insertRequired.ContractEndDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ContractEndDate.$error }">
                <b-form-datepicker id="contract-datepicker" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.ContractEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.replacementDrivers')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="4" lg="3">
              <b-form-group  :label="$t('insert.vehicles.replacementDriver') + ' *'" :class="{ 'form-group--error': $v.selectedEmployee.$error }">
                <v-select v-model="selectedEmployee" :options="(employees ? employees.filter(e => e.StatusId == 1) : [])" label="nameSurname"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <AddDetailButton @click.native="addReplacementDriver" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.vehicles.driverName')}}</span></b-th>
                  <b-th><span>{{$t('insert.vehicles.driverCode')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(v, i) in form.VehicleReplacementDrivers" :key="i">
                    <b-td>{{v.Description1}}</b-td>
                    <b-td>{{v.Code}}</b-td>
                    <b-td class="text-center"><i @click="deleteReplacementDriver(v)" class="far fa-trash-alt text-danger"></i></b-td>
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
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
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
      selectedEmployee: null
    }
  },
  validations () {
    return {
      form: this.insertRules,
      selectedEmployee: {
        required
      }
    }
  },
  computed: {
    ...mapState(['employees'])
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    onEmployeeSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
          name: 'employees',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    addReplacementDriver () {
      this.$v.selectedEmployee.$touch()
      if (this.$v.selectedEmployee.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.VehicleReplacementDrivers.filter(v => v.Code === this.selectedEmployee.Code)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.VehicleReplacementDrivers.push({
        Description1: this.selectedEmployee.Name + ' ' + this.selectedEmployee.Surname,
        Code: this.selectedEmployee.Code,
        DriverId: this.selectedEmployee.RecordId,
        RecordState: 2
      })
      this.selectedEmployee = null
      this.$v.selectedEmployee.$reset()
    },
    deleteReplacementDriver (item) {
      this.form.VehicleReplacementDrivers.splice(this.form.VehicleReplacementDrivers.indexOf(item), 1)
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
        this.form.ContractEndDate = this.form.ContractEndDate ? new Date(this.form.ContractEndDate).toISOString() : ''
        this.createData()
      }
    }
  },
  watch: {
    employees (e) {
      if (e) {
        e.map(item => {
          item.nameSurname = `${item.Name} ${item.Surname}`
        })
      }
    }
  }
}
</script>
