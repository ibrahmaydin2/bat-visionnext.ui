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
           <b-col v-if="insertVisible.Code != null ? insertVisible.Code : debugVisible" cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.Model_Code')"
              :class="{ 'form-group--error': $v.form.Code.$error }"
            >
              <b-form-input type="text" v-model="form.Code = insertDefault.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.Model_Name')"
              :class="{ 'form-group--error': $v.form.Name.$error }"
            >
              <b-form-input type="text" v-model="form.Name" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.Model_Surname')"
              :class="{ 'form-group--error': $v.form.Surname.$error }"
            >
              <b-form-input type="text" v-model="form.Surname" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.employee.state')"
              :class="{ 'form-group--error': $v.form.model.statusId.$error }"
            >
              <b-form-checkbox v-model="statusId" name="check-button" switch>
                {{(statusId) ? $t('insert.active'): $t('insert.passive')}}
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
                <b-form-radio-group v-model="form.isRepresentative">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_SAPSrCode')">
                <b-form-input type="text" v-model="form.sapHrCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ERPCustomerCode')">
                <b-form-input type="text" v-model="form.financeCode1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ERPSupplierCode')">
                <b-form-input type="text" v-model="form.financeCode2" />
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
                <b-form-checkbox v-model="isTeam" name="check-button" switch>
                  {{(isTeam) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.employee.Model_Description')">
                <b-form-textarea v-model="form.other1" rows="3" max-rows="6" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.group')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.personalType')" :class="{ 'form-group--error': $v.form.model.typeId.$error }">
                <v-select :options="employeeTypes" @input="selectedType" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeCustomer')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_CreateCustomer')">
                <b-form-radio-group v-model="form.createCustomerRecord" @change="changeCustomer">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_taxNumber')">
                <b-form-input type="text" v-model="form.taxNumber" />
              </b-form-group>
            </b-col> -->
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_FinanceCode1')">
                <b-form-input type="text" v-model="form.financeCode1" />
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
                  v-model="form.birthDate"
                  locale="tr"
                  class="mb-2"
                  :value-as-date="true"
                >
                </b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_EmploymentStartDate')">
                <b-form-datepicker :placeholder="$t('insert.employee.Model_EmploymentStartDate')" v-model="form.employmentStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_EmploymentEndDate')">
                <b-form-datepicker :placeholder="$t('insert.employee.Model_EmploymentEndDate')" v-model="form.employmentEndDate" locale="tr" class="mb-2"></b-form-datepicker>
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
                <b-form-input type="text" v-model="form.taxNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_BloodType')">
                <v-select :options="bloodTypes" @input="selectedBloodType" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_JeansSize')">
                <b-form-input type="text" v-model="form.denimSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ShirtSize')">
                <b-form-input type="text" v-model="form.montSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Shoesize')">
                <b-form-input type="text" v-model="form.shoeSize" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_CoatSize')">
                <b-form-input type="text" v-model="form.overcoatSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_TShirtSize')">
                <b-form-input type="text" v-model="form.tShirtSize" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_ClothTrousersSize')">
                <b-form-input type="text" v-model="form.corduroySize" />
              </b-form-group>
            </b-col>
          </b-row>

        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeContact')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_GsmNumber')">
                <b-form-input type="text" v-model="form.gsmNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Telephone1')">
                <b-form-input type="text" v-model="form.telephone1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Telephone2')">
                <b-form-input type="text" v-model="form.telephone2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Email')">
                <b-form-input type="text" v-model="form.email" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Fax')">
                <b-form-input type="text" v-model="form.faxNumber" />
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
        </b-tab> -->
        <b-tab :title="$t('insert.employee.EmployeePrefix')">
          <b-table-simple bordered small>
            <b-thead>
              <b-th width="30%">
                <b-form-group :label="$t('insert.employee.EmployeePrefix')">
                  <v-select v-model="selectedEInvoice" :options="eInvoiceSeqsList" @input="selectedEInvoiceSeq" label="Label"></v-select>
                </b-form-group>
              </b-th>
              <b-th width="10%">
                <b-form-group>
                  <b-button @click="addDetailList" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
                </b-form-group>
              </b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(r, i) in detailListData" :key="'dl' + i">
                <b-td>{{r.Label}}</b-td>
                <b-td><i @click="deleteEInvoiceSeq(r)" class="far fa-trash-alt text-danger"></i></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
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
      requireds: {},
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
          statusId: 1,
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
          eInvoiceSeqs: []
        }
      },
      disabledCustomer: true,
      eInvoiceSeqsList: [],
      detailListData: [],
      selectedEInvoice: [],
      statusId: true,
      isTeam: false,
      step: 1
    }
  },
  computed: {
    ...mapState(['createCode', 'employeeTypes', 'debugVisible', 'insertRules', 'priceList', 'educationStatus', 'bloodTypes', 'employeeGroups', 'category1', 'scoreCards', 'rowData'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getLookup()
    this.getCode(this.$route.meta.baseLink)
    this.getBranch()
  },
  methods: {
    getBranch () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBranch/api/Branch', record: 1})
    },
    getCode (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: `?name=${e}`})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
    },
    getLookup () {
      // Nameler store içerisinde statelerde statik oluşuturuluyor. Tek bir servis kullanmak için böyle yapıldı.
      this.$store.dispatch('getLookups', {...this.query, type: 'EMPLOYEE_TYPE', name: 'employeeTypes'})
      this.$store.dispatch('getLookups', {...this.query, type: 'EDUCATION', name: 'educationStatus'})
      this.$store.dispatch('getLookups', {...this.query, type: 'EMPLOYEE_GROUP', name: 'employeeGroups'})
      this.$store.dispatch('getLookups', {...this.query, type: 'BLOOD_TYPE', name: 'bloodTypes'})
      this.$store.dispatch('getLookups', {...this.query, type: 'EMPLOYEE_CATEGORY_1', name: 'category1'})
      this.$store.dispatch('getLookups', {...this.query, type: 'SCORE_CARD_CLASS', name: 'scoreCards'})
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('takıldı')
        console.log(this.$v)
      } else {
        console.log('geçti')
        this.form.birthDate = this.form.birthDate ? new Date(this.form.birthDate).toISOString() : ''
        this.form.employmentStartDate = this.form.employmentStartDate ? new Date(this.form.employmentStartDate).toISOString() : ''
        this.form.employmentEndDate = this.form.employmentEndDate ? new Date(this.form.employmentEndDate).toISOString() : ''
        this.form.statusId = this.statusId ? 1 : 0
        this.form.isTeam = this.isTeam ? 1 : 0
        this.$store.dispatch('createData', {...this.query, api: 'VisionNextEmployee/api/Employee', formdata: this.form, return: this.$route.meta.baseLink})
      }
    },
    selectedType (e) {
      this.form.typeId = e.DecimalValue
    },
    selectedPriceList (e) {
      this.form.priceListCategoryId = e.DecimalValue
    },
    selectedEducation (e) {
      this.form.educationId = e.DecimalValue
    },
    selectedBloodType (e) {
      this.form.bloodTypeId = e.DecimalValue
    },
    selectedVehicle (e) {
      this.vehicle = e.title
    },
    selectedGroup (e) {
      this.form.groupId = e.DecimalValue
    },
    selectedCategory1 (e) {
      this.form.category1Id = e.DecimalValue
    },
    selectedScoreCard (e) {
      this.form.scoreCardClassId = e.DecimalValue
    },
    changeCustomer (e) {
      if (e === '1') {
        this.disabledCustomer = false
        this.$store.dispatch('getLookups', {...this.query, type: 'PRICE_LIST_CATEGORY_TYPE', name: 'priceList'})
      } else {
        this.disabledCustomer = true
      }
    },
    selectedEInvoiceSeq (e) {
      this.selectedEInvoice = e
    },
    addDetailList () {
      if (!this.selectedEInvoice) {
        return
      }
      this.detailListData.push(this.selectedEInvoice)
      this.form.eInvoiceSeqs.push({
        recordId: this.selectedEInvoice.RecordId,
        recordState: 2
      })
      this.selectedEInvoice = null
    },
    deleteEInvoiceSeq (item) {
      // Model içerisindeki eInvoiceSeqs dizisinden elemanın çıkarılması
      let filteredArr = this.form.eInvoiceSeqs.filter(i => i.recordId === item.RecordId)
      this.form.eInvoiceSeqs.splice(this.form.eInvoiceSeqs.indexOf(filteredArr[0]), 1)

      // Tabloda listenen eInvoiceSeqs dizisinden elemanın çıkarılması
      this.detailListData.splice(this.detailListData.indexOf(item), 1)
    }
  },
  validations () {
    if (this.requireds) {
      return {
        form: this.insertRules
      }
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    rowData (e) {
      if (e) {
        this.eInvoiceSeqsList = e.EInvoiceSeqs
        this.eInvoiceSeqsList.map(item => {
          item.Label = item.Prefix + ' ' + item.Year + ' ' + item.EInvoiceType.Label
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
