<template>
  <b-row class="asc__updatePage">
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
    <b-col cols="12" class="asc__updatePage-content-head">
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
                <b-form-input type="text" v-model="form.Name" :readonly="insertReadonly.Name" @keypress="isString($event)"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Surname != null ? insertVisible.Surname : developmentMode"  md="4" lg="3">
              <b-form-group :label="insertTitle.Surname + (insertRequired.Surname === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Surname.$error }">
                <b-form-input type="text" v-model="form.Surname" :readonly="insertReadonly.Surname" @keypress="isString($event)"/>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.GroupId + (insertRequired.GroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                <v-select
                  :options="lookup.EMPLOYEE_GROUP"
                  @input="selectedType('GroupId', $event)"
                  label="Label"
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
                <NextCheckBox v-model="form.CreateCustomerRecord" type="number" toggle/>
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
                />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.UserGroupId != null ? insertVisible.UserGroupId : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.UserGroupId + (insertRequired.UserGroupId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.UserGroupId.$error }">
              <v-select
                  :options="userGroups"
                  @input="selectedSearchType('UserGroupId', $event)"
                  label="Description1"
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
              <b-form-input type="text" v-model="form.TaxNumber" :readonly="insertReadonly.TaxNumber" maxLength="11" :oninput="maxLengthControl" />
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
            <b-form-group :label="insertTitle.GsmNumber + (insertRequired.GsmNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GsmNumber.$error }" >
              <b-form-input type="number" v-model="form.GsmNumber" :readonly="insertReadonly.GsmNumber" maxLength="10" :oninput="maxLengthControl" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="insertVisible.FaxNumber != null ? insertVisible.FaxNumber : developmentMode" md="4" lg="3">
            <b-form-group :label="insertTitle.FaxNumber + (insertRequired.FaxNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FaxNumber.$error }">
              <b-form-input type="number" v-model="form.FaxNumber" :readonly="insertReadonly.FaxNumber" maxLength="10" :oninput="maxLengthControl" />
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
                  <b-tr v-for="(w, i) in employeeTeams" :key="i">
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
                  <b-tr v-for="(w, i) in selectedEInvoices" :key="i">
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
        IsTeam: 0,
        PriceListCategoryId: null,
        CreateCustomerRecord: 0,
        UserGroupId: null,
        EducationId: null,
        DenimSize: null,
        CorduroySize: null,
        BloodTypeId: null,
        ScoreCardClassId: null,
        IsRepresentative: 0,
        EmployeeTeams: [],
        EInvoiceSeqs: []
      },
      routeName: this.$route.meta.baseLink,
      employeeTeam: null,
      employeeTeams: [],
      selectedEInvoice: null,
      selectedEInvoices: [],
      eInvoiceSeqsList: []
    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode', 'employees', 'userGroups', 'rowData'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
    this.$store.dispatch('getData', {...this.query, api: 'VisionNextBranch/api/Branch', record: 1})
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
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
        this.form.EmployeeTeams = this.employeeTeams.map((item) => {
          var newItem = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
            EmployeeId: item.RecordId
          }
          return newItem
        })
        this.form.EInvoiceSeqs = this.selectedEInvoices.map((item) => {
          var newItem = {
            Deleted: 0,
            System: 0,
            RecordState: 2,
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

        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: model, return: this.routeName})
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
          api: 'VisionNextEmployee/api/Employee/AutoCompleteSearch',
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

      let filteredArr = this.employeeTeams.filter(i => i.RecordId === this.employeeTeam.RecordId)
      if (filteredArr.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameItemError') })
        return false
      }

      this.employeeTeams.push(this.employeeTeam)
      this.employeeTeam = {}
      this.$v.employeeTeam.$reset()
    },
    removePersonalTeam (item) {
      this.employeeTeams.splice(this.employeeTeams.indexOf(item), 1)
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

      this.selectedEInvoices.push(this.selectedEInvoice)
      this.selectedEInvoice = {}
      this.$v.selectedEInvoice.$reset()
    },
    removePrefix (item) {
      this.selectedEInvoices.splice(this.selectedEInvoices.indexOf(item), 1)
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
    form.Telephone1 = {
      minLength: minLength(10),
      maxLength: maxLength(10)
    }
    form.Telephone2 = {
      minLength: minLength(10),
      maxLength: maxLength(10)
    }
    form.GsmNumber = {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10)
    }
    form.FaxNumber = {
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
    rowData (e) {
      if (e) {
        this.eInvoiceSeqsList = e.EInvoiceSeqs
        if (this.eInvoiceSeqsList) {
          this.eInvoiceSeqsList.map(item => {
            item.Label = `${item.Prefix} ${item.Year ? item.Year : ''} ${item.EInvoiceType.Label}`
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
