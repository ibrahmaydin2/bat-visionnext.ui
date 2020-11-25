<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.employee.Model_Code')}}:</b></span> 
            <span><i class="fas fa-check" />  <b>{{$t('insert.employee.Model_Name')}}:</b></span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.employee.Model_Surname')}}:</b></span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.employee.state')}}:</b></span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.Employee')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPCustomerCode')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ERPSupplierCode')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_IsRepresentative')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_SAPSrCode')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Team')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.active')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.passive')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Description')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_GsmNumber')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone1')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Telephone2')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Email')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Fax')}}</span>
                <p></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.Model_Personal')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BirthDate')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentEndDate')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EmploymentEndDate')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_EducationId')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Identificationnumber')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_BloodType')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_JeansSize')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ShirtSize')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_Shoesize')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_CoatSize')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_TShirtSize')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_ClothTrousersSize')}}</span>
                <p></p>
              </b-card>
            </b-col>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.employee.EmployeeCustomer')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_CreateCustomer')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_taxNumber')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_FinanceCode1')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.employee.Model_PriceListCategoryId')}}</span>
                <p></p>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeDevices')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="[]" :fields="fields1">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeeBanks')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="[]" :fields="fields2">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.employee.EmployeePrefix')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="[]" :fields="fields3">
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>

      </b-tabs>
    </div>
  </div>
  <!-- "EmployeeDevices": "Uygun Cihazlar",
      "EmployeeBanks": "Banka",
      "Model_BankBranchId": "Banka Şube Adı",
      "EmployeePrefix": "Prefix",
      "Model_Prefix": "Prefix" -->
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
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
