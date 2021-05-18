<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Route' }">
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
              <v-select label="Description1" :filterable="false" :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeId', $event)">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <v-select label="VehiclePlateNumber" :filterable="false" :options="vehicles" @search="onVehicleSearch" @input="selectedSearchType('VehicleId', $event)">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteTypeId" :error="$v.form.RouteTypeId">
              <v-select label="Description1" :filterable="false" :options="routeTypes" @input="selectedSearchType('RouteTypeId', $event)"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="VisitStartControlId" :error="$v.form.VisitStartControlId">
              <v-select
                :options="lookup.VISIT_START_CONTROL"
                @input="selectedType('VisitStartControlId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.customerArea')" :required="!!showCustomerRegion" :error="$v.form.CustomerRegion5Id">
              <v-select
                :disabled="!showCustomerRegion"
                v-model="CustomerRegion5Id"
                :options="lookup.CUSTOMER_REGION_5"
                @input="selectedLabelType('CustomerRegion5Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.marketingArea')" :required="!!showMarketingRegion" :error="$v.form.MarketingRegion5Id">
              <v-select
                :disabled="!showMarketingRegion"
                v-model="MarketingRegion5Id"
                :options="lookup.MARKETING_REGION_5"
                @input="selectedLabelType('MarketingRegion5Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CityId">
              <v-select
                :options="lookup.CITY"
                @input="selectedCity"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="DistrictId">
              <v-select
                v-model="district"
                :options="distiricts"
                @input="selectedDistirict"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ParishIds">
              <v-select
                multiple
                @input="selectedParish"
                :options="avenues"
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
              <v-select v-model="routeDetails.Customer" label="Description1" :filterable="false" :options="customers" @search="onCustomerSearch" @input="selectedCustomer">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  <span>{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 1 ? $t('insert.active'): $t('insert.passive'))}}</span>
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.LocationId')" :error="$v.routeDetails.LocationId" :required="true" md="2" lg="2">
              <v-select v-model="routeDetails.Location" :disabled="!showCustomerLocation" label="Description1" :filterable="false" :options="customerLocationsList" @input="selectedCustomerLocation" ></v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day1VisitOrder')" :error="$v.routeDetails.Day1VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day1VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day2VisitOrder')" :error="$v.routeDetails.Day2VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day2VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day3VisitOrder')" :error="$v.routeDetails.Day3VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day3VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day4VisitOrder')" :error="$v.routeDetails.Day4VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day4VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day5VisitOrder')" :error="$v.routeDetails.Day5VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day5VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day6VisitOrder')" :error="$v.routeDetails.Day6VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day6VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.Day7VisitOrder')" :error="$v.routeDetails.Day7VisitOrder" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.Day7VisitOrder" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFreStartDate')" md="2" lg="2">
              <b-form-datepicker
                v-model="routeDetails.DayFreStartDate"
                :locale="$i18n.locale"
                class="mb-2"
                :value-as-date="true"
                label-no-date-selected
                :placeholder="$t('insert.chooseDate')"
              >
              </b-form-datepicker>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.DayFrequency')" md="2" lg="2">
              <b-form-input type="number" :min="0" v-model="routeDetails.DayFrequency" />
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
                <b-th><span>{{$t('insert.route.DayFreStartDate')}}</span></b-th>
                <b-th><span>{{$t('insert.route.DayFrequency')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.RouteDetails" :key="'dl' + i">
                  <b-td>{{r.Customer}}</b-td>
                  <b-td>{{r.Location}}</b-td>
                  <b-td>{{r.Day1VisitOrder}}</b-td>
                  <b-td>{{r.Day2VisitOrder}}</b-td>
                  <b-td>{{r.Day3VisitOrder}}</b-td>
                  <b-td>{{r.Day4VisitOrder}}</b-td>
                  <b-td>{{r.Day5VisitOrder}}</b-td>
                  <b-td>{{r.Day6VisitOrder}}</b-td>
                  <b-td>{{r.Day7VisitOrder}}</b-td>
                  <b-td>{{dateConvertFromTimezone(r.Day1FreStartDate)}}</b-td>
                  <b-td>{{r.Day1Frequency}}</b-td>
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
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        VisitStartControlId: null,
        IsSuperRoute: null,
        DistrictId: null,
        ParishIds: [],
        Code: null,
        Description1: null,
        RepresentativeId: null,
        VehicleId: null,
        RouteTypeId: null,
        RouteClassId: null,
        RouteGroupId: null,
        StatusId: null,
        CustomerRegion5Id: null,
        MarketingRegion5Id: null,
        IsMultidayRoute: null,
        CityId: null,
        RouteDetails: []
      },
      avenues: [],
      routeDetails: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        CustomerId: null,
        Customer: null,
        LocationId: null,
        Location: null,
        Day1VisitOrder: null,
        Day2VisitOrder: null,
        Day3VisitOrder: null,
        Day4VisitOrder: null,
        Day5VisitOrder: null,
        Day6VisitOrder: null,
        Day7VisitOrder: null,
        DayFreStartDate: null,
        DayFrequency: null,
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
      district: null,
      CustomerRegion5Id: null,
      MarketingRegion5Id: null
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
    ...mapState(['distiricts', 'vehicles', 'employees', 'routeTypes', 'customers', 'customerLocationsList'])
  },
  mounted () {
    this.createManualCode()
    this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/RouteType/Search', name: 'routeTypes'})
  },
  methods: {
    selectedCity (e) {
      if (e) {
        this.form.CityId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: e.DecimalValue})
      } else {
        this.form.CityId = null
        this.form.DistrictId = null
        this.district = null
        this.avenues = []
      }
    },
    selectedDistirict (e) {
      if (e) {
        this.form.DistrictId = e.DecimalValue
        this.district = e.Label
        let request = {
          'LookupTableCode': 'AVENUE',
          'UpperValue': e.DecimalValue
        }
        this.$api.postByUrl(request, 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue').then((res) => {
          this.avenues = res.Values
        })
      } else {
        this.form.DistrictId = null
        this.form.ParishIds = null
        this.district = null
      }
    },
    selectedParish (e) {
      this.form.ParishIds = []
      if (e) {
        e.map(parish => {
          this.form.ParishIds.push(parish.DecimalValue)
        })
      }
    },
    selectedCustomer (e) {
      if (e) {
        this.showCustomerLocation = true
        this.routeDetails.CustomerId = e.RecordId
        this.routeDetails.Customer = e.Description1
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
      }
    },
    selectedLabelType (label, model) {
      if (label === 'CustomerRegion5Id') {
        this.form.MarketingRegion5Id = null
        this.CustomerRegion5Id = null
      } else {
        this.form.CustomerRegion5Id = null
        this.MarketingRegion5Id = null
      }
      if (model) {
        this.form[label] = model.DecimalValue
        this[label] = model.Label
      } else {
        this.form[label] = null
        this[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'RouteTypeId') {
          if (model.RecordId === 1 || model.RecordId === 6) {
            this.showCustomerRegion = true
            this.showMarketingRegion = false
            this.MarketingRegion5Id = null
            this.insertRules.CustomerRegion5Id = {
              required
            }
          } else if (model.RecordId === 5) {
            this.showMarketingRegion = true
            this.showCustomerRegion = false
            this.CustomerRegion5Id = null
            this.insertRules.MarketingRegion5Id = {
              required
            }
          } else {
            this.showCustomerRegion = false
            this.showMarketingRegion = false
            this.MarketingRegion5Id = null
            this.CustomerRegion5Id = null
            this.insertRules.MarketingRegion5Id = {}
            this.insertRules.CustomerRegion5Id = {}
          }
        }
      } else {
        this.form[label] = null
        this.showCustomerRegion = false
        this.showMarketingRegion = false
        this.MarketingRegion5Id = null
        this.CustomerRegion5Id = null
        this.insertRules.MarketingRegion5Id = {}
        this.insertRules.CustomerRegion5Id = {}
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
        api: 'VisionNextVehicle/api/Vehicle/AutoCompleteSearch',
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
        api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
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
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
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
        this.routeDetails.Day1FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day2FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day3FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day4FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day5FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day6FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day7FreStartDate = this.dateConvertToISo(this.routeDetails.DayFreStartDate)
        this.routeDetails.Day1Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day2Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day3Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day4Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day5Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day6Frequency = this.routeDetails.DayFrequency
        this.routeDetails.Day7Frequency = this.routeDetails.DayFrequency
        const control = this.form.RouteDetails.find(i => i.LocationId === this.routeDetails.LocationId)
        if (control) {
          this.$toasted.show(this.$t('insert.sameLocationField'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.RouteDetails.push({...this.routeDetails})
        this.clearRouteDetails()
        this.$v.routeDetails.$reset()
      }
    },
    removeRouteDetails (r) {
      this.form.RouteDetails.splice(this.form.RouteDetails.indexOf(r), 1)
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
        if (this.form.RouteDetails.length < 1) {
          this.$toasted.show(this.$t('insert.route.locationFieldRequired'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.createData()
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
