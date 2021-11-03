<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Employee' }">
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
            <NextCheckBox v-model="form.StatusId" type="number" toggle :disabled="insertReadonly.StatusId" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
      <b-tab :title="$t('insert.employee.EmployeeInfo')" @click.prevent="tabValidation()" :active="true">
          <b-row>
            <NextFormGroup item-key="Name" :error="$v.form.Name">
              <NextInput v-model="form.Name" type="text" :disabled="insertReadonly.Name" @keypress="isString($event)" />
            </NextFormGroup>
            <NextFormGroup item-key="Surname" :error="$v.form.Surname">
              <NextInput v-model="form.Surname" type="text" :disabled="insertReadonly.Surname" @keypress="isString($event)" />
            </NextFormGroup>
            <NextFormGroup item-key="GroupId" :error="$v.form.GroupId">
              <NextDropdown v-model="group" lookup-key="EMPLOYEE_GROUP" @input="selectedType('GroupId', $event)" :disabled="insertReadonly.GroupId" />
            </NextFormGroup>
            <NextFormGroup item-key="Category1Id" :error="$v.form.Category1Id">
              <NextDropdown v-model="category1" lookup-key="EMPLOYEE_CATEGORY_1" @input="selectedType('Category1Id', $event)" :disabled="insertReadonly.Category1" />
            </NextFormGroup>
            <NextFormGroup item-key="Other1" :error="$v.form.Other1">
              <NextInput v-model="form.Other1" type="text" :disabled="insertReadonly.Other1" />
            </NextFormGroup>
            <NextFormGroup item-key="IsTeam" :error="$v.form.IsTeam">
              <NextCheckBox v-model="form.IsTeam" type="number" toggle :disabled="insertReadonly.IsTeam" />
            </NextFormGroup>
            <NextFormGroup item-key="PriceListCategoryId" :error="$v.form.PriceListCategoryId">
              <NextDropdown v-model="priceListCategory" lookup-key="PRICE_LIST_CATEGORY_TYPE" @input="selectedType('PriceListCategoryId', $event)" :disabled="!form.CreateCustomerRecord" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode1" :error="$v.form.FinanceCode1">
              <NextInput v-model="form.FinanceCode1" type="text" :disabled="insertReadonly.FinanceCode1" />
            </NextFormGroup>
            <NextFormGroup item-key="CreateCustomerRecord" :error="$v.form.CreateCustomerRecord">
              <NextCheckBox v-model="form.CreateCustomerRecord" type="number" toggle :disabled="insertReadonly.CreateCustomerRecord" />
            </NextFormGroup>
            <NextFormGroup item-key="FinanceCode2" :error="$v.form.FinanceCode2">
              <NextInput v-model="form.FinanceCode2" type="text" :disabled="insertReadonly.FinanceCode2" />
            </NextFormGroup>
            <NextFormGroup item-key="ScoreCardClassId" :error="$v.form.ScoreCardClassId">
              <NextDropdown v-model="scoreCardClass" lookup-key="SCORE_CARD_CLASS" @input="selectedType('ScoreCardClassId', $event)" :disabled="insertReadonly.ScoreCardClassId" />
            </NextFormGroup>
            <NextFormGroup item-key="SapHrCode" :error="$v.form.SapHrCode">
              <NextInput v-model="form.SapHrCode" type="text" :disabled="insertReadonly.SapHrCode" />
            </NextFormGroup>
            <NextFormGroup item-key="IsRepresentative" :error="$v.form.IsRepresentative">
              <NextCheckBox v-model="form.IsRepresentative" type="number" toggle :disabled="insertReadonly.IsRepresentative" />
            </NextFormGroup>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.groupInfo')" @click.prevent="tabValidation()">
        <b-row>
          <NextFormGroup item-key="TypeId" :error="$v.form.TypeId">
            <NextDropdown v-model="employeeType" lookup-key="EMPLOYEE_TYPE" @input="selectedType('TypeId', $event)" :disabled="insertReadonly.TypeId" />
          </NextFormGroup>
          <NextFormGroup item-key="UserGroupId" :error="$v.form.UserGroupId">
            <NextDropdown v-model="userGroup" url="VisionNextSystem/api/SysUserGroup/Search" @input="selectedSearchType('UserGroupId', $event)" label="Description1" :disabled="insertReadonly.UserGroupId" />
          </NextFormGroup>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.Model_Personal')" @click.prevent="tabValidation()">
        <b-row>
          <NextFormGroup item-key="EmploymentStartDate" :error="$v.form.EmploymentStartDate">
            <NextDatePicker v-model="form.EmploymentStartDate" :disabled="insertReadonly.EmploymentStartDate" />
          </NextFormGroup>
          <NextFormGroup item-key="EmploymentEndDate" :error="$v.form.EmploymentEndDate">
            <NextDatePicker v-model="form.EmploymentEndDate" :disabled="insertReadonly.EmploymentEndDate" />
          </NextFormGroup>
          <NextFormGroup item-key="TaxNumber" :error="$v.form.TaxNumber">
            <NextInput v-model="form.TaxNumber" type="number" :disabled="insertReadonly.TaxNumber" maxLength="11" :oninput="maxLengthControl"/>
          </NextFormGroup>
          <NextFormGroup item-key="BirthDate" :error="$v.form.BirthDate">
            <NextDatePicker v-model="form.BirthDate" :disabled="insertReadonly.BirthDate" />
          </NextFormGroup>
          <NextFormGroup item-key="TShirtSize" :error="$v.form.TShirtSize">
            <NextInput v-model="form.TShirtSize" type="text" :disabled="insertReadonly.TShirtSize" />
          </NextFormGroup>
          <NextFormGroup item-key="MontSize" :error="$v.form.MontSize">
            <NextInput v-model="form.MontSize" type="text" :disabled="insertReadonly.MontSize" />
          </NextFormGroup>
          <NextFormGroup item-key="OvercoatSize" :error="$v.form.OvercoatSize">
            <NextInput v-model="form.OvercoatSize" type="text" :disabled="insertReadonly.OvercoatSize" />
          </NextFormGroup>
          <NextFormGroup item-key="ShoeSize" :error="$v.form.ShoeSize">
            <NextInput v-model="form.ShoeSize" type="text" :disabled="insertReadonly.ShoeSize" />
          </NextFormGroup>
          <NextFormGroup item-key="EducationId" :error="$v.form.EducationId">
            <NextDropdown v-model="education" lookup-key="EDUCATION" @input="selectedType('EducationId', $event)" :disabled="insertReadonly.EducationId" />
          </NextFormGroup>
          <NextFormGroup item-key="DenimSize" :error="$v.form.DenimSize">
            <NextInput v-model="form.DenimSize" type="text" :disabled="insertReadonly.DenimSize" />
          </NextFormGroup>
          <NextFormGroup item-key="CorduroySize" :error="$v.form.CorduroySize">
            <NextInput v-model="form.CorduroySize" type="text" :disabled="insertReadonly.CorduroySize" />
          </NextFormGroup>
          <NextFormGroup item-key="BloodTypeId" :error="$v.form.BloodTypeId">
            <NextDropdown v-model="bloodType" lookup-key="BLOOD_TYPE" @input="selectedType('BloodTypeId', $event)" :disabled="insertReadonly.BloodTypeId" />
          </NextFormGroup>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.EmployeeContact')" @click.prevent="tabValidation()">
        <b-row>
          <NextFormGroup item-key="Telephone1" :error="$v.form.Telephone1">
            <NextInput v-model="form.Telephone1" type="number" :disabled="insertReadonly.Telephone1" maxLength="10" :oninput="maxLengthControl"/>
          </NextFormGroup>
          <NextFormGroup item-key="Telephone2" :error="$v.form.Telephone2">
            <NextInput v-model="form.Telephone2" type="number" :disabled="insertReadonly.Telephone2" maxLength="10" :oninput="maxLengthControl"/>
          </NextFormGroup>
          <NextFormGroup item-key="CountryCodeId" :error="$v.form.CountryCodeId">
            <NextDropdown v-model="countryCode" :disabled="insertReadonly.CountryCodeId" lookup-key="COUNTRY_CODE" @input="selectedType('CountryCodeId', $event)"/>
          </NextFormGroup>
          <NextFormGroup item-key="GsmNumber" :error="$v.form.GsmNumber">
            <NextInput v-model="form.GsmNumber" type="number" :disabled="insertReadonly.GsmNumber" maxLength="10" :oninput="maxLengthControl"/>
          </NextFormGroup>
          <NextFormGroup item-key="FaxNumber" :error="$v.form.FaxNumber">
            <NextInput v-model="form.FaxNumber" type="number" :disabled="insertReadonly.FaxNumber" maxLength="10" :oninput="maxLengthControl"/>
          </NextFormGroup>
          <NextFormGroup item-key="Email" :error="$v.form.Email">
            <NextInput v-model="form.Email" type="email" class="lowercase" :disabled="insertReadonly.Email" @input="emailEntered"/>
          </NextFormGroup>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.Model_Team')" @click.prevent="tabValidation()" v-if="form.IsTeam">
        <NextDetailPanel v-model="form.EmployeeTeams" :items="teamItems"></NextDetailPanel>
      </b-tab>
      <b-tab :title="$t('insert.employee.EmployeePrefix')" @click.prevent="tabValidation()" v-if="prefixItems.length > 0">
        <NextDetailPanel v-model="form.EInvoiceSeqs" :items="prefixItems"></NextDetailPanel>
      </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import mixin from '../../../mixins/update'
import { requiredIf } from 'vuelidate/lib/validators'
import { detailData } from '../detailPanelData'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Code: null,
        Name: null,
        Surname: null,
        TypeId: null,
        GroupId: null,
        StatusId: 1,
        Category1Id: null,
        FinanceCode1: null,
        FinanceCode2: null,
        SapHrCode: null,
        Description1: null,
        EmploymentStartDate: null,
        EmploymentEndDate: null,
        Telephone1: null,
        Telephone2: null,
        GsmNumber: null,
        FaxNumber: null,
        Email: null,
        Other1: null,
        TaxNumber: null,
        BirthDate: null,
        TShirtSize: null,
        MontSize: null,
        OvercoatSize: null,
        ShoeSize: null,
        IsTeam: null,
        PriceListCategoryId: null,
        CreateCustomerRecord: null,
        UserGroupId: null,
        EducationId: null,
        DenimSize: null,
        CorduroySize: null,
        BloodTypeId: null,
        ScoreCardClassId: null,
        IsRepresentative: null,
        CountryCodeId: null,
        EmployeeTeams: [],
        EInvoiceSeqs: []
      },
      priceListCategory: null,
      teamItems: detailData.teamItems,
      prefixItems: [],
      prefixItem: {
        type: 'Dropdown',
        modelProperty: 'RecordId',
        objectKey: 'EmployeePrefix',
        labelProperty: 'Code',
        source: [],
        label: this.$t('insert.employee.EmployeePrefix'),
        required: true,
        visible: true,
        isUnique: true,
        id: 1
      },
      group: null,
      category1: null,
      scoreCardClass: null,
      employeeType: null,
      userGroup: null,
      education: null,
      bloodType: null,
      countryCode: null
    }
  },
  computed: {
    returnCustomerRecord () {
      return this.form.CreateCustomerRecord
    }
  },
  mounted () {
    this.getInsertPage()
  },
  methods: {
    getInsertPage () {
      this.getData().then(() => { this.setData() })
      this.getLists()
      this.$api.postByUrl({RecordId: 1}, 'VisionNextBranch/api/Branch/Get').then(response => {
        if (response && response.Model) {
          let eInvoiceSeqs = response.Model.EInvoiceSeqs
          if (eInvoiceSeqs) {
            this.prefixItem.source = eInvoiceSeqs.map(item => {
              item.Label = `${item.Prefix} ${item.Year ? item.Year : ''} ${item.EInvoiceType.Label}`
            })
            this.prefixItems.push(this.prefixItem)
          }
        }
      })
    },
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
        this.form.StatusId = this.form.StatusId === true || this.form.StatusId === 1 ? 1 : 0
        this.updateData()
      }
    },
    getLists () {
      let allLookups = 'EMPLOYEE_GROUP,EMPLOYEE_CATEGORY_1,PRICE_LIST_CATEGORY_TYPE,SCORE_CARD_CLASS,EMPLOYEE_TYPE,EDUCATION,BLOOD_TYPE'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
    },
    emailEntered (value) {
      this.form.Email = value ? value.toLowerCase() : ''
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.group = rowData.Group
      this.category1 = rowData.Category1
      this.scoreCardClass = rowData.ScoreCardClass
      this.employeeType = rowData.Type
      this.userGroup = this.convertLookupValueToSearchValue(rowData.UserGroup)
      this.education = rowData.Education
      this.bloodType = rowData.BloodType
      this.priceListCategory = rowData.PriceListCategory
      this.countryCode = rowData.CountryCode
    }
  },
  validations () {
    let form = this.insertRules
    form.PriceListCategoryId = {
      required: requiredIf(function (nestedModel) {
        return this.form.CreateCustomerRecord === 1
      })
    }

    return {
      form: form
    }
  },
  watch: {
    returnCustomerRecord (e) {
      if (e !== null) {
        if (e !== 1) {
          this.priceListCategory = null
          this.form.PriceListCategoryId = null
        }
      }
    }
  }
}
</script>
<style scoped>
.lowercase {
  text-transform: lowercase;
}
</style>
