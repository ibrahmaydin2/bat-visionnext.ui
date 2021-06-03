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
              <div v-html="getFormatDataByType(rowData.Name, 'text', 'insert.employee.Model_Name')"></div>
              <div v-html="getFormatDataByType(rowData.Surname, 'text', 'insert.employee.Model_Surname')"></div>
              <div v-html="getFormatDataByType(rowData.Group, 'object', 'insert.employee.Model_UserPersonalGroup')"></div>
              <div v-html="getFormatDataByType(rowData.Category1, 'object', 'insert.employee.category')"></div>
              <div v-html="getFormatDataByType(rowData.Other1, 'text', 'insert.employee.Model_Description')"></div>
              <div v-html="getFormatDataByType(rowData.IsTeam, 'check', 'insert.employee.Model_Team')"></div>
              <div v-html="getFormatDataByType(rowData.PriceListCategory, 'object', 'insert.employee.Model_PriceListCategoryId')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FinanceCode1, 'text', 'insert.employee.Model_ERPCustomerCode')"></div>
              <div v-html="getFormatDataByType(rowData.CreateCustomerRecord, 'check', 'insert.employee.CreateCustomerRecord')"></div>
              <div v-html="getFormatDataByType(rowData.FinanceCode2, 'text', 'insert.employee.Model_ERPSupplierCode')"></div>
              <div v-html="getFormatDataByType(rowData.ScoreCardClass, 'object', 'insert.employee.scoreCardClasses')"></div>
              <div v-html="getFormatDataByType(rowData.SapHrCode, 'text', 'insert.employee.Model_SAPSrCode')"></div>
              <div v-html="getFormatDataByType(rowData.IsRepresentative, 'check', 'insert.employee.Model_IsRepresentative')"></div>
            </b-card>
          </b-row>
         </b-tab>
        <b-tab :title="$t('insert.employee.groupInfo')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.employee.personalType')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.UserGroup, 'object', 'insert.employee.Model_UserGroupId')"></div>
            </b-card>
         </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.Model_Personal')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.EmploymentStartDate, 'date', 'insert.employee.Model_EmploymentStartDate')"></div>
              <div v-html="getFormatDataByType(rowData.EmploymentEndDate, 'date', 'insert.employee.Model_EmploymentEndDate')"></div>
              <div v-html="getFormatDataByType(rowData.TaxNumber, 'text', 'insert.employee.Model_Identificationnumber')"></div>
               <div v-html="getFormatDataByType(rowData.BirthDate, 'date', 'insert.employee.Model_BirthDate')"></div>
              <div v-html="getFormatDataByType(rowData.TShirtSize, 'text', 'insert.employee.Model_TShirtSize')"></div>
              <div v-html="getFormatDataByType(rowData.MontSize, 'text', 'insert.employee.Model_ShirtSize')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.OvercoatSize, 'text', 'insert.employee.Model_CoatSize')"></div>
              <div v-html="getFormatDataByType(rowData.ShoeSize, 'text', 'insert.employee.Model_Shoesize')"></div>
              <div v-html="getFormatDataByType(rowData.Education, 'object', 'insert.employee.Model_EducationId')"></div>
               <div v-html="getFormatDataByType(rowData.DenimSize, 'text', 'insert.employee.Model_JeansSize')"></div>
              <div v-html="getFormatDataByType(rowData.CorduroySize, 'text', 'insert.employee.Model_ClothTrousersSize')"></div>
              <div v-html="getFormatDataByType(rowData.BloodType, 'object', 'insert.employee.Model_BloodType')"></div>
            </b-card>
         </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeContact')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Telephone1, 'text', 'insert.employee.Model_Telephone1')"></div>
              <div v-html="getFormatDataByType(rowData.Telephone2, 'text', 'insert.employee.Model_Telephone2')"></div>
              <div v-html="getFormatDataByType(rowData.GsmNumber, 'text', 'insert.employee.Model_GsmNumber')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FaxNumber, 'text', 'insert.employee.Model_Fax')"></div>
              <div v-html="getFormatDataByType(rowData.Email, 'text', 'insert.employee.Model_Email')"></div>
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
