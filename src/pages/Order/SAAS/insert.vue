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
            <router-link :to="{name: 'Order' }">
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
                <NextDatePicker v-model="documentDate" :disabled="form.CustomerId > 0 || insertReadonly.DocumentDate" />
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="4" lg="4">
                <NextTimePicker v-model="form.DocumentTime" :disabled="insertReadonly.DocumentTime" />
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="4" lg="4">
                <NextDatePicker v-model="form.DueDate" :disabled="insertReadonly.DueDate" />
              </NextFormGroup>
              <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="4" lg="4">
                <NextDropdown url="VisionNextOrder/api/OrderStatus/Search" @input="selectedSearchType('StatusId', $event)" :disabled="insertReadonly.StatusId"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="4" lg="4">
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
    <b-col cols="12">
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
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"></NextInput>
            </NextFormGroup>
            <NextFormGroup item-key="StateId" :error="$v.form.StateId" md="2" lg="2">
              <NextDropdown
                    @input="selectedSearchType('StateId', $event)"
                    url="VisionNextOrder/api/OrderState/Search"
                    :disabled="insertReadonly.StateId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown :disabled="insertReadonly.RepresentativeId" @input="selectedSearchType('RepresentativeId', $event)" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <NextDropdown
                @input="selectedSearchType('CurrencyId', $event)"
                url="VisionNextSystem/api/SysCurrency/Search"
                :disabled="insertReadonly.CurrencyId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown
                searchable
                @input="selectedSearchType('RouteId', $event)"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                :disabled="insertReadonly.RouteId"/>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown
                searchable
                @input="selectedSearchType('WarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
                :disabled="insertReadonly.WarehouseId"/>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown
                searchable
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch"
                :disabled="insertReadonly.VehicleId" />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <NextDropdown
                    v-model="selectedPaymentType"
                    :source="paymentTypes"
                    label="Label"
                    @input="selectedType('PaymentTypeId', $event)"
                    :disabled="insertReadonly.PaymentTypeId || !paymentTypes || paymentTypes.length == 0"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
              <NextInput type="number" v-model="form.PaymentPeriodId" :disabled="insertReadonly.PaymentPeriodId"></NextInput>
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Canceled" :error="$v.form.Canceled" md="2" lg="2">
              <NextCheckBox v-model="form.Canceled" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Printed" :error="$v.form.Printed" md="2" lg="2">
              <NextCheckBox v-model="form.Printed" type="number" toggle/>
            </NextFormGroup>
             <NextFormGroup item-key="IsDbsOffline" :error="$v.form.IsDbsOffline" md="2" lg="2">
              <NextCheckBox v-model="form.IsDbsOffline" type="number" toggle :disabled="!selectedPaymentType || (selectedPaymentType.PaymentType && selectedPaymentType.PaymentType.Code === 'AH')"/>
            </NextFormGroup>
            <NextFormGroup item-key="BankId" :error="$v.form.BankId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('BankId')" url="VisionNextBank/api/Bank/Search" :disabled="!form.IsDbsOffline"/>
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
              <NextInput type="number" v-model="selectedOrderLine.quantity" @input="selectQuantity($event)" @keypress="onlyForCurrency($event, selectedOrderLine.quantity)" min=1></NextInput>
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
            <NextFormGroup :title="$t('insert.order.isFreeItem')" md="2" lg="2" :required="true" :error="$v.selectedOrderLine.isFreeItem">
              <NextCheckBox v-model="selectedOrderLine.isFreeItem" type="number" @input="checkIsFree" radio />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.freeReason')" md="2" lg="2" :required="selectedOrderLine.isFreeItem === 1" :error="$v.selectedOrderLine.freeReason">
              <NextDropdown
                v-model="selectedOrderLine.freeReason"
                url="VisionNextDiscount/api/DiscountReason/Search"
                :disabled="selectedOrderLine.isFreeItem !== 1"
                :filter="filterFreeReason"/>
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
                  <b-td>
                    <i v-if="o.IsFreeItem === 1" class="fa fa-check text-success"></i>
                    <i v-else class="fa fa-times text-danger"></i>
                  </b-td>
                  <b-td>{{o.FreeReason ? o.FreeReason.Description1 ? o.FreeReason.Description1 : o.FreeReason.Label : '-' }}</b-td>
                  <b-td class="text-center">
                    <i @click="editOrderLine(o)" class="fa fa-edit text-warning"></i>
                    <i @click="removeOrderLine(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab v-if="showDiscounts" :title="$t('insert.order.suitableCampaigns')" @click.prevent="tabValidation()">
          <b-table-simple bordered small responsive>
            <b-thead>
              <b-tr>
                <b-th>{{$t('insert.order.discountType')}}</b-th>
                <b-th>{{$t('insert.order.discountName')}}</b-th>
                <b-th>{{$t('insert.order.discountBeginDate')}}</b-th>
                <b-th>{{$t('insert.order.discountEndDate')}}</b-th>
                <b-th>{{$t('insert.order.discountQuantity')}}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(c, i) in customerCampaigns.Campaigns" :key="i">
                <b-td v-if="i === 0" :rowspan="customerCampaigns.Campaigns.length">{{$t('insert.order.campaigns')}}</b-td>
                <b-td>{{c.Description}}</b-td>
                <b-td>{{dateConvertFromTimezone(c.DiscountBeginDate)}}</b-td>
                <b-td>{{dateConvertFromTimezone(c.DiscountEndDate)}}</b-td>
                <b-td></b-td>
              </b-tr>
              <b-tr v-for="(f, i) in customerCampaigns.FreeItems" :key="'A' + i">
                <b-td v-if="i === 0" :rowspan="customerCampaigns.FreeItems.length">{{$t('insert.order.freeItems')}}</b-td>
                <b-td>{{f.Value}}</b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td>{{f.FreeItemQuantity}}</b-td>
              </b-tr>
              <b-tr v-for="(l, i) in customerCampaigns.Loyalties" :key="'B' + i">
                <b-td v-if="i === 0" :rowspan="customerCampaigns.Loyalties.length">{{$t('insert.order.loyaltyApplications')}}</b-td>
                <b-td>{{l.Description}}</b-td>
                <b-td>{{dateConvertFromTimezone(l.LoyaltyBeginDate)}}</b-td>
                <b-td>{{dateConvertFromTimezone(l.LoyaltyEndDate)}}</b-td>
                <b-td>{{l.CurrentScore}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
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
    <b-modal id="confirm-modal">
      <template #modal-title>
        {{$t('insert.order.doYouConfirm')}}
      </template>
      {{$t('insert.order.orderLinesRemoved')}}
      <template #modal-footer>
        <CancelButton v-if="!campaignSelectable" class="float-right ml-2" @click.native="cancelSelectedCustomer" />
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
import { required, minValue, requiredIf } from 'vuelidate/lib/validators'
import insertMixin from '../../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        StateId: 1,
        GrossTotal: 0,
        Genexp2: null,
        DocumentNumber: null,
        RepresentativeId: null,
        Description1: null,
        RouteId: null,
        WarehouseId: null,
        CustomerId: null,
        PriceListId: null,
        DocumentDate: null,
        DocumentTime: null,
        DueDate: null,
        StatusId: 1,
        VehicleId: null,
        Printed: null,
        PaymentTypeId: null,
        Canceled: null,
        PaymentPeriodId: null,
        CurrencyId: null,
        NetTotal: 0,
        TotalVat: 0,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        OrderNumber: null,
        TerminalOrPc: 'P',
        RecvLocationId: null,
        OrderLines: [],
        OrderTypeId: 1,
        IsDbsOffline: 0,
        BankId: null
      },
      campaignFields: [
        {key: 'selection', label: '', sortable: false, visibility: 'campaignSelectable'},
        {key: 'Discount.Label', label: this.$t('insert.order.campaignName'), sortable: false},
        {key: 'Discount.Code', label: this.$t('insert.order.campaignCode'), sortable: false}
      ],
      SelectedDiscounts: [],
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
        isUpdated: false,
        isFreeItem: null,
        freeReason: null
      },
      campaigns: [],
      selectedIndex: null,
      customerFirstSet: true,
      documentDateFirstSet: true,
      selectedCampaigns: [],
      currentPage: 1,
      campaignSelectable: false,
      showDiscounts: false,
      customerCampaigns: {},
      currentCustomer: {},
      customerSelectCancelled: false,
      selectedPaymentType: {},
      paymentTypes: [],
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
  methods: {
    getInsertPage (e) {
      let currentDate = new Date()
      this.documentDate = currentDate.toISOString().slice(0, 10)
      this.form.DocumentTime = currentDate.toLocaleTimeString()
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate) {
        return false
      }
      let model = {
        PriceListCategoryIds: [this.selectedCustomer.PriceListCategoryId],
        EndDate: {
          BeginValue: this.form.DocumentDate
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
    async searchItems (search) {
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
        PriceListIds: [this.selectedPrice.RecordId],
        ItemIds: [this.selectedOrderLine.selectedItem.RecordId]
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
        WarehouseIds: [this.form.WarehouseId],
        ItemIds: [this.selectedOrderLine.selectedItem.RecordId]
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
        IsCanceled: 0,
        PriceListPrice: this.selectedOrderLine.price,
        SalesQuantity1: this.selectedOrderLine.quantity,
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: this.selectedOrderLine.quantity,
        TempDiscountNetTotal: this.selectedOrderLine.netTotal,
        IsFreeItem: this.selectedOrderLine.isFreeItem,
        FreeReason: this.selectedOrderLine.freeReason,
        FreeReasonId: this.selectedOrderLine.freeReason ? this.selectedOrderLine.freeReason.RecordId : null
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
      let freeReason = null
      if (item.FreeReason) {
        if (item.FreeReason.Label) {
          freeReason = this.convertLookupValueToSearchValue(item.FreeReason)
        } else {
          freeReason = item.FreeReason
        }
      }
      this.selectedOrderLine = {
        quantity: item.Quantity,
        price: item.Price,
        vatRate: item.VatRate,
        netTotal: item.NetTotal,
        vatTotal: item.TotalVat,
        grossTotal: item.GrossTotal,
        stock: item.Stock,
        isFreeItem: item.IsFreeItem,
        freeReason: freeReason,
        isUpdated: true
      }
      this.getItem(item.ItemId)
    },
    addCampaign () {
      let model = {
        SelectedDiscounts: this.selectedCampaigns ? this.selectedCampaigns : [],
        Order: this.form
      }
      this.$bvModal.hide('campaign-modal')
      this.$api.post(model, 'Order', 'Order/ApplyInsertDiscounts').then((res) => {
        if (!res.IsCompleted) {
          this.$toasted.show(this.$t('insert.order.campaignListError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        if (res && res.Order) {
          this.form = res.Order
        }
        this.createData()
      })
    },
    onCampaignSelected (items) {
      this.selectedCampaigns = items
    },
    getCustomerCampaigns (customerId) {
      let model = {
        customerId: customerId
      }
      this.$api.post(model, 'Discount', 'Discount/CampaignList').then((res) => {
        if (res) {
          this.customerCampaigns = res
          this.showDiscounts = true
        }
      })
    },
    confirmSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerFirstSet = false
      this.searchPriceList()
      this.getCustomerCampaigns(this.selectedCustomer.RecordId)
      this.form.OrderLines = []
      this.form.RecvLocationId = this.selectedCustomer.DefaultLocationId
      let currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + this.selectedCustomer.DeliveryDayParam)
      this.form.DueDate = currentDate.toISOString().slice(0, 10)
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
        if (this.form.DueDate < this.form.DocumentDate) {
          this.$toasted.show(this.$t('insert.order.dueDatelessDocumentDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.$api.post({order: this.form}, 'Discount', 'Discount/ApplyOrderInsertDiscounts').then((res) => {
          this.campaigns = res.Models
          if (this.campaigns && this.campaigns.length > 0) {
            this.campaignSelectable = true
            this.$bvModal.show('campaign-modal')
          } else {
            this.campaigns = []
            this.createData()
          }
        })
      }
    },
    getPaymentTypes () {
      let me = this
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        me.paymentTypes = res.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        me.selectedPaymentType = res.Model.DefaultPaymentType
        me.form.PaymentTypeId = me.selectedPaymentType.DecimalValue
      })
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
      this.$api.postByUrl(request, 'VisionNextOrder/api/Order/GetLastOrderProducts').then((response) => {
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
    checkIsFree (value) {
      if (value !== 1) {
        this.selectedOrderLine.freeReason = null
      }
    },
    filterFreeReason (item) {
      return item.Code === 'BD' || item.Code === 'ERN'
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
        },
        isFreeItem: {
          required
        },
        freeReason: {
          required: requiredIf(function (nestedModel) {
            return this.selectedOrderLine.isFreeItem === 1
          })
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
