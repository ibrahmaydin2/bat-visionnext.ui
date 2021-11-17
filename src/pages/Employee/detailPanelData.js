import i18n from '../../i18n'
export const detailData = {
  teamItems: [
    {
      type: 'Autocomplete',
      modelProperty: 'EmployeeId',
      orConditionFields: 'Code,Description1,Name,Surname',
      dynamicAndCondition: { StatusIds: [1] },
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
      objectKey: 'Description1',
      source: [],
      label: i18n.t('insert.employee.EmployeePrefix'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  employeeBankItems: [
    {
      type: 'Dropdown',
      modelProperty: 'BankBranchId',
      dynamicAndCondition: { StatusIds: [1] },
      objectKey: 'BankBranch',
      url: 'VisionNextBank/api/BankBranch/Search',
      label: i18n.t('insert.employee.bankBranch'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    }
  ],
  employeeDeviceItems: [
    {
      type: 'Text',
      inputType: 'text',
      modelProperty: 'SerialNumber',
      label: i18n.t('insert.employee.serialNumber'),
      required: true,
      visible: true,
      id: 1
    },
    {
      type: 'Lookup',
      modelProperty: 'DeviceModelId',
      objectKey: 'DeviceModel',
      url: 'DEVICE_MODEL',
      label: i18n.t('insert.employee.model'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Lookup',
      modelProperty: 'DeviceUseAraeId',
      objectKey: 'DeviceUseArae',
      url: 'DEVICE_USE_AREA',
      label: i18n.t('insert.employee.deviceUseAraeId'),
      required: true,
      visible: true,
      id: 3
    }
  ]
}
