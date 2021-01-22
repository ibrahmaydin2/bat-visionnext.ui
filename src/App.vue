<template>
  <div id="app">
    <router-view></router-view>
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
    ...mapState(['modalLoad'])
  }
}
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700;1,800&display=swap')
  @import "@fortawesome/fontawesome-free/css/all.css"
  #app
    font-family: 'Open Sans', sans-serif !important
  *
    outline: none !important
  body
    background: linear-gradient(45deg, #e88000, #ffa300) !important
    background-attachment: fixed !important
    font-size: 12px !important
    min-height: 100vh !important
  .asc__transition-left
    transition-duration: 0.3s, 0.3s
    transition-timing-function: ease-in-out, ease-in-out
    transition-delay: 0s, 0s
  .asc__transition-right
    transition-duration: 0.4s, 0.4s
    transition-timing-function: ease-in-out, ease-in-out
    transition-delay: 0s, 0s
  .asc__viewPush
    padding: 55px 0px 0px 0px
    // padding: 55px 0px 0px 220px
    @media (max-width: 767px)
      padding: 55px 0px 0px 0px
  .asc__viewPush-none
    padding: 55px 0px 0px 0px !important
  .form-group--error
    color: #ff0000 !important
    & legend
      color: #ff0000 !important
    .form-control,
    .vs__dropdown-toggle
      border: 1px #ff0000 solid !important
      background: #ff000005 !important
  .vs__dropdown-toggle
    background: #ffffff !important
  .form-control
    height: 28px
    font-size: 12px !important
  .vs__selected-options
    height: 24px !important
    overflow: hidden
  .vs--disabled .vs__clear,
  .vs--disabled .vs__dropdown-toggle,
  .vs--disabled .vs__open-indicator,
  .vs--disabled .vs__search,
  .vs--disabled .vs__selected
    background-color: #e9ecef !important
  // .btn-warning
  //   color: white !important
  .btn-warning
    background: linear-gradient(45deg, #e88000, #ffa300) !important
    border-color: #dea559 !important
    color: white !important
    &:focus
      background-color: #153d95 !important
      border-color: #e88000 !important
      box-shadow: 0 0 0 0.2rem #1e9dff20 !important
    &:active
      background-color: #153d95 !important
      border-color: #e88000 !important
    &:hover
      background-color: #153d95 !important
      border-color: #e88000 !important
  // .btn-success
  //   background: linear-gradient(45deg, #e88000, #ffa300) !important
  //   border-color: #dea559 !important
  //   &:focus
  //     background-color: #153d95 !important
  //     border-color: #e88000 !important
  //     box-shadow: 0 0 0 0.2rem #1e9dff20 !important
  //   &:active
  //     background-color: #153d95 !important
  //     border-color: #e88000 !important
  //   &:hover
  //     background-color: #153d95 !important
  //     border-color: #e88000 !important
  .btn-outline-primary
    color: #828282
    border-color: #828282 !important
    &:focus
      border-color: #999 !important
      box-shadow: 0 0 0 0.2rem #1e9dff20 !important
    &:active
      background: none
      color: #333
      border-color: #999 !important
    &:hover
      background: none
      color: #333
      border-color: #999 !important
  .asc__modal
    position: fixed
    top: 0
    left: 0
    z-index: 992
    background: #00000090
    width: 100vw
    height: 100vh
    .container-fluid
      margin-top: 100px
      width: 75vw
      position: relative
      @media (max-width: 767px)
        width: inherit
    .asc__modal-close
      background: #fff
      border-radius: 50%
      width: 26px
      height: 26px
      color: #000
      position: absolute
      right: -10px
      top: -25px
      font-size: 20px
      text-align: center
      line-height: 26px
      cursor: pointer
    .asc__modal--header
      line-height: inherit
      margin: auto
      border-radius: 4px 10px 0 0
      background: linear-gradient(-45deg, #f2712a, #f29d2a) // idea
      color: #fff
      padding-top: 5px
      height: 30px
      & ul
        margin-left: -40px
        list-style: none
        font-weight: 400
        float: left
        & li
          display: inline-block
          margin-right: 10px
    .asc__modal--body
      .asc__modal--body-top
        background: #f5f5f5
        border-bottom: 1px #ddd solid
      .asc__modal--body-inner
        background: #fbfbfb
      .asc__modal--footer
        text-align: right
        padding: 20px 0 0 0
    .asc__modal-inner
      width: 70vw
      margin: auto
      background: #fff
  </style>
