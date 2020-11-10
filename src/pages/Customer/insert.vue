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
              <b-button size="sm" variant="outline-danger">Vazgeç</b-button>
            </router-link>
            <b-button @click="save()" size="sm" variant="success">Kaydet</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
           <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.customer.Model_Code')"
            >
              <b-form-input type="text" v-model="form.Code" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.customer.Model_StatusReasonId')"
            >
              <v-select :options="form.Model_StatusReasonId" @input="selectedVehicle" label="title"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group
              :label="$t('insert.state')"
            >
              <b-form-checkbox v-model="form.state" name="check-button" switch>
                {{(form.checked) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.Customer')" active>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.customer.Model_CommercialTitle')">
                <b-form-input type="text" v-model="form.Model_CommercialTitle" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Description1')">
                <b-form-input type="text" v-model="form.Model_Description1" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxCustomerTypeId')">
                <v-select :options="form.Model_TaxCustomerTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxOffice')">
                <b-form-input type="text" v-model="form.Model_TaxOffice" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TaxNumber')">
                <b-form-input type="text" v-model="form.Model_TaxNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDutyFree')">
                <b-form-radio-group v-model="form.Model_IsDutyFree">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_UseEInvoice')">
                <b-form-radio-group v-model="form.Model_UseEInvoice">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsTaxExemption')">
                <b-form-radio-group v-model="form.Model_IsTaxExemption">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CustomerInvoiceTypeId')">
                <v-select :options="form.Model_CustomerInvoiceTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CardTypeId')">
                <v-select :options="form.Model_CardTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TypeId')">
                <v-select :options="form.Model_TypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesTypeId')">
                <v-select :options="form.Model_SalesTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesDocumentTypeId')">
                <v-select :options="form.Model_SalesDocumentTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PriceListCategoryId')">
                <v-select :options="form.Model_PriceListCategoryId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesPriceChangeRate')">
                <b-form-input type="text" v-model="form.Model_SalesPriceChangeRate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DeliveryDayParam')">
                <b-form-input type="text" v-model="form.Model_DeliveryDayParam" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab :title="$t('insert.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Code')">
                <b-form-input type="text" v-model="form.Model_Code" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Description1')">
                <b-form-input type="text" v-model="form.Model_Description1" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group :label="$t('insert.customer.Model_AddressDetail')">
                <b-form-input type="text" v-model="form.Model_AddressDetail" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.city')">
                <v-select :options="cities" @input="selectedCity" label="il"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.distirict')">
                <v-select :options="distiricts" @input="selectedDistirict" label="ilce"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_AvenueId')">
                <v-select :options="form.Model_AvenueId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_StreetId')">
                <v-select :options="form.Model_StreetId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PostCode')">
                <b-form-input type="text" v-model="form.Model_PostCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_XPosition')">
                <b-form-input type="text" v-model="form.Model_XPosition" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_YPosition')">
                <b-form-input type="text" v-model="form.Model_YPosition" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6">
              <b-form-group :label="$t('insert.customer.Model_AddressDescription')">
                <b-form-input type="text" v-model="form.Model_AddressDescription" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ContactName')">
                <b-form-input type="text" v-model="form.Model_ContactName" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PhoneNumber1')">
                <b-form-input type="text" v-model="form.Model_PhoneNumber1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_PhoneNumber2')">
                <b-form-input type="text" v-model="form.Model_PhoneNumber2" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDefaultLocation')">
                <b-form-radio-group v-model="form.Model_IsDefaultLocation">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsInvoiceAddress')">
                <b-form-radio-group v-model="form.Model_IsInvoiceAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDeliveryAddress')">
                <b-form-radio-group v-model="form.Model_IsDeliveryAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="9" lg="6">
              <b-form-group :label="$t('insert.customer.Model_Genexp1')">
                <b-form-input type="text" v-model="form.Model_Genexp1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Alias')">
                <b-form-input type="text" v-model="form.Model_Alias" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerClass')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category1Id')">
                <v-select :options="form.Model_Category1Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category3Id')">
                <v-select :options="form.Model_Category3Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Category2Id')">
                <v-select :options="form.Model_Category2Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_GroupId')">
                <v-select :options="form.Model_GroupId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup1Id')">
                <v-select :options="form.Model_DiscountGroup1Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup3Id')">
                <v-select :options="form.Model_DiscountGroup3Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup5Id')">
                <v-select :options="form.Model_DiscountGroup5Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup6Id')">
                <v-select :options="form.Model_DiscountGroup6Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup7Id')">
                <v-select :options="form.Model_DiscountGroup7Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup8Id')">
                <v-select :options="form.Model_DiscountGroup8Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_SalesMethodId')">
                <v-select :options="form.Model_SalesMethodId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_TradeFocusId')">
                <v-select :options="form.Model_TradeFocusId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_DiscountGroup4Id')">
                <v-select :options="form.Model_DiscountGroup4Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_OwnerTypeId')">
                <v-select :options="form.Model_OwnerTypeId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassId')">
                <v-select :options="form.Model_ClassId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassProposalId')">
                <v-select :options="form.Model_ClassProposalId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ClassProposalReasonId')">
                <v-select :options="form.Model_ClassProposalReasonId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_KindId')">
                <v-select :options="form.Model_KindId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_GeographicEnvironmentId')">
                <v-select :options="form.Model_GeographicEnvironmentId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_Field1')">
                <v-select :options="form.Model_GroModel_Field1upId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerFinancialInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditLimit')">
                <b-form-input type="text" readonly v-model="form.Model_CreditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit')">
                <b-form-input type="text" readonly v-model="form.Model_RiskLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsDefaultLocation')">
                <b-form-radio-group v-model="form.Model_AllowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrentCredit')">
                <b-form-input type="text" readonly v-model="form.Model_CurrentCredit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrentRisk')">
                <b-form-input type="text" readonly v-model="form.Model_CurrentRisk" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsAutoBlockingOff')">
                <b-form-radio-group v-model="form.Model_IsAutoBlockingOff">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_IsBlocked')">
                <b-form-radio-group v-model="form.Model_IsBlocked">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_BlockReasonId')">
                <v-select :options="form.Model_BlockReasonId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_ManualInvoiceClosure')">
                <b-form-radio-group v-model="form.Model_ManualInvoiceClosure">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_InvoiceCombineRuleId')">
                <v-select :options="form.Model_InvoiceCombineRuleId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_FinanceCode')">
                <b-form-input type="text" readonly v-model="form.Model_FinanceCode" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CustomerRegion5Id')">
                <v-select :options="form.Model_CustomerRegion5Id" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerCreditHistories')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditDescriptionId')">
                <v-select :options="form.Model_CreditDescriptionId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditAmount')">
                <b-form-input type="text" v-model="form.Model_CreditAmount" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CurrencyId')">
                <v-select :options="form.Model_CurrencyId" @input="selectedVehicle" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditLimit')">
                <b-form-input type="text" v-model="form.Model_CreditLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_RiskLimit')">
                <b-form-input type="text" v-model="form.Model_RiskLimit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_AllowOverLimit')">
                <b-form-radio-group v-model="form.Model_AllowOverLimit">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditStartDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="form.Model_CreditStartDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.Model_CreditEndDate')">
                <b-form-datepicker :placeholder="$t('insert.customer.chooseDate')" v-model="form.Model_CreditEndDate" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerPaymentTypes')">
          <b-row>
            <b-col cols="12">
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
            </b-col>
            <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_PaymentTypeId')">
                    <v-select :options="form.Model_PaymentTypeId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group :label="$t('insert.customer.Model_FixedTermId')">
                    <v-select :options="form.Model_FixedTermId" @input="selectedVehicle" label="title"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3" lg="2">
                  <b-form-group>
                    <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerItemDiscountCrts')">
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
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
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
        active: null,
        checked: null,
        code: '',
        name: '',
        rotaType: null,
        rotaGroup: null,
        rotaClass: null,
        vehicle: null,
        personel: null,
        supervisor: null,
        control: null,
        city: null,
        superRoute: null,
        multiDayRoute: null,
        distirict: null,
        town: null,
        rotaTypes: [
          {
            id: 1,
            title: 'Rota Tipi 1'
          },
          {
            id: 2,
            title: 'Rota Tipi 2'
          },
          {
            id: 3,
            title: 'Rota Tipi 3'
          }
        ],
        rotaGroups: [
          {
            id: 1,
            title: 'Rota Grubu 1'
          },
          {
            id: 2,
            title: 'Rota Grubu 2'
          },
          {
            id: 3,
            title: 'Rota Grubu 3'
          }
        ],
        rotaClasses: [
          {
            id: 1,
            title: 'Rota Sınıfı 1'
          },
          {
            id: 2,
            title: 'Rota Sınıfı 2'
          },
          {
            id: 3,
            title: 'Rota Sınıfı 3'
          }
        ],
        customer: [
          {
            id: 1,
            title: 'Araç 1'
          },
          {
            id: 2,
            title: 'Araç 2'
          },
          {
            id: 3,
            title: 'Araç 3'
          }
        ],
        personels: [
          {
            id: 1,
            title: 'Personel 1'
          },
          {
            id: 2,
            title: 'Personel 2'
          },
          {
            id: 3,
            title: 'Personel 3'
          }
        ],
        supervisors: [
          {
            id: 1,
            title: 'Supervisor 1'
          },
          {
            id: 2,
            title: 'Supervisor 2'
          },
          {
            id: 3,
            title: 'Supervisor 3'
          }
        ],
        controls: [
          {
            id: 1,
            title: 'Manuel'
          },
          {
            id: 2,
            title: 'Auto'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['cities', 'distiricts'])
  },
  mounted () {
    this.$store.commit('setCities', false)
    this.$store.commit('bigLoaded', false)
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    },
    selectedVehicle (e) {
      this.vehicle = e.title
    },
    selectedCity (e) {
      this.city = e.title
      this.$store.commit('setDistiricts', e.plaka)
    },
    selectedDistirict (e) {
      console.log(e)
      this.distirict = e.id
    }
  }
}
</script>
<style lang="sass">
</style>
