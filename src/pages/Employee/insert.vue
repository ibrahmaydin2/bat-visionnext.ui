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
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.Model_Code')"
            >
              <b-form-input type="text" v-model="form.Code" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.Model_Name')">
              <b-form-input type="text" v-model="form.Model_Name" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.Model_Surname')"
            >
              <v-select :options="form.Model_Surname" @input="selectedRota" label="title"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.state')"
            >
              <b-form-checkbox v-model="form.state" name="check-button" switch>
                {{(form.checked) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.Employee')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ERPCustomerCode')">
                <v-select :options="form.Model_ERPCustomerCode" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ERPSupplierCode')">
                <b-form-input type="text" v-model="form.Model_ERPSupplierCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsRepresentative')">
                <b-form-radio-group v-model="form.Model_IsRepresentative">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_SAPSrCode')">
                <b-form-input type="text" v-model="form.Model_SAPSrCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_PriceListCategoryId')">
                <v-select :options="form.Model_PriceListCategoryId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Team')">
                <b-form-checkbox v-model="form.Model_Team" name="check-button" switch>
                  {{(form.checked) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.Model_Description')">
                <b-form-textarea v-model="form.Model_Description" rows="3" max-rows="6" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.EmployeeCustomer')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CreateCustomer')">
                <b-form-radio-group v-model="form.Model_CreateCustomer">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_taxNumber')">
                <b-form-input type="text" v-model="form.Model_taxNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_FinanceCode1')">
                <b-form-input type="text" v-model="form.Model_FinanceCode1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_PriceListCategoryId')">
                <v-select :options="form.Model_PriceListCategoryId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.Model_Personal')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_BirthDate')">
                <b-form-datepicker :placeholder="$t('insert.Model_BirthDate')" v-model="form.Model_BirthDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_EmploymentStartDate')">
                <b-form-datepicker :placeholder="$t('insert.Model_EmploymentStartDate')" v-model="form.Model_EmploymentStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_EmploymentEndDate')">
                <b-form-datepicker :placeholder="$t('insert.Model_EmploymentEndDate')" v-model="form.Model_EmploymentEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_EducationId')">
                <v-select :options="form.Model_EducationId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Identificationnumber')">
                <b-form-input type="text" v-model="form.Model_Identificationnumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_BloodType')">
                <v-select :options="form.Model_BloodType" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_JeansSize')">
                <v-select :options="form.Model_JeansSize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ShirtSize')">
                <v-select :options="form.Model_ShirtSize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Shoesize')">
                <v-select :options="form.Model_Shoesize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CoatSize')">
                <v-select :options="form.Model_CoatSize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_TShirtSize')">
                <v-select :options="form.Model_TShirtSize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ClothTrousersSize')">
                <v-select :options="form.Model_ClothTrousersSize" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>

        </b-tab>
        <b-tab :title="$t('insert.EmployeeContact')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_GsmNumber')">
                <b-form-input type="text" v-model="form.Model_GsmNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Telephone1')">
                <b-form-input type="text" v-model="form.Model_Telephone1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Telephone2')">
                <b-form-input type="text" v-model="form.Model_Telephone2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Email')">
                <b-form-input type="text" v-model="form.Model_Email" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Fax')">
                <b-form-input type="text" v-model="form.Model_Fax" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.EmployeeDevices')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_SerialNumber')">
                <b-form-input type="text" v-model="form.Model_SerialNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_DeviceModelId')">
                <v-select :options="form.Model_DeviceModelId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_DeviceUseAraeId')">
                <v-select :options="form.Model_DeviceUseAraeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.EmployeeBanks')">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.Model_BankBranchId')">
                <b-form-input type="text" v-model="form.Model_BankBranchId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.EmployeePrefix')">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.Model_Prefix')">
                <b-form-input type="text" v-model="form.Model_Prefix" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
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
