export const now = new Date()
export const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
var dd = now.getDate()
var mm = now.getMonth() + 1
var yyyy = now.getFullYear()
var hh = now.getHours()
var ii = now.getMinutes()
var ss = now.getSeconds()
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
export const mmMinDate = new Date(today)
export const mmMaxDate = new Date(today)
export let mmToday = dd + '-' + mm + '-' + yyyy
export let mmNow = hh + ':' + ii + ':' + ss
export const ideaName = 'İdea Teknoloji Çözümleri'
export const copyright = `© ${yyyy} İdea Teknoloji Çözümler Bilgisayar San. ve Tic. A.Ş.`
