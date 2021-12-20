<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="IsHero" :error="$v.form.IsHero">
            <NextCheckBox v-model="form.IsHero" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="SourceCustomerId" :error="$v.form.SourceCustomerId">
              <NextDropdown
                @input="selectedSourceCustomer('SourceCustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"/>
            </NextFormGroup>
            <NextFormGroup item-key="TargetCustomerId" :error="$v.form.TargetCustomerId">
              <NextDropdown
                @input="selectedSearchType('TargetCustomerId', $event)"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :searchable="true" :custom-option="true"
                or-condition-fields="Code,Description1,CommercialTitle"/>
            </NextFormGroup>
            <NextFormGroup item-key="ContractTransferStatusId" :error="$v.form.ContractTransferStatusId">
              <NextDropdown :disabled="true" v-model="transferLabel" lookup-key="CONTRACT_TRANSFER_STATUS" @input="selectedType('ContractTransferStatusId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SourceContractStartDate" :error="$v.form.SourceContractStartDate">
              <NextDatePicker v-model="form.SourceContractStartDate" />
              <!-- <b-form-datepicker v-model="form.SourceContractStartDate" :placeholder="$t('insert.chooseDate')"/> -->
            </NextFormGroup>
            <NextFormGroup item-key="SourceContractEndDate" :error="$v.form.SourceContractEndDate">
              <NextDatePicker v-model="form.SourceContractEndDate" />
              <!-- <b-form-datepicker v-model="form.SourceContractEndDate" :placeholder="$t('insert.chooseDate')"/> -->
            </NextFormGroup>
            <NextFormGroup item-key="TransferReasonId" :error="$v.form.TransferReasonId">
              <NextDropdown lookup-key="TRANSFER_REASON" @input="selectedType('TransferReasonId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SourceContractId" :error="$v.form.SourceContractId">
              <v-select :options="sourceContracts" @input="selectedSourceContract('SourceContractId', $event)" label="Contract"></v-select>
            </NextFormGroup>
          </b-row>
          <b-row v-if="contractDetail">
            <b-col>
              <b-table :items="contractDetail" :fields="fields" striped responsive sticky-header>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        StatusId: null,
        Code: null,
        SourceCustomerId: null,
        ContractTransferStatusId: null,
        Description1: null,
        IsHero: null,
        TargetCustomerId: null,
        SourceContractStartDate: null,
        SourceContractEndDate: null,
        TransferReasonId: null,
        SourceContractId: null,
        RecordState: 1
      },
      transferLabel: null,
      routeName1: 'ContractManagement',
      sourceContracts: [],
      contractDetail: [],
      fields: [
        {key: 'OperationDesc', label: this.$t('get.RefContract.OperationDesc'), sortable: false},
        {key: 'TotalAmount', label: this.$t('get.RefContract.TotalAmount'), sortable: false}
      ]
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    selectedSourceCustomer (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        this.$api.get('ContractManagement', `RefContract/GetResourceContract?customerId=${model.RecordId}`).then((res) => {
          this.sourceContracts = res
        })
      } else {
        this.form[label] = null
        this.form.SourceContractId = null
        this.sourceContracts = []
        this.contractDetail = []
      }
    },
    selectedSourceContract (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        this.$api.get('ContractManagement', `RefContract/GetRefContractDetails?contractId=${model.RecordId}`).then((res) => {
          this.contractDetail = res
        })
      } else {
        this.form[label] = null
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.createData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  },
  watch: {
    lookup (e) {
      if (e) {
        e.CONTRACT_TRANSFER_STATUS.map(item => {
          if (item.DecimalValue === 31792206182) {
            this.form.ContractTransferStatusId = item.DecimalValue
            this.transferLabel = item.Label
          }
        })
      }
    }
  }
}
</script>
