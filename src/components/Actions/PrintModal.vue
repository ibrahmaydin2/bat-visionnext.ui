<template>
  <b-modal id="printModal" :title="$t('index.print')" no-close-on-backdrop>
    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio v-for="(document, i) in printDocuments.documents" :key="i" v-model="selected" :aria-describedby="ariaDescribedby" :value="document.RecordId">{{document.Description1}}</b-form-radio>
    </b-form-group>
    <template #modal-footer>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="closeModal()"
        >
          {{$t('index.close')}}
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PrintModal',
  components: {
  },
  computed: {
    ...mapState(['printDocuments'])
  },
  props: {
    documents: {
      type: Array
    }
  },
  data () {
    return {
      selected: null
    }
  },
  methods: {
    closeModal () {
      this.close()
    },
    submitModal () {
      if (!this.selected) {
        this.$toasted.show(this.$t('index.chooseDocument'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        'recordId': this.printDocuments.recordId,
        'printDocumentId': this.selected,
        'documentType': this.printDocuments.documentType
      }
      this.$api.postByUrl(request, 'VisionNextPrint/api/PrintDocument/Print ').then((res) => {
        if (res && res.IsCompleted === false) {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.htmlPrint(res.Html)
      })
      this.close()
    },
    htmlPrint (html) {
      let w = window.open()
      w.document.write(html)
      w.document.close()
      w.focus()
      w.print()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'printModal')
      this.selected = null
    }
  }
}
</script>
<style scoped>
</style>
