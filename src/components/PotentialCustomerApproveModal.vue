<template>
  <b-overlay :show="status" rounded="sm">
    <b-row class="asc__modal-approveModal">
      <b-col cols="12">
        <h5>{{$t('insert.approveModal')}}</h5>
      </b-col>
      <b-col cols="12" class="asc__modal-approveModal-body" v-if="modalItem">
        <p style="font-weight: bold">{{modalItem.CommercialTitle}}</p>
        <p>{{modalItem.Description1}}</p>
      </b-col>
      <b-col cols="12" class="asc__modal-approveModal-footer">
        <div class="w-100 text-right">
          <b-button type="button" @click="closeModal()" variant="warning" size="md" >
            {{$t('insert.cancel')}}
          </b-button>
          <b-button @click="goUpdate" type="button" variant="primary" size="md" >
            {{$t('insert.edit')}}
          </b-button>
          <b-button id="submitButton" type="button" size="md" @click="submit()" variant="success" >
            {{$t('insert.confirm')}}
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-overlay>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      status: false,
      title: ''
    }
  },
  props: ['modalAction', 'modalItem'],
  computed: {
    ...mapState(['BranchId', 'CompanyId'])
  },
  methods: {
    submit () {
      this.status = true
      let model = {
        'model': {
          'recordId': this.modalItem.RecordId,
          'code': this.modalItem.Code,
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
          'Description1': this.modalItem.Description1,
          'TaxOffice': this.modalItem.TaxOffice,
          'TaxNumber': this.modalItem.TaxNumber,
          'Barcode': this.modalItem.Barcode,
          'DefaultPaymentTypeId': this.modalItem.DefaultPaymentTypeId,
          'PriceListCategoryId': this.modalItem.PriceListCategoryId,
          'LicenseNumber': this.modalItem.LicenseNumber,
          'InvoiceCombineRuleId': this.modalItem.InvoiceCombineRuleId,
          'DeliveryDayParam': this.modalItem.DeliveryDayParam,
          'SalesDocumentTypeId': this.modalItem.SalesDocumentTypeId,
          'IsOrderChangeUnitary': this.modalItem.IsOrderChangeUnitary,
          'IsWarehouseSale': this.modalItem.IsWarehouseSale,
          'RecordTypeId': this.modalItem.RecordTypeId,
          'CurrentRisk': this.modalItem.CurrentRisk,
          'CardTypeId': this.modalItem.CardTypeId,
          'TypeId': this.modalItem.TypeId,

          'deleted': 0,
          'system': 0
        }
      }
      this.$store.dispatch('approvePotentialCustomer', {...this.query, api: this.modalAction.ActionUrl, formdata: model, return: null}).then(res => {
        this.status = false
        this.closeModal()
      })
    },
    goUpdate () {
      this.$router.push({name: 'PotentialCustomerUpdate', params: { url: this.modalItem.RecordId }})
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'approve-modal')
    }
  },
  mounted () {
    // let q = this.query
    // let val = q.split(',')
    // let msg = ''
    // val.forEach(el => {
    //   msg += `${this.data[el.trim()]} `
    // })
    // this.title = msg
  },
  watch: {
  }
}
</script>
