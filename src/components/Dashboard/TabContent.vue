<template>
  <b-row>
    <b-col cols="12" md="6" v-for="(report, i) in reports" :key="i">
      <b-card class="mb-2">
        <b-card-title class="report-title" v-html="report.Description"></b-card-title>
        <div class="report-box" v-if="report.GadgetType === 'Chart'">
          <Chart :RecordId="report.RecordId" />
        </div>
         <div class="report-box" v-if="report.GadgetType === 'ChartMultiple'">
          <Chart :RecordId="report.RecordId" />
        </div>
        <div class="report-box" v-if="report.GadgetType === 'Grid'">
          <Grid :RecordId="report.RecordId" />
        </div>
        <div class="report-box" v-if="report.GadgetType === 'Text'">
          <TextReport :RecordId="report.RecordId" />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import Chart from './Chart'
import Grid from './Grid'
import TextReport from './TextReport'
export default {
  name: 'TabContent',
  components: {
    Chart,
    Grid,
    TextReport
  },
  props: ['RecordId'],
  data () {
    return {
      reports: []
    }
  },
  mounted () {
    this.$store.dispatch('getDashboardReports', { ...this.query, id: this.RecordId }).then(res => {
      this.reports = res.data
    })
  }
}

</script>
