export default {
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
    getNowDate () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return today
    },
    tabValidationHelper () {
      const tab = document.querySelectorAll('.nav-tabs .nav-item')
      tab.forEach((tab, item) => {
        const tabId = tab.querySelector('a').attributes['aria-controls'].value
        let tabContent = document.getElementById(tabId)
        if (tabContent.querySelector('fieldset').classList.contains('form-group--error')) {
          tab.querySelector('a').className += ' ' + 'error-tab'
        }
      })
    }
  }
}
