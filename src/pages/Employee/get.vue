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
            <span><i class="fas fa-code" />  <b>{{$t('insert.employee.Model_Code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.employee.Model_Name')}}:</b> {{rowData.Name}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.employee.Model_Surname')}}:</b> {{rowData.Surname}}</span>
            <span><i class="far fa-circle" /><b> {{$t('insert.employee.state')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.Employee')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_UserGroupId')}}</span>
                <p>{{rowData.Group ? rowData.Group.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.category1')}}</span>
                <p>{{rowData.Category1 ? rowData.Category1.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.personalType')}}</span>
                <p>{{rowData.Type ? rowData.Type.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPCustomerCode')}}</span>
                <p>{{rowData.FinanceCode1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPSupplierCode')}}</span>
                <p>{{rowData.FinanceCode2}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_IsRepresentative')}}</span>
                <p><i :class="rowData.IsRepresentative === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_SAPSrCode')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Team')}}</span>
                <p><i :class="rowData.IsTeam === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Description')}}</span>
                <p>{{rowData.other1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.scoreCardClasses')}}</span>
                <p>{{rowData.ScoreCardClass ? rowData.ScoreCardClass.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_GsmNumber')}}</span>
                <p>{{rowData.GsmNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone1')}}</span>
                <p>{{rowData.Telephone1}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone2')}}</span>
                <p>{{rowData.Telephone2}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Email')}}</span>
                <p>{{rowData.Email}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Fax')}}</span>
                <p>{{rowData.FaxNumber}}</p>
                <p></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.Model_Personal')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BirthDate')}}</span>
                <p>{{dateConvertFromTimezone(rowData.BirthDate)}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentStartDate')}}</span>
                <p>{{dateConvertFromTimezone(rowData.EmploymentStartDate)}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentEndDate')}}</span>
                <p>{{dateConvertFromTimezone(rowData.EmploymentEndDate)}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EducationId')}}</span>
                <p>{{rowData.Education ? rowData.Education.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Identificationnumber')}}</span>
                <p>{{rowData.taxNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BloodType')}}</span>
                <p>{{rowData.BloodType ? rowData.BloodType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_JeansSize')}}</span>
                <p>{{rowData.DenimSize}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ShirtSize')}}</span>
                <p>{{rowData.MontSize}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Shoesize')}}</span>
                <p>{{rowData.ShoeSize}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_CoatSize')}}</span>
                <p>{{rowData.OvercoatSize}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_TShirtSize')}}</span>
                <p>{{rowData.TShirtSize}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ClothTrousersSize')}}</span>
                <p>{{rowData.CorduroySize}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4" v-if="rowData.CreateCustomerRecord">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.EmployeeCustomer')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_PriceListCategoryId')}}</span>
                <p>{{rowData.PriceListCategory ? rowData.PriceListCategory.Label : ''}}</p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeePrefix')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="rowData.EInvoiceSeqs" :fields="fields3">
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

export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
      fields1: [
        {
          key: 'serialNo',
          label: this.$t('insert.employee.Model_SerialNumber'),
          sortable: true
        },
        {
          key: 'model',
          label: this.$t('insert.employee.Model_DeviceModelId'),
          sortable: true
        },
        {
          key: 'area',
          label: this.$t('insert.employee.Model_DeviceUseAraeId'),
          sortable: true
        }
      ],
      fields2: [
        {
          key: 'code',
          label: this.$t('insert.employee.code'),
          sortable: true
        },
        {
          key: 'branchName',
          label: this.$t('insert.employee.Model_BankBranchId'),
          sortable: true
        }
      ],
      fields3: [
        {
          key: 'prefixCode',
          label: this.$t('insert.employee.code'),
          sortable: true
        },
        {
          key: 'prefix',
          label: this.$t('insert.employee.Model_Prefix'),
          sortable: true
        }
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextEmployee/api/Employee', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
