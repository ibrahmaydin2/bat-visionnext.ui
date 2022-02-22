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
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.driver')}}:</b> {{(rowData.DefaultDriverEmployee) ? rowData.DefaultDriverEmployee.Label : ''}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.plaque')}}:</b> {{rowData.VehiclePlateNumber}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.assetNo')}}:</b> {{rowData.AssetNumber}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.state')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Brand, 'object', 'insert.vehicles.trademark')"></div>
              <div v-html="getFormatDataByType(rowData.Model, 'object', 'insert.vehicles.model')"></div>
              <div v-html="getFormatDataByType(rowData.ModelYear, 'text', 'insert.vehicles.year')"></div>
              <div v-html="getFormatDataByType(rowData.VehicleType, 'object', 'insert.vehicles.vehicleType')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.IsRouteVehicle, 'check', 'insert.vehicles.isRouteVehicle')"></div>
              <div v-html="getFormatDataByType(rowData.IsBranchLocation, 'check', 'insert.vehicles.isAsset')"></div>
              <div v-html="getFormatDataByType(rowData.UseAsWarehouse, 'check', 'insert.vehicles.isStore')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.additionalInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.UsageType, 'object', 'insert.vehicles.vehicleKind')"></div>
              <div v-html="getFormatDataByType(rowData.Color, 'object', 'insert.vehicles.colorCode')"></div>
              <div v-html="getFormatDataByType(rowData.VolumeCp, 'text', 'insert.vehicles.volumeCapacity')"></div>
              <div v-html="getFormatDataByType(rowData.VolumeCpUnit, 'object', 'insert.vehicles.volumeUnit')"></div>
              <div v-html="getFormatDataByType(rowData.WeightCp, 'text', 'insert.vehicles.weightCapacity')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.WeightCpUnit, 'object', 'insert.vehicles.weightUnit')"></div>
              <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.vehicles.vehicleCategory1')"></div>
              <div v-html="getFormatDataByType(rowData.Category2, 'object', 'insert.vehicles.vehicleCategory2')"></div>
              <div v-html="getFormatDataByType(rowData.Category3, 'object', 'insert.vehicles.vehicleCategory3')"></div>
              <div v-html="getFormatDataByType(rowData.ContractEndDate, 'date', 'insert.vehicles.contractEndDate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.replacementDrivers')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.VehicleReplacementDrivers" :items="vehicleReplacementDriverItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.vehicles.km')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th><span>{{$t('insert.vehicles.driverName')}}</span></b-th>
                      <b-th><span>{{$t('insert.vehicles.Route')}}</span></b-th>
                      <b-th><span>{{$t('insert.vehicles.Vehicle')}}</span></b-th>
                      <b-th><span>{{$t('insert.vehicles.StartKm')}}</span></b-th>
                      <b-th><span>{{$t('insert.vehicles.EndKm')}}</span></b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(vehicle, i) in vehicleKms" :key="i">
                      <b-td>{{vehicle.Employee && vehicle.Employee.Label}}</b-td>
                      <b-td>{{vehicle.Route && vehicle.Route.Label}}</b-td>
                      <b-td>{{vehicle.Vehicle && vehicle.Vehicle.Label}}</b-td>
                      <b-td>{{vehicle.StartKm}}</b-td>
                      <b-td>{{vehicle.EndKm}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
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
import mixin from '../../../mixins/index'
import { detailData } from '../detailPanelData'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      vehicleKms: [],
      vehicleReplacementDriverItems: detailData.vehicleReplacementDriverItems
    }
  },
  mounted () {
    this.getData()
    let request = {
      'AndConditionModel': {
        'VehicleIds': [this.$route.params.url]
      },
      'pagerecordCount': 20,
      'page': 1,
      'OrderByColumns': [
        {
          'column': 'OperationDate',
          'nestedColumn': 'OperationDate',
          'orderByType': 1
        }
      ]
    }
    this.$api.postByUrl(request, 'VisionNextVehicle/api/VehicleKM/Search').then((res) => {
      this.vehicleKms = res.ListModel.BaseModels
    })
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextVehicle/api/Vehicle', record: this.$route.params.url})
    }
  }
}
</script>
