<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'BATLeagueTarget' }">
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
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="3" lg="3">
            <NextDropdown
            @input="selectedSearchType('CustomerId', $event)"
            url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
            :searchable="true" :custom-option="true"
            or-condition-fields="Code,Description1,CommercialTitle"
            :is-customer="true"/>
          </NextFormGroup>
          <NextFormGroup item-key="MonthId" :error="$v.form.MonthId">
            <NextDropdown :disabled="insertReadonly.MonthId" label="Label" :source="Months" @input="selectedType('MonthId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="YearId" :error="$v.form.YearId">
            <NextDropdown :disabled="insertReadonly.YearId" label="Label" @input="selectedType('YearId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.BATLeagueTarget.OpportunityTargetValues')">
          <NextDetailPanel v-model="form.OpportunityTargetValues" :items="opportunityTargetValuesItems"/>
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
        Delete: 0,
        System: 0,
        RecordState: 2,
        Code: null,
        Description1: null,
        StatusId: 1,
        CustomerId: null,
        YearId: null,
        MonthId: null,
        OpportunityTargetValues: []
      },
      opportunityTargetValuesItems: detailData.opportunityTargetValuesItems,
      routeName1: 'Customer',
      routeName2: 'OpportunityTarget',
      Months: [
        {DecimalValue: 1, Label: this.$t('general.Months.january')},
        {DecimalValue: 2, Label: this.$t('general.Months.february')},
        {DecimalValue: 3, Label: this.$t('general.Months.march')},
        {DecimalValue: 4, Label: this.$t('general.Months.april')},
        {DecimalValue: 5, Label: this.$t('general.Months.may')},
        {DecimalValue: 6, Label: this.$t('general.Months.june')},
        {DecimalValue: 7, Label: this.$t('general.Months.july')},
        {DecimalValue: 8, Label: this.$t('general.Months.august')},
        {DecimalValue: 9, Label: this.$t('general.Months.september')},
        {DecimalValue: 10, Label: this.$t('general.Months.october')},
        {DecimalValue: 11, Label: this.$t('general.Months.november')},
        {DecimalValue: 12, Label: this.$t('general.Months.december')}
      ]
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
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
    return {
      form: this.insertRules
    }
  }
}
</script>
