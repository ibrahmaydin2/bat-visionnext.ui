<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'PurchaseReturnInvoice' }">
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
                <NextDatePicker v-model="documentDate" :disabled="insertReadonly.DocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <NextTimePicker v-model="form.DocumentTime" :disabled="insertReadonly.DocumentTime" />
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <NextDropdown
                  v-model="selectedCustomer"
                  @input="selectedSearchType('CustomerId', $event)"
                  url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                  :searchable="true" :custom-option="true"
                  :disabled="insertReadonly.CustomerId" label="Description1"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  :dynamic-and-condition="{ SalesDocumentTypeIds: [45, 46] }"
                  :is-customer="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="3" lg="3">
                <NextDropdown
                  v-model="selectedPrice"
                  :source="priceList"
                  label="Description1"
                  :disabled="insertReadonly.PriceListId"/>
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
        <b-tab :title="$t('insert.order.enterInvoice')" active>
          <b-row>
           <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.InvoiceNumber" :disabled="insertReadonly.InvoiceNumber"/>
            </NextFormGroup>
            <NextFormGroup item-key="PrintedDispatchNumber" :error="$v.form.PrintedDispatchNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.PrintedDispatchNumber" :disabled="insertReadonly.PrintedDispatchNumber"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown v-model="selectedInvoiceKind" @input="selectedSearchType('InvoiceKindId', $event)" label="Description1" :disabled="insertReadonly.InvoiceKindId" url="VisionNextInvoice/api/InvoiceKind/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown v-model="selectedCurrency" :disabled="insertReadonly.CurrencyId" @input="selectedSearchType('CurrencyId', $event)" :source="currencies" />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown v-model="selectedWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" :disabled="insertReadonly.WarehouseId" searchable />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')">
          <b-row>
            <NextExportDetail
              url="VisionNextInvoice/api/PurchaseReturnInvoice/ExcelExportItems"
              :record-id="form.RecordId"
              record-key="invoiceId"
              :file-name="$t('insert.order.enterProducts')">
            </NextExportDetail>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.product')}}</span></b-th>
                <b-th><span>{{$t('insert.order.productCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.quantity')}}</span></b-th>
                <b-th><span>{{$t('insert.order.price')}}</span></b-th>
                <b-th><span>{{$t('insert.order.vatRate')}}</span></b-th>
                <b-th><span>{{$t('insert.order.netTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.order.vatTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.order.grossTotal')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.InvoiceLines ? form.InvoiceLines.filter(x => x.RecordState != 4) : [])" :key="i">
                  <b-td>{{o.Item.Label}}</b-td>
                  <b-td>{{o.Item.Code}}</b-td>
                  <b-td>{{o.Quantity}}</b-td>
                  <b-td>{{o.Price}}</b-td>
                  <b-td>{{o.VatRate}}</b-td>
                  <b-td>{{o.NetTotal}}</b-td>
                  <b-td>{{o.TotalVat}}</b-td>
                  <b-td>{{o.GrossTotal}}</b-td>
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
        StateId: 1,
        InvoiceNumber: null,
        InvoiceKindId: 3,
        DocumentClassId: 2,
        GrossTotal: 0,
        DocumentNumber: null,
        ActualDeliveryDate: null,
        ActualDeliveryTime: null,
        Description1: null,
        WarehouseId: null,
        CustomerId: null,
        PriceListId: null,
        DocumentDate: null,
        DocumentTime: null,
        StatusId: 1,
        IsPrinted: 0,
        IsCanceled: 0,
        PrintCount: 0,
        PaymentTypeId: null,
        CurrencyId: null,
        NetTotal: 0,
        TotalVat: 0,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        InvoiceLines: [],
        PrintedDispatchNumber: null
      },
      routeName1: 'Invoice',
      selectedCustomer: null,
      documentDate: null,
      selectedPrice: {},
      selectedCurrency: {},
      priceListItem: {},
      selectedInvoiceLine: {
        selectedItem: null,
        quantity: null,
        price: null,
        grossTotal: null,
        netTotal: null,
        stock: null,
        vatRate: null,
        totalVat: null,
        isUpdated: false
      },
      selectedIndex: null,
      selectedWarehouse: null,
      currentPage: 1,
      selectedStatus: null,
      selectedInvoiceKind: null,
      priceList: [],
      currencies: []
    }
  },
  computed: {
    ...mapState(['items', 'priceListItems', 'stocks'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.getCurrencies()
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setData()
      })
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate) {
        return false
      }
      let model = {
        model: {
          CustomerId: this.selectedCustomer.RecordId,
          DocumentDate: this.form.DocumentDate,
          InvoiceClass: 6
        }
      }
      this.$api.postByUrl(model, 'VisionNextFinance/api/PriceList/SearchForPurchaseSales').then((response) => {
        if (response && response.Model) {
          this.selectedPrice = {
            RecordId: response.Model.PriceListId,
            Description1: response.Model.PriceList.Label
          }
          this.priceList = [this.selectedPrice]
          this.form.PriceListId = response.Model.PriceListId
          this.searchPriceListItem()
        } else {
          this.selectedPrice = {}
          this.form.PriceListId = null
        }
      })
    },
    getCurrencies () {
      this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
        }
      })
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
          me.selectItem()
          me.$forceUpdate()
        }
      })
    },
    searchPriceListItem () {
      if (!this.selectedPrice || !this.selectedPrice.RecordId || !this.selectedInvoiceLine.selectedItem) {
        return false
      }
      let model = {
        andConditionModel: {
          PriceListIds: [this.selectedPrice.RecordId],
          ItemIds: [this.selectedInvoiceLine.selectedItem.RecordId]
        }
      }
      var me = this
      me.searchItemsByModel('VisionNextFinance/api/PriceListItem/Search', 'priceListItems', model, 1).then(() => {
        if (me.priceListItems && me.priceListItems.length > 0) {
          me.priceListItem = me.priceListItems[0]
          me.selectedInvoiceLine.price = this.roundNumber(me.priceListItem.SalesPrice)
        } else {
          me.priceListItem = null
          me.selectedInvoiceLine.price = null
          me.selectedInvoiceLine.grossTotal = null
          me.selectedInvoiceLine.netTotal = null
          me.$toasted.show(this.$t('insert.order.noPriceException'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
        this.setTotalPrice()
      })
    },
    selectItem () {
      this.searchPriceListItem()
      this.setStock()
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
      this.selectedInvoiceLine.grossTotal = this.roundNumber(this.selectedInvoiceLine.price * this.selectedInvoiceLine.quantity)
      this.selectedInvoiceLine.totalVat = this.roundNumber(this.selectedInvoiceLine.grossTotal * vatRate / 100)
      this.selectedInvoiceLine.netTotal = this.roundNumber(this.selectedInvoiceLine.grossTotal - this.selectedInvoiceLine.totalVat)
    },
    setStock () {
      if (!this.selectedInvoiceLine.selectedItem || !this.selectedInvoiceLine.selectedItem.RecordId) {
        this.selectedInvoiceLine.stock = null
        return false
      }
      let model = {
        andConditionModel: {
          WarehouseIds: [this.form.WarehouseId],
          ItemIds: [this.selectedInvoiceLine.selectedItem.RecordId]
        }
      }
      var me = this
      this.searchItemsByModel('VisionNextWarehouse/api/WarehouseStock/Search', 'stocks', model, 1).then(() => {
        if (me.stocks && me.stocks.length > 0) {
          me.selectedInvoiceLine.stock = me.stocks[0].Quantity
        } else {
          this.$toasted.show(this.$t('insert.order.noStocksException'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
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
        this.form.NetTotal += parseFloat(this.form.InvoiceLines[index].NetTotal)
        this.form.TotalVat += parseFloat(this.form.InvoiceLines[index].TotalVat)
        this.form.GrossTotal += parseFloat(this.form.InvoiceLines[index].GrossTotal)
      }

      this.form.NetTotal = this.roundNumber(this.form.NetTotal)
      this.form.TotalVat = this.roundNumber(this.form.TotalVat)
      this.form.GrossTotal = this.roundNumber(this.form.GrossTotal)
    },
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.form = rowData
        this.documentDate = rowData.DocumentDate
        this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
        this.$api.post({RecordId: rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          if (response.Model) {
            this.selectedCustomer = response.Model
          }
        })
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedInvoiceKind = this.convertLookupValueToSearchValue(rowData.InvoiceKind)
        if (this.orderStatusList && this.orderStatusList.length > 0) {
          this.selectedStatus = this.orderStatusList.find(x => x.RecordId === this.form.StatusId)
        }
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
      }
    },
    save () {
      this.form.PaymentPeriodId = this.selectedCustomer.DefaultPaymentType && this.selectedCustomer.DefaultPaymentType.Code === 'AH'
        ? this.selectedCustomer.PaymentPeriod
        : 0
      this.form.RecordState = 3
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
        this.form.DocumentDate = this.getDateWithoutTime(this.form.DocumentDate)
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
        },
        stock: {
          required
        }
      }
    }
  },
  watch: {
    selectedCustomer (e) {
      if (e) {
        this.searchPriceList()
        if (e.DefaultLocationId) {
          this.form.RecvLocationId = e.DefaultLocationId
        }
      }
    },
    documentDate (e) {
      if (e) {
        this.form.DocumentDate = e
        this.searchPriceList()
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
</style>
