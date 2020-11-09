<template>
  <div :class="style.navigation">
    <div class="asc__nav">
      <ul v-for="(nav, s) in items" :key="'nav' + s" class="asc__nav-ul-main">
        <li v-for="(a, i) in nav.navs" :key="'main' + i">
          {{ a.title }}
          <ul v-if="a.sub" class="asc__nav-ul-main-sub">
            <li v-for="(b, x) in a.sub" :key="'sub' + x">
              <i class="far fa-circle" /> {{ b.title }}
              <ul v-if="b.sub" class="asc__nav-ul-main-sub-sub">
                <li v-for="(c, y) in b.sub" :key="'subsub' + y">
                  {{ c.title }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
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
import { items } from './nav.js'
export default {
  data () {
    return {
      items: items
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
    transform: translateY(0vh)
    width: 100vw
    height: 100vh
    padding-top: 45px
    font-size: 12px
    z-index: 991
    background: #fff
    overflow: auto
    .asc__nav
      width: 100%
      height: 100%
      position: absolute
      z-index: 3
      .asc__nav-ul-main
        list-style: none
        padding: 0 50px
        & li
          display: block
          font-weight: bold
          font-size: 14px
          border-bottom: 1px #ddd solid
          &:last-child
            border-bottom: none
        .asc__nav-ul-main-sub
          & li
            line-height: 40px
            font-weight: 400
            & i
              font-size: 12px
              color: #ffa300
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
    transform: translateY(-200vh)
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
