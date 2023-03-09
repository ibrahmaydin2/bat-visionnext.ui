export const detailData = {
  opponentAssetsItem: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      label: 'insert.customer.Model_Code',
      required: false,
      visible: false,
      isUnique: false,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'OpponentAssetTypeId',
      objectKey: 'OpponentAssetType',
      url: 'OPPONENT_ASSET_TYPE',
      label: 'insert.customer.OpponentAssetType',
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'BrandId',
      objectKey: 'Brand',
      url: 'ITEM_TYPE',
      label: 'insert.customer.BrandId',
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      label: 'insert.contract.description1',
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'investmentTotal',
      label: 'insert.contract.investmentTotal',
      required: true,
      visible: true,
      id: 5
    },
    {
      type: 'Checkbox',
      modelProperty: 'isAvailable',
      label: 'insert.contract.isAvailable',
      required: false,
      visible: false,
      defaultValue: 1,
      id: 6
    }
  ],
  otherDetailsItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      label: 'insert.customer.Model_Code',
      required: false,
      visible: false,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'FurnitureExpense',
      label: 'insert.contract.furnitureExpense',
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ShelfQuantity',
      label: 'insert.contract.shelfQuantity',
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ShelfExpense',
      label: 'insert.contract.shelfExpense',
      required: true,
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'TotalExpense',
      label: 'insert.contract.totalExpense',
      required: true,
      visible: true,
      id: 5
    },
    {
      type: 'Text',
      modelProperty: 'Description1',
      label: 'insert.contract.description1',
      required: false,
      visible: true,
      isUnique: false,
      id: 6
    }
  ],
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
