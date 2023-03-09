<template>
  <Nextgrid apiurl="VisionNextContractManagement/api/Contract/Search" :andConditionalModel="model"/>
</template>
<script>
export default {
  data () {
    return {
      model: {
        IsInvestment: 1
      }
    }
  }
}
</script>
