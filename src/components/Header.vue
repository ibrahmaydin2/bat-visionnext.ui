<template>
  <div class="asc__header">
    <b-row>
      <b-col>
        <div class="asc__header-otherApps">
          <img id="otherAppsImg" v-b-toggle.sidebar-1 src="../../static/otherApps.svg">
        </div>
        <router-link class="asc__header-logo" :to="{name: 'Dashboard'}"><img :src="logo.header"></router-link>
        <Shortcuts class="d-none d-lg-inline-block" />
        <b-button class="d-inline-block d-lg-none float-right" @click="collapseNav()">
          <i class="fas fa-bars" />
        </b-button>
        <!-- <div @click="collapseNav()" :class="style.icon">
          <i class="fas fa-bars"></i>
        </div> -->
      </b-col>
      <b-col lg="2" class="asc__header-userBox d-flex align-items-center justify-content-end">
        <b-dropdown right id="asc__header-userBox" variant="white" class="d-none d-lg-inline-block">
          <template v-slot:button-content>
            <i class="fas fa-network-wired" /> {{loginUser.company}}
          </template>
          <b-dropdown-header id="dropdown-header-label">
            {{$t('general.branches')}}
          </b-dropdown-header>
          <b-dropdown-item v-for="(branch, i) in UserBranches" :key="'branch' + i">
            {{branch.Desciption}}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown right id="asc__header-userBox" variant="white" class="d-none d-lg-inline-block">
          <template v-slot:button-content>
            <i class="far fa-user" /> {{loginUser.name}}
          </template>
          <b-dropdown-item><i class="fa fa-key"></i> {{$t('nav.changePassword')}}</b-dropdown-item>
          <b-dropdown-item @click="changeLang()"><i class="fa fa-language"></i> {{toggleLang}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logoutHeader()"><i class="fa fa-sign-out-alt"></i> {{$t('nav.logout')}}</b-dropdown-item>
        </b-dropdown>
        <!-- <div class="position-relative">
          <span class="asc__count">13</span> -->
          <!-- <b-dropdown class="asc__notification" size="lg" no-caret > -->
            <!-- <template v-slot:button-content>
              <i class="fa fa-bell"></i>
            </template> -->
            <!-- <b-dropdown-header id="dropdown-header-label">
              <div class="d-flex justify-content-between">
                <span><b>Notifications</b></span>
                <span><b>135 Items</b></span>
              </div>
            </b-dropdown-header> -->
            <!-- <b-dropdown-item
              v-for="(row,i) in notify"
              :key="i"
              class="asc__dropdown-item">
                <b-button v-b-modal.notificationModal @click="openModal(row.title, row.content)">{{row.title}}</b-button>
            </b-dropdown-item> -->
          <!-- </b-dropdown>
        </div> -->
        <!-- <i id="shortcutsIcon" class="fa fa-star" v-b-toggle.sidebar-right></i> -->
      </b-col>
      <b-modal id="notificationModal" :title="modalHeader">
        <p class="my-4">{{modalContent}}</p>
      </b-modal>
      <Sidebar />
      <sidebar-right />
    </b-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Search from './Search'
import Sidebar from './Sidebar'
import SidebarRight from './SidebarRight'
export default {
  components: {
    Sidebar,
    Search,
    SidebarRight
  },
  data () {
    return {
      UserBranches: [],
      headerLinks: [],
      windowWidth: 0,
      windowHeight: 0,
      toggleLang: 'English',
      modalHeader: '',
      modalContent: ''
    }
  },
  created () {
    const selectedLang = localStorage.getItem('selectedLang')
    selectedLang === 'tr' ? this.setLang('tr', 'English') : this.setLang('en', 'Türkçe')
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.UserBranches = JSON.parse(localStorage.getItem('UserModel')).AuthorizedBranches
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState(['logo', 'loginUser', 'style', 'notify'])
  },
  methods: {
    ...mapMutations(['hamburger', 'logout']),
    logoutHeader () {
      this.logout()
    },
    collapseNav () {
      this.hamburger(this.style.icon === 'asc__header-hamburger d-inline-block' ? 'open' : 'close')
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    changeLang () {
      switch (this.$i18n.locale) {
        case 'en':
          // this.$i18n.locale = 'tr'
          // this.toggleLang = 'English'
          this.setLang('tr', 'English')
          break
        case 'tr':
          // this.$i18n.locale = 'en'
          // this.toggleLang = 'Türkçe'
          this.setLang('en', 'Türkçe')
          break
      }
    },
    openModal (title, content) {
      this.modalContent = null
      this.modalHeader = null
      this.modalHeader = title
      this.modalContent = content
    },
    setLang (lang, toggleLang) {
      this.$i18n.locale = lang
      this.toggleLang = toggleLang
      localStorage.setItem('selectedLang', lang)
    }
  },
  watch: {
    windowWidth: function (e) {
      if (this.style.icon === 'asc__header-hamburger asc__header-hamburger-active d-inline-block') {
        this.hamburger('open')
      } else {
        if ((e <= 992) && (this.style.navigation === 'asc__navigation asc__transition-left')) {
          this.hamburger('close')
        } else if ((e >= 993) && (this.style.navigation === 'asc__navigation asc__navigation-none asc__transition-right')) {
          this.hamburger('open')
        }
      }
    }
  }
}
</script>

<style lang="sass">
  .asc__header
    color: #ffffff
    width: 100%
    position: fixed
    top: 0px
    left: 0px
    height: 45px
    padding: 5px 15px
    background: linear-gradient(45deg, #333333, #696969)
    box-shadow: 0 0 10px #313131
    z-index: 992
    .asc__header-otherApps
      display: inline-block
      cursor: pointer
      & img
        width: 30px
    .asc__header-otherApps img:focus
      outline: none !important
    .asc__sidebar-header img:focus
      outline: none !important
    .asc__header-logo
      display: inline-block
      & img
        height: 35px
    .asc__header-hamburger
      line-height: 25px
      cursor: pointer
      color: #fff
      border: 1px transparent solid
      border-radius: 2px
      width: 25px
      text-align: center
      margin-top: 5px
      background: #ffa300
    .asc__header-hamburger-active
      background: #000
      color: #fff
    .asc__header-userBox
      color: #fff
      text-align: right
      & button
        font-size: 12px !important
        background: none
        color: #fff
      .dropdown-menu
        width: 200px
        .dropdown-item
          font-size: 12px
  .dropdown.asc__notification
    button
      border: none
      background-color: transparent !important
      padding-left: 0
    .dropdown-menu
      width: 275px
      -webkit-transform: translate3d(-225px, 36px, 0px)
      transform: translate3d(-225px, 36px, 0px) !important
      padding-top: 0
      top: 8px !important
    .dropdown-menu::before
      content: ""
      position: absolute
      width: 0
      height: 0
      border: 10px solid transparent
      border-bottom-color: white
      right: 24px
      top: -20px
      -webkit-transform: translate(-50%)
      transform: translate(-50%)
    .dropdown-header
      background: #f89a02
      color: white
      padding: 1rem
    .asc__dropdown-item
      a
        padding: 0.25rem 1rem !important
      a::hover
        color: unset
        background-color: unset
      a:active, button:active
        color: unset
        background-color: unset
      button
        width: 100%
        color: black
        text-align: left
        border: none
        padding-left: 0
      button:active
        color: unset
        background-color: unset !important
      button:focus
        box-shadow: none !important
        outline: none !important
  .asc__count
    position: absolute
    top: 2px
    right: 5px
    height: 15px
    width: 15px
    overflow: hidden
    background: #f89a02
    text-align: center
    border-radius: 100%
    font-size: 9px
    font-weight: bold
    line-height: 15px
    z-index: 9
  i:focus
    outline: none !important
</style>
