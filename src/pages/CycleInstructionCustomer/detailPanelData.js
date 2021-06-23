import i18n from '../../i18n'
export const detailData = {
  taskItems: [
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Code',
      objectKey: 'CycleInstructionTask',
      label: i18n.t('get.CycleInstruction.TaskCode'),
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Label',
      objectKey: 'CycleInstructionTask',
      label: i18n.t('get.CycleInstruction.TaskDescription1'),
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'TaskStateId',
      objectKey: 'TaskState',
      label: i18n.t('get.CycleInstruction.TaskStatus'),
      id: 3
    }
  ]
}
