<template>
  <b-modal v-if="modalAction" id="common-info-modal" @show="show" :title="modalAction.Title" size="xl" no-close-on-backdrop hide-footer>
    <section>
      <b-row>
        <NextFormGroup :title="$t('insert.commonInfo.createdUser')" md="3" lg="3">
          <NextInput type="text" v-model="form.CreatedUser" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.createdDateTime')" md="3" lg="3">
          <NextInput type="text" v-model="form.CreatedDateTime" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.modifiedUser')" md="3" lg="3">
          <NextInput type="text" v-model="form.ModifiedUser" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.modifiedDateTime')" md="3" lg="3">
          <NextInput type="text" v-model="form.ModifiedDateTime" :disabled="true" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
             id="info-list"
            :items="form.UpdateLogs"
            :fields="infoFields"
            striped
            responsive
            :current-page="mainCurrentPage"
            :per-page="10"
            >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #cell(UpdateSummary)="row">
              <span v-b-tooltip.hover :title="row.item.UpdateSummary" class="summary-span">{{row.item.UpdateSummary}}</span>
              <b-link class="detail-button" variant="success" v-b-toggle="`header-collapse-${row.index}`" @click="getFirstDetail(row);">
                  {{$t('insert.commonInfo.detail')}}
                </b-link>
              <b-collapse :id="`header-collapse-${row.index}`" class="mt-2">
                <b-table
                  class="small-detail"
                  :items="row.item.HeaderList"
                  :fields="firstDetailHeaderFields"
                  bordered
                  responsive>
                >
                <template #head()="data">
                  {{$t(data.label)}}
                </template>
                </b-table>
              </b-collapse>
            </template>
            <template #cell(show_details)="row">
              <div>
                <b-link class="detail-button" variant="success" @click="getFirstDetail(row); row.toggleDetails();">
                  {{$t('insert.commonInfo.detail')}}
                </b-link>
              </div>
            </template>
            <template #row-details="row">
              <div class="p-4 mt-2 nested-detail-panel">
                <b-row>
                  <b-col>
                   <b-table
                     :items="row.item.DetailList"
                     :fields="infoFields"
                     bordered
                     responsive>
                   >
                     <template #head()="data">
                      {{$t(data.label)}}
                     </template>
                     <template #cell(show_details)="detailRow">
                       <div>
                         <b-link class="detail-button" variant="success" @click="getSecondDetail(detailRow, row.index); detailRow.toggleDetails();">
                           {{$t('insert.commonInfo.detail')}}
                         </b-link>
                       </div>
                      </template>
                      <template #row-details="row">
                        <div class="p-4 mt-2 nested-detail-panel-2">
                          <b-row>
                            <b-col>
                              <b-table
                               :items="row.item.DetailList"
                               :fields="firstDetailHeaderFields"
                               striped
                               responsive>
                             >
                             <template #head()="data">
                                {{$t(data.label)}}
                              </template>
                             </b-table>
                            </b-col>
                          </b-row>
                        </div>
                      </template>
                   </b-table>
                  </b-col>
                </b-row>
              </div>
            </template>
          </b-table>
          <b-pagination :total-rows="form.UpdateLogs ? form.UpdateLogs.length : 0" v-model="mainCurrentPage" :per-page="10" aria-controls="info-list"
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
      default: () => {}
    },
    modalItem: {
      type: Object,
      default: () => {}
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
          key: 'CreatedUser',
          label: this.$t('insert.commonInfo.employee'),
          thStyle: { width: '150px' }
        },
        {
          key: 'IP',
          label: this.$t('insert.commonInfo.ip'),
          thStyle: { width: '150px' }
        },
        {
          key: 'UpdateSummary',
          label: this.$t('insert.commonInfo.updateSummary')
        },
        {
          key: 'show_details',
          label: this.$t(''),
          thStyle: { width: '50px' }
        }
      ],
      firstDetailHeaderFields: [
        {
          key: 'LangDesc',
          label: this.$t('insert.commonInfo.screenName')
        },
        {
          key: 'OldValue',
          label: this.$t('insert.commonInfo.oldValue')
        },
        {
          key: 'NewValue',
          label: this.$t('insert.commonInfo.newValue')
        },
        {
          key: 'OldString',
          label: this.$t('insert.commonInfo.oldString')
        },
        {
          key: 'NewString',
          label: this.$t('insert.commonInfo.newString')
        }
      ]
    }
  },
  methods: {
    closeModal () {
      this.$bvModal.hide('common-info-modal')
    },
    show () {
      this.form = {}
      this.infoList = []
      let request = {
        model: {
          RecordId: this.modalItem.RecordId,
          TableName: this.modalAction.ActionUrl
        }
      }
      this.$api.postByUrl(request, 'VisionNextSystem/api/RecordInfo/GetRecordInfo').then((response) => {
        if (response && response.Model) {
          this.form = response.Model
          this.form.CreatedDateTime = this.getDateTime(response.Model.CreatedDateTime)
          this.form.ModifiedDateTime = this.getDateTime(response.Model.ModifiedDateTime)
        }
      })
    },
    getDateTime (value) {
      return value ? value.split('T').join(' ') : '-'
    },
    getFirstDetail (row) {
      if (row.detailsShowing) {
        return
      }

      let request = {
        RecordId: row.item.RecordId
      }
      this.$api.postByUrl(request, 'VisionNextSystem/api/RecordInfo/GetUpdateLogs').then((response) => {
        if (response && response.Model) {
          this.form.UpdateLogs[row.index].HeaderList = response.Model.UpdateLogDetailHeaders
          this.form.UpdateLogs[row.index].DetailList = response.Model.UpdateLogDetailRows
          this.$forceUpdate()
        }
      })
    },
    getSecondDetail (row, upperRowIndex) {
      if (row.detailsShowing) {
        return
      }

      let request = {
        RecordId: row.item.RecordId
      }
      this.$api.postByUrl(request, 'VisionNextSystem/api/RecordInfo/GetUpdateLogDetail').then((response) => {
        if (response && response.Model) {
          this.form.UpdateLogs[upperRowIndex].DetailList[row.index].DetailList = response.Model.UpdateLogDetailFields
        } else {
          this.form.UpdateLogs[upperRowIndex].DetailList[row.index].DetailList = []
        }
        this.$forceUpdate()
      })
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
