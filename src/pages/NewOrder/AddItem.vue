<template>
  <div>
    <b-form-group>
      <b-button class="mt-4" @click="showModal" variant="success" size="sm">
        <i class="fa fa-plus"></i> {{$t('insert.newOrder.newCustomer')}}
      </b-button>
    </b-form-group>
    <b-modal :id="`modal${id}`" size="lg" @show="show">
      <template #modal-title>
        {{$t('insert.newOrder.addNewCustomer')}}
      </template>
      <b-row>
        <NextFormGroup :title="$t('insert.newOrder.commercialTitle')" md="4" lg="4" :required="true" :error="$v.form.CommercialTitle">
          <NextInput type="text" v-model="form.CommercialTitle"></NextInput>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.taxCustomerTypeId')" md="4" lg="4" :required="true" :error="$v.form.TaxCustomerTypeId">
          <NextDropdown v-model="taxCustomerType" lookup-key="TAX_CUSTOMER_TYPE" :get-lookup="true" @input="selectedType('TaxCustomerTypeId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.tcknOrVkn')" md="4" lg="4" :required="true" :error="$v.form.TaxNumber">
          <NextInput type="number" v-model="form.TaxNumber" maxLength="11" :oninput="maxLengthControl"></NextInput>
        </NextFormGroup>
        <NextFormGroup v-if="taxCustomerType && taxCustomerType.Code === 'TZK'" :title="$t('insert.newOrder.taxOffice')" md="4" lg="4" :required="true" :error="$v.form.TaxOffice">
          <NextInput type="text" v-model="form.TaxOffice"></NextInput>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.phoneNumber')" md="4" lg="4" :required="true" :error="$v.form.PhoneNumber1">
          <NextInput type="number" v-model="form.PhoneNumber1" maxLength="10" :oninput="maxLengthControl"></NextInput>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.customerEmail')" md="4" lg="4" :required="true" :error="$v.form.CustomerEmail">
          <NextInput type="email" v-model="form.CustomerEmail"></NextInput>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.city')" md="4" lg="4" :required="true" :error="$v.form.CityId">
          <NextDropdown lookup-key="CITY" :get-lookup="true" @input="selectCity"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.district')" md="4" lg="4" :required="true" :error="$v.form.DistrictId">
         <NextDropdown v-model="district" :source="districts" :disabled="!form.CityId" label="Label" @input="selectedType('DistrictId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.address')" md="4" lg="4" :required="true" :error="$v.form.AddressDetail">
          <NextTextArea v-model="form.AddressDetail"></NextTextArea>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.postCode')" md="4" lg="4" :required="true" :error="$v.form.PostCode">
          <NextInput type="number" v-model="form.PostCode" maxLength="5" :oninput="maxLengthControl"></NextInput>
        </NextFormGroup>
        <b-col cols="12" md="12">
          <b-form-group class="float-right">
            <b-button size="sm" variant="success" @click="addCustomer()" :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
              <span v-else><i class="fa fa-plus"></i> {{$t('insert.newOrder.add')}}</span>
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="closeModal()">{{$t('insert.cancel')}}</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import mixin from '../../mixins/index'
import { required, requiredIf, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'NewOrderAddItem',
  mixins: [mixin],
  props: {
  },
  data () {
    return {
      id: Math.random().toString(36).substring(2),
      form: {
        CommercialTitle: null,
        TaxCustomerTypeId: null,
        TaxNumber: null,
        TaxOffice: null,
        PhoneNumber1: null,
        CustomerEmail: null,
        AddressDetail: null,
        CityId: null,
        DistrictId: null,
        PostCode: null
      },
      isLoading: false,
      taxCustomerType: null,
      district: null,
      districts: []
    }
  },
  methods: {
    addCustomer () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      let request = {
        model: {
          Code: this.form.Code,
          CommercialTitle: this.form.CommercialTitle,
          Description1: this.form.CommercialTitle,
          CustomerEmail: this.form.CustomerEmail,
          TaxCustomerTypeId: this.form.TaxCustomerTypeId,
          TaxOffice: this.taxCustomerType.Code === 'TZK' ? this.form.TaxOffice : this.form.TaxNumber,
          TaxNumber: this.form.TaxNumber,
          StatusId: 1,
          TypeId: 5004,
          SalesDocumentTypeId: 45,
          PriceListCategoryId: 1681208812,
          RecordTypeId: 1,
          IsTaxExemption: 0,
          CardTypeId: 1,
          SalesTypeId: 1,
          SalesPriceChangeRate: 0,
          DefaultPaymentTypeId: 1,
          UseEInvoice: 0,
          RecordState: 2,
          CustomerLocations: [
            {
              AddressDetail: this.form.AddressDetail,
              PhoneNumber1: this.form.PhoneNumber1,
              CityId: this.form.CityId,
              DistrictId: this.form.DistrictId,
              PostCode: this.form.PostCode,
              Code: `${this.form.Code}-1`,
              Description1: `${this.form.CommercialTitle} 1`,
              AddressDescription: this.form.AddressDetail,
              IsDefaultLocation: 1,
              IsInvoiceAddress: 1,
              IsDeliveryAddress: 1,
              RecordState: 2
            }
          ]
        }
      }

      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/Insert').then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)

        if (response && response.IsCompleted) {
          this.$emit('success', response.Model)
          this.closeModal()
        }
      })
    },
    show () {
      this.form = {}
      this.$v.form.$reset()

      this.isLoading = false
      this.taxCustomerType = null
      this.district = null
      this.districts = []

      this.getCode()
    },
    showModal () {
      this.$bvModal.show(`modal${this.id}`)
    },
    closeModal () {
      this.$bvModal.hide(`modal${this.id}`)
    },
    selectCity (value) {
      this.district = null
      this.districts = []
      this.form.DistrictId = null

      if (value) {
        this.form.CityId = value.DecimalValue
        let request = {
          UpperValue: value.DecimalValue,
          LookupTableCode: 'DISTRICT'
        }
        this.$api.postByUrl(request, 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue').then(response => {
          if (response) {
            this.districts = response.Values
          }
        })
      } else {
        this.form.CityId = null
      }
    },
    getCode () {
      this.$api.postByUrl({}, 'VisionNextOrder/api/Order/GetCode').then(response => {
        if (response && response.Model) {
          this.form.Code = response.Model.Code
        }
      })
    }
  },
  validations () {
    let isTZK = this.taxCustomerType && this.taxCustomerType.Code === 'TZK'
    let taxNumberReq = isTZK ? 10 : 11
    return {
      form: {
        CommercialTitle: {
          required
        },
        TaxCustomerTypeId: {
          required
        },
        TaxNumber: {
          required,
          minLength: minLength(taxNumberReq),
          maxLength: maxLength(taxNumberReq)
        },
        TaxOffice: {
          required: requiredIf(function () {
            return isTZK
          })
        },
        CustomerEmail: {
          required
        },
        PhoneNumber1: {
          required,
          minLength: minLength(10)
        },
        CityId: {
          required
        },
        DistrictId: {
          required
        },
        AddressDetail: {
          required
        },
        PostCode: {
          required,
          minLength: minLength(5)
        }
      }
    }
  }
}
</script>
