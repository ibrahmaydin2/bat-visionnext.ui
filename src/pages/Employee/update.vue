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
                <v-select v-model="group" :options="employeeGroups" @input="selectedGroup" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.category1')">
                <v-select v-model="category" :options="category1" @input="selectedCategory1" label="Label"></v-select>
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
                <v-select v-model="scoreCard" :options="scoreCards" @input="selectedScoreCard" label="Label"></v-select>
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
                <v-select v-model="type" :options="employeeTypes" @input="selectedType" label="Label"></v-select>
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
                <v-select v-model="price" :disabled="disabledCustomer" :options="priceList" @input="selectedPriceList" label="Label"></v-select>
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
                <v-select v-model="education" :options="educationStatus" @input="selectedEducation" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_Identificationnumber')">
                <b-form-input type="text" v-model="form.model.taxNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.employee.Model_BloodType')">
                <v-select v-model="bloodType" :options="bloodTypes" @input="selectedBloodType" label="title"></v-select>
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
                <b-td>{{r.Label}} {{r.RecordId}}</b-td>
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
      form: {
        model: {
          recordId: null,
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
      disabledCustomer: true,
      type: '',
      group: '',
      scoreCard: '',
      category: '',
      education: '',
      bloodType: '',
      price: '',
      eInvoiceSeqsList: [],
      detailListData: [],
      selectedEInvoice: []
    }
  },
  computed: {
    ...mapState(['rowData', 'employeeTypes', 'priceList', 'educationStatus', 'bloodTypes', 'employeeGroups', 'category1', 'scoreCards', 'branch'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getData()
    this.getLookup()
    this.getBranchData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextEmployee/api/Employee', record: this.$route.params.url})
    },
    getBranchData () {
      this.$store.dispatch('getBranchData', {...this.query, api: 'VisionNextBranch/api/Branch', record: 1})
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
      this.$store.dispatch('updateData', {...this.query, api: 'VisionNextEmployee/api/Employee', formdata: this.form, return: this.$route.meta.baseLink})
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
    },
    selectedEInvoiceSeq (e) {
      this.selectedEInvoice = e
    },
    addDetailList () {
      if (this.selectedEInvoice.length < 1) {
        return
      }
      this.detailListData.push(this.selectedEInvoice)
      this.form.model.eInvoiceSeqs.push({
        recordId: this.selectedEInvoice.RecordId,
        recordState: 2
      })
      this.selectedEInvoice = null
    },
    deleteEInvoiceSeq (item) {      
      // Model içerisindeki eInvoiceSeqs dizisinden elemanın çıkarılması
      let filteredArr = this.form.model.eInvoiceSeqs.filter(i => i.recordId === item.RecordId)
      this.form.model.eInvoiceSeqs.splice(this.form.model.eInvoiceSeqs.indexOf(filteredArr[0]), 1)

      // Tabloda listenen eInvoiceSeqs dizisinden elemanın çıkarılması
      this.detailListData.splice(this.detailListData.indexOf(item), 1)
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        this.form.model = {
          typeId: e.TypeId,
          userGroupId: e.UserGroupId,
          telephone1: e.Telephone1,
          telephone2: e.Telephone2,
          gsmNumber: e.GsmNumber,
          faxNumber: e.FaxNumber,
          email: e.Email,
          employmentStartDate: e.EmploymentStartDate,
          employmentEndDate: e.EmploymentEndDate,
          taxNumber: e.TaxNumber,
          birthDate: e.BirthDate,
          tShirtSize: e.TShirtSize,
          montSize: e.MontSize,
          overcoatSize: e.OvercoatSize,
          shoeSize: e.ShoeSize,
          educationId: e.EducationId,
          denimSize: e.DenimSize,
          corduroySize: e.CorduroySize,
          bloodTypeId: e.BloodTypeId,
          code: e.Code,
          name: e.Name,
          surname: e.Surname,
          groupId: e.GroupId,
          statusId: e.StatusId ? true : false,
          category1Id: e.Category1Id,
          other1: e.Other1,
          isTeam: e.IsTeam,
          priceListCategoryId: e.PriceListCategoryId,
          createCustomerRecord: e.CreateCustomerRecord,
          financeCode1: e.FinanceCode1,
          financeCode2: e.FinanceCode2,
          scoreCardClassId: e.ScoreCardClassId,
          sapHrCode: e.SapHrCode,
          isRepresentative: e.IsRepresentative,
          description1: e.Description1,
          deleted: e.Deleted,
          recordId: e.RecordId,
          eInvoiceSeqs: []
        }

        e.EInvoiceSeqs.map(i => {
          this.detailListData.push({
            Label: i.Prefix + ' ' + i.Year + ' ' + i.EInvoiceType.Label,
            RecordId: i.RecordId
          })
          this.form.model.eInvoiceSeqs.push({
            recordId: i.RecordId,
            recordState: 2,
            employeeId: i.EmployeeId
          })
        })

        if (e.Group) {
          this.group = e.Group.Label
        }
        if (e.Type) {
          this.type = e.Type.Label
        }
        if (e.ScoreCardClass) {
          this.scoreCard = e.ScoreCardClass.Label
        }
        if (e.Category1) {
          this.category = e.Category1.Label
        }
        if (e.Education) {
          this.education = e.Education.Label
        }
        if (e.PriceListCategory && e.CreateCustomerRecord) {
          this.price = e.PriceListCategory.Label
        }
      }
    },
    branch (e) {
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
