import { store } from '../store'
import axios from 'axios'
import i18n from '../i18n'
export class ApiManager {
  async get (basePath, secondPath) {
    return this.call('get', {}, basePath, secondPath)
  }

  async post (request, basePath, secondPath) {
    return this.call('post', request, basePath, secondPath)
  }

  async postByUrl (request, url, pagerecordCount) {
    return this.call('post', request, null, null, url, pagerecordCount)
  }

  async getByUrl (url, pagerecordCount) {
    return this.call('get', {}, null, null, url, pagerecordCount)
  }

  async put (request, basePath, secondPath) {
    return this.call('put', request, basePath, secondPath)
  }

  async delete (request, basePath, secondPath) {
    return this.call('delete', request, basePath, secondPath)
  }

  async downloadByUrl (request, url) {
    return this.call('post', request, null, null, url, 100, 'blob')
  }

  async call (methodType, request, basePath, secondPath, url, pagerecordCount, responseType = 'json') {
    if (!url) {
      if (!secondPath) {
        secondPath = basePath
      }
      url = `VisionNext${basePath}/api/${secondPath}`
    }
    if (!request) {
      request = {}
    }
    request.branchId = store.state.BranchId
    request.companyId = store.state.CompanyId
    if (!request.andConditionModel) {
      request.andConditionModel = {}
    }
    request.pagerecordCount = !pagerecordCount ? 50 : pagerecordCount
    let header = {
      'key': localStorage.getItem('Key'),
      'hash': process.env.HASH,
      'LanguageId': localStorage.getItem('LanguageId')
    }
    let name = btoa(url)
    if (name) {
      if (store.state.cancelToken[name]) {
        store.state.cancelToken[name].cancel('CANCELLED_REQUEST')
      }
      store.commit('setCancelToken', {name: name, data: axios.CancelToken.source()})
    }
    return axios({
      responseType: responseType,
      method: methodType,
      url: url,
      data: request,
      headers: header,
      cancelToken: store.state.cancelToken[name].token
    }).then(function (response) {
      if (typeof response.data.IsCompleted === 'undefined') {
        return response.data
      }
      if (response.data.IsCompleted === true) {
        return response.data
      } else {
        if (response.data.Validations) {
          let errs = response.data.Validations.Errors
          for (let i = 0; i < errs.length; i++) {
            let errmsg = errs[i].States
            for (let x = 0; x < errmsg.length; x++) {
              store.commit('showAlert', { type: 'validation', msg: errmsg })
            }
          }
        } else {
          store.commit('bigLoaded', false)
          store.commit('showAlert', { type: 'error', msg: response.data.Message })
        }
        return response.data
      }
    }).catch(this.handleError)
  }

  handleError (error) {
    let message = i18n.t('general.unExpectedException')
    if (error && error.code === 'ECONNABORTED') {
      message = i18n.t('general.timeoutError')
    } else if (error && error.response && error.response.data) {
      message = error.response.data.Message
    } else if (error.message) {
      message = error.message
    }
    if (message !== 'CANCELLED_REQUEST') {
      store.commit('showAlert', { type: 'danger', msg: message })
    }
    return Promise.reject(error)
  }
}
