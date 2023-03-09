<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb/>
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{ name: 'InvestmentForm' }">
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
            <NextFormGroup :title="$t('insert.investmentForm.customer')" :error="$v.form.CustomerId" md="3" lg="3" show-copy copy-values="Code,Description1">
              <NextDropdown
                v-model="selectedCustomer"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Description1,CommercialTitle"
                @change="selectedCustomer()"
                @input="selectedSearchType('CustomerId', $event);"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :is-customer="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.customerName')">
              <NextInput v-model="form.customerName" :disabled="true" type="text" md="3" lg="3" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.address')">
              <NextTextArea v-model="form.address" md="3" lg="3" :disabled="true"></NextTextArea>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.licenseNumber')">
              <NextInput v-model="form.licenseNumber" type="text" md="3" lg="3" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.description')">
              <NextTextArea v-model="form.description" md="3" lg="3"></NextTextArea>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.typeId')" md="3" lg="3">
              <NextDropdown url="VisionNextContractManagement/api/ContractType/Search" :disabled="true" v-model="form.typeId"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.route')">
              <NextInput v-model="form.route" type="text" md="3" lg="3" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.tmrSrName')">
              <NextInput v-model="form.tmrSrName" type="text" md="3" lg="3" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.formDate')">
                <NextDatePicker v-model="form.formDate" :disabled="true"/>
              </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.salesVolumeClass')">
              <NextDropdown v-model="form.salesVolumeClass"  :disabled="true" :source="lookupValues.CUSTOMER_KIND" md="3" lg="3" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.customerArea')" md="3" lg="3">
              <NextInput v-model="form.customerArea" type="text" md="3" lg="3" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.investmentForm.signingType')" :error="$v.form.signingType" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="form.signingType"
              />
            </NextFormGroup>
          </b-row>
        </section>
      </b-col>
      <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.investmentForm.currentInvestment')" active @click.prevent="tabValidation()">
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">Kontrat Tarihleri</legend>
            <b-row class="p-1">
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                  <NextDatePicker v-model="form.ContractValidDateStartDate" :disabled="true"/>
                </NextFormGroup>
              </b-col>
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                  <NextDatePicker v-model="form.ContractValidDateEndDate" :disabled="true"/>
                </NextFormGroup>
              </b-col>
              <b-col cols="6" class="mr-1">
                <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                  <NextInput type="text" v-model="form.ContractValidDurationDate" :disabled="true"/>
                </NextFormGroup>
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">Mevcut Satış</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small >
                  <b-thead>
                    <b-th><span></span></b-th>
                    <b-th><span>Kent</span></b-th>
                    <b-th><span>Rothmans</span></b-th>
                    <b-th><span>Tekel 2000</span></b-th>
                    <b-th><span>Toplam</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr >
                      <b-td>Mevcut Aylık Ortalama Satış</b-td>
                      <b-td>100</b-td>
                      <b-td>100</b-td>
                      <b-td>100</b-td>
                      <b-td>300</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Mevcut Yıllık Satış Kârı(TL)</b-td>
                      <b-td>200</b-td>
                      <b-td>200</b-td>
                      <b-td>200</b-td>
                      <b-td>600</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">Mevcut Yatırım Bütçesi</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>Kontrat Kazanım Tipi</span></b-th>
                    <b-th><span>Kent</span></b-th>
                    <b-th><span>Rothmans</span></b-th>
                    <b-th><span>Tekel 2000</span></b-th>
                    <b-th><span>Toplam</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr>
                      <b-td></b-td>
                      <b-td>100</b-td>
                      <b-td>100</b-td>
                      <b-td>100</b-td>
                      <b-td>300</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          <fieldset class="fs-border">
            <legend class="fs-legend-detail">Mevcut Yatırım Kârlılığı</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small>
                  <b-tbody>
                    <b-tr>
                      <b-td>Mevcut Yatırım Kârlılığı(TL)</b-td>
                      <b-td>300</b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Yatırım Kârlılık Oranı(%)</b-td>
                      <b-td>100</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
        </b-tab>
          <b-tab :title="$t('insert.investmentForm.newInvestment')" >
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">Kontrat Tarihleri</legend>
              <b-row class="p-1">
                <b-col cols="6">
                  <NextFormGroup :title="$t('insert.investmentForm.contractStartDate')">
                    <NextDatePicker v-model="form.contractStartDate" @input="calculateContractDuration()"/>
                  </NextFormGroup>
                </b-col>
                <b-col cols="6">
                  <NextFormGroup :title="$t('insert.investmentForm.scheduledPaymentDate')">
                    <NextDatePicker v-model="form.scheduledPaymentDate" />
                  </NextFormGroup>
                </b-col>
                <b-col cols="6" class="mr-1">
                  <NextFormGroup :title="$t('insert.investmentForm.contractEndDate')">
                    <NextDatePicker v-model="form.contractEndDate" @input="calculateContractDuration()"/>
                  </NextFormGroup>
                </b-col>
                <b-col cols="6">
                  <NextFormGroup :title="$t('insert.investmentForm.contractDuration')">
                    <NextInput :disabled="true" type="text" v-model="form.contractDuration"/>
                  </NextFormGroup>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">Hedef Satış</legend>
              <b-row class="p-3">
                <b-col cols="6">
                  <b-table-simple bordered small>
                    <b-thead>
                      <b-th><span></span></b-th>
                      <b-th><span>Kent</span></b-th>
                      <b-th><span>Rothmans</span></b-th>
                      <b-th><span>Tekel 2000</span></b-th>
                      <b-th><span>Toplam</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr>
                        <b-td>Mevcut Aylık Ortalama Satış</b-td>
                        <b-td>100</b-td>
                        <b-td>100</b-td>
                        <b-td>100</b-td>
                        <b-td>300</b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>Mevcut Yıllık Satış Kârı(TL)</b-td>
                        <b-td>200</b-td>
                        <b-td>200</b-td>
                        <b-td>200</b-td>
                        <b-td>600</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
              <legend class="fs-legend-detail">Yeni Yatırım Bütçesi</legend>
              <b-row class="p-3">
                <b-col cols="6">
                  <b-table-simple bordered small>
                    <b-thead>
                      <b-th><span>Kontrat Kazanım Tipi</span></b-th>
                      <b-th><span>Kazanım Tutarı</span></b-th>
                      <b-th><span>Kazanım Tipi Bütçesi</span></b-th>
                      <b-th><span>Planan Ödeme Tarihi</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr>
                        <b-td>Nakit</b-td>
                        <b-td><NextInput type="text"/></b-td>
                        <b-td><NextDropdown/></b-td>
                        <b-td><NextDatePicker/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>Only DTI</b-td>
                        <b-td><NextInput type="text"/></b-td>
                        <b-td><NextDropdown/></b-td>
                        <b-td><NextDatePicker/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>YYM</b-td>
                        <b-td><NextInput type="text"/></b-td>
                        <b-td><NextDropdown/></b-td>
                        <b-td><NextDatePicker/></b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>Toplam</b-td>
                        <b-td><NextInput type="text"/></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
            </fieldset>
            <fieldset class="fs-border">
            <legend class="fs-legend-detail">Yeni Yatırım Kârlılığı</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small>
                  <b-tbody>
                    <b-tr>
                      <b-td>Beklenen Kârlılık (TL)</b-td>
                      <b-td :disabled="true"><NextInput type="text"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Beklenen Yatırım Kârlılık Oranı(%)</b-td>
                      <b-td :disabled="true"><NextInput type="text"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          </b-tab>
          <b-tab :title="$t('insert.investmentForm.unitAndOrderDetails')" >
            <fieldset class="fs-border">
                <legend class="fs-legend-detail">Mevcut Ünite Durumu</legend>
                <b-row class="p-3">
                  <b-col cols="6">
                    <b-table-simple bordered small>
                        <b-thead>
                          <b-th><span>Üniteler</span></b-th>
                          <b-th><span>Ünite Adı</span></b-th>
                          <b-th><span>Adet</span></b-th>
                          <b-th><span>Konum</span></b-th>
                        </b-thead>
                      <b-tbody>
                        <b-tr>
                          <b-td>Beklenen Kârlılık (TL)</b-td>
                          <b-td :disabled="true"><NextDropdown/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>Beklenen Yatırım Kârlılık Oranı(%)</b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
            </fieldset>
            <fieldset class="fs-border">
                <legend class="fs-legend-detail">Rakip Ünite Durumu</legend>
                <b-row class="p-3">
                  <b-col cols="6">
                    <b-table-simple bordered small >
                        <b-thead>
                          <b-th><span>Firma</span></b-th>
                          <b-th><span>PMI</span></b-th>
                          <b-th><span>JTI</span></b-th>
                          <b-th><span>ITC</span></b-th>
                        </b-thead>
                      <b-tbody>
                        <b-tr>
                          <b-td>Ünite</b-td>
                          <b-td><NextDropdown/></b-td>
                          <b-td><NextDropdown/></b-td>
                          <b-td><NextDropdown/></b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>Ünite Tipi</b-td>
                          <b-td><NextDropdown/></b-td>
                          <b-td><NextDropdown/></b-td>
                          <b-td><NextDropdown/></b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>Yatırım Tutarı</b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                          <b-td :disabled="true"><NextInput type="text"/></b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
            </fieldset>
            <fieldset class="fs-border">
            <legend class="fs-legend-detail">Diğer Detaylar</legend>
            <b-row class="p-3">
              <b-col cols="6">
                <b-table-simple bordered small >
                  <b-tbody>
                    <b-tr>
                      <b-td>Mobilya Masrafı</b-td>
                      <b-td><NextInput type="text"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Önyüz Sayısı</b-td>
                      <b-td><NextInput type="text"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Önyüz Masrafı</b-td>
                      <b-td><NextInput type="text"/></b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>Toplam Mobilya Masrafı</b-td>
                      <b-td><NextInput type="text"/></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </fieldset>
          </b-tab>
        </b-tabs>
      </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        customerName: null,
        address: null,
        licenseNumber: null,
        description: null,
        route: null,
        tmrSrName: null,
        salesVolumeClass: [],
        formDate: null,
        typeId: [],
        customerArea: null,
        signingType: [],
        currentInvestment: null,
        newInvestment: null,
        unitAndOrderDetails: null,
        contractStartDate: null,
        contractEndDate: null,
        contractDuration: null,
        scheduledPaymentDate: null,
        CustomerId: null,
        FinanceCode: null,
        CustomerFinanceCode: null,
        ContractValidDateStartDate: null,
        ContractValidDateEndDate: null,
        ContractValidDurationDate: null
      },
      customerBudgets: [],
      customerList: [],
      selectedCustomer: null,
      recordIdList: [],
      contractList: [],
      IsInvestment: 1,
      IsContract: 0,
      RouteDetailsList: [],
      KindId: null,
      lookupValues: {},
      getCustomerContractList: [],
      date: null,
      routeName1: 'ContractManagement',
      routeName2: 'Contract'
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      console.log(this.form)
      this.selectedCustomer = rowData.Description1
      this.form.customerName = rowData.Description1
      this.form.address = rowData.CustomerLocations[0]['AddressDetail']
      this.form.licenseNumber = rowData.LicenseNumber
      this.form.customerArea = rowData.CustomerRegion5.Label
      this.RouteDetailsList = rowData.RouteDetails.filter(r => r.RouteTypeId === 5)
      this.form.route = this.RouteDetailsList[0].Route.Label
      this.form.tmrSrName = this.RouteDetailsList[0].Representative.Label
      this.KindId = rowData.KindId
      this.getLookups(this.KindId)
      this.getCustomerContract(this.form.CustomerId)
    }
  },
  getLookups (kindId) {
    this.$api.postByUrl({LookupTableCode: 'CUSTOMER_KIND'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
      if (response) {
        (this.lookupValues = response.Values.CUSTOMER_KIND.find(a => a.DecimalValue === kindId))
        this.form.salesVolumeClass = this.lookupValues.Label
      }
    })
  },
  getCustomerContract (CustomerId) {
    let request = {
      recordId: 0,
      customerId: CustomerId}
    this.$api.postByUrl(request, `VisionNextContractManagement/api/Contract/GetCustomerContract`).then((res) => {
      this.getCustomerContractList = res.Model
      this.form.ContractValidDateStartDate = this.getCustomerContractList.ContractValidDates[0].StartDate
      this.form.ContractValidDateEndDate = this.getCustomerContractList.ContractValidDates[0].EndDate
      this.form.ContractValidDurationDate = this.form.ContractValidDateEndDate - this.form.ContractValidDateStartDate
    })
  },
  selectContractType () {
    let request = {
      'RecordId': 2 }
    this.$api.postByUrl(request, '/VisionNextContractManagement/api/ContractType/Search').then((response) => {
      this.contractList = response.ListModel.BaseModels[1]
      this.form.typeId = this.contractList.Description1
    })
  }
}
</script>
<style lang="sass">
  .fs-border
    border: 1px solid black
    margin: 10px 0
  .fs-legend-detail
    width: auto
    font-size: 1rem
    margin-left: 10px
  table td
   border: 0px solid #fbfbfb !important
</style>
