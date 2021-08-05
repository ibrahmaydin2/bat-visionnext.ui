<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="far fa-circle" />  <b>{{$t('get.description1')}}:</b> {{ rowData.Description1 }}</span>
             <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.assetService.details')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.assetService.genexp1')"></div>
              <div v-html="getFormatDataByType(rowData.ServiceNumber, 'text', 'insert.assetService.serviceNumber')"></div>
              <div v-html="getFormatDataByType(rowData.IsAssetMovement, 'check', 'insert.assetService.isAssetMovement')"></div>
              <div v-html="getFormatDataByType(rowData.ServiceState, 'object', 'insert.assetService.serviceState')"></div>
              <div v-html="getFormatDataByType(rowData.RequestDate, 'date', 'insert.assetService.requestDate')"></div>
              <div v-html="getFormatDataByType(rowData.RequestTime, 'text', 'insert.assetService.requestTime')"></div>
              <div v-html="getFormatDataByType(rowData.Location, 'object', 'insert.assetService.location')"></div>
              <div v-html="getFormatDataByType(rowData.Employee, 'object', 'insert.assetService.employee')"></div>
              <div v-html="getFormatDataByType(rowData.ResponseDate, 'date', 'insert.assetService.responseDate')"></div>
              <div v-html="getFormatDataByType(rowData.ResponseTime, 'text', 'insert.assetService.responseTime')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.AssetType, 'object', 'insert.assetService.assetType')"></div>
              <div v-html="getFormatDataByType(rowData.Asset, 'object', 'insert.assetService.asset')"></div>
              <div v-html="getFormatDataByType(rowData.ServiceType, 'object', 'insert.assetService.serviceType')"></div>
              <div v-html="getFormatDataByType(rowData.ItemSelectionMethod, 'object', 'insert.assetService.itemSelectionMethod')"></div>
              <div v-html="getFormatDataByType(rowData.EstimatedResponseDate, 'date', 'insert.assetService.estimatedResponseDate')"></div>
              <div v-html="getFormatDataByType(rowData.EstimatedResponseTime, 'text', 'insert.assetService.estimatedResponseTime')"></div>
              <div v-html="getFormatDataByType(rowData.CompletionDate, 'date', 'insert.assetService.completionDate')"></div>
              <div v-html="getFormatDataByType(rowData.CompletionTime, 'text', 'insert.assetService.completionTime')"></div>
              <div v-html="getFormatDataByType(rowData.FromLocation, 'object', 'insert.assetService.fromLocation')"></div>
              <div v-html="getFormatDataByType(rowData.SerialNumber, 'text', 'insert.assetService.serialNumber')"></div>
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/Service', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
