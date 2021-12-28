<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'LoyaltyGain' }">
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
            <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyGain.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="LoyaltyId" :error="$v.form.LoyaltyId">
              <NextDropdown
                :disabled="insertReadonly.LoyaltyId"
                url="VisionNextLoyalty/api/Loyalty/Search"
                :dynamic-and-condition="{StatusId: 1}" searchable
                @input="selectLoyalty"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select
                v-model="customer"
                :disabled="!form.LoyaltyId"
                @input="selectCustomer"
                @search="searchCustomer"
                :options="customers"
                :filterable="false"
                label="Description1">
              <template slot="no-options">
                {{$t('insert.min3')}}
              </template>
              <template v-slot:option="option">
                <span>{{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}</span>
              </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId">
              <NextDropdown v-model="employee" orConditionFields="Code,Description1,Name,Surname" :disabled="insertReadonly.EmployeeId" @input="selectedSearchType('EmployeeId', $event)" url="VisionNextEmployee/api/Employee/Search" searchable/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyGain.loyalty')">
          <b-row>
            <b-table
              :fields="loyaltyGainDetailFields"
              :items="form.LoyaltyGainDetails"
              bordered responsive >
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(Value)="data">
                <NextInput type="number" v-model="data.item.Value"/>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: null,
        CompanyId: null,
        BranchId: null,
        CustomerId: null,
        LoyaltyId: null,
        DocumentDate: null,
        EmployeeId: null,
        Description1: null,
        FinanceCode: null,
        LoyaltyGainDetails: []
      },
      routeName1: 'Loyalty',
      employee: null,
      loyaltyGainDetailFields: detailData.loyaltyGainDetailFields,
      customer: null,
      customers: []
    }
  },
  mounted () {
    this.form.DocumentDate = new Date().toISOString().substr(0, 10)
    this.getUserInfo()
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
        this.tabValidation()
      } else {
        this.createData()
      }
    },
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.employee = `${userModel.Name} ${userModel.Surname}`
            this.form.EmployeeId = user.EmployeeId
          }
        })
      }
    },
    selectLoyalty (loyalty) {
      this.customer = null
      this.form.CustomerId = null
      if (loyalty) {
        this.form.LoyaltyId = loyalty.RecordId
      } else {
        this.form.LoyaltyId = null
      }
    },
    selectCustomer (customer) {
      if (customer) {
        this.form.CustomerId = customer.RecordId
        let model = {
          LoyaltyId: this.form.LoyaltyId,
          CustomerId: this.form.CustomerId
        }
        this.$api.postByUrl(model, 'VisionNextLoyalty/api/LoyaltyGain/GetGain').then((response) => {
          if (response.ListModel) {
            this.form.LoyaltyGainDetails = response.ListModel.map(item => {
              item.Deleted = 0
              item.System = 0
              item.RecordState = 2
              item.Value = null

              return item
            })
          }
        })
      } else {
        this.form.CustomerId = null
      }
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      if (search === '%%%') {
        search = undefined
      } else if ((typeof search === 'string' || search instanceof String) && search.includes('%')) {
        search = search.replaceAll('%', '')
      }
      let request = {
        model: {
          loyaltyId: this.form.LoyaltyId,
          description: search
        }
      }
      loading(true)
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/GetLoyaltyCustomers').then((response) => {
        loading(false)
        if (response && response.ListModel) {
          this.customers = response.ListModel.BaseModels
        }
      })
    }
  }
}
</script>
