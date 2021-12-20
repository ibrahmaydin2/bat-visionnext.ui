<template>
  <div>
    <b-form-group>
      <b-button :disabled="disabled" variant="success" class="mt-4" size="sm" @click="showModal"><i class="fa fa-plus"></i> {{$t('insert.newOrder.addNewItem')}}</b-button>
    </b-form-group>
    <b-modal :id="`modal${id}`" size="xl" @show="show" no-close-on-backdrop>
      <template #modal-title>
        {{$t('insert.newOrder.addNewItem')}}
      </template>
      <b-row>
        <NextFormGroup :title="$t('insert.newOrder.category1')" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category1"
            lookup-key="ITEM_CATEGORY_1"
            @input="selectCategory($event, 2)"
            get-lookup/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category2')" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category2"
            label="Label"
            :source="category2List"
            :disabled="!itemInfo.category1"
            @input="selectCategory($event, 3)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category3')" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category3"
            label="Label"
            :source="category3List"
            :disabled="!itemInfo.category2"
            @input="selectCategory($event, 4)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category4')" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category4"
            label="Label"
            :source="category4List"
            :disabled="!itemInfo.category3"
            @input="selectCategory($event, 5)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category5')" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category5"
            label="Label"
            :source="category5List"
            :disabled="!itemInfo.category4"
            @input="selectCategory($event, 0)"/>
        </NextFormGroup>
        <b-col md="2" lg="2">
          <b-form-group>
            <b-button class="mt-4" variant="success" size="sm" @click="addItems" :disabled="productsEmpty"><i class="fa fa-plus"></i> {{$t('insert.newOrder.addProducts')}}</b-button>
          </b-form-group>
        </b-col>
        <div class="products">
          <b-card class="product" body-class="product-body" v-for="(product, index) in products" :key="index">
            <b-row>
              <b-col class="col-md-3">
                <img class="product-image" src="https://productimages.hepsiburada.net/s/47/550/10921432318002.jpg" />
              </b-col>
              <b-col class="col-md-5 pt-3">
                <span> {{`${product.Code} - ${product.Description1}`}}</span>
              </b-col>
              <b-col class="col-md-2 pt-2">
                <span>{{product.Price.toFixed(2)}} TL</span><br />
                <span>{{$t('insert.newOrder.stock')}}: {{product.StockQuantity}}</span>
              </b-col>
              <b-col class="col-md-2 pt-2">
                <b-form-spinbutton id="sb-inline" v-model="product.Quantity" @input="calculateItemTotalPrices($event, product, index)" min="0" max="1000" inline></b-form-spinbutton>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-row>
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="closeModal()">{{$t('insert.cancel')}}</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  name: 'NewOrderAddItem',
  props: {
    disabled: false,
    dynamicAndConditions: {}
  },
  data () {
    return {
      id: Math.random().toString(36).substring(2),
      category2List: [],
      category3List: [],
      category4List: [],
      category5List: [],
      products: [],
      itemInfo: {}
    }
  },
  methods: {
    addItems () {
      if (this.productsEmpty) {
        this.$toasted.show(this.$t('insert.newOrder.requiredProducts'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      this.$emit('success', this.products.filter(p => p.Quantity > 0))
      this.closeModal()
    },
    show () {
      this.itemInfo = {}
      this.category2List = []
      this.category3List = []
      this.category4List = []
      this.category5List = []
      this.products = []
    },
    showModal () {
      this.$bvModal.show(`modal${this.id}`)
    },
    closeModal () {
      this.$bvModal.hide(`modal${this.id}`)
    },
    selectCategory (value, index) {
      if (index > 0) {
        for (let i = index; i <= 5; i++) {
          this.itemInfo[`category${i}`] = null
          this[`category${i}List`] = []
        }
        this.itemInfo[`category${index - 1}`] = value
      }
      if (index === 2 && !value) {
        this.products = []
        return
      }
      let request = {
        andConditionModel: {
          Category1Ids: this.itemInfo.category1 ? [this.itemInfo.category1.DecimalValue] : null,
          Category2Ids: this.itemInfo.category2 ? [this.itemInfo.category2.DecimalValue] : null,
          Category3Ids: this.itemInfo.category3 ? [this.itemInfo.category3.DecimalValue] : null,
          Category4Ids: this.itemInfo.category4 ? [this.itemInfo.category4.DecimalValue] : null,
          Category5Ids: this.itemInfo.category5 ? [this.itemInfo.category5.DecimalValue] : null,
          ...this.dynamicAndConditions
        }
      }
      this.products = []
      this.$api.postByUrl(request, 'VisionNextItem/api/Item/SearchWithPriceStock').then((response) => {
        if (response && response.ListModel && response.ListModel.BaseModels.length > 0) {
          let list = response.ListModel.BaseModels
          if (index > 0) {
            this[`category${index}List`] = [...new Set(list.map(r => r[`Category${index}`]))]
          }
          this.products = list.map(l => {
            l.Quantity = 0
            return l
          })
        } else {
          this.$toasted.show(this.$t('insert.newOrder.itemNotFound'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
        }
      })
    },
    calculateItemTotalPrices (val, product, index) {
      let quantity = parseFloat(val)
      let netTotal = parseFloat(product.Price * quantity)
      let vatTotal = parseFloat(netTotal * product.VatRate / 100)
      this.products[index].NetTotal = netTotal
      this.products[index].TotalVat = vatTotal
      this.products[index].GrossTotal = parseFloat(netTotal + vatTotal)
      this.$forceUpdate()
    }
  },
  computed: {
    productsEmpty () {
      return !this.products.some(p => p.Quantity > 0)
    }
  }
}
</script>
<style scoped>
.product-image {
  width: 45px;
  margin-left: 20px;
}
.product {
  margin-left: 10px;
  margin-bottom: 10px;
}
.selected-product {
  margin-left: 10px;
  margin-bottom: 10px;
  padding-top: 1.5rem;
  min-width: 100px;
}
.product-body {
  padding: 0.5rem;
}
.products {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 99%;
}
</style>
