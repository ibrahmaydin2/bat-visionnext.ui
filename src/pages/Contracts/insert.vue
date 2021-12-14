<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Contracts' }">
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
          <NextFormGroup item-key="Code" :error="$v.form.Code" md="3" lg="3">
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :readonly="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ContractNumber" :error="$v.form.ContractNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.ContractNumber" :readonly="insertReadonly.ContractNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId" md="2" lg="2">
              <NextDropdown :source="lookupValues.CONTRACT_CLASS" label="Label" @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId" md="2" lg="2">
              <NextDropdown :source="lookupValues.ITEM_TYPE" label="Label" @input="selectedType('BrandId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1" md="2" lg="2">
              <b-form-input type="number" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerFinanceCode" :error="$v.form.CustomerFinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.CustomerFinanceCode" :readonly="insertReadonly.CustomerFinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId" md="2" lg="2">
              <NextDropdown v-model="selectedApproveState" :source="lookupValues.APPROVE_STATE" label="Label" @input="selectedType('ApproveStateId', $event)" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId" md="2" lg="2">
              <NextDropdown url="VisionNextContractManagement/api/ContractType/Search" @input="selectedSearchType('TypeId', $event); selectContractType($event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="2" lg="2">
              <NextDropdown
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                @input="selectedCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :is-customer="true"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.otherContract')" v-if="form.CustomerId > 0">
          <b-row>
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th>{{$t('insert.contract.Code')}}</b-th>
                  <b-th>{{$t('insert.contract.ContractNumber')}}</b-th>
                  <b-th>{{$t('insert.contract.Description1')}}</b-th>
                  <b-th>{{$t('insert.contract.ApproveState')}}</b-th>
                  <b-th>{{$t('insert.contract.StatusReason')}}</b-th>
                  <b-th>{{$t('insert.contract.validBeginDate')}}</b-th>
                  <b-th>{{$t('insert.contract.validEndDate')}}</b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(contract, i) in customerContractList" :key="'dl' + i">
                    <b-td>{{contract.Code}}</b-td>
                    <b-td>{{contract.ContractNumber}}</b-td>
                    <b-td>{{contract.Description1}}</b-td>
                    <b-td>{{contract.ApproveState ? contract.ApproveState.Label : ''}}</b-td>
                    <b-td>{{contract.StatusReason ? contract.StatusReason.Label : ''}}</b-td>
                    <b-td>{{contract.ContractValidDates && contract.ContractValidDates.length > 0 ? dateConvertFromTimezone(contract.ContractValidDates[0].StartDate) : ''}}</b-td>
                    <b-td>{{contract.ContractValidDates && contract.ContractValidDates.length > 0 ? dateConvertFromTimezone(contract.ContractValidDates[0].EndDate) : ''}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.additionalCustomer')">
          <b-row>
            <NextFormGroup :title="insertTitle.CustomerId" :error="$v.selectedAdditionalCustomer" :required="true" md="3" lg="3">
              <NextDropdown
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                v-model="selectedAdditionalCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addAdditionalCustomer" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.customer')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.ContractRelatedCustomers" :key="i">
                  <b-td>{{r.CustomerName}}</b-td>
                  <b-td class="text-center"><i @click="removeAdditionalCustomer(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.startDate')" :error="$v.validDates.contractStartDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractStartDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" :error="$v.validDates.contractEndDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.BenefitTypeId')" :error="$v.contractBenefits.benefitType" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.benefitType" url="VisionNextContractManagement/api/ContractBenefitType/Search" :source="contractBenefitTypeSource" v-on:all-source="(values) => {contractBenefitTypes = values}"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BudgetMasterId')" :error="$v.contractBenefits.budgetMaster" :required="!contractBenefits.benefitType || (contractBenefits.benefitType.RecordId !== 4)" md="4" lg="4">
                 <v-select
                 :disabled="contractBenefits.benefitType && (contractBenefits.benefitType.RecordId === 4)"
                 :options="customerBudgets" label="CustomerDesc"  v-model="contractBenefits.budgetMaster"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" :error="$v.contractBenefits.currency" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.currency" :source="currencies"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BenefitBudget')" :error="$v.contractBenefits.benefitBudget" :required="!contractBenefits.benefitType || contractBenefits.benefitType.RecordId !== 4" md="4" lg="4">
              <b-form-input
              :disabled="contractBenefits.benefitType && contractBenefits.benefitType.RecordId === 4"
              type="number" v-model="contractBenefits.benefitBudget" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.TciBreak1Id')" :error="$v.contractBenefits.tciBreak1" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.tciBreak1" lookup-key="TCI_BREAKDOWN" :get-lookup="true"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addContractBenefits" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.BenefitTypeId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.BenefitBudget')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.TciBreak1Id')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractBenefits" :key="i">
                  <b-td>{{c.BenefitTypeName}}</b-td>
                  <b-td>{{c.BudgetMasterName}}</b-td>
                  <b-td>{{c.CurrencyName}}</b-td>
                  <b-td>{{c.BenefitBudget}}</b-td>
                  <b-td>{{c.TciBreak1Name}}</b-td>
                  <b-td class="text-center">
                    <i @click="editContractBenefits(c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractBenefits(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.assets')" v-if="showAssets">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.assetId')" :error="$v.contractAssets.asset" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractAssets.asset" url="VisionNextAsset/api/Asset/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.plannedServiceDate')" :error="$v.contractAssets.plannedServiceDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="contractAssets.plannedServiceDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                 <AddDetailButton @click.native="addContractAssets" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.assetId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.plannedServiceDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractAssets" :key="i">
                  <b-td>{{c.AssetName}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedServiceDate)}}</b-td>
                  <b-td class="text-center"><i @click="removeContractAssets(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractItems')" v-if="form.TypeId && form.TypeId !== 4">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.fieldDescription')" :error="$v.contractItems.fieldDescription" :required="true" md="3" lg="3">
              <NextDropdown
              :disabled="contractItems.IsDefaultValue"
              v-model="contractItems.fieldDescription"
              :source="itemCriterias"
              :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
              @input="getItemValues($event, 'item')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractItems.fieldValue" :required="true" md="3" lg="3">
              <v-select :disabled="!contractItems.fieldDescription || contractItems.IsDefaultValue" v-model="contractItems.fieldValue" :options="fieldValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetQuantity')" :error="$v.contractItems.quotaQuantity" :required="contractItems.targetType && contractItems.targetType.Code === 'MKTR'" md="3" lg="3">
              <b-form-input type="number" v-model="contractItems.quotaQuantity" :disabled="!contractItems.targetType || contractItems.targetType.Code === 'TTR'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetType')" :error="$v.contractItems.targetType" :required="true" md="3" lg="3">
              <NextDropdown :disabled="contractItems.IsDefaultValue" v-model="contractItems.targetType" lookup-key="QUOTA_TYPE" :get-lookup="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractItems.unit" :required="true" md="3" lg="3">
              <NextDropdown :disabled="contractItems.IsDefaultValue" v-model="contractItems.unit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetAmount')" :error="$v.contractItems.quotaAmount" :required="contractItems.targetType && contractItems.targetType.Code === 'TTR'" md="3" lg="3">
              <b-form-input type="number" v-model="contractItems.quotaAmount" :disabled="!contractItems.targetType || contractItems.targetType.Code === 'MKTR' || contractItems.IsDefaultValue"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" :error="$v.contractItems.currency" :required="true" md="3" lg="3">
              <NextDropdown :disabled="contractItems.IsDefaultValue" v-model="contractItems.currency" :source="currencies" />
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                 <AddDetailButton @click.native="addContractItems" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.fieldDescription')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.fieldValue')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.targetQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.targetType')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.targetAmount')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractItems" :key="i">
                  <b-td>{{c.ColumnNameStr}}</b-td>
                  <b-td>{{c.ColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.QuotaTypeName}}</b-td>
                  <b-td>{{c.UnitName}}</b-td>
                  <b-td>{{c.QuotaAmount}}</b-td>
                  <b-td>{{c.CurrencyName}}</b-td>
                  <b-td class="text-center">

                    <b-button @click="editRow('contractItems', form.ContractItems, c)" class="btn mr-2 btn-warning btn-sm">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button :disabled="c.IsDefaultValue" @click="removeContractItems(c)" class="btn mr-2 btn-danger btn-sm">
                      <i class="far fa-trash-alt"></i>
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPriceDiscounts')" v-if="showPriceDiscount">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractPriceDiscounts.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractPriceDiscounts.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" @input="selectedBenefitCondition($event)" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.discountAmount')" :error="$v.contractPriceDiscounts.discountAmount" :required="contractPriceDiscounts.benefitCondition && contractPriceDiscounts.benefitCondition.Code !== 'YYM'" md="3" lg="3">
              <b-form-input
                type="number" v-model="contractPriceDiscounts.discountAmount"
                :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code === 'YYM'" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaAmount')" :error="$v.contractPriceDiscounts.quotaAmount" :required="contractPriceDiscounts.benefitCondition && contractPriceDiscounts.benefitCondition.Code === 'KOT'" md="3" lg="3">
              <b-form-input
              :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code !== 'KOT'"
                type="number" v-model="contractPriceDiscounts.quotaAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" md="3" lg="3">
              <NextDropdown :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code === 'YYM'
                || contractPriceDiscounts.benefitCondition.Code === 'SOZ'"
                v-model="contractPriceDiscounts.quotaUnit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.budgetAmount')" :error="$v.contractPriceDiscounts.budgetAmount" :required="contractPriceDiscounts.benefitCondition && contractPriceDiscounts.benefitCondition.Code === 'YYM'" md="3" lg="3">
              <b-form-input
              :disabled="!contractPriceDiscounts.benefitCondition
              || contractPriceDiscounts.benefitCondition.Code !== 'YYM'" type="number" v-model="contractPriceDiscounts.budgetAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" md="3" lg="3">
              <NextDropdown
                v-model="contractPriceDiscounts.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quota')"
                :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code === 'YYM'
                || contractPriceDiscounts.benefitCondition.Code === 'SOZ'" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" md="3" lg="3" v-if="contractPriceDiscounts.quotaColumnName">
              <v-select :disabled="!contractPriceDiscounts.quotaColumnName || !contractPriceDiscounts.quotaColumnName.Code" v-model="contractPriceDiscounts.quotaColumnValue" :options="quotaValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaBeginDate')" md="3" lg="3">
              <b-form-datepicker
              :disabled="!contractPriceDiscounts.benefitCondition || (contractPriceDiscounts.benefitCondition && (contractPriceDiscounts.benefitCondition.Code === 'YYM' || contractPriceDiscounts.benefitCondition.Code === 'SOZ'))" v-model="contractPriceDiscounts.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaEndDate')" md="3" lg="3">
              <b-form-datepicker
              :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code !== 'KOT'"
              v-model="contractPriceDiscounts.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.startDate')" md="3" lg="3" :error="$v.contractPriceDiscounts.beginDate" :required="true">
              <b-form-datepicker
              v-model="contractPriceDiscounts.beginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" md="3" lg="3">
              <b-form-input
                :disabled="true" type="number" v-model="contractPriceDiscounts.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.itemFormula')" md="3" lg="3">
              <NextDropdown :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code !== 'YYM'" v-model="contractPriceDiscounts.itemFormula" url="VisionNextContractManagement/api/ItemFormula/Search" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" md="3" lg="3">
              <NextDropdown
              :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code === 'YYM'"
              v-model="contractPriceDiscounts.currency" :source="currencies" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractPriceDiscounts" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractPriceDiscounts" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.DiscountAmount}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.QuotaUnitName}}</b-td>
                  <b-td>{{c.BudgetAmount}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{c.ItemFormulaName}}</b-td>
                  <b-td>{{c.CurrencyName}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractPriceDiscounts', form.ContractPriceDiscounts, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractPriceDiscounts(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractInvestments')" v-if="showInvestments">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractInvestments.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractInvestments.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BudgetMasterId')" :error="$v.contractInvestments.budgetMaster" :required="!contractBenefits.benefitType || (contractBenefits.benefitType.RecordId !== 4)" md="4" lg="4">
                 <v-select
                 :disabled="contractBenefits.benefitType && (contractBenefits.benefitType.RecordId === 4)"
                 :options="customerBudgets" label="CustomerDesc"  v-model="contractInvestments.budgetMaster"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.plannedInvestedAmount')" :error="$v.contractInvestments.investedAmount" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractInvestments.investedAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.plannedInvestmentDate')" :error="$v.contractInvestments.plannedInvestmentDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="contractInvestments.plannedInvestmentDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractInvestments.quotaColumnName" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown
                v-model="contractInvestments.quotaColumnName"
                :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quotaInvestment')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractInvestments.quotaColumnValue" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <v-select :disabled="!contractInvestments.quotaColumnName || contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" v-model="contractInvestments.quotaColumnValue" :options="quotaInvestmentValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractInvestments.quotaQuantity" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <b-form-input  :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" type="number" v-model="contractInvestments.quotaQuantity" />
            </NextFormGroup>
             <NextFormGroup :title="$t('insert.contract.startDate')" :error="$v.contractInvestments.quotaBeginDate" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'"  md="3" lg="3">
              <b-form-datepicker  :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" v-model="contractInvestments.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" :error="$v.contractInvestments.quotaEndDate" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'"  md="3" lg="3">
              <b-form-datepicker :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" v-model="contractInvestments.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractInvestments.unit" :required="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" v-model="contractInvestments.unit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.description1')" :error="$v.contractInvestments.description1" md="3" lg="3">
              <b-form-input type="text" v-model="contractInvestments.description1" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractInvestments" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.benefitCondition')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.BudgetMasterId')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.plannedInvestedAmount')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.plannedInvestmentDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.quotaColumnName')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.quotaColumnValue')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.quotaQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.unitDefinitions')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.description1')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractInvestments" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.BudgetMasterName}}</b-td>
                  <b-td>{{c.InvestedAmount}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedInvestmentDate)}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.UnitName}}</b-td>
                  <b-td>{{c.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractInvestments', form.ContractInvestments, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractInvestments(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractDiscounts')" v-if="showDiscounts">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractDiscounts.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractDiscounts.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldDescription')" :error="$v.contractDiscounts.columnName" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="contractDiscounts.columnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'discountItem')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractDiscounts.columnValue" :required="true" md="3" lg="3">
              <v-select :disabled="!contractDiscounts.columnName" v-model="contractDiscounts.columnValue" :options="discountItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.discountRate')" :error="$v.contractDiscounts.discountRate" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractDiscounts.discountRate" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractDiscounts.quotaColumnName" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown
                v-model="contractDiscounts.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'discountQuotaItem')"
                :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractDiscounts.quotaColumnValue" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <v-select :disabled="!contractDiscounts.quotaColumnName || contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" v-model="contractDiscounts.quotaColumnValue" :options="discountQuotaItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.budgetAmount')" :error="$v.contractDiscounts.budgetAmount" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractDiscounts.budgetAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractDiscounts.quotaQuantity" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <b-form-input :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" type="number" v-model="contractDiscounts.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractDiscounts.quotaUnit" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" v-model="contractDiscounts.quotaUnit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" :error="$v.contractDiscounts.branchSharePercent" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractDiscounts.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaBeginDate')" md="3" lg="3" :error="$v.contractDiscounts.quotaBeginDate" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" v-model="contractDiscounts.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaEndDate')" md="3" lg="3" :error="$v.contractDiscounts.quotaEndDate" :required="!contractDiscounts.benefitCondition || contractDiscounts.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" v-model="contractDiscounts.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractDiscounts" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractDiscounts" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.ColumnNameStr}}</b-td>
                  <b-td>{{c.ColumnValueStr}}</b-td>
                  <b-td>{{c.DiscountRate}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{c.BudgetAmount}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.QuotaUnitName}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractDiscounts', form.ContractDiscounts, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractDiscounts(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractFreeItems')" v-if="showFreeItems">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.contractFocType')" :error="$v.contractFreeItems.contractFocType" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractFreeItems.contractFocType" lookup-key="CONTRACT_FOC_TYPE" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldDescription')" :error="$v.contractFreeItems.columnName" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" md="3" lg="3">
              <NextDropdown
                v-model="contractFreeItems.columnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'freeItem')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractFreeItems.columnValue" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" md="3" lg="3">
              <v-select :disabled="!contractFreeItems.columnName" v-model="contractFreeItems.columnValue" :options="freeItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractFreeItems.quotaColumnName" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <NextDropdown
                v-model="contractFreeItems.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quotaFreeItem')"
                :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractFreeItems.quotaColumnValue" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <v-select :disabled="!contractFreeItems.quotaColumnName || (contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB')" v-model="contractFreeItems.quotaColumnValue" :options="quotaFreeItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaBeginDate')" md="3" lg="3" :error="$v.contractFreeItems.quotaBeginDate" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'">
              <b-form-datepicker :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" v-model="contractFreeItems.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaEndDate')" md="3" lg="3" :error="$v.contractFreeItems.quotaEndDate" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'">
              <b-form-datepicker :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" v-model="contractFreeItems.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.startDate')" md="3" lg="3" :error="$v.contractFreeItems.beginDate" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'">
              <b-form-datepicker v-model="contractFreeItems.beginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractFreeItems.quotaQuantity" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <b-form-input :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" type="number" v-model="contractFreeItems.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractFreeItems.unit" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <NextDropdown :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" v-model="contractFreeItems.unit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" :error="$v.contractFreeItems.branchSharePercent" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" md="3" lg="3">
              <b-form-input type="number" v-model="contractFreeItems.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.freeQuantityLimit')" :error="$v.contractFreeItems.freeQuantityLimit" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" md="3" lg="3">
              <b-form-input type="number" v-model="contractFreeItems.freeQuantityLimit" :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.allowOverLimit')" :error="$v.contractFreeItems.allowOverLimit" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <NextCheckBox :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" v-model="contractFreeItems.allowOverLimit" type="number" toggle/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaLevel')" :error="$v.contractFreeItems.quotaLevelTaken" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <b-form-input class="col-md-6 col-lg-6 float-left" :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" type="number" v-model="contractFreeItems.quotaLevelTaken" />
              <b-form-input class="col-md-6 col-lg-6 float-left" :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" type="number" v-model="contractFreeItems.quotaLevel" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractFreeItems" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractFreeItems" :key="i">
                  <b-td>{{c.ContractFocTypeName}}</b-td>
                  <b-td>{{c.ColumnNameStr}}</b-td>
                  <b-td>{{c.ColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.UnitName}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{c.FreeQuantityLimit}}</b-td>
                  <b-td>{{c.AllowOverLimit === 1 ? $t('insert.active') : $t('insert.passive')}}</b-td>
                  <b-td>{{c.QuotaLevelTaken}}</b-td>
                  <b-td>{{c.QuotaLevel}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractFreeItems', form.ContractFreeItems, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractFreeItems(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPaymentPlans')" v-if="showPaymentPlans">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractPaymentPlans.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractPaymentPlans.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.paymentAmount')" :error="$v.contractPaymentPlans.paymentAmount" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractPaymentPlans.paymentAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.plannedPaymentDate')" :error="$v.contractPaymentPlans.plannedPaymentDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="contractPaymentPlans.plannedPaymentDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" :error="$v.contractPaymentPlans.branchSharePercent" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractPaymentPlans.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.budgetBeginDate')" md="3" lg="3" :error="$v.contractPaymentPlans.budgetBeginDate" :required="true">
              <b-form-datepicker v-model="contractPaymentPlans.budgetBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.budgetEndDate')" md="3" lg="3" :error="$v.contractPaymentPlans.budgetEndDate" :required="true">
              <b-form-datepicker v-model="contractPaymentPlans.budgetEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractPaymentPlans.quotaColumnName" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown
                v-model="contractPaymentPlans.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quotaPaymentPlanItem')"
                :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractPaymentPlans.quotaColumnValue" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <v-select :disabled="!contractPaymentPlans.quotaColumnName || contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" v-model="contractPaymentPlans.quotaColumnValue" :options="quotaPaymentPlanItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractPaymentPlans.quotaQuantity" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <b-form-input :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" type="number" v-model="contractPaymentPlans.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.startDate')" md="3" lg="3" :error="$v.contractPaymentPlans.quotaBeginDate" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" v-model="contractPaymentPlans.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" md="3" lg="3" :error="$v.contractPaymentPlans.quotaEndDate" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" v-model="contractPaymentPlans.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractPaymentPlans.unit" :required="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" v-model="contractPaymentPlans.unit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.refInvoiceTaken')" :error="$v.contractPaymentPlans.refInvoiceTaken" md="3" lg="3">
              <NextCheckBox v-model="contractPaymentPlans.refInvoiceTaken" type="number" toggle disabled/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.refInvoiceNumber')" :error="$v.contractPaymentPlans.refInvoiceNumber" md="3" lg="3">
              <b-form-input type="text" v-model="contractPaymentPlans.refInvoiceNumber" disabled/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.poNumber')" :error="$v.contractPaymentPlans.poNumber" md="3" lg="3">
              <b-form-input type="text" v-model="contractPaymentPlans.poNumber"/>
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractPaymentPlans" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractPaymentPlans" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.PaymentAmount}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedPaymentDate)}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BudgetBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BudgetEndDate)}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.UnitName}}</b-td>
                  <b-td>{{c.RefInvoiceTaken === 1 ? $t('insert.active') : $t('insert.passive')}}</b-td>
                  <b-td>{{c.RefInvoiceNumber}}</b-td>
                  <b-td>{{c.PoNumber}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractPaymentPlans', form.ContractPaymentPlans, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractPaymentPlans(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractEndorsements')" v-if="showEndorsements">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractEndorsements.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractEndorsements.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endorsementGivenType')" :error="$v.contractEndorsements.endorsementGivenType" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractEndorsements.endorsementGivenType" lookup-key="ENDORSEMENT_TYPE" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.calculationType')" :error="$v.contractEndorsements.calculationType" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractEndorsements.calculationType" lookup-key="CALCULATION_TYPE" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldDescription')" :error="$v.contractEndorsements.columnName" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="contractEndorsements.columnName"
               :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'endorsementItem')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractEndorsements.columnValue" :required="true" md="3" lg="3">
              <v-select :disabled="!contractEndorsements.columnName" v-model="contractEndorsements.columnValue" :options="endorsementItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractEndorsements.quotaColumnName" :required="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown
                v-model="contractEndorsements.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quotaEndorsementItem')"
                :disabled="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code === 'SOZ'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractEndorsements.quotaColumnValue" :required="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <v-select :disabled="!contractEndorsements.quotaColumnName || (contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code === 'SOZ')" v-model="contractEndorsements.quotaColumnValue" :options="quotaEndorsementItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractEndorsements.quotaQuantity" :required="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <b-form-input :disabled="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code === 'SOZ'" type="number" v-model="contractEndorsements.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractEndorsements.unit" :required="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown :disabled="contractEndorsements.benefitCondition && contractEndorsements.benefitCondition.Code === 'SOZ'" v-model="contractEndorsements.unit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.startDate')" md="3" lg="3" :error="$v.contractEndorsements.beginDate" :required="true">
              <b-form-datepicker v-model="contractEndorsements.beginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" md="3" lg="3" :error="$v.contractEndorsements.endDate" :required="true">
              <b-form-datepicker v-model="contractEndorsements.endDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endrsPaymentType')" :error="$v.contractEndorsements.endrsPaymentType" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractEndorsements.endrsPaymentType" lookup-key="ENDORSEMENT_PAYMENT_TYPE" :get-lookup="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.freeItem')" :error="$v.contractEndorsements.freeItem" :required="contractEndorsements.endrsPaymentType && contractEndorsements.endrsPaymentType.Code === 'FOCP'" md="3" lg="3">
              <NextDropdown
                v-model="contractEndorsements.freeItem"
                url="VisionNextItem/api/Item/AutoCompleteSearch"
                searchable
                or-condition-fields="Code,Description1"
                custom-option
                :disabled="contractEndorsements.endrsPaymentType && contractEndorsements.endrsPaymentType.Code !== 'FOCP'" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.salesPercentage')" :error="$v.contractEndorsements.salesPercentage" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractEndorsements.salesPercentage" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" :error="$v.contractEndorsements.branchSharePercent" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractEndorsements.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.executionDate')" md="3" lg="3" :error="$v.contractEndorsements.executionDate" :required="true">
              <b-form-datepicker v-model="contractEndorsements.executionDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractEndorsements" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractEndorsements" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.EndorsementGivenTypeName}}</b-td>
                  <b-td>{{c.CalculationTypeName}}</b-td>
                  <b-td>{{c.ColumnNameStr}}</b-td>
                  <b-td>{{c.ColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.UnitName}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                  <b-td>{{c.EndrsPaymentTypeName}}</b-td>
                  <b-td>{{c.FreeItemName}}</b-td>
                  <b-td>{{c.SalesPercentage}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.ExecutionDate)}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractEndorsements', form.ContractEndorsements, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractEndorsements(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractCustomPrices')" v-if="showCustomPrices">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractCustomPrices.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractCustomPrices.benefitCondition" :source="lookupValues.CONTRACT_BENEFIT_TYPE" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.item')" :error="$v.contractCustomPrices.item" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="contractCustomPrices.item"
                url="VisionNextItem/api/Item/AutoCompleteSearch"
                searchable
                or-condition-fields="Code,Description1"
                custom-option />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.customPrice')" :error="$v.contractCustomPrices.customPrice" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractCustomPrices.customPrice" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" :error="$v.contractCustomPrices.branchSharePercent" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractCustomPrices.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.startDate')" md="3" lg="3" :error="$v.contractCustomPrices.beginDate" :required="true">
              <b-form-datepicker v-model="contractCustomPrices.beginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" md="3" lg="3" :error="$v.contractCustomPrices.endDate" :required="true">
              <b-form-datepicker v-model="contractCustomPrices.endDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractCustomPrices.quotaColumnName" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown
                v-model="contractCustomPrices.quotaColumnName"
                :source="itemCriterias"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quotaCustomPriceItem')"
                :disabled="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" :error="$v.contractCustomPrices.quotaColumnValue" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <v-select :disabled="!contractCustomPrices.quotaColumnName || (contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ')" v-model="contractCustomPrices.quotaColumnValue" :options="quotaCustomPriceItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaQuantity')" :error="$v.contractCustomPrices.quotaQuantity" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <b-form-input :disabled="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ'" type="number" v-model="contractCustomPrices.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaBeginDate')" md="3" lg="3" :error="$v.contractCustomPrices.quotaBeginDate" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ'" v-model="contractCustomPrices.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaEndDate')" md="3" lg="3" :error="$v.contractCustomPrices.quotaEndDate" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'">
              <b-form-datepicker :disabled="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ'" v-model="contractCustomPrices.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractCustomPrices.quotaUnit" :required="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code !== 'SOZ'" md="3" lg="3">
              <NextDropdown :disabled="contractCustomPrices.benefitCondition && contractCustomPrices.benefitCondition.Code === 'SOZ'" v-model="contractCustomPrices.quotaUnit" :source="lookupValues.UNIT" label="Label" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                 <AddDetailButton @click.native="addContractCustomPrices" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.ContractCustomPrices" :key="i">
                  <b-td>{{c.BenefitConditionName}}</b-td>
                  <b-td>{{c.ItemName}}</b-td>
                  <b-td>{{c.CustomPrice}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.QuotaUnitName}}</b-td>
                  <b-td class="text-center">
                    <i @click="editRow('contractCustomPrices', form.ContractCustomPrices, c)" class="fa fa-edit text-warning"></i>
                    <i @click="removeContractCustomPrices(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        ApproveStateId: null,
        ContractNumber: null,
        GroupId: null,
        Description1: null,
        TypeId: null,
        ClassId: null,
        CustomerId: null,
        BrandId: null,
        StatusId: null,
        Genexp1: null,
        FinanceCode: null,
        CustomerFinanceCode: null,
        Code: null,
        ContractRelatedCustomers: [],
        ContractValidDates: [],
        ContractBenefits: [],
        ContractAssets: [],
        ContractItems: [],
        ContractPriceDiscounts: [],
        ContractInvestments: [],
        ContractDiscounts: [],
        ContractFreeItems: [],
        ContractPaymentPlans: [],
        ContractEndorsements: [],
        ContractCustomPrices: []
      },
      routeName1: 'ContractManagement',
      routeName2: 'Contract',
      contractAssets: {
        asset: null,
        plannedServiceDate: null
      },
      selectedAdditionalCustomer: {},
      validDates: {
        contractStartDate: null,
        contractEndDate: null
      },
      contractBenefits: {
        benefitType: null,
        budgetMaster: null,
        currency: null,
        benefitBudget: null,
        tciBreak1Id: null
      },
      plannedServiceDate: null,
      asset: null,
      selectedApproveState: null,
      showAssets: false,
      contractItems: {
        fieldDescription: null,
        fieldValue: null,
        quotaQuantity: null,
        targetType: null,
        unit: null,
        quotaAmount: null,
        currency: null
      },
      fieldValues: [],
      showPriceDiscount: false,
      quotaValues: [],
      contractPriceDiscounts: {
        discountAmount: null,
        benefitCondition: null,
        quotaAmount: null,
        quotaUnit: null,
        budgetAmount: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaBeginDate: null,
        quotaEndDate: null,
        branchSharePercent: 0,
        itemFormula: null,
        currency: null,
        beginDate: null
      },
      quotaInvestmentValues: [],
      showInvestments: false,
      contractInvestments: {
        benefitCondition: null,
        investedAmount: null,
        plannedInvestmentDate: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaQuantity: null,
        quotaBeginDate: null,
        quotaEndDate: null,
        unit: null,
        description1: null
      },
      discountItems: [],
      discountQuotaItems: [],
      showDiscounts: false,
      contractDiscounts: {
        columnName: null,
        columnValue: null,
        discountRate: null,
        benefitCondition: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        budgetAmount: null,
        quotaQuantity: null,
        quotaUnit: null,
        branchSharePercent: 0,
        quotaBeginDate: null,
        quotaEndDate: null
      },
      showFreeItems: false,
      freeItems: [],
      quotaFreeItems: [],
      contractFreeItems: {
        contractFocType: null,
        columnName: null,
        columnValue: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaBeginDate: null,
        quotaEndDate: null,
        beginDate: null,
        quotaQuantity: null,
        unit: null,
        branchSharePercent: 0,
        freeQuantityLimit: null,
        allowOverLimit: null,
        quotaLevelTaken: null,
        quotaLevel: null
      },
      showPaymentPlans: false,
      quotaPaymentPlanItems: [],
      contractPaymentPlans: {
        benefitCondition: null,
        paymentAmount: null,
        plannedPaymentDate: null,
        branchSharePercent: 0,
        budgetBeginDate: null,
        budgetEndDate: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaQuantity: null,
        quotaBeginDate: null,
        quotaEndDate: null,
        unit: null,
        refInvoiceTaken: null,
        refInvoiceNumber: null,
        poNumber: null
      },
      showEndorsements: false,
      endorsementItems: [],
      quotaEndorsementItems: [],
      contractEndorsements: {
        benefitCondition: null,
        endorsementGivenType: null,
        calculationType: null,
        columnName: null,
        columnValue: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaQuantity: null,
        unit: null,
        beginDate: null,
        endDate: null,
        freeItem: null,
        endrsPaymentType: null,
        salesPercentage: null,
        branchSharePercent: 0,
        executionDate: null
      },
      showCustomPrices: false,
      quotaCustomPriceItems: [],
      contractCustomPrices: {
        benefitCondition: null,
        item: null,
        customPrice: null,
        branchSharePercent: 0,
        beginDate: null,
        endDate: null,
        quotaColumnName: null,
        quotaColumnValue: null,
        quotaQuantity: null,
        quotaBeginDate: null,
        quotaEndDate: null,
        quotaUnit: null
      },
      selectedIndex: -1,
      customerBudgets: [],
      customerContractList: [],
      contractBenefitTypes: [],
      contractBenefitTypeSource: [],
      itemCriterias: [],
      lookupValues: {},
      currencies: []
    }
  },
  computed: {
    ...mapState(['customerContracts'])
  },
  mounted () {
    this.createManualCode()
    if (this.customerContractList) {
      this.customerContractList = []
    }
    this.getItemCriterias()
    this.getCurrencies()
    this.getLookups()
  },
  methods: {
    save () {
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
        let contractBenefits = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 3)
        if (contractBenefits && contractBenefits.length > 0) {
          let contractBenefit = contractBenefits[0]
          if (this.form.ContractPaymentPlans && this.form.ContractPaymentPlans.length > 0) {
            let totalPaymentAmount = this.form.ContractPaymentPlans.map(x => x.PaymentAmount).reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b))
            if (Number.parseFloat(totalPaymentAmount) !== Number.parseFloat(contractBenefit.BenefitBudget)) {
              this.$toasted.show(this.$t('insert.contract.paymentAmountNotDifferentBudgetError'), { type: 'error', keepOnHover: true, duration: '3000' })
              return false
            }
          }
        }
        this.form.ContractValidDates = [{
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          StartDate: this.validDates.contractStartDate,
          EndDate: this.validDates.contractEndDate
        }]
        this.createData()
      }
    },
    selectedCustomer (e) {
      if (e) {
        this.form.CustomerId = e.RecordId
        this.form.CustomerFinanceCode = e.FinanceCode
        this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextContractManagement/api/Contract/Search', name: 'customerContracts', andConditionModel: { customerIds: [e.RecordId] }})
      } else {
        this.form.CustomerId = null
        this.$store.commit('setCustomerContracts', [])
      }
      this.getCustomerBudgets()
    },
    addAdditionalCustomer () {
      this.$v.selectedAdditionalCustomer.$touch()
      if (this.$v.selectedAdditionalCustomer.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.ContractRelatedCustomers.filter(i => i.CustomerId === this.selectedAdditionalCustomer.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.ContractRelatedCustomers.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: this.selectedAdditionalCustomer.RecordId,
        CustomerName: this.selectedAdditionalCustomer.Description1
      })
      this.selectedAdditionalCustomer = undefined
      this.$v.selectedAdditionalCustomer.$reset()
    },
    removeAdditionalCustomer (item) {
      this.form.ContractRelatedCustomers.splice(this.form.ContractRelatedCustomers.indexOf(item), 1)
    },
    addContractBenefits () {
      this.$v.contractBenefits.$touch()
      if (this.$v.contractBenefits.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.ContractBenefits.filter(i => i.BenefitTypeId === this.contractBenefits.benefitType.RecordId && !this.contractBenefits.isUpdated)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      if (this.contractBenefits.benefitBudget) {
        let totalBudget = parseFloat(this.contractBenefits.benefitBudget)
        if (totalBudget === 0) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.contract.totalBudgetMustGreaterThan0') })
          return false
        }
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordState: this.contractBenefits.recordId > 0 ? 3 : 2,
        RecordId: this.contractBenefits.recordId,
        StatusId: 1,
        BenefitTypeId: this.contractBenefits.benefitType.RecordId,
        BenefitTypeName: this.contractBenefits.benefitType.Description1,
        BenefitBudget: this.contractBenefits.benefitBudget,
        BudgetMasterId: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.BudgetMasterId : undefined,
        BudgetMasterName: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.CustomerDesc : '',
        CurrencyId: this.contractBenefits.currency.RecordId,
        CurrencyName: this.contractBenefits.currency.Description1,
        TciBreak1Id: this.contractBenefits.tciBreak1.DecimalValue,
        TciBreak1Name: this.contractBenefits.tciBreak1.Label,
        usedAmount: 0
      }
      if (this.contractBenefits.isUpdated) {
        this.form.ContractBenefits[this.selectedIndex] = item
        this.selectedIndex = -1
      } else {
        this.form.ContractBenefits.push(item)
      }
      this.contractBenefits = {}
      this.$v.contractBenefits.$reset()
      this.showAssets = this.form.ContractBenefits.some(c => c.BenefitTypeId === 4)
      this.showPriceDiscount = this.form.ContractBenefits.some(c => c.BenefitTypeId === 6)
      this.showInvestments = this.form.ContractBenefits.some(c => c.BenefitTypeId === 5)
      this.showDiscounts = this.form.ContractBenefits.some(c => c.BenefitTypeId === 1)
      this.showFreeItems = this.form.ContractBenefits.some(c => c.BenefitTypeId === 2)
      this.showPaymentPlans = this.form.ContractBenefits.some(c => c.BenefitTypeId === 3)
      this.showEndorsements = this.form.ContractBenefits.some(c => c.BenefitTypeId === 9)
      this.showCustomPrices = this.form.ContractBenefits.some(c => c.BenefitTypeId === 10)
      this.$forceUpdate()
    },
    removeContractBenefits (item) {
      this.form.ContractBenefits.splice(this.form.ContractBenefits.indexOf(item), 1)
      this.showAssets = this.form.ContractBenefits.some(c => c.BenefitTypeId === 4)
      this.showPriceDiscount = this.form.ContractBenefits.some(c => c.BenefitTypeId === 6)
      this.showInvestments = this.form.ContractBenefits.some(c => c.BenefitTypeId === 5)
      this.showDiscounts = this.form.ContractBenefits.some(c => c.BenefitTypeId === 1)
      this.showFreeItems = this.form.ContractBenefits.some(c => c.BenefitTypeId === 2)
      this.showPaymentPlans = this.form.ContractBenefits.some(c => c.BenefitTypeId === 3)
      this.showEndorsements = this.form.ContractBenefits.some(c => c.BenefitTypeId === 9)
      this.showCustomPrices = this.form.ContractBenefits.some(c => c.BenefitTypeId === 10)
      this.$forceUpdate()
    },
    editContractBenefits (item) {
      this.contractBenefits = {
        recordId: item.RecordId,
        benefitType: {
          RecordId: item.BenefitTypeId,
          Description1: item.BenefitTypeName
        },
        benefitBudget: item.BenefitBudget,
        budgetMaster: {
          BudgetId: item.BudgetMasterId,
          CustomerDesc: item.BudgetMasterName
        },
        currency: {
          RecordId: item.CurrencyId,
          Description1: item.CurrencyName
        },
        tciBreak1: {
          DecimalValue: item.TciBreak1Id,
          Label: item.TciBreak1Name
        },
        usedAmount: item.UsedAmount,
        isUpdated: true
      }
      this.selectedIndex = this.form.ContractBenefits.indexOf(item)
    },
    addContractAssets () {
      this.$v.contractAssets.$touch()
      if (this.$v.contractAssets.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractAssets.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        AssetId: this.contractAssets.asset.RecordId,
        AssetName: this.contractAssets.asset.Description1,
        PlannedServiceDate: this.contractAssets.plannedServiceDate
      })
      this.contractAssets = {}
      this.$v.contractAssets.$reset()
    },
    removeContractAssets (item) {
      this.form.ContractAssets.splice(this.form.ContractAssets.indexOf(item), 1)
    },
    getItemValues (value, property) {
      switch (property) {
        case 'item':
          this.fieldValues = []
          this.contractItems.fieldValue = undefined
          break
        case 'quota':
          this.quotaValues = []
          this.contractPriceDiscounts.quotaColumnValue = undefined
          break
        case 'quotaInvestment':
          this.quotaInvestmentValues = []
          this.contractInvestments.quotaColumnValue = undefined
          break
        case 'discountItem':
          this.discountItems = []
          this.contractDiscounts.columnValue = undefined
          break
        case 'discountQuotaItem':
          this.discountQuotaItems = []
          this.contractDiscounts.quotaColumnValue = undefined
          break
        case 'freeItem':
          this.freeItems = []
          this.contractFreeItems.columnValue = undefined
          break
        case 'quotaFreeItem':
          this.quotaFreeItems = []
          this.contractFreeItems.quotaColumnValue = undefined
          break
        case 'quotaPaymentPlanItem':
          this.quotaPaymentPlanItems = []
          this.contractPaymentPlans.quotaColumnValue = undefined
          break
        case 'endorsementItem':
          this.endorsementItems = []
          this.contractEndorsements.columnValue = undefined
          break
        case 'quotaEndorsementItem':
          this.quotaEndorsementItems = []
          this.contractEndorsements.quotaColumnValue = undefined
          break
        case 'quotaCustomPriceItem':
          this.quotaCustomPriceItems = []
          this.contractCustomPrices.quotaColumnValue = undefined
          break
      }
      if (value) {
        return this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          switch (property) {
            case 'item':
              this.fieldValues = res.Values
              break
            case 'quota':
              this.quotaValues = res.Values
              break
            case 'quotaInvestment':
              this.quotaInvestmentValues = res.Values
              break
            case 'discountItem':
              this.discountItems = res.Values
              break
            case 'discountQuotaItem':
              this.discountQuotaItems = res.Values
              break
            case 'freeItem':
              this.freeItems = res.Values
              break
            case 'quotaFreeItem':
              this.quotaFreeItems = res.Values
              break
            case 'quotaPaymentPlanItem':
              this.quotaPaymentPlanItems = res.Values
              break
            case 'endorsementItem':
              this.endorsementItems = res.Values
              break
            case 'quotaEndorsementItem':
              this.quotaEndorsementItems = res.Values
              break
            case 'quotaCustomPriceItem':
              this.quotaCustomPriceItems = res.Values
              break
          }
          this.$forceUpdate()
        })
      }
    },
    addContractItems () {
      this.$v.contractItems.$touch()
      if (this.$v.contractItems.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractItems.recordId,
        RecordState: this.contractItems.recordId > 0 ? 3 : 2,
        StatusId: 1,
        SalesQuantity: 0,
        SalesAmount: 0,
        TableName: 'T_ITEM',
        ColumnName: this.contractItems.fieldDescription.ForeignField,
        ColumnValue: this.contractItems.fieldValue.DecimalValue,
        ColumnNameStr: this.contractItems.fieldDescription.Label,
        ColumnValueStr: this.contractItems.fieldValue.Label,
        QuotaQuantity: this.contractItems.quotaQuantity,
        QuotaTypeId: this.contractItems.targetType.DecimalValue,
        QuotaTypeName: this.contractItems.targetType.Label,
        UnitId: this.contractItems.unit.DecimalValue,
        UnitName: this.contractItems.unit.Label,
        QuotaAmount: this.contractItems.quotaAmount,
        CurrencyId: this.contractItems.currency.RecordId,
        CurrencyName: this.contractItems.currency.Description1,
        IsDefaultValue: this.contractItems.IsDefaultValue
      }
      if (this.contractItems.isUpdated) {
        this.form.ContractItems[this.selectedIndex] = item
        this.contractItems.isUpdated = false
      } else {
        this.form.ContractItems.push(item)
      }
      this.contractItems = {}
      this.$v.contractItems.$reset()
    },
    removeContractItems (item) {
      this.form.ContractItems.splice(this.form.ContractItems.indexOf(item), 1)
    },
    addContractPriceDiscounts () {
      this.$v.contractPriceDiscounts.$touch()
      if (this.$v.contractPriceDiscounts.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractPriceDiscounts.recordId,
        RecordState: this.contractPriceDiscounts.recordId > 0 ? 3 : 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        DiscountAmount: this.contractPriceDiscounts.discountAmount,
        BenefitConditionId: this.contractPriceDiscounts.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractPriceDiscounts.benefitCondition.Label,
        BenefitConditionCode: this.contractPriceDiscounts.benefitCondition.Code,
        QuotaQuantity: this.contractPriceDiscounts.quotaAmount,
        QuotaUnitId: this.contractPriceDiscounts.quotaUnit ? this.contractPriceDiscounts.quotaUnit.DecimalValue : null,
        QuotaUnitName: this.contractPriceDiscounts.quotaUnit ? this.contractPriceDiscounts.quotaUnit.Label : null,
        BudgetAmount: this.contractPriceDiscounts.budgetAmount,
        QuotaColumnName: this.contractPriceDiscounts.quotaColumnName ? this.contractPriceDiscounts.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractPriceDiscounts.quotaColumnName ? this.contractPriceDiscounts.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractPriceDiscounts.quotaColumnValue ? this.contractPriceDiscounts.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractPriceDiscounts.quotaColumnValue ? this.contractPriceDiscounts.quotaColumnValue.Label : null,
        QuotaBeginDate: this.contractPriceDiscounts.quotaBeginDate,
        QuotaEndDate: this.contractPriceDiscounts.quotaEndDate,
        StartDate: this.contractPriceDiscounts.beginDate,
        BranchSharePercent: this.contractPriceDiscounts.branchSharePercent ? this.this.contractPriceDiscounts.branchSharePercent : 0,
        ItemFormulaId: this.contractPriceDiscounts.itemFormula ? this.contractPriceDiscounts.itemFormula.RecordId : null,
        ItemFormulaName: this.contractPriceDiscounts.itemFormula ? this.contractPriceDiscounts.itemFormula.Description1 : null,
        CurrencyId: this.contractPriceDiscounts.currency ? this.contractPriceDiscounts.currency.RecordId : null,
        CurrencyName: this.contractPriceDiscounts.currency ? this.contractPriceDiscounts.currency.Description1 : null
      }
      if (this.contractPriceDiscounts.isUpdated) {
        this.form.ContractPriceDiscounts[this.selectedIndex] = item
        this.contractPriceDiscounts.isUpdated = false
      } else {
        this.form.ContractPriceDiscounts.push(item)
      }
      this.contractPriceDiscounts = {
        branchSharePercent: 0
      }
      this.$v.contractPriceDiscounts.$reset()
    },
    removeContractPriceDiscounts (item) {
      this.form.ContractPriceDiscounts.splice(this.form.ContractPriceDiscounts.indexOf(item), 1)
    },
    addContractInvestments () {
      this.$v.contractInvestments.$touch()
      if (this.$v.contractInvestments.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let contractBenefit = this.form.ContractBenefits.find(c => c.BenefitTypeId === 5)
      if (this.contractInvestments.investedAmount > contractBenefit.BenefitBudget) {
        this.$toasted.show(this.$t('insert.contract.investedAmuountGreaterThanTotalBudgetError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractInvestments.recordId,
        RecordState: this.contractInvestments.recordId > 0 ? 3 : 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        InvestedAmount: this.contractInvestments.investedAmount,
        PlannedInvestmentDate: this.contractInvestments.plannedInvestmentDate,
        BudgetMasterId: this.contractInvestments.budgetMaster ? this.contractInvestments.budgetMaster.BudgetMasterId : undefined,
        BudgetMasterName: this.contractInvestments.budgetMaster ? this.contractInvestments.budgetMaster.CustomerDesc : '',
        BenefitConditionId: this.contractInvestments.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractInvestments.benefitCondition.Label,
        BenefitConditionCode: this.contractInvestments.benefitCondition.Code,
        QuotaColumnName: this.contractInvestments.quotaColumnName ? this.contractInvestments.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractInvestments.quotaColumnName ? this.contractInvestments.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractInvestments.quotaColumnValue ? this.contractInvestments.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractInvestments.quotaColumnValue ? this.contractInvestments.quotaColumnValue.Label : null,
        QuotaQuantity: this.contractInvestments.quotaQuantity,
        QuotaBeginDate: this.contractInvestments.quotaBeginDate,
        QuotaEndDate: this.contractInvestments.quotaEndDate,
        UnitId: this.contractInvestments.unit ? this.contractInvestments.unit.DecimalValue : null,
        UnitName: this.contractInvestments.unit ? this.contractInvestments.unit.Label : null,
        Description1: this.contractInvestments.description1
      }
      if (this.contractInvestments.isUpdated) {
        this.form.ContractInvestments[this.selectedIndex] = item
        this.contractInvestments.isUpdated = false
      } else {
        this.form.ContractInvestments.push(item)
      }
      this.contractInvestments = {}
      this.$v.contractInvestments.$reset()
    },
    removeContractInvestments (item) {
      this.form.ContractInvestments.splice(this.form.ContractInvestments.indexOf(item), 1)
    },
    addContractDiscounts () {
      this.$v.contractDiscounts.$touch()
      if (this.$v.contractDiscounts.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractDiscounts.recordId,
        RecordState: this.contractDiscounts.recordId > 0 ? 3 : 2,
        StatusId: 1,
        TableName: 'T-ITEM',
        QuotaTableName: 'T-ITEM',
        ColumnName: this.contractDiscounts.columnName ? this.contractDiscounts.columnName.ForeignField : null,
        ColumnNameStr: this.contractDiscounts.columnName ? this.contractDiscounts.columnName.Label : null,
        ColumnValue: this.contractDiscounts.columnValue ? this.contractDiscounts.columnValue.DecimalValue : null,
        ColumnValueStr: this.contractDiscounts.columnValue ? this.contractDiscounts.columnValue.Label : null,
        DiscountRate: this.contractDiscounts.discountRate,
        BenefitConditionId: this.contractDiscounts.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractDiscounts.benefitCondition.Label,
        BenefitConditionCode: this.contractDiscounts.benefitCondition.Code,
        QuotaColumnName: this.contractDiscounts.quotaColumnName ? this.contractDiscounts.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractDiscounts.quotaColumnName ? this.contractDiscounts.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractDiscounts.quotaColumnValue ? this.contractDiscounts.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractDiscounts.quotaColumnValue ? this.contractDiscounts.quotaColumnValue.Label : null,
        BudgetAmount: this.contractDiscounts.budgetAmount,
        QuotaQuantity: this.contractDiscounts.quotaQuantity,
        QuotaUnitId: this.contractDiscounts.quotaUnit ? this.contractDiscounts.quotaUnit.DecimalValue : null,
        QuotaUnitName: this.contractDiscounts.quotaUnit ? this.contractDiscounts.quotaUnit.Label : null,
        BranchSharePercent: this.contractDiscounts.branchSharePercent,
        QuotaBeginDate: this.contractDiscounts.quotaBeginDate,
        QuotaEndDate: this.contractDiscounts.quotaEndDate
      }
      if (this.contractDiscounts.isUpdated) {
        this.form.ContractDiscounts[this.selectedIndex] = item
        this.contractDiscounts.isUpdated = false
      } else {
        this.form.ContractDiscounts.push(item)
      }
      this.contractDiscounts = {}
      this.$v.contractDiscounts.$reset()
    },
    removeContractDiscounts (item) {
      this.form.ContractDiscounts.splice(this.form.ContractDiscounts.indexOf(item), 1)
    },
    addContractFreeItems () {
      this.$v.contractFreeItems.$touch()
      if (this.$v.contractFreeItems.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractFreeItems.recordId,
        RecordState: this.contractFreeItems.recordId > 0 ? 3 : 2,
        StatusId: 1,
        TableName: 'T-ITEM',
        QuotaTableName: 'T-ITEM',
        BenefitKindId: 2271080,
        FocPaymentTypeId: 71,
        ContractFocTypeId: this.contractFreeItems.contractFocType.DecimalValue,
        ContractFocTypeName: this.contractFreeItems.contractFocType.Label,
        ColumnName: this.contractFreeItems.columnName ? this.contractFreeItems.columnName.ForeignField : null,
        ColumnNameStr: this.contractFreeItems.columnName ? this.contractFreeItems.columnName.Label : null,
        ColumnValue: this.contractFreeItems.columnValue ? this.contractFreeItems.columnValue.DecimalValue : null,
        ColumnValueStr: this.contractFreeItems.columnValue ? this.contractFreeItems.columnValue.Label : null,
        QuotaColumnName: this.contractFreeItems.quotaColumnName ? this.contractFreeItems.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractFreeItems.quotaColumnName ? this.contractFreeItems.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractFreeItems.quotaColumnValue ? this.contractFreeItems.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractFreeItems.quotaColumnValue ? this.contractFreeItems.quotaColumnValue.Label : null,
        QuotaBeginDate: this.contractFreeItems.quotaBeginDate,
        QuotaEndDate: this.contractFreeItems.quotaEndDate,
        BeginDate: this.contractFreeItems.beginDate,
        QuotaQuantity: this.contractFreeItems.quotaQuantity,
        UnitId: this.contractFreeItems.unit ? this.contractFreeItems.unit.DecimalValue : null,
        UnitName: this.contractFreeItems.unit ? this.contractFreeItems.unit.Label : null,
        BranchSharePercent: this.contractFreeItems.branchSharePercent,
        FreeQuantityLimit: this.contractFreeItems.freeQuantityLimit,
        AllowOverLimit: this.contractFreeItems.allowOverLimit,
        QuotaLevelTaken: this.contractFreeItems.quotaLevelTaken,
        QuotaLevel: this.contractFreeItems.quotaLevel
      }
      if (this.contractFreeItems.isUpdated) {
        this.form.ContractFreeItems[this.selectedIndex] = item
        this.contractFreeItems.isUpdated = false
      } else {
        this.form.ContractFreeItems.push(item)
      }
      this.contractFreeItems = {}
      this.$v.contractFreeItems.$reset()
    },
    removeContractFreeItems (item) {
      this.form.ContractFreeItems.splice(this.form.ContractFreeItems.indexOf(item), 1)
    },
    addContractPaymentPlans () {
      this.$v.contractPaymentPlans.$touch()
      if (this.$v.contractPaymentPlans.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArray = this.form.ContractPaymentPlans.filter(c => (this.contractPaymentPlans.budgetBeginDate >= c.BudgetBeginDate && this.contractPaymentPlans.budgetBeginDate <= c.BudgetEndDate) ||
        (this.contractPaymentPlans.budgetEndDate >= c.BudgetBeginDate && this.contractPaymentPlans.budgetEndDate <= c.BudgetEndDate) ||
        (c.BudgetBeginDate >= this.contractPaymentPlans.budgetBeginDate && c.BudgetBeginDate <= this.contractPaymentPlans.budgetEndDate) ||
        (c.BudgetEndDate >= this.contractPaymentPlans.budgetBeginDate && c.BudgetEndDate <= this.contractPaymentPlans.budgetEndDate))
      if (filteredArray && filteredArray.length && !this.contractPaymentPlans.isUpdated) {
        this.$toasted.show(this.$t('insert.contract.datesShouldNotIntersect'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractPaymentPlans.recordId,
        RecordState: this.contractPaymentPlans.recordId > 0 ? 3 : 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        BenefitConditionId: this.contractPaymentPlans.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractPaymentPlans.benefitCondition.Label,
        BenefitConditionCode: this.contractPaymentPlans.benefitCondition.Code,
        PaymentAmount: this.contractPaymentPlans.paymentAmount,
        PlannedPaymentDate: this.contractPaymentPlans.plannedPaymentDate,
        BranchSharePercent: this.contractPaymentPlans.branchSharePercent,
        BudgetBeginDate: this.contractPaymentPlans.budgetBeginDate,
        BudgetEndDate: this.contractPaymentPlans.budgetEndDate,
        QuotaColumnName: this.contractPaymentPlans.quotaColumnName ? this.contractPaymentPlans.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractPaymentPlans.quotaColumnName ? this.contractPaymentPlans.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractPaymentPlans.quotaColumnValue ? this.contractPaymentPlans.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractPaymentPlans.quotaColumnValue ? this.contractPaymentPlans.quotaColumnValue.Label : null,
        QuotaQuantity: this.contractPaymentPlans.quotaQuantity,
        QuotaBeginDate: this.contractPaymentPlans.quotaBeginDate,
        QuotaEndDate: this.contractPaymentPlans.quotaEndDate,
        UnitId: this.contractPaymentPlans.unit ? this.contractPaymentPlans.unit.DecimalValue : null,
        UnitName: this.contractPaymentPlans.unit ? this.contractPaymentPlans.unit.Label : null,
        RefInvoiceTaken: this.contractPaymentPlans.refInvoiceTaken,
        RefInvoiceNumber: this.contractPaymentPlans.refInvoiceNumber,
        PoNumber: this.contractPaymentPlans.poNumber
      }
      if (this.contractPaymentPlans.isUpdated) {
        this.form.ContractPaymentPlans[this.selectedIndex] = item
        this.contractPaymentPlans.isUpdated = false
      } else {
        this.form.ContractPaymentPlans.push(item)
      }
      this.contractPaymentPlans = {}
      this.$v.contractPaymentPlans.$reset()
    },
    removeContractPaymentPlans (item) {
      this.form.ContractPaymentPlans.splice(this.form.ContractPaymentPlans.indexOf(item), 1)
    },
    addContractEndorsements () {
      this.$v.contractEndorsements.$touch()
      if (this.$v.contractEndorsements.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let executionDate = new Date(this.contractEndorsements.executionDate).setHours(0, 0, 0, 0)
      let endDate = new Date(this.contractEndorsements.endDate).setHours(0, 0, 0, 0)
      let nowDate = new Date()
      nowDate.setHours(0, 0, 0, 0)
      if (executionDate < endDate || executionDate < nowDate) {
        this.$toasted.show(this.$t('insert.contract.executionDateError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      var item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractEndorsements.recordId,
        RecordState: this.contractEndorsements.recordId > 0 ? 3 : 2,
        StatusId: 1,
        TableName: 'T-ITEM',
        QuotaTableName: 'T-ITEM',
        BenefitConditionId: this.contractEndorsements.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractEndorsements.benefitCondition.Label,
        BenefitConditionCode: this.contractEndorsements.benefitCondition.Code,
        EndorsementGivenTypeId: this.contractEndorsements.endorsementGivenType.DecimalValue,
        EndorsementGivenTypeName: this.contractEndorsements.endorsementGivenType.Label,
        CalculationTypeId: this.contractEndorsements.calculationType.DecimalValue,
        CalculationTypeName: this.contractEndorsements.calculationType.Label,
        ColumnName: this.contractEndorsements.columnName ? this.contractEndorsements.columnName.ForeignField : null,
        ColumnNameStr: this.contractEndorsements.columnName ? this.contractEndorsements.columnName.Label : null,
        ColumnValue: this.contractEndorsements.columnValue ? this.contractEndorsements.columnValue.DecimalValue : null,
        ColumnValueStr: this.contractEndorsements.columnValue ? this.contractEndorsements.columnValue.Label : null,
        QuotaColumnName: this.contractEndorsements.quotaColumnName ? this.contractEndorsements.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractEndorsements.quotaColumnName ? this.contractEndorsements.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractEndorsements.quotaColumnValue ? this.contractEndorsements.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractEndorsements.quotaColumnValue ? this.contractEndorsements.quotaColumnValue.Label : null,
        QuotaQuantity: this.contractEndorsements.quotaQuantity,
        UnitId: this.contractEndorsements.unit ? this.contractEndorsements.unit.DecimalValue : null,
        UnitName: this.contractEndorsements.unit ? this.contractEndorsements.unit.Label : null,
        BeginDate: this.contractEndorsements.beginDate,
        EndDate: this.contractEndorsements.endDate,
        FreeItemId: this.contractEndorsements.freeItem ? this.contractEndorsements.freeItem.RecordId : null,
        FreeItemName: this.contractEndorsements.freeItem ? this.contractEndorsements.freeItem.Description1 : null,
        EndrsPaymentTypeId: this.contractEndorsements.endrsPaymentType ? this.contractEndorsements.endrsPaymentType.DecimalValue : null,
        EndrsPaymentTypeName: this.contractEndorsements.endrsPaymentType ? this.contractEndorsements.endrsPaymentType.Label : null,
        SalesPercentage: this.contractEndorsements.salesPercentage,
        BranchSharePercent: this.contractEndorsements.branchSharePercent,
        ExecutionDate: this.contractEndorsements.executionDate
      }
      if (this.contractEndorsements.isUpdated) {
        this.form.ContractEndorsements[this.selectedIndex] = item
        this.contractEndorsements.isUpdated = false
      } else {
        this.form.ContractEndorsements.push(item)
      }
      this.contractEndorsements = {}
      this.$v.contractEndorsements.$reset()
    },
    removeContractEndorsements (item) {
      this.form.ContractEndorsements.splice(this.form.ContractEndorsements.indexOf(item), 1)
    },
    addContractCustomPrices () {
      this.$v.contractCustomPrices.$touch()
      if (this.$v.contractCustomPrices.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.ContractCustomPrices.filter(c => c.ItemId === this.contractCustomPrices.item.RecordId)
      if (filteredArr && filteredArr.length > 0 && !this.contractCustomPrices.isUpdated) {
        this.$toasted.show(this.$t('insert.sameItemError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.contractCustomPrices.recordId,
        RecordState: this.contractCustomPrices.recordId > 0 ? 3 : 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        MaxUsage: 0,
        BenefitConditionId: this.contractCustomPrices.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractCustomPrices.benefitCondition.Label,
        BenefitConditionCode: this.contractCustomPrices.benefitCondition.Code,
        ItemId: this.contractCustomPrices.item ? this.contractCustomPrices.item.RecordId : null,
        ItemName: this.contractCustomPrices.item ? this.contractCustomPrices.item.Description1 : null,
        CustomPrice: this.contractCustomPrices.customPrice,
        BranchSharePercent: this.contractCustomPrices.branchSharePercent,
        BeginDate: this.contractCustomPrices.beginDate,
        EndDate: this.contractCustomPrices.endDate,
        QuotaColumnName: this.contractCustomPrices.quotaColumnName ? this.contractCustomPrices.quotaColumnName.ForeignField : null,
        QuotaColumnNameStr: this.contractCustomPrices.quotaColumnName ? this.contractCustomPrices.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractCustomPrices.quotaColumnValue ? this.contractCustomPrices.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractCustomPrices.quotaColumnValue ? this.contractCustomPrices.quotaColumnValue.Label : null,
        QuotaQuantity: this.contractCustomPrices.quotaQuantity,
        QuotaBeginDate: this.contractCustomPrices.quotaBeginDate,
        QuotaEndDate: this.contractCustomPrices.quotaEndDate,
        QuotaUnitId: this.contractCustomPrices.quotaUnit ? this.contractCustomPrices.quotaUnit.DecimalValue : null,
        QuotaUnitName: this.contractCustomPrices.quotaUnit ? this.contractCustomPrices.quotaUnit.Label : null
      }
      if (this.contractCustomPrices.isUpdated) {
        this.form.ContractCustomPrices[this.selectedIndex] = item
        this.contractCustomPrices.isUpdated = false
      } else {
        this.form.ContractCustomPrices.push(item)
      }
      this.contractCustomPrices = {}
      this.$v.contractCustomPrices.$reset()
    },
    removeContractCustomPrices (item) {
      this.form.ContractCustomPrices.splice(this.form.ContractCustomPrices.indexOf(item), 1)
    },
    editRow (objectKey, list, item) {
      this.selectedIndex = list.indexOf(item)
      let label = this.getQuotaColumnNameLabel(item.QuotaColumnName)
      if (label) {
        this.getItemValues({Code: item.QuotaColumnName, Label: label}, 'quota').then(() => {
          this.setModel(objectKey, item)
        })
      } else {
        this.setModel(objectKey, item)
      }
      this.setContractFocType(objectKey, item.ContractFocTypeId)
    },
    setModel (objectKey, item) {
      this[objectKey] = {
        benefitCondition: item.BenefitCondition ? item.BenefitCondition : {
          DecimalValue: item.BenefitConditionId,
          Label: item.BenefitConditionName,
          Code: item.BenefitConditionCode
        },
        budgetMaster: {
          BudgetId: item.BudgetMasterId,
          CustomerDesc: item.BudgetMaster ? item.BudgetMaster.Label : item.BudgetMasterName
        },
        endorsementGivenType: {
          DecimalValue: item.EndorsementGivenTypeId,
          Label: item.EndorsementGivenType ? item.EndorsementGivenType.Label : item.EndorsementGivenTypeName
        },
        calculationType: {
          DecimalValue: item.CalculationTypeId,
          Label: item.CalculationType ? item.CalculationType.Label : item.CalculationTypeName
        },
        columnName: {
          Code: item.ColumnName,
          ForeignField: item.ColumnName,
          Label: item.ColumnNameStr
        },
        columnValue: {
          DecimalValue: item.ColumnValue,
          Label: item.ColumnValueStr
        },
        quotaColumnName: {
          Code: item.QuotaColumnName,
          ForeignField: item.QuotaColumnName,
          Label: item.QuotaColumnNameStr ? item.QuotaColumnNameStr : this.getQuotaColumnNameLabel(item.QuotaColumnName)
        },
        quotaColumnValue: {
          DecimalValue: item.QuotaColumnValue,
          Label: item.QuotaColumnValueStr ? item.QuotaColumnValueStr : this.getQuotaColumnValueLabel(item.QuotaColumnValue)
        },
        quotaQuantity: item.QuotaQuantity,
        unit: {
          DecimalValue: item.UnitId,
          Label: item.Unit ? item.Unit.Label : item.UnitName
        },
        quotaUnit: {
          DecimalValue: item.QuotaUnitId,
          Label: item.QuotaUnit ? item.QuotaUnit.Label : item.QuotaUnitName
        },
        beginDate: item.BeginDate ? item.BeginDate : item.StartDate,
        endDate: item.EndDate,
        freeItem: {
          RecordId: item.FreeItemId,
          Description1: item.FreeItem ? item.FreeItem.Label : item.FreeItemName
        },
        item: {
          RecordId: item.ItemId,
          Description1: item.Item ? item.Item.Label : item.ItemName
        },
        endrsPaymentType: {
          DecimalValue: item.EndrsPaymentTypeId,
          Label: item.EndrsPaymentType ? item.EndrsPaymentType.Label : item.EndrsPaymentTypeName
        },
        salesPercentage: item.SalesPercentage,
        branchSharePercent: item.BranchSharePercent,
        executionDate: item.ExecutionDate,
        customPrice: item.CustomPrice,
        quotaBeginDate: item.QuotaBeginDate,
        quotaEndDate: item.QuotaEndDate,
        isUpdated: true,
        recordId: item.RecordId,
        paymentAmount: item.PaymentAmount,
        plannedPaymentDate: item.PlannedPaymentDate,
        budgetBeginDate: item.BudgetBeginDate,
        budgetEndDate: item.BudgetEndDate,
        refInvoiceTaken: item.RefInvoiceTaken,
        refInvoiceNumber: item.RefInvoiceNumber,
        poNumber: item.PoNumber,
        freeQuantityLimit: item.FreeQuantityLimit,
        allowOverLimit: item.AllowOverLimit,
        quotaLevelTaken: item.QuotaLevelTaken,
        quotaLevel: item.QuotaLevel,
        discountRate: item.DiscountRate,
        budgetAmount: item.BudgetAmount,
        investedAmount: item.InvestedAmount,
        plannedInvestmentDate: item.PlannedInvestmentDate,
        description1: item.Description1,
        discountAmount: item.DiscountAmount,
        quotaAmount: item.QuotaQuantity,
        itemFormula: {
          RecordId: item.ItemFormulaId,
          Description1: item.ItemFormula ? item.ItemFormula.Label : item.ItemFormulaName
        },
        currency: {
          RecordId: item.CurrencyId,
          Description1: item.Currency ? item.Currency.Label : item.CurrencyName
        },
        fieldDescription: {
          Code: item.ColumnName,
          ForeignField: item.ColumnName,
          Label: item.ColumnNameStr
        },
        fieldValue: {
          DecimalValue: item.ColumnValue,
          Label: item.ColumnValueStr
        },
        targetType: {
          DecimalValue: item.QuotaTypeId,
          Label: item.QuotaType ? item.QuotaType.Label : item.QuotaTypeName
        },
        IsDefaultValue: item.IsDefaultValue
      }
    },
    setBenefitCondition (objectKey, decimalValue) {
      if (decimalValue) {
        let benefitTypes = this.lookupValues.CONTRACT_BENEFIT_TYPE ? this.lookupValues.CONTRACT_BENEFIT_TYPE.filter(c => c.DecimalValue === decimalValue) : undefined
        if (benefitTypes && benefitTypes.length > 0) {
          this[objectKey].benefitCondition = benefitTypes[0]
        }
      }
    },
    setContractFocType (objectKey, decimalValue) {
      if (decimalValue) {
        let focTypes = this.lookup.CONTRACT_FOC_TYPE ? this.lookup.CONTRACT_FOC_TYPE.filter(c => c.DecimalValue === decimalValue) : undefined
        if (focTypes && focTypes.length > 0) {
          this[objectKey].contractFocType = focTypes[0]
        }
      }
    },
    getCustomerBudgets () {
      this.customerBudgets = []
      if (this.form.CustomerId > 0) {
        let request = {
          customerId: this.form.CustomerId
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
    selectContractType (value) {
      if (value) {
        this.form.ContractBenefits = []
        this.form.ContractAssets = []
        this.form.ContractItems = []
        this.form.ContractPriceDiscounts = []
        this.form.ContractInvestments = []
        this.form.ContractDiscounts = []
        this.form.ContractFreeItems = []
        this.form.ContractPaymentPlans = []
        this.form.ContractEndorsements = []
        this.form.ContractCustomPrices = []
        this.showAssets = false
        this.showPriceDiscount = false
        this.showInvestments = false
        this.showDiscounts = false
        this.showFreeItems = false
        this.showPaymentPlans = false
        this.showEndorsements = false
        this.showCustomPrices = false
        this.contractBenefitTypeSource = value.Code === 'RS'
          ? this.contractBenefitTypes.filter(c => c.Code === 'VAR' || c.Code === 'CI')
          : this.contractBenefitTypes.filter(c => c.Code !== 'CI')

        let request = {
          TypeId: value.RecordId
        }
        this.$api.postByUrl(request, 'VisionNextContractManagement/api/Contract/GetContractItemCriteria').then((response) => {
          this.form.ContractItems = response && response.length > 0 ? response.map(r => {
            r.Deleted = 0
            r.System = 0
            r.RecordState = 2
            r.StatusId = 1
            r.SalesQuantity = 0
            r.SalesAmount = 0
            r.IsDefaultValue = true
            return r
          }) : []
        })
      }
    },
    getItemCriterias () {
      this.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((response) => {
        if (response && response.Values && response.Values.length > 0) {
          this.itemCriterias = response.Values
        }
      })
    },
    getLookups () {
      this.$api.postByUrl({LookupTableCode: 'CONTRACT_BENEFIT_TYPE,UNIT,CONTRACT_CLASS,ITEM_TYPE,APPROVE_STATE'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (response && response.Values) {
          this.lookupValues = response.Values
        }
      })
    },
    getCurrencies () {
      this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel) {
          this.currencies = response.ListModel.BaseModels
        }
      })
    },
    selectedBenefitCondition (value) {
      this.contractPriceDiscounts = {
        benefitCondition: value,
        branchSharePercent: 0
      }
    },
    getQuotaColumnNameLabel (code) {
      if (!code) { return }

      let filteredArr = this.itemCriterias.filter(a => a.ForeignField === code)

      return filteredArr && filteredArr.length === 1 ? filteredArr[0].Label : ''
    },
    getQuotaColumnValueLabel (value) {
      if (!value) { return }

      let filteredArr = this.quotaValues.filter(a => a.DecimalValue === value)

      return filteredArr && filteredArr.length === 1 ? filteredArr[0].Label : ''
    }
  },
  validations () {
    let contractBenefits = {
      benefitType: {
        required
      },
      budgetMaster: {
        required
      },
      currency: {
        required
      },
      benefitBudget: {
        required
      },
      tciBreak1: {
        required
      }
    }
    if (this.contractBenefits.benefitType && this.contractBenefits.benefitType.RecordId === 4) {
      contractBenefits.budgetMaster = {}
      contractBenefits.benefitBudget = {}
    }
    let contractItems = {
      quotaAmount: {},
      quotaQuantity: {},
      fieldDescription: {
        required
      },
      fieldValue: {
        required
      },
      targetType: {
        required
      },
      unit: {
        required
      },
      currency: {
        required
      }
    }
    if (this.contractItems.targetType && this.contractItems.targetType.Code === 'TTR') {
      contractItems.quotaAmount = {
        required
      }
    }
    if (this.contractItems.targetType && this.contractItems.targetType.Code === 'MKTR') {
      contractItems.quotaQuantity = {
        required
      }
    }
    let contractInvestments = {
      benefitCondition: {
        required
      },
      budgetMaster: {
        required
      },
      investedAmount: {
        required
      },
      plannedInvestmentDate: {
        required
      }
    }
    if (this.contractInvestments.benefitCondition && this.contractInvestments.benefitCondition.Code !== 'SOZ') {
      contractInvestments.quotaColumnName = {
        required
      }
      contractInvestments.quotaColumnValue = {
        required
      }
      contractInvestments.quotaQuantity = {
        required
      }
      contractInvestments.quotaBeginDate = {
        required
      }
      contractInvestments.quotaEndDate = {
        required
      }
      contractInvestments.unit = {
        required
      }
    }
    let contractDiscounts = {
      columnName: {
        required
      },
      columnValue: {
        required
      },
      discountRate: {
        required
      },
      benefitCondition: {
        required
      },
      quotaColumnName: {
        required
      },
      quotaColumnValue: {
        required
      },
      budgetAmount: {
        required
      },
      quotaQuantity: {
        required
      },
      quotaUnit: {
        required
      },
      branchSharePercent: {
        required
      },
      quotaBeginDate: {
        required
      },
      quotaEndDate: {
        required
      }
    }
    if (this.contractDiscounts.benefitCondition && this.contractDiscounts.benefitCondition.Code === 'SOZ') {
      contractDiscounts.quotaColumnName = {}
      contractDiscounts.quotaColumnValue = {}
      contractDiscounts.quotaQuantity = {}
      contractDiscounts.quotaBeginDate = {}
      contractDiscounts.quotaEndDate = {}
      contractDiscounts.quotaUnit = {}
    }
    let contractFreeItems = {
      contractFocType: {
        required
      },
      columnName: {
        required
      },
      columnValue: {
        required
      },
      quotaColumnName: {
        required
      },
      quotaColumnValue: {
        required
      },
      quotaBeginDate: {
        required
      },
      quotaEndDate: {
        required
      },
      beginDate: {
        required
      },
      quotaQuantity: {
        required
      },
      unit: {
        required
      },
      branchSharePercent: {
        required
      },
      freeQuantityLimit: {
        required
      },
      allowOverLimit: {
        required
      },
      quotaLevelTaken: {
        required
      },
      quotaLevel: {
        required
      }
    }
    if (this.contractFreeItems.contractFocType && this.contractFreeItems.contractFocType.Code === 'HB') {
      contractFreeItems.quotaColumnName = {}
      contractFreeItems.quotaColumnValue = {}
      contractFreeItems.quotaBeginDate = {}
      contractFreeItems.quotaEndDate = {}
      contractFreeItems.quotaQuantity = {}
      contractFreeItems.unit = {}
      contractFreeItems.allowOverLimit = {}
      contractFreeItems.quotaLevelTaken = {}
      contractFreeItems.quotaLevel = {}
    } else {
      contractFreeItems.freeQuantityLimit = {}
    }
    let contractPaymentPlans = {
      benefitCondition: {
        required
      },
      paymentAmount: {
        required
      },
      plannedPaymentDate: {
        required
      },
      branchSharePercent: {
        required
      },
      budgetBeginDate: {
        required
      },
      budgetEndDate: {
        required
      },
      quotaColumnName: {
        required
      },
      quotaColumnValue: {
        required
      },
      quotaQuantity: {
        required
      },
      quotaBeginDate: {
        required
      },
      quotaEndDate: {
        required
      },
      unit: {
        required
      },
      refInvoiceTaken: {},
      refInvoiceNumber: {},
      poNumber: {}
    }
    if (this.contractPaymentPlans.benefitCondition && this.contractPaymentPlans.benefitCondition.Code === 'SOZ') {
      contractPaymentPlans.quotaColumnName = {}
      contractPaymentPlans.quotaColumnValue = {}
      contractPaymentPlans.quotaQuantity = {}
      contractPaymentPlans.unit = {}
      contractPaymentPlans.quotaBeginDate = {}
      contractPaymentPlans.quotaEndDate = {}
    }
    let contractEndorsements = {
      benefitCondition: {
        required
      },
      endorsementGivenType: {
        required
      },
      calculationType: {
        required
      },
      columnName: {
        required
      },
      columnValue: {
        required
      },
      quotaColumnName: {
        required
      },
      quotaColumnValue: {
        required
      },
      quotaQuantity: {
        required
      },
      unit: {
        required
      },
      beginDate: {
        required
      },
      endDate: {
        required
      },
      freeItem: {},
      endrsPaymentType: {
        required
      },
      salesPercentage: {
        required
      },
      branchSharePercent: {
        required
      },
      executionDate: {
        required
      }
    }
    if (this.contractEndorsements.benefitCondition && this.contractEndorsements.benefitCondition.Code === 'SOZ') {
      contractEndorsements.quotaColumnName = {}
      contractEndorsements.quotaColumnValue = {}
      contractEndorsements.quotaQuantity = {}
      contractEndorsements.unit = {}
    }
    if (this.contractEndorsements.endrsPaymentType && this.contractEndorsements.endrsPaymentType.Code === 'FOCP') {
      contractEndorsements.freeItem = {
        required
      }
    }
    let contractCustomPrices = {
      benefitCondition: {
        required
      },
      item: {
        required
      },
      customPrice: {
        required
      },
      branchSharePercent: {
        required
      },
      beginDate: {
        required
      },
      endDate: {
        required
      },
      quotaColumnName: {
        required
      },
      quotaColumnValue: {
        required
      },
      quotaQuantity: {
        required
      },
      quotaBeginDate: {
        required
      },
      quotaEndDate: {
        required
      },
      quotaUnit: {
        required
      }
    }
    if (this.contractCustomPrices.benefitCondition && this.contractCustomPrices.benefitCondition.Code === 'SOZ') {
      contractCustomPrices.quotaColumnName = {}
      contractCustomPrices.quotaColumnValue = {}
      contractCustomPrices.quotaQuantity = {}
      contractCustomPrices.quotaBeginDate = {}
      contractCustomPrices.quotaEndDate = {}
      contractCustomPrices.quotaUnit = {}
    }
    let contractPriceDiscounts = {
      discountAmount: {
        required
      },
      benefitCondition: {
        required
      },
      quotaAmount: {
        required
      },
      budgetAmount: {
        required
      },
      beginDate: {
        required
      }
    }
    if (this.contractPriceDiscounts.benefitCondition && this.contractPriceDiscounts.benefitCondition.Code !== 'KOT') {
      contractPriceDiscounts.quotaAmount = {}
    }

    if (this.contractPriceDiscounts.benefitCondition && this.contractPriceDiscounts.benefitCondition.Code !== 'YYM') {
      contractPriceDiscounts.budgetAmount = {}
    }

    if (this.contractPriceDiscounts.benefitCondition && this.contractPriceDiscounts.benefitCondition.Code === 'YYM') {
      contractPriceDiscounts.discountAmount = {}
    }
    return {
      form: this.insertRules,
      selectedAdditionalCustomer: {
        required
      },
      validDates: {
        contractStartDate: {
          required
        },
        contractEndDate: {
          required
        }
      },
      contractBenefits: contractBenefits,
      contractAssets: {
        asset: {
          required
        },
        plannedServiceDate: {
          required
        }
      },
      contractItems: contractItems,
      contractPriceDiscounts: contractPriceDiscounts,
      contractInvestments: contractInvestments,
      contractDiscounts: contractDiscounts,
      contractFreeItems: contractFreeItems,
      contractPaymentPlans: contractPaymentPlans,
      contractEndorsements: contractEndorsements,
      contractCustomPrices: contractCustomPrices
    }
  },
  watch: {
    lookup: {
      handler (e) {
        this.selectedApproveState = null
        if (e && e.APPROVE_STATE) {
          e.APPROVE_STATE.map(item => {
            if (item.DecimalValue === 2110) {
              this.selectedType('ApproveStateId', item)
              var me = this
              setTimeout(() => {
                me.selectedApproveState = item
              }, 1)
            }
          })
        }
      },
      deep: true,
      immediate: true
    },
    customerContracts (e) {
      this.customerContractList = e
    }
  }
}
</script>
