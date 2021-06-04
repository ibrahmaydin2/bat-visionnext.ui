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
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.beginDate')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.endDate')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.TerminalMessageValidDates" :key="i">
                      <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                      <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.branchs')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.branchCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.branchName')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.TerminalMessageBranchs" :key="i">
                      <b-td>{{c.Code}}</b-td>
                      <b-td>{{c.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
         <b-tab :title="$t('insert.terminalMessage.customerCriterias')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MK'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.columnName')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.columnValue')}}</span></b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in (rowData.TerminalMessageDetails ? rowData.TerminalMessageDetails.filter(c => c.TableName === 'T_CUSTOMER' && c.ColumnName !== 'RECORD_ID') : [])" :key="i">
                      <b-td>{{c.ColumnName}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerList')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'ML'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.customerCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.customerName')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.commercialTitle')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.location')}}</span></b-th>
                 </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in (rowData.TerminalMessageDetails ? rowData.TerminalMessageDetails.filter(c => c.TableName === 'T_CUSTOMER' && c.ColumnName === 'RECORD_ID') : [])" :key="i">
                      <b-td>{{c.CustomerCode}}</b-td>
                      <b-td>{{c.ColumnValue}}</b-td>
                      <b-td>{{c.CommercialTitle}}</b-td>
                      <b-td>{{c.LocationName}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerQuery')" v-if="rowData.CustomerCriteria && rowData.CustomerCriteria.Code === 'MS'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.customerQuery')}}</span></b-th>
                 </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.TerminalMessageCustSqls" :key="i">
                      <b-td>{{c.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
         <b-tab :title="$t('insert.terminalMessage.routes')" v-if="rowData.MessageType && rowData.MessageType.Code === 'RM'">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table-simple bordered small>
                  <b-thead>
                    <b-th><span>{{$t('insert.terminalMessage.branchCode')}}</span></b-th>
                    <b-th><span>{{$t('insert.terminalMessage.branchName')}}</span></b-th>
                 </b-thead>
                  <b-tbody>
                    <b-tr v-for="(c, i) in rowData.TerminalMessageRoutes" :key="i">
                      <b-td>{{c.Code}}</b-td>
                     <b-td>{{c.Description1}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
