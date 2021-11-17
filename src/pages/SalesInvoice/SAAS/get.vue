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
              <span class="summary-title">{{$t('insert.order.itemDiscount')}}</span>
              <span class="summary-value text-muted">: {{rowData.TotalItemDiscount}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
              <span class="summary-title">{{$t('insert.order.otherDiscount')}}</span>
              <span class="summary-value text-muted">: {{rowData.TotalOtherDiscount}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
              <span class="summary-title">{{$t('insert.order.totalDiscount')}}</span>
              <span class="summary-value text-muted">: {{rowData.TotalDiscount}}</span>
              <div class="clearfix"></div>
              <hr class="summary-hr"/>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.order.enterInvoice')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.InvoiceKind, 'object', 'insert.order.invoiceKind')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'insert.order.documentDate')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentTime, 'text', 'insert.order.documentTime')"></div>
              <div v-html="getFormatDataByType(rowData.ActualDeliveryDate, 'date', 'insert.order.actualDeliveryDate')"></div>
              <div v-html="getFormatDataByType(rowData.ActualDeliveryTime, 'text', 'insert.order.actualDeliveryTime')"></div>
              <div v-html="getFormatDataByType(rowData.EDocumentStatusId, 'object', 'insert.order.EDocumentStatusId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.order.customer')"></div>
              <div v-html="getFormatDataByType(rowData.PriceList, 'object', 'insert.order.priceList')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp2, 'text', 'insert.order.genexp2')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'insert.order.documentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.order.description1')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerOrderNumber, 'text', 'insert.order.CustomerOrderNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Printed, 'check', 'insert.order.Printed')"></div>
              <div v-html="getFormatDataByType(rowData.IsDBSOffline, 'check', 'insert.order.IsDBSOffline')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.PrintedDispatchNumber, 'text', 'insert.order.printedDispatchNumber')"></div>
              <div v-html="getFormatDataByType(rowData.State, 'object', 'insert.order.state')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.order.representative')"></div>
              <div v-html="getFormatDataByType(rowData.DeliveryRepresentative, 'object', 'insert.order.deliveryRepresentative')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'insert.order.route')"></div>
              <div v-html="getFormatDataByType(rowData.Warehouse, 'object', 'insert.order.warehouse')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'insert.order.vehicle')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentType, 'object', 'insert.order.paymentType')"></div>
              <div v-html="getFormatDataByType(rowData.ReferenceNumber, 'text', 'insert.order.ReferenceNumber')"></div>
              <div v-html="getFormatDataByType(rowData.IsCashCollection , 'check', 'insert.order.isCashCollection')"></div>
              <div v-html="getFormatDataByType(rowData.isCanceled, 'check', 'insert.order.isCanceled')"></div>
              <div v-html="getFormatDataByType(rowData.IsDBS, 'check', 'insert.order.IsDBS')"></div>
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
                    <b-th><span>{{$t('insert.order.isFreeItem')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.freeReason')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(o, i) in rowData.InvoiceLines" :key="i">
                      <b-td>{{o.Item.Label}}</b-td>
                      <b-td>{{o.Item.Code}}</b-td>
                      <b-td>{{o.Quantity}}</b-td>
                      <b-td>{{o.Price}}</b-td>
                      <b-td>{{o.VatRate}}</b-td>
                      <b-td>{{o.NetTotal}}</b-td>
                      <b-td>{{o.TotalVat}}</b-td>
                      <b-td>{{o.GrossTotal}}</b-td>
                      <b-td>
                        <i v-if="o.IsFreeItem === 1" class="fa fa-check text-success"></i>
                        <i v-else class="fa fa-times text-danger"></i>
                      </b-td>
                      <b-td>{{o.FreeReason ? o.FreeReason.Label : '-' }}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.discountName')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.discountCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.discountRate')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.DiscountReasonId')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.LoyaltyId')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.ContractId')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.SalesVolumeId')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.discountAmount')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(o, i) in (rowData.InvoiceDiscounts)" :key="i">
                      <b-td>{{o.DiscountClass ? o.DiscountClass.Label : ''}}</b-td>
                      <b-td>{{o.DiscountClass ? o.DiscountClass.Code : ''}}</b-td>
                      <b-td>{{o.DiscountPercent ? `% ${o.DiscountPercent}` : '-'}}</b-td>
                      <b-td>{{o.DiscountReason ? o.DiscountReason.Label : ''}}</b-td>
                      <b-td>{{o.LoyaltyId}}</b-td>
                      <b-td>{{o.ContractId}}</b-td>
                      <b-td>{{o.SalesVolumeId}}</b-td>
                      <b-td>{{o.TotalDiscount}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.paymentPlan')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.order.paymentDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.PeriodDay')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.willPayAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.order.paidAmount')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(p, i) in rowData.InvoicePaymentPlans" :key="i">
                      <b-td>{{dateConvertFromTimezone(p.PaymentDate)}}</b-td>
                      <b-td>{{p.PaymentPeriod}}</b-td>
                      <b-td>{{p.Amount}}</b-td>
                       <b-td>{{p.Paid}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.invoiceLogisticCompanies')" v-if="selectedBranch.UseEWaybill === 1">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.InvoiceLogisticCompanies" :items="InvoiceLogisticCompaniesItems" />
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
import mixin from '../../../mixins/index'
import { detailData } from '../detailPanelData'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      invoiceDiscountsItems: detailData.invoiceDiscountsItems,
      InvoiceLogisticCompaniesItems: detailData.InvoiceLogisticCompaniesItems,
      selectedBranch: {}
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextInvoice/api/SalesInvoice', record: this.$route.params.url}).then(() => {
        this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
          this.selectedBranch = response && response.Model ? response.Model : {}
        })
      })
    }
  }
}
</script>
<style scoped>
.summary-card {
  width: 240px;
  float: right;
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
