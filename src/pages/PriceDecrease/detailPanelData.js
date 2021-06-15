import i18n from '../../i18n'
export const detailData = {
  priceDecreaseItemFields: [
    {
      key: 'ItemIdCode',
      label: i18n.t('insert.priceDecrease.itemCode'),
      formatter: (value, key, obj) => {
        return obj.Item ? obj.Item.Code : value
      }
    },
    {
      key: 'ItemIdDesc',
      label: i18n.t('insert.priceDecrease.itemName'),
      formatter: (value, key, obj) => {
        return obj.Item ? obj.Item.Label : value
      }
    },
    {
      key: 'CurrentSalesPrice',
      label: i18n.t('insert.priceDecrease.listPrice')
    },
    {
      key: 'NewSalesPrice',
      label: i18n.t('insert.priceDecrease.newSalesPrice')
    },
    {
      key: 'Decrease',
      label: i18n.t('insert.priceDecrease.decreasePrice')
    },
    {
      key: 'operations',
      label: i18n.t('list.operations')
    }
  ]
}
