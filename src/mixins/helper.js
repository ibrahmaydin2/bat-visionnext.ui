export default {
  data () {
    return {
      types: []
    }
  },
  methods: {
    getOrderDocumentTypes (id) {
      if (id === 44) {
        this.types = [
          {
            id: 2,
            label: 'İrsaliye'
          }
        ]
      } else if (id === 45) {
        this.types = [
          {
            id: 3,
            label: 'İrsaliyeli Fatura'
          }
        ]
      } else if (id === 45) {
        this.types = [
          {
            id: 2,
            label: 'İrsaliye'
          },
          {
            id: 3,
            label: 'İrsaliyeli Fatura'
          }
        ]
      }
      return this.types
    },
    dateConvertToISo: function (date) {
      if (!date || typeof date === 'undefined') {
        return ''
      }
      return new Date(date).toISOString()
    }
  }
}
