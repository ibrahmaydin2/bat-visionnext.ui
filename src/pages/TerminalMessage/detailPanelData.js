export const detailData = {
  validDateItems: [
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      label: 'insert.terminalMessage.beginDate',
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      label: 'insert.terminalMessage.endDate',
      required: true,
      visible: true,
      id: 2
    }
  ],
  messageBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'MessageBranchId',
      labelProperty: 'Code',
      objectKey: 'Code',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: 'insert.terminalMessage.branchCode',
      customOption: true,
      orConditionFields: 'Code,Description1',
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      parentProperty: 'Description1',
      label: 'insert.terminalMessage.branchName',
      disabled: true,
      visible: true,
      id: 2,
      parentId: 1
    },
    {
      type: 'Text',
      modelProperty: 'Code',
      parentProperty: 'Code',
      label: '',
      false: true,
      hideOnTable: true,
      id: 3,
      parentId: 1
    }
  ],
  routeItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'RouteId',
      labelProperty: 'Code',
      objectKey: 'Code',
      url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
      label: 'insert.terminalMessage.routeCode',
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      parentProperty: 'Description1',
      label: 'insert.terminalMessage.routeName',
      disabled: true,
      visible: true,
      id: 2,
      parentId: 1
    },
    {
      type: 'Text',
      modelProperty: 'Code',
      parentProperty: 'Code',
      label: '',
      false: true,
      hideOnTable: true,
      id: 3,
      parentId: 1
    }
  ],
  custSqlItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CustomerSqlId',
      objectKey: 'CustomerSql',
      url: 'VisionNextAdmin/api/SysCustomerSql/Search',
      label: 'insert.terminalMessage.customerQuery',
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  customerListItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: 'insert.terminalMessage.customerCode',
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
      label: 'insert.terminalMessage.commercialTitle',
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
      label: 'insert.terminalMessage.location',
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
  customerCriteriaItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
      label: 'insert.terminalMessage.columnName',
      required: true,
      visible: true,
      isUnique: false,
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
      label: 'insert.terminalMessage.columnValue',
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
  ]
}
