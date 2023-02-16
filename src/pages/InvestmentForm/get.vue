<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="'router.investmentForm'" />
          </header>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('router.investmentForm')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.investmentForm.customer')"></div>
              <div v-html="getFormatDataByType(customerList.Description1, 'text', 'insert.investmentForm.customerName')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerLocations.AddressDetail, 'text', 'insert.investmentForm.address')"></div>
              <div v-html="getFormatDataByType(rowData.LicenseNumber, 'text', 'insert.investmentForm.licenseNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.investmentForm.description')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerRegion5.Label, 'text', 'insert.investmentForm.typeId')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(customerList.RouteDetails[0].Route.Label, 'text', 'insert.investmentForm.route')"></div>
              <div v-html="getFormatDataByType(customerList.RouteDetails[0].Representative.Label, 'text', 'insert.investmentForm.tmrSrName')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.investmentForm.formDate')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.investmentForm.salesVolumeClass')"></div>
              <div v-html="getFormatDataByType(customerList.CustomerRegion5.Label, 'text', 'insert.investmentForm.customerArea')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.investmentForm.signingType')"></div>
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
      customerList:[]
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
    },
  methods: {
    getData () {       
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContractManagement/api/Contract', record: this.$route.params.url}).then(() => {
        this.$api.post({RecordId: this.rowData.CustomerId}, 'Customer', 'Customer/Get').then((response) => {
          this.customerList=response.Model
          console.log(this.customerList)
          
        })
      })
      this.getLookups()
    },
    getLookups (kindId) {
      this.$api.postByUrl({LookupTableCode: 'CUSTOMER_KIND'}, 'VisionNextCommonApi/api/LookupValue/GetValuesMultiple?v=2').then((response) => {
        if (this.lookupValues = response.Values.CUSTOMER_KIND.find(a => a.DecimalValue === kindId))
        this.form.salesVolumeClass = this.lookupValues.Label
      })
    },
  }
}
</script>