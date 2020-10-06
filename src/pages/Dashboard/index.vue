<template>
  <b-container fluid>
    <Navigation/>
    <Header/>
    <div :class="style.viewPush">
      <router-view/>
    </div>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['style', 'bigLoading'])
  },
  methods: {
  }
}
</script>
<style lang="sass">
</style>
