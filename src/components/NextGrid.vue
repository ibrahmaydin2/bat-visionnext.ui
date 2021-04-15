<template>
  <div class="asc__nextgrid">
    <span v-if="this.requiredFields && this.requiredFields.length > 0 && this.showRequiredInfo">{{`${this.requiredFields.map(x => x.label).join()} ${$t('list.requiredFieldsMessage')}`}}</span>
    <b-table-simple hover bordered small responsive class="asc__nextgrid-table">
      <b-thead>
        <draggable tag="tr" :list="head">
          <b-th
            v-for="header in head"
            :key="header.dataField"
            :style="header.width ? 'width:' + header.width : ''"
            :class="
              header.align == null ?
              'asc__nextgrid-table-header asc__nextgrid-table-header-' + header.columnType + ' text-left'
              :
              'asc__nextgrid-table-header asc__nextgrid-table-header-' + header.columnType + ' text-' + header.align"
          >
            <span class="asc__nextgrid-table-header-title grid-wrap-text">{{header.label}}{{header.label && header.required ? '*' : ''}}</span>
            <div v-if="header.allowSort !== false" class="asc__nextgrid-table-header-sort">
              <b-button
                @click="sortable(header.dataField, sort === 'ASC' ? 'DESC' : 'ASC')"
                size="sm"
                variant="light"
                class="py-0"
              >
                <i :class="sort === 'ASC' ? 'fas fa-sort-up' : 'fas fa-sort-down'" />
              </b-button>
            </div>
            <div class="asc__nextgrid-table-header-filter">
              <div v-if="header.modelControlUtil != null">
                <div v-if="header.modelControlUtil.inputType === 'AutoComplete'">
                  <autocomplete
                    @click="onClickAutoComplete(header.modelControlUtil)"
                    :search="onAutoCompleteSearch"
                    class="autocomplete-search"
                    :get-result-value="getResultValue"
                    @submit="handleSubmit(header.modelControlUtil.modelProperty, $event)"
                  />
                </div>
                <div v-else>
                  <v-select
                    v-if="header.modelControlUtil.isLookupTable"
                    label="Label"
                    :options="lookup[header.modelControlUtil.code]"
                    @input="selectedValue(header.modelControlUtil.modelProperty, $event, 'lookup')"
                    v-model="header.defaultValue"
                  >
                  </v-select>
                  <v-select
                    v-else
                    label="Description1"
                    :options="gridField[header.modelControlUtil.modelProperty]"
                    @input="selectedValue(header.modelControlUtil.modelProperty, $event, 'search')"
                    v-model="header.defaultValue"
                  >
                  </v-select>
                </div>
              </div>
              <v-select
                v-if="header.columnType === 'Boolean'"
                v-once
                v-model="header.defaultValue"
                :options="searchBoolean"
                @input="filterBoolean(header)"
                label="title"
              />
              <date-picker
                v-if="header.columnType === 'Date'"
                range
                type="date"
                :placeholder="getFormattedDate(header.defaultValue)"
                v-model="header.defaultValue"
                format="YYYY-MM-DD"
                value-type="format"
                @change="filterRangeDate(header.dataField, header.defaultValue)"
              ></date-picker>

              <date-picker
                v-if="header.columnType === 'DateTime'"
                range
                type="date"
                :placeholder="getFormattedDate(header.defaultValue)"
                v-model="header.defaultValue"
                format="YYYY-MM-DD"
                value-type="format"
                @change="filterRangeDate(header.dataField, header.defaultValue)"
              ></date-picker>

              <b-form-datepicker
                v-if="header.columnType === 'DateTime2'"
                v-once
                v-model="searchText"
                placeholder=""
                @input="filterDate(header.dataField, searchText)"
              />

              <b-form-input
                v-if="header.columnType === 'Time'"
                v-once
                v-mask="'##:##:##'"
                placeholder="00:00:00"
                v-model="searchText"
                @keydown.enter="filterTime(header.dataField, searchText)"
              />

              <b-form-input
                v-if="header.columnType === 'String'"
                v-once
                v-model="header.defaultValue"
                @keydown.enter="searchOnTable(header.dataField, header.defaultValue)"
                @input="setSearchQ(header.dataField, $event)"
              />

              <b-form-input
                v-if="header.columnType === 'Decimal'"
                v-once
                type="number"
                v-model="header.defaultValue"
                @keydown.enter="filterDecimal(header.dataField, header.defaultValue)"
              />

              <b-form-input
                v-if="header.columnType === 'Id'"
                v-once
                v-model="header.defaultValue"
                @keydown.enter="searchOnTable(header.dataField, header.defaultValue)"
              />
            </div>
          </b-th>
        </draggable>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, i) in items" :key="i" @click.native="selectRow(item)" :class="item.Selected ? 'row-selected' : '' || selectionMode === 'multi' ? 'multi-hover-class': ''">
          <b-td v-for="h in head" :key="h.dataField">
            <span v-if="h.columnType === 'selection'" class="d-block w-100">
              <i v-if="selectionMode === 'multi'" class="fa fa-check-circle" :class="item.Selected ? 'selected-color' : 'unselected-color'"></i>
            </span>
            <span v-if="h.columnType === 'operations'" class="d-block w-100">
              <b-dropdown v-if="tableOperations.RowActions.length >= 1" size="sm" variant="default" no-caret class="asc__nextgrid-dropdown-btn-p0">
                <template #button-content>
                  <i class="fas fa-th" />
                </template>
                <Actions :actions="tableOperations.RowActions" :row="item" @showModal="showModal" />
                <!-- <Workflow :items="workFlowList" :RecordId="item.RecordId" v-model="workFlowModel" /> -->
              </b-dropdown>
            </span>
            <span v-else-if="h.columnType === 'LabelValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'Label') }}
            </span>
            <span v-else-if="h.columnType === 'CodeValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'Code') }}
            </span>
            <span v-else-if="h.columnType === 'UpperValueValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'UpperValue')}}
            </span>
            <span v-else-if="h.columnType === 'ValueValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'Value')}}
            </span>
            <span v-else-if="h.columnType === 'DecimalValueValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'DecimalValue')}}
            </span>
            <span v-else-if="h.columnType === 'OtherPropertiesValue'" class="d-block w-100 grid-wrap-text">
              {{ labelFormat(item[h.dataField], 'OtherProperties')}}
            </span>

            <span v-else-if="h.columnType === 'Boolean'" class="w-100 d-block text-center">
              <i :class="item[h.dataField] === 0 ? 'fas fa-times text-danger' : 'fas fa-check text-success'" />
            </span>
            <span v-else-if="h.columnType === 'Date'" class="d-block w-100 grid-wrap-text">
              {{ dateFormat(item[h.dataField]) }}
            </span>
            <span v-else-if="h.columnType === 'DateTime'" class="d-block w-100 grid-wrap-text">
              {{ dateTimeformat(item[h.dataField]) }}
            </span>
            <span v-else-if="h.columnType === 'String'" class="d-block w-100 grid-wrap-text">
              {{ item[h.dataField] }}
            </span>
            <span v-else-if="h.columnType === 'Id'" class="d-block w-100 grid-wrap-text">
              <i>{{ item[h.dataField] }}</i>
            </span>
            <span v-else class="d-block w-100 grid-wrap-text">
              {{ item[h.dataField] }}
            </span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-row class="asc__nextgrid-table-footer" v-if="items && items.length > 0">
      <b-col cols="6">
        <b-dropdown :text="perPage + ' / ' + totalRowCount" size="sm">
          <b-dropdown-item v-for="p in perPageOpt" :key="'perpage' + p" @click="setPerPage(p)" active-class="dropdown-active">{{p}}</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col cols="6">
        <b-pagination-nav pills :link-gen="linkGen" :number-of-pages="totalPageCount" use-router variant="dark" class="float-right asc__nextgrid-paginationlinks" />
      </b-col>
    </b-row>
    <b-modal id="approve-reject-modal" ref="RejectModal" hide-footer hide-header>
      <PotentialCustomerRejectModal :modalAction="modalAction" :modalItem="modalItem" />
    </b-modal>
    <b-modal id="approve-modal" ref="ApproveModal" hide-footer hide-header>
      <PotentialCustomerApproveModal v-if="showPotentialCustomerApproveModal" :modalAction="modalAction" :modalItem="modalItem" />
    </b-modal>
    <ConfirmModal v-if="showConfirmModal" :modalAction="modalAction" :modalItem="modalItem" />
    <CustomConvertModal v-if="showCustomConvertModal" :modalAction="modalAction" :modalItem="modalItem" />
    <OrderConvertModal v-if="showConvertModal" :openModal="showConvertModal" :modalAction="modalAction" :modalItem="modalItem" />
    <SalesWaybillConvertModal v-if="showWaybillConvertModal" :modalAction="modalAction" :modalItem="modalItem" />
    <RmaConvertModal v-if="showRmaConvertModal" :modalAction="modalAction" :modalItem="modalItem" />
    <RmaInvoiceModal v-if="showRmaInvoiceModal" :modalAction="modalAction" :modalItem="modalItem" />
    <InvoiceConvertModal v-if="showInvoiceConvertModal" :modalAction="modalAction" :modalItem="modalItem" />
    <KmModal v-if="showKmModal" :modalAction="modalAction" :modalItem="modalItem" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../mixins/index'
import Workflow from './Workflow'
import ConfirmModal from './Actions/ConfirmModal'
import CustomConvertModal from './Actions/CustomConvertModal'
import OrderConvertModal from './Actions/OrderConvertModal'
import SalesWaybillConvertModal from './Actions/SalesWaybillConvertModal'
import RmaConvertModal from './Actions/RmaConvertModal'
import RmaInvoiceModal from './Actions/RmaInvoiceModal'
import InvoiceConvertModal from './Actions/InvoiceConvertModal'
import KmModal from './Actions/KmModal'
let searchQ = {}
export default {
  components: {
    Workflow,
    ConfirmModal,
    CustomConvertModal,
    OrderConvertModal,
    SalesWaybillConvertModal,
    RmaConvertModal,
    RmaInvoiceModal,
    KmModal,
    InvoiceConvertModal
  },
  props: {
    apiurl: String,
    apiparams: String,
    andConditionalModel: {
      type: Object,
      default: function () {
        return {}
      }
    },
    workFlowModel: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectionMode: {
      type: String,
      validator: (prop) => [
        'none',
        'single',
        'multi'
      ].includes(prop),
      default: 'none'
    }
  },
  mixins: [mixin],
  data () {
    return {
      grid: [],
      modalActionUrl: '',
      modalRecordId: '',
      modalRecord: '',
      modalQuery: '',
      modalQueryMessage: '',
      head: [],
      items: null,
      totalRowCount: null,
      totalPageCount: null,
      perPageOpt: [20, 50, 100],
      perPage: 20,
      currentPage: 1,
      searchText: null,
      tablefield: null,
      searched: null,
      sort: 'ASC',
      sortField: null,
      searchBoolean: [
        { value: 1, title: 'Aktif' },
        { value: 0, title: 'Pasif' }
      ],
      rangeDate: [],
      selectedHeader: null,
      workFlowList: [],
      selectedItems: [],
      requiredFields: [],
      showRequiredInfo: true,
      modalAction: null,
      modalItem: null,
      isGridFieldsReady: false,
      isLookupReady: false,
      showConvertModal: false,
      showWaybillConvertModal: false,
      showRmaConvertModal: false,
      showRmaInvoiceModal: false,
      showInvoiceConvertModal: false,
      showPotentialCustomerApproveModal: false,
      showCustomConvertModal: false,
      showConfirmModal: false,
      showKmModal: false
    }
  },
  mounted () {
    let sortOpt = {}
    // ön tanımlı olarak 20 kayıt gelir. eğer farklı bir değer seçilmişse onu belirtir.
    if (this.$route.query.count) {
      this.perPage = this.$route.query.count
    } else {
      this.perPage = 20
    }
    // ön tanımlı olarak 1. sayfa gelir. eğer farklı bir sayfa istenmişse onu belirtir.
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    } else {
      this.currentPage = 1
      this.$route.query.page = 1
    }
    // ön tanımlı olarak sıralama gönderilmez. eğer varsa query alınacak.
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort
      this.sortField = this.$route.query.field
      sortOpt = {
        table: this.sortField,
        sort: this.sort
      }
    } else {
      sortOpt = null
    }
    if (!this.andConditionalModel) {
      this.andConditionalModel = {}
    }
    searchQ = {}
    this.getData(this.$route.name, this.currentPage, this.perPage, sortOpt, true)
    this.getWorkflowData()
    this.$store.commit('setSelectedTableRows', [])
  },
  computed: {
    ...mapState(['tableData', 'tableOperations', 'tableRows', 'nextgrid', 'gridField', 'lookup'])
  },
  methods: {
    getWorkflowData () {
      let request = {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_Customer'
      }
      this.$api.post(request, 'Workflow', 'Workflow/GetWorkflowList').then((res) => {
        this.workFlowList = res.ListModel.BaseModels
      })
    },
    showModal (action, row) {
      this.modalAction = action
      this.modalItem = row
      this.showConvertModal = false
      this.showCustomConvertModal = false
      this.showWaybillConvertModal = false
      this.showRmaConvertModal = false
      this.showRmaInvoiceModal = false
      this.showPotentialCustomerApproveModal = false
      this.showPotentialCustomerRejectModal = false
      this.showConfirmModal = false
      this.showKmModal = false

      if (action.Action === 'RejectPotentialCustomer' || action.Action === 'ApprovePotentialCustomer') {
        if (row.ApproveStateId !== 51) {
          this.$toasted.show(this.$t('index.errorApproveStateModal'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
      }

      if (action.Action === 'ApprovePotentialCustomer') {
        this.showPotentialCustomerApproveModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'approve-modal')
        })
      } else if (action.Action === 'RejectPotentialCustomer') {
        this.$root.$emit('bv::show::modal', 'approve-reject-modal')
      } else if (action.Action === 'CustomConvert') {
        this.showCustomConvertModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'customConvertModal')
        })
      } else if (action.Action === 'OrderConvert') {
        if (row && typeof row.StatusId !== 'undefined' && row.StatusId !== 2) {
          this.$toasted.show(this.$t('index.errorSevk'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.showConvertModal = true
        this.$nextTick(() => {
          this.$bvModal.show('orderConvertModal')
        })
      } else if (action.Action === 'WaybillConvert') {
        this.showWaybillConvertModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'salesWaybillConvertModal')
        })
      } else if (action.Action === 'KmModal') {
        this.showKmModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'kmModal')
        })
      } else {
        this.showConfirmModal = true
        this.$nextTick(() => {
          this.$root.$emit('bv::show::modal', 'confirmModal')
        })
      }
      // if (action.Action === 'RmaConvert') {
      //   this.showRmaConvertModal = true
      //   this.$nextTick(() => {
      //     this.$root.$emit('bv::show::modal', 'rmaConvertModal')
      //   })
      //   return
      // }
      // if (action.Action === 'RmaInvoice') {
      //   this.showRmaInvoiceModal = true
      //   this.$nextTick(() => {
      //     this.$root.$emit('bv::show::modal', 'rmaInvoiceModal')
      //   })
      //   return
      // }
      // if (action.Action === 'PurchaseInvoiceConvert') {
      //   this.showInvoiceConvertModal = true
      //   this.$nextTick(() => {
      //     this.$root.$emit('bv::show::modal', 'invoiceConvertModal')
      //   })
      //   return
      // }
    },
    dateTimeformat (e) {
      let calendar, date
      if (e != null) {
        calendar = e.split('T')
        date = calendar[0].split('-')
        return date[2] + '-' + date[1] + '-' + date[0] + ' ' + calendar[1]
      }
    },
    dateFormat (e) {
      return e
    },
    labelFormat (e, type) {
      if (e == null) {
        return ''
      } else {
        return e[type]
      }
    },
    linkGen (pageNum) {
      let paginationQ = ''
      const rt = this.$route.query
      if (rt.search) {
        paginationQ += `&search=${rt.search}&where=${rt.where}`
      }
      if (rt.sort) {
        paginationQ += `&field=${rt.field}&sort=${rt.sort}`
      }
      if (rt.count) {
        paginationQ += `&count=${rt.count}`
      }
      return `?page=${pageNum}${paginationQ}`
    },
    setPerPage (p) {
      this.perPage = p
      if (this.$route.query.sort) {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'count': p, 'field': this.$route.query.field, 'sort': this.$route.query.sort}})
      } else {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'count': p}})
      }
    },
    sortable (field, sort) {
      this.sort = sort
      this.sortField = field
      const rt = this.$route.query
      let routeQ = {}
      routeQ['page'] = 1
      if (rt.search) {
        routeQ['search'] = rt.search
        routeQ['where'] = rt.where
      }
      if (rt.count) {
        routeQ['count'] = rt.count
      }
      routeQ['field'] = this.sortField
      routeQ['sort'] = this.sort
      this.$router.push({name: this.$route.name, query: routeQ})
    },
    filterAutocomplete (e) {
      this.searchOnTable(e, this.searchText.id)
    },
    filterBoolean (e) {
      let search = e.defaultValue ? e.defaultValue.value : ''
      this.searchOnTable(e.dataField, search)
    },
    filterDate (e, date) {
      let model = {
        Value: this.dateConvertToISo(date)
      }
      this.searchOnTable()
      this.andConditionalModel[e] = model
      this.searchOnTable()
    },
    filterRangeDate (e, date) {
      let model = {
        BeginValue: this.dateConvertToISo(date[0]),
        EndValue: this.dateConvertToISo(date[1])
      }
      this.andConditionalModel[e] = model
      this.currentPage = 1
      this.searchOnTable()
    },
    filterTime (e, time) {
      this.searchOnTable(e, time)
    },
    filterLabel (e, i) {
      this.searchOnTable(`${e}Ids`, [i.RecordId])
    },
    filterDecimal (e, i) {
      this.searchOnTable(e, {value: parseFloat(i)})
    },
    selectedValue (label, model, type) {
      if (model) {
        this.currentPage = 1
        if (!this.andConditionalModel) {
          this.andConditionalModel = {}
        }
        if (type === 'lookup') {
          this.andConditionalModel[label] = [model.DecimalValue]
        } else {
          this.andConditionalModel[label] = [model.RecordId]
        }
        this.searchOnTable()
      } else {
        delete this.andConditionalModel[label]
        this.searchOnTable()
      }
    },
    onAutoCompleteSearch (input) {
      if (input.length < 3) { return [] }
      let pagerecordCount = input.includes('%') ? 20 : 100
      const andConditionModel = input === '%%%' ? {} : {
        Description1: input.replaceAll('%', '')
      }
      return this.$store.dispatch('getAutoGridFields', {...this.query, serviceUrl: this.selectedHeader.serviceUrl, val: this.selectedHeader.modelProperty, model: andConditionModel, pagerecordCount: pagerecordCount}).then((res) => {
        return res
      })
    },
    getResultValue (result) {
      return result.Description1
    },
    handleSubmit (label, model) {
      if (model) {
        this.currentPage = 1
        if (!this.andConditionalModel) {
          this.andConditionalModel = {}
        }
        this.andConditionalModel[label] = [model.RecordId]
        this.searchOnTable()
      } else {
        delete this.andConditionalModel[label]
        this.searchOnTable()
      }
    },
    searchOnTable (tableField, search) {
      if (search || search === 0) {
        this.currentPage = 1
      }
      let validCount = 0
      this.requiredFields.forEach(r => {
        if (searchQ[r.field] || this.andConditionalModel[r.field] || this.andConditionalModel[`${r.field}Ids`]) {
          validCount++
        }
      })
      if (validCount < this.requiredFields.length) {
        this.$store.commit('bigLoaded', false)
        return
      }
      this.showRequiredInfo = false
      if ((search && search !== '') || search === 0) {
        searchQ[tableField] = search
      } else {
        delete searchQ[tableField]
      }
      this.$store.dispatch('getTableData', {
        ...this.query,
        apiUrl: this.apiurl,
        api: this.$route.name,
        page: this.currentPage,
        count: this.perPage,
        search: searchQ,
        andConditionalModel: this.andConditionalModel
      })
    },
    getData (e, p, c, s, requiredFieldsError) {
      this.$store.dispatch('getTableOperations', {
        ...this.query,
        apiUrl: this.apiurl,
        def: this.apiparams,
        api: e,
        page: parseInt(p),
        count: parseInt(c),
        sort: s,
        code: this.$route.query.code,
        andConditionalModel: this.andConditionalModel,
        requiredFieldsError: requiredFieldsError
      })
    },
    closeApproveModal () {
      this.$root.$emit('bv::hide::modal', 'approve-modal')
      this.$root.$emit('bv::hide::modal', 'approve-reject-modal')
    },
    onClickAutoComplete (header) {
      this.selectedHeader = header
    },
    isSelectable () {
      return this.selectionMode === 'single' || this.selectionMode === 'multi'
    },
    selectRow (item) {
      if (this.selectionMode === 'multi') {
        item.Selected = !item.Selected
        let includedItems = this.selectedItems.filter(s => s.RecordId === item.RecordId)
        if (includedItems && includedItems.length > 0) {
          this.selectedItems.splice(this.selectedItems.indexOf(includedItems[0]), 1)
        } else {
          this.selectedItems.push(item)
        }
        this.$forceUpdate()
      } else if (this.selectionMode === 'single') {
        this.items.map(i => {
          i.Selected = false
          return i
        })
        item.Selected = true
        this.selectedItems = [item]
        this.$forceUpdate()
      }
      this.$store.commit('setSelectedTableRows', this.selectedItems)
    },
    setDefaultValues (visibleRows) {
      if (!this.andConditionalModel) {
        this.andConditionalModel = {}
      }
      var me = this
      for (let i = 0; i < visibleRows.length; i++) {
        let row = visibleRows[i]
        if (!row.defaultValue) {
          continue
        }
        if (row.modelControlUtil !== null) {
          if (typeof row.defaultValue === 'object') {
            continue
          }
          let value = parseInt(row.defaultValue)
          if (row.modelControlUtil.inputType === 'AutoComplete') {
            me.andConditionalModel[row.modelControlUtil.modelProperty] = [value]
          } else {
            this.andConditionalModel[row.modelControlUtil.modelProperty] = [value]
            if (row.modelControlUtil.inputType === 'DropDown' && me.gridField && me.gridField[row.modelControlUtil.modelProperty]) {
              row.defaultValue = me.gridField[row.modelControlUtil.modelProperty].find(l => l.RecordId === value)
            }
            if (row.modelControlUtil.isLookupTable && me.lookup && me.lookup[row.modelControlUtil.code]) {
              row.defaultValue = me.lookup[row.modelControlUtil.code].find(l => l.DecimalValue === value)
            }
          }
        } else {
          switch (row.columnType) {
            case 'Boolean':
              if (row.defaultValue && typeof row.defaultValue !== 'object') {
                let value = parseInt(row.defaultValue)
                row.defaultValue = me.searchBoolean.find(b => b.value === value)
                searchQ[row.dataField] = value
              }
              break
            case 'Date':
            case 'DateTime':
              if (row.defaultValue && typeof row.defaultValue !== 'object') {
                let model = {}
                let today = new Date()
                let lastDayOfMonth = me.dateConvertToISo(new Date(today.getFullYear(), today.getMonth() + 1, 0))
                switch (row.defaultValue) {
                  case 'first':
                    model.BeginValue = me.dateConvertToISo(today.setDate(1))
                    model.EndValue = lastDayOfMonth
                    break
                  case 'last':
                    model.BeginValue = lastDayOfMonth
                    model.EndValue = lastDayOfMonth
                    break
                  case 'today':
                    model.BeginValue = me.dateConvertToISo(today)
                    model.EndValue = me.dateConvertToISo(today)
                    break
                }
                row.defaultValue = [model.BeginValue, model.EndValue]
                me.andConditionalModel[row.dataField] = model
              }
              break
            case 'String':
            case 'Id':
            case 'Decimal':
              searchQ[row.dataField] = row.defaultValue
              break
          }
        }
        visibleRows[i] = row
      }
      return visibleRows
    },
    setRows () {
      let lookups = ''
      let hasAnyDropdown = false
      this.tableRows.forEach(c => {
        let control = c.modelControlUtil
        if (control != null && control.inputType === 'DropDown') {
          if (control.isLookupTable) {
            lookups += control.code + ','
          } else {
            hasAnyDropdown = true
            this.$store.dispatch('getGridFields', {...this.query, serviceUrl: control.serviceUrl, val: control.modelProperty}).then(() => {
              this.isGridFieldsReady = true
            })
          }
        }
      })
      if (!hasAnyDropdown) {
        this.isGridFieldsReady = true
      }
      if (lookups.length > 0) {
        lookups = lookups.slice(0, -1)
        this.$store.dispatch('getAllLookups', {...this.query, type: lookups}).then(() => {
          this.isLookupReady = true
        })
      } else {
        this.isLookupReady = true
      }
    },
    setRowsAfter () {
      if (!this.isGridFieldsReady || !this.isLookupReady) {
        return
      }
      this.head = []
      let visibleRows = this.tableRows.filter(item => item.visible === true)
      visibleRows = this.setDefaultValues(visibleRows)
      this.requiredFields = visibleRows.filter(v => v.required === true).map(x => {
        let requiredField = {
          field: x.dataField,
          label: x.label
        }
        return requiredField
      })
      const selection = { columnType: 'selection', dataField: null, label: null, width: '30px', allowHide: false, allowSort: false }
      const opt = { columnType: 'operations', dataField: null, label: null, width: '30px', allowHide: false, allowSort: false }
      if (this.selectionMode === 'multi') {
        this.head.push(selection)
      }
      this.head.push(opt)
      for (let t = 0; t < visibleRows.length; t++) {
        let row = visibleRows[t]
        this.head.push(row)
      }
      this.searchOnTable()
    },
    getFormattedDate (defaultValue) {
      return defaultValue && defaultValue.length === 2 && defaultValue[0] && defaultValue[0].slice && defaultValue[1] && defaultValue[1].slice ? `${defaultValue[0].slice(0, 10)} - ${defaultValue[1].slice(0, 10)}` : ''
    },
    setSearchQ (tableField, model) {
      searchQ[tableField] = model
    }
  },
  watch: {
    $route (to, from) {
      // sayfa değişikliklerini yakalamak ve içeriği güncellemek için bu bölüm şarttır.
      let sortOpt = {}
      if (to.query.count) {
        this.perPage = parseInt(to.query.count)
      } else {
        this.perPage = 20
      }
      if (to.query.page) {
        this.currentPage = parseInt(to.query.page)
      } else {
        this.currentPage = 1
      }
      if (to.query.sort) {
        this.sort = to.query.sort
        this.sortField = to.query.field
        sortOpt = {
          table: this.sortField,
          sort: this.sort
        }
      } else {
        sortOpt = null
      }
      let validCount = 0
      this.requiredFields.forEach(r => {
        if (searchQ[r.field] || this.andConditionalModel[r.field]) {
          validCount++
        }
      })
      let requiredFieldsError = validCount < this.requiredFields.length
      this.getData(to.name, this.currentPage, this.perPage, sortOpt, requiredFieldsError)
    },
    tableRows: function (e) {
      this.setRows()
    },
    nextgrid: function (e) {
      // tablo datası yeniden yüklendiğinde bu bölüm çalıştırılacak.
      if (e === true) {
        this.currentPage = this.tableData.CurrentPage
        this.items = this.tableData.BaseModels
        this.totalRowCount = this.tableData.TotalRowCount
        this.totalPageCount = this.tableData.TotalPageCount
        this.perPage = this.tableData.PageRecordCount
      }
    },
    isGridFieldsReady: function (e) {
      this.setRowsAfter()
    },
    isLookupReady: function (e) {
      this.setRowsAfter()
    }
  }
}

</script>
<style lang="sass">
  .asc__nextgrid
    position: relative
    height: 85vh
    .asc__nextgrid-table
      height: 81vh
      max-height: inherit
      margin-bottom: 0px
      .multi-hover-class
        &:hover
          cursor: pointer !important
      .autocomplete-search
        .autocomplete
          text-align: center
        .autocomplete-input
          outline: none
          padding-left: 10px
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+)
          background-repeat: no-repeat
          background-position: center right 10px
          background-size: 16px
          background-color: white
          border-radius: 5px
          border: solid 1px lightgray
        input::-webkit-input-placeholder
          color: #656665
          text-transform: initial !important
        .autocomplete-result-list
          line-height: 1.15
          padding: 0
          margin-top: 5px
        .autocomplete-result
          cursor: pointer
          padding: 10px
          text-align: left
          border-bottom: 0.5px solid rgba(0,0,0,.16)
          background: none
    .router-link-exact-active
      background: #007bff
      color: #fff
    .dropdown-menu
      font-size: 12px
    .asc__nextgrid-dropdown-btn-p0
      .dropdown-toggle
        padding: 0px 5px
    .asc__nextgrid-paginationlinks
      & a
        color: #000
      .router-link-exact-active
        background-color: #fc9e01
        border-color: #f99a03
    .asc__nextgrid-table-header-LabelValue
      min-width: 100px
    .asc__nextgrid-table-header-Boolean
      width: 120px
    .asc__nextgrid-table-header-Date
      min-width: 100px
    .asc__nextgrid-table-header-DateTime
      min-width: 100px
    .asc__nextgrid-table-header-String
      min-width: 100px
    .asc__nextgrid-table-header-Id
      width: 120px
    .asc__nextgrid-table-header
      background: #f2f2f2
      top: -3px !important
      .asc__nextgrid-table-header-title
        display: inline-block
        cursor: move
      .asc__nextgrid-table-header-sort
        display: block
        cursor: pointer
        position: absolute
        top: 5px
        right: 5px
        z-index: 2
        & button
          color: #8a8a8a
          background: none
          border: none
        .asc__nextgrid-table-header-sort-active
          color: #000
      .asc__nextgrid-table-header-filter
        position: relative
        input
          height: 28px
    .asc__nextgrid-table-footer
      padding: 10px 0 0 0
      height: 50px
      margin: auto
      width: 100%
      background: #f2f2f2
      .dropdown-toggle
        background: #ffffff
        color: #000
        border-color: #dee2e6
    .row-selected
      background-color: rgb(222, 226, 230)
      border: solid 2px
      border-color: darkgray
      &:hover
        cursor: pointer
    .selected-color
      color: #28a745
    .unselected-color
      color: lightgray
    .grid-wrap-text
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      max-width: 200px
      min-width: 50px
</style>
