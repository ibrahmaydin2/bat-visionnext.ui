<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.loyaltyCategory.Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.Description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.MinValue')}}:</b> {{rowData.MinValue}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.MaxValue')}}:</b> {{rowData.MaxValue}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.CategoryTypeId')}}:</b> {{ rowData.CategoryType ? rowData.CategoryType.Label : '-' }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.CalcTypeId')}}:</b> {{rowData.CalcType ? rowData.CalcType.Label : '-'}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.LoyaltyPoint')}}:</b> {{rowData.LoyaltyPoint}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.FieldAnalysisId')}}:</b> {{rowData.FieldAnalysis ? rowData.FieldAnalysis.Label : '-'}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.loyaltyCategory.ByFrequency')}}:</b> {{rowData.ByFrequency}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.loyaltyCategory.StatusId')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.loyaltyCategory.salesTarget')"  v-if="rowData.CalcType && rowData.CalcType.Code === 'SH'">
          <b-row class="p-4">
             <b-card class="col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ColumnNameDesc, 'text', 'insert.loyaltyCategory.ColumnName')"></div>
              <div v-html="getFormatDataByType(rowData.ColumnValueDesc, 'text', 'insert.loyaltyCategory.ColumnValue')"></div>
              <div v-html="getFormatDataByType(rowData.Unit, 'object', 'insert.loyaltyCategory.UnitId')"></div>
              <div v-html="getFormatDataByType(rowData.Quantity, 'text', 'insert.loyaltyCategory.Quantity')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesTargetQuota')" v-if="rowData.CalcType && rowData.CalcType.Code === 'SH'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card" >
                <NextDetailPanel type="get" v-model="rowData.LoyaltyCatQuotas" :items="loyaltyCatQuotasItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.analysisResult')" v-if="rowData.CalcType && rowData.CalcType.Code === 'ANS' && rowData.FieldAnalysis && rowData.FieldAnalysis.Code !== ''">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table
                  :fields="loyaltyCategoryFields"
                  :items="rowData.LoyaltyCategoryCrits"
                  bordered responsive >
                  <template #cell(operations)="row">
                    <div class="text-center">
                      <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
                       <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyaltyCategory.details')}}
                      </b-button>
                    </div>
                  </template>
                  <template #row-details="{item}">
                    <b-table :items="item.LoyaltyCategoryCritDetails" :fields="loyaltyQuestionFields.filter(f => f.key !== 'operations')">
                    </b-table>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.questionChoice')" v-if="rowData.CategoryType && rowData.CategoryType.Code === 'DEG'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.LoyaltyCategoryValues" :items="loyaltyCategoryValuesItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.activityResult')" v-if="rowData.CalcType && rowData.CalcType.Code === 'AKS'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.LoyaltyCategoryTasks" :items="loyaltyCategoryTasksItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.loyaltyCategory.salesAnalysis')" v-if="rowData.CalcType && rowData.CalcType.Code === 'SA'">
           <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table
                  :fields="loyaltyCategoryFields"
                  :items="this.rowData.LoyaltyCatSales"
                  bordered responsive >
                  <template #cell(operations)="row">
                    <div class="text-center">
                      <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
                        <i :class="row.detailsShowing ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{$t('insert.loyaltyCategory.details')}}
                      </b-button>
                    </div>
                  </template>
                  <template #row-details="{index}">
                    <div class="p-4 mt-2 nested-detail-panel">
                      <h3>{{$t('insert.loyaltyCategory.salesAnalysis')}}</h3>
                      <NextDetailPanel type="get" v-model="rowData.LoyaltyCatSales[index].LoyaltyCatSalesDetails" :items="LoyaltyCatSalesDetailsItems" />
                    </div>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'
export default {
  mixins: [mixin],
  data () {
    return {
      CalcType: null,
      FieldAnalysis: null,
      CategoryType: null,
      loyaltyCatQuotasItems: detailData.loyaltyCatQuotasItems,
      loyaltyCategoryCritsItems: detailData.loyaltyCategoryCritsItems,
      loyaltyCategoryValuesItems: detailData.loyaltyCategoryValuesItems,
      loyaltyCategoryTasksItems: detailData.loyaltyCategoryTasksItems,
      loyaltyCatSalesItems: detailData.loyaltyCatSalesItems,
      loyaltyCategoryFields: detailData.loyaltyCategoryFields,
      LoyaltyCatSalesDetailsItems: detailData.LoyaltyCatSalesDetailsItems,
      loyaltyQuestionFields: detailData.loyaltyQuestionFields,
      loyaltyCategory: {},
      loyaltyQuestion: {},
      questions: [],
      answers: [],
      columnValues: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextLoyalty/api/LoyaltyCategory', record: this.$route.params.url}).then(() => {

      })
    }
  }
}
</script>
<style lang="sass">
  .nested-detail-panel
    background-color: #e4e4e4
    border-radius: 15px
  .nested-detail-panel
      th
        border-color: #b7b4b4 !important
      td
        border-color: #b7b4b4 !important
</style>
