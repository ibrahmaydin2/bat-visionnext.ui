import i18n from '../../i18n'
export const detailData = {
  branchItems: [
    {
      type: 'Autocomplete',
      inputType: null,
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValueDesc',
      parentProperty: null,
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.CycleInstruction.Branch'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: true,
      parentId: null,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'T_CUSTOMER',
      parentId: null,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      objectKey: 'ColumnNameDesc',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'BRANCH_ID',
      parentId: null,
      id: 3
    }
  ],
  customerItems: [
    {
      type: 'Autocomplete',
      inputType: null,
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValueDesc',
      parentProperty: null,
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.CycleInstruction.Customer'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: true,
      parentId: null,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'T_CUSTOMER',
      parentId: null,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      objectKey: 'ColumnNameDesc',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 3
    }
  ],
  routeItems: [
    {
      type: 'Autocomplete',
      inputType: null,
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValueDesc',
      parentProperty: null,
      url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
      label: i18n.t('insert.CycleInstruction.Route'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: true,
      parentId: null,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'T_ROUTE',
      parentId: null,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      objectKey: 'ColumnNameDesc',
      parentProperty: null,
      url: null,
      label: null,
      required: false,
      disabled: false,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 3
    }
  ],
  employeeItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      objectKey: 'Employee',
      url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.CycleInstruction.Employee'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'EmployeeDescription',
      parentProperty: 'Description1',
      url: null,
      label: i18n.t('insert.CycleInstruction.EmployeeDescription'),
      required: false,
      disabled: true,
      visible: false,
      hideOnTable: true,
      isUnique: false,
      parentId: 1,
      id: null
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'BranchDescription',
      parentProperty: 'BranchId',
      objectKey: 'Employee',
      url: 'VisionNextBranch/api/Branch/Get',
      label: i18n.t('insert.CycleInstruction.BranchDescription'),
      required: false,
      disabled: true,
      visible: true,
      hideOnTable: false,
      isUnique: false,
      parentId: 1,
      id: null
    }
  ],
  taskItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      parentProperty: null,
      url: null,
      label: i18n.t('insert.CycleInstruction.TaskCode'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: false,
      parentId: null,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      parentProperty: null,
      url: null,
      label: i18n.t('insert.CycleInstruction.TaskDescription1'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: false,
      parentId: null,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp1',
      parentProperty: null,
      url: null,
      label: i18n.t('insert.CycleInstruction.TaskGenexp1'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: false,
      parentId: null,
      id: 3
    }
  ],
  criteriaItems: [
    {
      type: 'Dropdown',
      inputType: null,
      modelProperty: 'ColumnName',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Label',
      request: null,
      valueProperty: 'ForeignField',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
      label: i18n.t('insert.CycleInstruction.AreaDesc'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
      isUnique: true,
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
      id: 1
    },
    {
      type: 'Dropdown',
      inputType: null,
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Label',
      labelProperty: 'Label',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.CycleInstruction.AreaValue'),
      required: true,
      disabled: false,
      visible: true,
      hideOnTable: false,
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
