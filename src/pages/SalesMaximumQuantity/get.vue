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
      <b-tabs>
        <b-tab :title="$t('insert.SalesMaximumQuantity.title')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Code, 'text', 'get.SalesMaximumQuantity.Code')"></div>
              <div v-html="getFormatDataByType(rowData.StatusId ? $t('insert.active') : $t('insert.passive'), 'text', 'get.SalesMaximumQuantity.StatusId')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'get.Description1.Code')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'get.SalesMaximumQuantity.BeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.EndDate, 'date', 'get.SalesMaximumQuantity.BeginDate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.SalesMaximumQuantity.CustomerList')">
          <b-row>
            <b-col>
              <!-- <b-card class="m-3 asc__showPage-card">
                <NextDetailPanelSalesMaxQuantity type="get" v-model="rowData.SalesMaximumQuantityCustomers" :items="salesMaximumQuantityCustomersItems" />
              </b-card> -->
                <b-card class="m-3 asc__showPage-card">
                  <b-table
                    :items="rowData.SalesMaximumQuantityCustomers"
                    :fields="fields"
                    :current-page="SalesMaximumQuantityCustomersCurrentPage"
                    :per-page="perPage"
                    small
                    bordered
                    responsive
                  >
                  </b-table>
                  <b-pagination
                    v-model="SalesMaximumQuantityCustomersCurrentPage"
                    :total-rows="rowData.SalesMaximumQuantityCustomers.length"
                    :per-page="perPage">
                  </b-pagination>
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
//import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      //salesMaximumQuantityCustomersItems: detailData.salesMaximumQuantityCustomersItems,
      SalesMaximumQuantityCustomersCurrentPage : 1,
      perPage: 10,
      fields: [
        { key: 'Code', label: 'Kod' },
        { key: 'Customer.Code', label: 'Müşteri Kodu' },
        { key: 'Customer.Label', label: 'Müşteri Adı' },
        { key: 'IsTotalQuantity', label: 'Üst Limitleme Yöntemi' },
        { key: 'Quantity', label: 'Miktar' },
      ],
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextInvoice/api/SalesMaximumQuantity', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
