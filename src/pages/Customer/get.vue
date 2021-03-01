<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
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
              <div v-html="getFormatDataByType(rowData.IsDutyFree, 'check', 'insert.customer.Model_IsDutyFree')"></div>
              <div v-html="getFormatDataByType(rowData.UseEInvoice, 'check', 'insert.customer.Model_UseEInvoice')"></div>
              <div v-html="getFormatDataByType(rowData.IsTaxExemption, 'check', 'insert.customer.Model_IsTaxExemption')"></div>
              <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerInvoiceTypeId')}}</span><p>{{rowData.CustomerInvoiceTypeId}}</p> -->
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.customer.Model_CardTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.customer.Model_TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesType, 'object', 'insert.customer.Model_SalesTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesDocumentType, 'object', 'insert.customer.Model_SalesDocumentTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.SalesPriceChangeRate, 'text', 'insert.customer.Model_SalesPriceChangeRate')"></div>
              <div v-html="getFormatDataByType(rowData.DeliveryDayParam, 'text', 'insert.customer.Model_DeliveryDayParam')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card>
                <b-table responsive outlined :items="rowData.CustomerLocations" :fields="locationFields">
                  <template #cell(City)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(IsDefaultLocation)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsInvoiceAddress)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsDeliveryAddress)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsRouteNode)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsVehicleLocation)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category1Id')}}</span><p>{{rowData.Category1 ? rowData.Category1.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category2Id')}}</span><p>{{rowData.Category2 ? rowData.Category2.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category3Id')}}</span><p>{{rowData.Category3 ? rowData.Category3.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GroupId')}}</span><p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup1Id')}}</span><p>{{rowData.DiscountGroup1Id}}</p>
                 <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup3Id')}}</span><p>{{rowData.DiscountGroup3Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup5Id')}}</span><p>{{rowData.DiscountGroup5Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup6Id')}}</span><p>{{rowData.DiscountGroup6Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup7Id')}}</span><p>{{rowData.DiscountGroup7Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup8Id')}}</span><p>{{rowData.DiscountGroup8Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesMethodId')}}</span><p>{{rowData.SalesMethod ? rowData.SalesMethod.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TradeFocusId')}}</span><p>{{rowData.TradeFocus ? rowData.TradeFocus.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup4Id')}}</span><p>{{rowData.DiscountGroup4Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_OwnerTypeId')}}</span><p>{{rowData.OwnerType ? rowData.OwnerType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassId')}}</span><p>{{rowData.Class ? rowData.Class.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalId')}}</span><p>{{rowData.ClassProposal ? rowData.ClassProposal.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalReasonId')}}</span><p>{{rowData.ClassProposalReason ? rowData.ClassProposalReason.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_KindId')}}</span><p>{{rowData.Kind ? rowData.Kind.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GeographicEnvironmentId')}}</span><p>{{rowData.GeographicEnvironment ? rowData.GeographicEnvironment.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field1')}}</span><p>{{rowData.Field1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field2')}}</span><p>{{rowData.Field2}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field3')}}</span><p>{{rowData.Field3}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field4')}}</span><p>{{rowData.Field4}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field5')}}</span><p>{{rowData.Field5}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TextField6')}}</span><p>{{rowData.TextField6}}</p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CreditLimit')}}</span><p>{{rowData.CreditLimit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_RiskLimit')}}</span><p>{{rowData.RiskLimit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsDefaultLocation')}}</span><p>{{rowData.IsDefaultLocation}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentCredit')}}</span><p>{{rowData.CurrentCredit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentRisk')}}</span><p>{{rowData.CurrentRisk}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsAutoBlockingOff')}}</span><p>{{rowData.IsAutoBlockingOff}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsBlocked')}}</span> <p><i :class="rowData.IsBlocked === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BlockReasonId')}}</span><p>{{rowData.BlockReason ? rowData.BlockReason.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p>{{rowData.ManualInvoiceClosure}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_InvoiceCombineRuleId')}}</span><p>{{rowData.InvoiceCombineRuleId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerRegion5Id')}}</span><p>{{rowData.CustomerRegion5 ? rowData.CustomerRegion5.Label : ''}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
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
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DefaultPaymentTypeId')}}</span><p>{{rowData.DefaultPaymentType ? rowData.DefaultPaymentType.Label : ''}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BankPaymentSystemId')}}</span><p>{{rowData.BankPaymentSystemId}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_PaymentPeriod')}}</span><p>{{rowData.PaymentPeriod}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_PaymentTypeId')}}</h6>
                <b-table responsive :items="rowData.CustomerPaymentTypes" :fields="paymentTypeFields">
                   <template #cell(PaymentType)="data">
                    {{data.value.Label}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
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
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
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
        {key: 'CreditEndDate', label: this.$t('insert.customer.Model_CreditEndDate'), sortable: true}
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
      ]
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
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
    }
  }
}
</script>
<style lang="sass">
</style>
