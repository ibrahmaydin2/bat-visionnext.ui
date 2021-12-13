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
            <b-form-datepicker v-model="form.LoadingDate" :placeholder="$t('insert.chooseDate')"/>
          </NextFormGroup>
          <NextFormGroup item-key="RouteId" :error="$v.form.RouteId" md="2" lg="2">
             <NextDropdown
                  url="VisionNextRoute/api/Route/Search"
                  @input="selectedSearchType('RouteId', $event)"
                  searchable
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
                :dynamic-and-condition="{ StatusIds: [1], CardTypeIds: [1, 2, 8] }"
                custom-option/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.loadingplan.PlanQuantity')" :error="$v.detailPanel.planQuantity" :required="true">
              <b-form-input type="number" @keypress="onlyForCurrencyDot($event)" min="1" v-model="detailPanel.planQuantity" />
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
                  <b-tr v-for="(r, i) in form.LoadingPlanItems" :key="i">
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
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        LoadingDate: null,
        StatusId: 1,
        RouteId: null,
        LoadingPlanItems: []
      },
      routeName1: 'StockManagement',
      detailPanel: {
        item: null,
        planQuantity: null
      }
    }
  },
  computed: {
    ...mapState([])
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
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
      let filteredArr = this.form.LoadingPlanItems.filter(i => i.ItemId === this.detailPanel.item.RecordId)
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
        UnitId: this.detailPanel.item.UnitId,
        PlanQuantity: this.detailPanel.planQuantity,
        ConvFact1: 1,
        ConvFact2: 1
      })
      this.detailPanel = {}
      this.$v.detailPanel.$reset()
    },
    removeItems (item) {
      this.form.LoadingPlanItems.splice(this.form.LoadingPlanItems.indexOf(item), 1)
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        var date = new Date()
        let tomorrow = new Date(date.setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 1)
        if (new Date(this.form.LoadingDate).setHours(0, 0, 0, 0) < tomorrow) {
          this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.loadingplan.loadingDateError') })
          return
        }
        this.createData()
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
