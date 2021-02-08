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
          <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
              <v-select :options="employees" @input="selectedSearchType('RepresentativeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.MovementTypeId != null ? insertVisible.MovementTypeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementTypeId + (insertRequired.MovementTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementTypeId.$error }">
              <v-select v-model="selectedmovementTypes" disabled :options="movementTypes" @input="selectedSearchType('MovementTypeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
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
        <b-tab :title="$t('insert.BranchStockTransfer.Items')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.ToWarehouseId != null ? insertVisible.ToWarehouseId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ToWarehouseId + (insertRequired.ToWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToWarehouseId.$error }">
                <v-select :options="warehouses" @input="selectedSearchType('ToWarehouseId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ToStatusId != null ? insertVisible.ToStatusId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ToStatusId + (insertRequired.ToStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToStatusId.$error }">
                <v-select :options="stockStatus" @input="selectedSearchType('ToStatusId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.ItemCode')">
                <v-select v-model="item" :options="items" @search="onItemsSearch" @input="selectedItem" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.ToWhStockQuantity')">
                <b-form-input type="text" v-model="StockAdjustmentItems.ToWhStockQuantity" readonly/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.BranchStockTransfer.PlanQuantity')">
                <b-form-input type="number" min="0" :max="maxPlanQuantity" v-model="StockAdjustmentItems.Quantity" />
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
        StockAdjustmentItems: []
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: true,
      selectedmovementTypes: null,
      StockAdjustmentItems: [],
      item: null,
      tmpSelectedItem: [],
      maxPlanQuantity: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'createCode', 'employees', 'movementTypes', 'stockStatus', 'warehouses', 'items', 'toWarehouseStocks'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextStockManagement/api/${e}/GetCode`})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/StockStatus/Search', name: 'stockStatus'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'employees'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextWarehouse/api/Warehouse/Search', name: 'warehouses'})
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
        api: 'VisionNextItem/api/Item/Search',
        name: 'items',
        andConditionModel: {
          Description1: search
        }
      }).then(res => {
        loading(false)
      })
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label !== 'RepresentativeId' && this.form.StockAdjustmentItems.length > 0) {
          if (confirm(this.$t('insert.BranchStockTransfer.changeQuestion'))) {
            this.form.StockAdjustmentItems = []
            this.StockAdjustmentItems = []
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
        this.$v.$touch()
        if (this.$v.$error) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
          this.cleanItem()
          return false
        } else {
          this.tmpSelectedItem = e
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
      if (this.tmpSelectedItem.length < 1 || !this.StockAdjustmentItems.Quantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return false
      }
      const filteredArr = this.form.StockAdjustmentItems.filter(i => i.ItemId === this.tmpSelectedItem.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.StockAdjustmentItems.push({
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
        ToWhStockQuantity: this.StockAdjustmentItems.ToWhStockQuantity,
        ToWhUnitId: this.tmpSelectedItem.UnitId,
        Quantity: this.StockAdjustmentItems.Quantity
      })
      this.cleanItem()
    },
    removeItems (item) {
      this.form.StockAdjustmentItems.splice(this.form.StockAdjustmentItems.indexOf(item), 1)
    },
    cleanItem () {
      const payload = {
        name: 'items',
        data: []
      }
      this.$store.commit('setSearchItems', payload)
      this.tmpSelectedItem = null
      this.item = null
      this.StockAdjustmentItems.ToWhStockQuantity = 0
      this.StockAdjustmentItems.Quantity = 0
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
        this.form.MovementDate = this.dateConvertToISo(this.form.MovementDate)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextStockManagement/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
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
    toWarehouseStocks (e) {
      if (e.length > 0) {
        this.maxPlanQuantity = e[0].Quantity
        this.StockAdjustmentItems.ToWhStockQuantity = e[0].Quantity
      } else {
        this.maxPlanQuantity = 0
        this.StockAdjustmentItems.ToWhStockQuantity = 0
      }
    },
    movementTypes (e) {
      if (e) {
        e.map(item => {
          if (item.RecordId === 6) {
            this.selectedmovementTypes = item.Description1
            this.selectedSearchType('MovementTypeId', item)
          }
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
