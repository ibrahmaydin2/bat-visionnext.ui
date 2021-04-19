<template>
  <b-container fluid>
    <Navigation/>
    <Header/>
    <b-row>
      <b-col cols="12">
        <div :class="style.viewPush">
          <b-overlay :show="bigLoading" rounded="sm" spinner-variant="warning">
            <template #overlay>
              <b-icon
                icon="three-dots"
                animation="cylon"
                scale="8"
                variant="warning"
              ></b-icon>
            </template>
            <b-card class="asc__updatePage" no-body>
              <router-view/>
            </b-card>
          </b-overlay>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['style', 'bigLoading'])
  }
}
</script>
<style lang="sass">
  .asc__general-addingLoader
    display: none
    color: #ffa300
  .v-none
    visibility: hidden !important
  .asc__updatePage
    margin-bottom: 2rem
    & header
      padding: .5rem 15px 0 15px
    & section
      padding: .5rem 15px 0 15px
      background: #f5f5f5
    & h3
      display: block
      font-size: 14px
      font-weight: bold
      margin: 0px 0 20px 0
      border-bottom: 1px #ddd solid
      padding-bottom: 5px
    & span
      margin-right: 15px
      & i
        color: #f29d2a
    & p
      display: inline-block
      padding: 0 30px 0 0
      margin: 0px
      & i
        color: #f29d2a
        margin-right: 5px
      & span
        font-weight: bold
    .asc__updatePage-content-head
    .tabs
      .nav-tabs
        background: #e4e4e4
        padding: 0px 15px
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
      .tab-pane
        padding: 1rem 15px
        background: #fbfbfb
        min-height: 60vh
  .asc__updatePage
    .card-body
      padding-top: 0px !important
    .asc__updatePage-h3
      font-size: 14px
      font-weight: 700
      background: #fff
      margin: 0px
      padding: 0px
      line-height: 36px
      border-bottom: 2px #ddd solid
    .asc__updatePage-top
      border-bottom: 2px #ddd solid
      margin: 5px 0 10px 0px
      font-size: 12px
      & h3
        font-size: 14px
        font-weight: 700
        background: #fff
        margin: 0px
        padding: 0px
        line-height: 36px
      .asc__updatePage-top-Create
        font-size: 12px !important
        line-height: 22px !important
        margin-top: 0px !important

    .asc__updatePage-header-Dropdown
      float: left
      margin: 0 10px 0 0
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        width: 140px !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      .dropdown-item
        width: 300px
        color: #333 !important
        font-size: 12px !important
        padding: 5px 10px !important
    .asc__updatePage-header-Search
      width: 200px !important
      margin: 0 !important
      float: left !important
      & button
        font-size: 12px !important
        padding: 2px 5px !important
      & input
        font-size: 12px !important
        padding: 5px 10px !important
    .asc__updatePage-header-SelectRows
      width: 140px
      margin: 0 0px 0 0
      float: left
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        width: 140px !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      & input
        font-size: 12px !important
        padding: 5px 10px !important
      .dropdown-item
        width: 200px !important
        margin: 0px 10px 0px 10px !important
        color: #333 !important
        border-bottom: 1px #efefef solid !important
        font-size: 12px !important
        padding: 7px 10px !important
        &:hover
          background-color: #efefef !important
        & i
          padding: 2px !important
          color: #333 !important
      .active
        background-color: transparent !important
        & i
          padding: 2px !important
          background: #ffa300 !important
          color: #fff !important
    .asc__updatePage-header-Download
      float: left
      margin: 0 0 0 0
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      .dropdown-item
        color: #333 !important
        font-size: 12px !important
        padding: 5px 10px !important
    .asc__updatePage-header
      background: #FDFDFD !important
      border-color: #EAEAEA !important
      .asc__updatePage-header-h4
        font-size: 16px
        font-style: italic
        font-weight: 700
        margin: 0px
        padding: 0px 0px 10px 0px
      & h4
        font-size: 16px !important
      .card-body
        padding-bottom: 0px !important
      .form-group
        .col-form-label
          line-height: 10px !important
      .asc__updatePage-header-table
        & tr
          line-height: 18px !important
          border-bottom: 1px #ddd solid !important
          font-size: 12px !important
          &:last-child
            border-bottom: none !important
          & td
            padding: 5px 0px !important
    .asc__updatePage-body
      background: #FDFDFD !important
      border-color: #EAEAEA !important
      .asc__updatePage-body-h5
        font-weight: bold
        font-size: 14px
        font-style: italic
  </style>
  <style>
  .nav-tabs .nav-link.disabled {
    color: grey !important
  }
  </style>
