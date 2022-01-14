<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'BranchStockTransfer' }">
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
          <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
            <NextDropdown
              @input="selectedSearchType('RepresentativeId', $event)"
              :disabled="insertReadonly.RepresentativeId"
              url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
              label="Description1"
              :searchable="true" :custom-option="true"
              or-condition-fields="Code,Description1,CommercialTitle,Name,Surname"
              :is-customer="true"
              />
          </NextFormGroup>
          <NextFormGroup item-key="MovementDate" :error="$v.form.MovementDate" md="2" lg="2">
            <NextDatePicker v-model="form.MovementDate" :disabled="insertReadonly.MovementDate" />
          </NextFormGroup>
          <NextFormGroup item-key="MovementTime" :error="$v.form.MovementTime" md="2" lg="2">
            <NextTimePicker v-model="form.MovementTime" :disabled="insertReadonly.MovementTime" />
          </NextFormGroup>
          <NextFormGroup item-key="GenExp1" :error="$v.form.GenExp1" md="2" lg="2">
            <NextInput  type="text" v-model="form.GenExp1" :disabled="insertReadonly.GenExp1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle />
          </NextFormGroup>
       </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" active>
          <b-row>
            <NextFormGroup item-key="FromBranchId" :error="$v.form.FromBranchId">
              <NextDropdown
                @input="selectedSearchType('FromBranchId', $event); initWarehouse('from')"
                url="VisionNextBranch/api/Branch/Search"
                :dynamic-and-condition="{ StatusIds: [1]}"
                :disabled="insertReadonly.FromBranchId" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId">
              <NextDropdown
                v-model="fromWarehouse"
                :disabled="insertReadonly.FromWarehouseId || !form.FromBranchId"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch?v=1"
                @input="selectedSearchType('FromWarehouseId', $event)"
                :dynamic-and-condition="{ StatusIds: [1], IsVehicle: 0 }"/>
            </NextFormGroup>
            <NextFormGroup item-key="FromStatusId" :error="$v.form.FromStatusId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('FromStatusId', $event)"
                url="VisionNextStockManagement/api/StockStatus/Search?v=1"
                :disabled="insertReadonly.FromStatusId"
                :filter="i => i.Code !== 'RZRV'"
              />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup item-key="ToBranchId" :error="$v.form.ToBranchId">
              <NextDropdown
                @input="selectedSearchType('ToBranchId', $event); initWarehouse('to')"
                url="VisionNextBranch/api/Branch/Search"
                :dynamic-and-condition="{ StatusIds: [1]}"
                :disabled="insertReadonly.ToBranchId" />
            </NextFormGroup>
            <NextFormGroup item-key="ToWarehouseId" :error="$v.form.ToWarehouseId">
              <NextDropdown
                v-model="toWarehouse"
                @input="selectedSearchType('ToWarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch?v=2"
                :dynamic-and-condition="{ StatusIds: [1], IsVehicle: 0 }"
                :disabled="insertReadonly.ToWarehouseId || !form.ToBranchId" />
            </NextFormGroup>
            <NextFormGroup item-key="ToStatusId" :error="$v.form.ToStatusId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('ToStatusId', $event)"
                url="VisionNextStockManagement/api/StockStatus/Search?v=2"
                :filter="i => i.Code !== 'RZRV'" />
            </NextFormGroup>
          </b-row>
          <hr>
          <b-row>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ItemCode')" :required="true" :error="$v.branchStockTransferItem.item" md="2" lg="2">
              <NextDropdown
                searchable
                url="VisionNextItem/api/Item/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1], CardTypeIds: [1, 2, 8] }"
                or-condition-fields="Code,Description1"
                v-model="branchStockTransferItem.item"
                @input="selectedItem"
                :custom-option="true"
                :disabled="!form.ToBranchId || !form.FromStatusId || !form.FromWarehouseId"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.Description1')" md="2" lg="2">
              <NextInput type="text" v-model="branchStockTransferItem.Description1"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.FromWhStockQuantity')" md="2" lg="2">
              <NextInput :disabled="true" type="text" v-model="branchStockTransferItem.FromWhStockQuantity"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.ToWhStockQuantity')" md="2" lg="2">
              <NextInput :disabled="true" type="text" v-model="branchStockTransferItem.ToWhStockQuantity"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.BranchStockTransfer.PlanQuantity')" :required="true" :error="$v.branchStockTransferItem.Quantity" md="2" lg="2">
              <NextInput v-model="branchStockTransferItem.Quantity" type="number" min="1" @keypress="onlyForCurrencyDot($event)" :max="maxPlanQuantity"></NextInput>
            </NextFormGroup>
          </b-row>
          <b-row>
            <b-col cols="10" md="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addItems" />
              </b-form-group>
            </b-col>
            <b-col cols="10" md="2">
              <NextMultipleSelection
                  v-model="form.BranchStockTransferItems"
                  name="BranchTransferMultipleItem"
                  :hidden-values="hiddenValues"
                  :filter-func="i => i.Quantity > 0"
                  :dynamic-and-condition="{WarehouseIds: [form.FromWarehouseId], DocumentDate: form.MovementDate}"
                  :disabled-button="!form.FromWarehouseId || !form.MovementDate"></NextMultipleSelection>
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
                  <b-tr v-for="(r, i) in form.BranchStockTransferItems" :key="i">
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
import { required, minValue } from 'vuelidate/lib/validators'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        MovementNumber: null,
        GenExp1: null,
        StatusId: 1,
        FromBranchId: null,
        FromWarehouseId: null,
        FromStatusId: null,
        ToBranchId: null,
        ToWarehouseId: null,
        ToStatusId: null,
        RepresentativeId: null,
        MovementDate: null,
        MovementTime: null,
        BranchStockTransferItems: [],
        Canceled: 0
      },
      branchStockTransferItem: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        ItemId: null,
        LineNumber: 0,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: null,
        ConvFact2: null,
        FromWhStockQuantity: null,
        FromWhUnitId: null,
        ToWhStockQuantity: null,
        ToWhUnitId: null,
        Quantity: null,
        PlanQuantity: null
      },
      routeName1: 'Branch',
      maxPlanQuantity: null,
      item: null,
      fromWarehouse: null,
      toWarehouse: null,
      hiddenValues: [
        {
          mainProperty: 'FromWHStockQuantity',
          targetProperty: 'FromWhStockQuantity'
        },
        {
          mainProperty: 'ToWHStockQuantity',
          targetProperty: 'ToWhStockQuantity'
        }
      ]
    }
  },
  mounted () {
    this.getCode()
    let currentDate = new Date()
    this.form.MovementDate = currentDate.toISOString().slice(0, 10)
    this.form.MovementTime = currentDate.toTimeString().slice(0, 5)
  },
  methods: {
    getCode () {
      this.$api.postByUrl({}, `VisionNextBranch/api/BranchStockTransfer/GetCode`).then(response => {
        if (response.Model) {
          this.form.MovementNumber = response.Model.Code
        }
      })
    },
    selectedItem (e) {
      if (e) {
        if (this.form.FromWarehouseId && this.form.FromStatusId) {
          let request = {
            andConditionModel: {
              BranchIds: [this.form.ToBranchId],
              WarehouseIds: [this.form.FromWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.FromStatusId]
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/WarehouseStock/Search?v=1').then((response) => {
            let fromWarehouseStocks = response.ListModel.BaseModels
            if (fromWarehouseStocks.length > 0) {
              this.maxPlanQuantity = fromWarehouseStocks[0].Quantity
              this.branchStockTransferItem.FromWhStockQuantity = fromWarehouseStocks[0].Quantity
            } else {
              this.maxPlanQuantity = 0
              this.branchStockTransferItem.FromWhStockQuantity = 0
            }
          })
        } else {
          this.maxPlanQuantity = 0
          this.branchStockTransferItem.FromWhStockQuantity = 0
        }

        if (this.form.ToWarehouseId && this.form.ToStatusId) {
          let request = {
            andConditionModel: {
              BranchIds: [this.form.ToBranchId],
              WarehouseIds: [this.form.ToWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.ToStatusId]
            }
          }
          this.$api.postByUrl(request, 'VisionNextWarehouse/api/WarehouseStock/Search?v=2').then((response) => {
            let toWarehouseStocks = response.ListModel.BaseModels
            if (toWarehouseStocks.length > 0) {
              this.branchStockTransferItem.ToWhStockQuantity = toWarehouseStocks[0].Quantity
            } else {
              this.branchStockTransferItem.ToWhStockQuantity = 0
            }
          })
        } else {
          this.branchStockTransferItem.ToWhStockQuantity = 0
        }

        this.$forceUpdate()
      }
    },
    addItems () {
      this.$v.branchStockTransferItem.$touch()
      if (this.$v.branchStockTransferItem.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return false
      }
      const filteredArr = this.form.BranchStockTransferItems.filter(i => i.ItemId === this.branchStockTransferItem.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.branchStockTransferItem.Quantity > this.maxPlanQuantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.BranchStockTransfer.errorPlanQuantity') })
        this.branchStockTransferItem.Quantity = this.maxPlanQuantity
        return false
      }
      this.form.BranchStockTransferItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.branchStockTransferItem.item.Code,
        ItemId: this.branchStockTransferItem.item.RecordId,
        UnitSetId: this.branchStockTransferItem.item.UnitSetId,
        UnitId: this.branchStockTransferItem.item.UnitId,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: this.branchStockTransferItem.item.RecordId,
        Description1: this.branchStockTransferItem.item.Description1,
        LineNumber: 0,
        FromWhStockQuantity: this.branchStockTransferItem.FromWhStockQuantity,
        FromWhUnitId: this.branchStockTransferItem.UnitId,
        ToWhStockQuantity: this.branchStockTransferItem.ToWhStockQuantity,
        ToWhUnitId: this.branchStockTransferItem.UnitId,
        Quantity: this.branchStockTransferItem.Quantity
      })
      this.cleanItem()
    },
    removeItems (item) {
      this.form.BranchStockTransferItems.splice(this.form.BranchStockTransferItems.indexOf(item), 1)
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.MovementDate = this.dateConvertToISo(this.form.MovementDate)
        this.createData()
      }
    },
    cleanItem () {
      this.branchStockTransferItem = {}
      this.$v.branchStockTransferItem.$reset()
    },
    initWarehouse (type) {
      if (type === 'from') {
        this.form.FromWarehouseId = null
        this.fromWarehouse = null
      }
      if (type === 'to') {
        this.form.ToWarehouseId = null
        this.toWarehouse = null
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      branchStockTransferItem: {
        item: {
          required
        },
        Quantity: {
          required,
          minValue: minValue(1)
        }
      }
    }
  }
}
</script>
