<template>
  <div class="asc__dashboard">
    <b-card class="asc__dashboard-card">
      <b-row>
        <b-col class="asc__dashboard-settings-route">
          <StockChangePassword />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import StockChangePassword from '../../components/StockChangePassword'
export default {
  components: {
    StockChangePassword
  },
  data () {
    return {
      routeName: this.$route.params.url
    }
  }
}
</script>
<style lang="sass">
  .asc__dashboard-settings-list
    background: #f5f5f5
    border-radius: 5px
    & ul
      padding: 10px 0px
      list-style: none
      font-weight: bold
      min-height: 80vh
      & li
        & ul
          padding: 5px 10px
          font-weight: normal
          cursor: pointer
  .asc__dashboard-settings-route
    & h3
      font-weight: bold
      border-bottom: 1px #ddd solid
      padding-bottom: 10px
</style>
<style scope>
</style>
