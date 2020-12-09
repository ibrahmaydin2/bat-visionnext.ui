<template>
    <draggable
      :list="chartList"
      tag="div"
      :group="{ name: 'row' }"
      class="asc__dashboard"
      handle=".handle"
    >
      <masonry class="row">
        <b-col cols="12" class="mb-4" v-for="(chart, i) in chartList" :key="'chart' + i">
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
      </masonry>
    </draggable>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Search from '../../components/Search'

export default {
  components: {
    Search
  },
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
    ...mapState(['searchRes', 'errorMessage'])
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
  .asc__dashboard
    height: calc(100vh - 55px)
    margin-top: -5px
    padding: 15px 0
    .asc__create-req-btn
      color: #f08c00 !important
      border-color: #f08c0 !important
      &:hover
        color: white !important
        background-color: #f08c00 !important
        border-color: #f08c00 !important
    .asc__dashboard-card
      .asc__dashboard-title
        float: left
      .asc__dashboard-collapse
        float: right
      .asc__dashboard-move-icon
        float: left
        cursor: move
        color: #fff
        transition: .3s
        line-height: 26px
        width: 20px
      &:hover
        .asc__dashboard-move-icon
          color: #333
          transition: .3s
  .asc__card-mainTitle
    font-weight: bold
    font-style: italic
    margin: 5px 0 15px 0
    border-bottom: 1px #ddd solid
    padding: 0 0 15px 0px
    & a
      font-size: 14px
      color: #000
      font-weight: light
      text-decoration: underline
  .asc__table-create-btn
    background-color: #f59300
    border: none
    color: #ffffff
    border-radius: 0px !important
    &:hover
      background-color: darken(#f59300, 2)
      color: #fff
      cursor: pointer
  .asc__card-dashboard-zindexarea
    position: relative
    .asc__card-dashboard-zindexarea-table
      position: absolute
      left: 0
      right: 0
      margin: auto
      width: calc(100% - 30px)
      z-index: 99
      top: 110px
      box-shadow: 0 20px 40px #3e3e3e
    .asc__card-dashboard-zindexarea-close
      position: absolute
      top: 80px
      right: -20px
      background: #000
      border-radius: 50px
      width: 30px
      height: 30px
      color: #fff
      text-align: center
      line-height: 0px
      & i
        margin-left: -3px
</style>
<style scope>
.table th, .table td {
  border-top: none;
}
</style>
