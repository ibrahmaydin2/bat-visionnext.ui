import i18n from '../../i18n'
export const detailData = {
  budgetItems: [
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      label: i18n.t('insert.budgetMaster.beginDate'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      label: i18n.t('insert.budgetMaster.endDate'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'FinanceCode',
      label: i18n.t('insert.budgetMaster.financeCode'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TotalAmount',
      label: i18n.t('insert.budgetMaster.totalAmount'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ReservedAmount',
      label: i18n.t('insert.budgetMaster.reservedAmount'),
      defaultValue: '0',
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'FreeAmount',
      label: i18n.t('insert.budgetMaster.freeAmount'),
      sameValue: true,
      parentId: 4,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'UsedAmount',
      label: i18n.t('insert.budgetMaster.usedAmount'),
      defaultValue: '0',
      id: 7
    }
  ],
  selectedBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'BranchId',
      objectKey: 'Branch',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.budgetMaster.branchCode'),
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
      objectKey: 'Branch',
      label: i18n.t('insert.budgetMaster.branchName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    }
  ]
}
