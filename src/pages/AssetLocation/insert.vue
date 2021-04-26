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
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.assetLocation.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="BranchId" :error="$v.form.BranchId">
              <NextDropdown url="VisionNextBranch/api/Branch/Search" @input="selectedSearchType('BranchId', $event)" searchable/>
            </NextFormGroup>
            <NextFormGroup item-key="LastMovementDate" :error="$v.form.LastMovementDate">
              <b-form-datepicker v-model="form.LastMovementDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="AssetId" :error="$v.form.AssetId">
              <NextDropdown url="VisionNextAsset/api/Asset/Search" @input="selectedSearchType('AssetId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="LocationId" :error="$v.form.LocationId">
              <NextDropdown v-model="location" :source="assetLocations" @input="selectedSearchType('LocationId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="LastOperationDate" :error="$v.form.LastOperationDate">
              <b-form-datepicker v-model="form.LastOperationDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="ConditionId" :error="$v.form.ConditionId">
              <NextDropdown lookup-key="ASSET_CONDITION" @input="selectedType('ConditionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="StateId" :error="$v.form.StateId">
              <NextDropdown url="VisionNextAsset/api/AssetState/Search" @input="selectedSearchType('StateId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber">
              <b-form-input type="text" v-model="form.SerialNumber" :readonly="insertReadonly.SerialNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="ContactId" :error="$v.form.ContactId">
              <NextDropdown :source="contacts" @input="selectedSearchType('ContactId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="AssetPositionId" :error="$v.form.AssetPositionId">
              <NextDropdown lookup-key="ASSET_POSITION" @input="selectedType('AssetPositionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity">
              <b-form-input type="text" v-model="form.Quantity" :readonly="insertReadonly.Quantity" />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber2" :error="$v.form.SerialNumber2">
              <b-form-input type="text" v-model="form.SerialNumber2" :readonly="insertReadonly.SerialNumber2" />
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        BranchId: null,
        LastMovementDate: null,
        AssetId: null,
        LocationId: null,
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
      location: {},
      assetLocations: [],
      contacts: []
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    // this.createManualCode()
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$api.postByUrl({}, 'VisionNextCustomer/api/CustomerLocation/Search').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
          this.assetLocations = response.ListModel.BaseModels
        }
      })
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
    location: function (e) {
      if (e) {
        this.$api.post({CustomerId: e.CustomerId}, 'Customer', 'CustomerContact/Get').then((res) => {
          console.log(res)
          if (res && res.Model) {
            console.log(res.Model)
          }
        })
      } else {
        this.contacts = []
      }
    }
  }
}
</script>
