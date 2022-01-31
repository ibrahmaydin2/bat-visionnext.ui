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
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.BATLeagueTarget.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.BATLeagueTarget.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.BATLeagueTarget.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.BATLeagueTarget.title')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.BATLeagueTarget.CustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.Month, 'object', 'insert.BATLeagueTarget.MonthId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Year, 'object', 'insert.BATLeagueTarget.YearId')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.BATLeagueTarget.OpportunityTargetValues')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.OpportunityTargetValues" :items="opportunityTargetValuesItems" />
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
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      opportunityTargetValuesItems: detailData.opportunityTargetValuesItems
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/OpportunityTarget', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
