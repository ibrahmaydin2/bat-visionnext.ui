<template>
  <div>
    <b-row>
      <b-col cols="12">
        <header style="display:flex; align-items:center; justify-content: space-between">
          <Breadcrumb title="Yeni Kayıt" :route="'workOrder'" />
          <div>
            <b-button @click="save()" size="sm" variant="outline-success">Save</b-button>
            <router-link :to="{name: 'Dashboard' }">
              <b-button size="sm" variant="outline-danger mr-2">Cancel</b-button>
            </router-link>
          </div>
        </header>
      </b-col>
    </b-row>
    <b-tabs>
      <b-tab :title="$t('insert.detail')" active>
        <b-row>
          <b-col cols="12" md="6" lg="4" xl="4">
            <h3>Analysis Request Info </h3>
            <b-row>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('sampleType')">
                  <!-- <v-select :options="sampleType" label="Label1" @input="selectSampleType" /> -->
                  <select v-model="selected">
                    <option v-for="(option, i) in sampleType" :value="option.Value" :key="i">
                      {{ option.Label1 }}
                    </option>
                  </select>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('sampleDate')">
                    <datepicker v-model="form.sampleDate" format="dd.MM.yyyy"></datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('referenceNo')">
                  <b-form-input type="text" v-model="form.referenceNo" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('noKitsReceived')">
                  <b-form-checkbox v-model="form.noKitsReceived" name="noKitsReceived" value="1" unchecked-value="" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientIDNumber')">
                  <b-form-input type="text" v-model="form.patientIDNumber" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('notTurkishCitizen')">
                  <b-form-checkbox v-model="form.notTurkishCitizen" name="notTurkishCitizen" value="0" unchecked-value="" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('note')">
                  <b-form-input type="text" v-model="form.note" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('projectId')">
                  <v-select :options="projects" label="Label1" @input="selectProject" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientName')">
                  <b-form-input type="text" v-model="form.patientName" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientSurName')">
                  <b-form-input type="text" v-model="form.patientSurName" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientGender')">
                  <!-- <v-select v-model="form.gender" :options="gender" label="Label1" @input="selectGender" /> -->
                  <select v-model="selectedGender">
                    <option v-for="(option, i) in gender" :value="option.Value" :key="i">
                      {{ option.Label1 }}
                    </option>
                  </select>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientBirthDate')">
                  <!-- <b-form-datepicker id="" v-model="form.patientBirthDate" /> -->
                  <datepicker v-model="form.patientBirthDate" format="dd.MM.yyyy"></datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientPhone')">
                  <b-form-input type="tel" v-model="form.patientPhone" masked="true" v-mask="'05## ### ## ##'" placeholder="05__ ___ __ __" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="6" lg="8" xl="8">
            <h3>Family Information</h3>
            <b-row>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('parentalConsanguinity')">
                  <b-form-radio v-model="form.parentalConsanguinity" name="parentalConsanguinity" value="1">Yes</b-form-radio>
                  <b-form-radio v-model="form.parentalConsanguinity" name="parentalConsanguinity" value="0">No</b-form-radio>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('diseaseinFamilyHistory')">
                  <b-form-radio v-model="form.diseaseinFamilyHistory" name="diseaseinFamilyHistory" value="1">Yes</b-form-radio>
                  <b-form-radio v-model="form.diseaseinFamilyHistory" name="diseaseinFamilyHistory" value="0">No</b-form-radio>
                </b-form-group>
              </b-col>
            </b-row>
            <h3>Symptoms</h3>
            <b-row>
              <b-col v-for="(s, i) in symptoms" :key="i" cols="12" lg="6">
                <b-form-checkbox
                  v-model="status"
                  name="symptoms"
                  :value="s.Symptom.Value"
                  unchecked-value=""
                >
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.sharing')">
        <b-row>
          <b-col cols="12" md="4" lg="4" xl="4">
            <h3>Contact Information </h3>
            <b-row>
              <b-col cols="12" md="12" lg="12" xl="12">
                <b-form-group
                  id="contact-info-email"
                  label="Contact Email"
                  label-for="contact-info-email"
                >
                  <b-form-input
                    id="contact-info-email"
                    v-model="userData.Email"
                    type="email"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6" md="6" lg="6" xl="6">
                <b-form-group
                  id="contact-info-name"
                  label="Name"
                  label-for="contact-info-name"
                >
                  <b-form-input
                    id="contact-info-name"
                    v-model="userData.Name"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6" md="6" lg="6" xl="6">
                <b-form-group
                  id="contact-info-surname"
                  label="Surname"
                  label-for="contact-info-surname"
                >
                  <b-form-input
                    id="contact-info-surname"
                    v-model="userData.Surname"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6" md="6" lg="6" xl="6">
                <b-form-group
                  id="contact-info-phone"
                  label="Phone"
                  label-for="contact-info-phone"
                >
                  <b-form-input
                    id="contact-info-phone"
                    v-model="userData.phone"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6" md="6" lg="6" xl="6">
                <b-form-group
                  id="contact-info-hospital"
                  label="Contact Hospital"
                  label-for="contact-info-hospital"
                >
                  <b-form-input
                    id="contact-info-hospital"
                    v-model="userData.Organization"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
               <b-col cols="6" md="6" lg="6" xl="6">
                <b-form-group
                  id="contact-info-department"
                  label="Contact Department"
                  label-for="contact-info-department"
                  v-if="userData.Department"
                >
                  <b-form-input
                    id="contact-info-department"
                    v-model="userData.Department.Label"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="8" lg="8" xl="8">
            <h3>Sharing </h3>
            <b-row>
              <table class="table table-striped table-hover asc__sharing-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Name*</th>
                    <th>Surname*</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    <email-search />
                    <!-- <td><b-form-input type="text" v-model="sharingUser.title"></b-form-input></td>
                    <td><b-form-input type="text" v-model="sharingUser.name"></b-form-input></td>
                    <td><b-form-input type="text" v-model="sharingUser.surname"></b-form-input></td>
                    <td class="asc__add-row"><i @click="addUser()" class="fa fa-plus"></i></td> -->
                  <tr v-for="(item, i) in sharingUser" :key="i" v-show="item.Deleted !== 4">
                    <td>{{item.Email}}</td>
                    <td>{{item.Title}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Surname}}</td>
                    <td class="asc__add-row"><i @click="removeUser(item)" class="fa fa-trash-alt text-danger"></i></td>
                  </tr>
                </tbody>
              </table>
            </b-row>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import mixin from '../../mixins/index'
import EmailSearch from '../../components/EmailSearch'

export default {
  mixins: [mixin],
  data () {
    return {
      showLoader: false,
      form: {
        sampleType: '',
        sampleDate: '',
        gender: '',
        referenceNo: null,
        noKitsReceived: 0,
        patientIDNumber: null,
        notTurkishCitizen: 0,
        note: '',
        patientName: '',
        patientSurName: '',
        patientBirthDate: '',
        patientPhone: '',
        parentalConsanguinity: 0,
        diseaseinFamilyHistory: 0
      },
      status: '',
      users: [],
      items: [],
      value: '',
      encryptedKey: this.$route.params.url,
      recordId: null,
      workOrderTypeId: null,
      selected: null,
      selectedGender: null,
      WorkOrderId: null
    }
  },
  components: {
    Datepicker,
    EmailSearch
  },
  computed: {
    ...mapState(['workOrder', 'style', 'sampleType', 'gender', 'projects', 'symptoms', 'userData', 'sharingUser'])
  },
  created () {
    this.items = []
    this.removeSharingUserData()
  },
  mounted () {
    this.getType()
  },
  watch: {
    workOrder (e) {
      this.form = {
        'referenceNo': e.SerialNumber,
        'patientIDNumber': e.PatientIdentifier,
        'patientName': e.PatientName,
        'patientPhone': e.PatientPhone,
        'patientSurName': e.PatientSurname,
        'noKitsReceived': e.noKitsReceived,
        'parentalConsanguinity': e.ParentConsanMarriage,
        'notTurkishCitizen': e.Citizen,
        'diseaseinFamilyHistory': e.HasRelativesDisease,
        'sampleDate': this.dateConvertToTimestamp(e.SampleDate),
        'patientBirthDate': this.dateConvertToTimestamp(e.PatientBirthDate)
      }
      this.selected = e.SampleType.Value
      this.selectedGender = e.PatientGender.Value
      this.recordId = e.RecordId
      this.workOrderTypeId = e.WorkOrderTypeId
      let tmpData = []
      e.WorkOrderReceivers.map((item) => {
        tmpData = {
          'Title': item.Contact.Title,
          'Name': item.Contact.Name,
          'Surname': item.Contact.Surname,
          'Email': item.Contact.Email,
          'ContactId': item.ContactId,
          'WorkOrderId': item.WorkOrderId,
          'EncryptedKey': item.EncryptedKey,
          'Deleted': item.Deleted,
          'RecordId': item.RecordId,
          'RecordState': 0
        }
        this.WorkOrderId = item.WorkOrderId
        this.setSharingUserData(tmpData)
      })
    }
  },
  methods: {
    ...mapMutations(['removeSharingUserData', 'setSharingUserData']),
    getType () {
      let workOrder = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'EncryptedKey': this.$route.params.url
      }
      this.$store.dispatch('getWorkOrder', {...this.query, info: workOrder})
      let sampletype = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'Code': 350
      }
      this.$store.dispatch('getWOSampleType', {...this.query, info: sampletype})
      let gender = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'Code': 351
      }
      this.$store.dispatch('getWOGender', {...this.query, info: gender})
      let symptoms = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'EncryptedKey': this.$route.params.url
      }
      this.$store.dispatch('getSymptoms', {...this.query, info: symptoms})
      let userData = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'RecordId': JSON.parse(localStorage.getItem('UserModel')).UserId
      }
      this.$store.dispatch('getUserData', {...this.query, info: userData}).then(() => {
        let projectType = {
          'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
          'ContactId': this.userData.RecordId,
          'KitTypeId': this.$route.query.KitTypeId
        }
        this.$store.dispatch('getProjects', {...this.query, info: projectType})
      })
    },
    // selectSampleType (e) {
    //   this.sampleType = e
    // },
    // selectGender (e) {
    //   this.form.gender = e
    // },
    selectProject (e) {
      this.form.projectId = e
    },
    removeUser (item) {
      let index = this.sharingUser.indexOf(item)
      this.sharingUser[index].Deleted = 4
    },
    save () {
      let birthDateTime = new Date(this.form.patientBirthDate)
      let time = birthDateTime.getTime()
      // eslint-disable-next-line no-useless-escape
      let birthDate = '\/Date(' + time + '+0300)\/'

      let sampleDateTime = new Date(this.form.sampleDate)
      let sampleTime = sampleDateTime.getTime()
      // eslint-disable-next-line no-useless-escape
      let sampleDate = '\/Date(' + sampleTime + '+0300)\/'

      let tmpData = {
        'Code': 350,
        'Citizen': this.form.notTurkishCitizen,
        'ContactDepartment': this.userData.Department.Label,
        'ContactEmail': this.userData.Email,
        'ContactGsm': this.userData.Gsm,
        'ContactId': this.userData.RecordId,
        'ContactName': this.userData.Name,
        'ContactOrganization': this.userData.Gsm.Organization,
        'ContactPhone': this.userData.Phone,
        'ContactSurname': this.userData.Surname,
        'HasRelativesDisease': this.form.diseaseinFamilyHistory,
        'KitTypeId': this.$route.query.KitTypeId,
        'ParentConsanMarriage': this.form.parentalConsanguinity,
        'PatientBirthDate': birthDate,
        'PatientCityId': null,
        'PatientCountryId': null,
        'PatientGenderId': this.selectedGender,
        'PatientGsm': this.form.patientPhone,
        'PatientIdentifier': this.form.patientIDNumber,
        'PatientName': this.form.patientName,
        'PatientPhone': this.form.patientPhone,
        'PatientSurname': this.form.patientSurName,
        'Received': this.form.noKitsReceived,
        'SampleDate': sampleDate,
        'SampleTypeId': this.selected,
        'SerialNumber': this.form.referenceNo,
        'WorkOrderStatusId': 1,
        'WorkOrderSymptomIds': [],
        'RecordId': this.recordId,
        'ProvisionNumber': null,
        'WorkOrderProvisionId': null,
        'EncryptedKey': this.$route.params.url,
        'WorkOrderTypeId': this.workOrderTypeId,
        'Deleted': 0,
        'WorkOrderReceivers': this.sharingUser
      }

      tmpData.WorkOrderReceivers.map(user => {
        if (user.Deleted === null) {
          user.Deleted = 0
          user.RecordState = 2
          user.WorkOrderId = this.WorkOrderId
        }
      })

      this.$store.dispatch('update', {...this.query, info: tmpData})
    }
  }
}
</script>
<style lang="sass">
  .asc__sharing-table
    input
      outline: none
      font-size: 14px !important
      width: 100%
      border: 1px solid #bfbbbb !important
      padding: 5px !important
      font-weight: 400
      height: 100% !important
      border-radius: 0 !important
    .asc__add-row
      vertical-align: middle !important
  .vdp-datepicker__calendar header
    display: flex !important
</style>
