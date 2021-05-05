<template>
  <Nextgrid apiurl="VisionNextCommonApi/api/TerminalMessage/Search" :workFlowModel="workFlowModel" />
</template>
<script>
export default {
  data () {
    return {
      workFlowModel: {
        ControllerName: '',
        ClassName: 'TerminalMessage',
        PageName: 'pg_TerminalMessage'
      }
    }
  }
}
</script>
