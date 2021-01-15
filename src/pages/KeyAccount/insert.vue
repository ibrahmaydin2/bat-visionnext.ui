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
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.RecordTypeId != null ? insertVisible.RecordTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.RecordTypeId + (insertRequired.RecordTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RecordTypeId.$error }">
              <b-form-input type="text" v-model="form.RecordTypeId" :readonly="insertReadonly.RecordTypeId" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.SalesTypeId != null ? insertVisible.SalesTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.SalesTypeId + (insertRequired.SalesTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesTypeId.$error }">
              <b-form-input type="text" v-model="form.SalesTypeId" :readonly="insertReadonly.SalesTypeId" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.CardTypeId != null ? insertVisible.CardTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.CardTypeId + (insertRequired.CardTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardTypeId.$error }">
              <v-select :options="customerCardTypes" @input="selectedSearchType('CardTypeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusReasonId != null ? insertVisible.StatusReasonId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusReasonId + (insertRequired.StatusReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusReasonId.$error }">
              <v-select :options="cancelReasons" @input="selectedSearchType('statusReasonId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')">
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
                <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" />
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
                <b-form-datepicker v-model="form.LicenseValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.IsBlocked != null ? insertVisible.IsBlocked : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsBlocked + (insertRequired.IsBlocked === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlocked.$error }">
                <b-form-checkbox v-model="form.IsBlocked" name="check-button" switch>
                  {{(form.IsBlocked) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsOrderChangeUnitary + (insertRequired.IsOrderChangeUnitary === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                <b-form-checkbox v-model="form.IsOrderChangeUnitary" name="check-button" switch>
                  {{(form.IsOrderChangeUnitary) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.UseEDispatch != null ? insertVisible.UseEDispatch : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEDispatch + (insertRequired.UseEDispatch === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEDispatch.$error }">
                <b-form-checkbox v-model="form.UseEDispatch" name="check-button" switch>
                  {{(form.UseEDispatch) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsWarehouseSale + (insertRequired.IsWarehouseSale === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                <b-form-checkbox v-model="form.IsWarehouseSale" name="check-button" switch>
                  {{(form.IsWarehouseSale) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.UseEInvoice != null ? insertVisible.UseEInvoice : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEInvoice + (insertRequired.UseEInvoice === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEInvoice.$error }">
                <b-form-checkbox v-model="form.UseEInvoice" name="check-button" switch>
                  {{(form.UseEInvoice) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Code')">
                <b-form-input type="text" v-model="customerLocations.code" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Location_Description1')">
                <b-form-input type="text" v-model="customerLocations.description1" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.customer.Model_AddressDetail')">
                <b-form-input type="text" v-model="customerLocations.addressDetail" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.city')">
                <v-select :options="cities" @input="selectedCity" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.distirict')">
                <v-select :options="distiricts" @input="selectedDistirict" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PostCode')">
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
              <b-form-group :label="$t('insert.customer.Model_PhoneNumber1')">
                <b-form-input type="text" v-model="customerLocations.phoneNumber1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_FaxNumber')">
                <b-form-input type="text" v-model="customerLocations.faxNumber" />
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
                <b-button @click="addCustomerLocations" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.customerLocations.length > 0">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerLocations" :key="i">
                  <b-td>{{r.code}}</b-td>
                  <b-td>{{r.description1}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerLocation(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
          <b-row>
            <b-col v-if="insertVisible.Category1Id != null ? insertVisible.Category1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category1Id + (insertRequired.Category1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_1"
                  @input="selectedType('Category1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category2Id + (insertRequired.Category2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_2"
                  @input="selectedType('Category2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category3Id + (insertRequired.Category3Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_3"
                  @input="selectedType('Category3Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_GROUP"
                  @input="selectedType('GroupId', $event)"
                  label="Label"
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
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SalesDocumentTypeId + (insertRequired.SalesDocumentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                  <v-select
                    :options="lookup.SALES_DOCUMENT_TYPE"
                    @input="selectedType('SalesDocumentTypeId', $event)"
                    label="Label"
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
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.AdditionalClassInformation')">
          <b-row>
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
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
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
                <b-form-input type="text" v-model="form.CreditLimit" :readonly="insertReadonly.CreditLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RiskLimit != null ? insertVisible.RiskLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RiskLimit + (insertRequired.RiskLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RiskLimit.$error }">
                <b-form-input type="text" v-model="form.RiskLimit" :readonly="insertReadonly.RiskLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrentCredit != null ? insertVisible.CurrentCredit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentCredit + (insertRequired.CurrentCredit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentCredit.$error }">
                <b-form-input type="text" v-model="form.CurrentCredit" :readonly="insertReadonly.CurrentCredit" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.CurrentRisk != null ? insertVisible.CurrentRisk : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentRisk + (insertRequired.CurrentRisk === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentRisk.$error }">
                <b-form-input type="text" v-model="form.CurrentRisk" :readonly="insertReadonly.CurrentRisk" />
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
                <b-form-input type="text" v-model="form.ZdebitAccountRemainder" :readonly="insertReadonly.ZdebitAccountRemainder" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ZcreditAccountRemainder != null ? insertVisible.ZcreditAccountRemainder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ZcreditAccountRemainder + (insertRequired.ZcreditAccountRemainder === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ZcreditAccountRemainder.$error }">
                <b-form-input type="text" v-model="form.ZcreditAccountRemainder" :readonly="insertReadonly.ZcreditAccountRemainder" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
                <b-col v-if="insertVisible.DiscountPercent1 != null ? insertVisible.DiscountPercent1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent1 + (insertRequired.DiscountPercent1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent1.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent1" :readonly="insertReadonly.DiscountPercent1" />
                </b-form-group>
              </b-col>
                <b-col v-if="insertVisible.DiscountPercent2 != null ? insertVisible.DiscountPercent2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent2 + (insertRequired.DiscountPercent2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent2.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent2" :readonly="insertReadonly.DiscountPercent2" />
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
                <b-form-input type="text" v-model="form.DeliveryDayParam" :readonly="insertReadonly.DeliveryDayParam" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PaymentPeriod != null ? insertVisible.PaymentPeriod : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.PaymentPeriod + (insertRequired.PaymentPeriod === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PaymentPeriod.$error }">
                <v-select :options="paymentPeriods" @input="selectedSearchType('PaymentPeriod', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TciBreak1Id != null ? insertVisible.TciBreak1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak1Id + (insertRequired.TciBreak1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak1Id.$error }">
                <v-select
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TciBreak1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TciBreak2Id != null ? insertVisible.TciBreak2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak2Id + (insertRequired.TciBreak2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak2Id.$error }">
                <v-select
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TciBreak2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.StatementDay != null ? insertVisible.StatementDay : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.StatementDay + (insertRequired.StatementDay === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatementDay.$error }">
                <v-select :options="statementDays" @input="selectedSearchType('StatementDay', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DefaultPaymentTypeId + (insertRequired.DefaultPaymentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                <v-select :options="paymentTypes" @input="selectedSearchType('DefaultPaymentTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.AllowOverLimit != null ? insertVisible.AllowOverLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.AllowOverLimit + (insertRequired.AllowOverLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.AllowOverLimit.$error }">
                <b-form-checkbox v-model="form.AllowOverLimit" name="check-button">
                  {{(form.AllowOverLimit) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsDirectDebit != null ? insertVisible.IsDirectDebit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsDirectDebit + (insertRequired.IsDirectDebit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsDirectDebit.$error }">
                <b-form-checkbox v-model="form.IsDirectDebit" name="check-button">
                  {{(form.IsDirectDebit) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualInvoiceClosure != null ? insertVisible.ManualInvoiceClosure : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualInvoiceClosure + (insertRequired.ManualInvoiceClosure === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualInvoiceClosure.$error }">
                <b-form-checkbox v-model="form.ManualInvoiceClosure" name="check-button">
                  {{(form.ManualInvoiceClosure) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Statement + (insertRequired.Statement === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <b-form-checkbox v-model="form.Statement" name="check-button">
                  {{(form.Statement) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.bank')">
                <v-select :options="banks" @input="selectedBank" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrencyId')">
                <v-select :options="currency" @input="selectedCurrency" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditDescriptionId')">
                <v-select :options="credits" @input="selectedCreditDescription" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditAmount')">
                <b-form-input type="text" v-model="customerCreditHistories.creditAmount" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.debtor')">
                <b-form-input type="text" v-model="customerCreditHistories.debtor" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.bail')">
                <b-form-input type="text" v-model="customerCreditHistories.bail" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditLimit')">
                <b-form-input type="text" v-model="customerCreditHistories.creditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit')">
                <b-form-input type="text" v-model="customerCreditHistories.riskLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.landOffice')">
                <b-form-input type="text" v-model="customerCreditHistories.landOffice" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.plate')">
                <b-form-input type="text" v-model="customerCreditHistories.plate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.textDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditStartDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditEndDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.notaryDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.traficRegistry')">
                <b-form-input type="text" v-model="customerCreditHistories.traficRegistry" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textNo')">
                <b-form-input type="number" v-model="customerCreditHistories.textNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryNo')">
                <b-form-input type="number" v-model="customerCreditHistories.notaryNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.plateNumber')">
                <b-form-input type="text" v-model="customerCreditHistories.plateNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.mortgageValue')">
                <b-form-input type="text" v-model="customerCreditHistories.mortgageValue" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.allowOverLimit')">
                <b-form-radio-group v-model="customerCreditHistories.allowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addCreditHistories" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_CreditAmount')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.debtor')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.bail')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.customerCreditHistories" :key="i">
                  <b-td>{{r.creditAmount}}</b-td>
                  <b-td>{{r.debtor}}</b-td>
                  <b-td>{{r.bail}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerCreditHistory(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_PaymentTypeId')">
                    <v-select :options="paymentTypes" @input="selectedPaymentTypeArr" label="Description1"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <b-button @click="addCustomerPaymentType" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
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
        <b-tab :title="$t('insert.customer.detail')">
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
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountDescription')">
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
                <b-button @click="addItemDiscount" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
        <b-tab :title="$t('insert.customer.tag')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.labelId')">
                <v-select :options="customerLabels" @input="selectedLabelId" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.labelValueId')">
                <v-select :options="customerLabelValues" @input="selectedLabelValueId" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button @click="addCustomerLabel" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
import mixin from '../../mixins/index'
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
        SalesTypeId: 0,
        RecordTypeId: 3,
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
        ReservedLimit: null
      },
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
        isDefaultLocation: null,
        isInvoiceAddress: null,
        isDeliveryAddress: null,
        isRouteNode: null
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
        plate: null
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
        tciBreak2Id: null
      },
      customerTouchpoints: {
        touchpointPriority: null,
        touchpointTypeId: null
      },
      routeName: this.$route.meta.baseLink,
      taxNumberReq: 10
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertRules', 'insertDefaultValue', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'statementDays', 'distiricts', 'banks', 'currency', 'paymentTypes', 'items', 'customerLabels', 'customerLabelValues', 'customerCardTypes', 'cancelReasons', 'paymentPeriods', 'statementDays', 'cities', 'credits'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextCustomer/api/Customer/GetCode`})
      this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
      this.$store.dispatch('getLookups', {...this.query, type: 'CREDIT_DESCRIPTION', name: 'credits'})

      this.$store.dispatch('getCustomerCardType')
      this.$store.dispatch('getCustomerCancelReasons')
      this.$store.dispatch('getBanks')
      this.$store.dispatch('getCurrency')
      this.$store.dispatch('getItems')
      this.$store.dispatch('getPaymentPeriods')
      this.$store.dispatch('getStatementDays')
      this.$store.dispatch('getPaymentTypes')
      this.$store.dispatch('getCustomerLabels')
      this.$store.dispatch('getCustomerLabelValues')
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
    selectedSearchType (label, model) {
      this.form[label] = model.RecordId
    },
    save () {
      console.log(this.form)
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.fillRequireds'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.form.LicenseValidDate = this.dateConvertToISo(this.form.LicenseValidDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.IsDirectDebit = this.checkConvertToNumber(this.form.IsDirectDebit)
        this.form.IsBlocked = this.checkConvertToNumber(this.form.IsBlocked)
        this.form.IsWarehouseSale = this.checkConvertToNumber(this.form.IsWarehouseSale)
        this.form.UseEInvoice = this.checkConvertToNumber(this.form.UseEInvoice)
        this.form.ManualSItem = this.checkConvertToNumber(this.form.ManualSItem)
        this.form.IsOrderChangeUnitary = this.checkConvertToNumber(this.form.IsOrderChangeUnitary)
        this.form.ManualInvoiceClosure = this.checkConvertToNumber(this.form.ManualInvoiceClosure)
        this.form.AllowOverLimit = this.checkConvertToNumber(this.form.AllowOverLimit)
        this.form.Statement = this.checkConvertToNumber(this.form.Statement)
        this.form.UseEDispatch = this.checkConvertToNumber(this.form.UseEDispatch)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
      }
    },
    selectedCity (e) {
      console.log(e)
      if (e) {
        this.customerLocations.cityId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'DISTRICT', name: 'distiricts', upperValue: e.DecimalValue})
      } else {
        this.customerLocations.cityId = null
      }
    },
    selectedDistirict (e) {
      if (e) {
        this.customerLocations.districtId = e.DecimalValue
        this.$store.dispatch('getLookupsWithUpperValue', {...this.query, type: 'AVENUE', name: 'avenues', upperValue: e.DecimalValue})
      } else {
        this.customerLocations.districtId = null
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
      } else {
        this.customerCreditHistories.creditDescriptionId = null
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
        touchpointPriority: this.customerTouchpoints.touchpointPriority,
        touchpointTypeId: this.customerTouchpoints.touchpointTypeId
      })
    },
    removeCustomerTouchpoint (item) {
      this.form.customerTouchpoints.splice(this.form.customerTouchpoints.indexOf(item), 1)
    },
    addCustomerLabel () {
      this.form.customerLabels.push({
        label: this.customerLabel,
        labelId: this.customerLabelId,
        labelValue: this.customerLabel,
        labelValueId: this.customerLabelValue
      })
    },
    removeCustomerLabel (item) {
      this.form.customerLabels.splice(this.form.customerLabels.indexOf(item), 1)
    },
    addItemDiscount () {
      // if (!this.customerItemDiscounts.code || !this.customerItemDiscounts.description1) {
      //   this.$toasted.show(this.$t('insert.fillRequireds'), {
      //     type: 'error',
      //     keepOnHover: true,
      //     duration: '3000'
      //   })
      //   return
      // }
      this.form.customerItemDiscounts.push({
        code: this.customerItemDiscounts.code,
        description1: this.customerItemDiscounts.description1,
        discountPercent1: this.customerItemDiscounts.discountPercent1,
        discountPercent2: this.customerItemDiscounts.discountPercent2,
        tciBreak1Id: this.customerItemDiscounts.tciBreak1Id,
        tciBreak2Id: this.customerItemDiscounts.tciBreak2Id
      })
    },
    removeItemDiscount (item) {
      this.form.customerItemDiscounts.splice(this.form.customerItemDiscounts.indexOf(item), 1)
    },
    addCustomerPaymentType () {
      this.form.customerPaymentTypes.push({
        paymentType: this.customerPaymentTypes.paymentType,
        paymentTypeId: this.customerPaymentTypes.paymentTypeId
      })
      console.log(this.form.customerPaymentTypes)
    },
    removeCustomerPaymentType (item) {
      this.form.customerPaymentTypes.splice(this.form.customerPaymentTypes.indexOf(item), 1)
    },

    addCustomerLocations () {
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

      this.customerLocations.code = null
      this.customerLocations.description1 = null
      this.customerLocations.addressDetail = null
      this.customerLocations.phoneNumber1 = null
      this.customerLocations.faxNumber = null
      this.customerLocations.addressDescription = null
      this.customerLocations.genexp1 = null
      this.customerLocations.contactName = null
      this.customerLocations.cityId = null
      this.customerLocations.xPosition = null
      this.customerLocations.yPosition = null
      this.customerLocations.districtId = null
      this.customerLocations.genexp2 = null
      this.customerLocations.postCode = null
      this.customerLocations.alias = null
      this.customerLocations.isDefaultLocation = null
      this.customerLocations.isInvoiceAddress = null
      this.customerLocations.isDeliveryAddress = null
      this.customerLocations.isRouteNode = null
    },
    removeCustomerLocation (item) {
      this.form.customerLocations.splice(this.form.customerLocations.indexOf(item), 1)
    },
    addCreditHistories () {
      // if (!this.customerCreditHistories.creditAmount || !this.customerCreditHistories.creditDescriptionId || !this.customerCreditHistories.creditStartDate || !this.customerCreditHistories.bankId || !this.customerCreditHistories.currencyId || !this.customerCreditHistories.creditEndDate) {
      //   this.$toasted.show(this.$t('insert.fillRequireds'), {
      //     type: 'error',
      //     keepOnHover: true,
      //     duration: '3000'
      //   })
      //   return
      // }
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
    },
    removeCustomerCreditHistory (item) {
      this.form.customerCreditHistories.splice(this.form.customerCreditHistories.indexOf(item), 1)
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
        this.customerLocations.code = `${this.form.Code} - ${this.form.customerLocations.length ? this.form.customerLocations.length : 1}`
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        this.form[el] = value[el]
      })
    }
  }
}
</script>
<style lang="sass">
</style>
