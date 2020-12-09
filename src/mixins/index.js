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
    }
  }
}
