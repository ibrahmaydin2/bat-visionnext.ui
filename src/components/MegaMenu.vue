<template>
  <b-dropdown class="asc__mega-menu-dropdown" :text="$t('nav.other')" ref="megamenuData">
    <li v-for="(links, i) in data" :key="i">
      <template v-if="links.sub">
        <span class="asc__item-head-title">
          <i :class="links.icon ? 'fas ' + links.icon : 'far fa-circle'" />{{ links.title }}
        </span>
        <ul>
          <li v-for="(subs, x) in links.sub" :key="'sub' + x" class="asc__item-head-title-li">
            <router-link class="asc__item-title" :to="{name: subs.router, params: { url: subs.link }}" @click.native="closeHeader()">
              <i :class="subs.icon ? 'fas ' + subs.icon : 'far fa-circle'" />{{ subs.title }}
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <router-link class="asc__item-head-title" :to="{name: links.router, params: { url: links.link }}" @click.native="closeHeader()">
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
  methods: {
    closeHeader () {
      this.$refs.megamenuData.hide(true)
    }
  }
}
</script>
<style lang="sass">
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
        display: block
        list-style: none
        color: #ffffff
        & ul
          position: fixed
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
            padding: 0px
            display: block
            width: 100%
            margin: 0px
            font-weight: bold
            border-bottom: 1px #ddd solid
            width: calc( 100% / 3 )
            & i
              width: 30px
              color: #e88000
            &:last-child
              border-bottom: none
        & a
          color: #ffffff
          display: block
        &:hover
          background: #fff
          border-radius: 3px 0 0 3px
          color: #000
          & a
            color: #000000
            text-decoration: none
            &:hover
              color: #e88000
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
      cursor: default
      font-size: 12px
      & i
        width: 30px
    .asc__item-head-title-li
      width: 100%
      line-height: 30px
      list-style: circle !important
      margin-left: 0px !important
    .asc__item-title
      color: #6e6e6e
      font-size: 12px
  .ls-none
    list-style: none !important
</style>
