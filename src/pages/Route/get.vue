<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="'data.Code'" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>Reference:</b> {{rowData.EncryptedKey}}</span>
          </section>
        </b-col>
        <b-col cols="12" md="4">
          <b-card class="m-3 asc__showPage-card">
            <h6>Detail</h6>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
            <span><i class="far fa-circle" /> RepresentativeId</span>
            <p>{{rowData.RepresentativeId}}</p>
          </b-card>
        </b-col>
        <b-col cols="12" md="8">
          <b-card class="m-3 asc__showPage-card">
            <b-table :items="rowData" :fields="fields">
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      fields: ['RepresentativeId', 'EncryptedKey', 'CreatedDateTime']
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: this.$route.meta.baseLink, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
