<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'DiscountPackage' }">
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
          <NextFormGroup item-key="PackageKindId" :error="$v.form.PackageKindId">
            <NextDropdown :disabled="insertReadonly.PackageKindId" lookup-key="PACKAGE_KIND" label="Label"  @input="selectedType('PackageKindId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="MaxScore" :error="$v.form.MaxScore">
            <NextInput v-model="form.MaxScore" type="number" :disabled="insertReadonly.MaxScore" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.discountPackage.campaigns')" >
          <NextDetailPanel v-model="form.DiscountPackageDetails" :items="discountPackageDetailsItems"/>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        StatusId: 1,
        RecordState: 2,
        Code: null,
        Description1: null,
        PackageKindId: null,
        MaxScore: null,
        DiscountPackageDetails: []
      },
      routeName1: 'Discount',
      discountPackageDetailsItems: detailData.discountPackageDetailsItems

    }
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
      } else {
        this.createData()
      }
    }
  }
}
</script>
