<template>
  <div class="asc__errorpage">
  <h3>{{info}}</h3>
  <img src="../../static/error.png">
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    ...mapState([''])
  },
  methods: {
  },
  watch: {
  }
}

</script>
<style lang="sass">
  .asc__errorpage
    position: relative
    height: 85vh
    margin-top: 55px
    padding: 10vh
    width: 100%
    text-align: center;
    background: #fff
    & img
      width: 300px
      margin: auto
    & h3
      font-weight: bold
      margin: 50px 0
</style>
