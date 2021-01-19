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
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{rowData.StatusId ? $t('insert.active') : $t('insert.passive') }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.detail')}}</h6>
                <span><i class="far fa-circle" /> {{$t('get.terminal.Employee')}}</span> <p>{{rowData.Employee ? rowData.Employee.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.Keyword')}}</span> <p>{{rowData.Keyword}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.Password')}}</span> <p>{{rowData.Password}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.OperationDate')}}</span> <p>{{rowData.OperationDate ? dateConvertFromTimezone(rowData.OperationDate) : ''}}</p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextMobileApi/api/TerminalPasswordLog', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
