<template>
  <!-- ViewType
  Potansiyel Müşteri Onayla-> PotentialCustomerApprove
  Potansiyel Müşteri Reddet-> PotentialCustomerReject
  Genel Onaylama -> Modal
  Güncelle -> Route
  Detaylar -> Route
  Farklı Kaydet -> SaveAs
  Doküman Dönüştür -> Convert
  Import -> Uploads adında bir ayraç olmalı.
  İptal -> Cancel
  Alan Güncelleme -> QuickUpdate
  Uyarı -> ControlModel -->
  <b-dropdown-group :header="$t('general.actions')">
    <div v-if="isMultiple">
      <b-dropdown-item v-for="(action, i) in filteredActions" :key="i">
        <span class="d-inline-block w-100" v-if="action.ViewType === 'Modal'" @click.prevent.stop="showMultipleModal (action)">
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </span>
        <span class="d-inline-block w-100" v-else-if="action.ViewType === 'Print'" @click.prevent.stop="multiPrint (action)">
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </span>
        <!-- <span class="d-inline-block w-100" v-else>
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </span> -->
        <!-- <a v-else-if="action.ViewType === 'Link'" :href="action.Action" target="_blank">
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </a>
        <router-link v-else :to="{name: $route.name + action.Action, params: {url: row.RecordId}}">
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </router-link> -->
      </b-dropdown-item>
    </div>
    <div v-else>
      <b-dropdown-item v-for="(action, i) in filteredActions" :key="i" @click.prevent.stop="actionClick(action, row)">
        <span class="d-inline-block w-100">
          <img width="10" height="10" :src="icon" />
          <span class="ml-1">{{action.Title}}</span>
        </span>
      </b-dropdown-item>
    </div>
  </b-dropdown-group>
</template>
<script>
export default {
  name: 'Actions',
  computed: {
    filteredActions () {
      return this.actions.filter(i => {
        if (i.IsMultiple === null) {
          i.IsMultiple = 0
        }
        return i.IsMultiple === this.isMultiple
      })
    }
  },
  data () {
    return {
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTM5NC44LDIyMi44NTFMMTg2LjA2NSwxNC4xMTZjLTE4LjgyMS0xOC44MjEtNTEuMzI4LTE4LjgyMS02OC40MzgsMGMtMTguODIsMTguODIxLTE4LjgyLDQ5LjYxNywwLDY4LjQzOCAgICBMMjkwLjQzMywyNTcuMDdMMTE3LjYyOCw0MjkuODc1Yy0xOC44MiwxOC44MjEtMTguODIsNDkuNjE4LDAsNjguNDM4QzEyNi4xODMsNTA2Ljg2OCwxMzkuODcsNTEyLDE1MS44NDYsNTEyICAgIGMxMS45NzYsMCwyNS42NjUtNS4xMzIsMzQuMjE5LTEzLjY4OEwzOTQuOCwyOTEuMjg4YzguNTU1LTguNTU1LDEzLjY4OC0yMi4yNDIsMTMuNjg4LTM0LjIxOSAgICBDNDA4LjQ4OCwyNDUuMDkzLDQwMy4zNTUsMjMxLjQwNiwzOTQuOCwyMjIuODUxeiBNMzcwLjg0NywyNjcuMzM1TDE2My44MjMsNDc0LjM2Yy01LjEzMyw1LjEzMi0xNS4zOTgsNS4xMzItMjAuNTMxLDAgICAgYy01LjEzMy01LjEzMi01LjEzMy0xNS4zOTksMC0yMC41MzFsMTg0Ljc4Mi0xODQuNzgyYzYuODQ0LTYuODQ0LDYuODQ0LTE3LjEwOSwwLTIzLjk1M0wxNDEuNTgxLDYwLjMxMiAgICBjLTUuMTMzLTYuODQ0LTUuMTMzLTE1LjM5OSwwLTIwLjUzMWMzLjQyMi0zLjQyMiw2Ljg0NC01LjEzMiwxMC4yNjYtNS4xMzJjMy40MjIsMCw2Ljg0NCwxLjcxLDEwLjI2Niw1LjEzMmwyMDguNzM1LDIwOC43MzUgICAgYzMuNDIyLDMuNDIyLDUuMTMyLDYuODQ0LDUuMTMyLDEwLjI2NkMzNzQuMjY5LDI2MC40OTEsMzcyLjU1OCwyNjUuNjI1LDM3MC44NDcsMjY3LjMzNXoiIGZpbGw9IiNmNzhiNGUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+',
      documents: []
    }
  },
  props: {
    actions: {
      type: Array,
      description: 'Sayfa aksiyonlarının listesi'
    },
    row: {},
    isMultiple: {
      default: 0,
      description: 'Çoklu seçim olup olmama durumu'
    },
    RecordIds: {
      type: Array,
      default: () => {
        return []
      },
      description: 'Listeden seçilenlerin RecordId bilgileri'
    }
  },
  methods: {
    showModal (action, row) {
      if (action && action.ActionUrl === 'ApproveRmaOrder') {
        if (row && row.RmaStatus) {
          if (row.RmaStatus.Code === 'TMM') {
            this.$toasted.show(this.$t('insert.RmaOrder.completeError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          if (row.RmaStatus.Code === 'IPT') {
            this.$toasted.show(this.$t('insert.RmaOrder.cancelError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
        }
      }
      // if (row && typeof row.Canceled !== 'undefined' && row.Canceled) {
      //   this.$toasted.show(this.$t('index.errorCanceled'), {
      //     type: 'error',
      //     keepOnHover: true,
      //     duration: '3000'
      //   })
      //   return
      // }
      if (row && typeof row.StateId !== 'undefined' && row.StateId === 3 && ((action.Title === 'Onayla') || (action.Title === 'İptal Et') || (action.Title === 'Kapat') || (action.Title === 'Belge Dönüştür'))) {
        this.$toasted.show(this.$t('index.errorClosed'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.$emit('showModal', action, row)
    },
    showMultipleModal (action) {
      this.$emit('showMultipleModal', action)
    },
    showMap (action, row) {
      if (row.DefaultLocation) {
        this.$api.post({RecordId: row.DefaultLocation.DecimalValue}, 'Customer', 'CustomerLocation/Get').then((res) => {
          if (res.Model) {
            if (res.Model.XPosition == null || res.Model.YPosition == null) {
              this.$toasted.show(this.$t('index.errorLocation'), {
                type: 'error',
                keepOnHover: true,
                duration: '3000'
              })
              return
            }
            this.$emit('showModal', action, res.Model)
          } else {
            this.$toasted.show(this.$t('index.errorLocation'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        })
      } else {
        this.$toasted.show(this.$t('index.errorLocation'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      }
    },
    print (action, row) {
      if (action.Query === 'Invoice') {
        this.$api.postByUrl({recordId: row.RecordId}, action.ActionUrl).then((res) => {
          if (res && res.IsCompleted === false) {
            this.$toasted.show(this.$t(res.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          if (res && !res.IsEInvoice && !res.UseEArchiveInformation && !res.UseEWaybillInformation) {
            this.getListForDocument(res.RecordId, action.QueryMessage, row.CustomerId)
          } else {
            this.htmlPrint(res.Html)
          }
        })
      } else if (action.Query === 'Document') {
        this.getListForDocument(row.RecordId, action.QueryMessage, row.CustomerId)
      } else if (action.Query === 'OtherDispatch') {
        this.$api.postByUrl({recordId: row.RecordId}, action.ActionUrl).then((res) => {
          if (res && res.IsCompleted === false) {
            this.$toasted.show(this.$t(res.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          this.htmlPrint(res.Html)
        })
      } else {
        this.$api.postByUrl({recordId: row.RecordId}, action.ActionUrl).then((res) => {
          if (res && res.IsCompleted === false) {
            this.$toasted.show(this.$t(res.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          this.htmlPrint(res.Html)
        })
      }
    },
    openAction (action, row) {
      let request = {}
      if (action.Action === 'CashCardDebit') {
        request = {
          CashCardId: row.RecordId
        }
      } else {
        request = {
          recordId: row.RecordId,
          model: {}
        }
        request.model[action.Query] = action.QueryMessage
      }

      this.$api.postByUrl(request, action.ActionUrl).then((res) => {
        if (res.IsCompleted === true) {
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          setTimeout(() => {
            this.$store.commit('setReloadGrid', true)
          }, 1000)
        } else {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    getListForDocument (recordId, documentType, customerId) {
      this.$store.commit('setPrintDocuments', [])
      let request = {
        'recordId': recordId,
        'documentType': documentType,
        'customerId': customerId
      }
      this.$api.postByUrl(request, 'VisionNextPrint/api/PrintDocument/ListForDocument').then((res) => {
        if (res && res.IsCompleted === false) {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (res.PrintDocuments.length > 0) {
          let payload = {
            documents: res.PrintDocuments,
            recordId: recordId,
            documentType: documentType
          }
          this.$store.commit('setPrintDocuments', payload)
          this.$root.$emit('bv::show::modal', 'printModal')
        } else {
          this.$store.commit('setPrintDocuments', [])
          this.$toasted.show(this.$t('index.documentNotFound'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    htmlPrint (html) {
      let w = window.open()
      w.document.write(html)
      w.document.close()
      w.focus()
      setTimeout(() => {
        w.print()
      }, 1000)
    },
    multiPrint (action) {
      this.$api.postByUrl({recordIds: this.RecordIds}, action.ActionUrl).then((res) => {
        if (res.IsCompleted === false) {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.htmlPrint(res.MultiHtml)
      })
    },
    copy (action, row) {
      this.$api.postByUrl({recordId: row.RecordId}, 'VisionNextInvoice/api/SalesWaybill/CheckCopyDispatch').then((res) => {
        if (res.IsCompleted === false) {
          this.$toasted.show(this.$t(res.Message), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (res.ConfirmMessage) {
          this.$bvModal.msgBoxConfirm(this.$t(res.ConfirmMessage), {
            size: 'sm',
            buttonSize: 'sm',
            okTitle: this.$t('insert.order.yes'),
            cancelTitle: this.$t('insert.order.no'),
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
            .then(value => {
              if (confirm) {
                value === true ? this.$router.push({name: 'SalesWaybill' + 'Update', params: {url: row.RecordId}, query: {salesWaybillCopy: 1}}) : this.$router.push({name: 'SalesWaybill', params: {}, query: {}})
              }
            })
        } else {
        }
      })
    },
    actionClick (action, row) {
      switch (action.ViewType) {
        case 'Route':
          this.$router.push({name: this.$route.name + action.Action, params: {url: row.RecordId}})
          break
        case 'SaveAs':
          this.$router.push({name: this.$route.name + 'Update', params: {url: row.RecordId}, query: {saveAs: 1}})
          break
        case 'Modal':
          this.showModal(action, row)
          break
        case 'Print':
          this.print(action, row)
          break
        case 'Action':
          this.openAction(action, row)
          break
        case 'ShowOnMap':
          this.showMap(action, row)
          break
        case 'Copy':
          this.copy(action, row)
          break
      }
    }
  }
}

</script>
