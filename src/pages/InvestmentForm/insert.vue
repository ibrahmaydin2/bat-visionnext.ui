<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb/>
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{ name: 'investmentForm' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
      <b-col cols="12" class="asc__insertPage-content-head" @click.prevent="tabValidation()">
        <section>
          <b-row>
            <NextFormGroup :title="$t('insert.investmentForm.customer')" :error="$v.form.CustomerId" md="3" lg="3" show-copy copy-values="Code,Description1">
              <NextDropdown
                v-model="selectedCustomer"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                @change="selectedCustomer()"
                @input="selectedSearchType('CustomerId', $event);"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :is-customer="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.customerName')">
              <NextInput v-model="form.customerName" :disabled="true" type="text" md="3" lg="3" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.address')">
              <NextTextArea v-model="form.address" md="3" lg="3" :disabled="true"></NextTextArea>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.licenseNumber')">
              <NextInput v-model="form.licenseNumber" type="text" md="3" lg="3" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.description')">
              <NextTextArea v-model="form.Description1" md="3" lg="3"></NextTextArea>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.typeId')" md="3" lg="3">
              <NextDropdown url="VisionNextContract/api/ContractType/Search" :disabled="true" v-model="form.ContractTypeDesc"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.route')">
              <NextInput v-model="form.route" type="text" md="3" lg="3" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.tmrSrName')">
              <NextInput v-model="form.tmrSrName" type="text" md="3" lg="3" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.formDate')">
                <NextDatePicker v-model="form.formDate" :disabled="true"/>
              </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.salesVolumeClass')">
              <NextDropdown v-model="form.salesVolumeClass"  :disabled="true"  md="3" lg="3" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.customerArea')" md="3" lg="3">
              <NextInput v-model="form.customerArea" type="text" md="3" lg="3" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.signingType')" :error="$v.form.signingType" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="form.signingType" lookup-key="SIGNATURE_TYPE"  @input="getSignatureType($event)" :get-lookup="true"
              />
            </NextFormGroup>
          </b-row>
        </section>
      </b-col>
      <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.investmentForm.currentInvestment')" active @click.prevent="tabValidation()">
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.contractDates')}}</legend>
            <b-row class="p-1">
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                  <NextDatePicker v-model="contractDates.ContractValidDateStartDate" :disabled="true"/>
                </NextFormGroup>
              </b-col>
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                  <NextDatePicker v-model="contractDates.ContractValidDateEndDate" :disabled="true"/>
                </NextFormGroup>
              </b-col>
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                  <NextInput type="text" v-model="daysDifferenceCurrentInvestment" :disabled="true"/>
                </NextFormGroup>
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.currentSales')}}</legend>
            <b-row class="p-3">
              <b-col cols="6">
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
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.currentInvestmentBudget')}}</legend>
            <b-row class="p-3">
              <b-col cols="6">
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
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.currentReturnOnInvestment')}}</legend>
            <b-row class="p-3">
              <b-col cols="6">
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
              </b-col>
            </b-row>
          </fieldset>
        </b-tab>
          <b-tab :title="$t('insert.investmentForm.newInvestment')" @click.prevent="tabValidation()" >
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">{{$t('insert.investmentForm.contractDates') }}</legend>
              <b-row class="p-1">
                <b-col cols="6">
                  <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')" :error="$v.validDates.contractStartDate" :required="true">
                    <NextDatePicker v-model="validDates.contractStartDate"/>
                  </NextFormGroup>
                </b-col>
                <b-col cols="6" class="mr-1">
                  <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')" :error="$v.validDates.contractEndDate" :required="true">
                    <NextDatePicker v-model="validDates.contractEndDate"/>
                  </NextFormGroup>
                </b-col>
                <b-col cols="6">
                  <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                    <NextInput :disabled="true" type="text" v-model="daysDifferenceNewInvestment"></NextInput>
                  </NextFormGroup>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">{{$t('insert.investmentForm.targetSale')}}</legend>
              <b-row class="p-3">
                <b-col cols="6">
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
                      <b-td><NextInput v-model="targetSale.kentMonthlyAverageSales" type="number" /></b-td>
                      <b-td><NextInput v-model="targetSale.rothmansMonthlyAverageSales" type="number" /></b-td>
                      <b-td><NextInput v-model="targetSale.tekelMonthlyAverageSales" type="number" /></b-td>
                      <b-td><NextInput v-model="totalTargetedAverageMonthlySales" type="number" :disabled="true"/></b-td>

                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.targetAnnualSalesProfit')}}</b-td>
                      <b-td><NextInput v-model="totalTargetAnnualSalesProfitKent" type="number" :disabled="true"/></b-td>
                      <b-td><NextInput v-model="totalTargetAnnualSalesProfitRothmans" type="number" :disabled="true"/></b-td>
                      <b-td><NextInput v-model="totalTargetAnnualSalesProfitTekel" type="number" :disabled="true"/></b-td>
                      <b-td><NextInput v-model="totalTargetAnnualSalesProfit" type="number" :disabled="true"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">{{$t('insert.investmentForm.newInvestmentBudget')}}</legend>
              <b-row class="p-3">
                <b-col cols="6">
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
                        <b-td><NextInput type="number" v-model="newInvestmentBudgetCash.Cash"  :min="0" /></b-td>
                        <b-td><NextDropdown  label="CustomerDesc" v-model="newInvestmentBudgetCash.cashBudgetMaster" :source="customerBudgets" @input=" getCustomerBudget($event,1)"/></b-td>
                        <b-td><NextDatePicker v-model="newInvestmentBudgetCash.cashScheduledPaymentDate"/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>Only DTI</b-td>
                        <b-td><NextInput type="number" v-model="newInvestmentBudgetDTI.OnlyDTI" :min="0" /></b-td>
                        <b-td><NextDropdown  label="CustomerDesc" v-model="newInvestmentBudgetDTI.onlyDtiBudgetMaster" :source="customerBudgets" @input=" getCustomerBudget($event,2)"/></b-td>
                        <b-td><NextDatePicker v-model="newInvestmentBudgetDTI.onlyDtiScheduledPaymentDate" :disabled="true"/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>YYM</b-td>
                        <b-td><NextInput type="number"  v-model="newInvestmentBudgetYYM.Yym" :min="0" /></b-td>
                        <b-td><NextDropdown  label="CustomerDesc" v-model="newInvestmentBudgetYYM.yymBudgetMaster" :source="customerBudgets" @input=" getCustomerBudget($event,3)"/></b-td>
                        <b-td><NextDatePicker v-model="newInvestmentBudgetYYM.yymScheduledPaymentDate" :disabled="true"/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>{{$t('insert.investmentForm.total')}}</b-td>
                        <b-td><span>
                        <b-td><NextInput type="number" v-model="totalBudgets" :disabled="true"/></b-td>
                        </span></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.newReturnOfInvestment')}}</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small>
                  <b-tbody>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.expectedProfitability')}}</b-td>
                      <b-td><NextInput type="number"  :disabled="true" v-model="totalExpectedProfitability"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.expectedReturnOnInvestment')}}</b-td>
                      <b-td><NextInput type="number" :disabled="true" v-model="totalReturnOnInvestment"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          </b-tab>
          <b-tab :title="$t('insert.investmentForm.unitAndOrderDetails')" @click.prevent="tabValidation()" >
            <fieldset class="fs-border">
                <legend class="fs-legend-detail">{{$t('insert.investmentForm.currentUnitStatus')}}</legend>
                <b-row class="p-3">
                  <b-col cols="6">
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
                  </b-col>
                </b-row>
            </fieldset>
            <fieldset class="fs-border">
                <legend class="fs-legend-detail">{{$t('insert.investmentForm.opponentUnitStatus')}}</legend>
                <b-row class="p-3">
                  <b-col cols="6">
                    <b-table-simple bordered small >
                        <b-thead>
                          <b-th><span>Firma</span></b-th>
                          <b-th><span>PMI</span></b-th>
                          <b-th><span>JTI</span></b-th>
                          <b-th><span>ITC</span></b-th>
                        </b-thead>
                      <b-tbody>
                        <b-tr>
                          <b-td>{{$t('insert.investmentForm.unit')}}</b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.pmiUnit" label="Label" :source="IsUnit" @input="getUnitAvailable($event, 1)"/></b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.jtiUnit" label="Label" :source="IsUnit" @input="getUnitAvailable($event, 2)"/></b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.itcUnit" label="Label" :source="IsUnit" @input="getUnitAvailable($event, 3)"/></b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>{{$t('insert.investmentForm.unitType')}}</b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.pmiUnitType" :disabled="opponentUnitStatus.pmiUnit && opponentUnitStatus.pmiUnit.DecimalValue === 0" lookup-key="OPPONENT_ASSET_TYPE" :get-lookup="true" @input="getUnitTypeSize($event, 1)"/></b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.jtiUnitType" :disabled="opponentUnitStatus.jtiUnit && opponentUnitStatus.jtiUnit.DecimalValue === 0" lookup-key="OPPONENT_ASSET_TYPE" :get-lookup="true" @input="getUnitTypeSize($event, 2)"/></b-td>
                          <b-td><NextDropdown v-model="opponentUnitStatus.itcUnitType" :disabled="opponentUnitStatus.itcUnit && opponentUnitStatus.itcUnit.DecimalValue === 0" lookup-key="OPPONENT_ASSET_TYPE" :get-lookup="true" @input="getUnitTypeSize($event, 3)"/></b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>{{$t('insert.investmentForm.investmentAmount')}}</b-td>
                          <b-td><NextInput type="text" v-model="opponentUnitStatus.pmiInvestmentAmount" :disabled="opponentUnitStatus.pmiUnit && opponentUnitStatus.pmiUnit.DecimalValue === 0"/></b-td>
                          <b-td><NextInput type="text" v-model="opponentUnitStatus.jtiInvestmentAmount" :disabled="opponentUnitStatus.jtiUnit && opponentUnitStatus.jtiUnit.DecimalValue === 0"/></b-td>
                          <b-td><NextInput type="text" v-model="opponentUnitStatus.itcInvestmentAmount" :disabled="opponentUnitStatus.itcUnit && opponentUnitStatus.itcUnit.DecimalValue === 0"/></b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
            </fieldset>
            <fieldset class="fs-border">
            <legend class="fs-legend-detail">{{$t('insert.investmentForm.otherDetails')}}</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small >
                  <b-tbody>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.furniteCost')}}</b-td>
                      <b-td><NextInput type="number" v-model="otherDetails.furniteCost"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.numberOfFrontFaces')}}</b-td>
                      <b-td><NextInput type="number" v-model="otherDetails.numberOfFrontFaces"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.frontFaceCost')}}</b-td>
                      <b-td><NextInput type="number" v-model="totalFrontFaceCost" :disabled="true"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{$t('insert.investmentForm.totalFurniteCost')}}</b-td>
                      <b-td><NextInput type="number" v-model="totalFurniteCost" :disabled="true"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          </b-tab>
        </b-tabs>
      </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
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
        formDate: Date.now(),
        customerArea: null,
        signingType: [],
        currentInvestment: null,
        newInvestment: null,
        unitAndOrderDetails: null,
        contractDuration: null,
        scheduledPaymentDate: null,
        CustomerId: null,
        CustomerFinanceCode: null,
        ContractValidDates: [],
        CustomerBudgetTypeId: null,
        IsInvestment: 1,
        IsContract: 0,
        ApproveStateId: null,
        Code: null,
        RecordState: 2,
        System: 0,
        Deleted: 0,
        ContractNumber: null,
        Description1: null,
        TypeId: null,
        ContractTypeDesc: null,
        StatusId: 1,
        Genexp1: null,
        ContractBenefits: [],
        ContractItems: [],
        ContractPriceDiscounts: [],
        ContractPaymentPlans: [],
        ContractOpponentAssets: [],
        InvestmentFormDetails: [],
        ContractOtherDetailss: [],
        ContractAssets: [],
        ContractDiscounts: [],
        ContractFreeItems: [],
        SignatureTypeId: null,
        investmentStatusId: 2320
      },
      contractBenefitsAsset: [],
      contractAssets: [],
      contractItemsKent: [],
      contractItemsRothmans: [],
      contractItemsTekel2000: [],
      newInvestmentBudgetTotal: null,
      PmiIsAvailable: null,
      JtiIsAvailable: null,
      ItcIsAvailable: null,
      PmiUnitTypeSize: null,
      JtiUnitTypeSize: null,
      ItcUnitTypeSize: null,
      PmiUnitTypeLabel: null,
      JtiUnitTypeLabel: null,
      ItcUnitTypeLabel: null,
      CashBudgetMasterId: null,
      CashBudgetCustomerDesc: null,
      OnlyDtiBudgetMasterId: null,
      OnlyDtiBudgetCustomerDesc: null,
      YymBudgetMasterId: null,
      YymBudgetCustomerDesc: null,
      contractBenefitsCash: [],
      contractPaymentPlansCash: [],
      contractOpponentAssetsCash: [],
      contractOtherDetailsCash: [],
      contractBenefitsOnlyDti: [],
      contractPriceDiscountsOnlyDti: [],
      contractOpponentAssetsOnlyDti: [],
      contractPaymentPlansOnlyDti: [],
      contractOtherDetailsOnlyDti: [],
      contractBenefitsYym: [],
      contractPriceDiscountsYym: [],
      contractPaymentPlansYym: [],
      contractOpponentAssetsYym: [],
      contractOtherDetailsYym: [],
      contractOtherDetailss: [],
      contractOpponentAssetsPMI: [],
      contractOpponentAssetsJTI: [],
      contractOpponentAssetsITC: [],
      customerList: [],
      selectedCustomer: null,
      recordIdList: [],
      contractList: [],
      RouteDetailsList: [],
      KindId: null,
      lookupValues: {},
      getCustomerContractList: [],
      date: null,
      GrossMargin: null,
      ContractList: [],
      ContractItemCriteriaList: [],
      customerBudgets: [],
      assetsLocationList: [],
      IsUnit: [
        {DecimalValue: 1, Label: this.$t('general.IsUnit.yes')},
        {DecimalValue: 0, Label: this.$t('general.IsUnit.no')}
      ],
      validDates: {
        contractStartDate: null,
        contractEndDate: null,
        contractDuration: null
      },
      newReturnOfInvestment: {
        expectedProfitability: null,
        returnOnInvestment: null
      },
      opponentUnitStatus: {
        pmiUnit: null,
        jtiUnit: null,
        itcUnit: null,
        pmiUnitType: null,
        jtiUnitType: null,
        itcUnitType: null,
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
        KentBrandContract: 'Kent',
        RothmansBrandContract: 'Rothmans',
        Tekel2000BrandContract: 'Tekel 2000',
        KentContractQuotaQuantity: null,
        RothmansContractQuotaQuantity: null,
        Tekel2000ContractQuotaQuantity: null
      },
      newInvestmentBudgetCash: {
        Cash: 0,
        cashScheduledPaymentDate: null,
        cashBudgetMaster: null
      },
      newInvestmentBudgetDTI: {
        OnlyDTI: 0,
        onlyDtiScheduledPaymentDate: null,
        onlyDtiBudgetMaster: null
      },
      newInvestmentBudgetYYM: {
        Yym: 0,
        yymScheduledPaymentDate: null,
        yymBudgetMaster: null
      },
      targetSale: {
        KentContractItemQuotaQuantity: 0,
        RothmansContractItemQuotaQuantity: 0,
        Tekel2000ContractItemQuotaQuantity: 0,
        KentBrandContractItem: 'Kent',
        RothmansBrandContractItem: 'Rothmans',
        Tekel2000BrandContractItem: 'Tekel 2000',
        TotalBrandContractItem: null,
        kentMonthlyAverageSales: 0,
        rothmansMonthlyAverageSales: 0,
        tekelMonthlyAverageSales: 0,
        totalMonthlyAverageSales: 0,
        totalTargetAnnualSales: 0
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
      routeName1: 'Contract',
      routeName2: 'Contract',
      IsInvestment: 1,
      IsContract: 0,
      contractBenefits: {
        benefitType: null,
        budgetMaster: null,
        currency: null,
        benefitBudget: null,
        tciBreak1Id: null
      },
      changeUnitType: null
    }
  },
  watch: {
    selectedCustomer () {
      this.getCustomer()
    }
  },
  computed: {
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
    },
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
    totalBudgets: {
      get () {
        return (this.newInvestmentBudgetCash.Cash > 0 ? parseInt(this.newInvestmentBudgetCash.Cash) : 0) +
        (this.newInvestmentBudgetDTI.OnlyDTI > 0 ? parseInt(this.newInvestmentBudgetDTI.OnlyDTI) : 0) +
       (this.newInvestmentBudgetYYM.Yym > 0 ? parseInt(this.newInvestmentBudgetYYM.Yym) : 0)
      },
      set (value) {
        this.newInvestmentBudgetTotal = value
      }
    },
    totalExpectedProfitability: {
      get () {
        return (this.totalTargetAnnualSalesProfit) - (this.totalBudgets)
      },
      set (value) {
        this.newReturnOfInvestment.expectedProfitability = value
      }
    },
    totalReturnOnInvestment: {
      get () {
        return (((this.totalTargetAnnualSalesProfit) - (this.totalBudgets)) / (this.totalBudgets)) * 100
      },
      set (value) {
        this.newReturnOfInvestment.returnOnInvestment = value
      }
    },
    totalTargetedAverageMonthlySales: {
      get () {
        return (this.targetSale.kentMonthlyAverageSales > 0 ? parseInt(this.targetSale.kentMonthlyAverageSales) : 0) +
        (this.targetSale.rothmansMonthlyAverageSales > 0 ? parseInt(this.targetSale.rothmansMonthlyAverageSales) : 0) +
       (this.targetSale.tekelMonthlyAverageSales > 0 ? parseInt(this.targetSale.tekelMonthlyAverageSales) : 0)
      },
      set (value) {
        this.targetSale.totalMonthlyAverageSales = value
      }
    },
    totalTargetAnnualSalesProfitKent: {
      get () {
        return (parseInt(this.targetSale.kentMonthlyAverageSales > 0 ? parseInt(this.targetSale.kentMonthlyAverageSales) : 0) * this.GrossMargin)
      },
      set (value) {
        this.targetSale.KentContractItemQuotaQuantity = value
      }
    },
    totalTargetAnnualSalesProfitRothmans: {
      get () {
        return (parseInt(this.targetSale.rothmansMonthlyAverageSales > 0 ? parseInt(this.targetSale.rothmansMonthlyAverageSales) : 0) * this.GrossMargin)
      },
      set (value) {
        this.targetSale.RothmansContractItemQuotaQuantity = value
      }
    },
    totalTargetAnnualSalesProfitTekel: {
      get () {
        return (parseInt(this.targetSale.tekelMonthlyAverageSales > 0 ? parseInt(this.targetSale.tekelMonthlyAverageSales) : 0) * this.GrossMargin)
      },
      set (value) {
        this.targetSale.Tekel2000ContractItemQuotaQuantity = value
      }
    },
    totalTargetAnnualSalesProfit: {
      get () {
        return (this.targetSale.KentContractItemQuotaQuantity) + (this.targetSale.RothmansContractItemQuotaQuantity) + (this.targetSale.Tekel2000ContractItemQuotaQuantity)
      },
      set (value) {
        this.targetSale.totalTargetAnnualSales = value
      }
    },
    totalFrontFaceCost: {
      get () {
        return parseInt((this.otherDetails.numberOfFrontFaces > 0 ? parseInt(this.otherDetails.numberOfFrontFaces) : 0) * 17)
      },
      set (value) {
        this.otherDetails.frontFaceCost = value
      }
    },
    totalFurniteCost: {
      get () {
        return parseInt(this.otherDetails.furniteCost) + parseInt(this.otherDetails.frontFaceCost)
      },
      set (value) {
        this.otherDetails.totalFurniteCost = value
      }
    }
  },
  methods: {
    save () {
      this.form.ContractBenefits = []
      this.form.ContractAssets = []
      this.form.ContractPriceDiscounts = []
      this.form.ContractOtherDetailss = []
      this.form.ContractOpponentAssets = []
      this.form.ContractItems = []
      this.form.ContractPaymentPlans = []
      this.$v.form.$touch()
      this.$v.validDates.$touch()
      if (this.$v.form.$error || this.$v.validDates.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.validDates.contractStartDate > this.validDates.contractEndDate) {
          this.$toasted.show(this.$t('insert.startDateLessEndDate'), { type: 'error', keepOnHover: true, duration: '3000' })
          return false
        }
        this.form.ContractValidDates = [{
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          StartDate: this.validDates.contractStartDate,
          EndDate: this.validDates.contractEndDate,
          CreatedDateTime: this.form.formDate
        }]
        if (this.newInvestmentBudgetCash.Cash > 0 || this.newInvestmentBudgetCash.cashBudgetMaster !== null || this.newInvestmentBudgetCash.cashScheduledPaymentDate !== null) {
          this.contractBenefitsCash = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            BenefitTypeId: 3,
            BenefitTypeName: 'Nakit',
            BenefitBudget: this.newInvestmentBudgetCash.Cash,
            BudgetMasterId: this.CashBudgetMasterId,
            BudgetMasterName: '',
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            TciBreak1Id: 26190839843,
            TciBreak1Name: 'Kontratlar - Nakit',
            usedAmount: 0
          }
          this.contractPaymentPlansCash = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            QuotaTableName: 'T-ITEM',
            BenefitConditionId: 49,
            BenefitConditionName: 'Sözleşme Süresinde',
            BenefitConditionCode: 'SOZ',
            PaymentAmount: this.newInvestmentBudgetCash.Cash,
            PlannedPaymentDate: this.newInvestmentBudgetCash.cashScheduledPaymentDate,
            BranchSharePercent: 0,
            BudgetBeginDate: this.validDates.contractStartDate,
            BudgetEndDate: this.validDates.contractEndDate
          }
          let cashType = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 3)
          if (cashType.length === 0) {
            this.form.ContractBenefits.push(this.contractBenefitsCash)
            this.form.ContractPaymentPlans.push(this.contractPaymentPlansCash)
          }
        }
        var total = this.newInvestmentBudgetDTI.OnlyDTI + this.newInvestmentBudgetYYM.Yym
        if (this.newInvestmentBudgetDTI.OnlyDTI > 0 || this.newInvestmentBudgetDTI.onlyDtiBudgetMaster !== null || this.newInvestmentBudgetDTI.onlyDtiScheduledPaymentDate !== null) {
          this.contractBenefitsOnlyDti = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            BenefitTypeId: 6,
            BenefitTypeName: 'Dip Toplam İndirimi',
            BenefitBudget: total,
            BudgetMasterId: this.OnlyDtiBudgetMasterId,
            BudgetMasterName: '',
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            TciBreak1Id: 26190839843,
            TciBreak1Name: 'Kontratlar - DTI',
            usedAmount: 0
          }
          this.contractPriceDiscountsOnlyDti = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            QuotaTableName: 'T-ITEM',
            BenefitConditionId: 49,
            BenefitConditionName: 'Yeni Yatırım Modeli',
            BenefitConditionCode: 'YYM',
            QuotaUnitId: null,
            QuotaUnitName: null,
            BudgetAmount: this.newInvestmentBudgetDTI.OnlyDTI,
            QuotaColumnName: null,
            QuotaColumnNameStr: null,
            QuotaColumnValue: null,
            QuotaColumnValueStr: null,
            DiscountAmount: 0,
            StartDate: this.validDates.contractStartDate,
            BranchSharePercent: 0,
            ItemFormulaId: 16217595186,
            ItemFormulaName: null,
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası'
          }
          let dtiType = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 6)
          if (dtiType.length === 0) {
            this.form.ContractBenefits.push(this.contractBenefitsOnlyDti)
          }
          this.form.ContractPriceDiscounts.push(this.contractPriceDiscountsOnlyDti)
        }
        if (this.newInvestmentBudgetYYM.Yym > 0 || this.newInvestmentBudgetYYM.yymBudgetMaster !== null || this.newInvestmentBudgetYYM.yymScheduledPaymentDate !== null) {
          this.contractBenefitsYym = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            RecordId: this.contractBenefits.recordId,
            StatusId: 1,
            BenefitTypeId: 6,
            BenefitTypeName: 'Dip Toplam İndirimi',
            BenefitBudget: total,
            BudgetMasterId: this.YymBudgetMasterId,
            BudgetMasterName: '',
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            TciBreak1Id: 26190839843,
            TciBreak1Name: 'Kontratlar - DTI',
            usedAmount: 0
          }
          this.contractPriceDiscountsYym = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            QuotaTableName: 'T-ITEM',
            DiscountAmount: 0,
            BenefitConditionId: 102000,
            BenefitConditionName: 'Yeni Yatırım Modeli',
            BenefitConditionCode: 'YYM',
            QuotaUnitId: null,
            QuotaUnitName: null,
            BudgetAmount: this.newInvestmentBudgetYYM.Yym,
            QuotaColumnName: null,
            QuotaColumnNameStr: null,
            QuotaColumnValue: null,
            QuotaColumnValueStr: null,
            StartDate: this.validDates.contractStartDate,
            BranchSharePercent: 0,
            ItemFormulaId: 16217595186,
            ItemFormulaName: null,
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası'
          }
          let yymType = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 6)
          if (yymType.length === 0) {
            this.form.ContractBenefits.push(this.contractBenefitsYym)
          }
          this.form.ContractPriceDiscounts.push(this.contractPriceDiscountsYym)
        }
        this.contractOtherDetailss = {
          Code: this.form.Code + '-1',
          FurnitureExpense: this.otherDetails.furniteCost,
          ShelfQuantity: this.otherDetails.numberOfFrontFaces,
          ShelfExpense: this.otherDetails.frontFaceCost,
          TotalExpense: this.otherDetails.totalFurniteCost,
          Description1: 'Test',
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1
        }
        this.contractOpponentAssetsPMI = {
          Code: this.form.Code + '-1',
          IsAvaible: this.PmiAvaible,
          OpponentAssetTypeId: this.PmiUnitTypeSize,
          BrandId: 1,
          investmentTotal: this.opponentUnitStatus.pmiInvestmentAmount,
          Description1: 'PMI',
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          OpponentAssetTypeIdDesc: this.PmiUnitTypeLabel,
          BrandIdDesc: 'PMI'
        }
        this.contractOpponentAssetsJTI = {
          Code: this.form.Code + '-1',
          IsAvaible: this.JtiAvaible,
          OpponentAssetTypeId: this.JtiUnitTypeSize,
          BrandId: 1,
          investmentTotal: this.opponentUnitStatus.jtiInvestmentAmount,
          Description1: 'JTI',
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          OpponentAssetTypeIdDesc: this.JtiUnitTypeLabel,
          BrandIdDesc: 'JTI'
        }
        this.contractOpponentAssetsITC = {
          Code: this.form.Code + '-1',
          IsAvaible: this.ItcAvaible,
          OpponentAssetTypeId: this.ItcUnitTypeSize,
          BrandId: 1,
          investmentTotal: this.opponentUnitStatus.itcInvestmentAmount,
          Description1: 'ITC',
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          OpponentAssetTypeIdDesc: this.ItcUnitTypeLabel,
          BrandIdDesc: 'ITC'
        }
        if (this.targetSale.kentMonthlyAverageSales != null || this.targetSale.kentMonthlyAverageSales > 0) {
          this.contractItemsKent = {
            Deleted: 0,
            System: 0,
            RecordId: this.RecordId,
            RecordState: 2,
            StatusId: 1,
            SalesQuantity: 0,
            SalesAmount: 0,
            TableName: 'T_ITEM',
            ColumnName: 'TYPE_ID',
            ColumnValue: 5251,
            ColumnNameStr: 'Marka',
            ColumnValueStr: 'Kent',
            QuotaQuantity: this.targetSale.kentMonthlyAverageSales,
            QuotaTypeId: 2271078,
            QuotaTypeName: 'Miktarsal',
            UnitId: 501,
            UnitName: 'Karton',
            QuotaAmount: null,
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            IsDefaultValue: true
          }
          this.form.ContractItems.push(this.contractItemsKent)
        } else { }
        if (this.targetSale.rothmansMonthlyAverageSales != null || this.targetSale.rothmansMonthlyAverageSales > 0) {
          this.contractItemsRothmans = {
            Deleted: 0,
            System: 0,
            RecordId: this.RecordId,
            RecordState: 2,
            StatusId: 1,
            SalesQuantity: 0,
            SalesAmount: 0,
            TableName: 'T_ITEM',
            ColumnName: 'TYPE_ID',
            ColumnValue: 21853082445,
            ColumnNameStr: 'Marka',
            ColumnValueStr: 'Rothmans',
            QuotaQuantity: this.targetSale.rothmansMonthlyAverageSales,
            QuotaTypeId: 2271078,
            QuotaTypeName: 'Miktarsal',
            UnitId: 501,
            UnitName: 'Karton',
            QuotaAmount: null,
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            IsDefaultValue: true
          }
          this.form.ContractItems.push(this.contractItemsRothmans)
        } else { }
        if (this.targetSale.tekelMonthlyAverageSales != null || this.targetSale.tekelMonthlyAverageSales > 0) {
          this.contractItemsTekel2000 = {
            Deleted: 0,
            System: 0,
            RecordId: this.RecordId,
            RecordState: 2,
            StatusId: 1,
            SalesQuantity: 0,
            SalesAmount: 0,
            TableName: 'T_ITEM',
            ColumnName: 'TYPE_ID',
            ColumnValue: 21853082445,
            ColumnNameStr: 'Marka',
            ColumnValueStr: 'Tekel 2000',
            QuotaQuantity: this.targetSale.tekelMonthlyAverageSales,
            QuotaTypeId: 2271078,
            QuotaTypeName: 'Miktarsal',
            UnitId: 501,
            UnitName: 'Karton',
            QuotaAmount: null,
            CurrencyId: 1,
            CurrencyName: 'Türk Lirası',
            IsDefaultValue: true
          }
          this.form.ContractItems.push(this.contractItemsTekel2000)
        } else { }
        this.contractAssets =
        {
          AssetId: 1823856813,
          PlannedServiceDate: this.validDates.contractStartDate,
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          AssetIdDesc: 'Galaxy XL'
        }
        this.contractBenefitsAsset = {
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          BenefitTypeId: 4,
          BenefitTypeName: 'Varlik',
          CurrencyId: 1,
          CurrencyName: 'Türk Lirası',
          usedAmount: 0
        }
        let cashType = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 4)
        if (cashType.length === 0) {
          this.form.ContractBenefits.push(this.contractBenefitsAsset)
        }
        this.form.ContractOtherDetailss.push(this.contractOtherDetailss)
        this.form.ContractOpponentAssets.push(this.contractOpponentAssetsPMI, this.contractOpponentAssetsJTI, this.contractOpponentAssetsITC)
        this.form.ContractAssets.push(this.contractAssets)
        this.validDates.contractDuration = this.daysDifference
        this.contractDates.ContractValidDurationDate = this.daysDifference2
        this.createData()
      }
    },
    getSignatureType (value) {
      this.form.SignatureTypeId = value.DecimalValue
    },
    getUnitAvailable (value, type) {
      if (type === 1) {
        this.PmiIsAvailable = value.DecimalValue
      }
      if (type === 2) {
        this.JtiIsAvailable = value.DecimalValue
      }
      if (type === 3) {
        this.ItcIsAvailable = value.DecimalValue
      }
    },
    getUnitTypeSize (value, type) {
      if (type === 1) {
        this.PmiUnitTypeSize = value.DecimalValue
        this.PmiUnitTypeLabel = value.Label
      }
      if (type === 2) {
        this.JtiUnitTypeSize = value.DecimalValue
        this.JtiUnitTypeLabel = value.Label
      }
      if (type === 3) {
        this.ItcUnitTypeSize = value.DecimalValue
        this.ItcUnitTypeLabel = value.Label
      }
    },
    getCustomerBudget (value, type) {
      if (type === 1) {
        this.CashBudgetMasterId = value.BudgetMasterId
        this.CashBudgetCustomerDesc = value.CustomerDesc
      }
      if (type === 2) {
        this.OnlyDtiBudgetMasterId = value.BudgetMasterId
        this.OnlyDtiBudgetCustomerDesc = value.CustomerDesc
      }
      if (type === 3) {
        this.YymBudgetMasterId = value.BudgetMasterId
        this.YymBudgetCustomerDesc = value.CustomerDesc
      }
    },
    getCustomerBudgets (CustomerId) {
      this.customerBudgets = []
      if (CustomerId > 0) {
        let request = {
          customerId: CustomerId
        }
        this.$api.postByUrl(request, 'VisionNextBudget/api/BudgetMaster/GetCustomerBudget').then((res) => {
          if (res && res.ListModel && res.ListModel.BaseModels && res.ListModel.BaseModels.length > 0) {
            this.customerBudgets = res.ListModel.BaseModels
          } else {
            this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.contract.noCustomerBudget') })
          }
        })
      }
    },
    getCustomer () {
      this.$api.post({RecordId: this.form.CustomerId}, 'Customer', 'Customer/Get').then((res) => {
        if (res.Model.DocumentStatusId && res.Model.DocumentStatusId === 2302) {
          this.customerList = res.Model
          this.assetsLocationList = res.Model
          this.form.customerName = this.customerList.CommercialTitle
          this.form.address = this.customerList.CustomerLocations[0]['AddressDetail']
          this.form.licenseNumber = this.customerList.LicenseNumber
          this.form.customerArea = this.customerList.CustomerRegion5.Label
          this.RouteDetailsList = this.customerList.RouteDetails ? this.customerList.RouteDetails.filter(r => r.RouteTypeId === 5) : ''
          this.form.route = this.RouteDetailsList.length > 0 ? this.RouteDetailsList[0].Route.Label : ''
          this.form.tmrSrName = this.RouteDetailsList.length > 0 ? this.RouteDetailsList[0].Representative.Label : ''
          this.KindId = this.customerList.KindId
          this.CustomerId = this.customerList.CustomerId
          this.getLookups(this.KindId)
          this.getCustomerContract(this.form.CustomerId)
          this.getLastContract(this.form.CustomerId)
          this.getContractItemCriteria()
          this.getCustomerBudgets(this.form.CustomerId)
          this.selectContractType()
          this.getCode(this.customerList.BranchId)
        } else {
          this.$toasted.show(this.$t('insert.investmentForm.requiredDocument'),
            {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
        }
      })
    },
    getCode (BranchId) {
      this.$api.post({branchId: BranchId}, 'Contract', 'Contract/GetCode').then((res) => {
        if (res) {
          this.form.Code = res.Model.Code
          this.form.ContractNumber = res.Model.Code
        }
      })
    },
    getLookups (kindId) {
      this.$api.postByUrl({LookupTableCode: 'CUSTOMER_KIND'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (response) {
          this.lookupValues = response.Values.CUSTOMER_KIND.find(a => a.DecimalValue === kindId)
          this.form.salesVolumeClass = this.lookupValues.Label
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

        var ContractItemList = this.getCustomerContractList.ContractItems
        var kentContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Kent')
        if (kentContractList && kentContractList.length > 0) {
          this.currentInvestmentBudget.KentContractQuotaQuantity = kentContractList[0].QuotaQuantity
        }
        var rothmansContractList = ContractItemList.filter(a => a.ColumnValueStr === 'Rothmans')
        if (rothmansContractList && rothmansContractList.length > 0) {
          this.currentInvestmentBudget.RothmansContractQuotaQuantity = rothmansContractList[0].QuotaQuantity
        }
        var tekel2000List = ContractItemList.filter(a => a.ColumnValueStr === 'Tekel 2000')
        if (tekel2000List && tekel2000List.length > 0) {
          this.currentInvestmentBudget.Tekel2000ContractQuotaQuantity = tekel2000List[0].QuotaQuantity
        }
      })
    },
    selectContractType () {
      let request = {
        RecordId: 2 }
      this.$api.postByUrl(request, '/VisionNextContract/api/ContractType/Search').then((response) => {
        this.contractList = response.ListModel.BaseModels[1]
        this.form.TypeId = this.contractList.RecordId
        this.form.ContractTypeDesc = this.contractList.Description1
      })
    },
    getLastContract (CustomerId) {
      if (CustomerId > 0) {
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
      }
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
    }
  },
  validations () {
    if (this.form.signingType && this.form.signingType.DecimalValue === 2140) {
      this.form.ApproveStateId = 2382
    } else {
      this.form.ApproveStateId = 2381
    }
    if (this.opponentUnitStatus.pmiUnit && this.opponentUnitStatus.pmiUnit.DecimalValue === 0) {
      this.opponentUnitStatus.pmiUnitType = {}
      this.opponentUnitStatus.pmiInvestmentAmount = ''
    }
    if (this.opponentUnitStatus.jtiUnit && this.opponentUnitStatus.jtiUnit.DecimalValue === 0) {
      this.opponentUnitStatus.jtiUnitType = {}
      this.opponentUnitStatus.jtiInvestmentAmount = ''
    }
    if (this.opponentUnitStatus.itcUnit && this.opponentUnitStatus.itcUnit.DecimalValue === 0) {
      this.opponentUnitStatus.itcUnitType = {}
      this.opponentUnitStatus.itcInvestmentAmount = ''
    }
    return {
      form: {
        signingType: {
          required
        }
      },
      validDates: {
        contractStartDate: {
          required
        },
        contractEndDate: {
          required
        }
      }
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
