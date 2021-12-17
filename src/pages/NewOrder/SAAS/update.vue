<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'NewOrder' }">
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
          <b-col md="12" lg="9" sm="12">
            <b-row>
              <NextFormGroup item-key="OrderNumber" :error="$v.form.OrderNumber" md="3" lg="3">
                <NextInput type="text" v-model="form.OrderNumber" :disabled="insertReadonly.OrderNumber"></NextInput>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="3" lg="3">
                <NextDatePicker2 :time-picker="true" v-model="documentDate" :disabled="insertReadonly.DocumentDate" @input="selectDocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="3" lg="3">
                <NextDatePicker2 v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
              </NextFormGroup>
              <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="3" lg="3">
                  <NextDropdown v-model="representative" :disabled="insertReadonly.RepresentativeId" @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
                </NextFormGroup>
              <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="3" lg="3">
                <NextDropdown
                  v-model="warehouse"
                  @input="selectedSearchType('WarehouseId', $event)"
                  url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
                  :dynamic-and-conditions="{IsCenterWarehouse: 1, StatusId: 1}"
                  :disabled="insertReadonly.WarehouseId"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="4" lg="4">
                <NextDropdown
                  v-model="selectedCustomer"
                  :searchable="true"
                  url="VisionNextCustomer/api/Customer/Search"
                  :custom-option="true"
                  :is-customer="true"
                  or-condition-fields="Code,Description1,CommercialTitle,TaxNumber"
                  @input="selectedSearchType('CustomerId', $event);"
                  :disabled="insertReadonly.CustomerId"
                  :dynamic-and-condition="{ StatusIds: [1], IsBlocked: 0 }"/>
              </NextFormGroup>
            </b-row>
          </b-col>
          <b-col md="12" lg="3" sm="12">
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
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.newOrder.products')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.newOrder.category1')" :error="$v.orderLine.category1" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.category1"
                    lookup-key="ITEM_CATEGORY_1"
                    @input="selectCategory($event, 2)"
                    get-lookup/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.category2')" :error="$v.orderLine.category2" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.category2"
                    label="Label"
                    :source="category2List"
                    :disabled="!orderLine.category1"
                    @input="selectCategory($event, 3)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.category3')" :error="$v.orderLine.category3" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.category3"
                    label="Label"
                    :source="category3List"
                    :disabled="!orderLine.category2"
                    @input="selectCategory($event, 4)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.category4')" :error="$v.orderLine.category4" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.category4"
                    label="Label"
                    :source="category4List"
                    :disabled="!orderLine.category3"
                    @input="selectCategory($event, 5)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.category5')" :error="$v.orderLine.category5" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.category5"
                    label="Label"
                    :source="category5List"
                    :disabled="!orderLine.category4"
                    @input="selectCategory($event, 0)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.product')" :error="$v.orderLine.item" :required="true" md="2" lg="2">
              <NextDropdown
                    v-model="orderLine.item"
                    @input="selectItem($event)"
                    :disabled="!orderLine.category5"
                    :source="itemList"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.quantity')" :error="$v.orderLine.quantity" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.quantity" @input="selectQuantity($event)" @keypress="onlyForCurrency($event)" min=1></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.stock')" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.stock" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.price')" :error="$v.orderLine.price" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.price" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.vatRate')" :error="$v.orderLine.vatRate" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.vatRate" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.netTotal')" :error="$v.orderLine.netTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.netTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.vatTotal')" :error="$v.orderLine.vatTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.vatTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.newOrder.grossTotal')" :error="$v.orderLine.grossTotal" :required="true" md="2" lg="2">
              <NextInput type="number" v-model="orderLine.grossTotal" :disabled="true"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addOrderLine" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.newOrder.productCode')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.product')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.quantity')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.price')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.vatRate')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.netTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.vatTotal')}}</span></b-th>
                <b-th><span>{{$t('insert.newOrder.grossTotal')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in form.OrderLines.filter(o => o.RecordState !== 4)" :key="i">
                  <b-td>{{o.Item ? o.Item.Code : o.ItemCode}}</b-td>
                  <b-td>{{o.Item ? o.Item.Label : o.Description1}}</b-td>
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
  </b-row>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import updatetMixin from '../../../mixins/update'
export default {
  mixins: [updatetMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        RecordState: 2,
        SatatusId: 1,
        StateId: 1,
        OrderNumber: null,
        DocumentDate: null,
        DocumentTime: null,
        DueDate: null,
        CustomerId: null,
        WarehouseId: null,
        PaymentTypeId: null,
        PaymentPeriodId: null,
        RepresentativeId: null,
        TerminalOrPc: 'P',
        OrderTypeId: 1,
        IsDbsOffline: 0,
        PriceListCategoryId: 1681208812,
        PriceListId: 1681208813,
        OrderLines: []
      },
      selectedCustomer: null,
      warehouse: null,
      priceListItems: [],
      priceListItem: null,
      orderLine: {
        category1: null,
        category2: null,
        category3: null,
        category4: null,
        category5: null,
        item: null,
        quantity: null,
        price: null,
        grossTotal: null,
        netTotal: null,
        vatRate: null,
        vatTotal: null
      },
      stocks: [],
      paymentTypes: [],
      selectedPaymentType: null,
      representative: null,
      itemList: [],
      category2List: [],
      category3List: [],
      category4List: [],
      category5List: [],
      routeName1: 'Order',
      routeName2: 'Order',
      documentDate: null
    }
  },
  mounted () {
    this.getData().then(() => { this.setData() })
  },
  methods: {
    selectDocumentDate (value) {
      if (value) {
        this.form.DocumentDate = value.slice(0, 10)
        this.form.DocumentTime = new Date(value).toTimeString().slice(0, 5)
      } else {
        this.form.DocumentDate = null
        this.form.DocumentTime = null
      }
    },
    getItem (recordId) {
      let request = {
        andConditionModel: {
          RecordIds: [recordId]
        }
      }

      this.$api.post(request, 'Item', 'Item/Search').then((res) => {
        if (res.ListModel && res.ListModel.BaseModels) {
          this.orderLine.item = res.ListModel.BaseModels[0]
          this.orderLine.category1 = this.orderLine.item.Category1
          this.orderLine.category2 = this.orderLine.item.Category2
          this.orderLine.category3 = this.orderLine.item.Category3
          this.orderLine.category4 = this.orderLine.item.Category4
          this.orderLine.category5 = this.orderLine.item.Category5
          this.selectItem()
          this.$forceUpdate()
        }
      })
    },
    searchPriceListItem () {
      if (!this.orderLine.item) {
        return false
      }
      let model = {
        andConditionModel: {
          PriceListIds: [this.form.PriceListId],
          ItemIds: [this.orderLine.item.RecordId]
        }
      }

      this.$api.postByUrl(model, 'VisionNextFinance/api/PriceListItem/Search').then((response) => {
        if (response && response.ListModel) {
          this.priceListItems = response.ListModel.BaseModels
        }
        if (this.priceListItems && this.priceListItems.length > 0) {
          this.priceListItem = this.priceListItems[0]
          this.orderLine.vatRate = this.priceListItem.UseConsumerPrice === 0 ? this.priceListItem.Vat : 0
          if (this.priceListItem.UseConsumerPrice === 1) {
            this.orderLine.price = this.roundNumber(this.priceListItem.ConsumerPrice)
          } else {
            this.orderLine.price = this.roundNumber(this.priceListItem.SalesPrice)
          }
          this.$forceUpdate()
        } else {
          this.priceListItem = null
          this.orderLine.price = null
          this.orderLine.grossTotal = null
          this.orderLine.netTotal = null
          this.$toasted.show(this.$t('insert.order.noPriceException'), {
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
        this.orderLine.item = value
      }
      this.searchPriceListItem()
      this.setStock()
    },
    selectQuantity (model) {
      this.orderLine.quantity = model
      this.setTotalPrice()
    },
    setTotalPrice () {
      if (!this.orderLine.quantity || !this.orderLine.item || !this.orderLine.price || !this.priceListItem) {
        return false
      }
      let vatRate = this.orderLine.item.Vat
      this.orderLine.vatRate = this.priceListItem.UseConsumerPrice === 0 ? vatRate : 0
      this.orderLine.netTotal = this.roundNumber(this.orderLine.price * this.orderLine.quantity)
      this.orderLine.vatTotal = this.priceListItem.IsVatIncluded === 1 ? 0 : this.roundNumber(this.orderLine.netTotal * vatRate / 100)
      this.orderLine.grossTotal = this.roundNumber(parseFloat(this.orderLine.netTotal) + parseFloat(this.orderLine.vatTotal))
      this.$forceUpdate()
    },
    setStock () {
      if (!this.orderLine.item || !this.orderLine.item.RecordId || !this.form.WarehouseId) {
        this.orderLine.stock = 0
        return false
      }
      let model = {
        andConditionModel: {
          WarehouseIds: [this.form.WarehouseId],
          ItemIds: [this.orderLine.item.RecordId]
        }
      }

      this.$api.postByUrl(model, 'VisionNextWarehouse/api/WarehouseStock/Search').then((response) => {
        if (response && response.ListModel) {
          this.stocks = response.ListModel.BaseModels
        }
        if (this.stocks && this.stocks.length > 0) {
          this.orderLine.stock = this.stocks[0].Quantity
        } else {
          this.orderLine.stock = 0
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
      for (let index = 0; index < this.form.OrderLines.filter(o => o.RecordState !== 4).length; index++) {
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
      this.$v.orderLine.$touch()
      if (this.$v.orderLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.OrderLines.filter(i => i.ItemId === this.orderLine.item.RecordId)
      if (filteredArr.length > 0 && !this.orderLine.isUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let length = this.form.OrderLines.length
      let selectedItem = this.orderLine.item
      let quantity = this.orderLine.quantity
      let order = {
        Description1: selectedItem.Description1,
        Deleted: 0,
        System: 0,
        RecordState: this.orderLine.recordState ? this.orderLine.recordState : 2,
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
        Stock: this.orderLine.stock,
        VatRate: this.orderLine.vatRate,
        TotalVat: this.orderLine.vatTotal,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        Price: this.orderLine.price,
        GrossTotal: this.orderLine.grossTotal,
        NetTotal: this.orderLine.netTotal,
        IsCanceled: 0,
        PriceListPrice: this.orderLine.price,
        SalesQuantity1: this.orderLine.quantity,
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: this.orderLine.quantity,
        TempDiscountNetTotal: this.orderLine.netTotal,
        Category1: this.orderLine.category1,
        Category2: this.orderLine.category2,
        Category3: this.orderLine.category3,
        Category4: this.orderLine.category4,
        Category5: this.orderLine.category5,
        RecordId: this.orderLine.recordId ? this.orderLine.recordId : null
      }
      if (this.orderLine.isUpdated) {
        this.form.OrderLines[this.selectedIndex] = order
        this.orderLine.isUpdated = false
      } else {
        this.form.OrderLines.push(order)
      }
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.orderLine = {}
      this.category2List = []
      this.category3List = []
      this.category4List = []
      this.category5List = []
      this.itemList = []
      this.$v.orderLine.$reset()
    },
    removeOrderLine (item) {
      if (item.RecordId > 0) {
        this.form.OrderLines[this.form.OrderLines.indexOf(item)].RecordState = 4
      } else {
        this.form.OrderLines.splice(this.form.OrderLines.indexOf(item), 1)
      }
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.orderLine = {}
      this.$v.orderLine.$reset()
    },
    editOrderLine (item) {
      this.selectedIndex = this.form.OrderLines.indexOf(item)
      this.orderLine = {
        quantity: item.Quantity,
        price: item.Price,
        vatRate: item.VatRate,
        netTotal: item.NetTotal,
        vatTotal: item.TotalVat,
        grossTotal: item.GrossTotal,
        stock: item.Stock,
        recordState: item.RecordState === 1 ? 3 : item.RecordState,
        recordId: item.RecordId,
        orderId: item.OrderId,
        isUpdated: true,
        category1: item.Category1,
        category2: item.Category2,
        category3: item.Category3,
        category4: item.Category4,
        category5: item.Category5
      }
      this.getItem(item.ItemId)
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
        if (this.form.DueDate < this.form.DocumentDate) {
          this.$toasted.show(this.$t('insert.order.dueDatelessDocumentDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.updateData()
      }
    },
    getPaymentTypes () {
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        this.paymentTypes = res.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        this.selectedPaymentType = res.Model.DefaultPaymentType
        this.form.PaymentTypeId = this.selectedPaymentType.DecimalValue
      })
    },
    selectCategory (value, index) {
      if (index > 0) {
        for (let i = index; i <= 5; i++) {
          this.orderLine[`category${i}`] = null
          this[`category${i}List`] = []
        }
        this.orderLine.item = null
        this.orderLine[`category${index - 1}`] = value
      }
      if (value) {
        let request = {
          andConditionModel: {
            Category1Ids: this.orderLine.category1 ? [this.orderLine.category1.DecimalValue] : null,
            Category2Ids: this.orderLine.category2 ? [this.orderLine.category2.DecimalValue] : null,
            Category3Ids: this.orderLine.category3 ? [this.orderLine.category3.DecimalValue] : null,
            Category4Ids: this.orderLine.category4 ? [this.orderLine.category4.DecimalValue] : null,
            Category5Ids: this.orderLine.category5 ? [this.orderLine.category5.DecimalValue] : null
          }
        }
        this.$api.postByUrl(request, 'VisionNextItem/api/Item/Search').then((response) => {
          if (response && response.ListModel && response.ListModel.BaseModels.length > 0) {
            if (index > 0) {
              this[`category${index}List`] = [...new Set(response.ListModel.BaseModels.map(r => r[`Category${index}`]))]
            } else {
              this.itemList = response.ListModel.BaseModels
            }
          } else {
            this.$toasted.show(this.$t('insert.newOrder.itemNotFound'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        })
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.warehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
      this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.representative = this.convertLookupValueToSearchValue(rowData.Representative)
      this.documentDate = `${this.form.DocumentDate.slice(0, 10)}T${this.form.DocumentTime}`
      this.$forceUpdate()
    }
  },
  validations () {
    let orderLine = {
      category1: {
        required
      },
      category2: {
        required
      },
      category3: {
        required
      },
      category4: {
        required
      },
      category5: {
        required
      },
      item: {
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
    return {
      form: this.insertRules,
      orderLine: orderLine
    }
  },
  watch: {
    selectedCustomer (newValue, oldValue) {
      this.getPaymentTypes()
      this.form.PaymentPeriodId = newValue && newValue.PaymentPeriod ? newValue.PaymentPeriod : 0
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
