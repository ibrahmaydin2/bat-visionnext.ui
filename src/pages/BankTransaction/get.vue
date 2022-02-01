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
            <GetFormField />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('get.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.description1')}}:</b> {{rowData.Description1}}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId === 2) ? $t('insert.passive') : $t('insert.active')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.customer.Customer')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.DocumentDate, 'date', 'get.BankTransaction.DocumentDate')"></div>
              <div v-html="getFormatDataByType(rowData.Bank, 'object', 'get.BankTransaction.Bank')"></div>
              <div v-html="getFormatDataByType(rowData.BankBranch, 'object', 'get.BankTransaction.BankBranch')"></div>
              <div v-html="getFormatDataByType(rowData.BankAccountNumber, 'text', 'get.BankTransaction.BankAccountNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'get.BankTransaction.Customer')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerBank, 'object', 'get.BankTransaction.CustomerBank')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CustomerBankBranch, 'object', 'get.BankTransaction.CustomerBankBranch')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerBankAccountNumber, 'text', 'get.BankTransaction.CustomerBankAccountNumber')"></div>
              <div v-html="getFormatDataByType(rowData.DocumentNumber, 'text', 'get.BankTransaction.DocumentNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Currency, 'object', 'get.BankTransaction.Currency')"></div>
              <div v-html="getFormatDataByType(rowData.TransactionType, 'object', 'get.BankTransaction.TransactionType')"></div>
              <div v-html="getFormatDataByType(rowData.TransactionTotal, 'text', 'get.BankTransaction.TransactionTotal')"></div>
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
      this.$store.dispatch('getData', {...this.query, api: `VisionNextBank/api/${this.$route.meta.baseLink}`, record: this.$route.params.url})
    }
  }
}
</script>
