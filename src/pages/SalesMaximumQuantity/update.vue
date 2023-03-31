<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'SalesMaximumQuantity' }">
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
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.Code')" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.Description1')" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.StatusId')" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.BeginDate')" :error="$v.form.BeginDate">
            <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.EndDate')" :error="$v.form.EndDate">
            <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.SalesMaximumQuantity.CustomerList')">
          <NextDetailPanel v-model="form.SalesMaximumQuantityCustomers" :items="salesMaximumQuantityCustomersItems"/>
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
        Code: null,
        Description1: null,
        StatusId: 1,
        CustomerId: null,
        BeginDate: null,
        EndDate: null,
        SalesMaximumQuantityCustomers: []
      },
      salesMaximumQuantityCustomersItems: detailData.salesMaximumQuantityCustomersItems,
      routeName1: 'Invoice',
      routeName2: 'SalesMaximumQuantity'
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      if (!rowData.SalesMaximumQuantityCustomers) {
        this.form.SalesMaximumQuantityCustomers = []
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
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
