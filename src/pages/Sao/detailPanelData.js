import i18n from '../../i18n'
export const detailData = {
  soaDetailItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      customOption: true,
      orConditionFields: 'Code,Description1',
      dynamicAndCondition: { StatusIds: [1] },
      url: 'VisionNextItem/api/Item/Search',
      label: i18n.t('insert.sao.item'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'MinCardBoardPurchase',
      visible: true,
      required: true,
      label: i18n.t('insert.sao.minCardBoardPurchase'),
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'DiscountKindId',
      objectKey: 'DiscountKind',
      url: 'VisionNextDiscount/api/DiscountKind/Search',
      label: i18n.t('insert.sao.discountKind'),
      dynamicAndCondition: { RecordIds: [1, 2], StatusIds: [1] },
      visible: true,
      required: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountRate',
      visible: true,
      label: i18n.t('insert.sao.discountRate'),
      disabled: (form) => {
        return form.DiscountKindId === 2
      },
      required: (form) => {
        return form.DiscountKindId === 1
      },
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'NumberOfVisit',
      visible: true,
      required: true,
      label: i18n.t('insert.sao.numberOfVisit'),
      maxLength: 4,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'MinNumPurchasesCampaign',
      visible: true,
      required: true,
      label: i18n.t('insert.sao.minNumPurchasesCampaign'),
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ItemPriorityOrder',
      visible: true,
      required: true,
      label: i18n.t('insert.sao.itemPriorityOrder'),
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountAmount',
      visible: true,
      label: i18n.t('insert.sao.discountAmount'),
      disabled: (form) => {
        return form.DiscountKindId === 1
      },
      required: (form) => {
        return form.DiscountKindId === 2
      },
      id: 8
    }
  ]
}
