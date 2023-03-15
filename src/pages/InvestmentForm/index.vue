<template>
  <Nextgrid apiurl="VisionNextContract/api/Contract/Search" :andConditionalModel="model" :workFlowModel="workFlowModel"/>
</template>
<script>
export default {
  data () {
    return {
      model: {
        IsInvestment: 1
      },
      workFlowModel: {
        ControllerName: 'InvestmentForm',
        ClassName: 'Contract',
        PageName: 'pg_InvestmentForm'
      }
    }
  }
}
</script>
