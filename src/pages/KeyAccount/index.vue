<template>
  <Nextgrid apiurl="VisionNextCustomer/api/Customer/Search" :apiparams="defquery" />
</template>
<script>
export default {
  data () {
    return {
      defquery: {recordTypeIds: [3, 4]}
    }
  }
}
</script>
