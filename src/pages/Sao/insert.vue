<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Sao' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.sao.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="ValidityStartDate" :error="$v.form.ValidityStartDate">
              <NextDatePicker v-model="form.ValidityStartDate" :disabled="insertReadonly.ValidityStartDate" />
            </NextFormGroup>
            <NextFormGroup item-key="ValidityEndDate" :error="$v.form.ValidityEndDate">
              <NextDatePicker v-model="form.ValidityEndDate" :disabled="insertReadonly.ValidityEndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="StaffTypeId" :error="$v.form.StaffTypeId">
              <NextDropdown :disabled="insertReadonly.StaffTypeId" lookup-key="EMPLOYEE_TYPE" @input="selectedType('StaffTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BcpClusterCrteriaId" :error="$v.form.BcpClusterCrteriaId">
              <NextDropdown :disabled="insertReadonly.BcpClusterCrteriaId" lookup-key="CUSTOMER_DISCOUNT_GROUP_7" @input="selectedType('BcpClusterCrteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RegionCriteriaId" :error="$v.form.RegionCriteriaId">
              <NextDropdown :disabled="insertReadonly.RegionCriteriaId" lookup-key="CUSTOMER_REGION_3" @input="selectedType('RegionCriteriaId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.sao.details')">
           <NextDetailPanel v-model="form.SaoDetails" :items="soaDetailItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: null,
        Description1: null,
        ValidityStartDate: null,
        ValidityEndDate: null,
        StaffTypeId: null,
        BcpClusterCrteriaId: null,
        RegionCriteriaId: null,
        SaoDetails: []
      },
      routeName1: 'CommonApi',
      soaDetailItems: detailData.soaDetailItems
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
        this.tabValidation()
      } else {
        if (this.form.SaoDetails.length === 0) {
          this.$toasted.show(this.$t('insert.sao.detailsRequired'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
        this.form.StatusId = this.form.StatusId === 1 ? 1 : 2
        this.createData()
      }
    }
  }
}
</script>
