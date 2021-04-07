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
                <b-form-datepicker v-model="documentDate" :placeholder="$t('insert.chooseDate')"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                   v-model="form.DocumentTime"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <v-select v-model="selectedCustomer" :options="customers" @search="searchCustomer" :filterable="false" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1}}
                  </template>
                </v-select>
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
              <b-form-input type="text" v-model="form.InvoiceNumber" :readonly="insertReadonly.InvoiceNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <v-select v-model="selectedInvoiceKind" label="Description1" :options="invoiceKinds" :filterable="false" @input="selectedSearchType('InvoiceKindId', $event)" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <v-select label="Description1" :options="routes" @search="searchRoute" :filterable="false" @input="selectedSearchType('RouteId', $event)" >
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <v-select label="Description1" :options="representatives" :filterable="false" @input="selectedSearchType('RepresentativeId', $event)" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <v-select v-model="selectedCurrency" label="Description1" :options="currencies" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <v-select v-model="selectedPaymentType" :options="paymentTypes" label="Label"  @input="selectedType('PaymentTypeId', $event)" :disabled="!paymentTypes || paymentTypes.length === 0"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
             <b-form-input type="text" v-model="form.PaymentPeriodId" disabled />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()" v-if="form.CustomerId > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedInvoiceLine.selectedItem" :required="true" md="2" lg="2">
              <v-select v-model="selectedInvoiceLine.selectedItem" :options="items" :filterable="false" @search="searchItems" label="Description1" @input="setTotalPrice">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedInvoiceLine.quantity" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.quantity" @input="setTotalPrice" min=1 />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedInvoiceLine.price" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.price" @input="setTotalPrice"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.description1')" :error="$v.selectedInvoiceLine.description1" :required="true" md="2" lg="2">
              <b-form-input type="text" v-model="selectedInvoiceLine.description1" />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.order.vatRate')" :error="$v.selectedInvoiceLine.vatRate" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.vatRate" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.netTotal')" :error="$v.selectedInvoiceLine.netTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.netTotal" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatTotal')" :error="$v.selectedInvoiceLine.totalVat" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.totalVat" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.grossTotal')" :error="$v.selectedInvoiceLine.grossTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.grossTotal" disabled />
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceLine" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.product')}}</span></b-th>
                <b-th><span>{{$t('insert.order.productCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.description1')}}</span></b-th>
                <b-th><span>{{$t('insert.order.quantity')}}</span></b-th>
                <b-th><span>{{$t('insert.order.price')}}</span></b-th>
                <b-th><span>{{$t('insert.order.vatRate')}}</span></b-th>
                <b-th><span>{{$t('insert.order.netTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.order.vatTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.order.grossTotal')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in form.InvoiceLines" :key="i">
                  <b-td>{{o.ItemName}}</b-td>
                  <b-td>{{o.ItemCode}}</b-td>
                   <b-td>{{o.Description1}}</b-td>
                  <b-td>{{o.Quantity}}</b-td>
                  <b-td>{{o.Price}}</b-td>
                  <b-td>{{o.VatRate}}</b-td>
                  <b-td>{{o.NetTotal}}</b-td>
                  <b-td>{{o.TotalVat}}</b-td>
                  <b-td>{{o.GrossTotal}}</b-td>
                  <b-td class="text-center">
                    <i @click="editInvoiceLine(o)" class="fa fa-edit text-warning"></i>
                    <i @click="removeInvoiceLine(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')" v-if="form.InvoiceLines && form.InvoiceLines.length > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.discountReason')" :error="$v.selectedInvoiceDiscount.discountReason" :required="true" md="3" lg="3">
              <v-select v-model="selectedInvoiceDiscount.discountReason" :options="discountReasons" :filterable="false" label="Description1" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.discountPercent')" :error="$v.selectedInvoiceDiscount.discountPercent" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="selectedInvoiceDiscount.discountPercent" @input="setTotalDiscount"  />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.totalDiscount')" :error="$v.selectedInvoiceDiscount.totalDiscount" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="selectedInvoiceDiscount.totalDiscount" :disabled="true" />
            </NextFormGroup>
            <b-col cols="12" md="3" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceDiscount" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.discountReason')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountPercent')}}</span></b-th>
                <b-th><span>{{$t('insert.order.totalDiscount')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in form.InvoiceDiscounts" :key="i">
                  <b-td>{{o.DiscountReasonName}}</b-td>
                  <b-td>{{o.DiscountPercent}}</b-td>
                  <b-td>{{o.TotalDiscount}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeInvoiceDiscount(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
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
import insertMixin from '../../mixins/insert'
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
        DocumentClassId: 10,
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
        InvoiceLines: [],
        InvoiceDiscounts: [],
        RouteId: null
      },
      routeName1: 'Invoice',
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
      currentPage: 1,
      currentCustomer: {},
      customerSelectCancelled: false,
      selectedBranch: {},
      selectedPaymentType: {},
      paymentTypes: [],
      selectedInvoiceKind: null
    }
  },
  computed: {
    ...mapState(['representatives', 'customers', 'currencies', 'items', 'discountReasons', 'routes', 'invoiceKinds'])
  },
  mounted () {
    this.createManualCode('InvoiceNumber')
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'representatives'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountReason/Search', name: 'discountReasons'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextInvoice/api/InvoiceKind/Search', name: 'invoiceKinds'}).then(() => {
        this.selectedInvoiceKind = this.invoiceKinds.find(i => i.RecordId === 1)
      })
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response ? response.Model : {}
      })
      let currentDate = new Date()
      let date = currentDate.toISOString().slice(0, 10)
      this.documentDate = date
      let time = currentDate.toLocaleTimeString()
      this.form.DocumentTime = time
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'customers',
        andConditionModel: {
          SalesDocumentTypeIds: [45, 46]
        },
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
    searchItems (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextItem/api/Item/Search',
          name: 'items',
          andConditionModel: {
            CardTypeIds: [9]
          },
          orConditionModels: [
            {
              Description1: search,
              Code: search
            }
          ]
        }).then(res => {
          loading(false)
        })
      }
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
        Description1: this.selectedInvoiceLine.description1,
        ItemName: selectedItem.Description1,
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
    setTotalDiscount () {
      this.selectedInvoiceDiscount.totalDiscount = parseFloat(this.form.GrossTotal) * parseFloat(this.selectedInvoiceDiscount.discountPercent) / 100
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
    searchRoute (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextRoute/api/Route/Search',
          name: 'routes',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
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
      let me = this
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        me.paymentTypes = res.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        me.selectedPaymentType = res.Model.DefaultPaymentType
        me.form.PaymentTypeId = me.selectedPaymentType.DecimalValue
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
    },
    currencies (e) {
      if (e && e.length > 0) {
        this.selectedCurrency = e[0]
        this.form.CurrencyId = e[0].RecordId
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
