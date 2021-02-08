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
            <span><i class="fas fa-code" />  <b>{{$t('get.LoyaltyConsumption.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.LoyaltyConsumption.RepresentativeId')}}</span><p>{{rowData.Representative && rowData.Representative.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.LoyaltyConsumption.CustomerId')}}</span><p>{{rowData.Customer && rowData.Customer.Label }}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.LoyaltyConsumption.TransactionDate')}}</span><p>{{dateConvertFromTimezone(rowData.TransactionDate)}}</p>
              <span><i class="far fa-circle" /> {{$t('get.LoyaltyConsumption.Description')}}</span><p>{{rowData.Description1}}</p>
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
      fields: []
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextLoyalty/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
