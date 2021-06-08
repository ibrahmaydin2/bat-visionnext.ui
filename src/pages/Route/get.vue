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
            <span><i class="far fa-circle" />  <b>{{$t('insert.route.name')}}:</b> {{(rowData.Description1) ? rowData.Description1 : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.route.status')}}:</b> {{(rowData.StatusId) ? $t('insert.route.active'): $t('insert.route.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.route.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'insert.route.vehicle')"></div>
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'insert.route.personel')"></div>
              <div v-html="getFormatDataByType(rowData.Supervisor, 'object', 'insert.route.supervisor')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.route.customerArea')"></div>
              <div v-html="getFormatDataByType(rowData.VisitStartControl, 'object', 'insert.route.control')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.City, 'object', 'insert.route.city')"></div>
              <div v-html="getFormatDataByType(rowData.District, 'object', 'insert.route.district')"></div>
              <div v-html="getFormatDataByType(rowData.IsMultidayRoute, 'check', 'insert.route.multiDayRoute')"></div>
              <div v-html="getFormatDataByType(rowData.IsSuperRoute, 'check', 'insert.route.superRoute')"></div>
              <div v-html="getFormatDataByType(rowData.MarketingRegion5, 'object', 'insert.route.marketingArea')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.route.locations')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('list.location')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Customer')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Location')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day1VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day2VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day3VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day4VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day5VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day6VisitOrder')}}</span></b-th>
                    <b-th><span>{{$t('insert.route.Day7VisitOrder')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.RouteDetails" :key="i">
                      <b-td class="text-center">
                        <i @click="showMap(r)" class="fa fa-map-marker-alt text-primary"></i>
                      </b-td>
                      <b-td>{{r.Customer ? r.Customer.Code + '-' + r.Customer.Label : ''}}</b-td>
                      <b-td>{{r.Location ? r.Location.Code + '-' + r.Location.Label : ''}}</b-td>
                      <b-td>{{r.Day1VisitOrder}}</b-td>
                      <b-td>{{r.Day2VisitOrder}}</b-td>
                      <b-td>{{r.Day3VisitOrder}}</b-td>
                      <b-td>{{r.Day4VisitOrder}}</b-td>
                      <b-td>{{r.Day5VisitOrder}}</b-td>
                      <b-td>{{r.Day6VisitOrder}}</b-td>
                      <b-td>{{r.Day7VisitOrder}}</b-td>
                    </b-tr>
                    <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
                      <NextLocation :Location='Location' />
                    </b-modal>
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
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
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
      ],
      Location: {}
    }
  },
  mounted () {
    this.getData()
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
    },
    showMap (item) {
      this.$api.post({RecordId: item.LocationId}, 'Customer', 'CustomerLocation/Get').then((res) => {
        this.Location = res.Model
        if (res.Model) {
          if (res.Model.XPosition == null || res.Model.YPosition == null) {
            this.$toasted.show(this.$t('index.errorLocation'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          this.$nextTick(() => {
            this.$root.$emit('bv::show::modal', 'location-modal', res.Model)
          })
        } else {
          this.$toasted.show(this.$t('index.errorLocation'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    }
  }
}
</script>
<style lang="sass">
</style>
