<template>
  <b-modal v-if="modalAction" id="customConvertModal" :title="modalAction.Title" size="xl">
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.CustomConvert.branchId')" md="4" lg="4">
          <v-select :options="branchList" label="Desciption" @input="selectedBranch('BranchIds', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.CustomConvert.documentType')" :error="$v.form.documentType" :required="false" md="4" lg="4">
          <v-select v-model="form.documentType" :options="documentTypes" label="Description" @input="selectedType('documentType', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.CustomConvert.documentDate')" md="4" lg="4">
          <date-picker
            range
            type="date"
            v-model="CreatedDateTime"
            @change="filterRangeDate(CreatedDateTime)"
          ></date-picker>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.CustomConvert.employee')" md="4" lg="4">
          <v-select :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeIds', $event)" label="Description1">
            <template slot="no-options">
              {{$t('insert.min3')}}
            </template>
          </v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.CustomConvert.transactionDate')" md="4" lg="4">
          <b-form-datepicker v-model="form.DocumentDate" />
        </NextFormGroup>
        <b-col md="4" lg="4" class="d-flex align-items-center">
          <b-button
            variant="warning"
            class="mt-2 w-75"
            size="sm"
            @click="search()"
          >
            {{$t('index.search')}}
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="successfullCount > 0 || unSuccessfullCount > 0">
        <b-col>
          <b-progress class="mt-2 w-100" :animated="true" :max="totalCount" show-value>
            <b-progress-bar :value="successfullCount" variant="success"></b-progress-bar>
            <b-progress-bar :value="unSuccessfullCount" variant="danger"></b-progress-bar>
          </b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            v-if="documents"
            :items="documents"
            :fields="fields"
            select-mode="multi"
            selectable
            sticky-header
            ref="selectableTable"
            @row-selected="onRowSelected"
          >
            <!-- Example scoped slot for select state illustrative purposes -->
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </section>
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
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'CustomConvertModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState(['employees'])
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
      form: {
        BranchIds: null,
        documentType: null,
        documentDate: null,
        RecordIds: null
      },
      CreatedDateTime: null,
      branchList: JSON.parse(localStorage.getItem('UserModel')).AuthorizedBranches,
      documentTypes: [
        {
          'Description': this.$t('index.CustomConvert.salesWaybill'),
          'RecordId': 3
        },
        {
          'Description': this.$t('index.CustomConvert.salesReturnWaybill'),
          'RecordId': 7
        }
      ],
      actionUrl: null,
      // fields: ['selected', 'CreatedDateTime', 'Customer', 'DocumentDate', ],
      fields: [
        {
          key: 'selected',
          label: '',
          sortable: false
        },
        {
          key: 'DocumentDate',
          label: this.$t('index.CustomConvert.documentDate'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? this.dateConvertFromTimezone(value) : ''
          }
        },
        {
          key: 'Customer',
          label: this.$t('index.CustomConvert.customer'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'InvoiceClass',
          label: this.$t('index.CustomConvert.invoiceClass'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'InvoiceKind',
          label: this.$t('index.CustomConvert.invoiceKind'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Branch',
          label: this.$t('index.CustomConvert.branchId'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Representative',
          label: this.$t('index.CustomConvert.employee'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Status',
          label: this.$t('index.CustomConvert.status'),
          sortable: true,
          formatter: (value, key, item) => {
            return value && value
          }
        }
      ],
      documents: [],
      selectedDocuments: [],
      totalCount: 0,
      successfullCount: 0,
      unSuccessfullCount: 0,
      selected: []
    }
  },
  validations () {
    return {
      form: {
        documentType: {
          required
        }
      }
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.documents = []
      this.selectedDocuments = []
      this.selected = []
      this.form = {
        BranchIds: null,
        documentType: null,
        documentDate: null,
        RecordIds: null
      }
      this.clearProgress()
    })
  },
  methods: {
    selectedBranch (label, model) {
      if (model) {
        this.form[label] = [model.Id]
      } else {
        this.form[label] = null
      }
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.Description
        if (model.RecordId === 3) {
          this.actionUrl = 'VisionNextInvoice/api/SalesWaybill/Search'
        } else {
          this.actionUrl = 'VisionNextInvoice/api/SalesReturnWaybill/Search'
        }
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'customConvertModal')
    },
    search () {
      this.clearProgress()
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        // this.form.RecordIds = this.modalItem ? [this.modalItem.RecordId] : null
        let request = {
          'AndConditionModel': {
            ...this.form
          }
        }
        this.$api.postByUrl(request, this.actionUrl).then((res) => {
          this.documents = res.ListModel.BaseModels
        })
      }
    },
    filterRangeDate (date) {
      this.form.CreatedDateTime = {
        BeginValue: this.dateConvertToISo(date[0]),
        EndValue: this.dateConvertToISo(date[1])
      }
    },
    onEmployeeSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchEmployee(loading, search)
      }
    },
    searchEmployee (loading, search) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextEmployee/api/Employee/Search',
        name: 'employees',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    onRowSelected (items) {
      this.selected = items
    },
    async submitModal () {
      this.clearProgress()
      if (this.selected.length < 1) {
        this.$toasted.show(this.$t('index.chooseDocument'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.totalCount = this.selected.length
      await this.selected.map((item, i) => {
        this.documents[this.documents.indexOf(item)].Status = ''
        this.$api.postByUrl({recordId: item.RecordId}, 'VisionNextInvoice/api/SalesWaybill/GetConvertToInvoice').then((response) => {
          if (response && response.IsCompleted) {
            let request = {
              'recordId': item.RecordId,
              'invoiceConvertModel': response.invoiceConvertModel
            }
            this.$api.postByUrl(request, 'VisionNextInvoice/api/SalesWaybill/ConvertToInvoice').then((res) => {
              if (res && res.IsCompleted) {
                this.documents[this.documents.indexOf(item)].Status = this.$t('index.success')
                this.successfullCount++
              } else {
                this.documents[this.documents.indexOf(item)].Status = res.Message
                this.unSuccessfullCount++
              }
            })
          } else {
            this.documents[this.documents.indexOf(item)].Status = response.Message
            this.unSuccessfullCount++
          }
        })
      })
      this.selected = []
      this.clearSelected()
    },
    clearSelected () {
      this.$refs.selectableTable.clearSelected()
    },
    clearProgress () {
      this.successfullCount = 0
      this.unSuccessfullCount = 0
      this.totalCount = 0
    }
  }
}
</script>
<style scoped>
  .mx-datepicker-range {
    width: unset !important;
  }
</style>
