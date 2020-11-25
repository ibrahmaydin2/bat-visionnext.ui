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
            <span><i class="fas fa-code" />  <b>{{$t('insert.vehicles.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.vehicles.driver')}}:</b> {{(rowData.DefaultDriverEmployee) ? rowData.DefaultDriverEmployee.Label : ''}}</span> 
            <span><i class="fas fa-check" />  <b>{{$t('insert.vehicles.plaque')}}:</b> {{rowData.VehiclePlateNumber}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.vehicles.assetNo')}}:</b> {{rowData.AssetNumber}}</span> 
            <span><i class="far fa-circle" />  <b>{{$t('insert.vehicles.state')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.vehicles.general')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.trademark')}}</span>
                <p>{{rowData.Brand}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.model')}}</span>
                <p>{{(rowData.Model) ? rowData.Model.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.year')}}</span>
                <p>{{rowData.ModelYear}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.isRouteVehicle')}}</span>
                <p><i :class="rowData.IsRouteVehicle === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.vehicleType')}}</span>
                <p>{{(rowData.VehicleType) ? rowData.VehicleType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.isStore')}}</span>
                <p><i :class="rowData.UseAsWarehouse === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.isAsset')}}</span>
                <p><i :class="rowData.isAsset === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.vehicles.additionalInfo')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.vehicleKind')}}</span>
                <p>{{(rowData.VehicleGroup) ? rowData.VehicleGroup.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.colorCode')}}</span>
                <p>{{(rowData.Color) ? rowData.Color.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.sideAwningType')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.backrest')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.truckLogo')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.volumeCapacity')}}</span>
                <p>{{rowData.VolumeCp}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.volumeUnit')}}</span>
                <p>{{(rowData.VolumeCpUnit) ? rowData.VolumeCpUnit.Label : ''}}</p> 
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.weightCapacity')}}</span>
                <p>{{rowData.WeightCp}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.weightUnit')}}</span>
                <p>{{(rowData.WeightCpUnit) ? rowData.WeightCpUnit.Label : ''}}</p> 
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.contractEndDate')}}</span>
                <p>{{rowData.ContractEndDate}}</p> 
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.vehicleCategory1')}}</span>
                <p>{{(rowData.Category1) ? rowData.Category1.Label : ''}}</p> 
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.vehicleCategory2')}}</span>
                <p>{{(rowData.Category2) ? rowData.Category2.Label : ''}}</p> 
                <span><i class="far fa-circle" /> {{$t('insert.vehicles.vehicleCategory3')}}</span>
                <p>{{(rowData.Category3) ? rowData.Category3.Label : ''}}</p> 
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.other')">
           <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <span><i class="far fa-circle" />AlternativeVehicle</span>
                <p>{{(rowData.AlternativeVehicle) ? rowData.AlternativeVehicle.Label : ''}}</p>
                <span><i class="far fa-circle" />AxleQuantity</span>
                <p>{{rowData.AxleQuantity}}</p>
                <span><i class="far fa-circle" />AxleWeight</span>
                <p>{{rowData.AxleWeight}}</p>
                <span><i class="far fa-circle" />BranchId</span>
                <p>{{rowData.BranchId}}</p>
                <span><i class="far fa-circle" />Category4</span>
                <p>{{(rowData.Category4) ? rowData.Category4.Label : ''}}</p>
                <span><i class="far fa-circle" />Category5</span>
                <p>{{(rowData.Category5) ? rowData.Category5.Label : ''}}</p>
                <span><i class="far fa-circle" />Category6</span>
                <p>{{(rowData.Category6) ? rowData.Category6.Label : ''}}</p>
                <span><i class="far fa-circle" />Category7</span>
                <p>{{(rowData.Category7) ? rowData.Category7.Label : ''}}</p>
                <span><i class="far fa-circle" />Category8</span>
                <p>{{(rowData.Category8) ? rowData.Category8.Label : ''}}</p>
                <span><i class="far fa-circle" />Category9</span>
                <p>{{(rowData.Category9) ? rowData.Category9.Label : ''}}</p>
                <span><i class="far fa-circle" />Category10</span>
                <p>{{(rowData.Category10) ? rowData.Category10.Label : ''}}</p>
                <span><i class="far fa-circle" />ColorId</span>
                <p>{{rowData.ColorId}}</p>
                <span><i class="far fa-circle" />CompanyId</span>
                <p>{{rowData.CompanyId}}</p>
                <span><i class="far fa-circle" />CreatedDateTime</span>
                <p>{{rowData.CreatedDateTime}}</p>
                <span><i class="far fa-circle" />DefaultDriverEmployeeId</span>
                <p>{{rowData.DefaultDriverEmployeeId}}</p>
                <span><i class="far fa-circle" />Deleted</span>
                <p>{{rowData.Deleted}}</p>
                <span><i class="far fa-circle" />EngineeNo1</span>
                <p>{{rowData.EngineeNo1}}</p>
                <span><i class="far fa-circle" />EngineeNo2</span>
                <p>{{rowData.EngineeNo2}}</p>
                <span><i class="far fa-circle" />EngineeSize</span>
                <p>{{rowData.EngineeSize}}</p>
                <span><i class="far fa-circle" />Hp</span>
                <p>{{rowData.Hp}}</p>
                <span><i class="far fa-circle" />IsBranchLocation</span>
                <p>{{rowData.IsBranchLocation}}</p>
                <span><i class="far fa-circle" />LengthCp</span>
                <p>{{rowData.LengthCp}}</p>
                <span><i class="far fa-circle" />LengthCpUnitId</span>
                <p>{{rowData.LengthCpUnitId}}</p>
                <span><i class="far fa-circle" />ModifiedDateTime</span>
                <p>{{rowData.ModifiedDateTime}}</p>
                <span><i class="far fa-circle" />ModifiedUser</span>
                <p>{{rowData.ModifiedUser}}</p>
                <span><i class="far fa-circle" />OrderCapacity</span>
                <p>{{rowData.OrderCapacity}}</p>
                <span><i class="far fa-circle" />RecordId</span>
                <p>{{rowData.RecordId}}</p>
                <span><i class="far fa-circle" />RecordState</span>
                <p>{{rowData.RecordState}}</p>
                <span><i class="far fa-circle" />SeatQuantity</span>
                <p>{{rowData.SeatQuantity}}</p>
                <span><i class="far fa-circle" />ServiceAddressDetail</span>
                <p>{{rowData.ServiceAddressDetail}}</p>
                <span><i class="far fa-circle" />ServiceAddressId</span>
                <p>{{rowData.ServiceAddressId}}</p>
                <span><i class="far fa-circle" />ServiceContact</span>
                <p>{{rowData.ServiceContact}}</p>
                <span><i class="far fa-circle" />ServiceEmail</span>
                <p>{{rowData.ServiceEmail}}</p>
                <span><i class="far fa-circle" />ServiceFax</span>
                <p>{{rowData.ServiceFax}}</p>
                <span><i class="far fa-circle" />ServiceTelephone1</span>
                <p>{{rowData.ServiceTelephone1}}</p>
                <span><i class="far fa-circle" />ServiceTelephone2</span>
                <p>{{rowData.ServiceTelephone2}}</p>
                <span><i class="far fa-circle" />System</span>
                <p>{{rowData.System}}</p>
                <span><i class="far fa-circle" />TireQuantity</span>
                <p>{{rowData.TireQuantity}}</p>
                <span><i class="far fa-circle" />TireSize</span>
                <p>{{rowData.TireSize}}</p>
                <span><i class="far fa-circle" />UsageType</span>
                <p>{{rowData.UsageType}}</p>
                <span><i class="far fa-circle" />UsageTypeId</span>
                <p>{{rowData.UsageTypeId}}</p>
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
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
      fields: [
        {
          key: 'customer',
          label: 'Müşteri',
          sortable: true
        },
        {
          key: 'location',
          label: 'Lokasyon',
          sortable: true
        },
        {
          key: 'visit',
          label: 'Ziyaret Başlama Kontrolü Yapılmayacak',
          sortable: true
        }
      ],
      tempItems: [
        { customer: 'CIHAN BUFE- ALI ATAN', location: 'CIHAN BUFE- ALI ATAN', visit: 1, code: '312' },
        { customer: 'UGUR BUFE', location: 'UGUR BUFE', visit: 1, code: '260' },
        { customer: 'ENGIN MARKET-ENGIN SIT', location: 'ENGIN MARKET-ENGIN SIT', visit: 0, code: '312' },
        { customer: 'MOKKI', location: 'MOKKI', visit: 0 },
        { customer: 'CAN BÜFE SERKAN ÇALIŞKAN', location: 'CAN BÜFE SERKAN ÇALIŞKAN', visit: 0, code: '312' },
        { customer: 'YAVUZ BÜFE', location: 'YAVUZ BÜFE', visit: 0, code: '312' },
        { customer: 'MASLAK ARENA', location: 'MASLAK ARENA', visit: 1, code: '312' },
        { customer: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', location: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', visit: 1, code: '312' },
        { customer: 'TEKEL 61-İDRİS BAŞALI', location: 'TEKEL 61-İDRİS BAŞALI', visit: 1, code: '312' },
        { customer: 'ARZU GIDA-AHMET AKSU', location: 'ARZU GIDA-AHMET AKSU', visit: 1, code: '312' },
        { customer: 'BARBADOS TÜTÜN', location: 'BARBADOS TÜTÜN', visit: 1, code: '312' }
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
      this.$store.dispatch('getData', {...this.query, api: this.$route.meta.baseLink, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
