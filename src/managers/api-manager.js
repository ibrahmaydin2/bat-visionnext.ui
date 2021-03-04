import { store } from '../store'
import axios from 'axios'

export class ApiManager {
  async get (basePath, secondPath) {
    return this.call('get', {}, basePath, secondPath)
  }

  async post (request, basePath, secondPath) {
    return this.call('post', request, basePath, secondPath)
  }

  async put (request, basePath, secondPath) {
    return this.call('put', request, basePath, secondPath)
  }

  async delete (request, basePath, secondPath) {
    return this.call('delete', request, basePath, secondPath)
  }

  async call (methodType, request, basePath, secondPath) {
    if (!secondPath) {
      secondPath = basePath
    }
    if (!request) {
      request = {}
    }
    request.branchId = store.state.BranchId
    request.companyId = store.state.CompanyId
    return axios({
      method: methodType,
      url: `VisionNext${basePath}/api/${secondPath}`,
      data: request,
      headers: {'key': localStorage.getItem('Key')}
    }).then(function (response) {
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
        }
      }
    }).catch(this.handleError)
  }

  handleError (error) {
    let message = 'Beklenmedik bir hata oluştu! Daha sonra tekrar deneyiniz.'
    if (error && error.response && error.response.data) {
      message = error.response.data.message
    }
    store.commit('showAlert', { type: 'danger', msg: message })
    return Promise.reject(error)
  }
}
