<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'RmaOrder' }">
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
        <b-tab :title="$t('get.RmaOrder.General')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown v-model="customer" :source="customers" @input="selectedType('CustomerId', $event)" label="Label" :disabled='!customerValid || disabledFields'></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <v-select v-model="warehouse" :options="warehouses" @input="selectedSearchType('WarehouseId', $event)" label="Description1" :filterable="true" :disabled="disabledFields">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                v-model="representative"
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="disabledFields"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="disabledFields" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaOrderDate" :error="$v.form.RmaOrderDate">
              <NextDatePicker v-model="form.RmaOrderDate" :disabled="disabledFields"/>
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <NextDropdown  v-model="rmaType" lookup-key="RETURN_TYPE" :disabled="disabledFields" get-lookup @input="selectedType('RmaTypeId', $event)"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <NextDatePicker v-model="form.PriceDate" :disabled="disabledFields" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <NextDropdown
                v-model="rmaReason"
                @input="selectedSearchType('RmaReasonId', $event)"
                :disabled="disabledFields"
                url="VisionNextRma/api/RmaReason/Search"
                label="Description1"
              />
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <v-select
                :options="lookup.RMA_STATUS"
                v-model="rmaStatus"
                @input="selectedType('RmaStatusId', $event)"
                label="Label"
                :disabled="disabledFields"
              />
            </NextFormGroup>
          </b-row>
          <hr />
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')">
              <v-select :options="items" v-model="rmaOrderLine.Item.Code" @search="searchItem" @input="selectedItem" label="Code" :filterable="false" :disabled="disabledFields">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')" md="2" lg="2">
              <NextInput type="text" v-model="rmaOrderLine.Item.Description1" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Quantity')" :error="$v.rmaOrderLine.Quantity"  md="3" lg="3">
              <NextInput type="number" v-model="rmaOrderLine.Quantity" :disabled="disabledFields" @keypress="onlyForCurrencyDot($event)" min="1" />
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm" :disabled="disabledFields"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
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
                  <b-th v-if="!disabledFields"><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rmaOrderLines ? rmaOrderLines.filter(i => i.RecordState !== 4) : []" :key="i">
                    <b-td>{{w.Item.Code}}</b-td>
                    <b-td>{{w.Item.Description1}}</b-td>
                    <b-td>{{w.Quantity}}</b-td>
                    <b-td v-if="!disabledFields" class="text-center"><i @click="removeItems(w)" class="far fa-trash-alt text-danger"></i></b-td>
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
        StatusId: null,
        CustomerId: null,
        WarehouseId: null,
        RepresentativeId: null,
        Genexp1: null,
        RmaOrderDate: null,
        RmaTypeId: null,
        PriceDate: null,
        RmaReasonId: null,
        RmaStatusId: null,
        RmaOrderLines: []
      },
      rmaOrderLine: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null,
          ItemId: null
        }
      },
      rmaOrderLines: [],
      customerValid: false,
      warehouse: {},
      customers: [],
      customer: {},
      representative: null,
      approveEmloyee: null,
      rmaStatus: null,
      rmaType: null,
      rmaReason: null,
      routeName1: 'Rma',
      disabledFields: false,
      firstSet: true
    }
  },
  computed: {
    ...mapState(['warehouses', 'items'])
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
      this.getInsertPage()
    })
  },
  methods: {
    getInsertPage () {
      this.getWarehouses()
    },
    getWarehouses () {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextWarehouse/api/Warehouse/Search',
        name: 'warehouses',
        andConditionModel: {
          IsVehicle: 0,
          IsVirtualWarehouse: 0,
          StatusIds: [1]
        }
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
        ],
        andConditionModel: {
          StatusIds: [1],
          CardTypeIds: [1, 2, 8]
        }
      }).then(res => {
        loading(false)
      })
    },
    addItems () {
      this.$v.rmaOrderLine.$touch()
      if (this.$v.rmaOrderLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.rmaOrderLines.filter(i => i.Item.RecordId === this.rmaOrderLine.Item.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.rmaOrderLines.length > 0) {
        this.rmaOrderLine.LineNumber = (this.rmaOrderLines[(this.rmaOrderLines.length) - 1].LineNumber) + 1
      }
      this.initRmaOrderLine(this.rmaOrderLine.Item)
      this.rmaOrderLines.push(this.rmaOrderLine)
      this.initNullRmaOrderLine()
      this.$v.rmaOrderLine.$reset()
    },
    removeItems (item) {
      if (item.RecordId) {
        this.rmaOrderLines[this.rmaOrderLines.indexOf(item)].RecordState = 4
      } else {
        this.rmaOrderLines.splice(this.rmaOrderLines.indexOf(item), 1)
      }
    },
    initRmaOrderLine (value) {
      this.rmaOrderLine.ItemId = value.RecordId
      this.rmaOrderLine.UnitSetId = value.UnitSetId
      this.rmaOrderLine.UnitId = value.UnitId
      this.rmaOrderLine.RmaQuantity1 = this.rmaOrderLine.Quantity
      this.rmaOrderLine.RmaUnit1Id = this.rmaOrderLine.UnitId
    },
    initNullRmaOrderLine () {
      this.rmaOrderLine = {
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
        this.rmaOrderLine.Item = e
      } else {
        this.rmaOrderLine.Item = {
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
        this.form.RmaOrderLines = this.rmaOrderLines.map((item) => {
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
            Quantity: item.Quantity.toString().replace(',', '.'),
            RmaQuantity1: item.RmaQuantity1,
            RmaUnit1Id: item.RmaUnit1Id,
            RmaOrderId: item.RmaOrderId,
            Price: item.Price,
            Item: {
              Description1: item.Item.Description1,
              Code: item.Item.Code,
              RecordId: item.Item.RecordId
            }
          }
          return newItem
        })
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e.RmaStatus && (e.RmaStatus.Code === 'TMM' || e.RmaStatus.Code === 'IPT')) {
        this.disabledFields = true
        document.getElementById('submitButton').disabled = true
      }
      e.RmaOrderLines.map(item => {
        if (item.Item) {
          this.rmaOrderLines.push({
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
            RmaOrderId: item.RmaOrderId
          })
        }
      })
      this.rmaOrderLines.sort(function (a, b) {
        return a.LineNumber - b.LineNumber
      })
      this.form = e
      this.warehouse = this.convertLookupValueToSearchValue(e.Warehouse)
      this.representative = this.convertLookupValueToSearchValue(e.Representative)
      this.approveEmloyee = this.convertLookupValueToSearchValue(e.ApproveEmployee)
      this.rmaReason = this.convertLookupValueToSearchValue(e.RmaReason)
      this.rmaStatus = e.RmaStatus
      this.rmaType = e.RmaType
      this.customer = e.Customer
    }
  },
  validations () {
    return {
      form: this.insertRules,
      rmaOrderLine: {
        Quantity: {
          required
        }
      }
    }
  },
  watch: {
    lookup (e) {
      if (e.RMA_STATUS) {
        this.rmaStatusLabel = e.RMA_STATUS[0].Label
      }
    },
    warehouse (e) {
      this.customerValid = false
      this.customers = []
      if (this.firstSet) {
        if (this.rowData && this.rowData.Customer) {
          this.customer = this.rowData.Customer
          this.firstSet = false
        }
      } else {
        this.customer = null
        this.form.CustomerId = null
      }
      this.$api.post({RecordId: e.RecordId}, 'Warehouse', 'Warehouse/Get').then((res) => {
        if (res.Model.WarehouseSuppliers && res.Model.WarehouseSuppliers.length) {
          let filteredArr = res.Model.WarehouseSuppliers.filter(w => w.ReturnWarehouseId !== null)
          let length = filteredArr.length
          if (length === 0) {
            this.$toasted.show(this.$t('insert.RmaOrder.WarehouseError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
          for (let a = 0; a < length; a++) {
            this.customers.push(filteredArr[a].SupplierCustomer)
          }
          this.customerValid = true
        } else {
          this.$toasted.show(this.$t('insert.RmaOrder.WarehouseError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    }
  }
}
</script>
