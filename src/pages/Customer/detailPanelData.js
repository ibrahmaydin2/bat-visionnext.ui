import i18n from '../../i18n'
export const detailData = {
  locationItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Code',
      createCode: true,
      label: i18n.t('insert.customer.Model_Code'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Description1',
      label: i18n.t('insert.customer.Model_Location_Description1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDetail',
      label: i18n.t('insert.customer.Model_AddressDescription'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PhoneNumber1',
      label: i18n.t('insert.customer.Model_PhoneNumber1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp2',
      label: i18n.t('insert.customer.Model_Genexp2'),
      required: true,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'FaxNumber',
      label: i18n.t('insert.customer.Model_FaxNumber'),
      required: false,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'AddressDescription',
      label: i18n.t('insert.customer.Model_AddressDetail'),
      required: false,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp1',
      label: i18n.t('insert.customer.Model_Genexp1'),
      required: false,
      visible: true,
      isUnique: false,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'ContactName',
      label: i18n.t('insert.customer.Model_ContactName'),
      required: false,
      visible: true,
      isUnique: false,
      id: 9
    },
    {
      type: 'Lookup',
      modelProperty: 'CityId',
      objectKey: 'City',
      url: 'CITY',
      label: i18n.t('insert.customer.Model_CityId'),
      required: true,
      visible: true,
      id: 10
    },
    {
      type: 'Dropdown',
      modelProperty: 'DistrictId',
      labelProperty: 'Label',
      objectKey: 'District',
      parentProperty: 'DecimalValue',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesFromUpperValue',
      label: i18n.t('insert.customer.Model_DistrictId'),
      request: JSON.stringify({UpperValue: 'val', LookupTableCode: 'DISTRICT'}),
      required: true,
      visible: true,
      parentId: 10,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'XPosition',
      label: i18n.t('insert.customer.Model_XPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'YPosition',
      label: i18n.t('insert.customer.Model_YPosition'),
      required: false,
      visible: true,
      isUnique: false,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Alias',
      label: i18n.t('insert.customer.Model_Alias'),
      required: false,
      visible: true,
      isUnique: false,
      id: 14
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDefaultLocation',
      label: i18n.t('insert.customer.Model_IsDefaultLocation'),
      required: false,
      visible: true,
      isUnique: false,
      id: 15
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsInvoiceAddress',
      label: i18n.t('insert.customer.Model_IsInvoiceAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 16
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsDeliveryAddress',
      label: i18n.t('insert.customer.Model_IsDeliveryAddress'),
      required: false,
      visible: true,
      isUnique: false,
      id: 17
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'IsRouteNode',
      label: i18n.t('insert.customer.isRouteNode'),
      required: false,
      visible: true,
      isUnique: false,
      id: 18
    },
    {
      type: 'Text',
      inputType: 'number',
      isPostCode: true,
      modelProperty: 'PostCode',
      label: i18n.t('insert.customer.Model_PostCode'),
      required: true,
      visible: true,
      isUnique: false,
      id: 19
    }
  ],
  customerCreditHistoriesItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditAmount',
      label: i18n.t('insert.customer.Model_CreditAmount'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Autocomplete',
      modelProperty: 'BankId',
      objectKey: 'bank',
      url: 'VisionNextBank/api/Bank/Search',
      label: i18n.t('insert.customer.bank'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 94
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'CurrencyId',
      objectKey: 'currency',
      url: 'VisionNextSystem/api/SysCurrency/Search',
      label: i18n.t('insert.customer.Model_CurrencyId'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId === 98
      },
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Debtor',
      label: i18n.t('insert.customer.debtor'),
      required: false,
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId === 94 || form.CreditDescriptionId === 95 || form.CreditDescriptionId === 98 || form.CreditDescriptionId === 96 || form.CreditDescriptionId === 99
      },
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Bail',
      label: i18n.t('insert.customer.bail'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 97 && form.CreditDescriptionId !== 98
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'LandOffice',
      label: i18n.t('insert.customer.landOffice'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 95
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Plate',
      label: i18n.t('insert.customer.plate'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 95
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TraficRegistry',
      label: i18n.t('insert.customer.traficRegistry'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 96
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'TextNo',
      label: i18n.t('insert.customer.textNo'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 95
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 9
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'CreditLimit',
      label: i18n.t('insert.customer.Model_CreditLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 10
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'NotaryNo',
      label: i18n.t('insert.customer.notaryNo'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 96
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 11
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'PlateNumber',
      label: i18n.t('insert.customer.plateNumber'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 96
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'RiskLimit',
      label: i18n.t('insert.customer.Model_RiskLimit'),
      required: true,
      visible: true,
      isUnique: false,
      id: 13
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'MortgageValue',
      label: i18n.t('insert.customer.mortgageValue'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 95
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 14
    },
    {
      type: 'Check',
      inputType: 'text',
      modelProperty: 'AllowOverLimit',
      label: i18n.t('insert.customer.allowOverLimit'),
      required: false,
      visible: true,
      isUnique: false,
      id: 15
    },
    {
      type: 'Date',
      modelProperty: 'CreditStartDate',
      label: i18n.t('insert.customer.Model_CreditStartDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 16
    },
    {
      type: 'Date',
      modelProperty: 'CreditEndDate',
      label: i18n.t('insert.customer.Model_CreditEndDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 17
    },
    {
      type: 'Date',
      modelProperty: 'TextDate',
      label: i18n.t('insert.customer.textDate'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 95
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 18
    },
    {
      type: 'Date',
      modelProperty: 'NotaryDate',
      label: i18n.t('insert.customer.notaryDate'),
      disabled: (form, mainForm) => {
        return form.CreditDescriptionId !== 96
      },
      required: false,
      visible: true,
      isUnique: false,
      id: 19
    },
    {
      type: 'Lookup',
      modelProperty: 'CreditDescriptionId',
      objectKey: 'CreditDescription',
      url: 'CREDIT_DESCRIPTION',
      label: i18n.t('insert.customer.Model_CreditDescriptionId'),
      required: true,
      visible: true,
      id: 20
    }
  ],
  paymentTypesItems: [
    {
      type: 'Dropdown',
      modelProperty: 'PaymentTypeId',
      objectKey: 'PaymentType',
      url: 'VisionNextCommonApi/api/PaymentType/Search',
      label: i18n.t('insert.customer.Model_PaymentTypeId'),
      required: true,
      visible: true,
      id: 1
    }
  ],
  customerDiscountsItems: [
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'discountPercent1',
      label: i18n.t('insert.customer.DiscountPercent1'),
      required: true,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'discountPercent2',
      label: i18n.t('insert.customer.DiscountPercent2'),
      required: true,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Date',
      modelProperty: 'startDate',
      label: i18n.t('insert.customer.StartDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Date',
      modelProperty: 'endDate',
      label: i18n.t('insert.customer.EndDate'),
      required: true,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnName',
      labelProperty: 'Label',
      valueProperty: 'ForeignField',
      objectKey: 'ColumnNameDesc',
      url: 'VisionNextCommonApi/api/LookupValue/GetValuesBySysParams?v=1',
      label: i18n.t('insert.branch.ColumnName'),
      required: true,
      visible: true,
      dynamicRequest: {paramId: 'ITEM_CRITERIA'},
      id: 5
    },
    {
      type: 'Dropdown',
      modelProperty: 'ColumnValue',
      parentProperty: 'Label',
      labelProperty: 'Label',
      objectKey: 'ColumnValueDesc',
      request: JSON.stringify({ParamName: 'val'}),
      url: 'VisionNextCommonApi/api/LookupValue/GetSelectedParamNameByValues',
      label: i18n.t('insert.branch.ColumnValue'),
      required: true,
      visible: true,
      isUnique: true,
      parentId: 5,
      id: 6
    }
  ],
  routeDetailsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'RouteTypeId',
      objectKey: 'RouteType',
      labelProperty: 'Description1',
      url: 'VisionNextRoute/api/RouteType/Search',
      label: i18n.t('insert.customer.routeType'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      label: i18n.t('insert.customer.Day1VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day2VisitOrder',
      label: i18n.t('insert.customer.Day2VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day3VisitOrder',
      label: i18n.t('insert.customer.Day3VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day4VisitOrder',
      label: i18n.t('insert.customer.Day4VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day5VisitOrder',
      label: i18n.t('insert.customer.Day5VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day6VisitOrder',
      label: i18n.t('insert.customer.Day6VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day7VisitOrder',
      label: i18n.t('insert.customer.Day7VisitOrder'),
      required: false,
      visible: true,
      isUnique: false,
      id: 8
    }
  ],
  customFixedTermItems: [
    {
      type: 'Dropdown',
      modelProperty: 'FixedTermId',
      objectKey: 'FixedTerm',
      url: 'VisionNextCommonApi/api/FixedTerm/Search',
      label: i18n.t('insert.customer.fixedTerm'),
      required (form, mainForm) {
        return mainForm.DefaultPaymentTypeId === 2
      },
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  customerTouchpointsItems: [
    {
      type: 'Lookup',
      modelProperty: 'TouchpointTypeId',
      objectKey: 'TouchpointType',
      url: 'CUSTOMER_TOUCHPOINT_TYPE',
      label: i18n.t('insert.customer.touchpointTypeId'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'TouchpointPriorityNumber',
      objectKey: 'TouchpointPriorityNumber',
      valueProperty: 'Label',
      url: 'CUSTOMER_TOUCHPOINT_PRIORITY',
      label: i18n.t('insert.customer.touchpointPriority'),
      required: false,
      visible: true,
      id: 2
    }
  ],
  customerLabelsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'LabelId',
      objectKey: 'Label',
      url: 'VisionNextCommonApi/api/Label/Search',
      label: i18n.t('insert.customer.labelId'),
      required: false,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Dropdown',
      modelProperty: 'LabelValueId',
      objectKey: 'LabelValue',
      url: 'VisionNextCommonApi/api/LabelDetail/Search',
      label: i18n.t('insert.customer.labelValueId'),
      required: false,
      visible: true,
      isUnique: true,
      id: 2
    }
  ],
  customersItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      url: 'VisionNextItem/api/Item/Search',
      label: i18n.t('insert.customer.ItemId'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    }
  ],
  assetLocationsItems: [
    {
      type: 'Dropdown',
      modelProperty: 'AssetId',
      objectKey: 'Asset',
      // url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.customer.AssetId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'SerialNumber',
      label: i18n.t('insert.customer.SerialNumber'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Quantity',
      label: i18n.t('insert.customer.Quantity'),
      required: false,
      visible: true,
      isUnique: false,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'LocationId',
      label: i18n.t('insert.customer.LocationId'),
      required: false,
      visible: true,
      isUnique: false,
      id: 4
    }
  ],
  customerAnalysisItems: [
    {
      type: 'Dropdown',
      modelProperty: 'AnalysisTypeId',
      objectKey: 'AnalysisType',
      // url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.customer.analysisTypeId'),
      required: false,
      visible: true,
      id: 1
    },
    {
      type: 'Date',
      modelProperty: 'AnalysisDate',
      objectKey: 'analysisDate',
      label: i18n.t('insert.customer.analysisDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 2
    },
    {
      type: 'Dropdown',
      modelProperty: 'RepresentativeId',
      objectKey: 'Representative',
      // url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.customer.representative'),
      required: false,
      visible: true,
      id: 3
    },
    {
      type: 'Dropdown',
      modelProperty: 'QuestionId',
      objectKey: 'Question',
      // url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.customer.questionId'),
      required: false,
      visible: true,
      id: 4
    },
    {
      type: 'Dropdown',
      modelProperty: 'ItemId',
      objectKey: 'Item',
      // url: 'VisionNextAsset/api/Asset/Search',
      label: i18n.t('insert.customer.itemId'),
      required: false,
      visible: true,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Answer',
      objectKey: 'Answer',
      label: i18n.t('insert.customer.answer'),
      required: false,
      visible: true,
      id: 6
    }
  ],
  customerStatusHistoriesItems: [
    {
      type: 'Date',
      modelProperty: 'ChangeDate',
      objectKey: 'ChangeDate',
      label: i18n.t('insert.customer.changeDate'),
      required: false,
      visible: true,
      isUnique: false,
      id: 1
    },
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      objectKey: 'Employee',
      url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.customer.employee'),
      visible: true,
      required: false,
      isUnique: true,
      id: 2
    },
    {
      type: 'Autocomplete',
      modelProperty: 'customerStatusId',
      objectKey: 'CustomerStatus',
      // url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.customer.customerStatusId'),
      visible: true,
      required: false,
      isUnique: true,
      id: 3
    },
    {
      type: 'Autocomplete',
      modelProperty: 'ReasonId',
      objectKey: 'Reason',
      // url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.customer.reasonId'),
      visible: true,
      required: false,
      isUnique: true,
      id: 4
    },
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'Genexp1',
      objectKey: 'Genexp1',
      label: i18n.t('insert.customer.genexp1'),
      required: false,
      visible: true,
      id: 5
    },
    {
      type: 'Autocomplete',
      modelProperty: 'RefCustomer',
      objectKey: 'RefCustomer',
      // url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.customer.refCustomer'),
      visible: true,
      required: false,
      isUnique: true,
      id: 6
    }
  ],
  customerAccountTeamsItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      objectKey: 'Employee',
      url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.customer.employee'),
      visible: true,
      required: false,
      isUnique: true,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'EmployeeGroupId',
      objectKey: 'EmployeeGroup',
      url: 'EMPLOYEE_GROUP',
      label: i18n.t('insert.customer.EmployeeGroupId'),
      required: false,
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'EmployeeTypeId',
      objectKey: 'EmployeeType',
      url: 'EMPLOYEE_TYPE',
      label: i18n.t('insert.customer.EmployeeType'),
      required: false,
      visible: true,
      id: 3
    }
  ]
}
