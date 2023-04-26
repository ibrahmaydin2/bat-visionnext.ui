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
              <div v-html="getFormatDataByType(customerList.Description1 ? customerList.Description1 : '', 'text', 'insert.investmentForm.customer')"></div>
              <div v-html="getFormatDataByType(customerList.CommercialTitle ? customerList.CommercialTitle : '' , 'text', 'insert.investmentForm.customerName')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerLocations && customerList.CustomerLocations.length > 0 ? customerList.CustomerLocations[0].AddressDetail : '', 'text', 'insert.investmentForm.address')"></div>
              <div v-html="getFormatDataByType(customerList.LicenseNumber ? customerList.LicenseNumber : '', 'text', 'insert.investmentForm.licenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1 ? rowData.Description1 : '', 'text', 'insert.investmentForm.description')"></div>
              <div v-html="getFormatDataByType(rowData.Type ? rowData.Type.Label : null, 'text', 'insert.investmentForm.typeId')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(customerList.RouteDetails && customerList.RouteDetails.length > 0 ? customerList.RouteDetails[0].Route.Label : '', 'text', 'insert.investmentForm.route')"></div>
              <div v-html="getFormatDataByType(customerList.RouteDetails && customerList.RouteDetails.length > 0 ? customerList.RouteDetails[0].Representative.Label : '', 'text', 'insert.investmentForm.tmrSrName')"></div>
              <div v-html="getFormatDataByType(rowData.ContractValidDates && rowData.ContractValidDates.length > 0 ? rowData.ContractValidDates[0].CreatedDateTime : '', 'text', 'insert.investmentForm.formDate')"></div>
              <div v-html="getFormatDataByType(this.form.salesVolumeClass ? this.form.salesVolumeClass : '', 'text', 'insert.investmentForm.salesVolumeClass')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerRegion5 ? customerList.CustomerRegion5.Label : '', 'text', 'insert.investmentForm.customerArea')"></div>
              <div v-html="getFormatDataByType(rowData.SignatureType ? rowData.SignatureType.Label : '', 'text', 'insert.investmentForm.signingType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.currentInvestment')">
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.contractDates')}}</h6>
                <b-row class="p-1">
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                    <NextDatePicker v-model="contractDates.ContractValidDateStartDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12" class="mr-1">
                  <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                    <NextDatePicker v-model="contractDates.ContractValidDateEndDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                    <NextInput :disabled="true" type="text" v-model="daysDifferenceCurrentInvestment"/>
                  </NextFormGroup>
                </b-col>
              </b-row>
              </b-card>
            </b-col>
          </b-row>
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
                    <b-th><span>{{$t('insert.investmentForm.earningAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.earningsTypeBudget')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedPaymentDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr>
                      <b-td>Nakit</b-td>
                      <b-td>{{this.currentInvestmentBudgetCash.Cash ? this.currentInvestmentBudgetCash.Cash : '-----' }}</b-td>
                      <b-td>{{this.currentInvestmentBudgetCash.cashBudgetMaster ? this.currentInvestmentBudgetCash.cashBudgetMaster : '-----'}}</b-td>
                      <b-td>{{this.currentInvestmentBudgetCash.cashScheduledPaymentDate ? this.currentInvestmentBudgetCash.cashScheduledPaymentDate : '-----'}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Only DTI</b-td>
                      <b-td>{{this.currentInvestmentBudgetDTI.OnlyDTI ? this.currentInvestmentBudgetDTI.OnlyDTI : '-----' }}</b-td>
                      <b-td>{{this.currentInvestmentBudgetDTI.dtiBudgetMaster ? this.currentInvestmentBudgetDTI.dtiBudgetMaster : '-----'}}</b-td>
                      <b-td></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>YYM</b-td>
                      <b-td>{{this.currentInvestmentBudgetYYM.Yym ? this.currentInvestmentBudgetYYM.Yym : '-----' }}</b-td>
                      <b-td>{{this.currentInvestmentBudgetYYM.yymBudgetMaster ? this.currentInvestmentBudgetYYM.yymBudgetMaster : '-----'}}</b-td>
                      <b-td></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.total')}}</b-td>
                      <b-td>{{ this.currentInvestmentBudgetCash.Cash + this.currentInvestmentBudgetDTI.OnlyDTI + this.currentInvestmentBudgetYYM.Yym}}<span>
                      <b-td></b-td>
                      </span></b-td>
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
                <h6>{{$t('insert.investmentForm.currentReturnOnInvestment')}}</h6>
                  <b-table-simple bordered small>
                    <b-tbody>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.currentReturnOnInvestmentTL')}}</b-td>
                        <b-td>{{((this.currentSales.KentNetSales * this.GrossMargin) + (this.currentSales.RothmansNetSales * this.GrossMargin) + (this.currentSales.Tekel2000NetSales * this.GrossMargin)) - (this.currentInvestmentBudget.KentContractQuotaQuantity + this.currentInvestmentBudget.RothmansContractQuotaQuantity + this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity)}}</b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.rateOfReturnOnInvestment')}}</b-td>
                        <b-td>{{((this.currentSales.KentNetSales * this.GrossMargin) + (this.currentSales.RothmansNetSales * this.GrossMargin) + (this.currentSales.Tekel2000NetSales * this.GrossMargin)) / (this.currentInvestmentBudget.KentContractQuotaQuantity + this.currentInvestmentBudget.RothmansContractQuotaQuantity + this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity)}}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.newInvestment')">
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.contractDates')}}</h6>
                <b-row class="p-1">
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                    <NextDatePicker v-model="validDates.contractStartDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12" class="mr-1">
                  <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                    <NextDatePicker v-model="validDates.contractEndDate" :disabled="true" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="12">
                  <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                    <NextInput :disabled="true" v-model="daysDifferenceNewInvestment"/>
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
                      <b-td>{{ this.targetSale.kentMonthlyAverageSales}}</b-td>
                      <b-td>{{ this.targetSale.rothmansMonthlyAverageSales}}</b-td>
                      <b-td>{{ this.targetSale.tekelMonthlyAverageSales}}</b-td>
                      <b-td>{{ parseInt(this.targetSale.kentMonthlyAverageSales + this.targetSale.rothmansMonthlyAverageSales + this.targetSale.tekelMonthlyAverageSales)}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.targetAnnualSalesProfit')}}</b-td>
                      <b-td>{{this.targetSale.KentContractItemQuotaQuantity}}</b-td>
                      <b-td>{{this.targetSale.RothmansContractItemQuotaQuantity}}</b-td>
                      <b-td>{{this.targetSale.Tekel2000ContractItemQuotaQuantity}}</b-td>
                      <b-td>{{parseInt(this.targetSale.KentContractItemQuotaQuantity + this.targetSale.RothmansContractItemQuotaQuantity + this.targetSale.Tekel2000ContractItemQuotaQuantity)}}</b-td>
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
                        <b-td>{{PlannedPaymentDate}}</b-td>
                      </b-tr>
                      <b-tr v-for="(c, i) in this.ContractPriceDiscountsDTI && this.ContractPriceDiscountsDTI.length > 0 ? rowData.ContractBenefits.filter(c => c.BenefitTypeId === 6) : []" :key="i" >
                        <b-td>Only DTI</b-td>
                        <b-td>{{c.BenefitBudget}}</b-td>
                        <b-td>{{c.BudgetMaster.Label}}</b-td>
                        <b-td></b-td>
                      </b-tr>
                      <b-tr v-for="(c, i) in this.ContractPriceDiscountsYYM && this.ContractPriceDiscountsYYM.length > 0 ?  rowData.ContractBenefits.filter(c => c.BenefitTypeId === 6) : []" :key="i" >
                        <b-td>YYM</b-td>
                        <b-td>{{c.BenefitBudget}}</b-td>
                        <b-td>{{c.BudgetMaster.Label}}</b-td>
                        <b-td></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.total')}}</b-td>
                        <b-td>{{this.newInvestmentBudgetTotal}}</b-td>
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
                <h6>{{$t('insert.investmentForm.newReturnOfInvestment')}}</h6>
                <b-table-simple bordered small>
                  <b-tbody>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.expectedProfitability')}}</b-td>
                      <b-td>{{ (this.targetSale.KentContractItemQuotaQuantity + this.targetSale.RothmansContractItemQuotaQuantity + this.targetSale.Tekel2000ContractItemQuotaQuantity) - (this.newInvestmentBudgetTotal)}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.expectedReturnOnInvestment')}}</b-td>
                      <b-td>{{((this.targetSale.KentContractItemQuotaQuantity + this.targetSale.RothmansContractItemQuotaQuantity + this.targetSale.Tekel2000ContractItemQuotaQuantity) - (this.newInvestmentBudgetTotal) / (this.newInvestmentBudgetTotal)) * 100}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.investmentForm.unitAndOrderDetails')">
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.currentUnitStatus')}}</h6>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.investmentForm.Units')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.unitName')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.piece')}}</span></b-th>
                    <b-th><span>{{$t('insert.investmentForm.location')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in this.assetsLocationList.AssetLocations" :key="i">
                          <b-td>{{$t('insert.investmentForm.unit') + (i+1)}}</b-td>
                          <b-td>{{c.Asset.Label}}</b-td>
                          <b-td>{{c.Quantity}}</b-td>
                          <b-td>{{c.Customer.Label}}</b-td>
                        </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.opponentUnitStatus')}}</h6>
                <b-table-simple bordered small >
                  <b-thead >
                    <b-th><span>Firma</span></b-th>
                    <b-th v-for="(c, i) in rowData.ContractOpponentAssets" :key="i" ><span>{{c.Description1}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr >
                      <b-td>{{$t('insert.investmentForm.unit')}}</b-td>
                      <b-td v-for="(c, i) in rowData.ContractOpponentAssets" :key="i">{{c.IsAvailable && c.IsAvailable !== null && c.IsAvailable === 1 ? 'Var' : 'Yok'}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.unitType')}}</b-td>
                      <b-td v-for="(c, i) in rowData.ContractOpponentAssets" :key="i">{{c.OpponentAssetTypeId && c.OpponentAssetTypeId !== null && c.OpponentAssetTypeId === 2341 ? 'Buyuk' : 'Kucuk' || c.OpponentAssetTypeId && c.OpponentAssetTypeId === null ? '' : 'Kucuk'}}</b-td>
                    </b-tr>
                    <b-tr >
                      <b-td>{{$t('insert.investmentForm.investmentAmount')}}</b-td>
                      <b-td v-for="(c, i) in rowData.ContractOpponentAssets" :key="i">{{c.InvestmentTotal && c.InvestmentTotal > 0 ? c.InvestmentTotal : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col cols="12" md="7">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.investmentForm.otherDetails')}}</h6>
                <b-table-simple bordered small >
                  <b-tbody v-for="(c, i) in rowData.ContractOtherDetailss" :key="i">
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.furniteCost')}}</b-td>
                      <b-td>{{c.FurnitureExpense}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.numberOfFrontFaces')}}</b-td>
                      <b-td>{{c.ShelfQuantity}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.frontFaceCost')}}</b-td>
                      <b-td>{{c.ShelfExpense}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.totalFurniteCost')}}</b-td>
                      <b-td>{{c.TotalExpense}}</b-td>
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
        KentContractQuotaQuantity: null,
        RothmansContractQuotaQuantity: null,
        Tekel2000ContractQuotaQuantity: null
      },
      currentInvestmentBudgetCash: {
        Cash: null,
        cashScheduledPaymentDate: null,
        cashBudgetMaster: null
      },
      currentInvestmentBudgetDTI: {
        OnlyDTI: null,
        onlyDtiBudgetMaster: null
      },
      currentInvestmentBudgetYYM: {
        Yym: null,
        yymBudgetMaster: null
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
        KentBrandContractItem: 'Kent',
        RothmansBrandContractItem: 'Rothmans',
        Tekel2000BrandContractItem: 'Tekel 2000',
        kentMonthlyAverageSales: 0,
        rothmansMonthlyAverageSales: 0,
        tekelMonthlyAverageSales: 0
      },
      currentSales: {
        KentBrandLC: 'Kent',
        KentNetSales: null,
        RothmansBrandLC: 'Rothmans',
        RothmansNetSales: null,
        Tekel2000BrandLC: 'Tekel 2000',
        Tekel2000NetSales: null
      },
      otherDetails: {
        furniteCost: 0,
        numberOfFrontFaces: 0,
        frontFaceCost: 0,
        totalFurniteCost: 0
      },
      validDates: {
        contractStartDate: null,
        contractEndDate: null,
        contractDuration: null
      },
      cashContractBenefits: [],
      cashContractPaymentPlans: [],
      onlyDtiBenefits: [],
      onlyDtiContractPaymentPlans: [],
      PlannedPaymentDate: null,
      assetsLocationList: [],
      contractOpponentAssets: [],
      newInvestmentBudgetTotal: null,
      ContractPriceDiscountsDTI: [],
      ContractPriceDiscountsYYM: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style']),
    daysDifferenceNewInvestment () {
      if (this.validDates.contractStartDate && this.validDates.contractEndDate) {
        const startDate = new Date(this.validDates.contractStartDate)
        const endDate = new Date(this.validDates.contractEndDate)
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      } else {
        return null
      }
    },
    daysDifferenceCurrentInvestment () {
      if (this.contractDates.ContractValidDateStartDate && this.contractDates.ContractValidDateEndDate) {
        const startDate = new Date(this.contractDates.ContractValidDateStartDate)
        const endDate = new Date(this.contractDates.ContractValidDateEndDate)
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      } else {
        return null
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContract/api/Contract', record: this.$route.params.url}).then(() => {
        this.ContractPriceDiscountsDTI = this.rowData.ContractPriceDiscounts ? this.rowData.ContractPriceDiscounts.filter(c => c.BenefitConditionId === 49) : []
        this.ContractPriceDiscountsYYM = this.rowData.ContractPriceDiscounts ? this.rowData.ContractPriceDiscounts.filter(c => c.BenefitConditionId === 102000) : []
        this.PlannedPaymentDate = this.rowData.ContractPaymentPlans[0].PlannedPaymentDate.split('T')[0]
        this.validDates.contractStartDate = this.rowData.ContractValidDates[0].StartDate
        this.validDates.contractEndDate = this.rowData.ContractValidDates[0].EndDate
        this.contractOpponentAssets = this.rowData.ContractOpponentAssets
        this.contractOtherDetailss = this.rowData.ContractOtherDetailss[0]
        this.getCustomerContract(this.rowData.CustomerId)
        this.getLastContract(this.rowData.CustomerId)
        this.$api.post({RecordId: this.rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          if (response) {
            this.customerList = response.Model
            this.assetsLocationList = response.Model
            this.getLookups(this.customerList.KindId)
            this.getContractItemCriteria()
          }
        })
        if (this.rowData) {
          if (this.rowData.ContractBenefits || this.rowData.ContractBenefits.length > 0) {
            this.newInvestmentBudgetTotal = 0
            for (let i = 0; i < this.rowData.ContractBenefits.length; i++) {
              this.newInvestmentBudgetTotal += this.rowData.ContractBenefits[i].BenefitBudget
            }
            return this.newInvestmentBudgetTotal
          }
        }
        var ContractBenefitsList = this.rowData.ContractBenefits
        var ContractBenefitsCash = ContractBenefitsList.filter(a => a.BenefitTypeId === 3)
        if (ContractBenefitsCash.length > 0) {
          this.cashContractBenefits = ContractBenefitsCash[0]
        }
        this.cashContractPaymentPlans = this.rowData.ContractPaymentPlans[0]
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
    getLastContract (CustomerId) {
      let request = {
        customerId: CustomerId }
      this.$api.postByUrl(request, `VisionNextContract/api/Contract/LastContractAvarageSales`).then((res) => {
        this.GrossMargin = res.GrossMargin
        this.getLastContractList = res.LastContractDetails
        var filteredLastContract = this.getLastContractList
        var kentContract = filteredLastContract.filter(a => a.Brand === 'Kent')
        if (kentContract && kentContract.length > 0) {
          this.currentSales.KentNetSales = kentContract[0].NetSales
        }
        var rothmansContract = filteredLastContract.filter(a => a.Brand === 'Rothmans')
        if (rothmansContract && rothmansContract.length > 0) {
          this.currentSales.RothmansNetSales = rothmansContract[0].NetSales
        }
        var tekelContract = filteredLastContract.filter(a => a.Brand === 'Tekel 2000')
        if (tekelContract && tekelContract.length > 0) {
          this.currentSales.Tekel2000NetSales = tekelContract[0].NetSales
        }
      })
    },
    getContractItemCriteria () {
      let request = {
        typeId: 3
      }
      this.$api.postByUrl(request, `VisionNextContract/api/Contract/GetContractItemCriteria`).then((response) => {
        this.ContractItemCriteriaList = response
        var filteredContractItemCriteria = this.ContractItemCriteriaList
        var kentContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Kent')
        if (kentContractItemCriteria.length > 0) {
          this.targetSale.KentContractItemQuotaQuantity = kentContractItemCriteria[0].QuotaQuantity
        }
        var rothmansContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Rothmans')
        if (rothmansContractItemCriteria.length > 0) {
          this.targetSale.RothmansContractItemQuotaQuantity = rothmansContractItemCriteria[0].QuotaQuantity
        }
        var tekel2000ContractItemCriteria = filteredContractItemCriteria.filter(a => a.ColumnValueStr === 'Tekel 2000')
        if (tekel2000ContractItemCriteria.length > 0) {
          this.targetSale.Tekel2000ContractItemQuotaQuantity = tekel2000ContractItemCriteria[0].QuotaQuantity
        }
      })
    },
    getCustomerContract (CustomerId) {
      let request = {
        recordId: 0,
        customerId: CustomerId }
      this.$api.postByUrl(request, `VisionNextContract/api/Contract/GetCustomerContract`).then((res) => {
        this.getCustomerContractList = res.Model
        this.contractDates.ContractValidDateStartDate = this.getCustomerContractList.ContractValidDates[0].StartDate
        this.contractDates.ContractValidDateEndDate = this.getCustomerContractList.ContractValidDates[0].EndDate
        var ContractBenefitsList = this.getCustomerContractList.ContractBenefits
        var cashCurrentInvestmenBudget = ContractBenefitsList.filter(c => c.BenefitTypeId === 3)
        if (cashCurrentInvestmenBudget && cashCurrentInvestmenBudget.length > 0) {
          this.currentInvestmentBudgetCash.Cash = cashCurrentInvestmenBudget[0].BenefitBudget
          this.currentInvestmentBudgetCash.cashScheduledPaymentDate = cashCurrentInvestmenBudget[0].CreatedDateTime
          this.currentInvestmentBudgetCash.cashBudgetMaster = cashCurrentInvestmenBudget[0].BudgetMaster.Label
        }
        var ContractPriceDiscountsList = this.getCustomerContractList.ContractPriceDiscounts
        var dtiYymBenefits = ContractBenefitsList.filter(c => c.BenefitTypeId === 6)
        if (dtiYymBenefits || dtiYymBenefits.length > 0) {
          var dtiContractPriceDiscount = ContractPriceDiscountsList.filter(c => c.BenefitConditionId === 49)
          if (dtiContractPriceDiscount && dtiContractPriceDiscount.length > 0) {
            this.currentInvestmentBudgetDTI.OnlyDTI = dtiYymBenefits ? dtiYymBenefits[0].BenefitBudget : ''
            this.currentInvestmentBudgetDTI.dtiBudgetMaster = dtiYymBenefits ? dtiYymBenefits[0].BudgetMaster.Label : ''
          }
          var yymContractPriceDiscount = ContractPriceDiscountsList.filter(c => c.BenefitConditionId === 102000)
          if (yymContractPriceDiscount && yymContractPriceDiscount.length > 0) {
            this.currentInvestmentBudgetYYM.Yym = dtiYymBenefits ? dtiYymBenefits[0].BenefitBudget : ''
            this.currentInvestmentBudgetYYM.yymBudgetMaster = dtiYymBenefits ? dtiYymBenefits[0].BudgetMaster.Label : ''
          }
        }
        var ContractItemList = this.rowData.ContractItems
        var kentContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Kent')
        if (kentContractList && kentContractList.length > 0) {
          this.currentInvestmentBudget.KentContractQuotaQuantity = kentContractList[0].QuotaQuantity ? kentContractList[0].QuotaQuantity : 0
          this.targetSale.kentMonthlyAverageSales = kentContractList[0].QuotaQuantity ? kentContractList[0].QuotaQuantity : 0
        }
        var rothmansContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Rothmans')
        if (rothmansContractList && rothmansContractList.length > 0) {
          this.currentInvestmentBudget.RothmansContractQuotaQuantity = rothmansContractList[0].QuotaQuantity ? rothmansContractList[0].QuotaQuantity : 0
          this.targetSale.rothmansMonthlyAverageSales = rothmansContractList[0].QuotaQuantity ? rothmansContractList[0].QuotaQuantity : 0
        }
        var tekel2000List = ContractItemList.filter(a => a.ColumnValueStr === 'Tekel 2000')
        if (tekel2000List && tekel2000List.length > 0) {
          this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity = tekel2000List[0].QuotaQuantity ? tekel2000List[0].QuotaQuantity : 0
          this.targetSale.tekelMonthlyAverageSales = tekel2000List[0].QuotaQuantity ? tekel2000List[0].QuotaQuantity : 0
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
