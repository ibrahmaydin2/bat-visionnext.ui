<template>
    <b-form-checkbox v-model="model" name="check-button" :switch="toggle" :disabled="disabled">
      <span v-if="showText">{{model ? textActive : textPassive}}</span>
    </b-form-checkbox>
</template>
<script>
export default {
  name: 'NextCheckBox',
  props: {
    type: {
      type: String,
      validator: (prop) => [
        'boolean',
        'number'
      ].includes(prop),
      default: 'boolean'
    },
    activeText: String,
    passiveText: String,
    value: {
      type: Number | Boolean
    },
    toggle: Boolean,
    disabled: Boolean,
    showText: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      textActive: '',
      textPassive: '',
      model: false,
      selectedValue: null
    }
  },
  mounted () {
    this.textActive = this.activeText ? this.activeText : this.$t('insert.active')
    this.textPassive = this.passiveText ? this.passiveText : this.$t('insert.passive')
    this.model = this.type === 'boolean' ? this.value : this.value === 1 || this.value === true
    if (this.type === 'number') {
      this.selectedValue = this.value === true || this.value === 1 ? 1 : 0
      this.$emit('valuechange', this.selectedValue)
    }
  },
  watch: {
    model (newValue) {
      let val = this.type === 'boolean' ? newValue : newValue ? 1 : 0
      if (val !== this.value) {
        this.$emit('valuechange', val)
      }
    },
    value (newValue) {
      let val = this.type === 'boolean' ? newValue : newValue === 1 || this.value === true
      if (val !== this.model) {
        this.model = val
      }
    }
  }
}

</script>
