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
            <span><i class="far fa-circle" />  <b>{{$t('insert.customerSItemCriteria.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.customerSItemCriteria.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.customerSItemCriteria.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customerSItemCriteria.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ItemCriteria, 'object', 'insert.customerSItemCriteria.itemCriteria')"></div>
            </b-card>
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'insert.customerSItemCriteria.customerCriteria')"></div>
            </b-card>
            <b-card class="col-md-4 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SItemType, 'object', 'insert.customerSItemCriteria.sItemType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.itemCriteria')" v-if="rowData.ItemCriteria && rowData.ItemCriteria.Code === 'UK'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="itemCriterias" :items="itemCriteriaItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customerCriteria')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="customerCriteriaItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customers')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerSItemCustomers" :items="customerItems" />
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
      itemCriterias: [],
      customerCriterias: [],
      itemCriteriaItems: detailData.itemCriteriaItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      customerItems: detailData.customerItems
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/CustomerSItemCriteria', record: this.$route.params.url}).then(() => {
        this.itemCriterias = this.rowData.CustomerSItemDetails.filter(i => i.TableName === 'T_ITEM')
        this.customerCriterias = this.rowData.CustomerSItemDetails.filter(i => i.TableName === 'T_CUSTOMER')
      })
    }
  }
}
</script>
