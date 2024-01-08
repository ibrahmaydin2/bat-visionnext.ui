<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Item' }">
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
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown :disabled="insertReadonly.GroupId" lookup-key="ITEM_GROUP" @input="selectedType('GroupId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ShortDescription" :error="$v.form.ShortDescription">
              <NextInput v-model="form.ShortDescription" type="text" :disabled="insertReadonly.ShortDescription" />
            </NextFormGroup>
            <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
              <NextDropdown v-model="CardType" :disabled="insertReadonly.CardTypeId" url="VisionNextItem/api/ItemCardType/AutoCompleteSearch" @input="selectedSearchType('CardTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ProducerCodeId" :error="$v.form.ProducerCodeId">
              <NextDropdown v-model="ProducerCode" :disabled="insertReadonly.ProducerCodeId" lookup-key="PRODUCER_CODE" @input="selectedType('ProducerCodeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
              <NextDropdown v-model="Type" :disabled="insertReadonly.TypeId" lookup-key="ITEM_TYPE" @input="selectedType('TypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ClassId" :error="$v.form.ClassId">
              <NextDropdown v-model="Class" :disabled="insertReadonly.ClassId" lookup-key="ITEM_CLASS" @input="selectedType('ClassId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="PackageTypeId" :error="$v.form.PackageTypeId">
              <NextDropdown v-model="PackageType" :disabled="insertReadonly.PackageTypeId" lookup-key="ITEM_PACKAGE_TYPE" @input="selectedType('PackageTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="CategoryId" :error="$v.form.CategoryId">
              <NextDropdown v-model="Category" :disabled="insertReadonly.CategoryId" lookup-key="ITEM_CATEGORY" @input="selectedType('CategoryId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FilterTypeId" :error="$v.form.FilterTypeId">
              <NextDropdown v-model="FilterType" :disabled="insertReadonly.FilterTypeId" lookup-key="ITEM_FILTER_TYPE" @input="selectedType('FilterTypeId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="FilterColorId" :error="$v.form.FilterColorId">
              <NextDropdown v-model="FilterColor" :disabled="insertReadonly.FilterColorId" lookup-key="ITEM_FILTER_COLOR" @input="selectedType('FilterColorId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DimensionId" :error="$v.form.DimensionId">
              <NextDropdown v-model="Dimension" :disabled="insertReadonly.DimensionId" lookup-key="ITEM_DIMENSION" @input="selectedType('DimensionId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="KindId" :error="$v.form.KindId">
              <NextDropdown v-model="Kind" :disabled="insertReadonly.KindId" lookup-key="ITEM_KIND" @input="selectedType('KindId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiameterId" :error="$v.form.DiameterId">
              <NextDropdown v-model="Diameter" :disabled="insertReadonly.DiameterId" lookup-key="ITEM_DIAMETER" @input="selectedType('DiameterId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BlendId" :error="$v.form.BlendId">
              <NextDropdown v-model="Blend" :disabled="insertReadonly.BlendId" lookup-key="ITEM_BLEND" @input="selectedType('BlendId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ShelfLife" :error="$v.form.ShelfLife">
              <NextInput v-model="form.ShelfLife" type="text" :disabled="insertReadonly.ShelfLife" />
            </NextFormGroup>
            <NextFormGroup item-key="TimeFrameId" :error="$v.form.TimeFrameId">
              <NextDropdown v-model="TimeFrame" :disabled="insertReadonly.TimeFrameId" url="VisionNextSystem/api/SysTimeFrame/AutoCompleteSearch" @input="selectedSearchType('TimeFrameId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="ColorId" :error="$v.form.ColorId">
              <NextDropdown v-model="Color" :disabled="insertReadonly.ColorId" url="VisionNextSystem/api/SysColor/AutoCompleteSearch" @input="selectedSearchType('ColorId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Plant" :error="$v.form.Plant">
              <NextInput v-model="form.Plant" type="text" :disabled="insertReadonly.Plant" />
            </NextFormGroup>
            <NextFormGroup item-key="SortOrder" :error="$v.form.SortOrder">
              <NextInput v-model="form.SortOrder" type="text" :disabled="insertReadonly.SortOrder" />
            </NextFormGroup>
            <NextFormGroup item-key="IsOrderAllowed" :error="$v.form.IsOrderAllowed">
              <NextCheckBox v-model="form.IsOrderAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsSaleAllowed" :error="$v.form.IsSaleAllowed">
              <NextCheckBox v-model="form.IsSaleAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsBarterAllowed" :error="$v.form.IsBarterAllowed">
              <NextCheckBox v-model="form.IsBarterAllowed" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="UseSalesAnalysis" :error="$v.form.UseSalesAnalysis">
              <NextCheckBox v-model="form.UseSalesAnalysis" type="number" toggle />
            </NextFormGroup>
            <NextFormGroup item-key="IsLaunchItem" :error="$v.form.IsLaunchItem">
              <NextCheckBox v-model="form.IsLaunchItem" type="number" toggle />
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
              <NextDropdown v-model="UnitSet" :item-selected="true" :disabled="insertReadonly.UnitSetId" url="VisionNextUnit/api/UnitSet/AutoCompleteSearch" @input="combinedMethod($event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup1Id" :error="$v.form.DiscountGroup1Id">
              <NextDropdown v-model="DiscountGroup1" :disabled="insertReadonly.DiscountGroup1Id" lookup-key="ITEM_DISCOUNT_GROUP_1" @input="selectedType('DiscountGroup1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup2Id" :error="$v.form.DiscountGroup2Id">
              <NextDropdown v-model="DiscountGroup2" :disabled="insertReadonly.DiscountGroup2Id" lookup-key="ITEM_DISCOUNT_GROUP_2" @input="selectedType('DiscountGroup2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup3Id" :error="$v.form.DiscountGroup3Id">
              <NextDropdown v-model="DiscountGroup3" :disabled="insertReadonly.DiscountGroup3Id" lookup-key="ITEM_DISCOUNT_GROUP_3" @input="selectedType('DiscountGroup3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup4Id" :error="$v.form.DiscountGroup4Id">
              <NextDropdown v-model="DiscountGroup4" :disabled="insertReadonly.DiscountGroup4Id" lookup-key="ITEM_DISCOUNT_GROUP_4" @input="selectedType('DiscountGroup4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup5Id" :error="$v.form.DiscountGroup5Id">
              <NextDropdown v-model="DiscountGroup5" :disabled="insertReadonly.DiscountGroup5Id" lookup-key="ITEM_DISCOUNT_GROUP_5" @input="selectedType('DiscountGroup5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup6Id" :error="$v.form.DiscountGroup6Id">
              <NextDropdown v-model="DiscountGroup6" :disabled="insertReadonly.DiscountGroup6Id" lookup-key="ITEM_DISCOUNT_GROUP_6" @input="selectedType('DiscountGroup6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup7Id" :error="$v.form.DiscountGroup7Id">
              <NextDropdown v-model="DiscountGroup7" :disabled="insertReadonly.DiscountGroup7Id" lookup-key="ITEM_DISCOUNT_GROUP_7" @input="selectedType('DiscountGroup7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup8Id" :error="$v.form.DiscountGroup8Id">
              <NextDropdown v-model="DiscountGroup8" :disabled="insertReadonly.DiscountGroup8Id" lookup-key="ITEM_DISCOUNT_GROUP_8" @input="selectedType('DiscountGroup8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup9Id" :error="$v.form.DiscountGroup9Id">
              <NextDropdown v-model="DiscountGroup9" :disabled="insertReadonly.DiscountGroup9Id" lookup-key="ITEM_DISCOUNT_GROUP_9" @input="selectedType('DiscountGroup9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="DiscountGroup10Id" :error="$v.form.DiscountGroup10Id">
              <NextDropdown v-model="DiscountGroup10" :disabled="insertReadonly.DiscountGroup10Id" lookup-key="ITEM_DISCOUNT_GROUP_10" @input="selectedType('DiscountGroup10Id', $event)"/>
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
          <NextDetailPanel v-model="form.ItemBarcodes" :items="getUnitSetItems()"></NextDetailPanel>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemImage')">
          <b-row>
            <b-col cols="12">
              <b-form-file
                class="col-md-4"
                v-model="selectedFile"
                :placeholder="$t('insert.chooseFileOrDrop')"
                :drop-placeholder="$t('insert.dropFileHere')"
                :browse-text="$t('insert.choose')"
              ></b-form-file>
              <b-form-group>
                <AddDetailButton :disabled="!selectedFile" @click.native="submitFile" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.item.FileName')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in (form.ItemAttachments ? form.ItemAttachments.filter(r => r.RecordState !== 4) : [])" :key="i">
                  <b-td>{{f.Attachment ? f.Attachment.Description1 : f.Description1}}</b-td>
                  <b-td class="text-center">
                    <i @click="removeItemAttachments(f)" class="far fa-trash-alt text-danger"></i>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.AdditionalClassificationAreas')">
          <b-row>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown v-model="form.Category1" :disabled="insertReadonly.Category1Id" lookup-key="ITEM_CATEGORY_1" @input="selectedType('Category1Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category2Id" :error="$v.form.Category2Id">
              <NextDropdown v-model="form.Category2" :disabled="insertReadonly.Category2Id" lookup-key="ITEM_CATEGORY_2" @input="selectedType('Category2Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category3Id" :error="$v.form.Category3Id">
              <NextDropdown v-model="form.Category3" :disabled="insertReadonly.Category3Id" lookup-key="ITEM_CATEGORY_3" @input="selectedType('Category3Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category4Id" :error="$v.form.Category4Id">
              <NextDropdown v-model="form.Category4" :disabled="insertReadonly.Category4Id" lookup-key="ITEM_CATEGORY_4" @input="selectedType('Category4Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category5Id" :error="$v.form.Category5Id">
              <NextDropdown v-model="form.Category5" :disabled="insertReadonly.Category5Id" lookup-key="ITEM_CATEGORY_5" @input="selectedType('Category5Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category6Id" :error="$v.form.Category6Id">
              <NextDropdown v-model="form.Category6" :disabled="insertReadonly.Category6Id" lookup-key="ITEM_CATEGORY_6" @input="selectedType('Category6Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category7Id" :error="$v.form.Category7Id">
              <NextDropdown v-model="form.Category7" :disabled="insertReadonly.Category7Id" lookup-key="ITEM_CATEGORY_7" @input="selectedType('Category7Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category8Id" :error="$v.form.Category8Id">
              <NextDropdown v-model="form.Category8" :disabled="insertReadonly.Category8Id" lookup-key="ITEM_CATEGORY_8" @input="selectedType('Category8Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category9Id" :error="$v.form.Category9Id">
              <NextDropdown v-model="form.Category9" :disabled="insertReadonly.Category9Id" lookup-key="ITEM_CATEGORY_9" @input="selectedType('Category9Id', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="Category10Id" :error="$v.form.Category10Id">
              <NextDropdown v-model="form.Category10" :disabled="insertReadonly.Category10Id" lookup-key="ITEM_CATEGORY_10" @input="selectedType('Category10Id', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.SapPrices')">
          <b-row>
            <b-table
              id="sap-prices"
              :fields="sapPriceFields"
              :items="sapPrices"
              bordered
              small
              responsive
              :current-page="currentPage"
              :per-page="10">
              <template #head()="data">
                {{$t(data.label)}}
              </template>
            </b-table>
            <b-pagination
              v-if="sapPrices.length > 0"
              :total-rows="sapPrices.length"
              v-model="currentPage"
              :per-page="10"
              aria-controls="sap-prices"
            ></b-pagination>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../../mixins/update'
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
        StatusId: null,
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
        ItemAttachments: []
      },
      Type: {},
      Class: {},
      PackageType: {},
      Category: {},
      FilterType: {},
      FilterColor: {},
      Dimension: {},
      Kind: {},
      Diameter: {},
      Blend: {},
      CardType: {},
      ProducerCode: {},
      TimeFrame: {},
      Color: {},
      UnitSet: {},
      DiscountGroup1: {},
      DiscountGroup2: {},
      DiscountGroup3: {},
      DiscountGroup4: {},
      DiscountGroup5: {},
      DiscountGroup6: {},
      DiscountGroup7: {},
      DiscountGroup8: {},
      DiscountGroup9: {},
      DiscountGroup10: {},
      Category1: {},
      Category2: {},
      Category3: {},
      Category4: {},
      Category5: {},
      Category6: {},
      Category7: {},
      Category8: {},
      Category9: {},
      Category10: {},
      currentPage: 1,
      sapPrices: [],
      itemBomItems: detailData.itemBomItems,
      itemCustomerItems: detailData.itemCustomerItems,
      itemBarcodeItems: detailData.itemBarcodeItems,
      sapPriceFields: detailData.sapPriceFields,
      selectedFile: null,
      Attachment: [],
      filePath: null,
      unitSetId: null,
      unitSet: null,
      unitSets: [],
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
    let visitCounter = parseInt(localStorage.getItem('visitCounter')) || 0
    if (!localStorage.getItem('visitedItemBefore')) {
      localStorage.setItem('visitedItemBefore', 'true')
      location.reload(true)
    } 
    else {
      visitCounter++
      if (visitCounter >= 2) {
        visitCounter = 0;
        location.reload(true);
      }
    }
    localStorage.setItem('visitCounter', visitCounter.toString())
  },
  methods: {
    combinedMethod(unitSetId) {
      if (unitSetId) {
        this.form['UnitSetId'] = unitSetId.RecordId;
        this.form.UnitSet = unitSetId.UnitSetIdDesc;
        this.unitSetId = unitSetId.RecordId;
        console.log('Seçilen Record ID:', unitSetId.RecordId);

        let request = {
          recordId: unitSetId.RecordId,
          unitSetId: unitSetId.RecordId,
        };
        this.$api.postByUrl(
          request,
          'VisionNextUnit/api/UnitSet/SearchForByUnitSetToUnit'
        ).then((response) => {
          this.unitSets = response && response.length > 0 ? response.map((r) => {
            r.Deleted = 0;
            r.System = 0;
            r.RecordState = 2;
            r.StatusId = 1;
            r.UnitSetId = 0;
            r.UnitSet = 0;
            r.UnitSetIdDesc = 0;
            return r;
          }) : [];
        });
      } else {
        this.form['UnitSetId'] = null;
        this.unitSetId = null;
        this.unitSets = [];
      }
    },
    getUnitSetItems () {
        return [
          {
            type: 'Text',
            inputType: 'text',
            modelProperty: 'Barcode',
            label: 'insert.item.ItemBarcodesBarcode',
            required: true,
            visible: true,
            md: '2',
            lg: '2',
            id: 1
          },
          {
            type: 'Dropdown',
            modelProperty: 'UnitSetId',
            objectKey: 'UnitSet',
            source: this.unitSets,
            label: 'insert.item.ItemBarcodesUnitId',
            required: true,
            visible: true,
            md: '2',
            lg: '2',
            id: 2
          }
        ]
    },
    submitFile () {
      this.getBase64(this.selectedFile)
    },
    getBase64 (file) {
      let vm = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      let fileName = file.name
      reader.onload = function () {
        let splitedFile = reader.result.split(',')[1]
        let dataType = reader.result.split(';base64,')[0]
        console.log(fileName)
        console.log(dataType)
        vm.addFixedTermCampaignTaken(splitedFile, fileName, dataType)
      }
    },
    // getSaveAttachment (splitedFile, fileName) {
    //   if (this.form.ItemAttachments.filter(r => r.RecordState !== 4).length > 0) {
    //     this.$toasted.show(this.$t('insert.errorImageLength'), {
    //       type: 'error',
    //       keepOnHover: true,
    //       duration: '3000'
    //     })
    //   } else {
    //     let formData = {
    //       AttachmentFile: splitedFile
    //     }
    //     this.$api.postByUrl(formData, 'VisionNextCommonApi/api/Attachment/SaveFile').then((response) => {
    //       if (response.IsCompleted === true) {
    //         this.filePath = response.AttachmentFile
    //         this.addFixedTermCampaignTaken(fileName)
    //       } else {
    //         this.$toasted.show(this.$t('insert.errorImage'), {
    //           type: 'error',
    //           keepOnHover: true,
    //           duration: '3000'
    //         })
    //       }
    //     })
    //   }
    // },
    addFixedTermCampaignTaken (splitedFile,fileName, dataType) {
      let formData = {
        FileName: fileName,
        File: splitedFile,
        FileType: dataType
      }
      this.form.ItemAttachments.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Description1: this.selectedFile.name,
        Attachment: {
          TableName: 'T_ITEM',
          FileName: formData.FileName,
          Description1: this.selectedFile.name,
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          File: formData.File,
          FileType: formData.FileType
        }
      })
      this.selectedFile = null
    },
    removeItemAttachments (item) {
      if (item.RecordId > 0) {
        this.form.ItemAttachments[this.form.ItemAttachments.indexOf(item)].RecordState = 4
        this.form.ItemAttachments.Attachment[this.form.ItemAttachments.Attachment.indexOf(item)].RecordState = 4
      } else {
        this.form.ItemAttachments.splice(this.form.ItemAttachments.indexOf(item), 1)
      }
    },
    setData () {
      this.form = this.rowData
      this.getSapPrices()

      for (const property in this.rowData) {
        if (this.rowData[property]) {
          if (typeof this.rowData[property].Label !== 'undefined') {
            if (property === 'CardType' || property === 'TimeFrame' || property === 'Color' || property === 'UnitSet') {
              this[property] = this.convertLookupValueToSearchValue(this.rowData[property])
            } else {
              this[property] = this.rowData[property]
            }
          }
        }
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
        this.updateData()
      }
    },
    getSapPrices () {
      let request = {
        andConditionModel: {
          ItemIds: [this.form.RecordId]
        }
      }
      this.$api.postByUrl(request, 'VisionNextItem/api/ItemSapPrice/Search').then((response) => {
        if (response && response.ListModel) {
          this.sapPrices = response.ListModel.BaseModels
        }
      })
    }
  }
}
</script>
