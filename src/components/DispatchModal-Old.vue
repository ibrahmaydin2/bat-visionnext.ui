<template>
  <b-row class="asc__modal-dispatch-add">
    <b-col cols="9" class="asc__modal-dispatch-add-header">
      <h6>{{dispatchModalData.productType}} <b>{{dispatchModalData.productWeight}} gr</b> <small>{{dispatchModalData.orderLineNumber}}</small></h6>
    </b-col>
    <b-col cols="3" class="asc__modal-dispatch-add-header">
      <h6>{{dispatchModalData.orderQuantity}} {{dispatchModalData.measurementUnit}}</h6>
    </b-col>
    <b-col cols="6" class="asc__modal-dispatch-add-header">
      <b-row>
        <b-col cols="6">Sipariş Numarası</b-col>
        <b-col cols="6"><b>{{dispatchModalData.sapOrderNumber}}</b></b-col>
      </b-row>
      <b-row class="my-1">
        <b-col cols="6">Ambalaj Tipi</b-col>
        <b-col cols="6"><b>{{dispatchModalData.packingTypeName}}</b></b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Boyutlar</b-col>
        <b-col cols="6" v-if="dispatchModalData.productLength"><b>{{dispatchModalData.productWidth}} x {{dispatchModalData.productLength}} cm</b></b-col>
        <b-col cols="6" v-else><b>{{dispatchModalData.productWidth}} cm</b></b-col>
      </b-row>
    </b-col>
    <b-col cols="6" class="asc__modal-dispatch-add-header">
      <b-row>
        <b-col cols="6">Bakiye Miktarı</b-col>
        <b-col cols="6"><b>{{dispatchModalData.balanceShipmentAmount}}</b></b-col>
      </b-row>
      <b-row class="my-1">
        <b-col cols="6">Sevk Miktarı</b-col>
        <b-col cols="6"><b>{{dispatchModalData.shipmentQuantity}}</b></b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Stok Miktarı</b-col>
        <b-col cols="6"><b>{{dispatchModalData.stockQuantity}}</b></b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="mt-4">&nbsp;</b-col>
    <b-col cols="12" md="4">
      <b-form-group label="Sevk Emri Miktarı (Kg)" :class="{ 'form-group--error': $v.form.weight.$error }" >
        <b-form-input placeholder="Ağırlık" v-model.trim="$v.form.weight.$model" v-once type="number"></b-form-input>
        <div class="error" v-if="!$v.form.weight.between">En fazla {{dispatchModalData.balanceShipmentAmount}} kg sevk edilebilir.</div>
        <span tabindex="0"></span>
      </b-form-group>
    </b-col>
    <b-col cols="12" md="4">
      <b-form-group  label="Teslimat Adresi" :class="{ 'form-group--error': $v.form.deliveryAddress.$error }">
        <v-select :options="deliveryAddress = portalHeader.customerDeliveryAddresses" @input="selectedDeliveryAddress" label="deliveryCustomerName" v-model.trim="$v.form.deliveryAddress.$model"></v-select>
      </b-form-group>
    </b-col>
    <b-col cols="12" md="4">
      <b-form-group label="Teslimat Tarihi">
        <b-form-datepicker placeholder="Teslimat Tarihi" size="sm" v-once :min="min" :max="max" v-model="orderDate"></b-form-datepicker>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Sevk Notu">
        <b-form-textarea v-model="note" placeholder="Sevkiyat notu girin..." rows="6" style="height: 150px !important" v-once></b-form-textarea>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group>
        <b-button @click="dispatchOrder()" variant="warning">
          <i class="fas fa-truck"></i> Sevk Listesine Ekle
        </b-button>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>
import { required, between } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  data () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    minDate.setDate(now.getDate() + 1)
    maxDate.setDate(now.getDate() + 30)
    return {
      min: minDate,
      max: maxDate,
      form: {
        weight: '',
        deliveryAddress: ''
      },
      deliveryAddressCode: '',
      orderLocations: '',
      orderDate: '',
      sapOrderNumber: '',
      orderLineNumber: '',
      productType: '',
      productWeight: '',
      orderReceiverName: '',
      productLength: '',
      packingTypeName: '',
      note: '',
      shipmentQuantity: '',
      userPortalID: localStorage.getItem('userPortalId')
    }
  },
  props: ['data', 'close'],
  computed: {
    ...mapState(['dispatchModalData', 'dispatchModalId', 'portalHeader', 'tempDispatchLength'])
  },
  validations () {
    return {
      form: {
        deliveryAddress: { required },
        weight: {
          required,
          between: between(0, this.dispatchModalData.balanceShipmentAmount)
        }
      }
    }
  },
  methods: {
    dispatchOrder (items) {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show('Zorunlu alanları doldurun', {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        let sendDispatchOrder = {
          sapOrderNumber: this.data.sapOrderNumber,
          orderLineNumber: this.data.orderLineNumber,
          productType: this.data.productType,
          productWeight: this.data.productWeight,
          orderReceiverName: this.orderReceiverName,
          productWidth: this.data.productWidth,
          productLength: this.data.productLength,
          packingTypeName: this.data.packingTypeName,
          note: this.orderDate
            ? this.orderDate + ' --- ' + this.note
            : this.note,
          shipmentQuantity: this.form.weight
        }
        this.$store.dispatch('getDispatch', {
          ...this.dispord,
          item: sendDispatchOrder,
          close: this.close
        })
      }
    },
    selectedDeliveryAddress (e) {
      this.orderReceiverName = e.deliveryCustomerName
    }
  },
  watch: {
    tempDispatchLength: function (e) {
      this.$bvModal.hide(this.close)
    }
  }
}
</script>
