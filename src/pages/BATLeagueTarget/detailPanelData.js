import i18n from '../../i18n'
export const detailData = {
  opportunityTargetValuesItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      customOption: true,
      isCustomer: true,
      dynamicAndCondition: { StatusIds: [1] },
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.BATLeagueTarget.CustomerId'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TargetQuantity',
      defaultValue: 0,
      objectKey: 'TargetQuantity',
      label: i18n.t('insert.BATLeagueTarget.TargetQuantity'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'TargetUnitId',
      objectKey: 'TargetUnit',
      url: '',
      label: i18n.t('insert.BATLeagueTarget.TargetUnitId'),
      required: false,
      visible: true,
      id: 3
    },
    {
      type: 'Dropdown',
      modelProperty: 'ReqItemId',
      defaultValue: 0,
      objectKey: 'ReqItem',
      url: '',
      label: i18n.t('insert.BATLeagueTarget.ReqItemId'),
      required: false,
      visible: true,
      id: 4
    }
  ]
}
