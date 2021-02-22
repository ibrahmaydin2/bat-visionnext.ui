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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" md="3" lg="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" md="3" lg="3">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="3" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.PriceList.PriceList')">
          <b-row>
            <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" md="3" lg="3">
              <b-form-group :label="insertTitle.PriceListCategoryId + (insertRequired.PriceListCategoryId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                <v-select
                  :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                  @input="selectedType('PriceListCategoryId', $event)"
                  label="Label"
                  v-model="priceListCategory"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CurrencyId != null ? insertVisible.CurrencyId : developmentMode" md="3" lg="3">
              <b-form-group :label="insertTitle.CurrencyId + (insertRequired.CurrencyId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CurrencyId.$error }">
                <v-select
                  :options="currencies"
                  @input="selectedSearchType('CurrencyId', $event)"
                  label="Description1"
                  v-model="currency"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.BeginDate != null ? insertVisible.BeginDate : developmentMode" :start-weekday="1" md="3" lg="3">
              <b-form-group :label="insertTitle.BeginDate + (insertRequired.BeginDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BeginDate.$error }">
                <b-form-datepicker v-model="form.BeginDate" />
              </b-form-group>
            </b-col>
             <b-col v-if="insertVisible.EndDate != null ? insertVisible.EndDate : developmentMode" :start-weekday="1" md="3" lg="3">
              <b-form-group :label="insertTitle.EndDate + (insertRequired.EndDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.EndDate.$error }">
                <b-form-datepicker v-model="form.EndDate" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" lg="3">
              <b-form-group :label="$t('insert.PriceList.Product')">
                <b-form-input type="text" @input="onProductSearch($event)"/>
              </b-form-group>
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-table responsive autoWidth bordered small id="product-list" :per-page="20" :current-page="currentPage" :items="products" :fields="fields">
              <template #cell(IsVatIncluded)="data">
                <NextCheckBox v-model="data.item.IsVatIncluded" type="number" toggle/>
              </template>
              <template #cell(UseConsumerPrice)="data">
                <NextCheckBox v-model="data.item.UseConsumerPrice" :disabled="!data.item.IsVatIncluded" type="number" toggle/>
              </template>
              <template #cell(SalesPrice)="data">
                <b-form-input type="number" v-model="data.item.SalesPrice"/>
              </template>
              <template #cell(ConsumerPrice)="data">
                <b-form-input type="number" v-model="data.item.ConsumerPrice"/>
              </template>
            </b-table>
            <b-pagination
              :total-rows="products.length"
              v-model="currentPage"
              :per-page="20"
              aria-controls="product-list"
            ></b-pagination>
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
        Deleted: 0,
        System: 0,
        RecordState: 2,
        CurrencyId: null,
        BeginDate: null,
        EndDate: null,
        PriceListCategoryId: null,
        StatusId: null,
        RecordId: null,
        EncryptedKey: null,
        Code: null,
        Description1: null,
        PriceListItems: null
      },
      routeName: this.$route.meta.baseLink,
      products: [],
      userProducts: [],
      allUserProducts: [],
      currentPage: 1,
      priceListCategory: null,
      currency: null,
      fields: [
        {
          key: 'Code',
          label: this.$t('insert.PriceList.ProductCode'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'Description1',
          label: this.$t('insert.PriceList.ProductName'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'IsVatIncluded',
          label: this.$t('insert.PriceList.IsVatIncluded'),
          thClass: 'list-checkbox-width'
        },
        {
          key: 'UseConsumerPrice',
          label: this.$t('insert.PriceList.UseConsumerPrice'),
          thClass: 'list-checkbox-width'
        },
        {
          key: 'SalesPrice',
          label: this.$t('insert.PriceList.SalesPrice'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'ConsumerPrice',
          label: this.$t('insert.PriceList.ConsumerPrice'),
          thClass: 'list-textbox-width'
        }
      ]
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'currencies', 'allProducts', 'rowData'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextFinance/api/${e}/GetCode`})
      this.getLists()
      this.$store.dispatch('getData', {...this.query, api: `VisionNextFinance/api/${e}`, record: this.$route.params.url})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
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
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        if (this.allUserProducts.filter(p => !p.SalesPrice || p.SalesPrice === '' || !p.ConsumerPrice || p.ConsumerPrice === '').length > 0) {
          this.$toasted.show(this.$t('insert.PriceList.PricesRequired'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }

        this.form.PriceListItems = this.allUserProducts.map((item) => {
          item.RecordState = 3
          item.IsVatIncluded = item.IsVatIncluded ? item.IsVatIncluded : 0
          item.UseConsumerPrice = item.UseConsumerPrice ? item.UseConsumerPrice : 0
          item.ConsumerPrice = parseFloat(item.ConsumerPrice)
          item.SalesPrice = parseFloat(item.SalesPrice)
          return item
        })
        this.form.StatusId = this.form.StatusId === true || this.form.StatusId === 1 ? 1 : 0
        let model = {
          'model': this.form
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNextFinance/api/${this.routeName}`, formdata: model, return: this.$route.meta.baseLink})
      }
    },
    getLists () {
      let allLookups = 'PRICE_LIST_CATEGORY_TYPE'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysCurrency/Search', name: 'currencies'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextItem/api/Item/Search', name: 'allProducts'})
    },
    onProductSearch (value) {
      if (!value || value === '') {
        this.products = this.allUserProducts
      } else {
        this.products = this.allUserProducts.filter(p => p.Description1 ? p.Description1.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : false)
      }
    },
    mergeLists (allProducts) {
      if (!allProducts || allProducts.length === 0 || !this.userProducts || this.userProducts.length === 0 || !this.allUserProducts || this.allUserProducts.length > 0) {
        return
      }
      this.allUserProducts = this.userProducts.map((product) => {
        var selectedProduct = this.allProducts.find(p => p.RecordId === product.ItemId)
        if (selectedProduct) {
          product.Description1 = selectedProduct.Description1
          product.Code = selectedProduct.Code
        }
        return product
      })
      this.products = this.allUserProducts
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
    allProducts (value) {
      if (value) {
        var filteredValue = value.filter(v => v.CardTypeId >= 1 && v.CardTypeId <= 8)
        this.mergeLists(filteredValue)
      }
    },
    rowData (e) {
      if (e) {
        this.form.Deleted = e.Deleted
        this.form.System = e.System
        this.form.RecordState = e.RecordState
        this.form.CurrencyId = e.CurrencyId
        this.form.BeginDate = e.BeginDate
        this.form.EndDate = e.EndDate
        this.form.PriceListCategoryId = e.PriceListCategoryId
        this.form.StatusId = e.StatusId
        this.form.RecordId = e.RecordId
        this.form.EncryptedKey = e.EncryptedKey
        this.form.Code = e.Code
        this.form.Description1 = e.Description1
        this.priceListCategory = e.PriceListCategory
        this.userProducts = e.PriceListItems
        if (this.allProducts) {
          this.mergeLists(this.allProducts.filter(v => v.CardTypeId >= 1 && v.CardTypeId <= 8))
        }
        if (this.currencies) {
          this.currency = this.currencies.find(c => c.RecordId === e.CurrencyId)
        }
      }
    },
    currencies (value) {
      if (value) {
        this.currency = value.find(c => c.RecordId === this.form.CurrencyId)
      }
    }
  }
}
</script>
<style lang="css">
.list-checkbox-width{
  width: 10% !important
}
.list-textbox-width{
  width: 20% !important
}
</style>
