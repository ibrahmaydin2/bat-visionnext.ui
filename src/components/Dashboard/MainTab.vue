<template>
  <b-tabs class="dashboard-tabs" content-class="mt-3">
    <b-tab v-if="false" title="Realtime Dashboard">
      <realtime-dashboard :branchs="userBranches"></realtime-dashboard>
    </b-tab>
    <b-tab v-for="(tab, i) in tabList" :key="i" :title="tab.Description" lazy>
      <TabContent :RecordId="tab.RecordId" />
    </b-tab>
  </b-tabs>
</template>
<script>
import TabContent from './TabContent'
export default {
  name: 'MainTab',
  components: {
    TabContent
  },
  data () {
    return {
      tabList: [],
      userBranches: []
    }
  },
  mounted () {
    this.$store.dispatch('getDashboard').then(res => {
      this.tabList = res.data
    })
    this.userBranches = JSON.parse(localStorage.getItem('UserModel')).AuthorizedBranches
  }
}
</script>
<style lang="sass">
.dashboard-tabs
  .row > [class*='col-']
    display: flex
    flex-direction: column
  .nav-tabs
    background: #e4e4e4
    margin: 0px 15px
    border-bottom: 3px solid #f6f6f6
    .nav-item
      .active
        border-radius: 0px !important
        font-weight: bold
        font-size: 14px
      .nav-link
        color: #000
      .error-tab
        border: 1px #ff0000 solid !important
        border-radius: 0.25rem
  .tab-content
    padding: 1rem 15px
    background: white
    min-height: 60vh
    overflow: auto
    max-height: 85vh
    .report-box
      height: 300px
      overflow: auto
    .error-box
      position: absolute
      color: #fd7272
      top: 50%
      left: 50%
      transform: translate(-50%)
      font-size: 2rem
      width: 100%
      text-align: center
    .b-overlay-wrap
      height: 300px
    .table-span
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      max-width: 200px
      min-width: 50px
</style>
