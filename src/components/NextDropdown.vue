<template>
  <v-select :disabled="disabled" v-model="selectedValue" :options="lookupKey && !getLookup ? lookup[lookupKey] : values" @search="searchValue" @input="selectValue($event)" :filterable="false" :label="labelKey">
    <template slot="no-options" v-if="searchable">
      {{$t('insert.min3')}}
    </template>
    <template v-slot:option="option" v-if="customOption">
      {{option.Code + ' - ' + option.Description1}}
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
      labelKey: ''
    }
  },
  mounted () {
    this.labelKey = this.label
    if (this.lookupKey) {
      this.labelKey = 'Label'
      if (this.getLookup) {
        this.getLookupValues()
      }
    } else if (!this.searchable) {
      this.getValues()
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
    source (newValue) {
      if (newValue && newValue.length > 0) {
        this.values = newValue
      }
    },
    allValues (newValue) {
      this.$emit('all-source', newValue)
    }
  },
  methods: {
    searchValue (search, loading) {
      if (!this.searchable || search.length < 3 || !this.url) {
        return false
      }
      let pagerecordCount = 1000
      if (search === '%%%') {
        search = undefined
        pagerecordCount = 20
      } else if ((typeof search === 'string' || search instanceof String) && search.includes('%')) {
        search = search.replaceAll('%', '')
        pagerecordCount = 20
      }
      let andConditionModel = this.dynamicAndCondition ? this.dynamicAndCondition : {}
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
          andConditionModel.Description1 = search
        }
      }
      loading(true)
      this.$api.postByUrl({andConditionModel: andConditionModel, orConditionModels: orConditionModels}, this.url, pagerecordCount).then((response) => {
        loading(false)
        this.$store.commit('bigLoaded', false)
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
      this.$api.postByUrl(request, this.url).then((response) => {
        if (response) {
          if (response.ListModel) {
            this.values = response.ListModel.BaseModels
          } else if (response.Values) {
            this.values = response.Values
          }
          this.allValues = this.values
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
        return
      }
      this.$api.postByUrl({LookupTableCode: this.lookupKey}, 'VisionNextCommonApi/api/LookupValue/GetValues').then((response) => {
        if (response) {
          this.values = response.Values
          this.allValues = this.values
          this.$store.commit('setSingleLookUp', {key: this.lookupKey, value: this.values})
        }
      })
    }
  }
}
</script>