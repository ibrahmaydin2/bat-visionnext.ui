<template>
  <b-row class="asc__insertPage">
    <RouteLocationDetail :detail="selectedLocation" :index="selectedLocationIndex" @save="setLocationDetail" />
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
                @input="selectedSearchType('RepresentativeId', $event)"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                :customOption="true"
                :is-employee="true"
                :disabled="insertReadonly.RepresentativeId" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId">
              <NextDropdown
                searchable
                label="VehiclePlateNumber"
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :disabled="insertReadonly.VehicleId"
                or-condition-fields="VehiclePlateNumber,Code"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteTypeId" :error="$v.form.RouteTypeId">
              <NextDropdown
                @input="selectedSearchType('RouteTypeId', $event)"
                url="VisionNextRoute/api/RouteType/Search"
                :disabled="insertReadonly.RouteTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="VisitStartControlId" :error="$v.form.VisitStartControlId">
              <NextDropdown
                @input="selectedType('VisitStartControlId', $event)"
                lookup-key="VISIT_START_CONTROL"
                :disabled="insertReadonly.VisitStartControlId" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.route.customerArea')" :required="!!showCustomerRegion" :error="$v.form.CustomerRegion5Id">
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
          <NextDetailPanel v-model="form.RouteDetails" :items="form.IsSuperRoute === 1 ? locationItems2 : locationItems1" :edit-form="editForm" :detail-buttons="detailButtons">
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection2
                  name="RouteMultipleCustomer"
                  v-model="form.RouteDetails"
                  :hidden-values="hiddenValues"
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
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import RouteLocationDetail from './RouteLocationDetail'

export default {
  mixins: [insertMixin],
  components: {
    RouteLocationDetail
  },
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
        StatusId: 1,
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
        }
      ],
      selectedLocation: null,
      selectedLocationIndex: null,
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
    this.createManualCode()
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
        this.form.StatusId = this.form.StatusId === 0 ? 2 : this.form.StatusId
        this.form.RouteDetails = this.form.RouteDetails.map(r => {
          r.Code = null
          r.Description1 = null

          return r
        })
        this.createData()
      }
    },
    setLocationDetail (model, index) {
      this.form.RouteDetails[index] = model
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
