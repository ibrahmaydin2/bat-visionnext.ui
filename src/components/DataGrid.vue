<template>
  <DxDataGrid
    class="asc__listPage-dataGrid"
    id="gridContainer"
    :data-source="tableData"
    ref="dataGrid"
    remote-operations="true"
    :show-borders="true"
    :show-column-lines="true"
    :show-row-lines="true"
    :row-alternation-enabled="true"
    :allow-column-reordering="true"
    :allow-column-resizing="true"
    :column-auto-width="true"
    :selection="{ mode: 'single' }"
    @selection-changed="optionSelected"
    >
    <DxFilterRow :visible="true" apply-filter="auto"/>
    <DxHeaderFilter :visible="true"/>
    <DxColumnFixing :enabled="true"/>

    <DxColumn :caption="$t('list.operations')" cell-template="select-module-template" :width="120" />

    <DxColumn v-if="tableRows[0].visible" width="70" data-field="confirmationCode" caption="Onay Durumu" format="" data-type="" alignment="left" cell-template="confirmationCode" />
    <DxColumn v-if="tableRows[1].visible" width="100" data-field="sapCustomerCode" caption="Müşteri No" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[2].visible" width="100" data-field="orderDate" caption="Sipariş Tarihi" format="dd-MM-yyyy" data-type="date" alignment="left" />
    <DxColumn v-if="tableRows[3].visible" width="100" data-field="sapOrderNumber" caption="Müş. Sipariş No" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[4].visible" width="100" data-field="basketOrderNumber" caption="Sipariş No" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[5].visible" width="70" data-field="orderLineNumber" caption="Kalem No" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[6].visible" data-field="productType" caption="Ürün Adı" format="" data-type="" alignment="left" :calculate-cell-value="productTypeCell"/>
    <DxColumn v-if="tableRows[7].visible" width="70" data-field="productWidth" caption="En (cm)" format="" data-type="" alignment="left" :customize-text="cmCell"/>
    <DxColumn v-if="tableRows[8].visible" width="70" data-field="productLength" caption="Boy (cm)" format="" data-type="" alignment="left" :customize-text="cmCell"/>
    <DxColumn v-if="tableRows[9].visible" width="70" data-field="packingTypeName" caption="Ambalaj Tipi" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[10].visible" width="70" data-field="orderQuantity" caption="Sipariş Miktarı" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[11].visible" width="70" data-field="shipmentQuantity" caption="Sevk Miktarı" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[12].visible" width="70" data-field="balanceShipmentAmount" caption="Açık Miktar" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[13].visible" width="70" data-field="stockQuantity" caption="Özel Stok" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[14].visible" width="100" data-field="unitPrice" caption="Birim Fiyatı" format="currency" data-type="currency" alignment="right" :calculate-cell-value="currencyCell"/>
    <DxColumn v-if="tableRows[15].visible" width="100" data-field="currency" caption="Para Birimi" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[16].visible" width="70" data-field="orderAmount" caption="Açık Sipariş Tutarı" format="" data-type="" alignment="left" />
    <DxColumn v-if="tableRows[17].visible" width="70" data-field="deliveryDate" caption="Teslim Tarihi" format="dd-MM-yyyy" data-type="date" alignment="left" />
    <DxColumn v-if="tableRows[18].visible" width="70" data-field="confirmationCodeDescription" caption="confirmationCodeDescription" />
    <DxColumn v-if="tableRows[19].visible" width="70" data-field="sapCustomerName" caption="sapCustomerName" />
    <DxColumn v-if="tableRows[20].visible" width="70" data-field="orderReceiver" caption="orderReceiver" />
    <DxColumn v-if="tableRows[21].visible" width="70" data-field="orderReceiverName" caption="orderReceiverName" />
    <DxColumn v-if="tableRows[22].visible" width="70" data-field="warehouseCode" caption="warehouseCode" />
    <DxColumn v-if="tableRows[23].visible" width="70" data-field="warehouseName" caption="warehouseName" />
    <DxColumn v-if="tableRows[24].visible" width="70" data-field="productWeight" caption="productWeight" />
    <DxColumn v-if="tableRows[25].visible" width="70" data-field="packingTypeCode" caption="packingTypeCode" />
    <DxColumn v-if="tableRows[26].visible" width="70" data-field="measurementUnit" caption="measurementUnit" />
    <DxColumn v-if="tableRows[27].visible" width="70" data-field="produceAmount" caption="produceAmount" />
    <DxColumn v-if="tableRows[28].visible" width="70" data-field="sasNumber" caption="sasNumber" />
    <DxColumn v-if="tableRows[29].visible" width="70" data-field="sapBasketOrderNumber" caption="sapBasketOrderNumber" />

    <template #confirmationCode="cell">
      <span :class="cell.data.value == 'OL' ? 'btn btn-sm btn-success asc__general-btn-inTable' : 'btn btn-sm btn-danger asc__general-btn-inTable'">{{cell.data.value === 'OL' ? 'Onaylı' : 'Onaysız'}}</span>
    </template>
    <template #select-module-template="cell">
      <DxDropDownButton text="..." width="100" :items="tableActions" key-expr="id" display-expr="text" @item-click="logAction" />
    </template>
    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 50, 100]" />
  </DxDataGrid>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      today: Date.now()
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  methods: {
    cmCell (cellInfo) {
      return cellInfo.value + ' cm'
    },
    currencyCell (rowData) {
      return rowData.unitPrice + ' ' + rowData.currency
    },
    productTypeCell (rowData) {
      return rowData.productType + ' ' + rowData.productWeight + ' Gr'
    },
    hideRow (e) {
      // console.log(e)
    },
    optionSelected ({ selectedRowsData }) {
      // const what = selectedRowsData[0]
      // console.log(what)
    },
    logAction (e) {
      // console.log(e.itemData.text)
    }
  }
}
</script>
<style scope>
  .asc__general-btn-inTable {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 10px;
  }
  .asc__listPage-dataGrid {
    height: calc(100vh - 160px);
    transition-timing-function: ease;
  }
  .dx-widget {
    font-size: 11px !important
  }
  .dx-datagrid .dx-row > td {
    padding: 2px 4px !important;
    vertical-align: middle !important;
  }
  .dx-dropdownbutton-action.dx-button .dx-button-content {
    padding: 2px !important
  }
  .dx-filter-menu.dx-menu .dx-menu-item .dx-menu-item-content {
    padding: 0px 0px 0px 0px !important
  }
  .dx-datagrid-headers .dx-texteditor-input,
  .dx-datagrid-rowsview .dx-texteditor-input {
    padding: 0px !important;
    min-height: 28px !important;
  }
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-placeholder:before,
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-texteditor-input {
    padding-left: 16px !important;
  }
  .dx-dropdownbutton-popup-wrapper.dx-popup-wrapper .dx-overlay-content {
    width: 200px !important;
  }
</style>
