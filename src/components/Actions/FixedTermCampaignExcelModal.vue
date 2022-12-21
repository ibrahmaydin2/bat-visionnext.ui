<template>
  <b-modal id="fixedTerm-campaign-excel-modal" :title="$t('insert.creditBudget.excelImport')" size="lg" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <template>
          <b-form-file
            class="col-md-8"
            v-model="selectedFile"
            :placeholder="$t('insert.chooseFileOrDrop')"
            :drop-placeholder="$t('insert.dropFileHere')"
            :browse-text="$t('insert.choose')"
            @input="resetPage"
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
            :disabled="isLoading || !selectedFile"
            variant="primary"
            size="sm"
            @click="submitFile()"
            v-b-tooltip.hover :title="!selectedFile ? $t('insert.selectFileMessage') : ''"
          >
            <span v-if="isLoading"><b-spinner small variant="secondary"></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('index.upload')}}</span>
          </b-button>
        </div>
      </b-row>
      <b-row v-if="datas.length > 0" class="mt-3">
        <b-table-simple hover small caption-top responsive>
          <b-thead>
            <b-tr>
              <b-th>{{$t('index.row')}}</b-th>
              <b-th>{{$t('index.value')}}</b-th>
              <b-th>{{$t('index.column')}}</b-th>
              <b-th>{{$t('index.message')}}</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(data, i) in datas" :key="i">
              <b-td>{{data.key}}</b-td>
              <b-td>{{data.Value}}</b-td>
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
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'FixedTermCampaignExcelModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([''])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    }
  },
  data () {
    return {
      selectedFile: null,
      datas: [],
      isError: false,
      isLoading: false
    }
  },
  methods: {
    resetPage () {
      this.datas = []
      this.isError = false
    },
    submitFile () {
      this.getBase64(this.selectedFile)
    },
    sendFile (file) {
      let formData = {
        files: file,
        ExcelIntegrationType: 21,
        RecordId: this.$route.params.url
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$store.dispatch('importExcel', formData).then(res => {
        this.isLoading = false
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
                  Column: msg.Column,
                  Value: msg.Value
                })
              })
            }
          }
          if (!this.isError) {
            this.selectedFile = null
            this.closeModal()
            this.$emit('success', res.data.Data)
          }
        } else {
          this.selectedFile = null
          if (res.data && res.data.Message) {
            this.$toasted.show(res.data.Message, { type: 'error', keepOnHover: true, duration: '3000' })
          }
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
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'fixedTerm-campaign-excel-modal')
    }
  }
}
</script>
<style scoped>
</style>
