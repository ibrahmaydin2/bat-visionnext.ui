<template>
  <b-col v-if="itemKey ? insertVisible != null && insertVisible[itemKey] != null ? insertVisible[itemKey] : false : true" cols="12" :md="md" :lg="lg">
    <b-form-group :class="{ 'form-group--error': itemError }">
        <template #label>
          {{itemTitle + (itemRequired ? ' *' : '')}}
          <b-popover :show.sync="showCopiedMessage" :title="copiedMessage" placement="top" target="copy-area" />
          <span id="copy-area" v-if="showCopy" class="form-group-copy" @click="copy()"><i class="fas fa-copy"></i></span>
        </template>
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
    },
    md: {
      type: String,
      default: '4'
    },
    lg: {
      type: String,
      default: '3'
    },
    showCopy: {
      type: Boolean,
      default: false
    },
    copyValues: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      copiedMessage: '',
      showCopiedMessage: false
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
      return this.error && this.error.$error ? this.error.$error : false
    }
  },
  methods: {
    copy () {
      if (this.$children && this.$children.length > 0 && this.$children[0].$children && this.$children[0].$children.length > 1) {
        let value = this.$children[0].$children[1].selectedValue
        if (value) {
          let copiedValue = ''
          if (this.copyValues) {
            const valueArr = this.copyValues.split(',').map(v => value[v])
            copiedValue = valueArr.join(' - ')
          } else {
            copiedValue = value
          }
          this.copiedMessage = `${this.$t('general.copied')} ${copiedValue}`
          this.showCopiedMessage = true
          navigator.clipboard.writeText(copiedValue)
          setTimeout(() => {
            this.showCopiedMessage = false
          }, 2000)
        }
      }
    }
  }
}

</script>
<style>
.form-group-copy {
  cursor: pointer;
}
</style>
