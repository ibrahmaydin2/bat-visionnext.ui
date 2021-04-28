<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'DispatchRefDocument' }">
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
          <b-col cols="12">
            <b-row>
              <NextFormGroup item-key="DocumentDate" :error="$v.form.DocumentDate" md="3" lg="3">
                <b-form-datepicker v-model="documentDate" :placeholder="$t('insert.chooseDate')" :disabled="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="DocumentTime" :error="$v.form.DocumentTime" md="3" lg="3">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                  v-model="form.DocumentTime"
                  :disabled="true"/>
              </NextFormGroup>
              <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
                <v-select v-model="selectedCustomer" :options="customers" @search="searchCustomer" :filterable="false" @input="selectedSearchType('CustomerId', $event)" label="Description1" :disabled="true">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
                </v-select>
              </NextFormGroup>
              <NextFormGroup item-key="PriceListId" :error="$v.form.PriceListId" md="3" lg="3">
                <v-select :disabled="true" v-model="selectedPrice" :options="priceList" :filterable="false" label="Description1"></v-select>
              </NextFormGroup>
            </b-row>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12" class="">
      <b-tabs>
        <b-tab :title="$t('insert.order.enterWaybill')" active @click.prevent="tabValidation()">
          <b-row>
           <NextFormGroup item-key="InvoiceNumber" :error="$v.form.InvoiceNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.InvoiceNumber" :readonly="insertReadonly.InvoiceNumber" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="DocumentNumber" :error="$v.form.DocumentNumber" md="2" lg="2">
              <b-form-input type="text" v-model="form.DocumentNumber" :readonly="insertReadonly.DocumentNumber" :disabled="true"/>
            </NextFormGroup>
             <NextFormGroup item-key="RefDocumentTypeId" :error="$v.form.RefDocumentTypeId" md="2" lg="2">
              <v-select v-model="selectedRefDocumentType" label="Label" :options="lookup.REF_DOCUMENT_TYPE" :disabled="true" ></v-select>
            </NextFormGroup>
             <NextFormGroup item-key="ActualDeliveryDate" :error="$v.form.ActualDeliveryDate" md="2" lg="2" v-if="selectedBranch.UseEDispatch !== 0">
                <b-form-datepicker v-model="form.ActualDeliveryDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="ActualDeliveryTime" :error="$v.form.ActualDeliveryTime" md="2" lg="2" v-if="selectedBranch.UseEDispatch !== 0">
                <b-form-timepicker
                  :placeholder="$t('insert.chooseTime')"
                  :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
                  :label-no-time-selected="$t('insert.chooseTime')"
                  :label-close-button="$t('insert.close')"
                  close-button-variant="outline-danger"
                  v-model="form.ActualDeliveryTime"/>
            </NextFormGroup>
            <NextFormGroup item-key="EDocumentStatusId" :error="$v.form.EDocumentStatusId" md="2" lg="2">
              <v-select v-model="selectedEDocumentStatus" label="Description1" :options="eDocumentStatus" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
             <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
              <v-select v-model="selectedRepresentative" label="Description1" :options="representatives" :filterable="false" @input="selectedSearchType('RepresentativeId', $event)" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="DeliveryRepresentativeId" :error="$v.form.DeliveryRepresentativeId" md="2" lg="2">
              <v-select v-model="selectedDeliveryRepresentative" label="Description1" :options="representatives" :filterable="false" @input="selectedSearchType('DeliveryRepresentativeId', $event)" :disabled="true"></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="2" lg="2">
              <v-select v-model="selectedCurrency" label="Description1" :options="currencies" :filterable="false" :disabled="true" ></v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
              <v-select v-model="selectedRoute" label="Description1" :options="routes" :filterable="false" @input="selectedSearchType('RouteId', $event)" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId" md="2" lg="2">
              <v-select v-model="selectedWarehouse" :options="warehouses" :filterable="false" @input="selectedSearchType('WarehouseId', $event)" label="Description1" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="2" lg="2">
              <v-select v-model="selectedVehicle" :options="vehicles" :filterable="false" @input="selectedSearchType('VehicleId', $event)" label="Description1" :disabled="form.InvoiceLogisticCompanies && form.InvoiceLogisticCompanies.length > 0" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.products')" @click.prevent="tabValidation()" v-if="selectedRefDocumentType && (selectedRefDocumentType.Code === 'WarehouseMovement' || selectedRefDocumentType.Code === 'VanLoading')">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.productCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.productName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.quantity')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(p, i) in products" :key="i">
                  <b-td>{{p.ItemCode}}</b-td>
                  <b-td>{{p.ItemDesc}}</b-td>
                  <b-td>{{p.Quantity}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.assetMovement')" @click.prevent="tabValidation()" v-if="selectedRefDocumentType && selectedRefDocumentType.Code === 'AssetMovement'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.assetCode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.assetName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.serialNumber')}}</span></b-th>
                <b-th><span>{{$t('insert.order.assetQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.order.barcode')}}</span></b-th>
                <b-th><span>{{$t('insert.order.fixtureNumber')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(a, i) in form.AssetMovementItems" :key="i">
                  <b-td>{{a.Code}}</b-td>
                  <b-td>{{a.Description}}</b-td>
                  <b-td>{{a.SerialNumber2}}</b-td>
                  <b-td>{{a.Quantity}}</b-td>
                  <b-td>{{a.SerialNumber}}</b-td>
                  <b-td>{{a.SerialNumber3}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.order.logisticCompanies')" @click.prevent="tabValidation()" :disabled="form.VehicleId > 0">
          <b-row>
            <NextFormGroup :title="$t('insert.order.companyName')" :error="$v.selectedInvoiceLogisticCompany.companyName" :required="true" md="4" lg="3">
              <b-form-input type="text" v-model="selectedInvoiceLogisticCompany.companyName"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.order.taxNumber')" :error="$v.selectedInvoiceLogisticCompany.taxNumber" :required="true" md="4" lg="3">
              <b-form-input type="number" v-model="selectedInvoiceLogisticCompany.taxNumber" :maxLength="10" :oninput="maxLengthControl"/>
            </NextFormGroup>
          </b-row>
          <NextAddress
            v-model="address"
            :required="true"
            :city-error="$v.selectedInvoiceLogisticCompany.cityId.$error"
            :district-error="$v.selectedInvoiceLogisticCompany.districtId.$error"
            :hide-address="true"
            md="4"
            lg="3"
          />
          <b-col cols="12" md="8" lg="6" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addInvoiceLogisticCompany" />
              </b-form-group>
            </b-col>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.order.companyName')}}</span></b-th>
                <b-th><span>{{$t('insert.order.taxNumber')}}</span></b-th>
                <b-th><span>{{$t('insert.order.city')}}</span></b-th>
                <b-th><span>{{$t('insert.order.district')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(l, i) in (form.InvoiceLogisticCompanies ? form.InvoiceLogisticCompanies.filter(x => x.RecordState !== 4) : [])" :key="i">
                  <b-td>{{l.CompanyName}}</b-td>
                  <b-td>{{l.TaxNumber}}</b-td>
                  <b-td>{{l.City ? l.City.Label : l.CityName}}</b-td>
                  <b-td>{{l.District ? l.District.Label : l.DistrictName}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeInvoiceLogisticCompany(l)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
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
import { required, minValue, minLength, maxLength } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        StateId: 1,
        InvoiceNumber: null,
        InvoiceKindId: null,
        DocumentClassId: null,
        RefDocumentTypeId: null,
        EDocumentStatusId: null,
        GrossTotal: 0,
        DocumentNumber: null,
        ActualDeliveryDate: null,
        ActualDeliveryTime: null,
        RepresentativeId: null,
        DeliveryRepresentativeId: null,
        Description1: null,
        RouteId: null,
        WarehouseId: null,
        CustomerId: null,
        PriceListId: null,
        DocumentDate: null,
        DocumentTime: null,
        StatusId: 1,
        VehicleId: null,
        Printed: 0,
        PrintCount: 0,
        PaymentTypeId: null,
        Canceled: 0,
        PaymentPeriodId: null,
        CurrencyId: null,
        NetTotal: 0,
        TotalVat: 0,
        TotalItemDiscount: 0,
        TotalOtherDiscount: 0,
        TotalDiscount: 0,
        TerminalOrPc: 'P',
        RecvLocationId: null,
        InvoiceLines: [],
        ConversionCounter: 0,
        IsManuelClosure: 0,
        IsDbs: 0,
        IsProforma: 0,
        IsContractFocInvoice: 0,
        IsEndorsementReturn: 0,
        IsValid: 0,
        EDocumentUrl: null,
        IsPreprintedDocument: null,
        IsPrintedDispatch: 0,
        IsManuelTransaction: 0,
        IsMatched: 0,
        InvoiceLogisticCompanies: [],
        PrintedDispatchNumber: null
      },
      routeName1: 'CommonApi',
      selectedCustomer: null,
      documentDate: null,
      selectedPrice: {},
      selectedCurrency: {},
      priceListItem: {},
      selectedInvoiceLine: {
        selectedItem: null,
        quantity: null,
        price: null,
        grossTotal: null,
        netTotal: null,
        stock: null,
        vatRate: null,
        totalVat: null,
        isUpdated: false,
        invoiceId: null
      },
      selectedIndex: null,
      selectedRepresentative: null,
      selectedRoute: null,
      selectedWarehouse: null,
      selectedVehicle: null,
      currentPage: 1,
      selectedEDocumentStatus: null,
      selectedInvoiceLogisticCompany: {
        companyName: null,
        cityId: null,
        cityName: null,
        districtId: null,
        districtName: null,
        taxNumber: null
      },
      selectedBranch: {},
      address: {},
      selectedDeliveryRepresentative: null,
      selectedStatus: null,
      selectedRefDocumentType: null,
      products: []
    }
  },
  computed: {
    ...mapState(['representatives', 'routes', 'warehouses', 'customers', 'priceList', 'vehicles', 'currencies', 'orderStatusList', 'items', 'priceListItems', 'stocks', 'eDocumentStatus'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.getData().then(() => {
        if (this.rowData.Printed === 1) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.order.eDocumentStatusNotUpdated') })
          setTimeout(() => {
            this.$router.push({ name: 'DispatchRefDocument' })
          }, 2000)
        }
        this.setData()
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextOrder/api/OrderStatus/Search', name: 'orderStatusList'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'representatives'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextWarehouse/api/Warehouse/Search', name: 'warehouses'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCommonApi/api/EDocumentStatus/Search', name: 'eDocumentStatus'})
      this.$api.post({RecordId: this.$store.state.BranchId}, 'Branch', 'Branch/Get').then((response) => {
        this.selectedBranch = response && response.Model ? response.Model : {}
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
        loading(false)
      })
    },
    searchPriceList () {
      if (!this.selectedCustomer || !this.form.DocumentDate || !this.selectedCustomer.PriceListCategoryId) {
        return false
      }
      let model = {
        PriceListCategoryIds: [this.selectedCustomer.PriceListCategoryId],
        EndDate: {
          BeginValue: this.form.DocumentDate
        }
      }
      this.searchItemsByModel('VisionNextFinance/api/PriceList/Search', 'priceList', model, 1).then(() => {
        if (this.priceList && this.priceList.length > 0) {
          this.selectedPrice = this.priceList[0]
          this.form.PriceListId = this.priceList[0].RecordId
        } else {
          this.selectedPrice = {}
          this.form.PriceListId = null
        }
      })
    },
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.form = rowData
        this.documentDate = rowData.DocumentDate
        this.selectedCustomer = this.convertLookupValueToSearchValue(rowData.Customer)
        this.$api.post({RecordId: rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          if (response.Model) {
            this.selectedCustomer = response.Model
          }
        })
        this.selectedPrice = this.convertLookupValueToSearchValue(rowData.PriceList)
        this.selectedRepresentative = this.convertLookupValueToSearchValue(rowData.Representative)
        this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
        this.selectedWarehouse = this.convertLookupValueToSearchValue(rowData.Warehouse)
        this.selectedVehicle = this.convertLookupValueToSearchValue(rowData.Vehicle)
        this.selectedEDocumentStatus = this.convertLookupValueToSearchValue(rowData.EDocumentStatus)
        this.selectedDeliveryRepresentative = this.convertLookupValueToSearchValue(rowData.DeliveryRepresentative)
        this.selectedRefDocumentType = rowData.RefDocumentType
        this.form.InvoiceKindId = 0
        this.form.DocumentClassId = 0
        this.form.PaymentTypeId = 0
        this.form.PaymentPeriodId = 0
        this.form.StatusId = this.form.StatusId ? this.form.StatusId : 1
        if (this.selectedRefDocumentType && this.selectedRefDocumentType.Code) {
          switch (this.selectedRefDocumentType.Code) {
            case 'WarehouseMovement':
              this.products = rowData.WarehouseMovementItems ? rowData.WarehouseMovementItems : []
              break
            case 'VanLoading':
              this.products = rowData.VanLoadingItems ? rowData.VanLoadingItems : []
              break
          }
        }
        if (this.orderStatusList && this.orderStatusList.length > 0) {
          this.selectedStatus = this.orderStatusList.find(x => x.RecordId === this.form.StatusId)
        }
        if (this.form.InvoiceLines) {
          this.form.InvoiceLines.map(item => {
            item.RecordState = 3
            return item
          })
        }
        if (this.form.InvoiceLogisticCompanies) {
          this.form.InvoiceLogisticCompanies.map(item => {
            item.RecordState = 3
            return item
          })
        } else {
          this.form.InvoiceLogisticCompanies = []
        }
        if (!this.form.ActualDeliveryTime) {
          let time = new Date().toLocaleTimeString()
          this.form.ActualDeliveryTime = time
        }
      }
    },
    addInvoiceLogisticCompany () {
      this.$v.selectedInvoiceLogisticCompany.$touch()
      if (this.$v.selectedInvoiceLogisticCompany.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.InvoiceLogisticCompanies.filter(i => i.CompanyName === this.selectedInvoiceLogisticCompany.companyName &&
      i.TaxNumber === this.selectedInvoiceLogisticCompany.taxNumber && i.CityId === this.selectedInvoiceLogisticCompany.cityId &&
      i.DistrictId === this.selectedInvoiceLogisticCompany.districtId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let filteredItems = this.form.InvoiceLogisticCompanies.filter(i => i.CompanyName === this.selectedInvoiceLogisticCompany.companyName &&
      i.TaxNumber === this.selectedInvoiceLogisticCompany.taxNumber && i.CityId === this.selectedInvoiceLogisticCompany.cityId &&
      i.DistrictId === this.selectedInvoiceLogisticCompany.districtId && i.RecordState === 4)
      if (filteredItems && filteredItems.length > 0) {
        this.form.InvoiceLogisticCompanies[this.form.InvoiceLogisticCompanies.indexOf(filteredItems[0])].RecordState = 3
        return
      }
      let logisticCompany = {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: this.selectedInvoiceLogisticCompany.RecordState ? this.selectedInvoiceLogisticCompany.RecordState : 2,
        RecordId: this.selectedInvoiceLogisticCompany.RecordId,
        CompanyName: this.selectedInvoiceLogisticCompany.companyName,
        TaxNumber: this.selectedInvoiceLogisticCompany.taxNumber,
        CityId: this.selectedInvoiceLogisticCompany.cityId,
        DistrictId: this.selectedInvoiceLogisticCompany.districtId,
        CityName: this.selectedInvoiceLogisticCompany.cityName,
        DistrictName: this.selectedInvoiceLogisticCompany.districtName
      }
      this.form.InvoiceLogisticCompanies.push(logisticCompany)
      this.selectedInvoiceLogisticCompany = {}
      this.address = {}
      this.$v.selectedInvoiceLogisticCompany.$reset()
    },
    removeInvoiceLogisticCompany (item) {
      if (item.RecordId) {
        this.form.InvoiceLogisticCompanies[this.form.InvoiceLogisticCompanies.indexOf(item)].RecordState = 4
      } else {
        this.form.InvoiceLogisticCompanies.splice(this.form.InvoiceLogisticCompanies.indexOf(item), 1)
      }
      this.$forceUpdate()
    },
    save () {
      this.$v.form.$touch()
      console.log(this.$v.form)
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        let actualDate = new Date(this.form.ActualDeliveryDate).setHours(0, 0, 0, 0)
        let documentDate = new Date(this.form.DocumentDate).setHours(0, 0, 0, 0)
        if (actualDate < documentDate || (actualDate === documentDate && this.form.ActualDeliveryTime < this.form.DocumentTime)) {
          this.$toasted.show(this.$t('insert.order.actualDeliveryDateLessDocumentDate'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.updateData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      selectedInvoiceLine: {
        selectedItem: {
          required
        },
        quantity: {
          required,
          minValue: minValue(1)
        },
        price: {
          required
        },
        grossTotal: {
          required
        },
        netTotal: {
          required
        },
        vatRate: {
          required
        },
        totalVat: {
          required
        },
        stock: {
          required
        }
      },
      selectedInvoiceLogisticCompany: {
        companyName: {
          required
        },
        cityId: {
          required
        },
        districtId: {
          required
        },
        taxNumber: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        }
      }
    }
  },
  watch: {
    selectedCustomer (e) {
      if (e) {
        this.searchPriceList()
        if (e.DefaultLocationId) {
          this.form.RecvLocationId = e.DefaultLocationId
        }
      }
    },
    documentDate (e) {
      if (e) {
        this.form.DocumentDate = e
        this.searchPriceList()
      }
    },
    currencies (e) {
      if (e && e.length > 0) {
        this.selectedCurrency = e[0]
        this.form.CurrencyId = e[0].RecordId
      }
    },
    address (e) {
      if (e) {
        this.selectedInvoiceLogisticCompany.cityId = e.CityId
        this.selectedInvoiceLogisticCompany.cityName = e.CityName
        this.selectedInvoiceLogisticCompany.districtId = e.DistrictId
        this.selectedInvoiceLogisticCompany.districtName = e.DistrictName
      }
    }
  }
}
</script>
