export default {
  data () {
    return {
      modalAction: {},
      modalItem: {}
    }
  },
  methods: {
    getInfoModal () {
      this.$api.getByUrl(`VisionNextUIOperations/api/UIOperationGroupUser/GetFormFields?name=${this.$route.meta.baseLink}`).then((response) => {
        if (response && response.UIPageModels && response.UIPageModels.length > 0) {
          let actions = response.UIPageModels[0].RowActions

          if (actions && actions.length > 0) {
            let filteredActions = actions.filter(f => f.Action === 'Info')

            if (filteredActions && filteredActions.length > 0) {
              this.modalAction = filteredActions[0]
              this.modalItem = {
                RecordId: this.$route.params.url
              }
              this.$nextTick(() => {
                this.$bvModal.show('common-info-modal')
              })
            } else {
              this.showNoInfoMessage()
            }
          } else {
            this.showNoInfoMessage()
          }
        } else {
          this.showNoInfoMessage()
        }
      })
    },
    showNoInfoMessage () {
      this.$bvToast.toast(this.$t('insert.commonInfo.noInfoMessage'), {
        title: this.$t('index.error'),
        variant: 'danger',
        toaster: 'b-toaster-top-right',
        noCloseButton: false
      })
    }
  }
}
