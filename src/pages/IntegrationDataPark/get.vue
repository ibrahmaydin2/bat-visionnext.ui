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
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.IntegrationDataPark.CODE')}}:</b> {{ rowData.CODE }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.IntegrationDataPark.interface_name')}}:</b> {{ rowData.interface_name  }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.IntegrationDataPark.COMPANY_NAME')}}:</b> {{ rowData.COMPANY_NAME  }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.IntegrationDataPark.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>

      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  props: ['dataKey'],
  mixins: [mixin],
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
      this.$store.dispatch('getData', {...this.query, api: '/VisionNextIntegrationManagement/api/IntegrationDataPark', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
