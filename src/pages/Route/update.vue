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
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('update.code')"
            >
              <b-form-input type="text" v-model="form.code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('update.rotaType')">
              <v-select :options="form.rotaTypes" @input="selectedRota" label="title"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('update.name')"
            >
              <b-form-input type="text" v-model="form.name"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('update.state')"
            >
              <b-form-checkbox v-model="form.checked" name="check-button" switch>
                {{(form.checked) ? $t('update.active'): $t('update.passive')}}
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
              <b-form-group :label="$t('update.routeGroup')">
                <v-select :options="form.rotaGroups" @input="selectedRotaGroup" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.routeClass')">
                <v-select :options="form.rotaClasses" @input="selectedRotaClass" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.vehicle')">
                <v-select :options="form.vehicles" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.personel')">
                <v-select :options="form.personels" @input="selectedPersonel" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.supervisor')">
                <v-select :options="form.supervisors" @input="selectedSupervisor" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.control')">
                <v-select :options="form.controls" @input="selectedControl" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.multiDayRoute')"
              >
                <b-form-radio-group id="radio-group-multi-day" v-model="form.multiDayRoute">
                  <b-form-radio value="1">{{$t('update.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.superRoute')"
              >
                <b-form-radio-group id="radio-group-super-route" v-model="form.superRoute">
                  <b-form-radio value="1">{{$t('update.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.city')">
                <v-select :options="cities" @input="selectedCity" label="il"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.distirict')">
                <v-select :options="distiricts" @input="selectedDistirict" label="ilce"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.town')">
                <b-form-input type="text" v-model="form.town"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Tip">
                <v-select :options="form.vehicles" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Müşteri Bölgesi">
                <v-select :options="form.vehicles" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.locations')">
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
        rotaType: null,
        rotaGroup: null,
        rotaClass: null,
        vehicle: null,
        personel: null,
        supervisor: null,
        control: null,
        city: null,
        superRoute: null,
        multiDayRoute: null,
        distirict: null,
        town: null,
        rotaTypes: [
          {
            id: 1,
            title: 'Rota Tipi 1'
          },
          {
            id: 2,
            title: 'Rota Tipi 2'
          },
          {
            id: 3,
            title: 'Rota Tipi 3'
          }
        ],
        rotaGroups: [
          {
            id: 1,
            title: 'Rota Grubu 1'
          },
          {
            id: 2,
            title: 'Rota Grubu 2'
          },
          {
            id: 3,
            title: 'Rota Grubu 3'
          }
        ],
        rotaClasses: [
          {
            id: 1,
            title: 'Rota Sınıfı 1'
          },
          {
            id: 2,
            title: 'Rota Sınıfı 2'
          },
          {
            id: 3,
            title: 'Rota Sınıfı 3'
          }
        ],
        vehicles: [
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
        personels: [
          {
            id: 1,
            title: 'Personel 1'
          },
          {
            id: 2,
            title: 'Personel 2'
          },
          {
            id: 3,
            title: 'Personel 3'
          }
        ],
        supervisors: [
          {
            id: 1,
            title: 'Supervisor 1'
          },
          {
            id: 2,
            title: 'Supervisor 2'
          },
          {
            id: 3,
            title: 'Supervisor 3'
          }
        ],
        controls: [
          {
            id: 1,
            title: 'Manuel'
          },
          {
            id: 2,
            title: 'Auto'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['cities', 'distiricts'])
  },
  mounted () {
    this.$store.commit('setCities', false)
    this.$store.commit('bigLoaded', false)
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    },
    selectedRota (e) {
      this.rotaType = e.title
    },
    selectedRotaGroup (e) {
      this.rotaGroup = e.title
    },
    selectedRotaClass (e) {
      this.rotaGroup = e.title
    },
    selectedVehicle (e) {
      this.vehicle = e.title
    },
    selectedSupervisor (e) {
      this.supervisor = e.title
    },
    selectedPersonel (e) {
      this.personel = e.title
    },
    selectedControl (e) {
      this.control = e.title
    },
    selectedCity (e) {
      this.city = e.title
      this.$store.commit('setDistiricts', e.plaka)
    },
    selectedDistirict (e) {
      console.log(e)
      this.distirict = e.id
    }
  }
}
</script>
<style lang="sass">
</style>
