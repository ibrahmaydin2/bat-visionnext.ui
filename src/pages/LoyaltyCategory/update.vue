<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'LoyaltyCategory' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="MinValue" :error="$v.form.MinValue">
            <NextInput v-model="form.MinValue" type="number" :disabled="!(CategoryType && CategoryType.Code == 'ARA')" />
          </NextFormGroup>
          <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
            <NextInput v-model="form.MaxValue" type="number"  :disabled="!(CategoryType && CategoryType.Code == 'ARA')" />
          </NextFormGroup>
          <NextFormGroup item-key="CategoryTypeId" :error="$v.form.CategoryTypeId">
            <NextDropdown
              v-model="CategoryType"
              :disabled="insertReadonly.CategoryTypeId"
              @input="selectCategoryType"
              :options="types"
              :source="(types ? types.filter(c => c.Code == 'DEG' || c.Code == 'ARA' || c.Code == 'OTO' ): [])"
              label="Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="CalcTypeId" :error="$v.form.CalcTypeId">
            <NextDropdown v-model="CalcType" :disabled="!(CategoryType && CategoryType.Code == 'OTO')" lookup-key="LOYALTY_CATEGORY_CALC_TYPE"  @input="selectCalcType"/>
          </NextFormGroup>
          <NextFormGroup item-key="LoyaltyPoint" :error="$v.form.LoyaltyPoint">
            <NextInput v-model="form.LoyaltyPoint" type="number"  :disabled="CalcType && CalcType.Code == 'AKS'" />
          </NextFormGroup>
          <NextFormGroup item-key="FieldAnalysisId" :error="$v.form.FieldAnalysisId">
            <NextDropdown v-model="FieldAnalysis" label="Description1" :disabled="true" url="VisionNextFieldAnalysis/api/FieldAnalysis/SearchWithValidDate "  @input="selectAnalysis($event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="ByFrequency" :error="$v.form.ByFrequency">
            <NextCheckBox v-model="form.ByFrequency" type="number" :disabled="!(CalcType && CalcType.Code == 'SA') && !(CalcType && CalcType.Code == 'ANS')" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyCategory.salesTarget')" v-if="CalcType && CalcType.Code === 'SH'">
          <b-row>
            <NextFormGroup item-key="ColumnName" :error="$v.form.ColumnName" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown v-model="ColumnNameDesc" :disabled="insertReadonly.ColumnName" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=2" :dynamic-request="{paramId: 'ITEM_CRITERIA'}"  @input="selectColumnName($event)" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="ColumnValue" :error="$v.form.ColumnValue" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown v-model="ColumnValueDesc" :disabled="!ColumnNameDesc" :source="columnValues" @input="selectedType('ColumnValue', $event)" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="UnitId" :error="$v.form.UnitId" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown v-model="Unit" :disabled="insertReadonly.UnitId" lookup-key="UNIT" @input="selectedType('UnitId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity" v-if="CalcType && CalcType.Code === 'SH'">
              <NextInput v-model="form.Quantity" type="number" :disabled="insertReadonly.Quantity" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyaltyCategory.salesTargetQuota')" v-if="CalcType && CalcType.Code === 'SH'">
          <NextDetailPanel v-model="form.LoyaltyCatQuotas" :items="loyaltyCatQuotasItems" :before-add="beforeAddLoyaltyCatQuota" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyaltyCategory.analysisResult')"  @click="setDatePlanType" v-if="CalcType && CalcType.Code === 'ANS' && FieldAnalysis && FieldAnalysis.Code !== ''">
          <b-row>
            <NextFormGroup :title="$t('insert.loyaltyCategory.description')" :error="$v.loyaltyCategory.description" :required="true">
              <NextInput type="text" v-model="loyaltyCategory.description"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addLoyaltyCategory('LoyaltyCategoryCrits')" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="loyaltyCategoryFields"
              :items="this.form.LoyaltyCategoryCrits ? this.form.LoyaltyCategoryCrits.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="row">
                <div class="text-center">
                  <b-button size="sm" @click="removeLoyaltyCategory(row.item, 'LoyaltyCategoryCrits')" class="mr-2" variant="danger">
                    <i class="far fa-trash-alt"></i> {{$t('insert.loyaltyCategory.delete')}}
                  </b-button>
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
                    <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyaltyCategory.details')}}
                  </b-button>
                </div>
              </template>
              <template #row-details="{index}">
                <div class="p-4 mt-2 nested-detail-panel">
                  <h3>{{$t('insert.loyaltyCategory.analysisResult')}}</h3>
                  <b-row>
                    <NextFormGroup :title="$t('insert.loyaltyCategory.QuestionId')" :error="$v.loyaltyQuestion.question" :required="true">
                      <NextDropdown v-model="loyaltyQuestion.question" :source="questions" @input="selectQuestion"></NextDropdown>
                   </NextFormGroup>
                    <NextFormGroup v-if="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code === 'CS'" :title="$t('insert.loyaltyCategory.Answer')" :error="$v.loyaltyQuestion.multipleAnswer" :required="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code === 'CS'">
                      <NextDropdown v-model="loyaltyQuestion.multipleAnswer"  :source="answers" label="Description1"></NextDropdown>
                   </NextFormGroup>
                   <NextFormGroup :title="$t('insert.loyaltyCategory.AnswerStart')" :error="$v.loyaltyQuestion.AnswerStart" :required="true" >
                      <NextInput v-model="loyaltyQuestion.AnswerStart" type="number" :disabled="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code !== 'SY'"></NextInput>
                   </NextFormGroup>
                   <NextFormGroup :title="$t('insert.loyaltyCategory.AnswerEnd')" :error="$v.loyaltyQuestion.AnswerEnd" :required="true" >
                      <NextInput v-model="loyaltyQuestion.AnswerEnd" type="number" :disabled="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code !== 'SY'"></NextInput>
                   </NextFormGroup>
                   <b-col cols="12" md="2" class="text-right">
                     <b-form-group>
                       <AddDetailButton @click.native="addLoyaltyQuestion(index)" />
                     </b-form-group>
                   </b-col>
                 </b-row>
                 <b-row>
                    <b-table :items="form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails ? form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails.filter(i => i.RecordState !== 4) : []"  :fields="loyaltyQuestionFields">
                      <template #head()="data">
                        {{$t(data.label)}}
                      </template>
                      <template #cell(operations)="row">
                        <div class="text-center">
                          <b-button size="sm" @click="removeLoyaltyQuestion(row.item, index)" class="mr-2" variant="danger">
                            <i class="far fa-trash-alt"></i> {{$t('insert.loyaltyCategory.delete')}}
                          </b-button>
                        </div>
                      </template>
                    </b-table>
                 </b-row>
                </div>
              </template>
            </b-table>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.loyaltyCategory.questionChoice')" v-if="CategoryType && CategoryType.Code === 'DEG'">
          <NextDetailPanel v-model="form.LoyaltyCategoryValues" :items="loyaltyCategoryValuesItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyaltyCategory.activityResult')" v-if="CalcType && CalcType.Code === 'AKS'">
          <NextDetailPanel v-model="form.LoyaltyCategoryTasks" :items="loyaltyCategoryTasksItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.loyaltyCategory.salesAnalysis')" v-if="CalcType && CalcType.Code === 'SA'">
          <b-row>
            <NextFormGroup :title="$t('insert.loyaltyCategory.description')" :error="$v.loyaltyCategory.description" :required="true">
              <NextInput type="text" v-model="loyaltyCategory.description"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addLoyaltyCategory('LoyaltyCatSales')" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="loyaltyCategoryFields"
              :items="this.form.LoyaltyCatSales ? this.form.LoyaltyCatSales.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="row">
                <div class="text-center">
                  <b-button size="sm" @click="removeLoyaltyCategory(row.item, 'LoyaltyCatSales')" class="mr-2" variant="danger">
                    <i class="far fa-trash-alt"></i> {{$t('insert.loyaltyCategory.delete')}}
                  </b-button>
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
                    <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyaltyCategory.details')}}
                  </b-button>
                </div>
              </template>
              <template #row-details="{index}">
                <div class="p-4 mt-2 nested-detail-panel">
                  <h3>{{$t('insert.loyaltyCategory.salesAnalysis')}}</h3>
                  <NextDetailPanel lazy v-model="form.LoyaltyCatSales[index].LoyaltyCatSalesDetails" :items="LoyaltyCatSalesDetailsItems" />
                </div>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        MinValue: null,
        MaxValue: null,
        CategoryTypeId: null,
        CalcTypeId: null,
        TableName: null,
        LoyaltyPoint: null,
        FieldAnalysisId: null,
        ByFrequency: null,
        ColumnName: null,
        ColumnValue: null,
        UnitId: null,
        Quantity: null,
        LoyaltyCatQuotas: [],
        LoyaltyCategoryCrits: [],
        LoyaltyCategoryCritDetails: [],
        LoyaltyCategoryValues: [],
        LoyaltyCategoryTasks: [],
        LoyaltyCatSales: []
      },
      routeName1: 'Loyalty',
      CalcType: null,
      FieldAnalysis: null,
      CategoryType: null,
      ColumnNameDesc: null,
      ColumnValueDesc: null,
      Unit: null,
      Quantity: null,
      loyaltyCatQuotasItems: detailData.loyaltyCatQuotasItems,
      loyaltyCategoryCritsItems: detailData.loyaltyCategoryCritsItems,
      loyaltyCategoryValuesItems: detailData.loyaltyCategoryValuesItems,
      loyaltyCategoryTasksItems: detailData.loyaltyCategoryTasksItems,
      loyaltyCatSalesItems: detailData.loyaltyCatSalesItems,
      loyaltyCategoryFields: detailData.loyaltyCategoryFields,
      LoyaltyCatSalesDetailsItems: detailData.LoyaltyCatSalesDetailsItems,
      loyaltyQuestionFields: detailData.loyaltyQuestionFields,
      loyaltyCategory: {},
      loyaltyQuestion: {},
      questions: [],
      answers: [],
      columnValues: []

    }
  },
  computed: {
    ...mapState(['types'])
  },
  mounted () {
    this.getLists()
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.$store.commit('setGetCreateCode', rowData.Code)
        this.form = rowData
        this.CategoryType = this.convertLookupValueToSearchValue(rowData.CategoryType)
        this.CalcType = rowData.CalcType
        this.FieldAnalysis = this.convertLookupValueToSearchValue(rowData.FieldAnalysis)
        this.selectAnalysis(this.FieldAnalysis)
        this.ColumnNameDesc = this.convertLookupValueToSearchValue(rowData.ColumnNameDesc)
        this.Unit = rowData.Unit
        this.ColumnValueDesc = rowData.ColumnValueDesc

        if (!rowData.LoyaltyCategoryValues) {
          this.form.LoyaltyCategoryValues = []
        }

        if (!rowData.LoyaltyCategoryTasks) {
          this.form.LoyaltyCategoryTasks = []
        }

        if (rowData.LoyaltyCatSales && rowData.LoyaltyCatSales.length > 0) {
          this.LoyaltyCatSalesDetails = rowData.LoyaltyCatSales[0]
        }

        if (rowData.LoyaltyCategoryCrits && rowData.LoyaltyCategoryCrits.length > 0) {
          this.LoyaltyCategoryCritDetails = rowData.LoyaltyCategoryCrits[0]
        }

        if (this.form.LoyaltyCustomers && this.form.LoyaltyCustomers.length > 0) {
          this.customers = this.form.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
          this.branchs = this.form.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')
          this.customerCriterias = this.form.LoyaltyCustomers.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
        }
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
        this.tabValidation()
      } else {
        if (this.CalcType && this.CalcType.Code === 'SH') {
          this.form.TableName = 'T_ITEM'
        }
        this.updateData()
      }
    },
    getLists () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextLoyalty/api/LoyaltyCategoryType/Search', name: 'types'})
    },
    addLoyaltyCategory (listName) {
      this.$v.loyaltyCategory.$touch()
      if (this.$v.loyaltyCategory.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      this.form[listName].push({
        Description1: this.loyaltyCategory.description
      })
      this.setDatePlanType()
      this.loyaltyCategory = {}
      this.$v.loyaltyCategory.$reset()
    },
    addLoyaltyQuestion (index) {
      this.$v.loyaltyQuestion.$touch()
      if (this.$v.loyaltyQuestion.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      if (!this.form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails) {
        this.form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails = []
      }

      let filteredList = this.form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails.filter(i => i.QuestionId === this.loyaltyQuestion.question.RecordId && i.RecordState !== 4)
      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('insert.sameRecord'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }

      this.form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails.push({
        RecordState: 2,
        QuestionId: this.loyaltyQuestion.question.RecordId,
        QuestionIdDesc: this.loyaltyQuestion.question.Description1,
        QuestionIdCode: this.loyaltyQuestion.question.Code,
        AnswerId: this.loyaltyQuestion.multipleAnswer ? this.loyaltyQuestion.multipleAnswer.RecordId : null,
        AnswerIdDesc: this.loyaltyQuestion.multipleAnswer ? this.loyaltyQuestion.multipleAnswer.Description1 : null,
        AnswerStart: this.loyaltyQuestion.AnswerStart,
        AnswerEnd: this.loyaltyQuestion.AnswerEnd
      })
      let list = this.form.LoyaltyCategoryCrits
      this.form.LoyaltyCategoryCrits = []
      this.$forceUpdate()
      setTimeout(() => {
        this.form.LoyaltyCategoryCrits = list
      }, 1)

      this.setDatePlanType()
      this.loyaltyQuestion = {}
      this.$v.loyaltyQuestion.$reset()
    },
    selectDatePlanType (datePlanType) {
      if (datePlanType && datePlanType.Code === 'ST') {
        this.loyaltyCategory.datePlanFreq = null
        this.$forceUpdate()
      }
    },
    removeLoyaltyCategory (item, listName) {
      if (item.RecordId) {
        this.form[listName][this.form[listName].indexOf(item)].RecordState = 4
      } else {
        this.form[listName].splice(this.form[listName].indexOf(item), 1)
      }
      this.setDatePlanType()
    },
    removeLoyaltyQuestion (item, index) {
      let list = this.form.LoyaltyCategoryCrits
      this.form.LoyaltyCategoryCrits = []
      if (item.RecordId) {
        list[index].LoyaltyCategoryCritDetails[list[index].LoyaltyCategoryCritDetails.indexOf(item)].RecordState = 4
      } else {
        list[index].LoyaltyCategoryCritDetails.splice(list[index].LoyaltyCategoryCritDetails.indexOf(item), 1)
      }
      setTimeout(() => {
        this.form.LoyaltyCategoryCrits = list
      }, 1)
      this.$forceUpdate()
    },
    setDatePlanType () {
      if ((!this.form.LoyaltyCategoryCrits || this.form.LoyaltyCategoryCrits.filter(i => i.RecordState !== 4).length === 0) && this.form.ApplicationTypeId === 654) {
        this.loyaltyCategory.datePlanType = {
          Code: 'ST',
          Label: this.$t('insert.loyaltyCategory.everyFreq'),
          Value: '252',
          DecimalValue: 252
        }
        this.disabledDatePlanType = true
      } else if ((!this.form.LoyaltyCatSales || this.form.LoyaltyCatSales.filter(i => i.RecordState !== 4).length === 0) && this.form.ApplicationTypeId === 654) {
        this.loyaltySalesCategory.datePlanType = {
          Code: 'ST',
          Label: this.$t('insert.loyaltyCategory.everyFreq'),
          Value: '252',
          DecimalValue: 252
        }
        this.disabledDatePlanType = true
      } else {
        this.disabledDatePlanType = false
      }
    },
    selectAnalysis (value) {
      if (value) {
        this.form.FieldAnalysisId = value.RecordId
        this.$api.postByUrl({RecordId: value.RecordId}, 'VisionNextFieldAnalysis/api/FieldAnalysis/Get').then((response) => {
          if (response.Model && response.Model.FieldAnalysisQuestions) {
            this.questions = response.Model.FieldAnalysisQuestions.map(i => i.Question)
          }
        })
      } else {
        this.form.FieldAnalysisId = null
      }
    },
    selectQuestion (value) {
      if (value && value.AnswerType && value.AnswerType.Code === 'CS') {
        this.$api.postByUrl({RecordId: value.RecordId}, 'VisionNextFieldAnalysis/api/AnalysisQuestions/Get').then((response) => {
          if (response.Model && response.Model) {
            this.answers = response.Model.QuestionChoices
          }
        })
      }
    },
    selectColumnName  (data) {
      this.columnValues = []
      this.form.ColumnValueDesc = null
      this.form.ColumnValue = null
      if (data) {
        this.form.ColumnName = data.ForeignField
        this.$api.postByUrl({paramName: data.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.columnValues = res.Values
        })
      } else {
        this.form.ColumnName = null
      }
    },
    selectCategoryType (value) {
      if (value) {
        this.form.CategoryTypeId = value.RecordId
        if (value.Code !== 'OTO') {
          this.CalcType = null
          this.CalcTypeId = null
          this.FieldAnalysis = null
          this.form.FieldAnalysisId = null
          this.form.LoyaltyPoint = null
        }
      } else {
        this.form.CategoryTypeId = null
      }
    },
    selectCalcType (value) {
      if (value) {
        this.form.CalcTypeId = value.DecimalValue
        if (value.Code !== 'ANS') {
          this.FieldAnalysis = null
          this.form.FieldAnalysisId = null
        }
        if (value.Code === 'AKS') {
          this.form.LoyaltyPoint = null
        }
        if (value.Code !== 'SA' && value.Code !== 'ANS') {
          this.form.ByFrequency = null
        } else {
          this.form.ByFrequency = 1
        }
      } else {
        this.form.CalcTypeId = null
        this.form.ByFrequency = 0
      }
    },
    beforeAddLoyaltyCatQuota (form) {
      if (form.BeginDate > form.EndDate) {
        this.$toasted.show(this.$t('insert.loyaltyCategory.quotaDateError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      return true
    }
  },
  validations () {
    this.insertRules.MinValue = {
      required: requiredIf(function () {
        return this.CategoryType && this.CategoryType.Code === 'ARA'
      })
    }
    this.insertRequired.MinValue = this.CategoryType && this.CategoryType.Code === 'ARA'

    this.insertRules.MaxValue = {
      required: requiredIf(function () {
        return this.CategoryType && this.CategoryType.Code === 'ARA'
      })
    }
    this.insertRequired.MaxValue = this.CategoryType && this.CategoryType.Code === 'ARA'

    this.insertRules.CalcTypeId = {
      required: requiredIf(function () {
        return this.CategoryType && this.CategoryType.Code === 'OTO'
      })
    }
    this.insertRequired.CalcTypeId = this.CategoryType && this.CategoryType.Code === 'OTO'

    this.insertRules.LoyaltyPoint = {
      required: requiredIf(function () {
        return (this.CalcType && this.CalcType.Code === 'SH') || (this.CalcType && this.CalcType.Code === 'SA') || (this.CalcType && this.CalcType.Code === 'ANS')
      })
    }
    this.insertRequired.LoyaltyPoint = (this.CalcType && this.CalcType.Code === 'SH') || (this.CalcType && this.CalcType.Code === 'SA') || (this.CalcType && this.CalcType.Code === 'ANS')

    this.insertRules.FieldAnalysisId = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'ANS'
      })
    }
    this.insertRequired.FieldAnalysisId = this.CalcType && this.CalcType.Code === 'ANS'

    this.insertRules.LoyaltyCatQuotas = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'SH'
      })
    }
    this.insertRequired.LoyaltyCatQuotas = this.CalcType && this.CalcType.Code === 'SH'

    this.insertRules.ColumnName = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'SH'
      })
    }
    this.insertRequired.ColumnName = this.CalcType && this.CalcType.Code === 'SH'

    this.insertRules.ColumnValue = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'SH'
      })
    }
    this.insertRequired.ColumnValue = this.CalcType && this.CalcType.Code === 'SH'

    this.insertRules.UnitId = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'SH'
      })
    }
    this.insertRequired.UnitId = this.CalcType && this.CalcType.Code === 'SH'

    this.insertRules.Quantity = {
      required: requiredIf(function () {
        return this.CalcType && this.CalcType.Code === 'SH'
      })
    }
    this.insertRequired.Quantity = this.CalcType && this.CalcType.Code === 'SH'

    return {
      form: this.insertRules,
      loyaltyCategory: {
        description: {
          required
        }
      },
      loyaltyQuestion: {
        question: {
          required
        },
        multipleAnswer: {
          required: requiredIf(function () {
            return this.loyaltyQuestion.question && this.loyaltyQuestion.question.AnswerType.Code === 'CS'
          })
        },
        AnswerStart: {
          required: requiredIf(function () {
            return this.loyaltyQuestion.question && this.loyaltyQuestion.question.AnswerType.Code === 'SY'
          })
        },
        AnswerEnd: {
          required: requiredIf(function () {
            return this.loyaltyQuestion.question && this.loyaltyQuestion.question.AnswerType.Code === 'SY'
          })
        }
      }
    }
  }
}
</script>
<style lang="sass">
  .nested-detail-panel
    background-color: #e4e4e4
    border-radius: 15px
  .nested-detail-panel
      th
        border-color: #b7b4b4 !important
      td
        border-color: #b7b4b4 !important
</style>
