import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { systemName, ideaName, copyright, verno, apiLink } from '../static/system'
import router from './router'
import i18n from './i18n'
import { required, not } from 'vuelidate/lib/validators'

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
if (localStorage.getItem('BranchId')) {
  authCompanyAndBranch = {
    'CompanyId': localStorage.getItem('CompanyId'),
    'BranchId': localStorage.getItem('BranchId')
  }
} else {
  authCompanyAndBranch = {
    'CompanyId': 1,
    'BranchId': 1
  }
}
export const store = new Vuex.Store({
  state: {
    // sistem gereksinimleri
    developmentMode: false,
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
      email: user ? user.UserName : null,
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
      }
    ],
    insertHTML: null,
    insertRules: [],
    insertRequired: [],
    insertVisible: [],
    insertTitle: [],
    insertReadonly: [],
    insertColumnType: [],
    insertDefaultValue: [],
    insertFormdata: [],
    gridField: [],
    errorView: false,
    errorData: [],
    nextgrid: false,
    isFiltered: false,
    filterData: [],
    createCode: null,
    navigation: [],
    shortcuts: [],
    rowData: [],
    tableData: [],
    tableFilters: [],
    autocompleteData: [],
    tableOperations: [],
    tableRows: [],
    tableRowsAll: [],
    breadcrumbList: [],
    modalLoad: false,
    searchRes: [],
    errorMessage: null,
    cities: [],
    distiricts: [],
    lookup: [],
    detailLookup: [],
    lookupWarehouse_type: [],
    vehicleList: [],
    branchList: [],
    analysisQuestions: [],
    warehouseList: [],
    warehouseListTo: [],
    customerList: [],
    // Employee Lookups Values
    employeeTypes: [],
    priceList: [],
    educationStatus: [],
    bloodTypes: [],
    employeeGroups: [],
    category1: [],
    scoreCards: [],
    employees: [],
    // Vehicle Lookups Values
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
    // Route Lookups Values
    routeClasses: [],
    routeGroups: [],
    visitStartControls: [],
    routeTypeOptions: [],
    // Customer
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
    signNameIds: [],
    banks: [],
    currency: [],
    // items: [],
    paymentPeriods: [],
    statementDays: [],
    paymentTypes: [],
    customerLabels: [],
    customerLabelValues: [],
    credits: [],
    touchpoints: [],
    touchpoint_types: [],
    contractTypes: [],
    customerContracts: [],
    benefitTypes: [],
    budgets: [],
    tciBreak1: [],
    assets: [],
    routes: [],
    warehouses: [],
    vanLoadingStatus: [],
    itemForVanLoading: [],
    creatorPassword: null,
    formFields: [],
    branches: [],
    stockStatus: []
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
    logout ({ commit }, authData) {
      return axios.post('VisionNextAuthentication/api/Authentication/LogOut', authCompanyAndBranch, authHeader)
        .then(res => {
          commit('logout')
        })
        .catch(err => {
          commit('logout')
          commit('showAlert', { type: 'network', msg: err })
        })
    },
    changePassword ({ commit }, authData) {
      return axios.post('VisionNextAuthentication/api/Authentication/ChangePassword', {
        Email: authData.Email,
        OldPassword: authData.OldPassword,
        NewPassword: authData.NewPassword,
        CuaAuthKey: user.CuaKey
      })
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: 'Şifreniz Değiştirildi.' })
            setTimeout(() => {
              router.push({name: 'Dashboard'})
            }, 1000)
          } else {
            commit('showAlert', { type: 'error', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'network', msg: err })
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
            commit('showAlert', { type: 'catch', msg: res.data })
            console.log(res)
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'catch', msg: err.response })
        })
    },
    // index ekranlarının tablo bilgilerini ve dinamik değerlerini getiren fonksiyondur.
    // fonksiyon olumlu çalıştığında tablo verisini doldurmak için getTableData fonksiyonunu çalıştırır.
    getTableOperations ({ state, commit }, query) {
      commit('bigLoaded', true)
      commit('setError', {view: false, info: null})
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api, authHeader)
        .then(res => {
          if ((res.data.IsCompleted === true) && (res.data.UIPageModels.length >= 1)) {
            commit('setTableOperations', res.data.UIPageModels[0])
            // ilgili tablonun kayıtlı filtrelerini getirir.
            this.dispatch('getFilters', {...this.query, FormId: res.data.UIPageModels[0].Id})

            if ((res.data.UIPageModels[0].SelectedColumns) && (res.data.UIPageModels[0].SelectedColumns.length >= 1)) {
              commit('setTableRows', res.data.UIPageModels[0].SelectedColumns)
            } else {
              commit('setTableRows', res.data.UIPageModels[0].RowColumns)
            }
            commit('setTableRowsAll', res.data.UIPageModels[0].RowColumns)

            // başarılı -> tabloyu doldur.
            if (query.code) {
              let filterdata = {
                'BranchId': state.BranchId,
                'CompanyId': state.CompanyId,
                'code': query.code
              }
              return axios.post('VisionNextUIOperations/api/UIFormView/SearchFilterByCode', filterdata, authHeader)
                .then(res => {
                  if (res.data.IsCompleted === true) {
                    this.dispatch('getTableData', {
                      ...this.query,
                      apiUrl: query.apiUrl,
                      api: query.api,
                      page: query.page,
                      count: query.count,
                      sort: query.sort,
                      search: JSON.parse(res.data.Model.LinkUrl),
                      andConditionalModel: query.andConditionalModel
                    })
                  } else {
                    commit('setError', {view: true, info: res.data.Message})
                  }
                })
                .catch(err => {
                  console.log(err)
                  commit('setError', {view: true, info: 'Server Error'})
                })
            } else {
              this.dispatch('getTableData', {
                ...this.query,
                apiUrl: query.apiUrl,
                api: query.api,
                page: query.page,
                count: query.count,
                sort: query.sort,
                search: query.search,
                andConditionalModel: query.andConditionalModel
              })
            }
            commit('hideAlert')
            commit('setError', {view: false, info: null})
          } else {
            commit('setError', {view: true, info: res.data.Message})
            commit('bigLoaded', false)
          }
        })
        .catch(err => {
          console.log(err)
          commit('setError', {view: true, info: 'Server Error'})
        })
    },
    getFilters ({ state, commit }, query) {
      let dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'FormId': query.FormId
      }
      return axios.post('VisionNextUIOperations/api/UiFormView/GetFilters', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setTableFilters', res.data.Filters)
          } else {
            commit('setError', {view: true, info: res.data.Message})
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
      if (query.search) {
        state.isFiltered = true
        state.filterData = query.search
        AndConditionModel = {
          ...query.search,
          ...query.andConditionalModel
        }
      } else {
        state.isFiltered = false
        state.filterData = []
        AndConditionModel = {
          ...query.andConditionalModel
        }
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
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'UserId': state.UserId,
        'FormId': query.FormId,
        'Columns': query.Columns
      }
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      return axios.post('VisionNextUIOperations/api/UIFormGrid/UpdateSelectedColumn', dataQuery, authHeader)
        .then(res => {
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
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'RecordId': query.record
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
      const queryType = query.type.split(',').filter(function (item, i, allItems) {
        return i === allItems.indexOf(item)
      }).join(',')

      let dataQuery = {
        'LookupTableCode': queryType,
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId
      }
      return axios.post(`VisionNextCommonApi/api/LookupValue/GetValuesMultiple`, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setLookUp', res.data.Values)
          } else {
            // commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        // .catch(err => {
        //   console.log(err.message)
        //   commit('showAlert', { type: 'danger', msg: err.message })
        // })
    },
    getDetailPanelLookups ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode': query.type,
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId
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
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        ...query.formdata
      }
      console.log(dataQuery)
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      return axios.post(query.api + '/Insert', dataQuery, authHeader)
        .then(res => {
          commit('hideAlert')
          document.getElementById('submitButton').disabled = false
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('form.createOk') })
            if (query.return) {
              router.push({name: query.return})
            } else if (query.action) {
              location.reload()
            }
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
    createRouteBalance ({ state, commit }, query) {
      let dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        ...query.formdata
      }
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      document.getElementById('submitButton').disabled = true
      return axios.post(query.api, dataQuery, authHeader)
        .then(res => {
          commit('hideAlert')
          document.getElementById('submitButton').disabled = false
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('form.createOk') })
            if (query.return) {
              router.push({name: query.return})
            } else if (query.action) {
              location.reload()
            }
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
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
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
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'RecordId': query.record
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
    getGridFields ({ state, commit }, query) { // index ekranlarındaki autocomplete/dropdown seçimleri için data yükler
      console.log(query.model)

      let dataQuery = {
        'AndConditionModel': query.model ? query.model : {},
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post(query.serviceUrl, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setGridField', {data: res.data.ListModel.BaseModels, name: query.val})
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getLookups ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode': query.type,
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'UpperValue': query.upperValue
      }
      return axios.post('VisionNextCommonApi/api/LookupValue/GetValues', dataQuery, authHeader)
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
    getLookupsWithUpperValue ({ state, commit }, query) {
      let dataQuery = {
        'LookupTableCode': query.type,
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
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
      return axios.post('VisionNextVehicle/api/Vehicle/Search', dataQuery, authHeader)
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
      // AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': query.searchText,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextWarehouse/api/Warehouse/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setWarehouseList', res.data.ListModel.BaseModels)
          } else {
            commit('setWarehouseList', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acWarehouseTo ({ state, commit }, query) {
      let AndConditionModel = {}
      // AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': query.searchText,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextWarehouse/api/Warehouse/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setWarehouseListTo', res.data.ListModel.BaseModels)
          } else {
            commit('setWarehouseListTo', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    acItems ({ state, commit }, query) {
      let AndConditionModel = {}
      AndConditionModel[query.searchField] = query.searchText
      let dataQuery = {
        AndConditionModel,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 50,
        'page': 1
      }
      return axios.post('VisionNextItem/api/Item/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setItems', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // aşağıdaki kodların tekrardan elden geçirilip temizlenmesi gerekiyor.
    getItems ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextItem/api/Item/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setItems', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getStatementDays ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextSystem/api/SysDay/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setStatementDays', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getContractTypes ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextContractManagement/api/ContractType/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setContractTypes', res.data.ListModel.BaseModels)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getCustomerContracts ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
          'customerIds': query.ids
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 1000,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post('VisionNextContractManagement/api/Contract/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCustomerContracts', res.data.ListModel.BaseModels)
          } else {
            commit('setCustomerContracts', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('setCustomerContracts', [])
          console.log(err.message)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getBenefitTypes ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextContractManagement/api/ContractBenefitType/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setBenefitTypes', res.data.ListModel.BaseModels)
          } else {
            commit('setBenefitTypes', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('setBenefitTypes', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getBudgets ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextBudget/api/BudgetMaster/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setBudgets', res.data.ListModel.BaseModels)
          } else {
            commit('setBudgets', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('setBudgets', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getAssets ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextAsset/api/Asset/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setAssets', res.data.ListModel.BaseModels)
          } else {
            commit('setAssets', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('setAssets', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getVanLoadingStatus ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextStockManagement/api/VanLoadingStatu/Search', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setVanLoadingStatus', res.data.ListModel.BaseModels)
          } else {
            commit('setVanLoadingStatus', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('setVanLoadingStatus', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getItemForVanLoading ({state, commit}, query) {
      let dataQuery = {
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'routeId': query.params.routeId,
        'itemCode': query.params.itemCode,
        'warehouseId': query.params.warehouseId,
        'loadingDate': query.params.loadingDate,
        'pagerecordCount': 100,
        'page': 1
      }
      return axios.post('VisionNextItem/api/Item/GetItemSearchForVanLoading', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setItemForVanLoading', res.data.Model)
          } else {
            commit('setItemForVanLoading', [])
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          console.log(err.message)
          commit('setItemForVanLoading', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // yukarıdaki kodların tekrardan elden geçirilip temizlenmesi gerekiyor.

    // Search isteklerinin ortak fonksiyonu
    getSearchItems ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
          ...query.andConditionModel
        },
        ...query.props,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 1000,
        'page': 1
      }
      return axios.post(query.api, dataQuery, authHeader)
        .then(res => {
          // Şimdilik koyuldu geri alınacak

          if (query.name === 'fromRouteBalances' || query.name === 'toRouteBalances') {
            commit('setSearchItems', {data: res.data, name: query.name})
            return
          }
          if (res.data.IsCompleted === true) {
            commit('setSearchItems', {data: res.data.ListModel.BaseModels, name: query.name})
            commit('bigLoaded', false)
          } else {
            commit('setSearchItems', {data: [], name: query.name})
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
          commit('bigLoaded', false)
        })
    },

    // AutoComplete isteklerinin ortak fonksiyonu Not: getSearchItems ile birleştirildi.
    // getAutoCompleteItems ({ state, commit }, query) {
    //   let AndConditionModel = {}
    //   AndConditionModel[query.searchField] = query.searchText
    //   let dataQuery = {
    //     AndConditionModel,
    //     'branchId': state.BranchId,
    //     'companyId': state.CompanyId,
    //     'pagerecordCount': 50,
    //     'page': 1
    //   }
    //   return axios.post('VisionNextItem/api/Item/Search', dataQuery, authHeader)
    //     .then(res => {
    //       if (res.data.IsCompleted === true) {
    //         commit('setItems', res.data.ListModel.BaseModels)
    //       } else {
    //         commit('showAlert', { type: 'danger', msg: res.data.Message })
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err.message)
    //       commit('showAlert', { type: 'danger', msg: err.message })
    //     })
    // },
    getPasswordCreator ({state, commit}, query) {
      let dataQuery = {
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'keyword': query.keyword
      }
      return axios.post('VisionNextMobileApi/api/TerminalPasswordLog/GetPasswordCreator', dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setCreatorPassword', res.data.Model)
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getDownloadLink ({state, commit}, query) {
      commit('bigLoaded', true)
      let dataQuery = {
        'AndConditionModel': {
        },
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'page': 1
      }

      return axios.post(query.api, dataQuery, {
        responseType: 'blob',
        ...authHeader
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'excel.xlsx')
        document.body.appendChild(link)
        link.click()
        commit('bigLoaded', false)
      }).catch(err => {
        commit('bigLoaded', false)
        commit('showAlert', { type: 'danger', msg: err.message })
      })
    },
    getFormFields ({ state, commit }, query) {
      commit('bigLoaded', true)
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api, authHeader)
        .then(res => {
          commit('bigLoaded', false)
          if ((res.data.IsCompleted === true) && (res.data.UIPageModels.length >= 1)) {
            commit('setFormFields', res.data.UIPageModels[0])
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('bigLoaded', false)
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    }
  },
  mutations: {
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
            toaster: 'b-toaster-bottom-right'
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
            title: i18n.t('general.errorTitle'),
            variant: 'warning',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          state.loginError = payload.msg
          break
        case 'info':
          this._vm.$bvToast.toast(payload.msg, {
            title: i18n.t('general.pleaseWait'),
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
    setTableFilters (state, payload) {
      state.tableFilters = payload
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
      let star = {}
      let visbl = {}
      let title = {}
      let enbld = {}
      let cType = {}
      let valueForAutoLookup = ''
      let dflvl = []
      let formData = ''
      apiRules.forEach(rule => {
        let inputCode = ''
        let fieldName = rule.EntityProperty
        let fieldEnabled = rule.Enabled
        let fieldLabel = rule.Label
        let fieldRequired = rule.Required
        let fieldDefaultValue = rule.DefaultValue
        let fieldVisible = rule.Visible
        rull[fieldName] = fieldRequired === true ? { required } : { not } // validasyon durumu.
        star[fieldName] = fieldRequired // validasyon yıldızını göster.
        visbl[fieldName] = fieldVisible // görüntüleme durumu.
        title[fieldName] = fieldLabel // input ismi.
        enbld[fieldName] = fieldEnabled !== true // input ismi.
        cType[fieldName] = rule.ColumnType

        formData += fieldName + ': null,' + '\n'
        switch (rule.ColumnType) {
          case 'Id':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'String':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'LabelValue':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <b-form-input type="text" v-model="form.${fieldName}" :readonly="insertReadonly.${fieldName}" />
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'Select':
            if (fieldDefaultValue != null) {
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <v-select
                    :options="lookup.${fieldDefaultValue}"
                    @input="selectedType('${fieldName}', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>`

              valueForAutoLookup += fieldDefaultValue + ','
            } else {
              inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                  <v-select />
                </b-form-group>
              </b-col>`
            }
            break
          case 'SelectSearch':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <v-select />
              </b-form-group>
            </b-col>`
            break
          case 'Radio':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <NextCheckBox v-model="form.${fieldName}" type="number" toggle />  
              </b-form-group>
            </b-col>`
            if (parseInt(fieldDefaultValue) === 1) {
              dflvl[fieldName] = true
            } else {
              dflvl[fieldName] = false
            }
            break

          case 'Check':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <NextCheckBox v-model="form.${fieldName}" type="number" />  
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = parseInt(fieldDefaultValue)
            break

          case 'DateTime':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" :start-weekday="1" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <b-form-datepicker v-model="form.${fieldName}" />
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'Text':
            inputCode = `<b-col v-if="insertVisible.${fieldName} != null ? insertVisible.${fieldName} : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.${fieldName} + (insertRequired.${fieldName} === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.${fieldName}.$error }">
                <b-form-textarea v-model="form.${fieldName}" placeholder="" />
              </b-form-group>
            </b-col>`
            dflvl[fieldName] = fieldDefaultValue
            break
        }
        if (state.developmentMode === true) { // HTML üretimi sadece development modu aktifken çalışacak.
          if (inputCode) {
            insertPageHTML[fieldName] = inputCode.trim()
          }
        }
      })

      if (valueForAutoLookup.length > 0) {
        valueForAutoLookup = valueForAutoLookup.slice(0, -1)
        this.dispatch('getAllLookups', {...this.query, type: valueForAutoLookup})
      }
      if (state.developmentMode === true) {
        state.insertHTML = insertPageHTML
        console.log(formData)
      }
      state.insertRules = rull
      state.insertRequired = star
      state.insertVisible = visbl
      state.insertTitle = title
      state.insertReadonly = enbld
      state.insertColumnType = cType
      state.insertDefaultValue = dflvl
      state.insertAllElements = dflvl
      state.insertFormdata = formData
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
      state.loginUser.name = user.Name + ' ' + user.Surname
      state.loginUser.company = user.AuthorizedBranches[0].Desciption
      authHeader = {
        headers: {
          'key': localStorage.getItem('Key')
        }
      }
      store.commit('userIDs', {
        userId: user.UserId,
        company: user.AuthorizedCompanies[0].Id,
        branch: user.AuthorizedBranches.filter(f => f.IsDefaultBranch === true)[0].Id,
        branchName: user.AuthorizedBranches.filter(f => f.IsDefaultBranch === true)[0].Desciption
      })
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
        'CompanyId': localStorage.getItem('CompanyId'),
        'BranchId': localStorage.getItem('BranchId')
      }
      router.push({name: 'Dashboard'})
    },
    changeUserIDs (state, payload) {
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
        'CompanyId': localStorage.getItem('CompanyId'),
        'BranchId': localStorage.getItem('BranchId')
      }
      location.reload()
    },
    logout () {
      store.commit('clearToken')
      location.href = '/Auth'
    },
    clearToken () {
      localStorage.clear()
      localStorage.setItem('signed', false)
    },
    // aşağıdaki fonksiyonlar temizlenmeli. birbirini taklit eden fonksiyonlar birleştirilmeli.
    setValues (state, payload) {
      state[payload.name] = payload.data.Values
    },
    setGridField (state, payload) {
      state.gridField[payload.name] = payload.data
    },
    setAnalysisQuestions (state, payload) {
      state.analysisQuestions = payload
    },
    setBranch (state, payload) {
      state.branch = payload
    },
    setSearchItems (state, payload) {
      if (typeof state[payload.name] === 'undefined') {
        Vue.set(state, payload.name, [])
      }
      console.log(payload)
      state[payload.name] = payload.data
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
    },
    setWarehouseListTo (state, payload) {
      state.warehouseListTo = payload
    },
    // setBanks (state, payload) {
    //   state.banks = payload
    // },
    // setCurrency (state, payload) {
    //   state.currency = payload
    // },
    setItems (state, payload) {
      state.items = payload
    },
    // setPaymentPeriods (state, payload) {
    //   state.paymentPeriods = payload
    // },
    setStatementDays (state, payload) {
      payload.map(item => {
        item.Label = item.DayNumber + ' ' + item.Description1
      })
      state.statementDays = payload
    },
    setCustomerLabels (state, payload) {
      state.customerLabels = payload
    },
    setContractTypes (state, payload) {
      state.contractTypes = payload
    },
    setCustomerContracts (state, payload) {
      state.customerContracts = payload
    },
    setBenefitTypes (state, payload) {
      state.benefitTypes = payload
    },
    setBudgets (state, payload) {
      state.budgets = payload
    },
    setAssets (state, payload) {
      state.assets = payload
    },
    setVanLoadingStatus (state, payload) {
      state.vanLoadingStatus = payload
    },
    setItemForVanLoading (state, payload) {
      state.itemForVanLoading = payload
    },
    setCreatorPassword (state, payload) {
      state.creatorPassword = payload
    },
    setFormFields (state, payload) {
      state.formFields = payload
    }
  }
})
