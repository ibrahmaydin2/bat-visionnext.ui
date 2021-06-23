import i18n from '../../i18n'
export const detailData = {
  loyaltyCatalogueItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      visible: true,
      required: true,
      isUnique: true,
      disabled: true,
      label: i18n.t('insert.loyalty.catalogueCode'),
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      visible: true,
      required: true,
      label: i18n.t('insert.loyalty.catalogueDescription'),
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Value',
      visible: true,
      required: true,
      label: i18n.t('insert.loyalty.pointValue'),
      id: 3
    },
    {
      type: 'Check',
      modelProperty: 'IsFreeItem',
      visible: true,
      label: i18n.t('insert.loyalty.isFreeItem'),
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'FreeItemQuantity',
      visible: true,
      required: (form) => {
        return form.IsFreeItem === 1
      },
      disabled: (form) => {
        return form.IsFreeItem !== 1
      },
      label: i18n.t('insert.loyalty.quantity'),
      id: 5
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      filter: (item) => {
        return item.Code === 'RECORD_ID'
      },
      label: i18n.t('insert.loyalty.areaDesc'),
      visible: true,
      required: (form) => {
        return form.IsFreeItem === 1
      },
      disabled: (form) => {
        return form.IsFreeItem !== 1
      },
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
      id: 6
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.loyalty.areaValue'),
      visible: true,
      required: (form) => {
        return form.IsFreeItem === 1
      },
      disabled: (form) => {
        return form.IsFreeItem !== 1
      },
      parentId: 6,
      id: 7
    },
    {
      type: 'Check',
      modelProperty: 'IsDiscount',
      visible: true,
      label: i18n.t('insert.loyalty.isDiscount'),
      id: 8
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountAmount',
      visible: true,
      required: (form) => {
        return form.IsDiscount === 1
      },
      disabled: (form) => {
        return form.IsDiscount !== 1
      },
      label: i18n.t('insert.loyalty.discountAmount'),
      id: 9
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'Currency',
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.loyalty.currency'),
      visible: true,
      required: (form) => {
        return form.IsDiscount === 1
      },
      disabled: (form) => {
        return form.IsDiscount !== 1
      },
      id: 10
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ITEM',
      id: 11
    },
    {
      type: 'Check',
      modelProperty: 'StatusId',
      defaultValue: 1,
      visible: true,
      label: i18n.t('insert.loyalty.status'),
      id: 4
    }
  ],
  loyaltyCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.loyalty.customerCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CommercialTitle',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.loyalty.customerName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'Location',
      valueProperty: 'AddressDetail',
      objectKey: 'ColumnValueDesc2',
      parentProperty: 'DefaultLocationId',
      url: 'VisionNextCustomer/api/CustomerLocation/Get',
      label: i18n.t('insert.customerSItemCriteria.location'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 5
    }
  ],
  loyaltyBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.loyalty.branchCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'BranchName',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.loyalty.branchName'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      hideOnTable: true,
      defaultValue: 'BRANCH_ID',
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 5
    }
  ],
  loyaltyCustomerCriteriaItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=2',
      label: i18n.t('insert.loyalty.areaDesc'),
      required: true,
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'CUSTOMER_CRITERIA'},
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.loyalty.areaValue'),
      required: true,
      visible: true,
      isUnique: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 3
    }
  ],
  loyaltyCustomerSqlItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CustomerSqlId',
      objectKey: 'CustomerSql',
      url: 'VisionNextSystem/api/SysCustomerSql/Search?v=1',
      label: i18n.t('insert.loyalty.customerQuery'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  loyaltyActiveCategoryFields: [
    {
      key: 'LoyaltyCategoryIdDesc',
      label: i18n.t('insert.loyalty.categoryDefinition'),
      formatter: (value, key, obj) => {
        return obj.LoyaltyCategory ? obj.LoyaltyCategory.Label : value
      }
    },
    {
      key: 'DatePlanTypeIdDesc',
      label: i18n.t('insert.loyalty.datePlanType'),
      formatter: (value, key, obj) => {
        return obj.DatePlanType ? obj.DatePlanType.Label : value
      }
    },
    {
      key: 'DatePlanFreq',
      label: i18n.t('insert.loyalty.datePlanFreq')
    },
    {
      key: 'CustomerCriteriaIdDesc',
      label: i18n.t('insert.loyalty.customerCriteria'),
      formatter: (value, key, obj) => {
        return obj.CustomerCriteria ? obj.CustomerCriteria.Label : value
      }
    },
    {
      key: 'Genexp1',
      label: i18n.t('insert.loyalty.description')
    },
    {
      key: 'operations',
      label: i18n.t('list.operations')
    }
  ],
  loyaltyActiveCtCritItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=3',
      label: i18n.t('insert.loyalty.areaDesc'),
      required: true,
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'CUSTOMER_CRITERIA'},
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.loyalty.customerType'),
      required: true,
      visible: true,
      isUnique: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      id: 3
    }
  ],
  loyaltyActiveCtSqlItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CustomerSqlId',
      objectKey: 'CustomerSql',
      url: 'VisionNextSystem/api/SysCustomerSql/Search?v=2',
      label: i18n.t('insert.loyalty.customerQuery'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  loyaltyActiveCtDateItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'OrderNumber',
      isUnique: true,
      required: true,
      visible: true,
      label: i18n.t('insert.loyalty.orderNumber'),
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'CategoryDate',
      isUnique: true,
      required: true,
      visible: true,
      label: i18n.t('insert.loyalty.categoryDate'),
      id: 2
    }
  ]
}
