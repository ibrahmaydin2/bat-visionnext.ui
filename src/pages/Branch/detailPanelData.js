import i18n from '../../i18n'
export const detailData = {
  customerLocationItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      label: i18n.t('insert.branch.locationCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      label: i18n.t('insert.branch.description1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDetail',
      label: i18n.t('insert.branch.addressDetail'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PhoneNumber1',
      label: i18n.t('insert.branch.phoneNumber1'),
      required: true,
      visible: true,
      isUnique: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PhoneNumber2',
      label: i18n.t('insert.branch.phoneNumber2'),
      required: true,
      visible: true,
      isUnique: true,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'FaxNumber',
      label: i18n.t('insert.branch.faxNumber'),
      required: false,
      visible: true,
      isUnique: true,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDescription',
      label: i18n.t('insert.branch.addressDescription'),
      required: false,
      visible: true,
      isUnique: true,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp1',
      label: i18n.t('insert.branch.genExp1'),
      required: false,
      visible: true,
      isUnique: true,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ContactName',
      label: i18n.t('insert.branch.contactName'),
      required: false,
      visible: true,
      isUnique: true,
      id: 9
    },
    {
      type: 'Lookup',
      modelProperty: 'CityId',
      objectKey: 'City',
      url: 'CITY',
      label: i18n.t('insert.branch.cityId'),
      required: true,
      visible: true,
      id: 10
    },
    {
      type: 'Dropdown',
      modelProperty: 'DistrictId',
      labelProperty: 'Label',
      objectKey: 'District',
      parentProperty: 'DecimalValue',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue',
      label: i18n.t('insert.branch.districtId'),
      request: JSON.stringify({UpperValue: 'val', LookupTableCode: 'DISTRICT'}),
      required: true,
      visible: true,
      parentId: 10,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'XPosition',
      label: i18n.t('insert.branch.xPosition'),
      required: false,
      visible: true,
      isUnique: true,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'YPosition',
      label: i18n.t('insert.branch.yPosition'),
      required: false,
      visible: true,
      isUnique: true,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Alias',
      label: i18n.t('insert.branch.alias'),
      required: false,
      visible: true,
      isUnique: true,
      id: 14
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDefaultLocation',
      label: i18n.t('insert.branch.isDefaultLocation'),
      required: false,
      visible: true,
      isUnique: true,
      id: 15
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsInvoiceAddress',
      label: i18n.t('insert.branch.isInvoiceAddress'),
      required: false,
      visible: true,
      isUnique: true,
      id: 16
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDeliveryAddress',
      label: i18n.t('insert.branch.isDeliveryAddress'),
      required: false,
      visible: true,
      isUnique: true,
      id: 17
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'GsmNumber',
      label: i18n.t('insert.branch.GsmNumber'),
      required: false,
      visible: true,
      isUnique: true,
      id: 18
    },
    {
      type: 'Text',
      inputType: 'number',
      isPostCode: true,
      modelProperty: 'PostCode',
      label: i18n.t('insert.branch.postCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 19
    }
  ],
  customerCreditHistoriesItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditAmount',
      label: i18n.t('insert.branch.creditAmount'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Autocomplete',
      modelProperty: 'BankId',
      objectKey: 'bank',
      url: 'VisionNextBank/api/Bank/Search',
      label: i18n.t('insert.branch.bankId'),
      required: false,
      visible: true,
      isUnique: true,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'currency',
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.branch.currencyId'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Debtor',
      label: i18n.t('insert.branch.debtor'),
      required: false,
      visible: true,
      isUnique: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Bail',
      label: i18n.t('insert.branch.bail'),
      required: false,
      visible: true,
      isUnique: true,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'LandOffice',
      label: i18n.t('insert.branch.landOffice'),
      required: false,
      visible: true,
      isUnique: true,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Plate',
      label: i18n.t('insert.branch.plate'),
      required: false,
      visible: true,
      isUnique: true,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TraficRegistry',
      label: i18n.t('insert.branch.traficRegistry'),
      required: false,
      visible: true,
      isUnique: true,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TextNo',
      label: i18n.t('insert.branch.textNo'),
      required: false,
      visible: true,
      isUnique: true,
      id: 9
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditLimit',
      label: i18n.t('insert.branch.creditLimit'),
      required: true,
      visible: true,
      isUnique: true,
      id: 10
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'NotaryNo',
      label: i18n.t('insert.branch.notaryNo'),
      required: false,
      visible: true,
      isUnique: true,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PlateNumber',
      label: i18n.t('insert.branch.plateNumber'),
      required: false,
      visible: true,
      isUnique: true,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'RiskLimit',
      label: i18n.t('insert.branch.riskLimit'),
      required: true,
      visible: true,
      isUnique: true,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'MortgageValue',
      label: i18n.t('insert.branch.mortgageValue'),
      required: false,
      visible: true,
      isUnique: true,
      id: 14
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'AllowOverLimit',
      label: i18n.t('insert.branch.allowOverLimit'),
      required: false,
      visible: true,
      isUnique: true,
      id: 15
    },
    {
      type: 'Date',
      modelProperty: 'CreditStartDate',
      label: i18n.t('insert.branch.creditStartDate'),
      required: true,
      visible: true,
      isUnique: true,
      id: 16
    },
    {
      type: 'Date',
      modelProperty: 'CreditEndDate',
      label: i18n.t('insert.branch.creditEndDate'),
      required: true,
      visible: true,
      isUnique: true,
      id: 17
    },
    {
      type: 'Date',
      modelProperty: 'TextDate',
      label: i18n.t('insert.branch.textDate'),
      required: false,
      visible: true,
      isUnique: true,
      id: 18
    },
    {
      type: 'Date',
      modelProperty: 'NotaryDate',
      label: i18n.t('insert.branch.notaryDate'),
      required: false,
      visible: true,
      isUnique: true,
      id: 19
    },
    {
      type: 'Lookup',
      modelProperty: 'CreditDescriptionId',
      objectKey: 'CreditDescription',
      url: 'CREDIT_DESCRIPTION',
      label: i18n.t('insert.branch.creditDescriptionId'),
      required: true,
      visible: true,
      id: 20
    }
  ],
  customerItemDiscountItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ItemName',
      label: i18n.t('insert.branch.ItemName'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'DiscountPercent1',
      label: i18n.t('insert.branch.DiscountPercent1'),
      required: false,
      visible: true,
      isUnique: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'DiscountPercent2',
      label: i18n.t('insert.branch.DiscountPercent2'),
      required: false,
      visible: true,
      isUnique: true,
      id: 3
    },
    {
      type: 'Lookup',
      modelProperty: 'TciBreak1Id',
      objectKey: 'TciBreak1',
      url: 'TCI_BREAKDOWN',
      label: i18n.t('insert.branch.TciBreak1Id'),
      required: (form) => {
        return form.DiscountPercent1 !== null && form.DiscountPercent1 !== ''
      },
      visible: true,
      id: 4
    },
    {
      type: 'Lookup',
      modelProperty: 'TciBreak2Id',
      objectKey: 'TciBreak2',
      url: 'TCI_BREAKDOWN',
      label: i18n.t('insert.branch.TciBreak2Id'),
      required: (form) => {
        return form.DiscountPercent2 !== null && form.DiscountPercent2 !== ''
      },
      visible: true,
      id: 5
    },
    {
      type: 'Autocomplete',
      modelProperty: 'ItemCode',
      objectKey: 'ItemCode',
      url: '/VisionNextItem/api/Item/Search',
      label: i18n.t('insert.branch.ItemCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 6
    }
  ],
  customerEInvoiceSeqsItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Prefix',
      objectKey: 'Prefix',
      label: i18n.t('insert.branch.Prefix'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'TerminalOrPcId',
      objectKey: 'TerminalOrPc',
      url: 'TERMINAL_OR_PC',
      label: i18n.t('insert.branch.TerminalOrPcId'),
      required: false,
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'EInvoiceTypeId',
      objectKey: 'EInvoiceType',
      url: 'EFA_SERVICES',
      label: i18n.t('insert.branch.TerminalOrPcId'),
      required: false,
      visible: true,
      id: 3
    },
    {
      type: 'Lookup',
      modelProperty: 'TransactionDayId',
      objectKey: 'TransactionDay',
      url: 'TRANSACTION_DAY',
      label: i18n.t('insert.branch.TransactionDayId'),
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Check',
      modelProperty: 'StatusId',
      objectKey: 'Status',
      label: i18n.t('insert.branch.StatusId'),
      required: true,
      visible: true,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'LastSequence',
      objectKey: 'LastSequence',
      label: i18n.t('insert.branch.LastSequence'),
      required: false,
      visible: true,
      id: 6
    },
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      objectKey: 'Employee',
      label: i18n.t('insert.branch.EmployeeId'),
      required: false,
      visible: true,
      isUnique: true,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Year',
      objectKey: 'Year',
      label: i18n.t('insert.branch.Year'),
      required: false,
      visible: true,
      isUnique: true,
      id: 8
    }
  ]
}
