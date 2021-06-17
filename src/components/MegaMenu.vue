<template>
  <b-dropdown class="asc__mega-menu-dropdown" :text="$t('nav.other')" ref="megamenuData">
    <li>
      <span class="asc__item-head-search">
        <i class="fas far fa-search" />
        <b-form-input type="text" v-model="searchText" :placeholder="$t('nav.search')" />
      </span>
        <ul v-if="searchText != ''">
          <li v-for="(subs, x) in filteredList" :key="'sub' + x" :class="subs.sub ? 'asc__item-head-li asc__item-head-li-sub' : 'asc__item-head-li'">
            <router-link class="asc__item-head-title" :to="{name: subs.router, params: { url: subs.link }, query: {page: 1}}" @click.native="closeHeader()">
              <i :class="subs.icon ? 'fas ' + subs.icon : 'far fa-circle'" />{{ subs.title }}
            </router-link>
          </li>
        </ul>
    </li>
    <li v-for="(links, i) in data" :key="i">
      <template v-if="links.sub">
        <span class="asc__item-head-title">
          <i :class="links.icon ? 'fas ' + links.icon : 'far fa-circle'" />{{ links.title }}
        </span>
        <ul>
          <li v-for="(subs, x) in links.sub" :key="'sub' + x" :class="subs.sub ? 'asc__item-head-li asc__item-head-li-sub' : 'asc__item-head-li'">
            <a v-if="subs.sub.length >= 1" class="asc__item-title">
              <i :class="subs.icon ? 'fas ' + subs.icon : 'far fa-circle'" />{{ subs.title }}
            </a>
            <router-link v-if="subs.sub.length === 0" class="asc__item-title" :to="{name: subs.router, params: { url: subs.link }, query: {page: 1}}" @click.native="closeHeader()">
              <i :class="subs.icon ? 'fas ' + subs.icon : 'far fa-circle'" />{{ subs.title }}
            </router-link>
            <i v-if="subs.sub.length >= 1" class="fas fa-angle-double-right isub" />
            <ul v-if="subs.sub.length >= 1">
              <li v-for="(three, y) in subs.sub" :key="'three' + y">
                <router-link class="asc__item-title" :to="{name: three.router, params: { url: three.link }, query: {page: 1}}" @click.native="closeHeader()">
                  <i :class="three.icon ? 'fas ' + three.icon : 'far fa-circle'" />{{ three.title }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </template>
      <template v-else>
        <router-link class="asc__item-head-title" :to="{name: links.router, params: { url: links.link }, query: {page: 1}}" @click.native="closeHeader()">
          <i :class="links.icon ? 'fas ' + links.icon : 'far fa-circle'" />{{ links.title }}
        </router-link>
      </template>
    </li>
  </b-dropdown>
</template>
<script>
export default {
  name: 'MegaMenu',
  props: ['data'],
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    closeHeader () {
      if (this.$refs.megamenuData) {
        this.$refs.megamenuData.hide(true)
      }
    }
  },
  computed: {
    filteredList () {
      const all = this.data
      let link = []
      let firstList = all.filter(a => !a.sub || a.sub.length === 0)
      let secondList = []
      let thirdList = []
      all.map(s => {
        if (s.sub) {
          secondList = secondList.concat(s.sub.filter(a => !a.sub || a.sub.length === 0))
        }
      })
      all.map(s => {
        if (s.sub) {
          s.sub.map(x => {
            if (x.sub) {
              thirdList = thirdList.concat(x.sub.filter(a => !a.sub || a.sub.length === 0))
            }
          })
        }
      })

      link = firstList.concat(secondList).concat(thirdList)
      return link.filter((data) => {
        return data.title.toLowerCase().includes(this.searchText.toLowerCase().trim())
      })
    }
  }
}
</script>
<style lang="sass">
  .asc__item-head-search
    display: block
    line-height: normal
    font-size: 12px
    height: 50px
    padding: 10px 0 0
    & i
      width: 30px
      float: left
      text-align: center
      height: 30px
      line-height: 30px
      color: #ea8b09
    & .form-control
      height: 30px
      float: left
      width: 130px
      background: none
      border-radius: 0
      border: none
      border-bottom: 1px solid #999
  .asc__mega-menu-dropdown
    button
      background: transparent !important
      background-color: transparent !important
      border: none !important
      padding-top: 5px
      font-size: 12px !important
      font-family: 'Open Sans', sans-serif !important
      font-weight: bold
      margin: 0 5px
    & button:hover
      background:none !important
    & button:active
      background-color: transparent !important
    & button:focus
      background-color: transparent !important
      box-shadow: none !important
      border: none !important
    .dropdown-menu
      background: linear-gradient(-195deg, #333, dimgray) !important
      border: none
      border-radius: 0 0 20px 20px
      padding: 20px 20px 40px 20px
      box-shadow: 0 10px 10px #00000060
      & ul
        list-style: none
        padding: 0px
        width: 100%
      & li
        width: 100%
        position: relative
        display: block
        list-style: none
        color: #ffffff
        line-height: 30px
        margin: 0px
        & ul
          position: fixed
          z-index: 3
          visibility: hidden
          left: 230px
          width: calc( 100% - 230px )
          height: 100%
          top: 0
          background: #fff
          padding: .5rem 1rem 2rem .5rem
          overflow-x: auto
          border-radius: 0 0 20px 0
          & li
            width: 300px
            border-bottom: 1px #ddd solid
            & i
              width: 30px
              color: #e88000
            &:last-child
              border-bottom: none
            & ul
              position: fixed
              visibility: hidden
              left: calc(230px + 308px)
              width: 300px
              height: 310px
              top: 8px
              background: #ffffff
              padding: .5rem 1rem 2rem .5rem
              overflow-x: auto
              border-radius: 0 20px 20px 0
              & li
                padding: 0px
                background: #ffffff
                display: block
                width: 300px
                margin: 0px
                border-bottom: 1px #ddd solid
                & i
                  width: 30px
                  color: #e88000 !important
                &:last-child
                  border-bottom: none
                & a
                  color: #000 !important
        & a
          color: #6e6e6e
          font-size: 12px
          display: inline-block
        .isub
          display: inline-block
          float: right
          color: #ddd
          line-height: 33px
          transform: translateX(-10px)
          transition: .3s
        &:hover
          background: #fff
          border-radius: 3px 0 0 3px
          color: #000
          & ul
            visibility: visible
            & li
              &:hover
                border-bottom: 1px #e88000 solid
                .isub
                  transform: translateX(10px)
                  transition: .3s
              & ul
                visibility: hidden
              &:hover
                & ul
                  visibility: visible
    .dropdown-menu.show
      display: flex
      transform: unset !important
      position: fixed !important
      width: 90%
      max-height: calc(90vh - 42px)
      overflow-x: auto
      overflow-y: hidden
      top:42px !important
      flex-wrap: wrap
      left: 5% !important
    .asc__item-head-title
      display: block
      padding: .5rem
      line-height: normal
      font-size: 12px
      & i
        width: 30px
  .asc__item-head-li
    & a
      text-decoration: none
      padding-left: 10px
      color: #e88000
  .asc__item-head-li-sub
    &:hover
      background: #e88000 !important
      color: #fff !important
      & a
        color: #fff !important
        width: 100%
        & i
          color: #fff !important
      & li
        & a
          color: #000
          width: 100%
  .fa-angle-double-right
    position: fixed
    padding-left: 100px
</style>
