<template>
  <b-container fluid class="asc__auth" :style="`background-image: url(/static/${bgFile})`">
    <b-row>
      <b-col cols="12" sm="2" md="4" lg="6" xl="8">
      </b-col>
      <b-col cols="12" sm="10" md="8" lg="6" xl="4" class="asc__auth-right">
        <b-col cols="12">
          <figure class="figure">
            <img :src="logo.login" width="200" class="figure-img img-fluid" :alt="title.siteName" />
          </figure>
        </b-col>
        <b-row>
          <b-col cols="9" class="m-auto">
            <b-row>
              <b-col cols="12" class="asc__auth-form">
                <router-view/>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" class="asc__auth-idea">
            <figure class="figure">
              <img :src="logo.idea" class="figure-img img-fluid ideaLogo" :alt="title.selfService" />
            </figure>
            <p class="asc__auth-idea-verno"><span>V</span> {{system.version}}</p>
            <p class="asc__auth-idea-copyright">{{system.copyright}}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      bgFile: ''
    }
  },
  computed: mapState(['logo', 'title', 'system']),
  mounted () {
    this.bgFile = !process.env.VUE_APP_BG_FILE ? 'loginbg.jpg' : process.env.VUE_APP_BG_FILE
  }
}
</script>
<style lang="sass">
  .asc__auth
    background-size: cover
    background-position: center center
    background-color: #000000
    height: 100vh
    position: relative
    .asc__auth-right
      position: absolute
      right: 0
      top: 0
      background: #fff
      padding: 0 30px
      height: 100vh
      overflow-x: hidden
      overflow-y: auto
      box-shadow: 0 0 20px #565656
      & a
        color: #000
      .figure
        width: 100%
        margin: 0px auto 50px auto
        padding-top: 50px
        padding-bottom: 50px
        text-align: center
        border-bottom: 1px #efefef solid
        & img
          width: 200px
      .form-control
        background: #f4f6f7
        border: 1px #f4f6f7 solid
      & a
        width: 100%
        line-height: 40px
        color: #fe3d3e
        font-size: 14px
        text-decoration: underline
      & input
        height: 48px
      & legend
        color: #7f838a
        font-weight: bold
        font-size: 14px
        font-weight: bold
      & button
        background: linear-gradient(45deg, #fcbb45, #fe3d3e)
        border: none
        color: #fff
        font-weight: bold
        width: 100%
        line-height: 40px
    .asc__auth-form
      font-size: 12px
      & a
        margin: 10px 0
      & p
        padding: 10px 20px
        font-size: 10px
    .asc__auth-idea
      position: relative
      margin: 100px auto 50px auto
      left: 0
      right: 0
      .figure
        width: 100%
        margin: auto
        padding-top: 50px
        padding-bottom: 0px
        text-align: center
        border-top: 1px #efefef solid
        border-bottom: none
        .productLogo
          height: 30px
          width: initial
          margin: 5px 5px 10px 5px
        .ideaLogo
          height: 50px
          width: initial
          margin: 5px
      .asc__auth-idea-verno
        font-size: 10px
        text-align: center
        margin: 10px 0 0 0
        padding: 0px
        & span
          font-weight: 700
          color: #ffa300
      .asc__auth-idea-copyright
        font-size: 11px
        padding: 0px
        margin: 0px 0 0 0
        width: 100%
        text-align: center
</style>
