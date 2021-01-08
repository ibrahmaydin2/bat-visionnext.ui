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
                <v-select v-model="item" :filterable="false" :options="items" @search="onItemSearch" @input="selectedItem" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.vanLoading.items')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.unit')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.FromWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.ToWhStockQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.AverageSalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.LastSalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.LastdaySalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.vanLoading.SuggestedQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in filteredVanLoadingItems" :key="i">
                    <b-td>{{r.Item ? r.Item.Label : ''}}</b-td>
                    <b-td>{{r.Unit ? r.Unit.Label : ''}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.ToWhStockQuantity}}</b-td>
                    <b-td>{{r.AverageSalesQuantity}}</b-td>
                    <b-td>{{r.LastSalesQuantity}}</b-td>
                    <b-td>{{r.LastdaySalesQuantity}}</b-td>
                    <b-td>{{r.SuggestedQuantity}}</b-td>
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
      route: null
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
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getWarehouses')
      this.$store.dispatch('getVanLoadingStatus')
      this.$store.dispatch('getData', {...this.query, api: `VisionNextStockManagement/api/${e}`, record: this.$route.params.url})

      // Farklı yerlerde farklı parametreler aldığı için buradan parametre gönderiliyor
      const routes = {
        routeTypeIds: [1, 6]
      }
      this.$store.dispatch('getRoutes', {...this.query, params: routes})
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
        this.searchItem(loading, search, this)
      }
    },
    searchItem (loading, search, vm) {
      this.$store.dispatch('acItems', {...this.query, searchField: 'Description1', searchText: search})
    },
    selectedItem (e) {
      if (!this.form.routeId || !this.form.fromWarehouseId || !this.form.loadingDate) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.item = null
        return false
      }
      if (e) {
        this.item = e.Description1
        const datas = {
          'routeId': this.form.routeId,
          'itemCode': e.Code,
          'warehouseId': this.form.fromWarehouseId,
          'loadingDate': this.dateConvertToISo(this.form.loadingDate)
        }
        this.$store.dispatch('getItemForVanLoading', {...this.query, params: datas}).then(res => {
          this.detailPanelRecordId++
          if (this.itemForVanLoading) {
            this.form.vanLoadingItems.push({
              Deleted: 0,
              System: 0,
              RecordState: 2,
              StatusId: 1,
              itemId: e.RecordId,
              unitId: this.itemForVanLoading.UnitId,
              FromWhStockQuantity: this.itemForVanLoading.FromWhStockQuantity,
              ToWhStockQuantity: this.itemForVanLoading.ToWhStockQuantity,
              AverageSalesQuantity: this.itemForVanLoading.AverageSalesQuantity,
              LastSalesQuantity: this.itemForVanLoading.LastSalesQuantity,
              LastdaySalesQuantity: this.itemForVanLoading.LastdaySalesQuantity,
              SuggestedQuantity: this.itemForVanLoading.SuggestedQuantity,
              LoadingQuantity: this.itemForVanLoading.LoadingQuantity,
              unitSetId: this.itemForVanLoading.UnitSetId,
              ConvFact1: this.itemForVanLoading.ConvFact1,
              ConvFact2: this.itemForVanLoading.ConvFact2,
              RecordId: this.detailPanelRecordId
            })
          }
        })
      } else {
        this.item = null
        this.$store.commit('setItemForVanLoading', [])
      }
    },
    removeVanLoadingItems (item) {
      this.form.vanLoadingItems.splice(this.form.vanLoadingItems.indexOf(item), 1)
      if (item.RecordState !== 2) {
        console.log(item)
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

        if (e.Route) {
          this.route = e.Route.Label
        }
        if (e.FromWarehouse) {
          this.warehouse = e.FromWarehouse.Label
        }
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
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
