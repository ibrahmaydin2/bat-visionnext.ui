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
            <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="4" lg="4">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="4" lg="4">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.terminalMessage.definitions')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="MessageSubject" :error="$v.form.MessageSubject" md="3" lg="3">
              <NextInput type="text" v-model="form.MessageSubject" :disabled="insertReadonly.MessageSubject" />
            </NextFormGroup>
            <NextFormGroup item-key="MessageBody" :error="$v.form.MessageBody" md="3" lg="3">
              <NextInput type="text" v-model="form.MessageBody" :disabled="insertReadonly.MessageBody" />
            </NextFormGroup>
            <NextFormGroup item-key="MessageTypeId" :error="$v.form.MessageTypeId" md="3" lg="3">
              <NextDropdown v-model="selectedMessageType" lookup-key="MESSAGE_TYPE" @input="selectedType('MessageTypeId', $event)" :disabled="insertReadonly.MessageTypeId"/>
            </NextFormGroup>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId" md="3" lg="3">
              <NextDropdown v-model="selectedCustomerCriteria" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)" :disabled="!selectedMessageType || selectedMessageType.Code !== 'MM'"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.validDates')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageValidDates" :items="validDateItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.terminalMessage.branchs')" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageBranchs" :items="getMessageBranchItems()">
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection v-model="form.TerminalMessageBranchs" name="TerminalMessageMultipleBranch" :hidden-values="hiddenValuesBranch"></NextMultipleSelection>
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerCriterias')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MK'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="customerCriterias" :items="customerCriteriaItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerList')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'ML'" :disabled="(!form.TerminalMessageBranchs || form.TerminalMessageBranchs.length === 0)" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="customerList" :items="getCustomerListItems()" :isExcelImport="true" >
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection
                  v-model="customerList" name="TerminalMessageMultipleCustomer"
                  :hidden-values="hiddenValues"
                  :dynamic-and-condition="{multipleDynamicAndCondition}"
                >
                </NextMultipleSelection>
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerQuery')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MS'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageCustSqls" :items="custSqlItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.routes')" v-if="selectedMessageType && selectedMessageType.Code === 'RM'" :disabled="(!form.TerminalMessageBranchs || form.TerminalMessageBranchs.length === 0)" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageRoutes" :items="getRouteItems()">
            <template slot="grid">
              <div cols="12" md="2">
                <NextMultipleSelection
                  name="TerminalMessageMultipleRoute"
                  v-model="form.TerminalMessageRoutes"
                  :hidden-values="hiddenValuesRoutes"
                  :initial-values-func="initialValues"
                  :dynamic-disabled-filters="dynamicDisabledFilters"
                  :dynamic-and-condition="{multipleDynamicAndCondition, StatusIds: [1]}"
                  :change-branch-id="true"
                  :record-count="20"
                  :after-func="editForm" />
              </div>
            </template>
          </NextDetailPanel>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
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
      validDateItems: detailData.validDateItems,
      messageBranchItems: detailData.messageBranchItems,
      routeItems: detailData.routeItems,
      custSqlItems: detailData.custSqlItems,
      customerListItems: detailData.customerListItems,
      customerCriteriaItems: detailData.customerCriteriaItems,
      customerList: [],
      customerCriterias: [],
      routeName1: 'CommonApi',
      selectedMessageType: null,
      selectedCustomerCriteria: null,
      hiddenValues: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'ColumnValue'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'ColumnNameDesc'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'ColumnValue'
        },
        {
          mainProperty: 'CommercialTitle',
          targetProperty: 'ColumnValueDesc'
        },
        {
          mainProperty: 'DefaultLocation',
          targetProperty: 'ColumnValueDesc2'
        },
        {
          mainProperty: 'CommercialTitle',
          targetProperty: 'CustomerName'
        },
        {
          mainProperty: 'DefaultLocation',
          targetProperty: 'Location'
        },
        {
          defaultValue: 'RECORD_ID',
          targetProperty: 'ColumnName'
        },
        {
          defaultValue: 'T_CUSTOMER',
          targetProperty: 'TableName'
        }
      ],
      hiddenValuesBranch: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'MessageBranchId'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'Code'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'Description1'
        }
      ],
      hiddenValuesRoutes: [
        {
          mainProperty: 'RecordId',
          targetProperty: 'CustomerId'
        },
        {
          mainProperty: 'DefaultLocation',
          targetProperty: 'Location'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'Customer'
        },
        {
          mainProperty: 'Description1',
          targetProperty: 'CustomerName'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'CustomerCode'
        },
        {
          mainProperty: 'DefaultLocationId',
          targetProperty: 'LocationId'
        }
      ],
      dynamicDisabledFilters: [
        {
          mainProperty: 'BranchId',
          disabled: () => this.form.IsSuperRoute !== 1
        }
      ],
      dynamicRequiredFilters: [
        {
          mainProperty: 'BranchId',
          required: () => this.form.IsSuperRoute === 1
        }
      ]
    }
  },
  mounted () {
    this.createManualCode()
  },
  computed: {
    multipleDynamicAndCondition () {
      return this.form.TerminalMessageBranchs.length > 0
        ? { BranchIds: this.form.TerminalMessageBranchs.filter(f => f.TableName === 'T_CUSTOMER' && f.ColumnName === 'BRANCH_ID')
          .map(f => f.MessageBranchId ? f.MessageBranchId : f.RecordId)}
        : {}
    }
  },
  methods: {
    getRouteItems () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'RouteId',
          labelProperty: 'Code',
          objectKey: 'Code',
          url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
          label: 'insert.terminalMessage.routeCode',
          dynamicAndCondition: this.multipleDynamicAndCondition,
          pageCount: 500,
          required: true,
          visible: true,
          id: 1
        },
        {
          type: 'Text',
          modelProperty: 'Description1',
          parentProperty: 'Description1',
          label: 'insert.terminalMessage.routeName',
          disabled: true,
          visible: true,
          id: 2,
          parentId: 1
        },
        {
          type: 'Text',
          modelProperty: 'Code',
          parentProperty: 'Code',
          label: '',
          false: true,
          hideOnTable: true,
          id: 3,
          parentId: 1
        }
      ]
    },
    getCustomerListItems () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'ColumnValue',
          objectKey: 'ColumnNameDesc',
          labelProperty: 'Code',
          customOption: true,
          isCustomer: true,
          orConditionFields: 'Code,Description1',
          dynamicAndCondition: this.multipleDynamicAndCondition,
          url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
          label: 'insert.terminalMessage.customerCode',
          required: true,
          visible: true,
          isUnique: true,
          id: 1
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'CommercialTitle',
          objectKey: 'ColumnValueDesc',
          parentProperty: 'Description1',
          label: 'insert.terminalMessage.commercialTitle',
          visible: true,
          disabled: true,
          parentId: 1,
          id: 2
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'Location',
          valueProperty: 'AddressDetail',
          objectKey: 'ColumnValueDesc2',
          parentProperty: 'DefaultLocationId',
          url: 'VisionNextCustomer/api/CustomerLocation/Get',
          label: 'insert.terminalMessage.location',
          visible: true,
          disabled: true,
          parentId: 1,
          id: 3
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          parentId: null,
          id: 4
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          hideOnTable: true,
          defaultValue: 'RECORD_ID',
          parentId: null,
          id: 5
        }
      ]
    },
    getMessageBranchItems () {
      return [
        {
          type: 'Autocomplete',
          modelProperty: 'MessageBranchId',
          labelProperty: 'Code',
          objectKey: 'Code',
          url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          label: 'insert.terminalMessage.branchCode',
          customOption: true,
          orConditionFields: 'Code,Description1',
          required: true,
          visible: true,
          id: 1
        },
        {
          type: 'Text',
          modelProperty: 'Description1',
          parentProperty: 'Description1',
          label: 'insert.terminalMessage.branchName',
          disabled: true,
          visible: true,
          id: 2,
          parentId: 1
        },
        {
          type: 'Text',
          modelProperty: 'Code',
          parentProperty: 'Code',
          label: '',
          false: true,
          hideOnTable: true,
          id: 3,
          parentId: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          hideOnTable: true,
          defaultValue: 'BRANCH_ID',
          id: 4
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          hideOnTable: true,
          defaultValue: 'T_CUSTOMER',
          id: 5
        }
      ]
    },
    initialValues: (values) => {
      values.map(value => {
        if (value.Location) {
          value.DefaultLocation = value.Location
        }
        if (value.Customer) {
          value.Code = value.Customer.Code
          value.Description1 = value.Customer.Label
        }
        if (value.AddressDesc) {
          value.AdressDetail = value.AddressDesc
        }
        value.SelectedRow = true
        return value
      })
      return values
    },
    editForm (form) {
      form.Day1FreStartDate = form.DayFreStartDate
      form.Day2FreStartDate = form.DayFreStartDate
      form.Day3FreStartDate = form.DayFreStartDate
      form.Day4FreStartDate = form.DayFreStartDate
      form.Day5FreStartDate = form.DayFreStartDate
      form.Day6FreStartDate = form.DayFreStartDate
      form.Day7FreStartDate = form.DayFreStartDate
      form.Day1Frequency = form.DayFrequency
      form.Day2Frequency = form.DayFrequency
      form.Day3Frequency = form.DayFrequency
      form.Day4Frequency = form.DayFrequency
      form.Day5Frequency = form.DayFrequency
      form.Day6Frequency = form.DayFrequency
      form.Day7Frequency = form.DayFrequency

      form.Day1Value = !form.Day1VisitOrder || form.Day1VisitOrder === '0' ? 0 : 1
      form.Day2Value = !form.Day2VisitOrder || form.Day2VisitOrder === '0' ? 0 : 1
      form.Day3Value = !form.Day3VisitOrder || form.Day3VisitOrder === '0' ? 0 : 1
      form.Day4Value = !form.Day4VisitOrder || form.Day4VisitOrder === '0' ? 0 : 1
      form.Day5Value = !form.Day5VisitOrder || form.Day5VisitOrder === '0' ? 0 : 1
      form.Day6Value = !form.Day6VisitOrder || form.Day6VisitOrder === '0' ? 0 : 1
      form.Day7Value = !form.Day7VisitOrder || form.Day7VisitOrder === '0' ? 0 : 1

      return form
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.TerminalMessageDetails = [...this.customerCriterias, ...this.customerList]
        this.createData()
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
      form: this.insertRules
    }
  }
}
</script>
