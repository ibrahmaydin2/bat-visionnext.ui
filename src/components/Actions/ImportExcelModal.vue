<template>
  <b-modal id="importExcelModal" :title="modalAction && modalAction.Title" size="lg" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <template>
          <!-- <b-form-file
            v-model="files"
            :placeholder="$t('index.chooseFile')"
            :drop-placeholder="$t('index.dropFile')"
          >
            <template slot="file-name" slot-scope="{ names }">
              <b-badge variant="dark">{{ names[0] }}</b-badge>
              <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
              </b-badge>
            </template>
          </b-form-file> -->
          <input type="file">
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
            variant="primary"
            size="sm"
            @click="submitFile()"
          >
            {{$t('index.upload')}}
          </b-button>
        </div>
      </b-row>
      <b-row v-if="datas.length > 0" class="mt-3">
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
      isError: false
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
    })
  },
  methods: {
    submitFile () {
      var file = document.querySelector('input[type="file"]').files[0]
      this.getBase64(file)
    },
    sendFile (file) {
      let formData = {
        files: file,
        ExcelIntegrationType: this.modalAction.Query
      }
      this.$store.dispatch('importExcel', formData).then(res => {
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
              })
            }
          }
          if (!this.isError) {
            let model = {
              'documentCacheKey': res.data.DocumentCacheKey,
              ExcelIntegrationType: this.modalAction.Query
            }
            let apiUrl = `VisionNextExcelIntegrator/api/Upload/TransferFile`
            this.$store.dispatch('transferExcel', {...this.query, api: apiUrl, model: model})
          }
        } else {
          // şimdilik statik. IsCompleted false döndüüğnde this.datas buraya alınacak.
        }
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
      reader.onerror = function (error) {
      }
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'importExcelModal')
    }

  }
}
</script>
<style scoped>
</style>
