<template>
  <div class="asc__nextgrid">
    <b-table-simple hover bordered small responsive sticky-header class="asc__nextgrid-table">
      <b-thead>
        <draggable v-model="head" tag="tr">
          <b-th width="30" class="asc__nextgrid-table-header">
            &nbsp;
          </b-th>
          <b-th v-for="(h, i) in tableRows.filter(item => item.visible === true)" :key="'head' + i" :class="h.align == null ? 'text-left' : 'text-' + h.align" class="asc__nextgrid-table-header">
            <span class="asc__nextgrid-table-header-title">{{h.label}}</span>
            <div class="asc__nextgrid-table-header-sort">
              <b-button
                v-if="sort != 'DESC'"
                @click="sortable(h.dataField, 'DESC')"
                size="sm"
                variant="light"
                class="py-0"
              >
                <i class="fas fa-sort-up" />
              </b-button>
              <b-button
                v-if="sort != 'ASC'"
                @click="sortable(h.dataField, 'ASC')"
                size="sm"
                variant="light"
                class="py-0"
              >
                <i class="fas fa-sort-down" />
              </b-button>
            </div>
            <b-form-input class="asc__nextgrid-table-header-search d-none" v-model="searchText" v-once @keydown.enter="searchOnTable(h.dataField, searchText)" />
          </b-th>
        </draggable>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(r, x) in items" :key="'r' + x">
          <b-td>
            <b-dropdown size="sm" variant="default" no-caret class="asc__nextgrid-dropdown-btn-p0">
              <template #button-content>
                <i class="fas fa-th" />
              </template>
              <b-dropdown-item v-for="(opt, x) in tableOperations.RowActions" :key="'opt' + x">
                <i class="far fa-circle" /> {{ opt.Title }}
              </b-dropdown-item>
              <!--<b-dropdown-divider />-->
            </b-dropdown>
          </b-td>
          <b-td v-for="(h, y) in tableRows.filter(item => item.visible === true)" :key="'row' + y" :class="h.align == null ? 'text-left' : 'text-' + h.align">
            <!-- eğer value gönderirlerse bu fonksiyonu çalıştırıcaz.
            <template v-if="h.value">
              {{ r[h.dataField][h.value] }}
            </template>-->
            <span v-if="h.columnType === 'LabelValue'" class="d-block w-100">
              {{ labelFormat(r[h.dataField]) }}
            </span>
            <span v-if="h.columnType === 'Boolean'" class="w-100 d-block text-center">
              <i :class="r[h.dataField] === 0 ? 'fas fa-times text-danger' : 'fas fa-check text-success'" />
            </span>
            <span v-if="h.columnType === 'Date'" class="d-block w-100">
              {{ dateFormat(r[h.dataField]) }}
            </span>
            <span v-if="h.columnType === 'DateTime'" class="d-block w-100">
              {{ dateTimeformat(r[h.dataField]) }}
            </span>
            <span v-if="h.columnType === 'String'" class="d-block w-100">
              {{ r[h.dataField] }}
            </span>
            <span v-if="h.columnType === 'Id'" class="d-block w-100">
              <i>{{ r[h.dataField] }}</i>
            </span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

      <b-row class="asc__nextgrid-table-footer">
        <b-col cols="6">
          <b-dropdown :text="perPage + ' / ' + totalRowCount" size="sm">
            <b-dropdown-item v-for="p in perPageOpt" :key="p" @click="setPerPage(p)" active-class="dropdown-active">{{p}}</b-dropdown-item>
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
  data () {
    return {
      head: null,
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
      whereSort: null
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
      this.currentPage = this.$route.query.page
    } else {
      this.currentPage = 1
    }
    // ön tanımlı olarak sıralama gönderilmez. eğer varsa query alınacak.
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort
      this.whereSort = this.$route.query.where
      sortOpt = {
        table: this.whereSort,
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
      calendar = e.split('T')
      date = calendar[0].split('-')
      return date[2] + '-' + date[1] + '-' + date[0] + ' ' + calendar[1]
    },
    dateFormat (e) {
      return e
    },
    labelFormat (e) {
      if (e == null) {
        return ''
      } else {
        return e.Label
      }
    },
    linkGen (pageNum) {
      // sayfadaki kayıt sayısı veya sıralama belirtilmişse o kadar datayı çağırır. belirtilmemişse default değer gelir.
      if ((this.$route.query.count) && (this.$route.query.sort)) {
        return `?page=${pageNum}&count=${this.$route.query.count}&where=${this.$route.query.where}&sort=${this.$route.query.sort}`
      } else if ((this.$route.query.count) && (!this.$route.query.sort)) {
        return `?page=${pageNum}&count=${this.$route.query.count}`
      } else if ((!this.$route.query.count) && (this.$route.query.sort)) {
        return `?page=${pageNum}&where=${this.$route.query.where}&sort=${this.$route.query.sort}`
      } else {
        return `?page=${pageNum}`
      }
    },
    setPerPage (p) {
      this.perPage = p
      if (this.$route.query.sort) {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'count': p, 'where': this.$route.query.where, 'sort': this.$route.query.sort}})
      } else {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'count': p}})
      }
    },
    sortable (field, sort) {
      this.sort = sort
      this.whereSort = field
      if (this.$route.query.count) {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'count': this.$route.query.count, 'where': field, 'sort': sort}})
      } else {
        this.$router.push({name: this.$route.name, query: {'page': 1, 'where': field, 'sort': sort}})
      }
    },
    searchOnTable (tableField, search) {
      // bu fonksiyon için servis henüz üretilmedi.
      this.tablefield = tableField
      this.searched = search

      let urlquery = []
      if (this.$route.query.count) {
        urlquery.push({count: this.$route.query.count})
      }
      if (this.$route.query.page) {
        urlquery.push({page: this.$route.query.page})
      }
      if (this.$route.query.sort) {
        urlquery.push({sort: this.$route.query.sort})
      }
      console.log(urlquery)
      // this.$router.push({name: this.$route.name, query: urlquery})
    },
    getData (e, p, c, s) {
      this.$store.dispatch('getTableData', {...this.query, url: 'VisionNext' + e + '/api/' + e + '/Search', page: parseInt(p), count: parseInt(c), sort: s})
      this.$store.dispatch('getTableOperations', {...this.query, url: 'VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields', params: '?name=' + e})
    }
  },
  watch: {
    $route (to, from) {
      // sayfa değişikliklerini yakalamak ve içeriği güncellemek için bu bölüm şarttır.
      let sortOpt = {}
      if (to.query.count) {
        this.perPage = to.query.count
      } else {
        this.perPage = 20
      }
      if (to.query.page) {
        this.currentPage = to.query.page
      } else {
        this.currentPage = 1
      }
      if (to.query.sort) {
        this.sort = to.query.sort
        this.whereSort = to.query.where
        sortOpt = {
          table: this.whereSort,
          sort: this.sort
        }
      } else {
        sortOpt = null
      }
      this.getData(to.name, this.currentPage, this.perPage, sortOpt)
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
    .asc__nextgrid-table-header
      background: #f2f2f2
      top: -3px !important
      .asc__nextgrid-table-header-search
      .asc__nextgrid-table-header-title
        display: inline-block
        cursor: move
      .asc__nextgrid-table-header-sort
        display: inline-block
        float: right
        cursor: pointer
        & button
          color: #8a8a8a
          background: none
          border: none
        .asc__nextgrid-table-header-sort-active
          color: #000
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
