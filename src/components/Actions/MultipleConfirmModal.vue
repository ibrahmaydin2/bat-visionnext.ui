<template>
  <b-modal v-if="modalAction" id="multipleConfirmModal" :title="modalAction.Title" hide-footer no-close-on-backdrop>
    <p class="my-4"></p>
    <ModalElements :actionUrl="modalAction.ActionUrl" :recordId="recordIds" />
  </b-modal>
</template>
<script>
import ModalElements from './ModalElements'
import { mapState } from 'vuex'
export default {
  name: 'MultipleConfirmModal',
  components: {
    ModalElements
  },
  computed: {
    ...mapState(['selectedTableRows'])
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
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'multipleConfirmModal')
    }
  },
  watch: {
    // selectedTableRows (e) {
    //   if (e) {
    //     console.log(e)
    //     e.map(item => {
    //       console.log(item)
    //     })
    //   }
    // }
  }
}
</script>
<style scoped>
</style>
