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
      label: i18n.t('insert.SalesMaxQuantity.CustomerId'),
      required: true,
      visible: true,
      isUnique: true,
      id: 2
    },
    {
      type: 'NumberDotOrComma',
      inputType: 'text',
      modelProperty: 'Quantity',
      label: i18n.t('insert.SalesMaxQuantity.Quantity'),
      required: true,
      visible: true,
      id: 3,
      validation: (value, data) => {
        let normalizedValue = String(value).replace(',', '.');
        let numberValue = parseFloat(normalizedValue);
        return numberValue > 0
      },
    }
  ]
}
