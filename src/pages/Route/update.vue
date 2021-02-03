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
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.route.code')"
            >
              <b-form-input type="text" v-model="form.model.code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.route.rotaType')">
              <v-select v-model="routeType" :options="routeTypes" @input="selectedRouteType" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.route.name')"
            >
              <b-form-input type="text" v-model="form.model.description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.route.state')"
            >
              <b-form-checkbox v-model="statusId" name="check-button" switch>
                {{(statusId) ? $t('insert.route.active'): $t('insert.route.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.route.detail')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.routeGroup')">
                <v-select v-model="routeGroup" :options="routeGroups" @input="selectedRouteGroup" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.routeClass')">
                <v-select v-model="routeClass" :options="routeClasses" @input="selectedRouteClass" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.vehicle')">
                <v-select v-model="vehicle" :options="vehicles" @input="selectedVehicle" label="VehiclePlateNumber"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.personel')">
                <v-select v-model="representative" :options="employees" @input="selectedEmployee" label="nameSurname"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.control')">
                <v-select v-model="visitStartControl" :options="visitStartControls" @input="selectedControl" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.route.multiDayRoute')"
              >
                <b-form-radio-group id="radio-group-multi-day" v-model="form.model.isMultidayRoute">
                  <b-form-radio value="1">{{$t('insert.route.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.route.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.route.superRoute')"
              >
                <b-form-radio-group id="radio-group-super-route" v-model="form.model.isSuperRoute">
                  <b-form-radio value="1">{{$t('insert.route.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.route.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.city')">
                <v-select :options="cities" @input="selectedCity" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.distirict')">
                <v-select :options="distiricts" @input="selectedDistirict" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.town')">
                <b-form-input type="text" v-model="form.town"/>
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
                <v-select label="Description1" :options="customerLocationsList" @input="selectedCustomerLocation">
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
          code: null,
          description1: null,
          representativeId: null,
          vehicleId: null,
          routeTypeId: null,
          routeClassId: null,
          routeGroupId: null,
          statusId: null,
          customerRegion5Id: null,
          isMultidayRoute: null,
          isSuperRoute: null,
          visitStartControlId: null,
          cityId: null,
          districtId: null,
          parishIds: [],
          routeDetails: [],
          deleted: null,
          recordId: null
        }
      },
      statusId: null,
      showCustomerRegion: false,
      customerRegionLabel: '',
      representative: null,
      vehicle: null,
      routeType: null,
      routeClass: null,
      routeGroup: null,
      customerRegion5: null,
      city: null,
      district: null,
      parish: null,
      visitStartControl: null,
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
      customerLocationTable: []
    }
  },
  computed: {
    ...mapState(['cities', 'distiricts', 'rowData', 'employees', 'vehicles', 'routeClasses', 'routeGroups', 'visitStartControls', 'routeTypes', 'routeTypeOptions', 'customerLocationsList', 'customerList'])
  },
  mounted () {
    // this.$store.commit('setCities', false)
    this.$store.commit('bigLoaded', false)
    this.getLookups()
    this.getDatas()
    this.getRowData()
  },
  methods: {
    getRowData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextRoute/api/Route', record: this.$route.params.url})
    },
    getDatas () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'employees'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/RouteType/Search', name: 'routeTypes'})
    },
    getLookups () {
      // Nameler store içerisinde statelerde statik oluşuturuluyor. Tek bir servis kullanmak için böyle yapıldı.
      this.$store.dispatch('getLookups', {...this.query, type: 'ROUTE_CLASS', name: 'routeClasses'})
      this.$store.dispatch('getLookups', {...this.query, type: 'ROUTE_GROUP', name: 'routeGroups'})
      this.$store.dispatch('getLookups', {...this.query, type: 'VISIT_START_CONTROL', name: 'visitStartControls'})
      this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
    },
    save () {
      this.form.model.statusId = this.statusId ? 1 : 0
      this.$store.dispatch('updateData', {...this.query, api: 'VisionNextRoute/api/Route', formdata: this.form, return: this.$route.meta.baseLink})
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
      this.city = e.title
      this.$store.commit('setDistiricts', e.plaka)
    },
    selectedDistirict (e) {
      console.log(e)
      this.distirict = e.id
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
    addCustomerLocation () {
      if (this.selectedCustomerArr.length < 1 || this.selectedLocationArr < 1) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let date = this.dateConvertToISo(this.DaysFreStartDate)
      this.form.model.routeDetails.push({
        CustomerId: this.selectedCustomerArr.RecordId,
        LocationId: this.selectedLocationArr.RecordId,
        Day1Frequency: this.DaysFrequency,
        Day1FreStartDate: date,
        Day1VisitOrder: this.Day1VisitOrder,
        Day2Frequency: this.DaysFrequency,
        Day2FreStartDate: date,
        Day2VisitOrder: this.Day2VisitOrder,
        Day3Frequency: this.DaysFrequency,
        Day3FreStartDate: date,
        Day3VisitOrder: this.Day3VisitOrder,
        Day4Frequency: this.DaysFrequency,
        Day4FreStartDate: date,
        Day4VisitOrder: this.Day4VisitOrder,
        Day5Frequency: this.DaysFrequency,
        Day5FreStartDate: date,
        Day5VisitOrder: this.Day5VisitOrder,
        Day6Frequency: this.DaysFrequency,
        Day6FreStartDate: date,
        Day6VisitOrder: this.Day6VisitOrder,
        Day7Frequency: this.DaysFrequency,
        Day7FreStartDate: date,
        Day7VisitOrder: this.Day7VisitOrder,
        StatusId: 1,
        RecordState: 2,
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
    rowData (e) {
      if (e) {
        this.form.model = {
          code: e.Code,
          description1: e.Description1,
          representativeId: e.RepresentativeId,
          vehicleId: e.VehicleId,
          routeTypeId: e.RouteTypeId,
          routeClassId: e.RouteClassId,
          routeGroupId: e.RouteGroupId,
          statusId: e.StatusId,
          customerRegion5Id: e.CustomerRegion5Id,
          isMultidayRoute: e.IsMultidayRoute,
          isSuperRoute: e.IsSuperRoute,
          visitStartControlId: e.VisitStartControlId,
          cityId: e.CityId,
          districtId: e.DistrictId,
          parishId: e.ParishId,
          routeDetails: e.RouteDetails,
          deleted: e.Deleted,
          recordId: e.RecordId
        }
        this.statusId = !!e.StatusId

        if (e.Representative) {
          this.representative = e.Representative.Label
        }
        if (e.Vehicle) {
          this.vehicle = e.Vehicle.Label
        }
        if (e.RouteClass) {
          this.routeClass = e.RouteClass.Label
        }
        if (e.RouteGroup) {
          this.routeGroup = e.RouteGroup.Label
        }
        if (e.VisitStartControl) {
          this.visitStartControl = e.VisitStartControl.Label
        }
        if (e.RouteType) {
          let payload = {
            name: 'routeTypeOptions',
            data: []
          }
          this.form.model.routeTypeId = e.RouteType.DecimalValue
          this.routeType = e.RouteType.Label
          if (e.RouteType.DecimalValue === 1 || e.RouteType.DecimalValue === 6) {
            this.showCustomerRegion = true
            this.customerRegionLabel = this.$t('insert.route.customerArea')
            this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_REGION_5', name: payload.name})
          } else if (e.RouteType.DecimalValue === 5) {
            this.customerRegionLabel = this.$t('insert.route.marketingArea')
            this.showCustomerRegion = true
            this.$store.dispatch('getLookups', {...this.query, type: 'MARKETING_REGION_5', name: payload.name})
          } else {
            this.form.model.customerRegion5Id = null
            this.showCustomerRegion = false
            this.$store.commit('setValues', payload)
          }
        }

        // routeType
        // customerRegion5
        // city
        // district
        // parish
      }
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
<style lang="sass">
</style>
