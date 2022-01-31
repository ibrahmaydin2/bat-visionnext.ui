<template>
  <b-form @submit.prevent="submitForm()">
    <b-alert v-if="isSuccess" show variant="success">{{$t('auth.successForgotPassword')}}</b-alert>
    <b-row>
      <NextFormGroup :title="$t('auth.email')" :error="$v.model.userName" md="12" lg="12">
        <NextInput v-model="model.userName" type="text" :placeholder="$t('auth.email')" @enter="submitForm"></NextInput>
      </NextFormGroup>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12">
        <b-button id="forgot-password-button" type="submit" :disabled="isLoading">
          <span v-if="!isLoading">{{$t('auth.resetPassword')}}</span>
          <b-spinner v-if="isLoading"/>
        </b-button>
      </b-col>
      <b-col cols="12" class="my-3">
        <router-link :to="{name: 'Login'}">{{$t('auth.login')}}</router-link>
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      model: {
        userName: '',
        info: {
          browser: '',
          browserVersion: '',
          isSecure: true,
          userHost: '',
          operatingSystem: ''
        }
      },
      isLoading: false,
      isSuccess: false
    }
  },
  validations () {
    return {
      model: {
        userName: {required}
      }
    }
  },
  methods: {
    submitForm () {
      this.$v.model.$touch()
      if (this.$v.model.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.isLoading = true
        let browserInfo = this.getBrowserInfo()
        this.model.info.browser = browserInfo.browserName
        this.model.info.browserVersion = browserInfo.fullVersion
        this.model.info.operatingSystem = browserInfo.osName
        this.$api.postByUrl(this.model, 'VisionNextAuthentication/api/Authentication/ForgotPassword').then((response) => {
          this.isLoading = false
          if (response.IsCompleted) {
            this.isSuccess = true
            this.model = {
              info: {}
            }
            this.$v.model.$reset()
          }
        }).catch(() => {
          this.isLoading = false
          this.isSuccess = false
        })
      }
    },
    getBrowserInfo () {
      let nAgt = navigator.userAgent
      let browserName = navigator.appName
      let fullVersion = '' + parseFloat(navigator.appVersion)
      let nameOffset, verOffset, ix
      let osName = ''
      if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
        browserName = 'Opera'
        fullVersion = nAgt.substring(verOffset + 6)
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8)
        }
      } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
        browserName = 'Microsoft Internet Explorer'
        fullVersion = nAgt.substring(verOffset + 5)
      } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
        browserName = 'Chrome'
        fullVersion = nAgt.substring(verOffset + 7)
      } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
        browserName = 'Safari'
        fullVersion = nAgt.substring(verOffset + 7)
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8)
        }
      } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
        browserName = 'Firefox'
        fullVersion = nAgt.substring(verOffset + 8)
      } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset)
        fullVersion = nAgt.substring(verOffset + 1)
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
          browserName = navigator.appName
        }
      }

      if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix)
      }
      if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix)
      }
      return {
        browserName: browserName,
        fullVersion: fullVersion,
        osName: osName
      }
    }
  }
}
</script>
