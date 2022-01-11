<template>
  <b-modal v-if="modalAction" id="update-credit-budget-modal" @show="show" :title="modalAction.Title" size="lg" hide-footer no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('insert.creditBudget.movementCode')" md="4" lg="4">
          <NextInput type="text" v-model="model.code" disabled/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.description')" :required="true" :error="$v.model.description" md="4" lg="4">
          <NextInput type="text" v-model="model.description" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.creditBudget.amount2')" :required="!amountDisabled" :error="$v.model.amount" md="4" lg="4">
          <NextInput type="number" v-model="model.amount" :disabled="amountDisabled"/>
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
import { required, requiredIf } from 'vuelidate/lib/validators'
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
      movementType: null,
      amountDisabled: false
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
          required: requiredIf(function () {
            return !this.movementType || (this.movementType && this.movementType.Code !== 'HUH')
          })
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
      this.amountDisabled = false
      this.getCode()
      this.$v.model.$reset()
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'update-credit-budget-modal')
    },
    selectMovementType (item) {
      this.amountDisabled = false
      if (item) {
        this.model.movementType = item.DecimalValue
        if (item.Code === 'HUH') {
          this.model.amount = null
          this.amountDisabled = true
        }
      } else {
        this.model.movementType = null
      }
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
        this.model = {}
        this.movementType = null
        this.$v.model.$reset()
        this.closeModal()
        this.$emit('success')
      }).catch(() => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        this.model = {}
        this.movementType = null
        this.$v.model.$reset()
      })
    }
  }
}
</script>
