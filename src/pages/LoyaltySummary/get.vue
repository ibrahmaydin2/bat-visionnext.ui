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
            <span><i class="fas fa-code" /> <b>{{$t('get.LoyaltySummary.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Loyalty, 'object', 'get.LoyaltySummary.LoyaltyId')"></div>
              <div v-html="getFormatDataByType(rowData.Branch, 'object', 'get.LoyaltySummary.BranchId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.LoyaltySummary.CustomerId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ConsumedTotalScore, 'text', 'get.LoyaltySummary.ConsumptionScore')"></div>
              <div v-html="getFormatDataByType('', 'text', 'get.LoyaltySummary.ToplamKazanilanPuan')"></div>
              <div v-html="getFormatDataByType('', 'text', 'get.LoyaltySummary.ToplamHarcananPuan')"></div>
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
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: `VisionNextLoyalty/api/LoyaltySummary`, record: this.$route.params.url})
    }
  }
}
</script>
