<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
        <NextFormGroup item-key="Code" :error="$v.form.Code">
          <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
        </NextFormGroup>
        <NextFormGroup item-key="Description1" :error="$v.form.Description1">
          <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
        </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
          <NextCheckBox v-model="form.StatusId" type="number" toggle/>
        </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.discount.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="DiscountBeginDate" :error="$v.form.DiscountBeginDate">
              <b-form-datepicker v-model="form.DiscountBeginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountEndDate" :error="$v.form.DiscountEndDate">
              <b-form-datepicker v-model="form.DiscountEndDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountTypeId" :error="$v.form.DiscountTypeId">
              <v-select :options="discountTypes" @input="selectedSearchType('DiscountTypeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountKindId" :error="$v.form.DiscountKindId">
              <v-select :options="discountKinds" @input="selectedSearchType('DiscountKindId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
              <b-form-input type="text" v-model="form.MaxValue" :disabled='!form.ApplyToTimes' :readonly="insertReadonly.MaxValue" />
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <v-select
                v-model='branchCriteria'
                :options="lookup.BRANCH_CRITERIA"
                @input="selectedType('BranchCriteriaId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <v-select v-model='customerCriteria' :options="lookup.CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <v-select v-model='routeCriteria' :options="lookup.ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentCriteriaId" :error="$v.form.PaymentCriteriaId">
              <v-select v-model='paymentCriteria' :options="lookup.PAYMENT_CRITERIA" @input="selectedType('PaymentCriteriaId', $event)" label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetId" :error="$v.form.BudgetId">
              <v-select :disabled="!form.UseBudget" :options="budgets" @input="selectedSearchType('BudgetId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input :disabled="!form.UseBudget" type="text" v-model="form.BudgetAmount" :readonly="insertReadonly.BudgetAmount" />
            </NextFormGroup>
            <!-- <NextFormGroup item-key="BudgetConsumption" :error="$v.form.BudgetConsumption">
              <b-form-input type="text" v-model="form.BudgetConsumption" :readonly="insertReadonly.BudgetConsumption" />
            </NextFormGroup> -->
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <b-form-input type="text" v-model="ApproveStateLabel" readonly />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountCategoryId" :error="$v.form.DiscountCategoryId">
              <v-select :options="discountCategories" @input="selectedSearchType('DiscountCategoryId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountPayback" :error="$v.form.DiscountPayback">
              <b-form-input type="text" v-model="form.DiscountPayback" :readonly="insertReadonly.DiscountPayback" />
            </NextFormGroup>
            <NextFormGroup item-key="MaxUsage" :error="$v.form.MaxUsage">
              <b-form-input type="text" v-model="form.MaxUsage" :readonly="insertReadonly.MaxUsage" />
            </NextFormGroup>
            <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
              <v-select
                :options="lookup.TCI_BREAKDOWN"
                @input="selectedType('TciBreak1Id', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="UseBudget" :error="$v.form.UseBudget">
              <NextCheckBox v-model="form.UseBudget" type="number" toggle @input="useBudgetEvent($event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsCascade" :error="$v.form.IsCascade">
              <b-form-checkbox v-model="form.IsCascade" :disabled='!(form.DiscountKindId === 2)' name="check-button" switch>
                {{(form.IsCascade) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </NextFormGroup>
            <NextFormGroup item-key="UseMultiGiven" :error="$v.form.UseMultiGiven">
              <b-form-checkbox v-model="form.UseMultiGiven" :disabled='!(form.DiscountKindId === 2)' name="check-button" switch>
                {{(form.UseMultiGiven) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </NextFormGroup>
            <NextFormGroup item-key="IsMandatory" :error="$v.form.IsMandatory">
              <b-form-checkbox v-model="form.IsMandatory" name="check-button" switch>
                {{(form.IsMandatory) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </NextFormGroup>
            <NextFormGroup item-key="IsDoubleScore" :error="$v.form.IsDoubleScore">
              <b-form-checkbox v-model="form.IsDoubleScore" name="check-button" switch>
                {{(form.IsDoubleScore) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </NextFormGroup>
            <NextFormGroup item-key="ApplyToTimes" :error="$v.form.ApplyToTimes" md="4" lg="3">
              <NextCheckBox v-model="form.ApplyToTimes" type="number" toggle />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountGivens')" @click="ColumnControl()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.columnName')" :error="$v.discountGivenColumnName" :required="columnNameValid">
              <v-select v-model="discountGivenColumnName" :options="discountGivensColumnNames" :disabled="!columnNameValid" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')" :error="$v.discountGivenColumnValue" :required="columnNameValid">
              <v-select v-model="discountGivenColumnValue" :options="discountGivensColumnValues" :disabled="!columnNameValid" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.givenQuantity')" :error="$v.discountGiven.GivenQuantity" required>
              <b-form-input type="text" v-model="discountGiven.GivenQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.discountRate')" :error="$v.discountGiven.DiscountRate" :required="discountRateValid">
              <b-form-input type="text" v-model="discountGiven.DiscountRate" :disabled="!discountRateValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.discountTotal')" :error="$v.discountGiven.DiscountTotal" :required="discountTotalValid">
              <b-form-input type="text" v-model="discountGiven.DiscountTotal" :disabled="!discountTotalValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.startValue')" :error="$v.discountGiven.StartValue" :required="startValueValid">
              <b-form-input type="text" v-model="discountGiven.StartValue" :disabled="!startValueValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.finishValue')" :error="$v.discountGiven.FinishValue" :required="finishValueValid">
              <b-form-input type="text" v-model="discountGiven.FinishValue" :disabled="!finishValueValid" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountGiven()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
           <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.givenQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.discountRate')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.discountTotal')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.startValue')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.finishValue')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in form.DiscountGivens" :key="i">
                    <b-td>{{w.ColumnNameStr}}</b-td>
                    <b-td>{{w.ColumnValueStr}}</b-td>
                    <b-td>{{w.GivenQuantity}}</b-td>
                    <b-td>{{w.DiscountRate}}</b-td>
                    <b-td>{{w.DiscountTotal}}</b-td>
                    <b-td>{{w.StartValue}}</b-td>
                    <b-td>{{w.FinishValue}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountGiven(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountTakens')">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.columnName')" :error="$v.discountTakenColumnName" required>
              <v-select v-model="discountTakenColumnName" :options="discountTakensColumnNames" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')" :error="$v.discountTakenColumnValue" required>
              <v-select v-model="discountTakenColumnValue" :options="discountTakensColumnValues" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.takenQuantity')" :error="$v.discountTaken.TakenQuantity" :required="takenQuantityValid">
              <b-form-input type="text" v-model="discountTaken.TakenQuantity" :disabled="!takenQuantityValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.minTakenAmount')" :error="$v.discountTaken.MinTakenAmount" :required="minTakenAmountValid">
              <b-form-input type="text" v-model="discountTaken.MinTakenAmount" :disabled="!minTakenAmountValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.endTakenQuantity')" :error="$v.discountTaken.EndTakenQuantity" :required="endTakenQuantityValid">
              <b-form-input type="text" v-model="discountTaken.EndTakenQuantity" :disabled="!endTakenQuantityValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.maxTakenAmount')" :error="$v.discountTaken.MaxTakenAmount" :required="maxTakenAmountValid">
              <b-form-input type="text" v-model="discountTaken.MaxTakenAmount" :disabled="!maxTakenAmountValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.minTakenQuantity')" :error="$v.discountTaken.MinTakenQuantity" :required="minTakenQuantityValid">
              <b-form-input type="text" v-model="discountTaken.MinTakenQuantity" :disabled="!minTakenQuantityValid" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountTaken()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.takenQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.minTakenAmount')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.endTakenQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.maxTakenAmount')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.minTakenQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in form.DiscountTakens" :key="i">
                    <b-td>{{w.ColumnNameStr}}</b-td>
                    <b-td>{{w.ColumnValueStr}}</b-td>
                    <b-td>{{w.TakenQuantity}}</b-td>
                    <b-td>{{w.MinTakenAmount}}</b-td>
                    <b-td>{{w.EndTakenQuantity}}</b-td>
                    <b-td>{{w.MaxTakenAmount}}</b-td>
                    <b-td>{{w.MinTakenQuantity}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountTaken(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomers')" v-if="customerTabValid" @click="DiscountCustomersValid()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerCode')" :error="$v.discountCustomer.CustomerId" :required="!customerValid">
              <v-select v-model="customer" :options="customers" @search="searchCustomer" label="Code" :disabled='customerValid' :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountCustomer.CustomerName" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountCustomer.CommercialTitle" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountCustomer.LocationName" :disabled="true"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='customerValid' @click="addDiscountCustomer()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.customerCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.commercialTitle')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.location')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in form.DiscountCustomers" :key="i">
                    <b-td>{{w.CustomerCode}}</b-td>
                    <b-td>{{w.CustomerName}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.LocationName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountExcludedCustomers')" @click="DiscountCustomersValid()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerCode')" :error="$v.discountExcludedCustomer.CustomerId" :required="!customerValid">
              <v-select v-model="excludedCustomer" :options="customers" @search="searchCustomer" label="Code" :disabled='customerValid' :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountExcludedCustomer.CustomerName" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountExcludedCustomer.CommercialTitle" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountExcludedCustomer.LocationName" :disabled="true"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='customerValid' @click="addDiscountExcludedCustomer()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.customerCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.commercialTitle')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.location')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in form.DiscountExcludedCustomers" :key="i">
                    <b-td>{{w.CustomerCode}}</b-td>
                    <b-td>{{w.CustomerName}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.LocationName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountExcludedCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.customerCriterias')" v-if="customerCriterTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.columnName')" :error="$v.customerCriteriaColumnName" :required="customerCriterTabValid">
              <v-select v-model="customerCriteriaColumnName" :options="customerCriteriaColumnNames" label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')" :error="$v.customerCriteriaColumnValue" :required="customerCriterTabValid">
              <v-select v-model="customerCriteriaColumnValue" :options="customerCriteriaColumnValues"  label="Label"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addCustomerCriteria()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.columnName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.columnValue')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountDetailsCustomerCriterias" :key="i">
                    <b-td>{{w.ColumnNameStr}}</b-td>
                    <b-td>{{w.ColumnValueStr}}</b-td>
                    <b-td class="text-center"><i @click="removeCustomerCriteria(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.branchs')" v-if="branchTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.branchCode')" :error="$v.discountDetailsBranch.BranchId" :required="branchTabValid">
              <v-select :disabled='!form.BranchCriteriaId' v-model="branch" :options="branchs" @search="searchBranch" label="Code" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.branchName')">
              <b-form-input type="text" v-model="discountDetailsBranch.BranchName" :disabled="true"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountDetailBranchs()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.branchCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.branchName')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountDetailsBranchs" :key="i">
                    <b-td>{{w.BranchCode}}</b-td>
                    <b-td>{{w.BranchName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetailBranchs(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.routes')" v-if="routeTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.routeCode')" :error="$v.discountDetailsRoute.RouteId" :required="routeTabValid">
              <v-select :disabled='!form.RouteCriteriaId' v-model="route" :options="routes" @search="searchRoute" label="Code" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.routeName')">
              <b-form-input type="text" v-model="discountDetailsRoute.RouteName" :disabled="true"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountDetailRoutes()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.routeCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.routeName')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountDetailsRoutes" :key="i">
                    <b-td>{{w.RouteCode}}</b-td>
                    <b-td>{{w.RouteName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetailRoutes(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.payments')" v-if="paymentTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.paymentType')" :error="$v.discountDetailsPayment.PaymentTypeId" :required="paymentTabValid">
              <v-select :disabled='!form.PaymentCriteriaId' v-model="paymentType" :options="paymentTypes" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountDetailPaymentTypes()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.paymentType')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountDetailsPaymentTypes" :key="i">
                    <b-td>{{w.PaymentTypeName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetailPaymentTypes(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomerSqls')" v-if="customerSqlsTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerSql')" :error="$v.discountCustomerSql.CustomerSqlId" :required="customerSqlsTabValid">
              <v-select v-model="customerSql" :options="customerSqls" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountCustomerSqls()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.customerSql')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountCustomerSqls" :key="i">
                    <b-td>{{w.CustomerSqlName}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountCustomerSql(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
          <!-- <b-modal id="approve-assurance-modal" size="xl" hide-footer>
            <ApproveAssuranceModal />
          </b-modal> -->
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        DiscountBeginDate: new Date(),
        DiscountEndDate: new Date(),
        DiscountTypeId: null,
        DiscountKindId: null,
        ApplyToTimes: 0,
        MaxValue: null,
        BranchCriteriaId: null,
        CustomerCriteriaId: null,
        RouteCriteriaId: null,
        PaymentCriteriaId: null,
        Genexp1: null,
        IsContractDiscount: null,
        FinanceCode: null,
        UseBudget: 0,
        BudgetId: null,
        BudgetAmount: null,
        BudgetConsumption: 0,
        ApproveStateId: 2102,
        DiscountCategoryId: null,
        DiscountPayback: 0,
        MaxUsage: null,
        IsCascade: 0,
        UseMultiGiven: 0,
        IsMandatory: 0,
        IsDoubleScore: 0,
        TciBreak1Id: null,
        RepresentativeId: null,
        PriorityLevel: null,
        PopulatedCustomerCount: null,
        DiscountGivens: [],
        DiscountTakens: [],
        DiscountCustomers: [],
        DiscountExcludedCustomers: [],
        DiscountDetails: [],
        DiscountCustomerSqls: []
      },
      discountGiven: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        TableName: null,
        ColumnName: null,
        ColumnNameStr: null,
        ColumnValue: null,
        ColumnValueStr: null,
        GivenQuantity: null,
        DiscountRate: null,
        DiscountTotal: null,
        StartValue: null,
        FinishValue: null
      },
      discountTaken: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: 'T_DISCOUNT_TAKEN',
        ColumnName: null,
        ColumnNameStr: null,
        ColumnValue: null,
        ColumnValueStr: null,
        TakenQuantity: null,
        MinTakenAmount: null,
        EndTakenQuantity: null,
        MaxTakenAmount: null,
        MinTakenQuantity: null
      },
      discountCustomer: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: null,
        CustomerName: null,
        CustomerCode: null,
        LocationId: null,
        LocationName: null,
        CommercialTitle: null
      },
      discountExcludedCustomer: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: null,
        CustomerName: null,
        CustomerCode: null,
        LocationId: null,
        LocationName: null,
        CommercialTitle: null
      },
      discountDetailsBranch: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: null,
        ColumnName: null,
        ColumnNameStr: null,
        ColumnValue: null,
        ColumnValueStr: null,
        BranchId: null,
        BranchCode: null,
        BranchName: null,
        RouteId: null,
        RouteCode: null,
        RouteName: null,
        PaymentTypeId: null,
        PaymentTypeName: null
      },
      discountDetailsRoute: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: null,
        ColumnName: null,
        ColumnNameStr: null,
        ColumnValue: null,
        ColumnValueStr: null,
        BranchId: null,
        BranchCode: null,
        BranchName: null,
        RouteId: null,
        RouteCode: null,
        RouteName: null,
        PaymentTypeId: null,
        PaymentTypeName: null
      },
      discountDetailsPayment: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: null,
        ColumnName: null,
        ColumnNameStr: null,
        ColumnValue: null,
        ColumnValueStr: null,
        BranchId: null,
        BranchCode: null,
        BranchName: null,
        RouteId: null,
        RouteCode: null,
        RouteName: null,
        PaymentTypeId: null,
        PaymentTypeName: null
      },
      discountCustomerSql: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        DiscountId: null,
        CustomerSqlId: null,
        CustomerSqlName: null
      },
      discountGivenColumnName: {},
      discountGivenColumnValue: {},
      discountTakenColumnName: {},
      discountTakenColumnValue: {},
      customerCriteriaColumnName: {},
      customerCriteriaColumnValue: {},
      customer: {},
      excludedCustomer: {},
      branch: {},
      route: {},
      paymentType: {},
      customerSql: {},
      discountGivensColumnNames: [],
      discountGivensColumnValues: [],
      discountTakensColumnNames: [],
      discountTakensColumnValues: [],
      customerCriteriaColumnNames: [],
      customerCriteriaColumnValues: [],
      discountDetailsCustomerCriterias: [],
      discountDetailsBranchs: [],
      BranchIds: [],
      discountDetailsRoutes: [],
      discountDetailsPaymentTypes: [],
      discountCustomerSqls: [],
      columnNameValid: false,
      columnValueValid: false,
      discountRateValid: false,
      discountTotalValid: false,
      startValueValid: false,
      finishValueValid: false,
      takenQuantityValid: false,
      endTakenQuantityValid: false,
      maxTakenAmountValid: false,
      minTakenQuantityValid: false,
      minTakenAmountValid: false,
      ApproveStateLabel: null,
      branchCriteria: null,
      customerCriteria: null,
      routeCriteria: null,
      paymentCriteria: null,
      customerTabValid: false,
      branchTabValid: false,
      routeTabValid: false,
      paymentTabValid: false,
      customerSqlsTabValid: false,
      customerCriterTabValid: false,
      customerValid: false
    }
  },
  computed: {
    ...mapState(['discountTypes', 'discountKinds', 'budgets', 'discountCategories', 'columnNames', 'columnValues', 'customers', 'branchs', 'routes', 'paymentTypes', 'customerSqls'])
  },
  mounted () {
    this.createManualCode()
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountType/Search', name: 'discountTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountKind/Search', name: 'discountKinds'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountCategory/Search', name: 'discountCategories'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBudget/api/BudgetMaster/Search', name: 'budgets'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCustomerSql/Search', name: 'customerSqls'})
      this.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
        this.discountGivensColumnNames = res.Values
        this.discountTakensColumnNames = res.Values
      })
    },
    ColumnControl () {
      this.initFalseValid()
      if (this.form.DiscountKindId === 1) {
        this.discountRateValid = true
        this.finishValueValid = true
        this.startValueValid = true
      } else if (this.form.DiscountKindId === 2) {
        this.discountTotalValid = true
        this.startValueValid = true
        this.finishValueValid = true
        if (this.form.DiscountTypeId === 2) {
          this.minTakenAmountValid = true
        } else if (this.form.DiscountTypeId === 1) {
          this.minTakenQuantityValid = true
        }
      } else if (this.form.DiscountKindId === 7) {
        this.discountRateValid = true
        this.finishValueValid = true
        this.startValueValid = true
        this.columnNameValid = true
        this.columnValueValid = true
        if (this.form.DiscountTypeId === 1) {
          this.takenQuantityValid = true
          this.endTakenQuantityValid = true
        } else if (this.form.DiscountTypeId === 2) {
          this.maxTakenAmountValid = true
        }
      } else if (this.form.DiscountKindId === 8) {
        this.discountTotalValid = true
        this.startValueValid = true
        this.finishValueValid = true
        this.columnNameValid = true
        this.columnValueValid = true
        if (this.form.DiscountTypeId === 1) {
          this.takenQuantityValid = true
          this.endTakenQuantityValid = true
        } else if (this.form.DiscountTypeId === 2) {
          this.maxTakenAmountValid = true
        }
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label === 'DiscountKindId' && model.RecordId !== 2) {
          this.form.IsCascade = 0
          this.form.UseMultiGiven = 0
        }
        this.form[label] = model.RecordId
      } else {
        if (label === 'DiscountKindId') {
          this.discountGiven.ColumnName = null
          this.discountGiven.ColumnValue = null
          this.form.IsCascade = 0
          this.form.UseMultiGiven = 0
          this.initFalseValid()
        }
        this.form[label] = null
      }
    },
    addDiscountGiven () {
      this.$v.discountGivenColumnName.$touch()
      this.$v.discountGivenColumnValue.$touch()
      this.$v.discountGiven.$touch()
      if (this.$v.discountGivenColumnName.$error || this.$v.discountGivenColumnValue.$error || this.$v.discountGiven.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (this.form.DiscountTypeId == null && this.form.DiscountKindId == null) {
        this.$toasted.show(this.$t('insert.discount.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      this.form.DiscountGivens.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_DISCOUNT_GIVEN',
        ColumnName: this.discountGivenColumnName.Code,
        ColumnValue: this.discountGivenColumnValue.DecimalValue,
        ColumnNameStr: this.discountGivenColumnName.Label,
        ColumnValueStr: this.discountGivenColumnValue.Label,
        GivenQuantity: this.discountGiven.GivenQuantity,
        DiscountRate: this.discountGiven.DiscountRate,
        DiscountTotal: this.discountGiven.DiscountTotal,
        StartValue: this.discountGiven.StartValue,
        FinishValue: this.discountGiven.FinishValue
      })
      this.discountGivenColumnName = {}
      this.discountGivenColumnValue = {}
      this.discountGiven = {}
      this.$v.discountGivenColumnName.$reset()
      this.$v.discountGivenColumnValue.$reset()
      this.$v.discountGiven.$reset()
    },
    removeDiscountGiven (e) {
      this.form.DiscountGivens.splice(this.form.DiscountGivens.indexOf(e), 1)
    },
    addDiscountTaken () {
      this.$v.discountTakenColumnName.$touch()
      this.$v.discountTakenColumnValue.$touch()
      this.$v.discountTaken.$touch()
      if (this.$v.discountTakenColumnName.$error || this.$v.discountTakenColumnValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.DiscountTakens.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_DISCOUNT_TAKEN',
        ColumnName: this.discountTakenColumnName.Code,
        ColumnValue: this.discountTakenColumnValue.DecimalValue,
        ColumnNameStr: this.discountTakenColumnName.Label,
        ColumnValueStr: this.discountTakenColumnValue.Label,
        TakenQuantity: this.discountTaken.TakenQuantity,
        MinTakenAmount: this.discountTaken.MinTakenAmount,
        EndTakenQuantity: this.discountTaken.EndTakenQuantity,
        MaxTakenAmount: this.discountTaken.MaxTakenAmount,
        MinTakenQuantity: this.discountTaken.MinTakenQuantity
      })
      this.discountTakenColumnName = {}
      this.discountTakenColumnValue = {}
      this.discountTaken = {}
      this.$v.discountTakenColumnName.$reset()
      this.$v.discountTakenColumnValue.$reset()
      this.$v.discountTaken.$reset()
    },
    removeDiscountTaken (e) {
      this.form.DiscountTakens.splice(this.form.DiscountTakens.indexOf(e), 1)
    },
    addDiscountCustomer () {
      this.$v.discountCustomer.$touch()
      if (this.$v.discountCustomer.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.DiscountCustomers.filter(f => f.CustomerId === this.discountCustomer.CustomerId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.DiscountCustomers.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: this.discountCustomer.CustomerId,
        CustomerName: this.discountCustomer.CustomerName,
        CustomerCode: this.discountCustomer.CustomerCode,
        LocationId: this.discountCustomer.LocationId,
        LocationName: this.discountCustomer.LocationName,
        CommercialTitle: this.discountCustomer.CommercialTitle
      })
      this.discountCustomer = {}
      this.customer = null
      this.$v.discountCustomer.$reset()
    },
    removeDiscountCustomer (e) {
      this.DiscountCustomers.splice(this.DiscountCustomers.indexOf(e), 1)
    },
    addDiscountExcludedCustomer () {
      this.$v.discountExcludedCustomer.$touch()
      if (this.$v.discountExcludedCustomer.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (this.form.BranchCriteriaId == null || this.BranchIds.length === 0) {
        this.$toasted.show(this.$t('insert.discount.requiredBranchCriteria'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
        return
      }
      let filteredArr = this.form.DiscountExcludedCustomers.filter(f => f.CustomerId === this.discountExcludedCustomer.CustomerId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.DiscountExcludedCustomers.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: this.discountExcludedCustomer.CustomerId,
        CustomerName: this.discountExcludedCustomer.CustomerName,
        CustomerCode: this.discountExcludedCustomer.CustomerCode,
        LocationId: this.discountExcludedCustomer.LocationId,
        LocationName: this.discountExcludedCustomer.LocationName,
        CommercialTitle: this.discountExcludedCustomer.CommercialTitle
      })
      this.discountExcludedCustomer = {}
      this.excludedCustomer = null
      this.$v.discountExcludedCustomer.$reset()
    },
    removeDiscountExcludedCustomer (e) {
      this.DiscountExcludedCustomers.splice(this.DiscountExcludedCustomers.indexOf(e), 1)
    },
    addCustomerCriteria () {
      this.$v.customerCriteriaColumnName.$touch()
      this.$v.customerCriteriaColumnValue.$touch()
      if (this.$v.customerCriteriaColumnName.$error || this.$v.customerCriteriaColumnValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.discountDetailsCustomerCriterias.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        TableName: 'T_CUSTOMER',
        ColumnName: this.customerCriteriaColumnName.Code,
        ColumnValue: this.customerCriteriaColumnValue.DecimalValue,
        ColumnNameStr: this.customerCriteriaColumnName.Label,
        ColumnValueStr: this.customerCriteriaColumnValue.Label
      })
      this.customerCriteriaColumnName = {}
      this.customerCriteriaColumnValue = {}
      this.$v.customerCriteriaColumnName.$reset()
      this.$v.customerCriteriaColumnValue.$reset()
    },
    removeCustomerCriteria (e) {
      this.discountDetailsCustomerCriterias.splice(this.discountDetailsCustomerCriterias.indexOf(e), 1)
    },
    addDiscountDetailBranchs () {
      this.$v.discountDetailsBranch.$touch()
      if (this.$v.discountDetailsBranch.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.discountDetailsBranchs.filter(f => f.BranchId === this.discountDetailsBranch.BranchId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.discountDetailsBranchs.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: 'T_BRANCH',
        ColumnName: 'BRANCH_ID',
        ColumnValue: this.discountDetailsBranch.BranchId,
        BranchId: this.discountDetailsBranch.BranchId,
        BranchCode: this.discountDetailsBranch.BranchCode,
        BranchName: this.discountDetailsBranch.BranchName,
        RouteId: null,
        RouteCode: null,
        RouteName: null,
        PaymentTypeId: null,
        PaymentTypeName: null
      })
      this.BranchIds.push(this.discountDetailsBranch.BranchId)
      this.discountDetailsBranch = {}
      this.branch = null
      this.$v.discountDetailsBranch.$reset()
    },
    removeDiscountDetailBranchs (e) {
      this.discountDetailsBranchs.splice(this.discountDetailsBranchs.indexOf(e), 1)
      this.BranchIds.splice(this.BranchIds.indexOf(e.RecordId), 1)
    },
    addDiscountDetailRoutes () {
      this.$v.discountDetailsRoute.$touch()
      if (this.$v.discountDetailsRoute.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.discountDetailsRoutes.filter(f => f.RouteId === this.discountDetailsRoute.RouteId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.discountDetailsRoutes.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: 'T_ROUTE',
        ColumnName: 'RECORD_ID',
        ColumnValue: this.discountDetailsRoute.RouteId,
        BranchId: null,
        BranchCode: null,
        BranchName: null,
        RouteId: this.discountDetailsRoute.RouteId,
        RouteCode: this.discountDetailsRoute.RouteCode,
        RouteName: this.discountDetailsRoute.RouteName,
        PaymentTypeId: null,
        PaymentTypeName: null
      })
      this.discountDetailsRoute = {}
      this.route = null
      this.$v.discountDetailsRoute.$reset()
    },
    removeDiscountDetailRoutes (e) {
      this.discountDetailsRoutes.splice(this.discountDetailsRoutes.indexOf(e), 1)
    },
    addDiscountDetailPaymentTypes () {
      this.$v.discountDetailsPayment.$touch()
      if (this.$v.discountDetailsPayment.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.discountDetailsPaymentTypes.filter(f => f.PaymentTypeId === this.discountDetailsPayment.PaymentTypeId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.discountDetailsPaymentTypes.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: 'T_PAYMENT_TYPE',
        ColumnName: 'RECORD_ID',
        ColumnValue: this.discountDetailsPayment.PaymentTypeId,
        BranchId: null,
        BranchCode: null,
        BranchName: null,
        RouteId: null,
        RouteCode: null,
        RouteName: null,
        PaymentTypeId: this.discountDetailsPayment.PaymentTypeId,
        PaymentTypeName: this.discountDetailsPayment.PaymentTypeName
      })
      this.discountDetailsPayment = {}
      this.paymentType = null
      this.$v.discountDetailsPayment.$reset()
    },
    removeDiscountDetailPaymentTypes (e) {
      this.discountDetailsPaymentTypes.splice(this.discountDetailsPaymentTypes.indexOf(e), 1)
    },
    addDiscountCustomerSqls () {
      // this.$bvModal.show('approve-assurance-modal')
      this.$v.discountCustomerSql.$touch()
      if (this.$v.discountCustomerSql.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.discountCustomerSqls.filter(f => f.CustomerSqlId === this.discountCustomerSql.CustomerSqlId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.discountCustomerSqls.push({
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        DiscountId: null,
        CustomerSqlId: this.discountCustomerSql.CustomerSqlId,
        CustomerSqlName: this.discountCustomerSql.CustomerSqlName
      })
      this.discountCustomerSql = {}
      this.customerSql = null
      this.$v.discountCustomerSql.$reset()
    },
    removeDiscountCustomerSqls (e) {
      this.discountCustomerSqls.splice(this.discountCustomerSqls.indexOf(e), 1)
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
        name: 'customers',
        andConditionModel: {
          BranchIds: this.BranchIds
        },
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    searchBranch (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Code: search
      }
      this.searchItemsByModel('VisionNextBranch/api/Branch/AutoCompleteSearch', 'branchs', model).then(res => {
        loading(false)
      })
    },
    searchRoute (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Code: search
      }
      this.searchItemsByModel('VisionNextRoute/api/Route/AutoCompleteSearch', 'routes', model).then(res => {
        loading(false)
      })
    },
    DiscountCustomersValid () {
      if (this.form.BranchCriteriaId == null || this.BranchIds.length === 0) {
        this.form.DiscountCustomers = []
        this.form.DiscountExcludedCustomers = []
        this.discountDetailsBranchs = []
        this.customerValid = true
      } else {
        this.customerValid = false
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.discountDetailsCustomerCriterias.forEach((value, index) => {
          this.form.DiscountDetails.push(value)
        })
        this.discountDetailsBranchs.forEach((value, index) => {
          this.form.DiscountDetails.push(value)
        })
        this.discountDetailsRoutes.forEach((value, index) => {
          this.form.DiscountDetails.push(value)
        })
        this.discountDetailsPaymentTypes.forEach((value, index) => {
          this.form.DiscountDetails.push(value)
        })
        this.form.DiscountCustomerSqls = this.discountCustomerSqls
        this.createData()
      }
    },
    initFalseValid () {
      this.columnNameValid = false
      this.columnValueValid = false
      this.discountRateValid = false
      this.discountTotalValid = false
      this.startValueValid = false
      this.finishValueValid = false
    },
    useBudgetEvent (e) {
      if (e === 1) {
        this.form.ApproveStateId = 2100
        this.lookup.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2100) {
            this.ApproveStateLabel = item.Label
          }
        })
      } else {
        this.form.ApproveStateId = 2102
        this.lookup.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2102) {
            this.ApproveStateLabel = item.Label
          }
        })
      }
    },
    getCustomerCriterias () {
      if (!this.customerCriteriaColumnNames || this.customerCriteriaColumnNames.length === 0) {
        this.$api.postByUrl({paramId: 'CUSTOMER_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((res) => {
          this.customerCriteriaColumnNames = res.Values
        })
      }
    }
  },
  watch: {
    customer (value) {
      if (value) {
        this.discountCustomer.CustomerId = value.RecordId
        this.discountCustomer.CustomerName = value.Description1
        this.discountCustomer.CustomerCode = value.Code
        this.discountCustomer.CommercialTitle = value.CommercialTitle
        this.$api.post({RecordId: value.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          if (res && res.Model) {
            let defaultLocation = res.Model.DefaultLocation
            if (defaultLocation) {
              this.discountCustomer.LocationId = defaultLocation.DecimalValue
              this.discountCustomer.LocationName = defaultLocation.Label
              this.$forceUpdate()
            }
          }
        })
      } else {
        this.discountCustomer = {}
      }
    },
    excludedCustomer (value) {
      if (value) {
        this.discountExcludedCustomer.CustomerId = value.RecordId
        this.discountExcludedCustomer.CustomerName = value.Description1
        this.discountExcludedCustomer.CustomerCode = value.Code
        this.discountExcludedCustomer.CommercialTitle = value.CommercialTitle
        this.$api.post({RecordId: value.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          if (res && res.Model) {
            let defaultLocation = res.Model.DefaultLocation
            if (defaultLocation) {
              this.discountExcludedCustomer.LocationId = defaultLocation.DecimalValue
              this.discountExcludedCustomer.LocationName = defaultLocation.Label
              this.$forceUpdate()
            }
          }
        })
      } else {
        this.discountExcludedCustomer = {}
      }
    },
    branch (value) {
      if (value) {
        this.discountDetailsBranch.BranchId = value.RecordId
        this.discountDetailsBranch.BranchName = value.Description1
        this.discountDetailsBranch.BranchCode = value.Code
      } else {
        this.discountDetailsBranch = {}
      }
    },
    route (value) {
      if (value) {
        this.discountDetailsRoute.RouteId = value.RecordId
        this.discountDetailsRoute.RouteName = value.Description1
        this.discountDetailsRoute.RouteCode = value.Code
      } else {
        this.discountDetailsRoute = {}
      }
    },
    paymentType (value) {
      if (value) {
        this.discountDetailsPayment.PaymentTypeId = value.RecordId
        this.discountDetailsPayment.PaymentTypeName = value.Description1
      } else {
        this.discountDetailsPayment = {}
      }
    },
    customerSql (value) {
      if (value) {
        this.discountCustomerSql.CustomerSqlId = value.RecordId
        this.discountCustomerSql.CustomerSqlName = value.Description1
      } else {
        this.discountCustomerSql = {}
      }
    },
    discountGivenColumnName (value) {
      this.discountGivensColumnValues = []
      this.discountGivenColumnValue = null
      if (value) {
        this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.discountGivensColumnValues = res.Values
          this.$forceUpdate()
        })
      }
    },
    discountTakenColumnName (value) {
      this.discountTakensColumnValues = []
      this.discountTakenColumnValue = null
      if (value) {
        this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.discountTakensColumnValues = res.Values
          this.$forceUpdate()
        })
      }
    },
    customerCriteriaColumnName (value) {
      this.customerCriteriaColumnValues = []
      this.customerCriteriaColumnValue = null
      if (value) {
        this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.customerCriteriaColumnValues = res.Values
          this.$forceUpdate()
        })
      }
    },
    lookup (e) {
      if (e.APPROVE_STATE) {
        e.APPROVE_STATE.map(item => {
          if (item.DecimalValue === 2102) {
            this.selectedType('ApproveStateId', item)
            this.ApproveStateLabel = item.Label
          }
        })
      }
    },
    branchCriteria (e) {
      if (e !== null && (e.DecimalValue === 30)) {
        this.branchTabValid = true
      } else {
        this.branchTabValid = false
      }
    },
    customerCriteria (e) {
      this.customerCriterTabValid = false
      this.customerTabValid = false
      this.customerSqlsTabValid = false
      if (e !== null && e.DecimalValue === 21) {
        this.customerCriterTabValid = true
        this.getCustomerCriterias()
      } else if (e !== null && e.DecimalValue === 22) {
        this.customerTabValid = true
      } else if (e !== null && e.DecimalValue === 29) {
        this.customerSqlsTabValid = true
      }
    },
    routeCriteria (e) {
      if (e !== null && (e.DecimalValue === 33)) {
        this.routeTabValid = true
      } else {
        this.routeTabValid = false
      }
    },
    paymentCriteria (e) {
      if (e !== null && (e.DecimalValue === 36)) {
        this.paymentTabValid = true
      } else {
        this.paymentTabValid = false
      }
    }
  },
  validations () {
    let validation = {}
    validation.discountGiven = {
      GivenQuantity: null,
      DiscountRate: null,
      DiscountTotal: null,
      StartValue: null,
      FinishValue: null
    }
    validation.discountTaken = {
      TakenQuantity: null,
      MinTakenAmount: null,
      EndTakenQuantity: null,
      MaxTakenAmount: null,
      MinTakenQuantity: null
    }
    validation.discountCustomer = {
      CustomerId: null
    }
    validation.discountExcludedCustomer = {
      CustomerId: null
    }
    validation.discountDetailsBranch = {
      BranchId: null
    }
    validation.discountDetailsRoute = {
      RouteId: null
    }
    validation.discountDetailsPayment = {
      PaymentTypeId: null
    }
    validation.discountCustomerSql = {
      CustomerSqlId: null
    }
    if (this.form.ApplyToTimes === 1) {
      this.insertRequired.MaxValue = true
      this.insertRules.MaxValue = {
        required
      }
    } else {
      this.insertRules.MaxValue = {}
      this.insertRequired.MaxValue = false
    }
    if (this.form.UseBudget === 1) {
      this.insertRequired.BudgetId = true
      this.insertRequired.BudgetAmount = true
      this.insertRules.BudgetId = {
        required
      }
      this.insertRules.BudgetAmount = {
        required
      }
    } else {
      this.insertRules.BudgetId = {}
      this.insertRequired.BudgetId = false
      this.insertRules.BudgetAmount = {}
      this.insertRequired.BudgetAmount = false
    }
    this.insertRules.ApproveStateId = {}
    this.insertRequired.ApproveStateId = false
    validation.discountGiven.GivenQuantity = {
      required
    }
    validation.discountGiven.DiscountRate = {}
    validation.discountGiven.DiscountTotal = {}
    validation.discountGiven.StartValue = {}
    validation.discountGiven.FinishValue = {}
    validation.discountGivenColumnName = {}
    validation.discountGivenColumnValue = {}
    validation.discountTaken.TakenQuantity = {}
    validation.discountTaken.MinTakenAmount = {}
    validation.discountTaken.EndTakenQuantity = {}
    validation.discountTaken.MaxTakenAmount = {}
    validation.discountTaken.MinTakenQuantity = {}
    validation.discountCustomer.CustomerId = {}
    validation.discountExcludedCustomer.CustomerId = {}
    validation.customerCriteriaColumnName = {}
    validation.customerCriteriaColumnValue = {}
    validation.discountDetailsBranch.BranchId = {}
    validation.discountDetailsRoute.RouteId = {}
    validation.discountDetailsPayment.PaymentTypeId = {}
    validation.discountCustomerSql.CustomerSqlId = {}

    if (this.columnNameValid === true) {
      validation.discountGivenColumnName = {
        required
      }
      validation.discountGivenColumnValue = {
        required
      }
    }
    if (this.discountRateValid === true) {
      validation.discountGiven.DiscountRate = {
        required
      }
    }
    if (this.discountTotalValid === true) {
      validation.discountGiven.DiscountTotal = {
        required
      }
    }
    if (this.startValueValid === true) {
      validation.discountGiven.StartValue = {
        required
      }
    }
    if (this.finishValueValid === true) {
      validation.discountGiven.FinishValue = {
        required
      }
    }
    if (this.takenQuantityValid === true) {
      validation.discountTaken.TakenQuantity = {
        required
      }
    }
    if (this.minTakenAmountValid === true) {
      validation.discountTaken.MinTakenAmount = {
        required
      }
    }
    if (this.endTakenQuantityValid === true) {
      validation.discountTaken.EndTakenQuantity = {
        required
      }
    }
    if (this.maxTakenAmountValid === true) {
      validation.discountTaken.MaxTakenAmount = {
        required
      }
    }
    if (this.minTakenQuantityValid === true) {
      validation.discountTaken.MinTakenQuantity = {
        required
      }
    }
    if (this.customerValid === false) {
      validation.discountCustomer.CustomerId = {
        required
      }
      validation.discountExcludedCustomer.CustomerId = {
        required
      }
    }
    if (this.customerCriterTabValid === true) {
      validation.customerCriteriaColumnName = {
        required
      }
      validation.customerCriteriaColumnValue = {
        required
      }
    }
    if (this.branchTabValid === true) {
      validation.discountDetailsBranch.BranchId = {
        required
      }
    }
    if (this.routeTabValid === true) {
      validation.discountDetailsRoute.RouteId = {
        required
      }
    }
    if (this.paymentTabValid === true) {
      validation.discountDetailsPayment.PaymentTypeId = {
        required
      }
    }
    if (this.customerSqlsTabValid === true) {
      validation.discountCustomerSql.CustomerSqlId = {
        required
      }
    }

    validation.form = this.insertRules
    return {
      ...validation,
      discountTakenColumnName: {
        required
      },
      discountTakenColumnValue: {
        required
      }
    }
  }
}
</script>
