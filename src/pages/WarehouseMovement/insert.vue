<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'WarehouseMovement' }">
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
          <NextFormGroup item-key="MovementNumber" :error="$v.form.MovementNumber" md="2" lg="2">
            <NextInput v-model="form.MovementNumber" type="text" :disabled="insertReadonly.MovementNumber || isItemAdded" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementDate" :error="$v.form.MovementDate" md="2" lg="2">
            <NextDatePicker v-model="form.MovementDate" :disabled="insertReadonly.MovementDate" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementTime" :error="$v.form.MovementTime" md="2" lg="2">
            <NextTimePicker v-model="form.MovementTime" :disabled="insertReadonly.MovementTime" />
          </NextFormGroup>
          <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
            <NextDropdown
              url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable
              orConditionFields="Code,Description1,Name,Surname"
              :dynamic-and-condition="{ StatusIds: [1] }"
              @input="selectedSearchType('RepresentativeId', $event)"
              :disabled="isItemAdded || insertReadonly.RepresentativeId" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementTypeId" :error="$v.form.MovementTypeId" md="2" lg="2">
            <NextDropdown
              v-model="movementType"
              url="VisionNextWarehouse/api/WarehouseMovementType/Search"
              :filter="item => filteredMovementTypes.includes(item.Code)"
              :dynamic-and-condition="{ StatusIds: [1] }"
              @input="selectedSearchType('MovementTypeId', $event); selectStockStatus($event);"
              :disabled="isItemAdded || insertReadonly.MovementTypeId" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="2" lg="2">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="isItemAdded || insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" active>
          <b-row>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="3" lg="3">
              <NextDropdown
                v-model="route"
                url="VisionNextRoute/api/Route/Search"
                :dynamic-and-condition="{ StatusIds: [1] }"
                @input="selectRoute"
                :disabled="(movementType && (movementType.Code === '10' || movementType.Code === '04' || movementType.Code === '05')) || isItemAdded || insertReadonly.RouteId"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :page-count="500" />
            </NextFormGroup>
            <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId" v-if="!(movementType && (movementType.Code === '05' || movementType.Code === '01' || movementType.Code === '07' || movementType.Code === '12'))" md="3" lg="3">
              <NextDropdown
                v-model="fromWarehouse"
                @input="selectFromWarehouse($event)"
                :source="fromWarehousesAll"
                :disabled="(movementType && movementType.Code === '04') || movementType === null || isItemAdded || insertReadonly.FromWarehouseId" />
            </NextFormGroup>
            <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId" v-if="(movementType && (movementType.Code === '05' || movementType.Code === '01' || movementType.Code === '07' || movementType.Code === '12'))" md="3" lg="3">
              <NextDropdown
                v-model="fromWarehouse"
                @input="selectFromWarehouse($event)"
                :source="fromWarehouses"
                :disabled="(movementType && movementType.Code === '04') || movementType === null || isItemAdded || insertReadonly.FromWarehouseId" />
            </NextFormGroup>
            <NextFormGroup item-key="FromStatusId" :error="$v.form.FromStatusId" md="3" lg="3">
              <NextDropdown
                v-model="fromStatus"
                @input="selectFromStatus($event)"
                :dynamic-and-condition="{ StatusIds: [1] }"
                url="VisionNextStockManagement/api/StockStatus/Search?v=1"
                :disabled="(movementType && movementType.Code === '04') || movementType === null || isItemAdded || disabledStatus || insertReadonly.FromStatusId"
                v-on:all-source="setStockStatus" />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="VehicleId" :error="$v.form.VehicleId" md="3" lg="3">
              <NextDropdown
                v-model="selectedVehicle"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="1000"
                @input="selectedSearchType('VehicleId', $event)"
                url="VisionNextVehicle/api/Vehicle/Search"
                :disabled="(movementType && (movementType.Code === '10' || movementType.Code === '04' || movementType.Code === '05')) || isItemAdded || insertReadonly.VehicleId" />
            </NextFormGroup>
            <NextFormGroup item-key="ToWarehouseId" :error="$v.form.ToWarehouseId" v-if="!(movementType && (movementType.Code === '01' || movementType.Code === '07' || movementType.Code === '04'))" md="3" lg="3">
              <NextDropdown
                v-model="toWarehouse"
                :source="fromWarehousesAll"
                @input="selectToWarehouse($event)"
                :disabled="(movementType && movementType.Code === '05') || movementType === null || isItemAdded || insertReadonly.ToWarehouseId" />
            </NextFormGroup>
            <NextFormGroup item-key="ToWarehouseId" :error="$v.form.ToWarehouseId" v-if="(movementType && (movementType.Code === '01' || movementType.Code === '07' || movementType.Code === '04'))" md="3" lg="3">
              <NextDropdown
                v-model="toWarehouse"
                :source="toWarehouses"
                :dynamic-and-condition="{StatusIds: [1] } && getToWarehouseAndCondition()"
                @input="selectToWarehouse($event)"
                :disabled="(movementType && movementType.Code === '05') || movementType === null || isItemAdded || insertReadonly.ToWarehouseId" />
            </NextFormGroup>
            <NextFormGroup item-key="ToStatusId" :error="$v.form.ToStatusId" md="3" lg="3">
              <NextDropdown
                v-model="toStatus"
                :dynamic-and-condition="{ StatusIds: [1] }"
                @input="selectedSearchType('ToStatusId', $event)"
                url="VisionNextStockManagement/api/StockStatus/Search?v=2"
                :disabled="(movementType && (movementType.Code === '05' || movementType.Code === '01' || movementType.Code === '10')) || movementType === null || isItemAdded || disabledStatus" />
            </NextFormGroup>
          </b-row>
          <hr>
          <b-row>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ItemCode')" :required="true" :error="$v.warehouseMovementItems.item" md="3" lg="3">
              <NextDropdown
                searchable
                :search="searchItem"
                v-model="warehouseMovementItems.item"
                @input="selectedItem"
                :custom-option="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.FromWhStockQuantity')" md="3" lg="3">
              <NextInput type="number" v-model="warehouseMovementItems.fromWhStockQuantity" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ToWhStockQuantity')" md="3" lg="3">
              <NextInput type="number" v-model="warehouseMovementItems.toWhStockQuantity" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.PlanQuantity')" :required="true" :error="$v.warehouseMovementItems.quantity" md="3" lg="3">
              <NextInput type="number" v-model="warehouseMovementItems.quantity" @keypress="onlyForCurrencyDot($event)" min="1"/>
            </NextFormGroup>
            <b-col cols="12" md="3" lg="3" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addItem()" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
                <NextMultipleSelection
                  name="WarehouseMovementMultipleItem"
                  v-model="form.WarehouseMovementItems"
                  :disabled-button="disabledMultipleSelection"
                  :hidden-values="multipleHiddenValues"
                  :validations="multipleValidations"
                  :dynamic-and-condition="{
                    FromWarehouseIds: form.FromWarehouseId ? [form.FromWarehouseId] : null,
                    ToWarehouseIds: form.ToWarehouseId ? [form.ToWarehouseId] : null,
                    MovementType: [form.MovementTypeId],
                    FromWarehouseStatus: form.FromStatusId ? [form.FromStatusId] : null,
                    ToWarehouseStatus: form.ToStatusId ? [form.ToStatusId] : null}"
                  :filter-func="(row) => row.Quantity > 0"
                />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ItemCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.Items')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.FromWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ToWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.PlanQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.WarehouseMovementItems" :key="i">
                    <b-td>{{r.Code}}</b-td>
                    <b-td>{{r.Description1}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.ToWhStockQuantity}}</b-td>
                    <b-td>{{r.Quantity}}</b-td>
                    <b-td class="text-center">
                      <b-button :title="$t('list.edit')" @click="editItem(r)" class="btn mr-2 btn-warning btn-sm">
                        <i class="fa fa-pencil-alt"></i>
                      </b-button>
                      <b-button :title="$t('list.delete')" @click="removeItem(r)" type="button" class="btn mr-2 btn-danger btn-sm">
                        <i class="far fa-trash-alt ml-1"></i>
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
import mixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        MovementNumber: null,
        MovementDate: null,
        RepresentativeId: null,
        MovementTypeId: null,
        MovementTime: null,
        RouteId: null,
        FromWarehouseId: null,
        FromStatusId: null,
        VehicleId: null,
        ToWarehouseId: null,
        ToStatusId: null,
        Description1: null,
        IsPrinted: 0,
        Canceled: 0,
        StatusId: 1,
        Deleted: 0,
        RecordState: 2,
        WarehouseMovementItems: []
      },
      routeName1: 'Warehouse',
      filteredMovementTypes: ['01', '04', '05', '07', '10', '12'],
      warehouseMovementItems: {
        item: null,
        fromWhStockQuantity: null,
        toWhStockQuantity: null,
        quantity: null
      },
      maxPlanQuantity: null,
      fromStatus: null,
      toStatus: null,
      movementType: null,
      toWarehouse: null,
      selectedVehicle: null,
      route: null,
      fromWarehouse: null,
      isItemAdded: false,
      disabledStatus: false,
      stockStatus: [],
      selectedIndex: null,
      toWarehouses: [],
      fromWarehouses: [],
      fromWarehousesAll: [],
      multipleHiddenValues: [
        {
          mainProperty: 'FromQuantity',
          targetProperty: 'FromWhStockQuantity'
        },
        {
          mainProperty: 'ToQuantity',
          targetProperty: 'ToWhStockQuantity'
        }
      ],
      multipleValidations: [
        {
          mainProperty: 'Quantity',
          validation: (value, data) => {
            if (value > data.FromQuantity) {
              this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.BranchStockTransfer.errorPlanQuantity') })
              return false
            }

            return true
          }
        }
      ]
    }
  },
  mounted () {
    this.createManualCode('MovementNumber')
    let currentDate = new Date()
    this.form.MovementDate = currentDate.toISOString().slice(0, 10)
    this.form.MovementTime = currentDate.toTimeString().slice(0, 5)
    this.getToWarehouses()
    this.getFromWarehouses()
    this.getToWarehousesAll()
  },
  computed: {
    disabledMultipleSelection () {
      if (this.movementType) {
        switch (this.movementType.Code) {
          case '01':
          case '10':
            return !this.form.FromWarehouseId || !this.form.ToWarehouseId || !this.form.FromStatusId
          case '04':
            return !this.form.ToWarehouseId || !this.form.ToStatusId
          case '05':
            return !this.form.FromWarehouseId || !this.form.FromStatusId
          case '07':
          case '12':
            return !this.form.FromWarehouseId || !this.form.FromStatusId || !this.form.ToWarehouseId || !this.form.ToStatusId
        }
      }

      return true
    }
  },
  methods: {
    setStockStatus (value) {
      this.stockStatus = value
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label !== 'RepresentativeId' && this.form.WarehouseMovementItems.length > 0) {
          if (confirm(this.$t('insert.BranchStockTransfer.changeQuestion'))) {
            this.form.WarehouseMovementItems = []
            this.WarehouseMovementItems = []
          } else {
            return false
          }
        }
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    async searchItem (search) {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.cleanItem()
        Promise.resolve([])
      }
      let model = {
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ],
        andConditionModel: {
          StatusIds: [1], CardTypeIds: [1, 2, 8]
        }
      }
      return this.$api.postByUrl(model, 'VisionNextItem/api/Item/AutoCompleteSearch').then((response) => {
        if (response && response.ListModel) {
          return response.ListModel.BaseModels
        }
      })
    },
    selectedItem (e) {
      if (e) {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
          this.cleanItem()
          return false
        }
        if (this.form.FromWarehouseId && this.form.FromStatusId) {
          let request = {
            andConditionModel: {
              BranchIds: [localStorage.getItem('BranchId')],
              WarehouseIds: [this.form.FromWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.FromStatusId]
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/WarehouseStock/Search?v=1').then((response) => {
            let fromWarehouseStocks = response.ListModel.BaseModels
            if (fromWarehouseStocks.length > 0) {
              this.maxPlanQuantity = fromWarehouseStocks[0].Quantity
              this.warehouseMovementItems.fromWhStockQuantity = fromWarehouseStocks[0].Quantity
            } else {
              this.maxPlanQuantity = 0
              this.warehouseMovementItems.fromWhStockQuantity = 0
            }
          })
        } else {
          this.maxPlanQuantity = 0
          this.warehouseMovementItems.fromWhStockQuantity = 0
        }

        if (this.form.ToWarehouseId && this.form.ToStatusId) {
          let request = {
            andConditionModel: {
              BranchIds: [localStorage.getItem('BranchId')],
              WarehouseIds: [this.form.ToWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.ToStatusId]
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/WarehouseStock/Search?v=2').then((response) => {
            let toWarehouseStocks = response.ListModel.BaseModels
            if (toWarehouseStocks.length > 0) {
              this.warehouseMovementItems.toWhStockQuantity = toWarehouseStocks[0].Quantity
            } else {
              this.warehouseMovementItems.toWhStockQuantity = 0
            }
          })
        } else {
          this.warehouseMovementItems.toWhStockQuantity = 0
        }

        this.$forceUpdate()
      }
    },
    addItem () {
      this.$v.warehouseMovementItems.$touch()
      if (this.$v.warehouseMovementItems.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return
      }
      const filteredArr = this.form.WarehouseMovementItems.filter(i => i.ItemId === this.warehouseMovementItems.item.RecordId && !this.warehouseMovementItems.isUpdated)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      // if (this.warehouseMovementItems.quantity > this.maxPlanQuantity) {
      //   this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.BranchStockTransfer.errorPlanQuantity') })
      //   this.warehouseMovementItems.quantity = this.maxPlanQuantity
      //   return false
      // }
      let item = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.warehouseMovementItems.item.Code,
        ItemId: this.warehouseMovementItems.item.RecordId,
        UnitSetId: this.warehouseMovementItems.item.UnitSetId,
        UnitId: this.warehouseMovementItems.item.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: this.warehouseMovementItems.item.RecordId,
        Description1: this.warehouseMovementItems.item.Description1,
        LineNumber: 0,
        FromWhStockQuantity: this.warehouseMovementItems.fromWhStockQuantity,
        FromWhUnitId: this.warehouseMovementItems.item.UnitId,
        ToWhStockQuantity: this.warehouseMovementItems.toWhStockQuantity,
        ToWhUnitId: this.warehouseMovementItems.item.UnitId,
        Quantity: this.warehouseMovementItems.quantity
      }
      if (this.warehouseMovementItems.isUpdated) {
        this.form.WarehouseMovementItems[this.selectedIndex] = item
        this.selectedIndex = null
      } else {
        this.form.WarehouseMovementItems.push(item)
      }
      this.cleanItem()
      this.isItemAdded = this.form.WarehouseMovementItems.length > 0
    },
    removeItem (item) {
      this.form.WarehouseMovementItems.splice(this.form.WarehouseMovementItems.indexOf(item), 1)
      this.isItemAdded = this.form.WarehouseMovementItems.length > 0
    },
    editItem (item) {
      this.selectedIndex = this.form.WarehouseMovementItems.indexOf(item)
      this.warehouseMovementItems = {
        item: {
          Code: item.Code,
          RecordId: item.ItemId,
          Description1: item.Description1,
          UnitSetId: item.UnitSetId,
          UnitId: item.UnitId
        },
        fromWhStockQuantity: item.FromWhStockQuantity,
        toWhStockQuantity: item.ToWhStockQuantity,
        quantity: item.Quantity,
        isUpdated: true
      }
    },
    cleanItem () {
      this.warehouseMovementItems = {}
      this.$v.warehouseMovementItems.$reset()
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.movementType && this.movementType.Code === '07') {
          if (this.form.FromStatusId === this.form.ToStatusId) {
            this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.WarehouseMovement.StatusError') })
            return
          }
        }
        this.createData()
      }
    },
    selectStockStatus (item) {
      if (item) {
        if (item.Code === '10') {
          this.route = null
          this.form.RouteId = null
          this.fromWarehouse = null
          this.form.FromWarehouseId = null
          this.fromStatus = null
          this.form.FromStatusId = null
          this.selectedVehicle = null
          this.form.VehicleId = null
          this.toWarehouse = null
          this.form.ToWarehouseId = null
          this.toStatus = null
          this.form.ToStatusId = null
        } else if (item && item.Code === '12') {
          let statusList = this.stockStatus.filter(s => s.Code === 'KLLN')
          if (statusList && statusList.length > 0) {
            let status = statusList[0]
            this.fromStatus = status
            this.form.FromStatusId = status.RecordId
            this.toStatus = status
            this.form.ToStatusId = status.RecordId
            this.disabledStatus = true
          }
        } else {
          this.fromStatus = null
          this.form.FromStatusId = null
          this.toStatus = null
          this.form.ToStatusId = null
          this.disabledStatus = false
        }
      }
    },
    selectFromWarehouse (item) {
      if (item) {
        this.form.FromWarehouseId = item.RecordId
        if (this.movementType && this.movementType.Code === '07') {
          this.toWarehouse = item
          this.form.ToWarehouseId = item.RecordId
        }
      } else {
        this.form.FromWarehouseId = null
      }
    },
    selectToWarehouse (item) {
      if (item) {
        this.form.ToWarehouseId = item.RecordId
        if (this.movementType && this.movementType.Code === '07') {
          this.fromWarehouse = item
          this.form.FromWarehouseId = item.RecordId
        }
      } else {
        this.form.ToWarehouseId = null
      }
    },
    getFromWarehouses () {
      this.form.FromWarehouseId = null
      this.fromWarehouse = null

      let request = {
        andConditionModel: {
          StatusIds: [1],
          IsVehicle: 0
        }
      }

      this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/AutoCompleteSearch?v=3').then(res => {
        if (res && res.ListModel) {
          this.fromWarehouses = res.ListModel.BaseModels
        }
      })
    },
    getToWarehouses () {
      this.form.ToWarehouseId = null
      this.toWarehouse = null

      let request = {
        andConditionModel: {
          StatusIds: [1],
          IsVehicle: 0
        }
      }

      this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/AutoCompleteSearch?v=2').then(res => {
        if (res && res.ListModel) {
          this.toWarehouses = res.ListModel.BaseModels
        }
      })
    },
    getToWarehousesAll () {
      this.form.FromWarehouseId = null
      this.fromWarehouse = null

      let request = {
        andConditionModel: {
          StatusIds: [1],
          ...this.getFromWarehouseAndCondition()
        }
      }

      this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/AutoCompleteSearch?v=4', 1000).then(res => {
        if (res && res.ListModel) {
          this.fromWarehousesAll = res.ListModel.BaseModels
        }
      })
    },
    getFromWarehouseAndCondition () {
      if (this.movementType) {
        switch (this.movementType.Code) {
          case '01':
            return {StatusIds: [1], IsVehicle: 0}
          case '05':
            return {StatusIds: [1], IsVehicle: 0}
          case '07':
            return {StatusIds: [1], IsVehicle: 0}
          case '10':
            return {StatusIds: [1], IsVehicle: 1}
          case '12':
            return {StatusIds: [1], IsVehicle: 0}
          default:
            return {}
        }
      }
    },
    getToWarehouseAndCondition () {
      if (this.movementType) {
        switch (this.movementType.Code) {
          case '01':
            return {StatusIds: [1], IsVehicle: 0}
          case '04':
            return {StatusIds: [1], IsVehicle: 0}
          case '07':
            return {StatusIds: [1], IsVehicle: 0}
          case '10':
            return {StatusIds: [1], IsVehicle: 1}
          case '12':
            return {StatusIds: [1], IsVehicle: 1}
          default:
            return {}
        }
      }
    },
    selectFromStatus (item) {
      if (item) {
        this.form.FromStatusId = item.RecordId
        if (this.movementType && (this.movementType.Code === '01' | this.movementType.Code === '10')) {
          this.toStatus = item
          this.form.ToStatusId = item.RecordId
        }
      } else {
        this.fromStatus = null
        this.form.FromStatusId = null
        this.toStatus = null
        this.form.ToStatusId = null
      }
    },
    selectRoute (item) {
      if (item) {
        this.form.RouteId = item.RecordId
        if (item.Vehicle) {
          this.selectedVehicle = this.convertLookupValueToSearchValue(item.Vehicle)
          this.form.VehicleId = item.Vehicle.DecimalValue
          let request = {
            AndConditionModel: {
              VehicleIds: [item.VehicleId],
              IsVehicle: 1
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/Warehouse/Search').then(response => {
            if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
              let warehouse = response.ListModel.BaseModels[0]
              this.toWarehouse = warehouse
              this.form.ToWarehouseId = warehouse.RecordId
            }
          })
        }
      } else {
        this.form.RouteId = null
      }
    }
  },
  validations () {
    let form = this.insertRules
    form.ToStatusId = {
      required
    }
    form.ToWarehouseId = {
      required
    }
    form.FromStatusId = {
      required
    }
    form.FromWarehouseId = {
      required
    }

    if (this.movementType) {
      this.insertRequired.ToStatusId = true
      this.insertRequired.ToWarehouseId = true
      this.insertRequired.FromStatusId = true
      this.insertRequired.FromWarehouseId = true

      switch (this.movementType.Code) {
        case '01':
        case '10':
          form.ToStatusId = {}
          this.insertRequired.ToStatusId = false
          break
        case '04':
          form.FromWarehouseId = {}
          this.insertRequired.FromWarehouseId = false
          form.FromStatusId = {}
          this.insertRequired.FromStatusId = false
          break
        case '05':
          form.ToWarehouseId = {}
          this.insertRequired.ToWarehouseId = false
          form.ToStatusId = {}
          this.insertRequired.ToStatusId = false
          break
      }
    }

    return {
      form: form,
      warehouseMovementItems: {
        item: {
          required
        },
        quantity: {
          required
        }
      }
    }
  }
}
</script>
