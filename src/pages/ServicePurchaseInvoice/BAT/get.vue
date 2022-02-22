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
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'insert.order.documentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.order.description1')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'insert.order.documentDate')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentTime, 'text', 'insert.order.documentTime')"></div>
              <div v-html="getFormatDataByType(rowData.InvoiceType, 'object', 'insert.order.invoiceType')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'insert.order.currency')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.order.customer')"></div>
              <div v-html="getFormatDataByType(rowData.InvoiceKind, 'object', 'insert.order.invoiceKind')"></div>
              <div v-html="getFormatDataByType(rowData.InvoiceKind, 'object', 'insert.order.invoiceKind')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.order.representative')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentType, 'object', 'insert.order.paymentType')"></div>
              <div v-html="getFormatDataByType(paymentPeriod, 'text', 'insert.order.paymentPeriod')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table
                  :items="rowData.InvoiceLines"
                  :fields="itemFields.filter(f => f.key !== 'operations')"
                  responsive
                  bordered
                  small>
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table
                  :items="rowData.InvoiceDiscounts"
                  :fields="discountFields.filter(f => f.key !== 'operations')"
                  responsive
                  bordered
                  small>
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
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
      paymentPeriod: 0,
      itemFields: detailData.itemFields,
      discountFields: detailData.discountFields
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextInvoice/api/ServiceSalesInvoice', record: this.$route.params.url}).then(() => {
        this.$api.post({RecordId: this.rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          this.paymentPeriod = response.Model.PaymentPeriod
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
