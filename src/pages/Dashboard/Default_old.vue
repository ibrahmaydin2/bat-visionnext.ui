<template>
  <div class="asc__dashboard">
    <draggable
      :list="chartList"
      tag="div"
      :group="{ name: 'row' }"
      class="row"
      handle=".handle"
    >
      <b-col cols="12" md="6" class="mb-4" v-for="(chart, i) in chartList" :key="'chart' + i">
        <b-card class="asc__dashboard-card">
          <i class="fas fa-arrows-alt handle asc__dashboard-move-icon" />
          <h5 class="asc__dashboard-title">{{chart.title}}</h5>
          <!-- <i :class="collapseIcon === true ? 'far fa-caret-square-up' : 'far fa-caret-square-down'" class="asc__dashboard-collapse" v-b-toggle="'dashboardCard-' + i" /> -->
          <div class="clearfix" />
          <!-- <b-collapse :id="'dashboardCard-' + i" v-model="collapseIcon" v-once> -->
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
            />
          <!-- </b-collapse> -->
        </b-card>
      </b-col>
    </draggable>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      collapseIcon: true,
      chartList: [
        {title: 'dummy 1'},
        {title: 'dummy 2'},
        {title: 'dummy 3'},
        {title: 'dummy 4'},
        {title: 'dummy 5'},
        {title: 'dummy 6'},
        {title: 'dummy 7'}
      ],
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2017', 1000, 400, 200],
        ['2018', 1170, 460, 250],
        ['2019', 660, 1120, 300],
        ['2020', 1030, 540, 350]
      ],
      chartOptions: {
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        is3D: true,
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2017-2020'
        }
      }
    }
  },
  mounted () {
    this.hamburger('open')
  },
  computed: {
    ...mapState(['errorMessage'])
  },
  watch: {
  },
  methods: {
    ...mapMutations(['hamburger']),
    closeMiniModal () {
      this.patientNS = null
      this.showKitTable = false
      this.showKitTypes = false
    }
  }
}
</script>
<style lang="sass">
</style>
<style scope>
.table th, .table td {
  border-top: none;
}
</style>
