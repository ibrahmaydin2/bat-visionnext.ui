<template>
  <div class="d-flex">
    <b-button-toolbar v-if="formFields && !this.routeName">
      <b-button-group class="header-btn-group">
        <router-link v-if="filteredInsertAction && filteredInsertAction.length > 0" :to="{name: `${baseLink}Insert`}">
          <b-button class="bg-orange text-white font-weight-bold rounded-0 mr-1" size="sm">
            <b-icon font-scale="0.9" shift-h="1" shift-v="2.5" icon="plus" aria-hidden="false" size="sm"></b-icon>
          </b-button>
        </router-link>
        <router-link v-if="filteredUpdateAction && filteredUpdateAction.length > 0 && !hideEdit" :to="{name: `${baseLink}Update`, params: {url: $route.params.url}}">
          <b-button class="bg-orange text-white font-weight-bold rounded-0 mr-1" size="sm">
            <b-icon font-scale="0.9" shift-h="1" shift-v="2.5" icon="pencil" aria-hidden="false" size="sm"></b-icon>
          </b-button>
        </router-link>
      </b-button-group>
    </b-button-toolbar>
    <b-dropdown v-if="value" size="sm" variant="link" no-caret no-flip offset="-100" class="bat__workflow-dropdown" toggle-class="bat__workflow-dropdown-btn">
      <template #button-content>
        <span class=" text-dark font-weight-bold">{{$t('general.actions')}} <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></span>
      </template>
      <Workflow v-model="value" :items="items"/>
    </b-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Workflow from './Workflow'
export default {
  props: {
    value: {},
    routeName: String,
    hideEdit: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      baseLink: this.routeName || this.$route.meta.baseLink,
      createLink: this.$route.meta.createLink
    }
  },
  components: {
    Workflow
  },
  computed: {
    ...mapState(['formFields']),
    filteredRouteActions () {
      if (Object.keys(this.formFields).length) {
        return this.formFields.RowActions.filter(item => {
          return item.Action !== 'Get' && item.ViewType === 'Route'
        })
      }
    },
    filteredInsertAction () {
      if (Object.keys(this.formFields).length) {
        return this.formFields.Actions.filter(item => {
          return item.Action === 'Insert' && this.createLink
        })
      }
    },
    filteredUpdateAction () {
      if (Object.keys(this.formFields).length) {
        return this.formFields.RowActions.filter(item => {
          return item.Action === 'Update'
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('getFormFields', { ...this.query, api: this.baseLink })
  }
}
</script>
<style lang="sass">
  .header-btn-group
    button
      height: 30px
  .bg-orange
    background-color: #f78b4e
    border: none
    &:hover
      background: #f78b4e
  .bat__workflow-dropdown
    height: 30px
    .bat__workflow-dropdown-btn
      &:hover
        color: black !important
        text-decoration: none !important
      &:focus
        text-decoration: none !important
        box-shadow: unset
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
