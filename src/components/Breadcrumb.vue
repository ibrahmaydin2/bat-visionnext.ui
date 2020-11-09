<template>
  <b-breadcrumb>
    <b-breadcrumb-item :to="{name: 'Dashboard'}">
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
    </b-breadcrumb-item>
    <!--<b-breadcrumb-item v-for="(it, i) in breadcrumbList" :key="'brc' + i">
      {{ it.title }}
    </b-breadcrumb-item>-->
    <b-breadcrumb-item :to="{name: baseName}">
      {{ $t('router.'+baseName) }}
    </b-breadcrumb-item>
    <b-breadcrumb-item active>
      {{ $t('router.'+routeName) }}
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseName: this.$route.meta.baseLink,
      routeName: this.$route.name
    }
  },
  mounted () {
    this.baseName = this.$route.meta.baseLink
    this.routeName = this.$route.name
  },
  computed: {
    ...mapState(['breadcrumbList'])
  }
}
</script>

<style>
  .breadcrumb {
    background-color: transparent;
    padding: 0px 0px;
    margin-bottom: 15px;
  }
  .breadcrumb-item.active {
    color: #fff !important;
    background: #ff8b4d !important;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 0px 0px 0px 20px;
  }
  .breadcrumb-item.active::before {
    display: none !important;
  }
  .breadcrumb-item.active::before {
    content: "";
    display: table;
    clear: both;
  }
  .breadcrumb-item {
    position: relative;
    line-height: 30px;
    padding: 0px 20px 0px 1.5rem;
    background: #efefef;
  }
  .breadcrumb-item a {
    color: #000;
    padding-left: 15px;
  }
  .breadcrumb-item:first-child a {
    padding-left: 0px;
  }
  .breadcrumb-item::before {
    content: "" !important;
    position: absolute;
    top: -3px;
    left: 100%;
    height: 0;
    width: 0;
    border: 18px solid transparent;
    border-right-width: 0px;
    border-left-width: 14px;
    z-index: 1;
    border-left-color: #ffffff;
    margin: 0;
    display: inline-block;
    content: '';
  }
  .breadcrumb-item::after {
    content: "" !important;
    position: absolute;
    top: 0;
    left: 100%;
    height: 0;
    width: 0;
    border: 15px solid transparent;
    border-right-width: 0;
    border-left-width: 12px;
    z-index: 1;
    border-left-color: #efefef;
    margin: 0;
    display: inline-block;
    content: '';
    color: #959fa5;
  }
  .breadcrumb-item:last-child::before {
    display: none;
  }
  .breadcrumb-item:last-child::after {
    display: none;
  }
</style>
