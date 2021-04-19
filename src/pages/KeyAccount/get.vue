<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData && rowData.Description1" />
            <GetFormField v-model="workFlowModel"/>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.code')}}:</b> {{rowData && rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.customer.Model_StatusReasonId')}}:</b> {{rowData && rowData.StatusReason ? rowData.StatusReason.Label : ''}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.customer.status')}}:</b> {{(rowData && rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CommercialTitle, 'text', 'insert.customer.Model_CommercialTitle')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.customer.Model_Description1')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseNumber, 'text', 'insert.customer.Model_LicenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.TaxCustomerType, 'object', 'insert.customer.Model_TaxCustomerTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.TaxOffice, 'text', 'insert.customer.Model_TaxOffice')"></div>
              <div v-html="getFormatDataByType(rowData.TaxNumber, 'text', 'insert.customer.Model_TaxNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Alias, 'text', 'insert.customer.Model_Alias')"></div>
              <div v-html="getFormatDataByType(rowData.TradeLicenseNumber, 'text', 'insert.customer.TradeLicenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.BlockReason, 'object', 'insert.customer.Model_BlockReasonId')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerInvoiceType, 'object', 'insert.customer.Model_CustomerInvoiceTypeId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerRegion5, 'object', 'insert.customer.Model_CustomerRegion5Id')"></div>
              <div v-html="getFormatDataByType(rowData.MarketingRegion5, 'object', 'insert.customer.MarketingRegion5Id')"></div>
              <div v-html="getFormatDataByType(rowData.RouteCode, 'text', 'insert.customer.RouteCode')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseValidDate, 'date', 'insert.customer.LicenseValidDate')"></div>
              <div v-html="getFormatDataByType(rowData.IsBlocked, 'check', 'insert.customer.Model_IsBlocked')"></div>
              <div v-html="getFormatDataByType(rowData.IsOrderChangeUnitary, 'check', 'insert.customer.IsOrderChangeUnitary')"></div>
              <div v-html="getFormatDataByType(rowData.IsOrderChangeUnitary, 'check', 'insert.customer.UseEDispatch')"></div>
              <div v-html="getFormatDataByType(rowData.IsWarehouseSale, 'check', 'insert.customer.IsWarehouseSale')"></div>
              <div v-html="getFormatDataByType(rowData.UseEInvoice, 'check', 'insert.customer.Model_UseEInvoice')"></div>
              <div v-if="rowData.RecordTypeId === 4 && rowData.UpperCustomer != null"><span><i class="far fa-circle"></i>{{$t('insert.customer.mainOfBranch')}}</span><p><a :href="`/KeyAccount/${rowData.UpperCustomer.DecimalValue}`"> {{rowData.UpperCustomer.Label}}</a></p></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerLocations')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('list.location')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_Code')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_Location_Description1')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsDefaultLocation')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsInvoiceAddress')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_IsDeliveryAddress')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.isRouteNode')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerLocations" :key="i">
                      <b-td class="text-center">
                        <i @click="showMap(r)" class="fa fa-map-marker-alt text-primary"></i>
                      </b-td>
                      <b-td>{{r.Code}}</b-td>
                      <b-td>{{r.Description1}}</b-td>
                      <b-td>{{r.IsDefaultLocation == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsInvoiceAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsDeliveryAddress == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                      <b-td>{{r.IsRouteNode == 1 ? $t('insert.yes') : $t('insert.no')}}</b-td>
                    </b-tr>
                    <b-modal id="location-modal" ref="LocationModal" hide-footer hide-header>
                      <NextLocation :Location='Location' />
                    </b-modal>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerClass')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.customer.Model_Category1Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category2, 'object', 'insert.customer.Model_Category2Id')"></div>
                <div v-html="getFormatDataByType(rowData.Category3, 'object', 'insert.customer.Model_Category3Id')"></div>
                <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.customer.Model_GroupId')"></div>
                <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.customer.Model_ClassId')"></div>
                <div v-html="getFormatDataByType(rowData.SalesDocumentType, 'object', 'insert.customer.Model_SalesDocumentTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.OwnerType, 'object', 'insert.customer.Model_OwnerTypeId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposal, 'object', 'insert.customer.Model_ClassProposalId')"></div>
              </b-card>
              <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.SalesMethod, 'object', 'insert.customer.Model_SalesMethodId')"></div>
                <div v-html="getFormatDataByType(rowData.Model_GeographicEnvironment, 'object', 'insert.customer.Model_GeographicEnvironmentId')"></div>
                <div v-html="getFormatDataByType(rowData.TradeFocus, 'object', 'insert.customer.Model_TradeFocusId')"></div>
                <div v-html="getFormatDataByType(rowData.InvoiceCombineRule, 'object', 'insert.customer.Model_InvoiceCombineRuleId')"></div>
                <div v-html="getFormatDataByType(rowData.ClassProposalReason, 'object', 'insert.customer.Model_ClassProposalReasonId')"></div>
                <div v-html="getFormatDataByType(rowData.BackMarginGroup, 'object', 'insert.customer.Model_BackMarginGroupId')"></div>
                <div v-html="getFormatDataByType(rowData.Kind, 'object', 'insert.customer.Model_KindId')"></div>
              </b-card>
          </b-row>
        </b-tab>
        <b-tab v-if="rowData.RecordTypeId === 3" :title="$t('insert.customer.Branchs')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.BranchCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.BranchName')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.AuthorizedBranch')}}</span></b-th>
                    <b-th><span>{{$t('list.operations')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(b, i) in branchs" :key="i">
                      <b-td>{{b.Code}}</b-td>
                      <b-td>{{b.Description1}}</b-td>
                      <b-td>{{allBranchs != null ? allBranchs.find(x => x.RecordId === b.BranchId).Description1 : ''}}</b-td>
                      <b-td class="text-center">
                        <a :href="`/KeyAccount/${b.RecordId}`"><i class="fas fa-arrow-right text-success" /></a>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerFinancialInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.customer.Model_PriceListCategoryId')"></div>
              <div v-html="getFormatDataByType(rowData.CreditLimit, 'text', 'insert.customer.Model_CreditLimit')"></div>
              <div v-html="getFormatDataByType(rowData.RiskLimit, 'text', 'insert.customer.Model_RiskLimit')"></div>
              <div v-html="getFormatDataByType(rowData.CurrentCredit, 'text', 'insert.customer.Model_CurrentCredit')"></div>
              <div v-html="getFormatDataByType(rowData.CurrentRisk, 'text', 'insert.customer.Model_CurrentRisk')"></div>
              <div v-html="getFormatDataByType(rowData.ReservedLimit, 'text', 'insert.customer.reservedLimit')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.customer.Model_FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.ZdebitAccountRemainder, 'text', 'insert.customer.ZdebitAccountRemainder')"></div>
              <div v-html="getFormatDataByType(rowData.ZcreditAccountRemainder, 'text', 'insert.customer.ZcreditAccountRemainder')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountPercent1, 'text', 'insert.customer.Model_DiscountPercent1')"></div>
              <div v-html="getFormatDataByType(rowData.DiscountPercent2, 'text', 'insert.customer.Model_DiscountPercent2')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SapCustomerId, 'text', 'insert.customer.sapCustomerId')"></div>
              <div v-html="getFormatDataByType(rowData.DeliveryDayParam, 'text', 'insert.customer.Model_DeliveryDayParam')"></div>
              <div v-html="getFormatDataByType(rowData.PaymentPeriod, 'text', 'insert.customer.Model_PaymentPeriod')"></div>
              <div v-html="getFormatDataByType(rowData.TCIBreak1, 'object', 'insert.customer.discountTci1')"></div>
              <div v-html="getFormatDataByType(rowData.TCIBreak2, 'object', 'insert.customer.discountTci2')"></div>
              <div v-html="getFormatDataByType(rowData.StatementDay, 'text', 'insert.customer.statementDay')"></div>
              <div v-html="getFormatDataByType(rowData.DefaultPaymentType, 'object', 'insert.customer.Model_DefaultPaymentTypeId')"></div>
              <div v-html="getFormatDataByType(rowData.AllowOverLimit, 'check', 'insert.customer.Model_AllowOverLimit')"></div>
              <div v-html="getFormatDataByType(rowData.IsDirectDebit, 'check', 'insert.customer.isDirectDebit')"></div>
              <div v-html="getFormatDataByType(rowData.ManualInvoiceClosure, 'check', 'insert.customer.Model_ManualInvoiceClosure')"></div>
              <div v-html="getFormatDataByType(rowData.Statement, 'check', 'insert.customer.statement')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerCreditHistories')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.Model_CreditAmount')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_CreditLimit')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_RiskLimit')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerCreditHistories" :key="i">
                      <b-td>{{r.CreditAmount}}</b-td>
                      <b-td>{{r.CreditLimit}}</b-td>
                      <b-td>{{r.RiskLimit}}</b-td>
                   </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerPaymentTypes')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.Model_PaymentTypeId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerPaymentTypes" :key="i">
                       <b-td>{{r.PaymentType.Label ? r.PaymentType.Label : ''}}</b-td>
                   </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.detail')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.TextField1, 'text', 'insert.customer.textField1')"></div>
                <div v-html="getFormatDataByType(rowData.TextField2, 'text', 'insert.customer.textField2')"></div>
                <div v-html="getFormatDataByType(rowData.Barcode, 'text', 'insert.customer.barcode')"></div>
              </b-card>
              <b-card class="col-md-6 col-12 asc__showPage-card">
                <div v-html="getFormatDataByType(rowData.HoldsAsset, 'text', 'insert.customer.holdAsset')"></div>
                <div v-html="getFormatDataByType(rowData.Contracted, 'text', 'insert.customer.contracted')"></div>
              </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.CustomerItemDiscountCrts')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.discountDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_DiscountPercent1')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.Model_DiscountPercent2')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerItemDiscounts" :key="i">
                      <b-td>{{r.Description1}}</b-td>
                      <b-td>{{r.DiscountPercent1}}</b-td>
                      <b-td>{{r.DiscountPercent2}}</b-td>
                   </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customer.tag')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.customer.labelId')}}</span></b-th>
                    <b-th><span>{{$t('insert.customer.labelValueId')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(r, i) in rowData.CustomerLabels" :key="i">
                      <b-td>{{r.Label && r.Label.Label ? r.Label.Label : ''}}</b-td>
                      <b-td>{{r.LabelValue && r.LabelValue.Label ? r.LabelValue.Label : ''}}</b-td>
                   </b-tr>
                  </b-tbody>
                </b-table-simple>
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
      workFlowModel: {
        ControllerName: 'Customer',
        ClassName: 'Customer',
        PageName: 'pg_KeyAccount'
      },
      Location: {}
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style', 'branchs', 'allBranchs'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/Customer', record: this.$route.params.url})
    },
    getBranchs (customerId) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'branchs',
        andConditionModel: {
          UpperCustomerIds: [customerId]
        }
      })
    },
    showMap (item) {
      this.Location = item
      if (item.XPosition == null || item.YPosition == null) {
        this.$toasted.show(this.$t('index.errorLocation'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.$nextTick(() => {
        this.$root.$emit('bv::show::modal', 'location-modal', item)
      })
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        this.getBranchs(e.RecordId)
      }
    },
    branchs (e) {
      if (e && e.length > 0) {
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextBranch/api/Branch/Search',
          name: 'allBranchs',
          andConditionModel: {
            RecordIds: [...new Set(e.map(x => x.BranchId))]
          }
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
