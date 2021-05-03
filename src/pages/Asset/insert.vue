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
            <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('get.asset.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="ProducerId" :error="$v.form.ProducerId">
              <NextDropdown @input="selectedType('ProducerId', $event)" lookup-key="ASSET_PRODUCER" />
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId">
               <NextDropdown @input="selectedType('BrandId', $event)" lookup-key="ASSET_BRAND" />
            </NextFormGroup>
            <NextFormGroup item-key="ModelId" :error="$v.form.ModelId">
              <NextDropdown @input="selectedType('ModelId', $event)" lookup-key="ASSET_MODEL" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetTypeId" :error="$v.form.AssetTypeId">
              <NextDropdown @input="selectedType('AssetTypeId', $event)" lookup-key="ASSET_TYPE" />
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown v-model="type" @input="selectedSearchType('TypeId', $event)" url="VisionNextAsset/api/AssetType/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="AssetClassId" :error="$v.form.AssetClassId">
              <NextDropdown v-model="assetClass" @input="selectedSearchType('AssetClassId', $event)" url="VisionNextAsset/api/AssetClass/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="TrackTypeId" :error="$v.form.TrackTypeId">
              <NextDropdown @input="selectedSearchType('TrackTypeId', $event)" url="VisionNextAsset/api/AssetTrackType/Search" />
            </NextFormGroup>
            <NextFormGroup item-key="Barcode" :error="$v.form.Barcode">
              <b-form-input type="text" v-model="form.Barcode" :readonly="insertReadonly.Barcode" />
            </NextFormGroup>
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
        ModelId: null,
        Category3Id: null,
        TrackTypeId: null
      },
      assetClass: {},
      type: {}
    }
  },
  computed: {
  },
  mounted () {
    this.createManualCode()
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
        this.tabValidation()
      } else {
        this.form.ClassId = this.form.AssetClassId
        this.createData()
      }
    }
  }
}
</script>
