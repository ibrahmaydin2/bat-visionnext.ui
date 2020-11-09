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
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col cols="12" md="4" lg="4">
            <b-form-group
              :label="$t('insert.Model_Code')"
            >
              <b-form-input type="text" v-model="form.Code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" lg="4">
            <b-form-group
              :label="$t('insert.Model_Description1')"
            >
              <b-form-input type="text" v-model="form.Description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" lg="4">
            <b-form-group
              :label="$t('insert.Model_StatusId')"
            >
              <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                {{(form.checked) ? $t('insert.vehicles.active'): $t('insert.vehicles.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab title="Depo Ana Kayıtları" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_WarehouseTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.Model_IsVehicle')"
              >
              <b-form-radio-group v-model="form.IsVehicle">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col> -->
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_VehicleId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.Model_IsCenterWarehouse')"
              >
              <b-form-radio-group v-model="form.IsVehicle">
                  <b-form-radio value="1">{{$t('insert.vehicles.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.vehicles.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.Model_WarehouseCapacity')"
              >
                <b-form-input type="text" v-model="form.Model_WarehouseCapacity"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.Model_LicenseNumber')"
              >
                <b-form-input type="text" v-model="form.Model_LicenseNumber"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.Model_FinanceCode')"
              >
                <b-form-input type="text" v-model="form.Model_FinanceCode"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="ERP Kodu"
              >
                <b-form-input type="text" v-model="form.erpCode"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Açıklama"
              >
                <b-form-input type="text" v-model="form.desc"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Tedarikçi">
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
        Code: '',
        name: '',
        Description1: null,
        StatusId: null,
        drivers: [
          {
            id: 1,
            title: 'Örnek 1'
          },
          {
            id: 2,
            title: 'Örnek 2'
          },
          {
            id: 3,
            title: 'Örnek 3'
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
  }
}
</script>
<style lang="sass">
</style>
