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
            <span><i class="far fa-circle" />  <b>{{$t('insert.unitSet.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.unitSet.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.unitSet.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.unitSet.description1')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.unitSet.cardType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.unitSet.units')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.Units" :items="unitItems" />
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
      unitItems: detailData.unitItems
    }
  },
  mounted () {
    this.getRowData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getRowData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextUnit/api/UnitSet', record: this.$route.params.url})
    }
  }
}
</script>
