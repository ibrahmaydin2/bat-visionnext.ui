<template>
<!-- Rma apisi bulunmadığı için sonra yapılacak -->
  <b-modal v-if="modalAction" @show="show" id="itemFormulaModal" @hide="hide" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.ItemFormula.Code')" md="4" lg="4" :error="$v.form.Code">
          <b-form-input type="text" v-model="form.Code" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.ItemFormula.Description1')" md="4" lg="4" :error="$v.form.Description1">
          <b-form-input type="text" v-model="form.Description1" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.ItemFormula.BranchCriteria')" md="4" lg="4" :error="$v.form.BranchCriteriaId">
          <NextDropdown  lookup-key="BRANCH_CRITERIA" @input="selectedBranchType('BranchCriteriaId', $event)" :get-lookup="true"/>
        </NextFormGroup>
      </b-row>
      <hr>
      <b-row v-if="showBranches">
        <NextFormGroup :title="$t('index.ItemFormula.Branch')" md="4" lg="4">
          <NextDropdown v-model="branch" url="VisionNextBranch/api/Branch/Search" searchable/>
        </NextFormGroup>
        <b-form-group>
          <AddDetailButton @click.native="addBranch" />
        </b-form-group>
        <b-col cols="12">
          <b-table :items="form.ItemFormulaBranchs" :fields="fields2" striped responsive>
            <template #head()="data">
              {{$t(data.label)}}
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <NextFormGroup :title="$t('index.ItemFormula.BeginDate')" md="3" lg="3">
          <b-form-datepicker v-model="BeginDate" locale="tr" :placeholder="$t('insert.chooseDate')"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.ItemFormula.EndDate')" md="3" lg="3">
          <b-form-datepicker v-model="EndDate" locale="tr" :placeholder="$t('insert.chooseDate')"/>
        </NextFormGroup>
        <b-col cols="12" md="2" class="ml-auto">
          <b-form-group>
            <AddDetailButton @click.native="addValidDates" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="form.ItemFormulaValidDates">
        <b-table :items="form.ItemFormulaValidDates" :fields="fields" striped responsive>
          <template #head()="data">
            {{$t(data.label)}}
          </template>
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{$t('index.ItemFormula.Descriptions')}} {{ row.detailsShowing ? 'Gizle' : 'Göster'}}
            </b-button>
            <b-button size="sm" @click="detailRow(row)" class="mr-2">
              {{$t('index.ItemFormula.AddDescription')}}
            </b-button>
          </template>
          <template #row-details="row">
            <b-table :items="row.item.ItemFormulaDetails" :fields="fields1" striped responsive>
              <template #head()="data">
                {{$t(data.label)}}
              </template>
            </b-table>
          </template>
        </b-table>
      </b-row>
      <b-card class="w-100" v-if="showValidDates">
        <b-row>
          <NextFormGroup :title="$t('index.ItemFormula.FieldDescription')" :required="true" md="3" lg="3">
            <NextDropdown
              url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
              :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
              @input="getItemValues($event)"
            />
          </NextFormGroup>
          <NextFormGroup :title="$t('index.ItemFormula.FieldValue')" :required="true" md="3" lg="3">
            <v-select :options="fieldValues" @input="setFieldDesc($event)" label="Label"/>
          </NextFormGroup>
          <NextFormGroup :title="$t('index.ItemFormula.Quantity')" md="3" lg="3">
            <b-form-input type="text" value="0.1" readonly />
          </NextFormGroup>
          <NextFormGroup :title="$t('index.ItemFormula.UnitId')" md="3" lg="3">
            <b-form-input type="text" value="Karton" readonly />
          </NextFormGroup>
          <NextFormGroup :title="$t('index.ItemFormula.DiscountAmount')" md="3" lg="3">
            <b-form-input type="text" v-model="ValidDates.DiscountAmount" />
          </NextFormGroup>
          <NextFormGroup :title="$t('index.ItemFormula.Currency')" md="3" lg="3">
            <b-form-input type="text" value="Türk Lirası" readonly />
          </NextFormGroup>
          <b-form-group>
            <AddDetailButton @click.native="addItemFormulaDetails" />
          </b-form-group>
        </b-row>
      </b-card>
    </section>
    <template #modal-footer>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="close()"
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
import mixin from '../../mixins/helper'
import indexMixin from '../../mixins/index'
export default {
  name: 'ItemFormulaModal',
  mixins: [mixin, indexMixin],
  components: {
  },
  computed: {
    ...mapState(['createCode'])
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
        Code: null,
        Description1: null,
        BranchCriteriaId: null,
        StatusId: 1,
        ItemFormulaValidDates: [],
        ItemFormulaBranchs: []
      },
      ValidDates: {
        ColumnName: null,
        ColumnValue: null,
        StatusId: null,
        Quantity: null,
        UnitId: null,
        DiscountAmount: null,
        CurrencyId: null,
        NameTitle: null,
        ValueTitle: null
      },
      BeginDate: null,
      EndDate: null,
      fields: [
        {
          key: 'BeginDate',
          label: this.$t('index.ItemFormula.BeginDate'),
          sortable: false,
          formatter: (value) => {
            return this.dateConvertFromTimezone(value)
          }
        },
        {
          key: 'EndDate',
          label: this.$t('index.ItemFormula.EndDate'),
          sortable: false,
          formatter: (value) => {
            return this.dateConvertFromTimezone(value)
          }
        },
        {
          key: 'show_details', label: this.$t('index.ItemFormula.ShowDetails'), sortable: false
        }
      ],
      fields1: [
        {key: 'NameTitle', label: this.$t('index.ItemFormula.FieldDescription'), sortable: false},
        {key: 'ValueTitle', label: this.$t('index.ItemFormula.FieldValue'), sortable: false},
        {key: 'Quantity', label: this.$t('index.ItemFormula.Quantity'), sortable: false}
      ],
      fields2: [
        {key: 'Code', label: this.$t('index.ItemFormula.Code'), sortable: false},
        {key: 'BranchCommercialTitle', label: this.$t('index.ItemFormula.BranchCommercialTitle'), sortable: false}
      ],
      fieldValues: [],
      showValidDates: false,
      selectedRow: null,
      showBranches: false,
      branch: null
    }
  },
  validations () {
    return {
      form: {
        Code: {
          required
        },
        Description1: {
          required
        },
        BranchCriteriaId: {
          required
        }
      }
    }
  },
  methods: {
    show () {
      this.$api.postByUrl({}, 'VisionNextContractManagement/api/ItemFormula/GetCode').then((res) => {
        this.form.Code = res.Model.Code
      })
    },
    hide () {
      this.form = {
        Code: null,
        Description1: null,
        BranchCriteriaId: null,
        StatusId: 1,
        ItemFormulaValidDates: [],
        ItemFormulaBranchs: []
      }
      this.ValidDates = {
        ColumnName: null,
        NameTitle: null,
        ColumnValue: null,
        ValueTitle: null,
        StatusId: null,
        Quantity: null,
        UnitId: null,
        DiscountAmount: null,
        CurrencyId: null
      }
      this.BeginDate = null
      this.EndDate = null
      this.showValidDates = false
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'itemFormulaModal')
    },
    detailRow (row) {
      this.selectedRow = row
      this.showValidDates = true
    },
    selectedBranchType (label, model) {
      if (model) {
        if (model.DecimalValue === 30) {
          this.showBranches = true
        }
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
        this.showBranches = false
      }
    },
    getItemValues (e) {
      if (e) {
        this.ValidDates.ColumnName = e.ForeignField
        this.ValidDates.NameTitle = e.Label
        this.$api.postByUrl({paramName: e.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.fieldValues = res.Values
        })
      } else {
        this.ValidDates.ColumnName = null
        this.ValidDates.NameTitle = null
        this.ValidDates.ColumnValue = null
        this.ValidDates.ValueTitle = null
      }
    },
    setFieldDesc (e) {
      if (e) {
        this.ValidDates.ColumnValue = e.DecimalValue
        this.ValidDates.ValueTitle = e.Label
      } else {
        this.ValidDates.ColumnValue = null
        this.ValidDates.ValueTitle = null
      }
    },
    onBranchSearch (search, loading) {
      if (search.length >= 3) {
        this.searchBranch(loading, search, this)
      }
    },
    searchBranch (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextBranch/api/Branch/Search',
        name: 'branchList',
        andConditionModel: {
          BranchCommercialTitle: search
        }
      }).then(res => {
        loading(false)
      })
    },
    addBranch () {
      this.form.ItemFormulaBranchs.push({
        'Code': this.branch.Code,
        'BranchCommercialTitle': this.branch.BranchCommercialTitle,
        'TableName': 'T_BRANCH',
        'ColumnName': 'RECORD_ID',
        'ColumnValue': this.branch.RecordId,
        'StatusId': 1.0,
        'Deleted': 0,
        'System': 0,
        'RecordState': 2
      })
    },
    addValidDates () {
      this.form.ItemFormulaValidDates.push({
        'Deleted': 0,
        'System': 0,
        'RecordState': 2,
        'StatusId': 1.0,
        'BeginDate': this.dateConvertToISo(this.BeginDate),
        'EndDate': this.dateConvertToISo(this.EndDate),
        'ItemFormulaDetails': []
      })
      this.BeginDate = null
      this.EndDate = null
    },
    addItemFormulaDetails () {
      const index = this.form.ItemFormulaValidDates.indexOf(this.selectedRow.item)
      let tmpArr = this.form.ItemFormulaValidDates[index]
      tmpArr.ItemFormulaDetails.push({
        'ColumnName': this.ValidDates.ColumnName,
        'ColumnValue': this.ValidDates.ColumnValue,
        'NameTitle': this.ValidDates.NameTitle,
        'ValueTitle': this.ValidDates.ValueTitle,
        'StatusId': 1,
        'Quantity': 0.1,
        'UnitId': 501,
        'DiscountAmount': this.ValidDates.DiscountAmount,
        'CurrencyId': 1
      })
      this.ValidDates.ColumnName = null
      this.ValidDates.ColumnValue = null
      this.ValidDates.DiscountAmount = null
      this.fieldValues = []
      this.showValidDates = false
      this.selectedRow.toggleDetails()
    },
    submitModal () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        Model: this.form
      }
      this.$api.postByUrl(request, 'VisionNextContractManagement/api/ItemFormula/Insert').then((response) => {
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('insert.success'), { type: 'success', keepOnHover: true, duration: '3000' })
          this.close()
        } else {
          if (response.Validations && response.Validations.Errors && response.Validations.Errors.length > 0) {
            response.Validations.Errors.forEach(item => {
              if (item.States && item.States.length > 0) {
                item.States.forEach(state => {
                  this.$toasted.show(decodeURIComponent(state), { type: 'error', keepOnHover: true, duration: '3000' })
                })
              } else {
                this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
              }
            })
          } else {
            this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
