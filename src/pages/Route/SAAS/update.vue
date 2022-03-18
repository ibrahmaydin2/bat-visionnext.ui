<template>
  <b-row class="asc__insertPage">
    <RouteLocationDetail :detail="selectedLocation" :index="selectedLocationIndex" @save="setLocationDetail" />
    <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
      <NextLocation :Location='Location' />
    </b-modal>
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
            <NextInput  type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput  type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                searchable
                v-model="representative"
                @input="selectedSearchType('RepresentativeId', $event)"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                :customOption="true"
                :is-employee="true"
                :disabled="insertReadonly.RepresentativeId" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <NextDropdown
                v-model="vehicle"
                label="VehiclePlateNumber"
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :disabled="insertReadonly.VehicleId"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="1000"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteTypeId" :error="$v.form.RouteTypeId">
              <NextDropdown
                v-model="routeType"
                @input="selectedSearchType('RouteTypeId', $event)"
                url="VisionNextRoute/api/RouteType/Search"
                :disabled="insertReadonly.RouteTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="VisitStartControlId" :error="$v.form.VisitStartControlId">
              <NextDropdown
                v-model="visitStartControl"
                @input="selectedType('VisitStartControlId', $event)"
                lookup-key="VISIT_START_CONTROL"
                :disabled="insertReadonly.VisitStartControlId" />
            </NextFormGroup>
            <NextFormGroup  :title="$t('insert.route.customerArea')" :required="!!showCustomerRegion" :error="$v.form.CustomerRegion5Id">
              <NextDropdown
                v-model="CustomerRegion5Id"
                @input="selectedLabelType('CustomerRegion5Id', $event)"
                lookup-key="CUSTOMER_REGION_5"
                :disabled="!showCustomerRegion || insertReadonly.CustomerRegion5Id" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.marketingArea')" :required="!!showMarketingRegion" :error="$v.form.MarketingRegion5Id">
              <NextDropdown
                v-model="MarketingRegion5Id"
                @input="selectedLabelType('MarketingRegion5Id', $event)"
                lookup-key="MARKETING_REGION_5"
                :disabled="!showMarketingRegion || insertReadonly.CustomerRegion5Id" />
            </NextFormGroup>
            <NextFormGroup item-key="CityId" :error="$v.form.CityId">
              <NextDropdown
                v-model="city"
                @input="selectedCity"
                lookup-key="CITY"
                :disabled="insertReadonly.CityId" />
            </NextFormGroup>
            <NextFormGroup item-key="DistrictId" :error="$v.form.DistrictId">
              <NextDropdown
                v-model="district"
                @input="selectedDistirict"
                :source="distiricts"
                :disabled="insertReadonly.DistrictId"
                label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="ParishIds" :error="$v.form.ParishIds">
              <NextDropdown
                multiple
                v-model="parishes"
                @input="selectedParish"
                :source="avenues"
                :disabled="insertReadonly.ParishIds"
                label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="IsSuperRoute" :error="$v.form.IsSuperRoute">
              <NextCheckBox v-model="form.IsSuperRoute" type="number" toggle :disabled="insertReadonly.IsSuperRoute"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsMultidayRoute" :error="$v.form.IsMultidayRoute">
              <NextCheckBox v-model="form.IsMultidayRoute" type="number" toggle :disabled="insertReadonly.IsMultidayRoute" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.route.locations')">
          <NextDetailPanel v-model="form.RouteDetails" :items="form.IsSuperRoute === 1 ? locationItems2 : locationItems1" :edit-form="editForm" :detail-buttons="detailButtons">7
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection2
                  name="RouteMultipleCustomer"
                  v-model="form.RouteDetails"
                  :hidden-values="hiddenValues"
                  :initial-values-func="initialValues"
                  :dynamic-required-filters="dynamicRequiredFilters"
                  :dynamic-disabled-filters="dynamicDisabledFilters"
                  :change-branch-id="true"
                  :record-count="20"
                  :after-func="editForm" />
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import updateMixin from '../../../mixins/update'
import { detailData } from '../detailPanelData'
import RouteLocationDetail from '../RouteLocationDetail'

export default {
  mixins: [updateMixin],
  components: {
    RouteLocationDetail
  },
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
        MarketingRegion5Id: null,
        IsMultidayRoute: null,
        CityId: null,
        RouteDetails: []
      },
      avenues: [],
      locationItems1: detailData.locationItems1,
      locationItems2: detailData.locationItems2,
      showCustomerLocation: false,
      showCustomerRegion: false,
      showMarketingRegion: false,
      district: null,
      CustomerRegion5Id: null,
      MarketingRegion5Id: null,
      parishes: [],
      showCustomer: true,
      representative: null,
      vehicle: null,
      routeClass: null,
      routeGroup: null,
      visitStartControl: null,
      city: null,
      parish: null,
      routeType: null,
      Location: {},
      selectedLocation: null,
      selectedLocationIndex: null,
      detailButtons: [
        {
          icon: 'fa fa-search',
          getDetail: (data, index) => {
            this.selectedLocation = data
            this.selectedLocationIndex = index
            this.$nextTick(() => {
              this.$bvModal.show('route-location-modal')
            })
          }
        },
        {
          icon: 'fa fa-map-marker-alt text-primary mr-1',
          getDetail: (data) => {
            this.showMap(data)
          }
        }
      ],
      hiddenValues: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'CustomerId'
        },
        {
          mainProperty: 'DefaultLocation',
          targetProperty: 'Location'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'Customer'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'CustomerName'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'CustomerCode'
        },
        {
          mainProperty: 'DefaultLocationId',
          targetProperty: 'LocationId'
        }
      ],
      dynamicDisabledFilters: [
        {
          mainProperty: 'BranchId',
          disabled: () => this.form.IsSuperRoute !== 1
        }
      ],
      dynamicRequiredFilters: [
        {
          mainProperty: 'BranchId',
          required: () => this.form.IsSuperRoute === 1
        }
      ]
    }
  },
  computed: {
    ...mapState(['distiricts'])
  },
  mounted () {
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    setData () {
      const e = this.rowData
      this.form = e
      this.form.RouteDetails = e.RouteDetails.map((item) => {
        item.DayFrequency = item.Day1Frequency
        item.CustomerCode = item.Customer ? item.Customer.Code : ''
        return item
      })
      this.representative = this.convertLookupValueToSearchValue(e.Representative)
      this.visitStartControl = e.VisitStartControl
      this.CustomerRegion5Id = e.CustomerRegion5
      this.MarketingRegion5Id = e.MarketingRegion5
      if (e.Vehicle) {
        this.vehicle = {
          RecordId: e.Vehicle.DecimalValue,
          VehiclePlateNumber: e.Vehicle.Label
        }
      }
      if (e.City) {
        this.city = e.City
        this.selectedCity(e.City)
      }
      if (e.District) {
        this.district = e.District
        this.selectedDistirict(e.City)
      }
      if (e.Parish) {
        this.parish = e.Parish
      }
      if (e.RouteType) {
        this.routeType = this.convertLookupValueToSearchValue(e.RouteType)
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
        this.form.ParishIds = null
        this.district = null
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
    selectedLabelType (label, model) {
      if (label === 'CustomerRegion5Id') {
        this.form.MarketingRegion5Id = null
      } else {
        this.form.CustomerRegion5Id = null
      }
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    editForm (form) {
      form.Day1FreStartDate = form.DayFreStartDate
      form.Day2FreStartDate = form.DayFreStartDate
      form.Day3FreStartDate = form.DayFreStartDate
      form.Day4FreStartDate = form.DayFreStartDate
      form.Day5FreStartDate = form.DayFreStartDate
      form.Day6FreStartDate = form.DayFreStartDate
      form.Day7FreStartDate = form.DayFreStartDate
      form.Day1Frequency = form.DayFrequency
      form.Day2Frequency = form.DayFrequency
      form.Day3Frequency = form.DayFrequency
      form.Day4Frequency = form.DayFrequency
      form.Day5Frequency = form.DayFrequency
      form.Day6Frequency = form.DayFrequency
      form.Day7Frequency = form.DayFrequency

      form.Day1Value = !form.Day1VisitOrder || form.Day1VisitOrder === '0' ? 0 : 1
      form.Day2Value = !form.Day2VisitOrder || form.Day2VisitOrder === '0' ? 0 : 1
      form.Day3Value = !form.Day3VisitOrder || form.Day3VisitOrder === '0' ? 0 : 1
      form.Day4Value = !form.Day4VisitOrder || form.Day4VisitOrder === '0' ? 0 : 1
      form.Day5Value = !form.Day5VisitOrder || form.Day5VisitOrder === '0' ? 0 : 1
      form.Day6Value = !form.Day6VisitOrder || form.Day6VisitOrder === '0' ? 0 : 1
      form.Day7Value = !form.Day7VisitOrder || form.Day7VisitOrder === '0' ? 0 : 1

      return form
    },
    showMap (item) {
      this.$api.post({RecordId: item.LocationId}, 'Customer', 'CustomerLocation/Get').then((res) => {
        this.Location = res.Model
        if (res.Model) {
          if (res.Model.XPosition == null || res.Model.YPosition == null) {
            this.$toasted.show(this.$t('index.errorLocation'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          this.$nextTick(() => {
            this.$root.$emit('bv::show::modal', 'location-modal', res.Model)
          })
        } else {
          this.$toasted.show(this.$t('index.errorLocation'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
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
        this.form.RouteDetails.map(item => {
          delete item['Customer']
          delete item['Location']
          item.Code = null
          item.Description1 = null

          return item
        })
        this.form.StatusId = this.form.StatusId === 0 ? 2 : this.form.StatusId
        this.updateData()
      }
    },
    setLocationDetail (model, index) {
      if (model.RecordState === 1) {
        model.RecordState = 3
      }
      this.form.RouteDetails[index] = model
    },
    initialValues: (values) => {
      values.map(value => {
        if (value.Location) {
          value.DefaultLocation = value.Location
        }
        if (value.Customer) {
          value.Code = value.Customer.Code
          value.Description1 = value.Customer.Label
        }
        if (value.AddressDesc) {
          value.AdressDetail = value.AddressDesc
        }
        value.SelectedRow = true
        return value
      })
      return values
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
<style scoped>
  .b-form-datepicker {
    height: 28px !important;
  }
</style>
