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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select v-model="representative" label="Description1" :filterable="false" :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeId', $event)">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <v-select v-model="vehicle" label="VehiclePlateNumber" :filterable="false" :options="vehicles" @search="onVehicleSearch" @input="selectedSearchType('VehicleId', $event)">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteTypeId" :error="$v.form.RouteTypeId">
              <v-select v-model="routeType" label="Description1" :filterable="false" :options="routeTypes" @input="selectedSearchType('RouteTypeId', $event)"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteClassId" :error="$v.form.RouteClassId">
              <v-select
                v-model="routeClass"
                :options="lookup.ROUTE_CLASS"
                @input="selectedType('RouteClassId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="VisitStartControlId" :error="$v.form.VisitStartControlId">
              <v-select
                v-model="visitStartControl"
                :options="lookup.VISIT_START_CONTROL"
                @input="selectedType('VisitStartControlId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="RouteGroupId" :error="$v.form.RouteGroupId">
              <v-select
                v-model="routeGroup"
                :options="lookup.ROUTE_GROUP"
                @input="selectedType('RouteGroupId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion5Id" :error="$v.form.CustomerRegion5Id">
              <v-select
                v-model="customerRegion5"
                :disabled="!showCustomerRegion"
                :options="lookup.CUSTOMER_REGION_5"
                @input="selectedType('CustomerRegion5Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="MarketingRegion5Id" :error="$v.form.CustomerRegion5Id">
              <v-select
                v-model="marketingRegion5"
                :disabled="!showMarketingRegion"
                :options="lookup.MARKETING_REGION_5"
                @input="selectedType('MarketingRegion5Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CityId" :error="$v.form.CityId">
              <v-select
                v-model="city"
                :options="lookup.CITY"
                @input="selectedCity"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="DistrictId" :error="$v.form.DistrictId">
              <v-select
                v-model="district"
                :options="distiricts"
                @input="selectedDistirict"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ParishIds" :error="$v.form.ParishIds">
              <v-select
                :options="avenues"
                @input="selectedType('ParishIds', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="IsSuperRoute" :error="$v.form.IsSuperRoute">
              <NextCheckBox v-model="form.IsSuperRoute" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsMultidayRoute" :error="$v.form.IsMultidayRoute">
              <NextCheckBox v-model="form.IsMultidayRoute" type="number" toggle />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.route.locations')">
          <b-row>
            <NextFormGroup :title="$t('insert.route.CustomerId')" :error="$v.routeDetails.CustomerId" :required="true" md="2" lg="2">
              <v-select v-model="routeDetails.Customer" label="CommercialTitle" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedCustomer">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.LocationId')" :error="$v.routeDetails.LocationId" :required="true" md="2" lg="2">
              <v-select v-model="routeDetails.Location" :disabled="!showCustomerLocation" label="Description1" :filterable="false" :options="customerLocationsList" @input="selectedCustomerLocation" ></v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day1VisitOrder')" :error="$v.routeDetails.Day1VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day1VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day1FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day1Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day2VisitOrder')" :error="$v.routeDetails.Day2VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day2VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day2FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day2Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day3VisitOrder')" :error="$v.routeDetails.Day3VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day3VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day3FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day3Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day4VisitOrder')" :error="$v.routeDetails.Day4VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day4VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day4FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day4Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day5VisitOrder')" :error="$v.routeDetails.Day5VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day5VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day5FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day5Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day6VisitOrder')" :error="$v.routeDetails.Day6VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day6VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day6FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day6Frequency" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day7VisitOrder')" :error="$v.routeDetails.Day7VisitOrder" :required="true" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day7VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.Day7FreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day7Frequency" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerLocation()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.RouteDetails.length > 0">
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
                <b-tr v-for="(r, i) in form.RouteDetails.filter(f => f.RecordState !== 4)" :key="'dl' + i">
                  <b-td>{{(r.RecordState === 2) ? r.Customer : r.Customer.Label}}</b-td>
                  <b-td>{{(r.RecordState === 2) ? r.Location : r.Location.Label}}</b-td>
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
import { required, minValue } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        VisitStartControlId: null,
        IsSuperRoute: null,
        DistrictId: null,
        ParishIds: null,
        Code: null,
        Description1: null,
        RepresentativeId: null,
        VehicleId: null,
        RouteTypeId: null,
        RouteClassId: null,
        RouteGroupId: null,
        StatusId: null,
        CustomerRegion5Id: null,
        IsMultidayRoute: null,
        CityId: null,
        RouteDetails: []
      },
      routeDetails: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        CustomerId: null,
        Customer: null,
        LocationId: null,
        Location: null,
        Day1Frequency: null,
        Day1FreStartDate: null,
        Day1VisitOrder: null,
        Day2Frequency: null,
        Day2FreStartDate: null,
        Day2VisitOrder: null,
        Day3Frequency: null,
        Day3FreStartDate: null,
        Day3VisitOrder: null,
        Day4Frequency: null,
        Day4FreStartDate: null,
        Day4VisitOrder: null,
        Day5Frequency: null,
        Day5FreStartDate: null,
        Day5VisitOrder: null,
        Day6Frequency: null,
        Day6FreStartDate: null,
        Day6VisitOrder: null,
        Day7Frequency: null,
        Day7FreStartDate: null,
        Day7VisitOrder: null,
        StatusId: null,
        AnnualVisitCount: null,
        CompanyId: null,
        BranchId: null,
        Code: null,
        Description1: null
      },
      showCustomerLocation: false,
      showCustomerRegion: false,
      showMarketingRegion: false,
      representative: null,
      vehicle: null,
      routeClass: null,
      routeGroup: null,
      visitStartControl: null,
      city: null,
      district: null,
      parish: null,
      routeType: null,
      customerRegion5: null,
      marketingRegion5: null
    }
  },
  validations () {
    return {
      form: this.insertRules,
      routeDetails: {
        CustomerId: {
          required
        },
        LocationId: {
          required
        },
        Day1VisitOrder: {
          minValue: minValue(0)
        },
        Day2VisitOrder: {
          minValue: minValue(0)
        },
        Day3VisitOrder: {
          minValue: minValue(0)
        },
        Day4VisitOrder: {
          minValue: minValue(0)
        },
        Day5VisitOrder: {
          minValue: minValue(0)
        },
        Day6VisitOrder: {
          minValue: minValue(0)
        },
        Day7VisitOrder: {
          minValue: minValue(0)
        }
      }
    }
  },
  computed: {
    ...mapState(['distiricts', 'avenues', 'vehicles', 'employees', 'routeTypes', 'customers', 'customerLocationsList'])
  },
  mounted () {
    this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/RouteType/Search', name: 'routeTypes'})
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    setData () {
      const e = this.rowData
      this.form = {
        Code: e.Code,
        Description1: e.Description1,
        RepresentativeId: e.RepresentativeId,
        VehicleId: e.VehicleId,
        RouteTypeId: e.RouteTypeId,
        RouteClassId: e.RouteClassId,
        RouteGroupId: e.RouteGroupId,
        StatusId: e.StatusId,
        CustomerRegion5Id: e.CustomerRegion5Id,
        MarketingRegion5Id: e.MarketingRegion5Id,
        IsMultidayRoute: e.IsMultidayRoute,
        IsSuperRoute: e.IsSuperRoute,
        VisitStartControlId: e.VisitStartControlId,
        CityId: e.CityId,
        DistrictId: e.DistrictId,
        ParishIds: e.ParishId,
        RouteDetails: e.RouteDetails,
        Deleted: e.Deleted,
        RecordId: e.RecordId,
        RecordState: 2
      }
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
      if (e.City) {
        this.city = e.City.Label
        this.selectedCity(e.City)
      }
      if (e.District) {
        this.district = e.District.Label
        this.selectedDistirict(e.City)
      }
      if (e.Parish) {
        this.parish = e.Parish.Label
      }
      if (e.RouteType) {
        this.routeType = e.RouteType.Label
        if (e.RouteType.DecimalValue === 1 || e.RouteType.DecimalValue === 6) {
          this.showCustomerRegion = true
          this.showMarketingRegion = false
        } else if (e.RouteType.DecimalValue === 5) {
          this.showMarketingRegion = true
          this.showCustomerRegion = false
        } else {
          this.showCustomerRegion = false
          this.showMarketingRegion = false
        }
      }
    },
    selectedCity (e) {
      if (e) {
        this.form.CityId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: e.DecimalValue})
      } else {
        this.form.CityId = null
        this.form.DistrictId = null
      }
    },
    selectedDistirict (e) {
      if (e) {
        this.form.DistrictId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'AVENUE', name: 'avenues', upperValue: e.DecimalValue})
      } else {
        this.form.DistrictId = null
        this.form.ParishIds = null
      }
    },
    selectedCustomer (e) {
      if (e) {
        this.showCustomerLocation = true
        this.routeDetails.CustomerId = e.RecordId
        this.routeDetails.Customer = e.CommercialTitle
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextCustomer/api/CustomerLocation/Search',
          name: 'customerLocationsList',
          andConditionModel: {
            customerIds: [e.RecordId]
          }
        })
      } else {
        this.showCustomerLocation = false
        this.routeDetails.CustomerId = null
        this.routeDetails.Customer = null
        this.routeDetails.LocationId = null
        this.routeDetails.Location = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'RouteTypeId') {
          if (model.RecordId === 1 || model.RecordId === 6) {
            this.showCustomerRegion = true
            this.showMarketingRegion = false
          } else if (model.RecordId === 5) {
            this.showMarketingRegion = true
            this.showCustomerRegion = false
          } else {
            this.showCustomerRegion = false
            this.showMarketingRegion = false
          }
        }
      } else {
        this.form[label] = null
      }
    },
    selectedCustomerLocation (e) {
      if (e) {
        this.routeDetails.LocationId = e.RecordId
        this.routeDetails.Location = e.Description1
      } else {
        this.routeDetails.LocationId = null
        this.routeDetails.Location = null
      }
    },
    onVehicleSearch (search, loading) {
      if (search.length < 3) {
        return
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextVehicle/api/Vehicle/Search',
        name: 'vehicles',
        orConditionModels: [
          {
            VehiclePlateNumber: search,
            Code: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    onEmployeeSearch (search, loading) {
      if (search.length < 3) {
        return
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextEmployee/api/Employee/Search',
        name: 'employees',
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    onCustomerSearch (search, loading) {
      if (search.length < 3) {
        return
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    addCustomerLocation () {
      this.$v.routeDetails.$touch()
      if (this.$v.routeDetails.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.routeDetails.Day1FreStartDate = this.dateConvertToISo(this.routeDetails.Day1FreStartDate)
        this.routeDetails.Day2FreStartDate = this.dateConvertToISo(this.routeDetails.Day2FreStartDate)
        this.routeDetails.Day3FreStartDate = this.dateConvertToISo(this.routeDetails.Day3FreStartDate)
        this.routeDetails.Day4FreStartDate = this.dateConvertToISo(this.routeDetails.Day4FreStartDate)
        this.routeDetails.Day5FreStartDate = this.dateConvertToISo(this.routeDetails.Day5FreStartDate)
        this.routeDetails.Day6FreStartDate = this.dateConvertToISo(this.routeDetails.Day6FreStartDate)
        this.routeDetails.Day7FreStartDate = this.dateConvertToISo(this.routeDetails.Day7FreStartDate)
        this.form.RouteDetails.push({...this.routeDetails})
        this.clearRouteDetails()
        this.$v.routeDetails.$reset()
      }
    },
    removeRouteDetails (r) {
      if (r.RecordState === 2) {
        this.form.RouteDetails.splice(this.form.RouteDetails.indexOf(r), 1)
      } else {
        this.form.RouteDetails[this.form.RouteDetails.indexOf(r)].RecordState = 4
      }
    },
    clearRouteDetails () {
      this.routeDetails = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        CustomerId: null,
        Customer: null,
        LocationId: null,
        Location: null,
        Day1Frequency: null,
        Day1FreStartDate: null,
        Day1VisitOrder: null,
        Day2Frequency: null,
        Day2FreStartDate: null,
        Day2VisitOrder: null,
        Day3Frequency: null,
        Day3FreStartDate: null,
        Day3VisitOrder: null,
        Day4Frequency: null,
        Day4FreStartDate: null,
        Day4VisitOrder: null,
        Day5Frequency: null,
        Day5FreStartDate: null,
        Day5VisitOrder: null,
        Day6Frequency: null,
        Day6FreStartDate: null,
        Day6VisitOrder: null,
        Day7Frequency: null,
        Day7FreStartDate: null,
        Day7VisitOrder: null,
        StatusId: null,
        AnnualVisitCount: null,
        CompanyId: null,
        BranchId: null,
        Code: null,
        Description1: null
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
        this.updateData()
      }
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        this.form = {
          Code: e.Code,
          Description1: e.Description1,
          RepresentativeId: e.RepresentativeId,
          VehicleId: e.VehicleId,
          RouteTypeId: e.RouteTypeId,
          RouteClassId: e.RouteClassId,
          RouteGroupId: e.RouteGroupId,
          StatusId: e.StatusId,
          CustomerRegion5Id: e.CustomerRegion5Id,
          MarketingRegion5Id: e.MarketingRegion5Id,
          IsMultidayRoute: e.IsMultidayRoute,
          IsSuperRoute: e.IsSuperRoute,
          VisitStartControlId: e.VisitStartControlId,
          CityId: e.CityId,
          DistrictId: e.DistrictId,
          ParishIds: e.ParishId,
          RouteDetails: e.RouteDetails,
          Deleted: e.Deleted,
          RecordId: e.RecordId
        }

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
        if (e.City) {
          this.city = e.City.Label
          this.selectedCity(e.City)
        }
        if (e.District) {
          this.district = e.District.Label
          this.selectedDistirict(e.City)
        }
        if (e.Parish) {
          this.parish = e.Parish.Label
        }
        // if (e.RouteDetails) {
        //   e.RouteDetails.map(item => {
        //     if (item.Customer) {
        //       item.Customer = item.Customer.Label
        //     }
        //     if (item.Location) {
        //       item.Location = item.Location.Label
        //     }
        //   })
        // }
        if (e.RouteType) {
          this.form.RouteTypeId = e.RouteType.DecimalValue
          this.routeType = e.RouteType.Label
          if (e.RouteType.DecimalValue === 1 || e.RouteType.DecimalValue === 6) {
            this.showCustomerRegion = true
            this.showMarketingRegion = false
            this.customerRegion5 = e.CustomerRegion5
          } else if (e.RouteType.DecimalValue === 5) {
            this.showCustomerRegion = false
            this.showMarketingRegion = true
            this.marketingRegion5 = e.MarketingRegion5 && e.MarketingRegion5.Label
          } else {
            this.showCustomerRegion = false
            this.showMarketingRegion = false
          }
        }
      }
    }
  }
}
</script>
<style scoped>
  .b-form-datepicker {
    height: 28px !important;
  }
</style>
