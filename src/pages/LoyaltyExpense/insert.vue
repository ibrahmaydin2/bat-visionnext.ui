<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'LoyaltyExpense' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
            <NextInput type="text" v-model="form.FinanceCode" :disabled="insertReadonly.FinanceCode" />
          </NextFormGroup>
          <NextFormGroup item-key="Description" :error="$v.form.Description">
            <NextInput type="text" v-model="form.Description" :disabled="insertReadonly.Description" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.LoyaltyExpense.title')">
          <b-row>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <NextDropdown
                  @input="selectCustomerId($event)"
                  url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                  :searchable="true" :custom-option="true"
                  :disabled="insertReadonly.CustomerId" label="Description1"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  :is-customer="true"/>
              </NextFormGroup>
            <NextFormGroup item-key="TransactionDate" :error="$v.form.TransactionDate">
              <NextDatePicker v-model="form.TransactionDate" @input="getLoyalties" :disabled="insertReadonly.TransactionDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="LoyaltyId" :error="$v.form.LoyaltyId">
              <NextDropdown
                v-model="loyalty"
                :disabled="!form.CustomerId || form.CustomerId === 0 || !form.TransactionDate"
                :source="loyalities"
                @input="selectLoyaltyId"/>
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown label="Description1" searchable @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" :disabled="insertReadonly.RepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.LoyaltyExpense.currentScore')">
              <NextInput type="text" v-model="currentScore" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="ConsumptionScore" :error="$v.form.ConsumptionScore">
              <NextInput type="text" v-model="form.ConsumptionScore" :disabled="insertReadonly.ConsumptionScore"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Description: null,
        FinanceCode: null,
        CustomerId: null,
        LoyaltyId: null,
        ConsumptionScore: null,
        TransactionDate: null,
        RepresentativeId: null,
        StatusId: Number
      },
      routeName1: 'Loyalty',
      loyalities: [],
      currentScore: null,
      loyalty: null
    }
  },
  computed: {
    ...mapState(['loyaltySummary'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.getLoyalties()
  },
  methods: {
    getInsertPage (e) {
      this.createManualCode()
    },
    selectCustomerId (value) {
      this.form.CustomerId = value ? value.RecordId : null
      this.getLoyalties()
    },
    getLoyalties () {
      if (this.form.CustomerId && this.form.TransactionDate) {
        this.form.LoyaltyId = null
        this.loyalty = {}
        let model = {
          transactionDate: this.form.TransactionDate,
          customerId: this.form.CustomerId
        }
        this.$api.postByUrl(model, 'VisionNextLoyalty/api/Loyalty/GetCustomerLoyalties').then((res) => {
          this.loyalities = res.ListModel
        })
        this.getConsumptionScore()
      }
    },
    selectLoyaltyId (value) {
      this.form.LoyaltyId = value ? value.RecordId : null
      this.getConsumptionScore()
    },
    getConsumptionScore () {
      if (this.form.CustomerId > 0 && this.form.LoyaltyId > 0) {
        let model = {
          CustomerIds: [this.form.CustomerId],
          LoyaltyIds: [this.form.LoyaltyId]
        }
        this.$api.post({AndConditionModel: model}, 'Loyalty', 'LoyaltySummary/Search').then((res) => {
          this.currentScore = res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length ? res.ListModel.BaseModels[0].CurrentScore : 0
        })
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        if (this.form.ConsumptionScore > this.currentScore) {
          this.$toasted.show(this.$t('insert.LoyaltyExpense.scoreException'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.TransactionDate = this.dateConvertToISo(this.form.TransactionDate)
        this.createData()
      }
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.FinanceCode = e
      }
    }
  }
}
</script>
