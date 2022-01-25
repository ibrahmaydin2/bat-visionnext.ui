<template>
  <div>
    <b-row v-if="showInsert">
      <NextFormGroup :title="$t('insert.budgetMaster.movementCode')" :required="true" :error="$v.form.Code" md="4" lg="4">
        <NextInput v-model="form.Code"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.description')" :required="true" :error="$v.form.Description1" md="4" lg="4">
        <NextInput v-model="form.Description1"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.budget')" md="4" lg="4">
        <b-form-input type="text" disabled v-model="budget"/>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.amount')" :required="true" :error="$v.form.Amount" md="4" lg="4">
        <NextInput type="number" v-model="form.Amount"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.budgetMovementType')" :required="true" :error="$v.form.MovementType" md="4" lg="4">
        <NextDropdown v-model="movementType" :source="movementTypes" label="Label" @input="selectMovementType($event, 'form')" />
      </NextFormGroup>
       <b-col cols="12" md="4" lg="4">
        <b-form-group>
          <b-button @click="save" id="submitButton" class="mt-4" size="sm" variant="success" :disabled="isLoading">
            <b-spinner v-if="isLoading" small></b-spinner>
            <span v-else>{{$t('insert.budgetMaster.save')}}</span>
        </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="!showInsert">
      <b-col cols="12" v-if="addable">
        <b-form-group class="text-right">
          <b-button @click="addNew" id="submitButton" size="sm" variant="success" :disabled="isLoading">
            <span>{{$t('insert.budgetMaster.newAdd')}}</span>
        </b-button>
        </b-form-group>
      </b-col>
       <NextFormGroup :title="$t('insert.budgetMaster.movementCode')" :required="true" :error="$v.form.Code" md="4" lg="4">
        <NextInput v-model="filter.Code"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.description')" :required="true" :error="$v.form.Description1" md="4" lg="4">
        <NextInput v-model="filter.Description1"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.budget')" md="4" lg="4">
        <b-form-input type="text" disabled v-model="budget"/>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.amount')" :required="true" :error="$v.form.Amount" md="4" lg="4">
        <NextInput type="number" v-model="filter.Amount"></NextInput>
      </NextFormGroup>
      <NextFormGroup :title="$t('insert.budgetMaster.budgetMovementType')" :required="true" :error="$v.form.MovementType" md="4" lg="4">
        <NextDropdown v-model="movementType" :source="allMovementTypes" label="Label" @input="selectMovementType($event, 'filter')" />
      </NextFormGroup>
      <b-col cols="12" md="4" lg="4">
        <b-form-group>
          <b-button @click="getBudgetTransactions"  class="mt-4" size="sm" variant="success" :disabled="isLoading">
             <b-spinner v-if="isLoading" small></b-spinner>
            <span>{{$t('insert.budgetMaster.find')}}</span>
        </b-button>
        </b-form-group>
      </b-col>
      <b-table
        id="budget-transaction-list"
        :items="budgetTransactions"
        :fields="fields"
        bordered responsive>
        <template #head()="data">
            {{$t(data.label)}}
          </template>
      </b-table>
      <b-pagination
        :total-rows="budgetTransactions ? budgetTransactions.length : 0"
        v-model="currentPage"
        :per-page="10"
        aria-controls="budget-transaction-list"
      ></b-pagination>
    </b-row>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  props: {
    budgetDetail: {},
    addable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        BranchId: null,
        Code: null,
        Description1: null,
        BudgetId: null,
        Amount: null,
        MovementType: null
      },
      movementTypes: [],
      budget: null,
      isLoading: false,
      showInsert: false,
      fields: [
        {
          key: 'Code',
          label: 'insert.budgetMaster.movementCode'
        },
        {
          key: 'Description1',
          label: 'insert.budgetMaster.description'
        },
        {
          key: 'BudgetId',
          label: 'insert.budgetMaster.budget',
          formatter: (value, key, item) => {
            return item.Budget ? item.Budget.Label : '-'
          }
        },
        {
          key: 'Amount',
          label: 'insert.budgetMaster.amount'
        },
        {
          key: 'MovementType',
          label: 'insert.budgetMaster.budgetMovementType',
          formatter: (value, key, item) => {
            return item.MovementTypeo ? item.MovementTypeo.Label : '-'
          }
        }
      ],
      budgetTransactions: [],
      currentPage: 1,
      filter: {},
      allMovementTypes: [],
      movementType: null
    }
  },
  mounted () {
    this.budget = this.budgetDetail.Description1
    this.getMovementTypes()
  },
  computed: {
    ...mapState(['lookup'])
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.$store.commit('setDisabledLoading', true)
        this.isLoading = true
        this.form.BudgetId = this.budgetDetail.RecordId
        this.$api.postByUrl({model: this.form}, 'VisionNextBudget/api/BudgetTransaction/Insert').then((response) => {
          this.isLoading = false
          if (response.IsCompleted === true) {
            this.$toasted.show(this.$t('insert.budgetMaster.successSaveBudgetTransaction'), {
              type: 'success',
              keepOnHover: true,
              duration: '3000'
            })
            this.movementType = null
            this.filter = {}
            this.showInsert = false
            this.$store.commit('setDisabledLoading', false)
          }
        }).catch(() => {
          this.$store.commit('setDisabledLoading', false)
          this.isLoading = false
        })
      }
    },
    selectMovementType (data, obj) {
      this[obj].MovementType = data ? data.DecimalValue : null
    },
    getMovementTypes () {
      let random = Math.random()
      this.$api.postByUrl({LookupTableCode: 'BUDGET_MOVEMENT_TYPE'}, `VisionNextCommonApi/api/LookupValue/GetValues?v=${random}`).then((response) => {
        if (response.Values) {
          this.allMovementTypes = response.Values
          this.movementTypes = response.Values.filter(i => i.Code === 'ART' || i.Code === 'AZ')
        }
      })
    },
    getBudgetTransactions () {
      let model = {
        AndConditionModel: {
          BudgetIds: [this.budgetDetail.RecordId],
          Amount: this.filter.Amount ? this.filter.Amount : null,
          Code: this.filter.Code ? this.filter.Code : null,
          Description1: this.filter.Description1 ? this.filter.Description1 : null,
          MovementType: this.filter.MovementType ? this.filter.MovementType : null
        }
      }
      this.$store.commit('setDisabledLoading', true)
      this.isLoading = true
      this.$api.postByUrl(model, 'VisionNextBudget/api/BudgetTransaction/Search').then((response) => {
        this.$store.commit('setDisabledLoading', false)
        this.isLoading = false
        if (response.ListModel) {
          this.budgetTransactions = response.ListModel.BaseModels
        }
      }).catch(() => {
        this.$store.commit('setDisabledLoading', false)
        this.isLoading = false
      })
    },
    addNew () {
      this.showInsert = true
      this.form = {}
      this.$v.form.$reset()
      this.movementType = null
      this.$api.postByUrl({}, 'VisionNextBudget/api/BudgetTransaction/GetCode').then((response) => {
        if (response && response.Model) {
          this.form.Code = response.Model.Code
          this.$forceUpdate()
        }
      })
    }
  },
  validations () {
    return {
      form: {
        Code: { required },
        Description1: { required },
        Amount: { required },
        MovementType: { required }
      }
    }
  }
}
</script>
