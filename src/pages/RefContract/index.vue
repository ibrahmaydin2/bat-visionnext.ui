<template>
  <Nextgrid apiurl="VisionNextContract/api/RefContract/Search" :workFlowModel="workFlowModel" />
</template>
<script>
export default {
  data () {
    return {
      workFlowModel: {
        ControllerName: 'RefContract',
        ClassName: 'RefContract',
        PageName: 'pg_ContractTransfer'
      }
    }
  }
}
</script>
