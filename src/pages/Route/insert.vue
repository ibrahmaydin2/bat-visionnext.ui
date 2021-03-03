<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Route' }">
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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.RouteTypeId != null ? insertVisible.RouteTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.RouteTypeId + (insertRequired.RouteTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteTypeId.$error }">
              <v-select :options="routeTypes" @input="selectedRouteType" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle />
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.route.detail')" active>
          <b-row>
            <b-col v-if="insertVisible.RouteGroupId != null ? insertVisible.RouteGroupId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.RouteGroupId + (insertRequired.RouteGroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteGroupId.$error }">
                <v-select
                  :options="lookup.ROUTE_GROUP"
                  @input="selectedRouteGroup"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RouteClassId != null ? insertVisible.RouteClassId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.RouteClassId + (insertRequired.RouteClassId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteClassId.$error }">
                <v-select
                  :options="lookup.ROUTE_CLASS"
                  @input="selectedType('RouteClassId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.VehicleId != null ? insertVisible.VehicleId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.VehicleId + (insertRequired.VehicleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehicleId.$error }">
                <v-select :options="vehicles" @input="selectedVehicle" label="VehiclePlateNumber"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select :options="employees" @input="selectedEmployee" label="nameSurname"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.control')">
                <v-select :options="lookup.VISIT_START_CONTROL" @input="selectedControl" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsMultidayRoute != null ? insertVisible.IsMultidayRoute : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.IsMultidayRoute + (insertRequired.IsMultidayRoute === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsMultidayRoute.$error }">
                <NextCheckBox v-model="form.IsMultidayRoute" type="number" toggle />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsSuperRoute != null ? insertVisible.IsSuperRoute : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.IsSuperRoute + (insertRequired.IsSuperRoute === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsSuperRoute.$error }">
                <NextCheckBox v-model="form.IsSuperRoute" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.CityId != null ? insertVisible.CityId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.CityId + (insertRequired.CityId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CityId.$error }">
                <v-select
                  :options="lookup.CITY"
                  @input="selectedCity"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DistrictId != null ? insertVisible.DistrictId : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.DistrictId + (insertRequired.DistrictId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DistrictId.$error }">
                <v-select
                  :disabled="!cityValid"
                  :options="distiricts"
                  @input="selectedDistirict"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ParishIds != null ? insertVisible.ParishIds : developmentMode" cols="12" md="3" lg="2">
              <b-form-group :label="insertTitle.ParishIds + (insertRequired.ParishIds === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ParishIds.$error }">
                <v-select
                  :disabled="!distirictValid"
                  :options="avenues"
                  @input="selectedAvenue"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="showCustomerRegion">
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="customerRegionLabel">
                <v-select :options="routeTypeOptions" @input="selectedCustomerRegion" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.route.locations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.CustomerId')">
                <v-select label="CommercialTitle" :filterable="false" :options="customerList" @search="onCustomerSearch" @input="selectedCustomer">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.CommercialTitle }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.LocationId')">
                <v-select label="Description1" :filterable="false" :options="customerLocationsList"  @search="onLocationSearch" @input="selectedSearchType('LocationId', $event)" >
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day1VisitOrder')">
                <b-form-input type="number" v-model="Day1VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day2VisitOrder')">
                <b-form-input type="number" v-model="Day2VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day3VisitOrder')">
                <b-form-input type="number" v-model="Day3VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day4VisitOrder')">
                <b-form-input type="number" v-model="Day4VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day5VisitOrder')">
                <b-form-input type="number" v-model="Day5VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day6VisitOrder')">
                <b-form-input type="number" v-model="Day6VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day7VisitOrder')">
                <b-form-input type="number" v-model="Day7VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.Day1FreStartDate')">
                <b-form-datepicker
                  v-model="DaysFreStartDate"
                  locale="tr"
                  class="mb-2"
                  :value-as-date="true"
                >
                </b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.Day1Frequency')">
                <b-form-input type="number" v-model="DaysFrequency" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button @click="addCustomerLocation" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.model.routeDetails.length > 0">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.route.CustomerId')}}</span></b-th>
                <b-th><span>{{$t('insert.route.LocationId')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day1VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day2VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day3VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day4VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day5VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day6VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('insert.route.Day7VisitOrder')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.model.routeDetails" :key="'dl' + i">
                  <b-td>{{r.CustomerId}}</b-td>
                  <b-td>{{r.LocationId}}</b-td>
                  <b-td>{{r.Day1VisitOrder}}</b-td>
                  <b-td>{{r.Day2VisitOrder}}</b-td>
                  <b-td>{{r.Day3VisitOrder}}</b-td>
                  <b-td>{{r.Day4VisitOrder}}</b-td>
                  <b-td>{{r.Day5VisitOrder}}</b-td>
                  <b-td>{{r.Day6VisitOrder}}</b-td>
                  <b-td>{{r.Day7VisitOrder}}</b-td>
                  <b-td class="text-center"><i @click="removeRouteDetails(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <b-col>
              <code>{{form}}</code>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <h3>Form Elements</h3>
              <p>
                {{insertFormdata}}
              </p>
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
        model: {
          Deleted: 0,
          System: 0,
          RecordState: 2,
          code: null,
          description1: null,
          representativeId: null,
          vehicleId: null,
          routeTypeId: null,
          routeClassId: null,
          routeGroupId: null,
          statusId: 1,
          customerRegion5Id: null,
          isMultidayRoute: null,
          isSuperRoute: null,
          visitStartControlId: null,
          cityId: null,
          districtId: null,
          parishIds: null,
          routeDetails: []
        }
      },
      showCustomerRegion: false,
      customerRegionLabel: '',
      selectedParishes: [],
      Day1VisitOrder: null,
      Day2VisitOrder: null,
      Day3VisitOrder: null,
      Day4VisitOrder: null,
      Day5VisitOrder: null,
      Day6VisitOrder: null,
      Day7VisitOrder: null,
      DaysFreStartDate: null,
      DaysFrequency: null,
      selectedCustomerArr: [],
      selectedLocationArr: [],
      customerLocationTable: [],
      cityValid: null,
      distirictValid: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'distiricts', 'avenues', 'createCode', 'employees', 'vehicles', 'routeTypes', 'routeTypeOptions', 'customerLocationsList', 'customerList', 'lookup'])
  },
  mounted () {
    // this.$store.commit('setCities', false)
    this.$store.commit('bigLoaded', false)
    this.getDatas()
  },
  methods: {
    getDatas () {
      this.$store.dispatch('getInsertRules', {...this.query, api: 'Route'})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextRoute/api/Route/GetCode'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'employees'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/RouteType/Search', name: 'routeTypes'})
    },
    save () {
      // if (this.selectedParishes.length > 0) {
      //   this.selectedParishes.map(item => {
      //     this.form.model.parishIds.push(item.DecimalValue)
      //   })
      // } else {
      //   this.form.model.parishIds = []
      // }
      this.$store.dispatch('createData', {...this.query, api: 'VisionNextRoute/api/Route', formdata: this.form, return: this.$route.meta.baseLink})
    },
    selectedRouteType (e) {
      let payload = {
        name: 'routeTypeOptions',
        data: []
      }
      if (e) {
        this.form.model.routeTypeId = e.RecordId
        if (e.RecordId === 1 || e.RecordId === 6) {
          this.showCustomerRegion = true
          this.customerRegionLabel = this.$t('insert.route.customerArea')
          this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_REGION_5', name: payload.name})
        } else if (e.RecordId === 5) {
          this.customerRegionLabel = this.$t('insert.route.marketingArea')
          this.showCustomerRegion = true
          this.$store.dispatch('getLookups', {...this.query, type: 'MARKETING_REGION_5', name: payload.name})
        } else {
          this.form.model.customerRegion5Id = null
          this.showCustomerRegion = false
          this.$store.commit('setValues', payload)
        }
      } else {
        this.form.model.routeTypeId = null
        this.form.model.customerRegion5Id = null
        this.showCustomerRegion = false
        this.$store.commit('setValues', payload)
      }
    },
    selectedRouteGroup (e) {
      if (e) {
        this.form.model.routeGroupId = e.DecimalValue
      } else {
        this.form.model.routeGroupId = null
      }
    },
    selectedRouteClass (e) {
      if (e) {
        this.form.model.routeClassId = e.DecimalValue
      } else {
        this.form.model.routeClassId = null
      }
    },
    selectedVehicle (e) {
      if (e) {
        this.form.model.vehicleId = e.RecordId
      } else {
        this.form.model.vehicleId = null
      }
    },
    selectedControl (e) {
      if (e) {
        this.form.model.visitStartControlId = e.DecimalValue
      } else {
        this.form.model.visitStartControlId = null
      }
    },
    selectedCity (e) {
      if (e) {
        this.form.model.cityId = e.DecimalValue
        this.cityValid = true
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: e.DecimalValue})
      } else {
        this.form.model.districtId = null
        this.form.model.cityId = null
      }
    },
    selectedDistirict (e) {
      if (e) {
        this.form.model.districtId = e.DecimalValue
        this.distirictValid = true
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'AVENUE', name: 'avenues', upperValue: e.DecimalValue})
      } else {
        this.form.model.districtId = null
        this.form.model.parishIds = null
      }
    },
    selectedAvenue (e) {
      if (e.length > 0) {
        this.selectedParishes = e
      } else {
        this.selectedParishes = []
      }
    },
    selectedEmployee (e) {
      if (e) {
        this.form.model.representativeId = e.RecordId
      } else {
        this.form.model.representativeId = null
      }
    },
    selectedCustomerRegion (e) {
      if (e) {
        this.form.model.customerRegion5Id = e.DecimalValue
      } else {
        this.form.model.customerRegion5Id = null
      }
    },
    onCustomerSearch (search) {
      if (search.length >= 3) {
        this.$store.dispatch('acCustomer', {...this.query, searchField: 'CommercialTitle', searchText: search})
      }
    },
    selectedCustomer (e) {
      if (e) {
        this.selectedCustomerArr = e
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextCustomer/api/CustomerLocation/Search',
          name: 'customerLocationsList',
          andConditionModel: {
            customerIds: [e.RecordId]
          }
        })
      } else {
        this.selectedCustomerArr = []
        this.selectedLocationArr = []
      }
    },
    selectedCustomerLocation (e) {
      if (e) {
        this.selectedLocationArr = e
      } else {
        this.selectedLocationArr = []
      }
    },
    onLocationSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchLocation(loading, search, this)
      }
    },
    searchLocation (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/CustomerLocation/Search',
        name: 'customerLocationsList',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    addCustomerLocation () {
      if (this.selectedCustomerArr.length < 1 || this.selectedLocationArr < 1) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.form.model.routeDetails.push({
        CustomerId: this.selectedCustomerArr.RecordId,
        LocationId: this.selectedLocationArr.RecordId,
        Day1Frequency: this.DaysFrequency,
        Day1FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day1VisitOrder: this.Day1VisitOrder,
        Day2Frequency: this.DaysFrequency,
        Day2FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day2VisitOrder: this.Day2VisitOrder,
        Day3Frequency: this.DaysFrequency,
        Day3FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day3VisitOrder: this.Day3VisitOrder,
        Day4Frequency: this.DaysFrequency,
        Day4FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day4VisitOrder: this.Day4VisitOrder,
        Day5Frequency: this.DaysFrequency,
        Day5FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day5VisitOrder: this.Day5VisitOrder,
        Day6Frequency: this.DaysFrequency,
        Day6FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day6VisitOrder: this.Day6VisitOrder,
        Day7Frequency: this.DaysFrequency,
        Day7FreStartDate: this.dateConvertToISo(this.DaysFreStartDate),
        Day7VisitOrder: this.Day7VisitOrder,
        StatusId: 1,
        AnnualVisitCount: null // Hesaplaması var öğrenilecek
      })
      this.selectedCustomerArr = []
      this.selectedLocationArr = []
    },
    removeRouteDetails (item) {
      this.form.model.routeDetails.splice(this.form.model.routeDetails.indexOf(item), 1)
    }
  },
  watch: {
    createCode (e) {
      this.form.model.code = e
    },
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
<style lang="sass" scope>
  table
    & i
      cursor: pointer
</style>
