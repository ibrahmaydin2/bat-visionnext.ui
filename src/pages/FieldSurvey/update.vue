<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'FieldSurvey' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
           <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
              <NextCheckBox v-model="form.StatusId" type="number" toggle />
           </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.FieldSurvey.FieldSurveyDefinitions')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="AnalysisTypeId" :error="$v.form.AnalysisTypeId">
              <v-select
                v-model="analysisType"
                :options="lookup.FIELD_SURVEY_TYPE"
                @input="selectedType('AnalysisTypeId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ValidityTypeId" :error="$v.form.ValidityTypeId">
              <v-select
                v-model="validityType"
                :options="lookup.ANALYSIS_VALIDITY_TYPE"
                @input="selectedType('ValidityTypeId', $event)"
                label="Label"
              />
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1">
                 <b-form-input type="text" v-model="form.Description1"/>
             </NextFormGroup>
          </b-row>
          <b-row>
             <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
                <b-form-input @input="changeSortOrder" min="0" max="99" type="number" v-model="form.SortOrder" :readonly="insertReadonly.SortOrder" />
             </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <v-select
                  disabled
                  v-model="selectedApproveState"
                  :options="lookup.APPROVE_STATE"
                  @input="selectedType('ApproveStateId', $event)"
                  label="Label"
                />
            </NextFormGroup>
            <NextFormGroup item-key="IsNecessary" :error="$v.form.IsNecessary">
               <NextCheckBox v-model="form.IsNecessary" type="number" toggle />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.Branches')">
          <b-row>
            <NextFormGroup :title="$t('insert.FieldSurvey.surveyBranchId')" :error="$v.selectedBranch" :required="true">
              <v-select v-model="selectedBranch" label="BranchCommercialTitle" :filterable="false" :options="branchs" @search="onBranchSearch">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.BranchCommercialTitle }}
                  </template>
                </v-select>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFieldSurveyBranchs" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.FieldSurveyBranchs">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.FieldSurvey.surveyBranchId')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in (form.FieldSurveyBranchs != null ? form.FieldSurveyBranchs.filter(f => f.RecordState !== 4) : [])" :key="i">
                  <b-td>{{r.SurveyBranch ? r.SurveyBranch.Label : r.Description1}}</b-td>
                  <b-td class="text-center"><i @click="removeFieldSurveyBranchs(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.employeeType')">
          <b-row>
            <NextFormGroup :title="$t('insert.FieldSurvey.employeeType')" :error="$v.selectedEmployeeType" :required="true">
              <v-select v-model="selectedEmployeeType" label="Label" :filterable="false" :options="detailLookup.EMPLOYEE_TYPE" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                 <AddDetailButton @click.native="addFieldSurveyEmployeeType" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.FieldSurvey.employeeType')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in (form.FieldSurveyEmployeeTypes != null ? form.FieldSurveyEmployeeTypes.filter(f => f.RecordState !== 4) : [])" :key="i">
                  <b-td>{{r.EmployeeType ? r.EmployeeType.Label : r.Label}}</b-td>
                  <b-td class="text-center"><i @click="removeFieldSurveyEmployee(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.questions')">
          <b-row>
            <NextFormGroup :title="$t('insert.FieldSurvey.questionId')" :error="$v.selectedQuestion.question" :required="true">
              <v-select v-model="selectedQuestion.question" label="Description1" :filterable="false" :options="analysisQuestions" @search="onAnalysisQuestions">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
            </NextFormGroup>
             <NextFormGroup :title="$t('insert.FieldSurvey.questionLineId')" :error="$v.selectedQuestion.lineNumber" :required="true">
                <b-form-input type="number" v-model="selectedQuestion.lineNumber" />
             </NextFormGroup>
             <NextFormGroup :title="$t('insert.FieldSurvey.questionIsNecessary')" :error="$v.selectedQuestion.isNecessary" :required="true">
               <NextCheckBox v-model="selectedQuestion.isNecessary" type="number" />
             </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFieldSurveyQuestions" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.FieldSurveyQuestions">
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.FieldSurvey.question')}}</span></b-th>
                  <b-th><span>{{$t('insert.FieldSurvey.questionLine')}}</span></b-th>
                  <b-th><span>{{$t('insert.FieldSurvey.questionIsNecessary')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in (form.FieldSurveyQuestions != null ? form.FieldSurveyQuestions.filter(f => f.RecordState !== 4) : [])" :key="i">
                    <b-td>{{r.FieldSurvey ? r.FieldSurvey.Label : r.Description1}}</b-td>
                    <b-td>{{r.LineNumber}}</b-td>
                    <b-td><i :class="'' + r.IsNecessary == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
                    <b-td class="text-center"><i @click="removeFieldSurveyQuestions(r)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.FieldSurvey.validDates')" v-if="validDatesReq">
          <b-row>
            <NextFormGroup :title="$t('insert.fieldSurveyValidDates.description1')" :error="$v.selectedValidDates.description1" :required="true">
              <b-form-input type="text" v-model="selectedValidDates.description1" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fieldSurveyValidDates.startDate')" :error="$v.selectedValidDates.startDate" :required="true">
              <b-form-datepicker :placeholder="$t('insert.fieldSurveyValidDates.startDate')" size="sm" v-model="selectedValidDates.startDate" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.fieldSurveyValidDates.endDate')" :error="$v.selectedValidDates.endDate" :required="true">
              <b-form-datepicker :placeholder="$t('insert.fieldSurveyValidDates.endDate')" size="sm" v-model="selectedValidDates.endDate" />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.FieldSurvey.statusId')" :error="$v.selectedValidDates.statusId" :required="true">
              <NextCheckBox v-model="selectedValidDates.statusId" type="number" toggle />
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addFieldSurveyValidDates" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.FieldSurveyValidDates">
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
                  <b-tr v-for="(r, i) in (form.FieldSurveyValidDates != null ? form.FieldSurveyValidDates.filter(f => f.RecordState !== 4) : [])" :key="i">
                    <b-td>{{r.FieldSurvey ? r.FieldSurvey.Label : r.Description1}}</b-td>
                    <b-td>{{r.StartDate}}</b-td>
                    <b-td>{{r.EndDate}}</b-td>
                    <b-td><i :class="'' + r.StatusId == 1 ? 'fas fa-check-square text-success' : 'fas fa-square text-danger'" /></b-td>
                    <b-td class="text-center"><i @click="removeFieldSurveyValidDates(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
import mixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      validDatesReq: false,
      routeName1: 'FieldAnalysis',
      form: {
        FieldSurveyBranchs: [],
        FieldSurveyEmployeeTypes: [],
        FieldSurveyQuestions: [],
        FieldSurveyValidDates: [],
        Code: null,
        StatusId: null,
        AnalysisTypeId: null,
        ValidityTypeId: null,
        SortOrder: null,
        IsNecessary: 0
      },
      selectedBranch: null,
      selectedEmployeeType: null,
      selectedQuestion: {
        question: null,
        questionLine: null,
        questionNecessary: null
      },
      selectedValidDates: {
        description1: null,
        recordState: 2,
        startDate: null,
        endDate: null,
        statusId: null
      },
      selectedApproveState: null,
      analysisType: {},
      validityType: {}
    }
  },
  computed: {
    ...mapState(['detailLookup', 'branchs', 'analysisQuestions'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setData()
      })
      this.$store.dispatch('getDetailPanelLookups', {...this.query, type: 'EMPLOYEE_TYPE'})
      if (this.lookup.APPROVE_STATE && this.lookup.APPROVE_STATE.length > 0) {
        var item = this.lookup.APPROVE_STATE.find(a => a.DecimalValue === 2100)
        this.form.ApproveStateId = item.DecimalValue
        this.selectedApproveState = item
      }
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
        if ((label === 'ValidityTypeId') && (parseInt(model.DecimalValue) === 463633)) {
          this.validDatesReq = true
        } else {
          this.validDatesReq = false
        }
      } else {
        this.form[label] = null
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.updateData()
      }
    },
    onBranchSearch (search, loading) {
      if (search.length >= 3) {
        let model = {
          BranchCommercialTitle: search
        }
        this.searchItemsByModel('VisionNextBranch/api/Branch/Search', 'branchs', model).then(res => {
          loading(false)
        })
      }
    },
    onAnalysisQuestions (search, loading) {
      if (search.length >= 3) {
        let model = {
          Description1: search
        }
        this.searchItemsByModel('VisionNextFieldAnalysis/api/AnalysisQuestions/Search', 'analysisQuestions', model).then(res => {
          loading(false)
        })
      }
    },
    addFieldSurveyBranchs () {
      this.$v.selectedBranch.$touch()
      if (this.$v.selectedBranch.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FieldSurveyBranchs.filter(i => i.SurveyBranchId === this.selectedBranch.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let filteredItem = this.form.FieldSurveyBranchs.find(i => i.SurveyBranchId === this.selectedBranch.RecordId && i.RecordState === 4)
      if (filteredItem) {
        this.form.FieldSurveyBranchs[this.form.FieldSurveyBranchs.indexOf(filteredItem)].RecordState = 3
        return
      }
      this.form.FieldSurveyBranchs.push({
        Description1: this.selectedBranch.BranchCommercialTitle,
        RecordState: 2,
        SurveyBranchId: this.selectedBranch.RecordId,
        StatusId: this.selectedBranch.StatusId
      })
      this.selectedBranch = null
      this.$v.selectedBranch.$reset()
    },
    addFieldSurveyEmployeeType () {
      this.$v.selectedEmployeeType.$touch()
      if (this.$v.selectedEmployeeType.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FieldSurveyEmployeeTypes.filter(i => i.EmployeeTypeId === this.selectedEmployeeType.DecimalValue && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let filteredItem = this.form.FieldSurveyEmployeeTypes.find(i => i.EmployeeTypeId === this.selectedEmployeeType.DecimalValue && i.RecordState === 4)
      if (filteredItem) {
        this.form.FieldSurveyEmployeeTypes[this.form.FieldSurveyEmployeeTypes.indexOf(filteredItem)].RecordState = 3
        return
      }
      this.form.FieldSurveyEmployeeTypes.push({
        Code: this.selectedEmployeeType.Code,
        Label: this.selectedEmployeeType.Label,
        RecordState: 2,
        EmployeeTypeId: this.selectedEmployeeType.DecimalValue,
        StatusId: this.selectedEmployeeType.StatusId
      })
      this.selectedEmployeeType = null
      this.$v.selectedEmployeeType.$reset()
    },
    addFieldSurveyQuestions () {
      this.$v.selectedQuestion.$touch()
      if (this.$v.selectedQuestion.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.FieldSurveyQuestions.filter(i => i.QuestionId === this.selectedQuestion.question.RecordId &&
       i.LineNumber === this.selectedQuestion.lineNumber && i.IsNecessary === this.selectedQuestion.isNecessary && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.FieldSurveyQuestions.push({
        Code: this.selectedQuestion.question.Code,
        Description1: this.selectedQuestion.question.Description1,
        RecordState: 2,
        QuestionId: this.selectedQuestion.question.RecordId,
        LineNumber: this.selectedQuestion.lineNumber,
        IsNecessary: this.selectedQuestion.isNecessary
      })
      this.selectedQuestion = {
        isNecessary: 0
      }
      this.$v.selectedQuestion.$reset()
    },
    addFieldSurveyValidDates () {
      this.$v.selectedValidDates.$touch()
      if (this.$v.selectedValidDates.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.FieldSurveyValidDates.push({
        Description1: this.selectedValidDates.description1,
        RecordState: 2,
        StartDate: this.selectedValidDates.startDate,
        EndDate: this.selectedValidDates.endDate,
        StatusId: this.selectedValidDates.statusId
      })
      this.selectedValidDates = {
        statusId: 0
      }
      this.$v.selectedValidDates.$reset()
    },
    removeFieldSurveyBranchs (item) {
      this.form.FieldSurveyBranchs[this.form.FieldSurveyBranchs.indexOf(item)].RecordState = 4
    },
    removeFieldSurveyEmployee (item) {
      this.form.FieldSurveyEmployeeTypes[this.form.FieldSurveyEmployeeTypes.indexOf(item)].RecordState = 4
    },
    removeFieldSurveyQuestions (item) {
      this.form.FieldSurveyQuestions[this.form.FieldSurveyQuestions.indexOf(item)].RecordState = 4
    },
    removeFieldSurveyValidDates (item) {
      this.form.FieldSurveyValidDates[this.form.FieldSurveyValidDates.indexOf(item)].RecordState = 4
    },
    changeSortOrder (e) {
      if (e > 99 || e < 0) {
        this.form.SortOrder = 0
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.FieldSurvey.minMaxSort') })
      }
    },
    setData () {
      var rowData = this.rowData
      this.form = rowData
      this.analysisType = rowData.AnalysisType
      if (this.lookup.ANALYSIS_VALIDITY_TYPE && this.lookup.ANALYSIS_VALIDITY_TYPE.length > 0 && this.form.ValidityTypeId > 0) {
        this.validityType = this.lookup.ANALYSIS_VALIDITY_TYPE.find(a => a.DecimalValue === this.form.ValidityTypeId)
      }
      if (rowData.ValidityTypeId === 463633) {
        this.validDatesReq = true
      } else {
        this.validDatesReq = false
      }
      if (this.form.FieldSurveyBranchs) {
        this.form.FieldSurveyBranchs.map(item => {
          item.RecordState = 3
          return item
        })
      }
      if (this.form.FieldSurveyEmployeeTypes) {
        this.form.FieldSurveyEmployeeTypes.map(item => {
          item.RecordState = 3
          return item
        })
      }
      if (this.form.FieldSurveyQuestions) {
        this.form.FieldSurveyQuestions.map(item => {
          item.RecordState = 3
          return item
        })
      }
      if (this.form.FieldSurveyValidDates) {
        this.form.FieldSurveyValidDates.map(item => {
          item.RecordState = 3
          return item
        })
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      selectedBranch: {
        required
      },
      selectedEmployeeType: {
        required
      },
      selectedQuestion: {
        question: {
          required
        },
        lineNumber: {
          required
        },
        isNecessary: {
          required
        }
      },
      selectedValidDates: {
        description1: {
          required
        },
        startDate: {
          required
        },
        endDate: {
          required
        },
        statusId: {
          required
        }
      }
    }
  },
  watch: {
    lookup: {
      handler (val) {
        if (val.APPROVE_STATE && val.APPROVE_STATE.length > 0) {
          var item = val.APPROVE_STATE.find(a => a.DecimalValue === 2100)
          this.form.ApproveStateId = item.DecimalValue
          this.selectedApproveState = item
        }
        if (val.ANALYSIS_VALIDITY_TYPE && val.ANALYSIS_VALIDITY_TYPE.length > 0 && this.form.ValidityTypeId > 0) {
          this.validityType = val.ANALYSIS_VALIDITY_TYPE.find(a => a.DecimalValue === this.form.ValidityTypeId)
        }
      },
      deep: true
    }
  }
}
</script>
