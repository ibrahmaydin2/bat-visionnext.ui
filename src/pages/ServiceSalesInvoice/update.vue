<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'ServiceSalesInvoice' }">
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
          <b-col cols="8">
            <b-row>
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="3" lg="3">
                <NextDatePicker v-model="form.DocumentDate" :disabled="insertReadonly.DocumentDate"></NextDatePicker>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <NextTimePicker v-model="form.DocumentTime" :disabled="insertReadonly.DocumentTime"></NextTimePicker>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <NextDropdown
                  v-model="selectedCustomer"
                  url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                  :dynamicAndCondition="{ SalesDocumentTypeIds: [45, 46] }"
                  orConditionFields="Code,Description1,CommercialTitle"
                  @input="selectedSearchType('CustomerId', $event)"
                  :disabled="insertReadonly.CustomerId"
                  isCustomOption
                  isCustomer
                  searchable />
              </NextFormGroup>
            </b-row>
          </b-col>
          <b-col cols="4">
            <b-card  class="summary-card">
              <div class="summary-area">
                <span class="summary-title">{{$t('insert.order.netTotal')}}</span>
                <span class="summary-value text-muted">: {{form.NetTotal}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
                <span class="summary-title">{{$t('insert.order.vatTotal')}}</span>
                <span class="summary-value text-muted">: {{form.TotalVat}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
                <span class="summary-title">{{$t('insert.order.grossTotal')}}</span>
                <span class="summary-value text-muted">: {{form.GrossTotal}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
                <span class="summary-title">{{$t('insert.order.itemDiscount')}}</span>
                <span class="summary-value text-muted">: {{form.TotalItemDiscount}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
                <span class="summary-title">{{$t('insert.order.otherDiscount')}}</span>
                <span class="summary-value text-muted">: {{form.TotalOtherDiscount}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
                <span class="summary-title">{{$t('insert.order.totalDiscount')}}</span>
                <span class="summary-value text-muted">: {{form.TotalDiscount}}</span>
                <div class="clearfix"></div>
                <hr class="summary-hr"/>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12" class="">
      <b-tabs>
        <b-tab :title="$t('insert.order.enterInvoice')" active @click.prevent="tabValidation()">
          <b-row>
           <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.InvoiceNumber" :disabled="insertReadonly.InvoiceNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown
                v-model="selectedInvoiceKind"
                url="VisionNextInvoice/api/InvoiceKind/Search"
                :filter="i => i.Code === 'FAT'"
                @input="selectedSearchType('InvoiceKindId', $event)"
                :disabled="insertReadonly.InvoiceKindId" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber"></NextInput>
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown
                v-model="selectedRoute"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                searchable />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown
                v-model="selectedRepresentative"
                @input="selectedSearchType('RepresentativeId', $event)"
                orConditionFields="Code,Description1,Name,Surname"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown
                v-model="selectedCurrency"
                @input="selectedSearchType('CurrencyId', $event)"
                :disabled="insertReadonly.CurrencyId"
                url="VisionNextSystem/api/SysCurrency/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <NextDropdown
                v-model="selectedPaymentType"
                @input="selectedSearchType('PaymentTypeId', $event)"
                :disabled="!paymentTypes || paymentTypes.length === 0 || insertReadonly.PaymentTypeId"
                :source="paymentTypes"
                label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
               <NextInput type="text" v-model="form.PaymentPeriodId" :disabled="insertReadonly.PaymentPeriodId"></NextInput>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()" v-if="form.CustomerId > 0">
          <b-row>
            <b-table
              :items="form.InvoiceLines"
              :fields="itemFields.filter(f => f.key !== 'operations')"
              responsive
              bordered>
              <template #head()="data">
                {{$t(data.label)}}
              </template>
            </b-table>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')" v-if="form.InvoiceLines && form.InvoiceLines.length > 0">
          <b-row>
            <b-table
              :items="form.InvoiceDiscounts"
              :fields="discountFields.filter(f => f.key !== 'operations')"
              responsive
              bordered>
              <template #head()="data">
                {{$t(data.label)}}
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: null,
        System: null,
        StatusId: null,
        RecordState: null,
        InvoiceNumber: null,
        DocumentNumber: null,
        DocumentClassId: null,
        InvoiceKindId: null,
        CustomerId: null,
        DocumentDate: null,
        DocumentTime: null,
        RecvLocationId: null,
        PaymentTypeId: null,
        PaymentPeriodId: null,
        RepresentativeId: null,
        CurrencyId: null,
        Description1: null,
        NetTotal: null,
        GrossTotal: null,
        TotalItemDiscount: null,
        TotalVat: null,
        TotalOtherDiscount: null,
        TotalDiscount: null,
        TotalUserDiscount: null,
        ConversionCounter: null,
        TerminalOrPc: null,
        IsDeliveryInvoice: null,
        IsManualTransaction: null,
        IsPrintedDispatch: null,
        IsPreprintedDocument: null,
        IsProforma: null,
        IsManuelClosure: null,
        IsEndorsementReturn: null,
        IsDbs: null,
        IsContractFocInvoice: null,
        IsValid: null,
        IsPrinted: null,
        IsCanceled: null,
        InvoiceLines: [],
        InvoiceDiscounts: [],
        RouteId: null
      },
      routeName1: 'Invoice',
      itemFields: detailData.itemFields,
      discountFields: detailData.discountFields,
      selectedCustomer: null,
      selectedCurrency: {},
      selectedRepresentative: null,
      selectedPaymentType: null,
      paymentTypes: [],
      selectedRoute: null,
      selectedInvoiceKind: null
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.form = rowData
        this.form.DocumentDate = rowData.DocumentDate
        this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
        this.$api.post({RecordId: rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          this.selectedCustomer = response.Model
          this.paymentTypes = response.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        })
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedInvoiceKind = this.convertLookupValueToSearchValue(rowData.InvoiceKind)
        this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
        this.selectedPaymentType = rowData.PaymentType
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
        if (this.form.InvoiceDiscounts) {
          this.form.InvoiceDiscounts.map(item => {
            item.RecordState = 3
            return item
          })
        }
      }
    },
    save () {
      this.form.StatusId = this.form.StatusId ? this.form.StatusId : 1
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        if (!this.form.InvoiceLines || this.form.InvoiceLines.length === 0) {
          this.$toasted.show(this.$t('insert.order.noOrderLines'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.updateData()
      }
    }
  },
  watch: {
    selectedCustomer (e) {
      if (e) {
        this.form.PaymentPeriodId = e.PaymentPeriod ? e.PaymentPeriod : 0
        if (e.DefaultLocationId) {
          this.form.RecvLocationId = e.DefaultLocationId
        }
      }
    }
  }
}
</script>
<style scoped>
.summary-card {
  width: 240px;
  float: right;
}
.card-body  {
  padding: none !important;
  margin-top:12px;
}
.summary-title {
  width: 100px !important;
}
.summary-value {
   width: 75px !important;
   float:right
}
.summary-area {
  font-size: 10px !important;
}
.summary-hr {
  margin: 3px;
}
</style>
