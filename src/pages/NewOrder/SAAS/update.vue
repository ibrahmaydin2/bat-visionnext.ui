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
          <b-col cols="12">
            <b-row>
              <NextFormGroup item-key="OrderNumber" :error="$v.form.OrderNumber" md="2" lg="2">
                <NextInput type="text" v-model="form.OrderNumber" :disabled="insertReadonly.OrderNumber"></NextInput>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="2" lg="2">
                <NextDatePicker2 :time-picker="true" v-model="documentDate" :disabled="insertReadonly.DocumentDate" @input="selectDocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="2" lg="2">
                <NextDatePicker2 v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
              </NextFormGroup>
              <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
                  <NextDropdown v-model="representative" :disabled="insertReadonly.RepresentativeId" @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
                </NextFormGroup>
              <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
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
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.newOrder.products')" @click.prevent="tabValidation()">
          <b-row>
            <b-col md="5" lg="5" sm="12">
            <AddItem
              @success="successItemAdded"
              :disabled="!form.CustomerId || !form.WarehouseId"
              :dynamic-and-conditions="{ StatusIds: [1], WarehouseIds: [form.WarehouseId], CustomerIds: [form.CustomerId], PriceListIds: [1681208813], CurrencyIds: [1]}" />
            </b-col>
            <b-col md="7" lg="7" sm="12">
              <b-card class="summary-card float-right">
                <div class="summary-area">
                  <span class="summary-title">{{$t('insert.order.netTotal')}}</span>
                  <span class="summary-value text-muted">: {{form.NetTotal}} TL</span>
                  <div class="clearfix"></div>
                  <hr class="summary-hr"/>
                  <span class="summary-title">{{$t('insert.order.vatTotal')}}</span>
                  <span class="summary-value text-muted">: {{form.TotalVat}} TL</span>
                  <div class="clearfix"></div>
                  <hr class="summary-hr"/>
                  <span class="summary-title">{{$t('insert.order.grossTotal')}}</span>
                  <span class="summary-value text-muted">: {{form.GrossTotal}} TL</span>
                  <div class="clearfix"></div>
                  <hr class="summary-hr"/>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <hr/>
          <b-row>
            <div class="products">
              <b-card class="product" body-class="product-body" v-for="(product, index) in form.OrderLines.filter(o => o.RecordState !== 4)" :key="index">
                <b-row>
                  <b-col class="col-md-1 pt-2">
                    <b-button class="mt-1 btn-danger" size="sm" @click="removeOrderLine(index, product)">
                      <i class="far fa-trash-alt"></i>
                    </b-button>
                  </b-col>
                  <b-col class="col-md-2">
                    <img class="product-image" src="https://productimages.hepsiburada.net/s/47/550/10921432318002.jpg" />
                  </b-col>
                  <b-col class="col-md-3 pt-3">
                    <span> {{`${product.Item ? product.Item.Code : product.Code} - ${product.Description1}`}}</span>
                  </b-col>
                  <b-col class="col-md-2">
                    <span><b>{{product.Price.toFixed(2)}} TL</b></span><br />
                    <span>{{$t('insert.newOrder.vatRate')}}: %{{product.VatRate}}</span><br />
                    <span>{{$t('insert.newOrder.stock')}}: {{product.StockQuantity}}</span>
                  </b-col>
                  <b-col class="col-md-2 pt-2">
                    <b-form-spinbutton id="sb-inline" @input="calculateItemTotalPrices($event, product, index)" v-model="product.Quantity" min="0" max="1000" inline></b-form-spinbutton>
                  </b-col>
                  <b-col class="col-md-2">
                    <div>
                      <span class="summary-title">{{$t('insert.newOrder.netTotal')}}</span>
                      <span class="summary-value">: {{product.NetTotal.toFixed(2)}} TL</span>
                    </div>
                    <div>
                      <span class="summary-title">{{$t('insert.newOrder.vatTotal')}}</span>
                      <span class="summary-value">: {{product.TotalVat.toFixed(2)}} TL</span>
                    </div>
                    <div>
                      <span class="summary-title">{{$t('insert.newOrder.grossTotal')}}</span>
                      <span class="summary-value">: {{product.GrossTotal.toFixed(2)}} TL</span>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updatetMixin from '../../../mixins/update'
import AddItem from '../AddItem.vue'
export default {
  mixins: [updatetMixin],
  components: {
    AddItem
  },
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
      paymentTypes: [],
      selectedPaymentType: null,
      representative: null,
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
    calculateItemTotalPrices (val, product, index) {
      let quantity = parseFloat(val)
      if (quantity === 0) {
        this.removeOrderLine(0, product)
        return
      }
      let netTotal = parseFloat(product.Price * quantity)
      let vatTotal = parseFloat(netTotal * product.VatRate / 100)
      this.form.OrderLines[index].NetTotal = netTotal
      this.form.OrderLines[index].TotalVat = vatTotal
      this.form.OrderLines[index].GrossTotal = parseFloat(netTotal + vatTotal)
      this.form.OrderLines[index].RecordState = product.RecordId > 0 ? 3 : 2
      this.calculateTotalPrices()
      this.$forceUpdate()
    },
    removeOrderLine (index, item) {
      if (item.RecordId > 0) {
        this.form.OrderLines[index].RecordState = 4
      } else {
        this.form.OrderLines.splice(index, 1)
      }
      this.calculateTotalPrices()
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
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.warehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
      this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.representative = this.convertLookupValueToSearchValue(rowData.Representative)
      this.documentDate = `${this.form.DocumentDate.slice(0, 10)}T${this.form.DocumentTime}`
      this.calculateTotalPrices()
      this.$forceUpdate()
    },
    successItemAdded (values) {
      if (values && values.length > 0) {
        let filteredList = values.map(v => {
          v.RecordId = null
          v.RecordState = 2
          return v
        }).filter(v => !this.form.OrderLines.some(o => o.ItemId === v.ItemId))
        this.form.OrderLines = [...this.form.OrderLines, ...filteredList]
        this.calculateTotalPrices()
      }
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
.product-image {
  width: 45px;
  margin-left: 20px;
}
.product {
  margin-left: 10px;
  margin-bottom: 10px;
}
.selected-product {
  margin-left: 10px;
  margin-bottom: 10px;
  padding-top: 1.5rem;
  min-width: 100px;
}
.product-body {
  padding: 0.5rem;
}
.products {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 99%;
}
</style>
