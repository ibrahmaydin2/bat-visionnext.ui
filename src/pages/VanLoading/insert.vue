<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'VanLoading' }">
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
          <NextFormGroup item-key="fromWarehouseId" :error="$v.form.fromWarehouseId" md="2">
            <v-select :options="warehouses" @input="selectedSearchType('fromWarehouseId', $event)" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="routeId" :error="$v.form.routeId" md="2">
              <v-select :options="routes" @input="selectedSearchType('routeId', $event)" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="isDone" :error="$v.form.isDone" md="2">
              <v-select disabled v-model="selectedDone" :options="vanLoadingStatus" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="loadingDate" :error="$v.form.loadingDate" md="2">
              <b-form-datepicker v-model="form.loadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="canceled" :error="$v.form.canceled" md="2">
            <NextCheckBox v-model="form.canceled" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.vanLoading.items')" active>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.items')">
                <v-select v-model="itemLabel" :disabled="!form.fromWarehouseId || !form.routeId || !form.loadingDate" :options="items" @search="searchItem" @input="selectedItem" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                  <template v-slot:option="option">
                    {{option.Code + ' - ' + option.Description1}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.FromWhStockQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.FromWhStockQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.ToWhStockQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.ToWhStockQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.AverageSalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.AverageSalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LastSalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.LastSalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LastdaySalesQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.LastdaySalesQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.SuggestedQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.SuggestedQuantity" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.vanLoading.LoadingQuantity')">
                <b-form-input type="text" v-model="vanLoadingItem.LoadingQuantity" />
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
                  <b-tr v-for="(r, i) in VanLoadingItems" :key="i">
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
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        fromWarehouseId: null,
        loadingDate: null,
        routeId: null,
        isDone: 0,
        canceled: 0,
        vanLoadingItems: []
      },
      selectedDone: null,
      routeName: this.$route.meta.baseLink,
      loadingQuantity: null,
      item: [],
      itemLabel: null,
      RecordId: null,
      VanLoadingItems: [],
      vanLoadingItem: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        itemId: null,
        unitId: null,
        FromWhStockQuantity: null,
        ToWhStockQuantity: null,
        AverageSalesQuantity: null,
        LastSalesQuantity: null,
        LastdaySalesQuantity: null,
        SuggestedQuantity: null,
        LoadingQuantity: null,
        unitSetId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: null
      },
      detailPanelRecordId: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'warehouses', 'routes', 'vanLoadingStatus', 'items'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getSearchItems', {...this.query,
        api: 'VisionNextWarehouse/api/Warehouse/Search',
        name: 'warehouses',
        andConditionModel: {
          'IsVehicle': 0,
          'StatusIds': [1]
        }
      })
      this.$store.dispatch('getSearchItems', {...this.query,
        api: 'VisionNextRoute/api/Route/Search',
        name: 'routes',
        andConditionModel: {
          'RouteTypeIds': [1, 6],
          'StatusIds': [1]
        }
      })
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/VanLoadingStatu/Search', name: 'vanLoadingStatus'})
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    searchItem (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
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
        this.itemLabel = e.Description1
        this.item = e
        const datas = {
          'routeId': this.form.routeId,
          'itemCode': this.item.Code,
          'warehouseId': this.form.fromWarehouseId,
          'loadingDate': this.dateConvertToISo(this.form.loadingDate)
        }
        this.detailPanelRecordId++
        this.$api.post(datas, 'Item', 'Item/GetItemSearchForVanLoading').then((res) => {
          if (res.Model) {
            this.vanLoadingItem = {
              Description1: this.itemLabel,
              unitId: e.UnitId,
              FromWhStockQuantity: e.FromWhStockQuantity,
              ToWhStockQuantity: e.ToWhStockQuantity,
              AverageSalesQuantity: e.AverageSalesQuantity,
              LastSalesQuantity: e.LastSalesQuantity,
              LastdaySalesQuantity: e.LastdaySalesQuantity,
              SuggestedQuantity: e.SuggestedQuantity,
              itemId: this.item.RecordId,
              LoadingQuantity: this.vanLoadingItem.LoadingQuantity,
              unitSetId: e.UnitSetId,
              ConvFact1: e.ConvFact1,
              ConvFact2: e.ConvFact2,
              RecordId: this.detailPanelRecordId
            }
          } else {
            this.vanLoadingItem.itemId = e.RecordId
            this.vanLoadingItem.Description1 = this.itemLabel
            this.vanLoadingItem.unitId = e.UnitId
            this.vanLoadingItem.unitSetId = e.UnitSetId
            this.vanLoadingItem.FromWhStockQuantity = 0
            this.vanLoadingItem.ToWhStockQuantity = 0
            this.vanLoadingItem.AverageSalesQuantity = 0
            this.vanLoadingItem.LastSalesQuantity = 0
            this.vanLoadingItem.LastdaySalesQuantity = 0
            this.vanLoadingItem.SuggestedQuantity = 0
            this.vanLoadingItem.LoadingQuantity = 0
            this.vanLoadingItem.RecordId = this.detailPanelRecordId
          }
        })
      }
    },
    addItem () {
      this.VanLoadingItems.push(this.vanLoadingItem)
      this.initNullVanLoadingItem()
      this.itemLabel = null
    },
    initNullVanLoadingItem () {
      this.vanLoadingItem = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        itemId: null,
        unitId: null,
        FromWhStockQuantity: null,
        ToWhStockQuantity: null,
        AverageSalesQuantity: null,
        LastSalesQuantity: null,
        LastdaySalesQuantity: null,
        SuggestedQuantity: null,
        LoadingQuantity: null,
        unitSetId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: null
      }
    },
    removeVanLoadingItems (item) {
      this.VanLoadingItems.splice(this.VanLoadingItems.indexOf(item), 1)
      this.item = []
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.form.loadingDate = this.dateConvertToISo(this.form.loadingDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        this.form.canceled = this.checkConvertToNumber(this.form.canceled)
        this.form.vanLoadingItems = this.VanLoadingItems
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
