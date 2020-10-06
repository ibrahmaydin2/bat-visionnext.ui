/* eslint-disable */
import BabelPolyFill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import { store } from './store'
import VueRouter from 'vue-router'
import router from './router'
import i18n from './i18n'
import jQuery from 'jquery'
import { BootstrapVue, IconsPlugin, BFormDatepicker, ToastPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueTheMask from 'vue-the-mask'

import Carousel from './components/Carousel'
import Navigation from './components/Navigation'
import DispatchModal from './components/DispatchModal'
import NavigationList from './components/NavigationList'
import Shortcuts from './components/Shortcuts'
import DataGrid from './components/DataGrid'
import Header from './components/Header'
import ProgressTimeline from './components/ProgressTimeline'
import Breadcrumb from './components/Breadcrumb'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import { DxDataGrid, DxColumn, DxPaging, DxLoadPanel, DxScrolling, DxPager, DxHeaderFilter, DxSearchPanel, DxFilterRow, DxColumnChooser, DxSorting, DxColumnFixing, DxExport } from 'devextreme-vue/data-grid'
import { DxSelectBox, DxCheckBox, DxDrawer, DxRadioGroup, DxToolbar } from 'devextreme-vue'
import { DxList } from 'devextreme-vue/list'
import DxTreeView from 'devextreme-vue/tree-view'
import DxDropDownButton from 'devextreme-vue/drop-down-button'
import { DxChart, DxSeries, DxCommonSeriesSettings, DxLabel, DxFormat, DxLegend, DxSize, DxConnector, DxArgumentAxis, DxMargin, DxValueAxis, DxConstantLine, DxTitle, DxTooltip } from 'devextreme-vue/chart'
import DxPieChart from 'devextreme-vue/pie-chart'

//Vue Autocomplate
import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '../node_modules/@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(BabelPolyFill)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(ToastPlugin)
Vue.use(Toasted)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(Autocomplete)
Vue.use(VueTheMask)

Vue.component('v-select', vSelect)
Vue.component('Carousel', Carousel)
Vue.component('Navigation', Navigation)
Vue.component('NavigationList', NavigationList)
Vue.component('Shortcuts', Shortcuts)
Vue.component('DataGrid', DataGrid)
Vue.component('Header', Header)
Vue.component('ProgressTimeline', ProgressTimeline)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('DispatchModal', DispatchModal)
Vue.component('b-form-datepicker', BFormDatepicker)

Vue.component('DxDataGrid', DxDataGrid)
Vue.component('DxColumn', DxColumn)
Vue.component('DxPaging', DxPaging)
Vue.component('DxPager', DxPager)
Vue.component('DxColumnChooser', DxColumnChooser)
Vue.component('DxColumnFixing', DxColumnFixing)
Vue.component('DxConstantLine', DxConstantLine)
Vue.component('DxLoadPanel', DxLoadPanel)
Vue.component('DxScrolling', DxScrolling)
Vue.component('DxSorting', DxSorting)
Vue.component('DxHeaderFilter', DxHeaderFilter)
Vue.component('DxSearchPanel', DxSearchPanel)
Vue.component('DxFilterRow', DxFilterRow)
Vue.component('DxSelectBox', DxSelectBox)
Vue.component('DxCheckBox', DxCheckBox)
Vue.component('DxDrawer', DxDrawer)
Vue.component('DxRadioGroup', DxRadioGroup)
Vue.component('DxToolbar', DxToolbar)
Vue.component('DxList', DxList)
Vue.component('DxTreeView', DxTreeView)
Vue.component('DxExport', DxExport)
Vue.component('DxDropDownButton', DxDropDownButton)
Vue.component('DxChart', DxChart)
Vue.component('DxSeries', DxSeries)
Vue.component('DxCommonSeriesSettings', DxCommonSeriesSettings)
Vue.component('DxLabel', DxLabel)
Vue.component('DxFormat', DxFormat)
Vue.component('DxLegend', DxLegend)
Vue.component('DxSize', DxSize)
Vue.component('DxConnector', DxConnector)
Vue.component('DxPieChart', DxPieChart)
Vue.component('DxArgumentAxis', DxArgumentAxis)
Vue.component('DxMargin', DxMargin)
Vue.component('DxValueAxis', DxValueAxis)
Vue.component('DxTitle', DxTitle)
Vue.component('DxTooltip', DxTooltip)

Vue.config.productionTip = false
global.jQuery = jQuery
global.$ = jQuery
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
})
