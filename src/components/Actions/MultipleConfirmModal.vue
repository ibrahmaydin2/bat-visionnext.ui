<template>
  <b-modal v-if="modalAction" id="multipleConfirmModal" :title="modalAction.Title" hide-footer no-close-on-backdrop>
    <b-container>
      <b-row>
        <b-col>
          <h6 class="my-4">{{modalAction.QueryMessage}}</h6>
        </b-col>
      </b-row>
    </b-container>
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
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    recordIds: {
      type: Array,
      default: () => {},
      description: 'Seçilen listenin RecordId bilgileri'
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
  }
}
</script>
<style scoped>
</style>
