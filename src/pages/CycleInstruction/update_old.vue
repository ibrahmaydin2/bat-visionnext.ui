<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup item-key="CustomerCriteriaId" :error="$v.form.CustomerCriteriaId">
              <NextDropdown :disabled="insertReadonly.CustomerCriteriaId" lookup-key="CUSTOMER_CRITERIA" @input="selectedType('CustomerCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="RouteCriteriaId" :error="$v.form.RouteCriteriaId">
              <NextDropdown :disabled="insertReadonly.RouteCriteriaId" lookup-key="ROUTE_CRITERIA" @input="selectedType('RouteCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BranchCriteriaId" :error="$v.form.BranchCriteriaId">
              <NextDropdown :disabled="insertReadonly.BranchCriteriaId" lookup-key="BRANCH_CRITERIA" @input="selectedType('BranchCriteriaId', $event)"/>
            </NextFormGroup>
            <NextFormGroup item-key="BeginDate" :error="$v.form.BeginDate">
              <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
            </NextFormGroup>
            <NextFormGroup item-key="EndDate" :error="$v.form.EndDate">
              <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
            </NextFormGroup>
            <NextFormGroup item-key="Genexp1" :error="$v.form.Genexp1">
              <NextInput v-model="form.Genexp1" type="text" :disabled="insertReadonly.Genexp1" />
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.EmployeesList')" >
          <NextDetailPanel v-model="form.CycleInstructionEmployees" :items="cycleInstructionItems" />
        </b-tab>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionBranches')" >
          <NextDetailPanel v-model="cycleInstructionBranches" :items="cycleInstructionBranchItems" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Code: null,
        Description1: null,
        CustomerCriteriaId: null,
        StatusId: null,
        RouteCriteriaId: null,
        BranchCriteriaId: null,
        BeginDate: null,
        EndDate: null,
        Genexp1: null,
        CycleInstructionEmployees: [],
        CycleInstructionDetails: []
      },
      routeName1: 'FieldManagement',
      cycleInstructionBranchItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'ColumnValue',
          parentProperty: null,
          url: 'VisionNextBranch/api/Branch/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Branch'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'TableName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'T_CUSTOMER',
          parentId: null,
          id: 2
        },
        {
          type: 'Text',
          inputType: 'text',
          modelProperty: 'ColumnName',
          parentProperty: null,
          url: null,
          label: null,
          required: false,
          disabled: false,
          visible: false,
          hideOnTable: true,
          isUnique: false,
          defaultValue: 'BRANCH_ID',
          parentId: null,
          id: 3
        }
      ],
      cycleInstructionItems: [
        {
          type: 'Autocomplete',
          inputType: null,
          modelProperty: 'EmployeeId',
          orConditionFields: 'Code,Description1,Name,Surname',
          parentProperty: null,
          url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
          label: this.$t('insert.CycleInstruction.Employee'),
          required: true,
          disabled: false,
          visible: true,
          hideOnTable: false,
          isUnique: true,
          parentId: null,
          id: 1,
          objectKey: 'Employee'
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'EmployeeDescription',
          parentProperty: 'Description1',
          url: null,
          label: this.$t('insert.CycleInstruction.EmployeeDescription'),
          required: false,
          disabled: true,
          visible: true,
          hideOnTable: true,
          isUnique: false,
          parentId: 1,
          id: null
        },
        {
          type: 'Label',
          inputType: 'text',
          modelProperty: 'BranchDescription',
          parentProperty: 'BranchId',
          url: 'VisionNextBranch/api/Branch/Get',
          label: this.$t('insert.CycleInstruction.BranchDescription'),
          required: false,
          disabled: true,
          visible: true,
          hideOnTable: false,
          isUnique: false,
          parentId: 1,
          id: null
        }
      ],
      cycleInstructionBranches: []
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    setData () {
      this.form = this.rowData
      this.cycleInstructionBranches = this.form.CycleInstructionDetails.filter(i => i.TableName === 'T_CUSTOMER' && i.ColumnName === 'BRANCH_ID')

      // if (this.form.ItemCustomers) {
      //   this.form.ItemCustomers.map(item => {
      //     item.CustomerLabel = item.Customer ? item.Customer.Label : ''
      //   })
      // }
      // if (this.form.ItemBoms) {
      //   this.form.ItemBoms.map(item => {
      //     item.UnitLabel = item.Unit ? item.Unit.Label : ''
      //     item.BomItemLabel = item.BomItem ? item.BomItem.Label : ''
      //   })
      // }
      // for (const property in this.rowData) {
      //   if (this.rowData[property]) {
      //     if (typeof this.rowData[property].Label !== 'undefined') {
      //       if (property === 'CardType' || property === 'TimeFrame' || property === 'Color' || property === 'UnitSet') {
      //         this[property] = this.convertLookupValueToSearchValue(this.rowData[property])
      //       } else {
      //         this[property] = this.rowData[property]
      //       }
      //     }
      //   }
      // }
    },
    save () {
      if (this.cycleInstructionBranches) {
        this.form.CycleInstructionDetails.push(...this.cycleInstructionBranches)
      }
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules
    }
  }
}
</script>
