<template>
  <b-button id="submitButton" size="sm" variant="success">{{name}}</b-button>
</template>
<script>
export default {
  name: 'AddButton',
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
    this.name = this.title ? this.title : this.$t('header.save')
  }
}

</script>
