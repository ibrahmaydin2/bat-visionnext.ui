<template>
  <div :class="style.viewPush">
    <div class="asc__errorpage">
    <h3>{{info ? info : $t('general.serverError')}}</h3>
    <img src="../../static/error.png">
    <footer>
      <a href="mailto:support@ideateknoloji.com.tr">{{$t('general.supportMail')}}</a> | <router-link :to="{name: 'Dashboard'}">{{$t('general.homepage')}}</router-link>
    </footer>
    </div>
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
    ...mapState(['style'])
  },
  methods: {
  },
  watch: {
  }
}

</script>
<style lang="sass">
  .asc__errorpage
    height: 90vh
    width: 100%
    text-align: center;
    background: #fff
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important
    position: relative
    display: flex
    flex-direction: column
    min-width: 0
    word-wrap: break-word
    background-color: #fff
    background-clip: border-box
    border: 1px solid rgba(0, 0, 0, 0.125)
    border-radius: 0.25rem
    & img
      width: 50%
      max-width: 500px
      margin: auto
    & h3
      font-weight: bold
      margin: 5vh 0 0 0
    & footer
      font-size: 14px
      font-weight: bold
      padding: 0 0 3vh 0
      & a
        color: #000
</style>
