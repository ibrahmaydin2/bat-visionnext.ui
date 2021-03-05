<template>
  <div class="asc__dashboard">
    <b-card>
      <MainTab />
    </b-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import MainTab from '../../components/Dashboard/MainTab'

export default {
  components: {
    MainTab
  },
  data () {
    return {
    }
  },
  mounted () {
    this.hamburger('open')
  },
  computed: {
    ...mapState(['errorMessage'])
  },
  watch: {
  },
  methods: {
    ...mapMutations(['hamburger'])
  }
}
</script>
<style lang="sass">
.asc__dashboard
  .card
    height: 100%
</style>
