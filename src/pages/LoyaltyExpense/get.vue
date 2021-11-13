<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <GetFormField />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.LoyaltyExpense.FinanceCode')}}:</b> {{rowData.FinanceCode}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.LoyaltyExpense.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.LoyaltyExpense.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description, 'text', 'get.LoyaltyExpense.Description')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.LoyaltyExpense.RepresentativeId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.LoyaltyExpense.CustomerId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Loyalty, 'object', 'get.LoyaltyExpense.LoyaltyId')"></div>
              <div v-html="getFormatDataByType(rowData.ConsumptionScore, 'text', 'get.LoyaltyExpense.SpentPoint')"></div>
              <div v-html="getFormatDataByType(rowData.TransactionDate, 'date', 'get.LoyaltyExpense.TransactionDate')"></div>
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
  props: ['dataKey'],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextLoyalty/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
