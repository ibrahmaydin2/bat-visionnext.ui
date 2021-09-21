<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
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
              <NextDropdown :disabled="insertReadonly.priceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" :get-lookup="true" label="Label" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId">
              <NextDropdown :disabled="insertReadonly.CurrencyId" url="VisionNextSystem/api/SysCurrency/Search" label="Description1" @input="selectedSearchType('CurrencyId', $event)"/>
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
      allUserProducts: [],
      currentPage: 1,
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
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'allProducts'])
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
          var newItem = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            StatusId: 1,
            ItemId: item.RecordId,
            IsVatIncluded: item.IsVatIncluded ? item.IsVatIncluded : 0,
            UseConsumerPrice: item.UseConsumerPrice ? item.UseConsumerPrice : 0,
            SalesPrice: 100,
            ConsumerPrice: 200
          }
          return newItem
        })
        this.form.StatusId = this.form.StatusId === true || this.form.StatusId === 1 ? 1 : 0
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextFinance/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    },
    getLists () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextItem/api/Item/Search', name: 'allProducts'})
    },
    onProductSearch (value) {
      if (!value || value === '') {
        this.products = this.allUserProducts
      } else {
        this.products = this.allUserProducts.filter(p => p.Description1 ? p.Description1.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : false)
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
    allProducts (value) {
      this.allUserProducts = value.filter(v => v.CardTypeId >= 1 && v.CardTypeId <= 8)
      this.products = this.allUserProducts
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
