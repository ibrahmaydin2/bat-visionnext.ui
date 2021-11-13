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
            <span><i class="fas fa-code" />  <b>{{$t('insert.Voucher.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.Voucher.description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.Voucher.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="far fa-circle" /> <b>{{$t('insert.Voucher.CustomerId')}}:</b></span><p>{{rowData.Customer && rowData.Customer.Label }}</p>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.Voucher.VoucherDetails')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'get.Voucher.DocumentNumber')"></div>
                <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'get.Voucher.DocumentDate')"></div>
                <div v-html="getFormatDataByType(rowData.DueDate, 'date', 'get.Voucher.DueDate')"></div>
                <div v-html="getFormatDataByType(rowData.SerialNumber, 'text', 'get.Voucher.SerialNumber')"></div>
                <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.Voucher.CurrencyId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.CsTotal, 'text', 'get.Voucher.CsTotal')"></div>
                <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.Voucher.RepresentativeId')"></div>
                <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.Voucher.RouteId')"></div>
                <div v-html="getFormatDataByType(customerReminder, 'text', 'get.Voucher.reminder')"></div>
            </b-card>
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
  data () {
    return {
      customerReminder: null
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
      this.$router.push({name: this.routeName})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/CsCard', record: this.$route.params.url})
    }
  },
  watch: {
    rowData: function (e) {
      this.$api.post({RecordId: e.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        this.customerReminder = res.Model.Remainder
      })
    }
  }
}
</script>
