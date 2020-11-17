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
            <span><i class="fas fa-code" /> <b>{{$t('insert.branch.BranchCommercialTitle')}}:</b> {{rowData.BranchCommercialTitle}}</span>
            <span><i class="fas fa-code" /> <b>{{$t('insert.branch.CustomerPrefixCode')}}: </b> {{rowData.CustomerPrefixCode}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.route.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active'): $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
        <b-tabs>
          <b-tab :title="$t('insert.branch.Branch')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.branch.Branch')}}</h6>
                <span><i class="fas fa-code" /> {{$t('insert.branch.TaxCustomerTypeId')}}</span><p>{{rowData.TaxCustomerTypeId}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.UpperBranchId')}}</span><p>{{rowData.UpperBranchId}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.IsDutyFree')}}</span><p><i :class="rowData.IsDutyFree === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.TaxOffice')}}</span><p>{{rowData.TaxOffice}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.TaxNumber')}}</span><p>{{rowData.TaxNumber}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.BranchRegionId')}}</span><p>{{rowData.BranchRegionId}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.LicenseNumber')}}</span><p>{{rowData.LicenseNumber}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.SalesDocumentTypeId')}}</span><p>{{rowData.SalesDocumentTypeId}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.InvoiceCombineRuleId')}}</span><p>{{rowData.InvoiceCombineRuleId}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.IsOrderChangeUnitary')}}</span><p><i :class="rowData.IsOrderChangeUnitary === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.IsWarehouseSale')}}</span><p><i :class="rowData.IsWarehouseSale === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.WebUrl')}}</span><p>{{rowData.WebUrl}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.TradeLicenseNumber')}}</span><p>{{rowData.TradeLicenseNumber}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.UseEInvoice')}}</span><p><i :class="rowData.UseEInvoice === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.UseEArchive')}}</span><p><i :class="rowData.UseEArchive === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.UseEWaybill')}}</span><p><i :class="rowData.UseEWaybill === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.branch.BranchDetails')}}</h6>
                <span><i class="fas fa-code" /> {{$t('insert.branch.DiscountGroup10Id')}}</span><p>{{rowData.DiscountGroup10Id}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.DiscountGroup2Id')}}</span><p>{{rowData.DiscountGroup2Id}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.DiscountGroup9Id')}}</span><p>{{rowData.DiscountGroup9Id}}</p>
                <span><i class="fas fa-code" /> {{$t('insert.branch.Genexp1')}}</span><p>{{rowData.Genexp1}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.branch.BranchFinancialInfo')}}</h6>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.DefaultPaymentTypeId')}}</span><p>{{rowData.DefaultPaymentTypeId}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.PriceListCategoryId')}}</span><p>{{rowData.PriceListCategoryId}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.MaxBonusRate')}}</span><p>{{rowData.MaxBonusRate}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.SalesPriceChangeRate')}}</span><p>{{rowData.SalesPriceChangeRate}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.PaymentPeriod')}}</span><p>{{rowData.PaymentPeriod}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.CreditLimit')}}</span><p>{{rowData.CreditLimit}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.RiskLimit')}}</span><p><i :class="rowData.RiskLimit === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.AllowOverLimit')}}</span><p>{{rowData.AllowOverLimit}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.DeliveryDayParam')}}</span><p>{{rowData.DeliveryDayParam}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.DiscountPercent1')}}</span><p>{{rowData.DiscountPercent1}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.DiscountPercent2')}}</span><p>{{rowData.DiscountPercent2}}</p>
                  <span><i class="fas fa-code" /> {{$t('insert.branch.ManualInvoiceClosure')}}</span><p><i :class="rowData.ManualInvoiceClosure === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.BranchLocations')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
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
        <b-tab :title="$t('insert.branch.BranchCreditHistories')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="creditItems" :fields="creditFields">
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
        <b-tab :title="$t('insert.branch.PaymentType')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="paymentItems" :fields="paymentFields">
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
        <b-tab :title="$t('insert.branch.CustomFixedTerms')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
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
        <b-tab :title="$t('insert.branch.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
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
        <b-tab :title="$t('insert.branch.EInvoiceSeqs')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="einvoiceItems" :fields="einvoiceFields">
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
        {key: 'Code_Location', label: 'Code_Location', sortable: true},
        {key: 'Description1_Location', label: 'Description1_Location', sortable: true},
        {key: 'AddressDetail', label: 'AddressDetail', sortable: true},
        {key: 'CityId', label: 'CityId', sortable: true},
        {key: 'DistrictId', label: 'DistrictId', sortable: true},
        {key: 'ParishId', label: 'ParishId', sortable: true},
        {key: 'StreetDescription', label: 'StreetDescription', sortable: true},
        {key: 'GsmNumber', label: 'GsmNumber', sortable: true},
        {key: 'PhoneNumber1', label: 'PhoneNumber1', sortable: true},
        {key: 'PhoneNumber2', label: 'PhoneNumber2', sortable: true},
        {key: 'FaxNumber', label: 'FaxNumber', sortable: true},
        {key: 'IsInvoiceAddress', label: 'IsInvoiceAddress', sortable: true},
        {key: 'IsDeliveryAddress', label: 'IsDeliveryAddress', sortable: true},
        {key: 'IsDefaultLocation', label: 'IsDefaultLocation', sortable: true},
        {key: 'Genexp1', label: 'Genexp1', sortable: true}
      ],
      creditFields: [
        {key: 'CreditDescriptionId', label: 'CreditDescriptionId', sortable: true},
        {key: 'CreditAmount', label: 'CreditAmount', sortable: true},
        {key: 'CurrencyId', label: 'CurrencyId', sortable: true},
        {key: 'BankId', label: 'BankId', sortable: true},
        {key: 'CreditStartDate', label: 'CreditStartDate', sortable: true},
        {key: 'CreditEndDate', label: 'CreditEndDate', sortable: true},
        {key: 'CreditLimit', label: 'CreditLimit', sortable: true},
        {key: 'RiskLimit', label: 'RiskLimit', sortable: true},
        {key: 'AllowOverLimit', label: 'AllowOverLimit', sortable: true},
        {key: 'Bail', label: 'Bail', sortable: true},
        {key: 'Debtor', label: 'Debtor', sortable: true},
        {key: 'TextNo', label: 'TextNo', sortable: true},
        {key: 'TextDate', label: 'TextDate', sortable: true},
        {key: 'LandOffice', label: 'LandOffice', sortable: true},
        {key: 'TraficRegistry', label: 'TraficRegistry', sortable: true},
        {key: 'NotaryNo', label: 'NotaryNo', sortable: true},
        {key: 'NotaryDate', label: 'NotaryDate', sortable: true},
        {key: 'MortgageValue', label: 'MortgageValue', sortable: true},
        {key: 'Plate', label: 'Plate', sortable: true},
        {key: 'PlateNumber', label: 'PlateNumber', sortable: true}
      ],
      paymentFields: [
        {key: 'PaymentType', label: 'PaymentType', sortable: true}
      ],
      fixedTermFields: [
        {key: 'FixedTermId', label: 'FixedTermId', sortable: true}
      ],
      discountFields: [
        {key: 'StartDate', label: 'StartDate', sortable: true},
        {key: 'EndDate', label: 'EndDate', sortable: true},
        {key: 'ColumnName', label: 'ColumnName', sortable: true},
        {key: 'ColumnValue', label: 'ColumnValue', sortable: true},
        {key: 'DiscountPercent1', label: 'DiscountPercent1', sortable: true},
        {key: 'DiscountPercent2', label: 'DiscountPercent2', sortable: true}
      ],
      einvoiceFields: [
        {key: 'Prefix', label: 'Prefix', sortable: true},
        {key: 'TerminalOrPcId', label: 'TerminalOrPcId', sortable: true},
        {key: 'EInvoiceTypeId', label: 'EInvoiceTypeId', sortable: true},
        {key: 'TransactionDayId', label: 'TransactionDayId', sortable: true},
        {key: 'StatusId', label: 'StatusId', sortable: true}
      ],
      locationItems: [
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''},
        {Code_Location: '', Description1_Location: '', AddressDetail: '', CityId: '', DistrictId: '', ParishId: '', StreetDescription: '', GsmNumber: '', PhoneNumber1: '', PhoneNumber2: '', FaxNumber: '', IsInvoiceAddress: '', IsDeliveryAddress: '', IsDefaultLocation: '', Genexp1: ''}
      ],
      creditItems: [
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''},
        {CreditDescriptionId: '', CreditAmount: '', CurrencyId: '', BankId: '', CreditStartDate: '', CreditEndDate: '', CreditLimit: '', RiskLimit: '', AllowOverLimit: '', Bail: '', Debtor: '', TextNo: '', TextDate: '', LandOffice: '', TraficRegistry: '', NotaryNo: '', NotaryDate: '', MortgageValue: '', Plate: '', PlateNumber: ''}
      ],
      paymentItems: [
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''}
      ],
      fixedTermItems: [
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''},
        {PaymentType: ''}
      ],
      discountItems: [
        {StartDate: '', EndDate: '', ColumnName: '', ColumnValue: '', DiscountPercent1: '', DiscountPercent2: ''},
        {StartDate: '', EndDate: '', ColumnName: '', ColumnValue: '', DiscountPercent1: '', DiscountPercent2: ''},
        {StartDate: '', EndDate: '', ColumnName: '', ColumnValue: '', DiscountPercent1: '', DiscountPercent2: ''},
        {StartDate: '', EndDate: '', ColumnName: '', ColumnValue: '', DiscountPercent1: '', DiscountPercent2: ''},
        {StartDate: '', EndDate: '', ColumnName: '', ColumnValue: '', DiscountPercent1: '', DiscountPercent2: ''}
      ],
      einvoiceItems: [
        {Prefix: '', TerminalOrPcId: '', EInvoiceTypeId: '', TransactionDayId: '', StatusId: ''},
        {Prefix: '', TerminalOrPcId: '', EInvoiceTypeId: '', TransactionDayId: '', StatusId: ''},
        {Prefix: '', TerminalOrPcId: '', EInvoiceTypeId: '', TransactionDayId: '', StatusId: ''},
        {Prefix: '', TerminalOrPcId: '', EInvoiceTypeId: '', TransactionDayId: '', StatusId: ''}
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
