<template>
  <div>
    <Smart :items="setData" :columns="setRows" :fields="setFields" ></Smart>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Smart from '../../components/Smart'
import { indexPage } from '../../../static/server/index.js'
export default {
  components: {
    Smart
  },
  data () {
    return {
      setData: indexPage.RowData,
      setRows: indexPage.RowField,
      setFields: indexPage.RowFields,
      setTableActions: indexPage.RowActions
    }
  },
  watch: {
    $route (to, from) {
      if (to.params.q) {
        this.getData(to.params.q)
      } else {
        this.getData()
      }
    }
  },
  computed: {
    ...mapState(['selectedRowKey', 'searchRes'])
  },
  mounted () {
    this.getData()
    this.changeTableRows()
    this.tableAction()
  },
  methods: {
    ...mapMutations(['indexTableActions', 'setTableRows', 'setSelectedRowKey', 'getModal']),
    getData () {
      // this.$store.dispatch('getTableGetData', {...this.query, url: '', params: {}}) // demoda doğrudan linke bağlanmak için getTableGetData kullanıyorum. Canlıda getTableData olacak.
      this.$store.commit('bigLoaded', false)
    },
    tableAction () {
      this.indexTableActions(this.setTableActions)
    },
    changeTableRows () {
      this.setTableRows(this.setRows)
    },
    rowSelected (e) {
      this.setSelectedRowKey(e.selectedRowsData[0].EncryptedKey) // tıklanmış satırın EncryptedKey değerini alır.
    },
    optionSelected (e) {
      console.log(e)
      switch (e.itemData.id) {
        case 1:
          this.$router.push({name: 'WorkOrderShow', params: {url: this.selectedRowKey}})
          break
        case 2:
          this.$router.push({name: 'WorkOrderGet', params: {url: this.selectedRowKey}})
          break
        case 3:
          this.$router.push({name: 'WorkOrderUpdate', params: {url: this.selectedRowKey}})
          break
        case 4:
          this.$router.push({name: 'WorkOrderGet', params: {url: this.selectedRowKey}})
          break
        default:
          break
      }
    }
  }
}
</script>
