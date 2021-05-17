<template>
  <b-modal v-if="modalAction" id="update-credit-budget-modal" @show="show" :title="modalAction.Title" size="lg" hide-footer no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('insert.creditBudget.movementCode')" md="4" lg="4">
          <b-form-input type="text" v-model="model.code" disabled/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.description')" :required="true" :error="$v.model.description" md="4" lg="4">
          <b-form-input type="text" v-model="model.description" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.amount2')" :required="true" :error="$v.model.amount" md="4" lg="4">
          <b-form-input type="number" v-model="model.amount" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.endDate')" :required="true" :error="$v.model.date" md="4" lg="4">
          <NextDatePicker v-model="model.date" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.budgetMovementType')" :required="true" :error="$v.model.movementType" md="4" lg="4">
          <NextDropdown v-model="movementType" lookup-key="BUDGET_MOVEMENT_TYPE" get-lookup @input="selectMovementType"/>
        </NextFormGroup>
      </b-row>
      <b-row class="mt-3">
        <div class="w-100 text-right mr-3">
          <b-button
            variant="danger"
            size="sm"
            @click="closeModal()"
          >
            {{$t('index.close')}}
          </b-button>
          <b-button
            :disabled="isLoading"
            variant="primary"
            size="sm"
            @click="updateBudget()"
          >
            <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
            <span v-else>{{$t('insert.creditBudget.update')}}</span>
          </b-button>
        </div>
      </b-row>
    </section>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/helper'
export default {
  name: 'UpdateCreditBudgetModal',
  mixins: [mixin],
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
      model: {
        code: null,
        description: null,
        amount: null,
        date: null,
        movementType: null,
        creditBudgetId: null
      },
      isLoading: false,
      movementType: null
    }
  },
  validations () {
    return {
      model: {
        code: {
          required
        },
        description: {
          required
        },
        amount: {
          required
        },
        date: {
          required
        },
        movementType: {
          required
        }
      }
    }
  },
  methods: {
    show () {
      this.model = {
        creditBudgetId: this.modalItem.RecordId
      }
      this.movementType = null
      this.getCode()
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'update-credit-budget-modal')
    },
    selectMovementType (item) {
      this.model.movementType = item ? item.DecimalValue : null
      this.$forceUpdate()
    },
    getCode () {
      this.$api.postByUrl({}, 'VisionNextBudget/api/CreditBudget/GetCode').then((response) => {
        if (response.Model) {
          this.model.code = response.Model.Code
          this.$forceUpdate()
        }
      })
    },
    updateBudget () {
      this.$v.model.$touch()
      if (this.$v.model.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(this.model, 'VisionNextBudget/api/CreditBudget/UpdateBudget').then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        this.$toasted.show(this.$t('insert.creditBudget.successUpdateBudget'), {
          type: 'success',
          keepOnHover: true,
          duration: '3000'
        })
        this.closeModal()
      }).catch(() => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    }
  }
}
</script>
