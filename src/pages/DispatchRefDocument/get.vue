<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
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
            <span><i class="fas fa-code" />  <b>{{$t('insert.order.invoiceNumber')}}:</b> {{rowData.InvoiceNumber}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.order.enterWaybill')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'insert.order.documentDate')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentTime, 'text', 'insert.order.documentTime')"></div>
              <div v-html="getFormatDataByType(rowData.ActualDeliveryDate, 'date', 'insert.order.actualDeliveryDate')"></div>
              <div v-html="getFormatDataByType(rowData.ActualDeliveryTime ? rowData.ActualDeliveryTime : new Date().toLocaleTimeString(), 'text', 'insert.order.actualDeliveryTime')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.order.customer')"></div>
              <div v-html="getFormatDataByType(rowData.PriceList, 'object', 'insert.order.priceList')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'insert.order.documentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.RefDocumentType, 'object', 'insert.order.refDocumentType')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.order.description1')"></div>
              <div v-html="getFormatDataByType(rowData.EDocumentStatus, 'object', 'insert.order.eDocumentStatus')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.order.representative')"></div>
              <div v-html="getFormatDataByType(rowData.DeliveryRepresentative, 'object', 'insert.order.deliveryRepresentative')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'insert.order.route')"></div>
              <div v-html="getFormatDataByType(rowData.Warehouse, 'object', 'insert.order.warehouse')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'insert.order.vehicle')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.products')" v-if="rowData.RefDocumentType && (rowData.RefDocumentType.Code === 'WarehouseMovement' || rowData.RefDocumentType.Code === 'VanLoading')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.productCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.productName')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.quantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(p, i) in products" :key="i">
                      <b-td>{{p.ItemCode}}</b-td>
                      <b-td>{{p.ItemDesc}}</b-td>
                      <b-td>{{p.Quantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.assetMovement')" v-if="rowData.RefDocumentType && rowData.RefDocumentType.Code === 'AssetMovement'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.assetCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.assetName')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.serialNumber')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.assetQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.barcode')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.fixtureNumber')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(a, i) in rowData.AssetMovementItems" :key="i">
                      <b-td>{{a.Code}}</b-td>
                      <b-td>{{a.Description}}</b-td>
                      <b-td>{{a.SerialNumber2}}</b-td>
                      <b-td>{{a.Quantity}}</b-td>
                      <b-td>{{a.SerialNumber}}</b-td>
                      <b-td>{{a.SerialNumber3}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.logisticCompanies')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.companyName')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.taxNumber')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.city')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.district')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(l, i) in rowData.InvoiceLogisticCompanies" :key="i">
                      <b-td>{{l.CompanyName}}</b-td>
                      <b-td>{{l.TaxNumber}}</b-td>
                      <b-td>{{l.City ? l.City.Label : '-'}}</b-td>
                      <b-td>{{l.District ? l.District.Label : '-'}}</b-td>
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
      products: []
    }
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/DispatchRefDocument', record: this.$route.params.url}).then(() => {
        let rowData = this.rowData
        if (rowData.RefDocumentType && rowData.RefDocumentType.Code) {
          switch (rowData.RefDocumentType.Code) {
            case 'WarehouseMovement':
              this.products = rowData.WarehouseMovementItems ? rowData.WarehouseMovementItems : []
              break
            case 'VanLoading':
              this.products = rowData.VanLoadingItems ? rowData.VanLoadingItems : []
              break
          }
        }
      })
    }
  }
}
</script>
