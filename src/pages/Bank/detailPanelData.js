import i18n from '../../i18n'
export const detailData = {
  batBankBranchesItems: [
    {
      type: 'Text',
      modelProperty: 'Code',
      objectKey: 'Code',
      createCode: true,
      label: i18n.t('insert.bank.branchCode'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      objectKey: 'Description1',
      label: i18n.t('insert.bank.description1'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      modelProperty: 'FinanceCode',
      objectKey: 'FinanceCode',
      label: i18n.t('insert.bank.financeCode'),
      required: false,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      modelProperty: 'DefaultAccountNumber',
      objectKey: 'DefaultAccountNumber',
      label: i18n.t('insert.bank.defaultAccountNumber'),
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Check',
      modelProperty: 'IsDefaultBranch',
      objectKey: 'IsDefaultBranch',
      label: i18n.t('insert.bank.isDefaultBranch'),
      required: false,
      visible: true,
      id: 5
    }
  ],
  saasBankBranchesItems: [
    {
      type: 'Text',
      modelProperty: 'Code',
      objectKey: 'Code',
      createCode: true,
      label: i18n.t('insert.bank.branchCode'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      objectKey: 'Description1',
      label: i18n.t('insert.bank.description1'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      modelProperty: 'FinanceCode',
      objectKey: 'FinanceCode',
      label: i18n.t('insert.bank.financeCode'),
      required: false,
      visible: true,
      id: 3
    },
    {
      type: 'Check',
      modelProperty: 'IsCsBank',
      objectKey: 'IsCsBank',
      label: i18n.t('insert.bank.isCsBank'),
      required: false,
      visible: true,
      disabled: true,
      id: 4
    }
  ]
}
