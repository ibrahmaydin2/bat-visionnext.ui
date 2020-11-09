<template>
  <b-row class="asc__dashboard">
    <b-col cols="12" sm="6" lg="6" xl="6">
    </b-col>
  </b-row>
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
