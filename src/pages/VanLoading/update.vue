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
          <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId">
            <NextDropdown v-model="warehouse" :disabled="insertReadonly.FromWarehouseId" url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch" @input="selectedSearchType('FromWarehouseId', $event)" searchable/>
          </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown v-model="route" :disabled="insertReadonly.RouteId" url="VisionNextRoute/api/Route/AutoCompleteSearch" @input="selectedSearchType('RouteId', $event)" searchable/>
            </NextFormGroup>
          <NextFormGroup item-key="IsDone" :error="$v.form.IsDone">
            <NextDropdown v-model="selectedDone" :disabled="insertReadonly.IsDone" url="VisionNextStockManagement/api/VanLoadingStatu/Search"  @input="selectedSearchType('IsDone', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="LoadingDate" :error="$v.form.LoadingDate">
            <NextDatePicker v-model="form.LoadingDate" :disabled="insertReadonly.LoadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="Canceled" :error="$v.form.Canceled" md="2">
            <NextCheckBox v-model="form.Canceled" :disabled="insertReadonly.Canceled" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.vanLoading.items')" active>
          <b-row>
            <NextFormGroup :title="$t('insert.vanLoading.items')" :error="$v.vanLoadingItem.Item">
              <NextDropdown v-model="vanLoadingItem.Item" :disabled="!form.FromWarehouseId || !form.RouteId || !form.LoadingDate" url="VisionNextItem/api/Item/AutoCompleteSearch" @input="selectedItem" label="Description1" searchable/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.FromWhStockQuantity')">
              <NextInput v-model="vanLoadingItem.FromWhStockQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.ToWhStockQuantity')">
              <NextInput v-model="vanLoadingItem.ToWhStockQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.AverageSalesQuantity')">
              <NextInput v-model="vanLoadingItem.AverageSalesQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.LastSalesQuantity')">
              <NextInput v-model="vanLoadingItem.LastSalesQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.LastdaySalesQuantity')">
              <NextInput v-model="vanLoadingItem.LastdaySalesQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.SuggestedQuantity')">
              <NextInput v-model="vanLoadingItem.SuggestedQuantity" type="text" :disabled="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.vanLoading.LoadingQuantity')" :required="true" :error="$v.vanLoadingItem.LoadingQuantity">
              <NextInput v-model="vanLoadingItem.LoadingQuantity" type="number"/>
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
                  <b-tr v-for="(r, i) in (form.VanLoadingItems ? form.VanLoadingItems.filter(i => i.RecordState !== 4) : [])" :key="i">
                    <b-td>{{r.Description1}}</b-td>
                    <b-td>{{r.FromWhStockQuantity}}</b-td>
                    <b-td>{{r.ToWhStockQuantity}}</b-td>
                    <b-td>{{r.AverageSalesQuantity}}</b-td>
                    <b-td>{{r.LastSalesQuantity}}</b-td>
                    <b-td>{{r.LastdaySalesQuantity}}</b-td>
                    <b-td>{{r.SuggestedQuantity}}</b-td>
                    <b-td>{{r.LoadingQuantity}}</b-td>
                    <b-td class="text-center">
                      <i @click="editVanLoadingItems(r)" class="fa fa-edit text-warning"></i>
                      <i @click="removeVanLoadingItems(r)" class="far fa-trash-alt text-danger"></i>
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
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [updateMixin],
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
      },
      selectedIndex: 0
    }
  },
  computed: {
    ...mapState(['vanLoadingStatus', 'itemForVanLoading'])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    selectedItem (e, loadingQuantity) {
      if (e) {
        const datas = {
          'routeId': this.form.RouteId,
          'itemCode': e.Code,
          'warehouseId': this.form.FromWarehouseId,
          'loadingDate': this.form.LoadingDate
        }
        this.detailPanelRecordId++
        this.$api.post(datas, 'Item', 'Item/GetItemSearchForVanLoading').then((res) => {
          this.vanLoadingItems.ItemId = e.RecordId
          this.vanLoadingItems.Description1 = e.Description1
          this.vanLoadingItems.unitId = e.UnitId
          this.vanLoadingItems.unitSetId = e.UnitSetId
          this.vanLoadingItems.RecordId = this.detailPanelRecordId
          if (loadingQuantity >= 0) {
            this.vanLoadingItems.IsUpdated = true
          }
          if (res.Model) {
            this.vanLoadingItems.FromWhStockQuantity = res.Model.FromWhStockQuantity
            this.vanLoadingItems.ToWhStockQuantity = res.Model.ToWhStockQuantity
            this.vanLoadingItems.AverageSalesQuantity = res.Model.AverageSalesQuantity
            this.vanLoadingItems.LastSalesQuantity = res.Model.LastSalesQuantity
            this.vanLoadingItems.LastdaySalesQuantity = res.Model.LastdaySalesQuantity
            this.vanLoadingItems.SuggestedQuantity = res.Model.SuggestedQuantity
            this.vanLoadingItems.LoadingQuantity = loadingQuantity >= 0 ? loadingQuantity : res.Model.LoadingQuantity
            this.vanLoadingItems.ConvFact1 = res.Model.ConvFact1
            this.vanLoadingItems.ConvFact2 = res.Model.ConvFact2
          } else {
            this.vanLoadingItems.FromWhStockQuantity = 0
            this.vanLoadingItems.ToWhStockQuantity = 0
            this.vanLoadingItems.AverageSalesQuantity = 0
            this.vanLoadingItems.LastSalesQuantity = 0
            this.vanLoadingItems.LastdaySalesQuantity = 0
            this.vanLoadingItems.SuggestedQuantity = 0
            this.vanLoadingItems.LoadingQuantity = loadingQuantity >= 0 ? loadingQuantity : 0
          }
          this.$forceUpdate()
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
      if (this.vanLoadingItems.FromWhStockQuantity === 0) {
        this.$toasted.show(this.$t('insert.vanLoading.fromWhStockQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      this.vanLoadingItems.LoadingQuantity = this.vanLoadingItems.LoadingQuantity ? parseInt(this.vanLoadingItems.LoadingQuantity) : 0
      if (this.vanLoadingItems.LoadingQuantity === 0 || this.vanLoadingItems.LoadingQuantity > this.vanLoadingItems.FromWhStockQuantity) {
        this.$toasted.show(this.$t('insert.vanLoading.loadingQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      this.detailPanelRecordId++
      if (this.vanLoadingItems.IsUpdated) {
        this.vanLoadingItems.RecordState = 3
        this.form.VanLoadingItems[this.selectedIndex] = this.vanLoadingItems
        this.selectedIndex = 0
        this.$forceUpdate()
      } else {
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
      }
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
    editVanLoadingItems (item) {
      let request = {
        andConditionModel: {
          RecordIds: [item.ItemId]
        }
      }
      this.$api.post(request, 'Item', 'Item/AutoCompleteSearch').then((res) => {
        if (res.ListModel && res.ListModel.BaseModels) {
          this.vanLoadingItems.Item = res.ListModel.BaseModels[0]
          this.selectedIndex = this.form.VanLoadingItems.indexOf(item)
          let loadingQuantity = item.LoadingQuantity ? parseInt(item.LoadingQuantity) : 0
          this.selectedItem(this.vanLoadingItems.Item, loadingQuantity)
        }
      })
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
