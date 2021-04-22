<template>
  <Nextgrid apiurl="VisionNextInvoice/api/PurchaseWaybill/Search" />
</template>
<script>
export default {
  mounted () {
    this.$store.commit('setShowManualActions', true)
  }
}
</script>
