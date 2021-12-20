<template>
  <date-range-picker
    ref="dateRangePicker"
    :singleDatePicker="!range"
    :timePicker="timePicker"
    :timePicker24Hour="true"
    :showWeekNumbers="true"
    :showDropdowns="true"
    :ranges="false"
    :autoApply="false"
    :readonly="disabled"
    :date-range="selectedValue"
    :linkedCalendars="true"
    :time-picker-increment="1">
    <template v-slot:input="picker" style="min-width: 350px;">
      <span v-if="range">{{ picker.startDate | date(timePicker) }} - {{ picker.endDate | date(timePicker) }}</span>
      <span v-else>{{ picker.startDate | date(timePicker)}}</span>
    </template>
  </date-range-picker>
</template>
<script>
import mixin from '../mixins/index'
export default {
  name: 'NextDatePicker2',
  mixins: [mixin],
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  props: {
    value: null,
    disabled: null,
    range: false,
    timePicker: false
  },
  data () {
    return {
      selectedValue: {},
      localData: null,
      en: {
        direction: 'ltr',
        format: 'mm/dd/yyyy',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 1
      },
      tr: {
        direction: 'ltr',
        format: 'mm/dd/yyyy',
        separator: ' - ',
        applyLabel: 'Seç',
        cancelLabel: 'İptal',
        weekLabel: 'H',
        customRangeLabel: 'Özel Aralık',
        daysOfWeek: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        firstDay: 1,
        today: 'Bugün'
      }
    }
  },
  mounted () {
    let lang = localStorage.getItem('selectedLang')
    this.$refs.dateRangePicker.locale = lang === 'en' ? this.en : this.tr
  },
  methods: {
    input (value) {
      let val = ''
      if (!this.range) {
        val = value && value.startDate
      } else {
        val = {
          startDate: value && value.startDate,
          endDate: value && value.endDate
        }
      }
      this.$emit('valuechange', val)
      this.$emit('input', val)
    }
  },
  filters: {
    date (value, timePicker) {
      if (value) {
        return timePicker ? `${value.toLocaleDateString()} ${value.toLocaleTimeString().slice(0, 5)}` : value.toLocaleDateString()
      }
      return ''
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        let val = ''
        if (newValue !== oldValue) {
          if (!this.range) {
            val = {
              startDate: newValue,
              endDate: newValue
            }
          } else {
            val = newValue
          }
          this.selectedValue = val
        }
      },
      deep: true,
      immediate: true
    }
  }
}

</script>
<style>
.vue-daterange-picker {
  width: 100% !important;
}
.daterangepicker {
  min-width: 295px !important;
}
</style>
