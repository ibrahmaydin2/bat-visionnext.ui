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
            <span><i class="fas fa-code" />  <b>{{$t('insert.priceDecrease.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.priceDecrease.description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.priceDecrease.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.priceDecrease.priceListCategory')"></div>
              <div v-html="getFormatDataByType(rowData.TciBreak, 'object', 'insert.priceDecrease.tciBreak1')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'insert.priceDecrease.beginDate')"></div>
              <div v-html="getFormatDataByType(rowData.EndDate, 'date', 'insert.priceDecrease.endDate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.priceDecrease.items')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table
                  :fields="(priceDecreaseItemFields ? priceDecreaseItemFields.filter(p => p.key !== 'operations'): [])"
                  :items="rowData.PriceDecreaseItems"
                  bordered responsive >
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
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
      priceDecreaseItemFields: detailData.priceDecreaseItemFields
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/PriceDecrease', record: this.$route.params.url})
    }
  }
}
</script>
