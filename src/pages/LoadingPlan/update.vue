<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'LoadingPlan' }">
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
          <NextFormGroup item-key="Code" :error="$v.form.Code" md="2" lg="2">
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="2" lg="2">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="LoadingDate" :error="$v.form.LoadingDate" md="2" lg="2">
            <b-form-datepicker v-model="form.LoadingDate" />
          </NextFormGroup>
          <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
             <NextDropdown
                  v-model="selectedRoute"
                  url="VisionNextRoute/api/Route/Search"
                  @input="selectedSearchType('RouteId', $event)"
                  :dynamic-and-condition="{RouteTypeIds: [1], StatusIds: [1]}" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="2" lg="2">
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.loadingplan.items')" active>
          <b-row>
           <NextFormGroup :title="$t('insert.loadingplan.items')" :error="$v.detailPanel.item" :required="true">
               <NextDropdown
                v-model="detailPanel.item"
                url="VisionNextItem/api/Item/AutoCompleteSearch"
                searchable
                or-condition-fields="Code,Description1"
                custom-option/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loadingplan.PlanQuantity')" :error="$v.detailPanel.planQuantity" :required="true">
              <b-form-input type="text" v-model="detailPanel.planQuantity" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addItems" />
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
                    <b-td>{{r.Item ? r.Item.Label : r.Description1}}</b-td>
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
import mixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
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
      routeName1: 'StockManagement',
      detailPanel: {
        item: null,
        planQuantity: null
      },
      selectedRoute: null
    }
  },
  computed: {
    ...mapState([]),
    loadingPlanItems () {
      return this.form.LoadingPlanItems ? this.form.LoadingPlanItems.filter(i => i.RecordState !== 4) : []
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = {
        Code: rowData.Code,
        Description1: rowData.Description1,
        LoadingDate: rowData.LoadingDate,
        StatusId: rowData.StatusId,
        RouteId: rowData.RouteId,
        LoadingPlanItems: rowData.LoadingPlanItems,
        RecordId: rowData.RecordId
      }
      this.selectedRoute = this.convertLookupValueToSearchValue(rowData.Route)
    },
    addItems () {
      this.$v.detailPanel.$touch()
      if (this.$v.detailPanel.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.LoadingPlanItems.filter(i => i.ItemId === this.detailPanel.item.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.form.LoadingPlanItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.detailPanel.item.Code,
        ItemId: this.detailPanel.item.RecordId,
        Description1: this.detailPanel.item.Description1,
        UnitSetId: this.detailPanel.item.UnitSetId,
        UnitId: null,
        PlanQuantity: this.detailPanel.planQuantity,
        ConvFact1: 1,
        ConvFact2: 1
      })
      this.detailPanel = {}
      this.$v.detailPanel.$reset()
    },
    removeItems (item) {
      if (item.RecordId > 0) {
        this.form.LoadingPlanItems[this.form.LoadingPlanItems.indexOf(item)].RecordState = 4
      } else {
        this.form.LoadingPlanItems.splice(this.form.LoadingPlanItems.indexOf(item), 1)
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.updateData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      detailPanel: {
        item: {
          required
        },
        planQuantity: {
          required
        }
      }
    }
  },
  watch: {
  }
}
</script>
