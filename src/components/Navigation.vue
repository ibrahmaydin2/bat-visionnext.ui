<template>
  <div :class="style.navigation">
    <div class="asc__nav">
      <div class="asc__nav-list" v-for="(links, i) in navigation" :key="i">
        <b-button
          v-b-toggle="'mobileNavLink' + i"
          variant="default"
          class="asc__nav-list-btn"
        >
          {{ links.title }}
          <!-- <router-link class="asc__nav-title" :to="{name: links.router, params: { url: links.link }}">
            {{ links.title }}
          </router-link> -->
        </b-button>
        <b-collapse v-if="links.sub" :id="'mobileNavLink' + i">
          <ul>
            <li v-for="(subs, x) in links.sub" :key="'sub' + x" class="asc__nav-title-li" @click="collapseNav()">
              <router-link class="asc__nav-title" :to="{name: subs.router, params: { url: subs.link }}">
                {{ subs.title }}
              </router-link>
            </li>
          </ul>
        </b-collapse>
      </div>
    </div>
    <figure class="asc__system-navLogo">
      <img :src="logo.idea">
    </figure>
    <div class="asc__system-verno">
      <span>V</span> {{system.version}}
    </div>
    <!-- <div class="asc__nav-bg" @click="collapseNav()" /> -->
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
    ...mapState(['system', 'style', 'logo', 'navigation'])
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
      height: 80vh
      margin-bottom: 5vh
      padding: 1.5rem
      overflow-x: auto
      .asc__nav-list
        position: relative;
        .asc__nav-title-li
          list-style: none
          line-height: 60px
          font-size: 14px
          font-weight: bold
          & a
            color: #000
        .asc__nav-list-btn
          background: linear-gradient(45deg, #e88000, #ffa300) !important
          color: #fff
          font-size: 16px
          font-weight: bold
          width: 100%
          margin-bottom: .5rem
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
