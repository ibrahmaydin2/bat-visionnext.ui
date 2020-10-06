<template>
  <div>
    <DxDataGrid
      class="asc__listPage-dataGrid"
      id="gridContainer"
      :data-source="searchRes.ResultList"
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
      @selection-changed="rowSelected"
    >
      <DxFilterRow :visible="true" apply-filter="auto"/>
      <DxHeaderFilter :visible="true"/>
      <DxColumnFixing :enabled="true"/>
      <DxColumn :caption="$t('list.operations')" cell-template="select-module-template" :width="100" />
      <DxColumn
        v-for="(row, i) in tableRows.filter(t => t.visible === true)"
        :key="i"
        :width="row.width"
        :data-field="row.field"
        :caption="$t('index.'+row.field)"
        :format="row.format"
        :data-type="row.type"
        :alignment="row.align"
        :cell-template="row.cellTemplate" />
      <template #formatCell=" { data }">
        <span>{{data.value}}</span>
      </template>
      <template #labelCell=" { data }">
        <span>{{data.value.Label}}</span>
      </template>
      <template #dateCell=" { data }">
        <span>{{dateConvertToTimestamp(data.value)}}</span>
      </template>

      <template #select-module-template>
        <DxDropDownButton
          icon="smalliconslayout"
          width="40"
          :items="tableActions"
          key-expr="id"
          display-expr="text"
          @item-click="optionSelected"
        />
      </template>
      <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 50, 100]" />
    </DxDataGrid>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    const now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yyyy = now.getFullYear()
    let ldd = new Date(yyyy, mm + 1, 0).getDate()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    let mmlastDay = yyyy + '-' + mm + '-' + ldd
    let mmfirstDay = yyyy + '-' + mm + '-01'
    let mmtoday = yyyy + '-' + mm + '-' + dd
    return {
      firstDay: mmfirstDay,
      lastDay: mmlastDay,
      today: mmtoday,
      setRows: [
        { visible: false, align: 'left', format: '', type: '', field: 'BloodTransfusion', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'Code', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ContactEmail', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ContactGsm', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ContactName', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ContactPhone', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ContactSurname', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'CreatedDateTime', cellTemplate: 'dateCell' },
        { visible: false, align: 'left', format: '', type: '', field: 'Description1', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ExSibling', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'KitType', cellTemplate: 'labelCell' },
        { visible: false, align: 'left', format: '', type: '', field: 'Lab', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'PathogenicVariant', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'PatientBirthDate', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'PatientCity', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'PatientCountry', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'PatientGender', cellTemplate: 'labelCell' },
        { visible: false, align: 'left', format: '', type: '', field: 'PatientGsm', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'PatientName', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'PatientPhone', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'PatientSurname', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'Project', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'ProvisionNumber', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'SampleDate', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'SampleType', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'SerialNumber', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'System', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'TransportationAddress', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'TransportationDate', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'TransportationTime', cellTemplate: '' },
        { visible: false, align: 'left', format: '', type: '', field: 'WorkOrderStatus', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'WorkOrderStatusId', cellTemplate: '' },
        { visible: true, align: 'left', format: '', type: '', field: 'WorkOrderType', cellTemplate: 'labelCell' }
      ],
      setTableActions: [
        { id: 1, show: 'modal', text: this.$t('list.quick'), icon: 'search' },
        { id: 2, show: 'page', text: this.$t('list.show'), icon: 'chevrondoubleright' },
        { id: 3, show: 'page', text: this.$t('list.edit'), icon: 'edit' },
        { id: 4, show: 'page', text: this.$t('list.print'), icon: 'print' }
      ]
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
    ...mapState(['tableData', 'tableRows', 'tableActions', 'selectedRowKey', 'searchRes'])
  },
  mounted () {
    this.getData()
    this.changeTableRows()
    this.tableAction()
  },
  methods: {
    ...mapMutations(['indexTableActions', 'setTableRows', 'setSelectedRowKey', 'getModal']),
    getData () {
      // 'AndConditionModel': { 'CreatedUser': localStorage.getItem('UserModel').UserId, ----> 'WorkOrderStatusId': '', <---- 'Deleted': 0 },
      // workorderstatusid = senaryodan filtreleme yaparken kullanılacak.

      let dataSearchRes = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'Page': 1,
        'PageRecordCount': 20,
        'AndConditionModel': {
          'CreatedUser': localStorage.getItem('UserModel').UserId,
          'Deleted': 0 }
      }
      this.$store.dispatch('getSearchRes', {...this.query, info: dataSearchRes})
      this.$store.dispatch('getFavouriteKitTypes')
    },
    tableAction () {
      // tablonun sol başındaki işlem menüsünde listelenecek özellikler tanımlanır.
      this.indexTableActions(this.setTableActions)
    },
    changeTableRows () {
      // görüntülenmek istenen / istenmeyen sütunlar yönetilir.
      this.setTableRows(this.setRows)
    },
    rowSelected (e) {
      // satırdaki click eventini alır. yapılması istenilen işlem varsa buradan tanımlanabilir.
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
