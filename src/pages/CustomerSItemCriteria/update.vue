<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'CustomerSItemCriteria' }">
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
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.customerSItemCriteria.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
              <NextDropdown v-model="itemCriteria" :disabled="insertReadonly.ItemCriteriaId" lookup-key="ITEM_CRITERIA" @input="selectedType('ItemCriteriaId', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria" :disabled="insertReadonly.CustomerCriteriaId" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="SItemTypeId" :error="$v.form.SItemTypeId">
              <NextDropdown v-model="sItemType" :disabled="insertReadonly.SItemTypeId" url="VisionNextCustomer/api/CustomerSItemType/Search" @input="selectedType('SItemTypeId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.itemCriteria')" v-if="itemCriteria && itemCriteria.Code === 'UK'" >
          <NextDetailPanel v-model="itemCriterias" :items="itemCriteriaItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customerCriteria')" v-if="customerCriteria && customerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="customerCriterias" :items="customerCriteriaItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customers')" v-if="customerCriteria && customerCriteria.Code === 'ML'" >
          <NextDetailPanel v-model="form.CustomerSItemCustomers" :items="customerItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updatetMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updatetMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        RecordId: null,
        StatusId: 1,
        Code: null,
        Description1: null,
        ItemCriteriaId: null,
        CustomerCriteriaId: null,
        SItemTypeId: 1,
        CustomerSItemCustomers: [],
        CustomerSItemDetails: []
      },
      sItemType: null,
      itemCriteria: null,
      customerCriteria: null,
      itemCriterias: [],
      customerCriterias: [],
      itemCriteriaItems: detailData.itemCriteriaItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      customerItems: detailData.customerItems,
      routeName1: 'Customer'
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.itemCriteria = this.form.ItemCriteria
      this.customerCriteria = this.form.CustomerCriteria
      this.sItemType = this.convertLookupValueToSearchValue(this.SItemType)
      this.itemCriterias = this.form.CustomerSItemDetails.filter(i => i.TableName === 'T_ITEM')
      this.customerCriterias = this.form.CustomerSItemDetails.filter(i => i.TableName === 'T_CUSTOMER')
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
        this.form.CustomerSItemDetails = [...this.itemCriterias, ...this.customerCriterias]
        this.updateData()
      }
    }
  }
}
</script>
