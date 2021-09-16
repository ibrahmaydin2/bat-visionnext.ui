import i18n from '../../i18n'
export const detailData = {
  teamItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      objectKey: 'Employee',
      url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
      label: i18n.t('insert.employee.TeamPersonalName'),
      visible: true,
      required: true,
      isUnique: true,
      id: 1
    }
  ],
  prefixItems: [
    {
      type: 'Dropdown',
      modelProperty: 'RecordId',
      objectKey: 'EmployeePrefix',
      labelProperty: 'Code',
      source: [],
      label: i18n.t('insert.employee.EmployeePrefix'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ]
}
