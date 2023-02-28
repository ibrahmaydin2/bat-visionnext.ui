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
            <GetFormField v-model="workFlowModel"/>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="far fa-code" /> <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="far fa-circle" /> <b>{{$t('get.description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ContractTransferStatus, 'object', 'get.RefContract.ContractTransferStatus')"></div>
              <div v-html="getFormatDataByType(rowData.IsHero, 'check', 'get.RefContract.IsHero')"></div>
              <div v-html="getFormatDataByType(rowData.SourceContract, 'object', 'get.RefContract.SourceContract')"></div>
              <div v-html="getFormatDataByType(rowData.SourceContractStartDate, 'date', 'get.RefContract.SourceContractStartDate')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.SourceCustomer, 'object', 'get.RefContract.SourceCustomer')"></div>
              <div v-html="getFormatDataByType(rowData.TargetCustomer, 'object', 'get.RefContract.TargetCustomer')"></div>
              <div v-html="getFormatDataByType(rowData.TransferReason, 'object', 'get.RefContract.TransferReason')"></div>
              <div v-html="getFormatDataByType(rowData.SourceContractEndDate, 'date', 'get.RefContract.SourceContractEndDate')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.RefContract.ContractDetail')">
          <b-row class="p-4" v-if="contractDetail">
            <b-col>
              <b-table :items="contractDetail" :fields="fields" striped responsive sticky-header="500px">
                <template #head()="data">
                  {{$t(data.label)}}
                </template>
              </b-table>
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      contractDetail: [],
      fields: [
        {key: 'OperationDesc', label: this.$t('get.RefContract.OperationDesc'), sortable: false},
        {key: 'TotalAmount', label: this.$t('get.RefContract.TotalBudget'), sortable: false},
        {key: 'UsedAmount', label: this.$t('get.RefContract.UseBudget'), sortable: false}
      ],
      workFlowModel: {
        ControllerName: 'RefContract',
        ClassName: 'RefContract',
        PageName: 'pg_ContractTransfer'
      }
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextContract/api/RefContract', record: this.$route.params.url})
    },
    getCustomerDetail (id) {
      this.$api.get('Contract', `RefContract/GetRefContractDetails?contractId=${id}`).then((res) => {
        this.contractDetail = res
      })
    }
  },
  watch: {
    rowData (e) {
      if (e) {
        console.log(e)
        if (e.SourceContractId) {
          this.getCustomerDetail(e.SourceContractId)
        }
      }
    }
  }
}
</script>
