<template>
<!-- Rma apisi bulunmadığı için sonra yapılacak -->
  <b-modal v-if="modalAction" @show="show" id="itemFormulaModal" @hide="hide" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
      </b-row>
      <b-row>
        <b-col>
        </b-col>
      </b-row>
    </section>
    <template #modal-footer>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="closeModal()"
        >
          {{$t('index.close')}}
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import mixin from '../../mixins/helper'
import indexMixin from '../../mixins/index'
export default {
  name: 'ItemFormulaModal',
  mixins: [mixin, indexMixin],
  components: {
  },
  computed: {
    ...mapState(['createCode'])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {
      }
    }
  },
  validations () {
    return {
      form: {
        InvoiceKindId: {
          required
        }
      }
    }
  },
  methods: {
    show () {
    },
    hide () {
    },
    selectedType (label, model) {
      if (model) {
        this.invoiceType = model.label
        this.form[label] = model.id
      } else {
        this.form[label] = null
        this.invoiceType = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.employee = model.Description1
        this.form[label] = [model.RecordId]
      } else {
        this.form[label] = null
        this.employee = null
      }
    },
    closeModal () {
      this.close()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'itemFormulaModal')
    },
    submitModal () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
