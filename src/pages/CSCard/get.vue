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
            <span><i class="fas fa-check" />  <b>{{$t('insert.cscard.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.cscard.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.cscard.description')}}:</b> {{rowData.Description1}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.cscard.CsCard')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.CsCard.CustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'get.CsCard.DocumentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'get.CsCard.DocumentDate')"></div>
              <div v-html="getFormatDataByType(rowData.Bank, 'object', 'get.CsCard.Bank')"></div>
              <div v-html="getFormatDataByType(rowData.BankBranch, 'object', 'get.CsCard.CorrespondentBranch')"></div>
              <div v-html="getFormatDataByType(rowData.CurrencyCsTotal, 'text', 'get.CsCard.CsTotal')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.CsCard.CurrencyId')"></div>
              <div v-html="getFormatDataByType(rowData.DueDate, 'date', 'get.CsCard.DueDate')"></div>
              <div v-html="getFormatDataByType(rowData.SerialNumber, 'text', 'get.CsCard.SerialNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.CsCard.RouteId')"></div>
              <div v-html="getFormatDataByType(payCity, 'object', 'get.CsCard.PayCity')"></div>
              <div v-html="getFormatDataByType(customerReminder, 'text', 'insert.cscard.reminder')"></div>
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      customerReminder: null,
      payCity: null
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style', 'cities'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/CsCard', record: this.$route.params.url})
      this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
    }
  },
  watch: {
    rowData: function (e) {
      this.$api.post({RecordId: e.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        this.customerReminder = res.Model.Remainder
      })
    },
    cities: function (e) {
      if (this.rowData.PayCity && e) {
        let tmpArr = e.filter(i => i.Value === this.rowData.PayCity)
        this.payCity = tmpArr[0].Label
      }
    }
  }
}
</script>
<style lang="sass">
</style>
