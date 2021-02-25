import { mapState } from 'vuex'
import mixin from './index'
export default {
  mixins: [mixin],
  computed: {
    ...mapState(['rowData', 'developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup'])
  },
  methods: {
    getData () {
      if (!this.routeName1) {
        this.routeName1 = this.routeName
      }
      if (!this.routeName2) {
        this.routeName2 = this.routeName
      }
      return this.$store.dispatch('getData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, record: this.$route.params.url})
    },
    updateData () {
      this.setRouteNames()
      let model = {
        'model': this.form
      }
      this.$store.dispatch('updateData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
    }
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.$store.dispatch('getInsertRules', {...this.query, api: this.routeName})
  }
}
