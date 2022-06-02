<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'CustomerTarget' }">
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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="ErpCode" :error="$v.form.ErpCode">
            <NextInput v-model="form.ErpCode" type="text" :disabled="insertReadonly.ErpCode" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="TciBreak1Id" :error="$v.form.TciBreak1Id">
            <NextDropdown :disabled="insertReadonly.TciBreak1Id" @input="selectedType('TciBreak1Id', $event)" lookup-key="TCI_BREAKDOWN"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnName" :error="$v.form.ItemColumnName">
            <NextDropdown
              :disabled="insertReadonly.ItemColumnName"
              v-model="itemColumnName"
              :source="itemCriterias"
              :dynamic-request="{paramId: 'ITEM_CRITERIA'}" label="Label"
              @input="selectColumnName($event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnValue" :error="$v.form.ItemColumnValue">
            <NextDropdown v-model="itemColumnValue"
              :disabled="insertReadonly.ItemColumnValue"
              :source="fieldValues" label="Label"
              @input="selectedType('ItemColumnValue', $event)"
            />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDetails')">
          <b-row>
            <NextFormGroup :title="$t('insert.CustomerTarget.CustomerId')" :error="$v.customerTargetDetails.customer" :required="true" md="3" lg="3">
              <NextDropdown
                v-model="customerTargetDetails.customer"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                label="Description1"
                :searchable="true"
                :custom-option="true"
                :is-customer="true"
                />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.TargetQuantity')" :error="$v.customerTargetDetails.targetQuantity" :required="true" md="3" lg="3">
              <NextInput
                v-model="customerTargetDetails.targetQuantity"
                type="number"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.TargetUnitId')" :error="$v.customerTargetDetails.targetUnit" md="3" lg="3">
              <NextDropdown :disabled="true" :source="lookupValues" label="Label" v-model="customerTargetDetails.targetUnit" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.ReqItemId')" :error="$v.customerTargetDetails.reqItem" :required="true" md="3" lg="3">
              <NextDropdown v-model="customerTargetDetails.reqItem" :source="items"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.ReqItemQuantity')" :error="$v.customerTargetDetails.reqItemQuantity" :required="true" md="3" lg="3">
              <NextInput type="number" v-model="customerTargetDetails.reqItemQuantity"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.DescriptionReqItem')" :error="$v.customerTargetDetails.descriptionReqItem" md="3" lg="3">
              <NextInput type="text" v-model="customerTargetDetails.descriptionReqItem"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.GainAmount')" :error="$v.customerTargetDetails.gainAmount" md="3" lg="3">
              <NextInput type="number" v-model="customerTargetDetails.gainAmount"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.CustomerTarget.currencyId')" :error="$v.customerTargetDetails.currency" :required="true" md="3" lg="3">
              <NextDropdown :disabled="true" v-model="customerTargetDetails.currency" :source="currencies" />
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                 <AddDetailButton @click.native="addContractItems" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.CustomerTarget.CustomerId')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.TargetQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.TargetUnitId')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.ReqItemId')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.ReqItemQuantity')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.DescriptionReqItem')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.GainAmount')}}</span></b-th>
                <b-th><span>{{$t('insert.CustomerTarget.currencyId')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.CustomerTargetDetails" :key="i">
                  <b-td>{{c.CustomerName}}</b-td>
                  <b-td>{{c.TargetQuantity}}</b-td>
                  <b-td>{{c.TargetUnitLabel}}</b-td>
                  <b-td>{{c.ReqItem}}</b-td>
                  <b-td>{{c.ReqItemQuantity}}</b-td>
                  <b-td>{{c.DescriptionReqItem}}</b-td>
                  <b-td>{{c.GainAmount}}</b-td>
                  <b-td>{{c.CurrencyName}}</b-td>
                  <b-td class="text-center">
                    <b-button @click="editInvoiceLine(c)" class="btn mr-2 btn-warning btn-sm">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button @click="removeContractItems(c)" class="btn mr-2 btn-danger btn-sm">
                      <i class="far fa-trash-alt"></i>
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDates')">
          <NextDetailPanel v-model="form.CustomerTargetDates" :items="customerTargetDatesItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Delete: 0,
        System: 0,
        RecordState: 2,
        CustomerTargetDetails: [],
        CustomerTargetDates: [],
        Code: null,
        Description1: null,
        ErpCode: null,
        TciBreakId: null,
        ItemColumnName: null,
        ItemColumnValue: null,
        StatusId: 1
      },
      // customerTargetDetailsItems: detailData.customerTargetDetailsItems,
      customerTargetDatesItems: detailData.customerTargetDatesItems,
      routeName1: 'Customer',
      currencies: [],
      itemCriteria: null,
      itemColumnValue: null,
      itemColumnName: null,
      lookupValues: [],
      items: [],
      itemValue: [],
      fieldValues: [],
      itemCriterias: [],
      selectedIndex: null,
      customerTargetDetails: {
        customer: null,
        targetQuantity: null,
        targetUnit: null,
        reqItemQuantity: null,
        reqItem: null,
        descriptionReqItem: null,
        currency: null,
        gainAmount: null,
        isUpdated: false
      }
    }
  },
  mounted () {
    this.createManualCode()
    this.getItemCriterias()
    this.getCurrencies()
    this.getLookups()
    this.getItem()
  },
  methods: {
    getItemCriterias () {
      this.$api.postByUrl({paramId: 'ITEM_CRITERIA'}, 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams').then((response) => {
        if (response && response.Values && response.Values.length > 0) {
          this.itemCriterias = response.Values
        }
      })
    },
    selectColumnName  (data) {
      this.fieldValues = []
      this.form.ItemColumnValue = null
      this.itemColumnValue = null
      if (data) {
        this.form.ItemColumnName = data.Label
        this.$api.postByUrl({paramName: data.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.fieldValues = res.Values
        })
      } else {
        this.form.ItemColumnName = null
      }
    },
    getLookups () {
      return this.$api.postByUrl({LookupTableCode: 'UNIT'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (response && response.Values) {
          this.lookupValues = response.Values.UNIT
          this.customerTargetDetails.targetUnit = response.Values.UNIT[3]
          this.form.TargetUnitId = this.customerTargetDetails.targetUnit.RecordId
        }
      })
    },
    getCurrencies () {
      return this.$api.postByUrl({}, 'VisionNextSystem/api/SysCurrency/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.currencies = response.ListModel.BaseModels
          this.customerTargetDetails.currency = response.ListModel.BaseModels[0]
          this.form.CurrencyId = this.customerTargetDetails.currency.RecordId
        }
      })
    },
    getItem () {
      this.$api.postByUrl({}, '/VisionNextItem/api/Item/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels) {
          this.items = response.ListModel.BaseModels
          this.form.ReqItemId = this.customerTargetDetails.reqItem.RecordId
        }
      })
    },
    addContractItems () {
      this.$v.customerTargetDetails.$touch()
      if (this.$v.customerTargetDetails.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let item = {
        Deleted: 0,
        System: 0,
        RecordId: this.customerTargetDetails.recordId,
        RecordState: this.customerTargetDetails.recordId > 0 ? 3 : 2,
        StatusId: 1,
        CustomerId: this.customerTargetDetails.customer.RecordId,
        CustomerName: this.customerTargetDetails.customer.Description1,
        TargetUnitId: this.customerTargetDetails.targetUnit.DecimalValue,
        TargetUnitLabel: this.customerTargetDetails.targetUnit.Label,
        ReqItemId: this.customerTargetDetails.reqItem.RecordId,
        ReqItem: this.customerTargetDetails.reqItem.Description1,
        TargetQuantity: this.customerTargetDetails.targetQuantity,
        ReqItemQuantity: this.customerTargetDetails.reqItemQuantity,
        DescriptionReqItem: this.customerTargetDetails.descriptionReqItem,
        GainAmount: this.customerTargetDetails.gainAmount,
        CurrencyId: this.customerTargetDetails.currency.RecordId,
        CurrencyName: this.customerTargetDetails.currency.Description1
      }
      if (this.customerTargetDetails.isUpdated) {
        this.form.CustomerTargetDetails[this.selectedIndex] = item
        this.customerTargetDetails.isUpdated = false
      } else {
        this.form.CustomerTargetDetails.push(item)
      }
      this.customerTargetDetails = {}
      this.$v.customerTargetDetails.$reset()
      this.getCurrencies()
      this.getLookups()
    },
    removeContractItems (item) {
      this.form.CustomerTargetDetails.splice(this.form.CustomerTargetDetails.indexOf(item), 1)
    },
    editInvoiceLine (item) {
      this.selectedIndex = this.form.CustomerTargetDetails.indexOf(item)
      this.customerTargetDetails = {
        targetQuantity: item.TargetQuantity,
        reqItemQuantity: item.ReqItemQuantity,
        descriptionReqItem: item.DescriptionReqItem,
        gainAmount: item.GainAmount,
        isUpdated: true
      }
      this.getCurrencies(item.CurrencyId)
      this.getLookups(item.TargetUnitId)
      this.getItem(item.ReqItemId)
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.createData()
      }
    }
  },
  validations () {
    let customerTargetDetails = {
      currency: {
        required
      },
      reqItem: {
        required
      },
      customer: {
        required
      },
      targetQuantity: {
        required
      },
      reqItemQuantity: {
        required
      }
    }
    return {
      form: this.insertRules,
      customerTargetDetails: customerTargetDetails
    }
  }
}
</script>
