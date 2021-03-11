<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="4">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4">
            <div class="text-right">
              <span><b>{{insertTitle.CurrencyId}}</b></span>
              <span>
                <i v-if="selectedCurrency.RecordId === 1" class="fas fa-lira-sign"></i>
                <i v-if="selectedCurrency.RecordId === 2" class="fas fa-usd-sign"></i>
              </span>
            </div>
          </b-col>
          <b-col cols="12" md="4" class="text-right">
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
                <b-form-datepicker v-model="documentDate" :placeholder="$t('insert.chooseDate')"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="4" lg="4">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                   v-model="form.DocumentTime"/>
              </NextFormGroup>
              <NextFormGroup item-key="DueDate" :error="$v.form.DueDate" md="4" lg="4">
                <b-form-datepicker v-model="form.DueDate" :placeholder="$t('insert.chooseDate')"/>
              </NextFormGroup>
            </b-row>
            <b-row>
              <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="4" lg="4">
                <v-select label="Description1" :filterable="false" :options="orderStatusList" @input="selectedSearchType('StatusId', $event)"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="4" lg="4">
                <v-select v-model="selectedCustomer" :options="customers" @search="searchCustomer" :filterable="false" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                </template>
                </v-select>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="4" lg="4">
                <v-select :disabled="true" v-model="selectedPrice" :options="priceList" :filterable="false" label="Description1"></v-select>
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
              <b-form-input type="text" v-model="form.OrderNumber" :readonly="insertReadonly.OrderNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp2" :error="$v.form.Genexp2" md="2" lg="2">
              <b-form-input type="text" v-model="form.Genexp2" :readonly="insertReadonly.Genexp2" />
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="StateId" :error="$v.form.StateId" md="2" lg="2">
              <v-select label="Description1" :filterable="false" :options="orderStates" @input="selectedSearchType('StateId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <v-select v-model="selectedRepresentative" label="Description1" :options="representatives" :filterable="false" @input="selectedSearchType('RepresentativeId', $event)" ></v-select>
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <v-select v-model="selectedRoute" label="Description1" :options="routes" @search="searchRoute" :filterable="false" @input="selectedSearchType('RouteId', $event)" >
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <v-select v-model="selectedWarehouse" :options="warehouses" :filterable="false" @input="selectedSearchType('WarehouseId', $event)" label="Description1">
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <v-select v-model="selectedVehicle" :options="vehicles" :filterable="false" @input="selectedSearchType('VehicleId', $event)" label="Description1"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <v-select v-model="selectedPaymentType" :options="paymentTypes" label="Description1"  @input="selectedSearchType('PaymentTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
              <v-select  v-model="selectedPaymentPeriod" />
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Canceled" :error="$v.form.Canceled" md="2" lg="2">
              <NextCheckBox v-model="form.Canceled" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup v-if="false" item-key="Printed" :error="$v.form.Printed" md="2" lg="2">
              <NextCheckBox v-model="form.Printed" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedOrderLine.selectedItem" :required="true" md="2" lg="2">
              <v-select v-model="selectedOrderLine.selectedItem" :options="items" :filterable="false" @search="searchItems" label="Description1" @input="selectItem">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedOrderLine.quantity" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.quantity" @input="selectQuantity" min=1 />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedOrderLine.price" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.price" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.stock')" :error="$v.selectedOrderLine.stock" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.stock" disabled />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.order.vatRate')" :error="$v.selectedOrderLine.vatRate" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.vatRate" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.netTotal')" :error="$v.selectedOrderLine.netTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.netTotal" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatTotal')" :error="$v.selectedOrderLine.vatTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.vatTotal" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.grossTotal')" :error="$v.selectedOrderLine.grossTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedOrderLine.grossTotal" disabled />
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(o, i) in (form.OrderLines ? form.OrderLines.filter(x => x.RecordState != 4) : [])" :key="i">
                  <b-td>{{o.Item ? o.Item.Label : o.Description1}}</b-td>
                  <b-td>{{o.Item ? o.Item.Code : o.ItemCode}}</b-td>
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
                <b-tr v-for="(o, i) in (form.OrderDiscounts)" :key="i">
                  <b-td>{{o.DiscountClass.Label}}</b-td>
                  <b-td>{{o.DiscountClass.Code}}</b-td>
                  <b-td>% {{o.DiscountPercent}}</b-td>
                  <b-td>{{o.TotalDiscount}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
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
        OrderTypeId: 1
      },
      campaignFields: [
        {key: 'selection', label: '', sortable: false, visibility: 'campaignSelectable'},
        {key: 'DiscountCategory.Description1', label: this.$t('insert.order.campaignName'), sortable: false},
        {key: 'DiscountCategory.Code', label: this.$t('insert.order.campaignCode'), sortable: false}
      ],
      SelectedDiscounts: [],
      selectedCustomer: null,
      documentDate: null,
      selectedPrice: {},
      selectedCurrency: {},
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
      campaigns: [],
      isCampaignQuestioned: false,
      selectedIndex: null,
      selectedRepresentative: null,
      selectedRoute: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      selectedPaymentType: null,
      selectedPaymentPeriod: null,
      customerFirstSet: true,
      documentDateFirstSet: true,
      selectedCampaigns: [],
      currentPage: 1,
      campaignSelectable: false
    }
  },
  computed: {
    ...mapState(['orderStates', 'representatives', 'routes', 'warehouses', 'customers', 'priceList', 'vehicles', 'paymentTypes', 'paymentPeriods', 'currencies', 'orderStatusList', 'items', 'priceListItems', 'stocks'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        this.setData()
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextOrder/api/OrderState/Search', name: 'orderStates'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextOrder/api/OrderStatus/Search', name: 'orderStatusList'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'representatives'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextWarehouse/api/Warehouse/Search', name: 'warehouses'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
    },
    searchRoute (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextRoute/api/Route/Search',
          name: 'routes',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate || !this.selectedCustomer.PriceListCategoryId) {
        return false
      }
      let model = {
        PriceListCategoryIds: [this.selectedCustomer.PriceListCategoryId],
        EndDate: {
          BeginValue: this.form.DocumentDate
        }
      }
      this.searchItemsByModel('VisionNextFinance/api/PriceList/Search', 'priceList', model, 1).then(() => {
        if (this.priceList && this.priceList.length > 0) {
          this.selectedPrice = this.priceList[0]
          this.form.PriceListId = this.priceList[0].RecordId
        } else {
          this.selectedPrice = {}
          this.form.PriceListId = null
        }
        this.searchPriceListItem()
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
          me.selectedOrderLine.selectedItem = res.ListModel.BaseModels[0]
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
      me.searchItemsByModel('VisionNextFinance/api/PriceListItem/Search', 'priceListItems', model, 1).then(() => {
        if (me.priceListItems && me.priceListItems.length > 0) {
          me.priceListItem = me.priceListItems[0]
          me.selectedOrderLine.price = this.roundNumber(me.priceListItem.SalesPrice)
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
      })
    },
    selectItem () {
      this.searchPriceListItem()
      this.setStock()
      this.setTotalPrice()
    },
    selectQuantity () {
      this.setTotalPrice()
    },
    setTotalPrice () {
      if (!this.selectedOrderLine.quantity || !this.selectedOrderLine.selectedItem || !this.selectedOrderLine.price) {
        return false
      }
      let vatRate = this.selectedOrderLine.selectedItem.Vat
      this.selectedOrderLine.vatRate = vatRate
      this.selectedOrderLine.grossTotal = this.roundNumber(this.selectedOrderLine.price * this.selectedOrderLine.quantity)
      this.selectedOrderLine.vatTotal = this.roundNumber(this.selectedOrderLine.grossTotal * vatRate / 100)
      this.selectedOrderLine.netTotal = this.roundNumber(this.selectedOrderLine.grossTotal - this.selectedOrderLine.vatTotal)
    },
    setStock () {
      if (!this.selectedOrderLine.selectedItem || !this.selectedOrderLine.selectedItem.RecordId) {
        this.selectedOrderLine.stock = null
        return false
      }
      let model = {
        WarehouseIds: [1],
        ItemIds: [this.selectedOrderLine.selectedItem.RecordId]
      }
      var me = this
      this.searchItemsByModel('VisionNextWarehouse/api/WarehouseStock/Search', 'stocks', model, 1).then(() => {
        if (me.stocks && me.stocks.length > 0) {
          me.selectedOrderLine.stock = me.stocks[0].Quantity
        } else {
          me.selectedOrderLine.stock = 0
          /*  this.$toasted.show(this.$t('insert.order.noStocksException'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })  */
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
        this.form.NetTotal += this.form.OrderLines[index].NetTotal
        this.form.TotalVat += this.form.OrderLines[index].TotalVat
        this.form.GrossTotal += this.form.OrderLines[index].GrossTotal
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
      let filteredArr = this.form.OrderLines.filter(i => i.ItemId === this.selectedOrderLine.selectedItem.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0 && !this.selectedOrderLine.isUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let filteredItem = this.form.OrderLines.find(i => i.ItemId === this.selectedOrderLine.selectedItem.RecordId && i.RecordState === 4)
      if (filteredItem) {
        this.form.OrderLines[this.form.OrderLines.indexOf(filteredItem)].RecordState = 3
        return
      }
      let length = this.form.OrderLines.length
      let selectedItem = this.selectedOrderLine.selectedItem
      let quantity = this.selectedOrderLine.quantity
      let order = {
        Description1: selectedItem.Description1,
        Deleted: 0,
        System: 0,
        RecordState: this.selectedOrderLine.recordState ? this.selectedOrderLine.recordState : 2,
        StatusId: 1,
        LineNumber: length,
        ItemId: selectedItem.RecordId,
        ItemCode: selectedItem.Code,
        UnitSetId: selectedItem.UnitSetId,
        UnitId: selectedItem.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: quantity,
        ShippedQuantity: quantity,
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
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: this.selectedOrderLine.quantity,
        TempDiscountNetTotal: this.selectedOrderLine.netTotal,
        RecordId: this.selectedOrderLine.recordId ? this.selectedOrderLine.recordId : null
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
      this.form.OrderLines[this.form.OrderLines.indexOf(item)].RecordState = 4
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
        recordState: item.RecordState,
        recordId: item.RecordId,
        isUpdated: true
      }
      this.getItem(item.ItemId)
    },
    getCampaigns () {
      this.campaignSelectable = false
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.isCampaignQuestioned = true
      this.$api.post({order: this.form}, 'Discount', 'Discount/ApplyOrderInsertDiscounts').then((res) => {
        this.campaigns = res.Models
        if (this.campaigns && this.campaigns.length > 0) {
          this.$bvModal.show('campaign-modal')
        } else {
          this.campaigns = []
          this.$toasted.show(this.$t('insert.order.noCampaigns'), {
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
        Order: this.form
      }
      this.$bvModal.hide('campaign-modal')
      this.$store.commit('bigLoaded', true)
      this.$api.post(model, 'Order', 'Order/ApplyInsertDiscounts').then((res) => {
        if (res && res.Order) {
          this.form = res.Order
        }
        this.updateData()
      })
    },
    onCampaignSelected (items) {
      this.selectedCampaigns = items
    },
    setData () {
      let rowData = this.rowData
      if (rowData.StatusId !== 1) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.orderStatusException') })
        setTimeout(() => {
          this.$router.push({ name: 'Order' })
        }, 2000)
      }
      if (rowData) {
        this.form = rowData
        this.documentDate = rowData.DocumentDate
        this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedPaymentType = this.convertLookupValueToSearchValue(rowData.PaymentType)
        this.selectedPaymentPeriod = this.convertLookupValueToSearchValue(rowData.PaymentPeriod)
        if (this.form.OrderLines) {
          this.form.OrderLines.map(item => {
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
        this.$api.post({order: this.form}, 'Discount', 'Discount/ApplyOrderInsertDiscounts').then((res) => {
          this.campaigns = res.Models
          if (this.campaigns && this.campaigns.length > 0) {
            this.campaignSelectable = true
            this.$bvModal.show('campaign-modal')
          } else {
            this.campaigns = []
            this.updateData()
          }
        })
      }
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
    selectedCustomer (e) {
      if (e) {
        this.searchPriceList()
        if (this.customerFirstSet) {
          this.customerFirstSet = false
          return
        } else {
          this.form.OrderLines = []
          this.$toasted.show(this.$t('insert.order.orderLinesRemoved'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
        if (e.DefaultLocationId) {
          this.form.RecvLocationId = e.DefaultLocationId
        }
        if (e.DeliveryDayParam) {
          let currentDate = new Date()
          currentDate.setDate(currentDate.getDate() + e.DeliveryDayParam)
          this.form.DueDate = currentDate.toISOString().slice(0, 10)
        }
      }
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
