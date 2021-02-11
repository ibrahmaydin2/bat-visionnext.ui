<template>
    <b-form-checkbox v-model="model" name="check-button" :switch="toggle">
      {{model ? textActive : textPassive}}
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
      type: [Boolean, Number]
    },
    toggle: Boolean
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      textActive: '',
      textPassive: '',
      model: false
    }
  },
  mounted () {
    this.textActive = this.activeText ? this.activeText : this.$t('insert.active')
    this.textPassive = this.passiveText ? this.passiveText : this.$t('insert.passive')
    this.model = this.type === 'boolean' ? this.value : this.value === 1 || this.value === true
  },
  watch: {
    model (newValue) {
      let val = this.type === 'boolean' ? newValue : newValue ? 1 : 0
      if (val !== this.value) {
        this.$emit('valuechange', val)
      }
    },
    value (newValue) {
      let val = this.type === 'boolean' ? newValue : newValue === 1
      if (val !== this.model) {
        this.model = val
      }
    }
  }
}

</script>
