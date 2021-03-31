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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="LoadingDate" :error="$v.form.LoadingDate">
            <b-form-datepicker v-model="form.LoadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
            <v-select v-model="routeLabel" :options="routes" @input="selectedRoute" label="Description1"></v-select>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loadingplan.items')" active>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('insert.loadingplan.items')">
                <v-select :filterable="false" :options="items" @search="onItemSearch" @input="selectedItem" label="Description1">
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
              <b-form-group :label="$t('insert.loadingplan.PlanQuantity')">
                <b-form-input type="text" v-model="planQuantity" />
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
                  <b-th><span>{{$t('insert.loadingplan.items')}}</span></b-th>
                  <b-th><span>{{$t('insert.loadingplan.PlanQuantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in loadingPlanItems" :key="i">
                    <b-td>{{r.Description1}}</b-td>
                    <b-td>{{r.PlanQuantity}}</b-td>
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
        Code: null,
        Description1: null,
        LoadingDate: null,
        StatusId: null,
        RouteId: null,
        LoadingPlanItems: [],
        RecordId: null
      },
      routeName: this.$route.meta.baseLink,
      tmpSelectedItem: [],
      planQuantity: null,
      detailPanelRecordId: 0,
      route: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertRules', 'insertRequired', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'rowData', 'items', 'routes']),
    loadingPlanItems () {
      return this.form.LoadingPlanItems.filter(i => i.RecordState !== 4)
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
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextStockManagement/api/${e}/GetCode`})

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
    selectedItem (e) {
      if (e) {
        this.tmpSelectedItem = e
      } else {
        this.tmpSelectedItem = null
      }
    },
    selectedRoute (e) {
      if (e) {
        this.form.RouteId = e.RecordId
      } else {
        this.form.RouteId = null
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
    addItems () {
      if (this.tmpSelectedItem.length < 1 || !this.planQuantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return
      }
      this.detailPanelRecordId++
      this.form.LoadingPlanItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.tmpSelectedItem.Code,
        ItemId: this.tmpSelectedItem.RecordId,
        Description1: this.tmpSelectedItem.Description1,
        UnitSetId: this.tmpSelectedItem.UnitSetId,
        UnitId: null,
        PlanQuantity: this.planQuantity,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: this.detailPanelRecordId
      })
    },
    removeItems (item) {
      this.form.LoadingPlanItems.splice(this.form.LoadingPlanItems.indexOf(item), 1)
      if (item.RecordState !== 2) {
        this.form.LoadingPlanItems.push({
          Deleted: 1,
          System: 0,
          RecordState: 4,
          StatusId: 1,
          Code: item.Code,
          ItemId: item.RecordId,
          Description1: item.Description1,
          UnitSetId: item.UnitSetId,
          UnitId: null,
          PlanQuantity: item.planQuantity,
          ConvFact1: 1,
          ConvFact2: 1,
          RecordId: item.RecordId
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.form.LoadingDate = this.dateConvertToISo(this.form.LoadingDate)
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
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
    rowData (e) {
      if (e) {
        this.form = {
          Code: e.Code,
          Description1: e.Description1,
          LoadingDate: e.LoadingDate,
          StatusId: this.numberConvertToString(e.StatusId),
          RouteId: e.RouteId,
          LoadingPlanItems: e.LoadingPlanItems,
          RecordId: e.RecordId
        }
        this.route = this.convertLookupValueToSearchValue(e.Route)
      }
    }
  }
}
</script>
<style lang="sass">
</style>
