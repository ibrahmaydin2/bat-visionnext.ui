<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'PriceDiscountTransaction' }">
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
          <NextFormGroup item-key="Durum" :error="$v.form.Durum">
            <NextCheckBox v-model="form.Durum" type="number" toggle />
          </NextFormGroup>
          <NextFormGroup item-key="Onay Durumu" :error="$v.form.Onay Durumu">
            <v-select
              :options="lookup.APPROVE_STATE"
              @input="selectedType('Onay Durumu', $event)"
              label="Label"
            />
          </NextFormGroup>
          <NextFormGroup item-key="Açıklama" :error="$v.form.Açıklama">
            <b-form-input type="text" v-model="form.Açıklama" :readonly="insertReadonly.Açıklama" />
          </NextFormGroup>
        </b-row> -->
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <!-- <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerId" :error="$v.form.CustomerId">
              <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup item-key="Tanım tarihi" :error="$v.form.Tanım tarihi">
              <b-form-datepicker v-model="form.Tanım tarihi" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="Tanım Saati" :error="$v.form.Tanım Saati">
              <b-form-timepicker
              :placeholder="$t('insert.chooseTime')"
              :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
              :label-no-time-selected="$t('insert.chooseTime')"
              :label-close-button="$t('insert.close')"
              close-button-variant="outline-danger"
              v-model="form.Tanım Saati"/>
            </NextFormGroup>
            <NextFormGroup item-key="Dip Toplam İndirimi Nedeni" :error="$v.form.Dip Toplam İndirimi Nedeni">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="Dip Toplam İndirimi" :error="$v.form.Dip Toplam İndirimi">
              <b-form-input type="text" v-model="form.Dip Toplam İndirimi" :readonly="insertReadonly.Dip Toplam İndirimi" />
            </NextFormGroup>
            <NextFormGroup item-key="Para Birimi" :error="$v.form.Para Birimi">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="Bütçe Miktarı" :error="$v.form.Bütçe Miktarı">
              <b-form-input type="text" v-model="form.Bütçe Miktarı" :readonly="insertReadonly.Bütçe Miktarı" />
            </NextFormGroup>
            <NextFormGroup item-key="Harcanan Bütçe Miktarı" :error="$v.form.Harcanan Bütçe Miktarı">
              <b-form-input type="text" v-model="form.Harcanan Bütçe Miktarı" :readonly="insertReadonly.Harcanan Bütçe Miktarı" />
            </NextFormGroup>
            <NextFormGroup item-key="Bütçe" :error="$v.form.Bütçe">
              <v-select />
            </NextFormGroup>
            <NextFormGroup item-key="ERP Kodu" :error="$v.form.ERP Kodu">
              <b-form-input type="text" v-model="form.ERP Kodu" :readonly="insertReadonly.ERP Kodu" />
            </NextFormGroup>
            <NextFormGroup item-key="Son Geçerlilik tarihi" :error="$v.form.Son Geçerlilik tarihi">
              <b-form-datepicker v-model="form.Son Geçerlilik tarihi" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="Kullanıma Başlangıç Tarihi" :error="$v.form.Kullanıma Başlangıç Tarihi">
              <b-form-datepicker v-model="form.Kullanıma Başlangıç Tarihi" :placeholder="$t('insert.chooseDate')"/>
            </NextFormGroup>
            <NextFormGroup item-key="Açıklama2" :error="$v.form.Açıklama2">
              <b-form-input type="text" v-model="form.Açıklama2" :readonly="insertReadonly.Açıklama2" />
            </NextFormGroup>
            <NextFormGroup item-key="Kazanç Türü" :error="$v.form.Kazanç Türü">
              <v-select
                :options="lookup.GAIN_TYPE"
                @input="selectedType('Kazanç Türü', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="TCI" :error="$v.form.TCI">
              <v-select
                :options="lookup.TCI_BREAKDOWN"
                @input="selectedType('TCI', $event)"
                label="Label"
              />
            </NextFormGroup>
            <NextFormGroup item-key="Kod" :error="$v.form.Kod">
              <b-form-input type="text" v-model="form.Kod" :readonly="insertReadonly.Kod" />
            </NextFormGroup>
          </b-row>
        </b-tab> -->
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
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        RecordId: null,
        Code: null,
        Description1: null,
        CustomerId: null,
        TransactionDate: new Date(),
        TransactionTime: new Date(),
        DiscountReasonId: null,
        PriceDiscountAmount: null,
        CurrencyId: null,
        UseBudget: 0,
        BudgetAmount: 0,
        BudgetConsumption: 0,
        BudgetId: null,
        ApproveStateId: 2102,
        ErpCode: null,
        ExpirationDate: new Date(),
        BeginDate: new Date(),
        Genexp1: null,
        GainTypeId: null,
        TciBreak1Id: null
      },
      routeName1: 'Discount'
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['customers'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // this.form.TransactionTime = this.form.TransactionTime.getTime()
      // Sayfa açılışında yüklenmesi gereken search items için kullanılır.
      // lookup harici dataya ihtiyaç yoksa silinebilir
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
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
