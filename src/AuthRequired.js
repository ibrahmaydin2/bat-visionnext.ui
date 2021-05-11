import { store } from './store'
const authcontrol = false

export default (to, from, next) => {
  store.commit('resetCancelToken', {})
  if (authcontrol) {
    next()
  } else if (localStorage.getItem('Key') != null && localStorage.getItem('Key').length > 0) {
    next()
  } else {
    localStorage.removeItem('Key')
    next('/Auth/Login')
  }
}
