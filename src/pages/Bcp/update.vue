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
              <NextDropdown v-model="DiscountGroup7" :disabled="insertReadonly.DiscountGroup7Id" url="" @input="selectedSearchType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Year" :error="$v.form.Year">
              <NextDropdown v-model="year" :disabled="insertReadonly.Year" url="" @input="selectedSearchType('Year', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Month" :error="$v.form.Month">
              <NextDropdown v-model="month" :disabled="insertReadonly.Month" url="" @input="selectedSearchType('Month', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndYear" :error="$v.form.EndYear">
              <NextDropdown v-model="endyear" :disabled="insertReadonly.EndYear" url="" @input="selectedSearchType('EndYear', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EndMonth" :error="$v.form.EndMonth">
              <NextDropdown v-model="endMonth" :disabled="insertReadonly.EndMonth" url="" @input="selectedSearchType('EndMonth', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerRegion3Id" :error="$v.form.CustomerRegion3Id">
              <NextDropdown v-model="CustomerRegion3" :disabled="insertReadonly.CustomerRegion3Id" label="Label" lookup-key="CUSTOMER_REGION_3" :get-lookup="true" @input="selectedType('CustomerRegion3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown v-model="BranchCriteria" :disabled="insertReadonly.BranchCriteriaId" label="Label" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
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
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
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
      DiscountGroup7: {},
      year: {},
      month: {},
      endyear: {},
      endMonth: {},
      CustomerRegion3: {},
      BranchCriteria: {},
      bcpDetailsItems: detailData.bcpDetailsItems,
      bcpBranchsItems: detailData.bcpBranchsItems
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.CustomerRegion3 = rowData.CustomerRegion3
      this.BranchCriteria = rowData.BranchCriteria
      if (!rowData.BcpDetails) {
        this.form.BcpDetails = []
      }
      if (!rowData.BcpBranchs) {
        this.form.BcpBranchs = []
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
