<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <GetFormField v-model="workFlowModel" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" /> <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.contract.Description1')"></div>
              <div v-html="getFormatDataByType(rowData.ContractNumber, 'text', 'insert.contract.ContractNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.contract.ClassId')"></div>
              <div v-html="getFormatDataByType(rowData.Brand, 'object', 'insert.contract.BrandId')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.contract.GenExp')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.contract.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerFinanceCode, 'text', 'insert.contract.CustomerFinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'insert.contract.ApproveStateId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.contract.TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.contract.CustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.SignatureType, 'object', 'insert.contract.SignatureType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.additionalCustomer')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.customer')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.ContractRelatedCustomers" :key="i">
                      <b-td>{{r.Customer ? r.Customer.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractValidDates" :key="i">
                      <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.BenefitTypeId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.BenefitBudget')}}</span></b-th>
                     <b-th><span>{{$t('insert.contract.usedAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.TciBreak1Id')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractBenefits" :key="i">
                      <b-td>{{c.BenefitType ? c.BenefitType.Label : ''}}</b-td>
                      <b-td>{{c.BudgetMaster ? c.BudgetMaster.Label : ''}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                      <b-td>{{c.BenefitBudget}}</b-td>
                      <b-td>{{c.UsedAmount}}</b-td>
                      <b-td>{{c.TciBreak1 ? c.TciBreak1.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.assets')" v-if="showAssets">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractAssets" :key="i">
                      <b-td>{{c.Asset ? c.Asset.Label : ''}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.PlannedServiceDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractItems')" v-if="rowData.TypeId && rowData.TypeId !== 4">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.targetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractItems" :key="i">
                      <b-td>{{c.ColumnNameStr}}</b-td>
                      <b-td>{{c.ColumnValueStr}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.QuotaType ? c.QuotaType.Label : ''}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{c.QuotaAmount}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPriceDiscounts')" v-if="showPriceDiscount">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.discountAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.itemFormula')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.usedAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaSalesQuantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractPriceDiscounts" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.DiscountAmount}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : ''}}</b-td>
                      <b-td>{{c.BudgetAmount}}</b-td>
                      <b-td>{{c.QuotaColumnNameStr}}</b-td>
                      <b-td>{{c.QuotaColumnValueStr}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{c.ItemFormula ? c.ItemFormula.Label : ''}}</b-td>
                      <b-td>{{c.Currency ? c.Currency.Label : ''}}</b-td>
                      <b-td>{{c.GivenAmount}}</b-td>
                      <b-td>{{c.QuotaSalesQuantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractInvestments')" v-if="showInvestments">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedInvestedAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedInvestmentDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.description1')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractInvestments" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.InvestedAmount}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.PlannedInvestmentDate)}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{c.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractDiscounts')" v-if="showDiscounts">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.discountRate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractDiscounts" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.ColumnName}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                      <b-td>{{c.DiscountRate}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.BudgetAmount}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : ''}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractFreeItems')" v-if="showFreeItems">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.contractFocType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.freeQuantityLimit')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.allowOverLimit')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaLevelTaken')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaLevel')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.freeQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.givenQuantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractFreeItems" :key="i">
                     <b-td>{{c.ContractFocType ? c.ContractFocType.Label : ''}}</b-td>
                     <b-td>{{c.ColumnName}}</b-td>
                     <b-td>{{c.ColumnValue}}</b-td>
                     <b-td>{{c.QuotaColumnName}}</b-td>
                     <b-td>{{c.QuotaColumnValue}}</b-td>
                     <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                     <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                     <b-td>{{c.BeginDate}}</b-td>
                     <b-td>{{c.QuotaQuantity}}</b-td>
                     <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                     <b-td>{{c.BranchSharePercent}}</b-td>
                     <b-td>{{c.FreeQuantityLimit}}</b-td>
                     <b-td>{{c.AllowOverLimit === 1 ? $t('insert.active') : $t('insert.passive')}}</b-td>
                     <b-td>{{c.QuotaLevelTaken}}</b-td>
                     <b-td>{{c.QuotaLevel}}</b-td>
                     <b-td>{{c.FreeQuantity}}</b-td>
                     <b-td>{{c.GivenQuantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPaymentPlans')" v-if="showPaymentPlans">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.paymentAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.plannedPaymentDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.budgetEndDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.refInvoiceTaken')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.refInvoiceNumber')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.poNumber')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractPaymentPlans" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.PaymentAmount}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.PlannedPaymentDate)}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.BudgetBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.BudgetEndDate)}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{c.RefInvoiceTaken === 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{c.RefInvoiceNumber}}</b-td>
                      <b-td>{{c.PoNumber}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractEndorsements')" v-if="showEndorsements">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endorsementGivenType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.calculationType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endrsPaymentType')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.freeItem')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.salesPercentage')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.executionDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractEndorsements" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.EndorsementGivenType ? c.EndorsementGivenType.Label : ''}}</b-td>
                      <b-td>{{c.CalculationType ? c.CalculationType.Label : ''}}</b-td>
                      <b-td>{{c.ColumnName}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{c.Unit ? c.Unit.Label : ''}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                      <b-td>{{c.EndrsPaymentType ? c.EndrsPaymentType.Label : ''}}</b-td>
                      <b-td>{{c.FreeItem ? c.FreeItem.Label : ''}}</b-td>
                      <b-td>{{c.SalesPercentage}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.ExecutionDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractCustomPrices')" v-if="showCustomPrices">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.item')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.customPrice')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaBeginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaEndDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                    <b-th><span>{{$t('insert.contract.quotaSalesQuantity')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.ContractCustomPrices" :key="i">
                      <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : ''}}</b-td>
                      <b-td>{{c.Item ? c.Item.Label : ''}}</b-td>
                      <b-td>{{c.CustomPrice}}</b-td>
                      <b-td>{{c.BranchSharePercent}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                      <b-td>{{c.QuotaColumnName}}</b-td>
                      <b-td>{{c.QuotaColumnValue}}</b-td>
                      <b-td>{{c.QuotaQuantity}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                      <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : ''}}</b-td>
                      <b-td>{{c.QuotaSalesQuantity}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.ContractOpponentAssets')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ContractOpponentAssets" :items="opponentAssetsItem" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.ContractOtherDetailss')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.ContractOtherDetailss" :items="otherDetailsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.signAttachment')" @click.prevent="tabValidation()">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-row>
                  <b-table-simple bordered small>
                    <b-thead>
                      <b-th><span>{{$t('insert.contract.Attachment')}}</span></b-th>
                      <b-th><span>{{$t('list.operations')}}</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="(f, i) in rowData.ContractAttachments" :key="i">
                        <b-td>{{f.FileName ? f.FileName : ''}}</b-td>
                        <b-td>
                          <i @click="downloadFile(f)" class="fa fa-download"></i>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-row>
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
import mixin from '../../../mixins/index'
import { detailData } from './../detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      opponentAssetsItem: detailData.opponentAssetsItem,
      otherDetailsItems: detailData.otherDetailsItems,
      workFlowModel: {
        ControllerName: '',
        ClassName: 'Contract',
        PageName: 'pg_Contract'
      },
      showAssets: false,
      showPriceDiscount: false,
      showInvestments: false,
      showDiscounts: false,
      showFreeItems: false,
      showPaymentPlans: false,
      showEndorsements: false,
      showCustomPrices: false,
      ContractAttachments: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    downloadFile (item) {
      let vm = this
      let data = {
        RecordId: item.RecordId
        // EncryptedKey: item.EncryptedKey
      }
      vm.$api.postByUrl(data, 'VisionNextContract/api/ContractAttachment/GetCustomerAttachment').then(res => {
        const base64String = res.File
        const fileName = res.FileName
        const fieldDescription = res.Description1
        const blob = this.base64ToBlob(base64String)
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('download', fieldDescription !== null ? fieldDescription : fileName)
        link.setAttribute('href', url)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    base64ToBlob (base64String) {
      const byteCharacters = atob(base64String)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      return new Blob([byteArray], { type: 'application/octet-stream' })
    },
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      var me = this
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContract/api/Contract', record: this.$route.params.url}).then(() => {
        me.showAssets = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 4)
        me.showPriceDiscount = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 6)
        me.showInvestments = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 5)
        me.showDiscounts = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 1)
        me.showFreeItems = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 2)
        me.showPaymentPlans = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 3)
        me.showEndorsements = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 9)
        me.showCustomPrices = me.rowData.ContractBenefits.some(c => c.BenefitTypeId === 10)
      })
    }
  }
}
</script>
