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
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1 " :error="$v.form.Description1 ">
            <NextInput v-model="form.Description1 " type="text" :disabled="insertReadonly.Description1 " />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="MinValue" :error="$v.form.MinValue">
            <NextInput v-model="form.MinValue" type="number" :disabled="CategoryType == '' && CategoryType.Code !== 'ARA'" />
          </NextFormGroup>
          <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
            <NextInput v-model="form.MaxValue" type="number" :disabled="insertReadonly.MaxValue" />
          </NextFormGroup>
          <NextFormGroup item-key="CategoryTypeId" :error="$v.form.CategoryTypeId">
            <NextDropdown v-model="CategoryType" :required="true" :disabled="insertReadonly.CategoryTypeId" url="VisionNextLoyalty/api/LoyaltyCategoryType/Search" @input="selectedSearchType('CategoryTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="CalcTypeId" :error="$v.form.CalcTypeId">
            <NextDropdown v-model="CalcType" :disabled="insertReadonly.CalcTypeId" lookup-key="LOYALTY_CATEGORY_CALC_TYPE"  @input="selectedType('CalcTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="LoyaltyPoint" :error="$v.form.LoyaltyPoint">
            <NextInput v-model="form.LoyaltyPoint" type="number" :disabled="insertReadonly.LoyaltyPoint" />
          </NextFormGroup>
          <NextFormGroup item-key="FieldAnalysisId" :error="$v.form.FieldAnalysisId">
            <NextDropdown v-model="FieldAnalysis" :disabled="insertReadonly.FieldAnalysisId" url="VisionNextFieldAnalysis/api/FieldAnalysis/Search"  @input="selectAnalysis($event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="ByFrequency" :error="$v.form.ByFrequency">
            <NextCheckBox v-model="form.ByFrequency" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyCategory.salesTarget')"  @click.prevent="tabValidation()" v-if="CalcType && CalcType.Code === 'SH'">
          <b-row>
            <NextFormGroup item-key="ColumnName" :error="$v.form.ColumnName" :required="true" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown :disabled="insertReadonly.ColumnName" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"  @input="selectedSearchType('ColumnName', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ColumnValue" :error="$v.form.ColumnValue" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown :disabled="insertReadonly.ColumnValue" url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"  @input="selectedSearchType('ColumnValue', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="UnitId" :error="$v.form.UnitId" v-if="CalcType && CalcType.Code === 'SH'">
              <NextDropdown :disabled="insertReadonly.UnitId" url="VisionNextUnit/api/Unit/Search"  @input="selectedSearchType('UnitId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity" v-if="CalcType && CalcType.Code === 'SH'">
              <NextInput v-model="form.Quantity" type="number" :disabled="insertReadonly.Quantity" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesTargetQuota')" v-if="CalcType && CalcType.Code === 'SH'">
          <NextDetailPanel v-model="form.LoyaltyCatQuotas" :items="loyaltyCatQuotasItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.analysisResult')"  @click="setDatePlanType" v-if="CalcType && CalcType.Code === 'ANS' && FieldAnalysis && FieldAnalysis.Code !== ''">
          <b-row>
            <NextFormGroup :title="$t('insert.loyaltyCategory.description')" :error="$v.loyaltyActiveCategory.description" :required="true">
              <NextInput type="text" v-model="loyaltyActiveCategory.description"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addLoyaltyActiveCategory" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="loyaltyActiveCategoryFields"
              :items="this.form.LoyaltyCategoryCrits ? this.form.LoyaltyCategoryCrits.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #cell(operations)="row">
                <div class="text-center">
                  <b-button size="sm" @click="removeLoyaltyActiveCategory(row.item)" class="mr-2" variant="danger">
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
                      <NextDropdown v-model="loyaltyQuestion.multipleAnswer"  :source="answers"></NextDropdown>
                   </NextFormGroup>
                   <NextFormGroup :title="$t('insert.loyaltyCategory.AnswerStart')" :error="$v.loyaltyQuestion.AnswerStart" :required="true" >
                      <NextInput v-model="loyaltyQuestion.AnswerStart" type="number" :disabled="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code === 'SY'"></NextInput>
                   </NextFormGroup>
                   <NextFormGroup :title="$t('insert.loyaltyCategory.AnswerEnd')" :error="$v.loyaltyQuestion.AnswerEnd" :required="true" >
                      <NextInput v-model="loyaltyQuestion.AnswerEnd" type="number" :disabled="loyaltyQuestion.question && loyaltyQuestion.question.AnswerType.Code === 'SY'"></NextInput>
                   </NextFormGroup>
                   <b-col cols="12" md="2" class="text-right">
                     <b-form-group>
                       <AddDetailButton @click.native="addLoyaltyQuestion(index)" />
                     </b-form-group>
                   </b-col>
                 </b-row>
                </div>
              </template>
            </b-table>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.questionChoice')" v-if="CategoryType && CategoryType.Code === 'DEG'">
          <NextDetailPanel v-model="form.LoyaltyCategoryValues" :items="loyaltyCategoryValuesItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.activityResult')" v-if="CalcType && CalcType.Code === 'AKS'">
          <NextDetailPanel v-model="form.LoyaltyCategoryTasks" :items="loyaltyCategoryTasksItems" />
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesAnalysis')" v-if="CalcType && CalcType.Code === 'SA'">
          <b-row>
            <NextFormGroup :title="$t('insert.loyaltyCategory.description')" :error="$v.loyaltyActiveCategory.description" :required="true">
              <NextInput type="text" v-model="loyaltyActiveCategory.description"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addLoyaltyActiveCategory" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="loyaltyActiveCategoryFields"
              :items="this.form.LoyaltyCatSales ? this.form.LoyaltyCatSales.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #cell(operations)="row">
                <div class="text-center">
                  <b-button size="sm" @click="removeLoyaltyActiveCategory(row.item)" class="mr-2" variant="danger">
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
                  <NextDetailPanel v-model="form.LoyaltyCatSales[index].LoyaltyCatSalesDetails" :items="LoyaltyCatSalesDetailsItems" />
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
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        LoyaltyCatQuotas: [],
        LoyaltyCategoryCrits: [],
        LoyaltyCategoryValues: [],
        LoyaltyCategoryTasks: [],
        LoyaltyCatSales: []
      },
      routeName1: 'Loyalty',
      CalcType: null,
      FieldAnalysis: null,
      CategoryType: null,
      /// approveState: null,
      loyaltyCatQuotasItems: detailData.loyaltyCatQuotasItems,
      loyaltyCategoryCritsItems: detailData.loyaltyCategoryCritsItems,
      loyaltyCategoryValuesItems: detailData.loyaltyCategoryValuesItems,
      loyaltyCategoryTasksItems: detailData.loyaltyCategoryTasksItems,
      loyaltyCatSalesItems: detailData.loyaltyCatSalesItems,
      loyaltyActiveCategoryFields: detailData.loyaltyActiveCategoryFields,
      LoyaltyCatSalesDetailsItems: detailData.LoyaltyCatSalesDetailsItems,
      loyaltyActiveCategory: {},
      loyaltyQuestion: {},
      questions: [],
      answers: []

    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.createManualCode()
    // this.setApproveState()
  },
  methods: {
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
        this.createData()
      }
    },
    addLoyaltyActiveCategory () {
      this.$v.loyaltyActiveCategory.$touch()
      if (this.$v.loyaltyActiveCategory.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.LoyaltyCategoryCrits.filter(i => i.LoyaltyCategoryId === this.loyaltyActiveCategory.loyaltyCategory.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.loyaltyCategory.sameCategoryError') })
        return false
      }
      let filteredArr2 = this.form.LoyaltyCatSales.filter(i => i.LoyaltyCategoryId === this.loyaltyActiveCategory.loyaltyCategory.RecordId && i.RecordState !== 4)
      if (filteredArr2.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.loyaltyCategory.sameCategoryError') })
        return false
      }

      this.form.LoyaltyCategoryCrits.push({
        Description1: this.loyaltyActiveCategory.description
      })
      this.form.LoyaltyCatSales.push({
        Description1: this.loyaltyActiveCategory.description
      })
      this.setDatePlanType()
      this.loyaltyActiveCategory = {}
      this.$v.loyaltyActiveCategory.$reset()
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

      this.form.LoyaltyCategoryCrits[index].LoyaltyCategoryCritDetails.push({
        QuestionId: this.loyaltyQuestion.RecordId,
        AnswerId: this.loyaltyQuestion.multipleAnswer ? this.loyaltyQuestion.multipleAnswer.RecordId : null
      })

      this.loyaltyQuestion = {}
      this.$v.loyaltyQuestion.$reset()
    },
    selectDatePlanType (datePlanType) {
      if (datePlanType && datePlanType.Code === 'ST') {
        this.loyaltyActiveCategory.datePlanFreq = null
        this.$forceUpdate()
      }
    },
    removeLoyaltyActiveCategory (item) {
      if (item.RecordId) {
        this.form.LoyaltyCategoryCrits[this.form.LoyaltyCategoryCrits.indexOf(item)].RecordState = 4
      } else {
        this.form.LoyaltyCategoryCrits.splice(this.form.LoyaltyCategoryCrits.indexOf(item), 1)
      }
      this.setDatePlanType()
    },
    setDatePlanType () {
      if ((!this.form.LoyaltyCategoryCrits || this.form.LoyaltyCategoryCrits.filter(i => i.RecordState !== 4).length === 0) && this.form.ApplicationTypeId === 654) {
        this.loyaltyActiveCategory.datePlanType = {
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
    }

    // setApproveState () {
    //   if (!this.approveState) {
    //     let filteredArr = this.lookup.APPROVE_STATE ? this.lookup.APPROVE_STATE.filter(a => a.Code === 'ONYBK') : []
    //     this.approveState = filteredArr && filteredArr.length > 0 ? filteredArr[0] : null
    //     this.form.ApproveStateId = this.approveState ? this.approveState.DecimalValue : null
    //     this.$forceUpdate()
    //   }
    // }
  },
  validations () {
    return {
      form: this.insertRules,
      loyaltyActiveCategory: {
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
