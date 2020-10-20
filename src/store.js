/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { systemName, ideaName, copyright, verno, apiLink } from '../static/system'
import router from './router'
import i18n from './i18n'

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
    tableData: [],
    tableRows: [],
    tableActions: [
      { id: 1, text: i18n.t('list.show'), icon: 'user' },
      { id: 2, text: i18n.t('list.edit'), icon: 'edit' },
      { id: 3, text: i18n.t('list.print'), icon: 'print' }
    ],
    // proje gereksinimleri
    breadcrumbList: [],
    modalLoad: false,
    searchRes: [],
    selectedRowKey: '',
    errorMessage: null
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
    getTableData ({ commit }, query) { // tüm index ekranlarının tablosunu POST metodudyla besleyen fonksiyondur.
      commit('setTableData', [])
      commit('bigLoaded', true)
      return axios.post(query.action, query.number)
        .then(res => {
          switch (res.status) {
            case 201:
              commit('setTableData', res.data.ticketInfosField)
              commit('bigLoaded', false)
            break
            case 900:
              commit('logout')
              break
            default:
              commit('showAlert', { type: 'error', msg: res.data.message })
            break
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
          commit('setTableData', [])
          commit('bigLoaded', false)
        })
    },
    getTableGetData ({ commit }, query) { // tüm index ekranlarının tablosunu GET metoduyla besleyen fonksiyondur.
      commit('bigLoaded', false)
      return axios.get(query.url, query.params)
        .then(res => {
          commit('setTableData', res.data)
          commit('bigLoaded', false)
        })
    },
    createAny ({ commit }, query) {
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      document.getElementById('submitLoaderText').style.display = 'none'
      document.getElementById('submitLoader').style.display = 'block'
      return axios.post('anyApi/create', query, authHeader)
        .then(res => {
          commit('showAlert', { type: 'success', msg: i18n.t('form.createok') })
          router.push({name: query.return})
          document.getElementById('submitButton').disabled = false
          document.getElementById('submitLoaderText').style.display = 'block'
          document.getElementById('submitLoader').style.display = 'none'
        })
        .catch(err => {
          document.getElementById('submitButton').disabled = false
          document.getElementById('submitLoaderText').style.display = 'block'
          document.getElementById('submitLoader').style.display = 'none'
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    updateAny ({ commit }, query) {
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      document.getElementById('submitLoaderText').style.display = 'none'
      document.getElementById('submitLoader').style.display = 'block'
      return axios.post('anyApi/update/' + query.id, query, authHeader)
        .then(res => {
          commit('showAlert', { type: 'success', msg: i18n.t('form.updateok') })
          router.push({name: query.return})
          document.getElementById('submitButton').disabled = false
          document.getElementById('submitLoaderText').style.display = 'block'
          document.getElementById('submitLoader').style.display = 'none'
        })
        .catch(err => {
          document.getElementById('submitButton').disabled = false
          document.getElementById('submitLoaderText').style.display = 'block'
          document.getElementById('submitLoader').style.display = 'none'
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    getSearchRes ({ commit }, query) {
      commit('bigLoaded', true)
      commit('setSearchRes', [])
      return axios.post('WorkOrder/WorkOrderOperations.svc/json/Search', query.info)
        .then(res => {
          switch (res.status) {
            case 200:
              if (res.data.ListModel.TotalRowCount >= 1) {
                commit('setErrorMessage', null)
                commit('setSearchRes', res.data.ListModel)
              } else {
                commit('setErrorMessage', 'Kayıt bulunamadı. Lütfen yeniden deneyin.')
              }
              commit('bigLoaded', false)
              break
            case 900:
              commit('logout')
              break
            default:
              commit('setSearchRes', [])
              commit('showAlert', { type: 'error', msg: res.data.message })
            break
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
          commit('setSearchRes', [])
          commit('bigLoaded', false)
        })
    },
    insert ({ commit }, query) {
      commit('bigLoaded', true)
      let dataShowEmail = {
        'Authentication': {
        'Key': localStorage.getItem('Key'),
        'LanguageId': localStorage.getItem('LanguageId')
        },
        'Model': query.info
      }
      
      return axios.post('WorkOrder/WorkOrderOperations.svc/json/Insert', dataShowEmail)
        .then(res => {
          switch (res.status) {
            case 200:
              commit('bigLoaded', false)
            break
            case 900:
              commit('logout')
              break
            default:
              commit('showAlert', { type: 'error', msg: res.data.message })
            break
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
          commit('bigLoaded', false)
        })
    },
    update ({ commit }, query) {
      commit('bigLoaded', true)
      let dataShowEmail = {
        'Authentication': {
        'Key': localStorage.getItem('Key'),
        'LanguageId': localStorage.getItem('LanguageId')
        },
        'Model': query.info
      }

      return axios.post('WorkOrder/WorkOrderOperations.svc/json/Update', dataShowEmail)
        .then(res => {
          switch (res.status) {
            case 200:
              commit('bigLoaded', false)
            break
            case 900:
              commit('logout')
              break
            default:
              commit('showAlert', { type: 'error', msg: res.data.message })
            break
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
          commit('bigLoaded', false)
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
    setTableData (state, payload) {
      state.tableData = payload
    },
    setTableRows (state, payload) {
      state.tableRows = payload
    },
    setSelectedRowKey (state, payload) {
      state.selectedRowKey = payload
    },
    indexTableActions (state, payload) {
      state.tableActions = payload
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
    }
  }
})
