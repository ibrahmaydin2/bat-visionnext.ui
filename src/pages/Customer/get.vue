<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.Model_StatusReasonId')}}:</b> {{rowData.StatusReason ? rowData.StatusReason.Label : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.customer.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CommercialTitle')}}</span><p>{{rowData.CommercialTitle}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Description1')}}</span><p>{{rowData.Description1}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxCustomerTypeId')}}</span><p>{{rowData.TaxCustomerTypeId}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxOffice')}}</span><p>{{rowData.TaxOffice}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TaxNumber')}}</span><p>{{rowData.TaxNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsDutyFree')}}</span> <p><i :class="rowData.IsDutyFree === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_UseEInvoice')}}</span> <p><i :class="rowData.UseEInvoice === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsTaxExemption')}}</span> <p><i :class="rowData.IsTaxExemption === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerInvoiceTypeId')}}</span><p>{{rowData.CustomerInvoiceTypeId}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CardTypeId')}}</span><p>{{rowData.CardType ? rowData.CardType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TypeId')}}</span><p>{{rowData.Type ? rowData.Type : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesTypeId')}}</span><p>{{rowData.SalesType ? rowData.SalesType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesDocumentTypeId')}}</span><p>{{rowData.SalesDocumentType ? rowData.SalesDocumentType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_PriceListCategoryId')}}</span><p>{{rowData.PriceListCategory ? rowData.PriceListCategory.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesPriceChangeRate')}}</span><p>{{rowData.SalesPriceChangeRate}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DeliveryDayParam')}}</span><p>{{rowData.DeliveryDayParam}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerLocations')}}</h6>
                <b-table class="col-md-12" responsive :items="rowData.CustomerLocations" :fields="locationFields">
                  <template #cell(IsDefaultLocation)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsInvoiceAddress)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsDeliveryAddress)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsRouteNode)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                  <template #cell(IsVehicleLocation)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category1Id')}}</span><p>{{rowData.Category1 ? rowData.Category1.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category2Id')}}</span><p>{{rowData.Category2 ? rowData.Category2.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Category3Id')}}</span><p>{{rowData.Category3 ? rowData.Category3.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GroupId')}}</span><p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup1Id')}}</span><p>{{rowData.DiscountGroup1Id}}</p>
                 <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup3Id')}}</span><p>{{rowData.DiscountGroup3Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup5Id')}}</span><p>{{rowData.DiscountGroup5Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup6Id')}}</span><p>{{rowData.DiscountGroup6Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup7Id')}}</span><p>{{rowData.DiscountGroup7Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup8Id')}}</span><p>{{rowData.DiscountGroup8Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_SalesMethodId')}}</span><p>{{rowData.SalesMethod ? rowData.SalesMethod.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TradeFocusId')}}</span><p>{{rowData.TradeFocus ? rowData.TradeFocus.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DiscountGroup4Id')}}</span><p>{{rowData.DiscountGroup4Id}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_OwnerTypeId')}}</span><p>{{rowData.OwnerType ? rowData.OwnerType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassId')}}</span><p>{{rowData.Class ? rowData.Class.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalId')}}</span><p>{{rowData.ClassProposal ? rowData.ClassProposal.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ClassProposalReasonId')}}</span><p>{{rowData.ClassProposalReason ? rowData.ClassProposalReason.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_KindId')}}</span><p>{{rowData.Kind ? rowData.Kind.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_GeographicEnvironmentId')}}</span><p>{{rowData.GeographicEnvironment ? rowData.GeographicEnvironment.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field1')}}</span><p>{{rowData.Field1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field2')}}</span><p>{{rowData.Field2}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field3')}}</span><p>{{rowData.Field3}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field4')}}</span><p>{{rowData.Field4}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_Field5')}}</span><p>{{rowData.Field5}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_TextField6')}}</span><p>{{rowData.TextField6}}</p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CreditLimit')}}</span><p>{{rowData.CreditLimit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_RiskLimit')}}</span><p>{{rowData.RiskLimit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsDefaultLocation')}}</span><p>{{rowData.IsDefaultLocation}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentCredit')}}</span><p>{{rowData.CurrentCredit}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CurrentRisk')}}</span><p>{{rowData.CurrentRisk}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsAutoBlockingOff')}}</span><p>{{rowData.IsAutoBlockingOff}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_IsBlocked')}}</span> <p><i :class="rowData.IsBlocked === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BlockReasonId')}}</span><p>{{rowData.BlockReason ? rowData.BlockReason.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_ManualInvoiceClosure')}}</span><p>{{rowData.ManualInvoiceClosure}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_InvoiceCombineRuleId')}}</span><p>{{rowData.InvoiceCombineRuleId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_FinanceCode')}}</span><p>{{rowData.FinanceCode}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_CustomerRegion5Id')}}</span><p>{{rowData.CustomerRegion5 ? rowData.CustomerRegion5.Label : ''}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerCreditHistories')}}</h6>
                <b-table responsive :items="rowData.CustomerCreditHistories" :fields="creditHistoriesFields">
                  <template #cell(Currency)="data">
                    {{data.value.Label}}
                  </template>
                  <template #cell(CreditStartDate)="data">
                    {{dateConvertFromTimezone(data.value)}}
                  </template>
                  <template #cell(CreditEndDate)="data">
                    {{dateConvertFromTimezone(data.value)}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_DefaultPaymentTypeId')}}</span><p>{{rowData.DefaultPaymentType ? rowData.DefaultPaymentType.Label : ''}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.customer.Model_BankPaymentSystemId')}}</span><p>{{rowData.BankPaymentSystemId}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.customer.Model_PaymentPeriod')}}</span><p>{{rowData.PaymentPeriod}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_PaymentTypeId')}}</h6>
                <b-table responsive :items="rowData.CustomerPaymentTypes" :fields="paymentTypeFields">
                   <template #cell(PaymentType)="data">
                    {{data.value.Label}}
                  </template>
                </b-table>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.Model_FixedTermId')}}</h6>
                <b-table responsive :items="rowData.CustomFixedTerms" :fields="fixedTermFields">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.customer.CustomerItemDiscountCrts')}}</h6>
                <b-table responsive :items="discountItems" :fields="discountFields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.other')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.other')}}</h6>
                <span><i class="far fa-circle" /> ApproveStateId </span>
                <p>{{ rowData.ApproveStateId }}</p>
                <span><i class="far fa-circle" /> Barcode </span>
                <p>{{ rowData.Barcode }}</p>
                <span><i class="far fa-circle" /> BlockReasonDesc </span>
                <p>{{ rowData.BlockReasonDesc }}</p>
                <span><i class="far fa-circle" /> BlockReasonId </span>
                <p>{{ rowData.BlockReasonId }}</p>
                <span><i class="far fa-circle" /> BranchId </span>
                <p>{{ rowData.BranchId }}</p>
                <span><i class="far fa-circle" /> CalculatedClass </span>
                <p>{{ rowData.CalculatedClass }}</p>
                <span><i class="far fa-circle" /> CalculatedClassId </span>
                <p>{{ rowData.CalculatedClassId }}</p>
                <span><i class="far fa-circle" /> CardTypeId </span>
                <p>{{ rowData.CardTypeId }}</p>
                <span><i class="far fa-circle" /> Category1 </span>
                <p>{{ rowData.Category1 }}</p>
                <span><i class="far fa-circle" /> Category2 </span>
                <p>{{ rowData.Category2 }}</p>
                <span><i class="far fa-circle" /> Category3 </span>
                <p>{{ rowData.Category3 }}</p>
                <span><i class="far fa-circle" /> Category4 </span>
                <p>{{ rowData.Category4 }}</p>
                <span><i class="far fa-circle" /> Category5 </span>
                <p>{{ rowData.Category5 }}</p>
                <span><i class="far fa-circle" /> Category6 </span>
                <p>{{ rowData.Category6 }}</p>
                <span><i class="far fa-circle" /> Category7 </span>
                <p>{{ rowData.Category7 }}</p>
                <span><i class="far fa-circle" /> Category8 </span>
                <p>{{ rowData.Category8 }}</p>
                <span><i class="far fa-circle" /> Category9 </span>
                <p>{{ rowData.Category9 }}</p>
                <span><i class="far fa-circle" /> CheckField1 </span>
                <p>{{ rowData.CheckField1 }}</p>
                <span><i class="far fa-circle" /> CheckField2 </span>
                <p>{{ rowData.CheckField2 }}</p>
                <span><i class="far fa-circle" /> CompanyId </span>
                <p>{{ rowData.CompanyId }}</p>
                <span><i class="far fa-circle" /> Contracted </span>
                <p>{{ rowData.Contracted }}</p>
                <span><i class="far fa-circle" /> Contractedo </span>
                <p>{{ rowData.Contractedo ? rowData.Contractedo.Label : '' }}</p>
                <span><i class="far fa-circle" /> CreatedDateTime </span>
                <p>{{ rowData.CreatedDateTime }}</p>
                <span><i class="far fa-circle" /> CreatedUser </span>
                <p>{{ rowData.CreatedUser }}</p>
                <span><i class="far fa-circle" /> CustomFixedTerms </span>
                <p>{{ rowData.CustomFixedTerms }}</p>
                <span><i class="far fa-circle" /> CustomerAccountTeams </span>
                <p>{{ rowData.CustomerAccountTeams }}</p>
                <span><i class="far fa-circle" /> CustomerAnalysisHistories </span>
                <p>{{ rowData.CustomerAnalysisHistories }}</p>
                <span><i class="far fa-circle" /> CustomerAssets </span>
                <p>{{ rowData.CustomerAssets }}</p>
                <span><i class="far fa-circle" /> CustomerContacts </span>
                <p>{{ rowData.CustomerContacts }}</p>
                <span><i class="far fa-circle" /> CustomerCreditHistories </span>
                <p>{{ rowData.CustomerCreditHistories }}</p>
                <span><i class="far fa-circle" /> CustomerItemDiscounts </span>
                <p>{{ rowData.CustomerItemDiscounts }}</p>
                <span><i class="far fa-circle" /> CustomerLabels </span>
                <p>{{ rowData.CustomerLabels }}</p>
                <span><i class="far fa-circle" /> CustomerLocations </span>
                <p>{{ rowData.CustomerLocations }}</p>
                <span><i class="far fa-circle" /> CustomerNotInBonuses </span>
                <p>{{ rowData.CustomerNotInBonuses }}</p>
                <span><i class="far fa-circle" /> CustomerNsItems </span>
                <p>{{ rowData.CustomerNsItems }}</p>
                <span><i class="far fa-circle" /> CustomerPaymentTypes </span>
                <p>{{ rowData.CustomerPaymentTypes }}</p>
                <span><i class="far fa-circle" /> CustomerRegion1Id </span>
                <p>{{ rowData.CustomerRegion1Id }}</p>
                <span><i class="far fa-circle" /> CustomerRegion2Id </span>
                <p>{{ rowData.CustomerRegion2Id }}</p>
                <span><i class="far fa-circle" /> CustomerRegion3Id </span>
                <p>{{ rowData.CustomerRegion3Id }}</p>
                <span><i class="far fa-circle" /> CustomerRegion4Id </span>
                <p>{{ rowData.CustomerRegion4Id }}</p>
                <span><i class="far fa-circle" /> CustomerSItems </span>
                <p>{{ rowData.CustomerSItems }}</p>
                <span><i class="far fa-circle" /> CustomerStatusHistories </span>
                <p>{{ rowData.CustomerStatusHistories }}</p>
                <span><i class="far fa-circle" /> DateField1 </span>
                <p>{{ rowData.DateField1 }}</p>
                <span><i class="far fa-circle" /> DateField2 </span>
                <p>{{ rowData.DateField2 }}</p>
                <span><i class="far fa-circle" /> DefaultLocation </span>
                <p>{{ rowData.DefaultLocation }}</p>
                <span><i class="far fa-circle" /> DefaultLocationId </span>
                <p>{{ rowData.DefaultLocationId }}</p>
                <span><i class="far fa-circle" /> DefaultPaymentTypeId </span>
                <p>{{ rowData.DefaultPaymentTypeId }}</p>
                <span><i class="far fa-circle" /> Deleted </span>
                <p>{{ rowData.Deleted }}</p>
                <span><i class="far fa-circle" /> DiscountGroup9Id </span>
                <p>{{ rowData.DiscountGroup9Id }}</p>
                <span><i class="far fa-circle" /> DiscountGroup10Id </span>
                <p>{{ rowData.DiscountGroup10Id }}</p>
                <span><i class="far fa-circle" /> EncryptedKey </span>
                <p>{{ rowData.EncryptedKey }}</p>
                <span><i class="far fa-circle" /> Field1Value </span>
                <p>{{ rowData.Field1Value }}</p>
                <span><i class="far fa-circle" /> Field2Value </span>
                <p>{{ rowData.Field2Value }}</p>
                <span><i class="far fa-circle" /> Field3Value </span>
                <p>{{ rowData.Field3Value }}</p>
                <span><i class="far fa-circle" /> Field4Value </span>
                <p>{{ rowData.Field4Value }}</p>
                <span><i class="far fa-circle" /> Field5Value </span>
                <p>{{ rowData.Field5Value }}</p>
                <span><i class="far fa-circle" /> GeographicEnvironmentId </span>
                <p>{{ rowData.GeographicEnvironmentId }}</p>
                <span><i class="far fa-circle" /> GroupId </span>
                <p>{{ rowData.GroupId }}</p>
                <span><i class="far fa-circle" /> HoldsAsset </span>
                <p>{{ rowData.HoldsAsset }}</p>
                <span><i class="far fa-circle" /> HoldsAsseto </span>
                <p>{{ rowData.HoldsAsseto }}</p>
                <span><i class="far fa-circle" /> IsDirectDebit </span>
                <p>{{ rowData.IsDirectDebit }}</p>
                <span><i class="far fa-circle" /> IsDutyFree </span>
                <p>{{ rowData.IsDutyFree }}</p>
                <span><i class="far fa-circle" /> IsFromPotential </span>
                <p>{{ rowData.IsFromPotential }}</p>
                <span><i class="far fa-circle" /> IsLicenseRequired </span>
                <p>{{ rowData.IsLicenseRequired }}</p>
                <span><i class="far fa-circle" /> IsOrderChangeUnitary </span>
                <p>{{ rowData.IsOrderChangeUnitary }}</p>
                <span><i class="far fa-circle" /> IsWarehouseSale </span>
                <p>{{ rowData.IsWarehouseSale }}</p>
                <span><i class="far fa-circle" /> Model_KindId </span>
                <p>{{ rowData.Model_KindId }}</p>
                <span><i class="far fa-circle" /> LicenseEndDate </span>
                <p>{{ rowData.LicenseEndDate }}</p>
                <span><i class="far fa-circle" /> LicenseNumber </span>
                <p>{{ rowData.LicenseNumber }}</p>
                <span><i class="far fa-circle" /> LicenseStartDate </span>
                <p>{{ rowData.LicenseStartDate }}</p>
                <span><i class="far fa-circle" /> ManualInvoiceClosure </span>
                <p>{{ rowData.ManualInvoiceClosure }}</p>
                <span><i class="far fa-circle" /> ManualSItem </span>
                <p>{{ rowData.ManualSItem }}</p>
                <span><i class="far fa-circle" /> MarketingRegion1 </span>
                <p>{{ rowData.MarketingRegion1 }}</p>
                <span><i class="far fa-circle" /> MarketingRegion2 </span>
                <p>{{ rowData.MarketingRegion2 }}</p>
                <span><i class="far fa-circle" /> MarketingRegion3 </span>
                <p>{{ rowData.MarketingRegion3 }}</p>
                <span><i class="far fa-circle" /> MarketingRegion4 </span>
                <p>{{ rowData.MarketingRegion4 }}</p>
                <span><i class="far fa-circle" /> MarketingRegion5 </span>
                <p>{{ rowData.MarketingRegion5 }}</p>
                <span><i class="far fa-circle" /> ModifiedDateTime </span>
                <p>{{ rowData.ModifiedDateTime }}</p>
                <span><i class="far fa-circle" /> ModifiedUser </span>
                <p>{{ rowData.ModifiedUser }}</p>
                <span><i class="far fa-circle" /> NumberField1 </span>
                <p>{{ rowData.NumberField1 }}</p>
                <span><i class="far fa-circle" /> NumberField2 </span>
                <p>{{ rowData.NumberField2 }}</p>
                <span><i class="far fa-circle" /> NumberField3 </span>
                <p>{{ rowData.NumberField3 }}</p>
                <span><i class="far fa-circle" /> NumberField4 </span>
                <p>{{ rowData.NumberField4 }}</p>
                <span><i class="far fa-circle" /> NumberField5 </span>
                <p>{{ rowData.NumberField5 }}</p>
                <span><i class="far fa-circle" /> OverdueAmount </span>
                <p>{{ rowData.OverdueAmount }}</p>
                <span><i class="far fa-circle" /> OwnerTypeId </span>
                <p>{{ rowData.OwnerTypeId }}</p>
                <span><i class="far fa-circle" /> PotentialCustomerRepresentativeId </span>
                <p>{{ rowData.PotentialCustomerRepresentativeId }}</p>
                <span><i class="far fa-circle" /> PotentialCustomerRouteType </span>
                <p>{{ rowData.PotentialCustomerRouteType }}</p>
                <span><i class="far fa-circle" /> PotentialDate </span>
                <p>{{ rowData.PotentialDate }}</p>
                <span><i class="far fa-circle" /> PriceListCategoryId </span>
                <p>{{ rowData.PriceListCategoryId }}</p>
                <span><i class="far fa-circle" /> RecordId </span>
                <p>{{ rowData.RecordId }}</p>
                <span><i class="far fa-circle" /> RecordState </span>
                <p>{{ rowData.RecordState }}</p>
                <span><i class="far fa-circle" /> RecordType </span>
                <p>{{ rowData.RecordType }}</p>
                <span><i class="far fa-circle" /> RefCustomer </span>
                <p>{{ rowData.RefCustomer }}</p>
                <span><i class="far fa-circle" /> RefCustomerId </span>
                <p>{{ rowData.RefCustomerId }}</p>
                <span><i class="far fa-circle" /> Region </span>
                <p>{{ rowData.Region }}</p>
                <span><i class="far fa-circle" /> RegionId </span>
                <p>{{ rowData.RegionId }}</p>
                <span><i class="far fa-circle" /> RelationId </span>
                <p>{{ rowData.RelationId }}</p>
                <span><i class="far fa-circle" /> Remainder </span>
                <p>{{ rowData.Remainder }}</p>
                <span><i class="far fa-circle" /> RepresentativeId </span>
                <p>{{ rowData.RepresentativeId }}</p>
                <span><i class="far fa-circle" /> SalesDocumentTypeId </span>
                <p>{{ rowData.SalesDocumentTypeId }}</p>
                <span><i class="far fa-circle" /> SalesMethodId </span>
                <p>{{ rowData.SalesMethodId }}</p>
                <span><i class="far fa-circle" /> SalesPriceChangeRate </span>
                <p>{{ rowData.SalesPriceChangeRate }}</p>
                <span><i class="far fa-circle" /> rowData.SalesTypeId </span>
                <p>{{ rowData.SalesTypeId }}</p>
                <span><i class="far fa-circle" /> SalesVisitFrequency </span>
                <p>{{ rowData.SalesVisitFrequency }}</p>
                <span><i class="far fa-circle" /> SelfServiceEnabled </span>
                <p>{{ rowData.SelfServiceEnabled }}</p>
                <span><i class="far fa-circle" /> SignNameId </span>
                <p>{{ rowData.SignNameId }}</p>
                <span><i class="far fa-circle" /> StatusId </span>
                <p>{{ rowData.StatusId }}</p>
                <span><i class="far fa-circle" /> StatusReasonId </span>
                <p>{{ rowData.StatusReasonId }}</p>
                <span><i class="far fa-circle" /> SurveyResultId </span>
                <p>{{ rowData.SurveyResultId }}</p>
                <span><i class="far fa-circle" /> System </span>
                <p>{{ rowData.System }}</p>
                <span><i class="far fa-circle" /> TextField1 </span>
                <p>{{ rowData.TextField1 }}</p>
                <span><i class="far fa-circle" /> TextField2 </span>
                <p>{{ rowData.TextField2 }}</p>
                <span><i class="far fa-circle" /> TextField3 </span>
                <p>{{ rowData.TextField3 }}</p>
                <span><i class="far fa-circle" /> TextField4 </span>
                <p>{{ rowData.TextField4 }}</p>
                <span><i class="far fa-circle" /> TextField5 </span>
                <p>{{ rowData.TextField5 }}</p>
                <span><i class="far fa-circle" /> TradeFocusId </span>
                <p>{{ rowData.TradeFocusId }}</p>
                <span><i class="far fa-circle" /> TradeLicenseNumber </span>
                <p>{{ rowData.TradeLicenseNumber }}</p>
                <span><i class="far fa-circle" /> TypeId </span>
                <p>{{ rowData.TypeId }}</p>
                <span><i class="far fa-circle" /> UpperCustomer </span>
                <p>{{ rowData.UpperCustomer }}</p>
                <span><i class="far fa-circle" /> UpperCustomerId </span>
                <p>{{ rowData.UpperCustomerId }}</p>
                <span><i class="far fa-circle" /> XPosition </span>
                <p>{{ rowData.XPosition }}</p>
                <span><i class="far fa-circle" /> YPosition </span>
                <p>{{ rowData.YPosition }}</p>
                <span><i class="far fa-circle" /> UsingReferenceNumber </span>
                <p>{{ rowData.UsingReferenceNumber }}</p>
                <span><i class="far fa-circle" /> ValidationEmployeeId </span>
                <p>{{ rowData.ValidationEmployeeId }}</p>
                <span><i class="far fa-circle" /> ZCreditAccountRemainder </span>
                <p>{{ rowData.ZCreditAccountRemainder }}</p>
                <span><i class="far fa-circle" /> ZDebitAccountRemainder </span>
                <p>{{ rowData.ZDebitAccountRemainder }}</p>

              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      locationFields: [
        {key: 'Code', label: this.$t('insert.customer.Model_Code'), sortable: true},
        {key: 'Description1', label: this.$t('insert.customer.Model_Description1Lokasyon'), sortable: true},
        {key: 'AddressDetail', label: this.$t('insert.customer.Model_AddressDetail'), sortable: true},
        {key: 'City', label: this.$t('insert.customer.Model_CityId'), sortable: true},
        {key: 'Distirict', label: this.$t('insert.customer.Model_DistrictId'), sortable: true},
        {key: 'Avenue', label: this.$t('insert.customer.Model_AvenueId'), sortable: true},
        {key: 'Street', label: this.$t('insert.customer.Model_StreetId'), sortable: true},
        {key: 'PostCode', label: this.$t('insert.customer.Model_PostCode'), sortable: true},
        {key: 'XPosition', label: this.$t('insert.customer.Model_XPosition'), sortable: true},
        {key: 'YPosition', label: this.$t('insert.customer.Model_YPosition'), sortable: true},
        {key: 'AddressDescription', label: this.$t('insert.customer.Model_AddressDescription'), sortable: true},
        {key: 'ContactName', label: this.$t('insert.customer.Model_GsmNumber'), sortable: true},
        {key: 'PhoneNumber1', label: this.$t('insert.customer.Model_PhoneNumber1'), sortable: true},
        {key: 'PhoneNumber2', label: this.$t('insert.customer.Model_PhoneNumber2'), sortable: true},
        {key: 'IsDefaultLocation', label: this.$t('insert.customer.Model_IsDefaultLocation'), sortable: true},
        {key: 'IsInvoiceAddress', label: this.$t('insert.customer.Model_IsInvoiceAddress'), sortable: true},
        {key: 'IsDeliveryAddress', label: this.$t('insert.customer.Model_IsDeliveryAddress'), sortable: true},
        {key: 'IsRouteNode', label: this.$t('insert.customer.isRouteNode'), sortable: true},
        {key: 'IsVehicleLocation', label: this.$t('insert.customer.Model_IsDeliveryAddress'), sortable: true},
        {key: 'Genexp1', label: this.$t('insert.customer.Model_Genexp1'), sortable: true},
        {key: 'Alias', label: this.$t('insert.customer.Model_Alias'), sortable: true}
      ],
      creditHistoriesFields: [
        {key: 'CreditDescription', label: this.$t('insert.customer.Model_CreditDescriptionId'), sortable: true},
        {key: 'CreditAmount', label: this.$t('insert.customer.Model_CreditAmount'), sortable: true},
        {key: 'Currency', label: this.$t('insert.customer.Model_CurrencyId'), sortable: true},
        {key: 'CreditLimit', label: this.$t('insert.customer.CreditLimit'), sortable: true},
        {key: 'RiskLimit', label: this.$t('insert.customer.Model_RiskLimit'), sortable: true},
        {key: 'AllowOverLimit', label: this.$t('insert.customer.Model_AllowOverLimit'), sortable: true},
        {key: 'CreditStartDate', label: this.$t('insert.customer.Model_CreditEndDate'), sortable: true},
        {key: 'CreditEndDate', label: this.$t('insert.customer.Model_CreditEndDate'), sortable: true}
      ],
      paymentTypeFields: [
        {key: 'PaymentType', label: this.$t('insert.customer.Model_PaymentTypeId'), sortable: true}
      ],
      fixedTermFields: [
        {key: 'FixedTermId', label: this.$t('insert.customer.Model_FixedTermId'), sortable: true}
      ],
      discountFields: [
        {key: 'ColumnName', label: 'ColumnName', sortable: true},
        {key: 'ColumnValue', label: 'ColumnValue', sortable: true},
        {key: 'StartDate', label: 'StartDate', sortable: true},
        {key: 'EndDate', label: 'EndDate', sortable: true},
        {key: 'DiscountPercent1', label: 'DiscountPercent1', sortable: true},
        {key: 'DiscountPercent2', label: 'DiscountPercent2', sortable: true}
      ]
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/Customer', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
