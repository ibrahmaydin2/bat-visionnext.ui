<template>
  <autocomplete
    :search="search"
    class="autocomplete-search"
    :placeholder="$t('dashboard.search')"
    @submit="handleSubmit()"
    @keypress.enter="handleSubmit()"
  ></autocomplete>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchText: ''
    }
  },
  components: {
    name: 'ReferenceSearch'
  },
  computed: {
    ...mapState([])
  },
  methods: {
    search (input) {
      this.searchText = input
      // if (input.length < 1) { return [] }
      // return this.favouriteKitTypes.filter(genes => {
      //   return genes.Code.toLowerCase()
      //     .startsWith(input.toLowerCase())
      // })
      return input
      // if (input.length < 1) { return [] }

      // let isReferenceNo = /[0-9]/.test(input)
      // if (isReferenceNo) {
      //   this.$store.dispatch('getSponsorTestKitBySerialNumber', {...this.query, param: input})
      // }
    },
    searchUser () {
      // this.$router.push({name: 'SearchFilter', params: {q: this.searchText}})
    },
    handleSubmit (result) {
      console.log(result)
      console.log(this.searchText)

      if (result) {
        console.log(result)
        console.log(this.searchText)
        // this.$router.push({name: 'SearchFilter', params: {q: result.RecordId}})
      }
    }
  }
}
</script>
<style lang="sass">
  .autocomplete-search
    .autocomplete
      text-align: center
    .autocomplete-input
      outline: none
      font-size: 24px
      width: 75%
      border:none !important
      border-bottom: 1px solid #bfbbbb !important
      border-radius: 5px
      padding: 5px
      text-transform: uppercase
      font-weight: 600
      padding-left: 10px
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+)
      background-repeat: no-repeat
      background-position: center right 10px
    input::-webkit-input-placeholder
      color: #656665
      text-transform: initial !important
    .autocomplete-result-list
      line-height: 1.15
      margin: 0
      border: 1px solid rgba(0,0,0,.12)
      padding: 0
      box-sizing: border-box
      max-height: 296px
      overflow-y: auto
      background: #fff
      list-style: none
      box-shadow: 0 2px 2px rgba(0,0,0,.16)
      position: absolute
      z-index: 1
      width: 75% !important
      text-align: center
      visibility: hidden
      pointer-events: none
      color: black
      left: 50%
      transform: translate(-50%)
      box-shadow: 0 0 50px #999
      margin-top: 5px
    .autocomplete-result
      cursor: pointer
      padding: 10px
      text-align: left
      border-bottom: 0.5px solid rgba(0,0,0,.16)
</style>
