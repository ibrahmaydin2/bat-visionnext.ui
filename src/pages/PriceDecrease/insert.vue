<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'PriceDecrease' }">
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
            <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs v-model="activeTabIndex">
        <b-tab :title="$t('insert.priceDecrease.title')" @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown :disabled="insertReadonly.PriceListCategoryId" @input="selectedType('PriceListCategoryId', $event)" lookup-key="PRICE_LIST_CATEGORY_TYPE"/>
            </NextFormGroup>
            <NextFormGroup item-key="TciBreakId" :error="$v.form.TciBreakId">
              <NextDropdown :disabled="insertReadonly.TciBreakId" @input="selectedType('TciBreakId', $event)" lookup-key="TCI_BREAKDOWN"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate"></NextDatePicker>
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate"></NextDatePicker>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.priceDecrease.assetTypeDefinition')" @click.prevent="searchPriceList">
          <b-row>
            <NextFormGroup :title="$t('insert.priceDecrease.itemCode')" :error="$v.priceDecreaseItem.item" :required="true">
              <NextDropdown
                v-model="priceDecreaseItem.item"
                url="VisionNextItem/api/Item/AutoCompleteSearch"
                searchable
                or-condition-fields="Code,Description1"
                label="Code"
                custom-option
                @input="selectItem" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.priceDecrease.itemName')">
              <NextInput disabled v-model="priceDecreaseItemName"></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.priceDecrease.listPrice')" :error="$v.priceDecreaseItem.currentSalesPrice" :required="true">
              <NextInput disabled v-model="priceDecreaseItem.currentSalesPrice"></NextInput>
            </NextFormGroup>
             <NextFormGroup :title="$t('insert.priceDecrease.newSalesPrice')" :error="$v.priceDecreaseItem.newSalesPrice" :required="true">
              <NextInput type="number" v-model="priceDecreaseItem.newSalesPrice" @input="enterNewPrice" @keypress="onlyForCurrency($event, priceDecreaseItem.newSalesPrice)" min=1></NextInput>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.priceDecrease.decreasePrice')" :error="$v.priceDecreaseItem.decrease" :required="true">
              <NextInput disabled v-model="priceDecreaseItem.decrease"></NextInput>
            </NextFormGroup>
            <b-col cols="12" md="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addPriceDecreaseItem" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table
              :fields="priceDecreaseItemFields"
              :items="this.form.PriceDecreaseItems ? this.form.PriceDecreaseItems.filter(i => i.RecordState !== 4) : []"
              bordered responsive >
              <template #cell(operations)="{item}">
                <div class="text-center">
                  <i @click="removePriceDecreaseItem(item)" class="far fa-trash-alt text-danger"></i>
                </div>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../mixins/insert'
import { detailData } from './detailPanelData'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CompanyId: null,
        BranchId: null,
        Code: null,
        Description1: null,
        PriceListCategoryId: null,
        TciBreakId: null,
        BeginDate: null,
        EndDate: null,
        PriceDecreaseItems: []
      },
      routeName1: 'Finance',
      priceDecreaseItemFields: detailData.priceDecreaseItemFields,
      priceDecreaseItem: {},
      selectedPrice: null,
      activeTabIndex: 0
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
      } else {
        this.createData()
      }
    },
    addPriceDecreaseItem () {
      this.$v.priceDecreaseItem.$touch()
      if (this.$v.priceDecreaseItem.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let filteredArr = this.form.PriceDecreaseItems.filter(i => i.ItemId === this.priceDecreaseItem.item.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      }

      if (parseFloat(this.priceDecreaseItem.newSalesPrice) > this.priceDecreaseItem.currentSalesPrice) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.priceDecrease.newSalesPriceError') })
        return
      }

      this.form.PriceDecreaseItems.push({
        ItemId: this.priceDecreaseItem.item.RecordId,
        ItemIdCode: this.priceDecreaseItem.item.Code,
        ItemIdDesc: this.priceDecreaseItem.item.Description1,
        CurrentSalesPrice: this.priceDecreaseItem.currentSalesPrice,
        NewSalesPrice: this.priceDecreaseItem.newSalesPrice,
        Decrease: this.priceDecreaseItem.decrease
      })
      this.priceDecreaseItem = {}
      this.$v.priceDecreaseItem.$reset()
    },
    removePriceDecreaseItem (item) {
      if (item.RecordId) {
        this.form.PriceDecreaseItems[this.form.PriceDecreaseItems.indexOf(item)].RecordState = 4
      } else {
        this.form.PriceDecreaseItems.splice(this.form.PriceDecreaseItems.indexOf(item), 1)
      }
    },
    selectItem (item) {
      this.priceDecreaseItem.newSalesPrice = null
      this.priceDecreaseItem.decrease = null
      if (this.selectedPrice && item) {
        let model = {
          PriceListIds: [this.selectedPrice.RecordId],
          ItemIds: [item.RecordId]
        }

        this.$api.postByUrl(model, 'VisionNextFinance/api/PriceListItem/Search').then((response) => {
          if (this.checkResponse(response)) {
            let pricelistItem = response.ListModel.BaseModels[0]
            if (pricelistItem.UseConsumerPrice === 1) {
              this.priceDecreaseItem.currentSalesPrice = this.roundNumber(pricelistItem.ConsumerPrice)
            } else {
              this.priceDecreaseItem.currentSalesPrice = this.roundNumber(pricelistItem.SalesPrice)
            }
          } else {
            this.priceDecreaseItem.currentSalesPrice = 0
          }
          this.$forceUpdate()
        })
      } else {
        this.priceDecreaseItem.currentSalesPrice = 0
        this.$forceUpdate()
      }
    },
    searchPriceList () {
      if (!this.form.PriceListCategoryId || !this.form.EndDate) {
        this.$toasted.show(this.$t('insert.priceDecrease.setPriceError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        setTimeout(() => {
          this.activeTabIndex = 0
        }, 1)
        return
      }

      this.selectedPrice = null
      let model = {
        PriceListCategoryIds: [this.form.PriceListCategoryId],
        EndDate: {
          BeginValue: this.form.EndDate
        }
      }
      this.$api.postByUrl(model, 'VisionNextFinance/api/PriceList/Search').then((response) => {
        if (this.checkResponse(response)) {
          this.selectedPrice = response.ListModel.BaseModels[0]
        } else {
          this.selectedPrice = null
        }
      })
    },
    checkResponse (response) {
      return response && response.ListModel && response.ListModel.BaseModels && response.ListModel.BaseModels.length > 0
    },
    enterNewPrice (value) {
      if (value) {
        let decrese = this.roundNumber(this.priceDecreaseItem.currentSalesPrice - parseFloat(value))
        this.priceDecreaseItem.decrease = decrese > 0 ? decrese : 0
      } else {
        this.priceDecreaseItem.decrease = 0
      }
      this.$forceUpdate()
    }
  },
  computed: {
    priceDecreaseItemName: {
      get () {
        return this.priceDecreaseItem.item ? this.priceDecreaseItem.item.Description1 : ''
      },
      set (newValue) {
        return newValue
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      priceDecreaseItem: {
        item: {
          required
        },
        currentSalesPrice: {
          required
        },
        newSalesPrice: {
          required
        },
        decrease: {
          required
        }
      }
    }
  }
}
</script>
