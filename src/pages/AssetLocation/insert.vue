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
        <!-- <b-row>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row> -->
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="BranchId" :error="$v.form.BranchId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="LastMovementDate" :error="$v.form.LastMovementDate">
              <b-form-datepicker v-model="form.LastMovementDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="AssetId" :error="$v.form.AssetId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="LocationId" :error="$v.form.LocationId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="BrandId" :error="$v.form.BrandId">
              <v-select
                :options="lookup.ASSET_BRAND"
                @input="selectedType('BrandId', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="ModelId" :error="$v.form.ModelId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="LastOperationDate" :error="$v.form.LastOperationDate">
              <b-form-datepicker v-model="form.LastOperationDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="ConditionId" :error="$v.form.ConditionId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="StateId" :error="$v.form.StateId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber" :error="$v.form.SerialNumber">
              <b-form-input type="text" v-model="form.SerialNumber" :readonly="insertReadonly.SerialNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="ContactId" :error="$v.form.ContactId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="AssetPositionId" :error="$v.form.AssetPositionId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="Quantity" :error="$v.form.Quantity">
              <b-form-input type="text" v-model="form.Quantity" :readonly="insertReadonly.Quantity" />
            </NextFormGroup>
            <NextFormGroup item-key="SerialNumber2" :error="$v.form.SerialNumber2">
              <b-form-input type="text" v-model="form.SerialNumber2" :readonly="insertReadonly.SerialNumber2" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <b-col>
              <code>{{form}}</code>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <h3>Form Elements</h3>
              <p>
                {{insertFormdata}}
              </p>
            </b-col>
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
      form: {},
      routeName1: 'Asset'
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState([''])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
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
