<template>
  <b-overlay :show="status" rounded="sm">
    <b-row class="asc__modal-approveModal">
      <b-col cols="12">
        <h5>{{$t('insert.approveModal')}}</h5>
      </b-col>
      <b-col cols="12" class="asc__modal-approveModal-body">
        <p style="font-weight: bold">{{title}}</p>
        <p>{{message}}</p>
      </b-col>
      <b-col cols="12" class="asc__modal-approveModal-footer">
        <!-- <b-button type="button" @click="$bvModal.hide('ApproveModal')" variant="danger" size="sm" class="float-left">
          <i class="fas fa-times" /> {{$t('insert.cancel')}}
        </b-button> -->
        <b-button type="button" @click="submit()" variant="warning" class="float-right">
          <i class="fas fa-check" /> {{$t('insert.submit')}}
        </b-button>
      </b-col>
    </b-row>
  </b-overlay>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      status: false,
      title: ''
    }
  },
  props: ['action', 'recordId', 'data', 'query', 'message'],
  computed: {
    ...mapState(['BranchId', 'CompanyId'])
  },
  methods: {
    submit () {
      // this.$toasted.show(this.$t('insert.approveStateError'), {
      //   type: 'error',
      //   keepOnHover: true,
      //   duration: '3000'
      // })
      this.status = true
      let update = {
        'companyId': this.data.CompanyId,
        'branchId': this.data.BranchId,
        'model': {
          'updatedProperties': [
            'Description1',
            'TaxOffice',
            'TaxNumber',
            'Barcode',
            'DefaultPaymentTypeId',
            'PriceListCategoryId',
            'LicenseNumber',
            'InvoiceCombineRuleId',
            'DeliveryDayParam',
            'SalesDocumentTypeId',
            'IsOrderChangeUnitary',
            'IsWarehouseSale',
            'RecordTypeId',
            'CurrentRisk',
            'CardTypeId',
            'TypeId'
          ],
          'Description1': this.data.Description1,
          'TaxOffice': this.data.TaxOffice,
          'TaxNumber': this.data.TaxNumber,
          'Barcode': this.data.Barcode,
          'DefaultPaymentTypeId': this.data.DefaultPaymentTypeId,
          'PriceListCategoryId': this.data.PriceListCategoryId,
          'LicenseNumber': this.data.LicenseNumber,
          'InvoiceCombineRuleId': this.data.InvoiceCombineRuleId,
          'DeliveryDayParam': this.data.DeliveryDayParam,
          'SalesDocumentTypeId': this.data.SalesDocumentTypeId,
          'IsOrderChangeUnitary': this.data.IsOrderChangeUnitary,
          'IsWarehouseSale': this.data.IsWarehouseSale,
          'RecordTypeId': this.data.RecordTypeId,
          'CurrentRisk': this.data.CurrentRisk,
          'CardTypeId': this.data.CardTypeId,
          'TypeId': this.data.TypeId,

          'deleted': 0,
          'system': 0
        }
      }
      return axios.post(this.action, update, {
        headers: {
          'key': localStorage.getItem('Key')
        }
      })
        .then(res => {
          this.status = false
          this.$toasted.show(this.$t('insert.approveRejectSuccess'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
        })
        .catch(err => {
          this.status = false
          this.$toasted.show(this.$t('insert.approveRejectError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          console.log(err)
        })
    }
  },
  mounted () {
    let q = this.query
    let val = q.split(',')
    let msg = ''
    val.forEach(el => {
      msg += `${this.data[el.trim()]} `
    })
    this.title = msg
  },
  watch: {
  }
}
</script>
