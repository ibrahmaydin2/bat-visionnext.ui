<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Bcp' }">
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
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.bcp.Bcp')" active>
          <b-row>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup7Id" url="" @input="selectedSearchType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Year" :error="$v.form.Year">
              <NextDropdown :disabled="insertReadonly.Year" url="" @input="selectedSearchType('Year', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Month" :error="$v.form.Month">
              <NextDropdown :disabled="insertReadonly.Month" url="" @input="selectedSearchType('Month', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndYear" :error="$v.form.EndYear">
              <NextDropdown :disabled="insertReadonly.EndYear" url="" @input="selectedSearchType('EndYear', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndMonth" :error="$v.form.EndMonth">
              <NextDropdown :disabled="insertReadonly.EndMonth" url="" @input="selectedSearchType('EndMonth', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion3Id" :error="$v.form.CustomerRegion3Id">
              <NextDropdown :disabled="insertReadonly.CustomerRegion3Id" label="Label" lookup-key="CUSTOMER_REGION_3" @input="selectedType('CustomerRegion3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown :disabled="insertReadonly.BranchCriteriaId" label="Label" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.bcp.items')">
          <NextDetailPanel v-model="form.BcpDetails" :items="bcpDetailsItems"/>
        </b-tab>
        <b-tab :title="$t('insert.bcp.branchs')">
          <NextDetailPanel v-model="form.BcpBranchs" :items="bcpBranchsItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        DiscountGroup7Id: null,
        Year: null,
        Month: null,
        EndYear: null,
        EndMonth: null,
        CustomerRegion3Id: null,
        BranchCriteriaId: null,
        BcpDetails: [],
        BcpBranchs: []
      },
      routeName1: 'Customer',
      bcpDetailsItems: detailData.bcpDetailsItems,
      bcpBranchsItems: detailData.bcpBranchsItems
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
      } else {
        this.createData()
      }
    }
  }
}
</script>
