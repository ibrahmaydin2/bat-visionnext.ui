<template>
  <DxChart
    id="chart"
    :data-source="workOrderLineCharts"
    palette="Bright"
  >
    <DxCommonSeriesSettings
      :type="type"
      argument-field="Month"
      value-field="1"
    />
    <DxCommonSeriesSettings argument-field="Month" />
    <DxSeries
      name="Test Count"
      value-field="TestCount"
      axis="frequency"
      type="bar"
      color="#fac29a"
    />
    <DxSeries
      name="Pathogen Count"
      value-field="PathogenCount"
      axis="frequency"
      type="line"
      color="#dc3545"
    />
    <DxCommonAxisSettings>
      <DxGrid :visible="false" />
    </DxCommonAxisSettings>
    <DxMargin :bottom="20" />
    <DxLegend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <DxExport :enabled="false" />
    <DxTooltip :enabled="true" />
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxCommonAxisSettings,
  DxGrid,
  DxExport,
  DxLegend,
  DxMargin,
  DxTooltip,
  DxLabel,
  DxFormat
} from 'devextreme-vue/chart'
import DxSelectBox from 'devextreme-vue/select-box'
export default {
  name: 'DashboardChart',
  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxCommonAxisSettings,
    DxGrid,
    DxExport,
    DxLegend,
    DxMargin,
    DxTooltip,
    DxLabel,
    DxFormat
  },
  data () {
    return {
      type: 'spline',
      workOrderLineCharts: [],
      architectureSources: [
        { value: 'PathogenCount', name: 'Pathogen Count' },
        { value: 'TestCount', name: 'Test Count' }
      ]
    }
  },
  props: ['items'],
  watch: {
    items (e) {
      if (e) {
        this.workOrderLineCharts = e
      }
    }
  }
}
</script>
<style>
  .options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
  }

  .option {
    margin-top: 10px;
  }

  .caption {
    font-size: 18px;
    font-weight: 500;
  }

  .option > span {
    margin-right: 10px;
  }

  .option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
  }
</style>
