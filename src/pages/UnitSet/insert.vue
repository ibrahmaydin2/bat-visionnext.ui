<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'UnitSet' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.unitSet.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
            </NextFormGroup>
            <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
              <NextDropdown :disabled="insertReadonly.CardTypeId" :source="cardTypes" label="Label" @input="selectedType('CardTypeId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.unitSet.units')" >
          <NextDetailPanel type="insert" v-model="form.Units" :items="unitItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        RecordId: null,
        StatusId: 1,
        Code: null,
        Description1: null,
        CardTypeId: null,
        Units: []
      },
      routeName1: 'Unit',
      unitItems: [
        {
          type: 'Lookup',
          modelProperty: 'UnitId',
          url: 'UNIT',
          label: this.$t('insert.unitSet.unitDefinitions'),
          required: true,
          visible: true,
          isUnique: true,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'ConvFact1',
          label: this.$t('insert.unitSet.convFact1'),
          required: true,
          visible: true,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'ConvFact2',
          label: this.$t('insert.unitSet.convFact2'),
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
          label: this.$t('insert.unitSet.length'),
          visible: true,
          id: 4
        },
        {
          type: 'Dropdown',
          modelProperty: 'LengthUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=1',
          label: this.$t('insert.unitSet.lengthUnit'),
          visible: true,
          id: 5,
          dynamicAndCondition: { CardTypeIds: [1] }
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Width',
          label: this.$t('insert.unitSet.width'),
          visible: true,
          id: 6
        },
        {
          type: 'Dropdown',
          modelProperty: 'WidthUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=2',
          label: this.$t('insert.unitSet.widthUnit'),
          visible: true,
          id: 7,
          dynamicAndCondition: { CardTypeIds: [6] }
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Height',
          label: this.$t('insert.unitSet.height'),
          visible: true,
          id: 8
        },
        {
          type: 'Dropdown',
          modelProperty: 'HeightUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=3',
          label: this.$t('insert.unitSet.heightUnit'),
          visible: true,
          id: 9,
          dynamicAndCondition: { CardTypeIds: [7] }
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Area',
          label: this.$t('insert.unitSet.area'),
          visible: true,
          id: 10
        },
        {
          type: 'Dropdown',
          modelProperty: 'AreaUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=4',
          label: this.$t('insert.unitSet.areaUnit'),
          visible: true,
          id: 11,
          dynamicAndCondition: { CardTypeIds: [2] }
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Volume',
          label: this.$t('insert.unitSet.volume'),
          visible: true,
          id: 12
        },
        {
          type: 'Dropdown',
          modelProperty: 'VolumeUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=5',
          label: this.$t('insert.unitSet.volumeUnit'),
          visible: true,
          id: 13,
          dynamicAndCondition: { CardTypeIds: [3] }
        },
        {
          type: 'Text',
          inputType: 'number',
          modelProperty: 'Weight',
          label: this.$t('insert.unitSet.weight'),
          visible: true,
          id: 14
        },
        {
          type: 'Dropdown',
          modelProperty: 'WeightUnitId',
          url: 'VisionNextUnit/api/UnitSet/AutoCompleteSearch?v=6',
          label: this.$t('insert.unitSet.weightUnit'),
          visible: true,
          id: 15,
          dynamicAndCondition: { CardTypeIds: [4] }
        },
        {
          type: 'Check',
          inputType: 'number',
          modelProperty: 'IsMainUnit',
          label: this.$t('insert.unitSet.isMainUnit'),
          visible: true,
          id: 16
        },
        {
          type: 'Check',
          inputType: 'number',
          modelProperty: 'IsDivUnit',
          label: this.$t('insert.unitSet.isDivUnit'),
          visible: true,
          id: 17
        }
      ],
      cardTypes: [
        {
          Label: this.$t('insert.unitSet.userDefinedDimensions'),
          DecimalValue: 5
        }
      ]
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.createData()
      }
    }
  }
}
</script>
