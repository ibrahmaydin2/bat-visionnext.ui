<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'PurchaseWaybill' }">
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
                <NextDatePicker v-model="documentDate" :disabled="true" />
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <NextTimePicker v-model="form.DocumentTime" :disabled="true" />
              </NextFormGroup>
              <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="3" lg="3">
                <NextDropdown v-model="selectedWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1" :disabled="true" url="VisionNextWarehouse/api/Warehouse/Search" :dynamic-and-condition="{ StatusIds: [1] , IsVehicle: 1 }"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <NextDropdown
                  @input="selectedSearchType('CustomerId', $event)"
                  :disabled="true"
                  url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                  v-model="selectedCustomer"
                  :searchable="true"
                  label="Description1"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  />
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
        <b-tab :title="$t('insert.order.enterWaybill')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.InvoiceNumber" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="PrintedDispatchNumber" :error="$v.form.PrintedDispatchNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.PrintedDispatchNumber" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown v-model="selectedInvoiceKind" @input="selectedSearchType('InvoiceKindId', $event)" :disabled="true" label="Description1" url="VisionNextInvoice/api/InvoiceKind/Search" :dynamic-and-condition="{ StatusIds: [1] , RecordIds: [2] }"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp2" :error="$v.form.Genexp2" md="2" lg="2">
              <NextInput type="text" v-model="form.Genexp2" :disabled="insertReadonly.Genexp2" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedRepresentative" @input="selectedSearchType('RepresentativeId', $event)" :disabled="true" label="Description1" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedDeliveryRepresentative" @input="selectedSearchType('DeliveryRepresentativeId', $event)" label="Description1" :disabled="true" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown v-model="selectedCurrency" :disabled="true"  label="Description1" @input="selectedSearchType('CurrencyId', $event)" url="VisionNextSystem/api/SysCurrency/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown v-model="selectedVehicle" @input="selectedSearchType('VehicleId', $event)" :disabled="true" label="Description1" url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown v-model="route" @input="selectedSearchType('RouteId', $event)" label="Description1" url="VisionNextRoute/api/Route/AutoCompleteSearch" searchable :disabled="true" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
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
                  <b-td>{{o.Item ? o.Item.Label : o.Description1}}</b-td>
                  <b-td>{{o.Item ? o.Item.Code : o.ItemCode}}</b-td>
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
        Deleted: null,
        System: null,
        StatusId: null,
        RecordState: null,
        InvoiceNumber: null,
        DocumentNumber: null,
        DocumentClassId: null,
        InvoiceKindId: null,
        CustomerId: null,
        WarehouseId: null,
        RepresentativeId: null,
        RecvLocationId: null,
        PaymentTypeId: null,
        PaymentPeriodId: null,
        PriceListId: null,
        CurrencyId: null,
        DocumentDate: null,
        DocumentTime: null,
        ActualDeliveryDate: null,
        ActualDeliveryTime: null,
        TerminalOrPc: null,
        Genexp2: null,
        PrintedDispatchNumber: null,
        VehicleId: null,
        TotalUserDiscount: null,
        TotalItemDiscount: null,
        TotalOtherDiscount: null,
        TotalDiscount: null,
        TotalVat: null,
        GrossTotal: null,
        NetTotal: null,
        IsEndorsementReturn: null,
        IsManuelClosure: null,
        IsDbs: null,
        IsProforma: null,
        IsContractFocInvoice: null,
        IsMatched: null,
        DeliveryRepresentativeId: null,
        IsPreprintedDocument: null,
        Description1: null,
        Printed: null,
        Canceled: null,
        ConversionCounter: null,
        InvoiceLines: [],
        RouteId: null
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
      selectedRepresentative: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      selectedPaymentType: null,
      currentPage: 1,
      selectedBranch: {},
      selectedDeliveryRepresentative: null,
      selectedStatus: null,
      selectedInvoiceKind: null,
      route: null
    }
  },
  computed: {
    ...mapState(['paymentTypes', 'items', 'priceListItems', 'stocks'])
  },
  mounted () {
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      this.$api.post({RecordId: this.$route.params.url}, 'Invoice', 'PurchaseWaybill/Get').then((response) => {
        if (response && response.Model) {
          if (response.Model.Printed === 1) {
            this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.eDocumentIsPrintedError') })
            setTimeout(() => {
              this.$router.push({ name: 'PurchaseWaybill' })
            }, 2000)
          } else {
            this.setData(response.Model)
          }
        }
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response ? response.Model : {}
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
          InvoiceClass: 4
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
    searchItems (search, loading) {
      if (!this.form.WarehouseId) {
        this.$toasted.show(this.$t('insert.order.chooseWarehouse'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (!this.form.CustomerId) {
        this.$toasted.show(this.$t('insert.order.chooseCustomer'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextItem/api/Item/Search',
          name: 'items',
          andConditionModel: {
            Description1: search
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
          ItemIds: [this.selectedInvoiceLine.selectedItem.RecordId],
          StatusIds: [2]
        }
      }
      var me = this
      this.searchItemsByModel('VisionNextWarehouse/api/WarehouseStock/Search', 'stocks', model, 1).then(() => {
        if (me.stocks && me.stocks.length > 0) {
          me.selectedInvoiceLine.stock = me.stocks[0].Quantity
        } else {
          me.selectedOrderLine.stock = 0
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
        this.form.NetTotal += this.form.InvoiceLines[index].NetTotal
        this.form.TotalVat += this.form.InvoiceLines[index].TotalVat
        this.form.GrossTotal += this.form.InvoiceLines[index].GrossTotal
      }

      this.form.NetTotal = this.roundNumber(this.form.NetTotal)
      this.form.TotalVat = this.roundNumber(this.form.TotalVat)
      this.form.GrossTotal = this.roundNumber(this.form.GrossTotal)
    },
    setData (rowData) {
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
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedPaymentType = this.convertLookupValueToSearchValue(rowData.PaymentType)
        this.selectedDeliveryRepresentative = this.convertLookupValueToSearchValue(rowData.DeliveryRepresentative)
        this.selectedInvoiceKind = this.convertLookupValueToSearchValue(rowData.InvoiceKind)
        this.route = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
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
        this.form.ActualDeliveryDate = this.form.DocumentDate
        this.form.ActualDeliveryTime = this.form.DocumentTime
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
        this.form.PaymentPeriodId = e.PaymentPeriod ? e.PaymentPeriod : 0
        this.form.RecvLocationId = e.DefaultLocationId
        this.searchPriceList()
      }
    },
    documentDate (e) {
      if (e) {
        this.form.DocumentDate = e
        this.searchPriceList()
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
</style>
