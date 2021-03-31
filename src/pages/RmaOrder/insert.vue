<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'RmaOrder' }">
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
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.RmaOrder.General')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <v-select :options="warehouses"  @search="searchWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaOrderDate" :error="$v.form.RmaOrderDate">
              <b-form-datepicker v-model="form.RmaOrderDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <v-select
                :options="lookup.RETURN_TYPE"
                @input="selectedType('RmaTypeId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <b-form-datepicker v-model="form.PriceDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <v-select :options="rmaReasons" @input="selectedSearchType('RmaReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <v-select
                disabled
                v-model="rmaStatusLabel"
                :options="lookup.RMA_STATUS"
                @input="selectedType('RmaStatusId', $event)"
                label="Label"
              />
            </NextFormGroup>
          </b-row>
                    <hr />
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')">
              <v-select :options="items" v-model="rmaOrderLine.Item.Code" @search="searchItem" @input="selectedItem" label="Code">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')">
              <b-form-input type="text" v-model="rmaOrderLine.Item.Description1" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Quantity')" :error="$v.rmaOrderLine.Quantity">
              <b-form-input type="text" v-model="rmaOrderLine.Quantity"/>
            </NextFormGroup>
            <b-col md="1" class="ml-auto">
              <b-form-group>
                <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.RMA.Item')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.ItemName')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.Quantity')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rmaOrderLines" :key="i">
                    <b-td>{{w.Item.Code}}</b-td>
                    <b-td>{{w.Item.Description1}}</b-td>
                    <b-td>{{w.Quantity}}</b-td>
                    <b-td class="text-center"><i @click="removeItems(w)" class="far fa-trash-alt text-danger"></i></b-td>
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
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: null,
        WarehouseId: null,
        RepresentativeId: null,
        Genexp1: null,
        RmaOrderDate: new Date(),
        RmaTypeId: null,
        PriceDate: new Date(),
        RmaReasonId: null,
        RmaStatusId: 2,
        RmaOrderLine: []
      },
      rmaOrderLine: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      },
      rmaOrderLines: [],
      rmaStatusLabel: null,
      routeName1: 'Rma'
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['customers', 'warehouses', 'employees', 'rmaReasons', 'items'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRma/api/RmaReason/Search', name: 'rmaReasons'})
      // Sayfa açılışında yüklenmesi gereken search items için kullanılır.
      // lookup harici dataya ihtiyaç yoksa silinebilir
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchWarehouse (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextWarehouse/api/Warehouse/Search', 'warehouses', model).then(res => {
        loading(false)
      })
    },
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/Search', 'employees', model).then(res => {
        loading(false)
      })
    },
    searchRmaReason (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRma/api/RmaReason/Search', 'rmaReasons', model).then(res => {
        loading(false)
      })
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
    addItems () {
      this.$v.rmaOrderLine.$touch()
      if (this.$v.rmaOrderLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.rmaOrderLines.filter(i => i.Item.RecordId === this.rmaOrderLine.Item.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.rmaOrderLines.length > 0) {
        this.rmaOrderLine.LineNumber = (this.rmaOrderLines[(this.rmaOrderLines.length) - 1].LineNumber) + 1
      }
      this.initRmaOrderLine(this.rmaOrderLine.Item)
      this.rmaOrderLines.push(this.rmaOrderLine)
      this.initNullRmaOrderLine()
      this.items = []
      this.$v.rmaOrderLine.$reset()
    },
    removeItems (item) {
      this.rmaOrderLines.splice(this.rmaOrderLines.indexOf(item), 1)
    },
    initRmaOrderLine (value) {
      this.rmaOrderLine.ItemId = value.RecordId
      this.rmaOrderLine.UnitSetId = value.UnitSetId
      this.rmaOrderLine.UnitId = value.UnitId
      this.rmaOrderLine.RmaQuantity1 = this.rmaOrderLine.Quantity
      this.rmaOrderLine.RmaUnit1Id = this.rmaOrderLine.UnitId
    },
    initNullRmaOrderLine () {
      this.rmaOrderLine = {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        RmaReasonId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Price: null,
        Item: {
          Description1: null,
          Code: null,
          RecordId: null
        }
      }
    },
    selectedItem (e) {
      if (e) {
        this.rmaOrderLine.Item = e
      } else {
        this.rmaOrderLine.Item = {
          Description1: null,
          Code: null,
          RecordId: null
        }
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.RmaOrderLine = this.rmaOrderLines
        this.createData()
        // update işlemiyse
        // this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules,
      rmaOrderLine: {
        Quantity: {
          required
        }
      }
    }
  },
  watch: {
    lookup (e) {
      if (e.RMA_STATUS) {
        this.rmaStatusLabel = e.RMA_STATUS[0].Label
      }
    }
  }
}
</script>
