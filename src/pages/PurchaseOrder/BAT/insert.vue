<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <b-button size="sm" variant="warning" @click="$bvModal.show('confirm-products-modal')" :title="$t('insert.order.getLastOrderProducts')">
              <i class="fa fa-list-alt"></i>
            </b-button>
            <router-link :to="{name: 'PurchaseOrder' }">
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
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="4" lg="4">
                <NextDatePicker v-model="documentDate" :disabled="selectedCustomer !== null || insertReadonly.DocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="4" lg="4">
                <NextTimePicker v-model="form.DocumentTime" :disabled="insertReadonly.DocumentTime" />
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="4" lg="4">
                <NextDatePicker v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
              </NextFormGroup>
              <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="4" lg="4">
                <NextDropdown @input="selectWarehouse($event)" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" :dynamic-and-condition="{ StatusIds: [1] , IsVehicle: 0 }" :disabled="insertReadonly.WarehouseId" />
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="4" lg="4">
                <NextDropdown
                  v-model="selectedCustomer"
                  :source="customers"
                  @input="selectedSearchType('CustomerId', $event)"
                  :disabled="form.WarehouseId == null || customers.length === 0 || insertReadonly.CustomerId"></NextDropdown>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="4" lg="4">
                <NextDropdown
                  v-model="selectedPrice"
                  :source="priceList"
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
        <b-tab :title="$t('insert.order.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="OrderNumber" :error="$v.form.OrderNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.OrderNumber" :disabled="insertReadonly.OrderNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp2" :error="$v.form.Genexp2" md="2" lg="2">
              <NextInput type="text" v-model="form.Genexp2" :disabled="insertReadonly.Genexp2"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" :dynamic-and-condition="{ StatusIds: [1] }" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable :disabled="insertReadonly.RepresentativeId" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown
                @input="selectedSearchType('CurrencyId', $event)"
                url="VisionNextSystem/api/SysCurrency/Search"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :disabled="insertReadonly.RouteId"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :page-count="500"/>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="1000"
                :disabled="insertReadonly.VehicleId" />
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Canceled" :error="$v.form.Canceled" md="2" lg="2">
              <NextCheckBox v-model="form.Canceled" type="number" toggle :disabled="insertReadonly.Canceled"/>
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Printed" :error="$v.form.Printed" md="2" lg="2">
              <NextCheckBox v-model="form.Printed" type="number" toggle :disabled="insertReadonly.Printed"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedOrderLine.selectedItem" :required="true" md="2" lg="2">
              <NextDropdown
                v-model="selectedOrderLine.selectedItem"
                searchable
                :custom-option="true"
                @input="selectItem($event)"
                :search="searchItems"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedOrderLine.quantity" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.quantity" @input="selectQuantity($event)" @keypress="onlyForCurrencyDot($event)" min="1"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedOrderLine.price" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.price" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.stock')" :error="$v.selectedOrderLine.stock" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.stock" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatRate')" :error="$v.selectedOrderLine.vatRate" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.vatRate" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.netTotal')" :error="$v.selectedOrderLine.netTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.netTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatTotal')" :error="$v.selectedOrderLine.vatTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.vatTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.grossTotal')" :error="$v.selectedOrderLine.grossTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="selectedOrderLine.grossTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addOrderLine" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
                <NextMultipleSelection
                  name="PurchaseOrderMultipleItem"
                  v-model="form.OrderLines"
                  :hidden-values="multipleItemSearch.hiddenValues"
                  :disabled-button="!form.WarehouseId || !form.PriceListId"
                  :converted-values="multipleItemSearch.convertedValues"
                  :dynamic-and-condition="{WarehouseIds: [form.WarehouseId], PriceListIds: [form.PriceListId], CustomerIds: [form.CustomerId], CurrencyIds: [form.CurrencyId]}"
                  :validations="multipleItemSearch.quantityValidation"
                  :summary-items="multipleItemSearch.summaryItems"
                  @input="calculateTotalPrices()"
                />
            </b-col>
          </b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in form.OrderLines" :key="i">
                  <b-td>{{o.Description1}}</b-td>
                  <b-td>{{o.ItemCode}}</b-td>
                  <b-td>{{o.Quantity}}</b-td>
                  <b-td>{{o.Price}}</b-td>
                  <b-td>{{o.VatRate}}</b-td>
                  <b-td>{{o.NetTotal}}</b-td>
                  <b-td>{{o.TotalVat}}</b-td>
                  <b-td>{{o.GrossTotal}}</b-td>
                  <b-td class="text-center">
                    <i @click="editOrderLine(o)" class="fa fa-edit text-warning"></i>
                    <i @click="removeOrderLine(o)" class="far fa-trash-alt text-danger"></i>
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
    <b-modal id="confirm-products-modal">
      <template #modal-title>
        {{$t('insert.order.getLastOrderProducts')}}
      </template>
      {{$t('insert.order.productsWillDeleted')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide('confirm-products-modal')">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="getLastProducts">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
  </b-row>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import insertMixin from '../../../mixins/insert'
import { mapState } from 'vuex'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        OrderNumber: null,
        DocumentNumber: null,
        Genexp2: null,
        OrderTypeId: 2,
        CustomerId: null,
        DocumentDate: null,
        DocumentTime: null,
        RecvLocationId: null,
        WarehouseId: null,
        RepresentativeId: null,
        DueDate: null,
        RouteId: null,
        CurrencyId: null,
        PriceListId: null,
        VehicleId: null,
        NetTotal: 0,
        TotalVat: 0,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        GrossTotal: 0,
        TotalUserDiscount: 0,
        Printed: 0,
        PrintCount: 0,
        TerminalOrPc: 'P',
        PaymentPeriodId: 0,
        Description1: null,
        PaymentTypeId: null,
        OrderLines: []
      },
      routeName1: 'Order',
      selectedCustomer: null,
      documentDate: null,
      selectedPrice: {},
      priceListItem: {},
      selectedOrderLine: {
        selectedItem: null,
        quantity: null,
        price: null,
        grossTotal: null,
        netTotal: null,
        stock: null,
        vatRate: null,
        vatTotal: null,
        isUpdated: false
      },
      selectedIndex: null,
      customerFirstSet: true,
      documentDateFirstSet: true,
      currentCustomer: {},
      customerSelectCancelled: false,
      customers: [],
      priceList: [],
      items: [],
      priceListItems: [],
      stocks: []
    }
  },
  mounted () {
    this.createManualCode('OrderNumber')
    this.getInsertPage(this.routeName)
  },
  computed: {
    ...mapState(['multipleItemSearch'])
  },
  methods: {
    getInsertPage (e) {
      let currentDate = new Date()
      let date = currentDate.toISOString().slice(0, 10) + 'T00:00:00.000Z'
      this.documentDate = date
      this.form.DocumentTime = currentDate.toTimeString().slice(0, 5)
      this.form.DueDate = date
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate) {
        return false
      }
      let model = {
        model: {
          CustomerId: this.selectedCustomer.RecordId,
          DocumentDate: this.form.DocumentDate,
          OrderTypeId: 2
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
        Promise.resolve([])
      }
      if (!this.form.CustomerId) {
        this.$toasted.show(this.$t('insert.order.chooseCustomer'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        Promise.resolve([])
      }
      let model = {
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ],
        andConditionModel: {
          StatusIds: [1], CardTypeIds: [1, 2, 8]
        }
      }

      return this.$api.postByUrl(model, 'VisionNextItem/api/Item/AutoCompleteSearch').then((response) => {
        if (response && response.ListModel) {
          return response.ListModel.BaseModels
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
          me.selectedOrderLine.selectedItem = res.ListModel.BaseModels[0]
          me.selectItem()
          me.$forceUpdate()
        }
      })
    },
    searchPriceListItem () {
      if (!this.selectedPrice || !this.selectedPrice.RecordId || !this.selectedOrderLine.selectedItem) {
        return false
      }
      let model = {
        andConditionModel: {
          PriceListIds: [this.selectedPrice.RecordId],
          ItemIds: [this.selectedOrderLine.selectedItem.RecordId]
        }
      }
      var me = this

      me.$api.postByUrl(model, 'VisionNextFinance/api/PriceListItem/Search').then((response) => {
        if (response && response.ListModel) {
          me.priceListItems = response.ListModel.BaseModels
        }
        if (me.priceListItems && me.priceListItems.length > 0) {
          me.priceListItem = me.priceListItems[0]
          if (me.priceListItem.UseConsumerPrice === 1) {
            me.selectedOrderLine.price = this.roundNumber(me.priceListItem.ConsumerPrice)
          } else {
            me.selectedOrderLine.price = this.roundNumber(me.priceListItem.SalesPrice)
          }
        } else {
          me.priceListItem = null
          me.selectedOrderLine.price = null
          me.selectedOrderLine.grossTotal = null
          me.selectedOrderLine.netTotal = null
          me.$toasted.show(this.$t('insert.order.noPriceException'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
        this.setTotalPrice()
      })
    },
    selectItem (value) {
      if (value) {
        this.selectedOrderLine.selectedItem = value
        this.selectedOrderLine.vatRate = this.priceListItem.UseConsumerPrice === 0 ? value.Vat : 0
      }
      this.searchPriceListItem()
      this.setStock()
    },
    selectQuantity (model) {
      this.selectedOrderLine.quantity = model
      this.setTotalPrice()
    },
    setTotalPrice () {
      if (!this.selectedOrderLine.quantity || !this.selectedOrderLine.selectedItem || !this.selectedOrderLine.price || !this.priceListItem) {
        return false
      }
      let vatRate = this.selectedOrderLine.selectedItem.Vat
      this.selectedOrderLine.vatRate = this.priceListItem.UseConsumerPrice === 0 ? vatRate : 0
      this.selectedOrderLine.netTotal = this.roundNumber(this.selectedOrderLine.price * this.selectedOrderLine.quantity)
      this.selectedOrderLine.vatTotal = this.priceListItem.IsVatIncluded === 1 ? 0 : this.roundNumber(this.selectedOrderLine.netTotal * vatRate / 100)
      this.selectedOrderLine.grossTotal = this.roundNumber(parseFloat(this.selectedOrderLine.netTotal) + parseFloat(this.selectedOrderLine.vatTotal))
    },
    setStock () {
      if (!this.selectedOrderLine.selectedItem || !this.selectedOrderLine.selectedItem.RecordId) {
        this.selectedOrderLine.stock = null
        return false
      }
      let model = {
        andConditionModel: {
          WarehouseIds: [this.form.WarehouseId],
          ItemIds: [this.selectedOrderLine.selectedItem.RecordId]
        }
      }
      var me = this
      this.$api.postByUrl(model, 'VisionNextWarehouse/api/WarehouseStock/Search').then((response) => {
        if (response && response.ListModel) {
          me.stocks = response.ListModel.BaseModels
        }
        if (me.stocks && me.stocks.length > 0) {
          me.selectedOrderLine.stock = me.stocks[0].Quantity
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
      for (let index = 0; index < this.form.OrderLines.length; index++) {
        this.form.OrderLines[index].LineNumber = index
        this.form.NetTotal += parseFloat(this.form.OrderLines[index].NetTotal)
        this.form.TotalVat += parseFloat(this.form.OrderLines[index].TotalVat)
        this.form.GrossTotal += parseFloat(this.form.OrderLines[index].GrossTotal)
      }

      this.form.NetTotal = this.roundNumber(this.form.NetTotal)
      this.form.TotalVat = this.roundNumber(this.form.TotalVat)
      this.form.GrossTotal = this.roundNumber(this.form.GrossTotal)
    },
    addOrderLine () {
      this.$v.selectedOrderLine.$touch()
      if (this.$v.selectedOrderLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.OrderLines.filter(i => i.ItemId === this.selectedOrderLine.selectedItem.RecordId)
      if (filteredArr.length > 0 && !this.selectedOrderLine.isUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let length = this.form.OrderLines.length
      let selectedItem = this.selectedOrderLine.selectedItem
      let quantity = this.selectedOrderLine.quantity
      let order = {
        Description1: selectedItem.Description1,
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
        ShippedQuantity: 0,
        Stock: this.selectedOrderLine.stock,
        VatRate: this.selectedOrderLine.vatRate,
        TotalVat: this.selectedOrderLine.vatTotal,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        Price: this.selectedOrderLine.price,
        GrossTotal: this.selectedOrderLine.grossTotal,
        NetTotal: this.selectedOrderLine.netTotal,
        IsFreeItem: 0,
        IsCanceled: 0,
        PriceListPrice: this.selectedOrderLine.price,
        SalesQuantity1: this.selectedOrderLine.quantity,
        SalesQuantity2: 0,
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: 0,
        TempDiscountNetTotal: 0
      }
      if (this.selectedOrderLine.isUpdated) {
        this.form.OrderLines[this.selectedIndex] = order
        this.selectedOrderLine.isUpdated = false
      } else {
        this.form.OrderLines.push(order)
      }
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedOrderLine = {}
      this.$v.selectedOrderLine.$reset()
    },
    removeOrderLine (item) {
      this.form.OrderLines.splice(this.form.OrderLines.indexOf(item), 1)
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedOrderLine = {}
      this.$v.selectedOrderLine.$reset()
    },
    editOrderLine (item) {
      this.selectedIndex = this.form.OrderLines.indexOf(item)
      this.selectedOrderLine = {
        quantity: item.Quantity,
        price: item.Price,
        vatRate: item.VatRate,
        netTotal: item.NetTotal,
        vatTotal: item.TotalVat,
        grossTotal: item.GrossTotal,
        stock: item.Stock,
        isUpdated: true
      }
      this.getItem(item.ItemId)
    },
    confirmSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerFirstSet = false
      this.searchPriceList()
      this.form.OrderLines = []
      this.form.RecvLocationId = this.selectedCustomer ? this.selectedCustomer.DefaultLocationId : null
    },
    cancelSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerSelectCancelled = true
      this.selectedCustomer = this.currentCustomer
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
        if (!this.form.OrderLines || this.form.OrderLines.length === 0) {
          this.$toasted.show(this.$t('insert.order.noOrderLines'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.DocumentDate = this.getDateWithoutTime(this.form.DocumentDate)
        this.createData()
      }
    },
    getLastProducts () {
      this.$bvModal.hide('confirm-products-modal')
      if (!this.form.CustomerId || !this.form.WarehouseId || !this.form.PriceListId) {
        this.$toasted.show(this.$t('insert.order.lastProductsRequiredMessage'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let request = {
        customerId: this.form.CustomerId,
        warehouseId: this.form.WarehouseId,
        priceListId: this.form.PriceListId
      }
      this.$api.postByUrl(request, 'VisionNextOrder/api/PurchaseOrder/GetLastOrderProducts').then((response) => {
        if (response && response.length > 0) {
          let count = 0
          this.form.OrderLines = []
          response.map(product => {
            this.form.OrderLines.push({
              Description1: product.ItemDescription,
              Deleted: 0,
              System: 0,
              RecordState: 2,
              StatusId: 1,
              LineNumber: count,
              ItemId: product.ItemId,
              ItemCode: product.ItemCode,
              UnitSetId: product.UnitSetId,
              UnitId: product.UnitId,
              ConvFact1: 1,
              ConvFact2: 1,
              Quantity: product.Quantity ? product.Quantity : 0,
              ShippedQuantity: 0,
              Stock: product.Stock,
              VatRate: product.VatRate ? product.VatRate : 0,
              TotalVat: product.TotalVat ? product.TotalVat : 0,
              TotalItemDiscount: 0,
              TotalOtherDiscount: 0,
              Price: product.Price ? product.Price : 0,
              GrossTotal: product.GrossTotal ? product.GrossTotal : 0,
              NetTotal: product.NetTotal ? product.NetTotal : 0,
              IsFreeItem: 0,
              IsCanceled: 0,
              PriceListPrice: product.Price ? product.Price : 0,
              SalesQuantity1: product.Quantity ? product.Quantity : 0,
              SalesUnit1Id: product.UnitId,
              TempDiscountQuantity: product.Quantity ? product.Quantity : 0,
              TempDiscountNetTotal: product.NetTotal ? product.NetTotal : 0
            })
            count++
          })
          this.calculateTotalPrices()
        } else {
          this.$toasted.show(this.$t('insert.order.noLastOrderProducts'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      })
    },
    selectWarehouse (warehouse) {
      this.form.CustomerId = null
      this.selectedCustomer = null
      this.customers = []
      if (warehouse) {
        this.form.WarehouseId = warehouse.RecordId
        let model = {
          RecordId: warehouse.RecordId
        }
        this.$api.postByUrl(model, 'VisionNextWarehouse/api/Warehouse/Get').then((response) => {
          if (response && response.Model && response.Model.WarehouseSuppliers) {
            let recordIds = response.Model.WarehouseSuppliers.map(w => w.SupplierCustomerId)
            this.getSupplierCustomers(recordIds)
          } else {
            this.$toasted.show(this.$t('insert.order.noSupplierCustomers'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        })
      } else {
        this.form.WarehouseId = null
      }
    },
    getSupplierCustomers (recordIds) {
      let model = {
        andConditionModel: {
          RecordIds: recordIds
        }
      }
      this.$api.postByUrl(model, 'VisionNextCustomer/api/Customer/SupplierCustomerSearch').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.customers = response.ListModel.BaseModels
        } else {
          this.$toasted.show(this.$t('insert.order.noSupplierCustomers'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    }
  },
  validations () {
    return {
      form: this.insertRules,
      selectedOrderLine: {
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
        vatTotal: {
          required
        }
      }
    }
  },
  watch: {
    selectedCustomer (newValue, oldValue) {
      this.form.PaymentTypeId = newValue && newValue.DefaultPaymentTypeId ? newValue.DefaultPaymentTypeId : 0
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
        this.searchPriceList()
        if (this.documentDateFirstSet) {
          this.documentDateFirstSet = false
          return false
        } else {
          this.form.OrderLines = []
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
