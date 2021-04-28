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
        <b-tab :title="$t('get.RMA.General')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select v-model="customer" :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                 <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <v-select v-model="warehouse" :options="warehouses"  @search="searchWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select v-model="representative" :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <v-select
                :options="lookup.RMA_STATUS"
                v-model="rmaStatus"
                @input="selectedType('RmaStatusId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveEmployeeId" :error="$v.form.ApproveEmployeeId">
              <v-select v-model="approveEmloyee" :options="employees"  @search="searchEmployee" @input="selectedSearchType('ApproveEmployeeId', $event)" label="Description1">
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
                v-model="rmaType"
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
              <v-select :options="routes" v-model="route" @search="searchRoute" @input="selectedSearchType('RouteId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <v-select :options="rmaReasons" v-model="rmaReason" @input="selectedSearchType('RmaReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RMA.Items')">
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')">
              <v-select :options="items" v-model="rmaLine.Item.Code" @search="searchItem" @input="selectedItem" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')">
              <b-form-input type="text" v-model="rmaLine.Item.Description1" readonly/>
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
                  <b-th><span>{{$t('insert.RMA.Item')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.ItemName')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.Quantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rmaLines" :key="i">
                    <b-td>{{w.Item.Code}}</b-td>
                    <b-td>{{w.Item.Description1}}</b-td>
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
        RecordId: null,
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
        RecordId: null,
        Price: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null,
          ItemId: null
        }
      },
      rmaLines: [],
      customer: null,
      warehouse: null,
      representative: null,
      approveEmloyee: null,
      rmaStatus: null,
      rmaType: null,
      route: null,
      rmaReason: null,
      routeName1: 'Rma'
    }
  },
  computed: {
    ...mapState(['customers', 'employees', 'warehouses', 'routes', 'rmaReasons', 'items'])
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
      this.getInsertPage()
    })
  },
  methods: {
    getInsertPage () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRma/api/RmaReason/Search', name: 'rmaReasons'})
    },
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/AutoCompleteSearch', 'employees', model).then(res => {
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
      this.searchItemsByModel('VisionNextWarehouse/api/Warehouse/AutoCompleteSearch', 'warehouses', model).then(res => {
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
      this.searchItemsByModel('VisionNextRoute/api/Route/AutoCompleteSearch', 'routes', model).then(res => {
        loading(false)
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
    searchItem (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextItem/api/Item/AutoCompleteSearch',
        name: 'items',
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ]
      }).then(res => {
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
      this.rmaLines[this.rmaLines.indexOf(item)].RecordState = 4
    },
    initRmaLine (value) {
      this.rmaLine.UnitSetId = value.UnitSetId
      this.rmaLine.UnitId = value.UnitId
      this.rmaLine.ItemId = value.RecordId
      this.rmaLine.RmaQuantity1 = this.rmaLine.Quantity
      this.rmaLine.RmaUnit1Id = this.rmaLine.UnitId
      this.rmaLine.RmaReasonId = this.form.RmaReasonId
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
      console.log(e)
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
        this.form.RmaLines = this.rmaLines.map((item) => {
          var newItem = {
            Deleted: item.Deleted,
            System: item.System,
            RecordState: item.RecordState,
            StatusId: item.StatusId,
            RecordId: item.RecordId,
            LineNumber: item.LineNumber,
            ItemId: item.ItemId,
            RmaReasonId: item.RmaReasonId,
            UnitSetId: item.UnitSetId,
            UnitId: item.UnitId,
            ConvFact1: item.ConvFact1,
            ConvFact2: item.ConvFact2,
            Quantity: item.Quantity,
            RmaQuantity1: item.RmaQuantity1,
            RmaUnit1Id: item.RmaUnit1Id,
            Price: item.Price,
            Item: {
              Description1: item.Item.Description1,
              Code: item.Item.Code,
              RecordId: item.Item.RecordId
            },
            RmaId: item.RmaId
          }
          return newItem
        })
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e) {
        e.RmaLines.map(item => {
          if (item.Item) {
            this.rmaLines.push({
              Item: {
                Description1: item.Item.Label,
                Code: item.Item.Code,
                RecordId: item.Item.DecimalValue
              },
              Deleted: item.Deleted,
              System: item.System,
              RecordState: 3,
              StatusId: item.StatusId,
              LineNumber: item.LineNumber,
              ItemId: item.ItemId,
              RmaReasonId: item.RmaReasonId,
              ConvFact1: item.ConvFact1,
              ConvFact2: item.ConvFact2,
              Quantity: item.Quantity,
              Price: item.Price,
              UnitSetId: item.UnitSetId,
              UnitId: item.UnitId,
              RmaQuantity1: item.Quantity,
              RmaUnit1Id: item.UnitId,
              RecordId: item.RecordId,
              RmaId: item.RmaId
            })
          }
        })
        this.rmaLines.sort(function (a, b) {
          return a.LineNumber - b.LineNumber
        })
        this.form = e
        this.customer = this.convertLookupValueToSearchValue(e.Customer)
        this.warehouse = this.convertLookupValueToSearchValue(e.Warehouse)
        this.representative = this.convertLookupValueToSearchValue(e.Representative)
        this.approveEmloyee = this.convertLookupValueToSearchValue(e.ApproveEmployee)
        this.route = this.convertLookupValueToSearchValue(e.Route)
        this.rmaReason = this.convertLookupValueToSearchValue(e.RmaReason)
        this.rmaStatus = e.RmaStatus
        this.rmaType = e.RmaType
      }
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
