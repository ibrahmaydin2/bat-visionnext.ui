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
            <span><i class="fas fa-code" />  <b>{{$t('get.ItemAnalysisResult.Code')}}:</b> {{rowData.ItemAnalysis ? rowData.ItemAnalysis.Code : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.ItemAnalysisResult.title')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.detail')}}</h6>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.warehouse.IsCenterWarehouse')}}</span> <p><i :class="rowData.IsCenterWarehouse === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p> -->
                <span><i class="far fa-circle" /> {{$t('get.ItemAnalysisResult.Label')}}</span> <p>{{rowData.ItemAnalysis ? rowData.ItemAnalysis.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.ItemAnalysisResult.Canceled')}}</span> <p><i :class="rowData.Canceled === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('get.ItemAnalysisResult.CancelReason')}}</span> <p>{{rowData.CancelReason ? rowData.CancelReason.Label : ''}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.ItemAnalysisResult.detailsTitle')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('get.ItemAnalysisResult.Details.itemLabel')}}</b-th>
                      <b-th>{{$t('get.ItemAnalysisResult.Details.questionLabel')}}</b-th>
                      <b-th>{{$t('get.ItemAnalysisResult.Details.answer')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(result, i) in rowData.ItemAnalysisResultDetails" :key="i">
                      <b-td>{{result.Item ? result.Item.Label : ''}}</b-td>
                      <b-td>{{result.Question ? result.Question.Label : ''}}</b-td>
                      <b-td><i :class="rowData.Answer === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></b-td>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/ItemAnalysisResult', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
