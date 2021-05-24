<template>
<div>
  <b-modal id="confirm-modal">
    <template #modal-title>
      {{$t('insert.order.doYouConfirm')}}
    </template>
    {{$t('insert.selectedFileWillBeUploaded')}}
    <template #modal-footer>
      <CancelButton class="float-right ml-2" @click.native="$bvModal.hide('confirm-modal')" />
      <b-button size="sm" class="float-right ml-2" variant="success" @click="$bvModal.hide('confirm-modal'); submitFile()">{{$t('insert.okay')}}</b-button>
    </template>
  </b-modal>
  <b-modal id="importExcelModal" :title="modalAction && modalAction.Title" size="lg" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <template>
          <b-form-file
            class="col-md-8"
            v-model="selectedFile"
            :placeholder="$t('insert.chooseFileOrDrop')"
            :drop-placeholder="$t('insert.dropFileHere')"
            :browse-text="$t('insert.choose')"
          ></b-form-file>
        </template>
      </b-row>
      <b-row class="mt-3">
        <div class="w-100 text-right">
          <b-button
            variant="danger"
            size="sm"
            @click="closeModal()"
          >
            {{$t('index.close')}}
          </b-button>
          <b-button
            :disabled="showLoading || !selectedFile"
            variant="primary"
            size="sm"
            v-b-modal.confirm-modal
            v-b-tooltip.hover :title="!selectedFile ? $t('insert.selectFileMessage') : ''"
          >
            {{$t('index.upload')}}
            <b-spinner v-if="showLoading" small variant="secondary"></b-spinner>
          </b-button>
        </div>
      </b-row>
      <b-row v-if="datas.length > 0" class="mt-3">
        <b-alert :show="isSuccess">{{$t('general.successFileUpload')}}</b-alert>
        <b-table-simple hover small caption-top responsive>
          <b-thead>
            <b-tr>
              <b-th>{{$t('index.row')}}</b-th>
              <b-th>{{$t('index.column')}}</b-th>
              <b-th>{{$t('index.message')}}</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(data, i) in datas" :key="i">
              <b-td>{{data.key}}</b-td>
              <b-td>{{data.Column}}</b-td>
              <b-td>{{data.Message}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-row>
    </div>
  </b-modal>
</div>
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
    }
  },
  data () {
    return {
      files: null,
      datas: [],
      isError: false,
      showLoading: false,
      selectedFile: null,
      isSuccess: false
    }
  },
  validations () {
    return {
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.datas = []
      this.files = null
      this.showLoading = false
    })
  },
  methods: {
    submitFile () {
      this.getBase64(this.selectedFile)
    },
    sendFile (file) {
      let formData = {
        files: file,
        ExcelIntegrationType: this.modalAction.Query
      }

      if (this.modalAction.QueryMessage !== null) {
        formData.FileProccessType = this.modalAction.QueryMessage
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$store.dispatch('importExcel', formData).then(res => {
        this.showLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (res.data.IsCompleted === true) {
          for (const property in res.data.Data) {
            let item = res.data.Data[property]
            if (item.ValidationMessage.length > 0) {
              this.isError = true
              item.ValidationMessage.map(msg => {
                this.datas.push({
                  key: property,
                  Message: msg.Message,
                  Column: msg.Column
                })
                document.querySelector('input[type="file"]').value = ''
              })
            }
          }
          if (!this.isError) {
            this.selectedFile = null
            let model = {
              'documentCacheKey': res.data.DocumentCacheKey,
              ExcelIntegrationType: this.modalAction.Query
            }
            let apiUrl = `VisionNextExcelIntegrator/api/Upload/TransferFile`
            this.showLoading = true
            this.$store.commit('setDisabledLoading', true)
            this.$store.dispatch('transferExcel', {...this.query, api: apiUrl, model: model}).then(() => {
              this.showLoading = false
              this.$store.commit('setDisabledLoading', false)
              this.isSuccess = true
              this.closeModal()
            }).catch(() => {
              this.showLoading = false
              this.$store.commit('setDisabledLoading', false)
            })
          }
        } else {
          if (res.data && res.data.Message) {
            this.$store.commit('showAlert', { type: 'danger', msg: res.data.Message })
          }
          this.selectedFile = null
        }
      }).catch(() => {
        this.showLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    },
    getBase64 (file) {
      let vm = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let splitedFile = reader.result.split(',')[1]
        vm.sendFile(splitedFile)
      }
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'importExcelModal')
    }
  },
  watch: {
    selectedFile: {
      handler (val) {
        this.datas = []
        this.isSuccess = false
      },
      deep: true
    }
  }
}
</script>
<style scoped>
</style>
