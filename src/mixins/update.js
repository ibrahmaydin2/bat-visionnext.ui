import { mapState } from 'vuex'
import mixin from './index'
export default {
  mixins: [mixin],
  computed: {
    ...mapState(['rowData', 'developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'insertColumnType'])
  },
  data () {
    return {
      code: null,
      codeLabel: 'Code',
      rowDataReceipt: false
    }
  },
  methods: {
    createManualCode (parameter = 'Code') {
      this.setRouteNames()
      return this.$api.postByUrl({}, `VisionNext${this.routeName1}/api/${this.routeName2}/GetCode`).then((response) => {
        if (response && response.Model) {
          this.code = response.Model.Code
          this.form[parameter] = this.code
          this.$store.commit('setGetCreateCode', this.code)
        }
      })
    },
    getData (path) {
      if (!this.routeName1) {
        this.routeName1 = this.routeName
      }
      if (!this.routeName2) {
        this.routeName2 = this.routeName
      }
      if (!path) {
        path = '/Get'
      }
      this.$store.commit('setRowData', {})
      return this.$api.postByUrl({RecordId: this.$route.params.url}, `VisionNext${this.routeName1}/api/${this.routeName2}${path}`).then((res) => {
        if (res.IsCompleted) {
          this.$store.commit('setRowData', res.Model)
          this.$forceUpdate()
          if (res.Model && res.Model.System === 1) {
            this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.systemRecordCanNotUpdate') })
            document.getElementById('submitButton').disabled = true
          }
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
        return this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
      } else {
        return this.$store.dispatch('updateData', {...this.query, api: `VisionNext${this.routeName1}/api/${this.routeName2}`, formdata: model, return: this.routeName})
      }
    }
  },
  mounted () {
    this.isSaveAs = this.$route.query.saveAs === 1
    if (this.isSaveAs) {
      this.createManualCode()
    }
    this.$store.dispatch('GetUpdateRules', {...this.query, api: this.routeName})
  },
  watch: {
    rowData (newValue) {
      if (newValue) {
        this.rowDataReceipt = true
      }
    },
    form (newValue) {
      if (newValue && this.rowDataReceipt && this.isSaveAs) {
        this.rowDataReceipt = false
        this.form[this.codeLabel] = this.code
      }
    }
  }
}
