<template>
  <Nextgrid apiurl="VisionNextContract/api/Contract/Search" :workFlowModel="workFlowModel" :andConditionalModel="model"/>
</template>
<script>
export default {
  data () {
    return {
      model: {
        IsContract: 1
      },
      workFlowModel: {
        ControllerName: '',
        ClassName: 'Contract',
        PageName: 'pg_Contract'
      }
    }
  }
}
</script>
