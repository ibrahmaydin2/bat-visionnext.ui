<template>
  <v-select :disabled="disabled" v-model="selectedValue" :options="values" @search="searchValue" @input="selectValue($event)" :filterable="false" :label="label">
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
  name: 'NextAddress',
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
    dynamicAndCondition: {},
    orConditionFields: {}
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      values: [],
      selectedValue: undefined
    }
  },
  mounted () {
    if (!this.searchable) {
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
    }
  },
  methods: {
    searchValue (search, loading) {
      if (!this.searchable || search.length < 3) {
        return false
      }
      let andConditionModel = this.dynamicAndCondition ? this.dynamicAndCondition : {}
      let orConditionModels = []
      let orConditionModel = {}
      if (this.orConditionFields) {
        let fields = this.orConditionFields.split(',')
        fields.forEach(field => {
          orConditionModel[field] = search
        })
        orConditionModels = [orConditionModel]
      } else {
        andConditionModel.Description1 = search
      }
      loading(true)
      this.$api.postByUrl({andConditionModel: andConditionModel, orConditionModels: orConditionModels}, this.url).then((response) => {
        loading(false)
        if (response && response.ListModel) {
          this.values = response.ListModel.BaseModels
        }
      })
    },
    getValues () {
      let andConditionModel = {
        ...this.dynamicAndCondition
      }
      this.$api.postByUrl({andConditionModel: andConditionModel}, this.url).then((response) => {
        if (response && response.ListModel) {
          this.values = response.ListModel.BaseModels
        }
      })
    },
    selectValue (value) {
      this.$emit('input', value)
    }
  }
}

</script>
