import i18n from '../../i18n'
export const detailData = {
  assetOperationDetailsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'AssetId',
      objectKey: 'Asset',
      url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.AssetOperation.AssetId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Check',
      modelProperty: 'IsAssetMandatory',
      objectKey: 'IsAssetMandatory',
      label: i18n.t('insert.AssetOperation.IsAssetMandatory'),
      required: true,
      visible: true,
      id: 2
    }
  ]
}
