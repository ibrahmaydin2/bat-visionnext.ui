<template>
  <v-select
    :disabled="disabled" v-model="selectedValue"
    :options="getSource()" @search="searchValue"
    @input="selectValue($event)" :filterable="searchable ? false : true"
    :label="labelKey" :multiple="multiple"
    :reduce="getReduceFunc()">
    <template slot="no-options" v-if="searchable">
      {{$t('insert.min3')}}
    </template>
    <template v-slot:option="option" v-if="customOption">
      <span v-if="isCustomer">{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isVehicle">{{option.Code + ' - ' + option.VehiclePlateNumber + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isEmployee">{{option.Code + ' - ' + option.Name + ' ' + option.Surname}}</span>
      <div v-else-if="isCustomSlot">
        <slot name="option" :option="option"></slot>
      </div>
      <span v-else>{{option.Code + ' - ' + option.Description1}}</span>
    </template>
  </v-select>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../mixins/index'
export default {
  name: 'NextDropdown',
  mixins: [mixin],
  props: {
    value: {},
    disabled: null,
    searchable: {
      type: Boolean,
      default: false
    },
    onAfter: {
      type: Function
    },
    customOption: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Description1'
    },
    url: {
      type: String
    },
    lookupKey: {
      type: String,
      default: undefined
    },
    getLookup: {
      type: Boolean,
      default: false
    },
    dynamicAndCondition: {},
    orConditionFields: {},
    dynamicRequest: {},
    source: {
      type: Array
    },
    andConditionSearchField: {
      type: String,
      default: 'Description1'
    },
    isCustomer: {
      type: Boolean,
      default: false
    },
    isEmployee: {
      type: Boolean,
      default: false
    },
    isVehicle: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function
    },
    search: {
      type: Function
    },
    multiple: {
      type: Boolean,
      default: false
    },
    reduceValue: {
      type: String,
      default: null
    },
    defaultValue: {
      type: Number,
      default: null
    },
    isCustomSlot: {
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
      values: [],
      allValues: [],
      selectedValue: undefined,
      labelKey: '',
      labelObjectKey: null,
      itemKey: null
    }
  },
  mounted () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.itemKey) {
      this.itemKey = this.$parent.$parent.itemKey
    }
    this.labelKey = this.label
    if (this.lookupKey) {
      this.labelKey = 'Label'
      if (this.getLookup) {
        this.getLookupValues()
      } else if (this.lookup[this.lookupKey]) {
        this.setDefaultValue(this.lookup[this.lookupKey])
      }
    } else if (!this.searchable) {
      if (this.labelKey.includes('.')) {
        let keys = this.labelKey.split('.')
        if (keys && keys.length === 2) {
          this.labelObjectKey = keys[0]
          this.labelKey = keys[1]
        }
      }
      this.getValues()
    } else if (this.source && this.source.length > 0) {
      this.setDefaultValue(this.source)
    }
  },
  computed: {
    ...mapState(['lookup'])
  },
  watch: {
    selectedValue (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('valuechange', newValue)
      }
    },
    value (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectedValue = newValue
      }
    },
    source: {
      handler (newValue) {
        if (newValue && newValue.length > 0) {
          this.values = newValue
        } else {
          this.values = []
        }
      },
      deep: true,
      immediate: true
    },
    allValues (newValue) {
      this.$emit('all-source', newValue)
    },
    lookup: {
      handler (newValue) {
        if (newValue) {
          let source = this.getSource()
          this.setDefaultValue(source)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    searchValue (search, loading) {
      if (!this.searchable || search.length < 3 || (!this.url && !this.search)) {
        return false
      }
      let pagerecordCount = 10
      if (search === '%%%') {
        search = undefined
      } else if ((typeof search === 'string' || search instanceof String) && search.includes('%')) {
        search = search.replaceAll('%', '')
      }
      if (this.search) {
        loading(true)
        this.search(search).then((list) => {
          loading(false)
          this.values = list
          this.allValues = this.values
        })
        return
      }

      let andConditionModel = {
        ...this.dynamicAndCondition,
        ...this.dynamicRequest ? this.dynamicRequest.andConditionModel : {}
      }
      let orConditionModels = []
      let orConditionModel = {}
      if (search) {
        if (this.orConditionFields) {
          let fields = this.orConditionFields.split(',')
          fields.forEach(field => {
            orConditionModel[field] = search
          })
          orConditionModels = [orConditionModel]
        } else {
          andConditionModel[this.andConditionSearchField] = search
        }
      }
      loading(true)
      let dynamicRequest = { ...this.dynamicRequest }
      if (dynamicRequest && dynamicRequest.andConditionModel) {
        delete dynamicRequest.andConditionModel
      }
      let request = {
        andConditionModel: andConditionModel,
        orConditionModels: orConditionModels,
        ...dynamicRequest
      }
      this.$api.postByUrl(request, this.url, pagerecordCount).then((response) => {
        loading(false)
        if (response && response.ListModel) {
          this.values = response.ListModel.BaseModels
          this.allValues = this.values
        }
      })
    },
    getValues () {
      if (!this.url) {
        return
      }
      let request = {
        ...this.dynamicRequest,
        andConditionModel: {
          ...this.dynamicAndCondition
        }
      }
      this.$api.postByUrl(request, this.url, 50).then((response) => {
        if (response) {
          if (response.ListModel) {
            this.values = response.ListModel.BaseModels
          } else if (response.Values) {
            this.values = response.Values
          } else if (response.Model) {
            this.values = response.Model
          } else if (response.length > 0) {
            this.values = response
          }

          if (this.filter) {
            this.values = this.values.filter(i => this.filter(i))
          }
          if (this.onAfter) {
            this.onAfter(response)
          }

          if (this.labelObjectKey) {
            this.values = this.values.map((item) => {
              item[this.labelKey] = item[this.labelObjectKey] ? item[this.labelObjectKey][this.labelKey] : ''
              return item
            })
          }

          this.allValues = this.values
          this.setDefaultValue(this.allValues)
        }
      })
    },
    selectValue (value) {
      this.$emit('input', value)
    },
    getLookupValues () {
      let lookupValue = this.lookup[this.lookupKey]
      if (lookupValue && lookupValue.length > 0) {
        this.values = lookupValue
        this.allValues = this.values
        this.setDefaultValue(this.values)
        return
      }
      let random = Math.random()
      this.$api.postByUrl({LookupTableCode: this.lookupKey}, `VisionNextCommonApi/api/LookupValue/GetValues?v=${random}`).then((response) => {
        if (response) {
          this.values = response.Values
          if (this.filter) {
            this.values = this.values.filter(i => this.filter(i))
            this.setDefaultValue(this.values)
          }
          this.allValues = this.values
        }
      })
    },
    getSource () {
      let values = []
      if (this.lookupKey && !this.getLookup) {
        values = this.lookup[this.lookupKey]
        this.allValues = values
      } else {
        values = this.values
      }

      return values
    },
    setDefaultValue (source) {
      if (this.itemKey && (this.insertDefaultValue[this.itemKey] || this.insertDefaultValue[this.itemKey] === 0) && !this.selectedValue && source) {
        let defaultValue = this.insertDefaultValue[this.itemKey]
        this.findDefaultValue(defaultValue, source)
      } else if (this.defaultValue) {
        this.findDefaultValue(this.defaultValue, source)
      }
    },
    findDefaultValue (defaultValue, source) {
      let filteredList = source.filter(s => s.RecordId === defaultValue || s.DecimalValue === defaultValue)
      if (filteredList && filteredList.length > 0) {
        this.selectedValue = filteredList[0]
      }
    },
    getReduceFunc () {
      if (this.reduceValue) {
        return (item) => item[this.reduceValue]
      } else {
        return (item) => item
      }
    }
  }
}
</script>
