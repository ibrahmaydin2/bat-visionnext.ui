<template>
  <div class="asc__nextgrid">
    <b-table-simple hover bordered small responsive sticky-header class="asc__nextgrid-table">
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
            <span class="asc__nextgrid-table-header-title">{{header.label}}</span>
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
              <v-select
                v-if="header.columnType === 'LabelValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>
              <v-select
                v-if="header.columnType === 'CodeValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>

              <v-select
                v-if="header.columnType === 'UpperValueValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>

              <v-select
                v-if="header.columnType === 'ValueValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>

              <v-select
                v-if="header.columnType === 'DecimalValueValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>

              <v-select
                v-if="header.columnType === 'OtherPropertiesValue'"
                v-once
                label="title"
                @open="onOpen(header.dataField, items)"
                @click="filterAutocomplete(items)"
                disabled
              >
              </v-select>

              <!--<v-select
                v-if="header.columnType === 'LabelValue'"
                v-once
                disabled
                v-model="VehicleName"
                label="VehiclePlateNumber"
                :filterable="false"
                :options="vehicleList"
                @search="onVehicleSearch"
                @input="selectedVehicle"
              >
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.VehiclePlateNumber }}
                </template>
              </v-select>-->

              <v-select
                v-if="header.columnType === 'Boolean'"
                v-once
                v-model="searchText"
                :options="searchBoolean"
                @input="filterBoolean(header.dataField)"
                label="title"
              />

              <b-form-datepicker
                v-if="header.columnType === 'Date'"
                v-once
                v-model="searchText"
                placeholder=""
                @input="filterDate(header.dataField, searchText)"
              />

              <b-form-datepicker
                v-if="header.columnType === 'DateTime'"
                v-once
                v-model="searchText"
                placeholder=""
                @input="filterDate(header.dataField, searchText)"
              />

              <b-form-input
                v-if="header.columnType === 'String'"
                v-once
                v-model="searchText"
                @keydown.enter="searchOnTable(header.dataField, searchText)"
              />

              <b-form-input
                v-if="header.columnType === 'Id'"
                v-once
                v-model="searchText"
                @keydown.enter="searchOnTable(header.dataField, searchText)"
              />
            </div>
          </b-th>
        </draggable>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in items" :key="'item' + item.Code">
          <b-td v-for="h in head" :key="h.dataField">
            <!-- eğer value gönderirlerse bu fonksiyonu çalıştırıcaz.
            <template v-if="h.value">
              {{ item[h.dataField][h.value] }}
            </template>-->
            <span v-if="h.columnType === 'operations'" class="d-block w-100">
              <b-dropdown size="sm" variant="default" no-caret class="asc__nextgrid-dropdown-btn-p0">
                <template #button-content>
                  <i class="fas fa-th" />
                </template>
                <b-dropdown-item v-for="(opt, x) in tableOperations.RowActions" :key="'opt' + x">
                  <router-link :to="{name: $route.name + opt.Action, params: {url: item.RecordId}}">
                    <i class="far fa-circle" /> {{ opt.Title }}
                  </router-link>
                </b-dropdown-item>
              </b-dropdown>
            </span>
            <span v-else-if="h.columnType === 'LabelValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'Label') }}
            </span>
            <span v-else-if="h.columnType === 'CodeValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'Code') }}
            </span>
            <span v-else-if="h.columnType === 'UpperValueValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'UpperValue')}}
            </span>
            <span v-else-if="h.columnType === 'ValueValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'Value')}}
            </span>
            <span v-else-if="h.columnType === 'DecimalValueValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'DecimalValue')}}
            </span>
            <span v-else-if="h.columnType === 'OtherPropertiesValue'" class="d-block w-100">
              {{ labelFormat(item[h.dataField], 'OtherProperties')}}
            </span>

            <span v-else-if="h.columnType === 'Boolean'" class="w-100 d-block text-center">
              <i :class="item[h.dataField] === 0 ? 'fas fa-times text-danger' : 'fas fa-check text-success'" />
            </span>
            <span v-else-if="h.columnType === 'Date'" class="d-block w-100">
              {{ dateFormat(item[h.dataField]) }}
            </span>
            <span v-else-if="h.columnType === 'DateTime'" class="d-block w-100">
              {{ dateTimeformat(item[h.dataField]) }}
            </span>
            <span v-else-if="h.columnType === 'String'" class="d-block w-100">
              {{ item[h.dataField] }}
            </span>
            <span v-else-if="h.columnType === 'Id'" class="d-block w-100">
              <i>{{ item[h.dataField] }}</i>
            </span>
            <span v-else class="d-block w-100">
              {{ item[h.dataField] }}
            </span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-row class="asc__nextgrid-table-footer">
      <b-col cols="6">
        <b-dropdown :text="perPage + ' / ' + totalRowCount" size="sm">
          <b-dropdown-item v-for="p in perPageOpt" :key="'perpage' + p" @click="setPerPage(p)" active-class="dropdown-active">{{p}}</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col cols="6">
        <b-pagination-nav pills :link-gen="linkGen" :number-of-pages="totalPageCount" use-router variant="dark" class="float-right asc__nextgrid-paginationlinks" />
      </b-col>
      <!-- <b-col cols="6">
        aranan tablo: {{tablefield}}, aranan kelime: {{searched}}
      </b-col> -->
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['apiurl'],
  data () {
    return {
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
      ]
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
    this.getData(this.$route.name, this.currentPage, this.perPage, sortOpt)
  },
  computed: {
    ...mapState(['tableData', 'tableOperations', 'tableRows', 'nextgrid'])
  },
  methods: {
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

      // if (this.$route.query.count) {
      //   this.$router.push({name: this.$route.name, query: {'page': 1, 'count': this.$route.query.count, 'field': field, 'sort': sort}})
      // } else {
      //   this.$router.push({name: this.$route.name, query: {'page': 1, 'field': field, 'sort': sort}})
      // }
    },
    filterBoolean (e) {
      this.searchOnTable(e, this.searchText.value)
    },
    filterDate (e, date) {
      this.searchOnTable(e, date)
    },
    searchOnTable (tableField, search) {
      console.log(tableField, search)
      this.tablefield = tableField
      this.searched = search
      this.$router.push({name: this.$route.name, query: {page: 1, search: search, where: tableField}})
      this.searchText = null
    },
    // onVehicleSearch (search, loading) {
    //   if (search.length >= 3) {
    //     this.searchVehicle(loading, search, this)
    //   }
    // },
    // searchVehicle (loading, search, vm) {
    //   this.$store.dispatch('acVehicle', {...this.query, searchField: 'VehiclePlateNumber', searchText: search})
    // },
    getData (e, p, c, s) {
      /*
        DİKKAT
        1. versiyonda iki fonksiyon birlikte çalışıyordu ancak bu problemlere sebep oluyordu.
        bu versiyonda önce tableOperations çağırılıyor ve sonrasında tableData çalıştırılıyor.
        getTableData fonksiyonu devredışı.
      */
      // this.$store.dispatch('getTableData', {...this.query, url: 'VisionNext' + e + '/api/' + e + '/Search', page: parseInt(p), count: parseInt(c), sort: s})
      this.$store.dispatch('getTableOperations', {
        ...this.query,
        apiUrl: this.apiurl,
        api: e,
        page: parseInt(p),
        count: parseInt(c),
        sort: s,
        where: this.$route.query.where,
        search: this.$route.query.search
      })
    }
  },
  watch: {
    $route (to, from) {
      console.log('nextgrid')
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
      this.getData(to.name, this.currentPage, this.perPage, sortOpt)
    },
    tableRows: function (e) {
      this.head = []
      const visibleRows = e.filter(item => item.visible === true)
      const opt = { columnType: 'operations', dataField: null, label: null, width: '30px', allowHide: false, allowSort: false }
      this.head.push(opt)
      for (let t = 0; t < visibleRows.length; t++) {
        this.head.push(visibleRows[t])
      }
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
</style>
