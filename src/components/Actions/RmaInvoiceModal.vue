<template>
<!-- Rma apisi bulunmadığı için sonra yapılacak -->
  <b-modal @show="show" @hide="hide" v-if="modalAction" id="rmaInvoiceModal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.DocumentNumber')" :error="$v.form.DocumentNumber" md="4" lg="4">
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
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    modalItem: {
      type: Object,
      default: () => {},
      description: 'Listeden seçilen eleman bilgisi'
    }
  },
  data () {
    return {
      form: {
        DocumentNumber: null
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
  methods: {
    show () {
      this.form.DocumentNumber = this.modalItem.DocumentNumber
    },
    hide () {
      this.form = {
        DocumentNumber: null
      }
    },
    find () {
    },
    clear () {
      this.form.DocumentNumber = null
    },
    ok () {
      this.$root.$emit('bv::hide::modal', 'rmaInvoiceModal')
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'rmaInvoiceModal')
    }
  },
  watch: {
    $props: {
      handler (e) {
        if (e.modalAction && e.modalItem) {
          this.form.DocumentNumber = this.modalItem.DocumentNumber
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
