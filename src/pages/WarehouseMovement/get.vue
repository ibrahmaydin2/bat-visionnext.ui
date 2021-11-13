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
            <span><i class="fas fa-code" /> <b>{{$t('insert.BranchStockTransfer.MovementNumber')}}:</b> {{rowData.MovementNumber}}</span>
            <span><i class="fas fa-user" /> <b>{{$t('insert.BranchStockTransfer.RepresentativeId')}}:</b> {{rowData.Representative && rowData.Representative.Label }}</span>
            <span><i class="fas fa-taxi" /> <b>{{$t('insert.WarehouseMovement.MovementTypeId')}}:</b> {{rowData.MovementType && rowData.MovementType.Label }}</span>
            <span><i class="fas fa-calendar-alt" /> <b>{{$t('insert.BranchStockTransfer.DocumentDate')}}:</b> {{dateConvertFromTimezone(rowData.MovementDate)}}</span>
            <span><i class="fas fa-align-left" /> <b>{{$t('insert.WarehouseMovement.Description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" /> <b>{{$t('insert.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FromWarehouse, 'object', 'insert.BranchStockTransfer.FromWarehouseId')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'insert.WarehouseMovement.RouteId')"></div>
              <div v-html="getFormatDataByType(rowData.FromStatus, 'object', 'insert.BranchStockTransfer.FromStatusId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ToWarehouse, 'object', 'insert.BranchStockTransfer.ToWarehouseId')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'insert.WarehouseMovement.VehicleId')"></div>
              <div v-html="getFormatDataByType(rowData.ToStatus, 'object', 'insert.BranchStockTransfer.ToStatusId')"></div>
            </b-card>
            <b-card class="col-12 asc__showPage-card">
              <b-table-simple responsive hover small>
                <b-thead>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ItemCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.Items')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.FromWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ToWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.PlanQuantity')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in rowData.WarehouseMovementItems" :key="i">
                    <b-td>{{r.Item && r.Item.Code}}</b-td>
                    <b-td>{{r.Item && r.Item.Label}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.ToWhStockQuantity}}</b-td>
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextWarehouse/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
