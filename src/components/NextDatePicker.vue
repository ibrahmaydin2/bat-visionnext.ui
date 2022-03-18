<template>
  <div>
    <date-picker
      v-if="range"
      class="range-date"
      range
      type="date"
      @input="input($event)"
      v-model="selectedValue"
      :placeholder="$t('insert.chooseDate')"
      format="YYYY-MM-DD"
      value-type="format"
      :disabled="disabled" ></date-picker>
      <b-form-datepicker :date-format-options="formatOption" v-else @input="input($event)" v-model="selectedValue" locale="tr" :disabled="disabled" :placeholder="$t('insert.chooseDate')"/>
  </div>
</template>
<script>
import mixin from '../mixins/index'
export default {
  name: 'NextDatePicker',
  mixins: [mixin],
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  props: {
    value: {
      type: String | Date,
      default: null,
      description: 'v-model bilgisi'
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Disabled bilgisi'
    },
    range: {
      type: Boolean,
      default: false,
      description: 'Tarih aralığı şeklinde görünüp görünmeme bilgisi'
    },
    formatOption: {
      type: Object,
      default: () => null,
      description: 'Tarih formatı bilgisi'
    }
  },
  data () {
    return {
      selectedValue: null,
      itemKey: null,
      defaultValues: ['first', 'last', 'today', 'firsttoday', 'todaylast']
    }
  },
  mounted () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.itemKey) {
      this.itemKey = this.$parent.$parent.itemKey
      this.setDefaultValue()
    }
  },
  methods: {
    input (value) {
      let val = this.dateConvertToISo(value)
      this.$emit('input', val)
    },
    setDefaultValue () {
      let defaultValue = null

      if (this.itemKey) {
        defaultValue = this.insertDefaultValue[this.itemKey]
      }

      if (!defaultValue) { return }

      let model = ''
      let today = new Date()
      let todayDate = new Date(today)
      let firstDayOfMonth = new Date(todayDate.setDate(1))
      let firstDate = new Date(firstDayOfMonth)
      let nextMonth = new Date(firstDate.setMonth(firstDate.getMonth() + 1))
      let lastDayOfMonth = new Date(nextMonth.setDate(0))
      switch (defaultValue) {
        case 'first':
          model = this.dateConvertToISo(firstDayOfMonth)
          break
        case 'last':
          model = this.dateConvertToISo(lastDayOfMonth)
          break
        case 'today':
          model = this.dateConvertToISo(today)
          break
        case 'firsttoday':
          model = this.dateConvertToISo(firstDayOfMonth)
          break
        case 'todaylast':
          model = this.dateConvertToISo(lastDayOfMonth)
          break
      }

      this.selectedValue = model
    }
  },
  watch: {
    selectedValue (newValue, oldValue) {
      if (newValue !== oldValue && !this.defaultValues.includes(newValue)) {
        if (!this.range) {
          newValue = this.dateConvertToISo(newValue)
        }
        this.$emit('valuechange', newValue)
      }
    },
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue && !this.defaultValues.includes(newValue)) {
          if (!this.range && newValue && newValue.includes && !newValue.includes('Z')) {
            newValue = `${newValue}Z`
          }
          this.selectedValue = newValue
        }
      },
      deep: true,
      immediate: true
    }
  }
}

</script>
<style>
.range-date {
  width: auto !important;
}
</style>
