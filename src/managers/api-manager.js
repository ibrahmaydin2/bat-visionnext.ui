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
      return response.data
    }).catch(this.handleError)
  }

  handleError (error) {
    let message = 'Beklenmedik bir hata oluştu! Daha sonra tekrar deneyiniz.'
    if (error && error.response && error.response.data) {
      message = error.response.data.message
      console.log(message)
    }
    store.commit('showAlert', { type: 'danger', msg: message })
    return Promise.reject(error)
  }
}
