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
      <b-form-datepicker v-else @input="input($event)" v-model="selectedValue" locale="tr" :disabled="disabled" :placeholder="$t('insert.chooseDate')"/>
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
    value: null,
    disabled: null,
    range: false
  },
  data () {
    return {
      selectedValue: null
    }
  },
  methods: {
    input (value) {
      let val = this.dateConvertToISo(value)
      this.$emit('input', val)
    }
  },
  watch: {
    selectedValue (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (!this.range) {
          newValue = this.dateConvertToISo(newValue)
        }
        this.$emit('valuechange', newValue)
      }
    },
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
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
