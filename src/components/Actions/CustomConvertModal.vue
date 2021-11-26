<template>
  <b-modal @show="show" v-if="modalAction" id="customConvertModal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.branchId')" md="4" lg="4">
          <v-select :options="branchList" label="Desciption" @input="selectedBranch('BranchIds', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.documentType')" :error="$v.form.DocumentClassIds" :required="false" md="4" lg="4">
          <v-select :disabled="true" v-model="documentClass" :options="documentClasses" label="Description" @input="selectedType('DocumentClassIds', $event)"></v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.documentDate')" md="4" lg="4">
          <date-picker
            range
            type="date"
            v-model="DocumentDate"
            @change="filterDocumentDate(DocumentDate)"
          ></date-picker>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.employee')" md="4" lg="4">
          <v-select :value="employee" :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeIds', $event)" label="Description1" :filterable="false">
            <template slot="no-options">
              {{$t('insert.min3')}}
            </template>
          </v-select>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.transactionDate')" md="4" lg="4">
          <date-picker
            range
            type="date"
            v-model="CreatedDateTime"
            @change="filterRangeDate(CreatedDateTime)"
          ></date-picker>
        </NextFormGroup>
        <b-col md="4" lg="4" class="d-flex align-items-center">
          <b-button
            variant="warning"
            class="mt-2 w-100"
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
            :busy="tableBusy"
            show-empty
          >
            <template #cell(selection)="row">
              <span>
                <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
              </span>
            </template>
            <template v-slot:head()="data">
              <b-link v-if="data.field.key == 'selection'" variant="white" size="sm" @click="selectAll">
                <span>
                  <i :class="allSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
                </span>
              </b-link>
              <span v-else>{{data.field.label}}</span>
            </template>
            <template #cell(Printed)="data">
              <i v-if="data.item.Printed === 1" class="fa fa-check text-success"></i>
              <i v-else class="fa fa-times text-danger"></i>
            </template>
             <template #cell(InvoiceNo)="data">
              <NextInput input-class="input-width" v-model="data.item.InvoiceNo"></NextInput>
            </template>
            <template #empty="">
              <div class="text-center text-danger my-2">
                <h6>{{$t('index.notContentFound')}}</h6>
              </div>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
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
        DocumentClassIds: null,
        DocumentDate: null,
        UpperCustomerIds: null,
        RepresentativeIds: null
      },
      tableBusy: false,
      employee: null,
      CreatedDateTime: null,
      DocumentDate: null,
      branchList: JSON.parse(localStorage.getItem('UserModel')).AuthorizedBranches,
      documentClass: null,
      documentClasses: [
        {
          'Description': this.$t('index.Convert.salesWaybill'),
          'RecordId': 3
        },
        {
          'Description': this.$t('index.Convert.salesReturnWaybill'),
          'RecordId': 7
        }
      ],
      actionUrl: null,
      fields: [
        {
          key: 'selection',
          label: '',
          sortable: false
        },
        {
          key: 'Customer',
          label: this.$t('index.Convert.customer'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Description1',
          label: this.$t('index.Convert.description1'),
          sortable: true
        },
        {
          key: 'InvoiceNumber',
          label: this.$t('index.Convert.invoiceNumber'),
          sortable: true
        },
        {
          key: 'DocumentNumber',
          label: this.$t('index.Convert.documentNumber'),
          sortable: true
        },
        {
          key: 'Branch',
          label: this.$t('index.Convert.branchId'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Route',
          label: this.$t('index.Convert.route'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Representative',
          label: this.$t('index.Convert.representative'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'Printed',
          label: this.$t('index.Convert.printed'),
          sortable: true,
          formatter: (value, key, item) => {
            return value === 1 ? this.$t('insert.yes') : this.$t('insert.no')
          }
        },
        {
          key: 'Warehouse',
          label: this.$t('index.Convert.warehouse'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        },
        {
          key: 'DocumentDate',
          label: this.$t('index.Convert.waybillDocumentDate'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? this.dateConvertFromTimezone(value) : ''
          }
        },
        {
          key: 'InvoiceNo',
          label: this.$t('index.Convert.invoiceNo'),
          sortable: true
        },
        {
          key: 'EDocumentStatus',
          label: this.$t('index.Convert.edocumentStatus'),
          sortable: true,
          formatter: (value, key, item) => {
            return value ? value.Label : ''
          }
        }
      ],
      documents: [],
      selectedDocuments: [],
      totalCount: 0,
      successfullCount: 0,
      unSuccessfullCount: 0,
      selected: [],
      allSelected: false,
      InvoiceNoCode: null
    }
  },
  validations () {
    return {
      form: {
        DocumentClassIds: {
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
        DocumentDate: null,
        UpperCustomerIds: null,
        RepresentativeIds: null
      }
      this.DocumentDate = null
      this.CreatedDateTime = null
      this.employee = null
      this.$v.form.$reset()
      this.clearProgress()
    })
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      this.employee = userModel.Name + ' ' + userModel.Surname
      if (this.modalAction.Action === 'CustomConvert') {
        this.form.RepresentativeIds = [userModel.UserId]
      } else {
        this.form.RepresentativeIds = null
      }
    })
  },
  methods: {
    show () {
      this.documentClass = this.documentClasses.find(d => d.RecordId === 3)
      this.form.DocumentClassIds = [3]
      this.actionUrl = 'VisionNextInvoice/api/SalesWaybill/KeyAccountDispatchTransformSearch'
      this.allSelected = false
      this.selected = []
    },
    getCode (index) {
      this.$api.postByUrl({}, `VisionNextInvoice/api/SalesWaybill/GetCode?v=${index}`).then(response => {
        if (response && response.Model) {
          this.documents[index].InvoiceNo = response.Model.Code
          this.$forceUpdate()
        }
      })
    },
    selectedBranch (label, model) {
      if (model) {
        this.form[label] = [model.Id]
      } else {
        this.form[label] = null
      }
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = [model.RecordId]
        if (model.RecordId === 3) {
          this.actionUrl = 'VisionNextInvoice/api/SalesWaybill/KeyAccountDispatchTransformSearch'
        } else {
          this.actionUrl = 'VisionNextInvoice/api/SalesReturnWaybill/KeyAccountDispatchTransformSearch'
        }
      } else {
        this.form[label] = []
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.employee = model.Description1
        this.form[label] = [model.RecordId]
      } else {
        this.form[label] = null
        this.employee = null
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
        let customerId = 0
        if (this.modalAction.Action === 'BranchCustomConvert') {
          customerId = this.modalItem.CustomerId
        }
        if (this.modalAction.Action === 'CustomConvert') {
          customerId = this.modalItem.RecordId
        }
        this.form.UpperCustomerIds = customerId > 0 ? [customerId] : null
        let request = {
          'andConditionModel': {
            ...this.form
          }
        }
        this.tableBusy = true
        this.$api.postByUrl(request, this.actionUrl).then((res) => {
          this.tableBusy = false
          this.documents = res.ListModel.BaseModels
          for (let index = 0; index < this.documents.length; index++) {
            this.getCode(index)
          }
        })
      }
    },
    filterRangeDate (date) {
      this.form.CreatedDateTime = {
        BeginValue: this.dateConvertToISo(date[0]),
        EndValue: this.dateConvertToISo(date[1])
      }
    },
    filterDocumentDate (date) {
      this.form.DocumentDate = {
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
        api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
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
      this.selected.map((item, i) => {
        this.documents[this.documents.indexOf(item)].Status = ''
        this.$api.postByUrl({recordId: item.RecordId}, `VisionNextInvoice/api/SalesWaybill/GetConvertToInvoice?v=${i}`).then((response) => {
          if (response && response.IsCompleted) {
            let model = response.invoiceConvertModel
            model.InvoiceNumber = item.InvoiceNo

            let request = {
              'recordId': item.RecordId,
              'invoiceConvertModel': model
            }
            this.$api.postByUrl(request, `VisionNextInvoice/api/SalesWaybill/ConvertToInvoice?v=${i}`).then((res) => {
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
      this.$refs.selectableTable.clearSelected()
      this.allSelected = false

      if (this.unSuccessfullCount === 0) {
        this.$toasted.show(this.$t('index.Convert.successConvert'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
        setTimeout(() => {
          this.search()
        }, 3000)
      }
    },
    clearProgress () {
      this.successfullCount = 0
      this.unSuccessfullCount = 0
      this.totalCount = 0
    },
    selectAll () {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected()
      } else {
        this.$refs.selectableTable.selectAllRows()
      }

      this.allSelected = !this.allSelected
    }
  }
}
</script>
<style scoped>
  .mx-datepicker-range {
    width: 100% !important;
  }
  .success-color {
  color: #28a745;
  font-size: medium;
  }
  .gray-color {
    color: lightgray;
    font-size: medium;
  }
  .input-width {
    width: 150px;
  }
</style>
