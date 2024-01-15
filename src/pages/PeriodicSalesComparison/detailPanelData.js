import i18n from '../../i18n'
export const detailData = {
  itemAnalysisItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Code',
      customOption: true,
      //dynamicAndCondition: { Category2Ids: [34209712417], StatusIds: [1] },
      dynamicAndCondition: {StatusIds: [1] },
      orConditionFields: 'Code,Description1',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.itemAnalysis.itemCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      parentProperty: 'Description1',
      modelProperty: 'Label',
      objectKey: 'Item',
      label: i18n.t('insert.itemAnalysis.itemName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ITEM',
      id: 4
    }
  ]
}
