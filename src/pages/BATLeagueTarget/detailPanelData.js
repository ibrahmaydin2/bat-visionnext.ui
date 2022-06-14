import i18n from '../../i18n'
export const detailData = {
  opportunityTargetValuesItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      labelProperty: 'Description1',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextItem/api/Item/AutoCompleteSearch',
      label: i18n.t('insert.bcp.Item'),
      required: (form) => {
        return !form.TargetUnitId
      },
      visible: true,
      isUnique: true,
      disabled: (form) => {
        return form.TargetUnitId != null || form.ReqItemId === 1
      },
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TargetQuantity',
      defaultValue: 0,
      objectKey: 'TargetQuantity',
      label: i18n.t('insert.BATLeagueTarget.TargetQuantity'),
      // required: true,
      required: (form) => {
        return form.ItemId !== null || form.TargetUnitId !== null
      },
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'TargetUnitId',
      objectKey: 'TargetUnit',
      url: 'ITEM_TYPE',
      label: i18n.t('insert.BATLeagueTarget.TargetUnitId'),
      required: false,
      visible: true,
      isUnique: true,
      disabled: (form) => {
        return form.ItemId != null || form.ReqItemId === 1
      },
      id: 3
    },
    {
      type: 'Check',
      modelProperty: 'ReqItemId',
      defaultValue: 0,
      objectKey: 'ReqItem',
      label: i18n.t('insert.BATLeagueTarget.ReqItemId'),
      required: false,
      visible: true,
      isUnique: true,
      disabled: (form) => {
        return form.ItemId != null || form.TargetUnitId != null
      },
      id: 4
    }
  ]
}
