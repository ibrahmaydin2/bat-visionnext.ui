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
            <span><i class="fas fa-code" />  <b>{{$t('insert.BranchStockTransfer.MovementNumber')}}:</b> {{rowData.MovementNumber}}</span>
            <span><i class="fas fa-user" />  <b>{{$t('insert.BranchStockTransfer.RepresentativeId')}}:</b> {{rowData.Representative ? rowData.Representative.Label : ''}}</span>
            <span><i class="fas fa-calendar-alt" />  <b>{{$t('insert.BranchStockTransfer.DocumentDate')}}:</b> {{dateConvertFromTimezone(rowData.MovementDate)}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.FromWarehouseId')}}</span><p>{{rowData.FromWarehouse && rowData.FromWarehouse.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.FromBranchId')}}</span><p>{{rowData.FromBranch && rowData.FromBranch.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.FromStatusId')}}</span><p>{{rowData.FromStatus && rowData.FromStatus.Label }}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.ToWarehouseId')}}</span><p>{{rowData.ToWarehouse && rowData.ToWarehouse.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.ToBranchId')}}</span><p>{{rowData.ToBranch && rowData.ToBranch.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('insert.BranchStockTransfer.ToStatusId')}}</span><p>{{rowData.ToStatus && rowData.ToStatus.Label }}</p>
            </b-card>
            <b-card class="col-12 asc__showPage-card">
              <b-table responsive :items="rowData.BranchStockTransferItems" :fields="fields">
              </b-table>
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
        {key: 'Code', label: this.$t('insert.BranchStockTransfer.ItemCode'), sortable: true},
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextBranch/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
