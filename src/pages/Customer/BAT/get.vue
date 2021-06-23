<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />BAT
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData ? rowData.Description1 : ''" />
            <GetFormField v-model="workFlowModel"/>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.code')}}:</b> {{rowData.Code && rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.Model_StatusReasonId')}}:</b> {{rowData.StatusReason ? rowData.StatusReason.Label : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.customer.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <!-- <h6>{{$t('insert.route.title')}}</h6> -->
              <div v-html="getFormatDataByType(rowData.CommercialTitle, 'text', 'insert.customer.Model_CommercialTitle')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.customer.Model_Description1')"></div>
              <div v-html="getFormatDataByType(rowData.TaxOffice, 'text', 'insert.customer.Model_TaxOffice')"></div>
              <div v-html="getFormatDataByType(rowData.TaxNumber, 'text', 'insert.customer.Model_TaxNumber')"></div>
              <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxCustomerTypeId')}}</span><p>{{rowData.TaxCustomerTypeId}}</p> -->
              <!-- <div v-html="getFormatDataByType(rowData.IsDutyFree, 'check', 'insert.customer.Model_IsDutyFree')"></div> -->
              <div v-html="getFormatDataByType(rowData.UseEInvoice, 'check', 'insert.customer.Model_UseEInvoice')"></div>
              <!-- <div v-html="getFormatDataByType(rowData.IsTaxExemption, 'check', 'insert.customer.Model_IsTaxExemption')"></div> -->
              <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerInvoiceTypeId')}}</span><p>{{rowData.CustomerInvoiceTypeId}}</p> -->
              <div v-html="getFormatDataByType(rowData.DeliveryDayParam, 'text', 'insert.customer.Model_DeliveryDayParam')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.customer.Model_CardTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.customer.Model_TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesType, 'object', 'insert.customer.Model_SalesTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesPriceChangeRate, 'text', 'insert.customer.Model_SalesPriceChangeRate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('list.location')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                    <b-th><span>{{$t('insert.warehouse.Address')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_XPosition')}} - {{$t('insert.customer.Model_YPosition')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_ContactName')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_PhoneNumber1')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_FaxNumber')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_Alias')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsDefaultLocation')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsInvoiceAddress')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsDeliveryAddress')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.isRouteNode')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerLocations" :key="i">
                      <b-td class="text-center">
                        <i @click="showMap(r)" class="fa fa-map-marker-alt text-primary"></i>
                      </b-td>
                      <b-td>{{r.Code}}</b-td>
                      <b-td>{{r.Description1}}</b-td>
                      <b-td>{{r.AddressDetail}}</b-td>
                      <b-td>{{r.XPosition}} - {{r.YPosition}}</b-td>
                      <b-td>{{r.ContactName}}</b-td>
                      <b-td>{{r.PhoneNumber1}}</b-td>
                      <b-td>{{r.FaxNumber}}</b-td>
                      <b-td>{{r.Alias}}</b-td>
                      <b-td>{{r.IsDefaultLocation == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsInvoiceAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsDeliveryAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsRouteNode == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                    </b-tr>
                    <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
                      <NextLocation :Location='Location' />
                    </b-modal>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
         <b-row class="p-4">
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <!-- <h6>{{$t('insert.route.title')}}</h6> -->
                <div v-html="getFormatDataByType(rowData.Category3, 'object', 'insert.customer.Model_Category3Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category2, 'object', 'insert.customer.Model_Category2Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.customer.Model_Category1Id')"></div>
                <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.customer.Model_GroupId')"></div>
                <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.customer.Model_ClassId')"></div>
                <div v-html="getFormatDataByType(rowData.SalesDocumentType, 'object', 'insert.customer.Model_SalesDocumentTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.InvoiceCombineRule, 'object', 'insert.customer.Model_InvoiceCombineRuleId')"></div>
                <!-- <div v-html="getFormatDataByType(rowData.DiscountGroup1Id, 'object', 'insert.customer.Model_DiscountGroup1Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup3Id, 'object', 'insert.customer.Model_DiscountGroup3Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup5Id, 'object', 'insert.customer.Model_DiscountGroup5Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup6Id, 'object', 'insert.customer.Model_DiscountGroup6Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup7Id, 'object', 'insert.customer.Model_DiscountGroup7Id')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountGroup8Id, 'object', 'insert.customer.Model_DiscountGroup8Id')"></div>
                <div v-html="getFormatDataByType(rowData.Field1, 'object', 'insert.customer.Model_Field1')"></div>
                <div v-html="getFormatDataByType(rowData.Field2, 'object', 'insert.customer.Model_Field2')"></div>
                <div v-html="getFormatDataByType(rowData.Field3, 'object', 'insert.customer.Model_Field3')"></div> -->
            </b-card>
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.OwnerType, 'object', 'insert.customer.Model_OwnerTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposal, 'object', 'insert.customer.Model_ClassProposalId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposalReason, 'object', 'insert.customer.Model_ClassProposalReasonId')"></div>
                <div v-html="getFormatDataByType(rowData.SalesMethod, 'object', 'insert.customer.Model_SalesMethodId')"></div>
                <div v-html="getFormatDataByType(rowData.GeographicEnvironment, 'object', 'insert.customer.Model_GeographicEnvironmentId')"></div>
                <div v-html="getFormatDataByType(rowData.TradeFocus, 'object', 'insert.customer.Model_TradeFocusId')"></div>
                <div v-html="getFormatDataByType(rowData.BackMarginGroup, 'object', 'insert.customer.Model_BackMarginGroupId')"></div>
                <!-- <div v-html="getFormatDataByType(rowData.DiscountGroup4Id, 'object', 'insert.customer.Model_DiscountGroup4Id')"></div>
                <div v-html="getFormatDataByType(rowData.Kind, 'object', 'insert.customer.Model_KindId')"></div>
                <div v-html="getFormatDataByType(rowData.Field4, 'object', 'insert.customer.Model_Field4')"></div>
                <div v-html="getFormatDataByType(rowData.Field5, 'object', 'insert.customer.Model_Field5')"></div>
                <div v-html="getFormatDataByType(rowData.TextField6, 'object', 'insert.customer.Model_TextField6')"></div> -->
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row class="p-4">
           <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DefaultPaymentType, 'object', 'insert.customer.Model_DefaultPaymentTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.PaymentPeriod, 'object', 'insert.customer.Model_PaymentPeriod')"></div>
                <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
                <div v-html="getFormatDataByType(rowData.CreditLimit, 'object', 'insert.customer.Model_CreditLimit')"></div>
                <div v-html="getFormatDataByType(rowData.RiskLimit, 'object', 'insert.customer.Model_RiskLimit')"></div>
                <div v-html="getFormatDataByType(rowData.ReservedLimit, 'object', 'insert.customer.reservedLimit')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentCredit')}}</span><p>{{rowData.CurrentCredit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentRisk')}}</span><p>{{rowData.CurrentRisk}}</p>
                <div v-html="getFormatDataByType(rowData.DebitAccountRemainder, 'object', 'insert.customer.debitAccountRemainder')"></div>
                <div v-html="getFormatDataByType(rowData.CreditAccountRemainder, 'object', 'insert.customer.creditAccountRemainder')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.allowOverLimit')}}</span><p><i :class="rowData.allowOverLimit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.isDirectDebit')}}</span><p><i :class="rowData.isDirectDebit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
            </b-card>
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.DiscountPercent1, 'object', 'insert.customer.Model_DiscountPercent1')"></div>
                <div v-html="getFormatDataByType(rowData.DiscountPercent2, 'object', 'insert.customer.Model_DiscountPercent2')"></div>
                <div v-html="getFormatDataByType(rowData.MainOfBranch, 'object', 'insert.customer.mainOfBranch')"></div>
                <div v-html="getFormatDataByType(rowData.TciBreak1Id, 'object', 'insert.customer.TciBreak1')"></div>
                <div v-html="getFormatDataByType(rowData.TciBreak2Id, 'object', 'insert.customer.TciBreak2')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p><i :class="rowData.ManualInvoiceClosure === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.isBlackListed')}}</span><p><i :class="rowData.isBlackListed === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <div v-html="getFormatDataByType(rowData.statement, 'object', 'insert.customer.statement')"></div>
                <div v-html="getFormatDataByType(rowData.statement, 'object', 'insert.customer.statementDay')"></div>
                <div v-html="getFormatDataByType(rowData.sapCustomerId, 'object', 'insert.customer.sapCustomerId')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DeliveryDayParam')}}</span><p>{{rowData.DeliveryDayParam}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsAutoBlockingOff')}}</span><p><i :class="rowData.IsAutoBlockingOff === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <div v-html="getFormatDataByType(rowData.BlockReason, 'object', 'insert.customer.Model_BlockReasonId')"></div>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsBlocked')}}</span> <p><i :class="rowData.IsBlocked === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p><i :class="rowData.ManualInvoiceClosure === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerRegion5Id')}}</span><p>{{rowData.CustomerRegion5 ? rowData.CustomerRegion5.Label : ''}}</p> -->
             </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerCreditHistories')}}</h6>
                <b-table responsive :items="rowData.CustomerCreditHistories" :fields="creditHistoriesFields">
                  <template #cell(CreditDescription)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(Currency)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(CreditStartDate)="data">
                    {{dateConvertFromTimezone(data.value)}}
                  </template>
                  <template #cell(CreditEndDate)="data">
                    {{dateConvertFromTimezone(data.value)}}
                  </template>
                  <template #cell(Bank)="data">
                    {{data.value ? data.value.Label : ''}}
                  </template>
                  <template #cell(DBS_PRIORITY)="data" >
                    <i :class="data.value.allowOverLimit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(AllowOverLimit)="data" >
                    <i :class="data.value.allowOverLimit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col cols="12" md="6">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_PaymentTypeId')}}</h6>
                <b-table responsive :items="rowData.CustomerPaymentTypes" :fields="paymentTypeFields">
                   <template #cell(PaymentType)="data">
                    {{data.value.Label}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_FixedTermId')}}</h6>
                <b-table responsive :items="rowData.CustomFixedTerms" :fields="fixedTermFields">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerItemDiscountCrts')}}</h6>
                <b-table responsive :items="rowData.CustomerItemDiscounts" :fields="discountFields">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.tag')}}</h6>
                <b-table responsive :items="rowData.CustomerLabels" :fields="customerLabelFields">
                  <template #cell(Label)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(LabelValue)="data">
                    {{data.value.Label}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerTouchpoints')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.customerTouchpoints')}}</h6>
                <b-table responsive :items="rowData.CustomerTouchpoints" :fields="customerTouchpointsFields">
                  <template #cell(TouchpointPriority)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(TouchpointType)="data">
                    {{data.value.Label}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerRegion')">
         <b-row class="p-4">
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.customer.Model_CustomerRegion5Id')"></div>
              </b-card>
          <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.marketingRegion5, 'object', 'insert.customer.marketingRegion5')"></div>
              </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../../mixins/index'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_Customer'
      },
      locationFields: [
        {key: 'Code', label: this.$t('insert.customer.Model_Code'), sortable: true},
        {key: 'Description1', label: this.$t('insert.customer.Model_Description1Lokasyon'), sortable: true},
        {key: 'AddressDetail', label: this.$t('insert.customer.Model_AddressDetail'), sortable: true},
        {key: 'City', label: this.$t('insert.customer.Model_CityId'), sortable: true},
        {key: 'Distirict', label: this.$t('insert.customer.Model_DistrictId'), sortable: true},
        {key: 'Avenue', label: this.$t('insert.customer.Model_AvenueId'), sortable: true},
        {key: 'Street', label: this.$t('insert.customer.Model_StreetId'), sortable: true},
        {key: 'PostCode', label: this.$t('insert.customer.Model_PostCode'), sortable: true},
        {key: 'XPosition', label: this.$t('insert.customer.Model_XPosition'), sortable: true},
        {key: 'YPosition', label: this.$t('insert.customer.Model_YPosition'), sortable: true},
        {key: 'AddressDescription', label: this.$t('insert.customer.Model_AddressDescription'), sortable: true},
        {key: 'ContactName', label: this.$t('insert.customer.Model_GsmNumber'), sortable: true},
        {key: 'PhoneNumber1', label: this.$t('insert.customer.Model_PhoneNumber1'), sortable: true},
        {key: 'PhoneNumber2', label: this.$t('insert.customer.Model_PhoneNumber2'), sortable: true},
        {key: 'IsDefaultLocation', label: this.$t('insert.customer.Model_IsDefaultLocation'), sortable: true},
        {key: 'IsInvoiceAddress', label: this.$t('insert.customer.Model_IsInvoiceAddress'), sortable: true},
        {key: 'IsDeliveryAddress', label: this.$t('insert.customer.Model_IsDeliveryAddress'), sortable: true},
        {key: 'IsRouteNode', label: this.$t('insert.customer.isRouteNode'), sortable: true},
        {key: 'IsVehicleLocation', label: this.$t('insert.customer.Model_IsDeliveryAddress'), sortable: true},
        {key: 'Genexp1', label: this.$t('insert.customer.Model_Genexp1'), sortable: true},
        {key: 'Alias', label: this.$t('insert.customer.Model_Alias'), sortable: true}
      ],
      creditHistoriesFields: [
        {key: 'CreditDescription', label: this.$t('insert.customer.Model_CreditDescriptionId'), sortable: true},
        {key: 'CreditAmount', label: this.$t('insert.customer.Model_CreditAmount'), sortable: true},
        {key: 'Currency', label: this.$t('insert.customer.Model_CurrencyId'), sortable: true},
        {key: 'CreditLimit', label: this.$t('insert.customer.CreditLimit'), sortable: true},
        {key: 'RiskLimit', label: this.$t('insert.customer.Model_RiskLimit'), sortable: true},
        {key: 'AllowOverLimit', label: this.$t('insert.customer.Model_AllowOverLimit'), sortable: true},
        {key: 'CreditStartDate', label: this.$t('insert.customer.Model_CreditEndDate'), sortable: true},
        {key: 'CreditEndDate', label: this.$t('insert.customer.Model_CreditEndDate'), sortable: true},
        {key: 'Bank', label: this.$t('insert.customer.bank'), sortable: true},
        {key: 'DBS_PRIORITY', label: this.$t('insert.customer.dbsPriority'), sortable: true},
        {key: 'CurrentCredit', label: this.$t('insert.customer.Model_CurrentCredit'), sortable: true}
      ],
      paymentTypeFields: [
        {key: 'PaymentType', label: this.$t('insert.customer.Model_PaymentTypeId'), sortable: true}
      ],
      fixedTermFields: [
        {key: 'FixedTermId', label: this.$t('insert.customer.Model_FixedTermId'), sortable: true}
      ],
      discountFields: [
        {key: 'Description1', label: 'Açıklama', sortable: true},
        {key: 'TCIBreak1Id', label: 'TCI 1', sortable: true},
        {key: 'TCIBreak2Id', label: 'TCI 2', sortable: true},
        {key: 'StartDate', label: 'Başlangıç Tarihi', sortable: true},
        {key: 'EndDate', label: 'Bitiş Tarihi', sortable: true},
        {key: 'DiscountPercent1', label: 'Müşteri İndirimi 1', sortable: true},
        {key: 'DiscountPercent2', label: 'Müşteri İndirimi 2', sortable: true}
      ],
      customerLabelFields: [
        {key: 'Label', label: 'Etiket Tanımı', sortable: true},
        {key: 'LabelValue', label: 'Etiket Değeri', sortable: true}
      ],
      customerTouchpointsFields: [
        {key: 'TouchpointPriority', label: 'İletişim Fırsatı Seviyesi', sortable: true},
        {key: 'TouchpointType', label: 'İletişim Fırsatı Tipi', sortable: true}
      ],
      Location: {}
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/Customer', record: this.$route.params.url})
    },
    showMap (item) {
      this.Location = item
      if (item.XPosition == null || item.YPosition == null) {
        this.$toasted.show(this.$t('index.errorLocation'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.$nextTick(() => {
        this.$root.$emit('bv::show::modal', 'location-modal', item)
      })
    }
  }
}
</script>
<style lang="sass">
</style>
