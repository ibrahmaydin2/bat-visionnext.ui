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
            <GetFormField />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" /> <b>{{$t('get.LoyaltySummary.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Loyalty, 'object', 'get.LoyaltySummary.LoyaltyId')"></div>
              <div v-html="getFormatDataByType(rowData.Branch, 'object', 'get.LoyaltySummary.BranchId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.LoyaltySummary.CustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.ConsumedTotalScore, 'text', 'get.LoyaltySummary.ConsumptionScore')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.LoyaltySummary.PointGains')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('get.LoyaltySummary.LoyaltyCategory')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.PointGainsTransactionDate')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.Representative')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.TransactionScore')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.Description1')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.PointGains " :key="i">
                      <b-td>{{r.LoyaltyCategory ? r.LoyaltyCategory.Label : '-'}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.TransactionDate)}}</b-td>
                      <b-td>{{r.Representative ? r.Representative.Label : '-'}}</b-td>
                      <b-td>{{r.TransactionScore}}</b-td>
                      <b-td>{{r.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.LoyaltySummary.PointExpenditures')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('get.LoyaltySummary.PointExpendituresCategory')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.PointExpendituresTransactionDate')}}</span></b-th>
                    <b-th><span>{{$t('get.LoyaltySummary.PointExpendituresConsumptionScore')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.PointExpenditures " :key="i">
                      <b-td>{{r.LoyaltyCatalogue ? r.LoyaltyCatalogue.Label : '-'}}</b-td>
                      <b-td>{{dateConvertFromTimezone(r.TransactionDate)}}</b-td>
                      <b-td>{{r.ConsumptionScore}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
export default {
  mixins: [mixin],
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextLoyalty/api/LoyaltySummary`, record: this.$route.params.url})
    }
  }
}
</script>
