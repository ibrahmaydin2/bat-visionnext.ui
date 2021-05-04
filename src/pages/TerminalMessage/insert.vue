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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="4" lg="4">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
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
              <b-form-input type="text" v-model="form.MessageSubject" :readonly="insertReadonly.MessageSubject" />
            </NextFormGroup>
            <NextFormGroup item-key="MessageBody" :error="$v.form.MessageBody" md="3" lg="3">
              <b-form-input type="text" v-model="form.MessageBody" :readonly="insertReadonly.MessageBody" />
            </NextFormGroup>
            <NextFormGroup item-key="MessageTypeId" :error="$v.form.MessageTypeId" md="3" lg="3">
              <NextDropdown v-model="selectedMessageType" lookup-key="MESSAGE_TYPE" @input="selectedType('MessageTypeId', $event)" />
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId" md="3" lg="3">
              <NextDropdown v-model="selectedCustomerCriteria" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)" :disabled="!selectedMessageType || selectedMessageType.Code !== 'MM'"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.validDates')">
          <b-row>
            <NextFormGroup :title="$t('insert.terminalMessage.beginDate')" :error="$v.terminalMessageValidDates.beginDate" :required="true" md="5" lg="5">
              <b-form-datepicker v-model="terminalMessageValidDates.beginDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.terminalMessage.endDate')" :error="$v.terminalMessageValidDates.endDate" :required="true" md="5" lg="5">
              <b-form-datepicker v-model="terminalMessageValidDates.endDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addTerminalMessageValidDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.beginDate')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.endDate')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.TerminalMessageValidDates" :key="i">
                  <b-td>{{dateConvertFromTimezone(c.BeginDate)}}</b-td>
                  <b-td>{{dateConvertFromTimezone(c.EndDate)}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeTerminalMessageValidDate(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
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
                url="VisionNextBranch/api/Branch/AutoCompleteSearch"
                searchable
                label="Code"
                and-condition-search-field="Code"/>
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
                <b-tr v-for="(c, i) in form.TerminalMessageBranchs" :key="i">
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
            <NextFormGroup :title="$t('insert.terminalMessage.columnName')" :error="$v.customerCriterias.columnName" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="customerCriterias.columnName"
                url="VisionNextCommonApi/api/LookupValue/GetValuesBySysParams"
                :dynamic-request="{paramId: 'CUSTOMER_CRITERIA'}"
                label="Label"
                @input="setCustomerCriteriaValues" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.terminalMessage.columnValue')" :error="$v.customerCriterias.columnValue" :required="true" md="5" lg="5">
              <NextDropdown
                :disabled="!customerCriterias.columnName"
                v-model="customerCriterias.columnValue"
                label="Label"
                :source="customerCriteriaValues"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerCriteria" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.columnName')}}</span></b-th>
                <b-th><span>{{$t('insert.terminalMessage.columnValue')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in (form.TerminalMessageDetails ? form.TerminalMessageDetails.filter(c => c.TableName === 'T_CUSTOMER') : [])" :key="i">
                  <b-td>{{c.ColumnNameStr}}</b-td>
                  <b-td>{{c.ColumnValueStr}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeCustomerCriteria(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.customerQuery')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MS'">
          <b-row>
            <NextFormGroup :title="$t('insert.terminalMessage.customerQuery')" :error="$v.customerQuery" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="customerQuery"
                url="VisionNextSystem/api/SysCustomerSql/Search" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addCustomerQuery" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.terminalMessage.customerQuery')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(c, i) in form.TerminalMessageCustSqls" :key="i">
                  <b-td>{{c.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeCustomerQuery(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.routes')" v-if="selectedMessageType && selectedMessageType.Code === 'RM'">
          <b-row>
            <NextFormGroup :title="$t('insert.terminalMessage.routeCode')" :error="$v.terminalMessageRoute" :required="true" md="5" lg="5">
              <NextDropdown
                v-model="terminalMessageRoute"
                url="VisionNextRoute/api/Route/AutoCompleteSearch"
                searchable
                label="Code"
                and-condition-search-field="Code"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.terminalMessage.routeName')">
              <b-form-input type="text" v-model="terminalMessageRouteName" :disabled="true"/>
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addTerminalMessageRoute" />
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
                <b-tr v-for="(c, i) in form.TerminalMessageRoutes" :key="i">
                  <b-td>{{c.Code}}</b-td>
                  <b-td>{{c.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeTerminalMessageRoute(c)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
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
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
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
      terminalMessageBranch: null,
      terminalMessageRoute: null,
      customerCriterias: {
        columnName: null,
        columnValue: null
      },
      terminalMessageValidDates: {
        beginDate: null,
        endDate: null
      },
      customerQuery: null,
      selectedMessageType: null,
      selectedCustomerCriteria: null,
      customerCriteriaValues: []
    }
  },
  computed: {
    ...mapState(['']),
    branchName () {
      return this.terminalMessageBranch ? this.terminalMessageBranch.Description1 : ''
    },
    terminalMessageRouteName () {
      return this.terminalMessageRoute ? this.terminalMessageRoute.Description1 : ''
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    setCustomerCriteriaValues (value) {
      this.customerCriteriaValues = []
      this.customerCriterias.columnValue = null
      if (value) {
        this.$api.postByUrl({paramName: value.Label}, 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues').then((res) => {
          this.customerCriteriaValues = res.Values
        })
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.createData()
      }
    },
    addCustomerCriteria () {
      this.$v.customerCriterias.$touch()
      if (this.$v.customerCriterias.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageDetails.filter(i => i.ColumnName === this.customerCriterias.columnName.Code && i.ColumnValue === this.customerCriterias.columnValue.DecimalValue)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.TerminalMessageDetails.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        TableName: 'T_CUSTOMER',
        ColumnName: this.customerCriterias.columnName.Code,
        ColumnValue: this.customerCriterias.columnValue.DecimalValue,
        ColumnNameStr: this.customerCriterias.columnName.Label,
        ColumnValueStr: this.customerCriterias.columnValue.Label
      })
      this.customerCriterias = {}
      this.$v.customerCriterias.$reset()
    },
    removeCustomerCriteria (item) {
      this.form.TerminalMessageDetails.splice(this.form.TerminalMessageDetails.indexOf(item), 1)
    },
    addCustomerQuery () {
      this.$v.customerQuery.$touch()
      if (this.$v.customerQuery.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageCustSqls.filter(i => i.Code === this.customerQuery.Code)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      this.form.TerminalMessageCustSqls.push({
        RecordState: 2,
        StatusId: 1,
        Code: this.customerQuery.Code,
        Description1: this.customerQuery.Description1,
        CustomerSqlId: this.customerQuery.RecordId
      })
      this.customerQuery = null
      this.$v.customerQuery.$reset()
    },
    removeCustomerQuery (item) {
      this.form.TerminalMessageCustSqls.splice(this.form.TerminalMessageCustSqls.indexOf(item), 1)
    },
    addTerminalMessageBranch () {
      this.$v.terminalMessageBranch.$touch()
      if (this.$v.terminalMessageBranch.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageBranchs.filter(i => i.Code === this.terminalMessageBranch.Code)
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
      this.form.TerminalMessageBranchs.splice(this.form.TerminalMessageBranchs.indexOf(item), 1)
    },
    addTerminalMessageRoute () {
      this.$v.terminalMessageRoute.$touch()
      if (this.$v.terminalMessageRoute.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageRoutes.filter(i => i.Code === this.terminalMessageRoute.Code)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      let item = {
        RecordState: 2,
        StatusId: 1,
        Deleted: 0,
        System: 0,
        Code: this.terminalMessageRoute.Code,
        Description1: this.terminalMessageRoute.Description1,
        RouteId: this.terminalMessageRoute.RecordId
      }
      this.form.TerminalMessageRoutes.push(item)
      this.terminalMessageRoute = null
      this.$v.terminalMessageRoute.$reset()
    },
    removeTerminalMessageRoute (item) {
      this.form.TerminalMessageRoutes.splice(this.form.TerminalMessageRoutes.indexOf(item), 1)
    },
    addTerminalMessageValidDate () {
      this.$v.terminalMessageValidDates.$touch()
      if (this.$v.terminalMessageValidDates.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      let filteredArr = this.form.TerminalMessageValidDates.filter(i => i.BeginDate === this.terminalMessageValidDates.beginDate && i.EndDate === this.terminalMessageValidDates.endDate)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }
      let item = {
        RecordState: 2,
        StatusId: 1,
        Deleted: 0,
        System: 0,
        BeginDate: this.terminalMessageValidDates.beginDate,
        EndDate: this.terminalMessageValidDates.endDate
      }
      this.form.TerminalMessageValidDates.push(item)
      this.terminalMessageValidDates = null
      this.$v.terminalMessageValidDates.$reset()
    },
    removeTerminalMessageValidDate (item) {
      this.form.TerminalMessageValidDates.splice(this.form.TerminalMessageValidDates.indexOf(item), 1)
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
      customerCriterias: {
        columnName: {
          required
        },
        columnValue: {
          required
        }
      },
      customerQuery: {
        required
      },
      terminalMessageBranch: {
        required
      },
      terminalMessageRoute: {
        required
      },
      terminalMessageValidDates: {
        beginDate: {
          required
        },
        endDate: {
          required
        }
      }
    }
  },
  watch: {
  }
}
</script>
