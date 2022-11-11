<template>
  <b-modal v-if="modalAction" id="efu-log-modal" @show="show" :title="modalAction.Title" size="xl" no-close-on-backdrop hide-footer>
    <section>
      <b-row>
        <b-col>
          <b-table
             id="info-list"
            :items="form"
            :fields="infoFields"
            striped
            responsive
            :current-page="mainCurrentPage"
            :per-page="10"
            >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
          </b-table>
          <b-pagination :total-rows="form ? form.length : 0" v-model="mainCurrentPage" :per-page="10" aria-controls="info-list"
          ></b-pagination>
        </b-col>
        <b-col cols="12" class="asc__modal-approveModal-footer">
          <div class="w-100 text-right">
            <b-button type="button" @click="closeModal()" variant="danger" size="md" >
              {{$t('index.close')}}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </section>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  name: 'CommonInfoModal',
  mixins: [mixin],
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
  data () {
    return {
      form: {},
      mainCurrentPage: 1,
      infoFields: [
        {
          key: 'CreatedDateTime',
          label: this.$t('insert.commonInfo.modifiedDateTime'),
          formatter: (value, key, obj) => {
            let selectedValue = value && value !== '' ? value : obj.CreatedDatetime

            return this.getDateTime(selectedValue)
          },
          thStyle: { width: '150px' }
        },
        {
          key: 'OldStatus',
          label: this.$t('insert.commonInfo.oldValue'),
          thStyle: { width: '150px' }
        },
        {
          key: 'NewStatus',
          label: this.$t('insert.commonInfo.newValue'),
          thStyle: { width: '150px' }
        },
        {
          key: 'Description',
          label: this.$t('insert.Label.Description1')
        }
      ]
    }
  },
  methods: {
    closeModal () {
      this.$bvModal.hide('efu-log-modal')
    },
    show () {
      this.form = {}
      this.infoList = []
      // let request = {
      //   model: {
      //     RecordId: this.modalItem.RecordId
      //     // TableName: this.modalAction.ActionUrl
      //   }
      // }
      this.$api.postByUrl({recordId: this.modalItem.RecordId}, 'VisionNextPrint/api/Print/GetExceptionManagement').then((response) => {
        if (response) {
          this.form = response.ExceptionDetails
          // this.form.CreatedDateTime = this.getDateTime(response.Model.CreatedDateTime)
          // this.form.ModifiedDateTime = this.getDateTime(response.Model.ModifiedDateTime)
        }
      })
    },
    getDateTime (value) {
      return value ? value.split('T').join(' ') : '-'
    }
  }
}
</script>
<style lang="sass">
  .summary-span
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
    width: 60vh
    display: inline-block
  #info-list
    table
      th
        padding: 5px !important
      td
        padding: 5px !important
  .detail-button
    padding-right: 5px
    float: right
  .nested-detail-panel
    background-color: #e4e4e4
    border-radius: 15px
    th
      border-color: #b7b4b4 !important
    td
      border-color: #b7b4b4 !important
  .small-detail td
    background: white !important
  .nested-detail-panel-2
    background-color: white
    border-radius: 15px
    th
      border-color: #b7b4b4 !important
    td
      border-color: #b7b4b4 !important
</style>
