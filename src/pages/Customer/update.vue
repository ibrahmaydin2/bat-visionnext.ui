<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Customer' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__updatePage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" :disabled="form.Code ? true : false" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.CardTypeId != null ? insertVisible.CardTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.CardTypeId + (insertRequired.CardTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardTypeId.$error }">
              <v-select v-model="CardType" :options="customerCardTypes" @input="selectedSearchType('CardTypeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusReasonId != null ? insertVisible.StatusReasonId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusReasonId + (insertRequired.StatusReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusReasonId.$error }">
              <v-select disabled v-model="StatusReason" :options="cancelReasons" @input="selectedSearchType('statusReasonId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.SalesTypeId != null ? insertVisible.SalesTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.SalesTypeId + (insertRequired.SalesTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesTypeId.$error }">
              <b-form-input type="text" v-model="form.SalesTypeId" :readonly="insertReadonly.SalesTypeId" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="true"></NextCheckBox>
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
                  v-model="TaxCustomerType"
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
                 <b-form-input type="number" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" :maxLength="taxNumberReq" :oninput="maxLengthControl"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxNumber + (insertRequired.TaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
                <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerEmail != null ? insertVisible.CustomerEmail : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerEmail + (insertRequired.CustomerEmail === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerEmail.$error }">
                <b-form-input type="text" v-model="form.CustomerEmail" :readonly="insertReadonly.CustomerEmail" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesVisitFrequency != null ? insertVisible.SalesVisitFrequency : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SalesVisitFrequency + (insertRequired.SalesVisitFrequency === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesVisitFrequency.$error }">
                <b-form-input type="text" v-model="form.SalesVisitFrequency" :readonly="insertReadonly.SalesVisitFrequency" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.BlockReasonId != null ? insertVisible.BlockReasonId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BlockReasonId + (insertRequired.BlockReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BlockReasonId.$error }">
                <v-select
                  v-model="BlockReason"
                  :options="lookup.CUSTOMER_BLOCK_REASON"
                  @input="selectedType('BlockReasonId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TypeId + (insertRequired.TypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                <v-select
                  v-model="customerType"
                  :options="lookup.CUSTOMER_TYPE"
                  @input="selectedType('TypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ServiceVisitFrequency != null ? insertVisible.ServiceVisitFrequency : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ServiceVisitFrequency + (insertRequired.ServiceVisitFrequency === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ServiceVisitFrequency.$error }">
                <b-form-input type="text" v-model="form.ServiceVisitFrequency" :readonly="insertReadonly.ServiceVisitFrequency" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerInvoiceTypeId != null ? insertVisible.CustomerInvoiceTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerInvoiceTypeId + (insertRequired.CustomerInvoiceTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerInvoiceTypeId.$error }">
                <v-select
                  v-model="CustomerInvoiceType"
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
                  v-model="CustomerRegion5"
                  :options="lookup.CUSTOMER_REGION_5"
                  @input="selectedType('CustomerRegion5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MarketingRegion5Id != null ? insertVisible.MarketingRegion5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.MarketingRegion5Id + (insertRequired.MarketingRegion5Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MarketingRegion5Id.$error }">
                <v-select
                  v-model="MarketingRegion5"
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
                <NextCheckBox v-model="form.IsBlocked" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualSItem != null ? insertVisible.ManualSItem : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualSItem + (insertRequired.ManualSItem === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualSItem.$error }">
                <NextCheckBox v-model="form.ManualSItem" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsRouteRegion != null ? insertVisible.IsRouteRegion : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsRouteRegion + (insertRequired.IsRouteRegion === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsRouteRegion.$error }">
                <NextCheckBox v-model="form.IsRouteRegion" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsOrderChangeUnitary + (insertRequired.IsOrderChangeUnitary === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                  <NextCheckBox v-model="form.IsOrderChangeUnitary" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.UseEInvoice != null ? insertVisible.UseEInvoice : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEInvoice + (insertRequired.UseEInvoice === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEInvoice.$error }">
                <NextCheckBox v-model="form.UseEInvoice" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsWarehouseSale + (insertRequired.IsWarehouseSale === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                <NextCheckBox v-model="form.IsWarehouseSale" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Code')">
                <b-form-input type="text" v-model="customerLocations.Code" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Location_Description1')">
                <b-form-input type="text" v-model="customerLocations.Description1" />
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Alias')">
                <b-form-input type="text" v-model="customerLocations.alias" />
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
                <b-button v-if="isLocationEditable" @click="removeEditableInputs" class="mt-4" variant="danger" size="sm"><i class="fa fa-pen"></i> {{$t('insert.remove')}}</b-button>
                <b-button v-if="isLocationEditable" @click="addCustomerLocations" class="mt-4" variant="success" size="sm"><i class="fa fa-pen"></i> {{$t('insert.edit')}}</b-button>
                <AddDetailButton @click.native="addCustomerLocations" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.CustomerLocations" :key="i">
                  <b-td>{{r.Code}}</b-td>
                  <b-td>{{r.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="editCustomerLocation(r)" class="fas fa-pencil-alt mr-2 text-warning"></i>
                    <i @click="removeCustomerLocation(r)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
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
                  v-model="Category1"
                  :options="lookup.CUSTOMER_CATEGORY_1"
                  @input="selectedType('Category1Id', $event); Category2 = null; Category3 = null"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category2Id + (insertRequired.Category2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                <v-select
                  v-model="Category2"
                  :options="lookup.CUSTOMER_CATEGORY_2 ? lookup.CUSTOMER_CATEGORY_2.filter(x => (Category1 && x.UpperValue == Category1.Label) || !Category1) : []"
                  @input="selectedType('Category2Id', $event); Category3 = null"
                  label="Label"
                  :disabled="!Category1"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category3Id + (insertRequired.Category3Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                <v-select
                  v-model="Category3"
                  :options="lookup.CUSTOMER_CATEGORY_3 ? lookup.CUSTOMER_CATEGORY_3.filter(x => (Category2 && x.UpperValue == Category2.Label) || !Category2) : []"
                  @input="selectedType('Category3Id', $event)"
                  label="Label"
                  :disabled="!Category2"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  v-model="Group"
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
                  v-model="Class"
                  :options="lookup.CUSTOMER_CLASS"
                  @input="selectedType('ClassId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SalesDocumentTypeId + (insertRequired.SalesDocumentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                  <v-select
                    v-model="SalesDocumentType"
                    :options="lookup.SALES_DOCUMENT_TYPE"
                    @input="selectedType('SalesDocumentTypeId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.OwnerTypeId != null ? insertVisible.OwnerTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.OwnerTypeId + (insertRequired.OwnerTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.OwnerTypeId.$error }">
                  <v-select
                    v-model="OwnerType"
                    :options="lookup.OWNER_TYPE"
                    @input="selectedType('OwnerTypeId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.ClassProposalId != null ? insertVisible.ClassProposalId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClassProposalId + (insertRequired.ClassProposalId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalId.$error }">
                  <v-select
                    v-model="ClassProposal"
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
                  v-model="SalesMethod"
                  :options="lookup.CUSTOMER_SALES_METHOD"
                  @input="selectedType('SalesMethodId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GeographicEnvironmentId != null ? insertVisible.GeographicEnvironmentId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GeographicEnvironmentId + (insertRequired.GeographicEnvironmentId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GeographicEnvironmentId.$error }">
                <v-select
                  v-model="GeographicEnvironment"
                  :options="lookup.CUSTOMER_GEOGRAPHIC_ENVIRONMENT"
                  @input="selectedType('GeographicEnvironmentId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TradeFocusId != null ? insertVisible.TradeFocusId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TradeFocusId + (insertRequired.TradeFocusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TradeFocusId.$error }">
                <v-select
                  v-model="TradeFocus"
                  :options="lookup.CUSTOMER_TRADE_FOCUS"
                  @input="selectedType('TradeFocusId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.InvoiceCombineRuleId + (insertRequired.InvoiceCombineRuleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
                <v-select
                  v-model="InvoiceCombineRule"
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
                  v-model="ClassProposalReason"
                  :options="lookup.CUSTOMER_CLASS_PROPOSAL_REASON"
                  @input="selectedType('ClassProposalReasonId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BackMarginGroupId != null ? insertVisible.BackMarginGroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BackMarginGroupId + (insertRequired.BackMarginGroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BackMarginGroupId.$error }">
                <v-select
                  v-model="BackMarginGroup"
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
            <b-col v-if="insertVisible.DiscountGroup1Id != null ? insertVisible.DiscountGroup1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup1Id + (insertRequired.DiscountGroup1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup1Id.$error }">
                <v-select
                  v-model="DiscountGroup1"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_1"
                  @input="selectedType('DiscountGroup1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup3Id != null ? insertVisible.DiscountGroup3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup3Id + (insertRequired.DiscountGroup3Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup3Id.$error }">
                <v-select
                  v-model="DiscountGroup3"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_3"
                  @input="selectedType('DiscountGroup3Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup4Id != null ? insertVisible.DiscountGroup4Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup4Id + (insertRequired.DiscountGroup4Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup4Id.$error }">
                <v-select
                  v-model="DiscountGroup4"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_4"
                  @input="selectedType('DiscountGroup4Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup5Id != null ? insertVisible.DiscountGroup5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup5Id + (insertRequired.DiscountGroup5Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup5Id.$error }">
                <v-select
                  v-model="DiscountGroup5"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_5"
                  @input="selectedType('DiscountGroup5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup6Id != null ? insertVisible.DiscountGroup6Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup6Id + (insertRequired.DiscountGroup6Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup6Id.$error }">
                <v-select
                  v-model="DiscountGroup6"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_6"
                  @input="selectedType('DiscountGroup6Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.DiscountGroup7Id != null ? insertVisible.DiscountGroup7Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup7Id + (insertRequired.DiscountGroup7Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup7Id.$error }">
                <v-select
                  v-model="DiscountGroup7"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_7"
                  @input="selectedType('DiscountGroup7Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup8Id != null ? insertVisible.DiscountGroup8Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup8Id + (insertRequired.DiscountGroup8Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup8Id.$error }">
                <v-select
                  v-model="DiscountGroup8"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_8"
                  @input="selectedType('DiscountGroup8Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.KindId != null ? insertVisible.KindId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.KindId + (insertRequired.KindId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.KindId.$error }">
                <v-select
                  v-model="Kind"
                  :options="lookup.CUSTOMER_KIND"
                  @input="selectedType('KindId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Activity1Id != null ? insertVisible.Activity1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Activity1Id + (insertRequired.Activity1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Activity1Id.$error }">
                <v-select
                  v-model="Activity1"
                  :options="lookup.CUSTOMER_ACTIVITY_1"
                  @input="selectedType('Activity1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Activity2Id != null ? insertVisible.Activity2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Activity2Id + (insertRequired.Activity2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Activity2Id.$error }">
                <v-select
                  v-model="Activity2"
                  :options="lookup.CUSTOMER_ACTIVITY_2"
                  @input="selectedType('Activity2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.OutSourceOrderId != null ? insertVisible.OutSourceOrderId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.OutSourceOrderId + (insertRequired.OutSourceOrderId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.OutSourceOrderId.$error }">
                <v-select
                  v-model="OutSourceOrder"
                  :options="lookup.OUT_SOURCE_ORDER"
                  @input="selectedType('OutSourceOrderId', $event)"
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
                  v-model="PriceListCategory"
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
            <b-col v-if="insertVisible.DebitAccountRemainder != null ? insertVisible.DebitAccountRemainder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DebitAccountRemainder + (insertRequired.DebitAccountRemainder === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DebitAccountRemainder.$error }">
                <b-form-input type="text" v-model="form.DebitAccountRemainder" :readonly="insertReadonly.DebitAccountRemainder" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
                <b-col v-if="insertVisible.CreditAccountRemainder != null ? insertVisible.CreditAccountRemainder : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreditAccountRemainder + (insertRequired.CreditAccountRemainder === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditAccountRemainder.$error }">
                  <b-form-input type="text" v-model="form.CreditAccountRemainder" :readonly="insertReadonly.CreditAccountRemainder" />
                </b-form-group>
              </b-col>
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
                <v-select v-model="PaymentPeriod" :options="paymentPeriods" @input="selectedSearchType('PaymentPeriod', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TciBreak1Id != null ? insertVisible.TciBreak1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak1Id + (insertRequired.TciBreak1Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak1Id.$error }">
                <v-select
                  v-model="TCIBreak1"
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TciBreak1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TciBreak2Id != null ? insertVisible.TciBreak2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak2Id + (insertRequired.TciBreak2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak2Id.$error }">
                <v-select
                  v-model="TCIBreak2"
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
                <v-select
                  :options="statementDays"
                  @input="selectedSearchType('StatementDay', $event)"
                  label="Description1"
                  :disabled="!form.Statement"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DefaultPaymentTypeId + (insertRequired.DefaultPaymentTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                <v-select v-model="DefaultPaymentType" :options="paymentTypes" @input="selectedSearchType('DefaultPaymentTypeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.AllowOverLimit != null ? insertVisible.AllowOverLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.AllowOverLimit + (insertRequired.AllowOverLimit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.AllowOverLimit.$error }">
                <NextCheckBox :disabled="true" v-model="form.AllowOverLimit" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsDirectDebit != null ? insertVisible.IsDirectDebit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsDirectDebit + (insertRequired.IsDirectDebit === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsDirectDebit.$error }">
                <NextCheckBox v-model="form.IsDirectDebit" type="number" toggle :disabled="DefaultPaymentType.Code !== 'AH'"></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualInvoiceClosure != null ? insertVisible.ManualInvoiceClosure : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualInvoiceClosure + (insertRequired.ManualInvoiceClosure === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualInvoiceClosure.$error }">
                <NextCheckBox v-model="form.ManualInvoiceClosure" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Statement + (insertRequired.Statement === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <NextCheckBox v-model="form.Statement" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsBlackListed != null ? insertVisible.IsBlackListed : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsBlackListed + (insertRequired.IsBlackListed === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlackListed.$error }">
                <NextCheckBox v-model="form.IsBlackListed" type="number" toggle></NextCheckBox>
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
                <v-select :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :options="currency" @input="selectedCurrency" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditDescriptionId')">
                <v-select :options="credits" @input="selectedCreditDescription" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditAmount')">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0"  type="text" v-model="customerCreditHistories.creditAmount" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.debtor')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'SN'" type="text" v-model="customerCreditHistories.debtor" />
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
              <b-form-group :label="$t('insert.customer.Model_CreditLimit')">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" type="text" v-model="customerCreditHistories.creditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit')">
                <b-form-input :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" type="text" v-model="customerCreditHistories.riskLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.landOffice')">
                <b-form-input  :disabled="customerCreditHistories.creditDescriptionCode !== 'IM'" type="text" v-model="customerCreditHistories.landOffice" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.plate')">
                <b-form-input  :disabled="customerCreditHistories.creditDescriptionCode !== 'IM'" type="text" v-model="customerCreditHistories.plate" />
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
              <b-form-group :label="$t('insert.customer.Model_CreditStartDate')">
                <b-form-datepicker :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0" :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditEndDate')">
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
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'IM'" type="text" v-model="customerCreditHistories.textNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryNo')">
                <b-form-input :disabled="customerCreditHistories.creditDescriptionCode!== 'MV'" type="text" v-model="customerCreditHistories.notaryNo" />
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.dbsPriority')">
                <b-form-input type="text" v-model="customerCreditHistories.dbsPriority" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.allowOverLimit')" :disabled="customerCreditHistories.bankId === null || customerCreditHistories.bankId === 0">
                <b-form-radio-group v-model="form.allowOverLimit">
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
                <b-th><span>{{$t('insert.customer.debtor')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.bail')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.CustomerCreditHistories" :key="i">
                  <b-td>{{r.CreditAmount}}</b-td>
                  <b-td>{{r.Debtor}}</b-td>
                  <b-td>{{r.Bail}}</b-td>
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
                    <b-tr v-for="(r, i) in filteredCustomerPaymentType" :key="i">
                      <b-td>{{r.PaymentType.Label ? r.PaymentType.Label : r.PaymentType}}</b-td>
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
                  v-model="HoldsAsset"
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
                  v-model="Contracted"
                  :options="lookup.CUSTOMER_CONTRACTED"
                  @input="selectedType('Contracted', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup10Id != null ? insertVisible.DiscountGroup10Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup10Id + (insertRequired.DiscountGroup10Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup10Id.$error }">
                <v-select
                  v-model="DiscountGroup10"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_10"
                  @input="selectedType('DiscountGroup10Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup2Id != null ? insertVisible.DiscountGroup2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup2Id + (insertRequired.DiscountGroup2Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup2Id.$error }">
                <v-select
                  v-model="DiscountGroup2"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_2"
                  @input="selectedType('DiscountGroup2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup9Id != null ? insertVisible.DiscountGroup9Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup9Id + (insertRequired.DiscountGroup9Id === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup9Id.$error }">
                <v-select
                  v-model="DiscountGroup9"
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_9"
                  @input="selectedType('DiscountGroup9Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SignNameId != null ? insertVisible.SignNameId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SignNameId + (insertRequired.SignNameId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SignNameId.$error }">
                <v-select
                  v-model="SignName"
                  :options="lookup.SIGN_NAME"
                  @input="selectedType('SignNameId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.IsOpportunitySpot != null ? insertVisible.IsOpportunitySpot : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsOpportunitySpot + (insertRequired.IsOpportunitySpot === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOpportunitySpot.$error }">
                  <NextCheckBox v-model="form.IsOpportunitySpot" type="number" toggle></NextCheckBox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountCode')">
                <v-select :options="items" @input="selectedItem" label="Description1"></v-select>
              </b-form-group>
            </b-col>
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
                <b-tr v-for="(r, i) in form.CustomerItemDiscounts" :key="i">
                  <b-td>{{r.Description1}}</b-td>
                  <b-td>{{r.DiscountPercent1}}</b-td>
                  <b-td>{{r.DiscountPercent2}}</b-td>
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
                <b-tr v-for="(r, i) in form.CustomerLabels" :key="i">
                  <b-td>{{r.Label && r.Label.Label ? r.Label.Label : r.Label}}</b-td>
                  <b-td>{{r.LabelValue && r.LabelValue.Label ? r.LabelValue.Label : r.LabelValue}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerLabel(r)" class="far fa-trash-alt text-danger"></i></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerTouchpoints')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.touchpointPriority')">
                <v-select :options="touchpoints" @input="selectedTouchpointPriority" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.touchpointTypeId')">
                <v-select :options="touchpoint_types" @input="selectedTouchpointType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerTouchpoint" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.touchpointPriority')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.touchpointTypeId')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.CustomerTouchpoints" :key="i">
                  <b-td>{{r.TouchpointPriority && r.TouchpointPriority.Label ?  r.TouchpointPriority.Label : r.TouchpointPriorityLabel}}</b-td>
                  <b-td>{{r.TouchpointType && r.TouchpointType.Label ? r.TouchpointType.Label : r.TouchpointTypeIdLabel}}</b-td>
                  <b-td class="text-center"><i @click="removeCustomerTouchpoint(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
      CardType: null,
      Group: null,
      Kind: null,
      Type: null,
      Class: null,
      Category1: null,
      Category2: null,
      Category3: null,
      DefaultPaymentType: {},
      PriceListCategory: null,
      CustomerRegion5: null,
      DiscountGroup1: null,
      DiscountGroup2: null,
      DiscountGroup3: null,
      DiscountGroup4: null,
      DiscountGroup5: null,
      DiscountGroup6: null,
      DiscountGroup7: null,
      DiscountGroup8: null,
      DiscountGroup9: null,
      DiscountGroup10: null,
      PaymentPeriod: null,
      OwnerType: null,
      ClassProposal: null,
      ClassProposalReason: null,
      GeographicEnvironment: null,
      SalesMethod: null,
      TradeFocus: null,
      HoldsAsset: null,
      Contracted: null,
      StatusReason: null,
      SignName: null,
      MarketingRegion5: null,
      TaxCustomerType: null,
      InvoiceCombineRule: null,
      SalesDocumentType: null,
      BlockReason: null,
      CustomerInvoiceType: null,
      BackMarginGroup: null,
      Activity1: null,
      Activity2: null,
      OutSourceOrder: null,
      TCIBreak1: null,
      TCIBreak2: null,
      CustomerPaymentTypesArr: [],
      form: {
        CustomerLocations: [],
        CustomerCreditHistories: [],
        CustomerPaymentTypes: [],
        CustomerItemDiscounts: [],
        CustomerLabels: [],
        CustomerTouchpoints: []
      },
      customerLocations: {
        Code: null,
        Description1: null,
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
        allowOverLimit: 0,
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
        tciBreak2Id: null
      },
      customerTouchpoints: {
        TouchpointPriority: null,
        TouchpointTypeId: null,
        TouchpointPriorityLabel: null,
        TouchpointTypeIdLabel: null
      },
      routeName: this.$route.meta.baseLink,
      taxNumberReq: 10,
      locationCityLabel: null,
      locationDistirictLabel: null,
      isLocationEditable: false,
      address: {},
      customerType: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'insertColumnType', 'lookup', 'createCode', 'statementDays', 'distiricts', 'banks', 'currency', 'paymentTypes', 'items', 'customerLabels', 'customerLabelValues', 'rowData', 'customerCardTypes', 'cancelReasons', 'paymentPeriods', 'cities', 'credits', 'touchpoints', 'touchpoint_types']),
    filteredCustomerPaymentType () {
      return this.CustomerPaymentTypesArr.filter(item => {
        return item.RecordState !== 4
      })
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
      this.$store.dispatch('getLookups', {...this.query, type: 'CREDIT_DESCRIPTION', name: 'credits'})
      this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_TOUCHPOINT_PRIORITY', name: 'touchpoints'})
      this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_TOUCHPOINT_TYPE', name: 'touchpoint_types'})

      this.$store.dispatch('getItems')

      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCustomer/api/CustomerCardType/Search', name: 'customerCardTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/CancelReason/Search', name: 'cancelReasons'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currency'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/FixedTerm/Search', name: 'paymentPeriods'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/PaymentType/Search', name: 'paymentTypes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/Label/Search', name: 'customerLabels'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/LabelDetail/Search', name: 'customerLabelValues'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysDay/Search', name: 'statementDays'})
      this.$store.dispatch('getData', {...this.query, api: `VisionNext${e}/api/${e}`, record: this.$route.params.url})
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
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.form.AllowOverLimit = this.form.AllowOverLimit === true || this.form.AllowOverLimit === 1 ? 1 : 0
        this.form.LicenseValidDate = this.dateConvertToISo(this.form.LicenseValidDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.IsDirectDebit = this.checkConvertToNumber(this.form.IsDirectDebit)
        this.form.IsBlocked = this.checkConvertToNumber(this.form.IsBlocked)
        this.form.IsWarehouseSale = this.checkConvertToNumber(this.form.IsWarehouseSale)
        this.form.UseEInvoice = this.checkConvertToNumber(this.form.UseEInvoice)
        this.form.ManualSItem = this.checkConvertToNumber(this.form.ManualSItem)
        this.form.IsRouteRegion = this.checkConvertToNumber(this.form.IsRouteRegion)
        this.form.IsOrderChangeUnitary = this.checkConvertToNumber(this.form.IsOrderChangeUnitary)
        this.form.ManualInvoiceClosure = this.checkConvertToNumber(this.form.ManualInvoiceClosure)
        this.form.AllowOverLimit = this.checkConvertToNumber(this.form.AllowOverLimit)
        this.form.IsBlackListed = this.checkConvertToNumber(this.form.IsBlackListed)
        this.form.Statement = this.checkConvertToNumber(this.form.Statement)
        this.form.IsOpportunitySpot = this.checkConvertToNumber(this.form.IsOpportunitySpot)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: model, return: this.$route.meta.baseLink})
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
        this.customerLabelValue = e.Description1
        this.customerLabelValueId = e.RecordId
      } else {
        this.customerLabelValue = null
        this.customerLabelValueId = null
      }
    },
    selectedTouchpointPriority (e) {
      if (e) {
        this.customerTouchpoints.TouchpointPriority = e.DecimalValue
        this.customerTouchpoints.TouchpointPriorityLabel = e.Label
      } else {
        this.customerTouchpoints.TouchpointPriority = null
        this.customerTouchpoints.TouchpointPriorityLabel = null
      }
    },
    selectedTouchpointType (e) {
      if (e) {
        this.customerTouchpoints.TouchpointTypeId = e.DecimalValue
        this.customerTouchpoints.TouchpointTypeIdLabel = e.Label
      } else {
        this.customerTouchpoints.TouchpointTypeId = null
        this.customerTouchpoints.TouchpointTypeIdLabel = null
      }
    },
    addCustomerTouchpoint (item) {
      this.form.CustomerTouchpoints.push(this.customerTouchpoints)
    },
    removeCustomerTouchpoint (item) {
      this.form.CustomerTouchpoints.splice(this.form.CustomerTouchpoints.indexOf(item), 1)
    },
    addCustomerLabel () {
      this.form.CustomerLabels.push({
        Label: this.customerLabel,
        LabelId: this.customerLabelId,
        LabelValue: this.customerLabelValue,
        LabelValueId: this.customerLabelValueId
      })

      // this.CustomerLabelsArr.push({
      //   Label: this.customerLabel,
      //   LabelId: this.customerLabelId,
      //   LabelValue: this.customerLabel,
      //   LabelValueId: this.customerLabelValue
      // })
    },
    removeCustomerLabel (item) {
      this.form.CustomerLabels.splice(this.form.CustomerLabels.indexOf(item), 1)
    },
    addItemDiscount () {
      if (!this.customerItemDiscounts.code || !this.customerItemDiscounts.description1) {
        this.$toasted.show(this.$t('insert.fillRequireds'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.form.CustomerItemDiscounts.push({
        code: this.customerItemDiscounts.code,
        Description1: this.customerItemDiscounts.description1,
        DiscountPercent1: this.customerItemDiscounts.discountPercent1,
        DiscountPercent2: this.customerItemDiscounts.discountPercent2,
        tciBreak1Id: this.customerItemDiscounts.tciBreak1Id,
        tciBreak2Id: this.customerItemDiscounts.tciBreak2Id
      })
    },
    removeItemDiscount (item) {
      this.form.CustomerItemDiscounts.splice(this.form.CustomerItemDiscounts.indexOf(item), 1)
    },
    addCustomerPaymentType () {
      this.form.CustomerPaymentTypes.push({
        PaymentTypeId: this.customerPaymentTypes.paymentTypeId,
        RecordState: 2
      })
      this.CustomerPaymentTypesArr.push({
        PaymentType: this.customerPaymentTypes.paymentType,
        PaymentTypeId: this.customerPaymentTypes.paymentTypeId,
        RecordState: 2
      })
    },
    removeCustomerPaymentType (item) {
      this.CustomerPaymentTypesArr[this.CustomerPaymentTypesArr.indexOf(item)].RecordState = 4
      let filteredArr = this.form.CustomerPaymentTypes.filter(i => i.PaymentTypeId === item.PaymentTypeId)
      this.form.CustomerPaymentTypes[this.form.CustomerPaymentTypes.indexOf(filteredArr[0])].RecordState = 4
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
      let filteredArr = this.form.CustomerLocations.filter(i => i.Code === this.customerLocations.Code)
      if (filteredArr.length < 1) {
        this.form.CustomerLocations.push({
          Code: this.customerLocations.Code,
          Description1: this.customerLocations.Description1,
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
          isRouteNode: this.customerLocations.isRouteNode,
          cityLabel: this.locationCityLabel,
          districtLabel: this.locationDistirictLabel,
          RecordState: 2
        })
      } else {
        let arrIndex = this.form.CustomerLocations.indexOf(filteredArr[0])
        this.form.CustomerLocations[arrIndex] = {
          Code: this.customerLocations.Code,
          Description1: this.customerLocations.Description1,
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
          isRouteNode: this.customerLocations.isRouteNode,
          cityLabel: this.locationCityLabel,
          districtLabel: this.locationDistirictLabel,
          RecordState: 3,
          RecordId: this.customerLocations.RecordId
        }
      }
      this.removeEditableInputs()
    },
    editCustomerLocation (item) {
      this.isLocationEditable = true
      let filteredArr = this.form.CustomerLocations[this.form.CustomerLocations.indexOf(item)]
      if (filteredArr.RecordId) {
        this.customerLocations = {
          Code: filteredArr.Code,
          Description1: filteredArr.Description1,
          addressDetail: filteredArr.AddressDetail,
          phoneNumber1: filteredArr.PhoneNumber1,
          faxNumber: filteredArr.FaxNumber,
          addressDescription: filteredArr.AddressDescription,
          genexp1: filteredArr.Genexp1,
          contactName: filteredArr.ContactName,
          cityId: filteredArr.CityId,
          xPosition: filteredArr.XPosition,
          yPosition: filteredArr.YPosition,
          districtId: filteredArr.DistrictId,
          genexp2: filteredArr.Genexp2,
          postCode: filteredArr.PostCode,
          alias: filteredArr.Alias,
          isDefaultLocation: filteredArr.IsDefaultLocation,
          isInvoiceAddress: filteredArr.IsInvoiceAddress,
          isDeliveryAddress: filteredArr.IsDeliveryAddress,
          isRouteNode: filteredArr.IsRouteNode,
          cityLabel: filteredArr.City ? filteredArr.City.Label : '',
          districtLabel: filteredArr.District ? filteredArr.District.Label : '',
          RecordId: filteredArr.RecordId
        }
        this.address = {
          CityId: filteredArr.CityId,
          DistrictId: filteredArr.DistrictId,
          Address: filteredArr.AddressDetail
        }
      } else {
        this.customerLocations = filteredArr
        this.customerLocations['recordId'] = null
      }
      this.locationCityLabel = filteredArr['cityLabel']
      this.locationDistirictLabel = filteredArr['districtLabel']
    },
    removeCustomerLocation (item) {
      this.form.CustomerLocations.splice(this.form.CustomerLocations.indexOf(item), 1)
    },
    removeEditableInputs () {
      this.customerLocations = []
      this.locationCityLabel = null
      this.locationDistirictLabel = null
      this.isLocationEditable = false

      let lastElem = this.form.CustomerLocations[this.form.CustomerLocations.length - 1].Code
      let tmpCode = lastElem.split('-')
      tmpCode = Number(tmpCode[1].trim())
      tmpCode += 1
      this.customerLocations.Code = `${this.form.Code} - ${tmpCode}`
    },
    addCreditHistories () {
      if (!this.customerCreditHistories.creditAmount || !this.customerCreditHistories.creditDescriptionId || !this.customerCreditHistories.creditStartDate || !this.customerCreditHistories.bankId || !this.customerCreditHistories.currencyId || !this.customerCreditHistories.creditEndDate) {
        this.$toasted.show(this.$t('insert.fillRequireds'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.form.CustomerCreditHistories.push({
        CreditAmount: this.customerCreditHistories.creditAmount,
        creditDescriptionId: this.customerCreditHistories.creditDescriptionId,
        creditStartDate: this.dateConvertToISo(this.customerCreditHistories.creditStartDate),
        bankId: this.customerCreditHistories.bankId,
        currencyId: this.customerCreditHistories.currencyId,
        creditEndDate: this.dateConvertToISo(this.customerCreditHistories.creditEndDate),
        Debtor: this.customerCreditHistories.debtor,
        Bail: this.customerCreditHistories.bail,
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
      this.form.CustomerCreditHistories.splice(this.form.CustomerCreditHistories.indexOf(item), 1)
    },
    selectedOptions (type, label) {
      this[type] = label
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    let validation = {
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
      }
    }
    validation.form.TaxNumber = {
      required, minLength: minLength(this.taxNumberReq), maxLength: maxLength(this.taxNumberReq)
    }
    return validation
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    statementDays (e) {
      if (e) {
        e.map(item => {
          item.Label = item.DayNumber + ' ' + item.Description1
        })
      }
    },
    paymentTypes (value) {
      if (value && this.DefaultPaymentTypeId) {
        this.DefaultPaymentType = value.find(v => v.RecordId === this.DefaultPaymentTypeId)
      }
    },
    lookup: {
      handler (val) {
        if (this.form.BlockReasonId && val.CUSTOMER_BLOCK_REASON) {
          this.BlockReason = val.CUSTOMER_BLOCK_REASON.find(c => c.DecimalValue === this.form.BlockReasonId)
        }
      },
      deep: true
    },
    rowData (e) {
      if (e) {
        this.form = {
          CommercialTitle: e.CommercialTitle,
          Description1: e.Description1,
          TaxOffice: e.TaxOffice,
          TaxNumber: e.TaxNumber,
          StatusId: this.numberConvertToString(e.StatusId),
          CreditLimit: e.CreditLimit,
          AllowOverLimit: this.numberConvertToString(e.AllowOverLimit),
          RiskLimit: e.RiskLimit,
          CurrentRisk: e.CurrentRisk,
          Barcode: e.Barcode,
          DiscountPercent1: e.DiscountPercent1,
          DiscountPercent2: e.DiscountPercent2,
          FinanceCode: e.FinanceCode,
          IsBlocked: this.numberConvertToString(e.IsBlocked),
          LicenseNumber: e.LicenseNumber,
          CurrentCredit: e.CurrentCredit,
          TextField1: e.TextField1,
          TextField2: e.TextField2,
          SalesVisitFrequency: e.SalesVisitFrequency,
          ServiceVisitFrequency: e.ServiceVisitFrequency,
          IsDirectDebit: this.numberConvertToString(e.IsDirectDebit),
          ManualInvoiceClosure: this.numberConvertToString(e.ManualInvoiceClosure),
          IsOrderChangeUnitary: this.numberConvertToString(e.IsOrderChangeUnitary),
          IsWarehouseSale: this.numberConvertToString(e.IsWarehouseSale),
          DeliveryDayParam: e.DeliveryDayParam,
          ManualSItem: this.numberConvertToString(e.ManualSItem),
          UseEInvoice: this.numberConvertToString(e.UseEInvoice),
          LicenseValidDate: e.LicenseValidDate,
          RouteCode: e.RouteCode,
          IsRouteRegion: this.numberConvertToString(e.IsRouteRegion),
          ReservedLimit: e.ReservedLimit,
          IsOpportunitySpot: this.numberConvertToString(e.IsOpportunitySpot),
          Code: e.Code,
          IsBlackListed: this.numberConvertToString(e.IsBlackListed),
          CardTypeId: e.CardTypeId,
          GroupId: e.GroupId,
          KindId: e.KindId,
          TypeId: e.TypeId,
          ClassId: e.ClassId,
          Category1Id: e.Category1Id,
          Category2Id: e.Category2Id,
          Category3Id: e.Category3Id,
          DefaultPaymentTypeId: e.DefaultPaymentTypeId,
          PriceListCategoryId: e.PriceListCategoryId,
          CustomerRegion5Id: e.CustomerRegion5Id,
          DiscountGroup1Id: e.DiscountGroup1Id,
          DiscountGroup2Id: e.DiscountGroup2Id,
          DiscountGroup3Id: e.DiscountGroup3Id,
          DiscountGroup4Id: e.DiscountGroup4Id,
          DiscountGroup5Id: e.DiscountGroup5Id,
          DiscountGroup6Id: e.DiscountGroup6Id,
          DiscountGroup7Id: e.DiscountGroup7Id,
          DiscountGroup8Id: e.DiscountGroup8Id,
          DiscountGroup9Id: e.DiscountGroup9Id,
          DiscountGroup10Id: e.DiscountGroup10Id,
          PaymentPeriod: e.PaymentPeriod,
          OwnerTypeId: e.OwnerTypeId,
          ClassProposalId: e.ClassProposalId,
          ClassProposalReasonId: e.ClassProposalReasonId,
          GeographicEnvironmentId: e.GeographicEnvironmentId,
          SalesMethodId: e.SalesMethodId,
          TradeFocusId: e.TradeFocusId,
          HoldsAsset: e.HoldsAsset,
          Contracted: e.Contracted,
          StatusReasonId: e.StatusReasonId,
          SignNameId: e.SignNameId,
          MarketingRegion5Id: e.MarketingRegion5Id,
          TaxCustomerTypeId: e.TaxCustomerTypeId,
          InvoiceCombineRuleId: e.InvoiceCombineRuleId,
          SalesDocumentTypeId: e.SalesDocumentTypeId,
          BlockReasonId: e.BlockReasonId,
          CustomerInvoiceTypeId: e.CustomerInvoiceTypeId,
          BackMarginGroupId: e.BackMarginGroupId,
          Activity1Id: e.Activity1Id,
          Activity2Id: e.Activity2Id,
          OutSourceOrderId: e.OutSourceOrderId,
          CustomerLocations: e.CustomerLocations,
          CustomerCreditHistories: e.CustomerCreditHistories,
          CustomerPaymentTypes: e.CustomerPaymentTypes,
          CustomerItemDiscounts: e.CustomerItemDiscounts,
          CustomerLabels: e.CustomerLabels,
          CustomerTouchpoints: e.CustomerTouchpoints,
          RecordId: e.RecordId,
          SalesTypeId: 0,
          RecordTypeId: e.RecordTypeId,
          Deleted: 0
        }
        this.customerLocations.Code = `${this.form.Code} - ${this.form.CustomerLocations.length ? this.form.CustomerLocations.length + 1 : 1}`

        // Detay panellerin doldurulması
        this.CustomerPaymentTypesArr.push(...e.CustomerPaymentTypes)

        if (e.CardType) {
          this.CardType = e.CardType.Label
          // this.selectedOptions('CardType', e.CardType.Label)
        }
        if (e.Group) {
          this.Group = e.Group.Label
        }
        if (e.Kind) {
          this.Kind = e.Kind.Label
        }
        if (e.Type) {
          this.Type = e.Type.Label
        }
        if (e.Class) {
          this.Class = e.Class.Label
        }
        if (e.Category1) {
          this.Category1 = e.Category1.Label
        }
        if (e.Category2) {
          this.Category2 = e.Category2.Label
        }
        if (e.Category3) {
          this.Category3 = e.Category3.Label
        }
        if (e.PriceListCategory) {
          this.PriceListCategory = e.PriceListCategory.Label
        }
        if (e.CustomerRegion5) {
          this.CustomerRegion5 = e.CustomerRegion5.Label
        }
        if (e.DiscountGroup1Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_1) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_1.filter(i => i.DecimalValue === e.DiscountGroup1Id)
          this.DiscountGroup1 = tmpArr[0].Label
        }
        if (e.DiscountGroup2Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_2) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_2.filter(i => i.DecimalValue === e.DiscountGroup2Id)
          this.DiscountGroup2 = tmpArr[0].Label
        }
        if (e.DiscountGroup3Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_3) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_3.filter(i => i.DecimalValue === e.DiscountGroup3Id)
          this.DiscountGroup3 = tmpArr[0].Label
        }
        if (e.DiscountGroup4Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_4) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_4.filter(i => i.DecimalValue === e.DiscountGroup4Id)
          this.DiscountGroup4 = tmpArr[0].Label
        }
        if (e.DiscountGroup5Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_5) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_5.filter(i => i.DecimalValue === e.DiscountGroup5Id)
          this.DiscountGroup5 = tmpArr[0].Label
        }
        if (e.DiscountGroup6Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_6) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_6.filter(i => i.DecimalValue === e.DiscountGroup6Id)
          this.DiscountGroup6 = tmpArr[0].Label
        }
        if (e.DiscountGroup7Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_7) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_7.filter(i => i.DecimalValue === e.DiscountGroup7Id)
          this.DiscountGroup7 = tmpArr[0].Label
        }
        if (e.DiscountGroup8Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_8) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_8.filter(i => i.DecimalValue === e.DiscountGroup8Id)
          this.DiscountGroup8 = tmpArr[0].Label
        }
        if (e.DiscountGroup9Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_9) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_9.filter(i => i.DecimalValue === e.DiscountGroup9Id)
          this.DiscountGroup9 = tmpArr[0].Label
        }
        if (e.DiscountGroup10Id && this.lookup.CUSTOMER_DISCOUNT_GROUP_10) {
          let tmpArr = this.lookup.CUSTOMER_DISCOUNT_GROUP_10.filter(i => i.DecimalValue === e.DiscountGroup10Id)
          this.DiscountGroup10 = tmpArr[0].Label
        }

        // buna bakılacak
        if (e.PaymentPeriod) {
          this.PaymentPeriod = e.PaymentPeriod.Label
        }
        if (e.OwnerType) {
          this.OwnerType = e.OwnerType.Label
        }
        if (e.ClassProposal) {
          this.ClassProposal = e.ClassProposal.Label
        }
        if (e.ClassProposalReason) {
          this.ClassProposalReason = e.ClassProposalReason.Label
        }
        if (e.GeographicEnvironment) {
          this.GeographicEnvironment = e.GeographicEnvironment.Label
        }
        if (e.SalesMethod) {
          this.SalesMethod = e.SalesMethod.Label
        }
        if (e.TradeFocus) {
          this.TradeFocus = e.TradeFocus.Label
        }
        if (e.HoldsAsseto) {
          this.HoldsAsset = e.HoldsAsseto.Label
        }
        if (e.Contractedo) {
          this.Contracted = e.Contractedo.Label
        }
        if (e.StatusReason) {
          this.StatusReason = e.StatusReason.Label
        }
        if (e.SignNameId && this.lookup.SIGN_NAME) {
          let tmpArr = this.lookup.SIGN_NAME.filter(i => i.DecimalValue === e.SignNameId)
          this.SignName = tmpArr[0].Label
        }
        if (e.MarketingRegion5) {
          this.MarketingRegion5 = e.MarketingRegion5.Label
        }
        this.TaxCustomerType = e.TaxCustomerType
        if (e.InvoiceCombineRuleId && this.lookup.INVOICE_COMBINE_RULE) {
          let tmpArr = this.lookup.INVOICE_COMBINE_RULE.filter(i => i.DecimalValue === e.InvoiceCombineRuleId)
          this.InvoiceCombineRule = tmpArr[0].Label
        }
        if (e.SalesDocumentType) {
          this.SalesDocumentType = e.SalesDocumentType.Label
        }
        if (e.BlockReasonId && this.lookup.CUSTOMER_BLOCK_REASON) {
          this.BlockReason = this.lookup.CUSTOMER_BLOCK_REASON.find(c => c.DecimalValue === e.BlockReasonId)
        }
        this.customerType = e.Type
        if (e.CustomerInvoiceTypeId && this.lookup.CUSTOMER_INVOICE_TYPE) {
          let tmpArr = this.lookup.CUSTOMER_INVOICE_TYPE.filter(i => i.DecimalValue === e.CustomerInvoiceTypeId)
          this.CustomerInvoiceType = tmpArr[0].Label
        }
        if (e.BackMarginGroup) {
          this.BackMarginGroup = e.BackMarginGroup.Label
        }
        if (e.Activity1) {
          this.Activity1 = e.Activity1.Label
        }
        if (e.Activity2) {
          this.Activity2 = e.Activity2.Label
        }
        if (e.OutSourceOrder) {
          this.OutSourceOrder = e.OutSourceOrder.Label
        }
        if (e.TCIBreak1) {
          this.TCIBreak1 = e.TCIBreak1.Label
        }
        if (e.TCIBreak2) {
          this.TCIBreak2 = e.TCIBreak2.Label
        }
        if (e.DefaultPaymentTypeId && this.paymentTypes) {
          this.DefaultPaymentType = this.paymentTypes.find(v => v.RecordId === e.DefaultPaymentTypeId)
        }
        this.form.CustomerLocations = e.CustomerLocations
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
    }
  }
}
</script>
<style lang="sass">
</style>
