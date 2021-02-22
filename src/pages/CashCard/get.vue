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
            <span><i class="fas fa-check" />  <b>{{$t('insert.cashcard.status')}}:</b> {{rowData.StatusId}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.cashcard.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.cashcard.CashCard')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.CashCard.CustomerId')}}</span><p>{{rowData.CustomerId && rowData.Customer.Label }}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.DocumentNumber')}}</span> <p>{{rowData.DocumentNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.DocumentDate')}}</span> <p>{{rowData.DocumentDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.PaymentDate')}}</span> <p>{{rowData.PaymentDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.CashTotal')}}</span> <p>{{rowData.CashTotal}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.CashCard.CurrencyId')}}</span> <p>{{rowData.Currency && rowData.Currency.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.RepresentativeId')}}</span> <p>{{rowData.Representative && rowData.Representative.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.RouteId')}}</span> <p>{{rowData.Route && rowData.Route.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CashCard.CashCardTypeId')}}</span> <p>{{rowData.CashCardType && rowData.CashCardType.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.cashcard.reminder')}}</span> <p>{{customerReminder}}</p>
            </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      customerReminder: null
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
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
