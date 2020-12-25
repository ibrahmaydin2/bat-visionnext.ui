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
            <b-form-group :label="insertTitle.Code + ($v.form.Code.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.CardTypeId != null ? insertVisible.CardTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.CardTypeId + ($v.form.CardTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardTypeId.$error }">
              <v-select />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusReasonId != null ? insertVisible.StatusReasonId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusReasonId + ($v.form.StatusReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusReasonId.$error }">
              <v-select />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + ($v.form.StatusId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
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
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre id="asc__codeHTML" v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
               <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Statement + ($v.form.Statement.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                  <b-form-checkbox v-model="form.Statement" name="check-button">
                    {{(form.Statement) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.StatementDay != null ? insertVisible.StatementDay : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.StatementDay + ($v.form.StatementDay.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatementDay.$error }">
                    <v-select />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.SapCustomerId != null ? insertVisible.SapCustomerId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SapCustomerId + ($v.form.SapCustomerId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SapCustomerId.$error }">
                  <b-form-input type="text" v-model="form.SapCustomerId" :readonly="insertReadonly.SapCustomerId" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.AllowOverLimit != null ? insertVisible.AllowOverLimit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.AllowOverLimit + ($v.form.AllowOverLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.AllowOverLimit.$error }">
                  <b-form-checkbox v-model="form.AllowOverLimit" name="check-button">
                    {{(form.AllowOverLimit) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.DeliveryDayParam != null ? insertVisible.DeliveryDayParam : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DeliveryDayParam + ($v.form.DeliveryDayParam.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DeliveryDayParam.$error }">
                  <b-form-input type="text" v-model="form.DeliveryDayParam" :readonly="insertReadonly.DeliveryDayParam" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsDirectDebit != null ? insertVisible.IsDirectDebit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsDirectDebit + ($v.form.IsDirectDebit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsDirectDebit.$error }">
                  <b-form-checkbox v-model="form.IsDirectDebit" name="check-button">
                    {{(form.IsDirectDebit) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.TextField1 != null ? insertVisible.TextField1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TextField1 + ($v.form.TextField1.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TextField1.$error }">
                  <b-form-input type="text" v-model="form.TextField1" :readonly="insertReadonly.TextField1" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.TextField2 != null ? insertVisible.TextField2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TextField2 + ($v.form.TextField2.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TextField2.$error }">
                  <b-form-input type="text" v-model="form.TextField2" :readonly="insertReadonly.TextField2" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.Barcode != null ? insertVisible.Barcode : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Barcode + ($v.form.Barcode.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Barcode.$error }">
                  <b-form-input type="text" v-model="form.Barcode" :readonly="insertReadonly.Barcode" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.HoldsAsset != null ? insertVisible.HoldsAsset : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.HoldsAsset + ($v.form.HoldsAsset.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.HoldsAsset.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_HOLD_ASSET"
                      @input="selectedType('HoldsAsset', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.Contracted != null ? insertVisible.Contracted : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Contracted + ($v.form.Contracted.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Contracted.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CONTRACTED"
                      @input="selectedType('Contracted', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup10Id != null ? insertVisible.DiscountGroup10Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup10Id + ($v.form.DiscountGroup10Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup10Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_10"
                      @input="selectedType('DiscountGroup10Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup2Id != null ? insertVisible.DiscountGroup2Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup2Id + ($v.form.DiscountGroup2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup2Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_2"
                      @input="selectedType('DiscountGroup2Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup9Id != null ? insertVisible.DiscountGroup9Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup9Id + ($v.form.DiscountGroup9Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup9Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_9"
                      @input="selectedType('DiscountGroup9Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.SignNameId != null ? insertVisible.SignNameId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.SignNameId + ($v.form.SignNameId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SignNameId.$error }">
                    <v-select
                      :options="lookup.SIGN_NAME"
                      @input="selectedType('SignNameId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.IsOpportunitySpot != null ? insertVisible.IsOpportunitySpot : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsOpportunitySpot + ($v.form.IsOpportunitySpot.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOpportunitySpot.$error }">
                  <b-form-checkbox v-model="form.IsOpportunitySpot" name="check-button">
                    {{(form.IsOpportunitySpot) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CustomerRegion5Id != null ? insertVisible.CustomerRegion5Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.CustomerRegion5Id + ($v.form.CustomerRegion5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerRegion5Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_REGION_5"
                      @input="selectedType('CustomerRegion5Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.MarketingRegion5Id != null ? insertVisible.MarketingRegion5Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.MarketingRegion5Id + ($v.form.MarketingRegion5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.MarketingRegion5Id.$error }">
                    <v-select
                      :options="lookup.MARKETING_REGION_5"
                      @input="selectedType('MarketingRegion5Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.GeographicEnvironmentId != null ? insertVisible.GeographicEnvironmentId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.GeographicEnvironmentId + ($v.form.GeographicEnvironmentId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.GeographicEnvironmentId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_GEOGRAPHIC_ENVIRONMENT"
                      @input="selectedType('GeographicEnvironmentId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.TradeFocusId != null ? insertVisible.TradeFocusId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.TradeFocusId + ($v.form.TradeFocusId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TradeFocusId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_TRADE_FOCUS"
                      @input="selectedType('TradeFocusId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.InvoiceCombineRuleId + ($v.form.InvoiceCombineRuleId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
                    <v-select
                      :options="lookup.INVOICE_COMBINE_RULE"
                      @input="selectedType('InvoiceCombineRuleId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.BackMarginGroupId != null ? insertVisible.BackMarginGroupId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.BackMarginGroupId + ($v.form.BackMarginGroupId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.BackMarginGroupId.$error }">
                    <v-select
                      :options="lookup.BACK_MARGIN_GROUP"
                      @input="selectedType('BackMarginGroupId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup3Id != null ? insertVisible.DiscountGroup3Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup3Id + ($v.form.DiscountGroup3Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup3Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_3"
                      @input="selectedType('DiscountGroup3Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup4Id != null ? insertVisible.DiscountGroup4Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup4Id + ($v.form.DiscountGroup4Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup4Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_4"
                      @input="selectedType('DiscountGroup4Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup5Id != null ? insertVisible.DiscountGroup5Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup5Id + ($v.form.DiscountGroup5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup5Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_5"
                      @input="selectedType('DiscountGroup5Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup6Id != null ? insertVisible.DiscountGroup6Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup6Id + ($v.form.DiscountGroup6Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup6Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_6"
                      @input="selectedType('DiscountGroup6Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup7Id != null ? insertVisible.DiscountGroup7Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup7Id + ($v.form.DiscountGroup7Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup7Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_7"
                      @input="selectedType('DiscountGroup7Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup8Id != null ? insertVisible.DiscountGroup8Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup8Id + ($v.form.DiscountGroup8Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup8Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_8"
                      @input="selectedType('DiscountGroup8Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DiscountGroup1Id != null ? insertVisible.DiscountGroup1Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DiscountGroup1Id + ($v.form.DiscountGroup1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup1Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_DISCOUNT_GROUP_1"
                      @input="selectedType('DiscountGroup1Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.KindId != null ? insertVisible.KindId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.KindId + ($v.form.KindId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.KindId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_KIND"
                      @input="selectedType('KindId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.Activity1Id != null ? insertVisible.Activity1Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Activity1Id + ($v.form.Activity1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Activity1Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_ACTIVITY_1"
                      @input="selectedType('Activity1Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.Activity2Id != null ? insertVisible.Activity2Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Activity2Id + ($v.form.Activity2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Activity2Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_ACTIVITY_2"
                      @input="selectedType('Activity2Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.OutSourceOrderId != null ? insertVisible.OutSourceOrderId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.OutSourceOrderId + ($v.form.OutSourceOrderId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.OutSourceOrderId.$error }">
                    <v-select
                      :options="lookup.OUT_SOURCE_ORDER"
                      @input="selectedType('OutSourceOrderId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.DefaultPaymentTypeId + ($v.form.DefaultPaymentTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                    <v-select />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.PaymentPeriod != null ? insertVisible.PaymentPeriod : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.PaymentPeriod + ($v.form.PaymentPeriod.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.PaymentPeriod.$error }">
                    <v-select />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.PriceListCategoryId + ($v.form.PriceListCategoryId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                    <v-select
                      :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                      @input="selectedType('PriceListCategoryId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.CreditLimit != null ? insertVisible.CreditLimit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreditLimit + ($v.form.CreditLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditLimit.$error }">
                  <b-form-input type="text" v-model="form.CreditLimit" :readonly="insertReadonly.CreditLimit" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.RiskLimit != null ? insertVisible.RiskLimit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RiskLimit + ($v.form.RiskLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.RiskLimit.$error }">
                  <b-form-input type="text" v-model="form.RiskLimit" :readonly="insertReadonly.RiskLimit" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.ReservedLimit != null ? insertVisible.ReservedLimit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ReservedLimit + ($v.form.ReservedLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ReservedLimit.$error }">
                  <b-form-input type="text" v-model="form.ReservedLimit" :readonly="insertReadonly.ReservedLimit" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CurrentCredit != null ? insertVisible.CurrentCredit : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CurrentCredit + ($v.form.CurrentCredit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentCredit.$error }">
                  <b-form-input type="text" v-model="form.CurrentCredit" :readonly="insertReadonly.CurrentCredit" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CurrentRisk != null ? insertVisible.CurrentRisk : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CurrentRisk + ($v.form.CurrentRisk.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentRisk.$error }">
                  <b-form-input type="text" v-model="form.CurrentRisk" :readonly="insertReadonly.CurrentRisk" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.DebitAccountRemainder != null ? insertVisible.DebitAccountRemainder : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DebitAccountRemainder + ($v.form.DebitAccountRemainder.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DebitAccountRemainder.$error }">
                  <b-form-input type="text" v-model="form.DebitAccountRemainder" :readonly="insertReadonly.DebitAccountRemainder" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CreditAccountRemainder != null ? insertVisible.CreditAccountRemainder : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreditAccountRemainder + ($v.form.CreditAccountRemainder.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditAccountRemainder.$error }">
                  <b-form-input type="text" v-model="form.CreditAccountRemainder" :readonly="insertReadonly.CreditAccountRemainder" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.FinanceCode + ($v.form.FinanceCode.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                  <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.DiscountPercent1 != null ? insertVisible.DiscountPercent1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent1 + ($v.form.DiscountPercent1.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent1.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent1" :readonly="insertReadonly.DiscountPercent1" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.DiscountPercent2 != null ? insertVisible.DiscountPercent2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent2 + ($v.form.DiscountPercent2.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent2.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent2" :readonly="insertReadonly.DiscountPercent2" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.TciBreak1Id != null ? insertVisible.TciBreak1Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.TciBreak1Id + ($v.form.TciBreak1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak1Id.$error }">
                    <v-select
                      :options="lookup.TCI_BREAKDOWN"
                      @input="selectedType('TciBreak1Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.TciBreak2Id != null ? insertVisible.TciBreak2Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.TciBreak2Id + ($v.form.TciBreak2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak2Id.$error }">
                    <v-select
                      :options="lookup.TCI_BREAKDOWN"
                      @input="selectedType('TciBreak2Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ManualInvoiceClosure != null ? insertVisible.ManualInvoiceClosure : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ManualInvoiceClosure + ($v.form.ManualInvoiceClosure.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualInvoiceClosure.$error }">
                  <b-form-checkbox v-model="form.ManualInvoiceClosure" name="check-button">
                    {{(form.ManualInvoiceClosure) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsBlackListed != null ? insertVisible.IsBlackListed : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsBlackListed + ($v.form.IsBlackListed.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlackListed.$error }">
                  <b-form-checkbox v-model="form.IsBlackListed" name="check-button">
                    {{(form.IsBlackListed) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Code + ($v.form.Code.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
                  <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CardTypeId != null ? insertVisible.CardTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.CardTypeId + ($v.form.CardTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CardTypeId.$error }">
                    <v-select />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.CommercialTitle != null ? insertVisible.CommercialTitle : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CommercialTitle + ($v.form.CommercialTitle.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CommercialTitle.$error }">
                  <b-form-input type="text" v-model="form.CommercialTitle" :readonly="insertReadonly.CommercialTitle" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.LicenseNumber != null ? insertVisible.LicenseNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.LicenseNumber + ($v.form.LicenseNumber.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                  <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.StatusId + ($v.form.StatusId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                  <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                    {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Description1 + ($v.form.Description1.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                  <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.LicenseValidDate != null ? insertVisible.LicenseValidDate : developmentMode" :start-weekday="1" cols="12" md="2">
                <b-form-group :label="insertTitle.LicenseValidDate + ($v.form.LicenseValidDate.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseValidDate.$error }">
                  <b-form-datepicker v-model="form.LicenseValidDate" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.StatusReasonId != null ? insertVisible.StatusReasonId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.StatusReasonId + ($v.form.StatusReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusReasonId.$error }">
                    <v-select />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.TypeId + ($v.form.TypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_TYPE"
                      @input="selectedType('TypeId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.SalesVisitFrequency != null ? insertVisible.SalesVisitFrequency : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SalesVisitFrequency + ($v.form.SalesVisitFrequency.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesVisitFrequency.$error }">
                  <b-form-input type="text" v-model="form.SalesVisitFrequency" :readonly="insertReadonly.SalesVisitFrequency" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.BlockReasonId != null ? insertVisible.BlockReasonId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.BlockReasonId + ($v.form.BlockReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.BlockReasonId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_BLOCK_REASON"
                      @input="selectedType('BlockReasonId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.TaxCustomerTypeId != null ? insertVisible.TaxCustomerTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.TaxCustomerTypeId + ($v.form.TaxCustomerTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxCustomerTypeId.$error }">
                    <v-select
                      :options="lookup.TAX_CUSTOMER_TYPE"
                      @input="selectedType('TaxCustomerTypeId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ServiceVisitFrequency != null ? insertVisible.ServiceVisitFrequency : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ServiceVisitFrequency + ($v.form.ServiceVisitFrequency.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ServiceVisitFrequency.$error }">
                  <b-form-input type="text" v-model="form.ServiceVisitFrequency" :readonly="insertReadonly.ServiceVisitFrequency" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsBlocked != null ? insertVisible.IsBlocked : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsBlocked + ($v.form.IsBlocked.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlocked.$error }">
                  <b-form-checkbox v-model="form.IsBlocked" name="check-button" switch>
                    {{(form.IsBlocked) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.TaxOffice != null ? insertVisible.TaxOffice : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TaxOffice + ($v.form.TaxOffice.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxOffice.$error }">
                  <b-form-input type="text" v-model="form.TaxOffice" :readonly="insertReadonly.TaxOffice" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.RouteCode != null ? insertVisible.RouteCode : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RouteCode + ($v.form.RouteCode.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteCode.$error }">
                  <b-form-input type="text" v-model="form.RouteCode" :readonly="insertReadonly.RouteCode" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsWarehouseSale + ($v.form.IsWarehouseSale.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                  <b-form-checkbox v-model="form.IsWarehouseSale" name="check-button" switch>
                    {{(form.IsWarehouseSale) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TaxNumber + ($v.form.TaxNumber.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
                  <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.UseEInvoice != null ? insertVisible.UseEInvoice : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.UseEInvoice + ($v.form.UseEInvoice.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEInvoice.$error }">
                  <b-form-checkbox v-model="form.UseEInvoice" name="check-button" switch>
                    {{(form.UseEInvoice) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CustomerInvoiceTypeId != null ? insertVisible.CustomerInvoiceTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.CustomerInvoiceTypeId + ($v.form.CustomerInvoiceTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerInvoiceTypeId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_INVOICE_TYPE"
                      @input="selectedType('CustomerInvoiceTypeId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ManualSItem != null ? insertVisible.ManualSItem : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ManualSItem + ($v.form.ManualSItem.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualSItem.$error }">
                  <b-form-checkbox v-model="form.ManualSItem" name="check-button" switch>
                    {{(form.ManualSItem) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsRouteRegion != null ? insertVisible.IsRouteRegion : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsRouteRegion + ($v.form.IsRouteRegion.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsRouteRegion.$error }">
                  <b-form-checkbox v-model="form.IsRouteRegion" name="check-button" switch>
                    {{(form.IsRouteRegion) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsOrderChangeUnitary + ($v.form.IsOrderChangeUnitary.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                  <b-form-checkbox v-model="form.IsOrderChangeUnitary" name="check-button" switch>
                    {{(form.IsOrderChangeUnitary) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.CustomerEmail != null ? insertVisible.CustomerEmail : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CustomerEmail + ($v.form.CustomerEmail.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerEmail.$error }">
                  <b-form-input type="text" v-model="form.CustomerEmail" :readonly="insertReadonly.CustomerEmail" />
                </b-form-group>
              </b-col>
              
                <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Category3Id + ($v.form.Category3Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CATEGORY_3"
                      @input="selectedType('Category3Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Category2Id + ($v.form.Category2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CATEGORY_2"
                      @input="selectedType('Category2Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.Category1Id != null ? insertVisible.Category1Id : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.Category1Id + ($v.form.Category1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CATEGORY_1"
                      @input="selectedType('Category1Id', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.GroupId + ($v.form.GroupId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_GROUP"
                      @input="selectedType('GroupId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ClassId != null ? insertVisible.ClassId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.ClassId + ($v.form.ClassId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CLASS"
                      @input="selectedType('ClassId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.SalesDocumentTypeId + ($v.form.SalesDocumentTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                    <v-select
                      :options="lookup.SALES_DOCUMENT_TYPE"
                      @input="selectedType('SalesDocumentTypeId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.OwnerTypeId != null ? insertVisible.OwnerTypeId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.OwnerTypeId + ($v.form.OwnerTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.OwnerTypeId.$error }">
                    <v-select
                      :options="lookup.OWNER_TYPE"
                      @input="selectedType('OwnerTypeId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ClassProposalId != null ? insertVisible.ClassProposalId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.ClassProposalId + ($v.form.ClassProposalId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CLASS_PROPOSAL"
                      @input="selectedType('ClassProposalId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.ClassProposalReasonId != null ? insertVisible.ClassProposalReasonId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.ClassProposalReasonId + ($v.form.ClassProposalReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalReasonId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_CLASS_PROPOSAL_REASON"
                      @input="selectedType('ClassProposalReasonId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
              
                <b-col v-if="insertVisible.SalesMethodId != null ? insertVisible.SalesMethodId : developmentMode" cols="12" md="2">
                  <b-form-group :label="insertTitle.SalesMethodId + ($v.form.SalesMethodId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesMethodId.$error }">
                    <v-select
                      :options="lookup.CUSTOMER_SALES_METHOD"
                      @input="selectedType('SalesMethodId', $event)"
                      label="Label"
                    />
                  </b-form-group>
                </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.Customer')">
          <b-row>
            <b-col v-if="insertVisible.CommercialTitle != null ? insertVisible.CommercialTitle : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CommercialTitle + ($v.form.CommercialTitle.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CommercialTitle.$error }">
                <b-form-input type="text" v-model="form.CommercialTitle" :readonly="insertReadonly.CommercialTitle" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Description1 + ($v.form.Description1.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LicenseNumber != null ? insertVisible.LicenseNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.LicenseNumber + ($v.form.LicenseNumber.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseNumber.$error }">
                <b-form-input type="text" v-model="form.LicenseNumber" :readonly="insertReadonly.LicenseNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxCustomerTypeId != null ? insertVisible.TaxCustomerTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxCustomerTypeId + ($v.form.TaxCustomerTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxCustomerTypeId.$error }">
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
              <b-form-group :label="insertTitle.TaxOffice + ($v.form.TaxOffice.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxOffice.$error }">
                <b-form-input type="text" v-model="form.TaxOffice" :readonly="insertReadonly.TaxOffice" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TaxNumber + ($v.form.TaxNumber.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
                <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerEmail != null ? insertVisible.CustomerEmail : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerEmail + ($v.form.CustomerEmail.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerEmail.$error }">
                <b-form-input type="text" v-model="form.CustomerEmail" :readonly="insertReadonly.CustomerEmail" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesVisitFrequency != null ? insertVisible.SalesVisitFrequency : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.SalesVisitFrequency + ($v.form.SalesVisitFrequency.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesVisitFrequency.$error }">
                <b-form-input type="text" v-model="form.SalesVisitFrequency" :readonly="insertReadonly.SalesVisitFrequency" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.BlockReasonId != null ? insertVisible.BlockReasonId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BlockReasonId + ($v.form.BlockReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.BlockReasonId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_BLOCK_REASON"
                  @input="selectedType('BlockReasonId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TypeId + ($v.form.TypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_TYPE"
                  @input="selectedType('TypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ServiceVisitFrequency != null ? insertVisible.ServiceVisitFrequency : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ServiceVisitFrequency + ($v.form.ServiceVisitFrequency.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ServiceVisitFrequency.$error }">
                <b-form-input type="text" v-model="form.ServiceVisitFrequency" :readonly="insertReadonly.ServiceVisitFrequency" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerInvoiceTypeId != null ? insertVisible.CustomerInvoiceTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CustomerInvoiceTypeId + ($v.form.CustomerInvoiceTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerInvoiceTypeId.$error }">
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
              <b-form-group :label="insertTitle.CustomerRegion5Id + ($v.form.CustomerRegion5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerRegion5Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_REGION_5"
                  @input="selectedType('CustomerRegion5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MarketingRegion5Id != null ? insertVisible.MarketingRegion5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.MarketingRegion5Id + ($v.form.MarketingRegion5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.MarketingRegion5Id.$error }">
                <v-select
                  :options="lookup.MARKETING_REGION_5"
                  @input="selectedType('MarketingRegion5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RouteCode != null ? insertVisible.RouteCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RouteCode + ($v.form.RouteCode.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteCode.$error }">
                <b-form-input type="text" v-model="form.RouteCode" :readonly="insertReadonly.RouteCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LicenseValidDate != null ? insertVisible.LicenseValidDate : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.LicenseValidDate + ($v.form.LicenseValidDate.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.LicenseValidDate.$error }">
                <b-form-datepicker v-model="form.LicenseValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.IsBlocked != null ? insertVisible.IsBlocked : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsBlocked + ($v.form.IsBlocked.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlocked.$error }">
                <b-form-checkbox v-model="form.IsBlocked" name="check-button" switch>
                  {{(form.IsBlocked) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualSItem != null ? insertVisible.ManualSItem : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualSItem + ($v.form.ManualSItem.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualSItem.$error }">
                <b-form-checkbox v-model="form.ManualSItem" name="check-button" switch>
                  {{(form.ManualSItem) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsRouteRegion != null ? insertVisible.IsRouteRegion : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsRouteRegion + ($v.form.IsRouteRegion.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsRouteRegion.$error }">
                <b-form-checkbox v-model="form.IsRouteRegion" name="check-button" switch>
                  {{(form.IsRouteRegion) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsOrderChangeUnitary != null ? insertVisible.IsOrderChangeUnitary : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsOrderChangeUnitary + ($v.form.IsOrderChangeUnitary.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsOrderChangeUnitary.$error }">
                <b-form-checkbox v-model="form.IsOrderChangeUnitary" name="check-button" switch>
                  {{(form.IsOrderChangeUnitary) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.UseEInvoice != null ? insertVisible.UseEInvoice : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.UseEInvoice + ($v.form.UseEInvoice.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.UseEInvoice.$error }">
                <b-form-checkbox v-model="form.UseEInvoice" name="check-button" switch>
                  {{(form.UseEInvoice) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsWarehouseSale != null ? insertVisible.IsWarehouseSale : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsWarehouseSale + ($v.form.IsWarehouseSale.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsWarehouseSale.$error }">
                <b-form-checkbox v-model="form.IsWarehouseSale" name="check-button" switch>
                  {{(form.IsWarehouseSale) ? $t('insert.active'): $t('insert.passive')}}
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
                <v-select :options="lookup.CITY" @input="selectedCity" label="Label"></v-select>
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
              <b-form-group :label="insertTitle.Category1Id + ($v.form.Category1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_1"
                  @input="selectedType('Category1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category2Id + ($v.form.Category2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_2"
                  @input="selectedType('Category2Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Category3Id + ($v.form.Category3Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CATEGORY_3"
                  @input="selectedType('Category3Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GroupId + ($v.form.GroupId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
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
              <b-form-group :label="insertTitle.ClassId + ($v.form.ClassId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CLASS"
                  @input="selectedType('ClassId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SalesDocumentTypeId != null ? insertVisible.SalesDocumentTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SalesDocumentTypeId + ($v.form.SalesDocumentTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesDocumentTypeId.$error }">
                  <v-select
                    :options="lookup.SALES_DOCUMENT_TYPE"
                    @input="selectedType('SalesDocumentTypeId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.OwnerTypeId != null ? insertVisible.OwnerTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.OwnerTypeId + ($v.form.OwnerTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.OwnerTypeId.$error }">
                  <v-select
                    :options="lookup.OWNER_TYPE"
                    @input="selectedType('OwnerTypeId', $event)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="insertVisible.ClassProposalId != null ? insertVisible.ClassProposalId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClassProposalId + ($v.form.ClassProposalId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalId.$error }">
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
              <b-form-group :label="insertTitle.SalesMethodId + ($v.form.SalesMethodId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SalesMethodId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_SALES_METHOD"
                  @input="selectedType('SalesMethodId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GeographicEnvironmentId != null ? insertVisible.GeographicEnvironmentId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.GeographicEnvironmentId + ($v.form.GeographicEnvironmentId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.GeographicEnvironmentId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_GEOGRAPHIC_ENVIRONMENT"
                  @input="selectedType('GeographicEnvironmentId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TradeFocusId != null ? insertVisible.TradeFocusId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TradeFocusId + ($v.form.TradeFocusId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TradeFocusId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_TRADE_FOCUS"
                  @input="selectedType('TradeFocusId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.InvoiceCombineRuleId != null ? insertVisible.InvoiceCombineRuleId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.InvoiceCombineRuleId + ($v.form.InvoiceCombineRuleId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.InvoiceCombineRuleId.$error }">
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
              <b-form-group :label="insertTitle.ClassProposalReasonId + ($v.form.ClassProposalReasonId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ClassProposalReasonId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_CLASS_PROPOSAL_REASON"
                  @input="selectedType('ClassProposalReasonId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BackMarginGroupId != null ? insertVisible.BackMarginGroupId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.BackMarginGroupId + ($v.form.BackMarginGroupId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.BackMarginGroupId.$error }">
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
            <b-col v-if="insertVisible.DiscountGroup1Id != null ? insertVisible.DiscountGroup1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup1Id + ($v.form.DiscountGroup1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup1Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_1"
                  @input="selectedType('DiscountGroup1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup3Id != null ? insertVisible.DiscountGroup3Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup3Id + ($v.form.DiscountGroup3Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup3Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_3"
                  @input="selectedType('DiscountGroup3Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup4Id != null ? insertVisible.DiscountGroup4Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup4Id + ($v.form.DiscountGroup4Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup4Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_4"
                  @input="selectedType('DiscountGroup4Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup5Id != null ? insertVisible.DiscountGroup5Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup5Id + ($v.form.DiscountGroup5Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup5Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_5"
                  @input="selectedType('DiscountGroup5Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup6Id != null ? insertVisible.DiscountGroup6Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup6Id + ($v.form.DiscountGroup6Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup6Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_6"
                  @input="selectedType('DiscountGroup6Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.DiscountGroup7Id != null ? insertVisible.DiscountGroup7Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup7Id + ($v.form.DiscountGroup7Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup7Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_7"
                  @input="selectedType('DiscountGroup7Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DiscountGroup8Id != null ? insertVisible.DiscountGroup8Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DiscountGroup8Id + ($v.form.DiscountGroup8Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountGroup8Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_DISCOUNT_GROUP_8"
                  @input="selectedType('DiscountGroup8Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.KindId != null ? insertVisible.KindId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.KindId + ($v.form.KindId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.KindId.$error }">
                <v-select
                  :options="lookup.CUSTOMER_KIND"
                  @input="selectedType('KindId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Activity1Id != null ? insertVisible.Activity1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Activity1Id + ($v.form.Activity1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Activity1Id.$error }">
                <v-select
                  :options="lookup.CUSTOMER_ACTIVITY_1"
                  @input="selectedType('Activity1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.OutSourceOrderId != null ? insertVisible.OutSourceOrderId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.OutSourceOrderId + ($v.form.OutSourceOrderId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.OutSourceOrderId.$error }">
                <v-select
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
              <b-form-group :label="insertTitle.PriceListCategoryId + ($v.form.PriceListCategoryId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                <v-select
                  :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                  @input="selectedType('PriceListCategoryId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CreditLimit != null ? insertVisible.CreditLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CreditLimit + ($v.form.CreditLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditLimit.$error }">
                <b-form-input type="text" v-model="form.CreditLimit" :readonly="insertReadonly.CreditLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RiskLimit != null ? insertVisible.RiskLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RiskLimit + ($v.form.RiskLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.RiskLimit.$error }">
                <b-form-input type="text" v-model="form.RiskLimit" :readonly="insertReadonly.RiskLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrentCredit != null ? insertVisible.CurrentCredit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentCredit + ($v.form.CurrentCredit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentCredit.$error }">
                <b-form-input type="text" v-model="form.CurrentCredit" :readonly="insertReadonly.CurrentCredit" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.CurrentRisk != null ? insertVisible.CurrentRisk : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.CurrentRisk + ($v.form.CurrentRisk.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrentRisk.$error }">
                <b-form-input type="text" v-model="form.CurrentRisk" :readonly="insertReadonly.CurrentRisk" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ReservedLimit != null ? insertVisible.ReservedLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ReservedLimit + ($v.form.ReservedLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ReservedLimit.$error }">
                <b-form-input type="text" v-model="form.ReservedLimit" :readonly="insertReadonly.ReservedLimit" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.FinanceCode + ($v.form.FinanceCode.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DebitAccountRemainder != null ? insertVisible.DebitAccountRemainder : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DebitAccountRemainder + ($v.form.DebitAccountRemainder.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DebitAccountRemainder.$error }">
                <b-form-input type="text" v-model="form.DebitAccountRemainder" :readonly="insertReadonly.DebitAccountRemainder" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
                <b-col v-if="insertVisible.CreditAccountRemainder != null ? insertVisible.CreditAccountRemainder : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreditAccountRemainder + ($v.form.CreditAccountRemainder.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreditAccountRemainder.$error }">
                  <b-form-input type="text" v-model="form.CreditAccountRemainder" :readonly="insertReadonly.CreditAccountRemainder" />
                </b-form-group>
              </b-col>
                <b-col v-if="insertVisible.DiscountPercent1 != null ? insertVisible.DiscountPercent1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent1 + ($v.form.DiscountPercent1.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent1.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent1" :readonly="insertReadonly.DiscountPercent1" />
                </b-form-group>
              </b-col>
                <b-col v-if="insertVisible.DiscountPercent2 != null ? insertVisible.DiscountPercent2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DiscountPercent2 + ($v.form.DiscountPercent2.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DiscountPercent2.$error }">
                  <b-form-input type="text" v-model="form.DiscountPercent2" :readonly="insertReadonly.DiscountPercent2" />
                </b-form-group>
              </b-col>
                <b-col v-if="insertVisible.SapCustomerId != null ? insertVisible.SapCustomerId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SapCustomerId + ($v.form.SapCustomerId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.SapCustomerId.$error }">
                  <b-form-input type="text" v-model="form.SapCustomerId" :readonly="insertReadonly.SapCustomerId" />
                </b-form-group>
              </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.DeliveryDayParam != null ? insertVisible.DeliveryDayParam : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DeliveryDayParam + ($v.form.DeliveryDayParam.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DeliveryDayParam.$error }">
                <b-form-input type="text" v-model="form.DeliveryDayParam" :readonly="insertReadonly.DeliveryDayParam" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PaymentPeriod != null ? insertVisible.PaymentPeriod : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.PaymentPeriod + ($v.form.PaymentPeriod.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.PaymentPeriod.$error }">
                <v-select />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TciBreak1Id != null ? insertVisible.TciBreak1Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak1Id + ($v.form.TciBreak1Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak1Id.$error }">
                <v-select
                  :options="lookup.TCI_BREAKDOWN"
                  @input="selectedType('TciBreak1Id', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
          
            <b-col v-if="insertVisible.TciBreak2Id != null ? insertVisible.TciBreak2Id : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.TciBreak2Id + ($v.form.TciBreak2Id.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.TciBreak2Id.$error }">
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
              <b-form-group :label="insertTitle.StatementDay + ($v.form.StatementDay.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatementDay.$error }">
                <v-select />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DefaultPaymentTypeId != null ? insertVisible.DefaultPaymentTypeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.DefaultPaymentTypeId + ($v.form.DefaultPaymentTypeId.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.DefaultPaymentTypeId.$error }">
                <v-select />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.AllowOverLimit != null ? insertVisible.AllowOverLimit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.AllowOverLimit + ($v.form.AllowOverLimit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.AllowOverLimit.$error }">
                <b-form-checkbox v-model="form.AllowOverLimit" name="check-button">
                  {{(form.AllowOverLimit) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsDirectDebit != null ? insertVisible.IsDirectDebit : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsDirectDebit + ($v.form.IsDirectDebit.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsDirectDebit.$error }">
                <b-form-checkbox v-model="form.IsDirectDebit" name="check-button">
                  {{(form.IsDirectDebit) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ManualInvoiceClosure != null ? insertVisible.ManualInvoiceClosure : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.ManualInvoiceClosure + ($v.form.ManualInvoiceClosure.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.ManualInvoiceClosure.$error }">
                <b-form-checkbox v-model="form.ManualInvoiceClosure" name="check-button">
                  {{(form.ManualInvoiceClosure) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Statement != null ? insertVisible.Statement : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Statement + ($v.form.Statement.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.Statement.$error }">
                <b-form-checkbox v-model="form.Statement" name="check-button">
                  {{(form.Statement) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsBlackListed != null ? insertVisible.IsBlackListed : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.IsBlackListed + ($v.form.IsBlackListed.required === false ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsBlackListed.$error }">
                <b-form-checkbox v-model="form.IsBlackListed" name="check-button">
                  {{(form.IsBlackListed) ? $t('insert.active'): $t('insert.passive')}}
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
                <v-select :options="lookup.CREDIT_DESCRIPTION" @input="selectedCreditDescription" label="Label"></v-select>
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
                <b-form-input type="text" v-model="customerCreditHistories.textNo" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.notaryNo')">
                <b-form-input type="text" v-model="customerCreditHistories.notaryNo" />
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
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.dbsPriority')">
                <b-form-input type="text" v-model="customerCreditHistories.dbsPriority" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.customer.allowOverLimit')">
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

          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')">
          <b-row>

          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>

          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')">
          <b-row>

          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.customerTouchpoints')">
          <b-row>

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
        customerLocations: [],
        customerCreditHistories: []
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
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertRules', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'statementDays', 'distiricts', 'banks', 'currency'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
      let allLookups = 'CREDIT_DESCRIPTION'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})

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
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.fillRequireds'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.form.licenseValidDate = this.dateConvertToISo(this.form.licenseValidDate)
        this.$store.dispatch('createData', {...this.query, api: 'VisionNextCustomer/api/Customer', formdata: this.form, return: this.$route.meta.baseLink})
      }
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
      if (!this.customerCreditHistories.creditAmount || !this.customerCreditHistories.creditDescriptionId || !this.customerCreditHistories.creditStartDate || !this.customerCreditHistories.bankId || !this.customerCreditHistories.currencyId || !this.customerCreditHistories.creditEndDate) {
        this.$toasted.show(this.$t('insert.fillRequireds'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
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
    },
    removeCustomerCreditHistory (item) {
      this.form.customerCreditHistories.splice(this.form.customerCreditHistories.indexOf(item), 1)
    },
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
    }
  }
}
</script>
<style lang="sass">
</style>
