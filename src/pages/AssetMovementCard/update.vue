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
        <b-tab :title="$t('get.assetMovementCard.general')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CardNumber" :error="$v.form.CardNumber">
              <b-form-input type="text" v-model="form.CardNumber" :readonly="insertReadonly.CardNumber" />
            </NextFormGroup>
            <NextFormGroup item-key="MovementTypeId" :error="$v.form.MovementTypeId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="EmployeeId" :error="$v.form.EmployeeId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="ToStateId" :error="$v.form.ToStateId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="FromStateId" :error="$v.form.FromStateId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="OperationDate" :error="$v.form.OperationDate">
              <b-form-datepicker v-model="form.OperationDate" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="ToLocationId" :error="$v.form.ToLocationId">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="FromLocationId" :error="$v.form.FromLocationId">
              <v-select />
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
