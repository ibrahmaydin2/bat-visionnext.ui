<template>
  <div>
    <b-form-timepicker
      v-if="type === 'dropdown'"
      :placeholder="$t('insert.chooseTime')"
      locale="tr-Tr"
      :label-no-time-selected="$t('insert.chooseTime')"
      :label-close-button="$t('insert.close')"
      close-button-variant="outline-danger"
      v-model="selectedValue"
      :disabled="disabled"
    />
    <b-input-group class="mb-3" v-else>
      <b-form-input
        id="text-input"
        v-model="selectedValue"
        type="text"
        placeholder="HH:mm"
        v-mask="'##:##'"
        :onkeypress="timeControl"
        :disabled="disabled"
      ></b-form-input>
      <b-input-group-append>
        <b-form-timepicker
        class="form-control"
          v-model="selectedValue"
          button-only
          right
          aria-controls="text-input"
          :placeholder="$t('insert.chooseTime')"
          locale="tr-Tr"
          :label-no-time-selected="$t('insert.chooseTime')"
          :label-close-button="$t('insert.close')"
          close-button-variant="outline-danger"
          :disabled="disabled"
        ></b-form-timepicker>
      </b-input-group-append>
    </b-input-group>
  </div>
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
    value: null,
    disabled: null,
    type: {
      type: String,
      validator: (prop) => [
        'dropdown',
        'textbox'
      ].includes(prop),
      default: 'dropdown'
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
<style scoped>
  .b-form-timepicker {
    margin-top: -1px !important;
  }
</style>
