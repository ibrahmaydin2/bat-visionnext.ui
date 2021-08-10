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
            <span><i class="fas fa-code" />  <b>{{$t('insert.integrationDataPark.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.integrationDataPark.ColumnName')}}:</b> {{ rowData.ColumnName }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.integrationDataPark.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.integrationDataPark.dataPark')" active>
          <b-row class="p-4">
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CompanyName, 'text', 'insert.integrationDataPark.CompanyName')"></div>
              <div v-html="getFormatDataByType(rowData.CreatedDateTime, 'date', 'insert.integrationDataPark.CreatedDateTime')"></div>
              <div v-html="getFormatDataByType(rowData.InterfaceName, 'text', 'insert.integrationDataPark.InterfaceName')"></div>
              <div v-html="getFormatDataByType(rowData.InterfaceList, 'object', 'insert.integrationDataPark.InterfaceList')"></div>
              <div v-html="getFormatDataByType(rowData.IdocNumber, 'text', 'insert.integrationDataPark.IdocNumber')"></div>
              <div v-html="getFormatDataByType(rowData.CreatedUser, 'text', 'insert.integrationDataPark.CreatedUser')"></div>
              <div v-html="getFormatDataByType(rowData.Count, 'text', 'insert.integrationDataPark.Count')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ClosureDescription, 'text', 'insert.integrationDataPark.ClosureDescription')"></div>
              <div v-html="getFormatDataByType(rowData.RecordTypeName, 'text', 'insert.integrationDataPark.RecordTypeName')"></div>
              <div v-html="getFormatDataByType(rowData.RecordTypeValue, 'text', 'insert.integrationDataPark.RecordTypeValue')"></div>
              <div v-html="getFormatDataByType(rowData.ClosedBy, 'object', 'insert.integrationDataPark.ClosedBy')"></div>
              <div v-html="getFormatDataByType(rowData.ErrorDescription, 'text', 'insert.integrationDataPark.ErrorDescription')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.integrationDataPark.details')">
          <b-row class="p-4">
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FirstProcessedDateTime, 'date', 'insert.integrationDataPark.FirstProcessedDateTime')"></div>
              <div v-html="getFormatDataByType(rowData.LastProcessedDateTime, 'date', 'insert.integrationDataPark.LastProcessedDateTime')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.IntegrationState, 'object', 'insert.integrationDataPark.IntegrationState')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.integrationDataPark.Xml')">
          <b-row class="p-4">
             <b-card class="col-md-6 col-12 asc__showPage-card">
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
            </b-card>
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
