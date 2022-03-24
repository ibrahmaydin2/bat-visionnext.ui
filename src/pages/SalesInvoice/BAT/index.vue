<template>
  <div>
    <b-modal size="lg" id="cancelCashCardModal" :title="$t('insert.order.doYouConfirm')" hide-footer no-close-on-backdrop>
      <b-container>
        <b-row>
          <b-col>
            <h6 class="my-4">{{message}}</h6>
          </b-col>
        </b-row>
        <div class="element-modal-footer text-right">
          <b-button size="md" variant="danger" @click="closeModal"> {{$t('insert.no')}}</b-button>
          <b-button size="md" variant="success" @click="cashCardCancel" :disabled="loading"><b-spinner small v-if="loading"></b-spinner> {{$t('insert.yes')}}</b-button>
        </div>
      </b-container>
  </b-modal>
    <Nextgrid apiurl="VisionNextInvoice/api/SalesInvoice/Search" selectionMode="multi" :after-actions="afterActions" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      afterActions: null,
      cashCardId: null,
      message: null,
      loading: null
    }
  },
  mounted () {
    this.afterActions = [
      {
        action: 'Canceled',
        actionMethod: this.cashCardIsCancel
      }
    ]
  },
  methods: {
    cashCardIsCancel (invoiceId) {
      let id = invoiceId.length > 0 ? invoiceId[0] : invoiceId
      this.$api.postByUrl({invoiceId: id}, 'VisionNextInvoice/api/SalesInvoice/IsCancelCashCard').then(res => {
        if (res.IsMessage & !res.IsConfirm) {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        } else if (res.IsMessage & res.IsConfirm) {
          this.cashCardId = res.CachCardId
          this.message = res.message
          this.$bvModal.show('cancelCashCardModal')
        } else {
          this.refreshGrid()
        }
      })
    },
    refreshGrid () {
      setTimeout(() => {
        this.$store.commit('setReloadGrid', true)
      }, 1000)
    },
    cashCardCancel () {
      let request = {
        recordIds: [this.cashCardId]
      }
      this.loading = true
      this.$api.postByUrl(request, 'VisionNextFinance/api/CashCard/Cancel').then(res => {
        this.loading = false
        this.$toasted.show(this.$t('insert.success'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
        this.cashCardId = null
        this.closeModal()
        this.refreshGrid()
      })
    },
    closeModal () {
      this.$bvModal.hide('cancelCashCardModal')
    }
  }
}
</script>
