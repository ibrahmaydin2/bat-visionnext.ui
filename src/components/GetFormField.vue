<template>
  <div class="d-flex">
    <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
      <b-button-group class="mx-1">
        <b-button class="bg-orange text-white font-weight-bold" title="Save file">
          <b-icon icon="plus" aria-hidden="true"></b-icon>
        </b-button>
        <b-button class="bg-orange text-white font-weight-bold" title="Load file">
          <b-icon icon="pencil" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
    <b-dropdown v-if="formFields && formFields.RowActions.length >= 1" size="sm" variant="link" no-caret no-flip offset="-100" class="bat__workflow-dropdown" toggle-class="bat__workflow-dropdown-btn">
      <template #button-content>
        <span class=" text-dark font-weight-bold">İşlemler <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></span>
      </template>
      <b-dropdown-group id="dropdown-group-1" header="Group 1">
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-for="(opt, x) in filteredRouteActions" :key="'opt' + x">
          <router-link :to="{name: opt.Action, params: {url: $route.params.url}}">
            <i class="far fa-arrow-alt-circle-right" /> {{ opt.Title }}
          </router-link>
        </b-dropdown-item>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-2" header="Workflow">
        <b-dropdown-item><i class="far fa-user" /> Text 1 Deneme</b-dropdown-item>
        <b-dropdown-item><i class="far fa-envelope-open" /> Text 2 Deneme</b-dropdown-item>
        <b-dropdown-item><i class="far fa-thumbs-up" /> Text 3 Deneme</b-dropdown-item>
        <b-dropdown-item><i class="far fa-lemon" /> Text 4 Deneme</b-dropdown-item>
      </b-dropdown-group>
      <!-- <b-dropdown-text class="text-center"><b>Header</b></b-dropdown-text> -->
    </b-dropdown>
  </div>
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
<style lang="sass">
  .bg-orange
    background-color: #f78b4e
    border: none
    &:hover
      background: #f78b4e
  .bat__workflow-dropdown
    .bat__workflow-dropdown-btn
      &:hover
        color: black !important
        text-decoration: none !important
    .dropdown-menu
      box-shadow: 0 0 10px #a2a2a2
      max-height: 400px
      overflow-x: hidden
      overflow-y: auto
      .b-dropdown-text
        width: 200px
        margin: 0px 10px 0px 10px
        color: #333 !important
        padding: 7px 10px
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
