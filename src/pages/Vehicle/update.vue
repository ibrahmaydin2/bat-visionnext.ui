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
              <b-button size="sm" variant="outline-danger">Vazgeç</b-button>
            </router-link>
            <b-button @click="save()" size="sm" variant="success">Kaydet</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__updatePage-content-head">
      <section>
        <b-row>
           <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.vehicles.code')"
            >
              <b-form-input type="text" v-model="form.code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group :label="$t('update.vehicles.driver')">
              <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.vehicles.plaque')"
            >
              <b-form-input type="text" v-model="form.plaque"/>
            </b-form-group>
          </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.assetNo')">
                <b-form-input type="text" v-model="form.assetNo"/>
              </b-form-group>
            </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.vehicles.state')"
            >
              <b-form-checkbox v-model="form.checked" name="check-button" switch>
                {{(form.checked) ? $t('update.vehicles.active'): $t('update.vehicles.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('update.detail')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.trademark')">
                <v-select :options="form.trademarks" @input="selectedTrademark" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.model')">
                <v-select :options="form.models" @input="selectedModel" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.year')">
                <b-form-input type="text" v-model="form.year"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.vehicles.isRouteVehicle')"
              >
                <b-form-radio-group id="radio-group-route-vehicle" v-model="form.isRouteVehicle">
                  <b-form-radio value="1">{{$t('update.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.vehicleType')">
                <v-select :options="form.vehicleTypes" @input="selectedVehicleType" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.vehicles.isStore')"
              >
                <b-form-radio-group id="radio-group-is-store" v-model="form.isStore">
                  <b-form-radio value="1">{{$t('update.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.vehicles.isAsset')"
              >
                <b-form-radio-group id="radio-group-is-asset" v-model="form.isAsset">
                  <b-form-radio value="1">{{$t('update.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.vehicles.additionalInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.vehicleKind')">
                <v-select :options="form.vehicleKinds" @input="selectedVehicleKind" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.colorCode')">
                <v-select :options="form.colorCodes" @input="selectedColorCode" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.sideAwningType')">
                <v-select :options="form.sideAwningTypes" @input="selectedSideAwningType" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.backrest')">
                <v-select :options="form.backrests" @input="selectedBackrest" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.truckLogo')">
                <v-select :options="form.truckLogos" @input="selectedTruckLogo" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.volumeCapacity')">
                <b-form-input type="text" v-model="form.volumeCapacity"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.volumeUnit')">
                <v-select :options="form.volumeUnits" @input="selectedVolumeUnit" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.weightCapacity')">
                <b-form-input type="text" v-model="form.weightCapacity"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.weightUnit')">
                <v-select :options="form.weightUnits" @input="selectedWeightUnit" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.contractEndDate')">
                <b-form-datepicker id="contract-datepicker" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.contractEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.vehicleCategory1')">
                <v-select :options="form.vehicleCategories" @input="selectedVehicleCategory1" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.vehicleCategory2')">
                <v-select :options="form.vehicleCategories" @input="selectedVehicleCategory2" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicles.vehicleCategory3')">
                <v-select :options="form.vehicleCategories" @input="selectedVehicleCategory3" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        active: null,
        checked: null,
        code: '',
        name: '',
        driver: null,
        plaque: null,
        assetNo: null,
        trademark: null,
        model: null,
        year: null,
        isRouteVehicle: null,
        vehicleType: null,
        isStore: null,
        isAsset: null,
        vehicleKind: null,
        colorCode: null,
        sideAwningType: null,
        backrest: null,
        truckLogo: null,
        volumeCapacity: null,
        weightCapacity: null,
        volumeUnit: null,
        weightUnit: null,
        vehicleCategory1: null,
        vehicleCategory2: null,
        vehicleCategory3: null,
        contractEndDate: null,
        drivers: [
          {
            id: 1,
            title: 'Sürücü 1'
          },
          {
            id: 2,
            title: 'Sürücü 2'
          },
          {
            id: 3,
            title: 'Sürücü 3'
          }
        ],
        trademarks: [
          {
            id: 1,
            title: 'Marka 1'
          },
          {
            id: 2,
            title: 'Marka 2'
          },
          {
            id: 3,
            title: 'Marka 3'
          }
        ],
        models: [
          {
            id: 1,
            title: 'Model 1'
          },
          {
            id: 2,
            title: 'Model 2'
          },
          {
            id: 3,
            title: 'Model 3'
          }
        ],
        vehicleTypes: [
          {
            id: 1,
            title: 'Araç 1'
          },
          {
            id: 2,
            title: 'Araç 2'
          },
          {
            id: 3,
            title: 'Araç 3'
          }
        ],
        vehicleKinds: [
          {
            id: 1,
            title: 'Araç 1'
          },
          {
            id: 2,
            title: 'Araç 2'
          },
          {
            id: 3,
            title: 'Araç 3'
          }
        ],
        colorCodes: [
          {
            id: 1,
            title: 'Renk 1'
          },
          {
            id: 2,
            title: 'Renk 2'
          },
          {
            id: 3,
            title: 'Renk 3'
          }
        ],
        sideAwningTypes: [
          {
            id: 1,
            title: 'Tente 1'
          },
          {
            id: 2,
            title: 'Tente 2'
          },
          {
            id: 3,
            title: 'Tente 3'
          }
        ],
        backrests: [
          {
            id: 1,
            title: 'Arkalık 1'
          },
          {
            id: 2,
            title: 'Arkalık 2'
          },
          {
            id: 3,
            title: 'Arkalık 3'
          }
        ],
        truckLogos: [
          {
            id: 1,
            title: 'Logo 1'
          },
          {
            id: 2,
            title: 'Logo 2'
          },
          {
            id: 3,
            title: 'Logo 3'
          }
        ],
        weightUnits: [
          {
            id: 1,
            title: 'Birim 1'
          },
          {
            id: 2,
            title: 'Birim 2'
          },
          {
            id: 3,
            title: 'Birim 3'
          }
        ],
        volumeUnits: [
          {
            id: 1,
            title: 'Birim 1'
          },
          {
            id: 2,
            title: 'Birim 2'
          },
          {
            id: 3,
            title: 'Birim 3'
          }
        ],
        vehicleCategories: [
          {
            id: 1,
            title: 'Araç 1'
          },
          {
            id: 2,
            title: 'Araç 2'
          },
          {
            id: 3,
            title: 'Araç 3'
          }
        ],
      }
    }
  },
  computed: {
    ...mapState([])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    },
    selectedDriver (e) {
      this.form.driver = e.title
    },
    selectedTrademark (e) {
      this.form.trademark = e.title
    },
    selectedModel (e) {
      this.form.model = e.title
    },
    selectedVehicleType (e) {
      this.form.vehicleType = e.title
    },
    selectedVehicleKind (e) {
      this.form.vehicleKind = e.title
    },
    selectedColorCode (e) {
      this.form.colorCode = e.title
    },
    selectedSideAwningType (e) {
      this.form.sideAwningType = e.title
    },
    selectedBackrest (e) {
      this.form.backrest = e.title
    },
    selectedTruckLogo (e) {
      this.form.truckLogo = e.title
    },
    selectedWeightUnit (e) {
      this.form.weightUnit = e.title
    },
    selectedVolumeUnit (e) {
      this.form.volumeUnit = e.title
    },
    selectedVehicleCategory1 (e) {
      this.form.vehicleCategory1 = e.title
    },
    selectedVehicleCategory2 (e) {
      this.form.vehicleCategory2 = e.title
    },
    selectedVehicleCategory3 (e) {
      this.form.vehicleCategory3 = e.title
    }
  }
}
</script>
<style lang="sass">
</style>
