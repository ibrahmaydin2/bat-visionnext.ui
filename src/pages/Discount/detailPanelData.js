import i18n from '../../i18n'
export const detailData = {
  discountTakenItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.discount.columnName'),
      required: true,
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
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
      label: i18n.t('insert.discount.columnValue'),
      disabled (form, mainForm) {
        return !form.ColumnName
      },
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
      defaultValue: 'T_ITEM',
      id: 3
    },
    // {
    //   type: 'Text',
    //   inputType: 'number',
    //   modelProperty: 'TakenQuantity',
    //   label: i18n.t('insert.discount.takenQuantity'),
    //   disabled (form, mainForm) {
    //     return mainForm.DiscountKindId !== 6
    //   },
    //   required (form, mainForm) {
    //     return mainForm.DiscountKindId === 6
    //   },
    //   visible: true,
    //   id: 4
    // },
    // {
    //   type: 'Text',
    //   inputType: 'number',
    //   modelProperty: 'SharePercent',
    //   label: i18n.t('insert.discount.sharePercent'),
    //   disabled (form, mainForm) {
    //     return mainForm.DiscountKindId !== 6
    //   },
    //   required (form, mainForm) {
    //     return mainForm.DiscountKindId === 6
    //   },
    //   visible: true,
    //   id: 6
    // },
    // {
    //   type: 'Text',
    //   inputType: 'number',
    //   modelProperty: 'MaxTakenAmount',
    //   label: i18n.t('insert.discount.maxTakenAmount'),
    //   disabled (form, mainForm) {
    //     return mainForm.DiscountKindId !== 7 && mainForm.DiscountKindId !== 8
    //   },
    //   required (form, mainForm) {
    //     return mainForm.DiscountKindId === 7 || mainForm.DiscountKindId === 8
    //   },
    //   visible: true,
    //   id: 5
    // },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'MinTakenAmount',
      label: i18n.t('insert.discount.minTakenAmount'),
      disabled: false,
      required: false,
      visible: true,
      id: 4
    }
  ],
  discountGivenItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=2',
      label: i18n.t('insert.discount.columnName'),
      disabled (form, mainForm) {
        return mainForm.DiscountKindId !== 7 && mainForm.DiscountKindId !== 8
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId === 7 || mainForm.DiscountKindId === 8
      },
      visible: true,
      isUnique: true,
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
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
      label: i18n.t('insert.discount.columnValue'),
      disabled (form, mainForm) {
        return (mainForm.DiscountKindId !== 7 && mainForm.DiscountKindId !== 8) || !form.ColumnName
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId === 7 || mainForm.DiscountKindId === 8
      },
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
      defaultValue: 'T_ITEM',
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'GivenQuantity',
      label: i18n.t('insert.discount.takenQuantity'),
      disabled (form, mainForm) {
        return mainForm.DiscountTypeId !== 1
      },
      required (form, mainForm) {
        return mainForm.DiscountTypeId === 1
      },
      visible: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountRate',
      label: i18n.t('insert.discount.discountRate'),
      disabled (form, mainForm) {
        return mainForm.DiscountKindId !== 1 && mainForm.DiscountKindId !== 7
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId === 1 || mainForm.DiscountKindId === 7
      },
      visible: true,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DiscountTotal',
      label: i18n.t('insert.discount.discountTotal'),
      disabled (form, mainForm) {
        return mainForm.DiscountKindId !== 2 && mainForm.DiscountKindId !== 8
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId === 2 || mainForm.DiscountKindId === 8
      },
      visible: true,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'StartValue',
      label: i18n.t('insert.discount.startValue'),
      disabled (form, mainForm) {
        return !mainForm.DiscountKindId || mainForm.DiscountKindId === 6
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId && mainForm.DiscountKindId !== 6
      },
      visible: true,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'FinishValue',
      label: i18n.t('insert.discount.finishValue'),
      disabled (form, mainForm) {
        return !mainForm.DiscountKindId || mainForm.DiscountKindId === 6
      },
      required (form, mainForm) {
        return mainForm.DiscountKindId && mainForm.DiscountKindId !== 6
      },
      visible: true,
      id: 8
    }
  ],
  discountCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch',
      label: 'insert.discount.customerCode',
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
      label: 'insert.discount.customerName',
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
      label: 'insert.discount.location',
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_CUSTOMER',
      parentId: null,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 5
    }
  ],
  discountExcludedCustomerItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.discount.customerCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CommercialTitle',
      objectKey: 'Customer',
      parentProperty: 'Description1',
      label: i18n.t('insert.discount.customerName'),
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
      objectKey: 'Customer',
      parentProperty: 'DefaultLocationId',
      url: 'VisionNextCustomer/api/CustomerLocation/Get',
      label: i18n.t('insert.discount.location'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 3
    }
  ],
  discountDetailsCustomerCriteriaItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=3',
      label: i18n.t('insert.discount.columnName'),
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
      label: i18n.t('insert.discount.columnValue'),
      disabled (form, mainForm) {
        return !form.ColumnName
      },
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
  discountDetailsBranchItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.discount.branchCode'),
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
      label: i18n.t('insert.discount.branchName'),
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
  discountDetailsRouteItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Code',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextRoute/api/Route/AutoCompleteSearch',
      dynamicAndCondition: { StatusIds: [1] },
      pageCount: 500,
      label: i18n.t('insert.discount.routeCode'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'RouteName',
      objectKey: 'ColumnValueDesc',
      parentProperty: 'Description1',
      label: i18n.t('insert.discount.routeCode'),
      visible: true,
      disabled: true,
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_ROUTE',
      parentId: null,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 4
    }
  ],
  discountDetailsPaymentTypeItems: [
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      objectKey: 'ColumnNameDesc',
      labelProperty: 'Description1',
      customOption: true,
      orConditionFields: 'Code,Description1',
      url: 'VisionNextCommonApi/api/PaymentType/Search',
      label: i18n.t('insert.discount.paymentType'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TableName',
      hideOnTable: true,
      defaultValue: 'T_PAYMENT_TYPE',
      parentId: null,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ColumnName',
      parentProperty: null,
      hideOnTable: true,
      defaultValue: 'RECORD_ID',
      parentId: null,
      id: 4
    }
  ],
  discountCustomerSqlItems: [
    {
      type: 'Dropdown',
      modelProperty: 'CustomerSqlId',
      objectKey: 'CustomerSql',
      url: 'VisionNextAdmin/api/SysCustomerSql/Search?v=1',
      label: i18n.t('insert.discount.customerSql'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ]
}
