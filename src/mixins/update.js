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
      return this.$api.postByUrl({RecordId: this.$route.params.url}, `VisionNext${this.routeName1}/api/${this.routeName2}/Get`).then((res) => {
        if (res.IsCompleted) {
          this.$store.commit('setRowData', res.Model)
        }
      })
    },
    updateData () {
      this.setRouteNames()
      let model = {
        'model': this.form
      }
      if (typeof this.$route.query.saveAs !== 'undefined' && this.$route.query.saveAs) {
        model.model.RecordId = null
        model.model.RecordState = 2
        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
      } else {
        this.$store.dispatch('updateData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
      }
    }
  },
  mounted () {
    this.$store.dispatch('getInsertRules', {...this.query, api: this.routeName})
  }
}
