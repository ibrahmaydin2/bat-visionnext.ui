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
              <NextDropdown :disabled="insertReadonly.CardTypeId" url="" @input="selectedSearchType('CardTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="AnswerTypeId" :error="$v.form.AnswerTypeId">
              <NextDropdown :disabled="insertReadonly.AnswerTypeId" url="" @input="selectedSearchType('AnswerTypeId', $event)"/>
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
      customerQuestionChoiceItems: detailData.customerQuestionChoiceItems
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getCode()
    // this.createManualCode()
    this.getInsertPage(this.routeName)
  },
  methods: {
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextFieldAnalysis/api/AnalysisQuestions/GetCode'})
    },
    getInsertPage (e) {
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
        this.createData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
