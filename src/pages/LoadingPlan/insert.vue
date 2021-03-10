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
            <v-select :options="routes" @input="selectedRoute" label="Description1"></v-select>
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
        LoadingPlanItems: []
      },
      routeName: this.$route.meta.baseLink,
      loadingPlanItems: [],
      tmpSelectedItem: [],
      planQuantity: null,
      detailPanelRecordId: 0
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'items', 'routes'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      if (!this.insertRules || this.insertRules.length === 0) {
        this.$store.dispatch('getInsertRules', {...this.query, api: e}).then(() => {
          Object.keys(this.insertDefaultValue).forEach(el => {
            if (el !== 'Code' && this.insertDefaultValue[el] && this.form) {
              this.form[el] = this.insertDefaultValue[el]
            }
          })
        })
      }
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextStockManagement/api/${e}/GetCode`})
      // this.$store.dispatch('getItems')

      this.$store.dispatch('getSearchItems', {...this.query,
        api: 'VisionNextRoute/api/Route/Search',
        name: 'routes',
        andConditionModel: {
          'RouteTypeIds': [1],
          'StatusIds': [1]
        }
      })
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
        andConditionModel: {
          Description1: search
        }
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
        this.form.Code = e
      }
    }
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    // insertDefaultValue (value) {
    //   Object.keys(value).forEach(el => {
    //     if (el !== 'Code') {
    //       this.form[el] = value[el]
    //     }
    //   })
    // }
  }
}
</script>
<style lang="sass">
</style>
