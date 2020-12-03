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
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.Model_Code')"
            >
              <b-form-input type="text" v-model="form.model.code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.employee.Model_Name')">
              <b-form-input type="text" v-model="form.model.name" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.Model_Surname')"
            >
              <b-form-input type="text" v-model="form.model.surname" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.state')"
            >
              <b-form-checkbox v-model="form.model.statusId" name="check-button" switch>
                {{(form.model.statusId) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.employee.Employee')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_UserGroupId')">
                <v-select :options="employeeGroups" @input="selectedGroup" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.category1')">
                <v-select :options="category1" @input="selectedCategory1" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_IsRepresentative')">
                <b-form-radio-group v-model="form.model.isRepresentative">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_SAPSrCode')">
                <b-form-input type="text" v-model="form.model.sapHrCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ERPCustomerCode')">
                <b-form-input type="text" v-model="form.model.financeCode1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ERPSupplierCode')">
                <b-form-input type="text" v-model="form.model.financeCode2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.scoreCardClasses')">
                <v-select :options="scoreCards" @input="selectedScoreCard" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Team')">
                <b-form-checkbox v-model="form.model.isTeam" name="check-button" switch>
                  {{(form.model.isTeam) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.employee.Model_Description')">
                <b-form-textarea v-model="form.model.other1" rows="3" max-rows="6" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.group')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.personalType')">
                <v-select :options="employeeTypes" @input="selectedType" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeCustomer')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_CreateCustomer')">
                <b-form-radio-group v-model="form.model.createCustomerRecord" @change="changeCustomer">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_taxNumber')">
                <b-form-input type="text" v-model="form.model.taxNumber" />
              </b-form-group>
            </b-col> -->
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_FinanceCode1')">
                <b-form-input type="text" v-model="form.model.financeCode1" />
              </b-form-group>
            </b-col> -->
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_PriceListCategoryId')">
                <v-select :disabled="disabledCustomer" :options="priceList" @input="selectedPriceList" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.Model_Personal')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_BirthDate')">
                <b-form-datepicker 
                  :placeholder="$t('insert.employee.Model_BirthDate')" 
                  v-model="form.model.birthDate" 
                  locale="tr"
                  class="mb-2"
                  :value-as-date="true"
                >
                </b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_EmploymentStartDate')">
                <b-form-datepicker :placeholder="$t('insert.employee.Model_EmploymentStartDate')" v-model="form.model.employmentStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_EmploymentEndDate')">
                <b-form-datepicker :placeholder="$t('insert.employee.Model_EmploymentEndDate')" v-model="form.model.employmentEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_EducationId')">
                <v-select :options="educationStatus" @input="selectedEducation" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Identificationnumber')">
                <b-form-input type="text" v-model="form.model.taxNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_BloodType')">
                <v-select :options="bloodTypes" @input="selectedBloodType" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_JeansSize')">
                <b-form-input type="text" v-model="form.model.denimSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ShirtSize')">
                <b-form-input type="text" v-model="form.model.montSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Shoesize')">
                <b-form-input type="text" v-model="form.model.shoeSize" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_CoatSize')">
                <b-form-input type="text" v-model="form.model.overcoatSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_TShirtSize')">
                <b-form-input type="text" v-model="form.model.tShirtSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ClothTrousersSize')">
                <b-form-input type="text" v-model="form.model.corduroySize" />
              </b-form-group>
            </b-col>
          </b-row>

        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeContact')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_GsmNumber')">
                <b-form-input type="text" v-model="form.model.gsmNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Telephone1')">
                <b-form-input type="text" v-model="form.model.telephone1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Telephone2')">
                <b-form-input type="text" v-model="form.model.telephone2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Email')">
                <b-form-input type="text" v-model="form.model.email" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Fax')">
                <b-form-input type="text" v-model="form.model.faxNumber" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <!-- <b-tab :title="$t('insert.employee.EmployeeDevices')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_SerialNumber')">
                <b-form-input type="text" v-model="form.Model_SerialNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_DeviceModelId')">
                <v-select :options="form.Model_DeviceModelId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_DeviceUseAraeId')">
                <v-select :options="form.Model_DeviceUseAraeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeBanks')">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.employee.Model_BankBranchId')">
                <b-form-input type="text" v-model="form.Model_BankBranchId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeePrefix')">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.employee.Model_Prefix')">
                <b-form-input type="text" v-model="form.Model_Prefix" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab> -->
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
        model: {
          typeId: null,
          userGroupId: 1,
          telephone1: null,
          telephone2: null,
          gsmNumber: null,
          faxNumber: null,
          email: null,
          employmentStartDate: null,
          employmentEndDate: null,
          taxNumber: null,
          birthDate: null,
          tShirtSize: null,
          montSize: null,
          overcoatSize: null,
          shoeSize: null,
          educationId: null,
          denimSize: null,
          corduroySize: null,
          bloodTypeId: null,
          code: null,
          name: null,
          surname: null,
          groupId: null,
          statusId: null,
          category1Id: null,
          other1: null,
          isTeam: null,
          priceListCategoryId: null,
          createCustomerRecord: 0,
          financeCode1: null,
          financeCode2: null,
          scoreCardClassId: null,
          sapHrCode: null,
          isRepresentative: null,
          description1: null,
          deleted: 0,
          eInvoiceSeqs: [
            {
                "recordId": 82457596
            }
          ]
        },
      },
      disabledCustomer: true
    }
  },
  computed: {
    ...mapState(['createCode', 'employeeTypes', 'priceList', 'educationStatus', 'bloodTypes', 'employeeGroups', 'category1', 'scoreCards'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getLookup()
    this.getCode()
  },
  methods: {
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextEmployee/api/Employee/GetCode'})
    },
    getLookup () {
      //Nameler store içerisinde statelerde statik oluşuturuluyor. Tek bir servis kullanmak için böyle yapıldı.
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'EMPLOYEE_TYPE', name: 'employeeTypes'})
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'EDUCATION', name: 'educationStatus'})
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'EMPLOYEE_GROUP', name: 'employeeGroups'})
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'BLOOD_TYPE', name: 'bloodTypes'})
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'EMPLOYEE_CATEGORY_1', name: 'category1'})
      this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'SCORE_CARD_CLASS', name: 'scoreCards'})
    },
    save () {
      this.form.model.birthDate = this.form.model.birthDate ? new Date(this.form.model.birthDate).toISOString() : ''
      this.form.model.employmentStartDate = this.form.model.employmentStartDate ? new Date(this.form.model.employmentStartDate).toISOString() : ''
      this.form.model.employmentEndDate = this.form.model.employmentEndDate ? new Date(this.form.model.employmentEndDate).toISOString() : ''
      this.form.model.statusId = this.form.model.statusId ? 1 : 0
      this.$store.dispatch('createData', {...this.query, api: 'VisionNextEmployee/api/Employee', formdata: this.form, return: this.$route.meta.baseLink})
    },
    selectedType (e) {
      this.form.model.typeId = e.DecimalValue
    },
    selectedPriceList (e) {
      this.form.model.priceListCategoryId = e.DecimalValue
    },
    selectedEducation (e) {
      this.form.model.educationId = e.DecimalValue
    },
    selectedBloodType (e) {
      this.form.model.bloodTypeId = e.DecimalValue
    },
    selectedVehicle (e) {
      this.vehicle = e.title
    },
    selectedGroup (e) {
      this.form.model.groupId = e.DecimalValue
    },
    selectedCategory1 (e) {
      this.form.model.category1Id = e.DecimalValue
    },
    selectedScoreCard (e) {
      this.form.model.scoreCardClassId = e.DecimalValue
    },
    changeCustomer (e) {
      if (e === "1") {
        this.disabledCustomer = false
        this.$store.dispatch('lookupEmployeeType', {...this.query, type: 'PRICE_LIST_CATEGORY_TYPE', name: 'priceList'})
      } else {
        this.disabledCustomer = true
      }
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.model.code = e
      }
    }
  }
}
</script>
<style lang="sass">
</style>
