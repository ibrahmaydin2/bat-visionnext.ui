<template>
  <div>
    <ul class="asc__header-shortcuts">
      <li v-for="(item,i) in shortcut" :key="'i'+i">
        <router-link active-class="asc__navigation-shortcuts-active" exact :to="{name: item.router}">
          <i :class="item.icon ? item.icon : ''"></i>
          {{item.title}}
        </router-link>
      </li>
    </ul>
    <!-- <mega-menu :data="items" /> -->
  </div>
</template>
<script>
import { items, shortcut } from './nav.js'
import MegaMenu from './MegaMenu'
export default {
  components: {
    MegaMenu
  },
  data () {
    return {
      shortcut: shortcut,
      items: items
    }
  }
}
</script>
<style scoped lang="sass">
  .asc__header-shortcuts
    font-weight: bold
    display: inline-block
    margin-left: 30px
    list-style: none
    padding: 0px
    & li
      display: inline-block
      & a
        color: #fff
        margin: 0 5px
  .asc__navigation-shortcuts-active
    color: #f9961c !important
    font-weight: 700
    &:hover
      color: #df9004 !important
</style>
