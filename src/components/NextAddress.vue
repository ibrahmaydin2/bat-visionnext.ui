<template>
   <b-row>
      <b-col cols="12" :md="md" :lg="lg" v-if="!hideAddress">
        <b-form-group :label="$t('insert.warehouse.Address') + (required ? ' *' : '')" :class="{'form-group--error': addressError }">
           <b-form-textarea v-model="selectedAddress" placeholder=""/>
         </b-form-group>
      </b-col>
      <b-col cols="12" :md="md" :lg="lg">
        <b-form-group :label="$t('insert.warehouse.CityId') + (required ? ' *' : '')" :class="{'form-group--error': cityError }">
          <v-select  v-model="selectedCity" :options="cities" label="Label" @input="selectCity"></v-select>
        </b-form-group>
      </b-col>
      <b-col cols="12" :md="md" :lg="lg">
        <b-form-group :label="$t('insert.warehouse.DistrictId') + (required ? ' *' : '')" :class="{'form-group--error': districtError }">
          <v-select v-model="selectedDistrict" :options="distiricts" label="Label" @input="selectDistrict" :disabled="!selectedCity || !selectedCity.DecimalValue"></v-select>
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
    value: {
      type: Object,
      default: () => {},
      description: 'v-model bilgisi'
    },
    addressError: {
      type: Boolean,
      default: false,
      description: 'Adres textinde validasyon hatası olup olmadığı bilgisi'
    },
    cityError: {
      type: Boolean,
      default: false,
      description: 'İl listesinde validasyon hatası olup olmadığı bilgisi'
    },
    districtError: {
      type: Boolean,
      default: false,
      description: 'İlçe listesinde validasyon hatası olup olmadığı bilgisi'
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Zorunlu olup olmadığı bilgisi'
    },
    hideAddress: {
      type: Boolean,
      default: false,
      description: 'Adres textinin görünürlük bilgisi'
    },
    init: {
      type: Object,
      default: () => {},
      description: 'Sayfa açılışında setlenmesi gereken model bilgisi'
    },
    md: {
      type: String,
      default: '4',
      description: 'Componentlerin md kolon bilgisi'
    },
    lg: {
      type: String,
      default: '3',
      description: 'Componentlerin lg kolon bilgisi'
    }
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
        if (!newValue.DistrictId) {
          this.selectedDistrict = null
        } else if (newValue.DistrictId && this.selectedValue.DistrictId !== newValue.DistrictId) {
          this.districtId = newValue.DistrictId
          this.selectedValue.DistrictId = newValue.DistrictId
        }
        if (!newValue.CityId) {
          this.selectedCity = null
        } else if (newValue.CityId && this.selectedValue.CityId !== newValue.CityId) {
          this.selectedValue.CityId = newValue.CityId
          this.selectedCity = this.cities.find(c => c.DecimalValue === newValue.CityId)
          this.selectCity({
            DecimalValue: newValue.CityId
          })
        }
        if (!newValue.Address) {
          this.selectedAddress = null
        } else if (newValue.Address && this.selectedValue.Address !== newValue.Address) {
          this.selectedValue.Address = newValue.Address
          this.selectedAddress = newValue.Address
        }
      }
    },
    init (newValue) {
      if (newValue) {
        this.selectedValue = {
          CityId: newValue.CityId,
          DistrictId: newValue.DistrictId,
          Address: newValue.Address
        }
        this.selectedCity = this.cities.find(c => c.DecimalValue === newValue.CityId)
        this.districtId = newValue.DistrictId
        this.selectCity(this.selectedCity)
        this.selectedDistrict = this.distiricts.find(c => c.DecimalValue === newValue.DistrictId)
        this.selectedAddress = newValue.Address
      }
    },
    selectedAddress (newValue) {
      this.selectedValue.Address = newValue
      this.$emit('valuechange', {
        CityId: this.selectedValue.CityId,
        DistrictId: this.selectedValue.DistrictId,
        Address: newValue,
        CityName: this.selectedValue.CityName,
        DistrictName: this.selectedValue.DistrictName
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
        this.selectedValue.CityName = city.Label
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: city.DecimalValue})
      } else {
        this.selectedValue.CityId = null
        this.selectedValue.CityName = null
      }
      if (!this.districtId) {
        this.selectedValue.DistrictId = null
        this.selectedValue.DistrictName = null
        this.selectedDistrict = null
      }

      this.$emit('valuechange', {
        CityId: this.selectedValue.CityId,
        DistrictId: this.selectedValue.DistrictId,
        Address: this.selectedValue.Address,
        CityName: this.selectedValue.CityName,
        DistrictName: this.selectedValue.DistrictName
      })
    },
    selectDistrict (district) {
      if (district) {
        this.selectedValue.DistrictId = district.DecimalValue
        this.selectedValue.DistrictName = district.Label
        this.$emit('valuechange', {
          CityId: this.selectedValue.CityId,
          DistrictId: this.selectedValue.DistrictId,
          Address: this.selectedValue.Address,
          CityName: this.selectedValue.CityName,
          DistrictName: this.selectedValue.DistrictName
        })
      }
    }
  }
}

</script>
