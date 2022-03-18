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
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.RMA.General')" active>
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <NextDropdown
                v-model="customer"
                @input="selectedSearchType('CustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                :disabled="insertReadonly.CustomerId"
                label="Description1"
                or-condition-fields="Code,Description1,CommercialTitle"
                :is-customer="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="WarehouseId" :error="$v.form.WarehouseId">
              <NextDropdown
                v-model="warehouse"
                @input="selectedSearchType('WarehouseId', $event)"
                url="VisionNextWarehouse/api/Warehouse/AutoCompleteSearch"
                :dynamic-and-condition="{ StatusIds: [1], IsVehicle: 0 }"
                label="Description1"
                :disabled="insertReadonly.WarehouseId"/>
            </NextFormGroup>
            <NextFormGroup item-key="RepresentativeId" :error="$v.form.RepresentativeId">
              <NextDropdown
                v-model="representative"
                @input="selectedSearchType('RepresentativeId', $event)"
                :disabled="insertReadonly.RepresentativeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="RmaStatusId" :error="$v.form.RmaStatusId">
              <NextDropdown
                v-model="rmaStatus"
                @input="selectedType('RmaStatusId', $event)"
                :disabled="insertReadonly.RmaStatusId"
                lookup-key="RMA_STATUS"
                />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveEmployeeId" :error="$v.form.ApproveEmployeeId">
              <NextDropdown
                @input="selectedSearchType('ApproveEmployeeId', $event)"
                :disabled="insertReadonly.ApproveEmployeeId"
                url="VisionNextEmployee/api/Employee/AutoCompleteSearch"
                orConditionFields="Code,Description1,Name,Surname"
                v-model="approveEmloyee"
                label="Description1"
                />
            </NextFormGroup>
            <NextFormGroup item-key="ApproveNumber" :error="$v.form.ApproveNumber">
              <NextInput type="text" v-model="form.ApproveNumber" :disabled="insertReadonly.ApproveNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="RmaTypeId" :error="$v.form.RmaTypeId">
              <NextDropdown :disabled="insertReadonly.RmaTypeId" v-model="rmaType" lookup-key="RETURN_TYPE" get-lookup @input="selectedType('RmaTypeId', $event)"></NextDropdown>
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
                v-model="route"
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
                v-model="rmaReason"
                @input="selectedSearchType('RmaReasonId', $event)"
                :disabled="insertReadonly.RmaReasonId"
                url="VisionNextRma/api/RmaReason/Search"
                label="Description1"
              />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RMA.Items')">
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
              <NextInput type="number" v-model="rmaLine.Quantity" @keypress="onlyForCurrencyDot($event)" min="1" />
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
                    :initial-values-func="initialValues"
                    :filter-func="(row) => row.Quantity > 0"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <NextExportDetail
                url="VisionNextRma/api/Rma/ExcelExportItems"
                :record-id="form.RecordId"
                record-key="rmaId"
                :file-name="$t('get.RMA.Items')">
              </NextExportDetail>
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
                  <b-tr v-for="(w, i) in (rmaLines ? rmaLines.filter(r => r.RecordState !== 4) : [])" :key="i">
                    <b-td>{{w.Item ? w.Item.Code : w.Code}}</b-td>
                    <b-td>{{w.Item ? w.Item.Description1 : w.Description1}}</b-td>
                    <b-td>{{w.Quantity}}</b-td>
                    <b-td>{{getReturnQuantity(w)}}</b-td>
                    <b-td>{{w.Item && w.Item.LastSalesQuantity ? w.Item.LastSalesQuantity : w.LastSalesQuantity}}</b-td>
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
import { required } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
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
        PriceDate: null,
        Genexp1: null,
        RmaDate: null,
        GrvNumber: null,
        RouteId: null,
        RmaReasonId: null,
        RecordId: null,
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
        RecordId: null,
        Price: null,
        Item: {}
      },
      rmaLines: [],
      customer: null,
      warehouse: null,
      representative: null,
      approveEmloyee: null,
      rmaStatus: null,
      rmaType: null,
      route: null,
      rmaReason: null,
      routeName1: 'Rma',
      initialValues: (values) => {
        values.map(value => {
          value.Code = value.Item ? value.Item.Code : value.Code
          value.Description1 = value.Item ? value.Item.Description1 : value.Description1

          return value
        })

        return values
      }
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
  },
  methods: {
    searchItem (search, loading) {
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
      let filteredArr = this.rmaLines.filter(i => i.ItemId === this.rmaLine.Item.ItemId && i.RecordState !== 4)
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
      if (item.RecordId > 0) {
        this.rmaLines[this.rmaLines.indexOf(item)].RecordState = 4
      } else {
        this.rmaLines.splice(this.rmaLines.indexOf(item), 1)
      }
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
      this.rmaLine.RmaReasonId = this.form.RmaReasonId
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
    save () {
      this.form.StatusId = 1
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.form.RmaLines = this.rmaLines.map((item) => {
          var newItem = {
            Deleted: item.Deleted,
            System: item.System,
            RecordState: item.RecordState,
            StatusId: item.StatusId,
            RecordId: item.RecordId,
            LineNumber: item.LineNumber,
            ItemId: item.ItemId,
            RmaReasonId: this.form.RmaReasonId,
            UnitSetId: item.UnitSetId,
            UnitId: item.UnitId,
            ConvFact1: item.ConvFact1,
            ConvFact2: item.ConvFact2,
            Quantity: item.Quantity,
            RmaQuantity1: item.RmaQuantity1,
            RmaUnit1Id: item.RmaUnit1Id,
            Price: item.Price,
            Item: {
              Description1: item.Item ? item.Item.Description1 : item.Description1,
              Code: item.Item ? item.Item.Code : item.Code,
              RecordId: item.Item ? item.Item.RecordId : item.RecordId
            },
            RmaId: item.RmaId
          }
          return newItem
        })
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e) {
        if (e.RmaStatus && (e.RmaStatus.Code === 'ONY' || e.RmaStatus.Code === 'TMM')) {
          this.$toasted.show(this.$t('get.RMA.updateError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          document.getElementById('submitButton').disabled = true
          return
        }
        e.RmaLines.map(item => {
          if (item.Item) {
            this.rmaLines.push({
              Item: {
                Description1: item.Item.Label,
                Code: item.Item.Code,
                RecordId: item.Item.DecimalValue
              },
              Deleted: item.Deleted,
              System: item.System,
              RecordState: 3,
              StatusId: item.StatusId,
              LineNumber: item.LineNumber,
              ItemId: item.ItemId,
              RmaReasonId: item.RmaReasonId,
              ConvFact1: item.ConvFact1,
              ConvFact2: item.ConvFact2,
              Quantity: item.Quantity,
              Price: item.Price,
              UnitSetId: item.UnitSetId,
              UnitId: item.UnitId,
              RmaQuantity1: item.Quantity,
              RmaUnit1Id: item.UnitId,
              RecordId: item.RecordId,
              RmaId: item.RmaId
            })
          }
        })
        this.rmaLines.sort(function (a, b) {
          return a.LineNumber - b.LineNumber
        })
        this.form = e
        this.customer = this.convertLookupValueToSearchValue(e.Customer)
        this.warehouse = this.convertLookupValueToSearchValue(e.Warehouse)
        this.representative = this.convertLookupValueToSearchValue(e.Representative)
        this.approveEmloyee = this.convertLookupValueToSearchValue(e.ApproveEmployee)
        this.route = this.convertLookupValueToSearchValue(e.Route)
        this.rmaReason = this.convertLookupValueToSearchValue(e.RmaReason)
        this.rmaStatus = e.RmaStatus
        this.rmaType = e.RmaType
      }
    },
    getPrice (data) {
      if (data.Item) {
        if (data.Item.Price) {
          return data.Item.Price
        } else {
          return data.Item.UsedPrice
        }
      } else if (data.Price) {
        return data.Price
      } else {
        return data.UsedPrice
      }
    },
    getReturnQuantity (data) {
      if (data.Item) {
        if (data.Item.SalesQuantity1 || data.Item.SalesQuantity1 === 0) {
          return data.Item.SalesQuantity1
        } else if (data.SalesQuantity1 || data.SalesQuantity1 === 0) {
          return data.SalesQuantity1
        } else {
          return data.UsedQuantity
        }
      } else if (data.SalesQuantity1 || data.SalesQuantity1 === 0) {
        return data.SalesQuantity1
      } else {
        return data.UsedQuantity
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
