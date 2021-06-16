import i18n from '../../i18n'
export const detailData = {
  loyaltyGainDetailFields: [
    {
      key: 'ActiveCategoryId',
      label: i18n.t('insert.loyaltyGain.category'),
      formatter: (value, key, obj) => {
        return obj.ActiveCategory ? obj.ActiveCategory.Label : '-'
      }
    },
    {
      key: 'Description',
      label: i18n.t('insert.loyaltyGain.description'),
      formatter: (value, key, obj) => {
        return obj.Genexp1 ? obj.Genexp1 : '-'
      }
    },
    {
      key: 'Value',
      label: i18n.t('insert.loyaltyGain.value')
    }
  ]
}
