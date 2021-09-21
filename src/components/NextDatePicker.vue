<template>
  <b-form-datepicker @input="input($event)" v-model="selectedValue" locale="tr" :disabled="disabled" :placeholder="$t('insert.chooseDate')"/>
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
    disabled: null
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
        newValue = this.dateConvertToISo(newValue)
        this.$emit('valuechange', newValue)
      }
    },
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue && !newValue.includes('Z')) {
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
