import BabelPolyFill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import { store } from './store'
import VueRouter from 'vue-router'
import router from './router'
import i18n from './i18n'
import { BootstrapVue, IconsPlugin, BFormDatepicker, ToastPlugin, BVConfig } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueTheMask from 'vue-the-mask'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Sortable from 'vue-sortable'
import { ApiManager } from './managers/api-manager'
import { Map, TileLayer, OsmSource, Geoloc, Feature, PointGeom, StyleBox, IconStyle } from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader

import draggable from 'vuedraggable'

import {VueMasonryPlugin} from 'vue-masonry'
import RealtimeDashboard from './module/realtime-dashboard'

// multiple date datepicker
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/tr'
import VueLazyload from 'vue-lazyload'

import Nextgrid from './components/NextGrid'
import Nextform from './components/NextForm'
import Carousel from './components/Carousel'
import Navigation from './components/Navigation'
import ApproveModal from './components/ApproveModal'
import ApproveAssuranceModal from './components/ApproveAssuranceModal'
import PotentialCustomerApproveModal from './components/PotentialCustomerApproveModal'
import PotentialCustomerRejectModal from './components/PotentialCustomerRejectModal'
import NavigationList from './components/NavigationList'
import Shortcuts from './components/Shortcuts'
import Header from './components/Header'
import ProgressTimeline from './components/ProgressTimeline'
import Breadcrumb from './components/Breadcrumb'
import ErrorPage from './components/Error'
import AddButton from './components/AddButton'
import AddDetailButton from './components/AddDetailButton'
import CancelButton from './components/CancelButton'
import GetFormField from './components/GetFormField'
import NextCheckBox from './components/NextCheckBox'
import NextAddress from './components/NextAddress'
import NextFormGroup from './components/NextFormGroup'
import Actions from './components/Actions/Actions'
import NextDropdown from './components/NextDropdown'
import NextDetailPanel from './components/NextDetailPanel'
import NextLocation from './components/NextLocation'
import NextDatePicker from './components/NextDatePicker'
import NextTimePicker from './components/NextTimePicker'
import NextInput from './components/NextInput'
import NextTextArea from './components/NextTextArea'
import CreditBudgetExcelModal from './components/Actions/CreditBudgetExcelModal'
import UpdateCreditBudgetModal from './components/Actions/UpdateCreditBudgetModal'
import CreditBudgetBulkApproveModal from './components/Actions/CreditBudgetBulkApproveModal'
import BudgetMasterApproveModal from './components/Actions/BudgetMasterApproveModal'
import AssignEmployeeModal from './components/Actions/AssignEmployeeModal'
import CommonInfoModal from './components/Actions/CommonInfoModal'
import NextMultipleSelection from './components/NextMultipleSelection'
import CommonExcelModal from './components/Actions/CommonExcelModal'

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'local') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

Vue.use(Sortable)
Vue.use(BabelPolyFill)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BVConfig, {
  BTooltip: {
    delay: {
      show: 700,
      hide: 1
    }
  }
})
Vue.use(ToastPlugin)
Vue.use(Toasted)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(Autocomplete)
Vue.use(VueTheMask)
Vue.use(VueMasonryPlugin)
Vue.use(DatePicker)
Vue.use(Map)
Vue.use(Feature)
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(Geoloc)
Vue.use(PointGeom)
Vue.use(StyleBox)
Vue.use(IconStyle)
Vue.use(VueLazyload)
Vue.use(RealtimeDashboard, {
  firebaseConfig: {
    apiKey: 'AIzaSyCLYHFHFAOvvidAZcHFo0LshFvqAMST7Eg',
    authDomain: 'onlinetransactions-3d4e4.firebaseapp.com',
    projectId: 'onlinetransactions-3d4e4',
    storageBucket: 'onlinetransactions-3d4e4.appspot.com',
    messagingSenderId: '1033068817596',
    appId: '1:1033068817596:web:2508c66ca0c4744dc7b4b9',
    measurementId: 'G-XKSJQ8JBE2',
    databaseUrl: 'https://onlinetransactions-3d4e4.firebaseio.com'
  }
}, i18n)

Vue.component('draggable', draggable)
Vue.component('v-select', vSelect)
Vue.component('Carousel', Carousel)
Vue.component('Navigation', Navigation)
Vue.component('NavigationList', NavigationList)
Vue.component('Shortcuts', Shortcuts)
Vue.component('Header', Header)
Vue.component('ProgressTimeline', ProgressTimeline)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('ApproveModal', ApproveModal)
Vue.component('ApproveAssuranceModal', ApproveAssuranceModal)
Vue.component('PotentialCustomerApproveModal', PotentialCustomerApproveModal)
Vue.component('PotentialCustomerRejectModal', PotentialCustomerRejectModal)
Vue.component('b-form-datepicker', BFormDatepicker)
Vue.component('Nextgrid', Nextgrid)
Vue.component('Nextform', Nextform)
Vue.component('ErrorPage', ErrorPage)
Vue.component('AddButton', AddButton)
Vue.component('AddDetailButton', AddDetailButton)
Vue.component('CancelButton', CancelButton)
Vue.component('GetFormField', GetFormField)
Vue.component('NextCheckBox', NextCheckBox)
Vue.component('NextAddress', NextAddress)
Vue.component('DatePicker', DatePicker)
Vue.component('NextFormGroup', NextFormGroup)
Vue.component('NextDropdown', NextDropdown)
Vue.component('NextDetailPanel', NextDetailPanel)
Vue.component('Actions', Actions)
Vue.component('NextLocation', NextLocation)
Vue.component('NextDatePicker', NextDatePicker)
Vue.component('NextTimePicker', NextTimePicker)
Vue.component('NextInput', NextInput)
Vue.component('NextTextArea', NextTextArea)
Vue.component('CreditBudgetExcelModal', CreditBudgetExcelModal)
Vue.component('UpdateCreditBudgetModal', UpdateCreditBudgetModal)
Vue.component('CreditBudgetBulkApproveModal', CreditBudgetBulkApproveModal)
Vue.component('BudgetMasterApproveModal', BudgetMasterApproveModal)
Vue.component('AssignEmployeeModal', AssignEmployeeModal)
Vue.component('CommonInfoModal', CommonInfoModal)
Vue.component('NextMultipleSelection', NextMultipleSelection)
Vue.component('CommonExcelModal', CommonExcelModal)

Vue.prototype.$api = new ApiManager()

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
})
