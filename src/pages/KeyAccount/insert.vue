<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'KeyAccount' }">
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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" :disabled="form.Code !== null"/>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.CardTypeId != null ? insertVisible.CardTypeId : developmentMode" md="3" lg="3">
            <b-form-group :label="insertTitle.CardTypeId + (insertRequired.CardTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardTypeId.$error }">
              <v-select :options="customerCardTypes" @input="selectedSearchType('CardTypeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusReasonId != null ? insertVisible.StatusReasonId : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.StatusReasonId + (insertRequired.StatusReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusReasonId.$error }">
              <v-select v-model="selectedCancelReason" disabled :options="cancelReasons" @input="selectedSearchType('statusReasonId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="true"></NextCheckBox>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.RecordTypeId != null ? insertVisible.RecordTypeId : developmentMode" md="3" lg="3">
            <b-form-group :label="insertTitle.RecordTypeId + (insertRequired.RecordTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RecordTypeId.$error }">
              <v-select v-model="recordType" :options="recordTypeList" @input="selectedSearchType('RecordTypeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="form.RecordTypeId === 4" cols="12" md="3" lg="3">
            <b-form-group :label="$t('insert.customer.mainOfBranch') + (' *')" :class="{ 'form-group--error': $v.mainBranch.customer.$error }">
              <v-select v-model="mainBranch.customer" :options="(!customers ? [] : customers.filter(c => c.RecordTypeId === 3 && c.StatusId === 1))" @search="onCustomerSearch" @input="selectedSearchType('UpperCustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
              </b-form-group>
          </b-col>
          <b-col v-if="form.RecordTypeId === 4" cols="12" md="3" lg="3">
            <b-form-group :label="$t('insert.customer.AuthorizedBranch') + (' *')" :class="{ 'form-group--error': $v.mainBranch.branch.$error }">
              <v-select v-model="mainBranch.branch" label="BranchCommercialTitle" :filterable="false" :options="branchList" @search="onBranchSearch">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template slot="option" slot-scope="option">
                  {{ option.BranchCommercialTitle }}
                </template>
              </v-select>
              </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.CommercialTitle != null ? insertVisible.CommercialTitle : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CommercialTitle + (insertRequired.CommercialTitle === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CommercialTitle.$error }">
                <b-form-input type="text" v-model="form.CommercialTitle" :readonly="insertReadonly.CommercialTitle" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LicenseNumber != null ? insertVisible.LicenseNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.LicenseNumber + (insertRequired.LicenseNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxCustomerTypeId != null ? insertVisible.TaxCustomerTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxCustomerTypeId + (insertRequired.TaxCustomerTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxCustomerTypeId.$error }">
                <v-select
                  :options="lookup.TAX_CUSTOMER_TYPE"
                  @input="selectedType('TaxCustomerTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.TaxOffice != null ? insertVisible.TaxOffice : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxOffice + (insertRequired.TaxOffice === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxOffice.$error }">
                <b-form-input type="text" v-model="form.TaxOffice" :readonly="insertReadonly.TaxOffice" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxNumber + (insertRequired.TaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
                <b-form-input type="number" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" :maxLength="taxNumberReq" :oninput="maxLengthControl"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Alias != null ? insertVisible.Alias : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Alias + (insertRequired.Alias === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Alias.$error }">
                <b-form-input type="text" v-model="form.Alias" :readonly="insertReadonly.Alias" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TradeLicenseNumber != null ? insertVisible.TradeLicenseNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TradeLicenseNumber + (insertRequired.TradeLicenseNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TradeLicenseNumber.$error }">
                <b-form-input type="text" v-model="form.TradeLicenseNumber" :readonly="insertReadonly.TradeLicenseNumber" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.BlockReasonId != null ? insertVisible.BlockReasonId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BlockReasonId + (insertRequired.BlockReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BlockReasonId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_BLOCK_REASON"
                  @input="selectedType('BlockReasonId', $event)"
                  label="Label"
                  :disabled="true"
                  v-model="customerBlackReason"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerInvoiceTypeId != null ? insertVisible.CustomerInvoiceTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerInvoiceTypeId + (insertRequired.CustomerInvoiceTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerInvoiceTypeId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_INVOICE_TYPE"
                  @input="selectedType('CustomerInvoiceTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.CustomerRegion5Id != null ? insertVisible.CustomerRegion5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerRegion5Id + (insertRequired.CustomerRegion5Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerRegion5Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_REGION_5"
                  @input="selectedType('CustomerRegion5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MarketingRegion5Id != null ? insertVisible.MarketingRegion5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.MarketingRegion5Id + (insertRequired.MarketingRegion5Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MarketingRegion5Id.$error }">
                <v-select
                  :options="lookup.MARKETING_REGION_5"
                  @input="selectedType('MarketingRegion5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RouteCode != null ? insertVisible.RouteCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RouteCode + (insertRequired.RouteCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteCode.$error }">
                <b-form-input type="text" v-model="form.RouteCode" :readonly="insertReadonly.RouteCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LicenseValidDate != null ? insertVisible.LicenseValidDate : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.LicenseValidDate + (insertRequired.LicenseValidDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseValidDate.$error }">
                <b-form-datepicker :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.LicenseValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.IsBlocked != null ? insertVisible.IsBlocked : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsBlocked + (insertRequired.IsBlocked === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlocked.$error }">
                 <NextCheckBox v-model="form.IsBlocked" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsOrderChangeUnitary + (insertRequired.IsOrderChangeUnitary === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                  <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.UseEDispatch != null ? insertVisible.UseEDispatch : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEDispatch + (insertRequired.UseEDispatch === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEDispatch.$error }">
                  <NextCheckBox v-model="form.UseEDispatch" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsWarehouseSale + (insertRequired.IsWarehouseSale === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                  <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.UseEInvoice != null ? insertVisible.UseEInvoice : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEInvoice + (insertRequired.UseEInvoice === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEInvoice.$error }">
                  <NextCheckBox v-model="form.UseEInvoice" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Code') + ' *'" :class="{ 'form-group--error': $v.customerLocations.code.$error }">
                <b-form-input type="text" v-model="customerLocations.code" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Location_Description1') + ' *'" :class="{ 'form-group--error': $v.customerLocations.description1.$error }">
                <b-form-input type="text" v-model="customerLocations.description1" />
              </b-form-group>
            </b-col>
          </b-row>
          <NextAddress
            v-model="address"
            :required="true"
            :address-error="$v.customerLocations.addressDetail.$error"
            :city-error="$v.customerLocations.cityId.$error"
            :district-error="$v.customerLocations.districtId.$error"
          />
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PostCode') + ' *'" :class="{ 'form-group--error': $v.customerLocations.postCode.$error }">
                <b-form-input type="text" v-model="customerLocations.postCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_XPosition')">
                <b-form-input type="text" v-model="customerLocations.xPosition" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_YPosition')">
                <b-form-input type="text" v-model="customerLocations.yPosition" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6">
              <b-form-group :label="$t('insert.customer.Model_AddressDescription')">
                <b-form-input type="text" v-model="customerLocations.addressDescription" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ContactName')">
                <b-form-input type="text" v-model="customerLocations.contactName" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PhoneNumber1') + ' *'" :class="{ 'form-group--error': $v.customerLocations.phoneNumber1.$error }">
                <b-form-input type="number" v-model="customerLocations.phoneNumber1" maxLength="10" :oninput="maxLengthControl"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_FaxNumber')">
                <b-form-input type="number" v-model="customerLocations.faxNumber" maxLength="10" :oninput="maxLengthControl"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDefaultLocation')">
                <b-form-radio-group v-model="customerLocations.isDefaultLocation">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsInvoiceAddress')">
                <b-form-radio-group v-model="customerLocations.isInvoiceAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDeliveryAddress')">
                <b-form-radio-group v-model="customerLocations.isDeliveryAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isRouteNode')">
                <b-form-radio-group v-model="customerLocations.isRouteNode">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="9" lg="6">
              <b-form-group :label="$t('insert.customer.Model_Genexp1')">
                <b-form-input type="text" v-model="customerLocations.genexp1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="9" lg="6">
              <b-form-group :label="$t('insert.customer.Model_Genexp2')">
                <b-form-input type="text" v-model="customerLocations.genexp2" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="12" lg="12" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerLocations" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.customerLocations.length > 0">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_IsDefaultLocation')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_IsInvoiceAddress')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_IsDeliveryAddress')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.isRouteNode')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerLocations" :key="i">
                  <b-td>{{r.code}}</b-td>
                  <b-td>{{r.description1}}</b-td>
                  <b-td>{{r.isDefaultLocation == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                  <b-td>{{r.isInvoiceAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                  <b-td>{{r.isDeliveryAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                  <b-td>{{r.isRouteNode == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerLocation(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category3Id + (insertRequired.Category3Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_3"
                  @input="selectedType('Category3Id', $event)"
                  label="Label"
                  v-model="customerCategory3"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category2Id + (insertRequired.Category2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_2"
                  @input="selectedType('Category2Id', $event); customerCategory3 = null"
                  label="Label"
                  v-model="customerCategory2"
                  :disabled="true"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category1Id != null ? insertVisible.Category1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category1Id + (insertRequired.Category1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_1"
                  @input="selectedType('Category1Id', $event)"
                  label="Label"
                  v-model="customerCategory1"
                  :disabled="true"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_GROUP"
                  @input="selectedType('GroupId', $event)"
                  label="Label"
                  v-model="customerGroup"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.ClassId != null ? insertVisible.ClassId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ClassId + (insertRequired.ClassId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CLASS"
                  @input="selectedType('ClassId', $event)"
                  label="Label"
                  v-model="customerClass"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SalesDocumentTypeId + (insertRequired.SalesDocumentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                  <v-select
                    :options="lookup.SALES_DOCUMENT_TYPE"
                    @input="selectedType('SalesDocumentTypeId', $event)"
                    label="Label"
                    v-model="salesDocumentType"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.OwnerTypeId != null ? insertVisible.OwnerTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.OwnerTypeId + (insertRequired.OwnerTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.OwnerTypeId.$error }">
                  <v-select
                    :options="lookup.OWNER_TYPE"
                    @input="selectedType('OwnerTypeId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.ClassProposalId != null ? insertVisible.ClassProposalId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClassProposalId + (insertRequired.ClassProposalId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalId.$error }">
                  <v-select
                    :options="lookup.CUSTOMER_CLASS_PROPOSAL"
                    @input="selectedType('ClassProposalId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.SalesMethodId != null ? insertVisible.SalesMethodId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SalesMethodId + (insertRequired.SalesMethodId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesMethodId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_SALES_METHOD"
                  @input="selectedType('SalesMethodId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GeographicEnvironmentId != null ? insertVisible.GeographicEnvironmentId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GeographicEnvironmentId + (insertRequired.GeographicEnvironmentId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GeographicEnvironmentId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_GEOGRAPHIC_ENVIRONMENT"
                  @input="selectedType('GeographicEnvironmentId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TradeFocusId != null ? insertVisible.TradeFocusId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TradeFocusId + (insertRequired.TradeFocusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TradeFocusId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_TRADE_FOCUS"
                  @input="selectedType('TradeFocusId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.InvoiceCombineRuleId + (insertRequired.InvoiceCombineRuleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
                <v-select
                  :options="lookup.INVOICE_COMBINE_RULE"
                  @input="selectedType('InvoiceCombineRuleId', $event)"
                  label="Label"
                  v-model="invoiceCombineRule"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.ClassProposalReasonId != null ? insertVisible.ClassProposalReasonId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ClassProposalReasonId + (insertRequired.ClassProposalReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalReasonId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CLASS_PROPOSAL_REASON"
                  @input="selectedType('ClassProposalReasonId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BackMarginGroupId != null ? insertVisible.BackMarginGroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BackMarginGroupId + (insertRequired.BackMarginGroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BackMarginGroupId.$error }">
                <v-select
                  :options="lookup.BACK_MARGIN_GROUP"
                  @input="selectedType('BackMarginGroupId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.KindId != null ? insertVisible.KindId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.KindId + (insertRequired.KindId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.KindId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_KIND"
                  @input="selectedType('KindId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.PriceListCategoryId + (insertRequired.PriceListCategoryId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                <v-select
                  :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                  @input="selectedType('PriceListCategoryId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CreditLimit != null ? insertVisible.CreditLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CreditLimit + (insertRequired.CreditLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditLimit.$error }">
                <b-form-input type="number" v-model="form.CreditLimit" :readonly="insertReadonly.CreditLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RiskLimit != null ? insertVisible.RiskLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RiskLimit + (insertRequired.RiskLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RiskLimit.$error }">
                <b-form-input type="number" v-model="form.RiskLimit" :readonly="insertReadonly.RiskLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrentCredit != null ? insertVisible.CurrentCredit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentCredit + (insertRequired.CurrentCredit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentCredit.$error }">
                <b-form-input type="number" v-model="form.CurrentCredit" :readonly="insertReadonly.CurrentCredit" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.CurrentRisk != null ? insertVisible.CurrentRisk : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentRisk + (insertRequired.CurrentRisk === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentRisk.$error }">
                <b-form-input type="number" v-model="form.CurrentRisk" :readonly="insertReadonly.CurrentRisk" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ReservedLimit != null ? insertVisible.ReservedLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ReservedLimit + (insertRequired.ReservedLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ReservedLimit.$error }">
                <b-form-input type="text" v-model="form.ReservedLimit" :readonly="insertReadonly.ReservedLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ZdebitAccountRemainder != null ? insertVisible.ZdebitAccountRemainder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ZdebitAccountRemainder + (insertRequired.ZdebitAccountRemainder === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ZdebitAccountRemainder.$error }">
                <b-form-input type="number" v-model="form.ZdebitAccountRemainder" :readonly="insertReadonly.ZdebitAccountRemainder" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ZcreditAccountRemainder != null ? insertVisible.ZcreditAccountRemainder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ZcreditAccountRemainder + (insertRequired.ZcreditAccountRemainder === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ZcreditAccountRemainder.$error }">
                <b-form-input type="number" v-model="form.ZcreditAccountRemainder" :readonly="insertReadonly.ZcreditAccountRemainder" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.DiscountPercent1 != null ? insertVisible.DiscountPercent1 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountPercent1 + (insertRequired.DiscountPercent1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent1.$error }">
                <b-form-input type="number" v-model="form.DiscountPercent1" :readonly="insertReadonly.DiscountPercent1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountPercent2 != null ? insertVisible.DiscountPercent2 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountPercent2 + (insertRequired.DiscountPercent2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent2.$error }">
                <b-form-input type="number" v-model="form.DiscountPercent2" :readonly="insertReadonly.DiscountPercent2" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SapCustomerId != null ? insertVisible.SapCustomerId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SapCustomerId + (insertRequired.SapCustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SapCustomerId.$error }">
                <b-form-input type="text" v-model="form.SapCustomerId" :readonly="insertReadonly.SapCustomerId" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.DeliveryDayParam != null ? insertVisible.DeliveryDayParam : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DeliveryDayParam + (insertRequired.DeliveryDayParam === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DeliveryDayParam.$error }">
                <b-form-input type="number" v-model="form.DeliveryDayParam" :readonly="insertReadonly.DeliveryDayParam" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PaymentPeriod != null ? insertVisible.PaymentPeriod : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.PaymentPeriod + (insertRequired.PaymentPeriod === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PaymentPeriod.$error }">
                <v-select :options="paymentPeriods" @input="selectedSearchType('PaymentPeriod', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TCIBreak1Id != null ? insertVisible.TCIBreak1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TCIBreak1Id + (insertRequired.TCIBreak1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TCIBreak1Id.$error }">
                <v-select
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TCIBreak1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TCIBreak2Id != null ? insertVisible.TCIBreak2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TCIBreak2Id + (insertRequired.TCIBreak2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TCIBreak2Id.$error }">
                <v-select
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TCIBreak2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.StatementDay != null ? insertVisible.StatementDay : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.StatementDay + (insertRequired.StatementDay === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatementDay.$error }">
                <v-select
                :options="statementDays"
                @input="selectedSearchType('StatementDay', $event)"
                label="Description1"
                :disabled="!form.Statement"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DefaultPaymentTypeId + (insertRequired.DefaultPaymentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                <v-select v-model="paymentType" :options="paymentTypes" @input="selectedSearchType('DefaultPaymentTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.AllowOverLimit != null ? insertVisible.AllowOverLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.AllowOverLimit + (insertRequired.AllowOverLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.AllowOverLimit.$error }">
                <NextCheckBox v-model="form.AllowOverLimit" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsDirectDebit != null ? insertVisible.IsDirectDebit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsDirectDebit + (insertRequired.IsDirectDebit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsDirectDebit.$error }">
                <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle :disabled="paymentType.Code !== 'AH'"></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualInvoiceClosure != null ? insertVisible.ManualInvoiceClosure : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualInvoiceClosure + (insertRequired.ManualInvoiceClosure === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualInvoiceClosure.$error }">
                <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle :disabled="true"></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Statement + (insertRequired.Statement === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <NextCheckBox v-model="form.Statement" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.bank')">
                <v-select :options="banks" @input="selectedBank" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrencyId') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.currencyId.$error }">
                <v-select  :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :options="currency" @input="selectedCurrency" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditDescriptionId') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.creditDescriptionId.$error }">
                <v-select :options="credits" @input="selectedCreditDescription" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditAmount') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.creditAmount.$error }">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" type="text" v-model="customerCreditHistories.creditAmount" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.debtor')">
                <b-form-input  :disabled="customerCreditHistories.creditDescriptionCode!== 'SN'" type="text" v-model="customerCreditHistories.debtor" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.bail')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'KF' || customerCreditHistories.creditDescriptionCode!== 'SN'" type="text" v-model="customerCreditHistories.bail" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditLimit') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.creditLimit.$error }">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" type="text" v-model="customerCreditHistories.creditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.riskLimit.$error }">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" type="text" v-model="customerCreditHistories.riskLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.landOffice')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode !== 'IM'" type="text" v-model="customerCreditHistories.landOffice" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.plate')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode !== 'IM'" type="text" v-model="customerCreditHistories.plate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textDate')">
                <b-form-datepicker :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.textDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditStartDate') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.creditStartDate.$error }">
                <b-form-datepicker :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditEndDate') + ' *'" :class="{ 'form-group--error': $v.customerCreditHistories.creditEndDate.$error }">
                <b-form-datepicker :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryDate')">
                <b-form-datepicker :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.notaryDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.traficRegistry')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'MV'" type="text" v-model="customerCreditHistories.traficRegistry" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textNo')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'IM'" type="number" v-model="customerCreditHistories.textNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryNo')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'MV'" type="number" v-model="customerCreditHistories.notaryNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.plateNumber')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'MV'" type="text" v-model="customerCreditHistories.plateNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.mortgageValue')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'IM'" type="text" v-model="customerCreditHistories.mortgageValue" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.allowOverLimit')">
                <b-form-radio-group :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" v-model="customerCreditHistories.allowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addCreditHistories" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_CreditAmount')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_CreditLimit')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_RiskLimit')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerCreditHistories" :key="i">
                  <b-td>{{r.creditAmount}}</b-td>
                  <b-td>{{r.creditLimit}}</b-td>
                  <b-td>{{r.riskLimit}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerCreditHistory(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_PaymentTypeId') + ' *'" :class="{ 'form-group--error': $v.customerPaymentTypes.paymentTypeId.$error }">
                    <v-select  v-model="customerPaymentType" :options="paymentTypes" @input="selectedPaymentTypeArr" label="Description1"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <AddDetailButton @click.native="addCustomerPaymentType" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.Model_PaymentTypeId')}}</span></b-th>
                    <b-th><span>{{$t('list.operations')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in form.customerPaymentTypes" :key="i">
                      <b-td>{{r.paymentType}}</b-td>
                      <b-td class="text-center"><i @click="removeCustomerPaymentType(r)" class="far fa-trash-alt text-danger"></i></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col v-if="insertVisible.TextField1 != null ? insertVisible.TextField1 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TextField1 + (insertRequired.TextField1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TextField1.$error }">
                <b-form-input type="text" v-model="form.TextField1" :readonly="insertReadonly.TextField1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TextField2 != null ? insertVisible.TextField2 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TextField2 + (insertRequired.TextField2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TextField2.$error }">
                <b-form-input type="text" v-model="form.TextField2" :readonly="insertReadonly.TextField2" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Barcode != null ? insertVisible.Barcode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Barcode + (insertRequired.Barcode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Barcode.$error }">
                <b-form-input type="text" v-model="form.Barcode" :readonly="insertReadonly.Barcode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.HoldsAsset != null ? insertVisible.HoldsAsset : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.HoldsAsset + (insertRequired.HoldsAsset === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.HoldsAsset.$error }">
                <v-select
                  :options="lookup.CUSTOMER_HOLD_ASSET"
                  @input="selectedType('HoldsAsset', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.Contracted != null ? insertVisible.Contracted : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Contracted + (insertRequired.Contracted === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Contracted.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CONTRACTED"
                  @input="selectedType('Contracted', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountCode') + ' *'" :class="{ 'form-group--error': $v.customerItemDiscounts.code.$error }">
                <v-select v-model="customerItemDiscounts.product" :options="items" :filterable="false" @search="onItemsSearch" @input="selectedItem" label="Description1">
                    <template slot="no-options">
                      {{$t('insert.min3')}}
                    </template>
                    <template v-slot:option="option">
                      {{option.Code + ' - ' + option.Description1}}
                    </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountDescription') + ' *'" :class="{ 'form-group--error': $v.customerItemDiscounts.description1.$error }">
                <b-form-input type="text" v-model="customerItemDiscounts.description1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent1')">
                <b-form-input type="text" v-model="customerItemDiscounts.discountPercent1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent2')">
                <b-form-input type="text" v-model="customerItemDiscounts.discountPercent2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountTci1')">
                <v-select :options="lookup.TCI_BREAKDOWN" @input="selectedTCi1" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountTci2')">
                <v-select :options="lookup.TCI_BREAKDOWN" @input="selectedTCi2" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <AddDetailButton @click.native="addItemDiscount" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.discountDescription')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_DiscountPercent1')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_DiscountPercent2')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerItemDiscounts" :key="i">
                  <b-td>{{r.description1}}</b-td>
                  <b-td>{{r.discountPercent1}}</b-td>
                  <b-td>{{r.discountPercent2}}</b-td>
                  <b-td class="text-center"><i @click="removeItemDiscount(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')"  @click.prevent="tabValidation()">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.labelId') + ' *'" :class="{ 'form-group--error': $v.customerTag.tagDefinition.$error }">
                <v-select v-model="customerTag.tagDefinition" :options="customerLabels" @input="selectedLabelId" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.labelValueId') + ' *'" :class="{ 'form-group--error': $v.customerTag.tagValue.$error }">
                <v-select v-model="customerTag.tagValue" :options="customerLabelValues" @input="selectedLabelValueId" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerLabel" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.labelId')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.labelValueId')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerLabels" :key="i">
                  <b-td>{{r.label}}</b-td>
                  <b-td>{{r.labelValue}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerLabel(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        customerLocations: [],
        customerCreditHistories: [],
        customerPaymentTypes: [],
        customerItemDiscounts: [],
        customerLabels: [],
        customerTouchpoints: [],
        RecordTypeId: null,
        CurrentCredit: null,
        CurrentRisk: null,
        ZdebitAccountRemainder: null,
        ZcreditAccountRemainder: null,
        FinanceCode: null,
        DiscountPercent1: null,
        DeliveryDayParam: null,
        TCIBreak1Id: null,
        Statement: null,
        StatementDay: null,
        DiscountPercent2: null,
        ManualInvoiceClosure: null,
        SapCustomerId: null,
        TCIBreak2Id: null,
        IsDirectDebit: null,
        AllowOverLimit: null,
        Genexp1: null,
        Code: null,
        CardTypeId: null,
        Description1: null,
        CommercialTitle: null,
        TaxOffice: null,
        TaxNumber: null,
        LicenseNumber: null,
        StatusId: null,
        StatusReasonId: null,
        LicenseValidDate: null,
        IsBlocked: null,
        BlockReasonId: null,
        IsOrderChangeUnitary: null,
        UseEInvoice: null,
        TradeLicenseNumber: null,
        CustomerInvoiceTypeId: null,
        TaxCustomerTypeId: null,
        RouteCode: null,
        IsWarehouseSale: null,
        TextField1: null,
        TextField2: null,
        Barcode: null,
        HoldsAsset: null,
        Contracted: null,
        LabelId: null,
        LabelValueId: null,
        CustomerRegion5Id: null,
        MarketingRegion5Id: null,
        Alias: null,
        UseEDispatch: null,
        Category3Id: null,
        Category2Id: null,
        Category1Id: null,
        GroupId: null,
        ClassId: null,
        KindId: null,
        OwnerTypeId: null,
        ClassProposalId: null,
        ClassProposalReasonId: null,
        SalesMethodId: null,
        GeographicEnvironmentId: null,
        TradeFocusId: null,
        InvoiceCombineRuleId: null,
        SalesDocumentTypeId: null,
        BackMarginGroupId: null,
        DefaultPaymentTypeId: null,
        PaymentPeriod: null,
        PriceListCategoryId: null,
        CreditLimit: null,
        RiskLimit: null,
        ReservedLimit: null,
        UpperCustomerId: null
      },
      routeName1: 'Customer',
      routeName2: 'Customer',
      customerLocations: {
        code: null,
        description1: null,
        addressDetail: null,
        phoneNumber1: null,
        faxNumber: null,
        addressDescription: null,
        genexp1: null,
        contactName: null,
        cityId: null,
        xPosition: null,
        yPosition: null,
        districtId: null,
        genexp2: null,
        postCode: null,
        alias: null,
        isDefaultLocation: 0,
        isInvoiceAddress: 0,
        isDeliveryAddress: 0,
        isRouteNode: 0
      },
      customerCreditHistories: {
        creditAmount: null,
        creditDescriptionId: null,
        creditStartDate: null,
        bankId: null,
        currencyId: null,
        creditEndDate: null,
        debtor: null,
        bail: null,
        textDate: null,
        landOffice: null,
        notaryDate: null,
        traficRegistry: null,
        textNo: null,
        creditLimit: null,
        notaryNo: null,
        plateNumber: null,
        riskLimit: null,
        mortgageValue: null,
        dbsPriority: null,
        allowOverLimit: null,
        plate: null,
        creditDescriptionCode: null
      },
      customerPaymentTypes: {
        paymentType: null,
        paymentTypeId: null
      },
      customerItemDiscounts: {
        code: null,
        description1: null,
        discountPercent1: null,
        discountPercent2: null,
        tciBreak1Id: null,
        tciBreak2Id: null,
        product: null
      },
      customerTouchpoints: {
        touchpointPriority: null,
        touchpointTypeId: null
      },
      routeName: this.$route.meta.baseLink,
      taxNumberReq: 10,
      selectedCancelReason: null,
      locationDistirictLabel: null,
      locationCityLabel: null,
      address: {},
      customerCategory1: null,
      customerCategory2: null,
      customerCategory3: null,
      customerPaymentType: null,
      customerTag: {
        tagDefinition: null,
        tagValue: null
      },
      paymentType: {},
      recordType: null,
      mainBranch: {
        customer: null,
        branch: null
      },
      customerBlackReason: {},
      customerGroup: {},
      customerClass: {},
      salesDocumentType: {},
      invoiceCombineRule: {}
    }
  },
  computed: {
    ...mapState(['statementDays', 'distiricts', 'banks', 'currency', 'paymentTypes', 'items', 'customerLabels', 'customerLabelValues', 'customerCardTypes', 'cancelReasons', 'paymentPeriods', 'credits', 'customers', 'recordTypeList', 'branchList'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
    var selectedCustomer = this.$store.state.SelectedCustomer
    if (selectedCustomer && selectedCustomer.RecordId > 0) {
      this.mainBranch.customer = selectedCustomer
      this.form.UpperCustomerId = selectedCustomer.RecordId
      this.form.RecordTypeId = 4
      this.$store.commit('setValues', {
        name: 'SelectedCustomer',
        data: {
          Values: {}
        }
      })
    }
  },
  methods: {
    getInsertPage (e) {
      this.createManualCode().then(() => {
        this.customerLocations.code = `${this.form.Code} - ${this.form.customerLocations.length ? this.form.customerLocations.length + 1 : 1}`
      })
      this.$store.dispatch('getLookups', {...this.query, type: 'CREDIT_DESCRIPTION', name: 'credits'})

      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCustomer/api/CustomerCardType/Search', name: 'customerCardTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/CancelReason/Search', name: 'cancelReasons'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currency'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/FixedTerm/Search', name: 'paymentPeriods'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/Label/Search', name: 'customerLabels'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/LabelDetail/Search', name: 'customerLabelValues'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysDay/Search', name: 'statementDays'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBank/api/Bank/Search', name: 'banks'})
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/CustomerRecordType/Search',
        name: 'recordTypeList',
        andConditionModel: {
          RecordIds: [3, 4]
        }
      })
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      this.form[label] = model.DecimalValue

      if (label === 'TaxCustomerTypeId') {
        if (model.Code === 'TZK') {
          this.taxNumberReq = 10
        } else {
          this.taxNumberReq = 11
        }
        this.insertRules.TaxNumber = {
          required, minLength: minLength(this.taxNumberReq), maxLength: maxLength(this.taxNumberReq)
        }
      }
    },
    save () {
      this.$v.form.$touch()
      this.$v.mainBranch.$touch()
      if (this.$v.form.$error || this.$v.mainBranch.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.LicenseValidDate = this.dateConvertToISo(this.form.LicenseValidDate)
        this.createData()
      }
    },
    selectedBank (e) {
      if (e) {
        this.customerCreditHistories.bankId = e.RecordId
      } else {
        this.customerCreditHistories.bankId = null
      }
    },
    selectedCurrency (e) {
      if (e) {
        this.customerCreditHistories.currencyId = e.RecordId
      } else {
        this.customerCreditHistories.currencyId = null
      }
    },
    selectedCreditDescription (e) {
      if (e) {
        this.customerCreditHistories.creditDescriptionId = e.DecimalValue
        this.customerCreditHistories.creditDescriptionCode = e.Code
      } else {
        this.customerCreditHistories.creditDescriptionId = null
        this.customerCreditHistories.creditDescriptionCode = null
      }
    },
    selectedPaymentTypeArr (e) {
      if (e) {
        this.customerPaymentTypes.paymentType = e.Description1
        this.customerPaymentTypes.paymentTypeId = e.RecordId
      } else {
        this.customerPaymentTypes.paymentType = null
        this.customerPaymentTypes.paymentTypeId = null
      }
    },
    selectedTCi1 (e) {
      if (e) {
        this.customerItemDiscounts.tciBreak1Id = e.DecimalValue
      } else {
        this.customerItemDiscounts.tciBreak1Id = null
      }
    },
    selectedTCi2 (e) {
      if (e) {
        this.customerItemDiscounts.tciBreak2Id = e.DecimalValue
      } else {
        this.customerItemDiscounts.tciBreak2Id = null
      }
    },
    selectedItem (e) {
      if (e) {
        this.customerItemDiscounts.code = e.RecordId
      } else {
        this.customerItemDiscounts.code = null
      }
    },
    selectedLabelId (e) {
      if (e) {
        this.customerLabel = e.Description1
        this.customerLabelId = e.RecordId
      } else {
        this.customerLabel = null
        this.customerLabelId = null
      }
    },
    selectedLabelValueId (e) {
      if (e) {
        this.customerLabel = e.Description1
        this.customerLabelValue = e.RecordId
      } else {
        this.customerLabelValue = null
      }
    },
    selectedTouchpointPriority (e) {
      if (e) {
        this.customerTouchpoints.touchpointPriority = e.DecimalValue
      } else {
        this.customerTouchpoints.touchpointPriority = null
      }
    },
    selectedTouchpointType (e) {
      if (e) {
        this.customerTouchpoints.touchpointTypeId = e.DecimalValue
      } else {
        this.customerTouchpoints.touchpointTypeId = null
      }
    },
    addCustomerTouchpoint (item) {
      this.form.customerTouchpoints.push({
        touchpointPriorityNumber: this.customerTouchpoints.touchpointPriority,
        touchpointTypeId: this.customerTouchpoints.touchpointTypeId
      })
    },
    removeCustomerTouchpoint (item) {
      this.form.customerTouchpoints.splice(this.form.customerTouchpoints.indexOf(item), 1)
    },
    addCustomerLabel () {
      this.$v.customerTag.$touch()
      if (this.$v.customerTag.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.customerLabels.filter(i => i.labelId === this.customerTag.tagDefinition.RecordId && i.labelValueId === this.customerTag.tagValue.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.customerLabels.push({
        label: this.customerLabel,
        labelId: this.customerLabelId,
        labelValue: this.customerLabel,
        labelValueId: this.customerLabelValue
      })
      this.customerTag = {}
      this.$v.customerTag.$reset()
    },
    removeCustomerLabel (item) {
      this.form.customerLabels.splice(this.form.customerLabels.indexOf(item), 1)
    },
    addItemDiscount () {
      this.$v.customerItemDiscounts.$touch()
      if (this.$v.customerItemDiscounts.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.form.customerItemDiscounts.push({
        code: this.customerItemDiscounts.code,
        description1: this.customerItemDiscounts.description1,
        discountPercent1: this.customerItemDiscounts.discountPercent1,
        discountPercent2: this.customerItemDiscounts.discountPercent2,
        tciBreak1Id: this.customerItemDiscounts.tciBreak1Id,
        tciBreak2Id: this.customerItemDiscounts.tciBreak2Id
      })
      this.customerItemDiscounts = {}
      this.$v.customerItemDiscounts.$reset()
    },
    removeItemDiscount (item) {
      this.form.customerItemDiscounts.splice(this.form.customerItemDiscounts.indexOf(item), 1)
    },
    addCustomerPaymentType () {
      this.$v.customerPaymentTypes.$touch()
      if (this.$v.customerPaymentTypes.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.customerPaymentTypes.filter(i => i.paymentType === this.customerPaymentTypes.paymentType)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.customerPaymentTypes.push({
        paymentType: this.customerPaymentTypes.paymentType,
        paymentTypeId: this.customerPaymentTypes.paymentTypeId
      })
      this.customerPaymentType = null
      this.customerPaymentTypes = {}
      this.$v.customerPaymentTypes.$reset()
    },
    removeCustomerPaymentType (item) {
      this.form.customerPaymentTypes.splice(this.form.customerPaymentTypes.indexOf(item), 1)
    },
    addCustomerLocations () {
      this.$v.customerLocations.$touch()
      if (this.$v.customerLocations.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.customerLocations.filter(i => i.code === this.customerLocations.code)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.customerLocations.push({
        code: this.customerLocations.code,
        description1: this.customerLocations.description1,
        addressDetail: this.customerLocations.addressDetail,
        phoneNumber1: this.customerLocations.phoneNumber1,
        faxNumber: this.customerLocations.faxNumber,
        addressDescription: this.customerLocations.addressDescription,
        genexp1: this.customerLocations.genexp1,
        contactName: this.customerLocations.contactName,
        cityId: this.customerLocations.cityId,
        xPosition: this.customerLocations.xPosition,
        yPosition: this.customerLocations.yPosition,
        districtId: this.customerLocations.districtId,
        genexp2: this.customerLocations.genexp2,
        postCode: this.customerLocations.postCode,
        alias: this.customerLocations.alias,
        isDefaultLocation: this.customerLocations.isDefaultLocation,
        isInvoiceAddress: this.customerLocations.isInvoiceAddress,
        isDeliveryAddress: this.customerLocations.isDeliveryAddress,
        isRouteNode: this.customerLocations.isRouteNode
      })

      this.customerLocations = {
        code: `${this.form.Code} - ${this.form.customerLocations.length ? this.form.customerLocations.length + 1 : 1}`
      }
      this.address = {}
      this.$v.customerLocations.$reset()
    },
    removeCustomerLocation (item) {
      this.form.customerLocations.splice(this.form.customerLocations.indexOf(item), 1)
    },
    addCreditHistories () {
      this.$v.customerCreditHistories.$touch()
      if (this.$v.customerCreditHistories.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.form.customerCreditHistories.push({
        creditAmount: this.customerCreditHistories.creditAmount,
        creditDescriptionId: this.customerCreditHistories.creditDescriptionId,
        creditStartDate: this.dateConvertToISo(this.customerCreditHistories.creditStartDate),
        bankId: this.customerCreditHistories.bankId,
        currencyId: this.customerCreditHistories.currencyId,
        creditEndDate: this.dateConvertToISo(this.customerCreditHistories.creditEndDate),
        debtor: this.customerCreditHistories.debtor,
        bail: this.customerCreditHistories.bail,
        textDate: this.dateConvertToISo(this.customerCreditHistories.textDate),
        landOffice: this.customerCreditHistories.landOffice,
        notaryDate: this.dateConvertToISo(this.customerCreditHistories.notaryDate),
        traficRegistry: this.customerCreditHistories.traficRegistry,
        textNo: this.customerCreditHistories.textNo,
        creditLimit: this.customerCreditHistories.creditLimit,
        notaryNo: this.customerCreditHistories.notaryNo,
        plateNumber: this.customerCreditHistories.plateNumber,
        riskLimit: this.customerCreditHistories.riskLimit,
        mortgageValue: this.customerCreditHistories.mortgageValue,
        dbsPriority: this.customerCreditHistories.dbsPriority,
        allowOverLimit: this.customerCreditHistories.allowOverLimit,
        plate: this.customerCreditHistoriesplate
      })
      this.customerCreditHistories = {}
      this.$v.customerCreditHistories.$reset()
    },
    removeCustomerCreditHistory (item) {
      this.form.customerCreditHistories.splice(this.form.customerCreditHistories.indexOf(item), 1)
    },
    onItemsSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchItems(loading, search, this)
      }
    },
    searchItems (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextItem/api/Item/Search',
        name: 'items',
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    onCustomerSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchCustomer(loading, search, this)
      }
    },
    searchCustomer (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'customers',
        andConditionModel: {
          Description1: search,
          RecordTypeId: 3
        }
      }).then(res => {
        loading(false)
      })
    },
    onBranchSearch (search, loading) {
      if (search.length >= 3) {
        this.searchBranch(loading, search, this)
      }
    },
    searchBranch (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextBranch/api/Branch/Search',
        name: 'branchList',
        andConditionModel: {
          BranchCommercialTitle: search
        }
      }).then(res => {
        loading(false)
      })
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    let mainBranch = {}
    if (this.form.RecordTypeId === 4) {
      mainBranch.customer = {
        required
      }
      mainBranch.branch = {
        required
      }
    } else {
      mainBranch.customer = {}
      mainBranch.branch = {}
    }
    return {
      form: this.insertRules,
      customerLocations: {
        description1: {
          required
        },
        code: {
          required
        },
        addressDetail: {
          required
        },
        postCode: {
          required
        },
        phoneNumber1: {
          required
        },
        cityId: {
          required
        },
        districtId: {
          required
        }
      },
      customerPaymentTypes: {
        paymentTypeId: {
          required
        }
      },
      customerTag: {
        tagDefinition: {
          required
        },
        tagValue: {
          required
        }
      },
      customerCreditHistories: {
        creditAmount: {
          required
        },
        creditDescriptionId: {
          required
        },
        currencyId: {
          required
        },
        creditStartDate: {
          required
        },
        creditEndDate: {
          required
        },
        creditLimit: {
          required
        },
        riskLimit: {
          required
        }
      },
      customerItemDiscounts: {
        code: {
          required
        },
        description1: {
          required
        }
      },
      mainBranch: mainBranch
    }
  },
  watch: {
    cancelReasons (e) {
      if (e) {
        e.map(item => {
          if (item.RecordId === 18) {
            this.selectedCancelReason = item.Description1
            this.selectedSearchType('statusReasonId', item)
          }
        })
      }
    },
    statementDays (e) {
      if (e) {
        e.map(item => {
          item.Label = item.DayNumber + ' ' + item.Description1
        })
      }
    },
    address (value) {
      if (value) {
        this.customerLocations.cityId = value.CityId
        this.customerLocations.districtId = value.DistrictId
        this.customerLocations.addressDetail = value.Address
        this.locationDistirictLabel = value.CityName
        this.locationCityLabel = value.DistrictName
      }
    },
    customerCategory3 (value) {
      if (value) {
        this.customerCategory2 = this.lookup.CUSTOMER_CATEGORY_2.find(x => x.Label === value.UpperValue)
        this.form.Category2Id = this.customerCategory2.DecimalValue
        this.customerCategory1 = this.lookup.CUSTOMER_CATEGORY_1.find(x => x.Label === this.customerCategory2.UpperValue)
        this.form.Category1Id = this.customerCategory1.DecimalValue
      } else {
        this.customerCategory1 = null
        this.customerCategory2 = null
        this.form.Category1Id = null
        this.form.Category2Id = null
        this.form.Category3Id = null
      }
    },
    lookup: {
      handler (val) {
        if (val.CUSTOMER_BLOCK_REASON && val.CUSTOMER_BLOCK_REASON.length > 0) {
          this.customerBlackReason = this.lookup.CUSTOMER_BLOCK_REASON[0]
          this.form.BlockReasonId = this.customerBlackReason.DecimalValue
        }
        if (val.CUSTOMER_GROUP && val.CUSTOMER_GROUP.length > 2) {
          this.customerGroup = this.lookup.CUSTOMER_GROUP[2]
          this.form.GroupId = this.customerGroup.DecimalValue
        }
        if (val.CUSTOMER_CLASS && val.CUSTOMER_CLASS.length > 0) {
          this.customerClass = this.lookup.CUSTOMER_CLASS[0]
          this.form.ClassId = this.customerClass.DecimalValue
        }
        if (val.SALES_DOCUMENT_TYPE && val.SALES_DOCUMENT_TYPE.length > 1) {
          this.salesDocumentType = this.lookup.SALES_DOCUMENT_TYPE[1]
          this.form.SalesDocumentTypeId = this.salesDocumentType.DecimalValue
        }
        if (val.INVOICE_COMBINE_RULE && val.INVOICE_COMBINE_RULE.length > 2) {
          this.invoiceCombineRule = this.lookup.INVOICE_COMBINE_RULE[2]
          this.form.InvoiceCombineRuleId = this.invoiceCombineRule.DecimalValue
        }
      },
      deep: true
    },
    recordTypeList (value) {
      if (value && value.length > 0 && this.form.RecordTypeId) {
        this.recordType = value.find(a => a.RecordId === this.form.RecordTypeId)
      }
    }
  }
}
</script>
