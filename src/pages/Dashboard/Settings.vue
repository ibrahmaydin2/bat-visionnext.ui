<template>
  <div class="asc__dashboard">
    <b-card class="asc__dashboard-card">
      <b-row>
        <b-col cols="2" class="asc__dashboard-settings-list">
          <ul>
            <li>{{$t('router.Settings')}}
              <ul>
                <li v-on:click="stockChangeActive(false)">{{$t('nav.changePassword')}}</li>
                <li v-on:click="stockChangeActive(true)">{{$t('nav.stockChangePassword')}}</li>
              </ul>
            </li>
          </ul>
        </b-col>
        <b-col class="asc__dashboard-settings-route">
          <div v-if='!stockChangePasswordValid'>
            <ChangePassword />
          </div>
          <div v-if='stockChangePasswordValid'>
            <StockChangePassword />
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import ChangePassword from '../../components/ChangePassword'
import StockChangePassword from '../../components/StockChangePassword'
export default {
  components: {
    ChangePassword,
    StockChangePassword
  },
  data () {
    return {
      stockChangePasswordValid: false
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    stockChangeActive: function (value) {
      if (value === true) {
        this.stockChangePasswordValid = true
      } else {
        this.stockChangePasswordValid = false
      }
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
