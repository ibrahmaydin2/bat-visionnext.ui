<template>
  <b-modal v-if="modalAction" id="importExcelModal" :title="modalAction.Title" size="lg">
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
          <button v-on:click="submitFile()">Submit</button>
      </div>
    </div>
    <!-- <template #modal-footer>
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
    </template> -->
  </b-modal>
</template>
<script>
// import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'ImportExcelModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([''])
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
      file: ''
    }
  },
  validations () {
    return {
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
    })
  },
  methods: {
    handleFileUpload () {
      console.log(this.$refs.file)
      this.file = this.$refs.file.files[0]
    },
    submitFile () {
      console.log(this.file)
      let formData = new FormData()
      formData.append('file', this.file)
      this.$store.dispatch('importExcel', formData)
    }

  }
}
</script>
<style scoped>
</style>
