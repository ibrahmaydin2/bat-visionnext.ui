<template>
  <div class="asc__carouselSlider">
    <hooper :settings="hooperSettings">
      <slide v-for="(slider,i) in item" :key="'slider'+i" :index="'slider'+i" class="slide selfservice__slider" :style="{ backgroundImage: 'url(' + slider.photo + ')' }">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="selfservice__sliderhome__text" v-html="slider.code"></div>
            </div>
          </div>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
      <hooper-progress slot="hooper-addons"></hooper-progress>
    </hooper>
  </div>
</template>

<script>
// import axios from 'axios'
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper'
import 'hooper/dist/hooper.css'
export default {
  data () {
    return {
      hooperSettings: {
        wheelControl: false,
        itemsToShow: 1,
        centerMode: true,
        autoPlay: true,
        playSpeed: 4000,
        transition: 750
      }
    }
  },
  props: ['item'],
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope lang="sass">
  .hooper
    height: 270px !important
    .hooper-list
      height: 270px !important
    @media (min-width: 1441px)
      height: 350px
      .hooper-list
        height: 350px !important
  .asc__carouselSlider
    width: 100%
    height: 270px
    display: block
    @media (min-width: 1441px)
      height: 350px
    .selfservice__slider
      padding: 50px
      height: 270px
      background-size: cover
      background-position: center right
      display: block
      position: relative
      @media (min-width: 1441px)
        height: 350px
      .selfservice__sliderhome__text
        display: block
        position: absolute
        left: 0
        right: 0
        top: 50px
        margin: auto
        width: 100%
        z-index: 2
        @media (min-width: 1441px)
          top: 150px
        & h1
          color: #000000
          font-weight: bold
          text-shadow: 0 0 35px #949494
          font-size: 40px
          letter-spacing: -0.1px
          background: #ffffff60
          width: fit-content
          padding: 5px 20px
        & p
          color: #000
          background: #ffffff60
          text-shadow: 0 0 15px #949494
          width: fit-content
          font-weight: bold
          padding: 5px 20px
        @media (max-width: 680px)
          top: 0px
          text-align: center
          & h1
            text-align: center
            font-size: 20px
            width: 100%
          & p
            text-align: center
            width: 100%
            font-size: 14px
</style>
