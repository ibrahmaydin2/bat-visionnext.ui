<template>
  <b-form-textarea :readonly="disabled" v-model="selectedValue" :rows="rows" max-rows="6"/>
</template>
<script>
export default {
  name: 'NextTextArea',
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  props: {
    value: {
      type: String,
      description: 'v-model bilgisi'
    },
    disabled: {
      type: Boolean,
      description: 'Disabled bilgisi'
    },
    rows: {
      type: Number,
      default: 2,
      description: 'Textarea görünen satır sayısı bilgisi'
    }
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
