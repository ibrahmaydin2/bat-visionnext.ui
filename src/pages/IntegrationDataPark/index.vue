<template>
  <Nextgrid apiurl="VisionNextIntegrationManagement/api/IntegrationDataPark/Search" :workFlowModel="workFlowModel"/>
</template>
<script>
export default {
  data () {
    return {
      workFlowModel: {
        ControllerName: 'IntegrationDataPark',
        ClassName: 'IntegrationDataPark',
        PageName: 'pg_DataParkIntegrationLog'
      }
    }
  }
}
</script>
