<template>
  <div>
    <b-form-checkbox v-if="inputType === 'Boolean'" v-model="model" name="check-button" :switch="toggle" :disabled="disabled" @input="input($event)">
      <span v-if="showText">{{model ? textActive : textPassive}}</span>
    </b-form-checkbox>
    <b-form-radio-group
        v-if="inputType === 'Radio'"
        v-model="model"
        :options="options"
        :disabled="disabled"
        @input="input($event)"
      ></b-form-radio-group>
  </div>
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
    },
    radio: Boolean
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
      selectedValue: null,
      options: [],
      inputType: 'Boolean'
    }
  },
  mounted () {
    if (this.$parent && this.$parent.$parent && this.$parent.$parent.itemKey) {
      let itemKey = this.$parent.$parent.itemKey
      let insertColumnType = this.$store.state.insertColumnType
      if (insertColumnType && insertColumnType[itemKey]) {
        this.inputType = insertColumnType[itemKey]
      }
    }
    if (this.radio) {
      this.inputType = 'Radio'
    }
    this.textActive = this.activeText ? this.activeText : this.$t('insert.active')
    this.textPassive = this.passiveText ? this.passiveText : this.$t('insert.passive')
    this.options = [
      { text: this.$t('insert.yes'), value: 1 },
      { text: this.$t('insert.no'), value: 0 }
    ]
    if (this.inputType === 'Boolean') {
      this.model = this.type === 'boolean' ? this.value : this.value === 1 || this.value === true
      if (this.type === 'number') {
        this.selectedValue = this.value === true || this.value === 1 ? 1 : 0
        this.$emit('valuechange', this.selectedValue)
      }
    } else {
      this.model = this.value
    }
  },
  watch: {
    model (newValue) {
      let val = null
      if (this.inputType === 'Boolean') {
        val = this.type === 'boolean' ? newValue : newValue ? 1 : 0
      } else {
        val = newValue
      }
      if (val !== this.value) {
        this.$emit('valuechange', val)
      }
    },
    value (newValue) {
      let val = null
      if (this.inputType === 'Boolean') {
        val = this.type === 'boolean' ? newValue : newValue === 1 || this.value === true
      } else {
        val = newValue
      }
      if (val !== this.model) {
        this.model = val
      }
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}

</script>
