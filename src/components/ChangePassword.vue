<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <h3>{{$t('nav.changePassword')}}</h3>
    </b-col>
    <b-col cols="12" md="6">
      <b-row>
        <b-col class="text-right" cols="3">
          {{$t('insert.settings.oldPassword')}}
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.OldPassword.$error }">
            <b-form-input v-model.trim="$v.OldPassword.$model" type="password" :placeholder="$t('insert.settings.yourOldPassword')" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
          {{$t('insert.settings.newPassword')}}
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.NewPassword.$error }">
            <b-form-input  v-model.trim="$v.NewPassword.$model" type="password" :placeholder="$t('insert.settings.yourNewPassword')" />
            <div class="error" v-if="!$v.NewPassword.minLength">{{$t('insert.settings.passwordMinMessage').replace('{0}',$v.NewPassword.$params.minLength.min)}}</div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
           {{$t('insert.settings.newPasswordAgain')}}
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group :class="{ 'form-group--error': $v.NewPasswordRe.$error }">
            <b-form-input v-model.trim="$v.NewPasswordRe.$model" type="password" :placeholder="$t('insert.settings.yourNewPasswordAgain')" />
            <div class="error" v-if="!$v.NewPasswordRe.sameAsPassword">{{$t('insert.settings.passwordsDoesNotMatch')}}</div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group class="text-right">
            <b-btn @click="changeIt" variant="success">{{$t('nav.changePassword')}}</b-btn>
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
    ...mapState(['loginUser'])

  },
  methods: {
    changeIt () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {type: 'error', keepOnHover: true, duration: '3000'})
      } else {
        this.$store.dispatch('changePassword', {OldPassword: this.OldPassword, NewPassword: this.NewPassword})
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
