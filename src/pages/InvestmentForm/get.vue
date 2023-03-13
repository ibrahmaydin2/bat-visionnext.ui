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
          </header>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('router.investmentForm')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(customerList.Description1, 'text', 'insert.investmentForm.customer')"></div>
              <div v-html="getFormatDataByType(customerList.CommercialTitle, 'text', 'insert.investmentForm.customerName')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerLocations[0].AddressDetail, 'text', 'insert.investmentForm.address')"></div>
              <div v-html="getFormatDataByType(customerList.LicenseNumber, 'text', 'insert.investmentForm.licenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.investmentForm.description')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerRegion5.Label, 'text', 'insert.investmentForm.typeId')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(customerList.RouteDetails[0].Route.Label, 'text', 'insert.investmentForm.route')"></div>
              <div v-html="getFormatDataByType(customerList.RouteDetails[0].Representative.Label, 'text', 'insert.investmentForm.tmrSrName')"></div>
              <div v-html="getFormatDataByType(rowData.formDate, 'text', 'insert.investmentForm.formDate')"></div>
              <div v-html="getFormatDataByType(this.form.salesVolumeClass, 'text', 'insert.investmentForm.salesVolumeClass')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerRegion5.Label, 'text', 'insert.investmentForm.customerArea')"></div>
              <div v-html="getFormatDataByType(rowData.SignatureType.Label, 'text', 'insert.investmentForm.signingType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.currentInvestment')" active>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.currentSales')}}</h6>
                  <b-table-simple bordered small>
                    <b-thead>
                      <b-th></b-th>
                      <b-th><span>{{$t(this.currentSales.KentBrandLC)}}</span></b-th>
                      <b-th><span>{{$t(this.currentSales.RothmansBrandLC)}}</span></b-th>
                      <b-th><span>{{$t(this.currentSales.Tekel2000BrandLC)}}</span></b-th>
                      <b-th><span>{{$t('insert.investmentForm.total')}}</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.currentMonthlyAverageSale')}}</b-td>
                        <b-td>{{this.currentSales.KentNetSales}}</b-td>
                        <b-td>{{this.currentSales.RothmansNetSales}}</b-td>
                        <b-td>{{this.currentSales.Tekel2000NetSales}}</b-td>
                        <b-td>{{this.currentSales.KentNetSales + this.currentSales.RothmansNetSales + this.currentSales.Tekel2000NetSales}} </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.currentAnnualSaleProfit')}}</b-td>
                        <b-td>{{this.currentSales.KentNetSales * this.GrossMargin}}</b-td>
                        <b-td>{{this.currentSales.RothmansNetSales * this.GrossMargin}}</b-td>
                        <b-td>{{this.currentSales.Tekel2000NetSales * this.GrossMargin}}</b-td>
                        <b-td>{{(this.currentSales.KentNetSales * this.GrossMargin) + (this.currentSales.RothmansNetSales * this.GrossMargin) + (this.currentSales.Tekel2000NetSales * this.GrossMargin)}} </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-card>
              </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.currentInvestmentBudget')}}</h6>
                  <b-table-simple bordered small>
                    <b-thead>
                      <b-th><span>{{$t('insert.investmentForm.contractGainType')}}</span></b-th>
                      <b-th><span>{{$t(this.currentInvestmentBudget.KentBrandContract)}}</span></b-th>
                      <b-th><span>{{$t(this.currentInvestmentBudget.RothmansBrandContract)}}</span></b-th>
                      <b-th><span>{{$t(this.currentInvestmentBudget.Tekel2000BrandContract)}}</span></b-th>
                      <b-th><span>{{$t('insert.investmentForm.total')}}</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr>
                        <b-td></b-td>
                        <b-td>{{this.currentInvestmentBudget.KentContractQuotaQuantity}}</b-td>
                        <b-td>{{this.currentInvestmentBudget.RothmansContractQuotaQuantity}}</b-td>
                        <b-td>{{this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity}}</b-td>
                        <b-td>{{this.currentInvestmentBudget.KentContractQuotaQuantity + this.currentInvestmentBudget.RothmansContractQuotaQuantity + this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity}} </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.currentReturnOnInvestment')}}</h6>
                  <b-table-simple bordered small>
                    <b-tbody>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.currentReturnOnInvestmentTL')}}</b-td>
                        <b-td>{{parseInt(this.currentSales.KentNetSales + this.currentSales.RothmansNetSales + this.currentSales.Tekel2000NetSales) - parseInt(this.currentSales.KentQuotaQuantity + this.currentSales.RothmansQuotaQuantity + this.currentSales.Tekel2000QuotaQuantity) }}</b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.rateOfReturnOnInvestment')}}</b-td>
                        <b-td>{{parseInt(this.currentSales.KentNetSales + this.currentSales.RothmansNetSales + this.currentSales.Tekel2000NetSales) / parseInt(this.currentSales.KentQuotaQuantity + this.currentSales.RothmansQuotaQuantity + this.currentSales.Tekel2000QuotaQuantity) }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.newInvestment')" active>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('Mevcut Satış')}}</h6>
                <b-row class="p-1">
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                    <NextDatePicker v-model="form.contractStartDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12" class="mr-1">
                  <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                    <NextDatePicker v-model="form.contractEndDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                    <NextInput :disabled="true" type="text" v-model="form.contractDuration"/>
                  </NextFormGroup>
                </b-col>
              </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.targetSale')}}</h6>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th></b-th>
                    <b-th><span>{{$t(this.targetSale.KentBrandContractItem)}}</span></b-th>
                    <b-th><span>{{$t(this.targetSale.RothmansBrandContractItem)}}</span></b-th>
                    <b-th><span>{{$t(this.targetSale.Tekel2000BrandContractItem)}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.total')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.targetedAverageMonthlySales')}}</b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.targetAnnualSalesProfit')}}</b-td>
                      <b-td>{{this.targetSale.KentContractItemQuotaQuantity}}</b-td>
                      <b-td>{{this.targetSale.RothmansContractItemQuotaQuantity}}</b-td>
                      <b-td>{{this.targetSale.Tekel2000ContractItemQuotaQuantity}}</b-td>
                      <b-td>{{this.targetSale.KentContractItemQuotaQuantity + this.targetSale.RothmansContractItemQuotaQuantity + this.targetSale.Tekel2000ContractItemQuotaQuantity }} </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.newInvestmentBudget')}}</h6>
                <b-table-simple bordered small>
                    <b-thead>
                      <b-th><span>{{$t('insert.investmentForm.contractGainType')}}</span></b-th>
                      <b-th><span>{{$t('insert.investmentForm.earningAmount')}}</span></b-th>
                      <b-th><span>{{$t('insert.investmentForm.earningsTypeBudget')}}</span></b-th>
                      <b-th><span>{{$t('insert.contract.plannedPaymentDate')}}</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="(c, i) in rowData.ContractBenefits.filter(c => c.BenefitTypeId === 3)" :key="i" >
                        <b-td>Nakit</b-td>
                        <b-td>{{c.BenefitBudget}}</b-td>
                        <b-td>{{c.BudgetMaster.Label}}</b-td>
                        <b-td>{{PlannedPaymentDate.split('T')[0]}}</b-td>
                      </b-tr>
                      <b-tr v-for="(c, i) in rowData.ContractPriceDiscounts[0].BenefitConditionId === 49 && rowData.ContractBenefits.filter(c => c.BenefitTypeId === 6)" :key="i" >
                        <b-td>Only DTI</b-td>
                        <b-td>{{c.BenefitBudget}}</b-td>
                        <b-td>{{c.BudgetMaster.Label}}</b-td>
                        <b-td></b-td>
                      </b-tr>
                      <b-tr v-for="(c, i) in rowData.ContractPriceDiscounts[0].BenefitConditionId === 102000 && rowData.ContractBenefits.filter(x => x.BenefitTypeId === 6)" :key="i" >
                        <b-td>YYM</b-td>
                        <b-td>{{c.BenefitBudget}}</b-td>
                        <b-td>{{c.BudgetMaster.Label}}</b-td>
                        <b-td></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.total')}}</b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('Yeni Yatırım Kârlılığı')}}</h6>
                <b-table-simple bordered small>
                  <b-tbody>
                    <b-tr>
                      <b-td>Beklenen Kârlılık (TL)</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Beklenen Yatırım Kârlılık Oranı(%)</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.unitAndOrderDetails')" active>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.currentUnitStatus')}}</h6>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.investmentForm.currentUnitStatus')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.currentUnitStatus')}} Adı</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.currentUnitStatus')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.currentUnitStatus')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-td>Ünite 1</b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                    <b-tr>
                      <b-td>Ünite 2</b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Ünite 3</b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                      <b-td></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('Rakip Ünite Durumu')}}</h6>
                <b-table-simple bordered small >
                  <b-thead>
                    <b-th><span>Firma</span></b-th>
                    <b-th><span>PMI</span></b-th>
                    <b-th><span>JTI</span></b-th>
                    <b-th><span>ITC</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr>
                      <b-td>Ünite</b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Ünite Tipi</b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                      <b-td><NextDropdown :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Yatırım Tutarı</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('Diğer Detaylar')}}</h6>
                <b-table-simple bordered small >
                  <b-tbody>
                    <b-tr>
                      <b-td>Mobilya Masrafı</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Önyüz Sayısı</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Önyüz Masrafı</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Toplam Mobilya Masrafı</b-td>
                      <b-td><NextInput type="text" :disabled="true"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
      form: {
        customerName: null,
        address: null,
        licenseNumber: null,
        description: null,
        route: null,
        tmrSrName: null,
        salesVolumeClass: [],
        formDate: null,
        typeId: [],
        customerArea: null,
        signingType: [],
        currentInvestment: null,
        newInvestment: null,
        unitAndOrderDetails: null,
        contractStartDate: null,
        contractEndDate: null,
        contractDuration: null,
        scheduledPaymentDate: null,
        CustomerId: null,
        FinanceCode: null,
        CustomerFinanceCode: null
      },
      customerBudgets: [],
      customerList: [],
      selectedCustomer: null,
      recordIdList: [],
      RouteDetailsList: [],
      getLastContractList: [],
      date: null,
      KentBrandLC: null,
      KentNetSales: null,
      RothmansBrandLC: null,
      RothmansNetSales: null,
      Tekel2000BrandLC: null,
      Tekel2000NetSales: null,
      GrossMargin: null,
      ContractItemCriteriaList: [],
      newReturnOfInvestment: {
        expectedProfitability: null,
        returnOnInvestment: null
      },
      opponentUnitStatus: {
        pmiInvestmentAmount: null,
        jtiInvestmentAmount: null,
        itcInvestmentAmount: null
      },
      contractDates: {
        ContractValidDateStartDate: null,
        ContractValidDateEndDate: null,
        ContractValidDurationDate: null
      },
      currentInvestmentBudget: {
        KentBrandContract: null,
        RothmansBrandContract: null,
        Tekel2000BrandContract: null,
        KentContractQuotaQuantity: null,
        RothmansContractQuotaQuantity: null,
        Tekel2000ContractQuotaQuantity: null
      },
      newInvestmentBudget: {
        Cash: 0,
        OnlyDTI: 0,
        Yym: 0,
        cashScheduledPaymentDate: null,
        onlyDtiScheduledPaymentDate: null,
        yymScheduledPaymentDate: null,
        cashBudgetMaster: null,
        onlyDtiBudgetMaster: null,
        yymBudgetMaster: null
      },
      targetSale: {
        KentContractItemQuotaQuantity: null,
        RothmansContractItemQuotaQuantity: null,
        Tekel2000ContractItemQuotaQuantity: null,
        KentBrandContractItem: null,
        RothmansBrandContractItem: null,
        Tekel2000BrandContractItem: null,
        kentMonthlyAverageSales: 0,
        rothmansMonthlyAverageSales: 0,
        tekelMonthlyAverageSales: 0
      },
      currentSales: {
        KentBrandLC: null,
        KentNetSales: null,
        RothmansBrandLC: null,
        RothmansNetSales: null,
        Tekel2000BrandLC: null,
        Tekel2000NetSales: null
      },
      otherDetails: {
        furniteCost: 0,
        numberOfFrontFaces: 0,
        frontFaceCost: 0,
        totalFurniteCost: 0
      },
      cashContractBenefits: [],
      cashContractPaymentPlans: [],
      onlyDtiBenefits: [],
      onlyDtiContractPaymentPlans: [],
      PlannedPaymentDate: null
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContractManagement/api/Contract', record: this.$route.params.url}).then(() => {
        console.log(this.rowData)
        if (this.rowData) {
          this.PlannedPaymentDate = this.rowData.ContractPaymentPlans[0].PlannedPaymentDate
        }
        this.$api.post({RecordId: this.rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          this.customerList = response.Model
          this.getLookups(this.customerList.KindId)
          this.getLastContract(this.customerList.customerId)
          this.getContractItemCriteria()
        })
        var ContractBenefitsList = this.rowData.ContractBenefits
        var ContractBenefitsCash = ContractBenefitsList.filter(a => a.BenefitTypeId === 3)
        if (ContractBenefitsCash.length > 0) {
          this.cashContractBenefits = ContractBenefitsCash[0]
        }
        this.cashContractPaymentPlans = this.rowData.ContractPaymentPlans[0]
        var ContractItemList = this.rowData.ContractItems
        var kentContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Kent')
        if (kentContractList.length > 0) {
          this.currentInvestmentBudget.KentContractQuotaQuantity = kentContractList[0].QuotaQuantity
          this.currentInvestmentBudget.KentBrandContract = kentContractList[0].ColumnValueStr
        }
        var rothmansContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Rothmans')
        if (rothmansContractList.length > 0) {
          this.currentInvestmentBudget.RothmansContractQuotaQuantity = rothmansContractList[0].QuotaQuantity
          this.currentInvestmentBudget.RothmansBrandContract = rothmansContractList[0].ColumnValueStr
        }
        var tekel2000List = ContractItemList.filter(a => a.ColumnValueStr === 'Tekel 2000')
        if (tekel2000List.length > 0) {
          this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity = tekel2000List[0].QuotaQuantity
          this.currentInvestmentBudget.Tekel2000BrandContract = tekel2000List[0].ColumnValueStr
        }
      })
    },
    getLookups (kindId) {
      this.$api.postByUrl({LookupTableCode: 'CUSTOMER_KIND'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        var lookupValues = response.Values.CUSTOMER_KIND.filter(a => a.DecimalValue === kindId)
        if (lookupValues.length > 0) {
          this.form.salesVolumeClass = lookupValues[0].Label
        }
      })
    },
    calculateContractDuration () {
      this.form.contractDuration = this.form.contractStartDate - this.form.contractEndDate
    },
    getLastContract (CustomerId) {
      let request = {
        customerId: CustomerId }
      this.$api.postByUrl(request, `VisionNextContractManagement/api/Contract/LastContractAvarageSales`).then((res) => {
        this.GrossMargin = res.GrossMargin
        this.getLastContractList = res.LastContractDetails
        var filteredLastContract = this.getLastContractList
        var kentContract = filteredLastContract.filter(a => a.Brand === 'Kent')
        if (kentContract && kentContract.length > 0) {
          this.currentSales.KentBrandLC = kentContract[0].Brand
          this.currentSales.KentNetSales = kentContract[0].NetSales
          console.log(this.currentSales.KentNetSales)
        }
        var rothmansContract = filteredLastContract.filter(a => a.Brand === 'Rothmans')
        if (rothmansContract && rothmansContract.length > 0) {
          this.currentSales.RothmansBrandLC = rothmansContract[0].Brand
          this.currentSales.RothmansNetSales = rothmansContract[0].NetSales
          console.log(this.currentSales.RothmansNetSales)
        }
        var tekelContract = filteredLastContract.filter(a => a.Brand === 'Tekel 2000')
        if (tekelContract && tekelContract.length > 0) {
          this.currentSales.Tekel2000BrandLC = tekelContract[0].Brand
          this.currentSales.Tekel2000NetSales = tekelContract[0].NetSales
          console.log(this.currentSales.Tekel2000NetSales)
        }
      })
    },
    getContractItemCriteria () {
      let request = {
        typeId: 3
      }
      this.$api.postByUrl(request, `VisionNextContractManagement/api/Contract/GetContractItemCriteria`).then((response) => {
        this.ContractItemCriteriaList = response
        var filteredContractItemCriteria = this.ContractItemCriteriaList
        var kentContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Kent')
        if (kentContractItemCriteria.length > 0) {
          this.targetSale.KentBrandContractItem = kentContractItemCriteria[0].ColumnValueStr
          this.targetSale.KentContractItemQuotaQuantity = kentContractItemCriteria[0].QuotaQuantity
        }
        var rothmansContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Rothmans')
        if (rothmansContractItemCriteria.length > 0) {
          this.targetSale.RothmansBrandContractItem = rothmansContractItemCriteria[0].ColumnValueStr
          this.targetSale.RothmansContractItemQuotaQuantity = rothmansContractItemCriteria[0].QuotaQuantity
        }
        var tekel2000ContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Tekel 2000')
        if (tekel2000ContractItemCriteria.length > 0) {
          this.targetSale.Tekel2000BrandContractItem = tekel2000ContractItemCriteria[0].ColumnValueStr
          this.targetSale.Tekel2000ContractItemQuotaQuantity = tekel2000ContractItemCriteria[0].QuotaQuantity
        }
      })
    }
  }
}
</script>
<style lang="sass">
  .fs-border
    border: 1px solid black
    margin: 10px 0
  .fs-legend-detail
    width: auto
    font-size: 1rem
    margin-left: 10px
  table td
   border: 0px solid #fbfbfb !important
</style>
