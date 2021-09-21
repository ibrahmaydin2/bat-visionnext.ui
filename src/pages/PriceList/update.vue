<template>
  <b-row class="asc__insertPage">
   <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <b-button size="sm" variant="warning" @click="$bvModal.show('price-list-excel-modal')" :title="$t('insert.PriceList.importExcel')">
              <i class="fa fa-upload"></i>
            </b-button>
            <router-link :to="{name: 'PriceList' }">
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
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.PriceList.PriceList')">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.priceListCategoryId">
              <NextDropdown v-model="priceListCategory" :disabled="insertReadonly.priceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" :get-lookup="true" label="Label" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown v-model="currency" :disabled="insertReadonly.CurrencyId" url="VisionNextSystem/api/SysCurrency/Search" label="Description1" @input="selectedSearchType('CurrencyId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
            </NextFormGroup>
          </b-row>
          <b-row>
            <NextFormGroup :title="$t('insert.PriceList.Product')">
              <NextInput @input="onProductSearch($event)" type="text" ></NextInput>
            </NextFormGroup>
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
                <NextInput v-model="data.item.SalesPrice" type="number" :disabled="insertReadonly.SalesPrice"  toggle/>
              </template>
              <template #cell(ConsumerPrice)="data">
                <NextInput v-model="data.item.ConsumerPrice" type="number" :disabled="insertReadonly.ConsumerPrice"  toggle/>
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
    <PriceListExcelModal @update="updatePriceListFromExcel" />
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import updateMixin from '../../mixins/update'
import PriceListExcelModal from '../../components/Actions/PriceListExcelModal'
export default {
  mixins: [updateMixin],
  components: {
    PriceListExcelModal
  },
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
          key: 'Item.Code',
          label: this.$t('insert.PriceList.ProductCode'),
          thClass: 'list-textbox-width'
        },
        {
          key: 'Item.Label',
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
    },
    updatePriceListFromExcel (excelProducts) {
      for (const property in excelProducts) {
        let item = excelProducts[property]
        this.allUserProducts.map(product => {
          if (Number(item.ItemCode) === Number(product.Item.Code)) {
            product.ConsumerPrice = item.ConsPrice
            product.SalesPrice = item.Price
          }
        })
      }
      this.products = this.allUserProducts
      this.$toasted.show(this.$t('index.success'), {
        type: 'success',
        keepOnHover: true,
        duration: '3000'
      })
      this.$root.$emit('bv::hide::modal', 'price-list-excel-modal')
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
        this.currency = e.Currency
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
