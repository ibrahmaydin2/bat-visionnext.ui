<template>
  <div class="asc__showPage">
    <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
      <NextLocation :Location='Location' />
    </b-modal>
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
              <div v-html="getFormatDataByType(rowData.RouteType, 'object', 'insert.route.routeType')"></div>
              <div v-html="getFormatDataByType(rowData.VisitStartControl, 'object', 'insert.route.control')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.route.customerArea')"></div>
              <div v-html="getFormatDataByType(rowData.MarketingRegion5, 'object', 'insert.route.marketingArea')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.City, 'object', 'insert.route.city')"></div>
              <div v-html="getFormatDataByType(rowData.District, 'object', 'insert.route.district')"></div>
              <div v-html="getFormatDataByType(rowData.Parish, 'object', 'insert.route.parish')"></div>
              <div v-html="getFormatDataByType(rowData.IsMultidayRoute, 'check', 'insert.route.multiDayRoute')"></div>
              <div v-html="getFormatDataByType(rowData.IsSuperRoute, 'check', 'insert.route.superRoute')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.route.locations')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card" >
                <NextDetailPanel type="get"  v-model="rowData.RouteDetails" :items="locationItems" :detail-buttons="detailButtons" />
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
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'

export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      Location: {},
      detailButtons: [
        {
          icon: 'fa fa-map-marker-alt text-primary mr-1',
          getDetail: (data) => {
            this.showMap(data)
          }
        }
      ],
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
