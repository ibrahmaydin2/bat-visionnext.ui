import i18n from '../../i18n'
export const detailData = {
  bcpDetailsItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.bcp.Item'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'ItemDesc',
      objectKey: 'ColumnValueDesc',
      orConditionFields: 'Code,Description1',
      parentProperty: 'Description1',
      labelProperty: 'Description1',
      label: i18n.t('insert.bcp.ItemName'),
      required: false,
      visible: true,
      disabled: true,
      isUnique: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'InvoiceQuantity',
      label: i18n.t('insert.bcp.InvoiceQuantity'),
      required: true,
      visible: true,
      isUnique: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'MinPurchaseQuantity',
      label: i18n.t('insert.bcp.MinPurchaseQuantity'),
      required: true,
      visible: true,
      isUnique: true,
      id: 4
    }
  ],
  bcpBranchsItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_BRANCH',
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnNameDesc',
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      id: 2
    },
    {
      type: 'Text',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'RecordId',
      orConditionFields: 'Code,Description1,RecordId',
      label: i18n.t('insert.bcp.ColumnValue'),
      hideOnTable: true,
      parentId: 3,
      id: 4
    },
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnNameDesc',
      labelProperty: 'Description1',
      objectKey: 'ColumnNameDescDesc',
      orConditionFields: 'Code,Description1,RecordId',
      label: i18n.t('insert.bcp.ColumnNameDesc'),
      url: 'VisionNextCustomer/api/BCP/AutoCompleteSearch',
      required: false,
      visible: true,
      disabled: false,
      isUnique: true,
      id: 3
    }
  ]

}
