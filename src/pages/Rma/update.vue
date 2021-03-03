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
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select v-model="customerName" :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <v-select v-model="warehouseName" :options="warehouses"  @search="searchWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select v-model="representativeName" :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <v-select
                :options="lookup.RMA_STATUS"
                @input="selectedType('RmaStatusId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveEmployeeId" :error="$v.form.ApproveEmployeeId">
              <v-select :options="employees"  @search="searchEmployee" @input="selectedSearchType('ApproveEmployeeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveNumber" :error="$v.form.ApproveNumber">
              <b-form-input type="text" v-model="form.ApproveNumber" :readonly="insertReadonly.ApproveNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <v-select
                :options="lookup.RETURN_TYPE"
                @input="selectedType('RmaTypeId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveDate" :error="$v.form.ApproveDate">
              <b-form-datepicker v-model="form.ApproveDate" />
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <b-form-datepicker v-model="form.PriceDate" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaDate" :error="$v.form.RmaDate">
              <b-form-datepicker v-model="form.RmaDate" />
            </NextFormGroup>
            <NextFormGroup item-key="GrvNumber" :error="$v.form.GrvNumber">
              <b-form-input type="text" v-model="form.GrvNumber" :readonly="insertReadonly.GrvNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <v-select :options="routes"  @search="searchRoute" @input="selectedSearchType('RouteId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <v-select :options="rmaReasons"  @search="searchRmaReason" @input="selectedSearchType('RmaReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
          </b-row>
          <hr />
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.ItemName')">
              <v-select :options="items" v-model="rmaLine.Item.Description1" @search="searchItem" @input="selectedItem" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Item')">
              <b-form-input type="text" v-model="rmaLine.Item.Code" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Quantity')" :error="$v.rmaLine.Quantity">
              <b-form-input type="text" v-model="rmaLine.Quantity"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.RMA.ItemName')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.Item')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.Quantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rmaLines" :key="i">
                    <b-td>{{w.Item.Description1}}</b-td>
                    <b-td>{{w.Item.Code}}</b-td>
                    <b-td>{{w.Quantity}}</b-td>
                    <b-td class="text-center"><i @click="removeItems(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: null,
        WarehouseId: null,
        RepresentativeId: null,
        RmaStatusId: null,
        ApproveEmployeeId: null,
        ApproveNumber: null,
        RmaTypeId: null,
        ApproveDate: null,
        PriceDate: null,
        Genexp1: null,
        RmaDate: null,
        GrvNumber: null,
        RouteId: null,
        RmaReasonId: null,
        RmaLines: []
      },
      rmaLine: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        RmaReasonId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Price: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      },
      rmaLines: [],
      customerName: null,
      routeName1: 'Rma'
    }
  },
  computed: {
    ...mapState(['customers', 'employees', 'warehouses', 'routes', 'rmaReasons', 'items'])
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
  },
  methods: {
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/Search', 'employees', model).then(res => {
        loading(false)
      })
    },
    searchWarehouse (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextWarehouse/api/Warehouse/Search', 'warehouses', model).then(res => {
        loading(false)
      })
    },
    searchRoute (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRoute/api/Route/Search', 'routes', model).then(res => {
        loading(false)
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchRmaReason (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRma/api/RmaReason/Search', 'rmaReasons', model).then(res => {
        loading(false)
      })
    },
    searchItem (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextItem/api/Item/Search', 'items', model).then(res => {
        loading(false)
      })
    },
    addItems () {
      this.$v.rmaLine.$touch()
      if (this.$v.rmaLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.rmaLines.filter(i => i.Item.RecordId === this.rmaLine.Item.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.rmaLines.length > 0) {
        this.rmaLine.LineNumber = (this.rmaLines[(this.rmaLines.length) - 1].LineNumber) + 1
      }
      this.initRmaLine(this.rmaLine.Item)
      this.rmaLines.push(this.rmaLine)
      this.initNullRmaLine()
      this.$v.rmaLine.$reset()
    },
    removeItems (item) {
      this.rmaLines.splice(this.rmaLines.indexOf(item), 1)
    },
    initRmaLine (value) {
      this.rmaLine.UnitSetId = value.UnitSetId
      this.rmaLine.UnitId = value.UnitId
      this.rmaLine.RmaQuantity1 = this.rmaLine.Quantity
      this.rmaLine.RmaUnit1Id = this.rmaLine.UnitId
    },
    initNullRmaLine () {
      this.rmaLine = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        RmaReasonId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Price: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      }
    },
    selectedItem (e) {
      if (e) {
        this.rmaLine.Item = e
      } else {
        this.rmaLine.Item = {
          Description1: null,
          Code: null,
          RecordId: null
        }
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.RmaLines = this.rmaLines
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      // e.RmaLines.map(item => {
      //   this.rmaLines.push({
      //     supplierBranch: {
      //       RecordId: item.SupplierBranchId,
      //       BranchCommercialTitle: item.SupplierBranch.Label
      //     },
      //     SupplierCustomerId: item.SupplierCustomerId,
      //     WarehouseId: item.WarehouseId,
      //     CompanyId: item.CompanyId,
      //     BranchId: item.BranchId,
      //     CreatedUser: item.CreatedUser,
      //     ModifiedUser: item.ModifiedUser,
      //     ModifiedDateTime: item.ModifiedDateTime,
      //     Deleted: item.Deleted,
      //     System: item.System,
      //     purchaseWarehouse: {
      //       RecordId: item.PurchaseWarehouseId,
      //       Description1: item.PurchaseWarehouse ? item.PurchaseWarehouse.Label : ''
      //     },
      //     returnWarehouse: {
      //       RecordId: item.ReturnWarehouseId,
      //       Description1: item.ReturnWarehouse ? item.ReturnWarehouse.Label : ''
      //     },
      //     RecordId: item.RecordId,
      //     RecordState: item.RecordState
      //   })
      // })

      // this.form.VehicleId = e.VehicleId
      // if (e.Vehicle) {
      //   this.vehicleName = e.Vehicle.Label
      // }
      // if (e.WarehouseType) {
      //   this.selectedWarehouseType(e.WarehouseType)
      //   if (e.WarehouseTypeId === 76506193) {
      //     this.form.Vehicle = e.RecordId
      //   }
      // }

      // this.address = {
      //   CityId: e.CityId,
      //   DistrictId: e.DistrictId,
      //   Address: e.Address
      // }
      // if (e.StatusId === 1) {
      //   this.dataStatus = true
      // } else {
      //   this.dataStatus = false
      // }

      this.form.StatusId = e.StatusId == null ? 0 : e.StatusId
      this.form.Deleted = e.Deleted
      this.form.System = e.System
      this.form.RecordState = e.RecordState == null ? 0 : e.RecordState
      this.form.CustomerId = e.CustomerId
      if (e.Customer) {
        this.customerName = e.Customer.Label
      }
      // form: {
      //   Deleted: 0,
      //   System: 0,
      //   RecordState: 2,
      //   CustomerId: null,
      //   WarehouseId: null,
      //   RepresentativeId: null,
      //   RmaStatusId: null,
      //   ApproveEmployeeId: null,
      //   ApproveNumber: null,
      //   RmaTypeId: null,
      //   ApproveDate: null,
      //   PriceDate: null,
      //   Genexp1: null,
      //   RmaDate: null,
      //   GrvNumber: null,
      //   RouteId: null,
      //   RmaReasonId: null,
      //   RmaLines: []
      // },
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules,
      rmaLine: {
        Quantity: {
          required
        }
      }
    }
  }
}
</script>
