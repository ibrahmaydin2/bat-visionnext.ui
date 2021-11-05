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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId"/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown :disabled="insertReadonly.GroupId" lookup-key="ITEM_GROUP" @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ShortDescription" :error="$v.form.ShortDescription">
              <NextInput v-model="form.ShortDescription" type="text" :disabled="insertReadonly.ShortDescription" />
            </NextFormGroup>
            <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
              <NextDropdown :disabled="insertReadonly.CardTypeId" url="VisionNextItem/api/ItemCardType/AutoCompleteSearch" @input="selectedSearchType('CardTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ProducerCodeId" :error="$v.form.ProducerCodeId">
              <NextDropdown :disabled="insertReadonly.ProducerCodeId" lookup-key="PRODUCER_CODE" @input="selectedType('ProducerCodeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown :disabled="insertReadonly.TypeId" lookup-key="ITEM_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown :disabled="insertReadonly.ClassId" lookup-key="ITEM_CLASS" @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PackageTypeId" :error="$v.form.PackageTypeId">
              <NextDropdown :disabled="insertReadonly.PackageTypeId" lookup-key="ITEM_PACKAGE_TYPE" @input="selectedType('PackageTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CategoryId" :error="$v.form.CategoryId">
              <NextDropdown :disabled="insertReadonly.CategoryId" lookup-key="ITEM_CATEGORY" @input="selectedType('CategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FilterTypeId" :error="$v.form.FilterTypeId">
              <NextDropdown :disabled="insertReadonly.FilterTypeId" lookup-key="ITEM_FILTER_TYPE" @input="selectedType('FilterTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FilterColorId" :error="$v.form.FilterColorId">
              <NextDropdown :disabled="insertReadonly.FilterColorId" lookup-key="ITEM_FILTER_COLOR" @input="selectedType('FilterColorId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DimensionId" :error="$v.form.DimensionId">
              <NextDropdown :disabled="insertReadonly.DimensionId" lookup-key="ITEM_DIMENSION" @input="selectedType('DimensionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown :disabled="insertReadonly.KindId" lookup-key="ITEM_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiameterId" :error="$v.form.DiameterId">
              <NextDropdown :disabled="insertReadonly.DiameterId" lookup-key="ITEM_DIAMETER" @input="selectedType('DiameterId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BlendId" :error="$v.form.BlendId">
              <NextDropdown :disabled="insertReadonly.BlendId" lookup-key="ITEM_BLEND" @input="selectedType('BlendId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ShelfLife" :error="$v.form.ShelfLife">
              <NextInput v-model="form.ShelfLife" type="text" :disabled="insertReadonly.ShelfLife" />
            </NextFormGroup>
            <NextFormGroup item-key="TimeFrameId" :error="$v.form.TimeFrameId">
              <NextDropdown :disabled="insertReadonly.TimeFrameId" url="VisionNextSystem/api/SysTimeFrame/AutoCompleteSearch" @input="selectedSearchType('TimeFrameId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ColorId" :error="$v.form.ColorId">
              <NextDropdown :disabled="insertReadonly.ColorId" url="VisionNextSystem/api/SysColor/AutoCompleteSearch" @input="selectedSearchType('ColorId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TrackTypeId" :error="$v.form.TrackTypeId">
              <NextDropdown :disabled="insertReadonly.TrackTypeId" url="VisionNextItem/api/ItemTrackType/Search" @input="selectedSearchType('TrackTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Plant" :error="$v.form.Plant">
              <NextInput v-model="form.Plant" type="text" :disabled="insertReadonly.Plant" />
            </NextFormGroup>
            <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
              <NextInput v-model="form.SortOrder" type="text" :disabled="insertReadonly.SortOrder" />
            </NextFormGroup>
            <NextFormGroup item-key="StockThreshold" :error="$v.form.StockThreshold">
              <NextInput v-model="form.StockThreshold" type="text" :disabled="insertReadonly.StockThreshold" />
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderAllowed" :error="$v.form.IsOrderAllowed">
              <NextCheckBox :disabled="insertReadonly.IsOrderAllowed" v-model="IsOrderAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsSaleAllowed" :error="$v.form.IsSaleAllowed">
              <NextCheckBox :disabled="insertReadonly.IsSaleAllowed" v-model="IsSaleAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsBarterAllowed" :error="$v.form.IsBarterAllowed">
              <NextCheckBox :disabled="insertReadonly.IsBarterAllowed" v-model="IsBarterAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="UseSalesAnalysis" :error="$v.form.UseSalesAnalysis">
              <NextCheckBox :disabled="insertReadonly.UseSalesAnalysis" v-model="UseSalesAnalysis" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsLaunchItem" :error="$v.form.IsLaunchItem">
              <NextCheckBox :disabled="insertReadonly.IsLaunchItem" v-model="IsLaunchItem" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsRMAOff" :error="$v.form.IsRMAOff">
                <NextCheckBox v-model="IsRMAOff" type="number" toggle :disabled="insertReadonly.IsRMAOff"/>
            </NextFormGroup>
            <NextFormGroup item-key="IsSpGiftItem" :error="$v.form.IsSpGiftItem">
                <NextCheckBox v-model="IsSpGiftItem" type="number" toggle :disabled="insertReadonly.IsSpGiftItem"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemFinancialInfo')">
          <b-row>
            <NextFormGroup item-key="Vat" :error="$v.form.Vat">
              <NextInput v-model="form.Vat" type="text" :disabled="insertReadonly.Vat" />
            </NextFormGroup>
            <NextFormGroup item-key="MaxDiscountRate" :error="$v.form.MaxDiscountRate">
              <NextInput v-model="form.MaxDiscountRate" type="text" :disabled="insertReadonly.MaxDiscountRate" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode">
              <NextInput v-model="form.FinanceCode" type="text" :disabled="insertReadonly.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup item-key="UnitSetId" :error="$v.form.UnitSetId">
              <NextDropdown :disabled="insertReadonly.UnitSetId" url="VisionNextUnit/api/UnitSet/AutoCompleteSearch" @input="selectedUnitSet"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup1Id" :error="$v.form.DiscountGroup1Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup1Id" lookup-key="ITEM_DISCOUNT_GROUP_1" @input="selectedType('DiscountGroup1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup2Id" :error="$v.form.DiscountGroup2Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup2Id" lookup-key="ITEM_DISCOUNT_GROUP_2" @input="selectedType('DiscountGroup2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup3Id" :error="$v.form.DiscountGroup3Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup3Id" lookup-key="ITEM_DISCOUNT_GROUP_3" @input="selectedType('DiscountGroup3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup4Id" :error="$v.form.DiscountGroup4Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup4Id" lookup-key="ITEM_DISCOUNT_GROUP_4" @input="selectedType('DiscountGroup4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup5Id" :error="$v.form.DiscountGroup5Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup5Id" lookup-key="ITEM_DISCOUNT_GROUP_5" @input="selectedType('DiscountGroup5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup6Id" :error="$v.form.DiscountGroup6Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup6Id" lookup-key="ITEM_DISCOUNT_GROUP_6" @input="selectedType('DiscountGroup6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup7Id" lookup-key="ITEM_DISCOUNT_GROUP_7" @input="selectedType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup8Id" :error="$v.form.DiscountGroup8Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup8Id" lookup-key="ITEM_DISCOUNT_GROUP_8" @input="selectedType('DiscountGroup8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup9Id" :error="$v.form.DiscountGroup9Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup9Id" lookup-key="ITEM_DISCOUNT_GROUP_9" @input="selectedType('DiscountGroup9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup10Id" :error="$v.form.DiscountGroup10Id">
              <NextDropdown :disabled="insertReadonly.DiscountGroup10Id" lookup-key="ITEM_DISCOUNT_GROUP_10" @input="selectedType('DiscountGroup10Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RecurrenceTypeId" :error="$v.form.RecurrenceTypeId">
              <NextDropdown :disabled="insertReadonly.RecurrenceTypeId" url="" @input="selectedSearchType('RecurrenceTypeId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemTree')">
          <NextDetailPanel v-model="form.ItemBoms" :items="itemBomItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.CustomerCode')">
          <NextDetailPanel v-model="form.ItemCustomers" :items="itemCustomerItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemCode')">
          <NextDetailPanel v-model="form.ItemBarcodes" :items="itemBarcodeItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.AddTax')">
          <NextDetailPanel v-model="form.AdditionalTaxes" :items="itemVatsItems"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.itemDeposits')">
          <NextDetailPanel v-model="form.ItemDeposits" :items="getItemDepositItems()"></NextDetailPanel>
        </b-tab>
        <b-tab lazy :title="$t('insert.item.ItemOrderQuotas')">
          <NextDetailPanel v-model="form.ItemOrderQuotas" :items="getItemUnitSetItems()"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.AdditionalClassificationAreas')">
          <b-row>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown :disabled="insertReadonly.Category1Id" lookup-key="ITEM_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.Category2Id">
              <NextDropdown :disabled="insertReadonly.Category2Id" lookup-key="ITEM_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category3Id" :error="$v.form.Category3Id">
              <NextDropdown :disabled="insertReadonly.Category3Id" lookup-key="ITEM_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category4Id" :error="$v.form.Category4Id">
              <NextDropdown :disabled="insertReadonly.Category4Id" lookup-key="ITEM_CATEGORY_4" @input="selectedType('Category4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category5Id" :error="$v.form.Category5Id">
              <NextDropdown :disabled="insertReadonly.Category5Id" lookup-key="ITEM_CATEGORY_5" @input="selectedType('Category5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category6Id" :error="$v.form.Category6Id">
              <NextDropdown :disabled="insertReadonly.Category6Id" lookup-key="ITEM_CATEGORY_6" @input="selectedType('Category6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category7Id" :error="$v.form.Category7Id">
              <NextDropdown :disabled="insertReadonly.Category7Id" lookup-key="ITEM_CATEGORY_7" @input="selectedType('Category7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category8Id" :error="$v.form.Category8Id">
              <NextDropdown :disabled="insertReadonly.Category8Id" lookup-key="ITEM_CATEGORY_8" @input="selectedType('Category8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category9Id" :error="$v.form.Category9Id">
              <NextDropdown :disabled="insertReadonly.Category9Id" lookup-key="ITEM_CATEGORY_9" @input="selectedType('Category9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category10Id" :error="$v.form.Category10Id">
              <NextDropdown :disabled="insertReadonly.Category10Id" lookup-key="ITEM_CATEGORY_10" @input="selectedType('Category10Id', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../../mixins/insert'
import { detailData } from './../detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Code: null,
        Category10Id: null,
        GroupId: null,
        Description1: null,
        ShortDescription: null,
        IsRMAOff: null,
        IsSPGiftItem: null,
        RecurrenceTypeId: null,
        TrackTypeId: null,
        StatusId: 1,
        StockThreshold: null,
        ProducerCodeId: null,
        TypeId: null,
        IsOrderAllowed: null,
        IsSaleAllowed: null,
        ClassId: null,
        PackageTypeId: null,
        CategoryId: null,
        FilterTypeId: null,
        FilterColorId: null,
        DimensionId: null,
        KindId: null,
        DiameterId: null,
        BlendId: null,
        ShelfLife: null,
        TimeFrameId: null,
        ColorId: null,
        Plant: null,
        SortOrder: null,
        IsBarterAllowed: null,
        UseSalesAnalysis: null,
        IsLaunchItem: null,
        Vat: null,
        MaxDiscountRate: null,
        FinanceCode: null,
        UnitSetId: null,
        DiscountGroup1Id: null,
        DiscountGroup2Id: null,
        DiscountGroup3Id: null,
        DiscountGroup4Id: null,
        DiscountGroup5Id: null,
        DiscountGroup6Id: null,
        DiscountGroup7Id: null,
        DiscountGroup8Id: null,
        DiscountGroup9Id: null,
        DiscountGroup10Id: null,
        Category1Id: null,
        Category2Id: null,
        Category3Id: null,
        Category4Id: null,
        Category5Id: null,
        Category6Id: null,
        Category7Id: null,
        Category8Id: null,
        Category9Id: null,
        CardTypeId: null,
        ItemBoms: [],
        ItemCustomers: [],
        ItemBarcodes: [],
        AdditionalTaxes: [],
        ItemDeposits: [],
        ItemOrderQuotas: []
      },
      itemBomItems: detailData.itemBomItems,
      itemCustomerItems: detailData.itemCustomerItems,
      itemBarcodeItems: detailData.itemBarcodeItems,
      itemVatsItems: detailData.itemVatsItems,
      IsOrderAllowed: null,
      IsSaleAllowed: null,
      IsBarterAllowed: null,
      UseSalesAnalysis: null,
      IsLaunchItem: null,
      IsRMAOff: null,
      IsSpGiftItem: null,
      UnitsData: []
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
        this.tabValidation()
      } else {
        this.createData()
      }
    },
    selectedUnitSet (value) {
      if (value) {
        this.form.UnitSetId = value.RecordId

        let model = {
          andConditionModel: {
            UnitSetIds: [value.RecordId]
          }
        }
        this.$api.postByUrl(model, 'VisionNextUnit/api/Unit/Search').then((response) => {
          if (response && response.ListModel && response.ListModel.BaseModels) {
            this.UnitsData = response.ListModel.BaseModels
          }
        })
      } else {
        this.form.UnitSetId = null
        this.UnitsData = []
      }
    },
    getItemUnitSetItems () {
      return [
        {
          type: 'Date',
          modelProperty: 'BeginDate',
          objectKey: 'BeginDate',
          label: this.$t('insert.item.BeginDate'),
          required: false,
          visible: true,
          isUnique: false,
          id: 1
        },
        {
          type: 'Date',
          modelProperty: 'EndDate',
          objectKey: 'EndDate',
          label: this.$t('insert.item.EndDate'),
          required: false,
          visible: true,
          isUnique: false,
          id: 2
        },
        {
          type: 'Dropdown',
          modelProperty: 'quotaUnitId',
          objectKey: 'quotaUnit',
          source: this.UnitsData.map(u => {
            return {
              RecordId: u.UnitId,
              Description1: u.UnitLookupValue ? u.UnitLookupValue.Label : ''
            }
          }),
          label: this.$t('insert.item.QuotaUnitId'),
          visible: true,
          required: false,
          isUnique: false,
          id: 3
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'quotaQuantity',
          objectKey: 'quotaQuantity',
          label: this.$t('insert.item.Quantity'),
          required: false,
          visible: true,
          isUnique: false,
          id: 4
        },
        {
          type: 'Dropdown',
          modelProperty: 'quotaBranchId',
          objectKey: 'quotaBranch',
          url: 'VisionNextBranch/api/Branch/Search',
          label: this.$t('insert.item.quotaBranchId'),
          visible: true,
          required: false,
          isUnique: false,
          id: 5
        },
        {
          type: 'Autocomplete',
          modelProperty: 'quotaRegionId',
          objectKey: 'quotaRegionId',
          url: 'VisionNextCommonApi/api/Region/AutoCompleteSearch',
          label: this.$t('insert.item.quotaRegionId'),
          visible: true,
          required: false,
          isUnique: false,
          id: 6
        }
      ]
    },
    getItemDepositItems () {
      return [
        {
          type: 'Dropdown',
          modelProperty: 'UnitId',
          objectKey: 'Unit',
          source: this.UnitsData.map(u => {
            return {
              RecordId: u.UnitId,
              Description1: u.UnitLookupValue ? u.UnitLookupValue.Label : ''
            }
          }),
          label: this.$t('insert.item.UnitId'),
          visible: true,
          required: false,
          isUnique: false,
          id: 1
        },
        {
          type: 'Autocomplete',
          modelProperty: 'DepositId',
          objectKey: 'Deposit',
          labelProperty: 'Label',
          url: 'VisionNextItem/api/Item/GetDepositForItem',
          label: this.$t('insert.item.DepositId'),
          visible: true,
          required: false,
          isUnique: false,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Quantity',
          objectKey: 'Quantity',
          label: this.$t('insert.item.Quantity'),
          required: false,
          visible: true,
          isUnique: false,
          id: 3
        }
      ]
    }
  }
}
</script>
