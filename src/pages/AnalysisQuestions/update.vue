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
            <NextDropdown v-model="cardType" :disabled="insertReadonly.CardTypeId" url="VisionNextFieldAnalysis/api/AnalysisQuestions/GetQuestionCardType" @input="selectedSearchType('CardTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="AnswerTypeId" :error="$v.form.AnswerTypeId">
            <NextDropdown v-model="answerType" :disabled="insertReadonly.AnswerTypeId" url="VisionNextFieldAnalysis/api/AnalysisQuestions/GetAnswerType" @input="selectedSearchType('AnswerTypeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.AnalysisQuestions.QuestionOptions')">
          <NextDetailPanel v-model="form.QuestionChoice" :items="customerQuestionChoiceItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
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
      routeName1: 'FieldAnalysis',
      customerQuestionChoiceItems: detailData.customerQuestionChoiceItems,
      cardType: {},
      answerType: {}
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.cardType = this.convertLookupValueToSearchValue(rowData.CardType)
      this.answerType = this.convertLookupValueToSearchValue(rowData.AnswerType)
      if (!rowData.QuestionChoice) {
        this.form.QuestionChoice = []
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
        this.updateData()
      }
    }
  }
}
</script>
