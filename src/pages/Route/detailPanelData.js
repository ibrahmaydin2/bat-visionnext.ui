import i18n from '../../i18n'
export const detailData = {
  locationItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'CustomerId',
      objectKey: 'Customer',
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
      type: 'Dropdown',
      inputType: 'text',
      modelProperty: 'LocationId',
      objectKey: 'Location',
      parentProperty: 'RecordId',
      url: 'VisionNextCustomer/api/CustomerLocation/Search',
      request: JSON.stringify({andConditionModel: { CustomerIds: ['val'], IsRouteNode: 1 }}),
      label: i18n.t('insert.route.LocationId'),
      required: true,
      visible: true,
      disabled: (form) => {
        return !form.CustomerId
      },
      parentId: 1,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day1VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day1VisitOrder'),
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day2VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day2VisitOrder'),
      id: 4
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day3VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day3VisitOrder'),
      id: 5
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day4VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day4VisitOrder'),
      id: 6
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day5VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day5VisitOrder'),
      id: 7
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day6VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day6VisitOrder'),
      id: 8
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Day7VisitOrder',
      visible: true,
      label: i18n.t('insert.route.Day7VisitOrder'),
      id: 9
    },
    {
      type: 'Date',
      modelProperty: 'DayFreStartDate',
      visible: true,
      label: i18n.t('insert.route.DayFreStartDate'),
      id: 10
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'DayFrequency',
      visible: true,
      label: i18n.t('insert.route.DayFrequency'),
      id: 11
    }
  ]
}
