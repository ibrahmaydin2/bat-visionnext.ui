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
              <v-select :options="discountTypes" @search="searchDicountType" @input="selectedSearchType('DiscountTypeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountKindId" :error="$v.form.DiscountKindId">
              <v-select :options="discountKinds" @search="searchDiscountKind" @input="selectedSearchType('DiscountKindId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="MaxValue" :error="$v.form.MaxValue">
              <b-form-input type="text" v-model="form.MaxValue" :readonly="insertReadonly.MaxValue" />
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <!-- <v-select :options="branchCriterias" @search="searchBranchCriteria" @input="selectedSearchType('BranchCriteriaId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select> -->
              <v-select
                :options="lookup.BRANCH_CRITERIA"
                @input="selectedType('BranchCriteriaId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <v-select :options="customerCriterias" @search="searchCustomerCriteria" @input="selectedSearchType('CustomerCriteriaId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <v-select :options="routeCriterias" @search="searchRouteCriteria" @input="selectedSearchType('RouteCriteriaId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="PaymentCriteriaId" :error="$v.form.PaymentCriteriaId">
              <v-select :options="paymentCriterias" @search="searchPaymentCriteria" @input="selectedSearchType('PaymentCriteriaId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetId" :error="$v.form.BudgetId">
              <v-select :options="budgets" @search="searchBudget" @input="selectedSearchType('BudgetId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="BudgetAmount" :error="$v.form.BudgetAmount">
              <b-form-input type="text" v-model="form.BudgetAmount" :readonly="insertReadonly.BudgetAmount" />
            </NextFormGroup>
            <NextFormGroup item-key="BudgetConsumption" :error="$v.form.BudgetConsumption">
              <b-form-input type="text" v-model="form.BudgetConsumption" :readonly="insertReadonly.BudgetConsumption" />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveStateId" :error="$v.form.ApproveStateId">
              <v-select
                :options="lookup.APPROVE_STATE"
                @input="selectedType('ApproveStateId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="DiscountCategoryId" :error="$v.form.DiscountCategoryId">
              <v-select :options="discountCategories" @search="searchDiscountCategory" @input="selectedSearchType('DiscountCategoryId', $event)" label="Description1">
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
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountGivens')" :active="!developmentMode" @click="DiscountGivensValid()">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.columnName')">
              <b-form-input type="text" v-model="discountGiven.ColumnName" :disabled="!columnNameValid" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.columnValue')">
              <b-form-input type="text" v-model="discountGiven.ColumnValue" :disabled="!columnValueValid" />
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
        <b-tab :title="$t('insert.discount.discountTakens')" :active="!developmentMode">
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
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
        <b-tab :title="$t('insert.discount.discountCustomers')" :active="!developmentMode">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountCustomer.CustomerId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerCode')">
              <b-form-input type="text" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountCustomer.CommercialTitle" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountCustomer.LocationId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.customerCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.commercialTitle')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.location')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountCustomers" :key="i">
                    <b-td>{{w.CustomerId}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.LocationId}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountExcludedCustomers')" :active="!developmentMode">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerName')">
              <b-form-input type="text" v-model="discountExcludedCustomer.CustomerId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.customerCode')">
              <b-form-input type="text" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.commercialTitle')">
              <b-form-input type="text" v-model="discountExcludedCustomer.CommercialTitle" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.location')">
              <b-form-input type="text" v-model="discountExcludedCustomer.LocationId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.customerName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.customerCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.commercialTitle')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.location')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountExcludedCustomers" :key="i">
                    <b-td>{{w.CustomerId}}</b-td>
                    <b-td>{{w.CommercialTitle}}</b-td>
                    <b-td>{{w.LocationId}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountExludedCustomer(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountDetails')" :active="!developmentMode">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.branchName')">
              <b-form-input type="text" v-model="discountDetail.BranchId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.branchCode')">
              <b-form-input type="text" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.routeName')">
              <b-form-input type="text" v-model="discountDetail.RouteId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.discount.paymentType')">
              <b-form-input type="text" v-model="discountDetail.PaymentTypeId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.discount.branchName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.branchCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.routeName')}}</span></b-th>
                  <b-th><span>{{$t('insert.discount.paymentType')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in discountDetails" :key="i">
                    <b-td>{{w.BranchId}}</b-td>
                    <b-td>{{w.RouteId}}</b-td>
                    <b-td>{{w.PaymentTypeId}}</b-td>
                    <b-td class="text-center"><i @click="removeDiscountDetail(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.discount.discountCustomerSqls')" :active="!developmentMode">
          <b-row>
            <NextFormGroup :title="$t('insert.discount.customerSql')">
              <b-form-input type="text" v-model="discountCustomerSql.CustomerSqlId" :readonly="insertReadonly.ColumnName" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
        CompanyId: null
      },
      discountExcludedCustomer: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        CustomerId: null,
        CommercialTitle: null,
        LocationId: null
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
        RouteId: null,
        PaymentTypeId: null
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
      discountDetails: [],
      discountCustomerSqls: [],
      discountRateValid: false,
      discountTotalValid: false,
      startValueValid: false,
      finishValueValid: false,
      columnNameValid: false,
      columnValueValid: false,
      discountGivenAddButtonValid: false,
      takenQuantityValid: false,
      endTakenQuantityValid: false,
      maxTakenAmountValid: false,
      minTakenQuantityValid: false,
      minTakenAmountValid: false
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['discountTypes', 'discountKinds', 'branchCriterias', 'customerCriterias', 'routeCriterias', 'paymentCriterias', 'budgets', 'discountCategories'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // Sayfa açılışında yüklenmesi gereken search items için kullanılır.
      // lookup harici dataya ihtiyaç yoksa silinebilir
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label === 'DiscountKindId') {
          if (model.RecordId === 1 || model.RecordId === 7) {
            this.discountRateValid = true
            this.startValueValid = true
            this.finishValueValid = true
            if (model.RecordId === 7) {
              this.columnNameValid = true
              this.columnValueValid = true
              if (this.form.DiscountTypeId === 1) {
                this.takenQuantityValid = true
                this.endTakenQuantityValid = true
              }
              if (this.form.DiscountTypeId === 2) {
                this.maxTakenAmountValid = true
              }
            }
          } else if (model.RecordId === 2 || model.RecordId === 8) {
            this.discountTotalValid = true
            this.startValueValid = true
            this.finishValueValid = true
            if (model.RecordId === 8) {
              this.columnNameValid = true
              this.columnValueValid = true
              if (this.form.DiscountTypeId === 1) {
                this.takenQuantityValid = true
                this.endTakenQuantityValid = true
              }
              if (this.form.DiscountTypeId === 2) {
                this.maxTakenAmountValid = true
              }
            } else {
              if (this.form.DiscountTypeId === 2) {
                this.minTakenAmountValid = true
              }
              if (this.form.DiscountTypeId === 1) {
                this.minTakenQuantityValid = true
              }
            }
          }
        }
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    addDiscountGiven () {

    },
    removeDiscountGiven (e) {

    },
    searchDicountType (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchhDiscountKind (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchBranchCriteria (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchCustomerCriteria (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchRouteCriteria (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchPaymentCriteria (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchBudget (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchDiscountCategory (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    DiscountGivensValid () {
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
        this.createData()
        // update işlemiyse
        // this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules,
      discountGiven: this.insertRules
    }
  }
}
</script>
