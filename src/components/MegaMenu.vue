<template>
  <b-dropdown class="asc__mega-menu-dropdown" :text="$t('nav.other')">
    <li v-for="(nav, i) in data" :key="i">
      <span class="d-none"><b>{{nav.title}}</b></span>
      <ul class="pl-0 ls-none" v-if="nav.navs">
        <li class="pl-0 ls-none" v-for="(links, i) in nav.navs" :key="i">
          <router-link class="asc__item-head-title" :to="{name: links.router, params: { url: links.link }}">
            {{ links.title }}
          </router-link>
          <ul class="pl-0 ls-none" v-if="links.sub">
            <li class="pl-0 ls-none" v-for="(subs, x) in links.sub" :key="'sub' + x">
              <router-link class="asc__item-title" :to="{name: subs.router, params: { url: subs.link }}">
                {{ subs.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
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
    .dropdown-menu.show
      padding: 20px
      display: flex
      align-items: center
      justify-content: space-evenly
      transform: unset !important
      position: fixed !important
      width: 90%
      border-radius: unset
      top:42px !important
      flex-wrap: wrap
      left: 5% !important
    .asc__item-head-title
      display: block
      padding: 10px 0px 6px 0px
      font-size: 12px
      font-weight: bold
      color: #333333
      border-bottom: solid 1px #d9d9d9
      margin-bottom: 6px
      line-height: normal
    .asc__item-title
      color: #6e6e6e
      font-size: 12px
  .ls-none
    list-style: none !important
</style>
