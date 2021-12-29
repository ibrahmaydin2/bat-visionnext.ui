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
            <span><i class="far fa-code" /> <b>{{$t('get.code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="far fa-circle" /> <b>{{$t('get.description1')}}:</b> {{ rowData.Description1 }}</span>
            <span><i class="fas fa-check" /> <b>{{$t('get.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.terminalMessage.definitions')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.MessageSubject, 'text', 'insert.terminalMessage.messageSubject')"></div>
              <div v-html="getFormatDataByType(rowData.MessageBody, 'text', 'insert.terminalMessage.messageBody')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.MessageType, 'object', 'insert.terminalMessage.messageType')"></div>
              <div v-html="getFormatDataByType(rowData.CustomerCriteria, 'object', 'insert.terminalMessage.customerCriteria')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.validDates')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.TerminalMessageValidDates" :items="validDateItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.branchs')">
         <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.TerminalMessageBranchs" :items="messageBranchItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
         <b-tab :title="$t('insert.terminalMessage.customerCriterias')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerCriterias" :items="customerCriteriaItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerList')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="customerList" :items="customerListItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerQuery')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MS'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.TerminalMessageCustSqls" :items="custSqlItems"></NextDetailPanel>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
         <b-tab :title="$t('insert.terminalMessage.routes')" v-if="rowData.MessageType && rowData.MessageType.Code === 'RM'">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.TerminalMessageRoutes" :items="routeItems"></NextDetailPanel>
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
import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      validDateItems: detailData.validDateItems,
      messageBranchItems: detailData.messageBranchItems,
      routeItems: detailData.routeItems,
      custSqlItems: detailData.custSqlItems,
      customerListItems: detailData.customerListItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      customerList: [],
      customerCriterias: [],
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCommonApi/api/TerminalMessage', record: this.$route.params.url}).then(() => {
        this.customerList = this.rowData.TerminalMessageDetails.filter(t => t.ColumnName === 'RECORD_ID')
        this.customerCriterias = this.rowData.TerminalMessageDetails.filter(t => t.ColumnName !== 'RECORD_ID')
      })
    }
  }
}
</script>
