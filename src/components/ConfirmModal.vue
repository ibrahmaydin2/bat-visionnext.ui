<template>
  <b-modal id="confirmModal" title="BootstrapVue">
    <p class="my-4">{{modalItem && modalItem.Description1}}</p>
    <ModalElements />
    <!-- <template #modal-footer="">
      <b-button size="sm" variant="success" @click="submit()">
        ONAYLA
      </b-button>
      <b-button size="sm" variant="danger" @click="reject()">
        Reddet
      </b-button>
      <b-button size="sm" variant="warning" @click="hide()">
        İptal
      </b-button>
    </template> -->
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
