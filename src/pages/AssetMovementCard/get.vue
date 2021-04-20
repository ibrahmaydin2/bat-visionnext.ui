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
              <div v-html="getFormatDataByType(rowData.FromLocation, 'object', 'get.assetMovementCard.fromLocation')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.assetMovementCard.assets')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('get.assetMovementCard.assetName')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.assetCode')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.serialNumber')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.quantity')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.condition')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.serialNumber2')}}</span></b-th>
                    <b-th><span>{{$t('get.assetMovementCard.serialNumber3')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(a, i) in rowData.AssetMovementCardDetails" :key="i">
                      <b-td>{{a.Asset ? a.Asset.Label : ''}}</b-td>
                      <b-td>{{a.Asset ? a.Asset.Code : ''}}</b-td>
                      <b-td>{{a.SerialNumber}}</b-td>
                      <b-td>{{a.Quantity}}</b-td>
                      <b-td>{{a.Condition ? a.Condition.Label : ''}}</b-td>
                      <b-td>{{a.SerialNumber2}}</b-td>
                      <b-td>{{a.SerialNumber3}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
      RmaStatus: {},
      RmaType: {}
    }
  },
  mounted () {
    this.getData()
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
