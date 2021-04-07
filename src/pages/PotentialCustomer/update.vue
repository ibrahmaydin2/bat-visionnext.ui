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
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <b-row>
              <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
            </b-row>
            <b-col v-if="insertVisible.CommercialTitle != null ? insertVisible.CommercialTitle : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CommercialTitle + (insertRequired.CommercialTitle === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CommercialTitle.$error }">
                <b-form-input type="text" v-model="form.CommercialTitle" :readonly="insertReadonly.CommercialTitle" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxOffice != null ? insertVisible.TaxOffice : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.TaxOffice + (insertRequired.TaxOffice === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxOffice.$error }">
                <b-form-input type="text" v-model="form.TaxOffice" :readonly="insertReadonly.TaxOffice" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.TaxNumber + (insertRequired.TaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
                <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LicenseNumber != null ? insertVisible.LicenseNumber : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.LicenseNumber + (insertRequired.LicenseNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.TypeId + (insertRequired.TypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                <v-select
                  v-model="Type"
                  :options="lookup.CUSTOMER_TYPE"
                  @input="selectedType('TypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.DefaultPaymentTypeId + (insertRequired.DefaultPaymentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                  <v-select v-model="DefaultPaymentType" :options="paymentTypes" @input="selectedSearchType('DefaultPaymentTypeId', $event)" label="Description1"></v-select>
                </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.PriceListCategoryId + (insertRequired.PriceListCategoryId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                <v-select
                  v-model="PriceListCategory"
                  :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                  @input="selectedType('PriceListCategoryId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Barcode != null ? insertVisible.Barcode : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Barcode + (insertRequired.Barcode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Barcode.$error }">
                <b-form-input type="text" v-model="form.Barcode" :readonly="insertReadonly.Barcode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Genexp1 != null ? insertVisible.Genexp1 : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Genexp1 + (insertRequired.Genexp1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Genexp1.$error }">
                <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Statement + (insertRequired.Statement === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <b-form-input type="text" v-model="form.Statement" :readonly="insertReadonly.Statement" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.InvoiceCombineRuleId + (insertRequired.InvoiceCombineRuleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
                <v-select
                  v-model="InvoiceCombineRule"
                  :options="lookup.INVOICE_COMBINE_RULE"
                  @input="selectedType('InvoiceCombineRuleId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.SalesDocumentTypeId + (insertRequired.SalesDocumentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                <v-select
                  v-model="SalesDocumentType"
                  :options="lookup.SALES_DOCUMENT_TYPE"
                  @input="selectedType('SalesDocumentTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.IsWarehouseSale + (insertRequired.IsWarehouseSale === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.IsOrderChangeUnitary + (insertRequired.IsOrderChangeUnitary === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <hr>
          <NextAddress v-model="address" />
          <b-row>
            <b-col cols="12" md="3" lg="3">
              <b-form-group :label="$t('insert.customer.Model_PhoneNumber1')">
                <b-form-input type="text" v-model="CustomerLocations.PhoneNumber1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="3">
              <b-form-group :label="$t('insert.customer.Model_FaxNumber')">
                <b-form-input type="text" v-model="CustomerLocations.FaxNumber" />
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
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
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
      routeName: this.$route.meta.baseLink,
      dataStatus: null,
      Type: null,
      DefaultPaymentType: null,
      PriceListCategory: null,
      InvoiceCombineRule: null,
      SalesDocumentType: null,
      address: {},
      CustomerLocations: {
        PhoneNumber1: null,
        FaxNumber: null
      }
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'rowData', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'paymentTypes'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getData', {...this.query, api: `VisionNextCustomer/api/Customer`, record: this.$route.params.url})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        const defaultCustomerLocation = this.form.CustomerLocations[0]
        if (defaultCustomerLocation) {
          defaultCustomerLocation.AddressDetail = this.address.Address
          defaultCustomerLocation.DistrictId = this.address.DistrictId
          defaultCustomerLocation.CityId = this.address.CityId
          if (this.CustomerLocations) {
            defaultCustomerLocation.PhoneNumber1 = this.CustomerLocations.PhoneNumber1
            defaultCustomerLocation.FaxNumber = this.CustomerLocations.FaxNumber
          }
        }
        let model = {
          'model': this.form
        }
        this.$store.dispatch('approvePotentialCustomer', {...this.query, api: 'VisionNextCustomer/api/Customer/ApprovePotentialCustomer', formdata: model, return: this.routeName}).then(res => {
          if (res && res.data.IsCompleted === true) {
            this.$router.push({name: this.routeName})
          } else {
            if (res.data.Message) {
              this.$store.commit('showAlert', { type: 'danger', msg: res.data.Message })
            }
          }
        })
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    // Status'un değerini true'dan 1'e çeviriyor
    rowData: function (e) {
      if (e) {
        this.form = {
          RecordId: this.$route.params.url,
          CommercialTitle: e.CommercialTitle,
          TaxOffice: e.TaxOffice,
          TaxNumber: e.TaxNumber,
          Description1: e.Description1,
          LicenseNumber: e.LicenseNumber,
          TypeId: e.TypeId,
          DefaultPaymentTypeId: e.DefaultPaymentTypeId,
          PriceListCategoryId: e.PriceListCategoryId,
          Barcode: e.Barcode,
          Genexp1: e.Genexp1,
          Statement: e.Statement,
          InvoiceCombineRuleId: e.InvoiceCombineRuleId,
          SalesDocumentTypeId: e.SalesDocumentTypeId,
          IsWarehouseSale: e.IsWarehouseSale,
          IsOrderChangeUnitary: e.IsOrderChangeUnitary,
          CustomerLocations: [
            {
              'updatedProperties': [
                'AddressDetail',
                'PhoneNumber1',
                'FaxNumber',
                'CityId',
                'DistrictId'
              ],
              'AddressDetail': '',
              'PhoneNumber1': '',
              'FaxNumber': '',
              'CityId': null,
              'DistrictId': null,
              'Deleted': 0,
              'System': 0,
              'RecordId': null,
              'CustomerId': null
            }
          ],
          'updatedProperties': [
            'Description1',
            'TaxOffice',
            'TaxNumber',
            'Barcode',
            'DefaultPaymentTypeId',
            'PriceListCategoryId',
            'LicenseNumber',
            'InvoiceCombineRuleId',
            'DeliveryDayParam',
            'SalesDocumentTypeId',
            'IsOrderChangeUnitary',
            'IsWarehouseSale',
            'RecordTypeId',
            'CurrentRisk',
            'CardTypeId',
            'TypeId'
          ]
        }
        e.CustomerLocations.map(item => {
          if (item.IsDefaultLocation) {
            this.address = {
              CityId: item.CityId,
              DistrictId: item.DistrictId,
              Address: item.AddressDetail
            }
            this.form.CustomerLocations[0].RecordId = item.RecordId
            this.form.CustomerLocations[0].CustomerId = item.CustomerId
          }
        })
      }
      if (e.Type) {
        this.Type = e.Type.Label
      }
      if (e.DefaultPaymentType) {
        this.DefaultPaymentType = e.DefaultPaymentType.Label
      }
      if (e.PriceListCategory) {
        this.PriceListCategory = e.PriceListCategory.Label
      }
      if (e.InvoiceCombineRuleId && this.lookup.INVOICE_COMBINE_RULE) {
        let tmpArr = this.lookup.INVOICE_COMBINE_RULE.filter(i => i.DecimalValue === e.InvoiceCombineRuleId)
        this.InvoiceCombineRule = tmpArr[0].Label
      }
      if (e.SalesDocumentType) {
        this.SalesDocumentType = e.SalesDocumentType.Label
      }
    }
  }
}
</script>
<style lang="sass">
</style>
