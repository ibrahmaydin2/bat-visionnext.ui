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
            <span><i class="fas fa-check" />  <b>{{$t('insert.periodicSalesComparison.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.periodicSalesComparison.Code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.periodicSalesComparison.Definitions')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.periodicSalesComparison.Description1')"></div>
              <div v-html="getFormatDataByType(rowData.Definition, 'text', 'insert.periodicSalesComparison.Definition')"></div>
              <div v-html="getFormatDataByType(rowData.PastSaleStartDate, 'date', 'insert.periodicSalesComparison.PastSalesStart')"></div>
              <div v-html="getFormatDataByType(rowData.PastSaleEndDate, 'date', 'insert.periodicSalesComparison.PastSalesEnd')"></div>
              <div v-html="getFormatDataByType(rowData.PastSaleQuantity, 'text', 'insert.periodicSalesComparison.PastSalesControlAmount')"></div>
              <div v-html="getFormatDataByType(rowData.BranchCriteria, 'object', 'insert.periodicSalesComparison.BranchCriterion')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.NextSaleStartDate, 'date', 'insert.periodicSalesComparison.NextSalesStart')"></div>
              <div v-html="getFormatDataByType(rowData.NextSaleEndDate, 'date', 'insert.periodicSalesComparison.NextSalesEnd')"></div>
              <div v-html="getFormatDataByType(rowData.NextSaleQuantity, 'text', 'insert.periodicSalesComparison.NextSalesControlAmount')"></div>
              <div v-html="getFormatDataByType(rowData.ItemCriteria, 'object', 'insert.periodicSalesComparison.ProductCriteria')"></div>
              <div v-html="getFormatDataByType(rowData.PastSaleColor, 'object', 'insert.periodicSalesComparison.PastSaleColor')"></div>
              <div v-html="getFormatDataByType(rowData.NextSaleColor, 'object', 'insert.periodicSalesComparison.NextSaleColor')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.periodicSalesComparison.Products')" v-if="rowData.ItemCriteriaId === 24">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(p, i) in (rowData.PeriodicSalesComparisonDetails ? rowData.PeriodicSalesComparisonDetails.filter(p => p.TableName == 'T_ITEM') : [])" :key="i">
                     <b-td>{{p.ColumnNameDesc}}</b-td>
                     <b-td>{{p.ColumnValueDesc}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.periodicSalesComparison.Branches')" v-if="rowData.BranchCriteriaId === 30">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.branchCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.branchName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(b, i) in (rowData.PeriodicSalesComparisonDetails ? rowData.PeriodicSalesComparisonDetails.filter(b => b.TableName == 'T_BRANCH') : [])" :key="i">
                       <b-td>{{b.Code}}</b-td>
                       <b-td>{{b.Description1}}</b-td>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/PeriodicSalesComparison', record: this.$route.params.url})
    }
  }
}
</script>
