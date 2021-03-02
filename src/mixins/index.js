export default {
  data () {
    return {
      maxLengthControl: 'javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);',
      routeName: this.$route.meta.baseLink,
      routeName1: '',
      routeName2: ''
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  },
  methods: {
    dateConvertFromTimezone: function (date) {
      if (!date || typeof date === 'undefined') {
        return ''
      }
      let d = new Date(date)
      let lastDate = d.toLocaleDateString()
      return lastDate
    },
    dateConvertToISo: function (date) {
      if (!date || typeof date === 'undefined') {
        return ''
      }
      return new Date(date).toISOString()
    },
    checkConvertToNumber: function (text) {
      if (text === null) {
        return null
      }
      return text ? 1 : 0
    },
    numberConvertToString: function (number) {
      if (number === null) {
        return null
      }
      return !!number
    },
    checkConvertDayToNumber (text) {
      if (text === null) {
        return 0
      }
      return text ? 1 : 0
    },
    getNowDate () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return today
    },
    tabValidationHelper () {
      const tabs = document.querySelectorAll('.nav-tabs .nav-item')
      tabs.forEach((tab, item) => {
        const tabId = tab.querySelector('a').attributes['aria-controls'].value
        let tabContent = document.getElementById(tabId)
        var errorItems = tabContent.querySelector('.form-group--error')
        if (errorItems) {
          tab.querySelector('a').className += ' ' + 'error-tab'
        }
      })
    },
    searchItemsByModel (api, name, model) {
      return this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: api,
        name: name,
        andConditionModel: model
      })
    },
    getFormatDataByType (data, type, lang) {
      let value = ''
      switch (type) {
        case 'text':
          value = data !== null && data !== undefined ? data : '-'
          break
        case 'object':
          value = data ? data.Label : '-'
          break
        case 'check':
          value = data === 1 ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-times text-danger"></i>'
          break
        case 'date':
          value = data !== null ? this.dateConvertFromTimezone(data) : '-'
          break
        default:
          value = '-'
      }
      let result = `<span><i class="far fa-circle"></i> ${this.$t(lang)}</span><p>${value}</p>`
      return result
    },
    isString (evt) {
      if (evt) {
        let turkishCharKeyCodes = [199, 214, 220, 231, 246, 252, 286, 287, 304, 305, 350, 351]
        let charCode = evt.keyCode
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || turkishCharKeyCodes.includes(charCode)) {
          return true
        } else {
          evt.preventDefault()
        }
      }
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    setRouteNames () {
      if (!this.routeName1) {
        this.routeName1 = this.routeName
      }
      if (!this.routeName2) {
        this.routeName2 = this.routeName
      }
    },
    convertLookupValueToSearchValue (lookupValue) {
      return {
        RecordId: lookupValue.DecimalValue,
        Description1: lookupValue.Label
      }
    }
  }
}
