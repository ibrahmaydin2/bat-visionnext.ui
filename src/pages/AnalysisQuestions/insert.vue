<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'AnalysisQuestions' }">
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
            <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
              <NextDropdown
                :disabled="insertReadonly.CardTypeId"
                url="VisionNextFieldAnalysis/api/AnalysisQuestions/GetQuestionCardType"
                @input="selectedSearchType('CardTypeId', $event); form.AnswerTypeId = null; AnswerType = null" />
            </NextFormGroup>
            <NextFormGroup item-key="AnswerTypeId" :error="$v.form.AnswerTypeId">
              <NextDropdown
                v-model="AnswerType"
                @input="selectedSearchType('AnswerTypeId', $event)"
                :source="answers"
                label="Description1"
                :disabled="!form.CardTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.AnalysisQuestions.QuestionOptions')" v-if="form.AnswerTypeId === 1 || form.AnswerTypeId === 5">
            <NextDetailPanel v-model="form.QuestionChoice" :items="customerQuestionChoiceItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        CardTypeId: null,
        AnswerTypeId: null,
        Description1: null,
        QuestionChoice: []
      },
      customerQuestionChoiceItems: detailData.customerQuestionChoiceItems,
      routeName1: 'FieldAnalysis',
      AnswerType: null,
      CardType: null,
      allAnswers: []
    }
  },
  computed: {
    ...mapState(['']),
    answers: function () {
      return this.form.CardTypeId === 1 ? this.allAnswers.filter(l => l.Code === 'CS') : this.allAnswers
    }
  },
  mounted () {
    this.createManualCode()
    this.getAnswers()
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
    getAnswers () {
      this.$api.postByUrl({}, 'VisionNextFieldAnalysis/api/AnalysisQuestions/GetAnswerType').then((response) => {
        this.allAnswers = response
      })
    }
  }
}
</script>
