export default {
  methods: {
    dateConvertToTimestamp: function (date) {
      if (!date || typeof date === 'undefined') {
        return ''
      }
      date = date.match(/\(([0-9]{13})\+[0-9]{4}\)/)
      let cd = new Date(Number(date[1]))
      let lastDate = `${cd.getDay()}.${cd.getMonth()}.${cd.getFullYear()}`
      return lastDate
    }
  }
}
