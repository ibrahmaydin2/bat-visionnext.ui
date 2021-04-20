<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('insert.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.fixedTerm.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-calendar" />  <b>{{$t('insert.fixedTerm.period')}}:</b> {{rowData.Period}}</span>
            <span><i class="fa fa-pencil-alt" />  <b>{{$t('insert.fixedTerm.description1')}}:</b> {{rowData.Description1}}</span>
          </section>
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
    }
  },
  mounted () {
    this.getData()
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
