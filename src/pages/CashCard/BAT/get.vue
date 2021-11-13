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
            <span><i class="fas fa-check" />  <b>{{$t('insert.cashcard.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.cashcard.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.cashcard.CashCard')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'get.CashCard.DocumentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'get.CashCard.DocumentDate')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentDate, 'date', 'get.CashCard.DocumentDate')"></div>
              <div v-html="getFormatDataByType(rowData.CashTotal, 'text', 'get.CashCard.CashTotal')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.CashCard.CurrencyId')"></div>

            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.CashCard.RepresentativeId')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.CashCard.RouteId')"></div>
              <div v-html="getFormatDataByType(rowData.CashCardType, 'object', 'get.CashCard.CashCardTypeId')"></div>
              <div v-html="getFormatDataByType(customerReminder, 'text', 'get.CashCard.reminder')"></div>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/CashCard', record: this.$route.params.url})
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
<style lang="sass">
</style>
