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
          <NextFormGroup item-key="FromWarehouseId" :error="$v.form.FromWarehouseId">
            <NextDropdown
              :disabled="insertReadonly.FromWarehouseId"
              url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
              :dynamic-and-condition="{ StatusIds: [1], IsVehicle: 0 }"
              @input="selectedSearchType('FromWarehouseId', $event)" />
          </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                @input="selectedSearchType('RouteId', $event)"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :page-count="500"/>
            </NextFormGroup>
          <NextFormGroup item-key="LoadingDate" :error="$v.form.LoadingDate">
            <NextDatePicker v-model="form.LoadingDate" :disabled="insertReadonly.LoadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="IsDone" :error="$v.form.IsDone">
            <NextCheckBox :disabled="insertReadonly.IsDone" v-model="form.IsDone"/>
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
              <NextDropdown :custom-option="true" or-condition-fields="Code,Description1" v-model="vanLoadingItem.Item" :disabled="!form.FromWarehouseId || !form.RouteId || !form.LoadingDate" url="VisionNextItem/api/Item/AutoCompleteSearch" @input="selectedItem" label="Description1" :dynamic-and-condition="{ StatusIds: [1], CardTypeIds: [1, 2, 8] }" searchable/>
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
              <NextInput v-if="this.vanLoadingItem.UnitCode === 'ADET'" v-model="vanLoadingItem.LoadingQuantity" type="text" @keypress="onlyForNumber($event); keypress($event);" />
              <NextInput v-else v-model="vanLoadingItem.LoadingQuantity" type="text" @keypress="onlyForCurrencyDotOrComma($event); keypress($event);" />
            </NextFormGroup>
            <b-col cols="12" md="3" class="text-right ml-auto addButton">
              <b-form-group :label="$t('insert.vanLoading.items')" label-class="v-none">
                <AddDetailButton @click.native="addItem()" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
                <NextMultipleSelection
                  name="VanLoadingMultipleItem"
                  v-model="VanLoadingItems"
                  :disabled-button="!form.FromWarehouseId || !form.RouteId || !form.LoadingDate"
                  :dynamic-and-condition="{WarehouseIds: [form.FromWarehouseId], RouteIds: [form.RouteId], DocumentDate: form.LoadingDate}"
                  :hidden-values="hiddenValues"
                  :clickable-columns="clickableColumns"
                  :validations="loadingQuantityValidation"
                />
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
                    <b-td>{{formatValue (r.LoadingQuantity)}}</b-td>
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
import insertMixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        FromWarehouseId: null,
        LoadingDate: null,
        RouteId: null,
        IsDone: 0,
        Canceled: 0,
        VanLoadingItems: []
      },
      routeName1: 'StockManagement',
      loadingQuantity: null,
      RecordId: null,
      VanLoadingItems: [],
      vanLoadingItem: {
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
        Item: null,
        UnitCode: null,
      },
      detailPanelRecordId: null,
      selectedIndex: 0,
      hiddenValues: [
        {
          mainProperty: 'FromWHStockQuantity',
          targetProperty: 'FromWhStockQuantity'
        },
        {
          mainProperty: 'LastDaySalesQuantity',
          targetProperty: 'LastdaySalesQuantity'
        },
        {
          mainProperty: 'ToWHStockQuantity',
          targetProperty: 'ToWhStockQuantity'
        }
      ],
      loadingQuantityValidation: [
        {
          mainProperty: 'LoadingQuantity',
          validation: (value, data) => {
            let normalizedValue = String(value).replace(',', '.');
            let numberValue = parseFloat(normalizedValue);
            return numberValue > 0;
          }
        }
      ],
      clickableColumns: [
        {
          mainProperty: 'AverageSalesQuantity',
          targetProperty: 'LoadingQuantity'
        },
        {
          mainProperty: 'LastSalesQuantity',
          targetProperty: 'LoadingQuantity'
        },
        {
          mainProperty: 'LastdaySalesQuantity',
          targetProperty: 'LoadingQuantity'
        },
        {
          mainProperty: 'SuggestedQuantity',
          targetProperty: 'LoadingQuantity'
        },
        {
          mainProperty: 'ToWHStockQuantity',
          targetProperty: 'LoadingQuantity'
        }
      ]
    }
  },
  computed: {
    ...mapState(['multipleItemSearch']),
    VanLoadingItemsFormatted() {
      return this.VanLoadingItems.map(item => ({
        ...item,
        LoadingQuantity: this.formatValue(item.LoadingQuantity)
      }));
    }
  },
  methods: {
    formatValue(value) {
      return value.replace(/,/g, '.');
    },
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
          this.vanLoadingItem.ItemId = e.RecordId
          this.vanLoadingItem.Description1 = e.Description1
          this.vanLoadingItem.unitId = e.UnitId
          this.vanLoadingItem.unitSetId = e.UnitSetId
          this.vanLoadingItem.UnitCode = e.UnitCode
          this.vanLoadingItem.RecordId = this.detailPanelRecordI
          if (loadingQuantity >= 0) {
            this.vanLoadingItem.IsUpdated = true
          }
          if (res.Model) {
            this.vanLoadingItem.FromWhStockQuantity = res.Model.FromWhStockQuantity
            this.vanLoadingItem.ToWhStockQuantity = res.Model.ToWhStockQuantity
            this.vanLoadingItem.AverageSalesQuantity = res.Model.AverageSalesQuantity
            this.vanLoadingItem.LastSalesQuantity = res.Model.LastSalesQuantity
            this.vanLoadingItem.LastdaySalesQuantity = res.Model.LastdaySalesQuantity
            this.vanLoadingItem.SuggestedQuantity = res.Model.SuggestedQuantity
            this.vanLoadingItem.LoadingQuantity = loadingQuantity >= 0 ? loadingQuantity : res.Model.LoadingQuantity
            this.vanLoadingItem.ConvFact1 = res.Model.ConvFact1
            this.vanLoadingItem.ConvFact2 = res.Model.ConvFact2
          } else {
            this.vanLoadingItem.FromWhStockQuantity = 0
            this.vanLoadingItem.ToWhStockQuantity = 0
            this.vanLoadingItem.AverageSalesQuantity = 0
            this.vanLoadingItem.LastSalesQuantity = 0
            this.vanLoadingItem.LastdaySalesQuantity = 0
            this.vanLoadingItem.SuggestedQuantity = 0
            this.vanLoadingItem.LoadingQuantity = loadingQuantity >= 0 ? loadingQuantity : 0
          }
          this.$forceUpdate()
        })
      }
    },
    addItem () {
      this.$v.vanLoadingItem.$touch()
      if (this.$v.vanLoadingItem.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      if (this.vanLoadingItem.FromWhStockQuantity === 0) {
        this.$toasted.show(this.$t('insert.vanLoading.fromWhStockQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      this.vanLoadingItem.LoadingQuantity = this.vanLoadingItem.LoadingQuantity ? this.vanLoadingItem.LoadingQuantity : 0
      if (this.vanLoadingItem.LoadingQuantity === 0 || this.vanLoadingItem.LoadingQuantity > this.vanLoadingItem.FromWhStockQuantity) {
        this.$toasted.show(this.$t('insert.vanLoading.loadingQuantityError'), { type: 'error', keepOnHover: true, duration: '3000' })
        return
      }
      let filteredArr = this.VanLoadingItems.filter(i => i.ItemId === this.vanLoadingItem.ItemId)
      if (filteredArr.length > 0 && !this.vanLoadingItem.IsUpdated) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.vanLoadingItem.IsUpdated) {
        this.VanLoadingItems[this.selectedIndex] = this.vanLoadingItem
        this.selectedIndex = 0
      } else {
        this.VanLoadingItems.push(this.vanLoadingItem)
      }
      this.initNullVanLoadingItem()
      this.$v.vanLoadingItem.$reset()
    },
    initNullVanLoadingItem () {
      this.vanLoadingItem = {
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
    },
    removeVanLoadingItems (item) {
      this.VanLoadingItems.splice(this.VanLoadingItems.indexOf(item), 1)
    },
    editVanLoadingItems (item) {
      let request = {
        andConditionModel: {
          RecordIds: [item.ItemId]
        }
      }
      this.$api.post(request, 'Item', 'Item/AutoCompleteSearch').then((res) => {
        if (res.ListModel && res.ListModel.BaseModels) {
          this.vanLoadingItem.Item = res.ListModel.BaseModels[0]
          this.selectedIndex = this.VanLoadingItems.indexOf(item)
          let loadingQuantity = item.LoadingQuantity ? item.LoadingQuantity : 0
          this.selectedItem(this.vanLoadingItem.Item, loadingQuantity)
        }
      })
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.form.VanLoadingItems = this.VanLoadingItems
        this.createData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      vanLoadingItem: {
        Item: {
          required
        },
        LoadingQuantity: {
          required
        }
      }
    }
  }
}
</script>
<style scoped>
.addButton  {
  margin-top:-24px;
}
</style>
