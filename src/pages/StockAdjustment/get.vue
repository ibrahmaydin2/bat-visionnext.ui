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
            <span><i class="fas fa-code" />  <b>{{$t('get.Stock.MovementNumber')}}:</b> {{rowData.MovementNumber}}</span>
            <span><i class="fas fa-calendar-alt" />  <b>{{$t('get.Stock.DocumentDate')}}:</b> {{dateConvertFromTimezone(rowData.MovementDate)}}</span>
            <span><i class="fas fa-clock" />  <b>{{$t('get.Stock.MovementTime')}}:</b> {{rowData.MovementTime}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.Stock.FromWarehouseId')}}</span><p>{{rowData.FromWarehouse && rowData.FromWarehouse.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.Stock.MovementTypeId')}}</span><p>{{rowData.MovementType && rowData.MovementType.Label }}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.Stock.FromStatusId')}}</span><p>{{rowData.FromStatus && rowData.FromStatus.Label }}</p>
              <span><i class="far fa-circle" /> {{$t('get.Stock.RepresentativeId')}}</span><p>{{rowData.Representative && rowData.Representative.Label }}</p>
            </b-card>
            <b-card class="col-12 asc__showPage-card">
              <!-- <b-table responsive :items="rowData.BranchStockTransferItems" :fields="fields">
                <template #cell(Item)="data">
                  {{data.value.Label}}
                </template>
              </b-table> -->
              <b-table-simple responsive hover small>
                <b-thead>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ItemCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.Items')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.FromWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.Unit')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.PlanQuantity')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in rowData.StockAdjustmentItems" :key="i">
                    <b-td>{{r.Item && r.Item.Code}}</b-td>
                    <b-td>{{r.Item && r.Item.Label}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.Item && r.Unit.Label}}</b-td>
                    <b-td>{{r.Quantity}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextStockManagement/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
