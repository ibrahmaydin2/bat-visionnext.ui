<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Rma' }">
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
        <b-tab :title="$t('get.RMA.General')" active>
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
              <NextDropdown
                @input="selectedSearchType('CustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                label="Description1"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"
                :disabled="insertReadonly.CustomerId"/>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <NextDropdown
                @input="selectedSearchType('WarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1], IsVehicle: 0 }"
                label="Description1"
                :disabled="insertReadonly.WarehouseId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable
                or-condition-fields="Code,Description1,Name,Surname"
                :dynamic-and-condition="{ StatusIds: [1] }"
                v-model="representativeName"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <NextDropdown
                :disabled="insertReadonly.RmaStatusId"
                lookup-key="RMA_STATUS"
                @input="selectedType('RmaStatusId', $event)"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveEmployeeId" :error="$v.form.ApproveEmployeeId">
              <NextDropdown
                @input="selectedSearchType('ApproveEmployeeId', $event)"
                :disabled="insertReadonly.ApproveEmployeeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveNumber" :error="$v.form.ApproveNumber">
              <NextInput type="text" v-model="form.ApproveNumber" :disabled="insertReadonly.ApproveNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <NextDropdown :disabled="insertReadonly.RmaTypeId" lookup-key="RETURN_TYPE" get-lookup  @input="selectedType('RmaTypeId', $event)"></NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="ApproveDate" :error="$v.form.ApproveDate">
              <NextDatePicker :disabled="insertReadonly.ApproveDate" v-model="form.ApproveDate" />
            </NextFormGroup>
            <NextFormGroup item-key="PriceDate" :error="$v.form.PriceDate">
              <NextDatePicker v-model="form.PriceDate" :disabled="insertReadonly.PriceDate" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaDate" :error="$v.form.RmaDate">
              <NextDatePicker v-model="form.RmaDate" :disabled="insertReadonly.RmaDate"/>
            </NextFormGroup>
            <NextFormGroup item-key="GrvNumber" :error="$v.form.GrvNumber">
              <NextInput type="text" v-model="form.GrvNumber" :disabled="insertReadonly.GrvNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RouteId" :error="$v.form.RouteId">
              <NextDropdown
                @input="selectedSearchType('RouteId', $event)"
                :disabled="insertReadonly.RouteId"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                :order-by-columns="[ { Column: 'Description1', OrderByType: 0 } ]"
                :dynamic-and-condition="{ StatusIds: [1] }"
                :page-count="500"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RmaReasonId" :error="$v.form.RmaReasonId">
              <NextDropdown
                @input="selectedSearchType('RmaReasonId', $event)"
                :disabled="insertReadonly.RmaReasonId"
                url="VisionNextRma/api/RmaReason/Search"
                label="Description1"
              />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RMA.Items')" :disabled="!form.CustomerId">
          <b-row>
            <NextFormGroup :title="$t('insert.RMA.Item')" :required="true" :error="$v.rmaLine.Item.ItemId" md="3" lg="3">
              <NextDropdown
                v-model="rmaLine.Item"
                :search="searchItem"
                label="Code"
                searchable
                :custom-option="true" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.ItemName')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.Description1" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.lastSalesQuantity')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.LastSalesQuantity" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.lastSalesPrice')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.LastPrice" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.Cardboard')" :required="true" :error="$v.rmaLine.Quantity" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Quantity" @keypress="onlyForCurrencyDotOrComma($event); keypress($event)" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.meanPrice')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.MeanPrice" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.listPrice')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.ListPrice" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.RMA.usedPrice')" md="3" lg="3">
              <NextInput type="text" v-model="rmaLine.Item.UsedPrice" :disabled="true"/>
            </NextFormGroup>
            <b-col cols="12" md="6" lg="6">
              <b-row>
                <b-col md="3">
                  <b-form-group>
                    <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <NextMultipleSelection
                    name="RmaMultipleItem"
                    v-model="rmaLines"
                    :disabled-button="!form.CustomerId"
                    :dynamic-and-condition="{
                      CustomerIds: [form.CustomerId],
                      PriceDate: form.PriceDate
                    }"
                    :filter-func="(row) => row.Quantity > 0" />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.RMA.Item')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.ItemName')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.Quantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.UsedQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.lastSalesQuantity')}}</span></b-th>
                  <b-th><span>{{$t('insert.RMA.usedPrice')}}</span></b-th>
                  <b-th><span>{{$t('list.operations')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(w, i) in rmaLines" :key="i">
                    <b-td>{{w.Item ? w.Item.Code : w.Code}}</b-td>
                    <b-td>{{w.Item ? w.Item.Description1 : w.Description1}}</b-td>
                    <b-td>{{formatValue(w.Quantity)}}</b-td>
                    <b-td>{{w.Item ? w.Item.SalesQuantity1 :  w.SalesQuantity1 }}</b-td>
                    <b-td>{{w.Item ? w.Item.LastSalesQuantity : w.LastSalesQuantity}}</b-td>
                    <b-td>{{getPrice(w)}}</b-td>
                    <b-td class="text-center">
                      <b-button :title="$t('list.delete')" @click="removeItems(w)" class="btn mr-2 btn-danger btn-sm">
                        <i class="far fa-trash-alt"></i>
                      </b-button>
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
        Item: {}
      },
      rmaLines: [],
      representativeName: null,
      routeName1: 'Rma'
    }
  },
  computed: {
    ...mapState(['loginUser', 'UserId']),
    RmaItemsFormatted() {
      return this.rmaLines.map(item => ({
        ...item,
        Quantity: this.formatValue(item.Quantity)
      }));
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    formatValue(value) {
      return value.replace(/,/g, '.');
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
            if (user && `${user.BranchId}` === `${this.$store.state.BranchId}`) {
              this.representativeName = `${userModel.Name} ${userModel.Surname}`
              this.form.RepresentativeId = user.EmployeeId
            }
          }
        })
      }
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
      let filteredArr = this.rmaLines.filter(i => i.ItemId === this.rmaLine.Item.ItemId)
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
      this.rmaLine.ItemId = value.ItemId
      this.rmaLine.Price = value.ListPrice
      this.rmaLine.LastPrice = value.LastPrice
      this.rmaLine.MeanPrice = value.MeanPrice
      this.rmaLine.UsedPrice = value.UsedPrice
      this.rmaLine.LastSalesQuantity = value.LastSalesQuantity
      this.rmaLine.UnitSetId = value.UnitSetId
      this.rmaLine.UnitId = value.UnitId
      this.rmaLine.RmaQuantity1 = this.rmaLine.Quantity
      this.rmaLine.RmaUnit1Id = this.rmaLine.UnitId
      this.rmaLine.Code = value.Code
      this.rmaLine.Description1 = value.Description1
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
          Code: ''
        }
      }
    },
    searchItem (search) {
      let model = {
        orConditionModels: [
          {
            Description1: search,
            Code: search
          }
        ],
        andConditionModel: {
          CustomerIds: this.form.CustomerId ? [this.form.CustomerId] : null,
          PriceDate: this.form.PriceDate,
          StatusIds: [1],
          CardTypeIds: [1, 2, 8]
        }
      }
      return this.$api.postByUrl(model, 'VisionNextItem/api/Item/GetItemSearchForRMAProductManagement').then(res => {
        return res.ListModel.BaseModels
      })
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
        this.form.RmaLines = this.rmaLines.map(r => {
          r.RmaReasonId = this.form.RmaReasonId

          return r
        })
        this.createData()
      }
    },
    getPrice (data) {
      if (data.item) {
        if (data.item.Price) {
          return data.item.Price
        } else {
          return data.item.UsedPrice
        }
      } else if (data.Price) {
        return data.Price
      } else {
        return data.UsedPrice
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      rmaLine: {
        Quantity: {
          required
        },
        Item: {
          ItemId: {
            required
          }
        }
      }
    }
  }
}
</script>
