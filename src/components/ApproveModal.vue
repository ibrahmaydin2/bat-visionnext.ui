<template>
  <b-row class="asc__modal-approveModal-add">
    <b-col cols="12">
      <b-form-group>
        <b-button variant="warning">
          <i class="fas fa-truck" />
        </b-button>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: ['data', 'close'],
  computed: {
    ...mapState([])
  },
  methods: {
  },
  watch: {
  }
}
</script>
