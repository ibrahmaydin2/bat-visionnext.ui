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
              <v-select
                :options='lookup.ASSET_PRODUCER '
                @input="selectedType('ProducerId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId">
              <v-select
                :options="lookup.ASSET_BRAND"
                @input="selectedType('BrandId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <!-- <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <v-select />
            </NextFormGroup> -->
            <NextFormGroup item-key="ModelId" :error="$v.form.ModelId">
              <v-select
                :options="lookup.ASSET_MODEL"
                @input="selectedType('ModelId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="AssetTypeId" :error="$v.form.AssetTypeId">
              <v-select
                :options="lookup.ASSET_TYPE"
                @input="selectedType('AssetTypeId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <v-select v-model="type" :options="types" @input="selectedSearchType('TypeId', $event)" label="Description1"/>
            </NextFormGroup>
            <NextFormGroup item-key="AssetClassId" :error="$v.form.AssetClassId">
              <v-select v-model="assetClass" :options="assetClasses" @input="selectedSearchType('AssetClassId', $event)" label="Description1"/>
            </NextFormGroup>
            <NextFormGroup item-key="TrackTypeId" :error="$v.form.TrackTypeId">
              <v-select :options="trackTypes" @input="selectedSearchType('TrackTypeId', $event)" label="Description1"/>
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
import { mapState } from 'vuex'
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
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['assetClasses', 'types', 'trackTypes'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextAsset/api/AssetClass/Search', name: 'assetClasses'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextAsset/api/AssetType/Search', name: 'types'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextAsset/api/AssetTrackType/Search', name: 'trackTypes'})
      // Sayfa açılışında yüklenmesi gereken search items için kullanılır.
      // lookup harici dataya ihtiyaç yoksa silinebilir
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
        this.form.ClassId = this.form.AssetClassId
        this.createData()
        // update işlemiyse
        // this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules
    }
  }
}
</script>
