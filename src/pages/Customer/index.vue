<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        recordTypeIds: [1, 2]
      }
    }
  }
}
</script>
