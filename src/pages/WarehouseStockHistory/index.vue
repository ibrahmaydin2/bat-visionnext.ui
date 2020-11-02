<template>
  <div>
    <!-- <Smart :items="indexPage.RowData" :columns="indexPage.RowField" :fields="indexPage.RowFields" ></Smart> -->
    <Smart :items="datalar" :columns="ahmet" :fields="setFields" ></Smart>
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
    const aafields = [ 'StockDate: string', 'Warehouse: string', 'Item: string', 'UnitSet: string' ]
    /*
    const aarows = [
      {
        'label': 'Depo Kodu',
        'dataField': 'WarehouseId',
        'visible': false
      },
      {
        'label': 'Ürün',
        'dataField': 'ItemId',
        'visible': false
      },
      {
        'label': 'Birim Seti',
        'dataField': 'UnitSetId',
        'visible': false
      },
      {
        'label': 'Birim',
        'dataField': 'UnitId',
        'visible': false
      },
      {
        'label': 'ConvFact1',
        'dataField': 'ConvFact1',
        'visible': false
      },
      {
        'label': 'ConvFact2',
        'dataField': 'ConvFact2',
        'visible': false
      },
      {
        'label': 'Adet',
        'dataField': 'Quantity',
        'visible': false
      },
      {
        'label': 'Durum',
        'dataField': 'StatusId',
        'visible': false
      },
      {
        'label': 'RecordId',
        'dataField': 'RecordId',
        'visible': false
      },
      {
        'label': 'Kodu',
        'dataField': 'Code',
        'visible': false
      },
      {
        'label': 'CompanyId',
        'dataField': 'CompanyId',
        'visible': false
      },
      {
        'label': 'BranchId',
        'dataField': 'BranchId',
        'visible': false
      },
      {
        'label': 'Açıklama',
        'dataField': 'Description1',
        'visible': false
      },
      {
        'label': 'CreatedUser',
        'dataField': 'CreatedUser',
        'visible': false
      },
      {
        'label': 'Oluşturma Zamanı',
        'dataField': 'CreatedDateTime',
        'visible': false
      },
      {
        'label': 'ModifiedUser',
        'dataField': 'ModifiedUser',
        'visible': false
      },
      {
        'label': 'Düzenleme Zamanı',
        'dataField': 'ModifiedDateTime',
        'visible': false
      },
      {
        'label': 'Deleted',
        'dataField': 'Deleted',
        'visible': false
      },
      {
        'label': 'System',
        'dataField': 'System',
        'visible': false
      },
      {
        'label': 'Stok Tarihi',
        'dataField': 'StockDate',
        'visible': true
      },
      {
        'label': 'Statü',
        'dataField': 'Status',
        'visible': false
      },
      {
        'label': 'Depo',
        'dataField': 'Warehouse',
        'visible': true
      },
      {
        'label': 'Ürün',
        'dataField': 'Item',
        'visible': true
      },
      {
        'label': 'Birim Seti',
        'dataField': 'UnitSet',
        'visible': true
      },
      {
        'label': 'Birim',
        'dataField': 'Unit',
        'visible': false
      }
    ]
    */
    const bbrows = [
      {
        'title': 'Stok Tarihi',
        'label': 'Stok Tarihi',
        'dataField': 'StockDate',
        'visible': true,
        'align': null,
        'template': null,
        'cellsAlign': 'right'
      },
      {
        'title': 'Depo',
        'label': 'Depo',
        'dataField': 'Warehouse',
        'visible': true,
        'align': null,
        'template': null,
        'cellsAlign': 'right'
      },
      {
        'label': 'Ürün',
        'dataField': 'Item',
        'visible': true,
        'align': null,
        'template': null,
        'cellsAlign': 'right'
      },
      {
        'title': 'Birim Seti',
        'label': 'Birim Seti',
        'dataField': 'UnitSet',
        'visible': true,
        'align': null,
        'template': null,
        'cellsAlign': 'right'
      }
    ]
    const aadata = [
      {
        'StockDate': '2020-10-26T15:54:14.8391628+03:00',
        'warehouseId': 900.0,
        'ItemId': 190.0,
        'UnitSetId': 1.0,
        'unitId': 1.0,
        'convFact1': 1.0,
        'convFact2': 12.0,
        'quantity': 100.0,
        'statusId': 1.0,
        'Item': 'Kent Blue Slim 100',
        'unit': 'Paket',
        'status': 'Active',
        'UnitSet': 'Paket Unit Set',
        'Warehouse': 'Merkez Depo',
        'companyId': 1.0,
        'branchId': 1.0,
        'createdUser': 1.0,
        'createdDateTime': '2020-10-26T15:54:14.839166+03:00',
        'modifiedUser': null,
        'modifiedDateTime': null,
        'deleted': 0,
        'system': 0,
        'isCompleted': true,
        'message': null,
        'stackTrace': null,
        'validations': null
      },
      {
        'StockDate': '2020-10-26T15:54:14.8391679+03:00',
        'WarehouseId': 900.0,
        'ItemId': 190.0,
        'UnitSetId': 1.0,
        'unitId': 1.0,
        'convFact1': 1.0,
        'convFact2': 12.0,
        'quantity': 65.0,
        'statusId': 1.0,
        'Item': 'Kent Red Slim 120',
        'unit': 'Paket',
        'status': 'Active',
        'UnitSet': 'Paket Unit Set',
        'Warehouse': 'Merkez Depo',
        'companyId': 1.0,
        'branchId': 1.0,
        'createdUser': 1.0,
        'createdDateTime': '2020-10-26T15:54:14.8391687+03:00',
        'modifiedUser': null,
        'modifiedDateTime': null,
        'deleted': 0,
        'system': 0,
        'isCompleted': true,
        'message': null,
        'stackTrace': null,
        'validations': null
      },
      {
        'StockDate': null,
        'WarehouseId': null,
        'ItemId': 10718358.0,
        'UnitSetId': null,
        'unitId': null,
        'convFact1': null,
        'convFact2': null,
        'quantity': null,
        'statusId': null,
        'Item': 'BIG BABOL STK KAVUN',
        'unit': null,
        'status': null,
        'UnitSet': null,
        'Warehouse': null,
        'companyId': null,
        'branchId': null,
        'createdUser': null,
        'createdDateTime': null,
        'modifiedUser': null,
        'modifiedDateTime': null,
        'deleted': null,
        'system': null,
        'isCompleted': true,
        'message': null,
        'stackTrace': null,
        'validations': null
      }
    ]
    return {
      indexPage: indexPage,
      ahmet: bbrows,
      datalar: aadata,
      thisurl: '',
      setData: null,
      setRows: [],
      setFields: aafields,
      setTableActions: null
    }
  },
  watch: {
    tableData: function (e) {
      this.setRows = e.rowDatas
      console.log(e)
    },
    $route (to, from) {
      if (to.params.q) {
        this.getData(to.params.q)
      } else {
        this.getData()
      }
    }
  },
  computed: {
    ...mapState(['selectedRowKey', 'searchRes', 'tableData', 'tableOperations'])
  },
  mounted () {
    this.thisurl = this.$route.params.url
    this.getData(this.thisurl)
    this.changeTableRows()
    this.tableAction()
  },
  methods: {
    ...mapMutations(['indexTableActions', 'setTableRows', 'setSelectedRowKey', 'getModal']),
    getData (e) {
      // demoda doğrudan linke bağlanmak için getTableGetData kullanıyorum. Canlıda getTableData olacak.
      this.$store.dispatch('getTableOperations', {...this.query, url: 'VisionNextUIOperations/api/UIOperationGroupUser/Test', params: '?name=' + e})
      this.$store.dispatch('getTableGetData', {...this.query, url: 'VisionNextCommonApi/api/WarehouseStockHistory/GetWarehouseStockHistories', params: null})
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
