<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <b-button size="sm" variant="warning" @click="$bvModal.show('confirm-products-modal')" :title="$t('insert.order.getLastWaybillProducts')">
              <i class="fa fa-list-alt"></i>
            </b-button>
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
                <b-form-datepicker v-model="documentDate" :placeholder="$t('insert.chooseDate')"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                   v-model="form.DocumentTime"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <v-select v-model="selectedCustomer" :options="customers" @search="searchCustomer" :filterable="false" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 1 ? $t('insert.active'): $t('insert.passive'))}}
                  </template>
                </v-select>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="3" lg="3">
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
        <b-tab :title="$t('insert.order.enterInvoice')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.InvoiceNumber" :readonly="insertReadonly.InvoiceNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="PrintedDispatchNumber" :error="$v.form.PrintedDispatchNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.PrintedDispatchNumber" :readonly="insertReadonly.PrintedDispatchNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="InvoiceKindId" :error="$v.form.InvoiceKindId" md="2" lg="2">
              <v-select v-model="selectedInvoiceKind" label="Description1" :options="invoiceKinds" :filterable="false" @input="selectedSearchType('InvoiceKindId', $event)" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryDate" :error="$v.form.ActualDeliveryDate" md="2" lg="2" v-if="selectedBranch && selectedBranch.UseEDispatch !== 0">
                <b-form-datepicker v-model="form.ActualDeliveryDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryTime" :error="$v.form.ActualDeliveryTime" md="2" lg="2" v-if="selectedBranch && selectedBranch.UseEDispatch !== 0">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                  v-model="form.ActualDeliveryTime"/>
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentStatusId" :error="$v.form.EDocumentStatusId" md="2" lg="2">
              <v-select v-model="selectedEDocumentStatus" label="Description1" :options="eDocumentStatus" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('RepresentativeId', $event)" label="Description1" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('DeliveryRepresentativeId', $event)" label="Description1" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <v-select v-model="selectedCurrency" label="Description1" :options="currencies" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('RouteId', $event)" label="Description1" url="VisionNextRoute/api/Route/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('WarehouseId', $event)" label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <NextDropdown @input="selectedSearchType('VehicleId', $event)" label="Description1" url="VisionNextVehicle/api/Vehicle/AutoCompleteSearch" :disabled="form.InvoiceLogisticCompanies && form.InvoiceLogisticCompanies.length > 0" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="PaymentTypeId" :error="$v.form.PaymentTypeId" md="2" lg="2">
              <v-select v-model="selectedPaymentType" :options="paymentTypes" label="Label"  @input="selectedType('PaymentTypeId', $event)" :disabled="!paymentTypes || paymentTypes.length == 0"/>
            </NextFormGroup>
            <NextFormGroup v-if="selectedCustomer" item-key="PaymentPeriodId" :error="$v.form.PaymentPeriodId" md="2" lg="2">
             <b-form-input type="text" v-model="form.PaymentPeriodId" disabled />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.enterProducts')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.order.productCode')" :error="$v.selectedInvoiceLine.selectedItem" :required="true" md="2" lg="2">
              <v-select v-model="selectedInvoiceLine.selectedItem" :options="items" :filterable="false" @search="searchItems" label="Description1" @input="selectItem">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.quantity')" :error="$v.selectedInvoiceLine.quantity" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.quantity" @input="selectQuantity" min=1 />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.price')" :error="$v.selectedInvoiceLine.price" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.price" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.stock')" :error="$v.selectedInvoiceLine.stock" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.stock" disabled />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.order.vatRate')" :error="$v.selectedInvoiceLine.vatRate" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.vatRate" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.netTotal')" :error="$v.selectedInvoiceLine.netTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.netTotal" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.vatTotal')" :error="$v.selectedInvoiceLine.totalVat" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.totalVat" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.grossTotal')" :error="$v.selectedInvoiceLine.grossTotal" :required="true" md="2" lg="2">
              <b-form-input type="number" v-model="selectedInvoiceLine.grossTotal" disabled />
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceLine" />
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
                <b-tr v-for="(o, i) in form.InvoiceLines" :key="i">
                  <b-td>{{o.Description1}}</b-td>
                  <b-td>{{o.ItemCode}}</b-td>
                  <b-td>{{o.Quantity}}</b-td>
                  <b-td>{{o.Price}}</b-td>
                  <b-td>{{o.VatRate}}</b-td>
                  <b-td>{{o.NetTotal}}</b-td>
                  <b-td>{{o.TotalVat}}</b-td>
                  <b-td>{{o.GrossTotal}}</b-td>
                  <b-td class="text-center">
                    <i @click="editInvoiceLine(o)" class="fa fa-edit text-warning"></i>
                    <i @click="removeInvoiceLine(o)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.logisticCompanies')" @click.prevent="tabValidation()" v-if="selectedBranch.UseEDispatch !== 0" :disabled="form.VehicleId > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.companyName')" :error="$v.selectedInvoiceLogisticCompany.companyName" :required="true" md="4" lg="3">
              <b-form-input type="text" v-model="selectedInvoiceLogisticCompany.companyName"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.taxNumber')" :error="$v.selectedInvoiceLogisticCompany.taxNumber" :required="true" md="4" lg="3">
              <b-form-input type="number" v-model="selectedInvoiceLogisticCompany.taxNumber" :maxLength="10" :oninput="maxLengthControl"/>
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
                  <b-td>{{l.CityName}}</b-td>
                  <b-td>{{l.DistrictName}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeInvoiceLogisticCompany(l)" class="far fa-trash-alt text-danger"></i>
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
import { mapState } from 'vuex'
import { required, minValue, minLength, maxLength } from 'vuelidate/lib/validators'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StateId: 1,
        InvoiceNumber: null,
        InvoiceKindId: 2,
        DocumentClassId: 3,
        EDocumentStatusId: null,
        GrossTotal: 0,
        DocumentNumber: 1,
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
      selectedPaymentType: null,
      paymentTypes: [],
      selectedInvoiceKind: null
    }
  },
  computed: {
    ...mapState(['customers', 'priceList', 'paymentPeriods', 'currencies', 'orderStatusList', 'items', 'priceListItems', 'stocks', 'eDocumentStatus', 'invoiceKinds'])
  },
  mounted () {
    this.createManualCode('InvoiceNumber')
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      var me = this
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextOrder/api/OrderStatus/Search', name: 'orderStatusList'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/EDocumentStatus/Search', name: 'eDocumentStatus'}).then(() => {
        me.selectedEDocumentStatus = me.eDocumentStatus.find(e => e.Code === 'ReadyForSendToEFU')
        me.form.EDocumentStatusId = me.selectedEDocumentStatus.RecordId
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextInvoice/api/InvoiceKind/Search', name: 'invoiceKinds'}).then(() => {
        this.selectedInvoiceKind = this.invoiceKinds.find(i => i.RecordId === 2)
      })
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response && response.Model ? response.Model : {}
      })
      let currentDate = new Date()
      let date = currentDate.toISOString().slice(0, 10)
      this.form.ActualDeliveryDate = date
      this.documentDate = date
      this.form.DocumentTime = currentDate.toLocaleTimeString()
      currentDate.setMinutes(currentDate.getMinutes() + 15)
      this.form.ActualDeliveryTime = currentDate.toLocaleTimeString()
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/SearchSapCustomer',
        name: 'customers',
        andConditionModel: {
          StatusIds: [1],
          IsBlocked: 0
        },
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
      })
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
          api: 'VisionNextItem/api/Item/AutoCompleteSearch',
          name: 'items',
          orConditionModels: [
            {
              Description1: search,
              Code: search
            }
          ]
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
        PriceListIds: [this.selectedPrice.RecordId],
        ItemIds: [this.selectedInvoiceLine.selectedItem.RecordId]
      }
      var me = this
      me.searchItemsByModel('VisionNextFinance/api/PriceListItem/Search', 'priceListItems', model, 1).then(() => {
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
      if (!this.selectedInvoiceLine.quantity || !this.selectedInvoiceLine.selectedItem || !this.selectedInvoiceLine.price || !this.priceListItem) {
        return false
      }
      let vatRate = this.selectedInvoiceLine.selectedItem.Vat
      this.selectedInvoiceLine.vatRate = this.priceListItem.UseConsumerPrice === 0 ? vatRate : 0
      this.selectedInvoiceLine.netTotal = this.roundNumber(this.selectedInvoiceLine.price * this.selectedInvoiceLine.quantity)
      this.selectedInvoiceLine.totalVat = this.priceListItem.IsVatIncluded === 1 ? 0 : this.roundNumber(this.selectedInvoiceLine.netTotal * vatRate / 100)
      this.selectedInvoiceLine.grossTotal = this.roundNumber(parseFloat(this.selectedInvoiceLine.netTotal) + parseFloat(this.selectedInvoiceLine.totalVat))
    },
    setStock () {
      if (!this.selectedInvoiceLine.selectedItem || !this.selectedInvoiceLine.selectedItem.RecordId) {
        this.selectedInvoiceLine.stock = null
        return false
      }
      let model = {
        WarehouseIds: [this.form.WarehouseId],
        ItemIds: [this.selectedInvoiceLine.selectedItem.RecordId]
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
      for (let index = 0; index < this.form.InvoiceLines.length; index++) {
        this.form.InvoiceLines[index].LineNumber = index
        this.form.NetTotal += parseFloat(this.form.InvoiceLines[index].NetTotal)
        this.form.TotalVat += parseFloat(this.form.InvoiceLines[index].TotalVat)
        this.form.GrossTotal += parseFloat(this.form.InvoiceLines[index].GrossTotal)
      }

      this.form.NetTotal = this.roundNumber(this.form.NetTotal)
      this.form.TotalVat = this.roundNumber(this.form.TotalVat)
      this.form.GrossTotal = this.roundNumber(this.form.GrossTotal)
    },
    addInvoiceLine () {
      this.$v.selectedInvoiceLine.$touch()
      if (this.$v.selectedInvoiceLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.InvoiceLines.filter(i => i.ItemId === this.selectedInvoiceLine.selectedItem.RecordId)
      if (filteredArr.length > 0 && !this.selectedInvoiceLine.isUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.selectedInvoiceLine.quantity > this.selectedInvoiceLine.stock) {
        this.$toasted.show(this.$t('insert.order.quantityStockException'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let length = this.form.InvoiceLines.length
      let selectedItem = this.selectedInvoiceLine.selectedItem
      let quantity = this.selectedInvoiceLine.quantity
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
        Stock: this.selectedInvoiceLine.stock,
        VatRate: this.selectedInvoiceLine.vatRate,
        TotalVat: this.selectedInvoiceLine.totalVat,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        Price: this.selectedInvoiceLine.price,
        GrossTotal: this.selectedInvoiceLine.grossTotal,
        NetTotal: this.selectedInvoiceLine.netTotal,
        IsFreeItem: 0,
        IsCanceled: 0,
        PriceListPrice: this.selectedInvoiceLine.price,
        SalesQuantity1: quantity,
        SalesUnit1Id: selectedItem.UnitId,
        TempDiscountQuantity: 0,
        TempDiscountNetTotal: 0,
        DiscountNetTotal: 0,
        DiscountQuantity: 0
      }
      if (this.selectedInvoiceLine.isUpdated) {
        this.form.InvoiceLines[this.selectedIndex] = order
        this.selectedInvoiceLine.isUpdated = false
      } else {
        this.form.InvoiceLines.push(order)
      }
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedInvoiceLine = {}
      this.$v.selectedInvoiceLine.$reset()
    },
    removeInvoiceLine (item) {
      this.form.InvoiceLines.splice(this.form.InvoiceLines.indexOf(item), 1)
      this.calculateTotalPrices()
      this.selectedIndex = null
      this.selectedInvoiceLine = {}
      this.$v.selectedInvoiceLine.$reset()
    },
    editInvoiceLine (item) {
      this.selectedIndex = this.form.InvoiceLines.indexOf(item)
      this.selectedInvoiceLine = {
        quantity: item.Quantity,
        price: item.Price,
        vatRate: item.VatRate,
        netTotal: item.NetTotal,
        totalVat: item.TotalVat,
        grossTotal: item.GrossTotal,
        stock: item.Stock,
        isUpdated: true
      }
      this.getItem(item.ItemId)
    },
    addCampaign () {
      let model = {
        SelectedDiscounts: this.selectedCampaigns ? this.selectedCampaigns : [],
        Invoice: this.form
      }
      this.$bvModal.hide('campaign-modal')
      this.$api.post(model, 'Invoice', 'SalesWaybill/ApplyInsertDiscounts').then((res) => {
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
      this.form.InvoiceLines = []
      this.form.RecvLocationId = this.selectedCustomer.DefaultLocationId
    },
    cancelSelectedCustomer () {
      this.$bvModal.hide('confirm-modal')
      this.customerSelectCancelled = true
      this.selectedCustomer = this.currentCustomer
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
      i.DistrictId === this.selectedInvoiceLogisticCompany.districtId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let logisticCompany = {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
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
      this.form.InvoiceLogisticCompanies.splice(this.form.InvoiceLogisticCompanies.indexOf(item), 1)
    },
    getPaymentTypes () {
      let me = this
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        me.paymentTypes = res.Model.CustomerPaymentTypes.map(c => c.PaymentType)
        me.selectedPaymentType = res.Model.DefaultPaymentType
        me.form.PaymentTypeId = me.selectedPaymentType.DecimalValue
      })
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
        if (this.form.ActualDeliveryDate < this.form.DocumentDate) {
          this.$toasted.show(this.$t('insert.order.actualDeliveryDateLessDocumentDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.$api.post({invoice: this.form}, 'Discount', 'Discount/ApplyInvoiceInsertDiscounts').then((res) => {
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
      this.$api.postByUrl(request, 'VisionNextInvoice/api/SalesWaybill/GetLastOrderProducts').then((response) => {
        if (response && response.length > 0) {
          let count = 0
          this.form.InvoiceLines = []
          response.map(product => {
            this.form.InvoiceLines.push({
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
              TempDiscountNetTotal: product.NetTotal ? product.NetTotal : 0,
              DiscountNetTotal: 0,
              DiscountQuantity: 0
            })
            count++
          })
          this.calculateTotalPrices()
        } else {
          this.$toasted.show(this.$t('insert.order.noLastWaybillProducts'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      })
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
          this.form.InvoiceLines = []
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
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
</style>
