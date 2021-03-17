<template>
  <div>
    <div v-if="!isError">
    </div>
    <div class="error-box" v-else>
      <span>{{$t('dashboard.isError')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextReport',
  props: ['RecordId'],
  data () {
    return {
      data: [],
      isError: false
    }
  },
  mounted () {
    this.$store.dispatch('getDashboardReportDetail', { ...this.query, id: this.RecordId }).then(res => {
      this.data = res.data
      if (this.data.length > 0) {
        this.isError = false
        console.log(this.data)
      } else {
        this.isError = true
      }
    })
  }
}

</script>
