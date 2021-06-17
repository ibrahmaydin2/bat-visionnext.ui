<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.order.orderNumber')}}:</b> {{rowData.OrderNumber}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.order.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
        <b-col cols="6">
          <b-card  class="summary-card">
            <div class="summary-area">
              <span class="summary-title">{{$t('insert.order.netTotal')}}</span>
              <span class="summary-value text-muted">: {{rowData.NetTotal}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
              <span class="summary-title">{{$t('insert.order.vatTotal')}}</span>
              <span class="summary-value text-muted">: {{rowData.TotalVat}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
              <span class="summary-title">{{$t('insert.order.grossTotal')}}</span>
              <span class="summary-value text-muted">: {{rowData.GrossTotal}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.order.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'insert.order.documentDate')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentTime, 'text', 'insert.order.documentTime')"></div>
              <div v-html="getFormatDataByType(rowData.DueDate, 'date', 'insert.order.dueDate')"></div>
              <div v-html="getFormatDataByType(rowData.Warehouse, 'object', 'insert.order.warehouse')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.order.customer')"></div>
              <div v-html="getFormatDataByType(rowData.PriceList, 'object', 'insert.order.priceList')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp2, 'text', 'insert.order.genexp2')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'insert.order.documentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.order.description1')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'insert.order.currencyId')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.order.representative')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'insert.order.route')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'insert.order.vehicle')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.product')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.productCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.quantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.price')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.vatRate')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.netTotal')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.vatTotal')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.grossTotal')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(o, i) in rowData.OrderLines" :key="i">
                      <b-td>{{o.Item.Label}}</b-td>
                      <b-td>{{o.Item.Code}}</b-td>
                      <b-td>{{o.Quantity}}</b-td>
                      <b-td>{{o.Price}}</b-td>
                      <b-td>{{o.VatRate}}</b-td>
                      <b-td>{{o.NetTotal}}</b-td>
                      <b-td>{{o.TotalVat}}</b-td>
                      <b-td>{{o.GrossTotal}}</b-td>
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
    return {}
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextOrder/api/PurchaseOrder', record: this.$route.params.url})
    }
  }
}
</script>
<style scoped>
.summary-card {
  width: 240px;
  float: right;
  height: 90px;
  border: none;
}
.card-body  {
  padding: none !important;
}
.summary-title {
  width: 100px !important;
}
.summary-value {
   width: 75px !important;
   float:right
}
.summary-area {
  font-size: 10px !important;
}
.summary-hr {
  margin: 3px;
}
</style>
