export const detailData = {
  relatedCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: 'insert.contract.customer',
      orConditionFields: 'Code,Description1,CommercialTitle',
      customOption: true,
      isCustomer: true,
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  assetItems: [
    {
      type: 'Dropdown',
      modelProperty: 'AssetId',
      objectKey: 'Asset',
      url: 'VisionNextAsset/api/Asset/Search',
      label: 'insert.contract.assetId',
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'PlannedServiceDate',
      label: 'insert.contract.plannedServiceDate',
      required: true,
      visible: true,
      isUnique: true,
      id: 2
    }
  ],
  assetItemsBAT: [
    {
      type: 'Dropdown',
      modelProperty: 'AssetId',
      objectKey: 'Asset',
      url: 'VisionNextAsset/api/Asset/Search',
      label: 'insert.contract.assetId',
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'PlannedServiceDate',
      label: 'insert.contract.plannedServiceDate',
      required: true,
      visible: true,
      id: 2
    }
  ]
}
