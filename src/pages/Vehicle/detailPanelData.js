import i18n from '../../i18n'
export const detailData = {
  vehicleReplacementDriverItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'DriverId',
      objectKey: 'DriverEmployee',
      url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.vehicles.replacementDriver'),
      dynamicAndCondition: { StatusId: 1 },
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ]
}
