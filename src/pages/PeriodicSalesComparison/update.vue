<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb/>
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{ name: 'PeriodicSalesComparison' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()"/>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Code')" :error="$v.form.Code" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Code" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Description1')" :error="$v.form.Description1" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Description1" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.Definition')" :error="$v.form.Definiton" :required="true" md="3" lg="3">
            <NextInput type="text" v-model="form.Definition" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.periodicSalesComparison.StatusId')" :error="$v.form.StatusId" md="3" lg="3">
            <NextCheckBox2 v-model="form.StatusId" type="number"  :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.periodicSalesComparison.Definitions')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesStart')" :error="$v.form.PastSaleStartDate" :required="true">
              <NextDatePicker v-model="form.PastSaleStartDate" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesEnd')" :error="$v.form.PastSaleEndDate" :required="true">
              <NextDatePicker v-model="form.PastSaleEndDate" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSalesControlAmount')" :error="$v.form.PastSaleQuantity" :required="true">
              <NextInput v-model="form.PastSaleQuantity" type="number" :min="0" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.BranchCriterion')" :error="$v.form.BranchCriteriaId" :required="true">
              <NextDropdown
                v-model="selectedBranchCriteria"
                @input="selectedType('BranchCriteriaId', $event)"
                :source="lookupValues.BRANCH_CRITERIA"
                :disabled="true"
                label="Label"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesStart')" :error="$v.form.NextSaleStartDate" :required="true">
              <NextDatePicker v-model="form.NextSaleStartDate" :disabled="insertReadonly.NextSaleStartDate"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesEnd')" :error="$v.form.NextSaleEndDate" :required="true">
              <NextDatePicker v-model="form.NextSaleEndDate" :disabled="insertReadonly.NextSaleEndDate" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSalesControlAmount')" :error="$v.form.NextSaleQuantity" :required="true">
              <NextInput v-model="form.NextSaleQuantity" type="number" :min="0" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.ProductCriteria')" :error="$v.form.ItemCriteriaId" :required="true">
              <NextDropdown v-model="selectedItemCriteria" :disabled="true" @input="selectedType('ItemCriteriaId', $event)" :source="(lookupValues.ITEM_CRITERIA ? lookupValues.ITEM_CRITERIA.filter(i => i.Code != 'UL') : [])" label="Label" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.PastSaleColor')" :required="true" >
              <NextDropdown v-model="pastSaleColorId" :disabled="insertReadonly.pastSaleColorId"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.periodicSalesComparison.NextSaleColor')" :required="true">
              <NextDropdown v-model="nextSaleColorId" :disabled="insertReadonly.nextSaleColorId" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.periodicSalesComparison.Products')" v-if="selectedItemCriteria && selectedItemCriteria.Code === 'UK'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.areaDescription')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.value')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(p, i) in (rowData.PeriodicSalesComparisonDetails ? rowData.PeriodicSalesComparisonDetails.filter(p => p.TableName == 'T_ITEM') : [])" :key="i">
                     <b-td>{{p.ColumnNameDesc}}</b-td>
                     <b-td>{{p.ColumnValueDesc}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.periodicSalesComparison.Branches')" v-if="selectedBranchCriteria && selectedBranchCriteria.Code === 'SL'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.fixedTermCampaign.branchCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.fixedTermCampaign.branchName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(b, i) in (rowData.PeriodicSalesComparisonDetails ? rowData.PeriodicSalesComparisonDetails.filter(b => b.TableName == 'T_BRANCH') : [])" :key="i">
                       <b-td>{{b.Code}}</b-td>
                       <b-td>{{b.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        Definition: null,
        PastSaleStartDate: null,
        PastSaleEndDate: null,
        PastSaleQuantity: null,
        BranchCriteriaId: null,
        NextSaleStartDate: null,
        NextSaleEndDate: null,
        NextSalesControlAmount: null,
        ItemCriteriaId: null,
        PastSaleColorId: null,
        NextSaleColorId: null,
        PeriodicSalesComparisonDetails: []
      },
      routeName1: 'CommonApi',
      selectedBranchCriteria: null,
      selectedItemCriteria: null,
      selectedBranch: null,
      periodicSalesItemArea: {},
      periodicSalesItemValue: {},
      periodicSalesItemAreaList: [],
      periodicSalesItemValueList: [],
      companyId: null,
      branchId: null,
      lookupValues: {},
      colorList: [],
      periodicSalesItems: [],
      periodicSalesBranchs: [],
      periodicSalesComparisonDetails: {
        tableName: null,
        columnName: null,
        columnValue: null,
        text: null
      },
      nextSaleColorId: null,
      pastSaleColorId: null,
      nextSaleColor: null,
      pastSaleColor: null
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setData()
    })
    this.companyId = this.$store.state.CompanyId
    this.branchId = this.$store.state.BranchId
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
        if (this.form.NextSaleStartDate === this.form.NextSaleEndDate) {
          this.$toasted.show(this.$t('insert.periodicSalesComparison.conflictOfNextStartEndDates'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.updateData()
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.selectedItemCriteria = rowData.ItemCriteria
      this.selectedBranchCriteria = rowData.BranchCriteria
      this.nextSaleColorId = rowData.NextSaleColor.Label
      this.pastSaleColorId = rowData.PastSaleColor.Label
    }
  },
  validations () {
    return {
      form: {
        NextSaleStartDate: {
          required
        },
        NextSaleEndDate: {
          required
        }
      }
    }
  }
}
</script>
