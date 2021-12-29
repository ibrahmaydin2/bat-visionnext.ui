import i18n from '../../i18n'
export const detailData = {
  loyaltyGainDetailFields: [
    {
      key: 'ActiveCategoryId',
      label: i18n.t('insert.loyaltyGain.category'),
      formatter: (value, key, obj) => {
        if (obj.ActiveCategory && obj.ActiveCategory.Label) {
          return obj.ActiveCategory.Label
        } else {
          return obj.Description1 ? obj.Description1 : '-'
        }
      }
    },
    {
      key: 'Description',
      label: i18n.t('insert.loyaltyGain.description'),
      formatter: (value, key, obj) => {
        return obj.Genexp1 ? obj.Genexp1 : obj.Genexp ? obj.Genexp : '-'
      }
    },
    {
      key: 'Value',
      label: i18n.t('insert.loyaltyGain.value')
    }
  ]
}
