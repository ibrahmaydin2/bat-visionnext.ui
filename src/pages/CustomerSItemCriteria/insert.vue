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
              <NextDropdown v-model="itemCriteria" :disabled="insertReadonly.ItemCriteriaId" @input="selectedType('ItemCriteriaId', $event)" :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(i => i.Code != 'TU') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown v-model="customerCriteria" :disabled="insertReadonly.CustomerCriteriaId" @input="selectedType('CustomerCriteriaId', $event)" :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(i => i.Code === 'MK' || i.Code === 'ML') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup item-key="SItemTypeId" :error="$v.form.SItemTypeId">
              <NextDropdown :disabled="insertReadonly.SItemTypeId" url="VisionNextCustomer/api/CustomerSItemType/Search" @input="selectedSearchType('SItemTypeId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.itemCriteria')" v-if="itemCriteria && itemCriteria.Code === 'UK'" >
          <NextDetailPanel v-model="itemCriterias" :items="itemCriteriaItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.items')" v-if="itemCriteria && itemCriteria.Code === 'UL'" >
          <NextDetailPanel v-model="items" :items="itemItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customerCriteria')" v-if="customerCriteria && customerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="customerCriterias" :items="customerCriteriaItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.customers')" v-if="customerCriteria && customerCriteria.Code === 'ML'" >
          <NextDetailPanel v-model="customerList" :items="customerItems" />
        </b-tab>
        <b-tab :title="$t('insert.customerSItemCriteria.route')" v-if="customerCriteria && customerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="routes" :items="routeItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
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
      itemCriteria: null,
      customerCriteria: null,
      itemCriterias: [],
      customerCriterias: [],
      itemCriteriaItems: detailData.itemCriteriaItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      customerItems: detailData.customerItems,
      routeItems: detailData.routeItems,
      itemItems: detailData.itemItems,
      routeName1: 'Customer',
      customerList: [],
      routes: [],
      items: []
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
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
        this.form.CustomerSItemCustomers = [...this.customerList, ...this.routes, ...this.customerCriterias]
        this.form.CustomerSItemDetails = [...this.itemCriterias, ...this.items]
        this.createData()
      }
    }
  }
}
</script>
