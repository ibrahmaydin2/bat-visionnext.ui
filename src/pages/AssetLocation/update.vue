<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'AssetLocation' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.assetLocation.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="LocationId" :error="$v.form.LocationId">
              <NextDropdown v-model="location" :source="assetLocations" @input="selectedSearchType('LocationId', $event)" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="LastMovementDate" :error="$v.form.LastMovementDate">
              <NextDatePicker v-model="form.LastMovementDate" :disabled="insertReadonly.LastMovementDate" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetId" :error="$v.form.AssetId">
              <NextDropdown v-model="asset" url="VisionNextAsset/api/Asset/Search" @input="selectedSearchType('AssetId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="LastOperationDate" :error="$v.form.LastOperationDate">
              <NextDatePicker v-model="form.LastOperationDate" :disabled="insertReadonly.LastOperationDate" />
            </NextFormGroup>
            <NextFormGroup item-key="ConditionId" :error="$v.form.ConditionId">
              <NextDropdown v-model="condition" lookup-key="ASSET_CONDITION" @input="selectedType('ConditionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="StateId" :error="$v.form.StateId">
              <NextDropdown v-model="state"  url="VisionNextAsset/api/AssetState/Search" @input="selectedSearchType('StateId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber">
              <NextInput v-model="form.SerialNumber" type="text" :disabled="insertReadonly.SerialNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="ContactId" :error="$v.form.ContactId">
              <NextDropdown v-model="contact" url="" @input="selectedSearchType('ContactId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="AssetPositionId" :error="$v.form.AssetPositionId">
              <NextDropdown v-model="assetPosition" lookup-key="ASSET_POSITION" @input="selectedType('AssetPositionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity">
              <NextInput v-model="form.Quantity" type="text" :disabled="insertReadonly.Quantity" />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber2" :error="$v.form.SerialNumber2">
              <NextInput v-model="form.SerialNumber2" type="text" :disabled="insertReadonly.SerialNumber2" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        TypeId: null,
        BranchId: null,
        LastMovementDate: null,
        AssetId: null,
        LocationId: null,
        BrandId: null,
        ModelId: null,
        LastOperationDate: null,
        ConditionId: null,
        StateId: null,
        SerialNumber: null,
        ContactId: null,
        AssetPositionId: null,
        Quantity: null,
        SerialNumber2: null
      },
      routeName1: 'Asset',
      asset: null,
      location: null,
      state: null,
      contact: null,
      condition: null,
      assetPosition: null,
      assetLocations: []
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
    this.initPage()
  },
  methods: {
    initPage () {
      this.$api.postByUrl({}, 'VisionNextCustomer/api/CustomerLocation/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
          this.assetLocations = response.ListModel.BaseModels
        }
      })
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.asset = this.convertLookupValueToSearchValue(rowData.Asset)
      this.location = this.convertLookupValueToSearchValue(rowData.Location)
      this.state = this.convertLookupValueToSearchValue(rowData.State)
      this.contact = this.convertLookupValueToSearchValue(rowData.Contact)
      this.condition = rowData.Condition
      this.assetPosition = rowData.AssetPosition
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.updateData()
      }
    }
  },
  watch: {
    location: function (e) {
      if (e) {
        this.$api.post({CustomerId: e.CustomerId}, 'Customer', 'CustomerContact/Get').then((res) => {
          if (res && res.Model) {
          }
        })
      } else {
        this.contacts = []
      }
    }
  }
}
</script>
