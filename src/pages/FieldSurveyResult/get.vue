<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.FieldSurveyResult.Code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.FieldSurveyResult.title')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.detail')}}</h6>
                <span><i class="far fa-circle" /> {{$t('get.FieldSurveyResult.Label')}}</span> <p>{{rowData.FieldSurvey ? rowData.FieldSurvey.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.FieldSurveyResult.Representative')}}</span> <p>{{rowData.Representative ? rowData.Representative.Label : ''}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.FieldSurveyResult.detailsTitle')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('get.FieldSurveyResult.Details.questionLabel')}}</b-th>
                      <b-th>{{$t('get.FieldSurveyResult.Details.answer')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(result, i) in rowData.FieldSurveyResultDetails" :key="i">
                      <b-td>{{result.Question ? result.Question.Label : ''}}</b-td>
                      <b-td>{{result.Answer}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/FieldSurveyResult', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
