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
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown :disabled="insertReadonly.CustomerId" @input="selectedSearchType('CustomerId', $event)" url=""/>
            </NextFormGroup>
            <NextFormGroup item-key="LoyaltyId" :error="$v.form.LoyaltyId">
              <NextDropdown :disabled="insertReadonly.LoyaltyId" @input="selectLoyalty($event)" url="VisionNextLoyalty/api/Loyalty/Search" :dynamic-and-condition="{StatusId: 1}"/>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate">
              <NextDatePicker v-model="form.DocumentDate" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId">
              <NextDropdown v-model="employee" :disabled="insertReadonly.EmployeeId" @input="selectedSearchType('EmployeeId', $event)" url="VisionNextEmployee/api/Employee/Search" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="ContactId" :error="$v.form.ContactId">
              <NextDropdown :disabled="insertReadonly.ContactId" @input="selectedSearchType('ContactId', $event)" url="" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyGain.loyalty')">
          <b-row>
            <b-table
              :fields="loyaltyGainDetailFields"
              :items="form.LoyaltyGainDetails"
              bordered responsive >
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
        ContactId: null,
        LoyaltyGainDetails: []
      },
      routeName1: 'Loyalty',
      employee: null,
      loyaltyGainDetailFields: detailData.loyaltyGainDetailFields
    }
  },
  mounted () {
    this.createManualCode('FinanceCode')
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
      if (loyalty) {
        this.form.LoyaltyId = loyalty.RecordId
        let model = {
          RecordId: this.form.LoyaltyId
        }
        this.$api.postByUrl(model, 'VisionNextLoyalty/api/Loyalty/Get').then((response) => {
          if (response.Model) {
            this.form.LoyaltyGainDetails = response.Model.LoyaltyActiveCategories.map(item => {
              let loyaltyGainDetail = {
                ActiveCategoryId: item.LoyaltyCategoryId,
                ActiveCategory: item.LoyaltyCategory,
                Genexp1: item.Genexp1,
                Value: null
              }
              return loyaltyGainDetail
            })
          }
        })
      }
    }
  }
}
</script>
