<template>
  <b-dropdown class="asc__mega-menu-dropdown" :text="$t('nav.other')">
    <ul>
      <li v-for="(links, i) in data" :key="i">
        <router-link class="asc__item-head-title" :to="{name: links.router, params: { url: links.link }}">
          {{ links.title }}
        </router-link>
        <ul v-if="links.sub">
          <li v-for="(subs, x) in links.sub" :key="'sub' + x" class="asc__item-head-title-li">
            <router-link class="asc__item-title" :to="{name: subs.router, params: { url: subs.link }}">
              {{ subs.title }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </b-dropdown>
</template>
<script>
export default {
  name: 'MegaMenu',
  props: ['data']
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
      background: linear-gradient(45deg, #e88000, #ffa300) !important
      border: none
      border-radius: 0 0 20px 20px
      padding: 20px 20px 40px 20px
      box-shadow: 0 10px 10px #00000060
      & ul
        list-style: none
        padding: 0px
        width: 100%
      & li
        width: 25%
        display: inline-block
        list-style: none
        color: #ffffff
        & ul
          & li
            display: block
            width: 100%
        & a
          color: #ffffff
    .dropdown-menu.show
      display: flex
      transform: unset !important
      position: fixed !important
      width: 90%
      top:42px !important
      flex-wrap: wrap
      left: 5% !important
    .asc__item-head-title
      display: block
      padding: 0px 0px 6px 0px
      font-size: 16px
      font-weight: bold
      color: #333333
      margin-bottom: 6px
      line-height: normal
    .asc__item-head-title-li
      width: 100%
      line-height: 30px
      list-style: circle !important
      margin-left: 20px !important
    .asc__item-title
      color: #6e6e6e
      font-size: 12px
  .ls-none
    list-style: none !important
</style>
