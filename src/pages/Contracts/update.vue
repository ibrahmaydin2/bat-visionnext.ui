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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code"  :disabled="true"/>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" active>
          <b-row>
            <NextFormGroup item-key="ContractNumber" :error="$v.form.ContractNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.ContractNumber" :readonly="insertReadonly.ContractNumber" />
            </NextFormGroup>
            <!--<NextFormGroup item-key="GroupId" :error="$v.form.GroupId" md="2" lg="2">
              <NextDropdown lookup-key="CONTRACT_GROUP"  @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>-->
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId" md="2" lg="2">
              <NextDropdown v-model="selectedClass" lookup-key="CONTRACT_CLASS"  @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId" md="2" lg="2">
              <NextDropdown v-model="selectedBrand" lookup-key="ITEM_TYPE"  @input="selectedType('BrandId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerFinanceCode" :error="$v.form.CustomerFinanceCode" md="2" lg="2">
              <b-form-input type="text" v-model="form.CustomerFinanceCode" :readonly="insertReadonly.CustomerFinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId" md="2" lg="2">
              <NextDropdown v-model="selectedApproveState" lookup-key="APPROVE_STATE"  @input="selectedType('ApproveStateId', $event)" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId" md="2" lg="2">
              <NextDropdown v-model="selectedContractType"  url="VisionNextContractManagement/api/ContractType/Search" @input="selectedSearchType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="2" lg="2">
              <NextDropdown
                v-model="customer"
                url="VisionNextCustomer/api/Customer/Search"
                @input="selectedCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description,CommercialTitle"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <!--<b-tab :title="$t('insert.contract.otherContract')" v-if="customerContracts.length > 0">
          <b-row>
            <b-col>
              <b-table-simple bordered small>
                <b-thead>
                  <b-th>{{$t('insert.contract.Code')}}</b-th>
                  <b-th>{{$t('insert.contract.ContractNumber')}}</b-th>
                  <b-th>{{$t('insert.contract.Description1')}}</b-th>
                  <b-th>{{$t('insert.contract.ApproveState')}}</b-th>
                  <b-th>{{$t('insert.contract.StatusReason')}}</b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(contract, i) in customerContracts" :key="'dl' + i">
                    <b-td>{{contract.Code}}</b-td>
                    <b-td>{{contract.ContractNumber}}</b-td>
                    <b-td>{{contract.Description1}}</b-td>
                    <b-td>{{contract.ApproveState ? contract.ApproveState.Label : ''}}</b-td>
                    <b-td>{{contract.StatusReason ? contract.StatusReason.Label : ''}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>-->
        <b-tab :title="$t('insert.contract.additionalCustomer')">
          <b-row>
            <NextFormGroup :title="insertTitle.CustomerId" :error="$v.selectedAdditionalCustomer" :required="true" md="3" lg="3">
              <NextDropdown
                url="VisionNextCustomer/api/Customer/Search"
                v-model="selectedAdditionalCustomer" :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description,CommercialTitle"/>
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
                <b-tr v-for="(r, i) in (form.ContractRelatedCustomers ? form.ContractRelatedCustomers.filter(c => c.RecordState != 4) : [])" :key="i">
                  <b-td>{{r.Customer ? r.Customer.Label : r.CustomerName}}</b-td>
                  <b-td class="text-center"><i @click="removeAdditionalCustomer(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.validDates')">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.startDate')" :error="$v.validDates.contractStartDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractStartDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.endDate')" :error="$v.validDates.contractEndDate" :required="true" md="3" lg="3">
              <b-form-datepicker v-model="validDates.contractEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.contract.startDate')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.endDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.ContractValidDates ? form.ContractValidDates.filter(c => c.RecordState != 4) : [])" :key="i">
                  <b-td>{{dateConvertFromTimezone(c.StartDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                  <b-td class="text-center"><i @click="removeValidDate(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractBenefits')">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.BenefitTypeId')" :error="$v.contractBenefits.benefitType" :required="true" md="4" lg="4">
               <NextDropdown v-model="contractBenefits.benefitType" url="VisionNextContractManagement/api/ContractBenefitType/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.BudgetMasterId')" :error="$v.contractBenefits.budgetMaster" :required="!contractBenefits.benefitType || contractBenefits.benefitType.RecordId !== 4" md="4" lg="4">
              <NextDropdown
                :disabled="contractBenefits.benefitType && contractBenefits.benefitType.RecordId === 4"
                v-model="contractBenefits.budgetMaster"
                url="VisionNextBudget/api/BudgetMaster/Search"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" :error="$v.contractBenefits.currency" :required="true" md="4" lg="4">
              <NextDropdown v-model="contractBenefits.currency" url="VisionNextSystem/api/SysCurrency/Search"/>
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
                <b-tr v-for="(c, i) in (form.ContractBenefits ? form.ContractBenefits.filter(c => c.RecordState != 4) : [])" :key="i">
                  <b-td>{{c.BenefitType ? c.BenefitType.Label : c.BenefitTypeName}}</b-td>
                  <b-td>{{c.BudgetMaster ? c.BudgetMaster.Label : c.BudgetMasterName}}</b-td>
                  <b-td>{{c.Currency ? c.Currency.Label : c.CurrencyName}}</b-td>
                  <b-td>{{c.BenefitBudget}}</b-td>
                  <b-td>{{c.TciBreak1 ? c.TciBreak1.Label : c.TciBreak1Name}}</b-td>
                  <b-td class="text-center"><i @click="removeContractBenefits(c)" class="far fa-trash-alt text-danger"></i></b-td>
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
                <b-tr v-for="(c, i) in (form.ContractAssets ? form.ContractAssets.filter(c => c.RecordState != 4) : [])" :key="i">
                  <b-td>{{c.Asset ? c.Asset.Label : c.AssetName}}</b-td>
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
              v-model="contractItems.fieldDescription"
              url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
              :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
              @input="getItemValues($event, 'item')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractItems.fieldValue" :required="true" md="3" lg="3">
              <v-select :disabled="!contractItems.fieldDescription" v-model="contractItems.fieldValue" :options="fieldValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetQuantity')" :error="$v.contractItems.quotaQuantity" :required="true" md="3" lg="3">
              <b-form-input type="number" v-model="contractItems.quotaQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetType')" :error="$v.contractItems.targetType" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractItems.targetType" lookup-key="QUOTA_TYPE" :get-lookup="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.unitDefinitions')" :error="$v.contractItems.unit" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractItems.unit" lookup-key="UNIT" :get-lookup="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.targetAmount')" :error="$v.contractItems.quotaAmount" :required="contractItems.targetType && contractItems.targetType.Code === 'TTR'" md="3" lg="3">
              <b-form-input type="number" v-model="contractItems.quotaAmount" :disabled="!contractItems.targetType || contractItems.targetType.Code === 'MKTR'"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" :error="$v.contractItems.currency" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractItems.currency" url="VisionNextSystem/api/SysCurrency/Search" />
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
                <b-tr v-for="(c, i) in (form.ContractItems ? form.ContractItems.filter(c => c.RecordState !== 4) : [])" :key="i">
                  <b-td>{{c.ColumnNameStr ? c.ColumnNameStr : c.ColumnName}}</b-td>
                  <b-td>{{c.ColumnValueStr ? c.ColumnValueStr : c.ColumnValue}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.QuotaType ? c.QuotaType.Label : c.QuotaTypeName}}</b-td>
                  <b-td>{{c.Unit ? c.Unit.Label : c.UnitName}}</b-td>
                  <b-td>{{c.QuotaAmount}}</b-td>
                  <b-td>{{c.Currency ? c.Currency.Label : c.CurrencyName}}</b-td>
                  <b-td class="text-center"><i @click="removeContractItems(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPriceDiscounts')" v-if="showPriceDiscount">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractPriceDiscounts.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractPriceDiscounts.benefitCondition" lookup-key="CONTRACT_BENEFIT_TYPE" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.discountAmount')" :error="$v.contractPriceDiscounts.discountAmount" :required="true" md="3" lg="3">
              <b-form-input
                :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code === 'YYM'"
                type="number" v-model="contractPriceDiscounts.discountAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaAmount')" :error="$v.contractPriceDiscounts.quotaAmount" :required="true" md="3" lg="3">
              <b-form-input
              :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code === 'YYM'
                || contractPriceDiscounts.benefitCondition.Code === 'SOZ'"
                type="number" v-model="contractPriceDiscounts.quotaAmount" />
            </NextFormGroup>
             <NextFormGroup :title="$t('insert.contract.unitDefinitions')" md="3" lg="3">
              <NextDropdown :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code === 'YYM'
                || contractPriceDiscounts.benefitCondition.Code === 'SOZ'"
                v-model="contractPriceDiscounts.quotaUnit" lookup-key="UNIT" :get-lookup="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.budgetAmount')" md="3" lg="3">
              <b-form-input
              :disabled="!contractPriceDiscounts.benefitCondition
              || contractPriceDiscounts.benefitCondition.Code !== 'YYM'" type="number" v-model="contractPriceDiscounts.budgetAmount" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" md="3" lg="3">
              <NextDropdown
                v-model="contractPriceDiscounts.quotaColumnName"
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'quota')"
                :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code === 'YYM'
                || contractPriceDiscounts.benefitCondition.Code === 'SOZ'" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnValue')" md="3" lg="3">
              <v-select :disabled="!contractPriceDiscounts.quotaColumnName" v-model="contractPriceDiscounts.quotaColumnValue" :options="quotaValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaBeginDate')" md="3" lg="3">
              <b-form-datepicker
              :disabled="!contractPriceDiscounts.benefitCondition" v-model="contractPriceDiscounts.quotaBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaEndDate')" md="3" lg="3">
              <b-form-datepicker
              :disabled="!contractPriceDiscounts.benefitCondition
                || contractPriceDiscounts.benefitCondition.Code !== 'KOT'"
              v-model="contractPriceDiscounts.quotaEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.branchSharePercent')" md="3" lg="3">
              <b-form-input
              :disabled="!contractPriceDiscounts.benefitCondition" type="number" v-model="contractPriceDiscounts.branchSharePercent" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.itemFormula')" md="3" lg="3">
              <NextDropdown :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code !== 'YYM'" v-model="contractPriceDiscounts.itemFormula" url="VisionNextContractManagement/api/ItemFormula/Search" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.currency')" md="3" lg="3">
              <NextDropdown
              :disabled="!contractPriceDiscounts.benefitCondition || contractPriceDiscounts.benefitCondition.Code === 'YYM'"
              v-model="contractPriceDiscounts.currency" url="VisionNextSystem/api/SysCurrency/Search" />
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
                <b-th><span>{{$t('insert.contract.branchSharePercent')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.itemFormula')}}</span></b-th>
                <b-th><span>{{$t('insert.contract.currency')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.ContractPriceDiscounts ? form.ContractPriceDiscounts.filter(c => c.RecordState !== 4): [])" :key="i">
                  <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : c.BenefitConditionName}}</b-td>
                  <b-td>{{c.DiscountAmount}}</b-td>
                  <b-td>{{c.QuotaAmount}}</b-td>
                  <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : c.QuotaUnitName}}</b-td>
                  <b-td>{{c.BudgetAmount}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr ? c.QuotaColumnNameStr : c.QuotaColumnName}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr ? c.QuotaColumnValueStr : c.QuotaColumnValue}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{c.ItemFormula ? c.ItemFormula.Label : c.ItemFormulaName}}</b-td>
                  <b-td>{{c.Currency ? c.Currency.Label : c.CurrencyName}}</b-td>
                  <b-td class="text-center"><i @click="removeContractPriceDiscounts(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractInvestments')" v-if="showInvestments">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractInvestments.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractInvestments.benefitCondition" lookup-key="CONTRACT_BENEFIT_TYPE" :get-lookup="true" />
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
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
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
              <NextDropdown :disabled="contractInvestments.benefitCondition && contractInvestments.benefitCondition.Code === 'SOZ'" v-model="contractInvestments.unit" lookup-key="UNIT" :get-lookup="true"/>
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
                <b-tr v-for="(c, i) in (form.ContractInvestments ? form.ContractInvestments.filter(c => c.RecordState !== 4): [])" :key="i">
                  <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : c.BenefitConditionName}}</b-td>
                  <b-td>{{c.InvestedAmount}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedInvestmentDate)}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr ? c.QuotaColumnNameStr : c.QuotaColumnName}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr ? c.QuotaColumnValueStr : c.QuotaColumnValue}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.Unit ? c.Unit.Label : c.UnitName}}</b-td>
                  <b-td>{{c.Description1}}</b-td>
                  <b-td class="text-center"><i @click="removeContractInvestments(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractDiscounts')" v-if="showDiscounts">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractDiscounts.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractDiscounts.benefitCondition" lookup-key="CONTRACT_BENEFIT_TYPE" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldDescription')" :error="$v.contractDiscounts.columnName" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="contractDiscounts.columnName"
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
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
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
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
              <NextDropdown :disabled="contractDiscounts.benefitCondition && contractDiscounts.benefitCondition.Code === 'SOZ'" v-model="contractDiscounts.quotaUnit" lookup-key="UNIT" :get-lookup="true"/>
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
                <b-tr v-for="(c, i) in (form.ContractDiscounts ? form.ContractDiscounts.filter(c => c.RecordState !== 4) : [])" :key="i">
                  <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : c.BenefitConditionName}}</b-td>
                  <b-td>{{c.ColumnNameStr ? c.ColumnNameStr : c.ColumnName}}</b-td>
                  <b-td>{{c.ColumnValueStr ? c.ColumnValueStr : c.ColumnValue}}</b-td>
                  <b-td>{{c.DiscountRate}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr ? c.QuotaColumnNameStr : c.QuotaColumnName}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr ? c.QuotaColumnValueStr : c.QuotaColumnValue}}</b-td>
                  <b-td>{{c.BudgetAmount}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.QuotaUnit ? c.QuotaUnit.Label : c.QuotaUnitName}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td class="text-center"><i @click="removeContractDiscounts(c)" class="far fa-trash-alt text-danger"></i></b-td>
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
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
                :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
                @input="getItemValues($event, 'freeItem')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.fieldValue')" :error="$v.contractFreeItems.columnValue" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" md="3" lg="3">
              <v-select :disabled="!contractFreeItems.columnName" v-model="contractFreeItems.columnValue" :options="freeItems" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaColumnName')" :error="$v.contractFreeItems.quotaColumnName" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <NextDropdown
                v-model="contractFreeItems.quotaColumnName"
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
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
              <NextDropdown :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" v-model="contractFreeItems.unit" lookup-key="UNIT" :get-lookup="true"/>
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
            <NextFormGroup :title="$t('insert.contract.quotaLevelTaken')" :error="$v.contractFreeItems.quotaLevelTaken" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <b-form-input :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" type="number" v-model="contractFreeItems.quotaLevelTaken" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.contract.quotaLevel')" :error="$v.contractFreeItems.quotaLevel" :required="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code !== 'HB'" md="3" lg="3">
              <b-form-input :disabled="contractFreeItems.contractFocType && contractFreeItems.contractFocType.Code === 'HB'" type="number" v-model="contractFreeItems.quotaLevel" />
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
                <b-tr v-for="(c, i) in (form.ContractFreeItems ? form.ContractFreeItems.filter(c => c.RecordState !== 4) : [])" :key="i">
                  <b-td>{{c.ContractFocType ? c.ContractFocType.Label : c.ContractFocTypeName}}</b-td>
                  <b-td>{{c.ColumnName}}</b-td>
                  <b-td>{{c.ColumnValue}}</b-td>
                  <b-td>{{c.QuotaColumnName}}</b-td>
                  <b-td>{{c.QuotaColumnValue}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.BeginDate}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{c.Unit ? c.Unit.Label : c.UnitName}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{c.FreeQuantityLimit}}</b-td>
                  <b-td>{{c.AllowOverLimit === 1 ? $t('insert.active') : $t('insert.passive')}}</b-td>
                  <b-td>{{c.QuotaLevelTaken}}</b-td>
                  <b-td>{{c.QuotaLevel}}</b-td>
                  <b-td class="text-center"><i @click="removeContractFreeItems(c)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.contract.contractPaymentPlans')" v-if="showPaymentPlans">
          <b-row>
            <NextFormGroup :title="$t('insert.contract.benefitCondition')" :error="$v.contractPaymentPlans.benefitCondition" :required="true" md="3" lg="3">
              <NextDropdown v-model="contractPaymentPlans.benefitCondition" lookup-key="CONTRACT_BENEFIT_TYPE" :get-lookup="true" />
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
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
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
              <NextDropdown :disabled="contractPaymentPlans.benefitCondition && contractPaymentPlans.benefitCondition.Code === 'SOZ'" v-model="contractPaymentPlans.unit" lookup-key="UNIT" :get-lookup="true"/>
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
                <b-tr v-for="(c, i) in (form.ContractPaymentPlans ? form.ContractPaymentPlans.filter(c => c.RecordState !== 4) : [])" :key="i">
                  <b-td>{{c.BenefitCondition ? c.BenefitCondition.Label : c.BenefitConditionName}}</b-td>
                  <b-td>{{c.PaymentAmount}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.PlannedPaymentDate)}}</b-td>
                  <b-td>{{c.BranchSharePercent}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BudgetBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.BudgetEndDate)}}</b-td>
                  <b-td>{{c.QuotaColumnNameStr ? c.QuotaColumnNameStr : c.QuotaColumnName}}</b-td>
                  <b-td>{{c.QuotaColumnValueStr ? c.QuotaColumnValueStr : c.QuotaColumnValue}}</b-td>
                  <b-td>{{c.QuotaQuantity}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaBeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.QuotaEndDate)}}</b-td>
                  <b-td>{{c.Unit ? c.Unit.Label : c.UnitName}}</b-td>
                  <b-td>{{c.RefInvoiceTaken === 1 ? $t('insert.active') : $t('insert.passive')}}</b-td>
                  <b-td>{{c.RefInvoiceNumber}}</b-td>
                  <b-td>{{c.PoNumber}}</b-td>
                  <b-td class="text-center"><i @click="removeContractPaymentPlans(c)" class="far fa-trash-alt text-danger"></i></b-td>
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
import mixin from '../../mixins/update'
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
        ContractPaymentPlans: []
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
      selectedApproveState: null,
      selectedClass: null,
      selectedBrand: null,
      selectedContractType: null,
      customer: null,
      showAssets: false,
      fieldValues: [],
      contractItems: {
        fieldDescription: null,
        fieldValue: null,
        quotaQuantity: null,
        targetType: null,
        unit: null,
        quotaAmount: null,
        currency: null
      },
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
        branchSharePercent: null,
        itemFormula: null,
        currency: null
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
        branchSharePercent: null,
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
        branchSharePercent: null,
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
        branchSharePercent: null,
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
      }
    }
  },
  computed: {
    ...mapState(['customerContracts'])
  },
  mounted () {
    this.getData().then(() => {
      this.setData()
    })
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.selectedApproveState = rowData.ApproveState
      this.selectedClass = rowData.Class
      this.selectedBrand = rowData.Brand
      this.selectedContractType = this.convertLookupValueToSearchValue(rowData.Type)
      this.customer = this.convertLookupValueToSearchValue(rowData.Customer)
      this.showAssets = this.form.ContractBenefits.filter(c => c.BenefitTypeId === 4 && c.RecordState !== 4).length > 0
      this.showPriceDiscount = this.form.ContractBenefits.some(c => c.BenefitTypeId === 6)
      this.showInvestments = this.form.ContractBenefits.some(c => c.BenefitTypeId === 5)
      this.showDiscounts = this.form.ContractBenefits.some(c => c.BenefitTypeId === 1)
      this.showFreeItems = this.form.ContractBenefits.some(c => c.BenefitTypeId === 2)
      this.showPaymentPlans = this.form.ContractBenefits.some(c => c.BenefitTypeId === 3)
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
      } else {
        this.updateData()
      }
    },
    selectedCustomer (e) {
      if (e) {
        this.form.CustomerId = e.RecordId
        this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextContractManagement/api/Contract/Search', name: 'customerContracts', andConditionModel: { customerIds: [e.RecordId] }})
      } else {
        this.form.CustomerId = null
        this.$store.commit('setCustomerContracts', [])
      }
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
      if (item.RecordId > 0) {
        this.form.ContractRelatedCustomers[this.form.ContractRelatedCustomers.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractRelatedCustomers.splice(this.form.ContractRelatedCustomers.indexOf(item), 1)
      }
    },
    addValidDate () {
      this.$v.validDates.$touch()
      if (this.$v.validDates.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let startDate = this.validDates.contractStartDate
      let endDate = this.validDates.contractEndDate
      let filteredArr = this.form.ContractValidDates.filter(i => i.StartDate === startDate &&
      i.EndDate === endDate)
      if (filteredArr.length > 0) {
        this.$toasted.show(this.$t('insert.sameRecordError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      if (startDate > endDate) {
        this.$toasted.show(this.$t('insert.startDateLessEndDate'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractValidDates.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        StartDate: startDate,
        EndDate: endDate
      })
      this.validDates = {}
      this.$v.validDates.$reset()
    },
    removeValidDate (item) {
      if (item.RecordId > 0) {
        this.form.ContractValidDates[this.form.ContractValidDates.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractValidDates.splice(this.form.ContractValidDates.indexOf(item), 1)
      }
    },
    addContractBenefits () {
      this.$v.contractBenefits.$touch()
      if (this.$v.contractBenefits.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.ContractBenefits.filter(i => i.BenefitTypeId === this.contractBenefits.benefitType.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.ContractBenefits.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        BenefitTypeId: this.contractBenefits.benefitType.RecordId,
        BenefitTypeName: this.contractBenefits.benefitType.Description1,
        BenefitBudget: this.contractBenefits.benefitBudget,
        BudgetMasterId: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.RecordId : undefined,
        BudgetMasterName: this.contractBenefits.budgetMaster ? this.contractBenefits.budgetMaster.Description1 : '',
        CurrencyId: this.contractBenefits.currency.RecordId,
        CurrencyName: this.contractBenefits.currency.Description1,
        TciBreak1Id: this.contractBenefits.tciBreak1.DecimalValue,
        TciBreak1Name: this.contractBenefits.tciBreak1.Label,
        usedAmount: 0
      })
      this.contractBenefits = {}
      this.$v.contractBenefits.$reset() 
      this.showAssets = this.form.ContractBenefits.some(c => c.BenefitTypeId === 4 && c.RecordState !== 4)
      this.showPriceDiscount = this.form.ContractBenefits.some(c => c.BenefitTypeId === 6 && c.RecordState !== 4)
      this.showInvestments = this.form.ContractBenefits.some(c => c.BenefitTypeId === 5 && c.RecordState !== 4)
      this.showDiscounts = this.form.ContractBenefits.some(c => c.BenefitTypeId === 1 && c.RecordState !== 4)
      this.showFreeItems = this.form.ContractBenefits.some(c => c.BenefitTypeId === 2 && c.RecordState !== 4)
      this.showPaymentPlans = this.form.ContractBenefits.some(c => c.BenefitTypeId === 3 && c.RecordState !== 4)
    },
    removeContractBenefits (item) {
      if (item.RecordId > 0) {
        this.form.ContractBenefits[this.form.ContractBenefits.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractBenefits.splice(this.form.ContractBenefits.indexOf(item), 1)
      }
      this.showAssets = this.form.ContractBenefits.some(c => c.BenefitTypeId === 4 && c.RecordState !== 4)
      this.showPriceDiscount = this.form.ContractBenefits.some(c => c.BenefitTypeId === 6 && c.RecordState !== 4)
      this.showInvestments = this.form.ContractBenefits.some(c => c.BenefitTypeId === 5 && c.RecordState !== 4)
      this.showDiscounts = this.form.ContractBenefits.some(c => c.BenefitTypeId === 1 && c.RecordState !== 4)
      this.showFreeItems = this.form.ContractBenefits.some(c => c.BenefitTypeId === 2 && c.RecordState !== 4)
      this.showPaymentPlans = this.form.ContractBenefits.some(c => c.BenefitTypeId === 3 && c.RecordState !== 4)
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
      if (item.RecordId > 0) {
        this.form.ContractAssets[this.form.ContractAssets.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractAssets.splice(this.form.ContractAssets.indexOf(item), 1)
      }
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
          this.contractDiscounts.quıtaColumnValue = undefined
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
      }
      if (value) {
        this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
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
      this.form.ContractItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        SalesQuantity: 0,
        SalesAmount: 0,
        TableName: 'T-ITEM',
        ColumnName: this.contractItems.fieldDescription.Code,
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
        CurrencyName: this.contractItems.currency.Description1
      })
      this.contractItems = {}
      this.$v.contractItems.$reset()
    },
    removeContractItems (item) {
      if (item.RecordId > 0) {
        this.form.ContractItems[this.form.ContractItems.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractItems.splice(this.form.ContractItems.indexOf(item), 1)
      }
    },
    addContractPriceDiscounts () {
      this.$v.contractPriceDiscounts.$touch()
      if (this.$v.contractPriceDiscounts.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractPriceDiscounts.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        DiscountAmount: this.contractPriceDiscounts.discountAmount,
        BenefitConditionId: this.contractPriceDiscounts.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractPriceDiscounts.benefitCondition.Label,
        QuotaAmount: this.contractPriceDiscounts.quotaAmount,
        QuotaUnitId: this.contractPriceDiscounts.quotaUnit ? this.contractPriceDiscounts.quotaUnit.DecimalValue : null,
        QuotaUnitName: this.contractPriceDiscounts.quotaUnit ? this.contractPriceDiscounts.quotaUnit.Label : null,
        BudgetAmount: this.contractPriceDiscounts.budgetAmount,
        QuotaColumnName: this.contractPriceDiscounts.quotaColumnName ? this.contractPriceDiscounts.quotaColumnName.Code : null,
        QuotaColumnNameStr: this.contractPriceDiscounts.quotaColumnName ? this.contractPriceDiscounts.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractPriceDiscounts.quotaColumnValue ? this.contractPriceDiscounts.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractPriceDiscounts.quotaColumnValue ? this.contractPriceDiscounts.quotaColumnValue.Label : null,
        QuotaBeginDate: this.contractPriceDiscounts.quotaBeginDate,
        QuotaEndDate: this.contractPriceDiscounts.quotaEndDate,
        BranchSharePercent: this.contractPriceDiscounts.branchSharePercent,
        ItemFormulaId: this.contractPriceDiscounts.itemFormula ? this.contractPriceDiscounts.itemFormula.RecordId : null,
        ItemFormulaName: this.contractPriceDiscounts.itemFormula ? this.contractPriceDiscounts.itemFormula.Description1 : null,
        CurrencyId: this.contractPriceDiscounts.currency ? this.contractPriceDiscounts.currency.RecordId : null,
        CurrencyName: this.contractPriceDiscounts.currency ? this.contractPriceDiscounts.currency.Description1 : null
      })
      this.contractPriceDiscounts = {}
      this.$v.contractPriceDiscounts.$reset()
    },
    removeContractPriceDiscounts (item) {
      if (item.RecordId > 0) {
        this.form.ContractPriceDiscounts[this.form.ContractPriceDiscounts.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractPriceDiscounts.splice(this.form.ContractPriceDiscounts.indexOf(item), 1)
      }
    },
    addContractInvestments () {
      this.$v.contractInvestments.$touch()
      if (this.$v.contractInvestments.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractInvestments.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        InvestedAmount: this.contractInvestments.investedAmount,
        PlannedInvestmentDate: this.contractInvestments.plannedInvestmentDate,
        BenefitConditionId: this.contractInvestments.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractInvestments.benefitCondition.Label,
        QuotaColumnName: this.contractInvestments.quotaColumnName ? this.contractInvestments.quotaColumnName.Code : null,
        QuotaColumnNameStr: this.contractInvestments.quotaColumnName ? this.contractInvestments.quotaColumnName.Label : null,
        QuotaColumnValue: this.contractInvestments.quotaColumnValue ? this.contractInvestments.quotaColumnValue.DecimalValue : null,
        QuotaColumnValueStr: this.contractInvestments.quotaColumnValue ? this.contractInvestments.quotaColumnValue.Label : null,
        QuotaQuantity: this.contractInvestments.quotaQuantity,
        QuotaBeginDate: this.contractInvestments.quotaBeginDate,
        QuotaEndDate: this.contractInvestments.quotaEndDate,
        UnitId: this.contractInvestments.unit ? this.contractInvestments.unit.DecimalValue : null,
        UnitName: this.contractInvestments.unit ? this.contractInvestments.unit.Label : null,
        Description1: this.contractInvestments.description1
      })
      this.contractInvestments = {}
      this.$v.contractInvestments.$reset()
    },
    removeContractInvestments (item) {
      if (item.RecordId > 0) {
        this.form.ContractInvestments[this.form.ContractInvestments.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractInvestments.splice(this.form.ContractInvestments.indexOf(item), 1)
      }
    },
    addContractDiscounts () {
      this.$v.contractDiscounts.$touch()
      if (this.$v.contractDiscounts.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractDiscounts.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        TableName: 'T-ITEM',
        QuotaTableName: 'T-ITEM',
        ColumnName: this.contractDiscounts.columnName ? this.contractDiscounts.columnName.Code : null,
        ColumnNameStr: this.contractDiscounts.columnName ? this.contractDiscounts.columnName.Label : null,
        ColumnValue: this.contractDiscounts.columnValue ? this.contractDiscounts.columnValue.DecimalValue : null,
        ColumnValueStr: this.contractDiscounts.columnValue ? this.contractDiscounts.columnValue.Label : null,
        DiscountRate: this.contractDiscounts.discountRate,
        BenefitConditionId: this.contractDiscounts.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractDiscounts.benefitCondition.Label,
        QuotaColumnName: this.contractDiscounts.quotaColumnName ? this.contractDiscounts.quotaColumnName.Code : null,
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
      })
      this.contractDiscounts = {}
      this.$v.contractDiscounts.$reset()
    },
    removeContractDiscounts (item) {
      if (item.RecordId > 0) {
        this.form.ContractDiscounts[this.form.ContractDiscounts.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractDiscounts.splice(this.form.ContractDiscounts.indexOf(item), 1)
      }
    },
    addContractFreeItems () {
      this.$v.contractFreeItems.$touch()
      if (this.$v.contractFreeItems.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractFreeItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        TableName: 'T-ITEM',
        QuotaTableName: 'T-ITEM',
        BenefitKindId: 2271080,
        FocPaymentTypeId: 71,
        ContractFocTypeId: this.contractFreeItems.contractFocType.DecimalValue,
        ContractFocTypeName: this.contractFreeItems.contractFocType.Label,
        ColumnName: this.contractFreeItems.columnName ? this.contractFreeItems.columnName.Code : null,
        ColumnNameStr: this.contractFreeItems.columnName ? this.contractFreeItems.columnName.Label : null,
        ColumnValue: this.contractFreeItems.columnValue ? this.contractFreeItems.columnValue.DecimalValue : null,
        ColumnValueStr: this.contractFreeItems.columnValue ? this.contractFreeItems.columnValue.Label : null,
        QuotaColumnName: this.contractFreeItems.quotaColumnName ? this.contractFreeItems.quotaColumnName.Code : null,
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
      })
      this.contractFreeItems = {}
      this.$v.contractFreeItems.$reset()
    },
    removeContractFreeItems (item) {
      if (item.RecordId > 0) {
        this.form.ContractFreeItems[this.form.ContractFreeItems.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractFreeItems.splice(this.form.ContractFreeItems.indexOf(item), 1)
      }
    },
    addContractPaymentPlans () {
      this.$v.contractPaymentPlans.$touch()
      if (this.$v.contractPaymentPlans.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.ContractPaymentPlans.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        QuotaTableName: 'T-ITEM',
        BenefitConditionId: this.contractPaymentPlans.benefitCondition.DecimalValue,
        BenefitConditionName: this.contractPaymentPlans.benefitCondition.Label,
        PaymentAmount: this.contractPaymentPlans.paymentAmount,
        PlannedPaymentDate: this.contractPaymentPlans.plannedPaymentDate,
        BranchSharePercent: this.contractPaymentPlans.branchSharePercent,
        BudgetBeginDate: this.contractPaymentPlans.budgetBeginDate,
        BudgetEndDate: this.contractPaymentPlans.budgetEndDate,
        QuotaColumnName: this.contractPaymentPlans.quotaColumnName ? this.contractPaymentPlans.quotaColumnName.Code : null,
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
      })
      this.contractPaymentPlans = {}
      this.$v.contractPaymentPlans.$reset()
    },
    removeContractPaymentPlans (item) {
      if (item.RecordId > 0) {
        this.form.ContractPaymentPlans[this.form.ContractPaymentPlans.indexOf(item)].RecordState = 4
      } else {
        this.form.ContractPaymentPlans.splice(this.form.ContractPaymentPlans.indexOf(item), 1)
      }
    }
  },
  validations () {
    let contractBenefits = {
      benefitType: {
        required
      },
      budgetMaster: { },
      currency: {
        required
      },
      benefitBudget: {},
      tciBreak1: {
        required
      }
    }
    if (this.contractBenefits.benefitType && this.contractBenefits.benefitType.RecordId !== 4) {
      contractBenefits.budgetMaster = {
        required
      }
      contractBenefits.benefitBudget = {
        required
      }
    }
    let contractItems = {
      fieldDescription: {
        required
      },
      fieldValue: {
        required
      },
      quotaQuantity: {
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
    let contractInvestments = {
      benefitCondition: {
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
      contractPriceDiscounts: {
        discountAmount: {
          required
        },
        benefitCondition: {
          required
        },
        quotaAmount: {
          required
        }
      },
      contractInvestments: contractInvestments,
      contractDiscounts: contractDiscounts,
      contractFreeItems: contractFreeItems,
      contractPaymentPlans: contractPaymentPlans
    }
  }
}
</script>
