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
            <span><i class="fas fa-check" />  <b>{{$t('insert.status')}}:</b> {{ rowData.Status && rowData.Status.Label }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.Stock.Warehouse')}}</span><p>{{rowData.Warehouse && rowData.Warehouse.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.Stock.UnitSet')}}</span><p>{{rowData.UnitSet && rowData.UnitSet.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.Stock.Unit')}}</span><p>{{rowData.Unit && rowData.Unit.Label }}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.Stock.Item')}}</span><p>{{rowData.Item && rowData.Item.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.Stock.Quantity')}}</span><p>{{rowData.Quantity }}</p>
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
      fields: [
        {key: 'Item', label: this.$t('insert.BranchStockTransfer.ItemCode'), sortable: true},
        {key: 'Description1', label: this.$t('insert.BranchStockTransfer.Items'), sortable: true},
        {key: 'FromWhStockQuantity', label: this.$t('insert.BranchStockTransfer.FromWhStockQuantity'), sortable: true},
        {key: 'ToWhStockQuantity', label: this.$t('insert.BranchStockTransfer.ToWhStockQuantity'), sortable: true},
        {key: 'Quantity', label: this.$t('insert.BranchStockTransfer.PlanQuantity'), sortable: true}
      ]
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextWarehouse/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
