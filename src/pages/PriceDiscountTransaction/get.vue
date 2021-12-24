<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.PriceDiscountTransaction.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.PriceDiscountTransaction.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.PriceDiscountTransaction.Status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.RmaOrder.RmaOrder')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.TCIBreak1, 'object', 'get.PriceDiscountTransaction.TciBreak1')"></div>
              <div v-html="getFormatDataByType(rowData.TransactionDate, 'date', 'get.PriceDiscountTransaction.TransactionDate')"></div>
              <div v-html="getFormatDataByType(rowData.TransactionTime, 'text', 'get.PriceDiscountTransaction.TransactionTime')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountReason, 'object', 'get.PriceDiscountTransaction.DiscountReason')"></div>
              <div v-html="getFormatDataByType(rowData.PriceDiscountAmount, 'text', 'get.PriceDiscountTransaction.PriceDiscountAmount')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.PriceDiscountTransaction.Currency')"></div>
              <div v-html="getFormatDataByType(rowData.BudgetAmount, 'text', 'get.PriceDiscountTransaction.BudgetAmount')"></div>
              <div v-html="getFormatDataByType(rowData.BudgetConsumption, 'text', 'get.PriceDiscountTransaction.BudgetConsumption')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Budget, 'object', 'get.PriceDiscountTransaction.Budget')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'get.PriceDiscountTransaction.ApproveState')"></div>
              <div v-html="getFormatDataByType(rowData.ErpCode, 'text', 'get.PriceDiscountTransaction.ErpCode')"></div>
              <div v-html="getFormatDataByType(rowData.ExpirationDate, 'date', 'get.PriceDiscountTransaction.ExpirationDate')"></div>
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'get.PriceDiscountTransaction.BeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'get.PriceDiscountTransaction.Genexp1')"></div>
              <div v-html="getFormatDataByType(rowData.GainType, 'object', 'get.PriceDiscountTransaction.GainType')"></div>
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
      RmaStatus: {},
      RmaType: {}
    }
  },
  mounted () {
    this.getData()
    let allLookups = 'RMA_STATUS,RETURN_TYPE'
    this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
  },
  computed: {
    ...mapState(['rowData', 'style', 'lookup'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextDiscount/api/PriceDiscountTransaction', record: this.$route.params.url}).then(() => {
        if (this.lookup.RMA_STATUS && this.lookup.RMA_STATUS.length > 0 && this.rowData.RmaStatusId > 0) {
          this.RmaStatus = this.lookup.RMA_STATUS.find(a => a.DecimalValue === this.rowData.RmaStatusId)
        }
        if (this.lookup.RETURN_TYPE && this.lookup.RETURN_TYPE.length > 0 && this.rowData.RmaTypeId > 0) {
          this.RmaType = this.lookup.RETURN_TYPE.find(a => a.DecimalValue === this.rowData.RmaTypeId)
        }
      })
    }
  }
}
</script>
