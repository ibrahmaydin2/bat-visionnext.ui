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
      inputType: 'text',
      modelProperty: 'PhoneNumber1',
      label: i18n.t('insert.customer.Model_PhoneNumber1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp2',
      label: i18n.t('insert.customer.Model_Genexp2'),
      required: true,
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
      parentId: 10,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'XPosition',
      label: i18n.t('insert.customer.Model_XPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'YPosition',
      label: i18n.t('insert.customer.Model_YPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Alias',
      label: i18n.t('insert.customer.Model_Alias'),
      required: false,
      visible: true,
      isUnique: false,
      id: 14
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDefaultLocation',
      label: i18n.t('insert.customer.Model_IsDefaultLocation'),
      required: false,
      visible: true,
      isUnique: false,
      id: 15
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsInvoiceAddress',
      label: i18n.t('insert.customer.Model_IsInvoiceAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 16
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDeliveryAddress',
      label: i18n.t('insert.customer.Model_IsDeliveryAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 17
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsRouteNode',
      label: i18n.t('insert.customer.isRouteNode'),
      required: false,
      visible: true,
      isUnique: false,
      id: 18
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
      id: 19
    }
  ],
  customerCreditHistoriesItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditAmount',
      label: i18n.t('insert.customer.Model_CreditAmount'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'CreditDescriptionId',
      objectKey: 'CreditDescription',
      url: 'CREDIT_DESCRIPTION',
      label: i18n.t('insert.customer.Model_CreditDescriptionId'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'currency',
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.customer.Model_CurrencyId'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditLimit',
      label: i18n.t('insert.customer.Model_CreditLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'RiskLimit',
      label: i18n.t('insert.customer.Model_RiskLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Date',
      modelProperty: 'CreditStartDate',
      label: i18n.t('insert.customer.Model_CreditStartDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Date',
      modelProperty: 'CreditEndDate',
      label: i18n.t('insert.customer.Model_CreditEndDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'AllowOverLimit',
      label: i18n.t('insert.customer.allowOverLimit'),
      required: false,
      visible: true,
      isUnique: false,
      id: 8
    }
  ],
  paymentTypesItems: [
    {
      type: 'Dropdown',
      modelProperty: 'PaymentType',
      objectKey: 'PaymentType',
      labelProperty: 'Description1',
      valueProperty: 'Description1',
      url: 'VisionNextCommonApi/api/PaymentType/Search',
      label: i18n.t('insert.customer.Model_PaymentTypeId'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  customerDiscountsItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'discountPercent1',
      label: i18n.t('insert.customer.DiscountPercent1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'discountPercent2',
      label: i18n.t('insert.customer.DiscountPercent2'),
      required: true,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Date',
      modelProperty: 'startDate',
      label: i18n.t('insert.customer.StartDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Date',
      modelProperty: 'endDate',
      label: i18n.t('insert.customer.EndDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 4
    }
  ]
}
