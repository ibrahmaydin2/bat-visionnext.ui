export default {
  data () {
    return {
      types: []
    }
  },
  methods: {
    getOrderDocumentTypes (id, type) {
      if (type === 'Order') {
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
        } else if (id === 46) {
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
      } else if (type === 'Waybill') {
        this.types = [
          {
            id: 1,
            label: 'Fatura'
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