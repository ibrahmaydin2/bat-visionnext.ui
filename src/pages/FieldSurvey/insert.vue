<template>
  <b-row class="asc__insertPage">
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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.FieldSurvey.FieldSurveyDefinitions')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.AnalysisTypeId != null ? insertVisible.AnalysisTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.AnalysisTypeId" :class="{ 'form-group--error': $v.form.AnalysisTypeId.$error }">
                <v-select
                  :options="lookup.FIELD_SURVEY_TYPE"
                  @input="selectedType('AnalysisTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ValidityTypeId != null ? insertVisible.ValidityTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ValidityTypeId" :class="{ 'form-group--error': $v.form.ValidityTypeId.$error }">
                <v-select
                  :options="lookup.ANALYSIS_VALIDITY_TYPE"
                  @input="selectedType('ValidityTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.Description1" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-textarea v-model="form.Description1" placeholder="" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.SortOrder != null ? insertVisible.SortOrder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SortOrder" :class="{ 'form-group--error': $v.form.SortOrder.$error }">
                <b-form-input type="text" v-model="form.SortOrder" :readonly="insertReadonly.SortOrder" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveStateId != null ? insertVisible.ApproveStateId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ApproveStateId" :class="{ 'form-group--error': $v.form.ApproveStateId.$error }">
                <v-select
                  :options="lookup.APPROVE_STATE"
                  @input="selectedType('ApproveStateId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsNecessary != null ? insertVisible.IsNecessary : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsNecessary" :class="{ 'form-group--error': $v.form.IsNecessary.$error }">
                <b-form-checkbox v-model="form.IsNecessary" name="check-button" switch>
                  {{(form.IsNecessary) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab :title="$t('insert.FieldSurvey.Branches')">
          <b-row>
            <b-col cols="12" md="4">
              <b-form-group :label="$t('insert.FieldSurvey.surveyBranchId')" :class="detailPanelError">
                <v-select label="BranchCommercialTitle" :filterable="false" :options="branchList" @search="onAcBranchSearch" @input="selectAcBranch">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.BranchCommercialTitle }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <b-button @click="addFieldSurveyBranchs" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.fieldSurveyBranchs">
            <b-table-simple bordered small>
              <b-thead>
                <b-th width="90%"><span>{{$t('insert.FieldSurvey.surveyBranch')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.fieldSurveyBranchs" :key="i">
                  <b-td>{{r.surveyBranch}}</b-td>
                  <b-td class="text-center"><i @click="removeFieldSurveyBranchs(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>

        <b-tab :title="$t('insert.FieldSurvey.employeeType')">
          <b-row>
            <b-col cols="12" md="4">
              <b-form-group :label="$t('insert.FieldSurvey.employeeType')" :class="detailPanelError">
                <v-select label="Label" :filterable="false" :options="detailLookup.EMPLOYEE_TYPE" @input="selectEployeeTypeId($event)" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <b-button @click="addFieldSurveyEmployeeType" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.fieldSurveyBranchs">
            <b-table-simple bordered small>
              <b-thead>
                <b-th width="90%"><span>{{$t('insert.FieldSurvey.surveyBranch')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.fieldSurveyEmployeeTypes" :key="i">
                  <b-td>{{r.employeeType}}</b-td>
                  <b-td class="text-center"><i @click="removeFieldSurveyEmployee(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>

        <b-tab :title="$t('insert.FieldSurvey.questions')">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.FieldSurvey.questionId')" :class="detailPanelError">
                <v-select label="Description1" :filterable="false" :options="analysisQuestions" @search="onAcAnalysisQuestions" @input="selectAcAnalysisQuestions">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.Description1 }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.FieldSurvey.questionLineId')" :class="detailPanelError">
                <b-form-input type="text" v-model="fieldSurveyQuestions.lineNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.FieldSurvey.questionIsNecessary')" :class="detailPanelError">
                <b-form-checkbox v-model="fieldSurveyQuestions.IsNecessary" name="check-button" switch>
                  {{(fieldSurveyQuestions.IsNecessary) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <b-button @click="addFieldSurveyQuestions" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.fieldSurveyQuestions">
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th width="40%"><span>{{$t('insert.FieldSurvey.question')}}</span></b-th>
                  <b-th><span>{{$t('insert.FieldSurvey.questionLine')}}</span></b-th>
                  <b-th><span>{{$t('insert.FieldSurvey.questionIsNecessary')}}</span></b-th>
                  <b-th width="40px"><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.fieldSurveyQuestions" :key="i">
                    <b-td>{{r.question}}</b-td>
                    <b-td>{{r.lineNumber}}</b-td>
                    <b-td><i :class="'' + r.IsNecessary == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
                    <b-td class="text-center"><i @click="removeFieldSurveyQuestions(r)" class="far fa-trash-alt bg-warning p-1 rounded text-dark"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.validDates')" v-if="validDatesReq">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.fieldSurveyValidDates.description1')" :class="detailPanelError">
                <b-form-input type="text" v-model="fieldSurveyValidDates.description1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group :label="$t('insert.fieldSurveyValidDates.startDate')" :class="detailPanelError">
                <b-form-datepicker :placeholder="$t('insert.fieldSurveyValidDates.startDate')" size="sm" v-once v-model="fieldSurveyValidDates.startDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group :label="$t('insert.fieldSurveyValidDates.endDate')" :class="detailPanelError">
                <b-form-datepicker :placeholder="$t('insert.fieldSurveyValidDates.endDate')" size="sm" v-once v-model="fieldSurveyValidDates.endDate" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group :label="$t('insert.FieldSurvey.statusId')" :class="detailPanelError">
                <b-form-checkbox v-model="fieldSurveyValidDates.statusId" name="check-button" switch>
                  {{(fieldSurveyValidDates.statusId) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <b-button @click="addFieldSurveyValidDates" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.fieldSurveyValidDates">
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th width="40%"><span>{{$t('insert.fieldSurveyValidDates.description1')}}</span></b-th>
                  <b-th><span>{{$t('insert.fieldSurveyValidDates.startDate')}}</span></b-th>
                  <b-th><span>{{$t('insert.fieldSurveyValidDates.endDate')}}</span></b-th>
                  <b-th><span>{{$t('insert.fieldSurveyValidDates.statusId')}}</span></b-th>
                  <b-th width="40px"><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.fieldSurveyValidDates" :key="i">
                    <b-td>{{r.description1}}</b-td>
                    <b-td>{{r.startDate}}</b-td>
                    <b-td>{{r.endDate}}</b-td>
                    <b-td><i :class="'' + r.statusId == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
                    <b-td class="text-center"><i @click="removeFieldSurveyValidDates(r)" class="far fa-trash-alt bg-warning p-1 rounded text-dark"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
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
      validDatesReq: false,
      form: {
        fieldSurveyBranchs: [],
        fieldSurveyEmployeeTypes: [],
        fieldSurveyQuestions: [],
        fieldSurveyValidDates: []
      },
      detailPanelError: '',
      fieldSurveyEmployeeTypes: {
        code: null,
        description1: null,
        recordState: 2,
        employeeTypeId: null,
        employeeType: null,
        statusId: null
      },
      fieldSurveyBranchs: {
        description1: null,
        recordState: 2,
        surveyBranch: null,
        surveyBranchId: null,
        statusId: null
      },
      fieldSurveyQuestions: {
        code: null,
        description1: null,
        recordState: 2,
        question: null,
        questionId: null,
        lineNumber: null,
        statusId: null,
        IsNecessary: null
      },
      fieldSurveyValidDates: {
        code: null,
        description1: null,
        recordState: 2,
        startDate: null,
        endDate: null,
        statusId: null
      },
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertRules', 'insertDefaultValue', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'detailLookup', 'createCode', 'branchList', 'analysisQuestions'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextFieldAnalysis/api/${e}/GetCode`})
      this.$store.dispatch('getDetailPanelLookups', {...this.query, type: 'EMPLOYEE_TYPE'})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      this.form[label] = model.DecimalValue
      if ((label === 'ValidityTypeId') && (parseInt(model.DecimalValue) === 463633)) {
        this.validDatesReq = true
      } else {
        this.validDatesReq = false
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log(this.$v)
        this.$store.commit('showAlert', { type: 'error', msg: 'Zorunlu alanları doldurun' })
      } else {
        this.$store.dispatch('createData', {...this.query, api: `VisionNextFieldAnalysis/api/FieldSurvey`, formdata: this.form, return: this.routeName})
      }
    },
    onAcBranchSearch (search, loading) {
      if (search.length >= 3) {
        this.searchAcBranch(loading, search, this)
      }
    },
    searchAcBranch (loading, search, vm) {
      this.$store.dispatch('acBranch', {...this.query, searchField: 'BranchCommercialTitle', searchText: search})
    },
    selectAcBranch (e) {
      this.fieldSurveyBranchs.surveyBranch = e.BranchCommercialTitle
      this.fieldSurveyBranchs.surveyBranchId = e.RecordId
    },
    onAcAnalysisQuestions (search, loading) {
      if (search.length >= 3) {
        this.searchAcAnalysisQuestions(loading, search, this)
      }
    },
    searchAcAnalysisQuestions (loading, search, vm) {
      this.$store.dispatch('acAnalysisQuestions', {...this.query, searchField: 'Description1', searchText: search})
    },
    selectAcAnalysisQuestions (e) {
      console.log(e)
      this.fieldSurveyQuestions.question = e.Description1
      this.fieldSurveyQuestions.questionId = e.RecordId
    },
    selectEployeeTypeId (e) {
      this.fieldSurveyEmployeeTypes.employeeType = e.Label
      this.fieldSurveyEmployeeTypes.employeeTypeId = e.DecimalValue
    },
    addFieldSurveyBranchs () {
      if (this.fieldSurveyBranchs.surveyBranchId != null) {
        this.detailPanelError = ''
        this.form.fieldSurveyBranchs.push({
          description1: this.fieldSurveyBranchs.description1,
          recordState: 2,
          surveyBranch: this.fieldSurveyBranchs.surveyBranch,
          surveyBranchId: this.fieldSurveyBranchs.surveyBranchId,
          statusId: this.fieldSurveyBranchs.statusId
        })
        this.fieldSurveyBranchs.description1 = null
        this.fieldSurveyBranchs.recordState = 2
        this.fieldSurveyBranchs.surveyBranch = null
        this.fieldSurveyBranchs.surveyBranchId = null
        this.fieldSurveyBranchs.statusId = null
      } else {
        this.detailPanelError = 'form-group--error'
      }
    },
    addFieldSurveyEmployeeType () {
      if (this.fieldSurveyEmployeeTypes.employeeTypeId != null) {
        this.detailPanelError = ''
        this.form.fieldSurveyEmployeeTypes.push({
          code: this.fieldSurveyEmployeeTypes.code,
          description1: this.fieldSurveyEmployeeTypes.description1,
          recordState: 2,
          employeeTypeId: this.fieldSurveyEmployeeTypes.employeeTypeId,
          employeeType: this.fieldSurveyEmployeeTypes.employeeType,
          statusId: this.fieldSurveyEmployeeTypes.statusId
        })
        this.fieldSurveyEmployeeTypes.code = null
        this.fieldSurveyEmployeeTypes.description1 = null
        this.fieldSurveyEmployeeTypes.recordState = 2
        this.fieldSurveyEmployeeTypes.employeeTypeId = null
        this.fieldSurveyEmployeeTypes.employeeType = null
        this.fieldSurveyEmployeeTypes.statusId = null
      } else {
        this.detailPanelError = 'form-group--error'
      }
    },
    addFieldSurveyQuestions () {
      if (this.fieldSurveyQuestions.questionId != null) {
        this.detailPanelError = ''
        this.form.fieldSurveyQuestions.push({
          code: this.fieldSurveyQuestions.code,
          description1: this.fieldSurveyQuestions.description1,
          recordState: 2,
          question: this.fieldSurveyQuestions.question,
          questionId: this.fieldSurveyQuestions.questionId,
          lineNumber: this.fieldSurveyQuestions.lineNumber,
          statusId: this.fieldSurveyQuestions.statusId,
          IsNecessary: this.fieldSurveyQuestions.IsNecessary === true ? 1 : 0
        })
        this.fieldSurveyQuestions.code = null
        this.fieldSurveyQuestions.description1 = null
        this.fieldSurveyQuestions.recordState = 2
        this.fieldSurveyQuestions.question = null
        this.fieldSurveyQuestions.questionId = null
        this.fieldSurveyQuestions.lineNumber = null
        this.fieldSurveyQuestions.statusId = null
        this.fieldSurveyQuestions.IsNecessary = null
      } else {
        this.detailPanelError = 'form-group--error'
      }
    },
    addFieldSurveyValidDates () {
      if (this.fieldSurveyValidDates.description1 != null) {
        this.detailPanelError = ''
        this.form.fieldSurveyValidDates.push({
          code: this.fieldSurveyValidDates.code,
          description1: this.fieldSurveyValidDates.description1,
          recordState: 2,
          startDate: this.fieldSurveyValidDates.startDate,
          endDate: this.fieldSurveyValidDates.endDate,
          statusId: this.fieldSurveyValidDates.statusId === true ? 1 : 0
        })
        this.fieldSurveyValidDates.code = null
        this.fieldSurveyValidDates.description1 = null
        this.fieldSurveyValidDates.recordState = 2
        this.fieldSurveyValidDates.startDate = null
        this.fieldSurveyValidDates.endDate = null
        this.fieldSurveyValidDates.statusId = null
      } else {
        this.detailPanelError = 'form-group--error'
      }
    },
    removeFieldSurveyBranchs (item) {
      this.form.fieldSurveyBranchs.splice(this.form.fieldSurveyBranchs.indexOf(item), 1)
    },
    removeFieldSurveyEmployee (item) {
      this.form.fieldSurveyEmployeeTypes.splice(this.form.fieldSurveyEmployeeTypes.indexOf(item), 1)
    },
    removeFieldSurveyQuestions (item) {
      this.form.fieldSurveyQuestions.splice(this.form.fieldSurveyQuestions.indexOf(item), 1)
    },
    removeFieldSurveyValidDates (item) {
      this.form.fieldSurveyValidDates.splice(this.form.fieldSurveyValidDates.indexOf(item), 1)
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        this.form[el] = value[el]
      })
    }
  }
}
</script>
<style lang="sass">
</style>
