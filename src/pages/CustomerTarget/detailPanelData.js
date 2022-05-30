import i18n from '../../i18n'
export const detailData = {
  customerTargetDetailsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      customOption: true,
      isCustomer: true,
      dynamicAndCondition: { StatusIds: [1] },
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.CustomerTarget.CustomerId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TargetQuantity',
      objectKey: 'TargetQuantity',
      label: i18n.t('insert.CustomerTarget.TargetQuantity'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'TargetUnitId',
      objectKey: 'TargetUnit',
      url: 'ITEM_TYPE',
      label: i18n.t('insert.CustomerTarget.TargetUnitId'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Dropdown',
      modelProperty: 'ReqItemId',
      objectKey: 'ReqItem',
      url: '/VisionNextItem/api/Item/Search',
      label: i18n.t('insert.CustomerTarget.ReqItemId'),
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ReqItemQuantity',
      objectKey: 'ReqItemQuantity',
      label: i18n.t('insert.CustomerTarget.ReqItemQuantity'),
      required: false,
      visible: true,
      id: 5
    },
    {
      type: 'Text',
      modelProperty: 'DescriptionReqItem',
      objectKey: 'DescriptionReqItem',
      label: i18n.t('insert.CustomerTarget.DescriptionReqItem'),
      required: false,
      visible: true,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'GainAmount',
      objectKey: 'GainAmount',
      label: i18n.t('insert.CustomerTarget.GainAmount'),
      required: true,
      visible: true,
      id: 7
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'Currency',
      defaultValue: 1,
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.CustomerTarget.currencyId'),
      required: true,
      visible: true,
      id: 8
    }
  ],
  customerTargetDatesItems: [
    {
      type: 'Date',
      modelProperty: 'BeginDate',
      label: i18n.t('insert.CustomerTarget.beginDate'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'EndDate',
      label: i18n.t('insert.CustomerTarget.endDate'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Date',
      modelProperty: 'BenefitEndDate',
      label: i18n.t('insert.CustomerTarget.BenefitEndDate'),
      required: true,
      visible: true,
      id: 3
    }
  ]
}
