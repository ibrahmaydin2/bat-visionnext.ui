<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div>
              <router-link :to="{name: `${$route.meta.baseLink}Insert`}">
                <b-button class="border-0" size="sm" variant="success"><b-icon scale="1.25" shift-v="1.25" aria-hidden="true" icon="plus"></b-icon></b-button>
              </router-link>
              <router-link :to="{name: `${$route.meta.baseLink}Update`, params: {url: this.$route.params.url}}">
                <b-button class="border-0" size="sm" variant="warning"><b-icon scale="0.75" shift-v="0.75" aria-hidden="true" icon="pencil-fill"></b-icon></b-button>
              </router-link>
            </div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('insert.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.fixedTerm.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.fixedTerm.period')}}:</b> {{rowData.Period}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.fixedTerm.description1')}}:</b> {{rowData.Description1}}</span>
          </section>
        </b-col>
      </b-row>
      <!-- <b-tabs>
        <b-tab :title="$t('insert.fixedTerm.title')" active>
          <b-row>
          </b-row>
        </b-tab>
      </b-tabs> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/FixedTerm', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
