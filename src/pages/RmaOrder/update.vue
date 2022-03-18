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
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.RmaOrder.General')" active>
          <b-row>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <NextDropdown
                v-model="warehouse"
                @input="selectedSearchType('WarehouseId', $event)"
                :disabled="disabledFields || insertReadonly.WarehouseId"
                url="VisionNextWarehouse/api/Warehouse/Search"
                :dynamic-and-condition="{ IsVehicle: 0, IsVirtualWarehouse: 0, StatusIds: [1] }"
              />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                v-model="customer"
                @input="selectedSearchType('CustomerId', $event)"
                :source="customers"
                label="Label"
                :disabled="!customerValid || disabledFields || insertReadonly.CustomerId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                v-model="representative"
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="disabledFields || insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="disabledFields || insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaOrderDate" :error="$v.form.RmaOrderDate">
              <NextDatePicker v-model="form.RmaOrderDate" :disabled="disabledFields || insertReadonly.RmaOrderDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <NextDropdown :disabled="insertReadonly.RmaTypeId" v-model="rmaType" lookup-key="RETURN_TYPE" get-lookup @input="selectedType('RmaTypeId', $event)"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <NextDatePicker v-model="form.PriceDate" :disabled="disabledFields || insertReadonly.PriceDate" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <NextDropdown
                v-model="rmaReason"
                @input="selectedSearchType('RmaReasonId', $event)"
                :disabled="disabledFields || insertReadonly.RmaReasonId"
                url="VisionNextRma/api/RmaReason/Search"
                label="Description1"
              />
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <NextDropdown
                v-model="rmaStatus"
                :disabled="disabledFields || insertReadonly.RmaStatusId"
                lookup-key="RMA_STATUS" get-lookup
                @input="selectedType('RmaStatusId', $event)"></NextDropdown>
            </NextFormGroup>
          </b-row>
          <hr />
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')" :required="true" :error="$v.rmaOrderLine.item">
              <NextDropdown
                v-model="rmaOrderLine.item"
                url="VisionNextItem/api/Item/AutoCompleteSearch" searchable
                :dynamic-and-condition="{ StatusIds: [1], CardTypeIds: [1, 2, 8] }"
                or-condition-fields="Description1,Code"
                :custom-option="true"
                @input="selectedItem"
                label="Code"
                :disabled="disabledFields"
              />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')" md="2" lg="2">
              <NextInput type="text" v-model="rmaOrderLine.Item.Description1" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Quantity')" :required="true" :error="$v.rmaOrderLine.Quantity"  md="3" lg="3">
              <NextInput type="number" v-model="rmaOrderLine.Quantity" :disabled="disabledFields" @keypress="onlyForCurrencyDot($event)" min="1" />
            </NextFormGroup>
            <b-col md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm" :disabled="disabledFields"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="2">
              <NextMultipleSelection
                name="RmaOrderMultipleItem"
                v-model="rmaOrderLines"
                :dynamic-and-condition="{
                  ToWarehouseIds: form.WarehouseId ? [form.WarehouseId] : null,
                  FromWarehouseIds: form.WarehouseId ? [form.WarehouseId] : null,
                }"
                :disabled-button="!form.WarehouseId"
                :hidden-values="hiddenValues"
                :initial-values-func="initialValue"
                :filter-func="(row) => row.Quantity > 0"
                :order-by-columns="[{column: 'SortOrder', orderByType: 0}]"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <NextExportDetail
                url="VisionNextRma/api/RmaOrder/ExcelExportItems"
                :record-id="form.RecordId"
                record-key="rmaOrderId"
                :file-name="$t('get.RMA.Items')">
              </NextExportDetail>
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
                    <b-td v-if="!disabledFields" class="text-center">
                      <b-button :title="$t('list.delete')" @click="removeItems(w)" class="btn mr-2 btn-danger btn-sm">
                        <i class="far fa-trash-alt"></i>
                      </b-button>
                    </b-td>
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
      rmaStatus: null,
      rmaType: null,
      rmaReason: null,
      routeName1: 'Rma',
      disabledFields: false,
      firstSet: true,
      hiddenValues: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'ItemId'
        }
      ],
      initialValue: (values) => {
        values.map(value => {
          value.Code = value.Item ? value.Item.Code : value.Code
          value.Description1 = value.Item ? value.Item.Description1 : value.Description1

          return value
        })

        return values
      }
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
  },
  methods: {
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
        },
        item: {
          required
        }
      }
    }
  },
  watch: {
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
