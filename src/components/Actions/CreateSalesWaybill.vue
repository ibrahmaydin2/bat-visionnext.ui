<template>
  <b-modal v-if="modalAction" id="createSalesWaybillModal" @show="show" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <b-col>
          <b-table
            :items="list"
            :fields="fields"
            sticky-header
            :busy="tableBusy"
          >
            <template #head()="data">
              {{$t(data.label)}}
            </template>
            <template #cell(RejectedQuantity)="data">
              <b-form-input type="number" v-model="data.item.RejectedQuantity" />
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
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
          :disabled="!list || list.length === 0"
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
          <b-spinner v-if="showLoading" small variant="primary"></b-spinner>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'PurchaseInvoiceConvertModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    openModal: {
      type: Boolean,
      default: false
    },
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      list: [],
      showLoading: false,
      tableBusy: false,
      id: 'createSalesWaybillModal',
      fields: [
        {
          key: 'ItemCode',
          label: this.$t('index.Convert.ItemCode'),
          sortable: true
        },
        {
          key: 'ItemDescription1',
          label: this.$t('index.Convert.Item'),
          sortable: true
        },
        {
          key: 'InvoiceLineQuantity',
          label: this.$t('index.Convert.InvoiceLineQuantity'),
          sortable: true
        },
        {
          key: 'RejectedQuantity',
          label: this.$t('index.Convert.RejectedQuantity'),
          sortable: true
        }
      ]
    }
  },
  methods: {
    show () {
      this.list = []
      this.showLoading = false
      this.getList()
    },
    getList () {
      let request = {
        invoiceId: this.modalItem.RecordId
      }
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, 'VisionNextInvoice/api/TransportDespatch/Search').then((response) => {
        this.tableBusy = false
        this.$store.commit('setDisabledLoading', false)
        if (response && response.Model && response.Model.length > 0) {
          this.list = response.Model
        } else {
          this.$toasted.show(this.$t('general.noRecord'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      }).catch(() => {
        this.tableBusy = false
        this.closeModal()
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', this.id)
    },
    submitModal () {
      let filteredList = this.list.filter(l => l.RejectedQuantity && parseFloat(l.RejectedQuantity) > parseFloat(l.InvoiceLineQuantity))
      if (filteredList && filteredList.length > 0) {
        this.$toasted.show(this.$t('index.Convert.createSalesWaybillQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      let request = {
        invoiceId: this.modalItem.RecordId,
        transportDescpacthLineRequests: this.list.map(item => {
          item.RejectedQuantity = item.RejectedQuantity ? parseFloat(item.RejectedQuantity) : 0
          return item
        })
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextInvoice/api/TransportDespatch/ApproveTransportDespatch').then((response) => {
        this.$store.commit('setDisabledLoading', false)
        this.showLoading = false
        this.list = []
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('index.Convert.successConvert'), { type: 'success', keepOnHover: true, duration: '3000' })
        } else {
          this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      }).catch(() => {
        this.showLoading = false
      })
    }
  }
}
</script>
<style scoped>
.modalZIndex {
  z-index: 100;
}
</style>
