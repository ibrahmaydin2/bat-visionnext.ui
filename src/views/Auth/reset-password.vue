<template>
  <b-form @submit.prevent="submitForm()">
    <b-alert v-if="isSuccess" show variant="success">{{$t('auth.successResetPassword')}}</b-alert>
    <b-row v-if="!isSuccess">
      <NextFormGroup :title="$t('auth.userName')" :error="$v.model.userName" md="12" lg="12">
        <NextInput v-model="model.userName" type="text" :placeholder="$t('auth.userName')"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('auth.oldPassword')" :error="$v.model.oldPassword" md="12" lg="12">
        <NextInput v-model="model.oldPassword" type="password" :placeholder="$t('auth.oldPassword')"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('auth.password')" :error="$v.model.password" md="12" lg="12">
        <NextInput v-model="model.password" type="password" :placeholder="$t('auth.newPassword')"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('auth.rePassword')" :error="$v.model.rePassword" md="12" lg="12">
        <NextInput v-model="model.rePassword" type="password" :placeholder="$t('auth.reNewPassword')"></NextInput>
      </NextFormGroup>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12" v-if="!isSuccess">
        <b-col class="text-center" cols="12">
          <b-alert show variant="danger">{{$t('insert.settings.passwordExpire')}}</b-alert>
        </b-col>
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
        password: null,
        rePassword: null,
        oldPassword: null,
        userName: null
        // guid: null
      },
      isLoading: false,
      isSuccess: false
    }
  },
  mounted () {
    this.model.accountHash = this.$route.query.guid
    this.model.userName = this.$route.query.userName
  },
  validations () {
    return {
      model: {
        password: { required },
        rePassword: { required },
        oldPassword: { required },
        userName: { required }
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
        if (this.model.password !== this.model.rePassword) {
          this.$toasted.show(this.$t('auth.passwordsNotMatch'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.isLoading = true
        this.$api.postByUrl(this.model, 'VisionNextAuthentication/api/Authentication/ResetPassword').then((response) => {
          this.isLoading = false
          if (response.IsCompleted === true) {
            this.isSuccess = true
            this.model = {}
            this.$v.model.$reset()
          } else {
            this.$toasted.show(this.$t(response.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        }).catch(() => {
          this.isLoading = false
          this.isSuccess = false
        })
      }
    }
  }
}
</script>
