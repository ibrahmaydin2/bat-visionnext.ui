import i18n from '../../i18n'
export const detailData = {
  serviceOperationsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'Operation',
      objectKey: 'Operation',
      label: i18n.t('insert.assetService.Operation'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'date',
      modelProperty: 'ServiceTime',
      objectKey: 'ServiceTime',
      label: i18n.t('insert.assetService.ServiceTime'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'date',
      modelProperty: 'StartTime',
      objectKey: 'StartTime',
      label: i18n.t('insert.assetService.StartTime'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'date',
      modelProperty: 'EndTime',
      objectKey: 'EndTime',
      label: i18n.t('insert.assetService.EndTime'),
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      modelProperty: 'Genexp1',
      objectKey: 'Genexp1',
      label: i18n.t('insert.assetService.Genexp1'),
      required: true,
      visible: true,
      id: 5
    }
  ]
}
