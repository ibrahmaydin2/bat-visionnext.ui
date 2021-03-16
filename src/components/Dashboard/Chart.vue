<template>
  <b-overlay :show="bigLoading" rounded="sm" spinner-variant="warning">
    <template #overlay>
      <b-icon
        icon="three-dots"
        animation="cylon"
        scale="8"
        variant="warning"
      ></b-icon>
    </template>
    <div v-if="!isError">
      <DxPieChart
        id="pie"
        :data-source="data"
        palette="Bright"
      >
        <DxSeries
          :argument-field="argumentField"
          :value-field="valueField"
        >
          <DxLabel :visible="true">
            <DxConnector
              :visible="true"
              :width="1"
            />
          </DxLabel>
        </DxSeries>
        <DxSize :height="300"/>
      </DxPieChart>
    </div>
    <div class="error-box" v-else>
      <span>{{$t('dashboard.isError')}}</span>
    </div>
  </b-overlay>
</template>
<script>
import DxPieChart, {
  DxSize,
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport,
  DxLegend
} from 'devextreme-vue/pie-chart'
export default {
  name: 'Chart',
  components: {
    DxPieChart,
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport,
    DxLegend
  },
  props: ['RecordId'],
  data () {
    return {
      data: [],
      argumentField: null,
      valueField: null,
      isError: false,
      bigLoading: true
    }
  },
  mounted () {
    this.$store.dispatch('getDashboardReportDetail', { ...this.query, id: this.RecordId }).then(res => {
      this.bigLoading = false
      this.data = res.data
      if (this.data.length > 0) {
        this.isError = false
        if (!this.argumentField || !this.valueField) {
          this.argumentField = Object.keys(this.data[0])[0]
          this.valueField = Object.keys(this.data[0])[1]
        }
      } else {
        this.isError = true
      }
    })
  }
}

</script>
