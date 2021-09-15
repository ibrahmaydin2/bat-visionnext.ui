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
          <b-col v-if="insertVisible.MovementNumber != null ? insertVisible.MovementNumber : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementNumber + (insertRequired.MovementNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementNumber.$error }">
              <b-form-input :disabled="isItemAdded" type="text" v-model="form.MovementNumber" :readonly="insertReadonly.MovementNumber" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.MovementDate != null ? insertVisible.MovementDate : developmentMode" :start-weekday="1" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementDate + (insertRequired.MovementDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementDate.$error }">
              <b-form-datepicker v-model="form.MovementDate" disabled/>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.MovementTime != null ? insertVisible.MovementTime : developmentMode" :start-weekday="1" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementTime + (insertRequired.MovementTime === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementTime.$error }">
              <b-form-timepicker v-model="form.MovementTime"></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
              <v-select :disabled="isItemAdded" :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.MovementTypeId != null ? insertVisible.MovementTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementTypeId + (insertRequired.MovementTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementTypeId.$error }">
              <v-select :disabled="isItemAdded" v-model="movementType" :options="filteredMovementTypes" @input="selectedSearchType('MovementTypeId', $event); selectStockStatus($event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox :disabled="isItemAdded" v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.RouteId != null ? insertVisible.RouteId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RouteId + (insertRequired.RouteId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteId.$error }">
                <v-select v-model="route" :disabled="(movementType && (movementType.Code === '10' || movementType.Code === '04' || movementType.Code === '05')) || isItemAdded" :options="routes" @input="selectRoute" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FromWarehouseId != null ? insertVisible.FromWarehouseId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.FromWarehouseId + (insertRequired.FromWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromWarehouseId.$error }">
                <NextDropdown :disabled="(movementType && movementType.Code === '04') || isItemAdded" v-model="fromWarehouse" :dynamic-and-condition="getFromWarehouseAndCondition()" @input="selectFromWarehouse($event) " label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FromStatusId != null ? insertVisible.FromStatusId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.FromStatusId + (insertRequired.FromStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromStatusId.$error }">
                <v-select :disabled="(movementType && movementType.Code === '04') || isItemAdded || disabledStatus" v-model="fromStatus" :options="stockStatus" @input="selectFromStatus" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.VehicleId != null ? insertVisible.VehicleId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.VehicleId + (insertRequired.VehicleId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.VehicleId.$error }">
                <v-select v-model="selectedVehicle" :disabled="(movementType && (movementType.Code === '10' || movementType.Code === '04' || movementType.Code === '05')) || isItemAdded" :options="vehicles" @input="selectedSearchType('VehicleId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToWarehouseId != null ? insertVisible.ToWarehouseId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ToWarehouseId + (insertRequired.ToWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToWarehouseId.$error }">
                <NextDropdown :disabled="(movementType && movementType.Code === '05') || isItemAdded" :dynamic-and-condition="getToWarehouseAndCondition()" v-model="toWarehouse" @input="selectToWarehouse($event)" label="Description1" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToStatusId != null ? insertVisible.ToStatusId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ToStatusId + (insertRequired.ToStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToStatusId.$error }">
                <v-select :disabled="(movementType && (movementType.Code === '05' || movementType.Code === '01' || movementType.Code === '10')) || isItemAdded || disabledStatus" v-model="toStatus" :options="stockStatus" @input="selectedSearchType('ToStatusId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.ItemCode')">
                <v-select v-model="item" :options="items" @search="onItemsSearch" @input="selectedItem" label="Description1" :filterable="false">
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.FromWhStockQuantity')">
                <b-form-input type="text" v-model="WarehouseMovementItems.FromWhStockQuantity" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.ToWhStockQuantity')">
                <b-form-input type="text" v-model="WarehouseMovementItems.ToWhStockQuantity" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.PlanQuantity')">
                <b-form-input type="number" min="0" :max="maxPlanQuantity" v-model="WarehouseMovementItems.Quantity" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
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
                    <b-td class="text-center"><i @click="removeItems(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
import mixin from '../../mixins/index'
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
      routeName: this.$route.meta.baseLink,
      dataStatus: true,
      WarehouseMovementItems: {
        FromWhStockQuantity: null,
        ToWhStockQuantity: null,
        Quantity: null
      },
      item: null,
      tmpSelectedItem: [],
      maxPlanQuantity: null,
      fromStatus: null,
      toStatus: null,
      movementType: null,
      toWarehouse: null,
      selectedVehicle: null,
      route: null,
      fromWarehouse: null,
      isItemAdded: false,
      disabledStatus: false
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'createCode', 'employees', 'movementTypes', 'stockStatus', 'vehicles', 'routes', 'items', 'fromWarehouseStocks', 'toWarehouseStocks']),
    filteredMovementTypes () {
      let filteredCodes = ['01', '04', '05', '07', '10', '12']
      return this.movementTypes ? this.movementTypes.filter(m => filteredCodes.includes(m.Code)) : []
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.form.MovementNumber = this.createCode
    let currentDate = new Date()
    this.form.MovementDate = currentDate.toISOString().slice(0, 10)
    this.form.MovementTime = currentDate.toLocaleTimeString()
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextWarehouse/api/${e}/GetCode`})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/StockStatus/Search', name: 'stockStatus'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextVehicle/api/Vehicle/Search', name: 'vehicles'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextWarehouse/api/WarehouseMovementType/Search', name: 'movementTypes'})
    },
    onItemsSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchItems(loading, search, this)
      }
    },
    searchItems (loading, search, vm) {
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
    onEmployeeSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchEmployee(loading, search, this)
      }
    },
    searchEmployee (loading, search, vm) {
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
        name: 'employees',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
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
    selectedItem (e) {
      if (e) {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
          this.cleanItem()
          return false
        } else {
          this.tmpSelectedItem = e
          this.$store.dispatch('getSearchItems', {
            ...this.query,
            api: 'VisionNextWarehouse/api/WarehouseStock/Search',
            name: 'fromWarehouseStocks',
            andConditionModel: {
              BranchIds: [localStorage.getItem('BranchId')],
              WarehouseIds: [this.form.FromWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.FromStatusId]
            }
          })
          this.$store.dispatch('getSearchItems', {
            ...this.query,
            api: 'VisionNextWarehouse/api/WarehouseStock/Search',
            name: 'toWarehouseStocks',
            andConditionModel: {
              BranchIds: [localStorage.getItem('BranchId')],
              WarehouseIds: [this.form.ToWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.ToStatusId]
            }
          })
        }
      } else {
        this.tmpSelectedItem = null
        this.cleanItem()
      }
    },
    addItems () {
      if (!this.form.ToWarehouseId || !this.form.ToStatusId) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.WarehouseMovement.toError') })
        return false
      }
      if (!this.form.FromWarehouseId || !this.form.FromStatusId) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.WarehouseMovement.fromError') })
        return false
      }
      if (this.tmpSelectedItem.length < 1 || !this.WarehouseMovementItems.Quantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return false
      }
      const filteredArr = this.form.WarehouseMovementItems.filter(i => i.ItemId === this.tmpSelectedItem.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.WarehouseMovementItems.Quantity > this.maxPlanQuantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.BranchStockTransfer.errorPlanQuantity') })
        this.WarehouseMovementItems.Quantity = this.maxPlanQuantity
        return false
      }
      this.form.WarehouseMovementItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.tmpSelectedItem.Code,
        ItemId: this.tmpSelectedItem.RecordId,
        UnitSetId: this.tmpSelectedItem.UnitSetId,
        UnitId: this.tmpSelectedItem.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: this.tmpSelectedItem.RecordId,
        Description1: this.tmpSelectedItem.Description1,
        LineNumber: 0,
        FromWhStockQuantity: this.WarehouseMovementItems.FromWhStockQuantity,
        FromWhUnitId: this.tmpSelectedItem.UnitId,
        ToWhStockQuantity: this.WarehouseMovementItems.ToWhStockQuantity,
        ToWhUnitId: this.tmpSelectedItem.UnitId,
        Quantity: this.WarehouseMovementItems.Quantity
      })
      this.cleanItem()
      this.isItemAdded = this.form.WarehouseMovementItems.length > 0
    },
    removeItems (item) {
      this.form.WarehouseMovementItems.splice(this.form.WarehouseMovementItems.indexOf(item), 1)
      this.isItemAdded = this.form.WarehouseMovementItems.length > 0
    },
    cleanItem () {
      const payload = {
        name: 'items',
        data: []
      }
      this.$store.commit('setSearchItems', payload)
      this.tmpSelectedItem = null
      this.item = null
      this.WarehouseMovementItems.FromWhStockQuantity = 0
      this.WarehouseMovementItems.ToWhStockQuantity = 0
      this.WarehouseMovementItems.Quantity = 0
    },
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        if (this.movementType && this.movementType.Code === '07') {
          if (this.form.FromStatusId === this.form.ToStatusId) {
            this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.WarehouseMovement.StatusError') })
            return
          }
        }
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextWarehouse/api/${this.routeName}`, formdata: model, return: this.routeName})
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
    getFromWarehouseAndCondition () {
      if (this.movementType) {
        switch (this.movementType.Code) {
          case '01':
            return {IsVehicle: 0}
          case '10':
            return {IsVehicle: 1}
          case '12':
            return {IsVehicle: 0}
          default:
            return {}
        }
      }
    },
    getToWarehouseAndCondition () {
      if (this.movementType) {
        switch (this.movementType.Code) {
          case '01':
            return {IsVehicle: 0}
          case '10':
            return {IsVehicle: 1}
          case '12':
            return {IsVehicle: 1}
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
      form: form
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.MovementNumber = e
      }
    },
    dataStatus: function (e) {
      if (e === true) {
        this.form.StatusId = 1
      } else {
        this.form.StatusId = 0
      }
    },
    fromWarehouseStocks (e) {
      if (e.length > 0) {
        this.maxPlanQuantity = e[0].Quantity
        this.WarehouseMovementItems.FromWhStockQuantity = e[0].Quantity
      } else {
        this.maxPlanQuantity = 0
        this.WarehouseMovementItems.FromWhStockQuantity = 0
      }
    },
    toWarehouseStocks (e) {
      if (e.length > 0) {
        this.WarehouseMovementItems.ToWhStockQuantity = e[0].Quantity
      } else {
        this.WarehouseMovementItems.ToWhStockQuantity = 0
      }
    }
  }
}
</script>
<style lang="sass">
</style>
