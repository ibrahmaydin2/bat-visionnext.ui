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
    @keyup.enter="keyupEnter"
    :style="inputStyle"
    @focus="onFocus"/>
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
    disabled: {
      type: Boolean,
      default: false,
      descripton: 'Disabled bilgisi'
    },
    type: {
      type: String,
      default: 'text',
      descripton: 'Input tipi bilgisi'
    },
    oninput: {
      type: String,
      descripton: 'oninput function bilgisi'
    },
    maxLength: {
      type: String | Number,
      descripton: 'inputun maxLength bilgisi'
    },
    inputClass: {
      type: String,
      default: '',
      descripton: 'inputun css class bilgisi'
    },
    minLength: {
      type: String | Number,
      default: '',
      descripton: 'inputun minLength bilgisi'
    },
    placeholder: {
      type: String,
      default: '',
      descripton: 'inputun placeholder bilgisi'
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {}
      },
      descripton: 'Input style bilgisi'
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
    },
    keypress (value) {
      this.$emit('keypress', value)
    },
    keyupEnter (value) {
      this.$emit('enter', value)
    },
    onFocus (value) {
      this.$emit('onFocus', value)
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
