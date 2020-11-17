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
            <b-button @click="save()" id="submitButton" size="sm" variant="success">Kaydet</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.code')"
            >
              <b-form-input type="text" v-model="form.code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.rotaType')">
              <v-select :options="form.rotaTypes" @input="selectedRota" label="title"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.name')"
            >
              <b-form-input type="text" v-model="form.name"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.state')"
            >
              <b-form-checkbox v-model="form.checked" name="check-button" switch>
                {{(form.checked) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.routeGroup')">
                <v-select :options="form.rotaGroups" @input="selectedRotaGroup" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.routeClass')">
                <v-select :options="form.rotaClasses" @input="selectedRotaClass" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.vehicle')">
                <v-select :options="form.vehicles" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.personel')">
                <v-select :options="form.personels" @input="selectedPersonel" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.supervisor')">
                <v-select :options="form.supervisors" @input="selectedSupervisor" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.control')">
                <v-select :options="form.controls" @input="selectedControl" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.multiDayRoute')"
              >
                <b-form-radio-group id="radio-group-multi-day" v-model="form.multiDayRoute">
                  <b-form-radio value="1">{{$t('insert.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.superRoute')"
              >
                <b-form-radio-group id="radio-group-super-route" v-model="form.superRoute">
                  <b-form-radio value="1">{{$t('insert.active')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.passive')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.city')">
                <v-select :options="cities" @input="selectedCity" label="il"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.distirict')">
                <v-select :options="distiricts" @input="selectedDistirict" label="ilce"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.town')">
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
        <b-tab :title="$t('insert.locations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.CustomerId')">
                <b-form-input type="text" v-model="form.CustomerId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.LocationId')">
                <b-form-input type="text" v-model="form.LocationId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day1VisitOrder')">
                <b-form-input type="text" v-model="form.Day1VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day2VisitOrder')">
                <b-form-input type="text" v-model="form.Day2VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day3VisitOrder')">
                <b-form-input type="text" v-model="form.Day3VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day4VisitOrder')">
                <b-form-input type="text" v-model="form.Day4VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day5VisitOrder')">
                <b-form-input type="text" v-model="form.Day5VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day6VisitOrder')">
                <b-form-input type="text" v-model="form.Day6VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="1">
              <b-form-group :label="$t('insert.route.Day7VisitOrder')">
                <b-form-input type="text" v-model="form.Day7VisitOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.Day1FreStartDate')">
                <b-form-input type="text" v-model="form.Day1FreStartDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.route.Day1Frequency')">
                <b-form-input type="text" v-model="form.Day1Frequency" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
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
      insert: {
        RepresentativeId: 1004418.0,
        VehicleId: 1004423.0,
        TerminalId: null,
        RouteTypeId: 1.0,
        RouteGroupId: null,
        RouteClassId: null,
        IsMultidayRoute: 0,
        StatusId: 1.0,
        IsSuperRoute: 0,
        ManagerId: null,
        MarketingRegion5Id: null,
        MarketingRegion4Id: null,
        MarketingRegion3Id: null,
        MarketingRegion2Id: null,
        MarketingRegion1Id: null,
        VisitStartControlId: 669.0,
        SupervisorId: null,
        Representative: {
          Code: '000000001',
          UpperValue: null,
          Label: 'Recep TOPUZ',
          Value: '1004418',
          DecimalValue: 1004418.0,
          OtherProperties: null
        },
        MarketingRegion1: null,
        MarketingRegion2: null,
        MarketingRegion3: null,
        MarketingRegion4: null,
        MarketingRegion5: null,
        RouteGroup: null,
        RouteClass: null,
        Vehicle: {
          Code: '000000001',
          UpperValue: null,
          Label: '34 EP 9978',
          Value: '1004423',
          DecimalValue: 1004423.0,
          OtherProperties: null
        },
        RouteType: null,
        RouteDetails: null,
        CompanyId: 2.0,
        BranchId: 1003017.0,
        CreatedUser: 1004415.0,
        CreatedDateTime: '2011-07-27T18:37:04',
        ModifiedUser: 1293221.0,
        ModifiedDateTime: '2013-11-11T13:26:49',
        Deleted: 0,
        System: 0,
        Status: null,
        VisitStartControl: {
          Code: null,
          UpperValue: null,
          Label: 'Manuel',
          Value: '669',
          DecimalValue: 669.0,
          OtherProperties: null
        },
        Supervisor: null,
        EncryptedKey: 'XMk1zya1lmo=',
        RecordId: 1004828.0,
        Code: '000000001',
        Description1: 'ST01 ROTA',
        RecordState: null
      },
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
      this.$store.dispatch('createData', {...this.query, form: this.insert, api: this.$route.meta.baseLink})
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
