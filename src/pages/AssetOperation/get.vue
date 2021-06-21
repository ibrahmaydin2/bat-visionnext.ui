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
            <span><i class="fas fa-code" />  <b>{{$t('insert.AssetOperation.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.AssetOperation.Description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.AssetOperation.ServiceDuration')}}:</b> {{ rowData.ServiceDuration }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.AssetOperation.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.AssetOperation.IsAssetUsed')}}:</b> {{(rowData.IsAssetUsed) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.AssetOperation.AssetUsage')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.AssetOperationDetails" :items="assetOperationDetailsItems" />
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      assetOperationDetailsItems: detailData.assetOperationDetailsItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/AssetOperation', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
