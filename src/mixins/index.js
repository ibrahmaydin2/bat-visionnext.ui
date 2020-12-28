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
    }
  }
}
