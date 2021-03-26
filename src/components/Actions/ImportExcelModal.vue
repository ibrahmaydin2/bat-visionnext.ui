<template>
  <b-modal id="importExcelModal" :title="modalAction && modalAction.Title" size="lg" hide-footer>
    <div class="container">
      <b-row>
        <template>
          <b-form-file
            v-model="files"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          >
            <template slot="file-name" slot-scope="{ names }">
              <b-badge variant="dark">{{ names[0] }}</b-badge>
              <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
              </b-badge>
            </template>
          </b-form-file>
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
      datas: []
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
    // handleFileUpload () {
    //   console.log(this.$refs.file)
    //   this.file = this.$refs.file.files[0]
    // },
    submitFile () {
      let formData = new FormData()
      formData.append('files', this.files)
      this.$store.dispatch('importExcel', formData).then(res => {
        if (res.data.IsCompleted === true) {
          let apiUrl = `VisionNextExcelIntegrator/api/Upload/TransferFile/${res.data.DocumentCacheKey}`
          this.$store.dispatch('transferExcel', {...this.query, api: apiUrl}).then(response => {
            console.log(response)
          })

          for (const property in res.data.Data) {
            let item = res.data.Data[property]
            if (item.ValidationMessage.length > 0) {
              item.ValidationMessage.map(msg => {
                this.datas.push({
                  key: property,
                  Message: msg.Message,
                  Column: msg.Column
                })
              })
            }
          }
        } else {
          // şimdilik statik. IsCompleted false döndüüğnde this.datas buraya alınacak.
        }
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'importExcelModal')
    }

  }
}
</script>
<style scoped>
</style>
