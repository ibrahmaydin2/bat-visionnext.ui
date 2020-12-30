<template>
  <b-row>
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
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.fixedTerm.code')"
            >
              <b-form-input type="text" v-model="form.model.code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.fixedTerm.period')"
            >
              <b-form-input type="text" v-model="form.model.period"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.fixedTerm.description1')"
            >
              <b-form-input type="text" v-model="form.model.description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.status')"
            >
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        model: {
          code: '',
          description1: '',
          period: null,
          statusId: null
        }
      },
      dataStatus: null
    }
  },
  computed: {
    ...mapState(['createCode'])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getCode()
  },
  methods: {
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextCommonApi/api/FixedTerm/GetCode'})
    },
    save () {
      this.$store.dispatch('createData', {...this.query, api: 'VisionNextCommonApi/api/FixedTerm', formdata: this.form, return: this.$route.meta.baseLink})
    }
  },
  watch: {
    createCode: function (e) {
      if (e) {
        this.form.model.code = e
        this.branchCode = Number(e) + 1
      }
    },
    dataStatus: function (e) {
      if (e === true) {
        this.form.model.statusId = 1
      } else {
        this.form.model.statusId = 0
      }
    }
  }
}
</script>
<style lang="sass" scope>
  table
    & i
      cursor: pointer
</style>
