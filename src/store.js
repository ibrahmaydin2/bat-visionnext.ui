/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { systemName, ideaName, copyright, verno, apiLink } from '../static/system'
import router from './router'
import i18n from './i18n'
import cities from '../static/cities.json'
import distiricts from '../static/district.json'

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(Vuex)
export default axios
axios.defaults.baseURL = apiLink
let authHeader = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
}

export const store = new Vuex.Store({
  state: {
    // sistem gereksinimleri
    bigLoading: true,
    style: {
      icon: 'asc__header-hamburger asc__header-hamburger-active d-inline-block',
      viewPush: 'asc__viewPush asc__viewPush-none asc__transition-right',
      navigation: 'asc__navigation asc__navigation-none asc__transition-right'
    },
    system: {
      version: verno,
      copyright: copyright
    },
    title: {
      siteName: systemName,
      idea: ideaName
    },
    logo: {
      login: '../../static/next-sales-logo.svg',
      header: '../../static/next-sales-logo-white.svg',
      footer: '',
      xlogin: '',
      xheader: '',
      xfooter: '',
      idea: '../../static/ideaLogo.svg'
    },
    loginError: '',
    loginUser: {
      signed: localStorage.getItem('signed'),
      name: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).UserName : 'TEST KULLANICI',
      company: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).CompanyName : 'TEST FİRMA MERKEZ ŞUBE'
    },
    notify: [
      {
        title: '',
        content: ''
      }
    ],
    tableFilters: [
      { value: 'all', title: 'Tüm Kayıtlar' },
      { value: 'today', title: 'Bu Günün Kayıtları' },
      { value: 'month', title: 'Bu Ayın Kayıtları' }
    ],
    nextgrid: false,
    rowData: [],
    tableData: [],
    tableOperations: [],
    tableRows: [],
    breadcrumbList: [],
    modalLoad: false,
    searchRes: [],
    errorMessage: null,
    cities: [],
    distiricts: []
  },
  actions: {
    // sistem gereksinimleri
    login ({ commit }, authData) {
      localStorage.clear()
      document.getElementById('loginButton').disabled = true
      document.getElementById('loginLoaderText').style.display = 'none'
      document.getElementById('loginLoader').style.display = 'block'
      commit('showAlert', { type: 'info', msg: i18n.t('general.pleaseWait') })
      return axios.post('Authentication/AuthenticationOperations.svc/json/Login', {
        UserName: authData.UserName,
        Password: authData.Password,
        InstanceHash: authData.InstanceHash
      })
        .then(res => {
          if (res.data.IsCompleted === true) {
            document.getElementById('loginButton').disabled = false
            document.getElementById('loginLoaderText').style.display = 'block'
            document.getElementById('loginLoader').style.display = 'none'
            commit('login', res.data)
          } else {
            document.getElementById('loginButton').disabled = false
            document.getElementById('loginLoaderText').style.display = 'block'
            document.getElementById('loginLoader').style.display = 'none'
            commit('showAlert', { type: 'error', msg: res.data.Message })
            commit('setTableData', [])
            commit('bigLoaded', false)

          }
        })
        .catch(err => {
          document.getElementById('loginButton').disabled = false
          document.getElementById('loginLoaderText').style.display = 'block'
          document.getElementById('loginLoader').style.display = 'none'
          commit('showAlert', { type: 'error', msg: err })
          commit('setTableData', [])
          commit('bigLoaded', false)
        })
    },
    // index ekranlarının tablo bilgilerini ve dinamik değerlerini getiren fonksiyondur.
    // fonksiyon olumlu çalıştığında tablo verisini doldurmak için getTableData fonksiyonunu çalıştırır.
    getTableOperations ({ commit }, query) {
      commit('bigLoaded', true)
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setTableOperations', res.data.UIPageModels[0])
            commit('setTableRows', res.data.UIPageModels[0].RowColumns)

            // başarılı -> tabloyu doldur.
            this.dispatch('getTableData', {
              ...this.query,
              api: query.api,
              page: query.page,
              count: query.count,
              sort: query.sort,
              searchField: query.where,
              searchText: query.search
            })
          } else {
            commit('showAlert', { type: 'warning', msg: res.data.Message })
            commit('bigLoaded', false)
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'warning', msg: err })
        })
    },
    // tüm index ekranlarının tablosunu POST metodudyla besleyen fonksiyondur.
    getTableData ({ commit }, query) {
      commit('setTableData', [])
      commit('showNextgrid', false)
      commit('bigLoaded', true)
      let dataQuery = {}
      let OrderByColumns = []
      let AndConditionModel = {}

      if (query.sort) {
        // sıralama özelliği şuan tek sütunda geçerli.
        // ilerleyen vakitlerde birden çok sütunda geçerli hale getirilebilir.
        OrderByColumns = [
          {
            Column: query.sort.table,
            OrderByType: query.sort.sort === 'ASC' ? 'Ascending' : 'Descending'
          }
        ]
      } else {
        OrderByColumns = []
      }

      if (query.searchField) {
        // search özelliği şuan tek sütunda geçerli.
        // ilerleyen vakitlerde birden çok sütunda geçerli hale getirilebilir.
        AndConditionModel[query.searchField] = query.searchText
      } else {
        AndConditionModel = {}
      }

      dataQuery = {
        AndConditionModel,
        'branchId': 1,
        'companyId': 1,
        'pagerecordCount': query.count,
        'page': query.page,
        OrderByColumns
      }
      return axios.post('VisionNext' + query.api + '/api/' + query.api + '/Search', dataQuery)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('showNextgrid', true)
            commit('bigLoaded', false)
            commit('setTableData', res.data.ListModel)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // tüm GET ekranlarının genel datasını POST metodudyla besleyen fonksiyondur.
    getData ({ commit }, query) {
      commit('setTableData', [])
      commit('bigLoaded', true)
      let dataQuery = {}
      dataQuery = {
        "BranchId" : 1,
        "CompanyId" : 1,
        "EncryptedKey" : query.record
      }
      commit('showNextgrid', false)
      return axios.post('VisionNext' + query.api + '/api/' + query.api + '/Get', dataQuery)
        .then(res => {
          switch (res.status) {
            case 200:
              commit('bigLoaded', false)
              commit('setRowData', res.data.Model)
            break
            case 900:
              commit('bigLoaded', false)
              commit('logout')
              break
            default:
              commit('bigLoaded', false)
              commit('showAlert', { type: 'error', msg: res.data.message })
            break
          }
        })
        .catch(err => {
          console.log(err.message)
          // commit('showAlert', { type: 'danger', msg: err })
          // commit('setTableData', [])
          // commit('bigLoaded', false)
        })
    },
    createData ({ commit }, query) {
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      console.log(query)
      document.getElementById('submitButton').disabled = true
      return axios.post('VisionNext' + query.api + '/api/' + query.api + '/Insert', query.form, authHeader)
        .then(res => {
          commit('showAlert', { type: 'success', msg: i18n.t('form.createok') })
          router.push({name: query.return})
          document.getElementById('submitButton').disabled = false
        })
        .catch(err => {
          document.getElementById('submitButton').disabled = false
          commit('showAlert', { type: 'danger', msg: err })
        })
    }
  },
  mutations: {
    showAlert (state, payload) {
      switch (payload.type) {
        case 'danger':
          this._vm.$bvToast.toast(payload.msg, {
            title: JSON.stringify(payload.msg),
            variant: 'danger',
            noCloseButton: false
          })
          break
        case 'warning':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'danger',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          break
        case 'error':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'info',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          state.loginError = payload.msg
          break
        case 'info':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'info',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          break
        case 'success':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'success',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          break
      }
    },
    setBreadcrumb (state, payload) {
      state.breadcrumbList = payload
    },
    bigLoaded (state, payload) {
      state.bigLoading = payload
    },
    setRowData (state, payload) {
      state.rowData = payload
    },
    setTableData (state, payload) {
      state.tableData = payload
    },
    setTableRows (state, payload) {
      const trows = payload
      state.tableRows = trows
    },
    setTableOperations (state, payload) {
      state.tableOperations = payload
    },
    showNextgrid (state, payload) {
      state.nextgrid = payload
    },
    hideTableRow (state, payload) {
      state.tableRows[payload.row].visible = payload.visible
    },
    hamburger (state, payload) {
      if (payload === 'close') {
        state.style.icon = 'asc__header-hamburger d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__transition-left'
        state.style.navigation = 'asc__navigation asc__transition-left'
      } else {
        state.style.icon = 'asc__header-hamburger asc__header-hamburger-active d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__viewPush-none asc__transition-right'
        state.style.navigation = 'asc__navigation asc__navigation-none asc__transition-right'
      }
    },
    getModal (state, payload) {
      store.commit('bigLoaded', payload)
      state.modalLoad = payload
    },
    login (state, payload) {
      localStorage.setItem('UserModel', JSON.stringify(payload.UserModel))
      localStorage.setItem('Key', JSON.parse(localStorage.getItem('UserModel')).Key)
      localStorage.setItem('LanguageId', JSON.parse(localStorage.getItem('UserModel')).DefaultLanguageId || 1)
      state.loginUser.name = JSON.parse(localStorage.getItem('UserModel')).Name + ' ' + JSON.parse(localStorage.getItem('UserModel')).Surname,
      state.loginUser.company = null
      authHeader = {}
      router.push({name: 'Dashboard'})
    },
    logout () {
      store.commit('clearToken')
      location.href = '/Auth'
    },
    clearToken () {
      localStorage.clear()
      localStorage.setItem('signed', false)
    },
    changeLang (state, payload) {
      state.appLang = payload.changedLang
      localStorage.setItem('siteLang', payload.changedLang)
    },
    setCities (state,payload) {
      state.cities = cities
    },
    setDistiricts(state, payload) {
      state.distiricts = distiricts.filter(item => item.plaka == payload)
    }
  }
})
