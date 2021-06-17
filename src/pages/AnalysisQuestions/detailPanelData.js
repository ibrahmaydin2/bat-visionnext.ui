import i18n from '../../i18n'
export const detailData = {
  customerQuestionChoiceItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      label: i18n.t('insert.AnalysisQuestions.Description1'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ChoiceOrder',
      label: i18n.t('insert.AnalysisQuestions.ChoiceOrder'),
      required: true,
      visible: true,
      isUnique: true,
      id: 2
    },
    {
      type: 'Check',
      modelProperty: 'StatusId',
      label: i18n.t('insert.AnalysisQuestions.StatusId'),
      required: true,
      visible: true,
      id: 3
    }
  ]
}