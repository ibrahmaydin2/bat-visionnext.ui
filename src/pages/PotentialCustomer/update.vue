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
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
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
                  <v-select />
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.DefaultPaymentTypeId + (insertRequired.DefaultPaymentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                  <v-select :options="paymentTypes" @input="selectedSearchType('DefaultPaymentTypeId', $event)" label="Description1"></v-select>
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.PriceListCategoryId + (insertRequired.PriceListCategoryId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                  <v-select />
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
            <!-- <b-col v-if="insertVisible.CustomerLocations.CityId != null ? insertVisible.CustomerLocations.CityId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.CustomerLocations.CityId + (insertRequired.CustomerLocations.CityId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerLocations.CityId.$error }">
                  <v-select />
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.CustomerLocations.DistrictId != null ? insertVisible.CustomerLocations.DistrictId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.CustomerLocations.DistrictId + (insertRequired.CustomerLocations.DistrictId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerLocations.DistrictId.$error }">
                  <v-select />
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.CustomerLocations.AddressDetail != null ? insertVisible.CustomerLocations.AddressDetail : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerLocations.AddressDetail + (insertRequired.CustomerLocations.AddressDetail === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerLocations.AddressDetail.$error }">
                <b-form-input type="text" v-model="form.CustomerLocations.AddressDetail" :readonly="insertReadonly.CustomerLocations.AddressDetail" />
              </b-form-group>
            </b-col> -->
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.Statement + (insertRequired.Statement === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <b-form-input type="text" v-model="form.Statement" :readonly="insertReadonly.Statement" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.InvoiceCombineRuleId + (insertRequired.InvoiceCombineRuleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
                  <v-select />
                </b-form-group>
              </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="3">
                <b-form-group :label="insertTitle.SalesDocumentTypeId + (insertRequired.SalesDocumentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                  <v-select />
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
            <!-- <b-col v-if="insertVisible.CustomerLocations.PhoneNumber1 != null ? insertVisible.CustomerLocations.PhoneNumber1 : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerLocations.PhoneNumber1 + (insertRequired.CustomerLocations.PhoneNumber1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerLocations.PhoneNumber1.$error }">
                <b-form-input type="text" v-model="form.CustomerLocations.PhoneNumber1" :readonly="insertReadonly.CustomerLocations.PhoneNumber1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerLocations.PhoneNumber2 != null ? insertVisible.CustomerLocations.PhoneNumber2 : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerLocations.PhoneNumber2 + (insertRequired.CustomerLocations.PhoneNumber2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerLocations.PhoneNumber2.$error }">
                <b-form-input type="text" v-model="form.CustomerLocations.PhoneNumber2" :readonly="insertReadonly.CustomerLocations.PhoneNumber2" />
              </b-form-group>
            </b-col> -->
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
        CustomerLocation: {
          CityId: null,
          DistrictId: null,
          AddressDetail: null,
          PhoneNumber1: null,
          PhoneNumber2: null
        }
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'rowData', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'paymentTypes'])
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
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: model, return: this.routeName})
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
          CustomerLocations: e.CustomerLocations
        }
      }
    }
  }
}
</script>
<style lang="sass">
</style>
