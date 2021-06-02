import i18n from '../../i18n'
export const detailData = {
  taskItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      parentProperty: null,
      url: null,
      label: i18n.t('get.CycleInstruction.TaskCode'),
      hideOnTable: false,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      parentProperty: null,
      url: null,
      label: i18n.t('get.CycleInstruction.TaskDescription1'),
      hideOnTable: false,
      isUnique: false,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'TaskStateId',
      objectKey: 'TaskState',
      label: i18n.t('get.CycleInstruction.TaskStatus'),
      hideOnTable: false,
      isUnique: false,
      id: 3
    }
  ]
}
