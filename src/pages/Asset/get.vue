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
            <span><i class="fas fa-code" />  <b>{{$t('get.asset.code')}}:</b> {{rowData.Code && rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.asset.description1')}}:</b> {{rowData.Description1}}</span>
            <!-- <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span> -->
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.asset.general')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Producer, 'object', 'get.asset.producer')"></div>
              <div v-html="getFormatDataByType(rowData.Brand, 'object', 'get.asset.brand')"></div>
              <div v-html="getFormatDataByType(rowData.Model, 'object', 'get.asset.model')"></div>
              <div v-html="getFormatDataByType(rowData.AssetType, 'object', 'get.asset.assetType')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'get.asset.type')"></div>
              <div v-html="getFormatDataByType(rowData.AssetClass, 'object', 'get.asset.assetClass')"></div>
              <div v-html="getFormatDataByType(rowData.TrackType, 'object', 'get.asset.trackType')"></div>
              <div v-html="getFormatDataByType(rowData.Barcode, 'text', 'get.asset.barcode')"></div>
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
  data () {
    return {}
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/Asset', record: this.$route.params.url})
    }
  }
}
</script>
