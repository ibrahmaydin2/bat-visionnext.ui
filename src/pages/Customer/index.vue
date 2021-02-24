<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        RecordTypeIds: [1, 2]
      }
    }
  }
}
</script>
