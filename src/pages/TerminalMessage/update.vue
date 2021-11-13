<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'TerminalMessage' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code" md="4" lg="4">
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" disabled/>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="4" lg="4">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" disabled/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="4" lg="4">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.terminalMessage.definitions')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="MessageSubject" :error="$v.form.MessageSubject" md="3" lg="3">
              <b-form-input type="text" v-model="form.MessageSubject" :readonly="insertReadonly.MessageSubject" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="MessageBody" :error="$v.form.MessageBody" md="3" lg="3">
              <b-form-input type="text" v-model="form.MessageBody" :readonly="insertReadonly.MessageBody" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="MessageTypeId" :error="$v.form.MessageTypeId" md="3" lg="3">
              <NextDropdown v-model="selectedMessageType" lookup-key="MESSAGE_TYPE" @input="selectedType('MessageTypeId', $event)" disabled/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId" md="3" lg="3">
              <NextDropdown v-model="selectedCustomerCriteria" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)" disabled/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.validDates')">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.beginDate')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.endDate')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.TerminalMessageValidDates" :key="i">
                  <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.branchs')">
          <b-row>
            <NextFormGroup :title="$t('insert.terminalMessage.branchCode')" :error="$v.terminalMessageBranch" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="terminalMessageBranch"
                url="VisionNextBranch/api/Branch/Search"
                searchable
                label="Code"
                custom-option
                or-condition-fields="Code,Description1"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.terminalMessage.branchName')">
              <b-form-input type="text" v-model="branchName" :disabled="true"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addTerminalMessageBranch" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.branchCode')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.branchName')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.TerminalMessageBranchs ? form.TerminalMessageBranchs.filter(i => i.RecordState !== 4): [])" :key="i">
                  <b-td>{{c.Code}}</b-td>
                  <b-td>{{c.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeTerminalMessageBranch(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerCriterias')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MK'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.columnName')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.columnValue')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.TerminalMessageDetails ? form.TerminalMessageDetails.filter(c => c.TableName === 'T_CUSTOMER' && c.ColumnName !== 'RECORD_ID') : [])" :key="i">
                  <b-td>{{c.ColumnName}}</b-td>
                  <b-td>{{c.ColumnValue}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
         <b-tab :title="$t('insert.terminalMessage.customerList')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'ML'">
          <b-row>
            <b-col cols="12">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.terminalMessage.customerCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.terminalMessage.commercialTitle')}}</span></b-th>
                  <b-th><span>{{$t('insert.terminalMessage.location')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(c, i) in (form.TerminalMessageDetails ? form.TerminalMessageDetails.filter(c => c.TableName === 'T_CUSTOMER' && c.ColumnName === 'RECORD_ID') : [])" :key="i">
                    <b-td>{{c.ColumnNameDesc ? c.ColumnNameDesc : c.CustomerCode}}</b-td>
                    <b-td>{{c.ColumnValueDesc ? c.ColumnValueDesc : c.CommercialTitle}}</b-td>
                    <b-td>{{c.ColumnValueDesc2 ? c.ColumnValueDesc2 : c.LocationName}}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerQuery')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MS'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.customerQuery')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.TerminalMessageCustSqls" :key="i">
                  <b-td>{{c.Description1}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.routes')" v-if="selectedMessageType && selectedMessageType.Code === 'RM'">
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.branchCode')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.branchName')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.TerminalMessageRoutes" :key="i">
                  <b-td>{{c.Code}}</b-td>
                  <b-td>{{c.Description1}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/update'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        MessageTypeId: null,
        MessageBody: null,
        CustomerCriteriaId: null,
        TerminalMessageBranchs: [],
        TerminalMessageValidDates: [],
        TerminalMessageDetails: [],
        TerminalMessageCustSqls: [],
        TerminalMessageRoutes: []
      },
      routeName1: 'CommonApi',
      selectedMessageType: null,
      selectedCustomerCriteria: null,
      terminalMessageBranch: null
    }
  },
  computed: {
    branchName () {
      return this.terminalMessageBranch ? this.terminalMessageBranch.Description1 : ''
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      if (this.rowData) {
        this.form = this.rowData
        this.selectedMessageType = this.rowData.MessageType
        this.selectedCustomerCriteria = this.rowData.CustomerCriteria
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.updateData()
      }
    },
    addTerminalMessageBranch () {
      this.$v.terminalMessageBranch.$touch()
      if (this.$v.terminalMessageBranch.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageBranchs.filter(i => i.Code === this.terminalMessageBranch.Code && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      let item = {
        RecordState: 2,
        StatusId: 1,
        Deleted: 0,
        System: 0,
        Code: this.terminalMessageBranch.Code,
        Description1: this.terminalMessageBranch.Description1,
        MessageBranchId: this.terminalMessageBranch.RecordId
      }
      this.form.TerminalMessageBranchs.push(item)
      this.terminalMessageBranch = null
      this.$v.terminalMessageBranch.$reset()
    },
    removeTerminalMessageBranch (item) {
      if (item.RecordId > 0) {
        this.form.TerminalMessageBranchs[this.form.TerminalMessageBranchs.indexOf(item)].RecordState = 4
      } else {
        this.form.TerminalMessageBranchs.splice(this.form.TerminalMessageBranchs.indexOf(item), 1)
      }
    }
  },
  validations () {
    if (!this.selectedMessageType || this.selectedMessageType.Code !== 'MM') {
      this.insertRules.CustomerCriteriaId = {}
      this.insertRequired.CustomerCriteriaId = false
    } else {
      this.insertRules.CustomerCriteriaId = {
        required
      }
      this.insertRequired.CustomerCriteriaId = true
    }
    return {
      form: this.insertRules,
      terminalMessageBranch: {
        required
      }
    }
  }
}
</script>
