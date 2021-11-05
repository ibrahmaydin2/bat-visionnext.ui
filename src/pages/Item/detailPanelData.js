import i18n from '../../i18n'
export const detailData = {
  itemBomItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'BomItemId',
      objectKey: 'BomItem',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.item.ItemBomsId'),
      visible: true,
      required: true,
      md: '2',
      lg: '2',
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'UnitId',
      parentProperty: 'UnitId',
      visible: false,
      hideOnTable: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Label',
      parentProperty: 'RecordId',
      valueProperty: 'Unit',
      url: 'VisionNextItem/api/Item/Get',
      objectKey: 'Unit',
      label: i18n.t('insert.item.ItemBomsUnitId'),
      visible: true,
      disabled: true,
      md: '2',
      lg: '2',
      parentId: 1,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'LineNumber',
      label: i18n.t('insert.item.ItemBomsLineNumber'),
      visible: true,
      md: '2',
      lg: '2',
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Quantity',
      label: i18n.t('insert.item.ItemBomsQuantity'),
      visible: true,
      md: '2',
      lg: '2',
      id: 5
    }
  ],
  itemCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.item.ItemCustomersId'),
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      dynamicAndCondition: {RECORD_TYPE_ID: 3},
      required: true,
      visible: true,
      md: '2',
      lg: '2',
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'CustomerItemDescription',
      label: i18n.t('insert.item.ItemCustomersDesc'),
      visible: true,
      md: '2',
      lg: '2',
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'CustomerItemCode',
      label: i18n.t('insert.item.ItemCustomersCode'),
      visible: true,
      md: '2',
      lg: '2',
      id: 3
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'EntegrationFactor',
      visible: false,
      hideOnTable: true,
      defaultValue: 1,
      id: 3
    }
  ],
  itemBarcodeItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Barcode',
      label: i18n.t('insert.item.ItemBarcodesBarcode'),
      required: true,
      visible: true,
      md: '2',
      lg: '2',
      id: 1
    },
    {
      type: 'Autocomplete',
      modelProperty: 'UnitSetId',
      objectKey: 'UnitSet',
      url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch',
      label: i18n.t('insert.item.ItemBarcodesUnitId'),
      required: true,
      visible: true,
      md: '2',
      lg: '2',
      id: 2
    }
  ],
  sapPriceFields: [
    {
      key: 'Category2',
      label: i18n.t('insert.item.CustomerType'),
      formatter: (value, key, obj) => {
        return obj.Category2 ? obj.Category2.Label : '-'
      }
    },
    {
      key: 'Unit',
      label: i18n.t('insert.item.Unit'),
      formatter: (value, key, obj) => {
        return obj.Unit ? obj.Unit.Label : '-'
      }
    },
    {
      key: 'Price',
      label: i18n.t('insert.item.SapPrice')
    },
    {
      key: 'StartDate',
      label: i18n.t('insert.item.StartDate'),
      formatter: (value, key, obj) => {
        return this.dateConvertFromTimezone(value)
      }
    },
    {
      key: 'EndDate',
      label: i18n.t('insert.item.EndDate'),
      formatter: (value, key, obj) => {
        return this.dateConvertFromTimezone(value)
      }
    },
    {
      key: 'Condition',
      label: i18n.t('insert.item.Condition')
    }
  ],
  itemVatsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'TaxTypeId',
      objectKey: 'TaxType',
      url: 'VisionNextItem/api/TaxType/Search',
      label: i18n.t('insert.item.TaxTypeId'),
      visible: true,
      required: false,
      isUnique: false,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'TaxKindId',
      objectKey: 'TaxKind',
      url: 'TAX_TYPE_KIND',
      label: i18n.t('insert.item.TaxKindId'),
      visible: true,
      required: false,
      isUnique: false,
      id: 2
    },
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      objectKey: 'BeginDate',
      label: i18n.t('insert.item.BeginDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      objectKey: 'EndDate',
      label: i18n.t('insert.item.EndDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Vat',
      objectKey: 'Vat',
      label: i18n.t('insert.item.Vat'),
      required: false,
      visible: true,
      isUnique: false,
      id: 5
    }
  ],
  itemDepositsItem: [
    {
      type: 'Dropdown',
      modelProperty: 'UnitId',
      objectKey: 'Unit',
      labelProperty: 'UnitLookupValue.Label',
      url: 'VisionNextUnit/api/Unit/Search',
      label: i18n.t('insert.item.UnitId'),
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
      label: i18n.t('insert.item.DepositId'),
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
      label: i18n.t('insert.item.Quantity'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    }
  ],
  itemOrderQuotasItemsUpdate: [
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      objectKey: 'BeginDate',
      label: i18n.t('insert.item.BeginDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      objectKey: 'EndDate',
      label: i18n.t('insert.item.EndDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'quotaUnitId',
      objectKey: 'quotaUnit',
      url: 'VisionNextUnit/api/Unit/Search',
      dynamicAndCondition: { UnitSetIds: [1664960569] },
      labelProperty: 'UnitLookupValue.Label',
      label: i18n.t('insert.item.QuotaUnitId'),
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
      label: i18n.t('insert.item.Quantity'),
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
      label: i18n.t('insert.item.quotaBranchId'),
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
      label: i18n.t('insert.item.quotaRegionId'),
      visible: true,
      required: false,
      isUnique: false,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'usedQuantity',
      objectKey: 'usedQuantity',
      label: i18n.t('insert.item.usedQuantity'),
      required: false,
      disabled: true,
      visible: true,
      isUnique: false,
      id: 7
    }
  ],
  itemOrderQuotasItemsInsert: [
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      objectKey: 'BeginDate',
      label: i18n.t('insert.item.BeginDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      objectKey: 'EndDate',
      label: i18n.t('insert.item.EndDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'quotaUnitId',
      objectKey: 'quotaUnit',
      url: 'VisionNextUnit/api/Unit/Search',
      dynamicAndCondition: { UnitSetIds: [1664960569] },
      labelProperty: 'UnitLookupValue.Label',
      label: i18n.t('insert.item.QuotaUnitId'),
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
      label: i18n.t('insert.item.Quantity'),
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
      label: i18n.t('insert.item.quotaBranchId'),
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
      label: i18n.t('insert.item.quotaRegionId'),
      visible: true,
      required: false,
      isUnique: false,
      id: 6
    }
  ]
}
