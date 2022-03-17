<template>
  <b-button class="mt-4" size="sm" variant="success"><i class="fas fa-file-excel"></i> {{name}}</b-button>
</template>
<script>
export default {
  name: 'AddDetailButton',
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
    this.name = this.title ? this.title : this.$t('insert.add')
  }
}
</script>
