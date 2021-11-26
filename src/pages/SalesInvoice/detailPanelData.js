import i18n from '../../i18n'
export const detailData = {
  invoiceDiscountsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'DiscountReasonId',
      objectKey: 'DiscountReason',
      url: 'VisionNextDiscount/api/DiscountReason/Search',
      label: i18n.t('insert.order.DiscountReasonId'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountPercent',
      label: i18n.t('insert.order.DiscountPercent'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TotalDiscount',
      label: i18n.t('insert.order.TotalDiscount'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Dropdown',
      modelProperty: 'LoyaltyId',
      objectKey: 'Loyalty',
      url: 'VisionNextLoyalty/api/LoyaltyCustomer/Get',
      label: i18n.t('insert.order.LoyaltyId'),
      disabled: (form) => {
      },
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Dropdown',
      modelProperty: 'ContractId',
      objectKey: 'Contract',
      url: 'VisionNextContractManagement/api/Contract/Search',
      label: i18n.t('insert.order.ContractId'),
      disabled: (form) => {
      },
      required: false,
      visible: true,
      id: 5
    },
    {
      type: 'Dropdown',
      modelProperty: 'SalesVolumeId',
      objectKey: 'SalesVolume',
      url: '',
      label: i18n.t('insert.order.SalesVolumeId'),
      disabled: (form) => {
      },
      required: false,
      visible: true,
      id: 6
    }
  ],
  invoicePaymentPlansItems: [
    {
      type: 'Date',
      modelProperty: 'PaymentDate',
      label: i18n.t('insert.order.PaymentDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'PaymentPeriod',
      label: i18n.t('insert.order.paymentPeriod'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Amount',
      label: i18n.t('insert.order.amount'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Paid',
      label: i18n.t('insert.order.paid'),
      required: false,
      visible: true,
      isUnique: false,
      id: 4
    }
  ],
  InvoiceLogisticCompaniesItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'CompanyName',
      label: i18n.t('insert.order.CompanyName'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'CityId',
      objectKey: 'City',
      url: 'CITY',
      label: i18n.t('insert.order.cityId'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'DistrictId',
      labelProperty: 'Label',
      objectKey: 'District',
      parentProperty: 'DecimalValue',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue',
      label: i18n.t('insert.order.districtId'),
      request: JSON.stringify({UpperValue: 'val', LookupTableCode: 'DISTRICT'}),
      required: true,
      visible: true,
      parentId: 2,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Taxnumber',
      label: i18n.t('insert.order.taxnumber'),
      required: false,
      visible: true,
      isUnique: false,
      id: 4
    }
  ]
}
