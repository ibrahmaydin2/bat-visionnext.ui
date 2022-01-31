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
            <span><i class="fas fa-code" />  <b>{{$t('insert.CustomerTarget.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.CustomerTarget.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.CustomerTarget.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.CustomerTarget.title')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ErpCode, 'text', 'insert.CustomerTarget.ErpCode')"></div>
              <div v-html="getFormatDataByType(rowData.TciBreak1, 'object', 'insert.CustomerTarget.TciBreak1Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ItemColumnName, 'object', 'insert.CustomerTarget.ItemColumnName')"></div>
              <div v-html="getFormatDataByType(rowData.ItemColumnValue, 'object', 'insert.CustomerTarget.ItemColumnValue')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTargetDetails')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerTargetDetails" :items="customerTargetDetailsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTargetDates')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerTargetDates" :items="customerTargetDatesItems" />
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
      customerTargetDetailsItems: detailData.customerTargetDetailsItems,
      customerTargetDatesItems: detailData.customerTargetDatesItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/CustomerTarget', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
