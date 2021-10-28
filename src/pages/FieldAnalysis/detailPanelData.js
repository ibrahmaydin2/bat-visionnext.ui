import i18n from '../../i18n'
export const detailData = {
  fieldAnalysisQuestionItems: [
    {
      type: 'Dropdown',
      modelProperty: 'QuestionId',
      labelProperty: 'Code',
      objectKey: 'Question',
      url: 'VisionNextFieldAnalysis/api/AnalysisQuestions/Search',
      label: i18n.t('insert.fieldAnalysis.questionCode'),
      visible: true,
      required: true,
      isUnique: true,
      customOption: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Description1',
      objectKey: 'Question',
      labelProperty: 'Label',
      parentProperty: 'Description1',
      label: i18n.t('insert.fieldAnalysis.questionName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Check',
      modelProperty: 'IsNecessary',
      label: i18n.t('insert.fieldAnalysis.isNecessary'),
      visible: true,
      id: 3
    }
  ],
  fieldAnalysisBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'AnalysisBranchId',
      objectKey: 'AnalysisBranch',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.fieldAnalysis.branchCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      parentProperty: 'Description1',
      modelProperty: 'BranchName',
      labelProperty: 'Label',
      objectKey: 'AnalysisBranch',
      label: i18n.t('insert.fieldAnalysis.branchName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    }
  ],
  fieldAnalysisEmployeeItems: [
    {
      type: 'Lookup',
      modelProperty: 'EmployeeTypeId',
      objectKey: 'EmployeeType',
      url: 'EMPLOYEE_TYPE',
      label: i18n.t('insert.fieldAnalysis.employeeType'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  fieldAnalysisCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch',
      label: i18n.t('insert.fieldAnalysis.customerCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerName',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.fieldAnalysis.commercialTitle'),
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
      label: i18n.t('insert.fieldAnalysis.location'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 5
    }
  ],
  fieldAnalysisValidDateItems: [
    {
      type: 'Date',
      modelProperty: 'StartDate',
      label: i18n.t('insert.fieldAnalysis.startDate'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      label: i18n.t('insert.fieldAnalysis.endDate'),
      required: true,
      visible: true,
      id: 2
    }
  ],
  fieldAnalysisDetailItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.fieldAnalysis.areaDesc'),
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
      label: i18n.t('insert.fieldAnalysis.areaValue'),
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
