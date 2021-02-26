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
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.Warehouse.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.Warehouse.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.Warehouse.StatusId')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.Warehouse.title')" :active="true">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('get.Warehouse.NonSapWarehouse')}}</span> <p><i :class="rowData.NonSapWarehouse === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
              <span><i class="far fa-circle" /> {{$t('get.Warehouse.IsVehicle')}}</span><p><i :class="rowData.IsVehicle === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
              <span><i class="far fa-circle" /> {{$t('get.Warehouse.VehicleId')}}</span><p>{{rowData.Vehicle ? rowData.Vehicle.Label : ''}}</p>
              <span><i class="far fa-circle" /> {{$t('get.Warehouse.IsVirtualWarehouse')}}</span> <p><i :class="rowData.IsVirtualWarehouse === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
              <span><i class="far fa-circle" /> {{$t('get.Warehouse.LicenseNumber')}}</span> <p>{{rowData.LicenseNumber}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <span><i class="far fa-circle" /> {{$t('get.Warehouse.FinanceCode')}}</span> <p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('get.Warehouse.FinanceCode2')}}</span> <p>{{rowData.FinanceCode2}}</p>
                <span><i class="far fa-circle" /> {{$t('get.Warehouse.Address')}}</span> <p>{{rowData.Address}}</p>
                <span><i class="far fa-circle" /> {{$t('get.Warehouse.CityId')}}</span><p>{{rowData.City ? rowData.City.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.Warehouse.DistrictId')}}</span><p>{{rowData.District ? rowData.District.Label : ''}}</p>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')">
          <b-row class="p-4">
            <b-card class="col-12 asc__showPage-card">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.warehouse.SupplierBranchId')}}</span></b-th>
                  <b-th><span>{{$t('insert.warehouse.PurchaseWarehouseId')}}</span></b-th>
                  <b-th><span>{{$t('insert.warehouse.ReturnWarehouseId')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rowData.WarehouseSuppliers" :key="i">
                    <b-td>{{w.SupplierBranch ? w.SupplierBranch.Label : ''}}</b-td>
                    <b-td>{{w.PurchaseWarehouse ? w.PurchaseWarehouse.Label : ''}}</b-td>
                    <b-td>{{w.ReturnWarehouse ? w.ReturnWarehouse.Label : ''}}</b-td>
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
export default {
  props: ['dataKey'],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextWarehouse/api/Warehouse', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
