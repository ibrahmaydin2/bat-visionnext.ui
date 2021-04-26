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
      <!-- <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.Status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row> -->
      <b-tabs>
        <b-tab :title="$t('get.assetLocation.general')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.LastMovementDate, 'date', 'get.assetLocation.lastMovementDate')"></div>
              <div v-html="getFormatDataByType(rowData.Asset, 'object', 'get.assetLocation.asset')"></div>
              <div v-html="getFormatDataByType(rowData.Location, 'object', 'get.assetLocation.location')"></div>
              <div v-html="getFormatDataByType(rowData.LastOperationDate, 'date', 'get.assetLocation.lastOperationDate')"></div>
              <div v-html="getFormatDataByType(rowData.Condition, 'object', 'get.assetLocation.condition')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.State, 'object', 'get.assetLocation.state')"></div>
              <div v-html="getFormatDataByType(rowData.SerialNumber, 'text', 'get.assetLocation.serialNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Contact, 'object', 'get.assetLocation.contact')"></div>
              <div v-html="getFormatDataByType(rowData.AssetPosition, 'object', 'get.assetLocation.assetPosition')"></div>
              <div v-html="getFormatDataByType(rowData.Quantity, 'text', 'get.assetLocation.quantity')"></div>
              <div v-html="getFormatDataByType(rowData.SerialNumber2, 'text', 'get.assetLocation.serialNumber2')"></div>
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
    return {
      RmaStatus: {},
      RmaType: {}
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style', 'lookup'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/AssetLocation', record: this.$route.params.url}).then(() => {
      })
    }
  }
}
</script>
