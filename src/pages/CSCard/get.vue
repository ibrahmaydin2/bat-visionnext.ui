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
                <span><i class="far fa-circle" /> {{$t('get.CsCard.CustomerId')}}</span><p>{{rowData.CustomerId && rowData.Customer.Label }}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.DocumentNumber')}}</span> <p>{{rowData.DocumentNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.DocumentDate')}}</span> <p>{{rowData.DocumentDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.Bank')}}</span> <p>{{rowData.Bank && rowData.Bank.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.CorrespondentBranch')}}</span> <p>{{rowData.BankBranch && rowData.BankBranch.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.CsTotal')}}</span> <p>{{rowData.CurrencyCsTotal}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.CsCard.CurrencyId')}}</span> <p>{{rowData.Currency && rowData.Currency.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.DueDate')}}</span> <p>{{rowData.DueDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.SerialNumber')}}</span> <p>{{rowData.SerialNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.RouteId')}}</span> <p>{{rowData.Route && rowData.Route.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.CsCard.PayCity')}}</span> <p>{{payCity}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.cscard.reminder')}}</span> <p>{{customerReminder}}</p>
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
