<template>
  <b-button id="submitButton" class="mt-4" size="sm" variant="success"><i class="fa fa-download"></i> {{name}}</b-button>
</template>
<script>
export default {
  name: 'DownloadButton',
  data () {
    return {
      name: null
    }
  },
  props: {
    title: {
      type: String,
      default: null,
      description: 'Buton title bilgisi'
    }
  },
  mounted () {
    // this.name = this.title ? this.title : this.$t('insert.downloadButton')
    this.name = this.title ? this.title : ''
  }
}
</script>
