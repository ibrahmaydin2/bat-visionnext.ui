import i18n from '../../i18n'
export const detailData = {
  locationItems1: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      dynamicAndCondition: { StatusIds: [1] },
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.route.CustomerId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerName',
      parentProperty: 'Description1',
      objectKey: 'Customer',
      disabled: true,
      label: i18n.t('insert.route.CustomerName'),
      id: 2,
      parentId: 1
    },
    {
      type: 'Dropdown',
      inputType: 'text',
      modelProperty: 'LocationId',
      labelProperty: 'Code',
      objectKey: 'Location',
      parentProperty: 'RecordId',
      url: 'VisionNextCustomer/api/CustomerLocation/CustomSearch',
      request: JSON.stringify({andConditionModel: { CustomerIds: ['val'], IsRouteNode: 1 }}),
      label: i18n.t('insert.route.LocationId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.CustomerId
      },
      firstElementSelected: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'LocationName',
      parentProperty: 'Description1',
      objectKey: 'Location',
      disabled: true,
      label: i18n.t('insert.route.LocationName'),
      id: 4,
      parentId: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day1VisitOrder'),
      minLength: 0,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day2VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day2VisitOrder'),
      minLength: 0,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day3VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day3VisitOrder'),
      minLength: 0,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day4VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day4VisitOrder'),
      minLength: 0,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day5VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day5VisitOrder'),
      minLength: 0,
      id: 9
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day6VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day6VisitOrder'),
      minLength: 0,
      id: 10
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day7VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day7VisitOrder'),
      minLength: 0,
      id: 11
    },
    {
      type: 'Date',
      modelProperty: 'DayFreStartDate',
      visible: true,
      label: i18n.t('insert.route.DayFreStartDate'),
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DayFrequency',
      visible: true,
      hideOnTable: true,
      label: i18n.t('insert.route.WeeklyFrequency'),
      id: 13
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AnnualVisitCount',
      visible: false,
      label: i18n.t('insert.route.DayFrequency'),
      id: 13
    }
  ],
  locationItems2: [
    {
      type: 'Autocomplete',
      modelProperty: 'BranchId',
      objectKey: 'Branch',
      labelProperty: 'Description1',
      customOption: true,
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
      label: i18n.t('insert.route.BranchId'),
      hideOnTable: true,
      required: true,
      visible: true,
      id: 12
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'BranchName',
      parentProperty: 'Description1',
      objectKey: 'Branch',
      disabled: true,
      label: i18n.t('insert.route.BranchName'),
      hideOnTable: true,
      id: 13,
      parentId: 12
    },
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      labelProperty: 'CommercialTitle',
      customOption: true,
      isCustomer: true,
      parentProperty: 'RecordId',
      dynamicAndCondition: { StatusIds: [1] },
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch',
      request: JSON.stringify({andConditionModel: { BranchIds: ['val'] }}),
      label: i18n.t('insert.route.CustomerId'),
      required: true,
      visible: true,
      id: 1,
      parentId: 12
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerName',
      parentProperty: 'Description1',
      objectKey: 'Customer',
      disabled: true,
      label: i18n.t('insert.route.CustomerName'),
      id: 2,
      parentId: 1
    },
    {
      type: 'Dropdown',
      inputType: 'text',
      modelProperty: 'LocationId',
      labelProperty: 'Code',
      objectKey: 'Location',
      parentProperty: 'RecordId',
      url: 'VisionNextCustomer/api/CustomerLocation/CustomSearch',
      request: JSON.stringify({andConditionModel: { CustomerIds: ['val'], IsRouteNode: 1 }}),
      label: i18n.t('insert.route.LocationId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.CustomerId
      },
      firstElementSelected: true,
      parentId: 1,
      id: 3
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'LocationName',
      parentProperty: 'Description1',
      objectKey: 'Location',
      disabled: true,
      label: i18n.t('insert.route.LocationName'),
      id: 4,
      parentId: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day1VisitOrder'),
      minLength: 0,
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day2VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day2VisitOrder'),
      minLength: 0,
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day3VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day3VisitOrder'),
      minLength: 0,
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day4VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day4VisitOrder'),
      minLength: 0,
      id: 8
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day5VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day5VisitOrder'),
      minLength: 0,
      id: 9
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day6VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day6VisitOrder'),
      minLength: 0,
      id: 10
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day7VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day7VisitOrder'),
      minLength: 0,
      id: 11
    },
    {
      type: 'Date',
      modelProperty: 'DayFreStartDate',
      visible: true,
      label: i18n.t('insert.route.DayFreStartDate'),
      id: 12
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DayFrequency',
      visible: true,
      hideOnTable: true,
      label: i18n.t('insert.route.WeeklyFrequency'),
      id: 13
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AnnualVisitCount',
      visible: false,
      label: i18n.t('insert.route.DayFrequency'),
      id: 13
    }
  ],
  getLocationItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
      labelProperty: 'Code',
      customOption: true,
      isCustomer: true,
      orConditionFields: 'Code,Description1,CommercialTitle',
      url: 'VisionNextCustomer/api/Customer/AutoCompleteSearch',
      label: i18n.t('insert.route.CustomerId'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'CustomerName',
      parentProperty: 'Description1',
      objectKey: 'Customer',
      disabled: true,
      label: i18n.t('insert.route.CustomerName'),
      id: 2,
      parentId: 1
    },
    {
      type: 'Dropdown',
      inputType: 'text',
      modelProperty: 'LocationId',
      labelProperty: 'Code',
      objectKey: 'Location',
      parentProperty: 'RecordId',
      url: 'VisionNextCustomer/api/CustomerLocation/CustomSearch',
      request: JSON.stringify({andConditionModel: { CustomerIds: ['val'], IsRouteNode: 1 }}),
      label: i18n.t('insert.route.LocationId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.CustomerId
      },
      parentId: 1,
      id: 3
    },
    {
      type: 'Label',
      inputType: 'text',
      modelProperty: 'LocationName',
      parentProperty: 'Description1',
      objectKey: 'Location',
      disabled: true,
      label: i18n.t('insert.route.LocationName'),
      id: 4,
      parentId: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day1VisitOrder'),
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day1VisitOrder'),
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day2VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day2VisitOrder'),
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day3VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day3VisitOrder'),
      id: 8
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day4VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day4VisitOrder'),
      id: 9
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day5VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day5VisitOrder'),
      id: 10
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day6VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day6VisitOrder'),
      id: 11
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day7VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day7VisitOrder'),
      id: 12
    },
    {
      type: 'Date',
      modelProperty: 'DayFreStartDate',
      visible: true,
      label: i18n.t('insert.route.DayFreStartDate'),
      id: 13
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'AnnualVisitCount',
      visible: true,
      label: i18n.t('insert.route.DayFrequency'),
      id: 11
    }
  ]
}
