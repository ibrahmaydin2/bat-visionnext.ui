<template>
  <b-container fluid>
    <Navigation/>
    <Header/>
    <b-row class="mb-3">
      <b-col cols="12">
        <div :class="style.viewPush">
          <b-card class="asc__listPage shadow">
            <b-row class="asc__listPage-Header">
              <b-col cols="12" sm="12" md="3" class="pl-0">
                <h3>{{tableOperations.Name}}</h3>
              </b-col>
              <b-col cols="12" sm="12" md="9" class="pr-0 text-right">
                <b-button v-if="tableOperations.Actions && tableOperations.Actions.length === 1" variant="success" size="sm" :to="{name: createLink}">
                  <i class="fas fa-plus-square" /> {{$t('list.create')}}
                </b-button>
                <b-dropdown v-else split :split-to="{name: createLink}" variant="success" right size="sm">
                  <template v-slot:button-content>
                    <i class="fas fa-plus-square" /> {{$t('list.create')}}
                  </template>
                  <b-dropdown-item v-for="(act, i) in tableOperations.Actions" :key="'act' + i">
                    <i class="fas fa-file-code"></i> {{act.Title}}
                  </b-dropdown-item>
                </b-dropdown>
                <b-dropdown
                  variant="white"
                  :text="$t('list.allRecords')"
                  class="asc__listPage-Header-Dropdown"
                >
                  <b-dropdown-header id="dropdown-header-label">
                    {{$t('list.allRecords')}}
                  </b-dropdown-header>
                  <b-dropdown-item
                    v-for="(flt, i) in tableOperations.Filters"
                    :key="'filter' + i"
                  >
                    <i class="fas fa-file-pdf" /> {{dwn.Title}}
                  </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item>{{$t('list.allFilters')}}</b-dropdown-item>
                </b-dropdown>
                <b-dropdown
                  right
                  variant="white"
                  :text="$t('list.selectedRows')"
                  class="asc__listPage-Header-SelectRows"
                >
                  <b-dropdown-header id="dropdown-header-label">
                    {{$t('list.selectedRows')}}
                  </b-dropdown-header>
                  <b-dropdown-item
                    v-for="(row,i) in tableRows"
                    :key="'selectedRow' + i"
                    :active="row.visible"
                    @click="hideRow(i, row.visible == true ? false : true)"
                  >
                    <i :class="row.visible == true ? 'far fa-check-square' : 'far fa-square'" /> {{ row.label }}
                  </b-dropdown-item>
                  <!-- <b-dropdown-item
                    v-for="(row,i) in tableOperations.RowColumns"
                    :key="'selectedRow' + i"
                    :active="row.visible"
                    @click="hideRow(i, row.visible == true ? false : true)"
                  >
                    <i :class="row.visible == true ? 'far fa-check-square' : 'far fa-square'" /> {{ row.label }}
                  </b-dropdown-item> -->
                </b-dropdown>
                <b-dropdown right variant="white" class="asc__listPage-Header-Download">
                  <template v-slot:button-content>
                    <i class="fas fa-download" />
                  </template>
                  <b-dropdown-header id="dropdown-header-label">
                    {{ $t('list.downloads') }}
                  </b-dropdown-header>
                  <b-dropdown-item
                    v-for="(dwn, i) in tableOperations.Downloads"
                    :key="'download' + i"
                    @click="downloadBtn(thisRout,dwn.Action,dwn.Action)"
                  >
                    <i class="fas fa-file-pdf" /> {{dwn.Title}}
                  </b-dropdown-item>
                </b-dropdown>
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
export default {
  data () {
    return {
      thisRout: this.$route.name,
      pageTitle: this.$route.meta.title,
      createLink: this.$route.meta.createLink
    }
  },
  computed: {
    ...mapState(['style', 'bigLoading', 'tableRows', 'tableFilters', 'tableOperations'])
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
    hideRow (e, v) {
      let hr = {
        row: e,
        visible: v
      }
      this.hideTableRow(hr)
    },
    downloadBtn (r, f, e) {
      let apil = 'OrderLink'
      let data
      data = {
        'infoType': '1',
        'sapUserCode': '11081',
        'operationType': e,
        'visibleColumnList': [
          'ConfirmationCodeDescription',
          'SapCustomerCode',
          'SapOrderNumber',
          'SasNumber',
          'OrderLineNumber',
          'ProductType',
          'ProductWeight',
          'ProductWidthFormatted',
          'ProductLengthFormatted',
          'PackingTypeName',
          'OrderQuantity',
          'ShipmentQuantity',
          'BalanceShipmentAmount',
          'StockQuantity',
          'UnitPrice',
          'Currency',
          'OrderAmountFormatted',
          'DeliveryDate'
        ],
        'userPortalId': 'K11081'
      }
      this.$store.dispatch('getDownloadLink', {...this.bom, api: apil, list: data, format: f})
    }
  }
}
</script>
<style lang="sass">
  .asc__listPage
    .card-body
      padding-top: 0px
    .asc__listPage-Header
      margin: 5px 0
      font-size: 12px
      & h3
        font-size: 16px
        font-weight: 700
        background: #fff
        margin: 0px
        padding: 0px
        line-height: 36px
    .asc__listPage-Header-Dropdown
      margin: 0 0 0
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
    .asc__listPage-Header-Download
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
        padding: 0.25rem 0.50rem
        // padding: 5px 10px
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
