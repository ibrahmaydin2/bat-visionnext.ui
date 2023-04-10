<template>
  <Nextgrid apiurl="VisionNextCommonApi/api/EDocumentLog/Search" :andConditionalModel="model" selection-mode="multi"/>
</template>
<script>
export default {
  data () {
    return {
      model: {
        DispatchTypeIds: [33466885993, 33466885992]
      }
    }
  }
}
</script>
