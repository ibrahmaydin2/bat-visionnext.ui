<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'AssetMovementCard' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.assetMovementCard.assetMovementCard')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="CardNumber" :error="$v.form.CardNumber">
              <NextInput v-model="form.CardNumber" maxLength="16" :oninput="maxLengthControl" type="number" :disabled="insertReadonly.CardNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="MovementTypeId" :error="$v.form.MovementTypeId">
              <NextDropdown v-model="assetMovementType" url="VisionNextAsset/api/AssetMovementType/Search" @input="selectedSearchType('MovementTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId">
              <NextDropdown v-model="employee" orConditionFields="Code,Description1,Name,Surname" url="VisionNextEmployee/api/Employee/Search" @input="selectedSearchType('EmployeeId', $event)" searhable/>
            </NextFormGroup>
            <NextFormGroup item-key="OperationDate" :error="$v.form.OperationDate">
              <NextDatePicker v-model="form.OperationDate" :disabled="insertReadonly.OperationDate" />
            </NextFormGroup>
             <NextFormGroup item-key="ToLocationId" :error="$v.form.ToLocationId">
              <NextDropdown :disabled="this.assetMovementType && (this.assetMovementType.Code === 'STS' || this.assetMovementType.Code === 'ASR')" v-model="toLocation" :source="assetLocations" @input="selectedSearchType('ToLocationId', $event)" searhable/>
            </NextFormGroup>
            <NextFormGroup item-key="ToStateId" :error="$v.form.ToStateId">
              <NextDropdown :disabled="this.assetMovementType && this.assetMovementType.Code === 'ASR'" v-model="toState" url="VisionNextAsset/api/AssetState/Search" @input="selectedSearchType('ToStateId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FromLocationId" :error="$v.form.FromLocationId">
              <NextDropdown :disabled="this.assetMovementType && this.assetMovementType.Code === 'ADF'" v-model="fromLocation" :source="assetLocations" @input="selectedSearchType('FromLocationId', $event)" searhable/>
            </NextFormGroup>
            <NextFormGroup item-key="FromStateId" :error="$v.form.FromStateId">
              <NextDropdown :disabled="this.assetMovementType && this.assetMovementType.Code === 'ADF'" v-model="fromState" url="VisionNextAsset/api/AssetState/Search" @input="selectedSearchType('FromStateId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.assetMovementCard.assets')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('get.assetMovementCard.asset')" :error="$v.assetMovementCardDetail.asset" :required="true" md="3" lg="3">
              <NextDropdown v-model="assetMovementCardDetail.asset" url="VisionNextAsset/api/Asset/Search" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.serialNumber')" :error="$v.assetMovementCardDetail.serialNumber" :required="true" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber" type="text" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.quantity')" :error="$v.assetMovementCardDetail.quantity" :required="true" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.quantity" type="number" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.condition')" :error="$v.assetMovementCardDetail.condition" :required="true" md="3" lg="3">
              <NextDropdown v-model="assetMovementCardDetail.condition" lookup-key="ASSET_CONDITION" :get-lookup="true"/>
            </NextFormGroup>
             <NextFormGroup :title="$t('get.assetMovementCard.serialNumber2')" :error="$v.assetMovementCardDetail.serialNumber2" :required="true" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber2" type="text" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.serialNumber3')" :error="$v.assetMovementCardDetail.serialNumber3" :required="true" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber3" type="text" />
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addAssetMovementCardDetails" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('get.assetMovementCard.assetName')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.assetCode')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.serialNumber')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.quantity')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.condition')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.serialNumber2')}}</span></b-th>
                <b-th><span>{{$t('get.assetMovementCard.serialNumber3')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(a, i) in (form.AssetMovementCardDetails ? form.AssetMovementCardDetails.filter(m => m.RecordState !== 4) : [])" :key="i">
                  <b-td>{{a.Asset ? a.Asset.Label : a.AssetName}}</b-td>
                  <b-td>{{a.Asset ? a.Asset.Code : a.AssetCode}}</b-td>
                  <b-td>{{a.SerialNumber}}</b-td>
                  <b-td>{{a.Quantity}}</b-td>
                  <b-td>{{a.Condition ? a.Condition.Label : a.ConditionName}}</b-td>
                  <b-td>{{a.SerialNumber2}}</b-td>
                  <b-td>{{a.SerialNumber3}}</b-td>
                  <b-td class="text-center"><i @click="removeAssetMovementCardDetails(a)" class="far fa-trash-alt text-danger"></i></b-td>
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
import updatetMixin from '../../../mixins/update'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [updatetMixin],
  data () {
    return {
      form: {
        CardNumber: null,
        MovementTypeId: null,
        EmployeeId: null,
        ToStateId: null,
        FromStateId: null,
        OperationDate: null,
        ToLocationId: null,
        FromLocationId: null,
        AssetMovementCardDetails: []
      },
      routeName1: 'Asset',
      assetLocations: [],
      assetMovementType: null,
      employee: null,
      toState: null,
      fromState: null,
      toLocation: null,
      fromLocation: null,
      assetMovementCardDetail: {
        asset: null,
        serialNumber: null,
        quantity: null,
        condition: null,
        serialNumber2: null,
        serialNumber3: null
      }
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
      this.assetMovementType = this.convertLookupValueToSearchValue(rowData.MovementType)
      this.employee = this.convertLookupValueToSearchValue(rowData.Employee)
      this.toState = this.convertLookupValueToSearchValue(rowData.ToState)
      this.fromState = this.convertLookupValueToSearchValue(rowData.FromState)
      this.toLocation = this.convertLookupValueToSearchValue(rowData.ToLocation)
      this.fromLocation = this.convertLookupValueToSearchValue(rowData.FromLocation)
    },
    addAssetMovementCardDetails () {
      this.$v.assetMovementCardDetail.$touch()
      if (this.$v.assetMovementCardDetail.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), { type: 'error', keepOnHover: true, duration: '3000' })
        return false
      }
      this.form.AssetMovementCardDetails.push({
        Deleted: 0,
        System: 0,
        RecordId: undefined,
        RecordState: 2,
        AssetId: this.assetMovementCardDetail.asset.RecordId,
        AssetName: this.assetMovementCardDetail.asset.Description1,
        AssetCode: this.assetMovementCardDetail.asset.Code,
        SerialNumber: this.assetMovementCardDetail.serialNumber,
        Quantity: this.assetMovementCardDetail.quantity,
        ConditionId: this.assetMovementCardDetail.condition.DecimalValue,
        ConditionName: this.assetMovementCardDetail.condition.Label,
        SerialNumber2: this.assetMovementCardDetail.serialNumber2,
        SerialNumber3: this.assetMovementCardDetail.serialNumber3
      })
      this.assetMovementCardDetail = {}
      this.$v.assetMovementCardDetail.$reset()
    },
    removeAssetMovementCardDetails (item) {
      if (item.RecordId > 0) {
        this.form.AssetMovementCardDetails[this.form.AssetMovementCardDetails.indexOf(item)].RecordState = 4
      } else {
        this.form.AssetMovementCardDetails.splice(this.form.AssetMovementCardDetails.indexOf(item), 1)
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
        this.tabValidation()
      } else {
        this.form.ToCustomerId = this.toLocation && this.toLocation.CustomerId ? this.toLocation.CustomerId : this.form.ToCustomerId
        this.form.FromCustomerId = this.fromLocation && this.fromLocation.CustomerId ? this.fromLocation.CustomerId : this.form.FromCustomerId
        this.updateData()
      }
    }
  },
  validations () {
    this.insertRequired.FromLocationId = true
    this.insertRequired.FromStateId = true
    this.insertRequired.ToLocationId = true
    this.insertRequired.ToStateId = true

    this.insertRules.ToLocationId = {
      required
    }
    this.insertRules.ToStateId = {
      required
    }
    this.insertRules.FromLocationId = {
      required
    }
    this.insertRules.FromStateId = {
      required
    }

    if (this.assetMovementType) {
      switch (this.assetMovementType.Code) {
        case 'STS':
          this.insertRules.ToLocationId = {}

          this.insertRequired.ToLocationId = false
          break
        case 'ASR':
          this.insertRules.ToLocationId = {}
          this.insertRules.ToStateId = {}

          this.insertRequired.ToLocationId = false
          this.insertRequired.ToStateId = false
          break
        case 'ADF':
          this.insertRules.FromLocationId = {}
          this.insertRules.FromStateId = {}

          this.insertRequired.FromLocationId = false
          this.insertRequired.FromStateId = false
          break
      }
    }
    return {
      form: this.insertRules,
      assetMovementCardDetail: {
        asset: {
          required
        },
        serialNumber: {
          required
        },
        quantity: {
          required
        },
        condition: {
          required
        },
        serialNumber2: {
          required
        },
        serialNumber3: {
          required
        }
      }
    }
  }
}
</script>
