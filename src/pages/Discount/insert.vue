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
              <v-select
                disabled
                v-model="ApproveStateLabel"
                :options="lookup.APPROVE_STATE"
                @input="selectedType('ApproveStateId', $event)"
                label="Label"
              />
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
              <b-form-checkbox v-model="form.UseBudget" name="check-button" @input="useBudgetEvent($event)" switch>
                {{(form.UseBudget) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
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
            <NextFormGroup item-key="ApplyToTimes" :error="$v.form.ApplyToTimes">
              <b-form-checkbox v-model="form.ApplyToTimes" name="check-button" switch>
                {{(form.ApplyToTimes) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountGivens')" @click="DiscountGivensValid()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.columnName')">
              <v-select :options="columnNames" @input="selectedSearchType('ColumnName', $event)" label="Description1" :disabled="!columnNameValid">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')">
              <v-select :options="columnValues" @input="selectedSearchType('ColumnValue', $event)" label="Description1" :disabled="!columnValueValid">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.givenQuantity')">
              <b-form-input type="text" v-model="discountGiven.GivenQuantity" :readonly="insertReadonly.GivenQuantity" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.discountRate')">
              <b-form-input type="text" v-model="discountGiven.DiscountRate" :disabled="!discountRateValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.discountTotal')">
              <b-form-input type="text" v-model="discountGiven.DiscountTotal" :disabled="!discountTotalValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.startValue')">
              <b-form-input type="text" v-model="discountGiven.StartValue" :disabled="!startValueValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.finishValue')">
              <b-form-input type="text" v-model="discountGiven.FinishValue" :disabled="!finishValueValid" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addDiscountGiven()" :disabled="!discountGivenAddButtonValid" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                  <b-tr v-for="(w, i) in discountGivens" :key="i">
                    <b-td>{{w.ColumnName}}</b-td>
                    <b-td>{{w.ColumnValue}}</b-td>
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
            <NextFormGroup :title="$t('insert.discount.columnName')">
              <b-form-input type="text" v-model="discountTaken.ColumnName" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')">
              <b-form-input type="text" v-model="discountTaken.ColumnValue" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.takenQuantity')">
              <b-form-input type="text" v-model="discountTaken.TakenQuantity" :disabled="!takenQuantityValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.minTakenAmount')">
              <b-form-input type="text" v-model="discountTaken.MinTakenAmount" :disabled="!minTakenAmountValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.endTakenQuantity')">
              <b-form-input type="text" v-model="discountTaken.EndTakenQuantity" :disabled="!endTakenQuantityValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.maxTakenAmount')">
              <b-form-input type="text" v-model="discountTaken.MaxTakenAmount" :disabled="!maxTakenAmountValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.minTakenQuantity')">
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
                  <b-tr v-for="(w, i) in discountTakens" :key="i">
                    <b-td>{{w.ColumnName}}</b-td>
                    <b-td>{{w.ColumnValue}}</b-td>
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
            <NextFormGroup :title="$t('insert.discount.customerCode')">
              <v-select :disabled='!form.BranchCriteriaId' :options="customers" @search="searchCustomer" @input="selectedDiscountCustomer" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountCustomer.Customer.Description1" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountCustomer.CommercialTitle" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountCustomer.Location.Description1" disabled/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='!addDiscountCustomerValid' @click="addDiscountCustomer()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                  <b-tr v-for="(w, i) in discountCustomers" :key="i">
                    <b-td>{{w.Customer.Code}}</b-td>
                    <b-td>{{w.Customer.Description1}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.Location.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountExcludedCustomers')" @click="DiscountCustomersValid()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerCode')">
              <v-select :disabled='!form.BranchCriteriaId' :options="customers" @search="searchCustomer" @input="selectedDiscountExcludedCustomer" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountExcludedCustomer.Customer.Description1" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountExcludedCustomer.CommercialTitle" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountExcludedCustomer.Location.Description1" disabled/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='!addDiscountExcludedCustomerValid' @click="addDiscountExcludedCustomer()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                  <b-tr v-for="(w, i) in discountExcludedCustomers" :key="i">
                    <b-td>{{w.Customer.Code}}</b-td>
                    <b-td>{{w.Customer.Description1}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.Location.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountExcludedCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.branchs')" v-if="branchTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.branchCode')">
              <v-select :disabled='!form.BranchCriteriaId' :options="branchs" @search="searchBranch" @input="selectedDiscountDetailBranch" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.branchName')">
              <b-form-input type="text" v-model="discountDetail.Branch.Description1" readonly/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='!addBranchButtonValid' @click="addDiscountDetailBranchs()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                    <b-td>{{w.Branch.Code}}</b-td>
                    <b-td>{{w.Branch.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetailBranchs(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.routes')" v-if="routeTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.routeCode')">
              <v-select :disabled='!form.RouteCriteriaId' :options="routes" @search="searchRoute" @input="selectedDiscountDetailRoute" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.routeName')">
              <b-form-input type="text" v-model="discountDetail.Route.Description1" readonly/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='!addRouteButtonValid' @click="addDiscountDetailRoutes()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                    <b-td>{{w.Route.Code}}</b-td>
                    <b-td>{{w.Route.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetailRoutes(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.payments')" v-if="paymentTabValid">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.paymentType')">
              <v-select :disabled='!form.PaymentCriteriaId' :options="paymentTypes" @input="selectedDiscountDetailPayment" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button :disabled='!addPaymentTypeButtonValid' @click="addDiscountDetailPaymentTypes()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
            <NextFormGroup :title="$t('insert.discount.customerSql')">
              <b-form-input type="text" v-model="discountCustomerSql.CustomerSqlId" :readonly="insertReadonly.ColumnName" />
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
                    <b-td>{{w.CustomerSqlId}}</b-td>
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
        UseBudget: null,
        BudgetId: null,
        BudgetAmount: null,
        BudgetConsumption: null,
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
        ColumnValue: null,
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
        TableName: null,
        ColumnName: null,
        ColumnValue: null,
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
        CommercialTitle: null,
        LocationId: null,
        Customer: {
          Description1: null,
          Code: null,
          RecordId: null
        },
        Location: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      },
      discountExcludedCustomer: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: null,
        CommercialTitle: null,
        LocationId: null,
        Customer: {
          Description1: null,
          Code: null,
          RecordId: null
        },
        Location: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      },
      discountDetail: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        TableName: null,
        ColumnName: null,
        ColumnValue: null,
        BranchId: null,
        Branch: {
          Description1: null,
          Code: null,
          RecordId: null
        },
        RouteId: null,
        Route: {
          Description1: null,
          Code: null,
          RecordId: null
        },
        PaymentTypeId: null,
        PaymentTypeName: null
      },
      discountCustomerSql: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        DiscountId: null,
        CustomerSqlId: null
      },
      discountGivens: [],
      discountTakens: [],
      discountCustomers: [],
      discountExcludedCustomers: [],
      discountDetailsBranchs: [],
      discountDetailsRoutes: [],
      discountDetailsPaymentTypes: [],
      discountCustomerSqls: [],
      columnNameValid: false,
      columnValueValid: false,
      discountRateValid: false,
      discountTotalValid: false,
      startValueValid: false,
      finishValueValid: false,
      discountGivenAddButtonValid: false,
      takenQuantityValid: false,
      endTakenQuantityValid: false,
      maxTakenAmountValid: false,
      minTakenQuantityValid: false,
      minTakenAmountValid: false,
      ApproveStateLabel: null,
      addDiscountCustomerValid: false,
      addDiscountExcludedCustomerValid: false,
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
      addBranchButtonValid: false,
      addRouteButtonValid: false,
      addPaymentTypeButtonValid: false
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['discountTypes', 'discountKinds', 'budgets', 'discountCategories', 'columnNames', 'columnValues', 'customers', 'branchs', 'routes', 'paymentTypes'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountType/Search', name: 'discountTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountKind/Search', name: 'discountKinds'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextDiscount/api/DiscountCategory/Search', name: 'discountCategories'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBudget/api/BudgetMaster/Search', name: 'budgets'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      let allLookups = 'BRANCH_CRITERIA,CUSTOMER_CRITERIA,APPROVE_STATE,TCI_BREAKDOWN,ROUTE_CRITERIA,PAYMENT_CRITERIA'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
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
          this.form.IsCascade = null
          this.form.UseMultiGiven = null
        }
        this.form[label] = model.RecordId
      } else {
        if (label === 'DiscountKindId') {
          this.discountGiven.ColumnName = null
          this.discountGiven.ColumnValue = null
          this.form.IsCascade = null
          this.form.UseMultiGiven = null
          this.initFalseValid()
        }
        this.form[label] = null
      }
    },
    addDiscountGiven () {
      this.discountGivens.push(this.discountGiven)
      this.initNull('DiscountGiven')
    },
    removeDiscountGiven (e) {
      this.discountGivens.splice(this.discountGivens.indexOf(e), 1)
    },
    addDiscountTaken () {
      this.discountTakens.push(this.discountTaken)
      this.initNull('DiscountTaken')
    },
    removeDiscountTaken (e) {
      this.discountTakens.splice(this.discountTakens.indexOf(e), 1)
    },
    addDiscountCustomer () {
      this.discountCustomers.push(this.discountCustomer)
      this.initNull('DiscountCustomer')
    },
    removeDiscountCustomer (e) {
      this.discountCustomers.splice(this.discountCustomers.indexOf(e), 1)
    },
    addDiscountExcludedCustomer () {
      this.discountExcludedCustomers.push(this.discountExcludedCustomer)
      this.initNull('DiscountExcludedCustomer')
    },
    removeDiscountExcludedCustomer (e) {
      this.discountExcludedCustomers.splice(this.discountExcludedCustomers.indexOf(e), 1)
    },
    addDiscountDetailBranchs () {
      this.addBranchButtonValid = false
      this.discountDetailsBranchs.push(this.discountDetail)
      this.initNull('DiscountDetail')
    },
    removeDiscountDetailBranchs (e) {
      this.discountDetailsBranchs.splice(this.discountDetailsBranchs.indexOf(e), 1)
    },
    addDiscountDetailRoutes () {
      this.addRouteButtonValid = false
      this.discountDetailsRoutes.push(this.discountDetail)
      this.initNull('DiscountDetail')
    },
    removeDiscountDetailRoutes (e) {
      this.discountDetailsRoutes.splice(this.discountDetailsRoutes.indexOf(e), 1)
    },
    addDiscountDetailPaymentTypes () {
      this.addPaymentTypeButtonValid = false
      this.discountDetailsPaymentTypes.push(this.discountDetail)
      this.initNull('DiscountDetail')
    },
    removeDiscountDetailPaymentTypes (e) {
      this.discountDetailsPaymentTypes.splice(this.discountDetailsPaymentTypes.indexOf(e), 1)
    },
    addDiscountCustomerSqls () {
      // this.$bvModal.show('approve-assurance-modal')
      this.discountCustomerSqls.push(this.discountCustomerSql)
      this.initNull('DiscountCustomerSql')
    },
    removeDiscountCustomerSqls (e) {
      this.discountCustomerSqls.splice(this.discountCustomerSqls.indexOf(e), 1)
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Code: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
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
      this.searchItemsByModel('VisionNextBranch/api/Branch/Search', 'branchs', model).then(res => {
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
      this.searchItemsByModel('VisionNextRoute/api/Route/Search', 'routes', model).then(res => {
        loading(false)
      })
    },
    DiscountGivensValid () {
      this.ColumnControl()
      if (this.form.DiscountTypeId == null && this.form.DiscountKindId == null) {
        this.$toasted.show(this.$t('insert.discount.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
      } else {
        this.discountGivenAddButtonValid = true
      }
    },
    DiscountCustomersValid () {
      if (this.form.BranchCriteriaId == null) {
        this.$toasted.show(this.$t('insert.discount.requiredBranchCriteria'), {
          type: 'error',
          keepOnHover: true,
          position: 'top-center',
          duration: '5000'
        })
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
        this.form.DiscountGivens = this.discountGivens
        this.form.DiscountTakens = this.discountTakens
        this.form.DiscountCustomers = this.discountCustomers
        this.form.DiscountExcludedCustomers = this.discountExcludedCustomers
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
        console.log(this.form)
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
    initNull (type) {
      if (type === 'DiscountGiven') {
        this.discountGiven = {
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          TableName: null,
          ColumnName: null,
          ColumnValue: null,
          GivenQuantity: null,
          DiscountRate: null,
          DiscountTotal: null,
          StartValue: null,
          FinishValue: null
        }
      } else if (type === 'DiscountTaken') {
        this.discountTaken = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordState: 2,
          TableName: null,
          ColumnName: null,
          ColumnValue: null,
          TakenQuantity: null,
          MinTakenAmount: null,
          EndTakenQuantity: null,
          MaxTakenAmount: null,
          MinTakenQuantity: null
        }
      } else if (type === 'DiscountCustomer') {
        this.discountCustomer = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordState: 2,
          CustomerId: null,
          CommercialTitle: null,
          LocationId: null,
          CompanyId: null,
          Customer: {
            Description1: null,
            Code: null,
            RecordId: null
          },
          Location: {
            Description1: null,
            Code: null,
            RecordId: null
          }
        }
      } else if (type === 'DiscountExcludedCustomer') {
        this.discountExcludedCustomer = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordState: 2,
          CustomerId: null,
          CommercialTitle: null,
          LocationId: null,
          Customer: {
            Description1: null,
            Code: null,
            RecordId: null
          },
          Location: {
            Description1: null,
            Code: null,
            RecordId: null
          }
        }
      } else if (type === 'DiscountDetail') {
        this.discountDetail = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordState: 2,
          TableName: null,
          ColumnName: null,
          ColumnValue: null,
          BranchId: null,
          Branch: {
            Description1: null,
            Code: null,
            RecordId: null
          },
          RouteId: null,
          Route: {
            Description1: null,
            Code: null,
            RecordId: null
          },
          PaymentTypeId: null,
          PaymentTypeName: null
        }
      } else {
        this.discountCustomerSql = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordState: 2,
          DiscountId: null,
          CustomerSqlId: null
        }
      }
    },
    useBudgetEvent (e) {
      if (e === true) {
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
    selectedDiscountCustomer (e) {
      if (e) {
        this.addDiscountCustomerValid = false
        this.discountCustomer.Location.Description1 = null
        this.discountCustomer.Customer = e
        this.discountCustomer.CustomerId = e.RecordId
        this.discountCustomer.CommercialTitle = e.CommercialTitle
        this.$api.post({RecordId: e.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          if (res && res.Model) {
            let locations = res.Model.CustomerLocations ? res.Model.CustomerLocations.filter(l => l.IsDefaultLocation) : null
            if (locations && locations.length > 0) {
              this.discountCustomer.Location = locations[0]
              this.discountCustomer.LocationId = locations[0].RecordId
              this.addDiscountCustomerValid = true
            }
          }
        })
      } else {
        this.discountCustomer.Customer = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountCustomer.Location = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountCustomer.CommercialTitle = null
        this.discountCustomer.LocationId = null
      }
    },
    selectedDiscountExcludedCustomer (e) {
      if (e) {
        this.addDiscountExcludedCustomerValid = false
        this.discountExcludedCustomer.Location.Description1 = null
        this.discountExcludedCustomer.Customer = e
        this.discountExcludedCustomer.CustomerId = e.RecordId
        this.discountExcludedCustomer.CommercialTitle = e.CommercialTitle
        this.$api.post({RecordId: e.RecordId}, 'Customer', 'Customer/Get').then((res) => {
          if (res && res.Model) {
            let locations = res.Model.CustomerLocations ? res.Model.CustomerLocations.filter(l => l.IsDefaultLocation) : null
            if (locations && locations.length > 0) {
              this.discountExcludedCustomer.Location = locations[0]
              this.discountExcludedCustomer.LocationId = locations[0].RecordId
              this.addDiscountExcludedCustomerValid = true
            }
          }
        })
      } else {
        this.discountExcludedCustomer.Customer = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountExcludedCustomer.Location = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountExcludedCustomer.CommercialTitle = null
        this.discountExcludedCustomer.LocationId = null
      }
    },
    selectedDiscountDetailBranch (e) {
      if (e) {
        this.discountDetail.TableName = 'T_BRANCH'
        this.discountDetail.ColumnName = 'BRANCH_ID'
        this.discountDetail.Branch = e
        this.discountDetail.BranchId = e.RecordId
        this.addBranchButtonValid = true
      } else {
        this.discountDetail.Branch = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountDetail.BranchId = null
        this.addBranchButtonValid = false
      }
    },
    selectedDiscountDetailRoute (e) {
      if (e) {
        this.discountDetail.TableName = 'T_ROUTE'
        this.discountDetail.ColumnName = 'ROUTE_ID'
        this.discountDetail.Route = e
        this.discountDetail.RouteId = e.RecordId
        this.addRouteButtonValid = true
      } else {
        this.discountDetail.Route = {
          Description1: null,
          Code: null,
          RecordId: null
        }
        this.discountDetail.RouteId = null
        this.addRouteButtonValid = false
      }
    },
    selectedDiscountDetailPayment (e) {
      if (e) {
        this.discountDetail.TableName = 'T_PAYMENT_TYPE'
        this.discountDetail.ColumnName = 'PAYMENTTYPE_ID'
        this.discountDetail.PaymentTypeName = e.Description1
        this.discountDetail.PaymentTypeId = e.RecordId
        this.addPaymentTypeButtonValid = true
      } else {
        this.discountDetail.PaymentTypeName = null
        this.discountDetail.PaymentTypeId = null
        this.addPaymentTypeButtonValid = false
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules,
      discountGiven: this.insertRules
    }
  },
  watch: {
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
      this.discountDetail.TableName = 'T_CUSTOMER'
      this.discountDetail.ColumnName = 'CUSTOMER_ID'
      this.customerCriterTabValid = false
      this.customerTabValid = false
      this.customerSqlsTabValid = false
      if (e !== null && e.DecimalValue === 21) {
        this.customerCriterTabValid = true
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
  }
}
</script>
