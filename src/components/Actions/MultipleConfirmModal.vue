<template>
  <b-modal v-if="modalAction" id="multipleConfirmModal" :title="modalAction.Title" hide-footer>
    <p class="my-4"></p>
    <ModalElements :actionUrl="modalAction.ActionUrl" :recordId="recordIds" />
  </b-modal>
</template>
<script>
import ModalElements from './ModalElements'
export default {
  name: 'MultipleConfirmModal',
  components: {
    ModalElements
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    recordIds: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('multipleConfirmModal', {...this.query, api: this.modalAction.ActionUrl})
    },
    hide () {
      this.close()
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'multipleConfirmModal')
    }
  }
}
</script>
<style scoped>
</style>
