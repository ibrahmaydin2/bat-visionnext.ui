export const detailData = {
  itemFields: [
    {
      key: 'ItemName',
      label: 'insert.order.product',
      formatter (value, key, obj) {
        return obj.Item ? obj.Item.Label : obj.ItemName
      }
    },
    {
      key: 'ItemCode',
      label: 'insert.order.productCode',
      formatter (value, key, obj) {
        return obj.Item ? obj.Item.Code : obj.ItemCode
      }
    },
    {
      key: 'Description1',
      label: 'insert.order.description1'
    },
    {
      key: 'Quantity',
      label: 'insert.order.quantity'
    },
    {
      key: 'Price',
      label: 'insert.order.price'
    },
    {
      key: 'VatRate',
      label: 'insert.order.vatRate'
    },
    {
      key: 'NetTotal',
      label: 'insert.order.netTotal'
    },
    {
      key: 'TotalVat',
      label: 'insert.order.vatTotal'
    },
    {
      key: 'GrossTotal',
      label: 'insert.order.grossTotal'
    },
    {
      key: 'operations',
      label: 'list.operations'
    }
  ],
  discountFields: [
    {
      key: 'DiscountReasonName',
      label: 'insert.order.discountReason',
      formatter (value, key, obj) {
        return obj.DiscountReason ? obj.DiscountReason.Label : obj.DiscountReasonName
      }
    },
    {
      key: 'DiscountPercent',
      label: 'insert.order.discountPercent'
    },
    {
      key: 'TotalDiscount',
      label: 'insert.order.totalDiscount'
    },
    {
      key: 'operations',
      label: 'list.operations'
    }
  ]
}
