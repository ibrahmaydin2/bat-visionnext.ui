<template>
  <div>
    <b-form-checkbox :class="inputClass" v-if="inputType === 'Boolean'" v-model="model" name="check-button" :switch="toggle" :disabled="disabled" @input="input($event)">
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
      default: 'boolean',
      description: 'Modelin number veya boolean olarak geri dönüşünü sağlar'
    },
    activeText: {
      type: String,
      default: '',
      description: 'Checkbox seçili olduğunda çıkan yazı bilgisi'
    },
    passiveText: {
      type: String,
      default: '',
      description: 'Checkbox seçili olmadığında çıkan yazı bilgisi'
    },
    value: {
      type: Number | Boolean,
      description: 'v-model bilgisi'
    },
    toggle: {
      type: Boolean,
      default: false,
      description: 'Toggle şeklinde görünüp görünmeme bilgisi'
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Disabled bilgisi'
    },
    showText: {
      type: Boolean,
      default: true,
      description: 'Checkboxın abel bilgisinin görünürlüğü bilgisi'
    },
    radio: {
      type: Boolean,
      default: false,
      description: 'radio button şeklinde görünüp görünmeme bilgisi'
    },
    inputClass: {
      type: String,
      default: '',
      description: 'Checkbox inputunun css class bilgisi'
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
        this.selectedValue = this.value === true || this.value === 1 ? 1 : 2
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
        val = this.type === 'boolean' ? newValue : newValue ? 1 : 2
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
