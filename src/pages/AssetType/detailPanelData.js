import i18n from '../../i18n'
export const detailData = {
  assetTypePropertiesItems: [
    {
      type: 'Dropdown',
      modelProperty: 'PropertyId',
      objectKey: 'Property',
      url: 'VisionNextAsset/api/AssetType/Search',
      label: i18n.t('insert.AssetType.PropertyId'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  assetEmployeeTypesItems: [
    {
      type: 'Lookup',
      modelProperty: 'EmployeeTypeId',
      objectKey: 'EmployeeType',
      url: 'EMPLOYEE_TYPE',
      label: i18n.t('insert.AssetType.EmployeeTypeId'),
      required: true,
      visible: true,
      id: 1
    }
  ]
}
