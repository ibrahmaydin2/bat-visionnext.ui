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
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.RMA.General')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1 + ' - ' + (option.StatusId === 2 ? $t('insert.passive'): $t('insert.active'))}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <v-select :options="warehouses"  @search="searchWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <v-select disabled v-model="representativeName" :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1" :filterable="false">
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
            <NextFormGroup item-key="ApproveEmployeeId" :error="$v.form.ApproveEmployeeId">
              <v-select disabled v-model="approveEmployeeName" :options="employees"  @search="searchEmployee" @input="selectedSearchType('ApproveEmployeeId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveNumber" :error="$v.form.ApproveNumber">
              <b-form-input type="text" v-model="form.ApproveNumber" :readonly="insertReadonly.ApproveNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <NextDropdown lookup-key="RETURN_TYPE" get-lookup  @input="selectedType('RmaTypeId', $event)"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveDate" :error="$v.form.ApproveDate">
              <b-form-datepicker disabled v-model="form.ApproveDate" />
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <b-form-datepicker v-model="form.PriceDate" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaDate" :error="$v.form.RmaDate">
              <b-form-datepicker v-model="form.RmaDate" />
            </NextFormGroup>
            <NextFormGroup item-key="GrvNumber" :error="$v.form.GrvNumber">
              <b-form-input type="text" v-model="form.GrvNumber" :readonly="insertReadonly.GrvNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <v-select :options="routes"  @search="searchRoute" @input="selectedSearchType('RouteId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <v-select :options="rmaReasons" @input="selectedSearchType('RmaReasonId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RMA.Items')">
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')">
              <v-select :options="items" @search="searchItem" @input="selectedItem" label="Code" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')">
              <b-form-input type="text" v-model="rmaLine.Item.Description1" readonly/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Quantity')" :error="$v.rmaLine.Quantity">
              <b-form-input type="number" v-model="rmaLine.Quantity" @keypress="onlyForCurrency($event)" min=1 />
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
                  <b-tr v-for="(w, i) in rmaLines" :key="i">
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
        RmaStatusId: null,
        ApproveEmployeeId: null,
        ApproveNumber: null,
        RmaTypeId: null,
        ApproveDate: null,
        PriceDate: new Date(),
        Genexp1: null,
        RmaDate: new Date(),
        GrvNumber: null,
        RouteId: null,
        RmaReasonId: null,
        RmaLines: []
      },
      rmaLine: {
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
      },
      rmaLines: [],
      rmaStatusLabel: null,
      approveEmployeeName: null,
      representativeName: null,
      routeName1: 'Rma',
      isDivUnit: null
    }
  },
  computed: {
    ...mapState(['customers', 'employees', 'warehouses', 'routes', 'rmaReasons', 'items', 'loginUser', 'UserId'])
  },
  mounted () {
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRma/api/RmaReason/Search', name: 'rmaReasons'})
      this.getUserInfo()
    },
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.approveEmployeeName = `${userModel.Name} ${userModel.Surname}`
            this.form.ApproveEmployeeId = user.EmployeeId
            this.representativeName = `${userModel.Name} ${userModel.Surname}`
            this.form.RepresentativeId = user.EmployeeId
          }
        })
      }
    },
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/AutoCompleteSearch', 'employees', model).then(res => {
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
      this.searchItemsByModel('VisionNextWarehouse/api/Warehouse/AutoCompleteSearch', 'warehouses', model).then(res => {
        loading(false)
      })
    },
    searchRoute (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRoute/api/Route/AutoCompleteSearch', 'routes', model).then(res => {
        loading(false)
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
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
        api: 'VisionNextItem/api/Item/AutoCompleteSearch',
        name: 'items',
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ],
        andConditionModel: {
          StatusId: 1
        }
      }).then(res => {
        loading(false)
      })
    },
    addItems () {
      this.$v.rmaLine.$touch()
      if (this.$v.rmaLine.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.rmaLines.filter(i => i.Item.RecordId === this.rmaLine.Item.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      if (this.rmaLines.length > 0) {
        this.rmaLine.LineNumber = (this.rmaLines[(this.rmaLines.length) - 1].LineNumber) + 1
      }
      this.initRmaLine(this.rmaLine.Item)
      this.rmaLines.push(this.rmaLine)
      this.initNullRmaLine()
      this.$v.rmaLine.$reset()
    },
    removeItems (item) {
      this.rmaLines.splice(this.rmaLines.indexOf(item), 1)
    },
    initRmaLine (value) {
      this.rmaLine.ItemId = value.RecordId
      this.rmaLine.UnitSetId = value.UnitSetId
      this.rmaLine.UnitId = value.UnitId
      this.rmaLine.RmaQuantity1 = this.rmaLine.Quantity
      this.rmaLine.RmaUnit1Id = this.rmaLine.UnitId
    },
    initNullRmaLine () {
      this.rmaLine = {
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
        this.rmaLine.Item = e
        let filteredArr = null
        let request = {
          RecordId: e.UnitSetId
        }
        this.$api.postByUrl(request, 'VisionNextUnit/api/UnitSet/Get').then(res => {
          if (res && res.IsCompleted && res.Model.Units.length > 0) {
            filteredArr = res.Model.Units.filter(i => i.UnitId === e.UnitId)
            this.isDivUnit = filteredArr[0].IsDivUnit
          }
        })
      } else {
        this.rmaLine.Item = {
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
        this.form.RmaLines = this.rmaLines
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
      rmaLine: {
        Quantity: {
          required
        }
      }
    }
  },
  watch: {
    lookup: {
      handler (e) {
        if (e.RMA_STATUS) {
          this.rmaStatusLabel = e.RMA_STATUS[0].Label
          this.form.RmaStatusId = e.RMA_STATUS[0].DecimalValue
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
