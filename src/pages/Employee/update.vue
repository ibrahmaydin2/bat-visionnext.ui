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
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle />
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
      <b-tab :title="$t('insert.employee.EmployeeInfo')" @click.prevent="tabValidation()" :active="true">
          <b-row>
            <b-col v-if="insertVisible.Name != null ? insertVisible.Name : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.Name + (insertRequired.Name === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Name.$error }">
                <b-form-input type="text" v-model="form.Name" :readonly="insertReadonly.Name" @keypress="isString($event)" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Surname != null ? insertVisible.Surname : developmentMode"  md="4" lg="3">
              <b-form-group :label="insertTitle.Surname + (insertRequired.Surname === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Surname.$error }">
                <b-form-input type="text" v-model="form.Surname" :readonly="insertReadonly.Surname" @keypress="isString($event)" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  :options="lookup.EMPLOYEE_GROUP"
                  @input="selectedType('GroupId', $event)"
                  label="Label"
                  v-model="employeeGroup"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.Category1 != null ? insertVisible.Category1 : developmentMode" md="4" lg="3">
              <b-form-group :label="$t('insert.employee.category') + (insertRequired.Category1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Category1.$error }">
                <v-select
                  :options="lookup.EMPLOYEE_CATEGORY_1"
                  @input="selectedType('Category1Id', $event)"
                  label="Label"
                  v-model="employeeCategory"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Other1 != null ? insertVisible.Other1 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.Other1 + (insertRequired.Other1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Other1.$error }">
                <b-form-input type="text" v-model="form.Other1" :readonly="insertReadonly.Other1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.IsTeam != null ? insertVisible.IsTeam : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.IsTeam + (insertRequired.IsTeam === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsTeam.$error }">
                <NextCheckBox v-model="form.IsTeam" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.PriceListCategoryId + (insertRequired.PriceListCategoryId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                <v-select
                  :options="lookup.PRICE_LIST_CATEGORY_TYPE"
                  @input="selectedType('PriceListCategoryId', $event)"
                  label="Label"
                  :disabled="!form.CreateCustomerRecord"
                  v-model="priceListCategoryType"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode1 != null ? insertVisible.FinanceCode1 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.FinanceCode1 + (insertRequired.FinanceCode1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode1.$error }">
                <b-form-input type="text" v-model="form.FinanceCode1" :readonly="insertReadonly.FinanceCode1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.CreateCustomerRecord != null ? insertVisible.CreateCustomerRecord : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.CreateCustomerRecord + (insertRequired.CreateCustomerRecord === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CreateCustomerRecord.$error }">
                <NextCheckBox v-model="form.CreateCustomerRecord" type="number" toggle />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.FinanceCode2 != null ? insertVisible.FinanceCode2 : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.FinanceCode2 + (insertRequired.FinanceCode2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FinanceCode2.$error }">
                <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ScoreCardClassId != null ? insertVisible.ScoreCardClassId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.ScoreCardClassId + (insertRequired.ScoreCardClassId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ScoreCardClassId.$error }">
                 <v-select
                  :options="lookup.SCORE_CARD_CLASS"
                  @input="selectedType('ScoreCardClassId', $event)"
                  label="Label"
                  v-model="scoreCardClass"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.SapHrCode != null ? insertVisible.SapHrCode : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.SapHrCode + (insertRequired.SapHrCode === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.SapHrCode.$error }">
                <b-form-input type="text" v-model="form.SapHrCode" :readonly="insertReadonly.SapHrCode" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="insertVisible.IsRepresentative != null ? insertVisible.IsRepresentative : developmentMode" cols="12" md="3">
              <b-form-group :label="insertTitle.IsRepresentative + (insertRequired.IsRepresentative === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.IsRepresentative.$error }">
                <NextCheckBox v-model="form.IsRepresentative" type="number" toggle />
              </b-form-group>
            </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.groupInfo')" @click.prevent="tabValidation()">
        <b-row>
          <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.TypeId + (insertRequired.TypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TypeId.$error }">
              <v-select
                  :options="lookup.EMPLOYEE_TYPE"
                  @input="selectedType('TypeId', $event)"
                  label="Label"
                  v-model="employeeType"
                />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.UserGroupId != null ? insertVisible.UserGroupId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.UserGroupId + (insertRequired.UserGroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UserGroupId.$error }">
              <v-select
                  :options="userGroups"
                  @input="selectedSearchType('UserGroupId', $event)"
                  label="Description1"
                  v-model="userGroup"
                />
            </b-form-group>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.Model_Personal')" @click.prevent="tabValidation()">
        <b-row>
          <b-col v-if="insertVisible.EmploymentStartDate != null ? insertVisible.EmploymentStartDate : developmentMode" :start-weekday="1" md="4" lg="3">
            <b-form-group :label="insertTitle.EmploymentStartDate + (insertRequired.EmploymentStartDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.EmploymentStartDate.$error }">
              <b-form-datepicker v-model="form.EmploymentStartDate" :placeholder="$t('insert.employee.chooseDate')" locale="tr" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.EmploymentEndDate != null ? insertVisible.EmploymentEndDate : developmentMode" :start-weekday="1" md="4" lg="3">
            <b-form-group :label="insertTitle.EmploymentEndDate + (insertRequired.EmploymentEndDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.EmploymentEndDate.$error }">
              <b-form-datepicker v-model="form.EmploymentEndDate" :placeholder="$t('insert.employee.chooseDate')" locale="tr" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.TaxNumber != null ? insertVisible.TaxNumber : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.TaxNumber + (insertRequired.TaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TaxNumber.$error }">
              <b-form-input type="number" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" maxLength="11" :oninput="maxLengthControl" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.BirthDate != null ? insertVisible.BirthDate : developmentMode" :start-weekday="1" md="4" lg="3">
            <b-form-group :label="insertTitle.BirthDate + (insertRequired.BirthDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BirthDate.$error }">
              <b-form-datepicker v-model="form.BirthDate" :placeholder="$t('insert.employee.chooseDate')" locale="tr" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.TShirtSize != null ? insertVisible.TShirtSize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.TShirtSize + (insertRequired.TShirtSize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.TShirtSize.$error }">
              <b-form-input type="text" v-model="form.TShirtSize" :readonly="insertReadonly.TShirtSize" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.MontSize != null ? insertVisible.MontSize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.MontSize + (insertRequired.MontSize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MontSize.$error }">
              <b-form-input type="text" v-model="form.MontSize" :readonly="insertReadonly.MontSize" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.OvercoatSize != null ? insertVisible.OvercoatSize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.OvercoatSize + (insertRequired.OvercoatSize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.OvercoatSize.$error }">
              <b-form-input type="text" v-model="form.OvercoatSize" :readonly="insertReadonly.OvercoatSize" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.ShoeSize != null ? insertVisible.ShoeSize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.ShoeSize + (insertRequired.ShoeSize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ShoeSize.$error }">
              <b-form-input type="text" v-model="form.ShoeSize" :readonly="insertReadonly.ShoeSize" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.EducationId != null ? insertVisible.EducationId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.EducationId + (insertRequired.EducationId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.EducationId.$error }">
             <v-select
                  :options="lookup.EDUCATION"
                  @input="selectedType('EducationId', $event)"
                  label="Label"
                  v-model="education"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.DenimSize != null ? insertVisible.DenimSize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.DenimSize + (insertRequired.DenimSize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DenimSize.$error }">
              <b-form-input type="text" v-model="form.DenimSize" :readonly="insertReadonly.DenimSize" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.CorduroySize != null ? insertVisible.CorduroySize : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.CorduroySize + (insertRequired.CorduroySize === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CorduroySize.$error }">
              <b-form-input type="text" v-model="form.CorduroySize" :readonly="insertReadonly.CorduroySize" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.BloodTypeId != null ? insertVisible.BloodTypeId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.BloodTypeId + (insertRequired.BloodTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.BloodTypeId.$error }">
             <v-select
                  :options="lookup.BLOOD_TYPE"
                  @input="selectedType('BloodTypeId', $event)"
                  label="Label"
                  v-model="bloodType"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.EmployeeContact')" @click.prevent="tabValidation()">
        <b-row>
          <b-col v-if="insertVisible.Telephone1 != null ? insertVisible.Telephone1 : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.Telephone1 + (insertRequired.Telephone1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Telephone1.$error }">
              <b-form-input type="number" v-model="form.Telephone1" :readonly="insertReadonly.Telephone1" maxLength="10" :oninput="maxLengthControl" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Telephone2 != null ? insertVisible.Telephone2 : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.Telephone2 + (insertRequired.Telephone2 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Telephone2.$error }">
              <b-form-input type="number" v-model="form.Telephone2" :readonly="insertReadonly.Telephone2" maxLength="10" :oninput="maxLengthControl"/>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.GsmNumber != null ? insertVisible.GsmNumber : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.GsmNumber + (insertRequired.GsmNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GsmNumber.$error }">
              <b-form-input type="number" v-model="form.GsmNumber" :readonly="insertReadonly.GsmNumber" maxLength="10" :oninput="maxLengthControl"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.FaxNumber != null ? insertVisible.FaxNumber : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.FaxNumber + (insertRequired.FaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FaxNumber.$error }">
              <b-form-input type="number" v-model="form.FaxNumber" :readonly="insertReadonly.FaxNumber" maxLength="10" :oninput="maxLengthControl"/>
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Email != null ? insertVisible.Email : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.Email + (insertRequired.Email === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Email.$error }">
              <b-form-input class="lowercase" type="email" v-model="form.Email" @input="emailEntered" :readonly="insertReadonly.Email" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.Model_Team')" @click.prevent="tabValidation()" v-if="form.IsTeam">
        <b-row>
          <b-col md="4" lg="3">
            <b-form-group :label="$t('insert.employee.TeamPersonalName')" :class="{ 'form-group--error': $v.employeeTeam.$error }">
              <v-select v-model="employeeTeam" label="Description1" :filterable="false" :options="employees" @search="onEmployeeSearch">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2" class="ml-auto">
            <b-form-group>
               <AddDetailButton @click.native="addPersonalTeam" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-table-simple responsive bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.employee.TeamPersonalName')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                  <b-tr v-for="(w, i) in employeeTeams.filter(x => x.RecordState !== 4)" :key="i">
                    <b-td>{{w.Description1}}</b-td>
                    <b-td class="text-center"><i @click="removePersonalTeam(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
      </b-tab>
      <b-tab :title="$t('insert.employee.EmployeePrefix')" @click.prevent="tabValidation()">
        <b-row>
          <b-col md="4" lg="3">
            <b-form-group :label="$t('insert.employee.EmployeePrefix')" :class="{ 'form-group--error': $v.selectedEInvoice.$error }">
              <v-select v-model="selectedEInvoice" :options="eInvoiceSeqsList" label="Label"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2" class="ml-auto">
            <b-form-group>
              <AddDetailButton @click.native="addPrefix" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-table-simple responsive bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.employee.EmployeePrefix')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                  <b-tr v-for="(w, i) in selectedEInvoices.filter(x => x.RecordState !== 4)" :key="i">
                    <b-td>{{w.Label}}</b-td>
                    <b-td class="text-center"><i @click="removePrefix(w)" class="far fa-trash-alt text-danger"></i></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
        </b-row>
      </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        RecordId: null,
        Deleted: 0,
        System: 0,
        RecordState: 0,
        Code: null,
        Name: null,
        Surname: null,
        TypeId: null,
        GroupId: null,
        StatusId: null,
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
        EmployeeTeams: [],
        EInvoiceSeqs: []
      },
      routeName: this.$route.meta.baseLink,
      employeeTeam: null,
      employeeTeams: [],
      selectedEInvoice: null,
      selectedEInvoices: [],
      eInvoiceSeqsList: [],
      employeeGroup: null,
      employeeCategory: null,
      priceListCategoryType: null,
      scoreCardClass: null,
      employeeType: null,
      userGroup: null,
      education: null,
      bloodType: null
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'employees', 'userGroups', 'rowData', 'branch'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
      this.$store.dispatch('getData', {...this.query, api: `VisionNext${e}/api/${e}`, record: this.$route.params.url})
      this.$store.dispatch('getBranchData', {...this.query, api: 'VisionNextBranch/api/Branch', record: 1})
      this.getLists()
    },
    selectedType (label, model) {
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
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
        this.form.EmployeeTeams = this.employeeTeams.filter(e => !e.RecordId || (e.RecordId && e.RecordState !== 2))
        this.form.EInvoiceSeqs = this.selectedEInvoices.map((item) => {
          var newItem = {
            Deleted: item.Deleted,
            System: item.System,
            RecordState: item.RecordState,
            RecordId: item.RecordId
          }
          return newItem
        })
        let model = {
          'model': this.form
        }
        if (!this.form.GroupId || this.form.GroupId === '') {
          delete this.form.GroupId
        }
        if (!this.form.BloodTypeId || this.form.BloodTypeId === '') {
          delete this.form.BloodTypeId
        }
        if (!this.form.ScoreCardClassId || this.form.ScoreCardClassId === '') {
          delete this.form.ScoreCardClassId
        }
        if (!this.form.TypeId || this.form.TypeId === '') {
          delete this.form.TypeId
        }
        if (!this.form.PriceListCategoryId || this.form.PriceListCategoryId === '') {
          delete this.form.PriceListCategoryId
        }
        if (!this.form.UserGroupId || this.form.UserGroupId === '') {
          delete this.form.UserGroupId
        }
        if (!this.form.EducationId || this.form.EducationId === '') {
          delete this.form.EducationId
        }
        if (!this.form.EmployeeId || this.form.EmployeeId === '') {
          delete this.form.EmployeeId
        }
        this.$store.dispatch('updateData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: model, return: this.$route.meta.baseLink})
      }
    },
    getLists () {
      let allLookups = 'EMPLOYEE_GROUP,EMPLOYEE_CATEGORY_1,PRICE_LIST_CATEGORY_TYPE,SCORE_CARD_CLASS,EMPLOYEE_TYPE,EDUCATION,BLOOD_TYPE'
      this.$store.dispatch('getAllLookups', {...this.query, type: allLookups})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextSystem/api/SysUserGroup/Search', name: 'userGroups'})
    },
    onEmployeeSearch (search, loading) {
      if (search.length >= 3) {
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextEmployee/api/Employee/Search',
          name: 'employees',
          andConditionModel: {
            Description1: search
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    addPersonalTeam () {
      this.$v.employeeTeam.$touch()
      if (this.$v.employeeTeam.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      let filteredArr = this.employeeTeams.filter(i => i.EmployeeId === this.employeeTeam.RecordId && i.RecordState !== 4)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.employeeTeam.Deleted = 0
      this.employeeTeam.System = 0
      this.employeeTeam.RecordState = 2
      this.employeeTeams.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        EmployeeId: this.employeeTeam.RecordId,
        Description1: this.employeeTeam.Description1
      })
      this.employeeTeam = {}
      this.$v.employeeTeam.$reset()
    },
    removePersonalTeam (item) {
      let index = this.employeeTeams.indexOf(item)
      if (!item.RecordId) {
        this.employeeTeams.splice(index, 1)
      } else {
        this.employeeTeams[index].RecordState = 4
      }
    },
    addPrefix () {
      this.$v.selectedEInvoice.$touch()
      if (this.$v.selectedEInvoice.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }

      let filteredArr = this.selectedEInvoices.filter(i => i.RecordId === this.selectedEInvoice.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }
      this.selectedEInvoice.Deleted = 0
      this.selectedEInvoice.System = 0
      this.selectedEInvoice.RecordState = 2
      this.selectedEInvoices.push(this.selectedEInvoice)
      this.selectedEInvoice = {}
      this.$v.selectedEInvoice.$reset()
    },
    removePrefix (item) {
      let index = this.selectedEInvoices.indexOf(item)
      this.selectedEInvoices.splice(index, 1)
    },
    emailEntered (value) {
      this.form.Email = value ? value.toLowerCase() : ''
    }
  },
  validations () {
    let form = this.insertRules
    form.TaxNumber = {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11)
    }
    form.GsmNumber = {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10)
    }
    form.Email = {
      required,
      email
    }
    return {
      form: form,
      employeeTeam: {
        required
      },
      selectedEInvoice: {
        required
      }
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    },
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    },
    userGroups (value) {
      if (value && this.form.UserGroupId) {
        this.userGroup = value.find(e => e.RecordId === this.form.UserGroupId)
      }
    },
    branch (e) {
      if (e) {
        this.eInvoiceSeqsList = e.EInvoiceSeqs
        if (this.eInvoiceSeqsList) {
          this.eInvoiceSeqsList.map(item => {
            item.Label = `${item.Prefix} ${item.Year ? item.Year : ''} ${item.EInvoiceType.Label}`
          })
        }
      }
    },
    rowData (e) {
      if (e) {
        this.form = {
          RecordId: e.RecordId,
          Deleted: e.Deleted,
          System: e.System,
          RecordState: e.RecordState,
          Code: e.Code,
          Name: e.Name,
          Surname: e.Surname,
          TypeId: e.TypeId,
          GroupId: e.GroupId,
          StatusId: e.StatusId,
          Category1Id: e.Category1Id,
          FinanceCode1: e.FinanceCode1,
          FinanceCode2: e.FinanceCode2,
          SapHrCode: e.SapHrCode,
          Description1: e.Description1,
          EmploymentStartDate: e.EmploymentStartDate,
          EmploymentEndDate: e.EmploymentEndDate,
          Telephone1: e.Telephone1,
          Telephone2: e.Telephone2,
          GsmNumber: e.GsmNumber,
          FaxNumber: e.FaxNumber,
          Email: e.Email ? e.Email.toLocaleLowerCase() : '',
          Other1: e.Other1,
          TaxNumber: e.TaxNumber,
          BirthDate: e.BirthDate,
          TShirtSize: e.TShirtSize,
          MontSize: e.MontSize,
          OvercoatSize: e.OvercoatSize,
          ShoeSize: e.ShoeSize,
          IsTeam: e.IsTeam,
          PriceListCategoryId: e.PriceListCategoryId,
          CreateCustomerRecord: e.CreateCustomerRecord,
          UserGroupId: e.UserGroupId,
          EducationId: e.EducationId,
          DenimSize: e.DenimSize,
          CorduroySize: e.CorduroySize,
          BloodTypeId: e.BloodTypeId,
          ScoreCardClassId: e.ScoreCardClassId,
          IsRepresentative: e.IsRepresentative,
          EmployeeTeams: e.EmployeeTeams,
          EInvoiceSeqs: e.EInvoiceSeqs
        }
        this.priceListCategoryType = e.PriceListCategory
        this.employeeGroup = e.Group
        this.employeeCategory = e.Category1
        this.priceListCategoryType = e.PriceListCategory
        this.scoreCardClass = e.ScoreCardClass
        this.employeeType = e.Type
        this.education = e.Education
        this.bloodType = e.BloodType
        if (this.userGroups && e.UserGroupId) {
          this.userGroup = this.userGroups.find(u => u.RecordId === e.UserGroupId)
        }
        if (e.EmployeeTeams) {
          this.employeeTeams = e.EmployeeTeams.map((item) => {
            var newItem = {
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState ? item.RecordState : 2,
              RecordId: item.RecordId,
              EmployeeId: item.EmployeeId,
              Description1: item.Employee.Label
            }
            return newItem
          })
        }
        if (e.EInvoiceSeqs) {
          this.selectedEInvoices = e.EInvoiceSeqs.map((item) => {
            var newItem = {
              Deleted: item.Deleted,
              System: item.System,
              RecordState: item.RecordState,
              RecordId: item.RecordId,
              Label: `${item.Prefix} ${item.Year ? item.Year : ''} ${item.EInvoiceType.Label}`
            }
            return newItem
          })
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
