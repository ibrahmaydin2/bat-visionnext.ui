<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'AssetService' }">
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
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.assetService.details')" active>
          <b-row>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1" md="4" lg="4">
              <NextInput type="text" v-model="form.Genexp1" :disabled="insertReadonly.Genexp1"/>
            </NextFormGroup>
            <NextFormGroup item-key="ServiceNumber" :error="$v.form.ServiceNumber" md="4" lg="4">
              <NextInput type="text" v-model="form.ServiceNumber" :disabled="true"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsAssetMovement" :error="$v.form.IsAssetMovement">
              <NextCheckBox v-model="form.IsAssetMovement" type="number" :disabled="insertReadonly.IsAssetMovement" toggle/>
            </NextFormGroup>
            <NextFormGroup item-key="ServiceStateId" :error="$v.form.ServiceStateId" md="4" lg="4">
              <NextDropdown v-model="serviceState" v-on:all-source="setServiceStates" url="VisionNextAsset/api/ServiceState/Search" @input="selectedSearchType('ServiceStateId', $event)" :disabled="insertReadonly.ServiceStateId" />
            </NextFormGroup>
            <b-col cols="12" md="4" lg="4">
              <b-row>
                <NextFormGroup item-key="RequestDate" :error="$v.form.RequestDate" md="6" lg="6">
                  <NextDatePicker v-model="form.RequestDate" :disabled="insertReadonly.RequestDate"/>
                </NextFormGroup>
                <NextFormGroup item-key="RequestTime" :error="$v.form.RequestTime" md="6" lg="6">
                  <NextTimePicker v-model="form.RequestTime" :disabled="insertReadonly.RequestTime" type="textbox"/>
                </NextFormGroup>
              </b-row>
            </b-col>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId" md="4" lg="4">
              <NextDropdown url="VisionNextCustomer/api/Customer/Search" @input="selectCustomer" :disabled="insertReadonly.CustomerId" :searchable="true" />
            </NextFormGroup>
            <b-col cols="12" md="4" lg="4">
              <b-row>
                <NextFormGroup item-key="ResponseDate" :error="$v.form.ResponseDate" md="6" lg="6">
                  <NextDatePicker v-model="form.ResponseDate" :disabled="insertReadonly.ResponseDate"/>
                </NextFormGroup>
                <NextFormGroup item-key="ResponseTime" :error="$v.form.ResponseTime" md="6" lg="6">
                  <NextTimePicker v-model="form.ResponseTime" :disabled="insertReadonly.ResponseTime" type="textbox"/>
                </NextFormGroup>
              </b-row>
            </b-col>
            <NextFormGroup item-key="AssetTypeId" :error="$v.form.AssetTypeId" md="4" lg="4">
              <NextDropdown url="VisionNextAsset/api/AssetType/Search" @input="selectAssetType" :disabled="insertReadonly.AssetTypeId" :get-lookup="true" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetId" :error="$v.form.AssetId" md="4" lg="4">
              <NextDropdown v-model="asset" :source="assets" @input="selectedSearchType('AssetId', $event)" :disabled="!this.form.AssetTypeId" />
            </NextFormGroup>
            <NextFormGroup item-key="ServiceTypeId" :error="$v.form.ServiceTypeId" md="4" lg="4">
              <NextDropdown :Options="serviceTypes" :source="(serviceTypes ? serviceTypes.filter(c => c.Code == 'KRL' || c.Code == 'GRA'): [])" @input="selectedSearchType('ServiceTypeId', $event)" :disabled="insertReadonly.ServiceTypeId" />
            </NextFormGroup>
            <b-col cols="12" md="4" lg="4">
              <b-row>
                <NextFormGroup item-key="EstimatedResponseDate" :error="$v.form.EstimatedResponseDate" md="6" lg="6">
                  <NextDatePicker v-model="form.EstimatedResponseDate" :disabled="insertReadonly.EstimatedResponseDate"/>
                </NextFormGroup>
                <NextFormGroup item-key="EstimatedResponseTime" :error="$v.form.EstimatedResponseTime" md="6" lg="6">
                  <NextTimePicker v-model="form.EstimatedResponseTime" :disabled="insertReadonly.EstimatedResponseTime" type="textbox"/>
                </NextFormGroup>
              </b-row>
            </b-col>
            <b-col cols="12" md="4" lg="4">
              <b-row>
                <NextFormGroup item-key="CompletionDate" :error="$v.form.CompletionDate" md="6" lg="6">
                  <NextDatePicker v-model="form.CompletionDate" :disabled="insertReadonly.CompletionDate"/>
                </NextFormGroup>
                <NextFormGroup item-key="CompletionTime" :error="$v.form.CompletionTime" md="6" lg="6">
                  <NextTimePicker v-model="form.CompletionTime" :disabled="insertReadonly.CompletionTime" type="textbox"/>
                </NextFormGroup>
              </b-row>
            </b-col>
            <NextFormGroup item-key="FromLocationId" :error="$v.form.FromLocationId" md="4" lg="4">
              <NextDropdown
                v-if="mainCustomerId"
                url="VisionNextCustomer/api/CustomerLocation/Search"
                @input="selectedSearchType('FromLocationId', $event)"
                :disabled="insertReadonly.FromLocationId"
                :dynamic-and-condition="{CustomerIds: [mainCustomerId]}" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.assetService.serialNumber')" md="4" lg="4">
              <NextInput type="text" v-model="form.SerialNumber" :disabled="true"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { minLength, required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        ServiceNumber: null,
        ServiceStateId: null,
        RequestDate: null,
        RequestTime: null,
        LocationId: null,
        CustomerId: null,
        EmployeeId: null,
        ResponseDate: null,
        ResponseTime: null,
        AssetTypeId: null,
        AssetId: null,
        ServiceTypeId: null,
        EstimatedResponseDate: null,
        EstimatedResponseTime: null,
        CompletionDate: null,
        Description1: null,
        FromLocationId: null,
        Genexp1: null,
        IsAssetMovement: null,
        SerialNumber: null
      },
      routeName1: 'Asset',
      routeName2: 'Service',
      asset: null,
      assets: [],
      mainCustomerId: null,
      serviceState: null,
      serviceStates: [],
      serviceTypes: []
    }
  },
  mounted () {
    this.createManualCode('ServiceNumber')
    this.getServiceTypes()
    let customerId = localStorage.getItem('CustomerId')
    this.mainCustomerId = customerId ? parseFloat(customerId) : 0
    let currentDate = new Date()
    let currentDateStr = currentDate.toISOString().slice(0, 10)
    let currentTimeStr = currentDate.toTimeString().slice(0, 5)
    this.form.RequestDate = currentDateStr
    this.form.RequestTime = currentTimeStr
    this.form.ResponseDate = currentDateStr
    this.form.ResponseTime = currentTimeStr
    this.form.EstimatedResponseDate = currentDateStr
    this.form.EstimatedResponseTime = currentTimeStr
    this.form.CompletionDate = currentDateStr
    this.form.CompletionTime = currentTimeStr
  },
  methods: {
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
    },
    getServiceTypes (request) {
      this.$api.postByUrl(request, 'VisionNextAsset/api/ServiceType/Search').then((response) => {
        if (response && response.ListModel) {
          this.serviceTypes = response.ListModel.BaseModels
        }
      })
    },
    selectAssetType (value) {
      this.form.AssetId = null
      this.asset = null
      this.assets = []

      if (value) {
        this.form.AssetTypeId = value.RecordId

        let request = {
          andConditionModel: {
            TypeIds: [this.form.AssetTypeId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextAsset/api/Asset/Search').then((response) => {
          if (response && response.ListModel) {
            this.assets = response.ListModel.BaseModels
          }
        })
      } else {
        this.form.AssetTypeId = null
      }
    },
    setServiceStates (values) {
      this.serviceStates = values
      if (values && !this.serviceState) {
        let filteredArr = values.filter(i => i.RecordId === 5)
        this.serviceState = filteredArr.length > 0 ? filteredArr[0] : null
        this.selectedSearchType('ServiceStateId', this.serviceState)
      }
    },
    selectCustomer (value) {
      if (value) {
        this.form.CustomerId = value.RecordId
        this.form.LocationId = value.DefaultLocationId
      } else {
        this.form.CustomerId = null
        this.form.LocationId = null
      }
    }
  },
  validations () {
    this.insertRules.RequestTime = {
      required,
      minLength: minLength(5)
    }
    return {
      form: this.insertRules
    }
  }
}
</script>
