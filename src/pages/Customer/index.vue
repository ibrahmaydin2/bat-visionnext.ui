<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" :workFlowModel="workFlowModel" selection-mode="multi" :actionCondition="actionCondition" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        RecordTypeIds: [1, 2, 3, 5, 6]
      },
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_Customer'
      },
      actionCondition: {
        condition (row) {
          return row.RecordTypeId === 3 || row.RecordTypeId === 4
        },
        actions: ['Get', 'Info']
      }
    }
  }
}
</script>
