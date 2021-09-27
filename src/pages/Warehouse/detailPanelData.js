import i18n from '../../i18n'
export const detailData = {
  locationItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'SupplierBranchId',
      objectKey: 'SupplierBranch',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.warehouse.SupplierBranchId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'PurchaseWarehouseId',
      parentProperty: 'RecordId',
      objectKey: 'PurchaseWarehouse',
      url: 'VisionNextWarehouse/api/Warehouse/SearchWithSelectedBranch?v=1',
      request: JSON.stringify({andConditionModel: { BranchId: 'val' }}),
      label: i18n.t('insert.warehouse.PurchaseWarehouseId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.SupplierBranchId
      },
      parentId: 1,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'ReturnWarehouseId',
      parentProperty: 'RecordId',
      objectKey: 'ReturnWarehouse',
      url: 'VisionNextWarehouse/api/Warehouse/SearchWithSelectedBranch?v=2',
      request: JSON.stringify({andConditionModel: { BranchId: 'val' }}),
      label: i18n.t('insert.warehouse.ReturnWarehouseId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.SupplierBranchId
      },
      parentId: 1,
      id: 3
    }
  ]
}
