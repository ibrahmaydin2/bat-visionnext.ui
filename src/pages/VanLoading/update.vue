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
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.fromWarehouseId != null ? insertVisible.fromWarehouseId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.fromWarehouseId + (insertRequired.fromWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.fromWarehouseId.$error }">
              <v-select v-model="warehouse" :options="warehouses" @input="selectedSearchType('fromWarehouseId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.routeId != null ? insertVisible.routeId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.routeId + (insertRequired.routeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.routeId.$error }">
              <v-select v-model="route" :options="routes" @input="selectedSearchType('routeId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.isDone != null ? insertVisible.isDone : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.isDone + (insertRequired.isDone === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.isDone.$error }">
              <v-select disabled v-model="selectedDone" :options="vanLoadingStatus" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.loadingDate != null ? insertVisible.loadingDate : developmentMode" :start-weekday="1" cols="12" md="2">
            <b-form-group :label="insertTitle.loadingDate + (insertRequired.loadingDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.loadingDate.$error }">
              <b-form-datepicker v-model="form.loadingDate" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.canceled != null ? insertVisible.canceled : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.canceled + (insertRequired.canceled === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.canceled.$error }">
              <b-form-checkbox v-model="form.canceled" name="check-button" switch>
                  {{(form.canceled) ? $t('insert.active'): $t('insert.passive')}}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.vanLoading.items')" active>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.items')">
                <v-select v-model="itemLabel" :filterable="false" :options="items" @search="onItemSearch" @input="selectedItem" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.FromWhStockQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.FromWhStockQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.ToWhStockQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.ToWhStockQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.AverageSalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.AverageSalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LastSalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.LastSalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LastdaySalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.LastdaySalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.SuggestedQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.SuggestedQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LoadingQuantity')">
                <b-form-input type="text" v-model="vanLoadingItems.LoadingQuantity" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" class="text-right ml-auto">
              <b-form-group :label="$t('insert.vanLoading.items')" label-class="v-none">
                <AddDetailButton @click.native="addItem()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.vanLoading.items')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.FromWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.ToWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.AverageSalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.LastSalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.LastdaySalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.SuggestedQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.LoadingQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in filteredVanLoadingItems" :key="i">
                    <b-td>{{r.Description1}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.ToWhStockQuantity}}</b-td>
                    <b-td>{{r.AverageSalesQuantity}}</b-td>
                    <b-td>{{r.LastSalesQuantity}}</b-td>
                    <b-td>{{r.LastdaySalesQuantity}}</b-td>
                    <b-td>{{r.SuggestedQuantity}}</b-td>
                    <b-td>{{r.LoadingQuantity}}</b-td>
                    <b-td class="text-center"><i @click="removeVanLoadingItems(r)" class="far fa-trash-alt text-danger"></i></b-td>
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
        fromWarehouseId: null,
        loadingDate: null,
        routeId: null,
        isDone: null,
        canceled: 0,
        StatusId: 1,
        vanLoadingItems: [],
        RecordId: null
      },
      selectedDone: null,
      routeName: this.$route.meta.baseLink,
      loadingQuantity: null,
      item: null,
      RecordId: 0,
      warehouse: null,
      route: null,
      itemLabel: null,
      vanLoadingItems: []

    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'rowData', 'warehouses', 'routes', 'vanLoadingStatus', 'items', 'itemForVanLoading']),
    filteredVanLoadingItems () {
      return this.form.vanLoadingItems.filter(i => i.RecordState !== 4)
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getSearchItems', {...this.query,
        api: 'VisionNextWarehouse/api/Warehouse/Search',
        name: 'warehouses',
        andConditionModel: {
          'IsVehicle': 0,
          'StatusIds': [1]
        }
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/VanLoadingStatu/Search', name: 'vanLoadingStatus'})
      this.$store.dispatch('getSearchItems', {...this.query,
        api: 'VisionNextRoute/api/Route/Search',
        name: 'routes',
        andConditionModel: {
          'RouteTypeIds': [1],
          'StatusIds': [1]
        }
      })
      this.$store.dispatch('getData', {...this.query, api: `VisionNextStockManagement/api/${e}`, record: this.$route.params.url})
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    onItemSearch (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.searchItem(loading, search, this)
      }
    },
    searchItem (loading, search, vm) {
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
    selectedItem (e) {
      if (e) {
        this.itemLabel = e.Description1
        this.item = e
        const datas = {
          'routeId': this.form.routeId,
          'itemCode': this.item.Code,
          'warehouseId': this.form.fromWarehouseId,
          'loadingDate': this.dateConvertToISo(this.form.loadingDate)
        }
        this.$store.dispatch('getItemForVanLoading', {...this.query, params: datas})
      } else {
        this.itemLabel = null
        this.form.vanLoadingItems = []
      }
    },
    addItem () {
      this.detailPanelRecordId++
      this.form.vanLoadingItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        ItemId: this.item.RecordId,
        UnitId: this.vanLoadingItems.UnitId,
        FromWhStockQuantity: this.vanLoadingItems.FromWhStockQuantity,
        ToWhStockQuantity: this.vanLoadingItems.ToWhStockQuantity,
        AverageSalesQuantity: this.vanLoadingItems.AverageSalesQuantity,
        LastSalesQuantity: this.vanLoadingItems.LastSalesQuantity,
        LastdaySalesQuantity: this.vanLoadingItems.LastdaySalesQuantity,
        SuggestedQuantity: this.vanLoadingItems.SuggestedQuantity,
        LoadingQuantity: this.vanLoadingItems.LoadingQuantity,
        unitSetId: this.vanLoadingItems.UnitSetId,
        ConvFact1: this.vanLoadingItems.ConvFact1,
        ConvFact2: this.vanLoadingItems.ConvFact2,
        RecordId: this.detailPanelRecordId,
        Description1: this.vanLoadingItems.Description1
      })
      this.vanLoadingItems = []
      this.itemLabel = null
    },
    removeVanLoadingItems (item) {
      this.form.vanLoadingItems.splice(this.form.vanLoadingItems.indexOf(item), 1)
      if (item.RecordState !== 2) {
        this.form.vanLoadingItems.push({
          Deleted: 1,
          System: 0,
          RecordState: 4,
          StatusId: 1,
          itemId: item.ItemId,
          unitId: item.UnitId,
          FromWhStockQuantity: item.FromWhStockQuantity,
          ToWhStockQuantity: item.ToWhStockQuantity,
          AverageSalesQuantity: item.AverageSalesQuantity,
          LastSalesQuantity: item.LastSalesQuantity,
          LastdaySalesQuantity: item.LastdaySalesQuantity,
          SuggestedQuantity: item.SuggestedQuantity,
          LoadingQuantity: item.LoadingQuantity,
          unitSetId: item.UnitSetId,
          ConvFact1: item.ConvFact1,
          ConvFact2: item.ConvFact2,
          RecordId: item.RecordId
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.form.loadingDate = this.dateConvertToISo(this.form.loadingDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.canceled = this.checkConvertToNumber(this.form.canceled)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextStockManagement/api/${this.routeName}`, formdata: model, return: this.routeName})
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
    rowData (e) {
      if (e) {
        this.form = {
          fromWarehouseId: e.FromWarehouseId,
          loadingDate: this.dateConvertToISo(e.LoadingDate),
          routeId: e.RouteId,
          isDone: e.IsDone,
          canceled: this.numberConvertToString(e.Canceled),
          StatusId: this.numberConvertToString(e.StatusId),
          vanLoadingItems: e.VanLoadingItems,
          RecordId: e.RecordId
        }

        e.VanLoadingItems.map(item => {
          item.Description1 = item.Item && item.Item.Label
        })

        if (e.Route) {
          this.route = e.Route.Label
        }
        if (e.FromWarehouse) {
          this.warehouse = e.FromWarehouse.Label
        }
      }
    },
    itemForVanLoading (e) {
      if (e) {
        this.vanLoadingItems = {
          Description1: this.itemLabel,
          UnitId: e.UnitId,
          FromWhStockQuantity: e.FromWhStockQuantity,
          ToWhStockQuantity: e.ToWhStockQuantity,
          AverageSalesQuantity: e.AverageSalesQuantity,
          LastSalesQuantity: e.LastSalesQuantity,
          LastdaySalesQuantity: e.LastdaySalesQuantity,
          SuggestedQuantity: e.SuggestedQuantity,
          ItemId: this.item.RecordId,
          LoadingQuantity: this.vanLoadingItems.LoadingQuantity,
          unitSetId: e.UnitSetId,
          ConvFact1: e.ConvFact1,
          ConvFact2: e.ConvFact2
        }
      }
    },
    vanLoadingStatus (e) {
      if (e) {
        e.map(item => {
          if (item.RecordId === 0) {
            this.selectedSearchType('isDone', item)
            this.selectedDone = item.Description1
          }
        })
      }
    }
  }
}
</script>
<style lang="sass">
</style>
