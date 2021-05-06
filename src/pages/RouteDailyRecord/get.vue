<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.RouteDailyRecord.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.RouteDailyRecord.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.RouteDailyRecord.Status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.RmaOrder.RmaOrder')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.RouteDailyRecord.Representative')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'get.RouteDailyRecord.Vehicle')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.RouteDailyRecord.Route')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCancelReason, 'object', 'get.RouteDailyRecord.RouteCancelReason')"></div>
              <div v-html="getFormatDataByType(rowData.RouteDate, 'date', 'get.RouteDailyRecord.RouteDate')"></div>
              <div v-html="getFormatDataByType(rowData.RouteStartTime, 'text', 'get.RouteDailyRecord.RouteStartTime')"></div>
              <div v-html="getFormatDataByType(rowData.RouteEndTime, 'text', 'get.RouteDailyRecord.RouteEndTime')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SalesCount, 'text', 'get.RouteDailyRecord.SalesCount')"></div>
              <div v-html="getFormatDataByType(rowData.SalesTotal, 'text', 'get.RouteDailyRecord.SalesTotal')"></div>
              <div v-html="getFormatDataByType(rowData.StartKm, 'text', 'get.RouteDailyRecord.StartKm')"></div>
              <div v-html="getFormatDataByType(rowData.EndKm, 'text', 'get.RouteDailyRecord.EndKm')"></div>
              <div v-html="getFormatDataByType(rowData.SuccessVisitCount, 'text', 'get.RouteDailyRecord.SuccessVisitCount')"></div>
              <div v-html="getFormatDataByType(rowData.PlannedVisitCount, 'text', 'get.RouteDailyRecord.PlannedVisitCount')"></div>
            </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['rowData'])
  },
  mounted () {
    this.getData()
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextRoute/api/RouteDailyRecord', record: this.$route.params.url}).then(() => {
      })
    }
  }
}
</script>
