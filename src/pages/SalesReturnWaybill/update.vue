<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'SalesReturnWaybill' }">
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
                  url="VisionNextCustomer/api/Customer/SearchSapCustomer"
                  :searchable="true" :custom-option="true"
                  :disabled="insertReadonly.CustomerId" label="Description1"
                  or-condition-fields="Code,Description1,CommercialTitle"
                  :dynamic-and-condition="{ StatusIds: [1], IsBlocked: 0 }"
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
        <b-tab :title="$t('insert.order.returnSalesWaybill')" active @click.prevent="tabValidation()">
          <b-row>
           <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.InvoiceNumber" :disabled="insertReadonly.InvoiceNumber"/>
            </NextFormGroup>
            <NextFormGroup item-key="PrintedDispatchNumber" :error="$v.form.PrintedDispatchNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.PrintedDispatchNumber" :disabled="insertReadonly.PrintedDispatchNumber"/>
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown v-model="selectedInvoiceKind" @input="selectedSearchType('InvoiceKindId', $event)" label="Description1" :disabled="insertReadonly.InvoiceKindId" url="VisionNextInvoice/api/InvoiceKind/Search" :dynamic-and-condition="{ StatusIds: [1] }" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber"/>
            </NextFormGroup>
             <NextFormGroup item-key="ActualDeliveryDate" :error="$v.form.ActualDeliveryDate" md="2" lg="2">
              <NextDatePicker v-model="form.ActualDeliveryDate" :disabled="insertReadonly.ActualDeliveryDate" />
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryTime" :error="$v.form.ActualDeliveryTime" md="2" lg="2" >
              <NextTimePicker v-model="form.ActualDeliveryTime" :disabled="insertReadonly.ActualDeliveryTime" />
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentStatusId" :error="$v.form.EDocumentStatusId" md="2" lg="2">
              <NextDropdown v-model="selectedEDocumentStatus" label="Description1" :source="eDocumentStatus" :disabled="insertReadonly.EDocumentStatusId" ></NextDropdown>
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedRepresentative" label="Description1" @input="selectedSearchType('RepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/Search" :disabled="insertReadonly.RepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedDeliveryRepresentative" @input="selectedSearchType('DeliveryRepresentativeId', $event)" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/Search" :disabled="insertReadonly.DeliveryRepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown v-model="selectedCurrency" :disabled="insertReadonly.CurrencyId" @input="selectedSearchType('CurrencyId', $event)" :source="currencies" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                v-model="selectedRoute"
                label="Description1"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="500"
                />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown v-model="selectedWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" :disabled="insertReadonly.WarehouseId" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown
                :disabled="insertReadonly.VehicleId"
                v-model="selectedVehicle"
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="1000" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
            <NextExportDetail
              url="VisionNextInvoice/api/SalesReturnWaybill/ExcelExportItems"
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
                  <b-td>{{o.Item.Label }}</b-td>
                  <b-td>{{o.Item.Code }}</b-td>
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
        <b-tab :title="$t('insert.order.logisticCompanies')" @click.prevent="tabValidation()" :disabled="form.VehicleId > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.companyName')" :error="$v.selectedInvoiceLogisticCompany.companyName" :required="true" md="4" lg="3">
              <NextInput type="text" v-model="selectedInvoiceLogisticCompany.companyName"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.taxNumber')" :error="$v.selectedInvoiceLogisticCompany.taxNumber" :required="true" md="4" lg="3">
              <NextInput type="number" v-model="selectedInvoiceLogisticCompany.taxNumber" :maxLength="10" :oninput="maxLengthControl"/>
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
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required, minValue, minLength, maxLength } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
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
        Canceled: 0,
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
      SelectedDiscounts: [],
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
      campaigns: [],
      isCampaignQuestioned: false,
      selectedIndex: null,
      selectedRepresentative: null,
      selectedRoute: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      selectedCampaigns: [],
      currentPage: 1,
      campaignSelectable: false,
      showDiscounts: false,
      selectedEDocumentStatus: null,
      eDocumentStatus: [],
      selectedInvoiceLogisticCompany: {
        companyName: null,
        cityId: null,
        cityName: null,
        districtId: null,
        districtName: null,
        taxNumber: null
      },
      address: {},
      selectedDeliveryRepresentative: null,
      selectedStatus: null,
      selectedInvoiceKind: null,
      priceList: [],
      currencies: []
    }
  },
  computed: {
    ...mapState(['vehicles', 'orderStatusList', 'items', 'priceListItems', 'stocks'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.getCurrencies()
    this.getEDocumentStatus()
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        if (this.rowData.Canceled === 1) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.dispatchRefDocumentStatusError') })
          setTimeout(() => {
            this.$router.push({ name: 'SalesReturnWaybill' })
          }, 2000)
          return
        } else if (this.rowData.Printed === 1) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.eDocumentIsPrintedError') })
          setTimeout(() => {
            this.$router.push({ name: 'SalesReturnWaybill' })
          }, 2000)
          return
        } else if (this.rowData.EDocumentStatus && this.rowData.EDocumentStatus.Code !== 'ReadyForSendToEFU') {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.eDocumentStatusNotUpdated') })
          setTimeout(() => {
            this.$router.push({ name: 'SalesReturnWaybill' })
          }, 2000)
          return
        }
        this.setData()
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextOrder/api/OrderStatus/Search', name: 'orderStatusList'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
    },
    getCurrencies () {
      this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
        }
      })
    },
    getEDocumentStatus () {
      this.$api.postByUrl({}, 'VisionNextCommonApi/api/EDocumentStatus/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.eDocumentStatus = response.ListModel.BaseModels
          this.selectedEDocumentStatus = response.ListModel.BaseModels[0]
          this.form.EDocumentStatusId = this.selectedEDocumentStatus.RecordId
        }
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
          InvoiceClass: 7
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
          orConditionModels: [
            {
              Description1: search,
              Code: search
            }
          ],
          andConditionModel: {
            StatusId: 1
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
    addCampaign () {
      let model = {
        SelectedDiscounts: this.selectedCampaigns ? this.selectedCampaigns : [],
        Order: this.form
      }
      this.$bvModal.hide('campaign-modal')
      this.$api.post(model, 'Invoice', 'SalesWaybill/ApplyUpdateDiscounts').then((res) => {
        if (!res.IsCompleted) {
          this.$toasted.show(this.$t('insert.order.campaignListError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (res && res.Invoice) {
          this.form = res.Invoice
        }
        this.updateData()
      })
    },
    onCampaignSelected (items) {
      this.selectedCampaigns = items
    },
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.form = rowData
        this.documentDate = rowData.DocumentDate
        this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
        this.selectedDeliveryRepresentative = this.convertLookupValueToSearchValue(rowData.DeliveryRepresentative)
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
