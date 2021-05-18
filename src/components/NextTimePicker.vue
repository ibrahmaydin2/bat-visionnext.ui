<template>
  <b-form-timepicker
    :placeholder="$t('insert.chooseTime')"
    locale="tr-Tr"
    :label-no-time-selected="$t('insert.chooseTime')"
    :label-close-button="$t('insert.close')"
    close-button-variant="outline-danger"
    v-model="selectedValue"
    :disabled="disabled"
  />
</template>
<script>
import mixin from '../mixins/index'
export default {
  name: 'NextTimePicker',
  mixins: [mixin],
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  props: {
    disabled: null
  },
  data () {
    return {
      selectedValue: null
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
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
  }
}

</script>
