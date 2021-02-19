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
            <span><i class="fas fa-code" /><b>{{$t('insert.employee.Model_Code')}}:</b>{{rowData.Code}}</span>
            <span><i class="far fa-circle" /><b> {{$t('insert.employee.state')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="far fa-circle" /><b>{{$t('insert.employee.PersonalDesciption')}}:</b>{{rowData.Description1}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
         <b-tab :title="$t('insert.employee.EmployeeInfo')" :active="true">
           <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Name')}}</span><p>{{rowData.Name}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Surname')}}</span><p>{{rowData.Surname}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_UserGroupId')}}</span><p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.category')}}</span><p>{{rowData.Category1 ? rowData.Category1.Label : ''}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Description')}}</span><p>{{rowData.Other1}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Team')}}</span><p><i :class="rowData.IsTeam === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_PriceListCategoryId')}}</span><p>{{rowData.PriceListCategory ? rowData.PriceListCategory.Label : ''}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPCustomerCode')}}</span><p>{{rowData.FinanceCode1}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.CreateCustomerRecord')}}</span><p><i :class="rowData.CreateCustomerRecord === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPSupplierCode')}}</span><p>{{rowData.FinanceCode2}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.scoreCardClasses')}}</span><p>{{rowData.ScoreCardClass ? rowData.ScoreCardClass.Label : ''}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_SAPSrCode')}}</span><p>{{rowData.SapHrCode}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_IsRepresentative')}}</span><p><i :class="rowData.IsRepresentative === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
            </b-card>
          </b-row>
         </b-tab>
        <b-tab :title="$t('insert.employee.groupInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.personalType')}}</span><p>{{rowData.Type ? rowData.Type.Label : ''}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_UserGroupId')}}</span><p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
            </b-card>
         </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.Model_Personal')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentStartDate')}}</span><p>{{dateConvertFromTimezone(rowData.EmploymentStartDate)}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentEndDate')}}</span><p>{{dateConvertFromTimezone(rowData.EmploymentEndDate)}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Identificationnumber')}}</span><p>{{rowData.TaxNumber}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BirthDate')}}</span><p>{{dateConvertFromTimezone(rowData.BirthDate)}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_TShirtSize')}}</span><p>{{rowData.TShirtSize}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ShirtSize')}}</span><p>{{rowData.MontSize}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_CoatSize')}}</span><p>{{rowData.OvercoatSize}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Shoesize')}}</span><p>{{rowData.ShoeSize}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EducationId')}}</span><p>{{rowData.Education ? rowData.Education.Label : ''}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_JeansSize')}}</span><p>{{rowData.DenimSize}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ClothTrousersSize')}}</span><p>{{rowData.CorduroySize}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BloodType')}}</span><p>{{rowData.BloodType ? rowData.BloodType.Label : ''}}</p>
            </b-card>
         </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeContact')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone1')}}</span><p>{{rowData.Telephone1}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone2')}}</span><p>{{rowData.Telephone2}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_GsmNumber')}}</span><p>{{rowData.GsmNumber}}</p>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Fax')}}</span><p>{{rowData.FaxNumber}}</p>
              <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Email')}}</span><p>{{rowData.Email}}</p>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.Model_Team')">
          <b-row class="p-4">
            <b-card class="col-12 asc__showPage-card">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.employee.TeamPersonalName')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(e, i) in rowData.EmployeeTeams" :key="i">
                    <b-td>{{e.Description1}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeePrefix')">
           <b-row class="p-4">
            <b-card class="col-12 asc__showPage-card">
              <b-table-simple responsive bordered small>
                <b-thead>
                   <b-th><span>{{$t('insert.employee.EmployeePrefix')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(e, i) in rowData.EInvoiceSeqs" :key="i">
                     <b-td>{{`${e.Prefix} ${e.Year ? e.Year : ''} ${e.EInvoiceType.Label}`}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'

export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextEmployee/api/Employee', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
