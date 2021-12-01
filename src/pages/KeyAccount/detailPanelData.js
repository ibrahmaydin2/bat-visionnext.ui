import i18n from '../../i18n'
export const detailData = {
  locationItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      label: i18n.t('insert.customer.Model_Code'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      label: i18n.t('insert.customer.Model_Location_Description1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDetail',
      label: i18n.t('insert.customer.Model_AddressDescription'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'PhoneNumber1',
      label: i18n.t('insert.customer.Model_PhoneNumber1'),
      required: true,
      visible: true,
      isUnique: false,
      maxLength: 10,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp2',
      label: i18n.t('insert.customer.Model_Genexp2'),
      required: false,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'FaxNumber',
      label: i18n.t('insert.customer.Model_FaxNumber'),
      required: false,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDescription',
      label: i18n.t('insert.customer.Model_AddressDetail'),
      required: false,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp1',
      label: i18n.t('insert.customer.Model_Genexp1'),
      required: false,
      visible: true,
      isUnique: false,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ContactName',
      label: i18n.t('insert.customer.Model_ContactName'),
      required: false,
      visible: true,
      isUnique: false,
      id: 9
    },
    {
      type: 'Lookup',
      modelProperty: 'CityId',
      objectKey: 'City',
      url: 'CITY',
      label: i18n.t('insert.customer.Model_CityId'),
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
      label: i18n.t('insert.customer.Model_DistrictId'),
      request: JSON.stringify({UpperValue: 'val', LookupTableCode: 'DISTRICT'}),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.CityId
      },
      parentId: 10,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'number',
      isPostCode: true,
      modelProperty: 'PostCode',
      label: i18n.t('insert.customer.Model_PostCode'),
      required: true,
      visible: true,
      isUnique: false,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'XPosition',
      label: i18n.t('insert.customer.Model_XPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'YPosition',
      label: i18n.t('insert.customer.Model_YPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 14
    },
    {
      type: 'Radio',
      modelProperty: 'IsDefaultLocation',
      label: i18n.t('insert.customer.Model_IsDefaultLocation'),
      required: false,
      visible: true,
      isUnique: false,
      id: 15
    },
    {
      type: 'Radio',
      modelProperty: 'IsInvoiceAddress',
      label: i18n.t('insert.customer.Model_IsInvoiceAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 16
    },
    {
      type: 'Radio',
      modelProperty: 'IsDeliveryAddress',
      label: i18n.t('insert.customer.Model_IsDeliveryAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 17
    },
    {
      type: 'Radio',
      modelProperty: 'IsRouteNode',
      label: i18n.t('insert.customer.isRouteNode'),
      required: false,
      visible: true,
      isUnique: false,
      id: 18
    }
  ],
  customerCreditHistoriesItems: [
    {
      type: 'Lookup',
      modelProperty: 'CreditDescriptionId',
      objectKey: 'CreditDescription',
      url: 'CREDIT_DESCRIPTION',
      label: i18n.t('insert.customer.Model_CreditDescriptionId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      modelProperty: 'CreditDescriptionCode',
      parentProperty: 'Code',
      required: false,
      visible: false,
      hideOnTable: true,
      id: 2,
      parentId: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditAmount',
      label: i18n.t('insert.customer.Model_CreditAmount'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'currency',
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.customer.Model_CurrencyId'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditLimit',
      label: i18n.t('insert.customer.Model_CreditLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'RiskLimit',
      label: i18n.t('insert.customer.Model_RiskLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Date',
      modelProperty: 'CreditStartDate',
      label: i18n.t('insert.customer.Model_CreditStartDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Date',
      modelProperty: 'CreditEndDate',
      label: i18n.t('insert.customer.Model_CreditEndDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 8
    },
    {
      type: 'Dropdown',
      modelProperty: 'BankId',
      objectKey: 'Bank',
      url: 'VisionNextBank/api/Bank/Search',
      label: i18n.t('insert.customer.bank'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'BC'
      },
      id: 9
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Debtor',
      label: i18n.t('insert.customer.debtor'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'SN'
      },
      id: 10
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Bail',
      label: i18n.t('insert.customer.bail'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'KF' || form.CreditDescriptionCode !== 'SN'
      },
      id: 11
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'LandOffice',
      label: i18n.t('insert.customer.landOffice'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'IM'
      },
      id: 12
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Plate',
      label: i18n.t('insert.customer.plate'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'IM'
      },
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TraficRegistry',
      label: i18n.t('insert.customer.traficRegistry'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'MV'
      },
      id: 14
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TextNo',
      label: i18n.t('insert.customer.textNo'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'IM'
      },
      id: 15
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'NotaryNo',
      label: i18n.t('insert.customer.notaryNo'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'MV'
      },
      id: 16
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PlateNumber',
      label: i18n.t('insert.customer.plateNumber'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'MV'
      },
      id: 17
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'MortgageValue',
      label: i18n.t('insert.customer.mortgageValue'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return form.CreditDescriptionCode !== 'IM'
      },
      id: 18
    },
    {
      type: 'Date',
      modelProperty: 'TextDate',
      label: i18n.t('insert.customer.textDate'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return !form.BankId || form.BankId === 0
      },
      id: 19
    },
    {
      type: 'Date',
      modelProperty: 'NotaryDate',
      label: i18n.t('insert.customer.notaryDate'),
      required: false,
      visible: true,
      isUnique: false,
      disabled: (form) => {
        return !form.BankId || form.BankId === 0
      },
      id: 20
    },
    {
      type: 'Radio',
      modelProperty: 'AllowOverLimit',
      label: i18n.t('insert.customer.allowOverLimit'),
      required: false,
      visible: true,
      isUnique: false,
      radio: true,
      disabled: (form) => {
        return !form.BankId || form.BankId === 0
      },
      id: 21
    }
  ],
  paymentTypesItems: [
    {
      type: 'Dropdown',
      modelProperty: 'PaymentTypeId',
      objectKey: 'PaymentType',
      url: 'VisionNextCommonApi/api/PaymentType/Search?v=1',
      label: i18n.t('insert.customer.Model_PaymentTypeId'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  customerDiscountsItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.customer.discountCode'),
      orConditionFields: 'Code,Description1',
      customOption: true,
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountPercent1',
      label: i18n.t('insert.customer.Model_DiscountPercent1'),
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountPercent2',
      label: i18n.t('insert.customer.Model_DiscountPercent2'),
      visible: true,
      id: 3
    },
    {
      type: 'Lookup',
      modelProperty: 'TciBreak1Id',
      objectKey: 'TciBreak1',
      label: i18n.t('insert.customer.discountTci1'),
      url: 'TCI_BREAKDOWN',
      visible: true,
      id: 4
    },
    {
      type: 'Lookup',
      modelProperty: 'TciBreak2Id',
      objectKey: 'TciBreak2',
      label: i18n.t('insert.customer.discountTci2'),
      url: 'TCI_BREAKDOWN',
      visible: true,
      id: 5
    }
  ],
  customerLabelItems: [
    {
      type: 'Dropdown',
      modelProperty: 'LabelId',
      objectKey: 'Label',
      url: 'VisionNextCommonApi/api/Label/Search',
      label: i18n.t('insert.customer.labelId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'LabelValueId',
      objectKey: 'LabelValue',
      url: 'VisionNextCommonApi/api/LabelDetail/Search',
      label: i18n.t('insert.customer.labelValueId'),
      required: true,
      visible: true,
      id: 2
    }
  ],
  eCustomerAliasesItems: [
    {
      type: 'Text',
      inputType: 'Text',
      modelProperty: 'CustomerAlias',
      objectKey: 'CustomerAlias',
      label: i18n.t('insert.customer.CustomerAlias'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Radio',
      modelProperty: 'IsDefaultAlias',
      objectKey: 'IsDefaultAlias',
      label: i18n.t('insert.customer.IsDefaultAlias'),
      required: true,
      visible: true,
      isUnique: true,
      id: 2
    }
  ]
}
