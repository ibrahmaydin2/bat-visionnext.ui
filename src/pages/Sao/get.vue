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
            <span><i class="fas fa-code" /> <b>{{$t('get.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" /> <b>{{$t('get.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : $t('insert.active')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.sao.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ValidityStartDate, 'date', 'insert.sao.validityStartDate')"></div>
              <div v-html="getFormatDataByType(rowData.ValidityEndDate, 'date', 'insert.sao.validityEndDate')"></div>
              <div v-html="getFormatDataByType(rowData.StaffType, 'object', 'insert.sao.staffType')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BcpClusterCrteria, 'object', 'insert.sao.bcpClusterCrteria')"></div>
              <div v-html="getFormatDataByType(rowData.RegionCriteria, 'object', 'insert.sao.regionCriteria')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.sao.details')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.SaoDetails" :items="soaDetailItems" />
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
  data () {
    return {
      soaDetailItems: detailData.soaDetailItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/Sao', record: this.$route.params.url})
    }
  }
}
</script>
