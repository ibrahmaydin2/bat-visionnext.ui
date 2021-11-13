<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.RouteDailyRecord.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.RouteDailyRecord.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.RouteDailyRecord.Status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Representative, 'object', 'get.RouteDailyRecord.Representative')"></div>
              <div v-html="getFormatDataByType(rowData.Vehicle, 'object', 'get.RouteDailyRecord.Vehicle')"></div>
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'get.RouteDailyRecord.Route')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCancelReason, 'object', 'get.RouteDailyRecord.RouteCancelReason')"></div>
              <div v-html="getFormatDataByType(rowData.RouteDate, 'date', 'get.RouteDailyRecord.RouteDate')"></div>
              <div v-html="getFormatDataByType(rowData.RouteStartTime, 'text', 'get.RouteDailyRecord.RouteStartTime')"></div>
              <div v-html="getFormatDataByType(rowData.RouteEndTime, 'text', 'get.RouteDailyRecord.RouteEndTime')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SalesCount, 'text', 'get.RouteDailyRecord.SalesCount')"></div>
              <div v-html="getFormatDataByType(rowData.SalesTotal, 'text', 'get.RouteDailyRecord.SalesTotal')"></div>
              <div v-html="getFormatDataByType(rowData.StartKm, 'text', 'get.RouteDailyRecord.StartKm')"></div>
              <div v-html="getFormatDataByType(rowData.EndKm, 'text', 'get.RouteDailyRecord.EndKm')"></div>
              <div v-html="getFormatDataByType(rowData.SuccessVisitCount, 'text', 'get.RouteDailyRecord.SuccessVisitCount')"></div>
              <div v-html="getFormatDataByType(rowData.PlannedVisitCount, 'text', 'get.RouteDailyRecord.PlannedVisitCount')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RouteDailyRecord.Visits')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small sticky-header="500px">
                  <b-thead>
                    <b-th><span>{{$t('insert.route.CustomerId')}}</span></b-th>
                    <b-th><span>{{$t('insert.RouteDailyRecord.CustomerName')}}</span></b-th>
                    <b-th><span>{{$t('get.RouteDailyRecord.VisitStart')}}</span></b-th>
                    <b-th><span>{{$t('get.RouteDailyRecord.VisitEnd')}}</span></b-th>
                    <b-th><span>{{$t('get.RouteDailyRecord.IsOutRoute')}}</span></b-th>
                    <b-th><span>{{$t('get.RouteDailyRecord.VisitReason')}}</span></b-th>
                    <b-th><span>{{$t('list.operations')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in routeDetails" :key="i">
                      <b-td>{{r.Customer ? r.Customer.Code : ''}}</b-td>
                      <b-td>{{r.Customer ? r.Customer.Label : ''}}</b-td>
                      <b-td>{{r.VisitStartTime ? r.VisitStartTime: ''}}</b-td>
                      <b-td>{{r.VisitEndTime ? r.VisitEndTime: ''}}</b-td>
                      <b-td>{{(typeof r.IsOutofrouteVisit === 'undefined') ? '' : (r.IsOutofrouteVisit) ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.VisitCancelReason ? r.VisitCancelReason.Label: ''}}</b-td>
                      <b-td class="text-center">
                        <i @click="showMap(r)" class="fa fa-map-marker-alt text-primary mr-1"></i>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
            <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
              <NextLocation :Location='Location' />
            </b-modal>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      rowData: [],
      routeDetails: [],
      datas: [],
      Location: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
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
    },
    getData () {
      this.$api.postByUrl({recordId: this.$route.params.url}, 'VisionNextRoute/api/RouteDailyRecord/Get').then((res) => {
        this.rowData = res.Model
        let request = {
          'AndConditionModel': {
            'RouteIds': [res.Model.RouteId]
          }
        }
        this.$api.postByUrl(request, '/VisionNextRoute/api/RouteDetail/Search').then((response) => {
          this.routeDetails = response.ListModel.BaseModels
          let request1 = {
            'AndConditionModel': {
              'RouteDailyIds': [this.$route.params.url]
            }
          }
          this.$api.postByUrl(request1, '/VisionNextCommonApi/api/Visit/Search').then((res1) => {
            let visits = res1.ListModel.BaseModels
            let tmpArr = []
            this.routeDetails.map((routeDetail, index) => {
              visits.map((visit, i) => {
                if (routeDetail.CustomerId === visit.CustomerId) {
                  tmpArr.push(visit)
                  this.routeDetails.splice(this.routeDetails.indexOf(routeDetail), 1)
                  delete visits[i]
                }
              })
            })
            visits.map(visit => {
              this.routeDetails.push(visit)
            })
            tmpArr.map(visit => {
              this.routeDetails.push(visit)
            })
            this.routeDetails.reverse()
          })
        })
      })
    }
  }
}
</script>
