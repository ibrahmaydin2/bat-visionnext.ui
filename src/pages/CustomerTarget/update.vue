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
            <NextDropdown v-model="tciBreak" :disabled="insertReadonly.TciBreak1Id" @input="selectedType('TciBreak1Id', $event)" lookup-key="TCI_BREAKDOWN"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnName" :error="$v.form.ItemColumnName">
            <NextDropdown v-model="itemColumnName" :disabled="insertReadonly.ItemColumnName" @input="selectedType('ItemColumnName', $event)" lookup-key="ITEM_CRITERIA"/>
          </NextFormGroup>
          <NextFormGroup item-key="ItemColumnValue" :error="$v.form.ItemColumnValue">
            <NextDropdown v-model="itemColumnValue" :disabled="insertReadonly.ItemColumnValue" @input="selectedType('ItemColumnValue', $event)" lookup-key=""/>
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
          <NextDetailPanel v-model="form.CustomerTargetDetails" :items="customerTargetDetailsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDates')">
          <NextDetailPanel v-model="form.CustomerTargetDates" :items="customerTargetDatesItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
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
      customerTargetDetailsItems: detailData.customerTargetDetailsItems,
      customerTargetDatesItems: detailData.customerTargetDatesItems,
      routeName1: 'Customer',
      tciBreak: null,
      itemColumnName: null,
      itemColumnValue: null
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.tciBreak = rowData.TciBreakId
      this.itemColumnName = rowData.ItemColumnName
      this.itemColumnValue = rowData.ItemColumnValue
      if (!rowData.CustomerTargetDetails) {
        this.form.CustomerTargetDetails = []
      }
      if (!rowData.CustomerTargetDates) {
        this.form.CustomerTargetDates = []
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
        this.updateData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
