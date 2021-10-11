<template>
  <b-container fluid>
      <Navigation/>
      <Header/>
      <ErrorPage v-if="errorView" :info="errorData" />
      <b-row v-else class="mb-3">
        <b-col cols="12">
          <div :class="style.viewPush">
            <b-overlay :show="bigLoading" rounded="sm" spinner-variant="warning">
              <template #overlay>
                <b-icon
                  icon="three-dots"
                  animation="cylon"
                  scale="8"
                  variant="warning"
            ></b-icon>
            </template>
            <b-card class="asc__listPage shadow">
              <b-row class="asc__listPage-Header">
                <b-col cols="12" sm="12" md="3" class="pl-0">
                  <h3>{{tableOperations.Title}}</h3>
                </b-col>
                <b-col cols="12" sm="12" md="9" class="pr-0 text-right">
                  <template v-if="isFiltered">
                    <b-button variant="info" size="sm" @click="clearFilters">
                      <i class="fas fa-search-minus" /> {{$t('list.clear')}}
                    </b-button>
                    <b-button id="submitButton" class="btn btn-warning btn-sm" :disabled="!this.filterData || Object.keys(this.filterData).length === 0">
                      <i class="fas fa-save" /> {{$t('list.saveFilter')}}
                    </b-button>
                    <b-popover target="submitButton" triggers="hover" placement="top">
                      <template #title>{{$t('list.filterTitle')}}</template>
                      <b-form-input v-model="filterTitle"/>
                      <b-button @click="saveFilter" variant="warning" size="sm" class="w-100 mt-1"><i class="fas fa-check" /> {{$t('list.save')}}</b-button>
                    </b-popover>
                  </template>
                  <b-button v-if="tableOperations.Actions && tableOperations.Actions.length === 1 && createLink" variant="success" size="sm" :to="{name: createLink}">
                    <i class="fas fa-plus-square" /> {{$t('list.create')}}
                  </b-button>
                  <b-dropdown v-else-if="tableOperations.Actions && tableOperations.Actions.length > 1" split :split-to="{name: createLink}" variant="success" right size="sm">
                    <template v-slot:button-content>
                      <i class="fas fa-plus-square" /> {{$t('list.create')}}
                    </template>
                    <b-dropdown-item v-for="(act, i) in tableOperations.Actions" :key="'act' + i">
                      <i class="fas fa-file-code"></i> {{act.Title}}
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown
                    variant="white"
                    :text="$t('list.allFilters')"
                    class="asc__listPage-Header-Dropdown"
                  >
                    <b-dropdown-header id="dropdown-header-label">
                      {{$t('list.allRecords')}}
                    </b-dropdown-header>
                    <b-dropdown-item
                      v-for="(flt, i) in tableOperations.Filters"
                      :key="'filter' + i"
                    >
                      <!-- <i class="fas fa-file-pdf" /> {{dwn.Title}} -->
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-for="(flt, i) in tableFilters"
                      :key="'filter' + i"
                    >
                    <router-link :to="{name: $route.name, query: {'page': 1, 'code': flt.Code}}">
                      {{flt.Description1}}
                    </router-link>
                    </b-dropdown-item>
                    <b-dropdown-divider />
                    <b-dropdown-item>{{$t('list.allFilters')}}</b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown
                    right
                    variant="white"
                    :text="$t('list.selectedRows')"
                    class="asc__listPage-Header-SelectRows"
                  >
                    <b-dropdown-header id="dropdown-header-label">
                      {{$t('list.selectedRows')}}
                    </b-dropdown-header>
                    <div class="asc__listPage-Header-SelectRows-overlay">
                      <b-form-checkbox
                        v-for="(row,i) in tableRowsAll"
                        :name="row.dataField"
                        :key="'selectedRow' + i"
                        v-model="row.visible"
                        variant="danger"
                        switch>
                          {{ row.label }}
                      </b-form-checkbox>
                    </div>
                    <div class="asc__listPage-Header-SelectRows-footer">
                      <b-button size="sm" variant="success" @click="submitRows" class="w-100 text-center">
                        <i class="fas fa-table" /> {{$t('index.saveRows')}}
                      </b-button>
                    </div>
                  </b-dropdown>
                  <b-dropdown right variant="white" class="asc__listPage-Header-Download">
                    <template v-slot:button-content>
                      <i class="fas fa-download" />
                    </template>
                    <b-dropdown-header id="dropdown-header-label">
                      {{ $t('list.downloads') }}
                    </b-dropdown-header>
                    <b-dropdown-item
                      v-for="(dwn, i) in tableOperations.Downloads"
                      :key="'download' + i"
                      @click="downloadBtn(thisRoute,dwn)"
                    >
                      <i class="fas fa-file-pdf" /> {{dwn.Title}}
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown right variant="white" class="asc__listPage-Header-Download">
                    <template v-slot:button-content>
                      <i class="fas fa-upload" />
                    </template>
                    <b-dropdown-header id="dropdown-header-label">
                      {{ $t('list.uploads') }}
                    </b-dropdown-header>
                    <b-dropdown-item
                      v-for="(dwn, i) in tableOperations.Uploads"
                      :key="'upload' + i"
                      @click="uploadBtn(thisRoute,dwn)"
                    >
                      <i class="fas fa-file-pdf" /> {{dwn.Title}}
                    </b-dropdown-item>
                  </b-dropdown>
                  <div v-if="isMultipleGrid || showManualActions" style="display: inline-grid">
                    <b-dropdown v-if="tableOperations.RowActions && tableOperations.RowActions.length >= 1" size="sm" variant="link" no-caret no-flip offset="-100" class="bat__workflow-dropdown" toggle-class="bat__workflow-dropdown-btn">
                      <template #button-content>
                        <span class=" text-dark font-weight-bold">{{$t('general.actions')}} <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></span>
                      </template>
                      <Actions :actions="tableOperations.RowActions" :isMultiple="1" @showMultipleModal="showMultipleModal" :RecordIds="recordIds" />
                    </b-dropdown>
                  </div>
                </b-col>
              </b-row>
              <router-view />
              <div class="clearfix" />
            </b-card>
            </b-overlay>
          </div>
        </b-col>
      </b-row>
      <MultipleConfirmModal :modalAction="modalAction" :recordIds="recordIds" />
      <PrintModal />
      <ImportExcelModal :modalAction="modalAction" />
      <MultiplePaymentChangeModal :modalAction="modalAction" :recordIds="recordIds" />
       <PurchaseInvoiceConvertModal
         id="purchaseWaybillConvertModal"
         :modalAction="modalAction"
         list-url="VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceSearch"
         detail-url="VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceDetail"
         convert-url="VisionNextInvoice/api/PurchaseWaybill/ReceiveInvoiceConvert"
         v-if="showPurchaseWaybillConvertModal"/>
       <PurchaseInvoiceConvertModal
         id="purchaseInvoiceConvertModal"
         :modalAction="modalAction"
         list-url="VisionNextInvoice/api/PurchaseInvoice/ReceiveInvoiceSearch"
         detail-url="VisionNextInvoice/api/PurchaseInvoice/ReceiveInvoiceDetail"
         convert-url="VisionNextInvoice/api/PurchaseInvoice/ReceiveInvoiceConvert"
         v-if="showPurchaseInvoiceConvertModal"/>
         <SalesReturnInvoiceConvertModal
         :modalAction="modalAction"
         v-if="showSalesReturnInvoiceConvertModal" />
         <ItemFormulaModal :modalAction="modalAction" v-if="showItemFormulaModal" />
        <PurchaseReturnInvoiceRmaApproveModal v-if="showPurchaseReturnInvoiceRmaApproveModal" :modalAction="modalAction" :type="purchaseReturnRmaType" />
        <CreditBudgetBulkApproveModal v-if="showUpdateCreditBudgetModal" :modalAction="modalAction" :recordIds="recordIds" size="xl"/>
        <EdiOrderApproveModal v-if="showEdiOrderApproveModal" :modalAction="modalAction" :recordIds="recordIds" :documentDate="additionalValue"/>
  </b-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import MultipleConfirmModal from '../../components/Actions/MultipleConfirmModal'
import PrintModal from '../../components/Actions/PrintModal'
import ImportExcelModal from '../../components/Actions/ImportExcelModal'
import MultiplePaymentChangeModal from '../../components/Actions/MultiplePaymentChangeModal'
import PurchaseInvoiceConvertModal from '../../components/Actions/PurchaseInvoiceConvertModal'
import SalesReturnInvoiceConvertModal from '../../components/Actions/SalesReturnInvoiceConvertModal'
import ItemFormulaModal from '../../components/Actions/ItemFormulaModal'
import PurchaseReturnInvoiceRmaApproveModal from '../../components/Actions/PurchaseReturnInvoiceRmaApproveModal'
import EdiOrderApproveModal from '../../components/Actions/EdiOrderApproveModal'

export default {
  components: {
    MultipleConfirmModal,
    PrintModal,
    ImportExcelModal,
    MultiplePaymentChangeModal,
    PurchaseInvoiceConvertModal,
    SalesReturnInvoiceConvertModal,
    ItemFormulaModal,
    PurchaseReturnInvoiceRmaApproveModal,
    EdiOrderApproveModal
  },
  data () {
    return {
      thisRoute: this.$route.name,
      pageTitle: this.$route.meta.title,
      createLink: this.$route.meta.createLink,
      filterTitle: '',
      modalAction: null,
      recordIds: [],
      showManualActions: false,
      showPurchaseWaybillConvertModal: false,
      showPurchaseInvoiceConvertModal: false,
      showSalesReturnInvoiceConvertModal: false,
      showItemFormulaModal: false,
      showPurchaseReturnInvoiceRmaApproveModal: false,
      showUpdateCreditBudgetModal: false,
      showEdiOrderApproveModal: false,
      purchaseReturnRmaType: 'Invoice',
      additionalValue: null
    }
  },
  mounted () {
    let pages = ['PurchaseWaybill', 'PurchaseInvoice', 'SalesReturnInvoice', 'Contracts', 'PurchaseReturnInvoice', 'PurchaseReturnWaybill']
    if (pages.includes(this.thisRoute)) {
      this.showManualActions = true
    }
  },
  computed: {
    ...mapState(['errorView', 'errorData', 'style', 'bigLoading', 'tableRowsAll', 'tableFilters', 'tableOperations', 'isFiltered', 'filterData', 'selectedTableRows', 'isMultipleGrid', 'tableRows'])
  },
  watch: {
    $route (to, from) {
      this.$store.commit('setError', {view: false, info: null})
      this.thisRoute = to.name
      this.pageTitle = to.meta.title
      this.createLink = to.meta.createLink
    },
    selectedTableRows (e) {
      this.recordIds = []
      if (e && e.length > 0) {
        e.map(item => {
          this.recordIds.push(item.RecordId)
        })
      } else {
        this.recordIds = []
      }
    }
  },
  methods: {
    ...mapMutations(['hideTableRow']),
    clearFilters () {
      this.$store.commit('changeFiltersCleared', true)
    },
    changeRows () {
      this.$store.commit('setTableRows', this.tableRowsAll)
    },
    submitRows () {
      let tbl = this.tableRowsAll.filter(t => t.visible === true)
      let el = ''
      for (let i = 0; i < tbl.length; i++) {
        if (el === '') {
          el += tbl[i].dataField
        } else {
          el += ',' + tbl[i].dataField
        }
      }
      const path = this.$route.path.split('/')[1]

      this.$store.dispatch('setSelectedRows', {...this.query, FormId: this.tableOperations.Id, Columns: el}).then(res => {
        if (res.data.IsCompleted === true) {
          this.$api.get('UIOperations', `UiOperationGroupUser/GetFormFieldsCacheReset?name=${path}`).then((r) => {
            if (r.IsCompleted) {
              this.$api.get('UIOperations', `UiOperationGroupUser/GetFormInitsCacheReset?name=${path}`).then((response) => {
                this.$router.go(0)
              })
            }
          })
        }
      })
    },
    downloadBtn (r, f) {
      this.$store.dispatch('getDownloadLink', {...this.bom, api: f.Url, formName: this.$route.name})
    },
    uploadBtn (route, action) {
      this.modalAction = action
      this.$root.$emit('bv::show::modal', 'importExcelModal')
    },
    filterOnFilters (e) {
      this.$router.push({name: this.$route.name, query: {'page': 1, 'code': e}})
    },
    saveFilter () {
      const model = {
        'recordId': 0,
        'description1': this.filterTitle,
        'recordState': 1,
        'linkUrl': JSON.stringify(this.filterData),
        'formId': this.tableOperations.Id
      }
      const modelForm = {
        model
      }
      this.$store.dispatch('createData', {...this.query, api: 'VisionNextUIOperations/api/UIFormView', formdata: modelForm, action: 'filters'})
    },
    showMultipleModal (action) {
      this.showItemFormulaModal = false
      this.showPurchaseReturnInvoiceRmaApproveModal = false
      this.showUpdateCreditBudgetModal = false
      this.showEdiOrderApproveModal = false
      if (action.Action !== 'ItemFormula' && this.selectedTableRows.length < 1 && !this.showManualActions) {
        this.$toasted.show(this.$t('index.selectRowError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.modalAction = action
      if (action.Action === 'MultiPaymentChange') {
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'multiplePaymentChangeModal')
        })
        return
      } else if (action.Action === 'PurchaseWaybillConvert') {
        this.showPurchaseWaybillConvertModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'purchaseWaybillConvertModal')
        })
        return
      } else if (action.Action === 'PurchaseInvoiceConvert') {
        this.showPurchaseInvoiceConvertModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'purchaseInvoiceConvertModal')
        })
        return
      } else if (action.Action === 'SalesReturnInvoiceConvert') {
        this.showSalesReturnInvoiceConvertModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'salesReturnInvoiceConvertModal')
        })
        return
      } else if (action.Action === 'ItemFormula') {
        this.showItemFormulaModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'itemFormulaModal')
        })
        return
      } else if (action.Action === 'PurchaseReturnInvoiceRmaApprove') {
        this.purchaseReturnRmaType = 'Invoice'
        this.showPurchaseReturnInvoiceRmaApproveModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'purchaseReturnInvoiceRmaApproveModal')
        })
        return
      } else if (action.Action === 'PurchaseReturnWaybillRmaApprove') {
        this.purchaseReturnRmaType = 'Waybill'
        this.showPurchaseReturnInvoiceRmaApproveModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'purchaseReturnInvoiceRmaApproveModal')
        })
        return
      } else if (action.Action === 'ContractCustomerApprove') {
        this.showUpdateCreditBudgetModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'credit-budget-bulk-approve-modal')
        })
        return
      } else if (action.Action === 'ApproveEdiOrder') {
        this.showEdiOrderApproveModal = true
        this.additionalValue = this.getValueFromGrid('DocumentDate')
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'edi-order-approve-modal')
        })
        return
      }

      this.$root.$emit('bv::show::modal', 'multipleConfirmModal')
    },
    getValueFromGrid (dataField) {
      let filteredList = this.tableRows.filter(item => item.visible === true && item.dataField === dataField)

      return filteredList && filteredList.length > 0 ? filteredList[0].defaultValue : null
    }
  }
}
</script>
<style lang="sass">
  .asc__listPage
    .card-body
      padding-top: 0px
    .asc__listPage-Header
      margin: 5px 0
      font-size: 12px
      & h3
        font-size: 16px
        font-weight: 700
        background: #fff
        margin: 0px
        padding: 0px
        line-height: 36px
    .asc__listPage-Header-Dropdown
      margin: 0 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        width: 300px
        color: #333 !important
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-Search
      width: 200px
      margin: 0
      float: left
      & button
        font-size: 12px
        padding: 2px 5px
      & input
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-SelectRows
      width: 140px
      margin: 0 0px 0 0
      .asc__listPage-Header-SelectRows-overlay
        height: 300px
        overflow: auto
        padding: 0 15px
        margin-bottom: 10px
      .asc__listPage-Header-SelectRows-footer
        padding: 0 15px
      .dropdown-menu
        width: 230px
      .custom-control
        font-size: 12px
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        &::after
          float: right
          margin-top: 7px
      & input
        font-size: 12px
        padding: 5px 10px
    .dropdown-menu
      box-shadow: 0 0 10px #a2a2a2
      max-height: 400px
      overflow-x: hidden
      overflow-y: auto
      .dropdown-item
        width: 200px
        margin: 0px 10px 0px 10px
        color: #333 !important
        border-bottom: 1px #efefef solid
        font-size: 12px
        padding: 7px 10px
        &:hover
          background-color: #efefef
        & i
          padding: 2px
          color: #333
        & a
          color: #333
          display: block
      .active
        background-color: transparent
        & i
          padding: 2px
          background: #ffa300
          color: #fff
    .asc__listPage-Header-Download
      margin: 0 0 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        color: #333 !important
        font-size: 12px
        padding: 0.25rem 0.50rem
        // padding: 5px 10px
      .list-group-item
        border: none !important
        padding: 5px 0 !important
        &:hover
          background: #f2f2f2
          transition: .3s
      .card-title
        font-size: 1rem
        letter-spacing: -0.7px
        font-weight: bold
  .asc__modal-approveModal
    & h5
      border-bottom: 1px #ddd solid
      margin-bottom: 10px
    .asc__modal-approveModal-body
      padding: 30px 0
      & p
        text-align: center
        font-size: 16px
        padding: 0
        margin: 0
</style>
<style scope>
  .asc__general-btn-inTable {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 10px;
  }
</style>
<!--
<style lang="sass">
  .asc__showPage
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 99
    padding: 100px 40px
    background: rgba(0,0,0,.6)
    @media (max-width: 767px)
      padding: 65px 15px 20px 15px
    .asc__showPage-times
      position: absolute
      display: block
      top: 75px
      right: 23px
      z-index: 9999999999
      font-size: 21px
      background: #fff
      border-radius: 20px
      height: 20px
      width: 20px
      text-align: center
      line-height: 20px
      cursor: pointer
      @media (max-width: 767px)
        top: 45px
        right: 3px
    .asc__showPage-container
      background: #f2f2f2
      min-height: 90vh
      @media (max-width: 767px)
        height: 80vh
        overflow: auto
      & header
        display: block
        border-bottom: 2px #f6f6f6 solid
        padding: 10px 15px
        & h3
          display: inline-block
          font-size: 14px
          font-weight: bold
          margin: 0 30px 0 0
        & span
          margin-right: 15px
          & i
            color: #f29d2a
        & p
          display: inline-block
          padding: 0 30px 0 0
          margin: 0px
          & i
            color: #f29d2a
            margin-right: 5px
          & span
            font-weight: bold
      .tabs
        .nav-tabs
          background: #e4e4e4
          padding: 0px 15px
          border-bottom: 3px solid #f6f6f6
          .nav-item
            .active
              border-radius: 0px !important
              font-weight: bold
              font-size: 14px
            .nav-link
              color: #000
        .tab-pane
          padding: 1rem 15px
          background: #fbfbfb
          min-height: 60vh
      .asc__getPage-detailPart
        position: relative
        border: 2px #eaeaea solid
        border-radius: 3px
        border-bottom: 4px #eaeaea solid
        margin-bottom: 15px
        background: #fff
        & h3
          padding: 10px
          font-weight: bold
          border-bottom: 1px #ddd solid
          font-size: 16px !important
        & ul
          padding: 0px 0px 15px 0px
          list-style: none
          & li
            padding: 4px 10px
            width: 100%
            transition: .1s
            &:hover
              background: #efefef
              transition: .2s
            & span
              width: 60%
              float: right
              font-weight: bold
              @media (max-width: 1440px)
                width: 50%
              @media (max-width: 990px)
                width: 100%
        .far
          line-height: 22px
          color: #f29d2a
          width: 20px
          text-align: center
        .fas
          line-height: 22px
          color: #f29d2a
          width: 20px
          text-align: center
      .list-group-item
        border: none !important
        padding: 5px 0 !important
        &:hover
          background: #f2f2f2
          transition: .3s
      .card-title
        font-size: 1rem
        letter-spacing: -0.7px
        font-weight: bold
</style>
-->
