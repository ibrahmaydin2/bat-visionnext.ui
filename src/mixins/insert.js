import { mapState } from 'vuex'
import mixin from './index'
export default {
  mixins: [mixin],
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode'])
  },
  methods: {
    createManualCode (parameter = 'Code') {
      this.setRouteNames()
      this.$api.postByUrl({}, `VisionNext${this.routeName1}/api/${this.routeName2}/GetCode`).then((response) => {
        if (response && response.Model) {
          this.form[parameter] = response.Model.Code
        }
      })
    },
    createData () {
      this.setRouteNames()
      let model = {
        'model': this.form
      }
      this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
    }
  },
  mounted () {
    this.$store.dispatch('getInsertRules', {...this.query, api: this.routeName}).then(() => {
      Object.keys(this.insertDefaultValue).forEach(el => {
        if (el !== 'Code' && this.insertDefaultValue[el] && this.form) {
          this.form[el] = this.insertDefaultValue[el]
        }
      })
    })
  }
}
