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
            <span><i class="fas fa-code" />  <b>{{$t('insert.item.Model_Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.item.Model_Description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.item.Model_GroupId')"></div>
              <div v-html="getFormatDataByType(rowData.ShortDescription, 'text', 'insert.item.Model_ShortDescription')"></div>
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.item.Model_CardTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.ProducerCode, 'object', 'insert.item.Model_ProducerCodeId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.item.Model_TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.item.Model_ClassId')"></div>
              <div v-html="getFormatDataByType(rowData.Category, 'object', 'insert.item.Model_CategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.FilterType, 'object', 'get.Item.FilterTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.FilterColor, 'object', 'get.Item.FilterColorId')"></div>
              <div v-html="getFormatDataByType(rowData.Dimension, 'object', 'get.Item.DimensionId')"></div>
              <div v-html="getFormatDataByType(rowData.Kind, 'object', 'get.Item.KindId')"></div>
              <div v-html="getFormatDataByType(rowData.Diameter, 'object', 'get.Item.DiameterId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Blend, 'object', 'get.Item.BlendId')"></div>
              <div v-html="getFormatDataByType(rowData.ShelfLife, 'text', 'get.Item.ShelfLife')"></div>
              <div v-html="getFormatDataByType(rowData.TimeFrame, 'object', 'get.Item.TimeFrameId')"></div>
              <div v-html="getFormatDataByType(rowData.Color, 'object', 'get.Item.ColorId')"></div>
              <div v-html="getFormatDataByType(rowData.Plant, 'text', 'get.Item.Plant')"></div>
              <div v-html="getFormatDataByType(rowData.SortOrder, 'text', 'get.Item.SortOrder')"></div>
              <div v-html="getFormatDataByType(rowData.IsBarterAllowed, 'check', 'get.Item.IsBarterAllowed')"></div>
              <div v-html="getFormatDataByType(rowData.UseSalesAnalysis, 'check', 'get.Item.UseSalesAnalysis')"></div>
              <div v-html="getFormatDataByType(rowData.IsLaunchItem, 'check', 'get.Item.IsLaunchItem')"></div>
              <div v-html="getFormatDataByType(rowData.IsOrderAllowed, 'check', 'get.Item.IsOrderAllowed')"></div>
              <div v-html="getFormatDataByType(rowData.IsSaleAllowed, 'check', 'get.Item.IsSaleAllowed')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemFinancialInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Vat, 'text', 'get.Item.Vat')"></div>
              <div v-html="getFormatDataByType(rowData.MaxDiscountRate, 'text', 'get.Item.MaxDiscountRate')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'get.Item.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.UnitSet, 'object', 'get.Item.UnitSetId')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup1, 'object', 'get.Item.DiscountGroup1Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup2, 'object', 'get.Item.DiscountGroup2Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup3, 'object', 'get.Item.DiscountGroup3Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DiscountGroup4, 'object', 'get.Item.DiscountGroup4Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup5, 'object', 'get.Item.DiscountGroup5Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup6, 'object', 'get.Item.DiscountGroup6Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup7, 'object', 'get.Item.DiscountGroup7Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup8, 'object', 'get.Item.DiscountGroup8Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup9, 'object', 'get.Item.DiscountGroup9Id')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountGroup10, 'object', 'get.Item.DiscountGroup10Id')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemTree')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemBoms" :items="itemBomItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.CustomerCode')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemCustomers" :items="itemCustomerItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemCode')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ItemBarcodes" :items="itemBarcodeItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemImage')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.item.FileName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(f, i) in rowData.ItemAttachments" :key="i">
                      <b-td>{{f.Attachment}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.AdditionalClassificationAreas')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Category1, 'object', 'get.Item.Category1Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category2, 'object', 'get.Item.Category2Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category3, 'object', 'get.Item.Category3Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category4, 'object', 'get.Item.Category4Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category5, 'object', 'get.Item.Category5Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Category6, 'object', 'get.Item.Category6Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category7, 'object', 'get.Item.Category7Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category8, 'object', 'get.Item.Category8Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category9, 'object', 'get.Item.Category9Id')"></div>
              <div v-html="getFormatDataByType(rowData.Category10, 'object', 'get.Item.Category10Id')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.SapPrices')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table
                  id="sap-prices"
                  :fields="sapPriceFields"
                  :items="sapPrices"
                  bordered
                  small
                  responsive
                  :current-page="currentPage"
                  :per-page="10">
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
                <b-pagination
                  v-if="sapPrices.length > 0"
                  :total-rows="sapPrices.length"
                  v-model="currentPage"
                  :per-page="10"
                  aria-controls="sap-prices"
                ></b-pagination>
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
import mixin from '../../../mixins/index'
import { detailData } from './../detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      currentPage: 1,
      sapPrices: [],
      itemBomItems: detailData.itemBomItems,
      itemCustomerItems: detailData.itemCustomerItems,
      itemBarcodeItems: detailData.itemBarcodeItems,
      sapPriceFields: detailData.sapPriceFields
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
      this.$router.push({name: this.routeName})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextItem/api/Item', record: this.$route.params.url})
      this.getSapPrices()
    },
    getSapPrices () {
      let request = {
        andConditionModel: {
          ItemIds: [this.$route.params.url]
        }
      }
      this.$api.postByUrl(request, 'VisionNextItem/api/ItemSapPrice/Search').then((response) => {
        if (response && response.ListModel) {
          this.sapPrices = response.ListModel.BaseModels
        }
      })
    }
  }
}
</script>
