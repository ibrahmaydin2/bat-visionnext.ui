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
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.contract.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
             <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.LoadingDate, 'date', 'insert.loadingplan.LoadingDate')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Route, 'object', 'insert.loadingplan.Route')"></div>
            </b-card>
          </b-row>
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.loadingplan.items')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('insert.loadingplan.items')}}</b-th>
                      <b-th>{{$t('insert.loadingplan.PlanQuantity')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(result, i) in rowData.LoadingPlanItems" :key="i">
                      <b-td>{{ result.Item ? result.Item.Label : result.Description1 }}</b-td>
                      <b-td>{{ result.PlanQuantity }}</b-td>
                    </tr>
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextStockManagement/api/LoadingPlan', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
