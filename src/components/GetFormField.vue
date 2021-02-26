<template>
  <b-dropdown v-if="formFields && formFields.RowActions.length >= 1" size="sm" variant="default" dropleft no-caret class="asc__nextgrid-dropdown-btn-p0">
    <template #button-content>
      <i class="fas fa-th" />
    </template>
    <b-dropdown-item v-for="(opt, x) in filteredRouteActions" :key="'opt' + x">
      <router-link :to="{name: opt.Action, params: {url: $route.params.url}}">
        <i class="far fa-circle" /> {{ opt.Title }}
      </router-link>
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['formFields']),
    filteredRouteActions () {
      return this.formFields.RowActions.filter(item => {
        return item.Action !== 'Get' && item.ViewType === 'Route'
      })
    }
  },
  mounted () {
    this.$store.dispatch('getFormFields', { ...this.query, api: this.$route.meta.baseLink })
  },
  methods: {
  },
  watch: {
    formFields (e) {
      if (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .dropdown-menu
    box-shadow: 0 0 10px #a2a2a2
    max-height: 400px
    overflow-x: hidden
    overflow-y: auto
    .dropdown-item
      width: 200px
      margin: 0px 10px 0px 10px
      color: #333 !important
      border-bottom: 1px #efefef solid
      font-size: 12px
      padding: 7px 10px
      &:hover
        background-color: #efefef
      & i
        padding: 2px
        color: #333
      & a
        color: #333
        display: block
    .active
      background-color: transparent
      & i
        padding: 2px
</style>
