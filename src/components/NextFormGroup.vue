<template>
  <b-col v-if="insertVisible != null && insertVisible[itemKey] != null ? insertVisible[itemKey] : true" cols="12" md="4" lg="3">
    <b-form-group :label="itemTitle + (itemRequired ? ' *' : '')" :class="{ 'form-group--error': itemError }">
        <slot />
    </b-form-group>
  </b-col>
</template>
<script>
import mixin from '../mixins/index'
export default {
  mixins: [mixin],
  name: 'NextFormGroup',
  props: {
    itemKey: {
      type: String
    },
    error: {
      type: Object
    },
    title: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  computed: {
    itemTitle () {
      return this.title != null && this.title !== undefined && this.title !== '' ? this.title : this.insertTitle[this.itemKey]
    },
    itemRequired () {
      return this.insertRequired !== null && this.insertRequired[this.itemKey] != null ? this.insertRequired[this.itemKey] : this.required
    },
    itemError () {
      return this.error !== null && this.error !== undefined ? this.error.$error : false
    }
  }
}

</script>
