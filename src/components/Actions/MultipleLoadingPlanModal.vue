<template>
  <b-modal @show="show" class="asc__insertPage-content-head" v-if="modalAction" :id="id" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('index.Convert.route')" :error="$v.form.route" md="3" lg="3" :required="true">
          <NextDropdown v-model="form.route" url="VisionNextRoute/api/Route/AutoCompleteSearch" searchable />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.day')" :error="$v.form.day" md="3" lg="3" :required="true">
          <NextDropdown v-model="form.day" url="VisionNextSystem/api/SysDay/Search" />
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.loadingBeginDate')" :error="$v.form.beginDate" md="3" lg="3" :required="true">
          <b-form-datepicker v-model="form.beginDate" :placeholder="$t('insert.chooseDate')"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('index.Convert.loadingEndDate')" :error="$v.form.endDate" md="3" lg="3" :required="true">
          <b-form-datepicker v-model="form.endDate" :placeholder="$t('insert.chooseDate')"/>
        </NextFormGroup>
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
          <b-spinner v-if="showLoading" small variant="primary"></b-spinner>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'MultipleLoadingPlanModal',
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
    modalItem: {
      type: Object,
      default: () => {}
    },
    openModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        route: null,
        day: null,
        beginDate: null,
        endDate: null
      },
      selectedItem: {},
      showLoading: false,
      tableBusy: false,
      id: 'multipleLoadingPlanModal'
    }
  },
  methods: {
    show () {
      this.form = {
        route: null,
        day: null,
        beginDate: null,
        endDate: null
      }
      this.selectedItem = {}
      this.showLoading = false
      this.$v.form.$reset()
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', this.id)
    },
    submitModal () {
      this.$v.form.$touch()
      if (!this.form.route || !this.form.day || !this.form.beginDate || !this.form.endDate) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        loadingPlanId: this.modalItem.RecordId,
        routeIds: [this.form.route.RecordId],
        days: [this.form.day.RecordId],
        loadingPlanDate: {
          beginValue: this.form.beginDate,
          endValue: this.form.endDate
        }
      }
      this.showLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextStockManagement/api/LoadingPlan/MultiplexLoadingPlan').then((response) => {
        this.$store.commit('setDisabledLoading', false)
        this.showLoading = false
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('index.Convert.successConvert'), { type: 'success', keepOnHover: true, duration: '3000' })
        } else {
          if (response.Validations && response.Validations.Errors && response.Validations.Errors.length > 0) {
            response.Validations.Errors.forEach(item => {
              if (item.States && item.States.length > 0) {
                item.States.forEach(state => {
                  this.$toasted.show(decodeURIComponent(state), { type: 'error', keepOnHover: true, duration: '3000' })
                })
              } else {
                this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
              }
            })
          } else {
            this.$toasted.show(this.$t('general.unExpectedException'), { type: 'error', keepOnHover: true, duration: '3000' })
          }
        }
      }).catch(() => {
        this.showLoading = false
      })
    },
    validations () {
      return {
        form: {
          route: {
            required
          },
          day: {
            required
          },
          beginDate: {
            required
          },
          endDate: {
            required
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.modalZIndex {
  z-index: 100;
}
</style>
