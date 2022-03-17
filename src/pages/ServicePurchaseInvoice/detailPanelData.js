import i18n from '../../i18n'
export const detailData = {
  itemFields: [
    {
      key: 'ItemName',
      label: 'insert.order.product',
      formatter (value, key, obj) {
        return obj.Item ? obj.Item.Label : obj.ItemName
      }
    },
    {
      key: 'ItemCode',
      label: 'insert.order.productCode',
      formatter (value, key, obj) {
        return obj.Item ? obj.Item.Code : obj.ItemCode
      }
    },
    {
      key: 'Description1',
      label: 'insert.order.description1'
    },
    {
      key: 'Quantity',
      label: 'insert.order.quantity'
    },
    {
      key: 'Price',
      label: 'insert.order.price'
    },
    {
      key: 'VatRate',
      label: 'insert.order.vatRate'
    },
    {
      key: 'NetTotal',
      label: 'insert.order.netTotal'
    },
    {
      key: 'TotalVat',
      label: 'insert.order.vatTotal'
    },
    {
      key: 'GrossTotal',
      label: 'insert.order.grossTotal'
    },
    {
      key: 'operations',
      label: 'list.operations'
    }
  ],
  discountFields: [
    {
      key: 'DiscountReasonName',
      label: 'insert.order.discountReason',
      formatter (value, key, obj) {
        return obj.DiscountReason ? obj.DiscountReason.Label : obj.DiscountReasonName
      }
    },
    {
      key: 'DiscountPercent',
      label: 'insert.order.discountPercent'
    },
    {
      key: 'TotalDiscount',
      label: 'insert.order.totalDiscount'
    },
    {
      key: 'operations',
      label: 'list.operations'
    }
  ],
  grantProductItems: [
    {
      type: 'Dropdown',
      modelProperty: 'GrantInvoice',
      objectKey: 'GrantInvoice',
      url: 'VisionNextInvoice/api/ServicePurchaseInvoice/SearchGrantInvoice',
      label: i18n.t('insert.order.GrantInvoice'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'InvoiceTotal',
      label: i18n.t('insert.order.InvoiceTotal'),
      required: true,
      visible: true,
      id: 2
    }
  ],
  turnoverPremiumItems: [
    {
      type: 'Dropdown',
      modelProperty: 'EndorsementBonus',
      objectKey: 'EndorsementBonus',
      labelProperty: 'Prim',
      url: 'VisionNextContractManagement/api/ContractEndorsement/SearchEndorsement',
      dynamicRequest: {ContractTypeId: 65000, customerId: 1665253416},
      label: i18n.t('insert.order.EndorsementBonus'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'number',
      parentProperty: 'RemainderTotal',
      modelProperty: 'Label',
      objectKey: 'EndorsementBonus',
      label: i18n.t('insert.itemAnalysis.itemName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    }
  ],
  contractCashItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ContractCash',
      objectKey: 'ContractCash',
      url: 'VisionNextContractManagement/api/Contract/SearchPaymentPlan',
      dynamicRequest: {DocumentDate: '05.03.2023 00:00:00', customerId: 1665253416},
      label: i18n.t('insert.order.ContractCash'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ContractCashGiven',
      label: i18n.t('insert.order.ContractCashGiven'),
      required: true,
      visible: true,
      id: 2
    }
  ],
  serviceInvoiceItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ServiceInvoice',
      objectKey: 'ServiceInvoice',
      url: '',
      label: i18n.t('insert.order.ServiceInvoice'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AmountUsedService',
      label: i18n.t('insert.order.AmountUsedService'),
      required: true,
      visible: true,
      id: 2
    }
  ],
  tprItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextContractManagement/api/Contract/SearchTempPriceRed',
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
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TprRedPriceUsedAmount',
      label: i18n.t('insert.order.TprRedPriceUsedAmount'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'EarnedTotal',
      label: i18n.t('insert.order.EarnedTotal'),
      required: true,
      visible: true,
      id: 4
    }
  ]
}
