<template>
  <b-modal id="confirmModal" title="BootstrapVue">
    <p class="my-4">Hello</p>
  </b-modal>
</template>
<script>
export default {
  name: 'ConfirmModal',
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.modalAction)
    console.log(this.modalItem)
  }
}
</script>
<style scoped>
</style>
