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
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('insert.creditcard.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.creditcard.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.creditcard.CreditCard')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.CreditCard.CustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveNumber, 'text', 'get.CreditCard.ApproveNumber')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'get.CreditCard.DocumentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'get.CreditCard.DocumentDate')"></div>
              <div v-html="getFormatDataByType(rowData.Bank, 'object', 'get.CreditCard.Bank')"></div>
              <div v-html="getFormatDataByType(rowData.CreditCardTotal, 'text', 'get.CreditCard.CreditCardTotal')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.CreditCard.CurrencyId')"></div>
              <div v-html="getFormatDataByType(rowData.CardNumber, 'text', 'get.CreditCard.CardNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.cashcard.Representative')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.CreditCard.RouteId')"></div>
              <div v-html="getFormatDataByType(customerReminder, 'text', 'get.CreditCard.reminder')"></div>
              <div v-html="getFormatDataByType(rowData.IsBatcardTransaction, 'check', 'get.CreditCard.IsBatcardTransaction')"></div>
            </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../../mixins/index'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      customerReminder: null
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/CreditCard', record: this.$route.params.url}).then(() => {
        this.$api.post({RecordId: this.rowData.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
          this.customerReminder = res.Model.Remainder
        })
      })
    }
  }
}
</script>
