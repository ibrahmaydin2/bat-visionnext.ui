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
            <span><i class="fas fa-code" />  <b>{{$t('insert.route.routeCode')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.route.routeType')}}:</b> {{(rowData.RouteType) ? rowData.RouteType.Label : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.route.status')}}:</b> {{(rowData.StatusId) ? $t('insert.route.active'): $t('insert.route.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.route.title')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.route.routeGroup')}}</span>
                <p>{{(rowData.routeGroup) ? rowData.routeGroup.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.routeClass')}}</span>
                <p>{{(rowData.RouteClass) ? rowData.RouteClass.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.vehicle')}}</span>
                <p>{{(rowData.Vehicle) ? rowData.Vehicle.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.personel')}}</span>
                <p>{{(rowData.Representative) ? rowData.Representative.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.supervisor')}}</span>
                <p>{{(rowData.Supervisor) ? rowData.Supervisor.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.control')}}</span>
                <p>{{(rowData.VisitStartControl) ? rowData.VisitStartControl.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.city')}}</span>
                <p>{{rowData.City}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.route.distirict')}}</span>
                <p>{{rowData.Description1}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.route.town')}}</span>
                <p></p> -->
                <!-- <span><i class="far fa-circle" /> {{$t('insert.route.type')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.route.customerArea')}}</span>
                <p></p> -->
                <span><i class="far fa-circle" /> {{$t('insert.route.multiDayRoute')}}</span>
                <p><i :class="rowData.IsMultidayRoute === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.route.superRoute')}}</span>
                <p><i :class="rowData.IsSuperRoute === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.locations')}}</h6>
                <!-- <b-table responsive :items="rowData.routeDetails" :fields="fields">
                  <template #cell(customer)="data">
                    {{data}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table> -->
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.route.CustomerId')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.LocationId')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day1VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day2VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day3VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day4VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day5VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day6VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day7VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('list.operations')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.RouteDetails" :key="i">
                      <b-td>{{r.Customer ? r.Customer.Label : ''}}</b-td>
                      <b-td>{{r.Location ? r.Location.Label : ''}}</b-td>
                      <b-td>{{r.Day1VisitOrder}}</b-td>
                      <b-td>{{r.Day2VisitOrder}}</b-td>
                      <b-td>{{r.Day3VisitOrder}}</b-td>
                      <b-td>{{r.Day4VisitOrder}}</b-td>
                      <b-td>{{r.Day5VisitOrder}}</b-td>
                      <b-td>{{r.Day6VisitOrder}}</b-td>
                      <b-td>{{r.Day7VisitOrder}}</b-td>
                      <b-td class="text-center"><i @click="removeRouteDetails(r)" class="far fa-trash-alt text-danger"></i></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <!-- <b-tab :title="$t('insert.other')">
           <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.other')}}</h6>
                <span><i class="far fa-circle" /> MarketingRegion1 </span>
                <p>{{(rowData.MarketingRegion1) ? rowData.MarketingRegion1.Label : ''}}</p>
                <span><i class="far fa-circle" /> MarketingRegion2 </span>
                <p>{{(rowData.MarketingRegion2) ? rowData.MarketingRegion2.Label : ''}}</p>
                <span><i class="far fa-circle" /> MarketingRegion3 </span>
                <p>{{(rowData.MarketingRegion3) ? rowData.MarketingRegion3.Label : ''}}</p>
                <span><i class="far fa-circle" /> MarketingRegion4 </span>
                <p>{{(rowData.MarketingRegion4) ? rowData.MarketingRegion4.Label : ''}}</p>
                <span><i class="far fa-circle" /> MarketingRegion5 </span>
                <p>{{(rowData.MarketingRegion5) ? rowData.MarketingRegion5.Label : ''}}</p>
                <span><i class="far fa-circle" /> BranchId </span>
                <p>{{rowData.BranchId}}</p>
                <span><i class="far fa-circle" /> CompanyId </span>
                <p>{{rowData.CompanyId}}</p>
                <span><i class="far fa-circle" /> CreatedDateTime </span>
                <p>{{rowData.CreatedDateTime}}</p>
                <span><i class="far fa-circle" /> CreatedUser </span>
                <p>{{rowData.CreatedUser}}</p>
                <span><i class="far fa-circle" /> Deleted </span>
                <p>{{rowData.Deleted}}</p>
                <span><i class="far fa-circle" /> ManagerId </span>
                <p>{{rowData.ManagerId}}</p>
                <span><i class="far fa-circle" /> ModifiedDateTime </span>
                <p>{{rowData.ModifiedDateTime}}</p>
                <span><i class="far fa-circle" /> ModifiedUser </span>
                <p>{{rowData.ModifiedUser}}</p>
                <span><i class="far fa-circle" /> RecordId </span>
                <p>{{rowData.RecordId}}</p>
                <span><i class="far fa-circle" /> RecordState </span>
                <p>{{rowData.RecordState}}</p>
                <span><i class="far fa-circle" /> RepresentativeId </span>
                <p>{{rowData.RepresentativeId}}</p>
                <span><i class="far fa-circle" /> RouteClassId </span>
                <p>{{rowData.RouteClassId}}</p>
                <span><i class="far fa-circle" /> RouteDetails </span>
                <p>{{rowData.RouteDetails}}</p>
                <span><i class="far fa-circle" /> RouteGroupId </span>
                <p>{{rowData.RouteGroupId}}</p>
                <span><i class="far fa-circle" /> RouteTypeId </span>
                <p>{{rowData.RouteTypeId}}</p>
                <span><i class="far fa-circle" /> Status </span>
                <p>{{rowData.Status}}</p>
                <span><i class="far fa-circle" /> SupervisorId </span>
                <p>{{rowData.SupervisorId}}</p>
                <span><i class="far fa-circle" /> System </span>
                <p>{{rowData.System}}</p>
                <span><i class="far fa-circle" /> TerminalId </span>
                <p>{{rowData.TerminalId}}</p>
                <span><i class="far fa-circle" /> VehicleId </span>
                <p>{{rowData.VehicleId}}</p>
                <span><i class="far fa-circle" /> VisitStartControlId </span>
                <p>{{rowData.VisitStartControlId}}</p>
              </b-card>
            </b-col>
           </b-row>
        </b-tab> -->
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextRoute/api/Route', record: this.$route.params.url})
    }
  },
  watch: {
    rowData: function (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="sass">
</style>
