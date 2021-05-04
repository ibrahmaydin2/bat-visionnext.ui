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
            <GetFormField v-model="workFlowModel" />
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="far fa-code" />  <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="far fa-circle" />  <b>{{$t('get.description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.contract.management')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.contract.Description1')"></div>
              <div v-html="getFormatDataByType(rowData.ContractNumber, 'text', 'insert.contract.ContractNumber')"></div>
              <div v-html="getFormatDataByType(rowData.Class, 'object', 'insert.contract.ClassId')"></div>
              <div v-html="getFormatDataByType(rowData.Brand, 'object', 'insert.contract.BrandId')"></div>
              <div v-html="getFormatDataByType(rowData.Genexp1, 'text', 'insert.contract.GenExp')"></div>
            </b-card>
             <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.FinanceCode, 'text', 'insert.contract.FinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerFinanceCode, 'text', 'insert.contract.CustomerFinanceCode')"></div>
              <div v-html="getFormatDataByType(rowData.ApproveState, 'object', 'insert.contract.ApproveStateId')"></div>
              <div v-html="getFormatDataByType(rowData.Type, 'object', 'insert.contract.TypeId')"></div>
              <div v-html="getFormatDataByType(rowData.Customer, 'object', 'insert.contract.CustomerId')"></div>
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
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      workFlowModel: {
        ControllerName: '',
        ClassName: 'TerminalMessage',
        PageName: 'pg_TerminalMessage'
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/TerminalMessage', record: this.$route.params.url})
    }
  }
}
</script>
