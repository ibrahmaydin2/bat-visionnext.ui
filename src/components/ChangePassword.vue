<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <h3>{{$t('nav.changePassword')}}</h3>
    </b-col>
    <b-col cols="12" md="6">
      <b-row>
        <b-col class="text-right" cols="3">
          E-Posta Adresi
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group>
            <b-form-input v-model="Email" readonly type="email" placeholder="Aktif E-Posta Adresiniz" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
          Eski Şifre
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.OldPassword.$error }">
            <b-form-input v-model.trim="$v.OldPassword.$model" type="password" placeholder="Eski Şifreniz" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
          Yeni Şifre
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.NewPassword.$error }">
            <b-form-input  v-model.trim="$v.NewPassword.$model" type="password" placeholder="Yeni Şifreniz" />
            <div class="error" v-if="!$v.NewPassword.minLength">Şifreniz en az {{ $v.NewPassword.$params.minLength.min }} karakter olmalıdır.</div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
          Yeni Şifre Tekrar
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.NewPasswordRe.$error }">
            <b-form-input v-model.trim="$v.NewPasswordRe.$model" type="password" placeholder="Yeni Şifrenizi Tekrar Girin" />
            <div class="error" v-if="!$v.NewPasswordRe.sameAsPassword">Şifreler Eşleşmiyor...</div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group class="text-right">
            <b-btn @click="changeIt" variant="success">Şifremi Değiştir</b-btn>
          </b-form-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      OldPassword: '',
      NewPassword: '',
      NewPasswordRe: ''
    }
  },
  computed: {
    ...mapState(['loginUser']),
    Email () {
      return this.loginUser.email
    }

  },
  methods: {
    changeIt () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show('Zorunlu alanları doldurun', {type: 'error', keepOnHover: true, duration: '3000'})
      } else {
        this.$store.dispatch('changePassword', {...this.authData, Email: this.Email, OldPassword: this.OldPassword, NewPassword: this.NewPassword})
      }
    }
  },
  validations: {
    OldPassword: {
      required
    },
    NewPassword: {
      required, minLength: minLength(6)
    },
    NewPasswordRe: {
      sameAsPassword: sameAs('NewPassword')
    }
  }
}
</script>
