<template>
  <b-row class="asc__dashboard" style="height: calc(100vh - 55px )">
    <!--  <b-col cols="12" class="mb-3">
      <b-card>
       <Carousel :item="carousel" />
      </b-card>
    </b-col>
    <b-col cols="12" lg="12" xl="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="barChart" :title="$t('index.commingEvents')">
          <DxCommonSeriesSettings argument-field="itemName" type="stackedbar" />
          <DxValueAxis position="right">
            <DxTitle text="Adet" />
          </DxValueAxis>
          <DxSeries value-field="shipmentQuantity" :name="$t('index.commingEvents')" />
          <DxSeries value-field="balanceShipmentQuantity" :name="$t('index.commingEvents')" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" item-text-position="top" />
          <DxExport :enabled="true" />
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" location="edge" />
        </DxChart>
      </b-card>
    </b-col> -->
    <b-col cols="12" sm="8">
      <b-card class="mb-4">
        <b-card-text align="center">
          <img height="50" src="../../../static/gene2info_black.svg">
        </b-card-text>
        <Search />
      </b-card>
      <b-card class="">
        <h5 class="asc__card-mainTitle"><i>{{$t('dashboard.title')}}</i></h5>
        <b-card-group class="asc__card-group">
          <b-row>
            <b-col v-for="(gene, g) in favouriteKitTypes" :key="'gene' + g" cols="12" sm="12" md="12" :lg="gene.Genes.length >= 2 ? 12 : 6" :xl="gene.Genes.length >= 2 ? 8 : 4">
              <div class="asc__card-dashboard">
                <b-row>
                  <b-col cols="6">
                    <span class="f-s-1"><i>{{gene.Code}}</i></span>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <router-link :to="{name: 'WorkOrderInsert', params: {type: gene.EncryptedKey}}" class="asc__create-btn btn-sm text-light">
                      <i class="fas fa-plus-square" /> {{$t('dashboard.create')}}
                    </router-link>
                    <span class="ml-2"><i v-b-popover.hover.right="'I am popover directive content!'" title="Popover Title" class="fas fa-question-circle" /></span>
                  </b-col>
                  <b-col v-if="gene.Genes.length >= 2" cols="12" md="6" class="mt-2">
                    <ul class="asc__card-dashboard-genesList">
                      <li v-for="(row, i) in gene.Genes" :key="'genes' + i">{{ row.Code.trim() }}</li>
                    </ul>
                  </b-col>
                  <b-col cols="12" :md="gene.Genes.length >= 2 ? 6 : 12" class="mt-2">
                    <span>{{gene.Genexp1}}</span>
                    <b-row class="text-center">
                      <b-col>
                        <span><b>{{gene.CatalogName}}</b></span>
                      </b-col>
                      <b-col>
                        <span><b>{{gene.Code}}</b></span>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-card-group>
      </b-card>
    </b-col>
    <b-col class="asc__chart-card" cols="12" sm="4">
      <b-card class="h-100">
        <h5 class="asc__card-mainTitle"><i>{{$t('dashboard.chartTitle')}}</i></h5>
        <template>
          <DxPieChart
            id="pie"
            :data-source="workOrderTable"
            palette="Bright"
            @point-click="pointClickHandler($event)"
            @legend-click="legendClickHandler($event)"
          >
            <DxSeries
              argument-field="WorkOrderStatusId"
              value-field="WorkOrderCount"
            >
              <DxLabel :visible="true">
                <DxConnector
                  :visible="true"
                  :width="1"
                />
              </DxLabel>
            </DxSeries>
            <DxLegend
              vertical-alignment="bottom"
              horizontal-alignment="center"
              item-text-position="right"
            />
            <DxSize />
            <DxExport :enabled="true"/>
          </DxPieChart>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Search from '../../components/Search'
import DxPieChart, {
  DxSize,
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport,
  DxLegend
} from 'devextreme-vue/pie-chart'

export default {
  components: {
    Search,
    DxPieChart,
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport,
    DxLegend
  },
  data () {
    return {
      workOrderTable: []
    }
  },
  mounted () {
    this.showWorkOrderDashboard()
    this.showFavouriteKitTypes()
    this.hamburger('open')
  },
  computed: {
    ...mapState(['workOrderDashboard', 'favouriteKitTypes'])
  },
  watch: {
    workOrderDashboard: function (e) {
      if (e) {
        this.workOrderTable = e.AllWorkOrders
      }
    }
  },
  methods: {
    ...mapMutations(['hamburger']),
    showWorkOrderDashboard () {
      this.$store.dispatch('getWorkOrderDashboard')
    },
    showFavouriteKitTypes () {
      this.$store.dispatch('getFavouriteKitTypes')
    },
    showWorkOrderStatus () {
      this.$store.dispatch('getWorkOrderStatus')
    },
    customizeTooltip (pointInfo) {
      return {
        text: `${pointInfo.seriesName} ${pointInfo.valueText / 1000} Ton`
      }
    },
    onPointClick ({ target }) {
      target.select()
    },
    pointClickHandler (e) {
      this.toggleVisibility(e.target)
    },
    legendClickHandler (e) {
      let arg = e.target
      let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
      this.toggleVisibility(item)
    },
    toggleVisibility (item) {
      item.isVisible() ? item.hide() : item.show()
    }
  }
}
</script>
<style lang="sass">
  #pie
      height: 440px

  #pie *
      margin: 0 auto
  .asc__dashboard
    height: calc(100vh - 55px)
    margin-top: -5px
    padding: 15px 0
    .asc__create-btn
      background-color: #f59300
      border: none
      border-radius: 10px !important
  .f-s-1
    font-size: 16px
    font-weight: bold
  .asc__card-dashboard
    padding: 15px
    font-size: 14px
    border: 1px solid lightgray !important
    border-radius: 5px !important
    height: 150px
    overflow: hidden
    margin-bottom: 20px
    &:hover
      box-shadow: 0 0 50px #999
    @media (max-width: 1440px)
      height: 200px
    @media (max-width: 992px)
      height: inherit
  .asc__card-dashboard-genesList
    list-style: none
    padding: 0px 10px 15px 0px
    height: 90px
    overflow: auto
    &::-webkit-scrollbar
      width: 5px
    &::-webkit-scrollbar-track
      background: #f1f1f1
    &::-webkit-scrollbar-thumb
      background: #e88000
    &::-webkit-scrollbar-thumb:hover
      background: #ffa300

    @media (max-width: 1440px)
      height: 150px
    & li
      display: inline-block
      margin-right: 5px
      &::after
        content: ','
      &:last-child
        margin-right: 0px
        &::after
          content: ''
  .asc__card-mainTitle
    font-weight: bold
    font-style: italic
    margin: 5px 0 15px 0
    border-bottom: 1px #ddd solid
    padding: 0 0 15px 0px
</style>
