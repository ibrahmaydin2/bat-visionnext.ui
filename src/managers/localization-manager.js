import i18n from '../i18n'

export class LocalizationManager {
  async setLocalization () {
    let languageId = localStorage.getItem('LanguageId')
    let selectedLang = localStorage.getItem('selectedLang')
    let locale = !selectedLang ? 'tr' : selectedLang
    let request = {
      LanguageId: !languageId ? 1 : languageId
    }

    return window.$api.postByUrl(request, 'VisionNextAdmin/api/Language/GetLanguage').then((res) => {
      if (res && res.Model) {
        let messages = JSON.parse(res.Model.LanguageFile)
        i18n.locale = locale
        i18n.setLocaleMessage(locale, messages)
      }
    })
  }
}
