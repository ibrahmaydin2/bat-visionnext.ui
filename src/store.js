/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { systemName, ideaName, copyright, verno, apiLink } from '../static/system'
import router from './router'
import i18n from './i18n'
import { required, not } from 'vuelidate/lib/validators'

import cities from '../static/cities.json'
import distiricts from '../static/district.json'

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(Vuex)
export default axios
axios.defaults.baseURL = apiLink
let user = JSON.parse(localStorage.getItem('UserModel')) ? JSON.parse(localStorage.getItem('UserModel')) : null
let authHeader = {
  headers: {
    'key': localStorage.getItem('Key')
  }
}

let authCompanyAndBranch = {}
let UserId = ''

if (localStorage.getItem('UserId')) {
  UserId = localStorage.getItem('UserId')
} else {
  UserId = 1
}
if (localStorage.getItem('BranchId')) {
  authCompanyAndBranch = {
    'CompanyId' : localStorage.getItem('CompanyId'),
    'BranchId' : localStorage.getItem('BranchId')
  }
} else {
  authCompanyAndBranch = {
    'CompanyId' : 1,
    'BranchId' : 1
  }
}
export const store = new Vuex.Store({
  state: {
    // sistem gereksinimleri
    developmentMode: true,
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
      name: user ? user.Name + ' ' + user.Surname : null,
      company: localStorage.getItem('companyName') ? localStorage.getItem('companyName') : null,
      branch: localStorage.getItem('branchName') ? localStorage.getItem('branchName') : null
    },
    UserId: localStorage.getItem('UserId') ? localStorage.getItem('UserId') : 1,
    CompanyId: localStorage.getItem('CompanyId') ? localStorage.getItem('CompanyId') : 1,
    BranchId: localStorage.getItem('BranchId') ? localStorage.getItem('BranchId') : 1,
    notify: [
      {
        title: 'notify 1',
        content: 'notify 1'
      },
      {
        title: 'notify 2',
        content: 'notify 2'
      },
      {
        title: 'notify 3',
        content: 'notify 3'
      },
      {
        title: 'notify 4',
        content: 'notify 4'
      },
      {
        title: 'notify 5',
        content: 'notify 5'
      },
    ],
    tableFilters: [
      { value: 'all', title: 'Tüm Kayıtlar' },
      { value: 'today', title: 'Bu Günün Kayıtları' },
      { value: 'month', title: 'Bu Ayın Kayıtları' }
    ],
    insertHTML: null,
    insertRules: [],
    insertVisible: [],
    insertTitle: [],
    insertReadonly: [],
    errorView: false,
    errorData: [],
    nextgrid: false,
    createCode: null,
    navigation: [],
    shortcuts: [],
    rowData: [],
    tableData: [],
    autocompleteData: [],
    tableOperations: [],
    tableRows: [],
    tableRowsAll: [],
    breadcrumbList: [],
    modalLoad: false,
    searchRes: [],
    errorMessage: null,
    cities: [],
    distiricts: [],
    lookup: [],
    detailLookup: [],
    lookupWarehouse_type: [],
    vehicleList: [],
    branchList: [],
    analysisQuestions: [],
    warehouseList: [],
    customerList: [],
    //Employee Lookups Values
    employeeTypes: [],
    priceList: [],
    educationStatus: [],
    bloodTypes: [],
    employeeGroups: [],
    category1: [],
    scoreCards: [],
    employees: [],
    //Vehicle Lookups Values
    vehicleTypes: [],
    vehicleBrands: [],
    vehicleModels: [],
    vehicleUsageTypes: [],
    vehicleCategory1: [],
    vehicleCategory2: [],
    vehicleCategory3: [],
    vehicleColors: [],
    vehicleUnits: [],
    branch: [],
    vehicles: [],
    routeTypes: [],
    customerLocationsList: [],
    //Route Lookups Values
    routeClasses: [],
    routeGroups: [],
    visitStartControls: [],
    routeTypeOptions: [],
    //Customer
    customerCardTypes: [],
    cancelReasons: [],
    customerTypes: [],
    blockReasons: [],
    customerTaxTypes: [],
    customerInvoiceTypes: [],
    customerCategory1: [],
    customerCategory2: [],
    customerCategory3: [],
    customerGroups: [],
    customerClass: [],
    salesDocumentTypes: [],
    ownerTypes: [],
    classProposals: [],
    classProposalReasons: [],
    customerSalesMethods: [],
    geographicEnvironments: [],
    customerTradeFocus: [],
    invoiceCombineRules: [],
    backMarginGroups: [],
    discountGroups1: [],
    discountGroups3: [],
    discountGroups4: [],
    discountGroups5: [],
    discountGroups6: [],
    discountGroups7: [],
    discountGroups8: [],
    customerKinds: [],
    creditDescriptions: [],
    holdAssets: [],
    contracteds: [],
    discountGroups10: [],
    discountGroups2: [],
    discountGroups9: [],
    signNameIds: []
  },
  actions: {
    // sistem gereksinimleri
    login ({ commit }, authData) {
      localStorage.clear()
      document.getElementById('loginButton').disabled = true
      document.getElementById('loginLoaderText').style.display = 'none'
      document.getElementById('loginLoader').style.display = 'block'
      commit('showAlert', { type: 'info', msg: i18n.t('general.loggined') })
      return axios.post('VisionNextAuthentication/api/Authentication/Login', {
        SessionId: authData.SessionId,
        UserName: authData.UserName,
        Password: authData.Password,
        InstanceHash: authData.InstanceHash
      })
        .then(res => {
          commit('hideAlert')
          document.getElementById('loginButton').disabled = false
          document.getElementById('loginLoaderText').style.display = 'block'
          document.getElementById('loginLoader').style.display = 'none'
          if (res.data.IsCompleted === true) {
            commit('login', res.data)
          } else {
            commit('showAlert', { type: 'error', msg: res.data.Message })
            commit('setTableData', [])
            commit('bigLoaded', false)
          }
        })
        .catch(err => {
          document.getElementById('loginButton').disabled = false
          document.getElementById('loginLoaderText').style.display = 'block'
          document.getElementById('loginLoader').style.display = 'none'
          commit('showAlert', { type: 'network', msg: err })
          commit('setTableData', [])
          commit('bigLoaded', false)
        })
    },
    navigation ({ commit }, authData) {
      commit('showAlert', { type: 'info', msg: i18n.t('general.pleaseWait') })
      return axios.post('VisionNextUIOperations/api/UiMenu/SearchByApplicationHash', authCompanyAndBranch, authHeader)
        .then(res => {
          commit('hideAlert')
          if (res.data.IsCompleted === true) {
            commit('setNavigation', {navigation: res.data.Model.sub, shortcut: res.data.Model.shortcut})
          } else {
            console.log(res)
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'catch', msg: err.response })
        })
    },
    // index ekranlarının tablo bilgilerini ve dinamik değerlerini getiren fonksiyondur.
    // fonksiyon olumlu çalıştığında tablo verisini doldurmak için getTableData fonksiyonunu çalıştırır.
    getTableOperations ({ commit }, query) {
      commit('bigLoaded', true)
      commit('setError', {view: false, info: null})
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api, authHeader)
        .then(res => {
          if ((res.data.IsCompleted === true) && (res.data.UIPageModels.length >= 1)) {
            commit('setTableOperations', res.data.UIPageModels[0])
            if ((res.data.UIPageModels[0].SelectedColumns) && (res.data.UIPageModels[0].SelectedColumns.length >= 1)) {
              commit('setTableRows', res.data.UIPageModels[0].SelectedColumns)
            } else {
              commit('setTableRows', res.data.UIPageModels[0].RowColumns)
            }
            commit('setTableRowsAll', res.data.UIPageModels[0].RowColumns)

            // başarılı -> tabloyu doldur.
            this.dispatch('getTableData', {
              ...this.query,
              apiUrl: query.apiUrl,
              api: query.api,
              page: query.page,
              count: query.count,
              sort: query.sort,
              searchField: query.where,
              searchText: query.search
            })
            commit('hideAlert')
            commit('setError', {view: false, info: null})
          } else {
            commit('setError', {view: true, info: res.data.Message})
            commit('bigLoaded', false)
          }
        })
        .catch(err => {
          console.log(err)
          commit('setError', {view: true, info: 'Server Error'})
        })
    },
    // tüm index ekranlarının tablosunu POST metodudyla besleyen fonksiyondur.
    getTableData ({ state, commit }, query) {
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

      // search özelliği şuan tek sütunda geçerli.
      // ilerleyen vakitlerde birden çok sütunda geçerli hale getirilebilir.
      if (query.searchField) {
        AndConditionModel[query.searchField] = query.searchText
      } else {
        AndConditionModel = {}
      }

      dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': query.count,
        'page': query.page,
        OrderByColumns
      }
      // return axios.post('VisionNext' + query.api + '/api/' + query.api + '/Search', dataQuery) -> dinamikken bunu kullanıyorduk
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      return axios.post(query.apiUrl, dataQuery, authHeader)
        .then(res => {
          commit('hideAlert')
          if (res.data.IsCompleted === true) {
            commit('setError', {view: false, info: null})
            commit('showNextgrid', true)
            commit('bigLoaded', false)
            commit('setTableData', res.data.ListModel)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
            commit('setError', {view: true, info: res})
          }
        })
        .catch(err => {
          commit('setError', {view: true, info: 'Server Error'})
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // index ekranlarının seçili sütunlarını kullaıcı özelinde günceller.
    setSelectedRows ({ state, commit }, query) {
      let dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        'UserId' : state.UserId,
        'FormId' : query.FormId,
        'Columns': query.Columns
      }
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      return axios.post('VisionNextUIOperations/api/UIFormGrid/UpdateSelectedColumn', dataQuery, authHeader)
        .then(res => {
          console.log(res)
          commit('hideAlert')
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('form.createOk') })
          } else {
            let errs = res.data.Validations.Errors
            for (let i = 0; i < errs.length; i++) {
              let errmsg = errs[i].States
              for (let x = 0; x < errmsg.length; x++) {
                commit('showAlert', { type: 'validation', msg: errmsg })
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
          commit('showAlert', { type: 'danger', msg: JSON.stringify(err.message) })
        })
    },
    // tüm GET ekranlarının genel datasını POST metodudyla besleyen fonksiyondur.
    getData ({ state, commit }, query) {
      commit('setTableData', [])
      commit('bigLoaded', true)
      let dataQuery = {}
      dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        'RecordId' : query.record
      }
      commit('showNextgrid', false)
      return axios.post(query.api + '/Get', dataQuery, authHeader)
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
    // tüm INSERT ekranlarının kontrolleri sağlanır.
    getAllLookups ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode' : query.type,
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId
      }
      return axios.post(`VisionNextCommonApi/api/LookupValue/GetValuesMultiple`, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setLookUp', res.data.Values)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getDetailPanelLookups ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode' : query.type,
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId
      }
      return axios.post(`VisionNextCommonApi/api/LookupValue/GetValuesMultiple`, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setDetailPanelLookups', res.data.Values)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getInsertRules ({ commit }, query) {
      commit('bigLoaded', true)
      return axios.get(`VisionNextUIOperations/api/UIOperationGroupUser/GetFormInits?name=${query.api}`, authHeader)
        .then(res => {
          commit('bigLoaded', false)
          if (res.data.IsCompleted === true) {
            commit('setInsertRules', {rows: res.data.RowColumns, route: query.api})
          }
        })
        .catch(err => {
          commit('bigLoaded', false)
          document.getElementById('submitButton').disabled = false
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    getCreateCode ({ commit }, query) {
      commit('bigLoaded', true)
      return axios.post(query.apiUrl, authCompanyAndBranch, authHeader)
        .then(res => {
          commit('bigLoaded', false)
          if (res.data.IsCompleted === true) {
            commit('setGetCreateCode', res.data.Model.Code)
          } else {
          }
        })
        .catch(err => {
          commit('bigLoaded', false)
          document.getElementById('submitButton').disabled = false
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    // tüm create ve update işlemlerinin ortak fonksiyonu.
    createData ({ state, commit }, query) {
      let dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        ...query.formdata
      }
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      return axios.post(query.api + '/Insert', dataQuery, authHeader)
        .then(res => {
          commit('hideAlert')
          document.getElementById('submitButton').disabled = false
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('form.createOk') })
            router.push({name: query.return})
          } else {
            if (res.data.Validations) {
              let errs = res.data.Validations.Errors
              for (let i = 0; i < errs.length; i++) {
                let errmsg = errs[i].States
                for (let x = 0; x < errmsg.length; x++) {
                  commit('showAlert', { type: 'validation', msg: errmsg })
                }
              }
            } else {
              commit('showAlert', { type: 'validation', msg: res.data.Message })
            }
          }
        })
        .catch(err => {
          console.log(err)
          document.getElementById('submitButton').disabled = false
          commit('showAlert', { type: 'danger', msg: JSON.stringify(err.message) })
        })
    },
    updateData ({ state, commit }, query) {
      let dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        ...query.formdata
      }
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      return axios.post(query.api + '/Update', dataQuery, authHeader)
        .then(res => {
          commit('hideAlert')
          document.getElementById('submitButton').disabled = false
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('form.createOk') })
            router.push({name: query.return})
          } else {
            let errs = res.data.Validations.Errors
            for (let i = 0; i < errs.length; i++) {
              let errmsg = errs[i].States
              for (let x = 0; x < errmsg.length; x++) {
                commit('showAlert', { type: 'validation', msg: errmsg })
              }
            }
          }
        })
        .catch(err => {
          document.getElementById('submitButton').disabled = false
          commit('showAlert', { type: 'danger', msg: JSON.stringify(err.message) })
        })
    },
    getAutocomplete ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextBranch/api/Branch/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setBranchList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // aşağıdaki fonksiyonlar temizlenmeli. birbirini taklit eden fonksiyonlar birleştirilmeli.
    getBranchData ({ state, commit }, query) {
      commit('setTableData', [])
      commit('bigLoaded', true)
      let dataQuery = {}
      dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        'RecordId' : query.record
      }
      return axios.post(query.api + '/Get', dataQuery, authHeader)
        .then(res => {
          switch (res.status) {
            case 200:
              commit('bigLoaded', false)
              commit('setBranch', res.data.Model)
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
    // LOOKUP servisleri
    lookupWareouseType ({ state, commit }, query) {
      let dataQuery = {
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        'LookupTableCode' : 'WAREHOUSE_TYPE'
      }
      return axios.post('VisionNextCommonApi/api/LookupValue/GetValues', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            state.lookupWarehouse_type = res.data.Values
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getLookupsWithUpperValue ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode' : query.type,
        'BranchId' : state.BranchId,
        'CompanyId' : state.CompanyId,
        'UpperValue': query.upperValue
      }
      return axios.post('VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setValues', {data: res.data, name: query.name})
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // autocomplete datalar & listeler
    acVehicle ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextVehicle/api/Vehicle/Search', dataQuery)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setVehicleList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acCustomer ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextCustomer/api/Customer/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCustomerList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acAnalysisQuestions ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextFieldAnalysis/api/AnalysisQuestions/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setAnalysisQuestions', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acBranch ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextBranch/api/Branch/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setBranchList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acWarehouse ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      AndConditionModel['isVehicle'] = 0
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextWarehouse/api/Warehouse/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setWarehouseList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getEmployeesByBranchId({state, commit}) {
      let dataQuery = {
        'AndConditionModel': {},
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post('VisionNextEmployee/api/Employee/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setEmployees', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getVehiclesByBranchId({state, commit}) {
      let dataQuery = {
        'AndConditionModel': {},
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post('VisionNextVehicle/api/Vehicle/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setVehicles', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getRouteTypesByBranchId({state, commit}) {
      let dataQuery = {
        'AndConditionModel': {},
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post('VisionNextRoute/api/RouteType/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setRouteTypes', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getCustomerLocationByCustomerIds({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
          'customerIds': query.customerIds,
          // 'isRouteNode': 1
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
      }
      return axios.post('VisionNextCustomer/api/CustomerLocation/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCustomerLocationsList', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getCustomerCardType({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
      }
      return axios.post('VisionNextCustomer/api/CustomerCardType/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCustomerCardTypes', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getCustomerCancelReasons({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
      }
      return axios.post('VisionNextCommonApi/api/CancelReason/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCancelReasons', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    }
  },
  mutations: {
    setDev (state, payload) {
      state.developmentMode = payload
    },
    setError (state, payload) {
      state.errorView = payload.view
      state.errorData = payload.info
    },
    hideAlert () {
      this._vm.$bvToast.hide()
    },
    showAlert (state, payload) {
      switch (payload.type) {
        case 'catch':
          if (payload.msg.status === 401) {
            console.log(payload.msg)
            store.commit('logout')
          }
          this._vm.$bvToast.toast(JSON.stringify(payload.msg.data.Message), {
            title: i18n.t('general.serverError'),
            variant: 'danger',
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          break
        case 'network':
          const err = payload.msg.message
          this._vm.$bvToast.toast(JSON.stringify(err), {
            title: i18n.t('general.serverError'),
            variant: 'danger',
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          break
        case 'danger':
          this._vm.$bvToast.toast(payload.msg, {
            title: JSON.stringify(payload.msg),
            variant: 'danger',
            noCloseButton: false
          })
          break
        case 'validation':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'danger',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          break
        case 'warning':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'danger',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          break
        case 'error':
          this._vm.$bvToast.toast(payload.msg, {
            title: i18n.t('general.errorTitle'),
            variant: 'warning',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          state.loginError = payload.msg
          break
        case 'info':
          this._vm.$bvToast.toast(payload.msg, {
            title: i18n.t('general.pleaseWait'),
            variant: 'info',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
          })
          break
        case 'success':
          this._vm.$bvToast.toast(payload.msg, {
            variant: 'success',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right',
            noCloseButton: false
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
    setNavigation (state, payload) {
      state.navigation = payload.navigation
      state.shortcuts = payload.shortcut
    },
    setRowData (state, payload) {
      state.rowData = payload
    },
    setTableData (state, payload) {
      state.tableData = payload
    },
    setTableRows (state, payload) {
      state.tableRows = []
      state.tableRows = payload
    },
    setTableRowsAll (state, payload) {
      state.tableRowsAll = []
      state.tableRowsAll = payload
    },
    setLookUp (state, payload) {
      state.lookup = payload
    },
    setDetailPanelLookups (state, payload) {
      state.detailLookup = payload
    },
    setAutocomplete (state, payload) {
      console.log(payload)
      state[payload.name] = payload.data.Values
    },
    setInsertRules (state, payload) {
      /*
        Servisten gelen Kural Setini derler ve HTML kodu üretecek şekilde çıktısını verir.
        Gelen HTML kodu manuel olarak INSERT ekranına yerleştirilecektir.
      */
      const apiRules = payload.rows
      let insertPageHTML = {}
      let rull = {}
      let visbl = {}
      let title = {}
      let enbld = {}
      let valueForAutoLookup = ''
      apiRules.forEach(rule => {
        let inputCode
        let fieldName = rule.EntityProperty
        let fieldEnabled = rule.Enabled
        let fieldLabel = rule.Label
        let fieldRequired = rule.Required
        let fieldDefaultValue = rule.DefaultValue
        let fieldVisible = rule.Visible
        let fieldUnique = rule.Unique // ne işe yarıyor ?

        rull[fieldName] = fieldRequired === true ? { required } : { not } // validasyon durumu.
        visbl[fieldName] = fieldVisible // görüntüleme durumu.
        title[fieldName] = fieldLabel // input ismi.
        enbld[fieldName] = fieldEnabled === true ? false : true // input ismi.
        
        // HTML üretimi sadece development modu aktifken çalışacak.
        if (state.developmentMode) {
          switch (rule.ColumnType) {
            case 'Id':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
                </b-form-group>
              </b-col>`
            break;
            
            case 'String':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
                </b-form-group>
              </b-col>`
            break;

            case 'LabelValue':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
                </b-form-group>
              </b-col>`
            break;
            
            case 'Select':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <v-select
                    :options="lookup.${fieldDefaultValue}"
                    @input="selectedType('${fieldName}', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>`
              valueForAutoLookup += fieldDefaultValue + ','
            break;

            case 'Radio':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-checkbox v-model="form.${fieldName}" name="check-button" switch>
                    {{(form.${fieldName}) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>`
            break;

            case 'Check':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-checkbox v-model="form.${fieldName}" name="check-button">
                    {{(form.${fieldName}) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>`
            break;

            case 'DateTime':
              inputCode = `<b-col v-if="insertVisible.${fieldName} :start-weekday="1" != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-datepicker v-model="form.${fieldName}" />
                </b-form-group>
              </b-col>`
            break;

            case 'Text':
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.${fieldLabel}" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <b-form-textarea v-model="form.${fieldName}" placeholder="" />
                </b-form-group>
              </b-col>`
            break;
          }
          insertPageHTML[fieldName] = inputCode.trim()
        }
      })
      this.dispatch('getAllLookups', {...this.query, type: valueForAutoLookup})
      state.insertHTML = insertPageHTML
      state.insertRules = rull
      state.insertVisible = visbl
      state.insertTitle = title
      state.insertReadonly = enbld
    },
    setGetCreateCode (state, payload) {
      state.createCode = payload
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
      user = JSON.parse(localStorage.getItem('UserModel'))
      localStorage.setItem('Key', user.Key)
      localStorage.setItem('LanguageId', user.DefaultLanguageId || 1)
      state.loginUser.name = user.Name + ' ' + user.Surname,
      state.loginUser.company = user.AuthorizedBranches[0].Desciption
      authHeader = {
        headers: {
          'key': localStorage.getItem('Key')
        }
      }
      store.commit('userIDs', {
        userId: user.UserId,
        company: user.AuthorizedCompanies[0].Id,
        branch: user.AuthorizedBranches[0].Id,
        branchName: user.AuthorizedBranches[0].Desciption})
      // router.push({name: 'Dashboard'})
    },
    userIDs (state, payload) {
      localStorage.setItem('UserId', payload.userId)
      localStorage.setItem('CompanyId', payload.company)
      localStorage.setItem('BranchId', payload.branch)

      state.UserId = localStorage.getItem('UserId')
      state.CompanyId = localStorage.getItem('CompanyId')
      state.BranchId = localStorage.getItem('BranchId')

      localStorage.setItem('companyName', payload.companyName)
      localStorage.setItem('branchName', payload.branchName)

      state.loginUser.company = localStorage.getItem('companyName')
      state.loginUser.company = localStorage.getItem('companyName')
      state.loginUser.branch = localStorage.getItem('branchName')
      authCompanyAndBranch = {
        'CompanyId' : localStorage.getItem('CompanyId'),
        'BranchId' : localStorage.getItem('BranchId')
      }
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
    // aşağıdaki fonksiyonlar temizlenmeli. birbirini taklit eden fonksiyonlar birleştirilmeli.
    setCities (state,payload) {
      state.cities = cities
    },
    setDistiricts (state, payload) {
      state.distiricts = distiricts.filter(item => item.plaka == payload)
    },
    setValues (state, payload) {
      state[payload.name] = payload.data.Values
    },
    setEmployees (state, payload) {
      state.employees = payload
    },
    setAnalysisQuestions(state, payload) {
      state.analysisQuestions = payload
    },
    setBranch(state, payload) {
      state.branch = payload
    },
    setVehicles(state, payload) {
      state.vehicles = payload
    },
    setRouteTypes(state, payload) {
      state.routeTypes = payload
    },
    setCustomerLocationsList(state, payload) {
      state.customerLocationsList = payload
    },
    setCustomerCardTypes(state, payload) {
      state.customerCardTypes = payload
    },
    setCancelReasons(state, payload) {
      state.cancelReasons = payload
    },
    setVehicleList (state, payload) {
      state.vehicleList = payload
    },
    setCustomerList (state, payload) {
      state.customerList = payload
    },
    setBranchList (state, payload) {
      state.branchList = payload
    },
    setWarehouseList (state, payload) {
      state.warehouseList = payload
    }
  }
})
