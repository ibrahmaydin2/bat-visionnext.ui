import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { ideaName, copyright } from '../static/system'
import router from './router'
import i18n from './i18n'
import { required, not } from 'vuelidate/lib/validators'

Vue.use(ToastPlugin)
Vue.use(Vuex)
var pagerecordCount = 100
var checkSearchObject = function (obj) {
  if (obj) {
    let isCustomSearch = false
    let isAutoComplete = false
    let isList = obj && (obj.length > 0)
    if (isList) {
      obj = obj[0]
    }
    let keys = Object.keys(obj)
    keys.forEach(key => {
      if (key === 'Description1') {
        isAutoComplete = true
      }
      let value = obj[key]
      if (value === '%%%') {
        delete obj[key]
        isCustomSearch = true
      } else if ((typeof value === 'string' || value instanceof String) && value.includes('%')) {
        obj[key] = value.replaceAll('%', '')
        isCustomSearch = true
      }
    })
    pagerecordCount = isCustomSearch || isAutoComplete ? 10 : 50
    return !isList ? obj : obj && Object.keys(obj).length > 0 ? [obj] : []
  } else {
    pagerecordCount = 50
    return undefined
  }
}
var numberOfAjaxCAllPending = 0
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL_BASE
axios.defaults.timeout = 120000
axios.interceptors.request.use(function (config) {
  numberOfAjaxCAllPending++
  if (!store.state.disabledLoading) {
    store.commit('bigLoaded', true)
  }
  return config
})
axios.interceptors.response.use(function (response) {
  numberOfAjaxCAllPending--
  if (numberOfAjaxCAllPending === 0) {
    store.commit('bigLoaded', false)
  } else {
    store.commit('bigLoaded', true)
  }
  return response
}, function (error) {
  numberOfAjaxCAllPending--
  if (numberOfAjaxCAllPending === 0) {
    store.commit('bigLoaded', false)
  }
  if (error && error.code === 'ECONNABORTED') {
    store.commit('showAlert', { type: 'danger', msg: i18n.t('general.timeoutError') })
  }
  if (error.response && error.response.status === 401) {
    store.commit('showAlert', { type: 'danger', msg: i18n.t('general.tokenExpired') })
    store.commit('logout')
  }
  return Promise.reject(error)
})
export default axios
let user = JSON.parse(localStorage.getItem('UserModel')) ? JSON.parse(localStorage.getItem('UserModel')) : null
let authHeader = {
  headers: {
    'key': localStorage.getItem('Key'),
    'hash': process.env.HASH,
    'LanguageId': localStorage.getItem('LanguageId'),
    'VersionNo': process.env.VUE_APP_VESION_NO
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
      version: process.env.VUE_APP_VESION_NO,
      copyright: copyright
    },
    title: {
      siteName: process.env.VUE_APP_SYSTEM_NAME,
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
    stockStatus: [],
    SelectedCustomer: {},
    autoGridField: [],
    selectedTableRows: [],
    printDocuments: [],
    disabledLoading: false,
    filtersCleared: false,
    lastGridItem: null,
    lastGridModel: null,
    reloadGrid: false,
    cancelToken: {},
    isMultipleGrid: false,
    multipleItemSearch: {
      hiddenValues: [
        {
          mainProperty: 'Code',
          targetProperty: 'ItemCode'
        }
      ],
      convertedValues: [
        {
          mainProperty: 'Quantity',
          targetProperty: 'NetTotal',
          getValue: (value, data) => {
            return store.roundNumber(data.Price * (value ? parseFloat(value) : 0))
          }
        },
        {
          mainProperty: 'Quantity',
          targetProperty: 'TotalVat',
          getValue: (value, data) => {
            return data.IsVatIncluded === 1 ? 0 : store.roundNumber(data.NetTotal * data.VatRate / 100)
          }
        },
        {
          mainProperty: 'Quantity',
          targetProperty: 'GrossTotal',
          getValue: (value, data) => {
            return store.roundNumber(parseFloat(data.NetTotal) + parseFloat(data.TotalVat))
          }
        }
      ],
      multipleValidations: [
        {
          mainProperty: 'Quantity',
          validation: (value, data) => {
            if (value && parseFloat(value) > data.StockQuantity) {
              store.commit('showAlert', { type: 'danger', msg: i18n.t('insert.order.quantityStockException') })
              return false
            }
            return true
          }
        }
      ],
      quantityValidation: [
        {
          mainProperty: 'Quantity',
          validation: (value, data) => {
            return value > 0
          }
        }
      ]
    }
  },
  actions: {
    // sistem gereksinimleri
    async login ({ commit }, authData) {
      localStorage.clear()
      document.getElementById('loginButton').disabled = true
      document.getElementById('loginLoaderText').style.display = 'none'
      document.getElementById('loginLoader').style.display = 'block'
      commit('showAlert', { type: 'info', msg: i18n.t('general.loggined') })
      let browserInfo = await this.dispatch('getBrowserInfo')
      let os = await this.dispatch('getOSInfo')

      let request = {
        SessionId: authData.SessionId,
        UserName: authData.UserName,
        Password: authData.Password,
        InstanceHash: process.env.HASH,
        Info: {
          Browser: browserInfo.name,
          BrowserVersion: browserInfo.version,
          UserHost: process.env.BASE_URL,
          OperatingSystem: os
        }
      }

      return axios.post('VisionNextAuthentication/api/Authentication/Login', request, authHeader)
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
          }
        })
        .catch(err => {
          document.getElementById('loginButton').disabled = false
          document.getElementById('loginLoaderText').style.display = 'block'
          document.getElementById('loginLoader').style.display = 'none'
          commit('showAlert', { type: 'network', msg: err })
          commit('setTableData', [])
        })
    },
    loginWithCua ({ commit }, authData) {
      localStorage.clear()
      commit('showAlert', { type: 'info', msg: i18n.t('general.loggined') })
      return axios.post('VisionNextAuthentication/api/Authentication/LoginRedirect', {
        InstanceHash: authData.hash,
        RedirectInstanceHash: authData.redirectHash,
        AuthKey: decodeURIComponent(authData.authKey)
      }, authHeader)
        .then(res => {
          commit('hideAlert')
          if (res.data.IsCompleted === true) {
            commit('login', res.data)
          } else {
            commit('showAlert', { type: 'error', msg: res.data.Message })
            commit('setTableData', [])
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'network', msg: err })
          commit('setTableData', [])
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
        ...authCompanyAndBranch,
        ...authData

      }, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('showAlert', { type: 'success', msg: i18n.t('general.changedPasswordMessage') })
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
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'catch', msg: err.response })
        })
    },
    // index ekranlarının tablo bilgilerini ve dinamik değerlerini getiren fonksiyondur.
    // fonksiyon olumlu çalıştığında tablo verisini doldurmak için getTableData fonksiyonunu çalıştırır.
    getTableOperations ({ state, commit }, query) {
      commit('setError', {view: false, info: null})
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api, authHeader)
        .then(res => {
          if ((res.data.IsCompleted === true) && (res.data.UIPageModels.length >= 1)) {
            commit('setTableOperations', res.data.UIPageModels[0])
            // ilgili tablonun kayıtlı filtrelerini getirir.
            this.dispatch('getFilters', {...this.query, FormId: res.data.UIPageModels[0].Id})

            if ((res.data.UIPageModels[0].SelectedColumns) && (res.data.UIPageModels[0].SelectedColumns.length >= 1)) {
              commit('setTableRows', res.data.UIPageModels[0].SelectedColumns)
              commit('setTableRowsAll', res.data.UIPageModels[0].RowColumns.map(item => {
                let selectedColumns = res.data.UIPageModels[0].SelectedColumns.filter(s => s.dataField === item.dataField)
                item.visible = selectedColumns && selectedColumns.length > 0 ? selectedColumns[0].visible : false
                return item
              }))
            } else {
              commit('setTableRows', res.data.UIPageModels[0].RowColumns)
              commit('setTableRowsAll', res.data.UIPageModels[0].RowColumns)
            }
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
                .catch(() => {
                  commit('setError', {view: true, info: 'Server Error'})
                })
            } else {
              if (query.requiredFieldsError) {
                return
              }
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
          }
        })
        .catch(() => {
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
        .catch(() => {
          commit('setError', {view: true, info: 'Server Error'})
        })
    },
    // tüm index ekranlarının tablosunu POST metodudyla besleyen fonksiyondur.
    getTableData ({ state, commit }, query) {
      commit('setTableData', [])
      commit('showNextgrid', false)
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
        OrderByColumns = [
          {
            'column': 'CreatedDateTime',
            'orderByType': 1
          }
        ]
      }
      // search özelliği şuan tek sütunda geçerli.
      // ilerleyen vakitlerde birden çok sütunda geçerli hale getirilebilir.
      if (query.search) {
        state.isFiltered = true
        AndConditionModel = {
          ...query.search,
          ...query.andConditionalModel
        }
        state.filterData = AndConditionModel
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
        'UiFormId': state.tableOperations.Id,
        OrderByColumns
      }
      commit('setLastGridModel', {AndConditionModel: AndConditionModel, OrderByColumns: OrderByColumns})
      // return axios.post('VisionNext' + query.api + '/api/' + query.api + '/Search', dataQuery) -> dinamikken bunu kullanıyorduk
      commit('showAlert', { type: 'info', msg: i18n.t('form.pleaseWait') })
      return axios.post(query.apiUrl, dataQuery, authHeader)
        .then(res => {
          if (res.data.ListModel && !state.lastGridItem) {
            commit('setLastGridItem', res.data.ListModel)
          }
          commit('hideAlert')
          if (res.data.IsCompleted === true) {
            commit('setError', {view: false, info: null})
            commit('showNextgrid', true)
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
          return res
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: JSON.stringify(err.message) })
        })
    },
    // tüm GET ekranlarının genel datasını POST metodudyla besleyen fonksiyondur.
    getData ({ state, commit }, query) {
      commit('setTableData', [])
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
              commit('setRowData', res.data.Model)
              let history = router ? router.history : null
              let current = history ? history.current : null
              let routeName = current ? current.name : null
              if (routeName && routeName.includes('Update') && res.data.Model && res.data.Model.System === 1) {
                commit('showAlert', { type: 'error', msg: i18n.t('insert.systemRecordCanNotUpdate') })
                document.getElementById('submitButton').disabled = true
              }
              break
            case 900:
              commit('logout')
              break
            default:
              commit('showAlert', { type: 'error', msg: res.data.message })
              break
          }
        })
        .catch(() => {
          // commit('showAlert', { type: 'danger', msg: err })
          // commit('setTableData', [])
        })
    },
    // tüm INSERT ekranlarının kontrolleri sağlanır.
    getAllLookups ({ state, commit }, query) {
      let types = query.type.split(',')

      const queryType = types.filter(function (item, i, allItems) {
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
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getInsertRules ({ state, commit }, query) {
      return axios.get(`VisionNextUIOperations/api/UIOperationGroupUser/GetFormInits?name=${query.api}&branchId=${state.BranchId}`, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setInsertRules', {rows: res.data.RowColumns, route: query.api})
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    GetUpdateRules ({ state, commit }, query) {
      return axios.get(`VisionNextUIOperations/api/UIOperationGroupUser/GetFormUpdateInits?name=${query.api}&branchId=${state.BranchId}`, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setInsertRules', {rows: res.data.RowColumns, route: query.api})
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err })
        })
    },
    getCreateCode ({ commit }, query) {
      return axios.post(query.apiUrl, authCompanyAndBranch, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setGetCreateCode', res.data.Model.Code)
          } else {
          }
        })
        .catch(err => {
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
          return res.data
        })
        .catch(err => {
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
      if (dataQuery.model && state.insertVisible) {
        dataQuery.model.updatedProperties = []
        for (var key in state.insertVisible) {
          if (state.insertVisible[key] === true) {
            dataQuery.model.updatedProperties.push(key)
          }
        }
      }
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
          return res.data
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
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // aşağıdaki fonksiyonlar temizlenmeli. birbirini taklit eden fonksiyonlar birleştirilmeli.
    getBranchData ({ state, commit }, query) {
      commit('setTableData', [])
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
              commit('setBranch', res.data.Model)
              break
            case 900:
              commit('logout')
              break
            default:
              commit('showAlert', { type: 'error', msg: res.data.message })
              break
          }
        })
        .catch(() => {
          // commit('showAlert', { type: 'danger', msg: err })
          // commit('setTableData', [])
        })
    },
    // LOOKUP servisleri
    getGridFields ({ state, commit }, query) { // index ekranlarındaki autocomplete/dropdown seçimleri için data yükler
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
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getAutoGridFields ({ state, commit }, query) { // index ekranlarındaki autocomplete/dropdown seçimleri için data yükler
      let dataQuery = {
        'AndConditionModel': query.model ? query.model : {},
        'OrConditionModels': query.orConditionModels ? query.orConditionModels : {},
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': query.pagerecordCount ? query.pagerecordCount : 100,
        'page': 1,
        'OrderByColumns': []
      }
      if (query.val) {
        if (typeof state.cancelToken[query.val] !== typeof undefined) {
          state.cancelToken[query.val].cancel('CANCELLED_REQUEST')
        }
        commit('setCancelToken', {name: query.val, data: axios.CancelToken.source()})
        if (state.cancelToken[query.val]) {
          authHeader.cancelToken = state.cancelToken[query.val].token
        }
      }
      return axios.post(query.serviceUrl, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            // commit('setAutoGridField', {data: res.data.ListModel.BaseModels, name: query.val})
            return res.data.ListModel.BaseModels
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          if (err && err.message === 'CANCELLED_REQUEST') {
            return
          }
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getAutoGridFieldsWithOrConditionModel ({ state, commit }, query) { // index ekranlarındaki autocomplete/dropdown seçimleri için data yükler
      let dataQuery = {
        ...query.model,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': 100,
        'page': 1,
        'OrderByColumns': []
      }
      return axios.post(query.serviceUrl, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            // commit('setAutoGridField', {data: res.data.ListModel.BaseModels, name: query.val})
            return res.data.ListModel.BaseModels
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
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
          commit('setItemForVanLoading', [])
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    // yukarıdaki kodların tekrardan elden geçirilip temizlenmesi gerekiyor.

    // Search isteklerinin ortak fonksiyonu
    getSearchItems ({state, commit}, query) {
      let dataQuery = {
        'AndConditionModel': {
          ...checkSearchObject(query.andConditionModel)
        },
        'OrConditionModels': checkSearchObject(query.orConditionModels),
        ...query.props,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'pagerecordCount': query.pagerecordCount ? query.pagerecordCount : pagerecordCount,
        'page': 1
      }
      if (query.name) {
        if (typeof state.cancelToken[query.name] !== typeof undefined && typeof state.cancelToken[query.name].cancel) {
          state.cancelToken[query.name].cancel('CANCELLED_REQUEST')
        }
        commit('setCancelToken', {name: query.name, data: axios.CancelToken.source()})
        if (state.cancelToken[query.name]) {
          authHeader.cancelToken = state.cancelToken[query.name].token
        }
      }
      return axios.post(query.api, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setSearchItems', {data: res.data.ListModel.BaseModels, name: query.name})
          } else {
            commit('setSearchItems', {data: [], name: query.name})
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          if (err && err.message === 'CANCELLED_REQUEST') {
            return
          }
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
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
      let dataQuery = {
        ...state.lastGridModel,
        OrderByColumns: query.orderByColumns
          ? query.orderByColumns
          : state.lastGridModel.OrderByColumns ? state.lastGridModel.OrderByColumns : null,
        'branchId': state.BranchId,
        'companyId': state.CompanyId,
        'page': 1,
        'formName': query.formName
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
      }).catch(err => {
        commit('showAlert', { type: 'danger', msg: err.message })
      })
    },
    getFormFields ({ state, commit }, query) {
      return axios.get('VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=' + query.api, authHeader)
        .then(res => {
          if ((res.data.IsCompleted === true) && (res.data.UIPageModels.length >= 1)) {
            commit('setFormFields', res.data.UIPageModels[0])
          } else {
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getDashboard ({ state, commit }, query) {
      const userId = JSON.parse(localStorage.getItem('UserModel')).UserId
      return axios.get(`VisionNextDashboard/api/Dashboard/GetUserDashboards?id=${userId}`, authHeader)
        .then(res => {
          return res
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getDashboardReports ({ state, commit }, query) {
      return axios.get(`VisionNextDashboard/api/Dashboard/GetUserGadgets?id=${query.id}`, authHeader)
        .then(res => {
          return res
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getDashboardReportDetail ({ state, commit }, query) {
      return axios.get(`VisionNextDashboard/api/Dashboard/GetGadgetDetails?id=${query.id}`, authHeader)
        .then(res => {
          return res
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    approvePotentialCustomer ({ state, commit }, query) {
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
            return res
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
    // Sayfa içindeki get metodlarının ortak fonksiyonu
    getAllData ({ state, commit }, query) {
      let dataQuery = {}
      dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'RecordId': query.record
      }
      return axios.post(query.api, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setGetItems', {data: res.data.Model, name: query.name})
          } else {
            commit('setGetItems', {data: [], name: query.name})
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    confirmModal ({ state, commit }, query) {
      let dataQuery = {}
      dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId
      }
      return axios.post(query.api, dataQuery, authHeader)
        .then(res => {
          if (res.data.IsCompleted === true) {
            commit('setGetItems', {data: res.data.Model, name: query.name})
          } else {
            commit('setGetItems', {data: [], name: query.name})
            commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    cashCardMultipleInsert ({ state, commit }, query) {
      let dataQuery = {}
      dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'model': query.item
      }
      return axios.post('VisionNextFinance/api/CashCard/Insert', dataQuery, authHeader)
        .then(res => {
          return res.data
        })
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    importExcel ({ state, commit }, formData) {
      let dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'model': { ...formData }
      }
      return axios.post('/VisionNextExcelIntegrator/api/Upload/UploadFile',
        dataQuery,
        authHeader
      ).then(function (res) {
        return res
      }).catch(function () {
        console.log('FAILURE!!')
      })
    },
    transferExcel ({ state, commit }, query) {
      let dataQuery = {}
      dataQuery = {
        'BranchId': state.BranchId,
        'CompanyId': state.CompanyId,
        'model': { ...query.model }
      }
      return axios.post(query.api, dataQuery, authHeader)
        .catch(err => {
          commit('showAlert', { type: 'danger', msg: err.message })
        })
    },
    getBrowserInfo () {
      var nAgt = navigator.userAgent
      var browserName = navigator.appName
      var fullVersion = '' + parseFloat(navigator.appVersion)
      var nameOffset, verOffset, ix

      // In Opera 15+, the true version is after "OPR/"
      if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
        browserName = 'Opera'
        fullVersion = nAgt.substring(verOffset + 4)
      } else if ((verOffset = nAgt.indexOf('Opera')) !== -1) { // In older Opera, the true version is after "Opera" or after "Version"
        browserName = 'Opera'
        fullVersion = nAgt.substring(verOffset + 6)
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8)
        }
      } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) { // In MSIE, the true version is after "MSIE" in userAgent
        browserName = 'Microsoft Internet Explorer'
        fullVersion = nAgt.substring(verOffset + 5)
      } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) { // In Chrome, the true version is after "Chrome"
        browserName = 'Chrome'
        fullVersion = nAgt.substring(verOffset + 7)
      } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) { // In Safari, the true version is after "Safari" or after "Version"
        browserName = 'Safari'
        fullVersion = nAgt.substring(verOffset + 7)
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8)
        }
      } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) { // In Firefox, the true version is after "Firefox"
        browserName = 'Firefox'
        fullVersion = nAgt.substring(verOffset + 8)
      } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) { // In most other browsers, "name/version" is at the end of userAgent
        browserName = nAgt.substring(nameOffset, verOffset)
        fullVersion = nAgt.substring(verOffset + 1)
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
          browserName = navigator.appName
        }
      }
      if ((ix = fullVersion.indexOf(';')) !== -1) { // trim the fullVersion string at semicolon/space if present
        fullVersion = fullVersion.substring(0, ix)
      }
      if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix)
      }

      let majorVersion = parseInt('' + fullVersion, 10)
      if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion)
      }

      return {
        name: browserName,
        version: fullVersion
      }
    },
    getOSInfo () {
      let list = [
        { subString: 'Win', identity: 'Windows' },
        { subString: 'Mac', identity: 'macOS' },
        { subString: 'iPhone', identity: 'iOS' },
        { subString: 'iPad', identity: 'iOS' },
        { subString: 'iPod', identity: 'iOS' },
        { subString: 'Android', identity: 'Android' },
        { subString: 'Linux', identity: 'Linux' }
      ]

      let platform = navigator.platform
      let filteredList = list.filter(l => platform.includes(l.subString))

      return filteredList.length > 0 ? filteredList[0].identity : '-'
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
      if (payload.msg === 'CANCELLED_REQUEST' || (payload.msg && payload.msg.message === 'CANCELLED_REQUEST')) {
        return
      }
      switch (payload.type) {
        case 'catch':
          if (payload.msg && payload.msg.status === 401) {
            store.commit('logout')
          }
          if (payload.msg && payload.msg.data) {
            this._vm.$bvToast.toast(JSON.stringify(payload.msg.data.Message), {
              title: i18n.t('general.serverError'),
              variant: 'danger',
              toaster: 'b-toaster-bottom-right',
              noCloseButton: false
            })
          }
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
            title: i18n.t('index.error'),
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
      let index = 0
      state.tableRows = payload.map(item => {
        item.id = index
        index++
        return item
      })
    },
    setTableRowsAll (state, payload) {
      state.tableRowsAll = []
      let index = 0
      state.tableRowsAll = payload.map(item => {
        item.id = index
        index++
        return item
      })
    },
    setLookUp (state, payload) {
      state.lookup = payload
    },
    setSingleLookUp (state, payload) {
      state.lookup[payload.key] = payload.value
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
        let modelControlUtil = rule.modelControlUtil
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
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextInput v-model="form.${fieldName}" type="text" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'String':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextInput v-model="form.${fieldName}" type="text" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'LabelValue':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextInput v-model="form.${fieldName}" type="text" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'Select':
            if (modelControlUtil && modelControlUtil.Code) {
              inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
                <NextDropdown :disabled="insertReadonly.${fieldName}" lookup-key="${modelControlUtil.Code}" @input="selectedType('${fieldName}', $event)"/>
              </NextFormGroup>`

              valueForAutoLookup += modelControlUtil.Code + ','
            } else {
              inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
                <NextDropdown :disabled="insertReadonly.${fieldName}" url="" @input="selectedSearchType('${fieldName}', $event)"/>
              </NextFormGroup>`
            }
            dflvl[fieldName] = parseInt(fieldDefaultValue)
            break
          case 'SelectSearch':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextDropdown :disabled="insertReadonly.${fieldName}" url="" @input="selectedSearchType('${fieldName}', $event)" :searchable="true"/>
            </NextFormGroup>`
            dflvl[fieldName] = parseInt(fieldDefaultValue)
            break
          case 'Radio':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextCheckBox v-model="form.${fieldName}" type="number" toggle />
            </NextFormGroup>`
            if (fieldDefaultValue === null) {
              dflvl[fieldName] = 1
            } else {
              dflvl[fieldName] = parseInt(fieldDefaultValue)
            }
            break

          case 'Check':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextCheckBox v-model="form.${fieldName}" type="number" />
            </NextFormGroup>`
            dflvl[fieldName] = parseInt(fieldDefaultValue)
            break

          case 'DateTime':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextDatePicker v-model="form.${fieldName}" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'Text':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextTextArea v-model="form.${fieldName}" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
            dflvl[fieldName] = fieldDefaultValue
            break

          case 'Time':
            inputCode = `<NextFormGroup item-key="${fieldName}" :error="$v.form.${fieldName}">
              <NextTimePicker v-model="form.${fieldName}" :disabled="insertReadonly.${fieldName}" />
            </NextFormGroup>`
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
          'key': localStorage.getItem('Key'),
          'hash': process.env.HASH,
          'LanguageId': localStorage.getItem('LanguageId')
        }
      }
      let defaultBranch = user.AuthorizedBranches.filter(f => f.IsDefaultBranch === true)[0]
      store.commit('userIDs', {
        userId: user.UserId,
        company: user.AuthorizedCompanies[0].Id,
        branch: defaultBranch.Id,
        branchName: defaultBranch.Desciption,
        customerId: defaultBranch.CustomerId
      })
    },
    userIDs (state, payload) {
      localStorage.setItem('UserId', payload.userId)
      localStorage.setItem('CompanyId', payload.company)
      localStorage.setItem('BranchId', payload.branch)
      localStorage.setItem('CustomerId', payload.customerId)

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
      localStorage.setItem('CustomerId', payload.customerId)

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
      location.href = '/dashboard'
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
    setAutoGridField (state, payload) {
      state.autoGridField[payload.name] = payload.data
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
      state[payload.name] = payload.data
    },
    setGetItems (state, payload) {
      if (typeof state[payload.name] === 'undefined') {
        Vue.set(state, payload.name, [])
      }
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
    setItems (state, payload) {
      state.items = payload
    },
    setCustomerContracts (state, payload) {
      state.customerContracts = payload
    },
    setItemForVanLoading (state, payload) {
      state.itemForVanLoading = payload
    },
    setCreatorPassword (state, payload) {
      state.creatorPassword = payload
    },
    setFormFields (state, payload) {
      state.formFields = payload
    },
    setSelectedTableRows (state, payload) {
      state.selectedTableRows = payload
    },
    setPrintDocuments (state, payload) {
      state.printDocuments = payload
    },
    setDisabledLoading (state, payload) {
      state.disabledLoading = payload
    },
    changeFiltersCleared (state, payload) {
      state.filtersCleared = payload
    },
    setLastGridItem (state, payload) {
      state.lastGridItem = payload
    },
    setReloadGrid (state, payload) {
      state.reloadGrid = payload
    },
    setCancelToken (state, payload) {
      state.cancelToken[payload.name] = payload.data
    },
    resetCancelToken (state, payload) {
      state.cancelToken = payload
    },
    setLastGridModel (state, payload) {
      state.lastGridModel = payload
    },
    setIsMultipleGrid (state, payload) {
      state.isMultipleGrid = payload
    }
  }
})

store.roundNumber = (value, decimalCount = 2) => {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return value && (Number.isInteger(value) || value % 1 !== 0) ? value.toFixed(decimalCount) : value
}
