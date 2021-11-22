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
        <b-row>
          <b-col cols="12">
            <b-row>
              <NextFormGroup item-key="CardNumber" :error="$v.form.CardNumber">
                <NextInput v-model="form.CardNumber" maxLength="16" :oninput="maxLengthControl" type="number" :disabled="insertReadonly.CardNumber" />
              </NextFormGroup>
              <NextFormGroup item-key="MovementTypeId" :error="$v.form.MovementTypeId">
                <NextDropdown v-model="assetMovementType" url="VisionNextAsset/api/AssetMovementType/Search" @input="selectedSearchType('MovementTypeId', $event)"/>
              </NextFormGroup>
              <NextFormGroup item-key="OperationDate" :error="$v.form.OperationDate">
                <NextDatePicker v-model="form.OperationDate" :disabled="insertReadonly.OperationDate" />
              </NextFormGroup>
              <NextFormGroup item-key="Description1" :error="$v.form.Description1">
                <NextInput v-model="form.Description1" :disabled="insertReadonly.Description1" />
              </NextFormGroup>
            </b-row>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.assetMovementCard.assetMovementCard')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="FromLocationId" :error="$v.form.FromLocationId">
              <NextDropdown
                v-model="fromLocation"
                :disabled="assetMovementType && assetMovementType.Code === 'ADF'"
                @input="selectedSearchType('FromLocationId', $event)"
                url="VisionNextCustomer/api/CustomerLocation/CustomSearch" searchable
                :dynamic-and-condition="assetMovementType && assetMovementType.Code === 'ASR' ? {System: 1} : {}"
                :dynamic-or-conditions="assetMovementType && (assetMovementType.Code === 'STS' || assetMovementType.Code === 'ADF' || assetMovementType.Code === 'TRA') ? [{System:1, IsVehicleLocation: 1}] : []"
                :is-custom-slot="true"
                :custom-option="true"
                or-condition-fields="Description1,CustomerDesc,CustomerCode,CustomerCommercialTitle">
                <template v-slot:option="{option}">
                   <table class="bordered-table">
                     <tr>
                        <td class="min-width-80">{{option.Description1}}</td>
                        <td class="min-width-80">{{option.CustomerDesc}}</td>
                        <td class="min-width-80">{{option.CustomerCode}}</td>
                        <td class="min-width-80">{{option.StatusId === 2 ? $t('insert.passive'): $t('insert.active')}}</td>
                        <td class="min-width-80">{{option.CustomerCommercialTitle}}</td>
                     </tr>
                   </table>
                  </template>
              </NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="FromStateId" :error="$v.form.FromStateId">
              <NextDropdown :disabled="assetMovementType && (assetMovementType.Code === 'ADF' || assetMovementType.Code === 'ASR')" v-model="fromState" url="VisionNextAsset/api/AssetState/Search" @input="selectedSearchType('FromStateId', $event)" v-on:all-source="setAllAssetState"/>
            </NextFormGroup>
            <NextFormGroup item-key="ToLocationId" :error="$v.form.ToLocationId">
              <NextDropdown
                v-model="toLocation"
                :disabled="assetMovementType && (assetMovementType.Code === 'STS' || assetMovementType.Code === 'ASR')"
                @input="selectedSearchType('ToLocationId', $event)"
                url="VisionNextCustomer/api/CustomerLocation/CustomSearch" searchable
                :is-custom-slot="true"
                :custom-option="true"
                :dynamic-and-condition="assetMovementType && assetMovementType.Code === 'ADF' ? {StatusIds: [1]} : {}"
                :dynamic-or-conditions="assetMovementType && (assetMovementType.Code === 'STS' || assetMovementType.Code === 'ADF' || assetMovementType.Code === 'TRA') ? [{System:1, IsVehicleLocation: 1}] : []"
                or-condition-fields="Description1,CustomerDesc,CustomerCode,CustomerCommercialTitle">>
                  <template v-slot:option="{option}">
                   <table class="bordered-table">
                      <tr>
                        <td class="min-width-80">{{option.Description1}}</td>
                        <td class="min-width-80">{{option.CustomerDesc}}</td>
                        <td class="min-width-80">{{option.CustomerCode}}</td>
                        <td class="min-width-80">{{option.StatusId === 2 ? $t('insert.passive'): $t('insert.active')}}</td>
                        <td class="min-width-80">{{option.CustomerCommercialTitle}}</td>
                     </tr>
                   </table>
                  </template>
              </NextDropdown>
            </NextFormGroup>
            <NextFormGroup item-key="ToStateId" :error="$v.form.ToStateId">
              <NextDropdown :disabled="assetMovementType && (assetMovementType.Code === 'ASR' || assetMovementType.Code === 'ADF')" v-model="toState" url="VisionNextAsset/api/AssetState/AutoCompleteSearch" @input="selectedSearchType('ToStateId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId" >
              <NextDropdown v-model="employee" :disabled="insertReadonly.EmployeeId" orConditionFields="Code,Description1,Name,Surname" @input="selectedSearchType('EmployeeId', $event)" url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable />
            </NextFormGroup>
            <NextFormGroup item-key="IsAssetMovement" :error="$v.form.IsAssetMovement">
              <NextCheckBox v-model="form.IsAssetMovement" type="number" toggle/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('get.assetMovementCard.assets')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup :title="$t('get.assetMovementCard.asset')" :error="$v.assetMovementCardDetail.asset" :required="true" md="3" lg="3">
              <NextDropdown v-model="assetMovementCardDetail.asset" url="VisionNextAsset/api/Asset/Search" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.serialNumber')" :error="$v.assetMovementCardDetail.serialNumber" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber" type="text" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.quantity')" :error="$v.assetMovementCardDetail.quantity" :required="true" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.quantity" type="number" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.condition')" :error="$v.assetMovementCardDetail.condition" :required="true" md="3" lg="3">
              <NextDropdown v-model="assetMovementCardDetail.condition" lookup-key="ASSET_CONDITION" :get-lookup="true" :disabled="true" v-on:all-source="setAssetConditions"/>
            </NextFormGroup>
             <NextFormGroup :title="$t('get.assetMovementCard.serialNumber2')" :error="$v.assetMovementCardDetail.serialNumber2" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber2" type="text" />
            </NextFormGroup>
            <NextFormGroup :title="$t('get.assetMovementCard.serialNumber3')" :error="$v.assetMovementCardDetail.serialNumber3" md="3" lg="3">
              <NextInput v-model="assetMovementCardDetail.serialNumber3" type="text" />
            </NextFormGroup>
            <b-col cols="12" md="2">
              <b-form-group>
                <AddDetailButton @click.native="addAssetMovementCardDetails" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
                <NextMultipleSelection
                  name="AssetMovementCardMultipleAsset"
                  v-model="form.AssetMovementCardDetails"
                  :hidden-values="hiddenValues"
                  :dynamic-and-condition="multipleDynamicAndCondition"
                  :disabled-button="disabledMultipleSelection"
                  :validations="assetMovementType && assetMovementType.Code === 'ADF' ? [] : multipleValidations"
                />
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
                <b-tr v-for="(a, i) in form.AssetMovementCardDetails" :key="i">
                  <b-td>{{a.AssetName}}</b-td>
                  <b-td>{{a.AssetCode}}</b-td>
                  <b-td>{{a.SerialNumber}}</b-td>
                  <b-td>{{a.Quantity}}</b-td>
                  <b-td>{{a.ConditionName}}</b-td>
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
import insertMixin from '../../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        CardNumber: null,
        MovementTypeId: null,
        EmployeeId: null,
        ToStateId: null,
        FromStateId: null,
        OperationDate: new Date().toISOString(),
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
      },
      hiddenValues: [
        {
          mainProperty: 'Description1',
          targetProperty: 'AssetName'
        },
        {
          mainProperty: 'Code',
          targetProperty: 'AssetCode'
        },
        {
          mainProperty: 'Barcode',
          targetProperty: 'SerialNumber'
        }
      ],
      multipleValidations: [
        {
          mainProperty: 'Quantity',
          validation: (value, data) => {
            return value <= data.FromLocationQuantity
          }
        }
      ],
      assetStates: [],
      defaultAssetCondition: null
    }
  },
  mounted () {
    this.createManualCode('CardNumber')
    this.getUserInfo()
  },
  computed: {
    disabledMultipleSelection () {
      if (this.assetMovementType) {
        switch (this.assetMovementType.Code) {
          case 'STS':
            return !this.form.FromLocationId || !this.form.FromStateId || !this.form.ToStateId
          case 'ASR':
            return !this.form.FromLocationId || !this.form.FromStateId
          case 'TRA':
            return !this.form.FromLocationId || !this.form.FromStateId || !this.form.ToStateId
          case 'ADF':
            return !this.form.ToLocationId || !this.form.ToStateId
        }
      }

      return true
    },
    multipleDynamicAndCondition () {
      if (this.assetMovementType) {
        if (this.assetMovementType.Code === 'ADF') {
          return {
            StateIds: [this.form.ToStateId],
            LocationIds: [this.form.ToLocationId],
            MovementTypeIds: [this.form.MovementTypeId]
          }
        } else {
          return {
            StateIds: [this.form.FromStateId],
            LocationIds: [this.form.FromLocationId],
            MovementTypeIds: [this.form.MovementTypeId]
          }
        }
      }

      return {}
    }
  },
  methods: {
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
      this.assetMovementCardDetail = {
        condition: this.defaultAssetCondition
      }
      this.$v.assetMovementCardDetail.$reset()
    },
    removeAssetMovementCardDetails (item) {
      this.form.AssetMovementCardDetails.splice(this.form.AssetMovementCardDetails.indexOf(item), 1)
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
        this.form.ToCustomerId = this.toLocation ? this.toLocation.CustomerId : undefined
        this.form.FromCustomerId = this.fromLocation ? this.fromLocation.CustomerId : undefined
        this.createData()
      }
    },
    getUserInfo () {
      let userModel = JSON.parse(localStorage.getItem('UserModel'))
      if (userModel) {
        let request = {
          andConditionModel: {
            RecordIds: [userModel.UserId]
          }
        }
        this.$api.postByUrl(request, 'VisionNextSystem/api/SysUser/Search').then(response => {
          if (response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0) {
            let user = response.ListModel.BaseModels[0]
            this.employee = {
              RecordId: user.EmployeeId,
              Description1: `${userModel.Name} ${userModel.Surname}`
            }
            this.form.EmployeeId = user.EmployeeId
          }
        })
      }
    },
    setAllAssetState (value) {
      this.assetStates = value
    },
    setAssetConditions (value) {
      this.defaultAssetCondition = value && value.length > 0 ? value.find(a => a.Code === 'AKT') : null
      this.assetMovementCardDetail.condition = this.defaultAssetCondition
    }
  },
  watch: {
    assetMovementType (value) {
      this.form.FromStateId = null
      this.form.FromLocationId = null
      this.form.ToStateId = null
      this.form.ToLocationId = null

      this.fromState = null
      this.fromLocation = null
      this.toState = null
      this.toLocation = null

      if (value) {
        let faulty = this.assetStates.find(a => a.Code === 'ARZ')
        let success = this.assetStates.find(a => a.Code === 'SAG')
        switch (value.Code) {
          case 'STS':
            this.fromState = success
            this.form.FromStateId = success.RecordId
            this.toState = faulty
            this.form.ToStateId = faulty.RecordId
            break
          case 'TRA':
            this.fromState = success
            this.form.FromStateId = success.RecordId
            this.toState = success
            this.form.ToStateId = success.RecordId
            break
          case 'ADF':
            this.toState = success
            this.form.ToStateId = success.RecordId
            break
          case 'ASR':
            this.fromState = success
            this.form.FromStateId = success.RecordId
            break
        }
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
        quantity: {
          required
        },
        condition: {
          required
        }
      }
    }
  }
}
</script>
<style>
.bordered-table tr td {
  border: 1px gray solid;
}
.bordered-table {
  width: 100%
}
.min-width-80 {
  width: 80px
}
</style>
