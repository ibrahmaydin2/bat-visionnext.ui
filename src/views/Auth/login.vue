<template>
  <b-form v-if="loginEnabled">
    <b-row>
      <NextFormGroup :title="$t('auth.email')" :error="$v.user.UserName" md="12" lg="12">
        <NextInput v-model="user.UserName" type="text" :placeholder="$t('auth.email')" @enter="submitForm"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('auth.password')" :error="$v.user.Password" md="12" lg="12">
        <NextInput v-model="user.Password" type="password" :placeholder="$t('auth.password')" @enter="submitForm"></NextInput>
      </NextFormGroup>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12">
        <b-button id="loginButton" @click="submitForm()" type="button">
          <span id="loginLoaderText">{{$t('auth.login')}}</span>
          <b-spinner id="loginLoader" style="display: none; text-align: center" label="Spinning" />
        </b-button>
      </b-col>
      <b-col cols="12" class="my-3">
        <router-link :to="{name: 'ForgotPassword'}">{{$t('auth.forgotPassword')}}</router-link>
      </b-col>
      <b-col cols="12" v-if="loginError" class="my-4">
        <b-alert show variant="danger">{{loginError}}</b-alert>
      </b-col>
      <b-col cols="9" class="mt-3 m-auto">
        <p v-html="$t('auth.information')"></p>
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: {
        SessionId: '',
        UserName: '',
        Password: '',
        InstanceHash: ''
      },
      loginEnabled: false
    }
  },
  validations () {
    return {
      user: {
        UserName: {required},
        Password: {required}
      }
    }
  },
  mounted () {
    if (this.$route.query.authKey && this.$route.query.hash && this.$route.query.redirectHash) {
      this.loginEnabled = false
      this.$store.dispatch('loginWithCua', {...this.authData, authKey: this.$route.query.authKey, hash: this.$route.query.hash, redirectHash: this.$route.query.redirectHash})
    } else {
      this.loginEnabled = true
    }
  },
  computed: {
    ...mapState(['loginError'])
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.$store.dispatch('login', {...this.authData, UserName: this.user.UserName, Password: this.user.Password, InstanceHash: this.user.InstanceHash})
      }
    },
    resetForm () {
      this.user.UserName = ''
      this.user.Password = ''
    }
  }
}
</script>
