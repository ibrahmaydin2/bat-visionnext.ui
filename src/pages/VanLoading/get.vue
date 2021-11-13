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
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.vanLoading.fromWarehouseId')}}:</b> {{ rowData.FromWarehouse ? rowData.FromWarehouse.Label : '' }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.vanLoading.routeId')}}:</b> {{ rowData.Route ? rowData.Route.Label : '' }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.vanLoading.loadingDate')}}:</b> {{ dateConvertFromTimezone(rowData.LoadingDate) }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.vanLoading.isDone')}}:</b> <i :class="rowData.IsDone === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i> </span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.loadingplan.items')}}</h6>
                <b-table-simple responsive bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.vanLoading.items')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.unit')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.FromWhStockQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.ToWhStockQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.AverageSalesQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.LastSalesQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.LastdaySalesQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.SuggestedQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.vanLoading.LoadingQuantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.VanLoadingItems" :key="i">
                      <b-td>{{r.Item ? r.Item.Label : ''}}</b-td>
                      <b-td>{{r.Unit ? r.Unit.Label : ''}}</b-td>
                      <b-td>{{r.FromWhStockQuantity}}</b-td>
                      <b-td>{{r.ToWhStockQuantity}}</b-td>
                      <b-td>{{r.AverageSalesQuantity}}</b-td>
                      <b-td>{{r.LastSalesQuantity}}</b-td>
                      <b-td>{{r.LastdaySalesQuantity}}</b-td>
                      <b-td>{{r.SuggestedQuantity}}</b-td>
                      <b-td>{{r.LoadingQuantity}}</b-td>
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextStockManagement/api/VanLoading', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
