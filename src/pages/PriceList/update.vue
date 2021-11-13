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
            <NextCheckBox v-model="form.StatusId" :disabled="insertReadonly.StatusId" type="number" toggle />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.PriceList.PriceList')">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.priceListCategoryId" md="4" lg="4">
              <NextDropdown v-model="priceListCategory" :disabled="insertReadonly.priceListCategoryId"  lookup-key="PRICE_LIST_CATEGORY_TYPE" :get-lookup="true" label="Label" @input="selectedType('PriceListCategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CurrencyId" :error="$v.form.CurrencyId" md="4" lg="4">
              <NextDropdown v-model="currency" :disabled="insertReadonly.CurrencyId" url="VisionNextSystem/api/SysCurrency/Search" label="Description1" @input="selectedSearchType('CurrencyId', $event)"/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.PriceList.getLastProduct')" md="4" lg="4">
              <b-button variant="success" size="sm" @click="getLists('button')">{{$t('insert.PriceList.get')}}</b-button>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate" md="4" lg="4">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate" md="4" lg="4">
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
        StatusId: 1,
        RecordId: null,
        EncryptedKey: null,
        Code: null,
        Description1: null,
        PriceListItems: null
      },
      routeName1: 'Finance',
      products: [],
      userProducts: [],
      allUserProducts: [],
      allProducts: [],
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
  mounted () {
    this.getData().then(() => {
      this.getLists()
    })
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
        this.form.PriceListItems = this.allUserProducts.map((item) => {
          var newItem = {
            Deleted: 0,
            System: 0,
            PriceListId: item.PriceListId,
            RecordState: item.RecordId > 0 ? 3 : 2,
            RecordId: item.RecordId,
            StatusId: 1,
            ItemId: item.ItemRecordId,
            IsVatIncluded: item.IsVatIncluded ? item.IsVatIncluded : 0,
            UseConsumerPrice: item.UseConsumerPrice ? item.UseConsumerPrice : 0,
            SalesPrice: item.SalesPrice,
            ConsumerPrice: item.ConsumerPrice
          }
          return newItem
        })
        this.form.StatusId = this.form.StatusId === true || this.form.StatusId === 1 ? 1 : 0
        this.updateData()
      }
    },
    getLists (type) {
      if (type === 'button' && (!this.form.CurrencyId || !this.form.PriceListCategoryId)) {
        this.$toasted.show(this.$t('insert.PriceList.getLastProductError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        Model: {
          CurrencyId: this.form.CurrencyId,
          PriceListCategoryId: this.form.PriceListCategoryId
        }
      }
      this.$api.postByUrl(request, 'VisionNextItem/api/Item/ItemForNewPriceList').then(response => {
        if (response.Model) {
          this.allProducts = response.Model
          this.mergeLists(this.allProducts)
        }
      })
    },
    onProductSearch (value) {
      if (!value || value === '') {
        this.products = this.allUserProducts
      } else {
        this.products = this.allUserProducts.filter(p => p.Description1 ? p.Description1.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : false)
      }
    },
    mergeLists () {
      this.allUserProducts = this.allProducts.map((product) => {
        var selectedProduct = this.userProducts.find(p => p.ItemId === product.ItemRecordId)
        if (selectedProduct) {
          product.SalesPrice = selectedProduct.SalesPrice
          product.ConsumerPrice = selectedProduct.ConsumerPrice
          product.UseConsumerPrice = selectedProduct.UseConsumerPrice
          product.IsVatIncluded = selectedProduct.IsVatIncluded
          product.RecordId = selectedProduct.RecordId
          product.PriceListId = selectedProduct.PriceListId
        }
        return product
      })
      this.products = this.allUserProducts
    },
    updatePriceListFromExcel (excelProducts) {
      for (const property in excelProducts) {
        let item = excelProducts[property]
        this.allUserProducts.map(product => {
          if (Number(item.ItemCode) === Number(product.Code)) {
            product.ConsumerPrice = item.ConsPrice
            product.SalesPrice = item.Price
          }

          return product
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
  watch: {
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
        this.currency = this.convertLookupValueToSearchValue(e.Currency)
        this.userProducts = e.PriceListItems
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
