<template>
  <b-modal size="lg" v-if="modalAction" id="confirmModal" :title="modalAction.Title" hide-footer no-close-on-backdrop>
    <b-container>
      <b-row>
        <b-col>
          <h6 class="my-4">{{filteredQueryMessage}}</h6>
        </b-col>
      </b-row>
    </b-container>
    <ModalElements :actionUrl="modalAction.ActionUrl" :recordId="[modalItem.RecordId]" />
  </b-modal>
</template>
<script>
import ModalElements from './ModalElements'
import UpdateModalElements from './UpdateModalElements'
export default {
  name: 'ConfirmModal',
  components: {
    ModalElements,
    UpdateModalElements
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    modalItem: {
      type: Object,
      default: () => {},
      description: 'Listeden seçilen eleman bilgisi'
    }
  },
  computed: {
    filteredQueryMessage () {
      let queryMessage = ''
      if (this.modalAction.Query) {
        let query = this.modalAction.Query
        let queryArr = query.split(',')
        if (queryArr.length > 0) {
          queryMessage = this.modalAction.QueryMessage
          for (let i = 1; i <= queryArr.length; i++) {
            if (this.modalItem[queryArr[i - 1]]) {
              queryMessage = queryMessage.replace(`{${i}}`, this.modalItem[queryArr[i - 1]])
            }
          }
        }
      }
      return queryMessage
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
