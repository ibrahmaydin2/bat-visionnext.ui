<template>
<v-select
    :disabled="disabled" v-model="selectedValue" 
    :options="getSource()" @search="searchValue"
    @input="selectValue" :filterable="searchable ? false : true"
    :label="labelKey" :multiple="multiple"
    :reduce="getReduceFunc()">
    <template slot="no-options" v-if="searchable">
      {{$t('insert.min3')}}
    </template>
    <template #selected-option="option" v-if="customOption">
      <span v-if="isCustomer">{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isVehicle">{{option.Code + ' - ' + (option.VehiclePlateNumber ? option.VehiclePlateNumber : option.Description1) + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isEmployee">{{option.Code + ' - ' + (option.Name && option.Surname ? option.Name + ' ' + option.Surname : option.Description1)}}</span>
      <span v-else-if="isPrefix">{{option.Prefix + ' - ' + option.Year + ' ' + (option.EInvoiceType ? option.EInvoiceType.Label : '')}}</span>
      <div v-else-if="isCustomSlot">
        <slot name="selected-option" :option="option"></slot>
      </div>
      <span v-else-if="option.Code">{{option.Code + (option.Description1 ? ' - ' + option.Description1 : '')}}</span>
      <span v-else>{{option.Description1}}</span>
    </template>
    <template v-slot:option="option" v-if="customOption">
      <span v-if="isCustomer">{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isVehicle">{{option.Code + ' - ' + option.VehiclePlateNumber + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
      <span v-else-if="isEmployee">{{option.Code + ' - ' + option.Name + ' ' + option.Surname}}</span>
      <span v-else-if="isPrefix">{{option.Prefix + ' - ' + option.Year + ' ' + (option.EInvoiceType ? option.EInvoiceType.Label : '')}}</span>
      <div v-else-if="isCustomSlot">
        <slot name="option" :option="option"></slot>
      </div>
      <span v-else>{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
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
    value: {
      type: Object | Array,
      default: () => {},
      description: 'v-model bilgisi'
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Disabled bilgisi'
    },
    searchable: {
      type: Boolean,
      default: false,
      description: 'Dropdownın autocomplete olup olmama bilgisi'
    },
    onAfter: {
      type: Function,
      description: 'Dropdown için source bilgisi apiden alındığında çalışacak olan metod'
    },
    customOption: {
      type: Boolean,
      default: false,
      description: 'Gösterim şekli label dışında bir gösterim olacak ise kullanılır'
    },
    label: {
      type: String,
      default: 'Description1',
      description: 'Dropdownda görünen label bilgisi'
    },
    url: {
      type: String,
      default: '',
      description: 'Çağrılacak olan api url bilgisi'
    },
    lookupKey: {
      type: String,
      default: undefined,
      description: 'Dropdown lookup value ise çekilecek olan lookup ismi'
    },
    getLookup: {
      type: Boolean,
      default: false,
      description: 'Bu alan true ise lookup bilgisi için api isteğinde bulunur. Aksi durumda statedeki lookup objesinde arar'
    },
    dynamicAndCondition: {
      type: Object,
      default: () => {},
      description: 'Api çağrılırken andCondition bilgisi eklemek için kullanılır'
    },
    orConditionFields: {
      type: String,
      default: '',
      description: 'Autocompletede api çağrılırken orCondition da gönderilecek alanların virgül ile ayrılarak gönderilen bilgisi'
    },
    dynamicRequest: {
      type: Object,
      default: () => {},
      description: 'Api çağrılırken dinamik olarak oluşturulan request bilgisi'
    },
    dynamicOrConditions: {
      type: Array,
      description: 'Dinamik olarak gönderilecek orConditions bilgisi'
    },
    source: {
      type: Array,
      description: 'Manual olarak dropdowna liste verilmesini için kullanılır'
    },
    andConditionSearchField: {
      type: String,
      default: 'Description1',
      description: 'Autocompletede andConditiona gönderilecek alan bilgisi'
    },
    isCustomer: {
      type: Boolean,
      default: false,
      description: 'Müşteri dropdownı ise true setlenmelidir'
    },
    isEmployee: {
      type: Boolean,
      default: false,
      description: 'Çalışan dropdownı ise true setlenmelidir'
    },
    isVehicle: {
      type: Boolean,
      default: false,
      description: 'Araç dropdownı ise true setlenmelidir'
    },
    isPrefix: {
      type: Boolean,
      default: false,
      description: 'Prefix bilgisi var ise true setlenmelidir'
    },
    filter: {
      type: Function,
      description: 'Dropdown listesinin client-side filtrelenmesi için kullanılır'
    },
    search: {
      type: Function,
      description: 'Manual olarak search fonksiyonun verilebilmesini sağlar'
    },
    multiple: {
      type: Boolean,
      default: false,
      description: 'Çoklu seçim olup olmama bilgisi'
    },
    reduceValue: {
      type: String,
      default: null,
      description: 'v-modeli object olanlar için object içinden alınacak alanı belirler'
    },
    defaultValue: {
      type: Number,
      default: null,
      description: 'Varsayılan değer bilgisi'
    },
    isCustomSlot: {
      type: Boolean,
      default: false,
      description: 'option adındaki slot ile custom template verilmes sağlanır'
    },
    firstItemSelected: {
      type: Boolean,
      default: false,
      description: 'Listenin ilk elemanı varsayılan olarak seçili getirir'
    },
    pageCount: {
      type: Number,
      default: 50,
      description: 'Liste için atılan isteğin totalPageRecord bilgisi'
    },
    orderByColumns: {
      type: Array,
      description: 'Apiden listenin sıralı olarak çekilmesini sağlar'
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
        this.$nextTick(() => {
          this.selectedValue = newValue
        })
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
          if (source && source.length > 0) {
            this.setDefaultValue(source)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSelection(value) {
      this.$emit('selection-changed', value);
    },
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
      let orConditionModels = this.dynamicOrConditions && this.dynamicOrConditions.length > 0 ? [...this.dynamicOrConditions] : []
      if (search) {
        if (this.orConditionFields) {
          let fields = this.orConditionFields.split(',')
          let condition = {}
          fields.forEach(field => {
            condition[field] = search
          })
          orConditionModels.push(condition)
        } else {
          andConditionModel[this.andConditionSearchField] = search
        }
      }
      loading(true)
      let dynamicRequest = { ...this.dynamicRequest }
      if (dynamicRequest && dynamicRequest.andConditionModel) {
        delete dynamicRequest.andConditionModel
      }
      if (this.dynamicOrConditions && this.dynamicOrConditions.length > 0) {
        this.orConditionModels = [...orConditionModels, ...this.dynamicOrConditions]
      }
      this.andConditionModel = {...this.andConditionModel, ...this.dynamicAndCondition}
      let request = {
        andConditionModel: this.andConditionModel,
        orConditionModels: orConditionModels,
        ...dynamicRequest
      }

      if (this.orderByColumns) {
        request.OrderByColumns = this.orderByColumns
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

      if (this.orderByColumns) {
        request.OrderByColumns = this.orderByColumns
      }

      this.$api.postByUrl(request, this.url, this.pageCount).then((response) => {
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
    selectValue (selectedItem) {
      const selectedRecordId = selectedItem.RecordId;
      this.$emit('selected-record-id', selectedRecordId);
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
        let defaultValue = parseInt(this.insertDefaultValue[this.itemKey])
        this.findDefaultValue(defaultValue, source)
      } else if (this.defaultValue) {
        this.findDefaultValue(this.defaultValue, source)
      } else if (this.firstItemSelected && source.length > 0) {
        this.selectedValue = source[0]
        this.$emit('input', this.selectedValue)
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
    },
    resetSource () {
      this.values = []
    }
  }
}
</script>
<style lang="sass">
.vs__dropdown-toggle
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
</style>
