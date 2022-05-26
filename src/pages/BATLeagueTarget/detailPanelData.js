import i18n from '../../i18n'
export const detailData = {
  opportunityTargetValuesItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TargetQuantity',
      defaultValue: 0,
      objectKey: 'TargetQuantity',
      label: i18n.t('insert.BATLeagueTarget.TargetQuantity'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'TargetUnitId',
      objectKey: 'TargetUnit',
      url: 'ITEM_TYPE',
      label: i18n.t('insert.BATLeagueTarget.TargetUnitId'),
      required: false,
      visible: true,
      id: 2
    },
    {
      type: 'Check',
      modelProperty: 'ReqItemId',
      defaultValue: 0,
      objectKey: 'ReqItem',
      label: i18n.t('insert.BATLeagueTarget.ReqItemId'),
      required: false,
      visible: true,
      id: 3
    }
  ]
}
