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
              <div v-html="getFormatDataByType(rowData.NonSapWarehouse, 'check', 'get.Warehouse.NonSapWarehouse')"></div>
              <div v-html="getFormatDataByType(rowData.IsVehicle, 'check', 'get.Warehouse.IsVehicle')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'get.Warehouse.VehicleId')"></div>
              <div v-html="getFormatDataByType(rowData.IsVirtualWareHouse, 'check', 'get.Warehouse.IsVirtualWarehouse')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseNumber, 'text', 'get.Warehouse.LicenseNumber')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'get.Warehouse.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode2, 'text', 'get.Warehouse.FinanceCode2')"></div>
              <div v-html="getFormatDataByType(rowData.AddressDetail, 'text', 'get.Warehouse.Address')"></div>
              <div v-html="getFormatDataByType(rowData.City, 'object', 'get.Warehouse.CityId')"></div>
              <div v-html="getFormatDataByType(rowData.District, 'object', 'get.Warehouse.DistrictId')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.warehouse.locations')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.WarehouseSuppliers" :items="locationItems"/>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { detailData } from './detailPanelData'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      locationItems: detailData.locationItems
    }
  },
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextWarehouse/api/Warehouse', record: this.$route.params.url})
    }
  }
}
</script>
