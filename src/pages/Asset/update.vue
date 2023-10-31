<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Asset' }">
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
            <NextInput type="text" v-model="form.Code" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.asset.general')" active>
          <b-row>
            <NextFormGroup item-key="ProducerId" :error="$v.form.ProducerId">
              <NextDropdown v-model="producer" @input="selectedType('ProducerId', $event)" lookup-key="ASSET_PRODUCER" />
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId">
              <NextDropdown v-model="brand" @input="getModels($event)" lookup-key="ASSET_BRAND" />
            </NextFormGroup>
            <NextFormGroup item-key="ModelId" :error="$v.form.ModelId">
              <NextDropdown v-model="model" :source="models" @input="selectedType('ModelId', $event)" label="Label" :disabled="insertReadonly.ModelId || !form.BrandId" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetTypeId" :error="$v.form.AssetTypeId">
              <NextDropdown v-model="assetType" @input="selectedType('AssetTypeId', $event)" lookup-key="ASSET_TYPE" />
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown v-model="type" @input="selectAssetType($event)" url="VisionNextAsset/api/AssetType/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetClassId" :error="$v.form.AssetClassId">
              <NextDropdown v-model="assetClass" @input="selectedSearchType('AssetClassId', $event)" url="VisionNextAsset/api/AssetClass/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="TrackTypeId" :error="$v.form.TrackTypeId">
              <NextDropdown v-model="trackType" @input="selectedSearchType('TrackTypeId', $event)" url="VisionNextAsset/api/AssetTrackType/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="Barcode" :error="$v.form.Barcode">
              <NextInput type="text" v-model="form.Barcode" :disabled="insertReadonly.Barcode" />
            </NextFormGroup>
            <NextFormGroup title="Mobilya Masrafı" :error="$v.form.FurnitureExpense">
              <NextInput type="number" v-model="form.FurnitureExpense" :disabled="insertReadonly.FurnitureExpense" />
            </NextFormGroup>
            <NextFormGroup title="Önyüz Sayısı" :error="$v.form.ShelfQuantity">
              <NextInput type="number" v-model="form.ShelfQuantity" :disabled="insertReadonly.ShelfQuantity" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab  :title="$t('get.asset.properties')" v-if="assetPropertyValues && assetPropertyValues.length > 0">
          <b-row>
            <b-col cols="12">
              <b-table
              responsive
              autoWidth
              bordered
              small
              :items="assetPropertyValues"
              :fields="assetPropertyValueFields">
                <template #head()="data">
                  {{$t(data.label)}}
                </template>
                <template #cell(Description1)="{item}">
                  {{item.Property ? item.Property.Label : item.Description1}}
                </template>
                <template #cell(Value)="data">
                  <b-form-input type="text" v-model="data.item.Value"/>
                </template>
              </b-table>
            </b-col>
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
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        AssetTypeId: null,
        TypeId: null,
        GroupId: null,
        ProducerId: null,
        Description1: null,
        Code: null,
        BrandId: null,
        AssetClassId: null,
        Barcode: null,
        FurnitureExpense: null,
        ShelfQuantity: null,
        ModelId: null,
        Category3Id: null,
        TrackTypeId: null,
        AssetPropertyValues: []
      },
      assetClass: {},
      assetType: {},
      trackType: {},
      producer: {},
      brand: {},
      model: {},
      type: {},
      models: [],
      assetTypeProperties: [],
      assetPropertyValues: [],
      assetPropertyValueFields: [
        {
          key: 'Description1',
          label: 'get.asset.propertyName'
        },
        {
          key: 'Value',
          label: 'get.asset.propertyValue'
        }
      ]
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.form.AssetClassId = this.form.AssetClass ? this.form.AssetClass.DecimalValue : null
      this.form.ClassId = this.form.AssetClassId
      this.assetClass = this.convertLookupValueToSearchValue(rowData.AssetClass)
      this.type = this.convertLookupValueToSearchValue(rowData.Type)
      this.trackType = this.convertLookupValueToSearchValue(rowData.TrackType)
      this.producer = rowData.Producer
      this.brand = rowData.Brand
      this.model = rowData.Model
      this.assetType = rowData.AssetType
      this.getModels(this.brand, false)
      this.getAssetProperties()
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
        if (this.form.AssetClassId) {
          this.form.ClassId = this.form.AssetClassId
        }
        this.form.AssetPropertyValues = this.assetPropertyValues.filter(a => a.Value !== null && a.Value !== '')
        this.updateData()
      }
    },
    getModels (brand, removeModel = true) {
      if (removeModel) {
        this.model = null
      }
      this.models = []
      if (brand) {
        this.form.BrandId = brand.DecimalValue
        let request = {
          LookupTableCode: 'ASSET_MODEL',
          UpperValue: brand.DecimalValue
        }
        this.$api.postByUrl(request, 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue').then((response) => {
          if (response) {
            this.models = response.Values
          }
        })
      } else {
        this.form.BrandId = null
      }
    },
    selectAssetType (assetType) {
      this.assetTypeProperties = []
      if (assetType) {
        this.form.TypeId = assetType.RecordId
        this.getAssetProperties()
      } else {
        this.form.TypeId = null
      }
    },
    getAssetProperties () {
      let request = {
        RecordId: this.form.TypeId
      }
      this.$api.postByUrl(request, 'VisionNextAsset/api/AssetType/Get').then((response) => {
        if (response && response.Model) {
          this.assetTypeProperties = response.Model.AssetTypeProperties
          this.setAssetPropertyValues()
        }
      })
    },
    setAssetPropertyValues () {
      this.assetPropertyValues = []
      if (this.assetTypeProperties && this.assetTypeProperties.length > 0) {
        this.assetTypeProperties.map(ap => {
          let filteredList = this.form.AssetPropertyValues.filter(a => a.PropertyId === ap.PropertyId)
          if (filteredList && filteredList.length > 0) {
            let property = filteredList[0]
            property.RecordState = 3
            this.assetPropertyValues.push(property)
          } else {
            this.assetPropertyValues.push({
              Code: ap.Code,
              Description1: ap.Description1,
              RecordState: 2,
              StatusId: 1,
              Deleted: 0,
              System: 0,
              PropertyId: ap.PropertyId,
              Property: ap.Property,
              AssetId: this.form.RecordId,
              Value: null
            })
          }
        })
      }
    }
  }
}
</script>
