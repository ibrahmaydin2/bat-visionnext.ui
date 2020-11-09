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
            <b-form-group :label="$t('insert.Model_Description1')">
              <b-form-input type="text" v-model="form.Description1" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.Model_CardTypeId')"
            >
              <v-select :options="form.CardTypeId" @input="selectedRota" label="title"></v-select>
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
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ShortDescription')">
                <b-form-input type="text" v-model="form.ShortDescription" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ExportDescription1')">
                <b-form-input type="text" v-model="form.ExportDescription1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ProducerCodeId')">
                <v-select :options="form.ProducerCodeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.ItemInsertModel')">
                <v-select :options="form.ItemInsertModel" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_GroupId')">
                <v-select :options="form.GroupId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ShelfLife')">
                <b-form-input type="text" v-model="form.ShelfLife" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_TimeFrameId')">
                <v-select :options="form.TimeFrameId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsBarterAllowed')">
                <b-form-radio-group v-model="form.IsBarterAllowed">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CategoryId')">
                <v-select :options="form.CategoryId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_SortOrder')">
                <b-form-input type="text" v-model="form.SortOrder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ClassId')">
                <v-select :options="form.ClassId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ColorId')">
                <v-select :options="form.ColorId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsOrderAllowed')">
                <b-form-radio-group v-model="form.IsOrderAllowed">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsSaleAllowed')">
                <b-form-radio-group v-model="form.IsSaleAllowed">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_UseSalesAnalysis')">
                <b-form-radio-group v-model="form.UseSalesAnalysis">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsSpGiftItem')">
                <b-form-radio-group v-model="form.IsSpGiftItem">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_IsPhysicalBom')">
                <b-form-radio-group v-model="form.IsPhysicalBom">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.ItemFinancialInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.ItemInsertModel')">
                <b-form-input type="text" v-model="form.ItemInsertModel" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ColorId')">
                <v-select :options="form.ColorId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_ColorId')">
                <v-select :options="form.ColorId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_FinanceCode')">
                <b-form-input type="text" v-model="form.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_DiscountGroup1Id')">
                <v-select :options="form.DiscountGroup1Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_RecurrenceTypeId')">
                <v-select :options="form.RecurrenceTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_MaxDiscountRate')">
                <b-form-input type="text" v-model="form.MaxDiscountRate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category1Id')">
                <v-select :options="form.Category1Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category2Id')">
                <v-select :options="form.Category2Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category3Id')">
                <v-select :options="form.Category3Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category4Id')">
                <v-select :options="form.Category4Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category5Id')">
                <v-select :options="form.Category5Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category6Id')">
                <v-select :options="form.Category6Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category7Id')">
                <v-select :options="form.Category7Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category8Id')">
                <v-select :options="form.Category8Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category9Id')">
                <v-select :options="form.Category9Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Category10Id')">
                <v-select :options="form.Category10Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.ItemCustomers')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CustomerId')">
                <b-form-input type="text" v-model="form.CustomerId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CustomerId')">
                <b-form-input type="text" v-model="form.CustomerId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_CustomerItemDescription')">
                <b-form-input type="text" v-model="form.CustomerItemDescription" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.ItemBarcodes')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_UnitSetId')">
                <v-select :options="form.UnitSetId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_Barcode')">
                <b-form-input type="text" v-model="form.Barcode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.ItemBarcodes')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_BeginDate')">
                <b-form-datepicker id="contract-datepicker" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.BeginDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_EndDate')">
                <b-form-datepicker id="contract-datepicker" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.EndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_QuotaQuantity')">
                <b-form-input type="text" v-model="form.QuotaQuantity" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_QuotaUnitId')">
                <v-select :options="form.QuotaUnitId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_QuotaBranchId')">
                <v-select :options="form.QuotaBranchId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_QuotaRegionId')">
                <v-select :options="form.QuotaRegionId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_StatusId')">
                <v-select :options="form.StatusId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-button variant="success">Ekle</b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.ItemAttachments')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.Model_File')">
                <b-form-file v-model="form.file" accept="image/jpeg, image/png, image/gif" />
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
