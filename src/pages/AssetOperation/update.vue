<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'AssetOperation' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head" :active="!developmentMode">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="ServiceDuration" :error="$v.form.ServiceDuration">
            <NextInput type="text" v-model="form.ServiceDuration" :disabled="insertReadonly.ServiceDuration"/>
          </NextFormGroup>
          <NextFormGroup item-key="IsAssetUsed" :error="$v.form.IsAssetUsed">
            <NextCheckBox v-model="form.IsAssetUsed" type="number" :disabled="insertReadonly.IsAssetUsed" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.AssetOperation.AssetUsage')" v-if="form.IsAssetUsed === 1" >
          <NextDetailPanel v-model="form.AssetOperationDetails" :items="assetOperationDetailsItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: null,
        RecordState: 2,
        Code: null,
        Description1: null,
        BranchId: null,
        IsServiceOperation: 1,
        IsService: 0,
        IsAssetUsed: 0,
        AssetOperationDetails: []
      },
      routeName1: 'Asset',
      assetOperationDetailsItems: detailData.assetOperationDetailsItems
    }
  },
  computed: {
    ...mapState([''])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      let rowData = this.rowData
      this.form = rowData
      if (!rowData.AssetOperationDetails) {
        this.form.AssetOperationDetails = []
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
        this.updateData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  }
}
</script>
