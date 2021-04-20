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
            <b-button @click="save()" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__updatePage-content-head">
      <section>
        <b-row>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.branch.Model_Code')"
            >
              <b-form-input type="text" v-model="form.Code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.branch.Model_Description1')"
            >
              <b-form-input type="text" v-model="form.Description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('update.branch.Model_DistributionTypeId')"
            >
              <b-form-input type="text" v-model="form.branchType"/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('update.branch.Branch')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_BranchCommercialTitle')"
              >
                <b-form-input type="text" v-model="form.Unvan"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_TaxCustomerTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_UpperBranchId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsDutyFree')"
              >
              <b-form-radio-group v-model="form.IsVehicle">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_TaxOffice')"
              >
                <b-form-input type="text" v-model="form.Vergi"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_TaxNumber')"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_BranchRegionId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_LicenseNumber')"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_SalesDocumentTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_InvoiceCombineRuleId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsOrderChangeUnitary')"
              >
              <b-form-radio-group v-model="form.isSales">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsWarehouseSale')"
              >
              <b-form-radio-group v-model="form.isWarehouse">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_WebUrl')"
              >
                <b-form-input type="text" v-model="form.adress"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_TradeLicenseNumber')"
              >
                <b-form-input type="text" v-model="form.sicilNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_UseEInvoice')"
              >
              <b-form-radio-group v-model="form.isEfatura">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_UseEArchive')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_UseEWaybill')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_StatusId')"
              >
              <b-form-radio-group v-model="form.isStatus">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_CustomerPrefixCode')"
              >
                <b-form-input type="text" v-model="form.OnCode"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.branch.BranchDetails')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_DiscountGroup10Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_DiscountGroup2Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_DiscountGroup9Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Genexp1')"
              >
                <b-form-input type="text" v-model="form.Note"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.branch.BranchLocations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Code_Location')"
              >
                <b-form-input type="text" v-model="form.locationCode"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Description1_Location')"
              >
                <b-form-input type="text" v-model="form.locationName"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_AddressDetail')"
              >
                <b-form-input type="text" v-model="form.add"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_CityId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_DistrictId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_ParishId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_StreetDescription')"
              >
                <b-form-input type="text" v-model="form.sokak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_GsmNumber')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel1"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_PhoneNumber1')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel2"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_PhoneNumber2')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel3"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_FaxNumber')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.faks"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsInvoiceAddress')"
              >
              <b-form-radio-group v-model="form.isFaturaAddress">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsDeliveryAddress')"
              >
              <b-form-radio-group v-model="form.isTeslimat">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_IsDefaultLocation')"
              >
              <b-form-radio-group v-model="form.default">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Genexp1')"
              >
                <b-form-input type="text" v-model="form.note1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.branch.BranchFinancialInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_DefaultPaymentTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_PriceListCategoryId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_MaxBonusRate')"
              >
                <b-form-input type="text" v-model="form.prim"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_SalesPriceChangeRate')"
              >
                <b-form-input type="text" v-model="form.change"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_PaymentPeriod')">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_FinanceCode')"
              >
                <b-form-input type="text" v-model="form.note2"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_CreditLimit')"
              >
                <b-form-input disabled type="text" v-model="form.limit"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_RiskLimit')"
              >
                <b-form-input disabled type="text" v-model="form.limit2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_AllowOverLimit')"
              >
              <b-form-radio-group v-model="form.isRisk">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_DeliveryDayParam')"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_DiscountPercent1')"
              >
                <b-form-input type="text" v-model="form.note4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_DiscountPercent2')"
              >
                <b-form-input type="text" v-model="form.note5"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_ManualInvoiceClosure')"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.branch.BranchCreditHistories')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_CreditDescriptionId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_CreditAmount')"
              >
                <b-form-input type="text" v-model="form.tutar"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_CurrencyId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_BankId')">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_CreditStartDate')">
                <b-form-datepicker id="contract-datepicker1" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date1" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_CreditEndDate')">
                <b-form-datepicker id="contract-datepicker2" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date2" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_CreditLimit')"
              >
                <b-form-input type="text" v-model="form.limit3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_RiskLimit')"
              >
                <b-form-input type="text" v-model="form.limit4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_AllowOverLimit')"
              >
              <b-form-radio-group v-model="form.isRisk2">
                  <b-form-radio value="1">{{$t('update.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('update.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Bail')"
              >
                <b-form-input type="text" disabled v-model="form.kefil"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Debtor')"
              >
                <b-form-input type="text" disabled v-model="form.borc"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_TextNo')"
              >
                <b-form-input type="text" disabled v-model="form.evrak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_TextDate')">
                <b-form-datepicker disabled id="contract-datepicker3" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date4" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_LandOffice')"
              >
                <b-form-input type="text" disabled v-model="form.evrak1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_TraficRegistry')"
              >
                <b-form-input type="text" disabled v-model="form.evrak2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_NotaryNo')"
              >
                <b-form-input type="text" disabled v-model="form.evrak3"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_NotaryDate')">
                <b-form-datepicker disabled id="contract-datepicker4" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_MortgageValue')"
              >
                <b-form-input type="text" disabled v-model="form.evrak4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_Plate')"
              >
                <b-form-input type="text" disabled v-model="form.evrak5"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('update.branch.Model_PlateNumber')"
              >
                <b-form-input type="text" disabled v-model="form.evrak6"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('update.branch.Model_PaymentType')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('update.branch.Model_PaymentType')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Ödeme Vadeleri">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Satın Alma Ödeme Vadesi">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Ürün İndirimleri">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Başlangıç Tarihi">
                <b-form-datepicker id="contract-datepicker5" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Bitiş Tarihi">
                <b-form-datepicker id="contract-datepicker6" :placeholder="$t('update.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Alan Açıklaması">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Değer">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ürün İndirimi 1*"
              >
                <b-form-input type="text" v-model="form.discount1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ürün İndirimi 2*"
              >
                <b-form-input type="text" v-model="form.discount2"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="EFU Kodları">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ön Birim Kod*"
              >
                <b-form-input type="text" v-model="form.unit1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Terminal mi PC mi?">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="VisionPlus EFU Servisleri*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="İşlem Günü">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Durum">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('update.branch.add')}}</b-button>
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
        Code: '',
        Description1: '',
        branchType: '',
        driver: null,
        drivers: [
          {
            id: 1,
            title: 'Örnek 1'
          },
          {
            id: 2,
            title: 'Örnek 2'
          },
          {
            id: 3,
            title: 'Örnek 3'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState([])
  },
  mounted () {
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    },
    selectedDriver (e) {
      this.form.driver = e.title
    }
  }
}
</script>
<style lang="sass">
</style>
