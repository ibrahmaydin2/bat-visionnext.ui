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
            <span><i class="fas fa-code" />  <b>{{$t('insert.loyaltyGain.financeCode')}}:</b> {{rowData.FinanceCode}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.description1')}}:</b> {{rowData.Description1}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyGain.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.loyaltyGain.customer')"></div>
              <div v-html="getFormatDataByType(rowData.Loyalty, 'object', 'insert.loyaltyGain.loyalty')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'insert.loyaltyGain.date')"></div>
              <div v-html="getFormatDataByType(rowData.Employee, 'object', 'insert.loyaltyGain.employee')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyGain.loyalty')">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table
                  :fields="loyaltyGainDetailFields"
                  :items="(rowData && rowData.LoyaltyGainDetails ? rowData.LoyaltyGainDetails.filter(l => l.Value > 0) : [])"
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
      loyaltyGainDetailFields: detailData.loyaltyGainDetailFields
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextLoyalty/api/LoyaltyGain', record: this.$route.params.url})
    }
  }
}
</script>
