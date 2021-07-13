import i18n from '../../i18n'
export const detailData = {
  loyaltyCatQuotasItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.loyaltyCategory.ColumnName'),
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
      label: i18n.t('insert.loyaltyCategory.ColumnValue'),
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
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Quantity',
      objectKey: 'Quantity',
      label: i18n.t('insert.loyaltyCategory.Quantity'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      objectKey: 'BeginDate',
      label: i18n.t('insert.loyaltyCategory.BeginDate'),
      required: true,
      visible: true,
      id: 5
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      objectKey: 'EndDate',
      label: i18n.t('insert.loyaltyCategory.EndDate'),
      required: true,
      visible: true,
      id: 6
    },
    {
      type: 'Lookup',
      modelProperty: 'UnitId',
      objectKey: 'Unit',
      url: 'UNIT',
      label: i18n.t('insert.loyaltyCategory.UnitId'),
      required: true,
      visible: true,
      id: 7
    }
  ],
  loyaltyCategoryValuesItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Value',
      objectKey: 'Value',
      label: i18n.t('insert.loyaltyCategory.Value'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  loyaltyCategoryTasksItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CycleInstructionId',
      objectKey: 'CycleInstruction',
      url: 'VisionNextFieldManagement/api/CycleInstruction/Search',
      label: i18n.t('insert.loyaltyCategory.CycleInstructionId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'CycleInstructionTaskId',
      objectKey: 'CycleInstructionTask',
      labelProperty: 'Description1',
      parentProperty: 'RecordId',
      responseProperty: 'CycleInstructionTasks',
      url: 'VisionNextFieldManagement/api/CycleInstruction/Get',
      label: i18n.t('insert.loyaltyCategory.CycleInstructionTaskId'),
      request: JSON.stringify({RecordId: 'val'}),
      required: true,
      visible: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'LoyaltyPoint',
      objectKey: 'LoyaltyPoint',
      label: i18n.t('insert.loyaltyCategory.LoyaltyPoint'),
      required: true,
      visible: true,
      id: 3
    }
  ],
  loyaltyCatSalesItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      objectKey: 'Description1',
      label: i18n.t('insert.loyaltyCategory.description'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  loyaltyCategoryFields: [
    {
      key: 'Description1',
      label: i18n.t('insert.loyaltyCategory.description')
    },
    {
      key: 'operations',
      label: i18n.t('list.operations')
    }
  ],
  loyaltyQuestionFields: [
    {
      key: 'QuestionId',
      label: i18n.t('insert.loyaltyCategory.QuestionId'),
      formatter: (value, key, obj) => {
        return obj.Question ? obj.Question.label : obj.QuestionIdDesc
      }
    },
    {
      key: 'Answer',
      label: i18n.t('insert.loyaltyCategory.Answer'),
      formatter: (value, key, obj) => {
        return obj.Answer ? obj.Answer.label : obj.AnswerIdDesc
      }
    },
    {
      key: 'AnswerStart',
      label: i18n.t('insert.loyaltyCategory.AnswerStart')
    },
    {
      key: 'AnswerEnd',
      label: i18n.t('insert.loyaltyCategory.AnswerEnd')
    },
    {
      key: 'operations',
      label: i18n.t('list.operations')
    }
  ],
  loyaltyCategoryCritDetailItems: [
    {
      type: 'Lookup',
      modelProperty: 'QuestionId',
      objectKey: 'Question',
      labelProperty: 'Description1',
      valueProperty: 'RecordId',
      url: 'SELECTED_FIELD_ANALYSIS_QUESTIONS',
      label: i18n.t('insert.loyaltyCategory.QuestionId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'AnswerId',
      objectKey: 'Answer',
      url: 'VisionNextFieldAnalysis/api/AnalysisQuestions/Get',
      label: i18n.t('insert.loyaltyCategory.AnswerId'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Answer',
      label: i18n.t('insert.loyaltyCategory.Answer'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AnswerStart',
      label: i18n.t('insert.loyaltyCategory.AnswerStart'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AnswerEnd',
      label: i18n.t('insert.loyaltyCategory.AnswerEnd'),
      required: true,
      visible: true,
      id: 5
    }
  ],
  LoyaltyCatSalesDetailsItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Code',
      orConditionFields: 'Code,Description1',
      url: 'VisionNextItem/api/Item/Search',
      label: i18n.t('insert.loyaltyCategory.ItemId'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      objectKey: 'Item',
      modelProperty: 'Description1',
      parentProperty: 'Description1',
      label: i18n.t('insert.loyaltyCategory.itemName'),
      required: false,
      disabled: true,
      visible: true,
      parentId: 1,
      id: 2
    }
  ]
}
