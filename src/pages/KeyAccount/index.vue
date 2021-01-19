<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        recordTypeIds: [3, 4]
      }
    }
  }
}
</script>
