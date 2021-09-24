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
  ]
}
