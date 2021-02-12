<template>
   <b-row>
      <b-col md="4" lg="3">
        <b-form-group :label="$t('insert.warehouse.Address')" >
           <b-form-textarea v-model="selectedAddress" placeholder="" />
         </b-form-group>
      </b-col>
      <b-col md="4" lg="3">
        <b-form-group :label="$t('insert.warehouse.CityId')" >
          <v-select  v-model="selectedCity" :options="cities" label="Label" @input="selectCity"></v-select>
        </b-form-group>
      </b-col>
      <b-col md="4" lg="3">
        <b-form-group :label="$t('insert.warehouse.DistrictId')" >
          <v-select v-model="selectedDistrict" :options="distiricts" label="Label" @input="selectDistrict" :disabled="!selectedCity.DecimalValue"></v-select>
        </b-form-group>
      </b-col>
   </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../mixins/index'
export default {
  name: 'NextAddress',
  mixins: [mixin],
  props: {
    value: {},
    insertTitle: {},
    insertRequired: {}
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      selectedCity: {},
      selectedDistrict: {},
      selectedAddress: null,
      selectedValue: null,
      districtId: null
    }
  },
  mounted () {
    this.selectedValue = this.value
    this.districtId = this.value.DistrictId
    this.selectedAddress = this.value.Address
    this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
  },
  computed: {
    ...mapState(['lookup', 'cities', 'distiricts'])
  },
  watch: {
    value (newValue) {
      if (newValue) {
        if (newValue.DistrictId && this.selectedValue.DistrictId !== newValue.DistrictId) {
          this.districtId = newValue.DistrictId
          this.selectedValue.DistrictId = newValue.DistrictId
        }
        if (newValue.CityId && this.selectedValue.CityId !== newValue.CityId) {
          this.selectedValue.CityId = newValue.CityId
          this.selectedCity = this.cities.find(c => c.DecimalValue === newValue.CityId)
          this.selectCity({
            DecimalValue: newValue.CityId
          })
        }
        if (newValue.Address && this.selectedValue.Address !== newValue.Address) {
          this.selectedValue.Address = newValue.Address
          this.selectedAddress = newValue.Address
        }
      }
    },
    selectedAddress (newValue) {
      this.selectedValue.Address = newValue
      this.$emit('valuechange', {
        CityId: this.selectedValue.CityId,
        DistrictId: this.selectedValue.DistrictId,
        Address: newValue
      })
    },
    distiricts: function (e) {
      if (this.districtId) {
        this.selectedDistrict = this.distiricts.find(c => c.DecimalValue === this.districtId)
        this.districtId = null
      }
    },
    cities: function (e) {
      if (this.selectedValue.CityId) {
        this.selectedCity = this.cities.find(c => c.DecimalValue === this.selectedValue.CityId)
      }
    }
  },
  methods: {
    selectCity (city) {
      if (city) {
        this.selectedValue.CityId = city.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: city.DecimalValue})
      } else {
        this.selectedValue.CityId = null
      }
      if (!this.districtId) {
        this.selectedValue.DistrictId = null
        this.selectedDistrict = null
      }

      this.$emit('valuechange', {
        CityId: this.selectedValue.CityId,
        DistrictId: this.selectedValue.DistrictId,
        Address: this.selectedValue.Address
      })
    },
    selectDistrict (district) {
      if (district) {
        this.selectedValue.DistrictId = district ? district.DecimalValue : null
        this.$emit('valuechange', {
          CityId: this.selectedValue.CityId,
          DistrictId: this.selectedValue.DistrictId,
          Address: this.selectedValue.Address
        })
      }
    }
  }
}

</script>
