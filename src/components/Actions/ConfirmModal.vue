<template>
  <b-modal v-if="modalAction" id="confirmModal" :title="modalAction.Title" hide-footer>
    <p class="my-4">{{modalItem && modalItem.Description1}}</p>
    <ModalElements :actionUrl="modalAction.ActionUrl" :recordId="modalItem.RecordId" />
  </b-modal>
</template>
<script>
import ModalElements from './ModalElements'
export default {
  name: 'ConfirmModal',
  components: {
    ModalElements
  },
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
  methods: {
    submit () {
      this.$store.dispatch('confirmModal', {...this.query, api: this.modalAction.ActionUrl})
    },
    hide () {
      this.close()
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'confirmModal')
    }
  }
}
</script>
<style scoped>
</style>
