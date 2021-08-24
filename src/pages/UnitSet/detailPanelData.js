import i18n from '../../i18n'
export const detailData = {
  unitItems: [
    {
      type: 'Lookup',
      modelProperty: 'UnitId',
      objectKey: 'UnitLookupValue',
      url: 'UNIT',
      label: i18n.t('insert.unitSet.unitDefinitions'),
      required: true,
      visible: true,
      isUnique: true,
      id: 1
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ConvFact1',
      label: i18n.t('insert.unitSet.convFact1'),
      required: true,
      visible: true,
      id: 2
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'ConvFact2',
      label: i18n.t('insert.unitSet.convFact2'),
      required: true,
      visible: true,
      id: 3
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Length',
      parentProperty: null,
      url: null,
      label: i18n.t('insert.unitSet.length'),
      visible: true,
      id: 4
    },
    {
      type: 'Dropdown',
      modelProperty: 'LengthUnitId',
      objectKey: 'LengthUnit',
      url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=1',
      label: i18n.t('insert.unitSet.lengthUnit'),
      visible: true,
      id: 5,
      dynamicAndCondition: { CardTypeIds: [1] }
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Width',
      label: i18n.t('insert.unitSet.width'),
      visible: true,
      id: 6
    },
    {
      type: 'Dropdown',
      modelProperty: 'WidthUnitId',
      objectKey: 'WidthUnit',
      url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=2',
      label: i18n.t('insert.unitSet.widthUnit'),
      visible: true,
      id: 7,
      dynamicAndCondition: { CardTypeIds: [6] }
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Height',
      label: i18n.t('insert.unitSet.height'),
      visible: true,
      id: 8
    },
    {
      type: 'Dropdown',
      modelProperty: 'HeightUnitId',
      objectKey: 'HeightUnit',
      url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=3',
      label: i18n.t('insert.unitSet.heightUnit'),
      visible: true,
      id: 9,
      dynamicAndCondition: { CardTypeIds: [7] }
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Area',
      label: i18n.t('insert.unitSet.area'),
      visible: true,
      id: 10
    },
    {
      type: 'Dropdown',
      modelProperty: 'AreaUnitId',
      objectKey: 'AreaUnit',
      url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=4',
      label: i18n.t('insert.unitSet.areaUnit'),
      visible: true,
      id: 11,
      dynamicAndCondition: { CardTypeIds: [2] }
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Volume',
      label: i18n.t('insert.unitSet.volume'),
      visible: true,
      id: 12
    },
    {
      type: 'Lookup',
      modelProperty: 'VolumeUnitId',
      objectKey: 'VolumeUnit',
      url: 'UNIT',
      label: i18n.t('insert.unitSet.volumeUnit'),
      visible: true,
      id: 13,
      filter (item) {
        let list = ['HL', 'LT', 'MK', 'CM3']
        return list.includes(item.Code)
      }
    },
    {
      type: 'Text',
      inputType: 'number',
      modelProperty: 'Weight',
      label: i18n.t('insert.unitSet.weight'),
      visible: true,
      id: 14
    },
    {
      type: 'Lookup',
      modelProperty: 'WeightUnitId',
      objectKey: 'WeightUnit',
      url: 'UNIT',
      label: i18n.t('insert.unitSet.weightUnit'),
      visible: true,
      id: 15,
      filter (item) {
        let list = ['GR', 'KG', 'TN']
        return list.includes(item.Code)
      }
    },
    {
      type: 'Check',
      inputType: 'number',
      modelProperty: 'IsMainUnit',
      label: i18n.t('insert.unitSet.isMainUnit'),
      visible: true,
      id: 16
    },
    {
      type: 'Check',
      inputType: 'number',
      modelProperty: 'IsDivUnit',
      label: i18n.t('insert.unitSet.isDivUnit'),
      visible: true,
      id: 17
    }
  ]
}
