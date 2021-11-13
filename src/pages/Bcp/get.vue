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
            <span><i class="fas fa-code" />  <b>{{$t('insert.bcp.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.bcp.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.bcp.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.bcp.Bcp')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DiscountGroup7, 'object', 'insert.bcp.DiscountGroup7Id')"></div>
              <div v-html="getFormatDataByType(rowData.Year, 'text', 'insert.bcp.Year')"></div>
              <div v-html="getFormatDataByType(rowData.LabelMonth, 'object', 'insert.bcp.Month')"></div>
              <div v-html="getFormatDataByType(rowData.EndYear, 'text', 'insert.bcp.EndYear')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.LabelEndMonthh, 'object', 'insert.bcp.EndMonth')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerRegion3, 'object', 'insert.bcp.CustomerRegion3Id')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'insert.bcp.BranchCriteriaId')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.bcp.items')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.BCPDetails" :items="bcpDetailsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.bcp.branchs')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.BCPBranchs" :items="bcpBranchsItems" />
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
      bcpDetailsItems: detailData.bcpDetailsItems,
      bcpBranchsItems: detailData.bcpBranchsItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/BCP', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
