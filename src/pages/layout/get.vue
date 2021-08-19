<template>
  <b-container fluid>
    <Navigation/>
    <Header/>
    <CommonInfoModal :modalAction="modalAction" :modalItem="modalItem" />
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
            <b-card class="asc__getPage" no-body>
              <div class="info-div">
                <span class="info-span"><i @click="getInfoModal" class="info-icon fa fa-info-circle"></i></span>
              </div>
              <router-view/>
              <div class="clearfix" />
            </b-card>
          </b-overlay>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
import actionMixin from '../../mixins/action'
export default {
  mixins: [actionMixin],
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
  .asc__getPage
    margin-bottom: 5vh
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important
    .asc__showPage
      .asc__showPage-times
        display: none
      section
        i
          color: #f78b4e !important
        span
          margin-right: 5px
    & header
      display: flex
      justify-content: space-between
      border-bottom: 2px #f6f6f6 solid
      padding: 10px 15px 0 15px !important
      background: #fff
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
    & section
      background: #ffffff
      padding: 10px 15px
    .asc__showPage-card
      border: none
      & h6
        font-weight: bold
        border-bottom: 1px #ddd solid
        margin-bottom: 1rem
      & span
        display: block
        font-weight: bold
        & i
          color: #f78b4e !important

      & p
        font-style: normal
        padding-bottom: 10px
        border-bottom: 1px solid #f79055
        margin-left: 15px
    .tabs
      .nav-tabs
        padding: 0px 15px
        .nav-item
          margin-bottom: -2px
          .active
            background: #f2f2f2
            border: none !important
            font-weight: bold
            font-size: 14px
          .nav-link
            color: #000
      .tab-pane
        background: #f2f2f2
        min-height: 75vh
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
  .info-div
    height: 30px
    background-color: #e4e4e4
  .info-span
    float: right
  .info-icon
    font-size: 26px
    margin-top: 2px
    cursor: pointer
    color: #ff8b4d !important;
    margin-right: 10px
</style>
  <style>
  .nav-tabs .nav-link.disabled {
    color: grey !important
  }
  </style>
