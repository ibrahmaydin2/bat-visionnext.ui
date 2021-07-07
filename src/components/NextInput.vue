<template>
  <b-form-input :type="type" :readonly="disabled" v-model="selectedValue" @input="input" @keypress="keypress($event)" :oninput="oninput"/>
</template>
<script>
export default {
  name: 'NextInput',
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  props: {
    value: null,
    disabled: null,
    type: {
      type: String,
      default: 'text'
    },
    oninput: null
  },
  data () {
    return {
      selectedValue: null
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    keypress (value) {
      this.$emit('keypress', value)
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
