<template>
  <b-container fluid>
    <Navigation/>
    <Header/>
    <b-row class="mb-3">
      <b-col cols="12">
        <div :class="style.viewPush">
          <b-card class="asc__listPage">
            <b-row class="asc__listPage-Header">
              <b-col cols="12" sm="12" md="3" class="pl-0">
                <h3>{{pageTitle}}</h3>
              </b-col>
              <b-col cols="12" sm="6" md="3">
                <b-input-group class="asc__listPage-Header-Search d-none">
                  <b-form-input />
                  <b-input-group-append>
                    <b-button variant="warning">{{$t('list.search')}}</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col cols="12" sm="6" md="6" class="pr-0">
                <b-dropdown id="selectedRows" right variant="white" :text="$t('list.selectedRows')" class="asc__listPage-Header-SelectRows float-right">
                  <b-dropdown-item v-for="(row,i) in tableRows" :key="i" :active="row.visible" @click="hideRow(i, row.visible == true ? false : true)">
                    <i :class="row.visible == true ? 'far fa-check-square' : 'far fa-square'" />
                    {{$t('index.'+row.field)}}
                  </b-dropdown-item>
                </b-dropdown>
                <b-dropdown variant="white" :text="$t('list.allRecords')" class="asc__listPage-Header-Dropdown float-right">
                  <b-dropdown-item v-for="(fil,i) in tableFilters" :key="i" @click="showOrders(fil.value)">{{fil.title}}</b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item>{{$t('list.allFilters')}}</b-dropdown-item>
                </b-dropdown>
                <b-dropdown right variant="white" class="asc__listPage-Header-Download float-right d-none">
                  <template v-slot:button-content>
                    <i class="fas fa-download" />
                  </template>
                  <b-dropdown-item><i class="fas fa-file-pdf"></i> {{$t('list.downloadPdf')}}</b-dropdown-item>
                  <b-dropdown-item><i class="fas fa-file-excel"></i> {{$t('list.downloadExcel')}}</b-dropdown-item>
                  <b-dropdown-item><i class="fas fa-file-code"></i> {{$t('list.downloadXml')}}</b-dropdown-item>
                </b-dropdown>

                <b-dropdown id="dropdown-1" v-if="thisRout == 'SearchFilter'" :text="$t('list.create')" variant="info" size="sm" class="float-right text-white asc__listPage-Header-Create">
                  <b-dropdown-item v-for="(item, i) in favouriteKitTypes" :key="i" :to="{name: item.ProvisionClass ? 'WorkOrderProvisionInsert' : 'WorkOrderInsert', params: {type: item.EncryptedKey}}">
                    <i class="fas fa-plus-square"/> {{ item.Code }}
                  </b-dropdown-item>
                </b-dropdown>

                <router-link v-else class="btn btn-sm btn-info float-right text-white asc__listPage-Header-Create" :to="{name: createLink}">
                  <i class="far fa-plus-square" /> {{$t('list.create')}}
                </router-link>
              </b-col>
            </b-row>
            <b-overlay :show="bigLoading" rounded="sm">
              <router-view />
              <div class="clearfix" />
            </b-overlay>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import trMessages from 'devextreme/localization/messages/tr.json'
import { locale, loadMessages } from 'devextreme/localization'
export default {
  data () {
    return {
      thisRout: this.$route.name,
      pageTitle: this.$route.meta.title,
      createLink: this.$route.meta.createLink
    }
  },
  created () {
    loadMessages(trMessages)
    locale(navigator.language)
  },
  mounted () {
    // if (this.$route.fullPath === '/') {
    //   this.$router.push({name: 'Dashboard'})
    // }
  },
  computed: {
    ...mapState(['style', 'bigLoading', 'tableRows', 'tableFilters', 'favouriteKitTypes'])
  },
  watch: {
    $route (to, from) {
      this.thisRout = to.name
      this.pageTitle = to.meta.title
      this.createLink = to.meta.createLink
    }
  },
  methods: {
    ...mapMutations(['hideTableRow']),
    showOrders (e) {
      this.$router.push({name: 'eTicketFilter', params: {day: e}})
    },
    hideRow (e, v) {
      let hr = {
        row: e,
        visible: v
      }
      this.hideTableRow(hr)
    }
  }
}
</script>
<style lang="sass">
  .asc__listPage
    .card-body
      padding-top: 0px
    .asc__listPage-Header
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
    .asc__listPage-Header-Dropdown
      float: left
      margin: 0 10px 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        width: 300px
        color: #333 !important
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-Search
      width: 200px
      margin: 0
      float: left
      & button
        font-size: 12px
        padding: 2px 5px
      & input
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-SelectRows
      width: 140px
      margin: 0 0px 0 0
      float: left
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      & input
        font-size: 12px
        padding: 5px 10px
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
        .active
          background-color: transparent
          & i
            padding: 2px
            background: #ffa300
            color: #fff
    .asc__listPage-Header-Create
      font-size: 12px
      line-height: 22px
      margin-top: 0px
      margin-right: 10px
      .dropdown-menu
        font-size: 12px
        .dropdown-item
          padding: 0.25rem 0.50rem
    .asc__listPage-Header-Download
      float: left
      margin: 0 0 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        color: #333 !important
        font-size: 12px
        padding: 5px 10px
      .list-group-item
        border: none !important
        padding: 5px 0 !important
        &:hover
          background: #f2f2f2
          transition: .3s
      .card-title
        font-size: 1rem
        letter-spacing: -0.7px
        font-weight: bold
</style>
<style scope>
  .asc__general-btn-inTable {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 10px;
  }
  .asc__listPage-dataGrid {
    height: calc(100vh - 160px);
    transition-timing-function: ease;
  }
  .dx-widget {
    font-size: 11px !important
  }
  .dx-datagrid .dx-row > td {
    padding: 2px 4px !important;
    vertical-align: middle !important;
  }
  .dx-dropdownbutton-action.dx-button .dx-button-content {
    padding: 2px !important
  }
  .dx-button-content .dx-icon-spindown {
    display: none !important
  }
  .dx-button-mode-outlined {
    border: none !important
  }
  .dx-filter-menu.dx-menu .dx-menu-item .dx-menu-item-content {
    padding: 0px 0px 0px 0px !important
  }
  .dx-datagrid-headers .dx-texteditor-input,
  .dx-datagrid-rowsview .dx-texteditor-input {
    padding: 0px !important;
    min-height: 28px !important;
  }
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-placeholder:before,
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-texteditor-input {
    padding-left: 16px !important;
  }
  .dx-dropdownbutton-popup-wrapper.dx-popup-wrapper .dx-overlay-content {
    width: 200px !important;
  }
  .dx-datagrid-headers {
    font-weight: bold !important;
    color: #000000 !important;
  }
  .dx-datagrid-nowrap, .dx-datagrid-nowrap .dx-header-row>td>.dx-datagrid-text-content {
    white-space: pre-wrap !important;
  }
</style>
<style lang="sass">
  .asc__showPage
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 99
    padding: 100px 40px
    background: rgba(0,0,0,.6)
    @media (max-width: 767px)
      padding: 65px 15px 20px 15px
    .asc__showPage-times
      position: absolute
      display: block
      top: 75px
      right: 23px
      z-index: 9999999999
      font-size: 21px
      background: #fff
      border-radius: 20px
      height: 20px
      width: 20px
      text-align: center
      line-height: 20px
      cursor: pointer
      @media (max-width: 767px)
        top: 45px
        right: 3px
    .asc__showPage-container
      background: #fff
      @media (max-width: 767px)
        height: 80vh
        overflow: auto
      & header
        display: block
        border-bottom: 2px #f6f6f6 solid
        padding: 10px 15px
        & h3
          display: inline-block
          font-size: 14px
          font-weight: bold
          margin: 0 30px 0 0
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
        .tab-pane
          padding: 1rem 15px
          background: #fbfbfb
          min-height: 60vh
      .asc__getPage-detailPart
        position: relative
        border: 2px #eaeaea solid
        border-radius: 3px
        border-bottom: 4px #eaeaea solid
        margin-bottom: 15px
        background: #fff
        & h3
          padding: 10px
          font-weight: bold
          border-bottom: 1px #ddd solid
          font-size: 16px !important
        & ul
          padding: 0px 0px 15px 0px
          list-style: none
          & li
            padding: 4px 10px
            width: 100%
            transition: .1s
            &:hover
              background: #efefef
              transition: .2s
            & span
              width: 60%
              float: right
              font-weight: bold
              @media (max-width: 1440px)
                width: 50%
              @media (max-width: 990px)
                width: 100%
        .far
          line-height: 22px
          color: #f29d2a
          width: 20px
          text-align: center
        .fas
          line-height: 22px
          color: #f29d2a
          width: 20px
          text-align: center
      .list-group-item
        border: none !important
        padding: 5px 0 !important
        &:hover
          background: #f2f2f2
          transition: .3s
      .card-title
        font-size: 1rem
        letter-spacing: -0.7px
        font-weight: bold
</style>
