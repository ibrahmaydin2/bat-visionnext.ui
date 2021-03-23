<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" :workFlowModel="workFlowModel" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        recordTypeIds: [3, 4]
      },
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_KeyAccount'
      }
    }
  }
}
</script>
