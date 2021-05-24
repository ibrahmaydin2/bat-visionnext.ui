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
          <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description != null ? insertVisible.Description : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.Description + (insertRequired.Description === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description.$error }">
              <b-form-input type="text" v-model="form.Description" :readonly="insertReadonly.Description" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle />
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.LoyaltyExpense.title')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select v-model="customer" :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event); getLoyalties" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TransactionDate != null ? insertVisible.TransactionDate : developmentMode" :start-weekday="1" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.TransactionDate + (insertRequired.TransactionDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TransactionDate.$error }">
                <b-form-datepicker v-model="form.TransactionDate" :placeholder="$t('insert.LoyaltyExpense.chooseDate')" @input="getLoyalties" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LoyaltyId != null ? insertVisible.LoyaltyId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.LoyaltyId + (insertRequired.LoyaltyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LoyaltyId.$error }">
                <v-select v-model="loyalty" :options="loyalities" @input="selectedSearchType('LoyaltyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select v-model="employee" :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ConsumptionScore != null ? insertVisible.ConsumptionScore : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ConsumptionScore + (insertRequired.ConsumptionScore === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ConsumptionScore.$error }">
                <b-form-input type="text" v-model="form.ConsumptionScore" :readonly="insertReadonly.ConsumptionScore" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['employees', 'customers'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setModel()
      })
    },
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/AutoCompleteSearch', 'employees', model).then(res => {
        loading(false)
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
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
