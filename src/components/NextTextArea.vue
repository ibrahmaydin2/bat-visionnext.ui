<template>
  <b-form-textarea :readonly="disabled" v-model="selectedValue" />
</template>
<script>
export default {
  name: 'NextTextArea',
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
