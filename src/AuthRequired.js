const authcontrol = false

export default (to, from, next) => {
  if (authcontrol) {
    next()
  } else if (localStorage.getItem('Key') != null && localStorage.getItem('Key').length > 0) {
    next()
  } else {
    localStorage.removeItem('Key')
    next('/Auth/Login')
  }
}
