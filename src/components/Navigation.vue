<template>
  <div :class="style.navigation">
    <div class="asc__nav shadow">
      <figure class="asc__system-navLogo">
        <img :src="logo.idea">
      </figure>
      <div class="asc__system-verno">
        <span>V</span> {{system.version}}
      </div>
    </div>
    <div class="asc__nav-bg" @click="collapseNav()" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['system', 'style', 'logo'])
  },
  methods: {
    ...mapMutations(['hamburger', 'logout']),
    collapseNav () {
      this.hamburger(this.style.icon === 'asc__header-hamburger d-inline-block' ? 'open' : 'close')
    }
  }
}
</script>
<style scoped lang="sass">
  .asc__navigation
    position: fixed
    top: 0px
    left: 0vw
    transform: translateX(0vh)
    width: 100vw
    height: 100vh
    padding-top: 45px
    font-size: 12px
    z-index: 991
    @media (max-width: 767px)
      width: 100vw
    .asc__nav
      background: #fff
      width: 300px
      height: 100%
      position: absolute
      z-index: 3
    .asc__nav-bg
      width: 100%
      height: 100%
      // background: rgba(0,0,0,.6)
      // opacity: 1
      // transition: 0.3s
      position: absolute
      top: 0
      left: 0
      z-index: 2
  .asc__navigation-none
    transform: translateX(-200vh)
    // .asc__nav-bg
    //   opacity: 0
    //   transition: 0.3s
  .asc__system-navLogo
    width: 100%
    text-align: center
    & img
      height: 50px
  .asc__system-verno
    width: 100%
    text-align: center
    & span
      color: #ffa300
      font-weight: bold
</style>
