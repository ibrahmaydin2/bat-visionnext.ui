import i18n from '../../i18n'
export const detailData = {
  salesMaximumQuantityCustomersItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      label: i18n.t('insert.SalesMaxQuantity.Code'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      customOption: true,
      isCustomer: true,
      dynamicAndCondition: { StatusIds: [1] },
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.route.CustomerId'),
      hideOnTable: true,
      required: true,
      visible: true,
      isUnique: true,
      id: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerCode',
      parentProperty: 'Code',
      disabled: true,
      label: i18n.t('insert.route.CustomerId'),
      id: 3,
      parentId: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerName',
      parentProperty: 'Description1',
      objectKey: 'Customer',
      disabled: true,
      label: i18n.t('insert.route.CustomerName'),
      id: 3,
      parentId: 2
    },
    {
      type: 'NumberDotOrComma',
      inputType: 'text',
      modelProperty: 'Quantity',
      label: i18n.t('insert.SalesMaxQuantity.Quantity'),
      required: true,
      visible: true,
      id: 4,
      validation: (value, data) => {
        let normalizedValue = String(value).replace(',', '.');
        let numberValue = parseFloat(normalizedValue);
        return numberValue > 0
      },
    },
    {
      type: 'Check',
      modelProperty: 'IsTotalQuantity',
      label: 'Üst Limitleme Yöntemi',
      required: false,
      visible: true,
      isUnique: false,
      id: 5
    },
  ]
}
