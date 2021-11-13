import i18n from '../../i18n'
export const detailData = {
  discountPackageDetailsItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'DiscountId',
      objectKey: 'Discount',
      url: 'VisionNextDiscount/api/Discount/SearchForNonBranch',
      label: i18n.t('insert.discountPackage.DiscountId'),
      required: true,
      visible: true,
      isUnique: true,
      pagerecordCount: 20,
      dynamicRequest: {
        andConditionModel: {
          DiscountEndDate: {
            BeginValue: new Date().toISOString()
          }
        },
        OrderByColumns: [
          {
            column: 'CreatedDateTime',
            orderByType: 1
          }
        ]
      },
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Score',
      objectKey: 'Score',
      label: i18n.t('insert.discountPackage.Score'),
      required: true,
      visible: true,
      id: 2
    }
  ]

}
