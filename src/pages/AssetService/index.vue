<template>
  <Nextgrid apiurl="VisionNextAsset/api/Service/Search" :workFlowModel="workFlowModel" />
</template>
<script>
export default {
  data () {
    return {
      workFlowModel: {
        ControllerName: 'AssetService',
        ClassName: 'Service',
        PageName: 'pg_Service'
      }
    }
  }
}
</script>
