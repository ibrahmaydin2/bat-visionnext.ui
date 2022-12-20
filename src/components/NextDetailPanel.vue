<template>
  <div>
    <CreditBudgetExcelModal @success="successExcelImport"></CreditBudgetExcelModal>
    <b-modal :id="`confirm-edit-modal${unique}`">
      <template #modal-title>
        {{$t('list.editConfirm')}}
      </template>
      {{$t('list.rowEditConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide(`confirm-edit-modal${unique}`)">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="editItem()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal :id="`warning-edit-modal`">
      <template #modal-title>
        {{$t('list.editConfirm')}}
      </template>
      {{$t('list.rowEditWarning')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="success" @click="$bvModal.hide(`warning-edit-modal`)">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal :id="`confirm-delete-modal${unique}`">
      <template #modal-title>
        {{$t('list.deleteConfirm')}}
      </template>
      {{$t('list.rowDeleteConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide(`confirm-delete-modal${unique}`)">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="removeItem()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-row v-if="editable">
      <NextFormGroup v-for="(item,i) in (items ? items.filter(i => i.visible === true): [])" :key="i" :title="$t(item.label)" :required="isRequired(item)" :error="isRequired(item) ? $v.form[item.modelProperty] : {}">
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Autocomplete'" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :searchable="true" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :label="item.labelProperty ? item.labelProperty : 'Description1'" :custom-option="item.customOption" :is-customer="item.isCustomer" :or-condition-fields="item.orConditionFields" :is-employee="item.isEmployee" :is-vehicle="item.isVehicle"/>
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && !item.parentId" :onAfter="item.onAfter" :source="item.source" :url="item.url" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :filter="item.filter" :custom-option="item.customOption" :is-prefix="item.isPrefix" :page-count="item.pageCount"/>
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && item.parentId" :source="source[item.modelProperty]" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :page-count="item.pageCount" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Lookup'" :lookup-key="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :get-lookup="true" :label="item.labelProperty ? item.labelProperty : 'Label'" :filter="item.filter" />
        <NextInput v-model="label[item.modelProperty]" v-if="item.type === 'Label'" :type="item.inputType" :readonly="isDisabled(item)" />
        <NextInput v-model="form[item.modelProperty]" v-if="item.type === 'Text'" :type="item.inputType" :readonly="isDisabled(item)" @input="enterValue(item.id, $event)" :maxLength="item.maxLength" :minLength="item.minLength" :oninput="item.isPostCode ? postCodeControl : maxLengthControl" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Check'" type="number"  toggle :disabled="isDisabled(item)" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Radio'" type="number" radio :disabled="isDisabled(item)" />
        <NextDatePicker v-model="form[item.modelProperty]" v-if="item.type === 'Date'" :disabled="isDisabled(item)" />
      </NextFormGroup>
      <b-col cols="12" md="2">
        <b-form-group>
          <AddDetailButton v-if="!isUpdated && showAddButton" @click.native="addItems()" />
          <b-button v-if="isUpdated" class="mt-4" size="sm" variant="success" @click="addItems()">
            <i class="fa fa-pencil-alt"></i> {{$t('insert.edit')}}
          </b-button>
          <b-button v-if="isExcelImport" class="mt-4" size="sm" variant="success" v-b-modal.credit-budget-excel-modal><i class="fas fa-file-pdf"/> {{$t('insert.creditBudget.uploadExcel')}}</b-button>
        </b-form-group>
      </b-col>
      <slot name="grid" />
    </b-row>
    <b-row>
      <b-table
        class="detail-panel-table"
        :id="id"
        :fields="fields"
        :items="filteredValues ? filteredValues.filter(i => i.RecordState !== 4) : []"
        bordered
        responsive
        :current-page="currentPage"
        :per-page="10"
        small>
        <template #head()="data">
          <div>{{$t(data.label)}}</div>
          <NextInput v-if="getItemSearchable(data.column)" v-model="searchableItems[data.column]" @input="filterList($event, data.column)"></NextInput>
        </template>
        <template #cell()="data">
          <div class="detail-panel-data-view" v-html="data.value"></div>
        </template>
        <template #cell(operations)="data">
          <b-button :title="$t('list.edit')" v-b-tooltip.hover.bottom v-if="showEdit && editable" @click="$bvModal.show(`confirm-edit-modal${unique}`); selectedItem = data.item;" class="btn mt-1 mr-1 btn-warning operations-button">
            <i class="fa fa-pencil-alt"></i>
          </b-button>
          <b-button :title="$t('list.edit')" v-b-tooltip.hover.bottom v-if="showWarning && editable" @click="$bvModal.show(`warning-edit-modal`)" class="btn mt-1 mr-1 btn-warning operations-button">
            <i class="fa fa-pencil-alt"></i>
          </b-button>
          <b-button :title="$t('list.delete')" v-b-tooltip.hover.bottom v-if="editable" @click="$bvModal.show(`confirm-delete-modal${unique}`); selectedItem = data.item;" type="button" class="btn mt-1 mr-1 btn-danger operations-button">
            <i class="far fa-trash-alt"></i>
          </b-button>
          <i v-if="getDetail" @click="getDetail(data.item)" :title="$t('get.detail')" class="ml-3 fa fa-arrow-down text-success"></i>
          <b-button class="btn mt-1 mr-1 btn-success operations-button" v-for="(detail,i) in detailButtons" :key="i" @click="detail.getDetail(data.item, data.index)" :title="detail.title">
            <i :class="`text-light ${detail.icon}`"></i>
          </b-button>
        </template>
        <template #cell(show_details)="row">
          <div>
            <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
              <i class="fa fa-arrow-down"></i>{{detailButtonText}}
            </b-button>
          </div>
       </template>
        <template #row-details v-if="hasDetail">
          <div class="p-4">
            <h2><slot name="title" /></h2>
            <hr>
            <slot name="body" />
          </div>
        </template>
      </b-table>
      <b-pagination
        :total-rows="filteredValues ? filteredValues.length : 0"
        v-model="currentPage"
        :per-page="10"
        :aria-controls="id"
      ></b-pagination>
    </b-row>
  </div>
</template>
<script>
import mixin from '../mixins/index'
import { requiredIf } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'NextDetailPanel',
  mixins: [mixin],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
      description: 'v-model bilgisi'
    },
    type: {
      type: String,
      validator: (prop) => [
        'insert',
        'update',
        'get'
      ].includes(prop),
      default: 'insert',
      description: 'Hangi sayfada kullanılıyorsa o sayfanın tipi bilgisi'
    },
    hasDetail: {
      type: Boolean,
      default: false,
      description: 'Gridde detay bilgisinin olup olmaması bilgisi'
    },
    detailButtonText: {
      type: String,
      default: 'Detay',
      description: 'Gridde detay bilgisi varsa detayı açmak için kullanılan butonun text bilgisi'
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
      description: 'Dinamik olarak oluşturulacak componentlerin json list olarak bilgisi'
    },
    hasLineNumber: {
      type: Boolean,
      default: false,
      description: 'Gridde satır numarasının görünüp görünmeme bilgisi'
    },
    beforeAdd: {
      type: Function,
      description: 'Yeni bir eleman eklenmeden önce validasyon yapılabimesi için kullanılır. Valid ise true dönmesi beklenmektedir. Parametereler: item, list, isUpdated'
    },
    getDetail: {
      type: Function,
      description: 'Detay butonuna tıklandığında çalışan metoddur'
    },
    detailButtons: {
      type: Array,
      description: 'Grid satırları için birden fazla aksiyon butonu eklemeyi sağlar'
    },
    showEdit: {
      type: Boolean,
      default: true,
      description: 'Grid satırında güncelle butonunun görünürlük bilgisi'
    },
    showWarning: {
      type: Boolean,
      default: false,
      description: 'Grid satırında güncelle butonu toplu eklemeye bağlı ise gösterilmesi gereken uyarı'
    },
    showAddButton: {
      type: Boolean,
      default: true,
      description: 'Detay Panelde ekle butonunun görünürlük bilgisi'
    },
    hideOperations: {
      type: Boolean,
      default: false,
      description: 'Grid satırında tüm operasyonların görünürlük bilgisi'
    },
    mainForm: {
      type: Object,
      description: 'İlgili sayfanın form bilgisi. Detay panelde sayfa ile ilgili kontrolleri yapmak için kullanılır'
    },
    editForm: {
      type: Function,
      description: 'Yeni eleman eklenmeden önce eklenen elemana manipülasyon yapılabilmesi için kullanılır'
    },
    changeValidation: {
      type: Function,
      description: 'Dinamik validasyonlar için kullanılır'
    },
    isExcelImport: {
      type: Boolean,
      default: false,
      description: 'Excel yükleme butonunun görünürlüğünü kontrol etmek için kullanılır.'
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      form: {},
      model: {},
      label: {},
      source: {},
      values: [],
      filteredValues: [],
      objectTypes: ['Autocomplete', 'Dropdown', 'Lookup', 'Label'],
      editable: this.type === 'insert' || this.type === 'update',
      lineNumber: 1,
      currentPage: 1,
      id: Math.random().toString(36).substring(2),
      selectedIndex: null,
      isUpdated: false,
      selectedItem: null,
      unique: Math.random().toString(16).slice(2),
      additionalSearchTypeFirst: false,
      searchableItems: {}
    }
  },
  computed: {
    ...mapState(['createCode']),
    fields () {
      let fields = []
      if (this.hasLineNumber) {
        fields.push({
          key: 'LineNumber',
          label: this.$t('insert.lineNumber')
        })
      }
      this.items.map(item => {
        if (!item.hideOnTable) {
          fields.push({
            key: item.modelProperty,
            label: this.$t(item.label),
            formatter: (value, key, obj) => {
              if (item.type === 'Check') {
                value = value === 1 ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-times text-danger"></i>'
              } else if (item.type === 'Date') {
                value = this.dateConvertFromTimezone(value)
              } else if (this.objectTypes.includes(item.type)) {
                value = this.getObjectLabel(item, obj)
              }
              return value
            }
          })
        }
      })

      if ((this.editable || this.getDetail || this.detailButtons) && !this.hideOperations) {
        fields.push({
          key: 'operations',
          label: this.$t('list.operations'),
          thStyle: this.detailButtons && this.detailButtons.length > 0
            ? {'min-width': `${96 + (54 * this.detailButtons.length)}px`}
            : {'min-width': '108px'}
        })
      }

      if (this.hasDetail) {
        fields.push({
          key: 'show_details',
          label: ''
        })
      }
      return fields
    }
  },
  mounted () {
    this.items.forEach(item => {
      if (this.isRequired(item)) {
        this.$set(this.form, item.modelProperty, null)
      }
      let defaultValue = null
      if (item.defaultValue) {
        defaultValue = item.defaultValue
      } else if (item.createCode) {
        defaultValue = this.createNewCode(item.modelProperty)
      }
      if (defaultValue) {
        if (item.type === 'Label') {
          this.$set(this.label, item.modelProperty, defaultValue)
        }
        if (item.type === 'Text' || item.type === 'Check') {
          this.$set(this.form, item.modelProperty, defaultValue)
        }
      }
    })
  },
  methods: {
    addItems () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      this.form = {
        ...this.form,
        ...this.label
      }

      if (!this.values) {
        this.values = []
      }

      if (this.beforeAdd && !this.beforeAdd(this.form, this.values, this.isUpdated)) {
        return
      }

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.isUnique) {
          let filteredList = this.values.filter(i => i[item.modelProperty] === this.form[item.modelProperty] && !this.isUpdated && i.RecordState !== 4)
          if (filteredList.length > 0) {
            this.$toasted.show(this.$t('insert.sameRecordError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
        }
      }

      this.form.Deleted = 0
      this.form.System = 0
      this.form.RecordState = this.form.RecordId ? 3 : 2
      this.form.StatusId = this.form.StatusId ? this.form.StatusId : 1
      const model = Object.keys(this.model)

      for (let index = 0; index < model.length; index++) {
        let item = model[index]
        if (this.model[item]) {
          let key = item + 'Desc'
          let properties = this.items.filter(i => i.modelProperty === item)
          if (properties && properties.length === 1) {
            let property = properties[0]
            if (property.labelProperty) {
              this.form[key] = this.model[item][properties[0].labelProperty]
              if (this.form[properties[0].objectKey]) {
                this.form[properties[0].objectKey] = this.model[item][properties[0].labelProperty]
              }
            } else {
              this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
            }
            if (property.gridCustomOption) {
              let codeKey = item + 'Code'
              this.form[codeKey] = this.model[item]['Code']
            }
          } else {
            this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
          }
        }
      }
      if (this.hasLineNumber) {
        this.form.LineNumber = this.lineNumber
        this.lineNumber++
      }
      if (this.editForm) {
        this.form = this.editForm(this.form)
      }
      if (this.isUpdated) {
        this.values[this.selectedIndex] = {...this.form}
        this.selectedIndex = null
        this.isUpdated = false
      } else {
        this.values.push({...this.form})
      }
      this.$emit('valuechange', this.values)
      this.form = {}
      this.items.map(item => {
        if (item.defaultValue) {
          this.form[item.modelProperty] = item.defaultValue
        }
        if (item.createCode) {
          this.form[item.modelProperty] = this.createNewCode(item.modelProperty)
        }
      })

      this.model = {}
      this.label = {}
      this.$v.form.$reset()
      this.searchableItems = {}
      this.filteredValues = this.values
    },
    removeItem () {
      let data = this.selectedItem
      this.$bvModal.hide(`confirm-delete-modal${this.unique}`)

      if (this.changeValidation && !this.changeValidation(data)) {
        return
      }
      const index = this.values.indexOf(data)
      if (data.RecordId) {
        this.values[index].RecordState = 4
      } else {
        this.values.splice(index, 1)
      }
      this.$emit('valuechange', this.values)
      this.filteredValues = this.values
      this.searchableItems = {}
    },
    editItem () {
      let data = this.selectedItem
      this.$bvModal.hide(`confirm-edit-modal${this.unique}`)

      if (this.changeValidation && !this.changeValidation(data)) {
        return
      }
      this.form = {...data}
      this.isUpdated = true
      this.selectedIndex = this.values.indexOf(data)
      this.$set(this.form, 'RecordId', data.RecordId)
      this.items.map(i => {
        let labelProperty = ''
        let valueProperty = ''
        let model = {}
        switch (i.type) {
          case 'Autocomplete':
          case 'Dropdown':
            valueProperty = i.valueProperty ? i.valueProperty : 'RecordId'
            labelProperty = i.labelProperty ? i.labelProperty : 'Description1'
            model[valueProperty] = data[i.modelProperty]
            model[labelProperty] = this.getObjectLabel(i, data)
            if (i.isCustomer && valueProperty !== 'Code' && labelProperty !== 'Code' && !model.Code) {
              model.Code = data.CustomerCode
            }
            this.$set(this.model, i.modelProperty, model)
            this.additionalSearchTypeFirst = true
            this.additionalSearchType(i.id, i.modelProperty, this.model[i.modelProperty], i.valueProperty)
            break
          case 'Lookup':
            valueProperty = i.valueProperty ? i.valueProperty : 'DecimalValue'
            labelProperty = i.labelProperty ? i.labelProperty : 'Label'
            model[valueProperty] = data[i.modelProperty]
            model[labelProperty] = this.getObjectLabel(i, data)
            this.$set(this.model, i.modelProperty, model)
            this.additionalSearchTypeFirst = true
            this.additionalSearchType(i.id, i.modelProperty, this.model[i.modelProperty], i.valueProperty)
            break
          case 'Label':
            this.$set(this.label, i.modelProperty, data[i.modelProperty])
            break
          case 'Text':
          case 'Check':
          case 'Date':
            this.$set(this.form, i.modelProperty, data[i.modelProperty])
            break
        }

        if (i.objectKey && this.form[i.objectKey]) {
          delete this.form[i.objectKey]
        }
      })
    },
    successExcelImport (data) {
      if (data) {
        let list = []
        Object.keys(data).map(d => {
          let obj = data[d]
          let existIndex = this.form.CustomerGuarantees.findIndex(c => c.CustomerId === obj.CustomerId)
          if (existIndex > -1) {
            this.form.CustomerGuarantees.splice(existIndex, 1)
          }
          obj.RecordState = 2
          obj.StatusId = 1
          obj.Deleted = 0
          obj.System = 0
          obj.ApproveStateId = 51
          obj.CreditAmount = obj.CreditAmountCentral
          if (obj.Period) {
            obj.PaymentPeriod = obj.Period
          }
          obj.paymentPeriodO = this.getPaymentPeriodById(obj.Period)
          list.push(obj)
        })
        this.form.CustomerGuarantees = [...list, ...this.form.CustomerGuarantees]
      }
    },
    additionalSearchType (id, label, model, valueProperty) {
      if (model) {
        if (model[valueProperty]) {
          this.form[label] = model[valueProperty]
        } else {
          this.form[label] = model.RecordId ? model.RecordId : model.DecimalValue ? model.DecimalValue : model.Value
        }
        const filteredArr = this.items.filter(item => item.parentId === id)
        if (filteredArr) {
          filteredArr.map(item => {
            switch (item.type) {
              case 'Label':
                if (item.url) {
                  if (!model[item.parentProperty]) { return }
                  let request = {}
                  if (item.request) {
                    request = JSON.parse(item.request.replace('"val"', model[item.parentProperty]))
                  } else {
                    request = { RecordId: model[item.parentProperty] }
                  }
                  this.$api.postByUrl(request, item.url).then((res) => {
                    let value = null
                    if (res.Model) {
                      value = res.Model
                    } else if (res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
                      value = res.ListModel.BaseModels[0]
                    }
                    if (value) {
                      if (item.valueProperty) {
                        if (value[item.valueProperty] && value[item.valueProperty][item.modelProperty]) {
                          this.label[item.modelProperty] = value[item.valueProperty][item.modelProperty]
                        } else {
                          this.label[item.modelProperty] = value[item.valueProperty]
                        }
                      } else {
                        this.label[item.modelProperty] = value.Description1 ? value.Description1 : null
                      }
                    } else {
                      this.label[item.modelProperty] = null
                    }
                    this.$forceUpdate()
                  })
                } else {
                  this.label[item.modelProperty] = model[item.parentProperty] && model[item.parentProperty].Label
                    ? model[item.parentProperty].Label
                    : model[item.parentProperty]
                }
                break
              case 'Dropdown':
                if (this.additionalSearchTypeFirst) {
                  this.additionalSearchTypeFirst = false
                } else {
                  this.model[item.modelProperty] = {}
                  this.form[item.modelProperty] = null
                }
                if (item.url && item.request) {
                  let request = JSON.parse(item.request.replace('val', model[item.parentProperty]))
                  this.$api.postByUrl(request, item.url).then((res) => {
                    if (typeof res.ListModel !== 'undefined') {
                      this.source[item.modelProperty] = res.ListModel.BaseModels
                      if (item.firstElementSelected && this.source[item.modelProperty]) {
                        this.model[item.modelProperty] = this.source[item.modelProperty][0]
                        this.additionalSearchType(item.id, item.modelProperty, this.model[item.modelProperty], item.valueProperty)
                      }
                      this.$forceUpdate()
                    } else if (res.Values) {
                      this.source[item.modelProperty] = res.Values
                      this.$forceUpdate()
                    } else if (res.Model && item.responseProperty) {
                      this.source[item.modelProperty] = res.Model[item.responseProperty]
                      this.$forceUpdate()
                    }
                  })
                  this.$forceUpdate()
                }
                break
              case 'Autocomplete':
                item.dynamicRequest = JSON.parse(item.request.replace('val', model[item.parentProperty]))
                break
              case 'Text':
                this.form[item.modelProperty] = model[item.parentProperty]
                break
              default:
                break
            }
          })
        }
      } else {
        this.form[label] = null
        const filteredArr = this.items.filter(item => item.parentId === id)

        if (filteredArr) {
          filteredArr.map(item => {
            this.model[item.modelProperty] = {}
            this.form[item.modelProperty] = null
            this.source[item.modelProperty] = []
            this.label[item.modelProperty] = null
          })
        }
      }
    },
    isRequired (item) {
      if ((typeof item.required === 'function')) {
        let isRequired = item.required(this.form, this.mainForm)
        if (!isRequired) {
          if (this.form[item.modelProperty]) {
            this.$set(this.form, item.modelProperty, null)
          }
          if (this.model[item.modelProperty]) {
            this.$set(this.model, item.modelProperty, null)
            delete this.model[item.modelProperty]
          }
        }
        return isRequired
      }
      return item.required
    },
    isDisabled (item) {
      if ((typeof item.disabled === 'function')) {
        let isDisabled = item.disabled(this.form, this.mainForm)
        if (isDisabled) {
          if (this.form[item.modelProperty]) {
            this.$set(this.form, item.modelProperty, null)
          }
          if (this.model[item.modelProperty]) {
            this.$set(this.model, item.modelProperty, null)
            delete this.model[item.modelProperty]
          }
        }
        return isDisabled
      }
      return item.disabled
    },
    createNewCode (modelProperty) {
      let codes = this.values.map((item) => {
        return item ? item[modelProperty] : ''
      })
      return this.createUniqueCode(codes, 1)
    },
    createUniqueCode (codes, index) {
      let code = this.mainForm && this.mainForm.Code ? this.mainForm.Code : this.createCode
      let newCode = `${code}-${index}`

      if (codes.includes(newCode)) {
        return this.createUniqueCode(codes, (index + 1))
      } else {
        return newCode
      }
    },
    enterValue (id, model) {
      let filteredList = this.items.filter(i => i.parentId === id && i.sameValue && i.type === 'Text')
      filteredList.map(item => {
        this.form[item.modelProperty] = model
      })
    },
    getObjectLabel (item, obj) {
      let value = obj[item.modelProperty]
      if (item.objectKey && obj[item.objectKey]) {
        if (item.parentProperty && obj[item.objectKey][item.parentProperty] && obj[item.objectKey][item.parentProperty].Label) {
          value = obj[item.objectKey][item.parentProperty].Label
        } else if (obj[item.objectKey] && item.labelProperty && obj[item.objectKey][item.labelProperty]) {
          value = obj[item.objectKey][item.labelProperty]
        } else if (obj[item.objectKey][item.modelProperty]) {
          value = obj[item.objectKey][item.modelProperty]
        } else if (item.gridCustomOption) {
          value = obj[item.objectKey].Code + ' - ' + obj[item.objectKey].Label
        } else if (obj[item.objectKey].Label) {
          value = obj[item.objectKey].Label
        } else if (obj[item.objectKey].Description1) {
          value = obj[item.objectKey].Description1
        } else if (item.type === 'Label' && obj[item.modelProperty]) {
          value = obj[item.modelProperty]
        } else {
          value = obj[item.objectKey]
        }
      } else {
        let descKey = item.modelProperty + 'Desc'
        let codeKey = item.modelProperty + 'Code'
        if (item.type !== 'Label') {
          if (item.gridCustomOption) {
            value = obj[descKey] + ' - ' + obj[codeKey]
          } else {
            value = obj[descKey]
          }
        }
      }
      return value
    },
    getItemSearchable (modelProperty) {
      const filteredList = this.items.filter(i => i.modelProperty === modelProperty)
      return filteredList.length > 0 ? filteredList[0].searchable : false
    },
    filterList (value, modelProperty) {
      this.searchableItems = {}
      this.searchableItems[modelProperty] = value

      if (value) {
        const filteredArr = this.items.filter(i => i.modelProperty === modelProperty)
        if (filteredArr.length > 0) {
          const item = filteredArr[0]
          const lowerCaseValue = value.toLowerCase()

          this.filteredValues = this.values.filter(v => (v[item.modelProperty] && v[item.modelProperty].toString().toLowerCase().includes(lowerCaseValue)) ||
            (v[`${item.modelProperty}Desc`] && v[`${item.modelProperty}Desc`].toString().toLowerCase().includes(lowerCaseValue)) ||
            (item.objectKey && v[item.objectKey] &&
            ((item.labelProperty && v[item.objectKey][item.labelProperty] && v[item.objectKey][item.labelProperty].toString().toLowerCase().includes(lowerCaseValue)) ||
            (!item.labelProperty && v[item.objectKey].Label && v[item.objectKey].Label.toString().toLowerCase().includes(lowerCaseValue)))))
        }
      } else {
        this.filteredValues = this.values
      }
    }
  },
  validations () {
    let form = {}
    this.items.forEach(item => {
      form[item.modelProperty] = {
        required: requiredIf(function () {
          return this.isRequired(item)
        })
      }
    })
    return {
      form: form
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.values = newValue
          this.filteredValues = this.values
        }
      },
      deep: true,
      immediate: true
    },
    createCode (newValue) {
      if (newValue) {
        this.items.map(item => {
          if (item.createCode) {
            this.form[item.modelProperty] = this.createNewCode(item.modelProperty)
          }
        })
      }
    }
  }
}
</script>
<style>
.operations-button {
  font-size: 10px;
}
.detail-panel-table td {
 padding: 0px;
}
.detail-panel-data-view {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
</style>
