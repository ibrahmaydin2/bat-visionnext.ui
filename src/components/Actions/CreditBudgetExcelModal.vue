<template>
  <b-modal id="credit-budget-excel-modal" @hide="hide" :title="$t('insert.creditBudget.excelImport')" size="lg" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <template>
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
            :disabled="isLoading"
            variant="primary"
            size="sm"
            @click="submitFile()"
          >
            <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('index.upload')}}</span>
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
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'CreditBudgetExcelModal',
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
      isLoading: false
    }
  },
  validations () {
    return {
    }
  },
  methods: {
    hide () {
      this.datas = []
      this.files = null
    },
    submitFile () {
      var file = document.querySelector('input[type="file"]').files[0]
      this.getBase64(file)
    },
    sendFile (file) {
      let formData = {
        files: file,
        ExcelIntegrationType: 15
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
                  Column: msg.Column
                })
              })
            }
          }
          if (!this.isError) {
            document.querySelector('input[type="file"]').value = ''
            this.closeModal()
            this.$emit('success', res.data.Data)
          }
        } else {
          this.$toasted.show(res.Message, {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
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
      this.$root.$emit('bv::hide::modal', 'credit-budget-excel-modal')
    }

  }
}
</script>
<style scoped>
</style>
