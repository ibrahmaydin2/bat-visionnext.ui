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
                <NextDatePicker v-model="documentDate" :disabled="insertReadonly.DocumentDate"></NextDatePicker>
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
            <NextFormGroup item-key="InvoiceTypeId" :error="$v.form.InvoiceTypeId" md="2" lg="2">
              <NextDropdown
                url="VisionNextInvoice/api/InvoiceType/Search"
                @input="selectedSearchType('InvoiceTypeId', $event)"
                :disabled="insertReadonly.InvoiceTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown
                @input="selectedSearchType('RepresentativeId', $event)"
                orConditionFields="Code,Description1,Name,Surname"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown
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
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedInvoiceLine.selectedItem" :required="true" md="2" lg="2">
              <NextDropdown
                  v-model="selectedInvoiceLine.selectedItem"
                  url="VisionNextItem/api/Item/AutoCompleteSearch"
                  @input="selectItem"
                  :searchable="true"
                  or-condition-fields="Description1,Code"
                  :dynamic-and-condition="{CardTypeIds: [9]}"
                  :custom-option="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedInvoiceLine.quantity" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.quantity" @input="selectQuantity" @keypress="onlyForCurrency($event)" min=1 />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedInvoiceLine.price" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.price" @input="selectPrice"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.description1')" :error="$v.selectedInvoiceLine.description1" :required="true" md="2" lg="2">
              <NextInput type="text" v-model="selectedInvoiceLine.description1" />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.order.vatRate')" :error="$v.selectedInvoiceLine.vatRate" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.vatRate" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.netTotal')" :error="$v.selectedInvoiceLine.netTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.netTotal" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatTotal')" :error="$v.selectedInvoiceLine.totalVat" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.totalVat" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.grossTotal')" :error="$v.selectedInvoiceLine.grossTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedInvoiceLine.grossTotal" disabled />
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceLine" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
                <NextMultipleSelection
                  name="ServicePurchaseInvoiceMultipleItem"
                  v-model="form.InvoiceLines"
                  :disabled-button="!form.CustomerId"
                  :dynamic-and-condition="{CustomerIds: [form.CustomerId], CardTypeIds: [9]}"
                  :hidden-values="multipleItemSearch.hiddenValues"
                  :converted-values="multipleItemSearch.convertedValues"
                  @input="calculateTotalPrices()"
                />
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :items="form.InvoiceLines"
              :fields="itemFields"
              responsive
              bordered>
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="data">
                <b-button :title="$t('list.edit')" @click="editInvoiceLine(data.item)" class="btn mr-2 btn-warning btn-sm">
                  <i class="fa fa-pencil-alt"></i>
                </b-button>
                <b-button :title="$t('list.delete')" @click="removeInvoiceLine(data.item)" class="btn mr-2 btn-danger btn-sm">
                  <i class="far fa-trash-alt ml-1"></i>
                </b-button>
              </template>
            </b-table>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')" v-if="form.InvoiceLines && form.InvoiceLines.length > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.discountReason')" :error="$v.selectedInvoiceDiscount.discountReason" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="selectedInvoiceDiscount.discountReason"
                url="VisionNextDiscount/api/DiscountReason/Search" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.discountPercent')" :error="$v.selectedInvoiceDiscount.discountPercent" :required="true" md="3" lg="3">
              <NextInput type="number" v-model="selectedInvoiceDiscount.discountPercent" @input="setTotalDiscount"  />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.totalDiscount')" :error="$v.selectedInvoiceDiscount.totalDiscount" :required="true" md="3" lg="3">
              <NextInput type="number" v-model="selectedInvoiceDiscount.totalDiscount" :disabled="true" />
            </NextFormGroup>
            <b-col cols="12" md="3" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceDiscount" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :items="form.InvoiceDiscounts"
              :fields="discountFields"
              responsive
              bordered>
              <template #head()="data">
                {{$t(data.label)}}
              </template>
              <template #cell(operations)="data">
                <b-button :title="$t('list.delete')" @click="removeInvoiceDiscount(data.item)" class="btn mr-2 btn-danger btn-sm">
                  <i class="far fa-trash-alt"></i>
                </b-button>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
    <b-modal id="confirm-modal">
      <template #modal-title>
        {{$t('insert.order.doYouConfirm')}}
      </template>
      {{$t('insert.order.orderLinesRemoved')}}
      <template #modal-footer>
        <CancelButton class="float-right ml-2" @click.native="cancelSelectedCustomer" />
        <b-button size="sm" class="float-right ml-2" variant="success" @click="confirmSelectedCustomer">{{$t('insert.okay')}}</b-button>
      </template>
  </b-modal>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import insertMixin from '../../../mixins/insert'
import { detailData } from '../detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        InvoiceNumber: null,
        DocumentNumber: null,
        DocumentClassId: 9,
        InvoiceKindId: 1,
        CustomerId: null,
        DocumentDate: null,
        DocumentTime: null,
        RecvLocationId: null,
        PaymentTypeId: null,
        PaymentPeriodId: null,
        RepresentativeId: null,
        CurrencyId: null,
        Description1: null,
        NetTotal: 0,
        GrossTotal: 0,
        TotalItemDiscount: 0,
        TotalVat: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        TotalUserDiscount: 0,
        ConversionCounter: 0,
        TerminalOrPc: 'P',
        IsDeliveryInvoice: 0,
        IsManualTransaction: 0,
        IsPrintedDispatch: 0,
        IsPreprintedDocument: null,
        IsProforma: 0,
        IsManuelClosure: 0,
        IsEndorsementReturn: 0,
        IsDbs: 0,
        IsContractFocInvoice: 0,
        IsValid: 0,
        IsPrinted: 0,
        IsCanceled: 0,
        InvoiceTypeId: null,
        InvoiceLines: [],
        InvoiceDiscounts: []
      },
      routeName1: 'Invoice',
      itemFields: detailData.itemFields,
      discountFields: detailData.discountFields,
      selectedInvoiceDiscount: {
        discountReason: null,
        totalDiscount: null,
        discountPercent: null
      },
      selectedCustomer: null,
      documentDate: null,
      selectedCurrency: {},
      selectedInvoiceLine: {
        selectedItem: null,
        quantity: null,
        price: null,
        grossTotal: null,
        netTotal: null,
        vatRate: null,
        totalVat: null,
        isUpdated: false,
        description1: null
      },
      selectedIndex: null,
      customerFirstSet: true,
      documentDateFirstSet: true,
      currentCustomer: {},
      customerSelectCancelled: false,
      selectedPaymentType: {},
      paymentTypes: []
    }
  },
  computed: {
    ...mapState(['multipleItemSearch'])
  },
  mounted () {
    this.createManualCode('InvoiceNumber')
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      let currentDate = new Date()
      let date = currentDate.toISOString().slice(0, 10) + 'T00:00:00.000Z'
      this.documentDate = date
      let time = currentDate.toTimeString().slice(0, 5)
      this.form.DocumentTime = time
    },
    getItem (recordId) {
      let request = {
        andConditionModel: {
          RecordIds: [recordId]
        }
      }
      var me = this
      this.$api.post(request, 'Item', 'Item/Search').then((res) => {
        if (res.ListModel && res.ListModel.BaseModels) {
          me.selectedInvoiceLine.selectedItem = res.ListModel.BaseModels[0]
          me.$forceUpdate()
        }
      })
    },
    selectItem (value) {
      if (value) {
        this.selectedInvoiceLine.selectedItem = value
        this.setTotalPrice()
      } else {
        this.resetTotalPrice()
      }
    },
    selectPrice (value) {
      if (value) {
        this.selectedInvoiceLine.price = value
        this.setTotalPrice()
      } else {
        this.resetTotalPrice()
      }
    },
    selectQuantity (value) {
      if (value) {
        this.selectedInvoiceLine.quantity = value
        this.setTotalPrice()
      } else {
        this.resetTotalPrice()
      }
    },
    setTotalPrice () {
      if (!this.selectedInvoiceLine.quantity || !this.selectedInvoiceLine.selectedItem || !this.selectedInvoiceLine.price) {
        return false
      }
      let vatRate = this.selectedInvoiceLine.selectedItem.Vat
      this.selectedInvoiceLine.vatRate = vatRate
      this.selectedInvoiceLine.netTotal = this.roundNumber(this.selectedInvoiceLine.price * this.selectedInvoiceLine.quantity)
      this.selectedInvoiceLine.totalVat = this.roundNumber(this.selectedInvoiceLine.netTotal * vatRate / 100)
      this.selectedInvoiceLine.grossTotal = this.roundNumber(parseFloat(this.selectedInvoiceLine.netTotal) + parseFloat(this.selectedInvoiceLine.totalVat))
    },
    resetTotalPrice () {
      this.selectedInvoiceLine.vatRate = 0
      this.selectedInvoiceLine.netTotal = 0
      this.selectedInvoiceLine.totalVat = 0
      this.selectedInvoiceLine.grossTotal = 0
    },
    calculateTotalPrices () {
      this.form.NetTotal = 0
      this.form.TotalVat = 0
      this.form.GrossTotal = 0
      this.form.TotalItemDiscount = 0
      this.form.TotalOtherDiscount = 0
      this.form.TotalDiscount = 0
      for (let index = 0; index < this.form.InvoiceLines.length; index++) {
        this.form.InvoiceLines[index].LineNumber = index
        this.form.NetTotal += parseFloat(this.form.InvoiceLines[index].NetTotal)
        this.form.TotalVat += parseFloat(this.form.InvoiceLines[index].TotalVat)
        this.form.GrossTotal += parseFloat(this.form.InvoiceLines[index].GrossTotal)
      }

      this.form.NetTotal = this.roundNumber(this.form.NetTotal)
      this.form.TotalVat = this.roundNumber(this.form.TotalVat)
      this.form.GrossTotal = this.roundNumber(this.form.GrossTotal)
    },
    addInvoiceLine () {
      this.$v.selectedInvoiceLine.$touch()
      if (this.$v.selectedInvoiceLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.InvoiceLines.filter(i => i.ItemId === this.selectedInvoiceLine.selectedItem.RecordId)
      if (filteredArr.length > 0 && !this.selectedInvoiceLine.isUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let length = this.form.InvoiceLines.length
      let selectedItem = this.selectedInvoiceLine.selectedItem
      let quantity = this.selectedInvoiceLine.quantity
      let order = {
        ItemName: selectedItem.Description1,
        Description1: this.selectedInvoiceLine.description1,
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: length,
        ItemId: selectedItem.RecordId,
        ItemCode: selectedItem.Code,
        UnitSetId: selectedItem.UnitSetId,
        UnitId: selectedItem.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: quantity,
        VatRate: this.selectedInvoiceLine.vatRate,
        TotalVat: this.selectedInvoiceLine.totalVat,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        Price: this.selectedInvoiceLine.price,
        GrossTotal: this.selectedInvoiceLine.grossTotal,
        NetTotal: this.selectedInvoiceLine.netTotal,
        IsFreeItem: 0,
        IsCanceled: 0,
        PriceListPrice: this.selectedInvoiceLine.price,
        SalesQuantity1: quantity,
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: 0,
        TempDiscountNetTotal: 0,
        DiscountNetTotal: 0,
        DiscountQuantity: 0,
        TotalSubtotalDiscount: 0,
        CalculatedVat: 0
      }
      if (this.selectedInvoiceLine.isUpdated) {
        this.form.InvoiceLines[this.selectedIndex] = order
        this.selectedInvoiceLine.isUpdated = false
      } else {
        this.form.InvoiceLines.push(order)
      }
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedInvoiceLine = {}
      this.$v.selectedInvoiceLine.$reset()
    },
    removeInvoiceLine (item) {
      this.form.InvoiceLines.splice(this.form.InvoiceLines.indexOf(item), 1)
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedInvoiceLine = {}
      this.$v.selectedInvoiceLine.$reset()
    },
    editInvoiceLine (item) {
      this.selectedIndex = this.form.InvoiceLines.indexOf(item)
      this.selectedInvoiceLine = {
        quantity: item.Quantity,
        price: item.Price,
        vatRate: item.VatRate,
        netTotal: item.NetTotal,
        totalVat: item.TotalVat,
        grossTotal: item.GrossTotal,
        isUpdated: true,
        description1: item.Description1
      }
      this.getItem(item.ItemId)
    },
    confirmSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerFirstSet = false
      this.form.InvoiceLines = []
      this.form.RecvLocationId = this.selectedCustomer.DefaultLocationId
    },
    cancelSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerSelectCancelled = true
      this.selectedCustomer = this.currentCustomer
    },
    setTotalDiscount (value) {
      if (value) {
        this.selectedInvoiceDiscount.totalDiscount = parseFloat(this.form.GrossTotal) * parseFloat(value) / 100
      } else {
        this.selectedInvoiceDiscount.totalDiscount = 0
      }
    },
    addInvoiceDiscount () {
      this.$v.selectedInvoiceDiscount.$touch()
      if (this.$v.selectedInvoiceDiscount.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.InvoiceDiscounts.push({
        DiscountClassId: 1,
        IsItemLineDiscount: 0,
        RecordState: 2,
        DiscountReasonId: this.selectedInvoiceDiscount.discountReason.RecordId,
        DiscountReasonName: this.selectedInvoiceDiscount.discountReason.Description1,
        TotalDiscount: this.selectedInvoiceDiscount.totalDiscount,
        DiscountPercent: this.selectedInvoiceDiscount.discountPercent
      })
      this.selectedInvoiceDiscount = {}
      this.$v.selectedInvoiceDiscount.$reset()
    },
    removeInvoiceDiscount (item) {
      this.form.InvoiceDiscounts.splice(this.form.InvoiceDiscounts.indexOf(item), 1)
    },
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
        if (!this.form.InvoiceLines || this.form.InvoiceLines.length === 0) {
          this.$toasted.show(this.$t('insert.order.noOrderLines'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.createData()
      }
    },
    getPaymentTypes () {
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        this.paymentTypes = res.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        this.selectedPaymentType = res.Model.DefaultPaymentType
        this.form.PaymentTypeId = this.selectedPaymentType.DecimalValue
      })
    }
  },
  validations () {
    return {
      form: this.insertRules,
      selectedInvoiceLine: {
        selectedItem: {
          required
        },
        quantity: {
          required,
          minValue: minValue(1)
        },
        price: {
          required
        },
        grossTotal: {
          required
        },
        netTotal: {
          required
        },
        vatRate: {
          required
        },
        totalVat: {
          required
        },
        description1: {
          required
        }
      },
      selectedInvoiceDiscount: {
        discountReason: {
          required
        },
        totalDiscount: {
          required
        },
        discountPercent: {
          required
        }
      }
    }
  },
  watch: {
    selectedCustomer (newValue, oldValue) {
      this.getPaymentTypes()
      this.form.PaymentPeriodId = newValue && newValue.PaymentPeriod ? newValue.PaymentPeriod : 0
      if (this.customerFirstSet) {
        this.confirmSelectedCustomer()
        return
      }
      if (newValue !== oldValue && !this.customerSelectCancelled) {
        this.currentCustomer = oldValue
        this.$bvModal.show('confirm-modal')
      }
      this.customerSelectCancelled = false
    },
    documentDate (e) {
      if (e) {
        this.form.DocumentDate = e
        if (this.documentDateFirstSet) {
          this.documentDateFirstSet = false
          return false
        } else {
          this.form.InvoiceLines = []
          this.$toasted.show(this.$t('insert.order.orderLinesRemoved'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
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
  height: 90px;
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
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
</style>
