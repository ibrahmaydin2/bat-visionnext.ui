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
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.CustomerId')}}</span><p>{{rowData.CustomerId && rowData.Customer.Label }}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.ApproveNumber')}}</span> <p>{{rowData.ApproveNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.DocumentNumber')}}</span> <p>{{rowData.DocumentNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.DocumentDate')}}</span> <p>{{rowData.DocumentDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.Bank')}}</span> <p>{{rowData.Bank && rowData.Bank.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.CreditCardTotal')}}</span> <p>{{rowData.CreditCardTotal}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.CurrencyId')}}</span> <p>{{rowData.Currency && rowData.Currency.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.CardNumber')}}</span> <p>{{rowData.CardNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.RepresentativeId')}}</span> <p>{{rowData.Representative && rowData.Representative.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.RouteId')}}</span> <p>{{rowData.Route && rowData.Route.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CreditCard.IsBatcardTransaction')}}</span><p><i :class="rowData.IsBatcardTransaction === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.creditcard.reminder')}}</span> <p>{{rowData.SystemCurrencyRate}}</p>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/CreditCard', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
