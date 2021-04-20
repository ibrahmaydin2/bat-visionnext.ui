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
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.branch.Code')"
            >
              <b-form-input type="text" v-model="form.Code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.branch.Description1')"
            >
              <b-form-input type="text" v-model="form.Description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.branch.DistributionTypeId')"
            >
              <b-form-input type="text" v-model="form.branchType"/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.branch.Branch')" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.BranchCommercialTitle')"
              >
                <b-form-input type="text" v-model="form.Unvan"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.TaxCustomerTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.UpperBranchId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsDutyFree')"
              >
              <b-form-radio-group v-model="form.IsVehicle">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.TaxOffice')"
              >
                <b-form-input type="text" v-model="form.Vergi"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.TaxNumber')"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.BranchRegionId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.LicenseNumber')"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.SalesDocumentTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.InvoiceCombineRuleId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsOrderChangeUnitary')"
              >
              <b-form-radio-group v-model="form.isSales">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsWarehouseSale')"
              >
              <b-form-radio-group v-model="form.isWarehouse">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.WebUrl')"
              >
                <b-form-input type="text" v-model="form.adress"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.TradeLicenseNumber')"
              >
                <b-form-input type="text" v-model="form.sicilNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.UseEInvoice')"
              >
              <b-form-radio-group v-model="form.isEfatura">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.UseEArchive')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.UseEWaybill')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.StatusId')"
              >
              <b-form-radio-group v-model="form.isStatus">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.CustomerPrefixCode')"
              >
                <b-form-input type="text" v-model="form.OnCode"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.BranchDetails')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DiscountGroup10Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DiscountGroup2Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DiscountGroup9Id')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Genexp1')"
              >
                <b-form-input type="text" v-model="form.Note"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.BranchLocations')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Code_Location')"
              >
                <b-form-input type="text" v-model="form.locationCode"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Description1_Location')"
              >
                <b-form-input type="text" v-model="form.locationName"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.AddressDetail')"
              >
                <b-form-input type="text" v-model="form.add"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.CityId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DistrictId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.ParishId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.StreetDescription')"
              >
                <b-form-input type="text" v-model="form.sokak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.GsmNumber')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel1"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.PhoneNumber1')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel2"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.PhoneNumber2')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel3"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.FaxNumber')"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.faks"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsInvoiceAddress')"
              >
              <b-form-radio-group v-model="form.isFaturaAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsDeliveryAddress')"
              >
              <b-form-radio-group v-model="form.isTeslimat">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.IsDefaultLocation')"
              >
              <b-form-radio-group v-model="form.default">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Genexp1')"
              >
                <b-form-input type="text" v-model="form.note1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.BranchFinancialInfo')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DefaultPaymentTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.PriceListCategoryId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.MaxBonusRate')"
              >
                <b-form-input type="text" v-model="form.prim"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.SalesPriceChangeRate')"
              >
                <b-form-input type="text" v-model="form.change"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.PaymentPeriod')">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.FinanceCode')"
              >
                <b-form-input type="text" v-model="form.note2"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.CreditLimit')"
              >
                <b-form-input disabled type="text" v-model="form.limit"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.RiskLimit')"
              >
                <b-form-input disabled type="text" v-model="form.limit2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.AllowOverLimit')"
              >
              <b-form-radio-group v-model="form.isRisk">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.DeliveryDayParam')"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.DiscountPercent1')"
              >
                <b-form-input type="text" v-model="form.note4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.DiscountPercent2')"
              >
                <b-form-input type="text" v-model="form.note5"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.ManualInvoiceClosure')"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.BranchCreditHistories')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.CreditDescriptionId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.CreditAmount')"
              >
                <b-form-input type="text" v-model="form.tutar"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.CurrencyId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.BankId')">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.CreditStartDate')">
                <b-form-datepicker id="contract-datepicker1" :placeholder="$t('insert.branch.chooseDate')" v-model="form.date1" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.CreditEndDate')">
                <b-form-datepicker id="contract-datepicker2" :placeholder="$t('insert.branch.chooseDate')" v-model="form.date2" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.CreditLimit')"
              >
                <b-form-input type="text" v-model="form.limit3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.RiskLimit')"
              >
                <b-form-input type="text" v-model="form.limit4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.AllowOverLimit')"
              >
              <b-form-radio-group v-model="form.isRisk2">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Bail')"
              >
                <b-form-input type="text" disabled v-model="form.kefil"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Debtor')"
              >
                <b-form-input type="text" disabled v-model="form.borc"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.TextNo')"
              >
                <b-form-input type="text" disabled v-model="form.evrak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.TextDate')">
                <b-form-datepicker disabled id="contract-datepicker3" :placeholder="$t('insert.branch.chooseDate')" v-model="form.date4" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.LandOffice')"
              >
                <b-form-input type="text" disabled v-model="form.evrak1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.TraficRegistry')"
              >
                <b-form-input type="text" disabled v-model="form.evrak2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.NotaryNo')"
              >
                <b-form-input type="text" disabled v-model="form.evrak3"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.NotaryDate')">
                <b-form-datepicker disabled id="contract-datepicker4" :placeholder="$t('insert.branch.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.MortgageValue')"
              >
                <b-form-input type="text" disabled v-model="form.evrak4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.Plate')"
              >
                <b-form-input type="text" disabled v-model="form.evrak5"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                :label="$t('insert.branch.PlateNumber')"
              >
                <b-form-input type="text" disabled v-model="form.evrak6"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.PaymentType')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.PaymentType')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomFixedTerms')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.FixedTermId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.StartDate')">
                <b-form-datepicker id="contract-datepicker5" :placeholder="$t('insert.branch.StartDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.EndDate')">
                <b-form-datepicker id="contract-datepicker6" :placeholder="$t('insert.branch.EndDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.ColumnName')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.ColumnValue')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DiscountPercent1')">
                <b-form-input type="text" v-model="form.discount1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.DiscountPercent2')">
                <b-form-input type="text" v-model="form.discount2"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.branch.EInvoiceSeqs')">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.Prefix')">
                <b-form-input type="text" v-model="form.unit1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.TerminalOrPcId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.EInvoiceTypeId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.TransactionDayId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.branch.StatusId')">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> {{$t('insert.branch.add')}}</b-button>
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
