<template>
  <b-form>
    <b-form-group :label="$t('auth.email')" :class="{ 'form-group--error': $v.user.UserName.$error}">
      <b-form-input v-model="user.UserName" type="email" :placeholder="$t('auth.email')" @keyup.enter="submitForm" />
    </b-form-group>
    <b-form-group :label="$t('auth.password')" :class="{ 'form-group--error': $v.user.Password.$error}">
      <b-form-input v-model="user.Password" type="password" :placeholder="$t('auth.password')" @keyup.enter="submitForm" />
    </b-form-group>
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
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: {
        UserName: '',
        Password: '',
        InstanceHash: '914c5000-092f-4cef-aa39-2c2d9a3826a9'
      }
    }
  },
  validations () {
    return {
      user: {
        UserName: {required, email},
        Password: {required}
      }
    }
  },
  computed: {
    ...mapState(['loginError'])
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show('Zorunlu alanları doldurun', {type: 'error', keepOnHover: true, duration: '3000'})
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
