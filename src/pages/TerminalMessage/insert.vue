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
          <NextDetailPanel v-model="form.TerminalMessageBranchs" :items="messageBranchItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerCriterias')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MK'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="customerCriterias" :items="customerCriteriaItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerList')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'ML'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="customerList" :items="customerListItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.customerQuery')" v-if="selectedCustomerCriteria && selectedCustomerCriteria.Code === 'MS'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageCustSqls" :items="custSqlItems"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.terminalMessage.routes')" v-if="selectedMessageType && selectedMessageType.Code === 'RM'" @click.prevent="tabValidation()">
          <NextDetailPanel v-model="form.TerminalMessageRoutes" :items="routeItems"></NextDetailPanel>
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
      selectedCustomerCriteria: null
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
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
