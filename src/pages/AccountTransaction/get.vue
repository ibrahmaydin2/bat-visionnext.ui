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
      <b-tabs>
        <b-tab :title="$t('get.AccountTransaction.AT')" active>
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.CustomerId')}}</span><p>{{rowData.CustomerId && rowData.Customer.Label }}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.DocumentNumber')}}</span> <p>{{rowData.DocumentNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.DocumentDate')}}</span> <p>{{rowData.DocumentDate}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.TransactionTypeId')}}</span> <p>{{rowData.TransactionTypeId && rowData.TransactionType.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.AccountTransaction')}}</span> <p>{{rowData.AccountTransaction}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.CurrencyId')}}</span> <p>{{rowData.CurrencyId && rowData.Currency.Label}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.Credit')}}</span> <p>{{rowData.Credit}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.Remainder')}}</span> <p>{{rowData.Remainder}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.CreditAccountRemainder')}}</span> <p>{{CreditAccountRemainder}}</p>
                <span><i class="far fa-circle" /> {{$t('get.AccountTransaction.Genexp1')}}</span> <p>{{rowData.Genexp1}}</p>
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
      CreditAccountRemainder: null
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/AccountTransaction', record: this.$route.params.url})
    }
  },
  watch: {
    rowData: function (e) {
      if (e.Credit < 0 || e.AccountTransaction < 0) {
        this.CreditAccountRemainder = 'BORÇ'
      } else {
        this.CreditAccountRemainder = 'ALACAK'
      }
    }
  }
}
</script>
<style lang="sass">
</style>
