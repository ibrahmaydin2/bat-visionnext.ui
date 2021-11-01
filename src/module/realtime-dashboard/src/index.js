import RealtimeDashboard from './components/RealtimeDashboard'
import RealtimeLocation from './components/RealtimeLocation'
import { initializeApp } from 'firebase/app'
import { firebaseHelper } from './firebase_helper'
import { BootstrapVue } from 'bootstrap-vue'
import vSelect from 'vue-select'

import 'vuelayers/lib/style.css'

export default {
  install: function (Vue, options, i18n) {
    Vue.use(BootstrapVue)
    Vue.use(i18n)
    Vue.component('realtime-dashboard', RealtimeDashboard)
    Vue.component('realtime-location', RealtimeLocation)
    Vue.component('v-select', vSelect)
    Vue.prototype.$firebaseHelper = firebaseHelper
    initializeApp(options.firebaseConfig)
  }
}
