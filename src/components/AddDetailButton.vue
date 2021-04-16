<template>
  <b-button id="submitButton" class="mt-4" size="sm" variant="success"><i class="fa fa-plus"></i> {{name}}</b-button>
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
      default: null
    }
  },
  mounted () {
    this.name = this.title ? this.title : this.$t('insert.add')
  }
}
</script>
