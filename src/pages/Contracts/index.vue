<template>
  <Nextgrid apiurl="VisionNextContractManagement/api/Contract/Search" :workFlowModel="workFlowModel" />
</template>
<script>
export default {
  data () {
    return {
      workFlowModel: {
        ControllerName: '',
        ClassName: 'Contract',
        PageName: 'pg_Contract'
      }
    }
  }
}
</script>
