<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'PotentialCustomer' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" :title="$t('header.confirm')" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="CommercialTitle" :error="$v.form.CommercialTitle">
              <NextInput type="text" v-model="form.CommercialTitle" :disabled="insertReadonly.CommercialTitle" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxOffice" :error="$v.form.TaxOffice">
              <NextInput type="text" v-model="form.TaxOffice" :disabled="insertReadonly.TaxOffice" />
            </NextFormGroup>
            <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
              <NextInput type="text" v-model="form.TaxNumber" :disabled="insertReadonly.TaxNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="LicenseNumber" :error="$v.form.LicenseNumber">
              <NextInput type="text" v-model="form.LicenseNumber" :disabled="insertReadonly.LicenseNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown
                v-model="Type"
                lookup-key="CUSTOMER_TYPE"
                @input="selectedType('TypeId', $event)"
                :disabled="insertReadonly.TypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="DefaultPaymentTypeId" :error="$v.form.DefaultPaymentTypeId">
              <NextDropdown
                v-model="DefaultPaymentType"
                url="VisionNextCommonApi/api/PaymentType/Search"
                @input="selectedSearchType('DefaultPaymentTypeId', $event)"
                :disabled="insertReadonly.DefaultPaymentTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown
                v-model="PriceListCategory"
                lookup-key="PRICE_LIST_CATEGORY_TYPE"
                @input="selectedType('PriceListCategoryId', $event)"
                :disabled="insertReadonly.PriceListCategoryId" />
            </NextFormGroup>
            <NextFormGroup item-key="Barcode" :error="$v.form.Barcode">
              <NextInput type="text" v-model="form.Barcode" :disabled="insertReadonly.Barcode" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="Statement" :error="$v.form.Statement">
              <NextInput type="text" v-model="form.Statement" :disabled="insertReadonly.Statement" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceCombineRuleId" :error="$v.form.InvoiceCombineRuleId">
              <NextDropdown
                v-model="InvoiceCombineRule"
                lookup-key="INVOICE_COMBINE_RULE"
                @input="selectedType('InvoiceCombineRuleId', $event)"
                :disabled="insertReadonly.InvoiceCombineRuleId" />
            </NextFormGroup>
            <NextFormGroup item-key="SalesDocumentTypeId" :error="$v.form.SalesDocumentTypeId">
              <NextDropdown
                v-model="SalesDocumentType"
                lookup-key="SALES_DOCUMENT_TYPE"
                @input="selectedType('SalesDocumentTypeId', $event)"
                :disabled="insertReadonly.SalesDocumentTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="IsWarehouseSale" :error="$v.form.IsWarehouseSale">
              <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle :disabled="insertReadonly.IsWarehouseSale" />
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderChangeUnitary" :error="$v.form.IsOrderChangeUnitary">
              <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle :disabled="insertReadonly.IsOrderChangeUnitary" />
            </NextFormGroup>
          </b-row>
          <hr>
          <NextAddress v-model="address" :init="init" />
          <b-row>
            <NextFormGroup :title="$t('insert.customer.Model_PhoneNumber1')">
              <NextInput type="text" v-model="CustomerLocations.PhoneNumber1" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.customer.Model_FaxNumber')">
              <NextInput type="text" v-model="CustomerLocations.FaxNumber" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        CommercialTitle: null,
        TaxOffice: null,
        TaxNumber: null,
        Description1: null,
        LicenseNumber: null,
        TypeId: null,
        DefaultPaymentTypeId: null,
        PriceListCategoryId: null,
        Barcode: null,
        Genexp1: null,
        Statement: null,
        InvoiceCombineRuleId: null,
        SalesDocumentTypeId: null,
        IsWarehouseSale: null,
        IsOrderChangeUnitary: null,
        CustomerLocations: []
      },
      Type: null,
      DefaultPaymentType: null,
      PriceListCategory: null,
      InvoiceCombineRule: null,
      SalesDocumentType: null,
      address: {},
      CustomerLocations: {
        PhoneNumber1: null,
        FaxNumber: null
      },
      init: null
    }
  },
  mounted () {
    let model = {
      RecordId: this.$route.params.url
    }
    this.$api.postByUrl(model, 'VisionNextCustomer/api/Customer/Get').then(res => this.setData(res.Model))
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        const defaultCustomerLocation = this.form.CustomerLocations.length > 0 ? this.form.CustomerLocations[0] : null
        if (defaultCustomerLocation) {
          defaultCustomerLocation.RecordState = 3
          defaultCustomerLocation.AddressDetail = this.address.Address
          defaultCustomerLocation.DistrictId = this.address.DistrictId
          defaultCustomerLocation.CityId = this.address.CityId
          if (this.CustomerLocations) {
            defaultCustomerLocation.PhoneNumber1 = this.CustomerLocations.PhoneNumber1
            defaultCustomerLocation.FaxNumber = this.CustomerLocations.FaxNumber
          }
        }
        let model = {
          model: this.form
        }
        this.$api.postByUrl(model, 'VisionNextCustomer/api/Customer/ApprovePotentialCustomer').then(res => {
          if (res.IsCompleted) {
            this.$router.push({name: this.routeName})
          }
        })
      }
    },
    setData (model) {
      if (model) {
        this.form = model
        model.CustomerLocations.map(item => {
          if (item.IsDefaultLocation) {
            this.address = {
              CityId: item.CityId,
              DistrictId: item.DistrictId,
              Address: item.AddressDetail
            }
            this.init = this.address
            this.CustomerLocations.PhoneNumber1 = item.PhoneNumber1
            this.CustomerLocations.FaxNumber = item.FaxNumber
          }
        })
      }
      this.Type = model.Type
      this.DefaultPaymentType = this.convertLookupValueToSearchValue(model.DefaultPaymentType)
      this.PriceListCategory = model.PriceListCategory
      this.InvoiceCombineRule = model.InvoiceCombineRule
      this.SalesDocumentType = model.SalesDocumentType
    }
  }
}
</script>
