<template>
<!-- Rma apisi bulunmadığı için sonra yapılacak -->
  <b-modal v-if="modalAction" id="invoiceConvertModal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.SupplierId')" md="4" lg="4">
          <b-form-input type="text" v-model="form.SupplierId" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.InvoiceNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="form.InvoiceNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" md="4" lg="4">
          <b-form-input type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button
            variant="primary"
            size="sm"
            @click="find()"
          >
            {{$t('index.Find')}}
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="clear()"
          >
            {{$t('index.Clear')}}
          </b-button>
          <b-button
            variant="success"
            size="sm"
            @click="ok()"
          >
            {{$t('index.Ok')}}
          </b-button>
        </b-col>
      </b-row>
    </section>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/helper'
export default {
  name: 'RmaInvoiceModal',
  mixins: [mixin],
  components: {
  },
  computed: {
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
        DocumentNumber: null,
        InvoiceNumber: null,
        SupplierId: null
      },
      routeName: this.$route.name
    }
  },
  validations () {
    return {
      form: {
        DocumentNumber: {
          required
        }
      }
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.form = {
        DocumentNumber: null,
        InvoiceNumber: null,
        SupplierId: null
      }
    })
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      this.form.DocumentNumber = this.modalItem.DocumentNumber
      this.form.InvoiceNumber = this.modalItem.InvoiceNumber
      this.form.SupplierId = this.modalItem.SupplierId
    })
  },
  methods: {
    find () {
    },
    clear () {
      this.form.DocumentNumber = null
      this.form.InvoiceNumber = null
      this.form.SupplierId = null
    },
    ok () {
      this.$root.$emit('bv::hide::modal', 'invoiceConvertModal')
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'invoiceConvertModal')
    }
  },
  watch: {
    $props: {
      handler (e) {
        if (e.modalAction && e.modalItem) {
          this.form.DocumentNumber = this.modalItem.DocumentNumber
          this.form.InvoiceNumber = this.modalItem.InvoiceNumber
          this.form.SupplierId = this.modalItem.SupplierId
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped>
</style>
