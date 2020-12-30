<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
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
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.FieldSurvey.FieldSurveyDefinitions')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.detail')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.FieldSurvey.analysisTypeId')}}</span> <p>{{rowData.AnalysisType ? rowData.AnalysisType.Label : ''}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.FieldSurvey.validityTypeId')}}</span> <p>{{rowData.validityTypeId}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.FieldSurvey.description1')}}</span> <p>{{rowData.Description1}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.FieldSurvey.sortOrder')}}</span> <p>{{rowData.sortOrder}}</p> -->
                <span><i class="far fa-circle" /> {{$t('insert.FieldSurvey.approveStateId')}}</span> <p><i :class="rowData.ApproveStateId === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.FieldSurvey.Branches')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('insert.FieldSurvey.surveyBranchId')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(branch, i) in rowData.FieldSurveyBranchs" :key="i">
                      <b-td>{{branch.SurveyBranch ? branch.SurveyBranch.Label : ''}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.FieldSurvey.employeeType')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('insert.FieldSurvey.employeeType')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(employee, i) in rowData.FieldSurveyEmployeeTypes" :key="i">
                      <b-td>{{employee.EmployeeType ? employee.EmployeeType.Label : ''}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.FieldSurvey.questions')}}</h6>
                <b-table-simple responsive hover small>
                  <b-thead head-variant="light">
                    <b-tr>
                      <b-th>{{$t('insert.FieldSurvey.questions')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(question, i) in rowData.FieldSurveyQuestions" :key="i">
                      <b-td>{{question.Question ? question.Question.Label : ''}}</b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab v-if="false" :title="$t('insert.other')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.other')}}</h6>
                <span><i class="far fa-circle" /> BranchId </span>
                <p>{{ rowData.BranchId }}</p>
                <span><i class="far fa-circle" /> CompanyId </span>
                <p>{{ rowData.CompanyId }}</p>
                <span><i class="far fa-circle" /> CreatedDateTime </span>
                <p>{{ rowData.CreatedDateTime }}</p>
                <span><i class="far fa-circle" /> CreatedUser </span>
                <p>{{ rowData.CreatedUser }}</p>
                <span><i class="far fa-circle" /> CustomerId </span>
                <p>{{ rowData.CustomerId }}</p>
                <span><i class="far fa-circle" /> EncryptedKey </span>
                <p>{{ rowData.EncryptedKey }}</p>
                <span><i class="far fa-circle" /> IsCustomerWarehouse </span>
                <p>{{ rowData.IsCustomerWarehouse }}</p>
                <span><i class="far fa-circle" /> IsVehicle </span>
                <p>{{ rowData.IsVehicle }}</p>
                <span><i class="far fa-circle" /> LocationId </span>
                <p>{{ rowData.LocationId }}</p>
                <span><i class="far fa-circle" /> ModifiedDateTime </span>
                <p>{{ rowData.ModifiedDateTime }}</p>
                <span><i class="far fa-circle" /> ModifiedUser </span>
                <p>{{ rowData.ModifiedUser }}</p>
                <span><i class="far fa-circle" /> RecordId </span>
                <p>{{ rowData.RecordId }}</p>
                <span><i class="far fa-circle" /> RecordState </span>
                <p>{{ rowData.RecordState }}</p>
                <span><i class="far fa-circle" /> RecordStatus </span>
                <p>{{ rowData.RecordStatus }}</p>
                <span><i class="far fa-circle" /> System </span>
                <p>{{ rowData.System }}</p>
                <span><i class="far fa-circle" /> WarehouseStocks </span>
                <p>{{ rowData.WarehouseStocks }}</p>
                <span><i class="far fa-circle" /> WarehouseSuppliers </span>
                <p>{{ rowData.WarehouseSuppliers }}</p>
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
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
      fields: [
        {key: 'SupplierBranchId', label: 'Şube', sortable: true},
        {key: 'PurchaseWarehouseId', label: 'Satın Alma Deposu', sortable: true},
        {key: 'ReturnWarehouseId', label: 'İade Deposu', sortable: true}
      ],
      tempItems: [
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''}
      ]
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldAnalysis/api/FieldSurvey', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
