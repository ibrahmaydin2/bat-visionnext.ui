import i18n from '../../i18n'
export const detailData = {
  itemCriteriaItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.customerSItemCriteria.areaDesc'),
      required: true,
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.customerSItemCriteria.areaValue'),
      required: true,
      visible: true,
      isUnique: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ITEM',
      id: 3
    }
  ],
  itemItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValueDesc',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.customerSItemCriteria.item'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ITEM',
      parentId: null,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 3
    }
  ],
  customerCriteriaItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=2',
      label: i18n.t('insert.customerSItemCriteria.areaDesc'),
      required: true,
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'CUSTOMER_CRITERIA'},
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.customerSItemCriteria.areaValue'),
      required: true,
      visible: true,
      isUnique: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 3
    }
  ],
  customerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.customerSItemCriteria.customerCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CommercialTitle',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.customerSItemCriteria.commercialTitle'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Location',
      valueProperty: 'AddressDetail',
      objectKey: 'ColumnValueDesc2',
      parentProperty: 'DefaultLocationId',
      url: 'VisionNextCustomer/api/CustomerLocation/Get',
      label: i18n.t('insert.customerSItemCriteria.location'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      parentId: null,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 5
    }
  ],
  routeItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
      label: i18n.t('insert.customerSItemCriteria.routeCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'RouteName',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.customerSItemCriteria.routeName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ROUTE',
      parentId: null,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 4
    }
  ]
}
