<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'SalesInvoice' }">
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
                  :dynamic-and-condition="{ SalesDocumentTypeIds: [45, 46], StatusIds: [1], IsBlocked: 0 }"/>
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
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <NextDropdown
                v-model="selectedInvoiceKind"
                url="VisionNextInvoice/api/InvoiceKind/Search"
                @input="selectedSearchType('InvoiceKindId', $event)"
                :disabled="insertReadonly.InvoiceKindId"
                :filter="item => item.Code === 'FAI'"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.customerOrderNo')" item-key="Genexp2" :error="$v.form.Genexp2" md="2" lg="2">
              <NextInput type="text" v-model="form.Genexp2" :disabled="insertReadonly.Genexp2"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.DocumentNumber" :disabled="insertReadonly.DocumentNumber"></NextInput>
            </NextFormGroup>
             <NextFormGroup item-key="ActualDeliveryDate" :error="$v.form.ActualDeliveryDate" md="2" lg="2" v-if="selectedBranch.UseEWaybill === 1">
                <NextDatePicker v-model="form.ActualDeliveryDate" :disabled="insertReadonly.ActualDeliveryDate" />
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryTime" :error="$v.form.ActualDeliveryTime" md="2" lg="2" v-if="selectedBranch.UseEWaybill === 1">
              <NextTimePicker v-model="form.ActualDeliveryTime" :disabled="insertReadonly.ActualDeliveryTime" />
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentStatusId" :error="$v.form.EDocumentStatusId" md="2" lg="2" v-if="selectedBranch && selectedBranch.UseEWaybill === 1">
              <NextDropdown url="VisionNextCommonApi/api/EDocumentStatus/Search" @input="selectedSearchType('EDocumentStatusId', $event)" :disabled="insertReadonly.EDocumentStatusId"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedRepresentative" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable :disabled="insertReadonly.RepresentativeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <NextDropdown v-model="selectedDeliveryRepresentative" @input="selectedSearchType('DeliveryRepresentativeId', $event)" label="Description1" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable :disabled="insertReadonly.DeliveryRepresentativeId" />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown
                v-model="selectedCurrency"
                @input="selectedSearchType('CurrencyId', $event)"
                url="VisionNextSystem/api/SysCurrency/Search"
                :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown v-model="selectedRoute" @input="selectedSearchType('RouteId', $event)" url="VisionNextRoute/api/Route/AutoCompleteSearch" searchable :disabled="insertReadonly.RouteId" />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown
                v-model="selectedWarehouse"
                @input="selectedSearchType('WarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable
                :disabled="insertReadonly.WarehouseId"
                :dynamic-and-condition="{ StatusIds: [1] }"/>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown v-model="selectedVehicle" @input="selectedSearchType('VehicleId', $event)" url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch" :disabled="form.InvoiceLogisticCompanies && form.InvoiceLogisticCompanies.length > 0" searchable />
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
             <NextFormGroup item-key="IsCashCollection" :error="$v.form.IsCashCollection" md="2" lg="2">
              <NextCheckBox type="number" toggle v-model="form.IsCashCollection" :disabled="!selectedPaymentType || selectedPaymentType.Code !== 'PES'"></NextCheckBox>
            </NextFormGroup>
            <NextFormGroup item-key="ReferenceNumber" :error="$v.form.ReferenceNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.ReferenceNumber" :disabled="insertReadonly.ReferenceNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerOrderNumber" :error="$v.form.CustomerOrderNumber" md="2" lg="2">
              <NextInput type="text" v-model="form.CustomerOrderNumber" :disabled="insertReadonly.CustomerOrderNumber"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="IsDbs" :error="$v.form.IsDbs">
              <NextCheckBox v-model="form.IsDbs" type="number" toggle :disabled="insertReadonly.IsDbs || !selectedCustomer"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsDBSOffline" :error="$v.form.IsDBSOffline">
              <NextCheckBox v-model="form.IsDBSOffline" type="number" toggle :disabled="insertReadonly.IsDBSOffline"/>
            </NextFormGroup>
            <NextFormGroup item-key="Printed" :error="$v.form.Printed">
              <NextCheckBox v-model="form.Printed" type="number" toggle :disabled="insertReadonly.Printed"/>
            </NextFormGroup>
            <NextFormGroup item-key="isCanceled" :error="$v.form.isCanceled">
              <NextCheckBox v-model="form.isCanceled" type="number" toggle :disabled="insertReadonly.isCanceled"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankId" :error="$v.form.BankId" md="2" lg="2">
              <NextDropdown v-model="bank" @input="selectedSearchType('BankId')" url="VisionNextBank/api/Bank/Search" :disabled="!form.IsDbs"/>
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentScenario" :error="$v.form.EDocumentScenario" md="2" lg="2">
              <NextDropdown v-model="eDocumentScenario" url="" @input="selectedSearchType('EDocumentScenario', $event)" :disabled="insertReadonly.EDocumentScenario"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="ValidProduct" :error="$v.form.ValidProduct" md="2" lg="2">
              <NextDropdown v-model="validProduct" url="" @input="selectedSearchType('ValidProduct', $event)" :disabled="insertReadonly.ValidProduct"></NextDropdown>
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
        <b-tab :title="$t('insert.order.discounts')">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.discountName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountRate')}}</span></b-th>
                <b-th><span>{{$t('insert.order.DiscountReasonId')}}</span></b-th>
                <b-th><span>{{$t('insert.order.LoyaltyId')}}</span></b-th>
                <b-th><span>{{$t('insert.order.ContractId')}}</span></b-th>
                <b-th><span>{{$t('insert.order.SalesVolumeId')}}</span></b-th>
                <b-th><span>{{$t('insert.order.discountAmount')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.InvoiceDiscounts)" :key="i">
                  <b-td>{{o.DiscountClass ? o.DiscountClass.Label : ''}}</b-td>
                  <b-td>{{o.DiscountClass ? o.DiscountClass.Code : ''}}</b-td>
                  <b-td>{{o.DiscountPercent ? `% ${o.DiscountPercent}` : '-'}}</b-td>
                  <b-td>{{o.DiscountReason ? o.DiscountReason.Label : ''}}</b-td>
                  <b-td>{{o.LoyaltyId}}</b-td>
                  <b-td>{{o.ContractId}}</b-td>
                  <b-td>{{o.SalesVolumeId}}</b-td>
                  <b-td>{{o.TotalDiscount}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.paymentPlan')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.InvoicePaymentPlans" :items="invoicePaymentPlansItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.order.invoiceLogisticCompanies')" @click.prevent="tabValidation()" v-if="selectedBranch.UseEWaybill === 1" :disabled="form.VehicleId > 0">
          <NextDetailPanel v-model="form.InvoiceLogisticCompanies" :items="InvoiceLogisticCompaniesItems"></NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
    <b-modal id="campaign-modal" hide-footer>
      <template #modal-title>
        {{$t('insert.order.campaignSelection')}}
      </template>
      <b-table
          :items="campaigns"
          :fields="campaignFields"
          select-mode="multi"
          responsive
          id="campaign-list"
          :selectable="campaignSelectable"
          bordered
          tbody-tr-class="bg-white"
          @row-selected="onCampaignSelected"
        >
        <template #head()="data">
          {{$t(data.label)}}
        </template>
        <template #cell(selection)="row" v-if="campaignSelectable">
          <span>
            <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
          </span>
        </template>
      </b-table>
      <b-pagination
        :total-rows="campaigns ? campaigns.length : 0"
        v-model="currentPage"
        :per-page="10"
        aria-controls="campaign-list"
      ></b-pagination>
      <CancelButton v-if="!campaignSelectable" class="float-right" @click.native="($bvModal.hide('campaign-modal'))" />
      <AddButton v-if="campaignSelectable" class="float-right" @click.native="addCampaign()" />
  </b-modal>
  </b-row>
</template>
<script>
import updateMixin from '../../../mixins/update'
import { detailData } from '../detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        StateId: null,
        InvoiceNumber: null,
        InvoiceKindId: null,
        DocumentClassId: null,
        GrossTotal: 0,
        Genexp2: null,
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
        IsDeliveryInvoice: 0,
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
        PrintedDispatchNumber: null,
        IsCashCollection: null,
        IsDBS: null,
        IsDBSOffline: null,
        ReferenceNumber: null,
        isCanceled: null,
        CustomerOrderNumber: null,
        InvoiceDiscounts: [],
        InvoiceLogisticCompanies: [],
        EDocumentStatusId: null,
        InvoicePaymentPlans: [],
        BankId: null,
        EDocumentScenario: null,
        ValidProduct: null
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
      selectedRepresentative: null,
      selectedRoute: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      selectedPaymentType: null,
      selectedCampaigns: [],
      currentPage: 1,
      campaignSelectable: false,
      selectedBranch: {},
      selectedDeliveryRepresentative: null,
      paymentTypes: [],
      selectedInvoiceKind: null,
      priceList: [],
      items: [],
      priceListItems: [],
      stocks: [],
      invoicePaymentPlansItems: detailData.invoicePaymentPlansItems,
      InvoiceLogisticCompaniesItems: detailData.InvoiceLogisticCompaniesItems,
      bank: null,
      eDocumentScenario: null,
      validProduct: null
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
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
    addCampaign () {
      let model = {
        SelectedDiscounts: this.selectedCampaigns ? this.selectedCampaigns : [],
        Invoice: this.form
      }
      this.$bvModal.hide('campaign-modal')
      this.$api.post(model, 'Invoice', 'SalesInvoice/ApplyUpdateDiscounts').then((res) => {
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
        this.$api.post({RecordId: rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          this.selectedCustomer = response.Model
          this.paymentTypes = response.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        })
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedInvoiceKind = this.convertLookupValueToSearchValue(rowData.InvoiceKind)
        this.selectedPaymentType = rowData.PaymentType
        this.selectedDeliveryRepresentative = this.convertLookupValueToSearchValue(rowData.DeliveryRepresentative)
        this.bank = this.convertLookupValueToSearchValue(rowData.BankId)
        this.eDocumentScenario = this.convertLookupValueToSearchValue(rowData.EDocumentScenario)
        this.selectedCurrency = this.convertLookupValueToSearchValue(rowData.Currency)
        this.setIsCashCollection(this.selectedPaymentType)
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
        if (!rowData.InvoiceDiscounts) {
          this.form.InvoiceDiscounts = []
        }
        if (!rowData.InvoicePaymentPlans) {
          this.form.InvoicePaymentPlans = []
        }
        if (!rowData.InvoiceLogisticCompanies) {
          this.form.InvoiceLogisticCompanies = []
        }
      }
    },
    save () {
      this.$v.form.$touch()
      this.form.StatusId = !this.form.StatusId ? 1 : this.form.StatusId
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
    },
    setIsCashCollection (model) {
      if (model && model.Code !== 'PES') {
        this.form.IsCashCollection = 0
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
