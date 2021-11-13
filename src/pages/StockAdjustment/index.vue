<template>
  <Nextgrid apiurl="VisionNextStockManagement/api/StockAdjustment/Search" :andConditionalModel="model" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        MovementTypeIds: [6]
      }
    }
  }
}
</script>
