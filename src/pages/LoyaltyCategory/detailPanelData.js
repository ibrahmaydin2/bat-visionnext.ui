import i18n from '../../i18n'
export const detailData = {
  loyaltyCatQuotasItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      objectKey: 'ColumnName',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
      label: i18n.t('insert.loyaltyCategory.ColumnName'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnValue',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams',
      label: i18n.t('insert.loyaltyCategory.ColumnValue'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Quantity',
      objectKey: 'Quantity',
      label: i18n.t('insert.loyaltyCategory.Quantity'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'date',
      modelProperty: 'BeginDate',
      objectKey: 'BeginDate',
      label: i18n.t('insert.loyaltyCategory.BeginDate'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'date',
      modelProperty: 'EndDate',
      objectKey: 'EndDate',
      label: i18n.t('insert.loyaltyCategory.EndDate'),
      required: true,
      visible: true,
      id: 5
    },
    {
      type: 'Dropdown',
      modelProperty: 'UnitId',
      objectKey: 'Unit',
      url: 'VisionNextUnit/api/Unit/Search',
      label: i18n.t('insert.loyaltyCategory.UnitId'),
      required: true,
      visible: true,
      id: 6
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
      url: 'VisionNextFieldManagement/api/CycleInstruction/Get',
      label: i18n.t('insert.loyaltyCategory.CycleInstructionTaskId'),
      required: true,
      visible: true,
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
      label: i18n.t('insert.loyaltyCategory.Description1'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  loyaltyActiveCategoryFields: [
    {
      key: 'Description1',
      label: i18n.t('insert.loyaltyCategory.description')
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
  ]
}
