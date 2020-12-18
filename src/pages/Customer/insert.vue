<template>
  <b-row>
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
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.customer.code')">
              <b-form-input type="text" v-model="form.model.code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.customer.Model_CardTypeId')">
              <v-select :options="customerCardTypes" @input="selectedCartType" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.customer.Model_StatusReasonId')">
              <v-select :options="cancelReasons" @input="selectedCancelReason" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group :label="$t('insert.state')">
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CommercialTitle')">
                <b-form-input type="text" v-model="form.model.commercialTitle" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Description1')">
                <b-form-input type="text" v-model="form.model.description1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_LicenseNumber')">
                <b-form-input type="text" v-model="form.model.licenseNumber" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxCustomerTypeId')">
                <v-select :options="customerTaxTypes" @input="selectedCustomerTaxType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxOffice')">
                <b-form-input type="text" v-model="form.model.taxOffice" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxNumber')">
                <b-form-input type="text" v-model="form.model.taxNumber" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.customerEmail')">
                <b-form-input type="text" v-model="form.model.customerEmail" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_salesVisitFrequency')">
                <b-form-input type="text" v-model="form.model.salesVisitFrequency" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_BlockReasonId')">
                <v-select :options="blockReasons" @input="selectedBlockReason" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TypeId')">
                <v-select :options="customerTypes" @input="selectedCustomerType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.serviceVisitFrequency')">
                <b-form-input type="text" v-model="form.model.serviceVisitFrequency" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CustomerInvoiceTypeId')">
                <v-select :options="customerInvoiceTypes" @input="selectedInvoiceType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesTypeId')">
                <v-select :options="form.Model_SalesTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col> -->
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.routeCode')">
                <b-form-input type="text" v-model="form.model.routeCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsBlocked')">
                <b-form-radio-group v-model="form.model.isBlocked">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_isWarehouseSale')">
                <b-form-radio-group v-model="form.model.isWarehouseSale">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesPriceChangeRate')">
                <b-form-input type="text" v-model="form.Model_SalesPriceChangeRate" />
              </b-form-group>
            </b-col> -->
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.manualSItem')">
                <b-form-radio-group v-model="form.model.manualSItem">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isRouteRegion')">
                <b-form-radio-group v-model="form.model.isRouteRegion">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isOrderChangeUnitary')">
                <b-form-radio-group v-model="form.model.isOrderChangeUnitary">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_UseEInvoice')">
                <b-form-radio-group v-model="form.model.useEInvoice">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
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
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_AvenueId')">
                <v-select :options="form.Model_AvenueId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_StreetId')">
                <v-select :options="form.Model_StreetId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col> -->
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
                <b-button @click="addCustomerLocations" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.model.customerLocations.length > 0">
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(r, i) in form.model.customerLocations" :key="i">
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category1Id')">
                <v-select :options="customerCategory1" @input="selectedCustomerCategory1" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category2Id')">
                <v-select :options="customerCategory2" @input="selectedCustomerCategory2" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category3Id')">
                <v-select :options="customerCategory3" @input="selectedCustomerCategory3" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_GroupId')">
                <v-select :options="customerGroups" @input="selectedCustomerGroup" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassId')">
                <v-select :options="customerClass" @input="selectedCustomerClass" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesDocumentTypeId')">
                <v-select :options="salesDocumentTypes" @input="selectedSalesDocumentType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_OwnerTypeId')">
                <v-select :options="ownerTypes" @input="selectedOwnerType" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassProposalId')">
                <v-select :options="classProposals" @input="selectedClassProposal" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesMethodId')">
                <v-select :options="customerSalesMethods" @input="selectedCustomerSalesMethod" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_GeographicEnvironmentId')">
                <v-select :options="geographicEnvironments" @input="selectedGeographicEnvironments" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TradeFocusId')">
                <v-select :options="customerTradeFocus" @input="selectedCustomerTradeFocus" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_InvoiceCombineRuleId')">
                <v-select :options="invoiceCombineRules" @input="selectedInvoiceCombineRule" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassProposalReasonId')">
                <v-select :options="classProposalReasons" @input="selectedClassProposalReason" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_BackMarginGroupId')">
                <v-select :options="backMarginGroups" @input="selectedBackMarginGroup" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field1')">
                <v-select :options="form.Model_GroModel_Field1upId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row> -->
          <!-- <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field2')">
                <v-select :options="form.Model_Field2" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field3')">
                <v-select :options="form.Model_Field3" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field4')">
                <v-select :options="form.Model_Field4" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field5')">
                <v-select :options="form.Model_Field5" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="4">
              <b-form-group :label="$t('insert.customer.Model_TextField6')">
                <b-form-textarea v-model="form.Model_TextField6" placeholder="Sevkiyat notu girin..." rows="6" style="height: 150px !important" v-once></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row> -->
        </b-tab>
        <b-tab :title="$t('insert.customer.AdditionalClassInformation')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup1Id')">
                <v-select :options="discountGroups1" @input="selectedDiscountGroups1" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup3Id')">
                <v-select :options="discountGroups3" @input="selectedDiscountGroups3" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup4Id')">
                <v-select :options="discountGroups4" @input="selectedDiscountGroups4" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup5Id')">
                <v-select :options="discountGroups5" @input="selectedDiscountGroups5" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup6Id')">
                <v-select :options="discountGroups6" @input="selectedDiscountGroups6" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup7Id')">
                <v-select :options="discountGroups7" @input="selectedDiscountGroups7" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup8Id')">
                <v-select :options="discountGroups8" @input="selectedDiscountGroups8" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_KindId')">
                <v-select :options="customerKinds" @input="selectedKind" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PriceListCategoryId')">
                <v-select :options="priceList" @input="selectedPriceList" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditLimit')">
                <b-form-input type="text" v-model="form.model.creditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit')">
                <b-form-input type="text" v-model="form.model.riskLimit" />
              </b-form-group>
            </b-col>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDefaultLocation')">
                <b-form-radio-group v-model="form.Model_AllowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col> -->
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrentCredit')">
                <b-form-input type="text" v-model="form.model.currentCredit" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsAutoBlockingOff')">
                <b-form-radio-group v-model="form.Model_IsAutoBlockingOff">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col> -->
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrentRisk')">
                <b-form-input type="text" v-model="form.model.currentRisk" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.reservedLimit')">
                <b-form-input type="text" v-model="form.model.reservedLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_FinanceCode')">
                <b-form-input type="text" v-model="form.model.financeCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.debitAccountRemainder')">
                <b-form-input type="text" v-model="form.model.debitAccountRemainder" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.creditAccountRemainder')">
                <b-form-input type="text" v-model="form.model.creditAccountRemainder" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent1')">
                <b-form-input type="text" v-model="form.model.discountPercent1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent2')">
                <b-form-input type="text" v-model="form.model.discountPercent2" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ManualInvoiceClosure')">
                <b-form-radio-group v-model="form.model.manualInvoiceClosure">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CustomerRegion5Id')">
                <v-select :options="form.Model_CustomerRegion5Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col> -->
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.sapCustomerId')">
                <b-form-input type="text" v-model="form.model.sapCustomerId" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DeliveryDayParam')">
                <b-form-input type="text" v-model="form.model.deliveryDayParam" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isBlackListed')">
                <b-form-radio-group v-model="form.model.isBlackListed">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.statement')">
                <b-form-radio-group v-model="form.model.statement">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_AllowOverLimit')">
                <b-form-radio-group v-model="form.model.allowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isDirectDebit')">
                <b-form-radio-group v-model="form.model.isDirectDebit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditDescriptionId')">
                <v-select :options="creditDescriptions" @input="selectedCreditDescription" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditAmount')">
                <b-form-input type="text" v-model="customerCreditHistories.creditAmount" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrencyId')">
                <v-select :options="form.Model_CurrencyId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.textDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.debtor')">
                <b-form-input type="text" v-model="customerCreditHistories.debtor" />
              </b-form-group>
            </b-col>
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
          </b-row>
          <b-row>
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditStartDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditEndDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="customerCreditHistories.creditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textNo')">
                <b-form-input type="text" v-model="customerCreditHistories.textNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryNo')">
                <b-form-input type="text" v-model="customerCreditHistories.notaryNo" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.dbsPriority')">
                <b-form-input type="text" v-model="customerCreditHistories.dbsPriority" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.allowOverLimit')">
                <b-form-radio-group v-model="form.model.allowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2" class="ml-auto">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <!-- <b-col cols="12">
              <b-row>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group :label="$t('insert.customer.Model_DefaultPaymentTypeId')">
                    <v-select :options="form.Model_DefaultPaymentTypeId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group :label="$t('insert.customer.Model_BankPaymentSystemId')">
                    <v-select :options="form.Model_BankPaymentSystemId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group :label="$t('insert.customer.Model_PaymentPeriod')">
                    <v-select :options="form.Model_PaymentPeriod" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col> -->
            <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_PaymentTypeId')">
                    <v-select :options="form.Model_PaymentTypeId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.add')}}</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <!-- <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_FixedTermId')">
                    <v-select :options="form.Model_FixedTermId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col> -->
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textField1')">
                <b-form-input type="text" v-model="form.model.textField1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.textField2')">
                <b-form-input type="text" v-model="form.model.textField2" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.barcode')">
                <b-form-input type="text" v-model="form.model.barcode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.holdAsset')">
                <v-select :options="holdAssets" @input="selectedHoldAsset" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.contracted')">
                <v-select :options="contracteds" @input="selectedContracteds" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountGroup10')">
                <v-select :options="discountGroups10" @input="selectedDiscountGroups10" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountGroup2')">
                <v-select :options="discountGroups2" @input="selectedDiscountGroups2" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.discountGroup9')">
                <v-select :options="discountGroups9" @input="selectedDiscountGroups9" label="Label"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.signNameId')">
                <v-select :options="signNameIds" @input="selectedSignNameIds" label="Label"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.isOpportunitySpot')">
                <b-form-radio-group v-model="form.model.isOpportunitySpot">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <!-- <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent1')">
                <b-form-input type="text" v-model="form.Model_DiscountPercent1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent2')">
                <b-form-input type="text" v-model="form.Model_DiscountPercent2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ColumnName')">
                <v-select :options="form.Model_ColumnName" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ColumnValue')">
                <v-select :options="form.Model_ColumnValue" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_StartDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.Model_StartDate')" v-model="form.Model_StartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_EndDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.Model_EndDate')" v-model="form.Model_StartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="1">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent1')">
                <b-form-input type="text" v-model="form.Model_DiscountPercent1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="1">
              <b-form-group :label="$t('insert.customer.Model_DiscountPercent2')">
                <b-form-input type="text" v-model="form.Model_DiscountPercent2" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab> -->
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        model: {
          code: null,
          cardTypeId: null,
          commercialTitle: null,
          licenseNumber: null,
          statusId: 1,
          description1: null,
          licenseValidDate: null,
          statusReasonId: null,
          typeId: null,
          salesVisitFrequency: null,
          blockReasonId: null,
          taxCustomerTypeId: null,
          serviceVisitFrequency: null,
          isBlocked: null,
          taxOffice: null,
          routeCode: null,
          isWarehouseSale: null,
          taxNumber: null,
          useEInvoice: null,
          customerInvoiceTypeId: null,
          manualSItem: null,
          isRouteRegion: null,
          isOrderChangeUnitary: null,
          customerEmail: null,
          customerLocations: [],
          groupId: null,
          classId: null,
          salesDocumentTypeId: null,
          ownerTypeId: null,
          classProposalId: null,
          classProposalReasonId: null,
          salesMethodId: null,
          geographicEnvironmentId: null,
          tradeFocusId: null,
          invoiceCombineRuleId: null,
          backMarginGroupId: null,
          discountGroup1Id: null,
          discountGroup3Id: null,
          discountGroup4Id: null,
          discountGroup5Id: null,
          discountGroup6Id: null,
          discountGroup7Id: null,
          discountGroup8Id: null,
          kindId: null,
          defaultPaymentTypeId: null,
          paymentPeriod: null,
          priceListCategoryId: null,
          creditLimit: null,
          riskLimit: null,
          reservedLimit: null,
          currentCredit: null,
          currentRisk: null,
          debitAccountRemainder: null,
          creditAccountRemainder: null,
          financeCode: null,
          discountPercent1: null,
          discountPercent2: null,
          tciBreak1Id: null,
          tciBreak2Id: null,
          manualInvoiceClosure: null,
          isBlackListed: null,
          statement: null,
          statementDay: null,
          sapCustomerId: null,
          allowOverLimit: null,
          deliveryDayParam: null,
          isDirectDebit: null,
          customerCreditHistories: [],
          customerPaymentTypes: [],
          textField1: null,
          textField2: null,
          barcode: null,
          contracted: null,
          holdsAsset: null,
          discountGroup10: null,
          discountGroup2: null,
          discountGroup9: null,
          signNameId: null,
          isOpportunitySpot: null
        }
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
        paymentTypeId: null
      },
      dataStatus: true,
      locationCodeCount: 1
    }
  },
  computed: {
    ...mapState([
      'createCode',
      'cities',
      'distiricts',
      'customerCardTypes',
      'cancelReasons',
      'customerTypes',
      'blockReasons',
      'customerTaxTypes',
      'customerInvoiceTypes',
      'customerCategory1',
      'customerCategory2',
      'customerCategory3',
      'customerGroups',
      'customerClass',
      'salesDocumentTypes',
      'ownerTypes',
      'classProposals',
      'classProposalReasons',
      'customerSalesMethods',
      'geographicEnvironments',
      'customerTradeFocus',
      'invoiceCombineRules',
      'backMarginGroups',
      'discountGroups1',
      'discountGroups3',
      'discountGroups4',
      'discountGroups5',
      'discountGroups6',
      'discountGroups7',
      'discountGroups8',
      'customerKinds',
      'priceList',
      'creditDescriptions',
      'holdAssets',
      'contracteds',
      'discountGroups10',
      'discountGroups2',
      'discountGroups9',
      'signNameIds',
      'lookup'
    ])
  },
  mounted () {
    // this.$store.commit('setCities', false)
    this.$store.commit('bigLoaded', false)
    this.getCode()
    this.getLookup()
    this.getDatas()
  },
  methods: {
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextCustomer/api/Customer/GetCode'})
    },
    getLookup () {
      // Nameler store içerisinde statelerde statik oluşuturuluyor. Tek bir servis kullanmak için böyle yapıldı.
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_TYPE,CUSTOMER_BLOCK_REASON,TAX_CUSTOMER_TYPE,CUSTOMER_INVOICE_TYPE,CITY,CUSTOMER_CATEGORY_1,CUSTOMER_CATEGORY_2,CUSTOMER_CATEGORY_3,CUSTOMER_GROUP,CUSTOMER_CLASS,SALES_DOCUMENT_TYPE,OWNER_TYPE,CUSTOMER_CLASS_PROPOSAL,CUSTOMER_CLASS_PROPOSAL,CUSTOMER_SALES_METHOD,CUSTOMER_GEOGRAPHIC_ENVIRONMENT,CUSTOMER_TRADE_FOCUS,INVOICE_COMBINE_RULE,BACK_MARGIN_GROUP,CUSTOMER_DISCOUNT_GROUP_1,CUSTOMER_DISCOUNT_GROUP_3,CUSTOMER_DISCOUNT_GROUP_4,CUSTOMER_DISCOUNT_GROUP_5,CUSTOMER_DISCOUNT_GROUP_6,CUSTOMER_DISCOUNT_GROUP_7,CUSTOMER_DISCOUNT_GROUP_8,CUSTOMER_KIND,PRICE_LIST_CATEGORY_TYPE,CREDIT_DESCRIPTION,CUSTOMER_HOLD_ASSET,CUSTOMER_CONTRACTED,CUSTOMER_DISCOUNT_GROUP_10,CUSTOMER_DISCOUNT_GROUP_2,CUSTOMER_DISCOUNT_GROUP_9,SIGN_NAME'})

      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_TYPE', name: 'customerTypes'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_BLOCK_REASON', name: 'blockReasons'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'TAX_CUSTOMER_TYPE', name: 'customerTaxTypes'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_INVOICE_TYPE', name: 'customerInvoiceTypes'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CITY', name: 'cities'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CATEGORY_1', name: 'customerCategory1'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CATEGORY_2', name: 'customerCategory2'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CATEGORY_3', name: 'customerCategory3'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_GROUP', name: 'customerGroups'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CLASS', name: 'customerClass'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'SALES_DOCUMENT_TYPE', name: 'salesDocumentTypes'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'OWNER_TYPE', name: 'ownerTypes'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CLASS_PROPOSAL', name: 'classProposals'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CLASS_PROPOSAL', name: 'classProposalReasons'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_SALES_METHOD', name: 'customerSalesMethods'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_GEOGRAPHIC_ENVIRONMENT', name: 'geographicEnvironments'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_TRADE_FOCUS', name: 'customerTradeFocus'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'INVOICE_COMBINE_RULE', name: 'invoiceCombineRules'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'BACK_MARGIN_GROUP', name: 'backMarginGroups'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_1', name: 'discountGroups1'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_3', name: 'discountGroups3'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_4', name: 'discountGroups4'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_5', name: 'discountGroups5'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_6', name: 'discountGroups6'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_7', name: 'discountGroups7'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_8', name: 'discountGroups8'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_KIND', name: 'customerKinds'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'PRICE_LIST_CATEGORY_TYPE', name: 'priceList'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CREDIT_DESCRIPTION', name: 'creditDescriptions'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_HOLD_ASSET', name: 'holdAssets'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_CONTRACTED', name: 'contracteds'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_10', name: 'discountGroups10'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_2', name: 'discountGroups2'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_DISCOUNT_GROUP_9', name: 'discountGroups9'})
      // this.$store.dispatch('getLookups', {...this.query, type: 'SIGN_NAME', name: 'signNameIds'})
      let allLookups = 'CUSTOMER_TYPE,CUSTOMER_BLOCK_REASON,TAX_CUSTOMER_TYPE,CUSTOMER_INVOICE_TYPE,CITY'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})

    },
    getDatas() {
      this.$store.dispatch('getCustomerCardType')
      this.$store.dispatch('getCustomerCancelReasons')
    },
    save () {
      let createData = {
      }
      console.log(this.form.model)
      // this.$store.dispatch('createData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: this.form, return: this.$route.meta.baseLink})
    },
    selectedCartType (e) {
      if (e) {
        this.form.model.cardTypeId = e.RecordId
      } else {
        this.form.model.cardTypeId = null
      }
    },
    selectedCancelReason (e) {
      if (e) {
        this.form.model.statusReasonId = e.RecordId
      } else {
        this.form.model.statusReasonId = null
      }
    },
    selectedCustomerType (e) {
      if (e) {
        this.form.model.typeId = e.DecimalValue
      } else {
        this.form.model.typeId = null
      }
    },
    selectedCustomerTaxType (e) {
      if (e) {
        this.form.model.taxCustomerTypeId = e.DecimalValue
      } else {
        this.form.model.taxCustomerTypeId = null
      }
    },
    selectedBlockReason (e) {
      if (e) {
        this.form.model.blockReasonId = e.DecimalValue
      } else {
        this.form.model.blockReasonId = null
      }
    },
    selectedInvoiceType (e) {
      if (e) {
        this.form.model.customerInvoiceTypeId = e.DecimalValue
      } else {
        this.form.model.customerInvoiceTypeId = null
      }
    },
    selectedCustomerCategory1 (e) {
      if (e) {
        this.form.model.category1Id = e.DecimalValue
      } else {
        this.form.model.category1Id = null
      }
    },
    selectedCustomerCategory2 (e) {
      if (e) {
        this.form.model.category2Id = e.DecimalValue
      } else {
        this.form.model.category2Id = null
      }
    },
    selectedCustomerCategory3 (e) {
      if (e) {
        this.form.model.category3Id = e.DecimalValue
      } else {
        this.form.model.category3Id = null
      }
    },
    selectedCustomerGroup (e) {
      if (e) {
        this.form.model.groupId = e.DecimalValue
      } else {
        this.form.model.groupId = null
      }
    },
    selectedCustomerClass (e) {
      if (e) {
        this.form.model.classId = e.DecimalValue
      } else {
        this.form.model.classId = null
      }
    },
    selectedSalesDocumentType (e) {
      if (e) {
        this.form.model.salesDocumentTypeId = e.DecimalValue
      } else {
        this.form.model.salesDocumentTypeId = null
      }
    },
    selectedOwnerType (e) {
      if (e) {
        this.form.model.ownerTypeId = e.DecimalValue
      } else {
        this.form.model.ownerTypeId = null
      }
    },
    selectedClassProposal (e) {
      if (e) {
        this.form.model.classProposalId = e.DecimalValue
      } else {
        this.form.model.classProposalId = null
      }
    },
    selectedClassProposalReason (e) {
      if (e) {
        this.form.model.classProposalReasonId = e.DecimalValue
      } else {
        this.form.model.classProposalReasonId = null
      }
    },
    selectedCustomerSalesMethod (e) {
      if (e) {
        this.form.model.salesMethodId = e.DecimalValue
      } else {
        this.form.model.salesMethodId = null
      }
    },
    selectedGeographicEnvironments (e) {
      if (e) {
        this.form.model.geographicEnvironmentId = e.DecimalValue
      } else {
        this.form.model.geographicEnvironmentId = null
      }
    },
    selectedCustomerTradeFocus (e) {
      if (e) {
        this.form.model.tradeFocusId = e.DecimalValue
      } else {
        this.form.model.tradeFocusId = null
      }
    },
    selectedInvoiceCombineRule (e) {
      if (e) {
        this.form.model.invoiceCombineRuleId = e.DecimalValue
      } else {
        this.form.model.invoiceCombineRuleId = null
      }
    },
    selectedBackMarginGroup (e) {
      if (e) {
        this.form.model.backMarginGroupId = e.DecimalValue
      } else {
        this.form.model.backMarginGroupId = null
      }
    },
    selectedDiscountGroups1 (e) {
      if (e) {
        this.form.model.discountGroup1Id = e.DecimalValue
      } else {
        this.form.model.discountGroup1Id = null
      }
    },
    selectedDiscountGroups3 (e) {
      if (e) {
        this.form.model.discountGroup3Id = e.DecimalValue
      } else {
        this.form.model.discountGroup3Id = null
      }
    },
    selectedDiscountGroups4 (e) {
      if (e) {
        this.form.model.discountGroup4Id = e.DecimalValue
      } else {
        this.form.model.discountGroup4Id = null
      }
    },
    selectedDiscountGroups5 (e) {
      if (e) {
        this.form.model.discountGroup5Id = e.DecimalValue
      } else {
        this.form.model.discountGroup5Id = null
      }
    },
    selectedDiscountGroups6 (e) {
      if (e) {
        this.form.model.discountGroup6Id = e.DecimalValue
      } else {
        this.form.model.discountGroup6Id = null
      }
    },
    selectedDiscountGroups7 (e) {
      if (e) {
        this.form.model.discountGroup7Id = e.DecimalValue
      } else {
        this.form.model.discountGroup7Id = null
      }
    },
    selectedDiscountGroups8 (e) {
      if (e) {
        this.form.model.discountGroup8Id = e.DecimalValue
      } else {
        this.form.model.discountGroup8Id = null
      }
    },
    selectedPriceList (e) {
      if (e) {
        this.form.model.priceListCategoryId = e.DecimalValue
      } else {
        this.form.model.priceListCategoryId = null
      }
    },
    selectedCreditDescription (e) {
      if (e) {
        this.customerCreditHistories.creditDescriptionId = e.DecimalValue
      } else {
        this.customerCreditHistories.creditDescriptionId = null
      }
    },
    selectedKind (e) {
      if (e) {
        this.form.model.kindId = e.DecimalValue
      } else {
        this.form.model.kindId = null
      }
    },
    selectedHoldAsset (e) {
      if (e) {
        this.form.model.holdsAsset = e.DecimalValue
      } else {
        this.form.model.holdsAsset = null
      }
    },
    selectedContracteds (e) {
      if (e) {
        this.form.model.contracted = e.DecimalValue
      } else {
        this.form.model.contracted = null
      }
    },
    selectedDiscountGroups10 (e) {
      if (e) {
        this.form.model.discountGroup10 = e.DecimalValue
      } else {
        this.form.model.discountGroup10 = null
      }
    },
    selectedDiscountGroups2 (e) {
      if (e) {
        this.form.model.discountGroup2 = e.DecimalValue
      } else {
        this.form.model.discountGroup2 = null
      }
    },
    selectedDiscountGroups9 (e) {
      if (e) {
        this.form.model.discountGroup9 = e.DecimalValue
      } else {
        this.form.model.discountGroup9 = null
      }
    },
    selectedSignNameIds (e) {
      if (e) {
        this.form.model.signNameId = e.DecimalValue
      } else {
        this.form.model.signNameId = null
      }
    },
    
    addCustomerLocations () {
      this.form.model.customerLocations.push({
        code: this.customerLocations.code ,
        description1: this.customerLocations.description1 ,
        addressDetail: this.customerLocations.addressDetail ,
        phoneNumber1: this.customerLocations.phoneNumber1 ,
        faxNumber: this.customerLocations.faxNumber ,
        addressDescription: this.customerLocations.addressDescription ,
        genexp1: this.customerLocations.genexp1 ,
        contactName: this.customerLocations.contactName ,
        cityId: this.customerLocations.cityId ,
        xPosition: this.customerLocations.xPosition ,
        yPosition: this.customerLocations.yPosition ,
        districtId: this.customerLocations.districtId ,
        genexp2: this.customerLocations.genexp2 ,
        postCode: this.customerLocations.postCode ,
        alias: this.customerLocations.alias ,
        isDefaultLocation: this.customerLocations.isDefaultLocation ,
        isInvoiceAddress: this.customerLocations.isInvoiceAddress ,
        isDeliveryAddress: this.customerLocations.isDeliveryAddress ,
        isRouteNode: this.customerLocations.isRouteNode 
      })
    },
    removeCustomerLocation (item) {
      this.form.model.customerLocations.splice(this.form.model.customerLocations.indexOf(item), 1)
    },
    selectedVehicle (e) {
      this.vehicle = e.title
    },
    selectedCity (e) {
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
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.model.code = e
        this.customerLocations.code = `${this.form.model.code} - ${this.locationCodeCount}`
      }
    },
    dataStatus: function (e) {
      if (e) {
        this.form.model.statusId = 1
      } else {
        this.form.model.statusId = 0
      }
    },
    lookup(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="sass">
</style>
