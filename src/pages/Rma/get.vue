<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.RMA.RMA')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.RMA.Customer')"></div>
              <div v-html="getFormatDataByType(rowData.Warehouse, 'object', 'get.RMA.Warehouse')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.RMA.Representative')"></div>
              <div v-html="getFormatDataByType(RmaStatus, 'object', 'get.RMA.RmaStatus')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveEmployee, 'object', 'get.RMA.ApproveEmployee')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveNumber, 'text', 'get.RMA.ApproveNumber')"></div>
              <div v-html="getFormatDataByType(RmaType, 'object', 'get.RMA.RmaType')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ApproveDate, 'date', 'get.RMA.ApproveDate')"></div>
              <div v-html="getFormatDataByType(rowData.PriceDate, 'date', 'get.RMA.PriceDate')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'get.RMA.Genexp1')"></div>
              <div v-html="getFormatDataByType(rowData.RmaDate, 'date', 'get.RMA.RmaDate')"></div>
              <div v-html="getFormatDataByType(rowData.GrvNumber, 'text', 'get.RMA.GrvNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.RMA.Route')"></div>
              <div v-html="getFormatDataByType(rowData.RmaReason, 'object', 'get.RMA.RmaReason')"></div>
            </b-card>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.RMA.ItemName')}}</span></b-th>
                    <b-th><span>{{$t('insert.RMA.Item')}}</span></b-th>
                    <b-th><span>{{$t('insert.RMA.Quantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                  <b-tr v-for="(w, i) in (rowData.RmaLines != null ? rowData.RmaLines.filter(f => f.RecordState !== 4) : [])" :key="i">
                      <b-td>{{w.Item.Label}}</b-td>
                      <b-td>{{w.Item.Code}}</b-td>
                      <b-td>{{w.Quantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      RmaStatus: {},
      RmaType: {}
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
    let allLookups = 'RMA_STATUS,RETURN_TYPE'
    this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
  },
  computed: {
    ...mapState(['rowData', 'style', 'lookup'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextRma/api/Rma', record: this.$route.params.url}).then(() => {
        this.rowData.RmaLines.sort(function (a, b) {
          return a.LineNumber - b.LineNumber
        })
        if (this.lookup.RMA_STATUS && this.lookup.RMA_STATUS.length > 0 && this.rowData.RmaStatusId > 0) {
          this.RmaStatus = this.lookup.RMA_STATUS.find(a => a.DecimalValue === this.rowData.RmaStatusId)
        }
        if (this.lookup.RETURN_TYPE && this.lookup.RETURN_TYPE.length > 0 && this.rowData.RmaTypeId > 0) {
          this.RmaType = this.lookup.RETURN_TYPE.find(a => a.DecimalValue === this.rowData.RmaTypeId)
        }
      })
    }
  }
}
</script>
