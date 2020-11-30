const holy = false

export default (to, from, next) => {
  if (holy) {
    next()
  } else if (localStorage.getItem('Key') != null && localStorage.getItem('Key').length > 0) {
    next()
  } else {
    localStorage.removeItem('Key')
    next('/Auth/Login')
  }
}
