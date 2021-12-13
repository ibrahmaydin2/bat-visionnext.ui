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
          <b-col v-if="insertVisible.MovementNumber != null ? insertVisible.MovementNumber : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementNumber + (insertRequired.MovementNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementNumber.$error }">
              <b-form-input type="text" v-model="form.MovementNumber" :readonly="insertReadonly.MovementNumber" />
            </b-form-group>
          </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select :options="employees" @search="onEmployeeSearch" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" :filterable="false">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MovementDate != null ? insertVisible.MovementDate : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.MovementDate + (insertRequired.MovementDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementDate.$error }">
                <b-form-datepicker v-model="form.MovementDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MovementTime != null ? insertVisible.MovementTime : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.MovementTime + (insertRequired.MovementTime === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementTime.$error }">
                <b-form-timepicker v-model="form.MovementTime"></b-form-timepicker>
              </b-form-group>
            </b-col>
          <b-col v-if="insertVisible.GenExp1 != null ? insertVisible.GenExp1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.GenExp1 + (insertRequired.GenExp1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GenExp1.$error }">
              <b-form-input type="text" v-model="form.GenExp1" :readonly="insertReadonly.GenExp1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
       </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" active>
          <b-row>
            <b-col v-if="insertVisible.FromBranchId != null ? insertVisible.FromBranchId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.FromBranchId + (insertRequired.FromBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromBranchId.$error }">
                <v-select :options="branches" @input="selectedSearchType('FromBranchId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FromWarehouseId != null ? insertVisible.FromWarehouseId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.FromWarehouseId + (insertRequired.FromWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromWarehouseId.$error }">
                <v-select v-model="fromWarehouse" :options="warehouseList" @input="selectedSearchType('FromWarehouseId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FromStatusId != null ? insertVisible.FromStatusId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.FromStatusId + (insertRequired.FromStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromStatusId.$error }">
                <v-select :options="stockStatus" @input="selectedSearchType('FromStatusId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToBranchId != null ? insertVisible.ToBranchId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.ToBranchId + (insertRequired.ToBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToBranchId.$error }">
                <v-select :options="branches" @input="selectedSearchType('ToBranchId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToWarehouseId != null ? insertVisible.ToWarehouseId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.ToWarehouseId + (insertRequired.ToWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToWarehouseId.$error }">
                <v-select v-model="toWarehouse" :options="warehouseListTo" @input="selectedSearchType('ToWarehouseId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToStatusId != null ? insertVisible.ToStatusId : developmentMode" cols="12" md="4">
              <b-form-group :label="insertTitle.ToStatusId + (insertRequired.ToStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToStatusId.$error }">
                <v-select :options="stockStatus" @input="selectedSearchType('ToStatusId', $event)" label="Description1"></v-select>
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
              <b-form-group :label="$t('insert.BranchStockTransfer.Description1')">
                <b-form-input type="text" v-model="BranchStockTransferItems.Description1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.FromWhStockQuantity')">
                <b-form-input type="text" v-model="BranchStockTransferItems.FromWhStockQuantity" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.ToWhStockQuantity')">
                <b-form-input type="text" v-model="BranchStockTransferItems.ToWhStockQuantity" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.PlanQuantity')">
                <b-form-input type="number" min="1" @keypress="onlyForCurrencyDot($event)" :max="maxPlanQuantity" v-model="BranchStockTransferItems.Quantity" />
              </b-form-group>
            </b-col>
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
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
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
      BranchStockTransferItems: {
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
      routeName: this.$route.meta.baseLink,
      dataStatus: true,
      tmpSelectedItem: [],
      maxPlanQuantity: null,
      item: null,
      fromWarehouse: null,
      toWarehouse: null
    }
  },
  computed: {
    ...mapState(['items', 'employees', 'stockStatus', 'BranchId', 'warehouseList', 'warehouseListTo', 'branches', 'developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'fromWarehouseStocks', 'toWarehouseStocks'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextBranch/api/${e}/GetCode`})

      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBranch/api/Branch/Search', name: 'branches'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/StockStatus/Search', name: 'stockStatus'})
    },
    onItemsSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchItems(loading, search, this)
      }
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
        },
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            Name: search,
            Surname: search
          }
        ]
      }).then(res => {
        loading(false)
      })
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
    selectedSearchType (label, model) {
      if (model) {
        if (label !== 'RepresentativeId' && this.form.BranchStockTransferItems.length > 0) {
          if (confirm(this.$t('insert.BranchStockTransfer.changeQuestion'))) {
            this.form.BranchStockTransferItems = []
            this.BranchStockTransferItems = []
          } else {
            return false
          }
        }
        this.form[label] = model.RecordId
        if (label === 'FromBranchId') {
          this.$store.dispatch('acWarehouse', {...this.query, searchField: 'BranchId', searchText: model.RecordId})
        }
        if (label === 'ToBranchId') {
          this.$store.dispatch('acWarehouseTo', {...this.query, searchField: 'BranchId', searchText: model.RecordId})
        }
      } else {
        this.form[label] = null
      }
      if (label === 'FromBranchId') {
        this.form['FromWarehouseId'] = null
        this.fromWarehouse = null
      }
      if (label === 'ToBranchId') {
        this.form['ToWarehouseId'] = null
        this.toWarehouse = null
      }
    },
    selectedItem (e) {
      if (e) {
        this.$v.$touch()
        if (this.$v.$error) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
          this.cleanItem()
        } else {
          this.$store.dispatch('getSearchItems', {
            ...this.query,
            api: 'VisionNextWarehouse/api/WarehouseStock/Search',
            name: 'fromWarehouseStocks',
            andConditionModel: {
              BranchIds: [this.form.FromBranchId],
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
              BranchIds: [this.form.ToBranchId],
              WarehouseIds: [this.form.ToWarehouseId],
              ItemIds: [e.RecordId],
              StatusIds: [this.form.ToStatusId]
            }
          })
          this.tmpSelectedItem = e
        }
      } else {
        this.tmpSelectedItem = null
        this.cleanItem()
      }
    },
    addItems () {
      if (this.tmpSelectedItem.length < 1 || !this.BranchStockTransferItems.Quantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return false
      }
      const filteredArr = this.form.BranchStockTransferItems.filter(i => i.ItemId === this.tmpSelectedItem.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.BranchStockTransferItems.Quantity > this.maxPlanQuantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.BranchStockTransfer.errorPlanQuantity') })
        this.BranchStockTransferItems.Quantity = this.maxPlanQuantity
        return false
      }
      this.form.BranchStockTransferItems.push({
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
        FromWhStockQuantity: this.BranchStockTransferItems.FromWhStockQuantity,
        FromWhUnitId: this.tmpSelectedItem.UnitId,
        ToWhStockQuantity: this.BranchStockTransferItems.ToWhStockQuantity,
        ToWhUnitId: this.tmpSelectedItem.UnitId,
        Quantity: this.BranchStockTransferItems.Quantity
      })
    },
    removeItems (item) {
      this.form.BranchStockTransferItems.splice(this.form.BranchStockTransferItems.indexOf(item), 1)
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
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.MovementDate = this.dateConvertToISo(this.form.MovementDate)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextBranch/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    },
    cleanItem () {
      const payload = {
        name: 'items',
        data: []
      }
      this.$store.commit('setSearchItems', payload)
      this.tmpSelectedItem = null
      this.item = null
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.MovementNumber = e
      }
    },
    // Status'un değerini true'dan 1'e çeviriyor
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
        this.BranchStockTransferItems.FromWhStockQuantity = e[0].Quantity
      } else {
        this.maxPlanQuantity = 0
        this.BranchStockTransferItems.FromWhStockQuantity = 0
      }
    },
    toWarehouseStocks (e) {
      if (e.length > 0) {
        this.BranchStockTransferItems.ToWhStockQuantity = e[0].Quantity
      } else {
        this.BranchStockTransferItems.ToWhStockQuantity = 0
      }
    }
  }
}
</script>
<style lang="sass">
</style>
