<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'SalesWaybill' }">
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
                  :searchable="true"
                  url="VisionNextCustomer/api/Customer/Search"
                  :custom-option="true"
                  :is-customer="true"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  @input="selectedSearchType('CustomerId', $event)"
                  :disabled="insertReadonly.CustomerId"
                  :dynamic-and-condition="{ StatusIds: [1], IsBlocked: 0 }"/>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="3" lg="3">
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
            <NextFormGroup item-key="PrintedDispatchNumber" :error="$v.form.PrintedDispatchNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.PrintedDispatchNumber" :disabled="insertReadonly.PrintedDispatchNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown v-model="selectedInvoiceKind" url="VisionNextInvoice/api/InvoiceKind/Search" @input="selectedSearchType('InvoiceKindId', $event)" :disabled="insertReadonly.InvoiceKindId"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber"></NextInput>
            </NextFormGroup>
             <NextFormGroup item-key="ActualDeliveryDate" :error="$v.form.ActualDeliveryDate" md="2" lg="2" v-if="selectedBranch.UseEDispatch !== 0">
                <NextDatePicker v-model="form.ActualDeliveryDate" :disabled="insertReadonly.ActualDeliveryDate" />
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryTime" :error="$v.form.ActualDeliveryTime" md="2" lg="2" v-if="selectedBranch.UseEDispatch !== 0">
              <NextTimePicker v-model="form.ActualDeliveryTime" :disabled="insertReadonly.ActualDeliveryTime" />
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentStatusId" :error="$v.form.EDocumentStatusId" md="2" lg="2">
              <NextDropdown v-model="selectedEDocumentStatus" url="VisionNextCommonApi/api/EDocumentStatus/Search" @input="selectedSearchType('EDocumentStatusId', $event)" :disabled="insertReadonly.EDocumentStatusId"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedRepresentative" @input="selectedSearchType('RepresentativeId', $event)" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable :disabled="insertReadonly.RepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedDeliveryRepresentative" @input="selectedSearchType('DeliveryRepresentativeId', $event)" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable :disabled="insertReadonly.DeliveryRepresentativeId" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown
                v-model="selectedCurrency"
                @input="selectedSearchType('CurrencyId', $event)"
                url="VisionNextSystem/api/SysCurrency/Search"
                :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown v-model="selectedRoute" @input="selectedSearchType('RouteId', $event)" label="Description1" url="VisionNextRoute/api/Route/AutoCompleteSearch" :disabled="insertReadonly.RouteId" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown v-model="selectedWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" :disabled="insertReadonly.WarehouseId" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown v-model="selectedVehicle" @input="selectedSearchType('VehicleId', $event)" url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch" :disabled="insertReadonly.VehicleId" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <NextDropdown
                    v-model="selectedPaymentType"
                    :source="paymentTypes"
                    label="Label"
                    @input="selectedType('PaymentTypeId', $event)"
                    :disabled="insertReadonly.PaymentTypeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
              <NextInput type="number" v-model="form.PaymentPeriodId" :disabled="insertReadonly.PaymentPeriodId"></NextInput>
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
                <b-th><span>{{$t('insert.order.isFreeItem')}}</span></b-th>
                <b-th><span>{{$t('insert.order.freeReason')}}</span></b-th>
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
                  <b-td>
                    <i v-if="o.IsFreeItem === 1" class="fa fa-check text-success"></i>
                    <i v-else class="fa fa-times text-danger"></i>
                  </b-td>
                  <b-td>{{o.FreeReason ? o.FreeReason.Description1 ? o.FreeReason.Description1 : o.FreeReason.Label : '-' }}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.logisticCompanies')" @click.prevent="tabValidation()" v-if="selectedBranch.UseEDispatch !== 0" :disabled="form.VehicleId > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.companyName')" :error="$v.selectedInvoiceLogisticCompany.companyName" :required="true" md="4" lg="3">
              <NextInput type="text" v-model="selectedInvoiceLogisticCompany.companyName"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.taxNumber')" :error="$v.selectedInvoiceLogisticCompany.taxNumber" :required="true" md="4" lg="3">
              <NextInput type="number" v-model="selectedInvoiceLogisticCompany.taxNumber" :maxLength="10" :oninput="maxLengthControl"></NextInput>
            </NextFormGroup>
          </b-row>
          <NextAddress
            v-model="address"
            :required="true"
            :city-error="$v.selectedInvoiceLogisticCompany.cityId.$error"
            :district-error="$v.selectedInvoiceLogisticCompany.districtId.$error"
            :hide-address="true"
            md="4"
            lg="3"
          />
          <b-col cols="12" md="8" lg="6" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceLogisticCompany" />
              </b-form-group>
            </b-col>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.companyName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.taxNumber')}}</span></b-th>
                <b-th><span>{{$t('insert.order.city')}}</span></b-th>
                <b-th><span>{{$t('insert.order.district')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(l, i) in form.InvoiceLogisticCompanies" :key="i">
                  <b-td>{{l.CompanyName}}</b-td>
                  <b-td>{{l.TaxNumber}}</b-td>
                  <b-td>{{l.City ? l.City.Label : l.CityName}}</b-td>
                  <b-td>{{l.District ? l.District.Label : l.DistrictName}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeInvoiceLogisticCompany(l)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.discounts')">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.discountName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountRate')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountAmount')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.InvoiceDiscounts)" :key="i">
                  <b-td>{{o.DiscountClass ? o.DiscountClass.Label : ''}}</b-td>
                  <b-td>{{o.DiscountClass ? o.DiscountClass.Code : ''}}</b-td>
                  <b-td>{{o.DiscountPercent ? `% ${o.DiscountPercent}` : '-'}}</b-td>
                  <b-td>{{o.TotalDiscount}}</b-td>
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
import { required, minValue, minLength, maxLength, requiredIf } from 'vuelidate/lib/validators'
import updateMixin from '../../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        StateId: 1,
        InvoiceNumber: null,
        InvoiceKindId: 2,
        DocumentClassId: 3,
        EDocumentStatusId: null,
        GrossTotal: 0,
        DocumentNumber: null,
        ActualDeliveryDate: null,
        ActualDeliveryTime: null,
        RepresentativeId: null,
        DeliveryRepresentativeId: null,
        Description1: null,
        RouteId: null,
        WarehouseId: null,
        CustomerId: null,
        PriceListId: null,
        DocumentDate: null,
        DocumentTime: null,
        StatusId: 1,
        VehicleId: null,
        Printed: 0,
        PrintCount: 0,
        PaymentTypeId: null,
        Canceled: 0,
        PaymentPeriodId: null,
        CurrencyId: null,
        NetTotal: 0,
        TotalVat: 0,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        TerminalOrPc: 'P',
        RecvLocationId: null,
        InvoiceLines: [],
        ConversionCounter: 0,
        IsManuelClosure: 0,
        IsDbs: 0,
        IsProforma: 0,
        IsContractFocInvoice: 0,
        IsEndorsementReturn: 0,
        IsValid: 0,
        EDocumentUrl: null,
        IsPreprintedDocument: null,
        IsPrintedDispatch: 0,
        IsManuelTransaction: 0,
        IsMatched: 0,
        InvoiceLogisticCompanies: [],
        PrintedDispatchNumber: null
      },
      routeName1: 'Invoice',
      campaignFields: [
        {key: 'selection', label: '', sortable: false, visibility: 'campaignSelectable'},
        {key: 'Discount.Label', label: this.$t('insert.order.campaignName'), sortable: false},
        {key: 'Discount.Code', label: this.$t('insert.order.campaignCode'), sortable: false}
      ],
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
        isUpdated: false,
        invoiceId: null
      },
      selectedRepresentative: null,
      selectedRoute: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      selectedPaymentType: null,
      currentPage: 1,
      campaignSelectable: false,
      selectedEDocumentStatus: null,
      selectedInvoiceLogisticCompany: {
        companyName: null,
        cityId: null,
        cityName: null,
        districtId: null,
        districtName: null,
        taxNumber: null
      },
      selectedBranch: {},
      address: {},
      selectedDeliveryRepresentative: null,
      paymentTypes: [],
      selectedInvoiceKind: null,
      priceList: [],
      items: [],
      priceListItems: [],
      stocks: []
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        if (this.rowData.Printed === 1) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.eDocumentStatusNotUpdated') })
          setTimeout(() => {
            this.$router.push({ name: 'SalesWaybill' })
          }, 2000)
        }
        this.setData()
      })
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response && response.Model ? response.Model : {}
      })
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate || !this.selectedCustomer.PriceListCategoryId) {
        return false
      }
      let model = {
        andConditionModel: {
          PriceListCategoryIds: [this.selectedCustomer.PriceListCategoryId],
          EndDate: {
            BeginValue: this.form.DocumentDate
          }
        }
      }
      this.$api.postByUrl(model, 'VisionNextFinance/api/PriceList/Search').then((response) => {
        if (response.ListModel && response.ListModel.BaseModels) {
          this.priceList = response.ListModel.BaseModels
          if (this.priceList && this.priceList.length > 0) {
            this.selectedPrice = this.priceList[0]
            this.form.PriceListId = this.priceList[0].RecordId
          } else {
            this.selectedPrice = {}
            this.form.PriceListId = null
          }
          this.searchPriceListItem()
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
          StatusId: 1
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
      me.$api.postByUrl(model, 'VisionNextFinance/api/PriceListItem/Search').then((response) => {
        if (response && response.ListModel) {
          me.priceListItems = response.ListModel.BaseModels
        }
        if (me.priceListItems && me.priceListItems.length > 0) {
          me.priceListItem = me.priceListItems[0]
          if (me.priceListItem.UseConsumerPrice === 1) {
            me.selectedInvoiceLine.price = this.roundNumber(me.priceListItem.ConsumerPrice)
          } else {
            me.selectedInvoiceLine.price = this.roundNumber(me.priceListItem.SalesPrice)
          }
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
      this.$api.postByUrl(model, 'VisionNextWarehouse/api/WarehouseStock/Search').then((response) => {
        if (response && response.ListModel) {
          me.stocks = response.ListModel.BaseModels
        }
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
        this.form.NetTotal += this.form.InvoiceLines[index].NetTotal
        this.form.TotalVat += this.form.InvoiceLines[index].TotalVat
        this.form.GrossTotal += this.form.InvoiceLines[index].GrossTotal
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
          this.selectedCustomer = response.Model
          this.paymentTypes = response.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        })
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedEDocumentStatus = this.convertLookupValueToSearchValue(rowData.EDocumentStatus)
        this.selectedPaymentType = rowData.PaymentType
        this.selectedDeliveryRepresentative = this.convertLookupValueToSearchValue(rowData.DeliveryRepresentative)
        this.selectedInvoiceKind = this.convertLookupValueToSearchValue(rowData.InvoiceKind)
        this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
        if (this.form.InvoiceLogisticCompanies) {
          this.form.InvoiceLogisticCompanies.map(item => {
            item.RecordState = 3
            return item
          })
        }
      }
    },
    addInvoiceLogisticCompany () {
      this.$v.selectedInvoiceLogisticCompany.$touch()
      if (this.$v.selectedInvoiceLogisticCompany.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.InvoiceLogisticCompanies.filter(i => i.CompanyName === this.selectedInvoiceLogisticCompany.companyName &&
      i.TaxNumber === this.selectedInvoiceLogisticCompany.taxNumber && i.CityId === this.selectedInvoiceLogisticCompany.cityId &&
      i.DistrictId === this.selectedInvoiceLogisticCompany.districtId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let filteredItems = this.form.InvoiceLogisticCompanies.filter(i => i.CompanyName === this.selectedInvoiceLogisticCompany.companyName &&
      i.TaxNumber === this.selectedInvoiceLogisticCompany.taxNumber && i.CityId === this.selectedInvoiceLogisticCompany.cityId &&
      i.DistrictId === this.selectedInvoiceLogisticCompany.districtId && i.RecordState === 4)
      if (filteredItems && filteredItems.length > 0) {
        this.form.InvoiceLogisticCompanies[this.form.InvoiceLogisticCompanies.indexOf(filteredItems[0])].RecordState = 3
        return
      }
      let logisticCompany = {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: this.selectedInvoiceLogisticCompany.RecordState ? this.selectedInvoiceLogisticCompany.RecordState : 2,
        RecordId: this.selectedInvoiceLogisticCompany.RecordId,
        CompanyName: this.selectedInvoiceLogisticCompany.companyName,
        TaxNumber: this.selectedInvoiceLogisticCompany.taxNumber,
        CityId: this.selectedInvoiceLogisticCompany.cityId,
        DistrictId: this.selectedInvoiceLogisticCompany.districtId,
        CityName: this.selectedInvoiceLogisticCompany.cityName,
        DistrictName: this.selectedInvoiceLogisticCompany.districtName
      }
      this.form.InvoiceLogisticCompanies.push(logisticCompany)
      this.selectedInvoiceLogisticCompany = {}
      this.address = {}
      this.$v.selectedInvoiceLogisticCompany.$reset()
    },
    removeInvoiceLogisticCompany (item) {
      this.form.InvoiceLogisticCompanies[this.form.InvoiceLogisticCompanies.indexOf(item)].RecordState = 4
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
        if (this.form.ActualDeliveryDate < this.form.DocumentDate) {
          this.$toasted.show(this.$t('insert.order.actualDeliveryDateLessDocumentDate'), {
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
        },
        stock: {
          required
        },
        isFreeItem: {
          required
        },
        freeReason: {
          required: requiredIf(function (nestedModel) {
            return this.selectedInvoiceLine.isFreeItem === 1
          })
        }
      },
      selectedInvoiceLogisticCompany: {
        companyName: {
          required
        },
        cityId: {
          required
        },
        districtId: {
          required
        },
        taxNumber: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        }
      }
    }
  },
  watch: {
    selectedCustomer (e) {
      if (e) {
        this.form.PaymentPeriodId = e.PaymentPeriod ? e.PaymentPeriod : 0
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
    },
    address (e) {
      if (e) {
        this.selectedInvoiceLogisticCompany.cityId = e.CityId
        this.selectedInvoiceLogisticCompany.cityName = e.CityName
        this.selectedInvoiceLogisticCompany.districtId = e.DistrictId
        this.selectedInvoiceLogisticCompany.districtName = e.DistrictName
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
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
</style>
