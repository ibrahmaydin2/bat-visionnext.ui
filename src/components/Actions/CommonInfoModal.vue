<template>
  <b-modal v-if="modalAction" id="common-info-modal" @show="show" :title="modalAction.Title" size="xl" no-close-on-backdrop hide-footer>
    <section>
      <b-row>
        <NextFormGroup :title="$t('insert.commonInfo.createdUser')" md="6" lg="6">
          <NextInput type="text" v-model="form.CreatedUser" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.createdDateTime')" md="6" lg="6">
          <NextInput type="text" v-model="form.CreatedDateTime" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.modifiedUser')" md="6" lg="6">
          <NextInput type="text" v-model="form.ModifiedUser" :disabled="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.commonInfo.modifiedDateTime')" md="6" lg="6">
          <NextInput type="text" v-model="form.ModifiedDateTime" :disabled="true" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col>
          <b-table
             id="info-list"
            :items="form.UpdateLogs"
            :fields="infoFields"
            bordered
            responsive
            :current-page="mainCurrentPage"
            :per-page="10">
          >
            <template #cell(show_details)="row">
              <div>
                <b-link type="link" size="sm" @click="getFirstDetail(row); row.toggleDetails(); " class="mt-2">
                  {{$t('insert.commonInfo.detail')}}
                </b-link>
              </div>
            </template>
            <template #row-details="row">
              <b-row>
                <b-col>
                  <b-table
                   :items="row.item.HeaderList"
                   :fields="firstDetailHeaderFields"
                   striped
                   responsive>
                 ></b-table>
                 <b-table
                   :items="row.item.DetailList"
                   :fields="infoFields"
                   striped
                   responsive>
                 >
                   <template #cell(show_details)="detailRow">
                     <div>
                       <b-link type="link" size="sm" @click="getSecondDetail(detailRow, row.index); detailRow.toggleDetails();" class="mt-2">
                         {{$t('insert.commonInfo.detail')}}
                       </b-link>
                     </div>
                    </template>
                    <template #row-details="row">
                      <b-row>
                        <b-col>
                          <b-table
                           :items="row.item.DetailList"
                           :fields="firstDetailHeaderFields"
                           bordered
                           responsive>
                         ></b-table>
                        </b-col>
                      </b-row>
                    </template>
                 </b-table>
                </b-col>
              </b-row>
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
          }
        },
        {
          key: 'CreatedUser',
          label: this.$t('insert.commonInfo.employee')
        },
        {
          key: 'IP',
          label: this.$t('insert.commonInfo.ip')
        },
        {
          key: 'UpdateSummary',
          label: this.$t('insert.commonInfo.updateSummary')
        },
        {
          key: 'show_details',
          label: this.$t('')
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
