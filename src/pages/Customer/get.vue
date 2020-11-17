<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.Model_StatusReasonId')}}:</b> {{rowData.StatusReasonId.Label}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.customer.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active'): $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CommercialTitle')}}</span><p>{{rowData.CommercialTitle}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Description1')}}</span><p>{{rowData.Description1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxCustomerTypeId')}}</span><p>{{rowData.TaxCustomerTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxOffice')}}</span><p>{{rowData.TaxOffice}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxNumber')}}</span><p>{{rowData.TaxNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsDutyFree')}}</span><p>{{rowData.IsDutyFree}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_UseEInvoice')}}</span><p>{{rowData.UseEInvoice}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsTaxExemption')}}</span><p>{{rowData.IsTaxExemption}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerInvoiceTypeId')}}</span><p>{{rowData.CustomerInvoiceTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CardTypeId')}}</span><p>{{rowData.CardTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TypeId')}}</span><p>{{rowData.TypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesTypeId')}}</span><p>{{rowData.SalesTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesDocumentTypeId')}}</span><p>{{rowData.SalesDocumentTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_PriceListCategoryId')}}</span><p>{{rowData.PriceListCategoryId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesPriceChangeRate')}}</span><p>{{rowData.SalesPriceChangeRate}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DeliveryDayParam')}}</span><p>{{rowData.DeliveryDayParam}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerLocations')}}</h6>
                <b-table responsive :items="locationItems" :fields="locationFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
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
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category1Id')}}</span><p>{{rowData.Category1Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category3Id')}}</span><p>{{rowData.Category3Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category2Id')}}</span><p>{{rowData.Category2Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GroupId')}}</span><p>{{rowData.GroupId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup1Id')}}</span><p>{{rowData.DiscountGroup1Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup3Id')}}</span><p>{{rowData.DiscountGroup3Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup5Id')}}</span><p>{{rowData.DiscountGroup5Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup6Id')}}</span><p>{{rowData.DiscountGroup6Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup7Id')}}</span><p>{{rowData.DiscountGroup7Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup8Id')}}</span><p>{{rowData.DiscountGroup8Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesMethodId')}}</span><p>{{rowData.SalesMethodId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TradeFocusId')}}</span><p>{{rowData.TradeFocusId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup4Id')}}</span><p>{{rowData.DiscountGroup4Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_OwnerTypeId')}}</span><p>{{rowData.OwnerTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassId')}}</span><p>{{rowData.ClassId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalId')}}</span><p>{{rowData.ClassProposalId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalReasonId')}}</span><p>{{rowData.ClassProposalReasonId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_KindId')}}</span><p>{{rowData.KindId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GeographicEnvironmentId')}}</span><p>{{rowData.GeographicEnvironmentId}}</p>
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
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsBlocked')}}</span><p>{{rowData.IsBlocked}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BlockReasonId')}}</span><p>{{rowData.BlockReasonId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p>{{rowData.ManualInvoiceClosure}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_InvoiceCombineRuleId')}}</span><p>{{rowData.InvoiceCombineRuleId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerRegion5Id')}}</span><p>{{rowData.CustomerRegion5Id}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerCreditHistories')}}</h6>
                <b-table responsive :items="creditHistoriesItems" :fields="creditHistoriesFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
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
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DefaultPaymentTypeId')}}</span><p>{{rowData.DefaultPaymentTypeId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BankPaymentSystemId')}}</span><p>{{rowData.BankPaymentSystemId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_PaymentPeriod')}}</span><p>{{rowData.PaymentPeriod}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_PaymentTypeId')}}</h6>
                <b-table responsive :items="paymentTypeItems" :fields="paymentTypeFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_FixedTermId')}}</h6>
                <b-table responsive :items="fixedTermItems" :fields="fixedTermFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_FixedTermId')}}</h6>
                <b-table responsive :items="discountItems" :fields="discountFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
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
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
      locationFields: [
        {key: 'Code', label: 'Code', sortable: true},
        {key: 'Description1', label: 'Description1', sortable: true},
        {key: 'AddressDetail', label: 'AddressDetail', sortable: true},
        {key: 'city', label: 'city', sortable: true},
        {key: 'distirict', label: 'distirict', sortable: true},
        {key: 'AvenueId', label: 'AvenueId', sortable: true},
        {key: 'StreetId', label: 'StreetId', sortable: true},
        {key: 'PostCode', label: 'PostCode', sortable: true},
        {key: 'XPosition', label: 'XPosition', sortable: true},
        {key: 'YPosition', label: 'YPosition', sortable: true},
        {key: 'AddressDescription', label: 'AddressDescription', sortable: true},
        {key: 'ContactName', label: 'ContactName', sortable: true},
        {key: 'PhoneNumber1', label: 'PhoneNumber1', sortable: true},
        {key: 'PhoneNumber2', label: 'PhoneNumber2', sortable: true},
        {key: 'IsDefaultLocation', label: 'IsDefaultLocation', sortable: true},
        {key: 'IsInvoiceAddress', label: 'IsInvoiceAddress', sortable: true},
        {key: 'IsDeliveryAddress', label: 'IsDeliveryAddress', sortable: true},
        {key: 'Genexp1', label: 'Genexp1', sortable: true},
        {key: 'Alias', label: 'Alias', sortable: true}
      ],
      creditHistoriesFields: [
        {key: 'CreditDescriptionId', label: 'CreditDescriptionId', sortable: true},
        {key: 'CreditAmount', label: 'CreditAmount', sortable: true},
        {key: 'CurrencyId', label: 'CurrencyId', sortable: true},
        {key: 'CreditLimit', label: 'CreditLimit', sortable: true},
        {key: 'RiskLimit', label: 'RiskLimit', sortable: true},
        {key: 'AllowOverLimit', label: 'AllowOverLimit', sortable: true},
        {key: 'CreditStartDate', label: 'CreditStartDate', sortable: true},
        {key: 'CreditEndDate', label: 'CreditEndDate', sortable: true}
      ],
      paymentTypeFields: [
        {key: 'PaymentTypeId', label: 'PaymentTypeId', sortable: true}
      ],
      fixedTermFields: [
        {key: 'FixedTermId', label: 'FixedTermId', sortable: true}
      ],
      discountFields: [
        {key: 'ColumnName', label: 'ColumnName', sortable: true},
        {key: 'ColumnValue', label: 'ColumnValue', sortable: true},
        {key: 'StartDate', label: 'StartDate', sortable: true},
        {key: 'EndDate', label: 'EndDate', sortable: true},
        {key: 'DiscountPercent1', label: 'DiscountPercent1', sortable: true},
        {key: 'DiscountPercent2', label: 'DiscountPercent2', sortable: true}
      ],
      locationItems: [
        {Code: '', Description1: '', AddressDetail: '', city: '', distirict: '', AvenueId: '', StreetId: '', PostCode: '', XPosition: '', YPosition: '', AddressDescription: '', ContactName: '', PhoneNumber1: '', PhoneNumber2: '', IsDefaultLocation: '', IsInvoiceAddress: '', IsDeliveryAddress: '', Genexp1: '', Alias: ''},
        {Code: '', Description1: '', AddressDetail: '', city: '', distirict: '', AvenueId: '', StreetId: '', PostCode: '', XPosition: '', YPosition: '', AddressDescription: '', ContactName: '', PhoneNumber1: '', PhoneNumber2: '', IsDefaultLocation: '', IsInvoiceAddress: '', IsDeliveryAddress: '', Genexp1: '', Alias: ''},
        {Code: '', Description1: '', AddressDetail: '', city: '', distirict: '', AvenueId: '', StreetId: '', PostCode: '', XPosition: '', YPosition: '', AddressDescription: '', ContactName: '', PhoneNumber1: '', PhoneNumber2: '', IsDefaultLocation: '', IsInvoiceAddress: '', IsDeliveryAddress: '', Genexp1: '', Alias: ''},
        {Code: '', Description1: '', AddressDetail: '', city: '', distirict: '', AvenueId: '', StreetId: '', PostCode: '', XPosition: '', YPosition: '', AddressDescription: '', ContactName: '', PhoneNumber1: '', PhoneNumber2: '', IsDefaultLocation: '', IsInvoiceAddress: '', IsDeliveryAddress: '', Genexp1: '', Alias: ''},
        {Code: '', Description1: '', AddressDetail: '', city: '', distirict: '', AvenueId: '', StreetId: '', PostCode: '', XPosition: '', YPosition: '', AddressDescription: '', ContactName: '', PhoneNumber1: '', PhoneNumber2: '', IsDefaultLocation: '', IsInvoiceAddress: '', IsDeliveryAddress: '', Genexp1: '', Alias: ''}
      ],
      creditHistoriesItems: [
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', CreditStartDate: '', CreditEndDate: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', CreditStartDate: '', CreditEndDate: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', CreditStartDate: '', CreditEndDate: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', CreditStartDate: '', CreditEndDate: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', CreditStartDate: '', CreditEndDate: ''}
      ],
      paymentTypeItems: [
        {PaymentTypeId: ''},
        {PaymentTypeId: ''},
        {PaymentTypeId: ''},
        {PaymentTypeId: ''}
      ],
      fixedTermItems: [
        {FixedTermId: ''},
        {FixedTermId: ''},
        {FixedTermId: ''},
        {FixedTermId: ''}
      ],
      discountItems: [
        {ColumnName: '', ColumnValue: '', StartDate: '', EndDate: '', DiscountPercent1: '', DiscountPercent2: ''},
        {ColumnName: '', ColumnValue: '', StartDate: '', EndDate: '', DiscountPercent1: '', DiscountPercent2: ''},
        {ColumnName: '', ColumnValue: '', StartDate: '', EndDate: '', DiscountPercent1: '', DiscountPercent2: ''},
        {ColumnName: '', ColumnValue: '', StartDate: '', EndDate: '', DiscountPercent1: '', DiscountPercent2: ''}
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
      this.$store.dispatch('getData', {...this.query, api: this.$route.meta.baseLink, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
