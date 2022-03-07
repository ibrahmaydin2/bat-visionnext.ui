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
  ]
}
