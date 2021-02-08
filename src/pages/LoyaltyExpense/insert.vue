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
          <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.FinanceCode + (insertRequired.FinanceCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode.$error }">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description != null ? insertVisible.Description : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.Description + (insertRequired.Description === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description.$error }">
              <b-form-input type="text" v-model="form.Description" :readonly="insertReadonly.Description" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.LoyaltyExpense.title')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select :options="employees" @input="selectedSearchType('RepresentativeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select :options="customers" @input="selectedSearchType('CustomerId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.LoyaltyId != null ? insertVisible.LoyaltyId : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.LoyaltyId + (insertRequired.LoyaltyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.LoyaltyId.$error }">
                <v-select :options="loyalities" @input="selectedSearchType('LoyaltyId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.ConsumptionScore != null ? insertVisible.ConsumptionScore : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.ConsumptionScore + (insertRequired.ConsumptionScore === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ConsumptionScore.$error }">
                <b-form-input type="text" v-model="form.ConsumptionScore" :readonly="insertReadonly.ConsumptionScore" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.TransactionDate != null ? insertVisible.TransactionDate : developmentMode" :start-weekday="1" cols="12" md="3">
              <b-form-group :label="insertTitle.TransactionDate + (insertRequired.TransactionDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TransactionDate.$error }">
                <b-form-datepicker v-model="form.TransactionDate" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Description: null,
        FinanceCode: null,
        CustomerId: null,
        LoyaltyId: null,
        ConsumptionScore: null,
        TransactionDate: null,
        RepresentativeId: null,
        StatusId: 1
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: true
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'employees', 'customers', 'loyalities'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      // this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'employees'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextCustomer/api/Customer/Search', name: 'customers'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextLoyalty/api/Loyalty/Search', name: 'loyalities'})
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextLoyalty/api/Loyalty`, formdata: model, return: this.routeName})
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    },
    // Status'un değerini true'dan 1'e çeviriyor
    dataStatus: function (e) {
      console.log(e)
      if (e === true) {
        this.form.StatusId = 1
      } else {
        this.form.StatusId = 0
      }
    }
  }
}
</script>
<style lang="sass">
</style>
