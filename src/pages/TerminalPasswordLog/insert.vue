<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.Keyword != null ? insertVisible.Keyword : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Keyword + (insertRequired.Keyword === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Keyword.$error }">
                <b-form-input type="text" v-model="form.Keyword" :readonly="insertReadonly.Keyword" />
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center" cols="12" md="2">
              <b-button class="mt-1" @click="createPassword()" id="submitButton" size="sm" variant="success">{{$t('insert.createPassword')}}</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.Password != null ? insertVisible.Password : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Password + (insertRequired.Password === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Password.$error }">
                <b-form-input type="text" v-model="form.Password" :readonly="insertReadonly.Password" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Operation != null ? insertVisible.Operation : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Operation + (insertRequired.Operation === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Operation.$error }">
                <b-form-input type="text" v-model="form.Operation" :readonly="insertReadonly.Operation" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        Keyword: null,
        Password: null,
        Operation: null
      },
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'createCode', 'creatorPassword'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextMobileApi/api/TerminalPasswordLog/GetCode`})
    },
    createPassword () {
      this.$store.dispatch('getPasswordCreator', {...this.query, keyword: this.form.Keyword})
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextMobileApi/api/TerminalPasswordLog`, formdata: model, return: this.routeName})
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    },
    creatorPassword (e) {
      if (e) {
        this.form.Password = e.Password
        this.form.Operation = e.Operation
      }
    }
  }
}
</script>
<style lang="sass">
</style>
