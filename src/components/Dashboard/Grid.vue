<template>
  <b-overlay :show="bigLoading" rounded="sm" spinner-variant="warning">
    <template #overlay>
      <b-icon
        icon="three-dots"
        animation="cylon"
        scale="8"
        variant="warning"
      ></b-icon>
    </template>
    <div v-if="!isError">
      <b-table striped hover :items="data" :fields="fields">
        <template #cell()="data">
          <span class="table-span" v-html="data.value"></span>
        </template>
      </b-table>
    </div>
    <div class="error-box" v-else>
      <span>{{$t('dashboard.isError')}}</span>
    </div>
  </b-overlay>
</template>
<script>
export default {
  name: 'Chart',
  props: ['RecordId'],
  data () {
    return {
      data: [],
      fields: null,
      isError: false,
      bigLoading: true
    }
  },
  mounted () {
    this.$store.dispatch('getDashboardReportDetail', { ...this.query, id: this.RecordId }).then(res => {
      this.bigLoading = false
      if (res.data.length > 0) {
        this.isError = false
        this.data = res.data
        if (!this.fields) {
          this.fields = Object.keys(this.data[0])
        }
      } else {
        this.isError = true
      }
    })
  }
}

</script>
