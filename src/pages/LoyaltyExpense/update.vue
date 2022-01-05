<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
        <b-tab :title="$t('insert.LoyaltyExpense.title')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
              <NextDropdown
                v-model="customer"
                @input="selectedSearchType('CustomerId', $event); getLoyalties"
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
                :disabled="insertReadonly.LoyaltyId"
                :source="loyalities"
                label="Description1"
                @input="selectedSearchType('LoyaltyId', $event)"/>
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown v-model="employee" label="Description1" searchable @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" :disabled="insertReadonly.RepresentativeId"/>
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
import mixin from '../../mixins/update'
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
      employee: null,
      customer: null,
      loyalty: null,
      loyalities: []
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.getLoyalties()
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setModel()
      })
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
          this.loyalities = res.ListModel ? res.ListModel.BaseModels : []
        })
        this.getConsumptionScore()
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
        this.form.TransactionDate = this.dateConvertToISo(this.form.TransactionDate)
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e) {
        this.form = {
          Description: e.Description,
          FinanceCode: e.FinanceCode,
          CustomerId: e.CustomerId,
          LoyaltyId: e.LoyaltyId,
          ConsumptionScore: e.ConsumptionScore,
          TransactionDate: e.TransactionDate,
          RepresentativeId: e.RepresentativeId,
          StatusId: e.StatusId
        }
        this.customer = this.convertLookupValueToSearchValue(e.Customer)
        this.loyalty = this.convertLookupValueToSearchValue(e.Loyalty)
        this.employee = this.convertLookupValueToSearchValue(e.Representative)
      }
    }
  },
  watch: {
  }
}
</script>
