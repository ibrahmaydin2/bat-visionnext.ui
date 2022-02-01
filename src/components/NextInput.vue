<template>
  <b-form-input
    :type="type"
    :readonly="disabled"
    v-model="selectedValue"
    @input="input"
    @keypress="keypress($event)"
    :oninput="oninput"
    :maxLength="maxLength"
    :min="minLength"
    :class="inputClass"
    :placeholder="placeholder"
    @keyup.enter="keyupEnter"/>
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
    oninput: null,
    maxLength: '',
    inputClass: '',
    minLength: '',
    placeholder: ''
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
    },
    keyupEnter (value) {
      this.$emit('enter', value)
    }
  },
  watch: {
    selectedValue (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('valuechange', newValue)
      }
    },
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.selectedValue = newValue
        }
      },
      deep: true,
      immediate: true
    }
  }
}

</script>
