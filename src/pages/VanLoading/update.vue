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
          <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId" md="2">
            <v-select v-model="warehouse" :options="warehouses" @input="selectedSearchType('FromWarehouseId', $event)" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2">
              <v-select v-model="route" :options="routes" @input="selectedSearchType('RouteId', $event)" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="IsDone" :error="$v.form.IsDone" md="2">
              <v-select disabled v-model="selectedDone" :options="vanLoadingStatus" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="LoadingDate" :error="$v.form.LoadingDate" md="2">
              <b-form-datepicker v-model="form.LoadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="Canceled" :error="$v.form.Canceled" md="2">
            <NextCheckBox v-model="form.Canceled" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.vanLoading.items')" active>
          <b-row>
            <NextFormGroup :title="$t('insert.vanLoading.items')" :required="true" :error="$v.vanLoadingItems.Item" md="3">
               <v-select v-model="vanLoadingItems.Item" :disabled="!form.FromWarehouseId || !form.RouteId || !form.LoadingDate" :options="items" @search="searchItem" @input="selectedItem" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1}}
                  </template>
                </v-select>
             </NextFormGroup>
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
            <NextFormGroup :title="$t('insert.vanLoading.LoadingQuantity')" :required="true" :error="$v.vanLoadingItems.LoadingQuantity" md="3">
              <b-form-input type="number" v-model="vanLoadingItems.LoadingQuantity" />
            </NextFormGroup>
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
import mixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        FromWarehouseId: null,
        LoadingDate: null,
        RouteId: null,
        IsDone: null,
        Canceled: 0,
        StatusId: 1,
        VanLoadingItems: [],
        RecordId: null
      },
      selectedDone: null,
      routeName1: 'StockManagement',
      loadingQuantity: null,
      RecordId: null,
      warehouse: null,
      route: null,
      vanLoadingItems: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        ItemId: null,
        UnitId: null,
        FromWhStockQuantity: null,
        ToWhStockQuantity: null,
        AverageSalesQuantity: null,
        LastSalesQuantity: null,
        LastdaySalesQuantity: null,
        SuggestedQuantity: null,
        LoadingQuantity: null,
        UnitSetId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: null,
        Item: null
      }
    }
  },
  computed: {
    ...mapState(['warehouses', 'routes', 'vanLoadingStatus', 'items', 'itemForVanLoading']),
    filteredVanLoadingItems () {
      return this.form.VanLoadingItems.filter(i => i.RecordState !== 4)
    }
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.getData().then(() => this.setData())
  },
  methods: {
    getInsertPage (e) {
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
    selectedItem (e) {
      if (e) {
        const datas = {
          'routeId': this.form.RouteId,
          'itemCode': e.Code,
          'warehouseId': this.form.FromWarehouseId,
          'loadingDate': this.form.LoadingDate
        }
        this.detailPanelRecordId++
        this.$api.post(datas, 'Item', 'Item/GetItemSearchForVanLoading').then((res) => {
          if (res.Model) {
            this.vanLoadingItems = {
              Description1: e.Description1,
              unitId: e.UnitId,
              FromWhStockQuantity: e.FromWhStockQuantity,
              ToWhStockQuantity: e.ToWhStockQuantity,
              AverageSalesQuantity: e.AverageSalesQuantity,
              LastSalesQuantity: e.LastSalesQuantity,
              LastdaySalesQuantity: e.LastdaySalesQuantity,
              SuggestedQuantity: e.SuggestedQuantity,
              ItemId: e.RecordId,
              LoadingQuantity: e.LoadingQuantity,
              unitSetId: e.UnitSetId,
              ConvFact1: e.ConvFact1,
              ConvFact2: e.ConvFact2,
              RecordId: this.detailPanelRecordId
            }
          } else {
            this.vanLoadingItems.ItemId = e.RecordId
            this.vanLoadingItems.Description1 = e.Description1
            this.vanLoadingItems.unitId = e.UnitId
            this.vanLoadingItems.unitSetId = e.UnitSetId
            this.vanLoadingItems.FromWhStockQuantity = 0
            this.vanLoadingItems.ToWhStockQuantity = 0
            this.vanLoadingItems.AverageSalesQuantity = 0
            this.vanLoadingItems.LastSalesQuantity = 0
            this.vanLoadingItems.LastdaySalesQuantity = 0
            this.vanLoadingItems.SuggestedQuantity = 0
            this.vanLoadingItems.LoadingQuantity = 0
            this.vanLoadingItems.RecordId = this.detailPanelRecordId
          }
        })
      }
    },
    addItem () {
      this.$v.vanLoadingItems.$touch()
      if (this.$v.vanLoadingItems.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.detailPanelRecordId++
      this.form.VanLoadingItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        ItemId: this.vanLoadingItems.Item.RecordId,
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
        Description1: this.vanLoadingItems.Item.Description1
      })
      this.vanLoadingItems = {}
      this.$v.vanLoadingItems.$reset()
    },
    removeVanLoadingItems (item) {
      if (item.RecordId > 0) {
        this.form.VanLoadingItems[this.form.VanLoadingItems.indexOf(item)].RecordState = 4
      } else {
        this.form.VanLoadingItems.splice(this.form.VanLoadingItems.indexOf(item), 1)
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.updateData()
      }
    },
    setData () {
      let rowData = this.rowData
      if (rowData) {
        this.form = {
          FromWarehouseId: rowData.FromWarehouseId,
          LoadingDate: rowData.LoadingDate,
          RouteId: rowData.RouteId,
          IsDone: rowData.IsDone,
          Canceled: rowData.Canceled,
          StatusId: rowData.StatusId,
          VanLoadingItems: rowData.VanLoadingItems,
          RecordId: rowData.RecordId
        }

        rowData.VanLoadingItems.map(item => {
          item.Description1 = item.Item && item.Item.Label
        })
        this.route = this.convertLookupValueToSearchValue(rowData.Route)
        this.warehouse = this.convertLookupValueToSearchValue(rowData.FromWarehouse)
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      vanLoadingItems: {
        Item: {
          required
        },
        LoadingQuantity: {
          required
        }
      }
    }
  },
  watch: {
    itemForVanLoading (e) {
      if (e) {
        this.vanLoadingItems = {
          Description1: this.vanLoadingItems.Item.Description1,
          UnitId: e.UnitId,
          FromWhStockQuantity: e.FromWhStockQuantity,
          ToWhStockQuantity: e.ToWhStockQuantity,
          AverageSalesQuantity: e.AverageSalesQuantity,
          LastSalesQuantity: e.LastSalesQuantity,
          LastdaySalesQuantity: e.LastdaySalesQuantity,
          SuggestedQuantity: e.SuggestedQuantity,
          ItemId: this.vanLoadingItems.Item.RecordId,
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
            this.selectedSearchType('IsDone', item)
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
