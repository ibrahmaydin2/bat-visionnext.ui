<template>
  <ul class="asc__navigation-list">
    <li v-for="(item,i) in data" :key="'i'+i">
      <template v-if="!item.sub.length >= 1">
        <router-link active-class="asc__navigation-active" exact :to="{name: item.router}" @click.native="collapseNav()"><i :class="item.icon ? item.icon : defaultIcon"></i> {{item.title}}</router-link>
      </template>
      <template v-else>
        <span v-b-toggle="'collapse-'+item.router"><i :class="item.icon ? item.icon : defaultIcon"></i> {{item.title}}</span>
        <b-collapse :id="'collapse-'+item.router">
          <ul>
            <li>
              <router-link active-class="asc__navigation-active" exact :to="{name: item.router}" @click.native="collapseNav()"><i :class="item.icon ? item.icon : defaultIcon"></i> {{item.title}}</router-link>
            </li>
            <li v-for="(sub,x) in item.sub" :key="'x'+x">
              <router-link active-class="asc__navigation-active" exact :to="{name: sub.router}" @click.native="collapseNav()"><i :class="sub.icon ? sub.icon : defaultIcon"></i> {{sub.title}}</router-link>
            </li>
          </ul>
        </b-collapse>
      </template>
    </li>
    <li class="d-block d-md-none">
      <b-button><i class="fas fa-sign-out-alt"></i> {{$t('nav.logout')}}</b-button>
    </li>
  </ul>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      defaultIcon: 'far fa-circle'
    }
  },
  props: ['data'],
  mounted () {
    this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.$route.name)
  },
  methods: {
    ...mapMutations(['hamburger']),
    collapseNav () {
      this.hamburger('open')
    }
  }
}
</script>
<style scoped lang="sass">
  .asc__navigation-list
    color: #5f5f5f
    list-style: none
    padding: 10px 10px 0px 0px
    font-size: 12px
    height: calc(100vh - 160px)
    overflow-x: hidden
    overflow-y: auto
    & i
      width: 20px
      margin-left: 10px
    & li
      line-height: 30px
      font-weight: lighter
      border-left: 5px #ddd solid
      border-bottom: 1px #ddd solid
      transition: .3s
      cursor: pointer
      & a
        color: #5f5f5f
        &:hover
          color: #000
          text-decoration: none
      & ul
        list-style: none
        padding: 0px 0px 10px 0px
        & li
          border-bottom: none
          font-weight: lighter
          border-left: 5px #ddd solid
          line-height: 24px
  .asc__navigation-active
    color: #df9004 !important
    font-weight: 700
    &:hover
      color: #e88000 !important
</style>
