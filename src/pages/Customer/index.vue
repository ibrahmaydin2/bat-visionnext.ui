<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" :workFlowModel="workFlowModel" selection-mode="multi" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        RecordTypeIds: [1, 2]
      },
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_Customer'
      }
    }
  }
}
</script>
