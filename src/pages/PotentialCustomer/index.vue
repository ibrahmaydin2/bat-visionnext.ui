<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :andConditionalModel="model" />
</template>
<script>
export default {
  data () {
    return {
      model: {
        isFromPotential: 1
      }
    }
  }
}
</script>
