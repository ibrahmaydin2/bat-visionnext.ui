<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb />
          </header>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.Description')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.Status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row> -->
      <b-tabs>
        <b-tab :title="$t('get.assetMovementCard.general')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardNumber, 'text', 'get.assetMovementCard.cardNumber')"></div>
              <div v-html="getFormatDataByType(rowData.MovementType, 'object', 'get.assetMovementCard.movementType')"></div>
              <div v-html="getFormatDataByType(rowData.Employee, 'object', 'get.assetMovementCard.employee')"></div>
              <div v-html="getFormatDataByType(rowData.OperationDate, 'date', 'get.assetMovementCard.operationDate')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ToState, 'object', 'get.assetMovementCard.toState')"></div>
              <div v-html="getFormatDataByType(rowData.FromState, 'object', 'get.assetMovementCard.fromState')"></div>
              <div v-html="getFormatDataByType(rowData.ToLocation, 'object', 'get.assetMovementCard.toLocation')"></div>
              <div v-html="getFormatDataByType(rowData.FromLocation, 'date', 'get.assetMovementCard.fromLocation')"></div>
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
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      RmaStatus: {},
      RmaType: {}
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style', 'lookup'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextAsset/api/AssetMovementCard', record: this.$route.params.url}).then(() => {
      })
    }
  }
}
</script>
