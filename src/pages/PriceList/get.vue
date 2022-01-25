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
            <span><i class="fas fa-code" /><b>{{$t('insert.PriceList.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" /><b>{{$t('insert.PriceList.Description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" /><b>{{$t('insert.PriceList.Status')}}: </b>{{ rowData.StatusId === 1 ? $t('insert.PriceList.Active') : $t('insert.PriceList.Passive') }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.PriceList.PriceList')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.PriceList.PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'insert.PriceList.CurrencyId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.BeginDate, 'date', 'insert.PriceList.BeginDate')"></div>
              <div v-html="getFormatDataByType(rowData.EndDate, 'date', 'insert.PriceList.EndDate')"></div>
            </b-card>
          </b-row>
          <b-row class="p-4">
            <b-table responsive autoWidth bordered small id="product-list" :per-page="20" :current-page="currentPage" :items="rowData.PriceListItems" :fields="fields">
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(IsVatIncluded)="data">
                <i :class="data.item.IsVatIncluded === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
              </template>
              <template #cell(UseConsumerPrice)="data">
                 <i :class="data.item.UseConsumerPrice === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
              </template>
            </b-table>
            <b-pagination
              :total-rows="rowData.PriceListItems.length"
              v-model="currentPage"
              :per-page="20"
              aria-controls="product-list"
            ></b-pagination>
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
    return {
      currentPage: 1,
      fields: [
        {
          key: 'Item.Code',
          label: this.$t('insert.PriceList.ProductCode'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'Item.Label',
          label: this.$t('insert.PriceList.ProductName'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'IsVatIncluded',
          label: this.$t('insert.PriceList.IsVatIncluded'),
          thClass: 'list-checkbox-width'
        },
        {
          key: 'UseConsumerPrice',
          label: this.$t('insert.PriceList.UseConsumerPrice'),
          thClass: 'list-checkbox-width'
        },
        {
          key: 'SalesPrice',
          label: this.$t('insert.PriceList.SalesPrice'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'ConsumerPrice',
          label: this.$t('insert.PriceList.ConsumerPrice'),
          thClass: 'list-textbox-width'
        }
      ]
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFinance/api/PriceList', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
