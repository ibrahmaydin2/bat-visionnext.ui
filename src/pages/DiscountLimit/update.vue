<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'DiscountLimit' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="true" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.discountLimit.title')" active>
          <b-row>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
                <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
                <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
                <NextDropdown
                :disabled="insertReadonly.CustomerCriteriaId"
                v-model="CustomerCriteria"
                @input="selectedType('CustomerCriteriaId', $event)"
                :source="(lookup.CUSTOMER_CRITERIA ? lookup.CUSTOMER_CRITERIA.filter(c => c.Code != 'TM' && c.Code != 'MS'): [])"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup item-key="ItemCriteriaId" :error="$v.form.ItemCriteriaId">
            <NextDropdown
                v-model="ItemCriteria"
                :disabled="insertReadonly.ItemCriteriaId"
                @input="selectedType('ItemCriteriaId', $event)"
                :source="(lookup.ITEM_CRITERIA ? lookup.ITEM_CRITERIA.filter(c => c.Code == 'UK' || c.Code == 'UL'): [])"
                label="Label"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab lazy :title="$t('insert.discountLimit.customerCriteria')" v-if="CustomerCriteria && CustomerCriteria.Code === 'MK'" >
          <NextDetailPanel v-model="customerCriterias" :items="customerCriteriaItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.discountLimit.customers')" v-if="CustomerCriteria && CustomerCriteria.Code === 'ML'" >
          <NextDetailPanel v-model="customerList" :items="customerItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.discountLimit.itemCriteria')" v-if="ItemCriteria && ItemCriteria.Code === 'UK'" >
          <NextDetailPanel v-model="itemCriterias" :items="itemCriteriaItems" />
        </b-tab>
        <b-tab lazy :title="$t('insert.discountLimit.items')" v-if="ItemCriteria && ItemCriteria.Code === 'UL'" >
          <NextDetailPanel v-model="items" :items="itemItems" />
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
        StatusId: 1,
        RecordState: 2,
        Code: null,
        BeginDate: null,
        EndDate: null,
        CustomerCriteriaId: null,
        ItemCriteriaId: null,
        DiscountLimitCustCriterias: [],
        DiscountLimitItemCriterias: []
      },
      routeName1: 'Discount',
      ItemCriteria: null,
      CustomerCriteria: null,
      customerItems: detailData.customerItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      itemCriteriaItems: detailData.itemCriteriaItems,
      itemItems: detailData.itemItems,
      customerList: [],
      customerCriterias: [],
      itemCriterias: [],
      items: []

    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.ItemCriteria = this.form.ItemCriteria
      this.CustomerCriteria = this.form.CustomerCriteria
      this.itemCriterias = this.form.DiscountLimitItemCriterias.filter(i => i.TableName === 'T_ITEM' && i.ColumnName !== 'RECORD_ID')
      this.items = this.form.DiscountLimitItemCriterias.filter(i => i.TableName === 'T_ITEM' && i.ColumnName === 'RECORD_ID')
      this.customerCriterias = this.form.DiscountLimitCustCriterias.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName !== 'RECORD_ID')
      this.customerList = this.form.DiscountLimitCustCriterias.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'RECORD_ID')
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
        this.form.DiscountLimitCustCriterias = [...this.customerList, ...this.customerCriterias]
        this.form.DiscountLimitItemCriterias = [...this.itemCriterias, ...this.items]
        this.updateData()
      }
    }
  }
}
</script>
