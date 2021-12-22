<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'TerminalPasswordLog' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
           <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="Password" :error="$v.form.Password">
              <NextInput v-model="form.Password" type="text" :disabled="insertReadonly.Password" />
            </NextFormGroup>
            <NextFormGroup item-key="Operation" :error="$v.form.Operation">
              <NextInput v-model="form.Operation" type="text" :disabled="insertReadonly.Operation" />
            </NextFormGroup>
            <NextFormGroup item-key="Keyword" :error="$v.form.Keyword">
              <NextInput v-model="form.Keyword" type="text" :disabled="insertReadonly.Keyword" />
            </NextFormGroup>
            <b-col class="d-flex align-items-center" cols="12" md="2">
              <b-button class="mt-1" @click="createPassword()" id="submitButton" size="sm" variant="success">{{$t('insert.createPassword')}}</b-button>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        Keyword: null,
        Password: null,
        Operation: null,
        OperationDate: null
      },
      routeName1: 'MobileApi'
    }
  },
  mounted () {
    this.createManualCode()
    this.form.OperationDate = new Date().toISOString()
  },
  methods: {
    createPassword () {
      if (!this.form.Keyword) { return }

      let request = {
        Keyword: this.form.Keyword
      }
      return this.$api.postByUrl(request, 'VisionNextMobileApi/api/TerminalPasswordLog/GetPasswordCreator')
        .then(res => {
          this.form.Password = res.Model.Password
          this.form.Operation = res.Model.Operation
        })
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.createData()
      }
    }
  }
}
</script>
