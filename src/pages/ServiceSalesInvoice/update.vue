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
                <b-form-datepicker v-model="form.DocumentDate" :placeholder="$t('insert.chooseDate')" :disabled="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                  v-model="form.DocumentTime"
                  :disabled="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <v-select v-model="selectedCustomer" :options="customers" @search="searchCustomer" :filterable="false" @input="selectedSearchType('CustomerId', $event)" label="Description1" :disabled="true">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + (option.StatusId === 1 ? $t('insert.active'): $t('insert.passive')) + ' - ' + option.Description1}}
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
              <b-form-input type="text" v-model="form.InvoiceNumber" :readonly="insertReadonly.InvoiceNumber" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <v-select v-model="selectedInvoiceKind" label="Description1" :options="invoiceKinds" :filterable="false" @input="selectedSearchType('InvoiceKindId', $event)" :disabled="true"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber"/>
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <v-select v-model="selectedRoute" label="Description1" :options="routes" @search="searchRoute" :filterable="false" @input="selectedSearchType('RouteId', $event)" :disabled="true">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <v-select v-model="selectedRepresentative" label="Description1" :options="representatives" :filterable="false" @input="selectedSearchType('RepresentativeId', $event)" :disabled="true"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <v-select v-model="selectedCurrency" label="Description1" :options="currencies" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <v-select v-model="selectedPaymentType" :options="paymentTypes" label="Label"  @input="selectedType('PaymentTypeId', $event)" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
               <b-form-input type="text" v-model="form.PaymentPeriodId" :disabled="true" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()" v-if="form.CustomerId > 0">
          <!--<b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedInvoiceLine.selectedItem" :required="true" md="2" lg="2">
              <v-select v-model="selectedInvoiceLine.selectedItem" :options="items" :filterable="false" @search="searchItems" label="Description1" @input="setTotalPrice">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedInvoiceLine.quantity" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.quantity" @input="setTotalPrice" min=1 />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedInvoiceLine.price" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.price"  @input="setTotalPrice"/>
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
          </b-row>-->
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
                <!--<b-th><span>{{$t('list.operations')}}</span></b-th>-->
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.InvoiceLines ? form.InvoiceLines.filter(x => x.RecordState != 4) : [])" :key="i">
                  <b-td>{{o.Item ? o.Item.Label : o.ItemName}}</b-td>
                  <b-td>{{o.Item ? o.Item.Code : o.ItemCode}}</b-td>
                  <b-td>{{o.Description1}}</b-td>
                  <b-td>{{o.Quantity}}</b-td>
                  <b-td>{{o.Price}}</b-td>
                  <b-td>{{o.VatRate}}</b-td>
                  <b-td>{{o.NetTotal}}</b-td>
                  <b-td>{{o.TotalVat}}</b-td>
                  <b-td>{{o.GrossTotal}}</b-td>
                  <!--<b-td class="text-center">
                    <i @click="editInvoiceLine(o)" class="fa fa-edit text-warning"></i>
                    <i @click="removeInvoiceLine(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>-->
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')" v-if="form.InvoiceLines && form.InvoiceLines.length > 0">
          <!--<b-row>
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
          </b-row>-->
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.discountReason')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountPercent')}}</span></b-th>
                <b-th><span>{{$t('insert.order.totalDiscount')}}</span></b-th>
                <!--<b-th><span>{{$t('list.operations')}}</span></b-th>-->
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.InvoiceDiscounts ? form.InvoiceDiscounts.filter(i => i.RecordState != 4) : [])" :key="i">
                  <b-td>{{o.DiscountReason ? o.DiscountReason.Label : DiscountReasonName}}</b-td>
                  <b-td>{{o.DiscountPercent}}</b-td>
                  <b-td>{{o.TotalDiscount}}</b-td>
                  <!--<b-td class="text-center">
                    <i @click="removeInvoiceDiscount(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>-->
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
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
      selectedInvoiceDiscount: {
        discountReason: null,
        totalDiscount: null,
        discountPercent: null
      },
      selectedCustomer: null,
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
        description1: null,
        invoiceId: null
      },
      selectedIndex: null,
      selectedRepresentative: null,
      selectedPaymentType: null,
      currentPage: 1,
      selectedBranch: {},
      selectedStatus: null,
      paymentTypes: [],
      selectedRoute: null,
      selectedInvoiceKind: null
    }
  },
  computed: {
    ...mapState(['representatives', 'customers', 'currencies', 'items', 'discountReasons', 'routes', 'invoiceKinds'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setData()
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'representatives'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountReason/Search', name: 'discountReasons'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextInvoice/api/InvoiceKind/Search', name: 'invoiceKinds'})
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response ? response.Model : {}
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
            Description1: search,
            CardTypeIds: [9]
          }
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
    selectQuantity () {
      this.setTotalPrice()
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
      for (let index = 0; index < this.form.InvoiceLines.filter(o => o.RecordState !== 4).length; index++) {
        this.form.InvoiceLines[index].LineNumber = index
        this.form.NetTotal += this.form.InvoiceLines[index].NetTotal
        this.form.TotalVat += this.form.InvoiceLines[index].TotalVat
        this.form.GrossTotal += this.form.InvoiceLines[index].GrossTotal
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
      let filteredArr = this.form.InvoiceLines.filter(i => i.ItemId === this.selectedInvoiceLine.selectedItem.RecordId && i.RecordState !== 4)
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
        RecordState: this.selectedInvoiceLine.recordState ? this.selectedInvoiceLine.recordState : 2,
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
        RecordId: this.selectedInvoiceLine.recordId ? this.selectedInvoiceLine.recordId : null,
        TotalSubtotalDiscount: 0,
        CalculatedVat: 0,
        InvoiceId: this.selectedInvoiceLine.invoiceId
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
      this.form.InvoiceLines[this.form.InvoiceLines.indexOf(item)].RecordState = 4
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
        recordState: item.RecordState,
        recordId: item.RecordId,
        description1: item.Description1,
        isUpdated: true,
        invoiceId: item.InvoiceId
      }
      this.getItem(item.ItemId)
    },
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
      this.form.InvoiceLines[this.form.InvoiceLines.indexOf(item)].RecordState = 4
    },
    searchRoute (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextRoute/api/Route/AutoCompleteSearch',
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
        },
        description1: {
          required
        }
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
