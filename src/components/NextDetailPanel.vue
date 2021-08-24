<template>
  <div>
    <b-row v-if="editable">
      <NextFormGroup v-for="(item,i) in (items ? items.filter(i => i.visible === true): [])" :key="i" :title="item.label" :required="isRequired(item)" :error="isRequired(item) ? $v.form[item.modelProperty] : {}">
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Autocomplete'" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :searchable="true" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :label="item.labelProperty ? item.labelProperty : 'Description1'" :custom-option="item.customOption" :is-customer="item.isCustomer" :or-condition-fields="item.orConditionFields"/>
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && !item.parentId" :url="item.url" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :filter="item.filter" :custom-option="item.customOption" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && item.parentId" :source="source[item.modelProperty]" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Lookup'" :lookup-key="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :get-lookup="true" :label="item.labelProperty ? item.labelProperty : 'Label'" :filter="item.filter" />
        <NextInput v-model="label[item.modelProperty]" v-if="item.type === 'Label'" :type="item.inputType" :readonly="isDisabled(item)" />
        <NextInput v-model="form[item.modelProperty]" v-if="item.type === 'Text'" :type="item.inputType" :readonly="isDisabled(item)" @input="enterValue(item.id, $event)" :maxLength="item.maxLength" :oninput="item.isPostCode ? postCodeControl : maxLengthControl" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Check'" type="number" toggle :disabled="isDisabled(item)" />
        <NextDatePicker v-model="form[item.modelProperty]" v-if="item.type === 'Date'" :disabled="isDisabled(item)" />
      </NextFormGroup>
      <b-col cols="12" md="2">
        <b-form-group>
          <AddDetailButton v-if="!isUpdated" @click.native="addItems()" />
          <b-button v-if="isUpdated" class="mt-4" size="sm" variant="success" @click="addItems()">
            <i class="fa fa-pencil-alt"></i> {{$t('insert.edit')}}
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        :id="id"
        :fields="fields"
        :items="values ? values.filter(i => i.RecordState !== 4) : []"
        bordered
        responsive
        :current-page="currentPage"
        :per-page="10">
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
        <template #cell(operations)="data">
          <i v-if="showEdit && editable" @click="editItem(data.item)" class="fa fa-pencil-alt text-warning"></i>
          <i v-if="editable" @click="removeItem(data)" class="far fa-trash-alt text-danger ml-3"></i>
          <i v-if="getDetail" @click="getDetail(data.item)" :title="$t('get.detail')" class="ml-3 fa fa-arrow-down text-success"></i>
          <i v-for="(detail,i) in detailButtons" :key="i" @click="detail.getDetail(data.item)" :title="detail.title" :class="`ml-3 text-success ${detail.icon}`"></i>
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
        :total-rows="values ? values.length : 0"
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
      }
    },
    type: {
      type: String,
      default: 'insert'
    },
    hasDetail: {
      type: Boolean,
      default: false
    },
    detailButtonText: {
      type: String,
      default: 'Detay'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    hasLineNumber: {
      type: Boolean,
      default: false
    },
    beforeAdd: {
      type: Function
    },
    getDetail: {
      type: Function
    },
    detailButtons: {
      type: Array
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    hideOperations: {
      type: Boolean,
      default: false
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
      objectTypes: ['Autocomplete', 'Dropdown', 'Lookup', 'Label'],
      editable: this.type === 'insert' || this.type === 'update',
      lineNumber: 1,
      currentPage: 1,
      id: Math.random().toString(36).substring(2),
      selectedIndex: null,
      isUpdated: false
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
            label: item.label,
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
          label: this.$t('list.operations')
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

      if (this.beforeAdd && !this.beforeAdd(this.form, this.values)) {
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
          if (properties && properties.length === 1 && properties[0].labelProperty) {
            this.form[key] = this.model[item][properties[0].labelProperty]
          } else {
            this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
          }
        }
      }
      if (this.hasLineNumber) {
        this.form.LineNumber = this.lineNumber
        this.lineNumber++
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
    },
    removeItem (data) {
      const item = data.item
      const index = this.values.indexOf(data.item)
      if (item.RecordId) {
        this.values[index].RecordState = 4
      } else {
        this.values.splice(index, 1)
      }
      this.$emit('valuechange', this.values)
    },
    editItem (data) {
      this.form = data
      this.isUpdated = true
      this.selectedIndex = this.values.indexOf(data)
      this.$set(this.form, 'RecordId', data.RecordId)
      this.items.map(i => {
        switch (i.type) {
          case 'AutoComplete':
          case 'Dropdown':
            this.$set(this.model, i.modelProperty, {
              RecordId: data[i.modelProperty],
              Description1: this.getObjectLabel(i, data)
            })
            this.additionalSearchType(i.id, i.modelProperty, this.model[i.modelProperty], i.valueProperty)
            break
          case 'Lookup':
            this.$set(this.model, i.modelProperty, {
              DecimalValue: data[i.modelProperty],
              Label: this.getObjectLabel(i, data)
            })
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
      })
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
                  this.$api.postByUrl({RecordId: model[item.parentProperty]}, item.url).then((res) => {
                    if (res && res.Model) {
                      if (item.valueProperty) {
                        this.label[item.modelProperty] = res.Model[item.valueProperty]
                      } else {
                        this.label[item.modelProperty] = res.Model.Description1 ? res.Model.Description1 : null
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
                this.model[item.modelProperty] = {}
                this.form[item.modelProperty] = null
                if (item.url && item.request) {
                  let request = JSON.parse(item.request.replace('val', model[item.parentProperty]))
                  this.$api.postByUrl(request, item.url).then((res) => {
                    if (typeof res.ListModel !== 'undefined') {
                      this.source[item.modelProperty] = res.ListModel.BaseModels
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
        let isRequired = item.required(this.form)
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
        let isDisabled = item.disabled(this.form)
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
      let newCode = `${this.createCode}-${index}`

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
        if (item.type !== 'Label') {
          value = obj[item.modelProperty + 'Desc']
        }
      }

      return value
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
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
