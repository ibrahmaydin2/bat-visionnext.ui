import i18n from '../../i18n'
export const detailData = {
  itemAnalysisQuestionItems: [
    {
      type: 'Dropdown',
      modelProperty: 'QuestionId',
      labelProperty: 'Code',
      objectKey: 'Question',
      url: 'VisionNextFieldAnalysis/api/AnalysisQuestions/Search',
      label: i18n.t('insert.itemAnalysis.questionCode'),
      visible: true,
      required: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Description1',
      objectKey: 'Question',
      labelProperty: 'Label',
      parentProperty: 'Description1',
      label: i18n.t('insert.itemAnalysis.questionName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Label',
      objectKey: 'AnswerType',
      parentProperty: 'AnswerType',
      label: i18n.t('insert.itemAnalysis.answerType'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Check',
      modelProperty: 'IsNecessary',
      label: i18n.t('insert.itemAnalysis.isNecessary'),
      visible: true,
      id: 4
    }
  ],
  itemAnalysisBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'AnalysisBranchId',
      objectKey: 'AnalysisBranch',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.itemAnalysis.branchCode'),
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
      label: i18n.t('insert.itemAnalysis.branchName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    }
  ],
  itemAnalysisEmployeeItems: [
    {
      type: 'Lookup',
      modelProperty: 'EmployeeTypeId',
      objectKey: 'EmployeeType',
      url: 'EMPLOYEE_TYPE',
      label: i18n.t('insert.itemAnalysis.employeeType'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  itemAnalysisItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Code',
      customOption: true,
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
    }
  ],
  itemAnalysisCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.itemAnalysis.customerCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Label',
      objectKey: 'Customer',
      parentProperty: 'Description1',
      label: i18n.t('insert.itemAnalysis.commercialTitle'),
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
      objectKey: 'CustomerLocation',
      parentProperty: 'DefaultLocationId',
      url: 'VisionNextCustomer/api/CustomerLocation/Get',
      label: i18n.t('insert.itemAnalysis.location'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    }
  ],
  itemAnalysisValidDateItems: [
    {
      type: 'Date',
      modelProperty: 'StartDate',
      label: i18n.t('insert.itemAnalysis.startDate'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      label: i18n.t('insert.itemAnalysis.endDate'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  itemAnalysisDetailItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.itemAnalysis.areaDesc'),
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
      label: i18n.t('insert.itemAnalysis.areaValue'),
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
