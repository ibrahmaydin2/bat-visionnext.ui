<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'StockAdjustment' }">
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
            <NextInput  type="text" v-model="form.MovementNumber" :disabled="insertReadonly.MovementNumber" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementDate" :error="$v.form.MovementDate" md="2" lg="2">
            <NextDatePicker v-model="form.MovementDate" :disabled="insertReadonly.MovementDate" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementTime" :error="$v.form.MovementTime" md="2" lg="2">
            <NextTimePicker v-model="form.MovementTime" :disabled="insertReadonly.MovementTime" />
          </NextFormGroup>
          <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId" md="2" lg="2">
            <NextDropdown
              v-model="selectedRepresentative"
              url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable
              orConditionFields="Code,Description1,Name,Surname"
              @input="selectedSearchType('RepresentativeId', $event)"
              :disabled="insertReadonly.RepresentativeId" />
          </NextFormGroup>
           <NextFormGroup item-key="MovementTypeId" :error="$v.form.MovementTypeId" md="2" lg="2">
              <NextDropdown
                url="VisionNextWarehouse/api/WarehouseMovementType/Search"
                @input="selectedSearchType('MovementTypeId', $event)"
                :disabled="insertReadonly.MovementTypeId" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
            <NextInput  type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="2" lg="2">
            <NextCheckBox type="number" v-model="form.StatusId" :disabled="insertReadonly.StatusId" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" active>
          <b-row>
            <NextFormGroup item-key="ToWarehouseId" :error="$v.form.ToWarehouseId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('ToWarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="ToStatusId" :error="$v.form.ToStatusId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('ToStatusId', $event)"
                url="VisionNextStockManagement/api/StockStatus/Search" />
            </NextFormGroup>
          </b-row>
          <hr>
          <b-row>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ItemCode')" :required="true" :error="$v.stockAdjustmentItems.item" md="3" lg="3">
              <NextDropdown
                  v-model="stockAdjustmentItems.item"
                  @input="selectedItem"
                  url="VisionNextItem/api/Item/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ToWhStockQuantity')" :required="true" :error="$v.stockAdjustmentItems.toWhStockQuantity" md="3" lg="3">
              <NextInput type="text" v-model="stockAdjustmentItems.toWhStockQuantity" :disabled="true"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.PlanQuantity')" :required="true" :error="$v.stockAdjustmentItems.quantity" md="3" lg="3">
              <NextInput type="number" min="0" :max="maxPlanQuantity" v-model="stockAdjustmentItems.quantity"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="3" lg="3" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addItem()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ItemCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.Items')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.ToWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.BranchStockTransfer.PlanQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.StockAdjustmentItems" :key="i">
                    <b-td>{{r.Code}}</b-td>
                    <b-td>{{r.Description1}}</b-td>
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
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        MovementNumber: null,
        MovementDate: null,
        RepresentativeId: null,
        MovementTypeId: null,
        MovementTime: null,
        Description1: null,
        ToWarehouseId: null,
        ToStatusId: null,
        StockAdjustmentItems: [],
        Canceled: 0,
        IsPrinted: 0,
        PrintCount: 0,
        Printed: 0
      },
      routeName1: 'StockManagement',
      stockAdjustmentItems: {},
      selectedRepresentative: null,
      selectedIndex: null,
      maxPlanQuantity: null
    }
  },
  mounted () {
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      this.createManualCode('MovementNumber')
      let currentDate = new Date()
      this.form.MovementDate = currentDate.toISOString().slice(0, 10)
      this.form.MovementTime = currentDate.toTimeString().slice(0, 5)
      this.getUserInfo()
    },
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.selectedRepresentative = {
              Description1: `${userModel.Name} ${userModel.Surname}`,
              RecordId: user.EmployeeId
            }
            this.form.RepresentativeId = user.EmployeeId
          }
        })
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label !== 'RepresentativeId' && this.form.StockAdjustmentItems.length > 0) {
          if (confirm(this.$t('insert.BranchStockTransfer.changeQuestion'))) {
            this.form.StockAdjustmentItems = []
            this.stockAdjustmentItems = {}
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
          this.stockAdjustmentItems.item = e
          let request = {
            andConditionModel: {
              BranchIds: [localStorage.getItem('BranchId')],
              WarehouseIds: [this.form.ToWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.ToStatusId]
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/WarehouseStock/Search').then((response) => {
            if (response.ListModel) {
              let stocks = response.ListModel.BaseModels
              if (stocks.length > 0) {
                this.maxPlanQuantity = stocks[0].Quantity
                this.stockAdjustmentItems.toWhStockQuantity = stocks[0].Quantity
              } else {
                this.maxPlanQuantity = 0
                this.stockAdjustmentItems.toWhStockQuantity = 0
              }
              this.$forceUpdate()
            }
          })
        }
      } else {
        this.stockAdjustmentItems.item = null
        this.cleanItem()
      }
    },
    addItem () {
      this.$v.stockAdjustmentItems.$touch()
      if (this.$v.stockAdjustmentItems.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return
      }
      const filteredArr = this.form.StockAdjustmentItems.filter(i => i.ItemId === this.stockAdjustmentItems.item.RecordId && i.RecordState !== 4 && !this.stockAdjustmentItems.isUpdated)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      let addedItem = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.stockAdjustmentItems.item.Code,
        ItemId: this.stockAdjustmentItems.item.RecordId,
        UnitSetId: this.stockAdjustmentItems.item.UnitSetId,
        UnitId: this.stockAdjustmentItems.item.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        Description1: this.stockAdjustmentItems.item.Description1,
        LineNumber: 0,
        ToWhStockQuantity: this.stockAdjustmentItems.toWhStockQuantity,
        ToWhUnitId: this.stockAdjustmentItems.item.UnitId,
        Quantity: this.stockAdjustmentItems.quantity
      }
      if (this.stockAdjustmentItems.isUpdated) {
        this.form.StockAdjustmentItems[this.selectedIndex] = addedItem
        this.selectedIndex = null
      } else {
        this.form.StockAdjustmentItems.push(addedItem)
      }
      this.cleanItem()
    },
    removeItem (item) {
      const index = this.form.StockAdjustmentItems.indexOf(item)
      if (item.RecordId) {
        this.form.StockAdjustmentItems[index].RecordState = 4
      } else {
        this.form.StockAdjustmentItems.splice(index, 1)
      }
    },
    editItem (item) {
      this.selectedIndex = this.form.StockAdjustmentItems.indexOf(item)
      this.stockAdjustmentItems = {
        isUpdated: true,
        item: {
          Description1: item.Description1,
          RecordId: item.ItemId,
          Code: item.Code,
          UnitSetId: item.UnitSetId,
          UnitId: item.UnitId
        },
        toWhStockQuantity: item.ToWhStockQuantity,
        quantity: item.Quantity
      }
    },
    cleanItem () {
      this.stockAdjustmentItems = {}
      this.$v.stockAdjustmentItems.$reset()
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.createData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      stockAdjustmentItems: {
        item: {
          required
        },
        toWhStockQuantity: {
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
